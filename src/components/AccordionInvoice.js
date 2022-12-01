import { Button, Collapse, Form, Input } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import React, { useState } from "react";
import tw from "twin.macro";
import { AccordionCustomPanel } from "./AccordionCustom.style";


export default function AccordionInvoice() {
  const onChange = (key) => {
    console.log(key);
  };
  const [message, setMessage] = useState('')
  
  return (
     <Collapse tw="ml-5 mb-10 " defaultActiveKey={[]} onChange={onChange}>
       <AccordionCustomPanel  header="Overdue" key="1">       
         <Form>
          <ul style={{paddingInlineStart:'30px'}}>
            <li>You created this invoice</li>

          </ul>
           <Form.Item tw="flex" name="message">
            <span tw="rounded-full p-2 border border-green-200 text-lg font-bold">SJ</span>
            <Input value={message} onChange={(e)=>setMessage(e.target.value)} className={`${message ? 'accordion-message-active ': 'accordion-message'}`} placeholder="Send a message" />
             {message ? 
             
             <Button tw="bg-success text-white text-lg ">Send</Button>
             :
             <></>}

           </Form.Item>
         </Form>
       </AccordionCustomPanel>
     </Collapse>
  );
}
