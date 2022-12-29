import { DatePicker } from "antd";
import tw, { css, styled } from "twin.macro";

export const StyledDatePicker = styled(DatePicker)(() => [
    tw`rounded-md text-sm -ml-3 border border-transparent`,
    css`
        &.ant-picker-focused {
            ${tw`border-inherit`}
        }

        .ant-picker-input > input {
            ${tw`text-sm`}
        }
    `,
])