import { Button } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledButton = styled(Button)(({ hidden }) => [
  tw`p-button px-4 flex items-center justify-center`,
  css`
    && {

      span {
        ${tw`text-xl`},
      }

      .anticon {
        ${tw`inline-block opacity-50 flex items-center pl-2 ml-2 -mr-3 border-l border-l-gray-100 text-white`}

        path {
          ${tw`fill-current`}
        }
      }

      &:hover {
        ${tw`bg-[#348e09] text-white`}
      }

    //   svg {
    //     ${tw`inline-block pl-2 ml-2 opacity-50  border-l border-l-gray-100 text-white`}
    //     path {
    //       fill: #fff;
    //     }
    //   }
    }
  `,
  /** Example of passing property to the styles */
  hidden && tw`hidden`,
]);
