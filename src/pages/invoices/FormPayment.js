import { AutoComplete, Button, Checkbox, DatePicker, Form, Input, notification, Select } from "antd";
import React, {useState,useEffect} from "react";
import tw from "twin.macro";
import { styled } from "twin.macro";
import { Option } from "antd/lib/mentions";
import { CheckOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import moment from "moment";
import ButtonMore from "../../components/Reports/ButtonMore";
const dateFormat = "DD/MM/YYYY";

export default function FormPayment({handleOk2 ,data,handleCancel}) {
  const [form]=Form.useForm();
  const [filter, setFilter] = useState({
    limit: 10,
  });
  const [result, setResult] = useState("")

  const [isForm, setIsForm] = useState({
    payment_at: new Date() ,
    note:"",
    amount:"",
    method_id:1,

  })
  
  const onFinish = (values) => {
  
    mutation.mutate({...isForm,invoice_id:data.key})
    form.resetFields();

    handleOk2("modal")
  };
  const onChange = (e) => {
    setIsForm({ ...isForm, [e.target.name]: e.target.value });
  };

  const { data: paymentMethod, statusPaymentMethod } = useQuery(
    ["payments-method", filter],
    async (key) =>
      axios
        .get(`payments/method`, {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );

  useEffect(() => {
    if(data.key){
    const fetchData = async () => {
        const result = await axios.get(`payments?invoice_id=${data.key}`);
        setResult(result?.data?.data?.data)
    };

    fetchData();}
}, [data.key]);

useEffect(() => {
  result &&
setIsForm({...isForm,amount:result[result.length-1].amount})

}, [result])


  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (data) => {
      return axios.post("payments", data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("payment-listing");
        notification.success({
          message: `A payment was Added`,
          // description:'This information will appear on your invoice',
          placement: "topLeft",
        });
        

      },
      onError: (err) => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
        console.log(err.response.data.message);
      },
    }
  );


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      onFinish={onFinish}  
      form={form}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      size={"large"}
      tw="mt-10 h-96 p-5 "
      // fields={   
      //   [
    
      //   {
      //     name: ["payment_at"],
      //     value: moment(new Date(),dateFormat),
      //   },
       
       
      // ]}
      // initialValues={{
      //   method_id:1,
      //   amount:result[result?.length-1].amount
      // }}
    >
      <table tw="w-full ">
        <tr tw="space-x-6 border-b border-gray-300">
          <th>Invoice Number</th>
          <th>Payment Date</th>
          <th> Internal Notes</th>
          <th>Payment Type</th>
          <th>Amount / Currency</th>
        </tr>
        <tr >
          <td>
         {data.invoice_number}
  
          </td>
          <td>
              <DatePicker
              onChange={(date, dateString) =>
                onChange({
                  target: { value: dateString, name: "payment_at" },
                })
              }
              value={
                isForm.payment_at &&
                moment(isForm.payment_at, dateFormat)
              }
                format={dateFormat}
              />
             
          </td>
          <td>
              <Input onChange={onChange} value={isForm.note} name="note" />
             
          </td>
          <td>
            <Select
                onChange={(e) => onChange({
                  target: { value: e, name: "method_id" },
                })}
                value={isForm.method_id}
              options={               
                paymentMethod?.data?.map((item)=>(
                  { label: item.name, value: item.id }
                ))            
            }
            />
          </td>
          <td tw="text-right">
              <Input type="number" value={isForm.amount}  onChange={onChange} name="amount" />
             
          </td>
        </tr>
      
      </table>
      <div tw="bg-gray-300 px-2 py-3 text-right border-b border-b-gray-400">
        <span>{data[0]?.company_name} Payment Total :  {isForm.amount} </span>

      </div>
  <div tw="border-t border-t-gray-400 mt-10 p-5 flex justify-between">
    <div>
            <Checkbox>Send client a payment notification email</Checkbox>
    </div>
        <div >
          <Button tw="mr-2" onClick={()=>handleCancel("modal")}>
Cancel
          </Button>
              <Button htmlType="submit"  tw=" text-white bg-success ">
            Save
              </Button>
            </div>
  </div>
     
    </Form>
  );
}


