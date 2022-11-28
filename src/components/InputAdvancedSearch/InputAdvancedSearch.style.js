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

            &:hover {
                ${tw`text-primary border-primary`}

                .anticon {
                    ${tw`text-primary `}
                }
            }
        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])