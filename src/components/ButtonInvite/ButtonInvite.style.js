import { Button } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledButtonInvite = styled(Button)(({ hidden }) => [
  tw`p-button bg-transparent  !border-2 !border-[#cdd4d9] md:!border-0   hover:!border-2 hover:!border-[#cdd4d9] shadow-none  px-4 flex items-center justify-center hover:ring hover:ring-offset-2`,
  css`
    && {
    

      span {
        ${tw`text-xl text-[#576981]`}
      }

      &:hover {
        span {
          ${tw`text-black`}
        }
        svg path {
          fill: black;
        }
      }

      .anticon {
        ${tw`ml-2 flex items-center md:-mr-3 font-bold text-gray-400 `}
        path {
          ${tw`fill-current`}
        }
      }

      &:not(:hover) {
        border: 2px solid white;
      }

      svg {
        ${tw` ml-2 `}
        path {
          fill: #576981;
        }
      }
    }
  `,
  /** Example of passing property to the styles */
  hidden && tw`hidden`,
]);
