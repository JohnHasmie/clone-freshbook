import {
  CaretDownOutlined,

  DownOutlined,
  EditOutlined,
  HddOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  RestOutlined,
  RightOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Menu,
  Popover,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardClient from "../../components/CardClient";
import Photo from "../../assets/images/mask-group.svg";
import AllClientTabs from "../../components/ClientsComponent/AllClientTabs";
import TableCustom from "../../components/Button copy/index";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import FormAdvanceSearch from "./FormAdvanceSearch";
import TabHome from "./TabHome";

export default function Clients() {
  const { Title, Text } = Typography;
  const history = useHistory();
  const [isAdvance, setIsAdvance] = useState(false);
  const [form] = Form.useForm();
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
console.log(checked,"Check");
  const data = [
    {
      key: "1",
      checkbox: (
        <Checkbox
          className="font-normal"
          value={1}
          checked={checked.includes(1)}
          onChange={(e) => handleCheck(e.target.value)}
        />
      ),
      organization: (
        <div>
          <h3>Company Name</h3>
          <p>First Client</p>
        </div>
      ),
      internal: <span></span>,

      credit: <span></span>,
      outstanding: (
        <div tw="grid justify-start relative">
          <div
            className="isVisible"
            tw="absolute bottom-10 flex invisible rounded-full bg-white shadow-sm border border-gray-200  "
          >
            <div tw="hover:bg-gray-100 ">
              <Tooltip placement="top" title="edit">
                <EditOutlined tw="px-2 py-1  " />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100  border-l border-r border-gray-200 ">
              <Tooltip placement="top" title="archive">
                <HddOutlined tw="px-2 py-1 " />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100 ">
              <Tooltip placement="top" title="delete">
                <RestOutlined tw="px-2 py-1 " />
              </Tooltip>
            </div>
          </div>
          <span tw="font-bold text-black text-right">$20,000,000.00</span>
        </div>
      ),
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
  const bulkList = (
    <div tw="w-36">
      <Menu>
        <Menu.Item>
          <div>
            <EditOutlined />
            <span>Edit</span>
          </div>
        </Menu.Item>

        <Menu.Item>
          <div>
            <HddOutlined />
            <span>Archive</span>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div>
            <RestOutlined />
            <span>Delete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <>
      <div className="layout-content">
        <div tw="max-w-screen-lg mb-20">
          <TabHome />
          <div tw="hidden md:block mt-20">
            <Title level={4}>Recently Active</Title>
            <div tw="flex">
              <div tw="border border-dashed flex w-72 rounded-md  mr-5 justify-center items-center">
                <div tw="flex flex-col">
                  <PlusOutlined tw="text-3xl text-green-400" />
                  <span tw="text-lg text-2xl font-bold">New Client</span>
                </div>
              </div>
              <Link to={`clients/1/client-detail`}>
                <CardClient
                  title="Default size card"
                  size="small"
                  style={{
                    width: 300,
                  }}
                >
                  <div tw="flex justify-around">
                    <img src={Photo} alt="profile" tw="w-14 h-14" />
                    <div tw="grid">
                      <h3 tw="font-bold text-lg">Card content</h3>
                      <p tw="text-sm">Company Name</p>
                    </div>
                  </div>
                  <div>
                    <MailOutlined tw="mr-1" />
                    <span>kywu@mailinator.com</span>
                  </div>
                  <div>
                    <PhoneOutlined tw="mr-1" />
                    <span>+6289669235897</span>
                  </div>
                </CardClient>
              </Link>
            </div>
          </div>
          <div tw="mt-20">
            <AllClientTabs />
            <div tw="grid md:flex justify-between mb-4">
              <div tw="flex items-center">
                {checked.length > 0 ? (
                  <>
                    <span
                      onClick={() => history.push("clients")}
                      tw="text-xl font-bold text-primary"
                    >
                      Clients
                    </span>

                    <RightOutlined tw=" ml-2" />
                    <span tw="text-xl font-bold text-black ml-2">Selected</span>
                    <span tw="align-middle bg-gray-300 text-black rounded-full px-2  mx-2">
                      {checked.length}
                    </span>
                    <Popover
                      placement="bottom"
                      content={bulkList}
                      trigger="click"
                    >
                      <div className="flex items-center justify-center">
                        <Button>
                          <span tw="mr-2">Bulk Actions</span>
                          <DownOutlined />
                        </Button>
                      </div>
                    </Popover>
                  </>
                ) : (
                  <span tw="text-xl font-bold text-black">All Clients</span>
                )}
              </div>
              <div tw="flex relative cursor-pointer">
                <InputAdvanceSearch placeholder="Search" prefix={<SearchOutlined />} />
                <div
                  onClick={() => setIsAdvance(!isAdvance)}
                  tw="inline-flex rounded-r-full border border-gray-300 justify-center items-center w-36"
                >
                  <UnorderedListOutlined />
                  <span tw="text-xs ml-2">Advanced Search </span>
                  <CaretDownOutlined tw="ml-1" />
                </div>
              </div>
            </div>
            {isAdvance ? (
              <div tw="bg-gray-100 border-y-2 border-gray-400 p-3 mb-4">
                <FormAdvanceSearch form={form} setIsAdvance={setIsAdvance} />
              </div>
            ) : (
              <></>
            )}
            <div className="table-responsive">
              <TableCustom
                columns={columns}
                dataSource={data}
                pagination={false}
                className="ant-border-space"
              />
            </div>
            <div tw="flex justify-between mt-5">
              <div>
                <span tw="text-sm text-black font-bold">1-{data.length} of {data.length} </span>
              </div>
              <div tw="flex flex-col items-center">
                <button
                  onClick={() => history.push("clients/archived")}
                  tw="cursor-pointer border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-400 "
                >
                  View Archived Service
                </button>
                <p tw="text-xs text-gray-500">
                  or{" "}
                  <Link tw="underline text-gray-500" to="clients/deleted">
                    deleted
                  </Link>
                </p>
              </div>
              <div tw="invisible">hide</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
