import ReactApexChart from "react-apexcharts";
import { numberWithDot } from "../Utils";
// import barChart from "./configs/barChart";

function BarChartClient({data,filterOutstanding}) {
  const barChart = {

    series: [{
      name: 'Overdue',
      data: [data?.outstanding_overdue?.total],
      color:"#EC8192"
    },{
      name: 'Outstanding',
      data: [data?.outstanding_invoices?.total],
      color:"#f4d980"
  
    }],
    options: {
      chart: {
        toolbar: {
          show: false
        },
        type: 'bar',
        // height: 350,
        stacked: true,
        stackType: '100%'
      },
          dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
  
        }},
      stroke: {
        width: 1,
        colors: ['#fff']
      },
    
      xaxis: {
        categories: [""],
        labels: {
          formatter: function (val) {
            return val + "K"
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        tooltip: {
          y: {
            formatter: function (val) {
              let currency = filterOutstanding.currency === "USD" ? "$" : "£";
              let dataTooltip= numberWithDot(Math.round(
                val * 100
              ) / 100)
  
              return currency + dataTooltip;
            },
          },
        },
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'left',
        // offsetX: 0
      }
    },
  
  
  };

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
