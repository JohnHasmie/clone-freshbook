// import { Button, Col, Divider, Form, Input, Modal, Select } from "antd";
// import React, { useState } from "react";
// import CardPopup from "./CardPopup";
// import tw from "twin.macro";

// export default function FilterRecurring() {

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };
//   const onFinish = (values) => {
//     console.log("Success:", values);
//   };
//   return (
//     <>
//       <CardPopup title="Choose a Date Range">
//         <Form
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           layout="vertical"
//           className="row-col"
//           tw="p-5"
//         >
//            <Form.Item  name="time"     >
//                 <Select
//              style={{width:'100%'}}
//                   defaultValue="last-12month"
             
//                   options={[
//                     {
//                       value: "last-12month",
//                       label: "Last 12 Months",
//                     },
//                     {
//                       value: "next-12month",
//                       label: "Next 12 Months",
//                     },
//                   ]}
//                 />
//               </Form.Item>
//               <Form.Item label="Currency"       name="currency">
//                 <Select
//              style={{width:'100%'}}
            
//                   defaultValue="usd"
              
//                   options={[
//                     {
//                       value: "usd",
//                       label: "USD - US dollar",
//                     },
//                     {
//                       value: "idr",
//                       label: "IDR - Rupiah",
//                     },
//                   ]}
//                 />
//               </Form.Item>

       
//         </Form>
//       </CardPopup>
//     </>
//   );
// }


import { DatePicker, Form, Input, Select } from "antd";
import React, { useState } from "react";
import CardPopup from "./CardPopup";
import tw from "twin.macro";
import moment from "moment";

export default function FilterRecurring({filterRecurringProps}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterRecurring, setFilterRecurring]  = filterRecurringProps;
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
          value: filterRecurring.start_at  && moment(filterRecurring.start_at, dateFormat) 
          },
          {name:["finish_at"],
          value: filterRecurring.finish_at && moment(filterRecurring.finish_at, dateFormat) 
          },
          {name:["currency"],
          value:filterRecurring.currency
          }
          ]}
        >
          <div tw="grid grid-cols-2 gap-x-5">
              <Form.Item
                    name="start_at"
                
                  >

                    <DatePicker
                      onChange={(date, dateString) =>
                        setFilterRecurring({ ...filterRecurring, start_at: dateString })
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
                        setFilterRecurring({ ...filterRecurring, finish_at: dateString })
                      }
                      tw="rounded-md"
                     
                      format={dateFormat}
                    />
                  </Form.Item>
            <Form.Item tw="col-span-2"      name="currency">
                <Select
            
                 
                 onChange={(e) =>
                  setFilterRecurring({ ...filterRecurring, currency: e })
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
