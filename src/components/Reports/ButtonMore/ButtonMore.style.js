import { Button } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledButtonMore = styled(Button)(({ hidden }) => [
    tw`p-button bg-transparent border-0 shadow-none px-4 flex items-center justify-center`,
    css`
        && {
            span {
                ${tw`text-lg text-gray-400`}
            }
    
            .anticon {
                ${tw`ml-2 font-bold text-gray-400 mt-[2px]`}

            }

            &:hover {
                ${tw`border rounded-md border-gray-400 bg-transparent`}
                span {
                    ${tw`text-lg text-black`}
                }
                .anticon {
                    ${tw`text-black `}
                }
            }
        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])