import { Button, Card } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledCard = styled(Card)(({ hidden }) => [
    tw`rounded-md `,
    css`
        /* Add specifity so that we don't need to add ! rule to override */
        && {
            .ant-card-head {
                ${tw`bg-green-400 p-0 h-2 rounded-t-lg min-h-0`}
                
            }
            .ant-card-head-wrapper{
                ${tw`hidden`}
            }

            .ant-card-body{
                ${tw`p-6`}
            }

            span{
                ${tw`text-sm text-gray-600 mb-2`}
            }
    
          

        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])