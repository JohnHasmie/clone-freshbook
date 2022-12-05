import { Popover } from "antd";
import tw, { styled, css } from "twin.macro";
import ReactApexChart from 'react-apexcharts';

export const ClientsPopup = styled(Popover)(() => [])

export const PopupTrigger = styled.button(() => [
    tw`bg-transparent cursor-pointer`,
])

export const DonutStyled = styled(ReactApexChart)(() => [
    // tw`list-none p-0 m-0`,
    css`
        && {
            .apexcharts-legend{
                ${tw`hidden`}
            }
           
        }
    `,
])