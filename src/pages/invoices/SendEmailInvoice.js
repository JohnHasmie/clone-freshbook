import { Button, Form, Input, notification, Select } from "antd";
import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { useHistory, useLocation } from "react-router-dom";
import CardPopup from "../../components/CardPopup";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export default function SendEmailInvoice({hide,dataUser,invoiceId}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setIsTitle] = useState("");
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
      return axios.post("invoices/send", data).then((res) => res.data);
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
  const dataFilter=status === "success" && dataClients?.data?.filter((item, index) => {
      return dataClients?.data?.findIndex(i => i.company_name === item.company_name) === index;
    });

  const { TextArea } = Input;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    mutation.mutate({
      client_id:values.email,
      invoice_ids:[parseInt(invoiceId)]
    })
    console.log("Success:", values);
  };
  console.log(invoiceId,"dataClients")
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item label="To" name="email" tw="px-2 pt-2">
            {/* <Input type="email" placeholder="Email Address" /> */}
            <Select
                  // onChange={(e) => onChange({
                  //   target: { value: e, name: "base_currency" },
                  // })}
                  options={status=== "success" && dataFilter?.map(client=>({
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
          </Form.Item>
          <div tw="flex flex-col justify-center border-t border-gray-200 p-2">
            <div tw="text-center mb-2">
              Heri Setiawan from Oasis Land has sent you an {isTitle} as of Nov
              23, 2022
            </div>
            <TextArea rows={3} />
          </div> */}
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
