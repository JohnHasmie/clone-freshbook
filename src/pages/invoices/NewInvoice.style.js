import { Popover } from "antd";
import tw, { styled, css } from "twin.macro";

export const ClientsPopup = styled(Popover)(() => [])

export const PopupTrigger = styled.button(() => [
    tw`bg-transparent cursor-pointer`,
])

export const ListClientsWrapper = styled.ul(() => [
    tw`list-none p-0 m-0`,
    css`
        && {
            .ant-card {
                ${tw`rounded-none`}
            }
    
            .ant-card-head {
                ${tw`hidden`}
            }
        }
    `,
])

export const ListClientItem = styled.li(() => [
    tw`cursor-pointer`,
    css`
        &:hover {
            .ant-card-body {
                ${tw`bg-gray-50`}
            }
        }
    `,
])

export const SettingButton = styled.button(() => [
    tw`bg-transparent flex flex-col cursor-pointer hover:bg-gray-50 py-2 px-4 border-b border-b-gray-100`,
])