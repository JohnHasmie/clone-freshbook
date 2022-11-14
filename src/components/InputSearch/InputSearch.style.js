import { Input } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledInputSearch = styled(Input)(({ hidden }) => [
    tw`flex w-auto rounded-full`,
    css`
        /* Add specifity so that we don't need to add ! rule to override */
        && {
            .ant-input {
                ${tw`h-7`}
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