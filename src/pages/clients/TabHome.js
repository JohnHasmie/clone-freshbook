import React from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";

export default function TabHome() {
  const history = useHistory();
  return (
    <div tw="grid grid-cols-3 gap-4 justify-items-center content-center">
      <div
        tw="cursor-pointer w-full text-center hover:border-t hover:border-primary"
        onClick={() => history.push("/clients/overdue")}
      >
        <div>
          <span tw="text-4xl font-bold text-blue-700">$0 </span>
          <span tw="text-sm font-bold text-blue-700 ">USD</span>
        </div>

        <p tw="text-secondary">overdue</p>
      </div>
      <div
        tw="cursor-pointer w-full text-center hover:border-t hover:border-primary"
        onClick={() => history.push("/clients/outstanding")}
      >
        <div>
          <span tw="text-4xl font-bold text-blue-700">$0 </span>
          <span tw="text-sm font-bold text-blue-700 ">USD</span>
        </div>
        <p>total outstanding</p>
      </div>
      <div
        tw="cursor-pointer w-full text-center hover:border-t hover:border-primary"
        onClick={() => history.push("/clients/draft")}
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
