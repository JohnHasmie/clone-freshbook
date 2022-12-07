const barChart = {
 
  // series: [{
  //   name: 'Overdue',
  //   data: [0]
  // },{
  //   name: 'Outstanding',
  //   data: [25]
  // }],
  // options: {
  //   chart: {
  //     type: 'bar',
  //     stacked: true,
  //     stackType: '100%'
  //   },
    // plotOptions: {
    //   bar: {
    //     horizontal: true,
    //     borderRadius: 4,

    //   },
  //   },
  //   stroke: {
  //     width: 1,
  //     colors: ['#fff']
  //   },
 
  //   xaxis: {
  //     categories: [""],
  //   },
  

  //   tooltip: {
  //     y: {
  //       formatter: function (val) {
  //         return val + "K"
  //       }
  //     }
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  //   fill: {
  //     opacity: 1
    
  //   },
  //   legend: {
  //     position: 'bottom',
  //     horizontalAlign: 'left',
  //     offsetX: 0
  //   }
  // },



  series: [{
    name: 'Overdue',
    data: [20000],
    color:"#EC8192"
  },{
    name: 'Outstanding',
    data: [15000],
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
      y: {
        formatter: function (val) {
          return val + "K"
        }
      }
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


export default barChart;
