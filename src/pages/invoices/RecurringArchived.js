import { Checkbox, Table, Tooltip } from "antd";
import React, { useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import tw from "twin.macro";

import { useHistory } from "react-router-dom";
import PaginationFooter from "../../components/layout/PaginationFooter";

export default function RecurringArchived() {
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

  const data = [];
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
          className="font-normal"
          checked={data.length !== 0 && data?.length === checked.length}  disabled={data.length === 0}
          onChange={handleCheckAll}

        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      width: "5%",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Last Issued",
      dataIndex: "last_issued",
      key: "last_issued",
    },

    {
      title: "Frequency /Duration",
      key: "frequency_duration",
      dataIndex: "frequency_duration",
    },

    {
      title: "Amount / Status",
      key: "amount",
      dataIndex: "amount",
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
            <span tw="text-sm text-black font-bold">
              1-{data.length - 1} of {data.length - 1}{" "}
            </span>
          </div>

          <div>
            <PaginationFooter />
          </div>
        </div>
      </div>
    </>
  );
}
