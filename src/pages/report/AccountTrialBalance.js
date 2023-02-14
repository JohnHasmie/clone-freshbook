import { DownOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  notification,
  Popover,
  Row,
  Select,
} from "antd";
import React, { useState, useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import MoreAction, { MoreActionCSV } from "../../components/Reports/MoreAction";
import SendEmail, { SendEmailDefault } from "../../components/Reports/SendEmail";
import ButtonCustom from "../../components/Button/index";
import { bell, toggler } from "../../components/Icons";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { getTotalGlobal, numberWithDot } from "../../components/Utils";
import moment from "moment";
import AppContext from "../../components/context/AppContext";

const dateFormat = "DD/MM/YYYY";

export default function AccountTrialBalance() {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleClickChange = (open) => {
    setClicked(open);
  };
  const ref = useRef();
  const { user } = useContext(AppContext);
  const [newUser, setNewUser] = useState(
    JSON.parse(localStorage.getItem("newUser")) || { data: "" }
  );
  const [form] = Form.useForm();
  const [filter, setFilter] = useState({
    start_at: new Date(),
    finish_at:moment().endOf('year'),
    currency: "USD",
  });
  const myRef = useRef(null);

  const hide = () => {
    setClicked(false);
  };
  let history = useHistory();
  const onFinish = (values) => {
    // console.log(values,"values")
    setFilter({
      start_at: values.start_at._d,
      finish_at:values.finish_at._d,
      currency: values.currency === undefined ? "USD" : values.currency,
    });
    setOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const FilterAccountTrialBalance = (
    <div tw="mt-3">
      <div tw="flex justify-between mb-5">
        <span tw="text-2xl font-bold">Filters</span>
        {/* <div tw="grid">
            <span tw="text-xs text-primary uppercase">Balance date</span>
        </div> */}
        <span
          tw="text-xs text-primary cursor-pointer"
          onClick={() => setFilter({
            start_at: new Date(),
            finish_at:moment().endOf('year'),
            currency: "USD",
          })}
        >
          Reset All
        </span>
      </div>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        form={form}
        tw="mt-5"
        fields={[
          { name: ["start_at"], value:  filter.start_at
          ? moment(new Date(filter.start_at), dateFormat)
          : "" },
          { name: ["finish_at"], value: filter.finish_at
          ? moment(new Date(filter.finish_at), dateFormat)
          : "" },
          {
            name: ["currency"],
            value: filter?.currency,
          },
        ]}
        initialValues={{}}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="start_at">
              <DatePicker
                tw="w-full rounded-md"
             
                format={dateFormat}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="finish_at">
              <DatePicker
                tw="w-full rounded-md"
               
                format={dateFormat}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Currency" name="currency">
              <Select
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
          </Col>
          {/* <Col span={24}>
            <Form.Item name="date">
              <Checkbox>Compare Dates</Checkbox>
            </Form.Item>
          </Col> */}
          <Divider />
          <Col span={12}>
            <Button tw="text-lg px-8" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => form.submit()}
              tw="text-lg text-white bg-success px-8"
            >
              Apply
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
  const { data: dataTrial, status: statusTrial } = useQuery(
    ["trial-balance", filter],
    async (key) =>
      axios
        .get("reports/accounting/trial-balance", {
          params: key.queryKey[1],
        })
        .then((res) => res.data)
  );
  const { isFetching: excelIsFetching, refetch: excelRefetch } = useQuery(
    ["export-excel",{...filter,export:true}],
    async (key) =>
      axios
        .get(`reports/accounting/trial-balance`, {
          params: key.queryKey[1],
          responseType: "blob",
        })
        .then((res) => {
          const href = URL.createObjectURL(res.data);

      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "trial_balance.csv");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(href);
        }),
    {
      enabled: false,
    }
  )
  useEffect(() => {
    if(user){
      localStorage.setItem("newUser", JSON.stringify(user))
      setFilter({ ...filter, currency: user?.data?.base_currency })
    };
    if(newUser){
      setFilter({ ...filter, currency: newUser?.data?.base_currency })
    };
  }, [user || newUser]);


  const headers = [
    { label: "Account Number", key: "accountNumber" },
    { label: "Account Sub Type", key: "accountSubType" },
    { label: "Parent Account: Sub Account", key: "parentAccountSub" },
    { label: "Debit", key: "debit" },
    { label: "Credit", key: "credit" },
    { label: "Currency", key: "currency" },


  ];

  const data =statusTrial === "success" && [
    { accountNumber: "1001-1", accountSubType: "Cash&Bank", parentAccountSub: "Cash: Petty Cash", debit: dataTrial?.data?.petty_cash !== null &&
    numberWithDot(
      Math.round(dataTrial?.data?.petty_cash * 100) / 100
    ),credit: "0.00",currency: filter?.currency },
    { accountNumber: "1001-1", accountSubType: "Current Asset", parentAccountSub: "Accounts Receivable: Accounts Receivable", debit: dataTrial?.data?.accounts_receivable !== null &&
    numberWithDot(
      Math.round(dataTrial?.data?.accounts_receivable * 100) / 100
    ),credit: "0.00",currency: filter?.currency },
    { accountNumber: "1001-1", accountSubType: "Current Liability", parentAccountSub: "Customer Credit: Customer Credit", debit: "0.00",credit: "0.00",currency: filter?.currency },
    { accountNumber: "1001-1", accountSubType: "Income", parentAccountSub: "Revenue: Discounts", debit: dataTrial?.data?.accounts_receivable !== null &&
    numberWithDot(
      Math.round(dataTrial?.data?.accounts_receivable * 100) / 100
    ),credit: "0.00",currency: filter?.currency },
    { accountNumber: "1001-1", accountSubType: "Income", parentAccountSub: "Revenue: Sales", debit: "0.00",credit: "0.00",currency: filter?.currency },
    { accountNumber: "1001-1", accountSubType: "", parentAccountSub: "Total", debit:   getTotalGlobal(Object.values(dataTrial?.data)),credit: "0.00",currency: filter?.currency },
  ];
  const { data: dataClients, statusClients } = useQuery(
    ["clients"],
    async (key) =>
      axios
        .get("clients")
        .then((res) => res.data.data)
  );
  const mutation = useMutation(
    async (data) => {
      return axios.post(`reports/accounting/trial-balance/send`, {...data,...filter}).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        notification.success({
          message: `Account Trial Balance has been sent`,
          placement: "topLeft",
        });
        hide()
      },
      onError: (err) => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
        hide()

        console.log(err.response.data.message);
      },
    }
  );
  const csvReport = {
    data: data,
    headers: headers,
    filename: 'trial_balance.csv'
  };
  return (
    <div tw="max-w-screen-lg mx-auto">
      <div tw="grid grid-cols-1 gap-y-2 md:grid-cols-2 mx-5">
        <div tw="flex justify-between md:hidden">
          <div>{bell}</div>
          <ButtonCustom
            tw="!bg-transparent !border-0 hover:opacity-50"
            type="link"
            className="sidebar-toggler"
            // onClick={() => onPress()}
          >
            {toggler}
          </ButtonCustom>
        </div>
        <div tw="md:col-span-2">
          <button
            onClick={() => history.goBack()}
            tw="bg-transparent flex items-center mt-5 text-primary cursor-pointer"
          >
            <LeftOutlined />
            <span tw="ml-1">Reports</span>
          </button>
        </div>
        <div tw="flex items-center">
          <span tw="capitalize text-4xl font-bold text-black">
            Trial Balance
          </span>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <Popover
            placement="bottom"
          content={<MoreAction myRef={myRef}  excelRefetch={excelRefetch} />}

            trigger="click"
          >
            <ButtonMore tw="w-full">
              <span>More Actions</span>
              <DownOutlined />
            </ButtonMore>
          </Popover>
          <Popover
            placement="bottom"
            // content={<SendEmail hide={hide} />}
            content={
              <SendEmailDefault
                hide={hide}
                dataClients={dataClients}
                user={newUser}
                mutation={mutation}
              />
            }
            trigger="click"
            visible={clicked}
            onVisibleChange={handleClickChange}
          >
            <Button tw=" md:ml-2 bg-success text-white px-4  flex justify-center items-center ">
              <span tw="text-lg">Send...</span>
            </Button>
          </Popover>
        </div>
      </div>

      <div tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5">
        <div ref={myRef} tw="md:col-span-9 mb-10 mt-10 md:mt-2">
          <CardReporting>
            <h1 tw="text-blueDefault">Trial Balance</h1>
            <div tw="grid">
              <span tw="text-xs">
                {" "}
                {user?.data?.company_name || newUser?.data?.company_name}
              </span>
              <span tw="text-xs">
                {" "}
                For {moment(new Date(filter.start_at)).format("MMM DD, YYYY")} - {moment(new Date(filter.finish_at)).format("MMM DD, YYYY")}
              </span>
            </div>
            {statusTrial === "loading" && (
              <div
                role="status"
                tw="flex flex-col w-full h-full items-center justify-center"
              >
                <svg
                  tw="inline mr-2 w-52 h-52 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}

            {statusTrial === "success" && (
              <div tw="overflow-x-auto mt-10">
                <table>
                  <thead>
                    <tr>
                      <th tw="text-left py-4 ">Summary of Accounts</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr tw="text-left text-sm border-b  border-gray-200">
                      <th tw="py-1 font-bold py-2">
                        Sub Account / Parent Account
                      </th>
                      <th tw="py-1 font-bold"> Type / Sub Type</th>
                      <th tw="py-1 font-bold hidden">Number</th>
                      <th tw="py-1 font-bold"> Debit</th>
                      <th tw="py-1 font-bold text-right"> Credit</th>
                    </tr>

                    <tr tw="text-left text-sm border-b border-dotted   border-gray-200">
                      <td>
                        <div tw="grid py-2">
                          <span tw="text-primary">Petty Cash</span>
                          <span>Cash</span>
                        </div>
                      </td>
                      <td>
                        <div tw="grid">
                          <span tw="font-bold">Asset</span>
                          <span>Cash & Bank</span>
                        </div>
                      </td>
                      <td tw="hidden">1000-1</td>
                      <td>
                        {dataTrial?.data?.petty_cash !== null &&
                          numberWithDot(
                            Math.round(dataTrial?.data?.petty_cash * 100) / 100
                          )}
                      </td>
                      <td tw="text-right">
                        {dataTrial?.data?.petty_cash !== null &&
                          numberWithDot(Math.round(dataTrial?.data?.petty_cash * 100) / 100)}
                      </td>
                    </tr>

                    <tr tw="text-left text-sm border-b border-dotted   border-gray-200">
                      <td>
                        <div tw="grid py-2">
                          <span tw="text-primary">Accounts Receivable</span>
                          <span>Accounts Receivable</span>
                        </div>
                      </td>
                      <td>
                        <div tw="grid">
                          <span tw="font-bold">Asset</span>
                          <span>Current Asset</span>
                        </div>
                      </td>
                      <td tw="hidden">1000-1</td>
                      <td>
                        {dataTrial?.data?.accounts_receivable !== null &&
                          numberWithDot(Math.round(dataTrial?.data?.accounts_receivable * 100) / 100)}
                      </td>
                      <td tw="text-right">
                        {dataTrial?.data?.accounts_receivable !== null &&
                          numberWithDot(Math.round(dataTrial?.data?.accounts_receivable * 100) / 100)}
                      </td>
                    </tr>
                    <tr tw="text-left text-sm border-b border-dotted   border-gray-200">
                      <td>
                        <div tw="grid">
                          <span tw="text-primary">Discounts</span>
                          <span>Revenue</span>
                        </div>
                      </td>
                      <td>
                        <div tw="grid py-2">
                          <span tw="font-bold">Income</span>
                          <span>Income</span>
                        </div>
                      </td>
                      <td tw="hidden">1000-1</td>
                      <td>
                        {dataTrial?.data?.discounts !== null &&
                          numberWithDot(Math.round(dataTrial?.data?.discounts * 100) / 100)}
                      </td>
                      <td tw="text-right">
                        {dataTrial?.data?.discounts !== null &&
                          numberWithDot(Math.round(dataTrial?.data?.discounts * 100) / 100)}
                      </td>
                    </tr>
                    <tr tw="text-left text-sm border-b border-dotted   border-gray-200">
                      <td>
                        <div tw="grid">
                          <span tw="text-primary">Sales</span>
                          <span>Revenue</span>
                        </div>
                      </td>
                      <td>
                        <div tw="grid py-2">
                          <span tw="font-bold">Income</span>
                          <span>Income</span>
                        </div>
                      </td>
                      <td tw="hidden">1000-1</td>
                      <td>-</td>
                      <td tw="text-right">-</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="double">
                      <th tw="text-left text-sm text-primary pt-3 ">
                        Total Assets
                      </th>
                      <td tw="invisible">hide</td>
                      <td tw="text-left pt-3">
                        <div tw="grid">
                          <span tw="font-bold">
                            {getTotalGlobal(Object.values(dataTrial?.data)?.map((item)=>{
    const splitAmount=item?.split(".")
    return parseInt(splitAmount[0]);
  }))}
                          </span>
                          <span tw="font-light text-sm">{filter.currency}</span>
                        </div>
                      </td>
                      <td tw="text-right pt-3">
                        <div tw="grid">
                          <span tw="font-bold">
                            {getTotalGlobal(Object.values(dataTrial?.data)?.map((item)=>{
    const splitAmount=item?.split(".")
    return parseInt(splitAmount[0]);
  }))}
                          </span>
                          <span tw="font-light text-sm">{filter.currency}</span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </CardReporting>
        </div>

        <Filter
          Filtering={FilterAccountTrialBalance}
          setOpen={setOpen}
          open={open}
        />
      </div>
    </div>
  );
}
