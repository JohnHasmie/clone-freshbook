import { Button } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledButtonInvite = styled(Button)(({ hidden }) => [
    tw`p-button bg-transparent border-0 shadow-none px-4 h-auto flex items-center justify-center`,
    css`
        && {
            span {
                ${tw`text-xl text-gray-400`}
            }
    
            .anticon {
                ${tw`ml-2 font-bold text-gray-400 `}
                path {
                    ${tw`fill-current`}
                }

            }

            &:hover {
                ${tw`border rounded-md border-gray-400 bg-transparent`}
                span {
                    ${tw`text-xl text-black`}
                }
           
            }
        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])