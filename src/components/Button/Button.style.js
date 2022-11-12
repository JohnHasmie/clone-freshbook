import { Button } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledButton = styled(Button)(({ hidden }) => [
    tw`p-button px-4 h-auto flex items-center justify-center`,
    css`
        /* Add specifity so that we don't need to add ! rule to override */
        && {
            span {
                ${tw`text-lg`}
            }
    
            .anticon {
                ${tw`inline-block pl-2 ml-2 border-l border-l-gray-100 text-white`}

                path {
                    ${tw`fill-current`}
                }
            }

            &:hover {
                ${tw`text-primary border-primary`}

                .anticon {
                    ${tw`text-primary border-l-primary`}
                }
            }
        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])