import { Select } from "antd";
import React from "react";

export default function PaginationFooter() {
  return (
    <Select
      defaultValue={100}
      options={[
        {
          value: 30,
          label: 30,
        },
        {
          value: 50,
          label: 50,
        },
        {
          value: 100,
          label: 100,
        },
        {
          value: 150,
          label: 150,
        },
      ]}
    />
  );
}
