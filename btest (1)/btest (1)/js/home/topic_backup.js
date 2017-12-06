var sum, msg, second, minutes, seconds;
var timeSpent = document.getElementById('timeSpent');
var radialObj = radialIndicator('#indicatorContainer', {
	radius: 80,
	barColor: {
		0: '#FF0000',
		40: '#FFFF00',
		60: '#0066FF',
		80: '#0000FF',
		100: '#33CC33'
	},
	initValue: 0,
	minValue: 0,
	maxValue: 100,
	barWidth: 7,
	barBgColor: 'grey',
	fontWeight: 'bold',
	fontSize: 50
});
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	sum = self.sum * 15;
	second = self.second;
	arrnumber = self.arrnumber;
	minutes = Math.floor(second / 60) < 10 ? ('0' + Math.floor(second / 60)) : (Math.floor(second / 60) + "");
	seconds = Math.floor(second % 60) < 10 ? ('0' + Math.floor(second % 60)) : (Math.floor(second % 60) + "");
	msg = '用时：' + minutes + ":" + seconds;
	timeSpent.innerHTML = msg;
	console.log("传过来的参数:" + sum + " " + second);
	//Using Instance
	radialObj.animate(sum);
});
//返回的是index.html
mui.oldback = mui.back;
var clickNum = 0;
mui.back = function(event) {
	plus.webview.getWebviewById("topic_content").close('none');
	plus.webview.getWebviewById("topic_backup").close('none')
	mui.openWindow({
		url: '/index.html',
		id: 'index'
	});
	return false;
}
//查看答案
document.getElementById("see_as").addEventListener('tap', function() {
	mui.openWindow({
		url: '../home/topic_answer.html',
		id: 'topic_answer',
		extras: {
			arrnumber: arrnumber
		}
	})
});