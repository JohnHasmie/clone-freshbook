import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import tw from "twin.macro";

function LineChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div tw="flex justify-end">
        <div tw="grid justify-items-end">
          <div tw="font-bold text-primary text-lg md:text-3xl">$6,000</div>
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
