import {
  CaretDownOutlined,
  DownOutlined,
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
  Card,
  Checkbox,
  Col,
  Form,
  Menu,
  Popover,
  Row,
  Table,
  Tabs,
  Typography,
} from "antd";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import tw from "twin.macro";
import CardClient from "../../components/CardClient";
import InputSearch from "../../components/InputSearch";
import Photo from "../../assets/images/mask-group.svg";
import AllClientTabs from "../../components/ClientsComponent/AllClientTabs";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import { FormAdvanceSearchEmail } from "./FormAdvanceSearch";
import TabHome from "./TabHome";

export default function Email() {
  const [form] = Form.useForm();
  const history = useHistory();

  const { Title } = Typography;
  const [isAdvance, setIsAdvance] = useState(false);

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
      checkbox: (
        <Checkbox
          className="font-normal"
          value={"1"}
          checked={checked.includes("1")}
          onChange={(e) => handleCheck(e.target.value)}
        />
      ),
      dateSent: (
        <div>
          <span>10/11/2022</span>
          <p>Heri Setiawan</p>
        </div>
      ),
      recipient: (
        <div>
          <span>First Client</span>
          <p>Company Name</p>
        </div>
      ),

      email: <span>Recurring Invoice</span>,
      subject: <span>Oasis Land sent you an invoice (00148)</span>,
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
          checked={data.length !== 0 && data?.length === checked.length}  disabled={data.length === 0}
          className="font-normal"
          onChange={handleCheckAll}
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      width: "5%",
    },
    {
      title: "Date Sent/Sender",
      dataIndex: "dateSent",
      key: "dateSent",
    },
    {
      title: "Recipient/ Organization",
      dataIndex: "recipient",
      key: "recipient",
    },

    {
      title: "Email Type",
      key: "email",
      dataIndex: "email",
    },

    {
      title: "Subject",
      key: "subject",
      dataIndex: "subject",
    },
  ];
  const bulkList = (
    <div tw="w-36">
      <Menu>
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
            <div onClick={()=>history.push('/clients/new')} tw="cursor-pointer border border-dashed flex w-72 rounded-md  mr-5 justify-center items-center">
              
                <div tw="flex flex-col">
                  <PlusOutlined tw="text-3xl text-green-400" />
                  <span tw="text-lg text-2xl font-bold">New Client</span>
                </div>
              </div>
              <Link to={`/clients/1/client-detail`}>
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
                      onClick={() => history.push("/clients/sent-email")}
                      tw="text-xl font-bold text-primary"
                    >
                      All Sent Emails
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
                  <span tw="text-xl font-bold text-black">
                    {" "}
                    All Sent Emails
                  </span>
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
                <FormAdvanceSearchEmail
                  form={form}
                  setIsAdvance={setIsAdvance}
                />
              </div>
            ) : (
              <></>
            )}
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
                <span tw="text-sm text-black font-bold">1-{data.length} of {data.length} </span>
              </div>
              <div tw="flex flex-col items-center">
                <button onClick={()=>history.push('/clients/sent-email/deleted')} tw="mb-3 cursor-pointer text-black border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-200 ">
                  View Deleted Emails{" "}
                </button>
                <p tw="text-xs text-gray-500">
                  Emails sent more than 90 days ago are automatically purged
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
