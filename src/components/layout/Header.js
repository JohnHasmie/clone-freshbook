import { useState, useEffect, useContext } from "react";
import { Divider, Popover, Menu, notification } from "antd";
import {
  DownOutlined,
  UserOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  LeftOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { NavLink, useHistory, useParams } from "react-router-dom";
import ButtonCustom from "../Button";
import tw from "twin.macro";
import ButtonInvite from "../ButtonInvite";
import TabsSettting from "./TabsSettting";
import {
  MoreActionClients,
  MoreActionClientsDetail,
} from "../Reports/MoreAction";
import NewItem from "../NewItem";
import AppContext from "../context/AppContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { ModalConfirm } from "../ModalConfirm.style";
import * as XLSX from 'xlsx'
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
  const [isType, setIsType] = useState(false);

  const {  globalDetailClient } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();



  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };

  // useEffect(() => window.scrollTo(0, 0));
  const { status: pdfStatus, refetch: pdfRefetch } = useQuery(
    "downloadPDF",
    async () =>
      axios
        .get("clients/export")
        .then((res) => {
          console.log(res,"res")
          const ws = XLSX.utils.json_to_sheet(res.data)
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
          XLSX.writeFile(wb, 'data.xlsx')
          // const url = window.URL.createObjectURL(new Blob([res.data]))
          // const link = document.createElement("a")
          // link.href = url
          // link.setAttribute("download.pdf")
          // document.body.appendChild(link)
          // link.click()

          return res.data
        }),
    {
      enabled: false,
    }
  )


  // const fetchData = async () => {
  //   const response = await axios.get('clients/export')
  //   const data = await response.json()
  //   return data
  // }
  // const { data, status } = useQuery('data', fetchData)

  // const handleExport = () => {
  //   if (status === 'success') {
  //     console.log(data)
      // const ws = XLSX.utils.json_to_sheet(data)
      // const wb = XLSX.utils.book_new()
      // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      // XLSX.writeFile(wb, 'data.xlsx')
  //   }
  // }
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
        <Menu.Item onClick={()=>history.push("/clients/new")}>
            <AppstoreOutlined />
            <span>Client</span>
        </Menu.Item>

        <Menu.Item onClick={()=>history.push("/invoices/new")}>
            <FileDoneOutlined />
            <span>Invoice</span>
        </Menu.Item>
        <Menu.Item onClick={()=>history.push("/recurring-template/new")}>
            <FileTextOutlined />
            <span>Recurring Template</span>
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
  const onSelectFile = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    mutationUpload.mutate(formData);
    
  };
  const mutationUpload = useMutation(
    async (data) => {
      return axios
        .post("items/import", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("items-by-client");
        notification.success({
          message: `The selected items has been imported.
          `,
          placement: "topLeft",
        });
      },
      onError: (err) => {
        switch (err?.response?.status) {
          case 500:
            notification.error({
              message: `Internal Server Error`,
              placement: "topLeft",
            });
            break;

          default:
            notification.error({
              message: `An Error Occurred Please Try Again Later`,
              placement: "topLeft",
            });
            break;
        }
      },
    }

  );
  const handleOk = () => {
  
const dataArchive={
  ids:[globalDetailClient?.id],
  status:"archive"
}
    if(isType === "archive"){
      mutationArchive.mutate(dataArchive)
      }
      else{
        mutation.mutate()
      }

    setIsModalOpen(false);
  };
  const mutationArchive = useMutation(
    async (data) => {
      return axios.put(`clients/status`,data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
   history.push('/clients')
        notification.success({
          message: `Client  has been successfully archived.`,
          placement: "topLeft",
        });
      },
      onError: () => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
      },
    }
  );
  const mutation = useMutation(
    async (data) => {
      return axios.delete(`clients/${globalDetailClient?.id}`).then((res) => res.data);
    },
    {
      onSuccess: () => {
        history.push('/clients')

        notification.success({
          message: `Client  has been successfully deleted.`,
          placement: "topLeft",
        });
      },
      onError: () => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
      },
    }
  );
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleModal = (type) => {
    switch (type.key) {
      case "archive":
        setIsType("archive");
        break;
      case "delete":
        setIsType("delete");
        break;
      default:
        setIsType("");
        break;
    }
    // if (type.client) {
    //   setClientName(type.client);
    // }

    setIsModalOpen(true);
    setClicked(false);
  };

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
            {/* <Popover placement="bottom" content={content} trigger="click" tw="hidden">
              <ButtonInvite tw="!py-6 md:mr-5">
                <span>Invite</span>
                <DownOutlined />
         
              </ButtonInvite>
            </Popover> */}
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
          <div tw=" md:col-span-2">
            <button
              onClick={() => history.push('/clients')}
              tw="bg-transparent flex justify-start -ml-2 items-center mt-5 text-primary cursor-pointer"
            >
              <LeftOutlined />
              <span tw="ml-1 text-lg">Clients</span>
            </button>
          </div>
          <div tw="flex items-center">
            <span tw="capitalize text-4xl font-bold">{globalDetailClient?.company_name}</span>
          </div>
          <ModalConfirm
              title="Confirm"
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={500}
              closable={false}
            >
              <span tw="text-lg">
                {globalDetailClient?.company_name
                  && `Are you sure you want to ${isType} ${globalDetailClient?.company_name}?`
                  }
              </span>
            </ModalConfirm>

          <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
            <Popover
              placement="bottom"
              content={<MoreActionClientsDetail globalDetailClient={globalDetailClient} history={history} handleModal={handleModal} />}
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

          <Divider tw="mt-0 md:col-span-2" />
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
                content={<MoreActionClients pdfRefetch={pdfRefetch} />}
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
            <label
                  htmlFor="import-file"
                  tw="cursor-pointer"
      
                >
                  <input
                    type="file"
                    name="import-file"
                    id="import-file"
                    style={{ display: "none" }}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={onSelectFile}
                  />
           
              <span>Import Items</span>
                </label>
            </ButtonInvite>
            <Popover
              placement="bottomLeft"
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
          {/* <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
            <Popover placement="bottom" content={content} trigger="click">
              <ButtonInvite tw=" md:mr-5">
                <span>Invite</span>
                <DownOutlined />
              </ButtonInvite>
            </Popover>
          </div> */}

          <Divider tw="md:col-span-2" />
        </div>
      )}
    </>
  );
}

export default Header;
