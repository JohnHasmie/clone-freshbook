import { Input } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledInputAdvanceSearch = styled(Input)(({ hidden}) => [
    tw`flex w-auto rounded-l-full py-1 px-1`,
    css`
        && {
            .ant-input {
                ${tw`h-8`}
              }
              .ant-input-affix-wrapper{
                ${tw`py-1 px-1`}
              }
    
            .anticon {
                ${tw`inline-block pl-1`}

               
            }
          .ant-input-affix-wrapper-focused{
                ${tw`!border-[#d9d9d9] !shadow-transparent	`}
            }
            .ant-input-affix-wrapper:hover{
                ${tw`text-[[#d9d9d9]] !border-[#d9d9d9]`}
            }

            &:focus{
                ${tw`text-[[#d9d9d9]] !border-[#d9d9d9]`}
            }
            &:hover {
                ${tw`text-[[#d9d9d9]] !border-[#d9d9d9]`}

                .anticon {
                    ${tw`text-[[#d9d9d9]] `}
                }
            }
        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])