const donutsRevenue={
    series: [100],
    options: {
      chart: {
        type: 'donut',
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
    export default donutsRevenue;