import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import dashboardChart from "./configs/dashboardChart";

function DashboardChart() {


  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={dashboardChart.options}
          series={dashboardChart.series}
          type="bar"
          height={220}
        />
      </div>
     
    </>
  );
}

export default DashboardChart;
