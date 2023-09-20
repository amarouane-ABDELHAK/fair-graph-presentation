var echarts = require('echarts');
const { on } = require('events');


var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

myChart.showLoading();
$.get('./data/fair.json', function (data) {
  myChart.hideLoading();
  data.children.forEach(function (datum, index) {
   // index % 2 === 0 && (datum.collapsed = true);
   datum.collapsed = true
  });

  myChart.setOption(
    (option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: (params) => {
          console.log(params);
          return `
          My thing: ${params.data.value}<br />
          New Thing: ${params.data.descr}
          `;
        }
      },
      series: [
        {
          type: 'tree',
          data: [data],
          top: '1%',
          left: '7%',
          bottom: '1%',
          right: '20%',
          symbolSize: 7,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            show: true,
            fontSize: 12
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    })
  );
});

option && myChart.setOption(option);


// myChart.on('mouseover', function(params) {
//   return `
//   Tooltip: <br />
//   My thing: ${params.data.value}<br />
//   New Thing: ${params.descr}
//   `;
// });