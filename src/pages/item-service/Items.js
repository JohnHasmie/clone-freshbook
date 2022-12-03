import { Checkbox, Menu, Popover, Table, Tooltip } from "antd";
import React, { useState } from "react";
import { Button } from "antd";
import InputSearch from "../../components/InputSearch";
import {
  DownOutlined,
  ExclamationCircleOutlined,
  HddOutlined,
  RestOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { numberWithDot } from "../../components/Utils";
import { Link, useHistory } from "react-router-dom";
import tw from "twin.macro";

export default function Items() {
  const history = useHistory();
  const queryClient = useQueryClient();

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

  const handleRemove = () => {
    const newChecked = [...checked];
    mutation.mutate(newChecked[0]);
    newChecked.splice(0, 1);
    setChecked(newChecked);
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={dataItems?.data?.data?.length === checked.length}
          className="font-normal"
          onChange={handleCheckAll}
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      width: "5%",
    },
    {
      title: "Name/Description",
      dataIndex: "name",
      key: "name",
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

  const data = dataItems?.data?.data
    ?.filter((x) => x.deleted_at == null)
    .map((item, i) => ({
      key: i,
      checkbox: (
        <Checkbox
          className="font-normal"
          value={item.id}
          checked={checked.includes(item.id)}
          onChange={(e) => handleCheck(e.target.value)}
        />
      ),
      name: (
        <div>
          <div tw="text-black">{item.name}</div>
          <span tw="text-gray-500">{item.description}</span>
        </div>
      ),
      current: item.qty,
      rate: <span>$ {numberWithDot(item.rate)}</span>,
    }));

  const onSearch = (value) => console.log(value);
  const mutation = useMutation(
    async (data) => {
      return axios.delete(`items/1/${data}`).then((res) => res.data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries("item-by-client");
        }, 500);
      },
    }
  );

  const bulkList = (
    <div tw="border border-[#7f8c9f]">
      <Menu>
        <Menu.Item>
          <div>
            <HddOutlined />
            <span>Archive</span>
          </div>
        </Menu.Item>

        <Menu.Item>
          <div onClick={handleRemove}>
            <RestOutlined />
            <span>Delete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );

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
            <span tw="text-xl font-bold text-black">
              Items
              <Tooltip placement="top" title="Ryan Tompson">
                <ExclamationCircleOutlined tw="mx-1 text-xs align-top" />
              </Tooltip>
            </span>
            {checked.length > 0 && (
              <>
                <RightOutlined tw=" ml-2" />
                <span tw="text-xl font-bold text-black ml-2">Selected</span>
                <span tw="align-middle bg-gray-300 text-black rounded-full px-2  mx-2">
                  {checked.length}
                </span>
                <Popover placement="bottom" content={bulkList} trigger="click">
                  <div className="flex items-center justify-center">
                    <Button>
                      <span tw="mr-2">Bulk Actions</span>
                      <DownOutlined />
                    </Button>
                  </div>
                </Popover>
              </>
            )}
          </div>
          <InputSearch placeholder="Search" prefix={<SearchOutlined />} />
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
              1-{dataItems?.data?.data?.length} of{" "}
              {dataItems?.data?.data?.length}{" "}
            </span>
          </div>
          <div tw="flex flex-col items-center">
            <button
              onClick={() => history.push("items/archived")}
              tw="cursor-pointer border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-400 "
            >
              View Archived Service
            </button>
            <p tw="text-xs text-gray-500">
              or{" "}
              <Link tw="underline text-gray-500" to="items/deleted">
                deleted
              </Link>
            </p>
          </div>
          <div tw="invisible">hide</div>
        </div>
      </div>
    </>
  );
}
