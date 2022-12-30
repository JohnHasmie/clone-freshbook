import {  Upload } from "antd";
import tw, { styled, css } from "twin.macro";

export const UploadCustom = styled(Upload)(() => [
    tw``,
    css`
        && {
            .ant-upload.ant-upload-select-picture-card {
                ${tw`!w-[200px] !h-[200px]`}
            }
        }
    `,


])

