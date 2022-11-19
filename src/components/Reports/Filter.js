import { BarsOutlined, RightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React, { useState } from "react";
import tw from "twin.macro";

export default function Filter({Filtering}) {
  const { Title } = Typography;
  const [open, setOpen] = useState(false)
  return (
    <div tw="col-span-3">
    {!open ? <>
         <Title level={3}>Settings</Title>
         <div tw="border-y border-black px-1 py-2 cursor-pointer" onClick={()=>setOpen(!open)}>
           <div tw="bg-transparent rounded-md p-2 hover:bg-blue-100">
             <div tw=" flex justify-between items-center">
               <div tw="flex items-center ">
                 <BarsOutlined />
                 <span tw="text-base text-black ml-2">Filters</span>
               </div>
               <RightOutlined />
             </div>
             <span tw="text-gray-600 text-xs ml-5">No Filters applied</span>
           </div>
         </div>
     </> : <>
     {Filtering}
     </>}
    </div>
  );
}
