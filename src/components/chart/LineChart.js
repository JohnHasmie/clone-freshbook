import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
// import lineChart from "./configs/lineChart";
import tw from "twin.macro";
import { getTotalGlobal, numberWithDot } from "../Utils";

function LineChart({dataTotalProfit}) {
  const { Title, Paragraph } = Typography;

  console.log(dataTotalProfit,"totalProfit");
  const lineChart = {
    series: [
      {
        name: "Profit",
        data: dataTotalProfit?.income?.map(item=>item?.profit),
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
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
          <div tw="font-bold text-primary text-lg md:text-3xl">{dataTotalProfit?.income && numberWithDot(getTotalGlobal(dataTotalProfit?.income?.map(item=>item?.profit)))}</div>
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
