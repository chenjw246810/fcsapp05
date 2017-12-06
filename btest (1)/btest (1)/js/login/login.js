(function($, doc) {
	$.init({});
	$.plusReady(function() {
		plus.screen.lockOrientation("portrait-primary");
		localStorage.setItem("IPPost", "http://172.16.41.150:9090/");
		
		var mainPage = plus.webview.getWebviewById('index');
		var main_loaded_flag = false;
		if(!mainPage) {
			mainPage = $.preload({
				"id": 'index',
				"url": '/index.html'
			});
		} else {
			main_loaded_flag = true;
		}
		mainPage.addEventListener("loaded", function() {
			main_loaded_flag = true;
		});
		var toMain = function() {
			//使用定时器的原因：
			//可能执行太快，main页面loaded事件尚未触发就执行自定义事件，此时必然会失败
			var id = setInterval(function() {
				if(main_loaded_flag) {
					clearInterval(id);
					$.fire(mainPage, 'show', null);
					mainPage.show("pop-in");
				}
			}, 20);
		};

		//检测是否启用自动登录
		if(localStorage.getItem("autologin") == "1") {
			var US_CODE = localStorage.getItem("US_CODE");
			var US_PWD = localStorage.getItem("US_PWD");
			//调用登录方法
			toMain();
			mui.toast("自动登录");
			//Login(US_CODE, US_PWD);
		}
		//自动登录方法具体实现
		function Login(US_CODE, US_PWD) {
			var IPPost = localStorage.getItem("IPPost");
			var url = IPPost + 'examonline/appsign/applogin';
			mui.ajax(url, {
				data: {
					'account': US_CODE,
					'password': US_PWD
				},
				type: "POST",
				timeout: 3000,
				success: succFunction,
				error: function() {
					mui.toast("登录失败，网络错误");
				}
			});
		}
		//自动登录成功时执行方法
		function succFunction(message) {
			var resultJson = JSON.parse(JSON.stringify(message));
			var result = resultJson.result;
			if(result == "success") {
				localStorage.setItem("userId", resultJson.object.id);
				var userId = localStorage.getItem("userId");
//				mui.toast(userId);
//				mui.openWindow({
//					url: '/index.html',
//					id: 'index',
//					preload: true,
//				});
			} else {
				mui.openWindow({
					url: '../login/login.html',
					id: 'login',
					preload: true,
				});
				mui.toast("密码错误，登录失败");
			}
		}

		// close splash
		setTimeout(function() {
			//关闭 splash
			plus.navigator.closeSplashscreen();
		}, 600);

		//拿到标签信息
		var account, password;
		var loginButton = doc.getElementById('login');
		var accountBox = doc.getElementById('account');
		var passwordBox = doc.getElementById('password');
		var autoLoginButton = doc.getElementById("autoLogin");
		var regButton = doc.getElementById('reg');
		var forgetButton = doc.getElementById('forgetPassword');
		//点击登录按钮
		loginButton.addEventListener('tap', function(event) {
			var loginInfo = {
				account: accountBox.value,
				password: passwordBox.value

			};
			app.login(loginInfo, function(err) {});
		});
		//自动登录按钮
		autoLoginButton.addEventListener('toggle', function(event) {
			setTimeout(function() {
				if(event.detail.isActive) {
					// 是否选中
					localStorage.setItem("autologin", "1")
					localStorage.setItem("US_CODE", accountBox.value);
					localStorage.setItem("US_PWD", passwordBox.value);
				} else {
					localStorage.setItem("autologin", "0")
				}
			}, 50);
		}, false);
		//注册按钮
		regButton.addEventListener('tap', function(event) {
			$.openWindow({
				url: 'reg.html',
				id: 'reg',
				preload: true,
				show: {
					aniShow: 'pop-in'
				},
				styles: {
					popGesture: 'hide'
				},
				waiting: {
					autoShow: false
				}
			});
		}, false);
		//忘记密码按钮
		forgetButton.addEventListener('tap', function(event) {
			$.openWindow({
				url: 'forget_password.html',
				id: 'forget_password',
				preload: true,
				show: {
					aniShow: 'pop-in'
				},
				styles: {
					popGesture: 'hide'
				},
				waiting: {
					autoShow: false
				}
			});
		}, false);

		//连两次返回退出应用
		var backButtonPress = 0;
		$.back = function(event) {
			backButtonPress++;
			if(backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 1000);
			return false;
		};
	});
}(mui, document));