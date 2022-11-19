import { Button } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledButton = styled(Button)(({ hidden }) => [
    tw`p-button px-4 h-auto flex items-center justify-center`,
    css`
        /* Add specifity so that we don't need to add ! rule to override */
        && {
            width: 180px;
            justify-content: space-between;
            align-items: self-start;
            padding-bottom: 5px;

            span {
                ${tw`text-lg`},
                // font-family: "Familjen Grotesk", Helvetica, Arial, sans-serif;
            }
    
            .anticon {
                ${tw`inline-block pl-2 ml-2 -mr-3 border-l border-l-gray-100 text-white`}

                path {
                    ${tw`fill-current`}
                }
            }

            &:hover {
                ${tw`bg-[#348e09] text-white`}
            }

            svg {
                margin-top: 2px;

                path {
                    fill: #fff;
                }
            }
        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])