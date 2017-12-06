mui.init();

var IPPost = localStorage.getItem("IPPost");

//监听刷新页面
window.addEventListener('refresh', function(e) {
	location.reload();
});

var userId = localStorage.getItem("userId");
var ipPost = localStorage.getItem('');
mui.ready(function() {
	var url = IPPost + 'examonline/appsign/applookinfo';
	mui.ajax(url, {
		data: {
			'userId': userId
		},
		type: "POST",
		timeout: 3000,
		success: succFunction,
		error: function() {
			mui.toast("获取个人信息失败，网络错误");
		}
	});

	function succFunction(message) {
		var resultJson = JSON.parse(JSON.stringify(message));
		var userDiv = document.getElementById('p_username');
		var p_memo = document.getElementById('p_memo');
		var photo = document.getElementById('img');
		var result = resultJson.result;
		var member = resultJson.object;
		var loginName = member.loginName;
		var memo = member.memo;
		//var gender = member.gender;
		if(result == "success") {
			userDiv.innerHTML = loginName;
			p_memo.innerHTML = "个性签名:&nbsp;&nbsp;"+memo;
			photo.src=member.imgsrc;
		} else {
			mui.toast(resultJson.result);
		}
	}
});
//退出按钮
document.getElementById("cell4").addEventListener('tap', function() {
	localStorage.removeItem("autologin");
	localStorage.removeItem("US_CODE");
	localStorage.removeItem("US_PWD");
	plus.webview.getWebviewById('index').close('none');
});
//修改密码按钮
document.getElementById("cell2").addEventListener('tap', function() {
	mui.openWindow({
		url:'../login/modify_pw.html',
		id:'modify_py'
	})
});
//成绩曲线
document.getElementById("cell1").addEventListener('tap', function() {
	mui.openWindow({
		url:'../personal/development_chart.html',
		id:'development_chart'
	})
});
//个人信息
document.getElementById("userinfo").addEventListener('tap', function() {
	var url = IPPost + 'examonline/appsign/applookinfo';
	mui.ajax(url, {
		data: {
			'userId': userId
		},
		type: "POST",
		timeout: 3000,
		success: succFunction,
		error: function() {
			mui.toast("获取个人信息失败，网络错误");
		}
	});

	function succFunction(message) {
		var resultJson = JSON.parse(JSON.stringify(message));
		var result = resultJson.result;
		var member = resultJson.object;
		var loginName = member.loginName;
		var name = member.name;
		var email = member.email;
		var mobile = member.mobile;
		var memo = member.memo;
		var gender = member.gender;
		var imgsrc = member.imgsrc;
		if(result == "success") {
			mui.toast(resultJson.object.account);
			mui.openWindow({
				url: '../personal/userInfo.html',
				id: 'userInfo',
				extras: {
					loginName: loginName,
					name: name,
					email: email,
					mobile: mobile,
					memo: memo,
					gender:gender,
					imgsrc:imgsrc
				}
			});

		} else {
			mui.toast(resultJson.result);
		}
	}
})