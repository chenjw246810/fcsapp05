mui.init();
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	arry= self.arrnumber;//错误的题号
	console.log(arry);
	var length = 50; //获取的题目总数
//	var errorIndex = new Array(arry,2); //错误的题号
	for(var i = 1; i <= length; i++) {
		var answerDiv = '<div class="answer"><span class="number">' + i + '</span></div>';
		$(".mui-content").append(answerDiv);
	}
	for(var j = 0; j < arry.length; j++) {
		$(".mui-content").find("div").eq(arry[j]).attr("class", "answer error_topic");
	}
});
//var length = 50; //获取的题目总数
//var errorIndex = new Array(arry); //错误的题号
//mui.init();

//mui.ready(function() {
//	for(var i = 1; i <= length; i++) {
//		var answerDiv = '<div class="answer"><span class="number">' + i + '</span></div>';
//		$(".mui-content").append(answerDiv);
//	}
//	for(var j = 0; j < errorIndex.length; j++) {
//		$(".mui-content").find("div").eq(errorIndex[j]).attr("class", "answer error_topic");
//	}
//	//	for(var j = 0; j < arr.length; j++) {
//	//		$(".mui-content").find("div").eq(arr[j]).attr("class", "answer error_topic");
//	//	}
//
//});