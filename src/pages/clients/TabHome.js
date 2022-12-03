import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import tw from "twin.macro";

export default function TabHome() {
  const history = useHistory();
  let { pathname } = useLocation();
const handleClick=(type)=>{
  if(pathname.includes('clients')){
    history.push(`/clients/${type}`)
  }else{
    history.push(`/invoices/${type}`)
  }
}
  return (
    <div tw="hidden md:grid grid-cols-3 gap-4 justify-items-center content-center">
      <div
        tw="cursor-pointer w-full text-center hover:border-t hover:border-primary"
        onClick={() => handleClick("overdue")}
      >
        <div>
          <span tw="text-4xl font-bold text-blue-700">$0 </span>
          <span tw="text-sm font-bold text-blue-700 ">USD</span>
        </div>

        <p tw="text-secondary">overdue</p>
      </div>
      <div
        tw="cursor-pointer w-full text-center hover:border-t hover:border-primary"
        onClick={() => handleClick("outstanding")}
      >
        <div>
          <span tw="text-4xl font-bold text-blue-700">$0 </span>
          <span tw="text-sm font-bold text-blue-700 ">USD</span>
        </div>
        <p>total outstanding</p>
      </div>
      <div
        tw="cursor-pointer w-full text-center hover:border-t hover:border-primary"
        onClick={() => handleClick("draft")}
      >
        <div>
          <span tw="text-4xl font-bold text-blue-700">$0 </span>
          <span tw="text-sm font-bold text-blue-700 ">USD</span>
        </div>
        <p>in draft</p>
      </div>
    </div>
  );
}
