import {
  Card,
  Checkbox,
  Col,
  Divider,
  notification,
  Row,
  Typography,
} from "antd";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import tw from "twin.macro";

export default function EmailNotification() {
  const { Title, Text } = Typography;

  const queryClient = useQueryClient();

  const changeisCheck = (type) => {
    switch (type) {
      case "recurring":
        mutation.mutate({
          keys: "email.recurring_invoice_send",
          value: !data?.settings?.email?.recurring_invoice_send,
        });
        break;

      case "comment":
        mutation.mutate({
          keys: "email.new_comment",
          value: !data?.settings?.email?.new_comment,
        });
        break;

      default:
        mutation.mutate({
          keys: "email.recurring_invoice_send",
          value: !data?.settings?.email?.recurring_invoice_send,
        });
        break;
    }
  };

  const { data, status } = useQuery(["email-notification"], async (key) =>
    axios
      .get("user/settings", {
        params: key.queryKey[1],
      })
      .then((res) => res.data?.data)
  );

  const mutation = useMutation(
    async (data) => {
      return axios
        .post("user/settings/notification", data)
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("email-notification");
        notification.success({
          message: `Your changes have been saved
          .
          `,
          description: `You will only receive email notifications for the boxes that remain checked.
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

  return (
    <>
      <div className="layout-content" tw="md:ml-24">
        <Row gutter={[24, 0]} style={{ marginBottom: "2rem" }}>
          <Col xs={24} md={24} sm={24} lg={24} xl={24} className="mt-25 mb-24">
            <Title level={3}>Email Notifications</Title>
          </Col>
          <div tw="w-full md:w-[90%]">
            <Col xs={24} md={24} sm={24} lg={20} xl={24} className="mb-24">
              <Card
                bordered={true}
                style={{ borderColor: "#cdd4d9" }}
                className="criclebox "
              >
                <Row gutter>
                  <Col
                    xs={24}
                    md={24}
                    sm={24}
                    lg={24}
                    xl={24}
                    style={{ marginBottom: "-30px" }}
                  >
                    <div className="h-full col-content p-20">
                      <div>
                        <div tw="flex justify-between">
                          <Title level={3}>Email Notifications to me</Title>
                          {/* <div>
                            <a
                              role="button"
                              style={{ color: "#0063c1", marginRight: "5px" }}
                            >
                              Turn on/off all email notifications
                            </a>
                            <Switch
                            checked={isCheck.recurringInvoice && isCheck.commentIsAdded}
                              onChange={() => changeisCheck('all')}
                            />
                          </div> */}
                        </div>
                        <Divider />
                        <p className="text-secondary">Send me email when</p>
                      </div>
                    </div>
                  </Col>
                  <Col span={24}>
                    {status === "loading" && (
                      <div
                        role="status"
                        tw="flex flex-col w-full h-full items-center justify-center"
                      >
                        <svg
                          tw="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                    {status === "success" && (
                      <div tw="grid justify-start p-5">
                        <p className="font-small">Invoices</p>
                        <Checkbox
                          className="font-normal"
                          checked={
                            data?.settings?.email?.recurring_invoice_send
                          }
                          onChange={() => changeisCheck("recurring")}
                        >
                          A recurring Invoice is sent
                        </Checkbox>
                        <Checkbox
                          className="font-normal"
                          checked={data?.settings?.email?.new_comment}
                          onChange={(e) => changeisCheck("comment")}
                          tw="!ml-0"
                        >
                          A comment is Added on an Invoice
                        </Checkbox>
                      </div>
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>
          </div>
        </Row>
      </div>
    </>
  );
}
