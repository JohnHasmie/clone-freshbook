import { RetweetOutlined, RightOutlined } from "@ant-design/icons";

import React from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";

export default function CreateRecurring({Filtering,open,setOpen,setIsRecurring}) {

  return (
    <div tw="md:col-span-3 mb-10">
    {!open ? <>
         <h3 tw="text-xl font-bold">Settings</h3>
         <span tw="text-xs text-gray-400">For this template</span>
         <div tw="border-y border-black mt-3 px-1 py-2 cursor-pointer hover:text-primary" onClick={()=>{
          setIsRecurring(true)
          setOpen(!open)
          
          }}>
           <div tw="bg-transparent rounded p-2 hover:bg-blue-50">
             <div tw=" flex justify-between items-center">
               <div tw="flex items-center ">
                 <RetweetOutlined />
                 <span tw="text-base font-bold ml-2">Recurring Schedule</span>
               </div>
               <RightOutlined />
             </div>
             <span tw="text-xs ml-5">Sends an invoice every month</span>
           </div>
         </div>
     </> : <>
     {Filtering}
     </>}
    </div>
  );
}
export function MakeRecurring({Filtering,open,setOpen,setIsRecurring}) {

  return (
    <div tw="md:col-span-3 mb-10">
    {!open ? <>
         <h3 tw="text-xl font-bold">Settings</h3>
         <span tw="text-xs text-gray-400">For this invoice</span>
         <div tw="border-y border-black mt-3 px-1 py-2 cursor-pointer hover:text-primary" onClick={()=>{
          setIsRecurring(true)
          setOpen(!open)
          
          }}>
           <div tw="bg-transparent rounded p-2 hover:bg-blue-50">
             <div tw=" flex justify-between items-center">
               <div tw="flex items-center ">
                 <RetweetOutlined />
                 <span tw="text-base font-bold ml-2">Make Recurring</span>
               </div>
               <RightOutlined />
             </div>
             <span tw="text-xs ml-5">Bill your clients automatically</span>
           </div>
         </div>
     </> : <>
     {Filtering}
     </>}
    </div>
  );
}