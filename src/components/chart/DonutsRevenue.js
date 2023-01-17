import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { FileDoneOutlined, MinusOutlined } from "@ant-design/icons";
import tw from "twin.macro";
// import donutsRevenue from "./configs/donutsRevenue";
import { DonutStyled } from "./DonutChart.style";
import { getTotalGlobal, numberWithDot } from "../Utils";


function DonutsRevenue({dataPayment,filterPayment}) {
  const { Title, Paragraph } = Typography;
  const newData=getTotal(dataPayment?.data?.data?.map((item)=>{
    const splitAmount=item?.amount?.split(".")
    return parseInt(splitAmount[0]);
  }))
  const donutsRevenue={
    series: [newData && newData],
    options: {
      chart: {
        type: 'donut',
      },
      colors:['#9c4aa4'],
      dataLabels: {
        enabled: false
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false,
            // position: 'bottom'
            offsetX: 0,
            offsetY: 0,
          }
        }
      }]
    }}
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
       <FileDoneOutlined tw="text-xl mr-2 text-[#9c4aa4]" />
       <span>Invoices</span>
       <span tw="text-gray-400 ml-2">{filterPayment?.currency == "GBP" ? '£' : "$"}{newData && numberWithDot(newData)}</span>
       </div>
   </div>
          <div tw="flex flex-col justify-start items-end">
          <div tw="font-bold text-primary text-lg md:text-3xl">{filterPayment?.currency == "GBP" ? '£' : "$"}{newData && numberWithDot(newData)}</div>
          <div>this month</div>
      </div>
    </div>
  );
}

export default DonutsRevenue;

export function getTotal(outstanding) {
  const sum = outstanding.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return sum
}