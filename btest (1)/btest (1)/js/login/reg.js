(function($, doc) {
	$.init();
	$.plusReady(function() {
		var regButton = doc.getElementById('reg');
		var emailBox = doc.getElementById('email');
		var yzmBox = doc.getElementById('yzm');
		var getyzmButton = doc.getElementById('getyzm');
		var passwordBox = doc.getElementById('password');
		var passwordConfirmBox = doc.getElementById('password_confirm');
		//点击注册按钮
		regButton.addEventListener('tap', function(event) {
			var regInfo = {
				email: emailBox.value,
				yzm: yzmBox.value,
				password: passwordBox.value
			};
			var passwordConfirm = passwordConfirmBox.value;
			if(passwordConfirm != regInfo.password) {
				plus.nativeUI.toast('密码两次输入不一致');
				return;
			}
			app.reg(regInfo, function(err) {});
		});
		//点击获取验证码按钮
		getyzmButton.addEventListener('tap', function(event) {
			var emailBox = doc.getElementById('email');
			var mail = emailBox.value;
			var IPPost = localStorage.getItem("IPPost");
			var url = IPPost + 'examonline/appsign/appgetEmail';
			if(!checkEmail(mail)) {
				mui.toast("邮箱地址不合法");
			} else {
				mui.ajax(url, {
					data: {
						'email': mail,
					},
					type: "POST",
					timeout: 3000,
					error: function() {
						mui.toast("网路错误" + mail)
					},
					success: function(message) {
						//60s倒计时
						var countdown = 60;
						settime(getyzmButton, countdown);
						mui.toast("发送成功" + mail);
					}
				});
			}
		});
	});
	//检测邮箱	
	var checkEmail = function(email) {
		email = email || '';
		return(email.length > 3 && email.indexOf('@') > -1);
	};
}(mui, document));

//验证码按钮60秒倒计时	
function settime(val, countdown) {
	var t;
	if(countdown == 0) {
		val.removeAttribute("disabled");
		val.innerHTML = "发送验证码";
		clearTimeout(t);
		countdown = 60;
	} else {
		val.setAttribute("disabled", true);
		val.innerHTML = "重新发送(" + countdown + ")";
		countdown--;
		t = setTimeout(function() {
			settime(val, countdown)
		}, 1000)
	}
}