(function($, doc) {
	$.init();
	$.plusReady(function() {
		var sendButton = doc.getElementById('sendMail');
		var sureMailButton = doc.getElementById('sureMail');
		var emailBox = doc.getElementById('email');
		var yzmBox = doc.getElementById('fg_yzm');
		//点击获取验证码按钮
		sendButton.addEventListener('tap', function() {
			var mail = emailBox.value;
			var IPPost = localStorage.getItem("IPPost");
			var url = IPPost + 'examonline/appsign/appgetEmail';
			if (!checkEmail(mail)) {
				mui.toast("邮箱地址不合法");
			}else{
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
						settime(sendButton, countdown);
						mui.toast("发送成功" + mail);
					}
				});
			}
		}, false);
		//验证按钮
		sureMailButton.addEventListener('tap', function() {
			var yzm = yzmBox.value;
			if(yzm.length != 4) {
				mui.toast("请输入四位验证码");
			}
		}, false);
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