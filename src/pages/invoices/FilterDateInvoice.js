import { Button, DatePicker, Form, Input, notification, Radio } from "antd";
import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import CardPopup from "../../components/CardPopup";
import moment from "moment";

const dateFormat = "DD/MM/YYYY";

export default function FilterDateInvoice({ hide, localSearchProps }) {

  const [localSearch, setLocalSearch] = localSearchProps;


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    setLocalSearch({
      ...localSearch,
      start_date: localSearch.start_date,
      end_date: localSearch.end_date,
      date_type: localSearch.date_type,
    });
   
    hide();
  };
  return (
    <>
      <CardPopup>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          size="large"
  tw="mt-10"
        >
          <div tw="grid grid-cols-2">
            <Form.Item name="start_date" tw="px-2 pt-2">
              <DatePicker
              tw="rounded-md"
                placeholder="start"
                onChange={(date, dateString) =>
                  setLocalSearch({ ...localSearch, start_date: dateString })
                }
                value={
                  localSearch.start_date &&
                  moment(new Date(localSearch.start_date), dateFormat)
                }
                format={dateFormat}
              />
            </Form.Item>

            <Form.Item name="end_date" tw="px-2 pt-2">
              <DatePicker
              tw="rounded-md"
                placeholder="end"
                onChange={(date, dateString) =>
                  setLocalSearch({ ...localSearch, end_date: dateString })
                }
                value={
                  localSearch.end_date &&
                  moment(new Date(localSearch.end_date), dateFormat)
                }
                format={dateFormat}
              />
            </Form.Item>

            <Radio.Group
              tw="col-span-2 px-2"
              onChange={(e) =>
                setLocalSearch({ ...localSearch, date_type: e.target.value })
              }
              value={localSearch.date_type}
            >
              <Radio value={"last_invoice"}>Last Invoiced</Radio>
              <Radio value={"issued_at"}>Issued Date</Radio>
            </Radio.Group>
          </div>

          <div tw="flex justify-end border-t border-gray-200 mt-5 pt-5 pr-5">
            <Form.Item>
              <Button onClick={hide} tw="mr-2">
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" tw="bg-success text-white ">
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}


export function FilterDateEmail({ hide, localSearchProps }) {

  const [localSearch, setLocalSearch] = localSearchProps;


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    setLocalSearch({
      ...localSearch,
      start_date: localSearch.start_date,
      end_date: localSearch.end_date,
      date_type: localSearch.date_type,
    });
   
    hide();
  };
  return (
    <>
      <CardPopup>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          size="large"
  tw="mt-10"
        >
          <div tw="grid grid-cols-2">
            <Form.Item name="start_date" tw="px-2 pt-2">
              <DatePicker
              tw="rounded-md"
                placeholder="start"
                onChange={(date, dateString) =>
                  setLocalSearch({ ...localSearch, start_date: dateString })
                }
                value={
                  localSearch.start_date &&
                  moment(new Date(localSearch.start_date), dateFormat)
                }
                format={dateFormat}
              />
            </Form.Item>

            <Form.Item name="end_date" tw="px-2 pt-2">
              <DatePicker
              tw="rounded-md"
                placeholder="end"
                onChange={(date, dateString) =>
                  setLocalSearch({ ...localSearch, end_date: dateString })
                }
                value={
                  localSearch.end_date &&
                  moment(new Date(localSearch.end_date), dateFormat)
                }
                format={dateFormat}
              />
            </Form.Item>

         
          </div>

          <div tw="flex justify-end border-t border-gray-200 mt-5 pt-5 pr-5">
            <Form.Item>
              <Button onClick={hide} tw="mr-2">
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" tw="bg-success text-white ">
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}
