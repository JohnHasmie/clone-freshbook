import {Checkbox, Table, Tooltip } from "antd";
import React, { useState } from "react";
import {
  
  RightOutlined,
} from "@ant-design/icons";
import tw from "twin.macro";

import {  useHistory } from "react-router-dom";
import PaginationFooter from "../../components/layout/PaginationFooter";


export default function ClientsArchived() {
  const history = useHistory();

  const [checked, setChecked] = useState([]);
  const handleCheck = (v) => {
    const newChecked = [...checked];
    const findById = newChecked.find((x) => x === v);
    if (findById) {
      const findIndex = checked.indexOf(v);
      newChecked.splice(findIndex, 1);
    } else {
      newChecked.push(v);
    }
    setChecked(newChecked);
  };

  const data = [
    {
      key: "1",
      checkbox: "",
      organization: "",
      internal: "",

      credit: "",
      outstanding:"",
    },
  ];
  const handleCheckAll = () => {
    const all = data?.map((item) => item.key);
    if (data?.length === checked.length) {
      setChecked([]);
    } else {
      setChecked(all);
    }
  };
  const columns = [
    {
      title: (
        <Checkbox
          checked={data?.length === checked.length}
          className="font-normal"
          onChange={handleCheckAll}
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
    },
    {
      title: "Organization/Primary Contact",
      dataIndex: "organization",
      key: "organization",
      width: "30%",
    },
    {
      title: "Internal Note",
      dataIndex: "internal",
      key: "internal",
      width: "30%",
    },

    {
      title: "Credit",
      key: "credit",
      dataIndex: "credit",
    },

    {
      title: "Total Outstanding",
      key: "outstanding",
      dataIndex: "outstanding",
      width: "20%",
    },
  ];


  return (
    <>
      <div tw="w-full md:w-[98%] md:mb-5">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div tw="flex items-center">
            <span
              tw="text-xl cursor-pointer font-bold text-primary"
              onClick={() => history.push("/clients")}
            >
              All Clients
            </span>
            <RightOutlined tw=" ml-2" />
            <span tw="text-xl font-bold text-black ml-2">Archived</span>
           
          </div>
         
        </div>
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="ant-border-space"
          />
        </div>
        <div tw="flex justify-between mt-5">
              <div>
                <span tw="text-sm text-black font-bold">1-{data.length-1} of {data.length-1} </span>
              </div>
           
              <div ><PaginationFooter/></div>
            </div>
      
      </div>
    </>
  );
}
