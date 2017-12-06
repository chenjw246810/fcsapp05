(function($, doc) {
	$.init();
	$.plusReady(function() {
		var opwBox = doc.getElementById('opw');
		var npwBox = doc.getElementById('npw');
		var spwBox = doc.getElementById('spw');
		var sureButton = doc.getElementById('sure');
		//确定按钮
		sureButton.addEventListener('tap', function() {
			var opw = opwBox.value;
			var npw = npwBox.value;
			var spw = spwBox.value;
			var psw=localStorage.getItem("psw");
			if(opw.length < 3) {
				plus.nativeUI.toast('密码太短');
				return;
			}
			if(npw != spw && npw != null) {
				plus.nativeUI.toast('新密码两次输入不一致');
				return;
			} 
			if(opw.length > 2 && npw == spw) {
				var userid = localStorage.getItem("userId");
				mui.toast(userid)
				var IPPost = localStorage.getItem("IPPost");
				var url = IPPost + 'examonline/appsign/appmodifypwd';
				var user = {
					'id': userid,
					'oldpassword': opw,
					'password': npw
				};
				mui.ajax(url, {
					contentType: "application/json",
					dataType: "json",
					data: JSON.stringify(user),
					type: "POST",
					timeout: 3000,
					success: function(data) {
						if(data.result=="success"){
							mui.toast("修改成功");
						}
						else{
							mui.toast("原密码错误，请从新输入")
						}						
					},
					error: function() {
						mui.toast("修改失败，网络错误");
					}
				});
			}
		}, false);

	});
}(mui, document));

//防止键盘挤压背景图片
var originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
window.onresize = function() {
	//软键盘弹起与隐藏  都会引起窗口的高度发生变化
	var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
	//resizeHeight<originalHeight证明窗口被挤压了
	if(resizeHeight * 1 < originalHeight * 1) {
		plus.webview.currentWebview().setStyle({
			height: originalHeight
		});
	}
}