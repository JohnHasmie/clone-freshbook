import {  Card } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledCardDetail = styled(Card)(({ hidden }) => [
    tw`rounded-md `,
    css`
        /* Add specifity so that we don't need to add ! rule to override */
        && {
       

            .ant-card-body{
                ${tw`p-0`}
            }
            
            .anticon {
                ${tw`text-secondary`}
                
            }
            span{
                ${tw`font-bold text-lg`}
            }
            p{
                ${tw`text-sm text-gray-400`}
            }
            hr{
                ${tw`opacity-100 border border-gray-200 -mt-5`}
            }
    
          

        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])