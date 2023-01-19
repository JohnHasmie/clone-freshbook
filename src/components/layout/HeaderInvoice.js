import {  useContext,useRef } from "react";
import { Popover, Button } from "antd";
import {
  DownOutlined,
  LeftOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation,useParams } from "react-router-dom";
import ButtonCustom from "../Button";
import tw from "twin.macro";
import ButtonMore from "../Reports/ButtonMore";

import MoreAction from "../Reports/MoreAction";
import InvoiceSetting from "../../pages/invoices/InvoiceSetting";
import AppContext from "../context/AppContext";
import { useQuery } from "react-query";
import axios from "axios";

const bell = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z"
      fill="#111827"
    ></path>
    <path
      d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z"
      fill="#111827"
    ></path>
  </svg>,
];

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

function HeaderInvoice({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) {
  const history = useHistory();
const {globalDetailInvoice,refInvoice}=useContext(AppContext)
let { pathname } = useLocation();
const { isFetching: excelIsFetching, refetch: excelRefetch } = useQuery(
  "export-excel",
  async () =>
    axios
      .get(`invoices/export`, {
        responseType: "blob",
      })
      .then((res) => {
        const href = URL.createObjectURL(res.data);

    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", "invoices.xlsx");
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
      }),
  {
    enabled: false,
  }
)
  return (
    <div tw="md:ml-24">
   {globalDetailInvoice &&   <div tw="grid grid-cols-1 gap-y-2 md:grid-cols-2">
        <div tw="flex justify-between md:hidden">
          <div>{bell}</div>
          <ButtonCustom
            tw="!bg-transparent !border-0 hover:opacity-50"
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
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
            <span tw="ml-1">Invoices</span>
          </button>
        </div>
        <div tw="flex items-center">
          <span tw="capitalize text-2xl font-bold">{pathname.includes('recurring')? 'Recurring Template' : 'Invoice'} {globalDetailInvoice?.code}</span>
          <Popover placement="bottom" content={InvoiceSetting} trigger="click">
            <UnorderedListOutlined tw="ml-3 text-xl" />
          </Popover>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <Popover placement="bottom" content={<MoreAction myRef={{id:globalDetailInvoice?.id}} excelRefetch={excelRefetch} />} trigger="click">
            <ButtonMore >
              <span>More Actions</span>
              <DownOutlined />
            </ButtonMore>
          </Popover>

          <Button tw=" md:ml-2 bg-success text-white flex justify-center items-center ">
            <span tw="text-lg" onClick={()=>history.push(`/invoices/${globalDetailInvoice.id}/edit`)}>Edit</span>
          </Button>
        </div>
      </div>}
    </div>
  );
}

export default HeaderInvoice;
