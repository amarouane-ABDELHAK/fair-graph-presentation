var echarts = require('echarts');
const { on } = require('events');

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;
var expendedNodes = [];
var node_data = null;
var changeWidth = true;

myChart.showLoading();



$.get('./data/fair-mapping.json', function (data) {
  
  myChart.hideLoading();
  data.children.forEach(function (datum, index) {
   // index % 2 === 0 && (datum.collapsed = true);
   datum.collapsed = true

  });
  node_data = data;

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
          distance: 20 // Adjust this value to control the label's position along the edge
        }
      });
    }
  });

  option = {
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
        symbolSize: 7,
        width: "20%",
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
  }

  myChart.setOption(
    (option)
  );
});

// option && myChart.setOption(option);

myChart.on('click', 'series', (x) => { 
  if(changeWidth) {
    expendedNodes = x.data.name;
  
    console.log(x.data.collapsed)
    

  }


})


myChart.on('click', function(params) {
  if(changeWidth) {

  node_data.children.forEach(function (datum) {
    // index % 2 === 0 && (datum.collapsed = true);
    if (datum.name==expendedNodes){
      datum.collapsed = false
    }
    
   });


   option.series[0].data=[node_data];
   option.series[0].width="50%";

   myChart.setOption(
    (option)
  );

  changeWidth = false
   }

  
});