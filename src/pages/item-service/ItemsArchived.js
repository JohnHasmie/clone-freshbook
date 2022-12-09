import { Checkbox, Table } from "antd";
import React, { useState } from "react";
import { Typography } from "antd";
import { Button } from "antd";
import Search from "antd/lib/transfer/search";
import InputSearch from "../../components/InputSearch";
import { RightOutlined, SearchOutlined } from "@ant-design/icons";
import tw from "twin.macro";
import { useQuery } from "react-query";
import axios from "axios";
import { numberWithDot } from "../../components/Utils";
import { Link, useHistory } from "react-router-dom";
import PaginationFooter from "../../components/layout/PaginationFooter";

const { Title } = Typography;

export default function ItemsArchived() {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [checked, setChecked] = useState([]);
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
  });

  const { data: dataItems, status } = useQuery(
    ["item-by-client", filter],
    async (key) =>
      axios
        .get("items/1", {
          params: key.queryKey[1],
        })
        .then((res) => res.data)
  );
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

  const handleCheckAll = () => {
    const all = dataItems?.data?.data?.map((item, i) => item.id);
    if (dataItems?.data?.data?.length === checked.length) {
      setChecked([]);
    } else {
      setChecked(all);
    }
  };

  const columns = [
    {
      title: (
        <Checkbox
        checked={checked.length !== 0 && dataItems?.data?.data?.length === checked.length}
        disabled={dataItems?.data?.data?.length === 0}
          className="font-normal"
          onChange={handleCheckAll}
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "80%",
    },
    {
      title: "Current Stock",
      dataIndex: "current",
      key: "current",
    },

    {
      title: "Rate/Taxes",
      key: "rate",
      dataIndex: "rate",
    },
  ];

  const data = [];

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
              onClick={() => history.push("/items")}
            >
              Items
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
