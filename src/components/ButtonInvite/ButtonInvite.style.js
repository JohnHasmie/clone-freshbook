import { Button } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledButtonInvite = styled(Button)(({ hidden }) => [
    tw`p-button bg-transparent border-0 shadow-none px-4 h-auto flex items-center justify-center hover:ring hover:ring-offset-2`,
    css`
        && {
            display: flex;
            justify-content: space-between;
            width: 125px;
            align-items: normal;
            padding-bottom: 5px;
            
            span {
                ${tw`text-xl text-black`}
            }
    
            .anticon {
                ${tw`ml-2 font-bold text-gray-400 `}
                path {
                    ${tw`fill-current`}
                }

            }

            &:not(:hover) {
                border: 2px solid white
            }
        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])