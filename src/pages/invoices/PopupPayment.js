import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  notification,
  Select,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import tw from "twin.macro";
import CardPopup from "../../components/CardPopup";
import { DatePickerCustom } from "../report/ReportCustom.style";

const dateFormat = "DD/MM/YYYY";

export default function PopupPayment({hide,invoiceId,data,id}) {
  const [filter, setFilter] = useState({
    limit: 10,
  });

  const [form]=Form.useForm();

  const queryClient = useQueryClient();


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    console.log(values,"cek");
    if(data === null){
      mutation.mutate({
        ...values,
        invoice_id:invoiceId,
        payment_at:values.date ? values.date._d : new Date()  ,
  
      })
    }else{
      mutationEdit.mutate({
        ...values,
        invoice_id:invoiceId,
        payment_at:values.date ? values.date._d : new Date()  ,
  
      })
    }
   
    form.resetFields();

    hide()
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

  const mutationEdit = useMutation(
    async (data) => {
      return axios.put(`payments/${id}`, data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("payment-listing");
        notification.success({
          message: `A payment was Upadted`,
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

  return (
    <>
      <CardPopup title="Add a Payment">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          size="large"
          form={form}
          fields={
            data &&
            [
            {
              name: ["amount"],
              value: data.amount,
            },
            {
              name: ["method_id"],
              value: data.method_id,
            },
            {
              name: ["date"],
              value: moment(new Date(), dateFormat) 
            },
            {
              name: ["note"],
              value: data.note,
            },
            {
              name: ["status"],
              value: data?.status,
            },

          ]}
        >
          <Form.Item name="amount" tw="px-2 pt-2">
            <Input type="text" placeholder="Rp0.00" />
          </Form.Item>

          <Form.Item name="method_id" tw="px-2 ">
            <Select
              placeholder="Payment Method"
              options={               
                paymentMethod?.data?.map((item)=>(
                  { label: item.name, value: item.id }
                ))            
            }
            />
          </Form.Item>
          <Form.Item name="date" tw="px-2 ">
            {/* <Input type="text" placeholder="Date" /> */}
            <DatePicker
            tw="w-full rounded-md"
            defaultValue={moment(new Date(), dateFormat)}
                   format={dateFormat}
                 />
          </Form.Item>
          <Form.Item name="note" tw="px-2 ">
            <Input type="text" placeholder="Payment Notes (Optional)" />
          </Form.Item>
          {data !== null && 
            <Form.Item label="Status" name="status" tw="px-2">
            <Select
      
              options={[
                {label:'Success',value:'success'},
                {label:'Pending',value:'pending'},
                {label:'Failed',value:'failed'},

              ]}
            />
          </Form.Item>
          }
          <Form.Item name="notification_email" tw="px-2 ">
            <Checkbox>Send client a payment notification email</Checkbox>
          </Form.Item>

          <div tw="flex justify-end border-t border-gray-200 pt-2 pr-2">
            <Form.Item>
              <Button tw="mr-2" onClick={hide}>Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" tw="bg-success text-white ">Add Payment</Button>
            </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}
