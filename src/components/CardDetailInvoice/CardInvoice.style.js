import { Button, Card } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledCardDetailInvoice = styled(Card)(({ hidden }) => [
    tw`  border-gray-200 rounded-lg min-h-[50rem] min-w-[40rem]`,
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

            .theadCustom{
                ${tw`text-right h-10 border-b-4 border-gray-400 text-primary`}

            }
            tbody{
                ${tw`align-baseline`}
            }

            .double{
                ${tw`border-t-4 border-double border-gray-400 text-right text-black text-sm `}
            }
            
        
            
    
          

        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])