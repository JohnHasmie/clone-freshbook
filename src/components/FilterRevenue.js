import { DatePicker, Form, Input, Select } from "antd";
import React, { useState } from "react";
import CardPopup from "./CardPopup";
import tw from "twin.macro";
import moment from "moment";

export default function FilterRevenue({filterRevenueProps}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterPayment, setFilterPayment] = filterRevenueProps;
const dateFormat = "DD/MM/YYYY";
  


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <>
      <CardPopup title="Filters">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="row-col"
          tw="p-5"
          size="large"
          fields={[
            {name:["start_at"],
          value: filterPayment.start_at  && moment(filterPayment.start_at, dateFormat) 
          },
          {name:["finish_at"],
          value: filterPayment.finish_at && moment(filterPayment.finish_at, dateFormat) 
          },
          {name:["currency"],
          value:filterPayment.currency
          }
          ]}
        >
          <div tw="grid grid-cols-2 gap-x-5">
              <Form.Item
                    name="start_at"
                
                  >

                    <DatePicker
                      onChange={(date, dateString) =>
                        setFilterPayment({ ...filterPayment, start_at: dateString })
                      }
                      tw="rounded-md"
                   
                      format={dateFormat}
                    />
                  </Form.Item>
                  <Form.Item
                    name="finish_at"
                
                  >

                    <DatePicker
                      onChange={(date, dateString) =>
                        setFilterPayment({ ...filterPayment, finish_at: dateString })
                      }
                      tw="rounded-md"
                     
                      format={dateFormat}
                    />
                  </Form.Item>
            <Form.Item tw="col-span-2"      name="currency">
                <Select
            
                 
                 onChange={(e) =>
                  setFilterPayment({ ...filterPayment, currency: e })
                }
                options={[
                  {
                    value: "USD",
                    label: "USD - US dollar",
                  },
                  {
                    value: "GBP",
                    label: "GBP - Pound Sterling",
                  },
                ]}
                />
              </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}
