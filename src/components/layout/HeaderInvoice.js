import { useEffect } from "react";
import { Popover, Button } from "antd";
import {
  DownOutlined,
  LeftOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import ButtonCustom from "../Button";
import tw from "twin.macro";
import ButtonMore from "../Reports/ButtonMore";

import MoreAction from "../Reports/MoreAction";
import InvoiceSetting from "../../pages/invoices/InvoiceSetting";

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


  return (
    <div tw="md:ml-24">
      <div tw="grid grid-cols-1 gap-y-2 md:grid-cols-2">
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
        <div tw="flex items-end">
          <span tw="capitalize text-3xl font-bold">Invoice 00146</span>
          <Popover placement="bottom" content={InvoiceSetting} trigger="click">
            <UnorderedListOutlined tw="ml-3 text-2xl" />
          </Popover>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <Popover placement="bottom" content={MoreAction} trigger="click">
            <ButtonMore>
              <span>More Actions</span>
              <DownOutlined />
            </ButtonMore>
          </Popover>

          <Button tw="!py-6 md:ml-2 bg-success text-white flex justify-center items-center ">
            <span tw="text-lg">Edit</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeaderInvoice;
