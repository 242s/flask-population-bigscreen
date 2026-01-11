var chartDom = document.getElementById('r1');
var myChart = echarts.init(chartDom);
var option;

option = {
  title: {
    text: '人口增长因素',
    textStyle: {
      color: 'red'
  }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    data: ['经济因素', '政治因素', '文化教育', '医疗水平', '自然资源'],
    top:40,
    textStyle: {
      color: 'red'
  }
  },
  series: [
    {
      name: '人口增长因素',
      type: 'funnel',
      left: '10%',
      top: 70,
      bottom: 60,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: [
        { value: 60, name: '文化因素' },
        { value: 40, name: '医疗水平' },
        { value: 20, name: '自然资源' },
        { value: 80, name: '政治因素' },
        { value: 100, name: '经济因素' }
        
      ]
    }
  ]
};
myChart.setOption(option)
