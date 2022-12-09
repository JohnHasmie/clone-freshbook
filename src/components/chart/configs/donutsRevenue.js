const donutsRevenue={
    series: [100],
    options: {
      chart: {
        type: 'donut',
      },
      colors:['#9c4aa4', '#E91E63', '#9C27B0'],
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
    export default donutsRevenue;