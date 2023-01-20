import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  notification,
  Popover,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import tw from "twin.macro";
import { bell, toggler } from "../../components/Icons";
import ButtonCustom from "../../components/Button/index";
import { SettingButton } from "./NewInvoice.style";
import ButtonMore from "../../components/Reports/ButtonMore";
import SendEmail from "../../components/Reports/SendEmail";
import CardDetailInvoice from "../../components/CardDetailInvoice";
import InvoiceHead from "./InvoiceHead";
import InvoiceLines from "./InvoiceLines";
import Filter from "../../components/Reports/Filter";
import TextArea from "antd/lib/input/TextArea";
import { countryList } from "../../components/Countries";
import moment from "moment";
import { numberWithDot } from "../../components/Utils";
import {
  AutoCompleteCustom,
  DatePickerCustom,
  UploadCustom,
} from "../report/ReportCustom.style";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import AppContext from "../../components/context/AppContext";
import InvoicesSetting from "./InvoicesSetting";
import CreateRecurring from "./CreateRecurring";
import { DividerCustom } from "../clients/AdvanceSearch.style";
import FilterDiscount from "./FilterDiscount";
import SendEmailInvoice from "./SendEmailInvoice";
const dateFormat = "DD/MM/YYYY";

export default function FormInvoice() {
  const [open, setOpen] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const next29day = moment().add(30, "days");

  const [isTitle, setIsTitle] = useState("Invoice");
  const { setting, user } = useContext(AppContext);

  const { pathname } = useLocation();
  const { invoiceId } = useParams();

  const [clicked, setClicked] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [localTotal, setLocalTotal] = useState("");
  const [localSubTotal, setLocalSubTotal] = useState("");

  const [lines, setLines] = useState([]);
  const [toggleInvoiceNumber, setToggleInvoiceNumber] = useState("");

  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };

  const handleClickChange2 = (open) => {
    setClicked2(open);
  };
  const hide2 = () => {
    setClicked2(false);
  };
  const { Title } = Typography;
  let history = useHistory();
  const [isForm, setIsForm] = useState({
    company_name: "",
    phone: "",
    address: "",
    address_line_2: "",
    district: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    tax_name: "",
    tax_number: "",
    code: "",
    reference: "",
    issued_at: new Date(),
    due_date: next29day.format(),
    notes: "",
    terms: "",
    discount: "",
    total: "",
    subtotal: "",
  });

  const { data: dataUser, status: statusUser } = useQuery("profile", () =>
    axios.get("user/profile").then((res) => res.data?.data)
  );
  const [formRecurring, setFormRecurring] = useState({
    recurring_type: "weekly",
    recurring_next_issue_date: new Date(),
    date_type: 0,
    delivery_option: "send_invoice",
  });

  const [uploadLoading, setUploadLoading] = useState(false);

  const [filter, setFilter] = useState({
    limit_comment: 1,
  });
  const [isClient, setIsClient] = useState("");
  const [form] = Form.useForm();
  // const dateFormat = "MMMM DD,YYYY";
  const [fileList, setFileList] = useState([]);

  const queryClient = useQueryClient();

  const { data: detailInvoice, status } = useQuery(
    ["invoice-detail", filter],
    async (key) =>
      axios
        .get(`invoices/detail/${invoiceId}`, {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );
  useEffect(() => {
    if (pathname.includes("recurring")) {
      setIsTitle("Recurring");
    }
  }, [pathname]);

  useEffect(() => {
    statusUser &&
      setIsForm({
        ...isForm,
        company_name: dataUser?.user?.company_name,
        phone: dataUser?.user?.phone,
        address_line_2: dataUser?.user?.address_line_2,
        address: dataUser?.user?.address,
        city: dataUser?.user?.city,
        zip: dataUser?.user?.zip,
        country: dataUser?.user?.country,
      });
  }, [statusUser]);
  useEffect(() => {
    if (status === "success") {
      setIsForm({
        ...isForm,
        code: detailInvoice.code,
        notes: detailInvoice.notes,
        terms: detailInvoice.terms,
        issued_at: detailInvoice.issued_at,
        due_date: detailInvoice.due_date,
        discount: detailInvoice.discount,
        

        reference: detailInvoice.references,
      });
      setFileListAttach(detailInvoice.attachments)
      if(detailInvoice?.logo !== "0"){
        setFileList([{id:1,url:detailInvoice?.logo}])
      }
      if (detailInvoice?.items_detail !== null) {
        const newLines = detailInvoice?.items_detail?.map((x) => {
          return {
            name: x.name,
            description: x.description,
            rate: x.rate,
            qty: x.pivot.qty,
            total: x.pivot.total,
            id: x.id,
          };
        });
        setLines(newLines);
      }
      setIsClient(detailInvoice.client_id);
    }
  }, [status]);
  useEffect(() => {
    if (formRecurring.date_type === null) {
      setToggleInvoiceNumber(true);
    }
    if (formRecurring.date_type === 0) {
      setToggleInvoiceNumber(false);
    }
  }, [formRecurring]);

  const handleInput = (e) => {
    setIsForm({ ...isForm, [e.target.name]: e.target.value });
  };
  const mutation = useMutation(
    async (data) => {
      return axios.post("invoices", data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("invoices-listing");
        notification.success({
          message: `Invoice has been saved`,
          placement: "topLeft",
        });
        history.push("/invoices");
      },
      onError: (err) => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
        console.log(err.response.data.message);
      },
    }
  );

  const mutationUpdate = useMutation(
    async (data) => {
      return axios.put(`invoices/${invoiceId}`, data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("invoices-listing");
        notification.success({
          message: `Invoice has been updated`,
          placement: "topLeft",
        });
        history.push("/invoices");
      },
      onError: (err) => {
        switch (err?.response?.status) {
          case 422:
            notification.error({
              message: `Fields required input`,
              placement: "topLeft",
            });
            break;
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
  const onFinish = (values) => {
    form.submit();

    let newData = "";
    if (isRecurring) {
      newData = {
        ...isForm,
        logo: fileList.length > 0 && fileList[0].url,
        // items: lines,
        items: [
          {
            id: 1,
            qty: 2,
          },
          {
            id: 3,
            qty: 2,
          },
        ],
        client_id: isClient,
        ...formRecurring,
        attachments: fileListAttach,
      };
    } else {
      newData = {
        ...isForm,
        logo: fileList.length > 0 && fileList[0].url,

        // items: lines,
        items: [
          {
            id: 1,
            qty: 2,
          },
          {
            id: 3,
            qty: 2,
          },
        ],
        client_id: isClient,
        attachments: fileListAttach,
      };
    }

    if (pathname.includes("edit")) {
      mutationUpdate.mutate(newData);
    } else {
      mutation.mutate(newData);
    }
  };
  const onFinishRecurring = () => {
    setOpen(false);
  };
  // const RecurringSettings = (
  //   <div>
  //     <div tw="flex justify-between ">
  //       <Title level={3}>Settings</Title>
  //     </div>
  //     <List
  //       itemLayout="horizontal"
  //       dataSource={[
  //         {
  //           title: "Make Recurring",
  //           desc: "Bill your clients automatically",
  //         },
  //       ]}
  //       renderItem={(item) => (
  //         <List.Item>
  //           <SettingButton>
  //             <strong>{item.title}</strong>
  //             <span>{item.desc}</span>
  //           </SettingButton>
  //         </List.Item>
  //       )}
  //     />
  //   </div>
  // );
  const RecurringSettings = (
    <div tw="mt-3">
      <div tw="flex justify-between ">
        <Title level={3}>Recurring Schedule</Title>
      </div>
      <Form
        onFinish={onFinishRecurring}
        layout="vertical"
        size={"large"}
        tw="mt-5"
        fields={[
          {
            name: ["recurring_type"],
            value: formRecurring?.recurring_type,
          },
          {
            name: ["recurring_next_issue_date"],
            value: moment(
              new Date(formRecurring.recurring_next_issue_date),
              dateFormat
            ),
          },
        ]}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="How Often?" name="recurring_type">
              <Select
                value={formRecurring.recurring_type}
                onChange={(e) =>
                  setFormRecurring({ ...formRecurring, recurring_type: e })
                }
                options={[
                  {
                    value: "weekly",
                    label: "Weekly",
                  },
                  {
                    value: "monthly",
                    label: "Monthly",
                  },
                  {
                    value: "yearly",
                    label: "Yearly",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Divider tw="!mt-0" />
          <Col span={24}>
            <Form.Item label="Next Issue Date" name="recurring_next_issue_date">
              <DatePicker
                onChange={(date, dateString) =>
                  setFormRecurring({
                    ...formRecurring,
                    recurring_next_issue_date: dateString,
                  })
                }
                // value={
                //   formRecurring.recurring_next_issue_date &&
                //   moment(new Date(formRecurring.recurring_next_issue_date), dateFormat)
                // }
                format={dateFormat}
              />
            </Form.Item>
          </Col>
          <Divider tw="!mt-0" />
          <Col span={24}>
            <span>Number of Invoices</span>
            <Radio.Group
              tw="grid gap-3 mt-2 mb-2"
              onChange={(e) =>
                setFormRecurring({
                  ...formRecurring,
                  date_type: e.target.value,
                })
              }
              value={formRecurring.date_type}
            >
              <Radio value={0}>Last Invoiced</Radio>
              <Radio value={null}>Issued Date</Radio>
              {toggleInvoiceNumber ? (
                <div tw=" grid border-l border-l-gray-400 pl-2 ml-2">
                  <span tw="text-xs text-gray-400">Invoices Remaining</span>
                  <Input
                    type="number"
                    value={formRecurring.date_type}
                    tw="w-20"
                    onChange={(e) =>
                      setFormRecurring({
                        ...formRecurring,
                        date_type: e.target.value,
                      })
                    }
                  />
                </div>
              ) : (
                <></>
              )}
            </Radio.Group>
          </Col>
          <Divider tw="!mt-0" />
          <Col span={24}>
            <span>Delivery Options</span>
            <Radio.Group
              tw="grid gap-3 mt-2"
              onChange={(e) =>
                setFormRecurring({
                  ...formRecurring,
                  delivery_option: e.target.value,
                })
              }
              value={formRecurring.delivery_option}
            >
              <Radio value={"send_invoice"}>Send invoices automatically</Radio>
              <Radio value={"draft_invoice"}>
                Create Draft invoices and send manually
              </Radio>
            </Radio.Group>
          </Col>
          <Divider />
          <Col span={12}>
            <Button
              tw="text-lg px-8"
              onClick={() => {
                setIsRecurring(false);
                setOpen(false);
              }}
            >
              Close
            </Button>
          </Col>
          <Col span={12}>
            <Button htmlType="submit" tw="text-lg text-white bg-success px-8">
              Apply
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
  function beforeUpload(file) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      notification.error({
        message: `You can only upload image format jpeg, png, jpg`,
        placement: "topLeft",
      });
    }
    return isJpgOrPng;
  }
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const [fileListAttach, setFileListAttach] = useState([]);
  const actionUpload = async (options) => {
    const formData = new FormData();
    formData.append("file", options.file);
    const newFileListAttach = [...fileListAttach];
    return axios
      .post(options.action, formData)
      .then((res) => {
        newFileListAttach.push(res?.data?.data);
        setFileListAttach(newFileListAttach);
        // options.onSuccess(res?.data?.payload?.path, options.file)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const actionUploadLogo = async (options) => {
    const formData = new FormData();
    formData.append("file", options.file);
    const newFileList = [...fileList];
    return axios
      .post(options.action, formData)
      .then((res) => {
        newFileList.push(res?.data?.data);
        setFileList(newFileList);
        // options.onSuccess(res?.data?.payload?.path, options.file)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const onChangeAttach = ({ fileList: newFileList }) => {
  //   console.log(newFileList,"news");
  //   setFileListAttach(newFileList);
  // };
  const onPreviewAttach = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Add an attachment</div>
    </div>
  );
  const token = JSON.parse(localStorage.getItem("auth-data"));

  useEffect(() => {
    const totalItems = getTotal(
      lines?.map((x) => {
        const splitAmount = x.total.split(".");
        return parseInt(splitAmount[0]);
      })
    );
    setLocalSubTotal(totalItems);
  }, [lines]);



  return (
    <div tw="max-w-screen-lg mx-auto">
      <div tw="grid grid-cols-1 gap-y-2 md:grid-cols-2 mx-5 mt-5">
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

        <div tw="flex items-center">
          <span tw="capitalize text-4xl font-bold text-black">
            {pathname.includes("edit") ? `Edit ${isTitle}` : `New ${isTitle}`}
          </span>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <ButtonMore tw="!py-2" onClick={() => history.goBack()}>
            <span>Cancel</span>
          </ButtonMore>
          <Button
            tw="!py-2 ml-2 bg-success text-white px-4 h-auto flex justify-center items-center "
            onClick={onFinish}
          >
            <span tw="text-lg">Save...</span>
          </Button>
          {!isRecurring && (
            <Popover
              placement="bottom"
              content={<SendEmailInvoice hide={hide} dataUser={dataUser?.user?.company_name} invoiceId={invoiceId} />}
              trigger="click"
              visible={clicked}
              onVisibleChange={handleClickChange}
            >
              <Button tw="!py-2 ml-2 bg-success text-white px-4 h-auto flex justify-center items-center hidden ">
                <span tw="text-lg">Send To...</span>
              </Button>
            </Popover>
          )}
        </div>
      </div>
      <div tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5 mt-10 md:mt-2">
        <Form
          size="default"
          layout={"vertical"}
          form={form}
          // onFinish={onFinish}
          tw="md:col-span-9 space-y-5 mb-10 mt-10 md:mt-2"
        >
          <CardDetailInvoice>
            <div tw="grid gap-y-2 md:flex justify-between mb-10">
              {/* <img
               src="https://source.unsplash.com/200x200?company"
               alt="profile company"
               tw="w-screen md:w-auto"
             /> */}
              <UploadCustom
                name="file"
                headers={{
                  Authorization: `Bearer ${token?.token}`,
                  "Content-Type": "multipart/form-data",
                }}
                action="upload"
                customRequest={actionUploadLogo}
                beforeUpload={beforeUpload}
                listType="picture-card"
                fileList={fileList}
                // onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && "+ Upload"}
              </UploadCustom>
              <div tw="flex justify-between ">
                <div tw="flex flex-col items-end text-right ">
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="Company Name"
                    tw="max-w-[300px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: {
                          value: e.target.innerHTML,
                          name: "company_name",
                        },
                      })
                    }
                    dangerouslySetInnerHTML={{ __html: isForm.company_name }}
                  ></span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="Addres Line 1"
                    tw="max-w-[300px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: { value: e.target.innerHTML, name: "address" },
                      })
                    }
                    dangerouslySetInnerHTML={{ __html: isForm.address }}
                  ></span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="Addres Line 2"
                    tw="max-w-[300px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: {
                          value: e.target.innerHTML,
                          name: "address_line_2",
                        },
                      })
                    }
                    dangerouslySetInnerHTML={{ __html: isForm.address_line_2 }}
                  ></span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="City"
                    tw="max-w-[300px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: { value: e.target.innerHTML, name: "city" },
                      })
                    }
                    dangerouslySetInnerHTML={{ __html: isForm.city }}
                  ></span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="Phone Number"
                    tw="max-w-[300px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: { value: e.target.innerHTML, name: "phone" },
                      })
                    }
                    dangerouslySetInnerHTML={{ __html: isForm.phone }}
                  ></span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="ZIP"
                    tw="max-w-[300px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: { value: e.target.innerHTML, name: "zip" },
                      })
                    }
                    dangerouslySetInnerHTML={{ __html: isForm.zip }}
                  ></span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="Country"
                    tw="max-w-[300px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: { value: e.target.innerHTML, name: "country" },
                      })
                    }
                    dangerouslySetInnerHTML={{ __html: isForm.country }}
                  ></span>
                </div>
                {/* <div tw="flex flex-col items-end">
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="Address Line 1"
                    tw="max-w-[200px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: { value: e.target.innerHTML, name: "address" },
                      })
                    }
                    html={isForm.address}
                  ></span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="Address Line 2"
                    tw="max-w-[200px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: {
                          value: e.target.innerHTML,
                          name: "address_line_2",
                        },
                      })
                    }
                    html={isForm.address_line_2}
                  ></span>
                  <div tw="flex">
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      className="editable"
                      data-placeholder="City"
                      tw="max-w-[100px] min-w-[30px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                      onInput={(e) =>
                        handleInput({
                          target: { value: e.target.innerHTML, name: "city" },
                        })
                      }
                      html={isForm.city}
                    ></span>
                    <span>,</span>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      className="editable"
                      data-placeholder="State"
                      tw="max-w-[100px] min-w-[30px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                      onInput={(e) =>
                        handleInput({
                          target: { value: e.target.innerHTML, name: "state" },
                        })
                      }
                      html={isForm.state}
                    ></span>
                  </div>

                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="ZIP Code"
                    tw="max-w-[100px] min-w-[50px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: { value: e.target.innerHTML, name: "zip" },
                      })
                    }
                    html={isForm.zip}
                  ></span>

                  <AutoCompleteCustom
                    style={{
                      width: 100,
                    }}
                    onChange={(e) =>
                      handleInput({
                        target: { value: e, name: "country" },
                      })
                    }
                    options={countryList.map((item) => ({
                      value: item,
                    }))}
                    value={isForm.country}
                    placeholder="Country"
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  />
                  <div tw="flex">
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      className="editable"
                      data-placeholder="Tax Name"
                      tw="max-w-[100px] min-w-[30px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                      onInput={(e) =>
                        handleInput({
                          target: {
                            value: e.target.innerHTML,
                            name: "tax_name",
                          },
                        })
                      }
                      html={isForm.tax_name}
                    ></span>
                    <span>,</span>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      className="editable"
                      data-placeholder="Tax Number"
                      tw="max-w-[100px] min-w-[30px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                      onInput={(e) =>
                        handleInput({
                          target: {
                            value: e.target.innerHTML,
                            name: "tax_number",
                          },
                        })
                      }
                      html={isForm.tax_number}
                    ></span>
                  </div>
                </div> */}
              </div>
            </div>
            <div tw="grid grid-cols-4 gap-5 mb-16">
              <InvoiceHead clientProps={[isClient, setIsClient]} />
              <div tw="space-y-5 ">
                <div>
                  {/* <Form.Item
                    label="Date of Issue"
                    name="issued_at"
                    rules={[
                      { required: true, message: "Please select a date!" },
                    ]}
                  > */}
                  <h4 tw="text-gray-400">Date of Issue</h4>

                  <DatePickerCustom
                    bordered={false}
                    onChange={(date, dateString) =>
                      setIsForm({ ...isForm, issued_at: dateString })
                    }
                    value={
                      isForm.issued_at !== new Date() && moment(new Date(isForm.issued_at), dateFormat)
                    }
                    format={dateFormat}
                  />
                  {/* </Form.Item> */}
                </div>

                <div>
                  {/* <Form.Item
                    label="Due Date"
                    name="due_date"
                    rules={[
                      { required: true, message: "Please select a date!" },
                    ]}
                  > */}
                  <h4 tw="text-gray-400">Due Date</h4>

                  <DatePickerCustom
                    bordered={false}
                    onChange={(date, dateString) =>
                      setIsForm({ ...isForm, due_date: dateString })
                    }
                    value={
                      isForm.due_date &&
                      moment(new Date(isForm.due_date), dateFormat)
                    }
                    format={dateFormat}
                  />
                  {/* </Form.Item> */}
                </div>
              </div>
              <div tw="space-y-5 ">
                <div>
                  <h4 tw="text-gray-400">Invoice Number</h4>

                  <span tw="text-xs">{isForm.code}</span>
                </div>

                <div>
                  <h4 tw="text-gray-400">Reference</h4>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="Enter value (e.g. PO #)"
                    tw="max-w-[100px] min-w-[30px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: {
                          value: e.target.innerHTML,
                          name: "reference",
                        },
                      })
                    }
                    html={isForm.reference}
                  ></span>
                </div>
              </div>
              <div tw="text-right">
                <h3 tw="text-gray-400">Amount Due</h3>
                <span tw="font-medium text-3xl ">
                {numberWithDot(localSubTotal-(localSubTotal*isForm.discount/100))}
                  {/* {lines.length > 0 &&
                    getTotal(
                      lines?.map((x) => {
                        const splitAmount = x.total.split(".");
                        return parseInt(splitAmount[0]);
                      })
                    )} */}
                </span>
              </div>
            </div>

            <InvoiceLines linesProps={[lines, setLines]} />

            <div tw="grid grid-cols-12 mt-10 ">
              <div tw="col-span-8"></div>
              <table tw="col-span-4">
                <tbody>
                  <tr tw="text-right">
                    <td>Subtotal</td>
                    <td>{numberWithDot(localSubTotal)}</td>
                  </tr>
                  <tr tw=" text-right">
                    <td tw="text-primary">
                      <Popover
                        placement="bottom"
                        content={
                          <FilterDiscount
                            hide={hide2}
                            isFormProps={[isForm, setIsForm]}
                          />
                        }
                        trigger="click"
                        visible={clicked2}
                        onVisibleChange={handleClickChange2}
                      >
                    {isForm.discount ? isForm.discount + "%" + "Discount":  "Add Discount"}
                      </Popover>
                    </td>
                    <td> {isForm.discount &&  "- "+ localSubTotal*isForm.discount/100}</td>
                  </tr>
                  <tr tw="border-b  border-gray-300 text-right">
                    <td>Tax</td>
                    <td>0.00</td>
                  </tr>
                  <tr tw="text-right ">
                    <td tw="pt-1">Total</td>
                    <td>
                      {" "}
                      {/* {lines.length > 0 &&
                        getTotal(
                          lines?.map((x) => {
                            const splitAmount = x.total.split(".");
                            return parseInt(splitAmount[0]);
                          })
                        )}{" "} */}
                        {numberWithDot(localSubTotal-(localSubTotal*isForm.discount/100))}
                    </td>
                  </tr>
                  <tr tw="text-right">
                    <td>Amount Paid</td>
                    <td>0.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="double">
                    <td tw=" text-right align-top text-gray-400">Amount Due</td>

                    <td tw=" grid gap-0 items-end ">
                      <span tw="font-semibold ">
                      {numberWithDot(localSubTotal-(localSubTotal*isForm.discount/100))}

                        {/* {lines.length > 0 &&
                          getTotal(
                            lines?.map((x) => {
                              const splitAmount = x.total.split(".");
                              return parseInt(splitAmount[0]);
                            })
                          )} */}
                      </span>
                      {/* <span tw="text-gray-600 text-right">USD</span> */}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div tw="grid gap-y-5 mb-20">
              <div>
                <h3 tw="text-sm">Notes</h3>
                <TextArea
                  tw="border-0"
                  name="notes"
                  placeholder="Enter notes or bank transfer details (optional)"
                  autoSize
                  onChange={(e) =>
                    setIsForm({ ...isForm, notes: e.target.value })
                  }
                  value={isForm.notes}
                />
              </div>
              <div>
                <h3 tw="text-sm">Terms</h3>
                <TextArea
                  tw="border-0"
                  name="terms"
                  placeholder="Enter your terms and conditions. (Pro tip: It pays to be polite. FreshBooks invoices that include “please” and “thanks” get paid up to 2 days faster.)"
                  autoSize
                  onChange={(e) =>
                    setIsForm({ ...isForm, terms: e.target.value })
                  }
                  value={isForm.terms}
                />
              </div>
            </div>
          </CardDetailInvoice>
          <Card tw="border-gray-200 rounded-lg">
            <UploadCustom
              name="file"
              headers={{
                Authorization: `Bearer ${token?.token}`,
                "Content-Type": "multipart/form-data",
              }}
              action="upload"
              customRequest={actionUpload}
              beforeUpload={beforeUpload}
              listType="picture-card"
              fileList={fileListAttach}
              // onChange={onChangeAttach}
              onPreview={onPreviewAttach}
            >
              {fileListAttach?.length < 5 && uploadButton}
            </UploadCustom>
          </Card>
        </Form>
        <CreateRecurring
          Filtering={RecurringSettings}
          setOpen={setOpen}
          setIsRecurring={setIsRecurring}
          open={open}
        />
        {/* <InvoicesSetting open={open} setOpen={setOpen} /> */}
      </div>
    </div>
  );
}
export function getTotal(v) {
  const sum = v.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return sum;
}
function totalIteration(data) {
  data?.map((x) => {
    const splitAmount = x.amount.split(".");
    return parseInt(splitAmount[0]);
  });
}
