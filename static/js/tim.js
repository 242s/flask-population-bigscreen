function get_tim_data() {
    var date = new Date();
    var year = date.getFullYear(); //获取年份
    var month = date.getMonth() + 1; //获取月份
    var day = date.getDate(); //获取日期
    var hour = date.getHours(); //获取小时
    hour = hour < 10? '0' + hour : hour;
    var minute = date.getMinutes(); // 获取分
    minute = minute < 10? '0' + minute : minute;
    var seconds = date.getSeconds(); //获取秒
    seconds = seconds < 10? '0' + seconds : seconds;
    return year + '年' + month + '月' + day + '日&nbsp;' + hour + ':' + minute + ':' + seconds;
}

setInterval(function () {
    // 假设你想把时间更新到id为'tim'的元素里，如果不是这个元素请修改选择器
    document.getElementById('tim').innerHTML = get_tim_data();
}, 1000);