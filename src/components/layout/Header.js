import { useState, useEffect } from "react";
import { Divider, Popover, Menu } from "antd";
import {
  DownOutlined,
  UserOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  LeftOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { NavLink, useHistory } from "react-router-dom";
import ButtonCustom from "../Button";
import tw from "twin.macro";
import ButtonInvite from "../ButtonInvite";
import TabsSettting from "./TabsSettting";
import {
  MoreActionClients,
  MoreActionClientsDetail,
} from "../Reports/MoreAction";
import NewItem from "../NewItem";

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

function Header({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) {
  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };

  // useEffect(() => window.scrollTo(0, 0));

  const content = (
    <div className="user-pop">
      <ul>
        <li>
          <NavLink to="/global-settings" className="navlink ">
            <UserOutlined style={{ marginTop: "4px" }} />
            <div className="flex-col flex " style={{ marginLeft: "12px" }}>
              <span className="text-base">Admin/Manager</span>
              <p className="text-xs ">
                They get full access to your FreshBooks account including
                clients, invoices, and reports
              </p>
            </div>
          </NavLink>
        </li>
        <Divider style={{ margin: "0" }} />
        <li>
          <NavLink to="/global-settings" className="navlink">
            <UserOutlined style={{ marginTop: "4px" }} />
            <div className="flex flex-col" style={{ marginLeft: "12px" }}>
              <span className="text-base">Employee</span>
              <p className="text-xs ">
                They get full access to your account, but can't see financial
                reports, expenses or the dashboard
              </p>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
  const createList = (
    <div>
      <Menu theme="light" mode="inline">
        <Menu.Item>
          <NavLink to="/global-settings">
            <AppstoreOutlined />
            <span>Client</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item>
          <NavLink to="/invoices/new">
            <FileDoneOutlined />
            <span>Invoice</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/invoices/new">
            <FileTextOutlined />
            <span>Recurring Template</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
  const createListItems = (
    <div tw="w-full md:w-44">
      <Menu theme="light" mode="inline">
        <Menu.Item>
          <NavLink to="/global-settings">
            <ContainerOutlined />
            <span>Item</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
  const createListClients = (
    <div>
      <Menu theme="light" mode="inline">
        <Menu.Item>
          <NavLink to="/invoices/new">
            <FileDoneOutlined />
            <span>Invoice</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/invoices/new">
            <FileTextOutlined />
            <span>Recurring Template</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );

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
        fill="#000"
      ></path>
      <path
        d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z"
        fill="#000"
      ></path>
    </svg>,
  ];
  return (
    <>
      {name.includes("dashboard") && (
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
          <div tw="flex items-center">
            <span tw="capitalize text-4xl font-bold">
              {subName.replace("/", "")}
            </span>
          </div>
          <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
            <Popover placement="bottom" content={content} trigger="click">
              <ButtonInvite tw="!py-6 md:mr-5">
                <span>Invite</span>
                <DownOutlined />
                {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              tw="fill-blue-500"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg> */}
              </ButtonInvite>
            </Popover>
            <Popover placement="bottom" content={createList} trigger="click">
              <ButtonCustom tw="!py-6 bg-success text-white">
                <span>Create New... </span>
                <DownOutlined />

                {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                tw="text-gray-500"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg> */}
              </ButtonCustom>
            </Popover>
          </div>

          <Divider tw="md:col-span-2" />
        </div>
      )}

      {name.includes("clients") && name.includes(`detail`) ? (
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
              <span tw="ml-1">Clients</span>
            </button>
          </div>
          <div tw="flex items-center">
            <span tw="capitalize text-4xl font-bold">Boni Syahrudin Inc</span>
          </div>
          <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
            <Popover
              placement="bottom"
              content={MoreActionClientsDetail}
              trigger="click"
            >
              <ButtonInvite tw="!py-6 md:mr-5">
                <span>More Actions</span>
                <DownOutlined />
              </ButtonInvite>
            </Popover>
            <Popover
              placement="bottom"
              content={createListClients}
              trigger="click"
            >
              <ButtonCustom tw="!py-6 bg-success text-white">
                <span>Create New... </span>
                <DownOutlined />
              </ButtonCustom>
            </Popover>
          </div>

          <Divider tw="md:col-span-2" />
        </div>
      ) : (
        name.includes("clients") &&  (
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
            <div tw="flex items-center">
              <span tw="capitalize text-4xl font-bold">Clients</span>
            </div>
            <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
              <Popover
                placement="bottom"
                content={MoreActionClients}
                trigger="click"
              >
                <ButtonInvite tw="!py-6 md:mr-5">
                  <span>More Actions</span>
                  <DownOutlined />
                </ButtonInvite>
              </Popover>
              <ButtonCustom
                onClick={() => history.push(`/clients/new`)}
                tw="!py-6 bg-success text-white"
              >
                <span>New Client </span>
              </ButtonCustom>
            </div>

            <Divider tw="md:col-span-2" />
          </div>
        )
      )}

      {name.includes("invoices") &&!name.includes('clients') && (
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
          <div tw="flex items-center">
            <span tw="capitalize text-4xl font-bold">Invoices</span>
          </div>
          <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
            <Popover placement="bottom" content={createList} trigger="click">
              <ButtonCustom
                onClick={() => history.push(`/invoices/new`)}
                tw="!py-6 bg-success text-white"
              >
                <span>New Invoice</span>
              </ButtonCustom>
            </Popover>
          </div>

          <Divider tw="md:col-span-2" />
        </div>
      )}

      {name.includes("global-settings") && (
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
          <div tw="flex items-center md:col-span-2">
            <span tw="capitalize text-4xl font-bold">Settings</span>
          </div>
          <div tw="md:col-span-2">
            <TabsSettting />
          </div>
        </div>
      )}
      {name.includes("items") && (
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
          <div tw="flex items-center">
            <span tw="capitalize text-4xl font-bold">Items</span>
          </div>
          <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
            <ButtonInvite tw="!py-6 md:mr-2">
              <span>Import Items</span>
            </ButtonInvite>
            <Popover
              placement="bottom"
              content={<NewItem hide={hide} />}
              trigger="click"
              visible={clicked}
              onVisibleChange={handleClickChange}
            >
              <ButtonCustom tw="!py-6 bg-success text-white">
                <span>Create New...</span>
                <DownOutlined />
              </ButtonCustom>
            </Popover>
          </div>

          <Divider tw="md:col-span-2" />
        </div>
      )}
      {name.includes("accounting") && (
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
          <div tw="flex items-center">
            <span tw="capitalize text-4xl font-bold">
              {subName.replace("/", "")}
            </span>
          </div>
          <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
            <Popover placement="bottom" content={content} trigger="click">
              <ButtonInvite tw=" md:mr-5">
                <span>Invite</span>
                <DownOutlined />
              </ButtonInvite>
            </Popover>
          </div>

          <Divider tw="md:col-span-2" />
        </div>
      )}
    </>
  );
}

export default Header;
