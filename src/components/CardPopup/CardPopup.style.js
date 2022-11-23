import { Button, Card } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledCardPopup = styled(Card)(({ hidden }) => [
    tw`rounded-md w-96`,
    css`
        /* Add specifity so that we don't need to add ! rule to override */
        && {
            .ant-card-head {
                ${tw`bg-gray-200 flex justify-start items-center  h-10 pl-2`}
                
            }
           .ant-card-body{
            ${tw`p-0`}
           }
        

         
          

        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])