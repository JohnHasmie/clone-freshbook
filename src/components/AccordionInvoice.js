import { Collapse, Form, Input } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import React from "react";
import tw from "twin.macro";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
export default function AccordionInvoice() {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Collapse tw=" bg-pink-300" defaultActiveKey={["1"]} onChange={onChange}>
      <CollapsePanel header="Overdue" key="1">
      
        <Form>
          <Form.Item name="message">
            <Input placeholder="Send a message" />
          </Form.Item>
        </Form>
      </CollapsePanel>
    </Collapse>
  );
}
