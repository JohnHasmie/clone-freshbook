import tw, { styled, css } from "twin.macro";
import { Divider, Input, Select } from "antd";

export const InputKeyword = styled(Input)(() => [
  tw`rounded-l-md  rounded-r-none`,
]);

export const SelectKeyword = styled(Select)(() => [
  tw``,
  css`
    && {
      .ant-select-selector {
        ${tw`!rounded-l-none rounded-r-md`}
      }
    }
  `,
]);

export const DividerCustom = styled.hr(() => [
  tw`border border-gray-300 py-0 border-solid box-border`,
 
]);
