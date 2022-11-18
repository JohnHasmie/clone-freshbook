import { Button, Divider } from "antd";
import React from "react";

export default function ButtonSubmit() {
  return (
    <div style={{ padding: "20px 0" }}>
      <Divider />
      <Button type="primary" htmlType="submit" style={{ width: "100px" }}>
        SAVE
      </Button>
    </div>
  );
}
