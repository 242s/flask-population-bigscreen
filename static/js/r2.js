var chartDom = document.getElementById('r2');
var myChart = echarts.init(chartDom);
var option;

option = {
  title: {
    text: '近年出生率',
    textStyle: {
      color: 'red'
  }
  },
  xAxis: {
    type: 'category',
    data: ['2018', '2019', '2020', '2021','2022']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [ 10.86, 10.41, 8.52, 7.52, 6.77],
      type: 'line'
    }
  ]
};
myChart.setOption(option)