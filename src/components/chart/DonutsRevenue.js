import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { FileDoneOutlined, MinusOutlined } from "@ant-design/icons";
import tw from "twin.macro";
import donutsRevenue from "./configs/donutsRevenue";
import { DonutStyled } from "./DonutChart.style";


function DonutsRevenue() {
  const { Title, Paragraph } = Typography;

  return (
    <div tw="grid grid-cols-2">
  

   <div tw="flex">
       <DonutStyled
         options={donutsRevenue.options}
         series={donutsRevenue.series}
         type="donut"
         height={350}
         width={"100%"}
       />
       <div tw="text-lg">
       <FileDoneOutlined tw="text-xl mr-2 text-primary" />
       <span>Invoices</span>
       <span tw="text-gray-400 ml-2">-$6,000</span>
       </div>
   </div>
          <div tw="flex flex-col justify-start items-end">
          <div tw="font-bold text-primary text-lg md:text-3xl">$6,000</div>
          <div>this month</div>
      </div>
    </div>
  );
}

export default DonutsRevenue;
