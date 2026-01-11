




fetch('/l1')
  .then(response => response.json())
  .then(data => {
    const chartDom = document.getElementById('l1');
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: '近年人口增长'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['2024', '2023', '2022', '2021'],
        name: "年份"
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Value',
        type: 'line',
        data: data  // 替换为你的数据字段
      }]
    };
    if ('city' in data) {
        option.title.text = data.city;
    }
    myChart.setOption(option);
    myChart.setOption(option);
    
  })
  .catch(error => console.error('Error fetching data:', error));
  window.onload = function () {
    // var chartDom = document.getElementById('l2');
    //   var myChart = echarts.init(chartDom);
      fetch(); // 在这里调用获取数据的函数
      setInterval(fetch, 5000);
  };
  
 