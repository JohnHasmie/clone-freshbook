import { Table } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledTable = styled(Table)(({ hidden }) => [
    tw``,
    css`
        && {
            .ant-table-tbody > tr.ant-table-row-level-0:hover > td{
                ${tw``}
                .isVisible{
                    ${tw`visible`}
                }

            }

            // span {
            //     ${tw`text-lg`},
            //     // font-family: "Familjen Grotesk", Helvetica, Arial, sans-serif;
            // }
    
            // .anticon {
            //     ${tw`inline-block pl-2 ml-2 -mr-3 border-l border-l-gray-100 text-white`}

            //     path {
            //         ${tw`fill-current`}
            //     }
            // }

            // &:hover {
            //     ${tw`bg-[#348e09] text-white`}
            // }

            // svg {
            //     margin-top: 2px;

            //     path {
            //         fill: #fff;
            //     }
            // }
        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])