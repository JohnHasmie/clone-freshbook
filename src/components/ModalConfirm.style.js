import { Modal } from "antd";
import tw, { styled, css } from "twin.macro";

export const ModalConfirm = styled(Modal)(() => [
  css`
    && {
      .ant-modal-header {
        ${tw`bg-grayDefault`}
      }
      .ant-modal-title {
        ${tw`text-xl font-bold`}
      }
      .ant-modal-footer {
        ${tw`border-t-0`}
      }
      .ant-btn-primary {
        color: #fff;
        border-color: #36a703;
        background: #36a703;
        text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
        box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
      }
    }
  `,
]);
