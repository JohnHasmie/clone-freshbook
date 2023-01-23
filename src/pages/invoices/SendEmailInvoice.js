import { Button, Form, Input, notification, Select } from "antd";
import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { useHistory, useLocation } from "react-router-dom";
import CardPopup from "../../components/CardPopup";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import moment from "moment";

export default function SendEmailInvoice({hide,dataUser,invoiceId,clientProps,date,total,onFinishInvoice,setDontThrow}) {
  const [isContactId, setIsContactId] = useState(false);
  const [isBody, setIsBody] = useState(
  `${dataUser} sent you an invoices for ${total} that's due on ${moment(date).format("DD MMMM YYYY")}`
  );

  const [isTitle, setIsTitle] = useState("");
  const [isClient, setIsClient]=clientProps

  useEffect(() => {
    setDontThrow(true)
  }, [third])
  
const history=useHistory()
const queryClient=useQueryClient()
  let { pathname } = useLocation();
  const [filter, setFilter] = useState({
    limit: 150,
    page: 1,
  });
const { data: dataClients, status } = useQuery(
    ["clients", filter],
    async (key) =>
      axios
        .get("clients", {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );
  const mutation = useMutation(
    async (data) => {
      return axios.post("invoices/send-contact", data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("invoices-listing");
        notification.success({
          message: `Email Invoice has been send`,
          placement: "topLeft",
        });
        history.push("/invoices");
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
  const dataFilter=status === "success" && dataClients?.data?.filter((item) =>(item.id === isClient));
  const { TextArea } = Input;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    onFinishInvoice()
    // mutation.mutate({
    //   contact_id:values.email,
    //   invoice_ids:[parseInt(invoiceId)]
    // })
    console.log("Success:", values);
  };
  return (
    <>
      <CardPopup title={`Send by Email`}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            subject: `${dataUser} sent you an invoices`,
            
          }}
          fields={[
            {
              name: ["contact_id"],
              value: dataFilter[0]?.id,
            },
          ]}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item label="To" name="contact_id" tw="px-2 pt-2">
            {/* <Input type="email" placeholder="Email Address" /> */}
            <Select
            mode="multiple"
                  // onChange={(e) => onChange({
                  //   target: { value: e, name: "base_currency" },
                  // })}
                  options={status=== "success" && dataClients?.data?.map(client=>({
                    label:client.email,
                    value:client.id

                  }))}
                />
          </Form.Item>

          <Form.Item label="Subject" name="subject" tw="px-2 ">
            <Input type="text" />
          </Form.Item>
          {/* <Form.Item label="File" name="file" tw="px-2 ">
            <div> {isTitle} as of Nov 23, 2022.csv</div>
          </Form.Item> */}
          <div tw="flex flex-col justify-center border-t border-gray-200 p-2">
            {/* <div tw="text-center mb-2">
              Heri Setiawan from Oasis Land has sent you an {isTitle} as of Nov
              23, 2022
            </div> */}

            <TextArea rows={3} value={isBody} />
          </div>
          <div tw="flex justify-end border-t border-gray-200 pb-0 pt-2 px-2">
            <Form.Item>
              <Button tw="mr-2" onClick={hide}>Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" tw="bg-success text-white">Send Report</Button>
            </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}
