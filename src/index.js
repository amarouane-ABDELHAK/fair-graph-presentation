var echarts = require('echarts');
const { on } = require('events');

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;
var expendedNodes = [];
var node_data = null;
var changeWidth = true;

myChart.showLoading();



$.get('./fair-mapping.json', function (data) {
  
  myChart.hideLoading();
  data.children.forEach(function (datum, index) {
   // index % 2 === 0 && (datum.collapsed = true);
   datum.collapsed = true

  });
  node_data = data;


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
      edgeLabel: {
        fontSize: 20
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
        animationDurationUpdate: 750,

      },

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




// var echarts = require('echarts');

// var chartDom = document.getElementById('main');
// var myChart = echarts.init(chartDom);
// var option;

// option = {
//   title: {
//     text: 'Basic Graph'
//   },
//   tooltip: {},
//   animationDurationUpdate: 1500,
//   animationEasingUpdate: 'quinticInOut',
//   series: [
//     {
//       type: 'graph',
//       layout: 'none',
//       symbolSize: 50,
//       roam: true,
//       label: {
//         show: true
//       },
//       edgeSymbol: ['circle'],
//       edgeSymbolSize: [4, 10],
//       edgeLabel: {
//         fontSize: 20
//       },
//       data: [
//         {
//           name: 'Node 1',
//           x: 300,
//           y: 300
//         },
//         {
//           name: 'Node 2',
//           x: 800,
//           y: 300
//         },
//         {
//           name: 'Node 3',
//           x: 550,
//           y: 100
//         },
//         {
//           name: 'Node 4',
//           x: 550,
//           y: 500
//         }
//       ],
//       // links: [],
//       links: [
//         {
//           source: 0,
//           target: 1,
//           symbolSize: [5, 20],
//           label: {
//             show: true,
//             formatter: function (params) {
//               return "Hello"; 
//             },
//           },
//           lineStyle: {
//             width: 5,
//             curveness: 0.2
//           }
//         },
//         {
//           source: 'Node 2',
//           target: 'Node 1',
//           label: {
//             show: true
//           },
//           lineStyle: {
//             curveness: 0.2
//           }
//         },
//         {
//           source: 'Node 1',
//           target: 'Node 3'
//         },
//         {
//           source: 'Node 2',
//           target: 'Node 3'
//         },
//         {
//           source: 'Node 2',
//           target: 'Node 4'
//         },
//         {
//           source: 'Node 1',
//           target: 'Node 4'
//         }
//       ],
//       lineStyle: {
//         opacity: 0.9,
//         width: 2,
//         curveness: 0
//       }
//     }
//   ]
// };

// option && myChart.setOption(option);