import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
// import lineChart from "./configs/lineChart";
import tw from "twin.macro";
import { getTotalGlobal, numberWithDot } from "../Utils";

function LineChart({dataRevenue,filterRecurring}) {
  const { Title, Paragraph } = Typography;

  const numbers = [];

  for (let i = 1; i <= 12; i++) {
    numbers.push(i*0);
  }
  const lineChart = {
    series: [
      {
        name: "Profit",
        data: dataRevenue?.data?.record?.map(item=>item.recurring),
        offsetY: 0,
      }
  
    ],
  
    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
  
      legend: {
        show: false,
      },
  
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
  
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },
  
      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: [
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
            ],
          },
        },
        categories: dataRevenue?.data?.record?.map(item=>item.month),
      },
  
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };
  return (
    <>
      <div tw="flex justify-end">
        <div tw="grid justify-items-end">
          <div tw="font-bold text-primary text-lg md:text-3xl">{filterRecurring?.currency == "GBP" ? '£' : "$"}{dataRevenue?.data?.total?.recurring && numberWithDot(dataRevenue?.data?.total?.recurring)}</div>
          <div>this month</div>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;

// export function calculateData(data) {
//   const numbers = [];

//   for (let i = 1; i <= 12-data.length; i++) {
//     numbers.push(i*0);
//   }
//   const newData=data?.map(item=>item?.profit)
//   newData.push(...numbers)
// return newData

// }