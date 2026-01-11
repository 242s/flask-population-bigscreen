$(document).ready(function () {
    // 获取id为c2的DOM元素，作为echarts图表的容器
    var mapContainer = document.getElementById('c2');
    // 使用echarts初始化图表实例，传入c2对应的DOM节点
    var myChart = echarts.init(mapContainer);

    // 配置项，这里使用了china.js中的地理数据（假设china.js是按echarts要求格式定义的地图数据）
    var option = {
        // 指定地图类型为china（对应china.js里定义的中国地图相关数据）
        series: [{
            type: 'map',
            map: 'china'
        }]
    };

    // 使用配置项显示图表
    myChart.setOption(option);
});