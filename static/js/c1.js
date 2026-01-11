$(document).ready(function () {
	// 定义定时刷新函数
	function refreshData() {
		$.ajax({
			url: "/c1",
			type: "GET",
			dataType: "json",
			success: function (data) {
				$(".num h1").eq(0).text(data.city).css("font-size", "25px");
				$(".num h1").eq(1).text(data.number).css("font-size", "25px");
				$(".num h1").eq(2).text(data.man).css("font-size", "25px");
				$(".num h1").eq(3).text(data.woman).css("font-size", "25px");
			},
			error: function (xhr, type, errorThrown) {
				console.error("AJAX请求出错啦", xhr, type, errorThrown);
			}
		});
	}
	// 页面加载完成后先执行一次刷新
	refreshData();
	// 每隔5秒执行一次刷新数据的函数
	setInterval(refreshData, 5000);
});