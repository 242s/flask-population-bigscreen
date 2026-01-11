var chartDom = document.getElementById('l2');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '男女比例',
        subtext: '男女比例',
        left: 'center',
        textStyle: {
          color: 'white'
      }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [],  // 先初始化为空数组，后续获取数据后填充
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            textStyle: {
              color: 'white'
          }
          }
        }
      ]
    };

let controller; // 用于控制请求的AbortController变量

function get_l2_data() {
  if (controller) {
    controller.abort(); // 取消之前还未完成的请求
  }
  controller = new AbortController();

  $.ajax({
    url: "/l2",
    dataType: "json",
    signal: controller.signal, // 关联信号用于控制请求取消
    success: function (data) {
      // 清空之前的数据（如果有）
      option.series[0].data = [];
      console.log(data)
      option.series[0].data.push({
        value: data['man'],
        name: '男'
        
      });
      option.series[0].data.push({
        value: data['woman'],
        name: '女'
      });
      if ('city' in data) {
        option.title.text = data.city;
    }
    myChart.setOption(option);
      myChart.setOption(option);
    },
    error: function (error) {
      if (error.name!== 'AbortError') { // 忽略主动取消请求导致的错误
        console.error("获取数据出错：", error);
      }
    }
  });
}

// 页面加载完成后调用获取数据函数
window.onload = function () {
  // var chartDom = document.getElementById('l2');
  //   var myChart = echarts.init(chartDom);
    get_l2_data(); // 在这里调用获取数据的函数
    setInterval(get_l2_data, 5000);
};

