import ReactApexChart from "react-apexcharts";
import barChart from "./configs/barChart";

function BarChartClient() {


  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={barChart.options}
          series={barChart.series}
          type="bar"
          height={150}
        />
      </div>
     
    </>
  );
}

export default BarChartClient;
