import { Card } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledCardReporting = styled(Card)(({ hidden }) => [
    tw`  border-gray-200 rounded-lg min-h-[50rem]`,
    css`
   
        && {
            h1{
                ${tw`text-2xl font-bold text-primary`}
            }

            .ant-card-body{
                ${tw`p-6`}
            }
      
            table{
                ${tw`w-full text-sm`}
            }
            thead{
                ${tw`text-right h-10 border-b-4 border-primary text-primary`}
            }
            tbody{
                ${tw`align-baseline`}
            }

            .double{
                ${tw`border-t-4 border-double text-right text-black text-sm `}
            }
            
        
            
    
          

        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])