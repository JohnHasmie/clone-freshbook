import { Card } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledCardReport = styled(Card)(({ hidden }) => [
    tw`  border-gray-200 `,
    css`
        /* Add specifity so that we don't need to add ! rule to override */
        && {
    

            .ant-card-body{
                ${tw`p-6`}
            }
       
            .anticon {
                ${tw`text-primary text-2xl`}
                
            }
            h1{
                ${tw`text-lg`}
            }
            span{
                ${tw`text-sm text-gray-400`}
            }
    
          

        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])