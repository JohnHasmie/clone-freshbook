import { AutoComplete, DatePicker, Upload } from "antd";
import tw, { styled, css } from "twin.macro";

export const AutoCompleteCustom = styled(AutoComplete)(() => [
    tw``,
    css`
        && {
            .ant-select:not(.ant-select-customize-input) .ant-select-selector {
                position: relative;
                background-color: #fff;
                border: 0px !important;
                border-radius: 2px;
                transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
        }
    `,


])

export const DatePickerCustom = styled(DatePicker)(() => [
    tw`!p-0`,
    css`
        && {
                
            .ant-picker-input {
                position: relative;
                display: inline-flex;
                align-items: center;
                width: auto;
            }
        }
    `,


])

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

