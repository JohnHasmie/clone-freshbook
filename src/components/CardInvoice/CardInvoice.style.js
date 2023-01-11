import { Button, Card } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledCardInvoice = styled(Card)(({ hidden,bg }) => [
  tw`rounded `,
  css`
    /* Add specifity so that we don't need to add ! rule to override */
    && {
      .ant-card-head {
        ${tw`hidden`}
      }
      .ant-card-head-wrapper {
        ${tw`hidden`}
      }

      .ant-card-body {
        ${tw`p-4`}
      }

      .ant-divider-horizontal {
        ${tw`m-0`}
      }
      .ant-card-actions {
        border-bottom-right-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
        border-top-width: 0px;
        --tw-bg-opacity: 1;
        background-color: ${bg};
        span {
          ${tw`text-black`}
        }
      }
    }
  `,
  /** Example of passing property to the styles */
  hidden && tw`hidden`,
]);
