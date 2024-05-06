var echarts = require('echarts');
const { on } = require('events');

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

myChart.showLoading();




$.get('./data/fair-mapping.json', function (data) {
  myChart.hideLoading();
  data.children.forEach(function (datum, index) {
   // index % 2 === 0 && (datum.collapsed = true);
   datum.collapsed = true

  });

  var links = [];
  data.children.forEach(function (datum) {
    if (datum.link) {
      links.push({
        source: datum.id, // Replace with the actual ID of the source node
        target: datum.needs.id, // Replace with the actual ID of the target node
        label: {
          show: true,
          formatter: function (params) {
            return params.data.link; // Display the "needs" information here
          },
          position: 'middle',
          color: 'blue', // Customize the color of the label
          distance: 30 // Adjust this value to control the label's position along the edge
        }
      });
    }
  });

  myChart.setOption(
    (option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: (params) => {
          let description = ''
          if (params.data.descr) {
            description = `Description: ${params.data.descr}`
          }
          return `
          Name: ${params.data.value}<br/>
          ${description}
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
          lineStyle: {
            width: 2
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