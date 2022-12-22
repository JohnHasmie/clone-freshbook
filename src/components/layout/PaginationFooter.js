import { Select } from "antd";
import React from "react";

export default function PaginationFooter({filterProps}) {
  const [filter,setFilter]= filterProps
  return (
    <Select
      value={filter.limit}
      onChange={(e)=>setFilter({...filter, limit:e})}
      options={[
       
        {
          value: 10,
          label: 10,
        },
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
