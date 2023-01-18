import { Button, Form, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import CardPopup from "../../components/CardPopup";

export default function EditItem({query,id,hide,data,clientId,handlePopoverClick}) {
  const queryClient = useQueryClient();
  const [form]=Form.useForm();
  const [isForm, setIsForm] = useState({
    name:"",
description:"",
rate:"",
qty:""    
  })


  useEffect(() => {
   data && setIsForm({...isForm,
    name:data.name,
description:data.desc,
rate:data.rate,
qty:data.current

   })
  }, [])
  // const { data: detailItem, status } = useQuery(
  //   "item-detail",
  //   async (key) =>
  //     axios
  //       .get(`items/1/${id}`)
  //       .then((res) => res.data.data)
  // );
  const mutation = useMutation(
    async (data) => {
      return axios.put(`items/${id}`, data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(query);
        notification.success({
          message: `${res?.data?.item?.name} has been updated`,
          placement: "topLeft",
        });
      },
      onError: (err) => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
      },
    }
  );
 
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    let newValues={...values,client_id:clientId,rate:parseInt(values.rate)}
    mutation.mutate(newValues);
    hide()

  };
  const onChange = (e) => {
    console.log([e.target.name],e.target.value);
    setIsForm({ ...isForm, [e.target.name]: e.target.value });
  };
  return (
    <>
      <CardPopup title="Edit Item" tw="z-30" onClick={handlePopoverClick}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          form={form}
          fields={[
            {
              name: ["name"],
              value: /* status === "success" && detailItem.item.name */ isForm.name,
            },
            {
              name: ["description"],
              value: /* status === "success" && detailItem.item.description */ isForm.description,
            },
            {
              name: ["rate"],
              value: isForm.rate,
            },
            {
                name: ["qty"],
                value: /* status === "success" && detailItem.item.qty */ isForm.qty,
              }
          ]}
        >
          <div tw="grid grid-cols-3">

          <Form.Item label="Name" name="name" tw="px-2 col-span-3 pt-2" rules={[{ required: true, message: "This cannot be blank" }]}>
            <Input onChange={onChange} name="name"  type="text" placeholder="Enter a name" />
          </Form.Item>

          <Form.Item label="Description" name="description" tw="px-2 col-span-3 ">
            <Input onChange={onChange} name="description" type="text" placeholder="Enter a description" />
          </Form.Item>
          <Form.Item label="Rate" name="rate" tw="px-2">
            <Input onChange={onChange} name="rate"    placeholder="0.00" />
          </Form.Item>
          {/* <Form.Item label="stock" name="qty" tw="px-2">
            <Input onChange={onChange} name="qty" type="number"  />
          </Form.Item> */}
          </div>

          <div tw="flex justify-end border-t border-gray-200 px-5 pt-5 pb-0">
            <Form.Item>
              <Button onClick={hide} tw="mr-2">Cancel</Button>
            </Form.Item>
            <Form.Item >
              <Button htmlType="submit" tw="bg-success text-white ">Save</Button>
            </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}
