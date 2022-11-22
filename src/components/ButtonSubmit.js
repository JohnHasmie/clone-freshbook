import { Button, Divider } from "antd";
import React from "react";
import tw from 'twin.macro';

export default function ButtonSubmit({...rest}) {
  return (
    <div tw='bg-white border-t border-gray-200 fixed bottom-0 w-full h-20 ' >
      <Button {...rest} tw='bg-success text-white mt-5'  htmlType="submit" style={{ width: "100px" }}>
        SAVE
      </Button>
    </div>
  );
}
