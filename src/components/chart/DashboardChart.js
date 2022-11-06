import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import dashboardChart from "./configs/dashboardChart";

function DashboardChart() {


  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
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
