import {  Card } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledCard = styled(Card)(({ hidden }) => [
    tw`hover:border hover:border-gray-400`,
    css`
        && {

        
            .ant-card-head {
                ${tw`bg-green-400 p-0 h-2 rounded-t-lg min-h-0`}
                
            }
            .ant-card-head-wrapper{
                ${tw`hidden`}
            }

            .ant-card-body{
                ${tw`p-3`}
            }

            span{
                ${tw`text-sm text-gray-600 mb-2`}
            }
    
          

        }
    `,
    hidden && tw`hidden`,
])