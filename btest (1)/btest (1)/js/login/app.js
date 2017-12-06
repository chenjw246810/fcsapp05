(function($, owner) {
	/**
	 * 用户登录
	 **/
	var account, password;
	owner.login = function(loginInfo) {
		account = loginInfo.account || '';
		password = loginInfo.password || '';
		if(account.length < 5) {
			mui.toast('邮箱最短为 5个字符');
		} else if(password.length < 5) {
			mui.toast('密码最短为 5个字符');
		} else {
			var IPPost = localStorage.getItem("IPPost");
			var url = IPPost + 'examonline/appsign/applogin';
			mui.ajax(url, {
				data: {
					'account': account,
					'password': password
				},
				type: "POST",
				timeout: 3000,
				success: succFunction,
				error: function() {
					mui.toast("登录失败，网络错误");
				}
			});
		}
	};

	//登录成功时执行方法
	function succFunction(message) {
		var resultJson = JSON.parse(JSON.stringify(message));
		var result = resultJson.result;
		if(result == "success") {
			localStorage.setItem("userId", resultJson.object.id);
			localStorage.setItem("psw", resultJson.object.password);
			localStorage.setItem("users",resultJson.object);
			var userId = localStorage.getItem("userId");
			mui.toast(userId);
			mui.openWindow({
				url: '/index.html',
				id: 'index',
				preload: true,
			});
		} else {
			mui.toast(resultJson.result);
		}
	}
	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo) {
		account = regInfo.email || '';
		yzm = regInfo.yzm || '';
		password = regInfo.password || '';
		if(!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		} else if(yzm.length != 4) {
			return callback('请输入四位验证码');
		} else if(password.length < 5) {
			return callback('密码最短需要 5 个字符');
		} else {
			var IPPost = localStorage.getItem("IPPost");
			var url = IPPost + 'examonline/appsign/appregister';
			var user = {
				'loginName': account,
				'password': password
			};
			mui.ajax(url, {
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(user),
				type: "POST",
				timeout: 3000,
				success: regFunction,
				error: function() {
					mui.toast("注册失败，网络错误");
				}
			});
		}
	};

	//注册成功时执行方法
	function regFunction(message) {
		var resultJson = JSON.parse(JSON.stringify(message));
		var result = resultJson.result;
		if(result == "success") {
			plus.webview.getLaunchWebview().show("pop-in", 200, function() {
				plus.webview.currentWebview().close("none");
			});
			mui.toast(resultJson.result);
		} else {
			mui.toast(resultJson.result);
		}
	}
	//检测邮箱	
	var checkEmail = function(email) {
		email = email || '';
		return(email.length > 3 && email.indexOf('@') > -1);
	};
}(mui, window.app = {}));

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