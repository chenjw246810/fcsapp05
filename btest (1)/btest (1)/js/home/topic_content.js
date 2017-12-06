var maxtime = 60 * 60; //一个小时，按秒计算，自己调整!  
var second = -1;
var msg;

function CountDown() {
	if(maxtime >= 0) {
		var minutes = Math.floor(maxtime / 60) < 10 ? ('0' + Math.floor(maxtime / 60)) : (Math.floor(maxtime / 60) + "");
		var seconds = Math.floor(maxtime % 60) < 10 ? ('0' + Math.floor(maxtime % 60)) : (Math.floor(maxtime % 60) + "");
		msg = minutes + ":" + seconds;
		document.getElementById("timer").innerHTML = msg;
		second++;
		--maxtime;
	} else {
		clearInterval(timer);
	}
}
timer = setInterval("CountDown()", 1000);

mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var message = self.message;
	var topiclength = message.object.length;
	var is_top = 0; //判断下一题的选中状态
	var i = 0;
	var sum = 0; //计算成绩
	for(var k = 0; k < topiclength; k++) {
		localStorage.removeItem(k);
	} //移除答题localStorage
	//题目数
	$("#topicNumber").html(i + 1 + '/' + topiclength);
	//第一题
	if(message.object[i].type == "单选" || message.object[i].type == "判断") {
		$("#title").html(i + 1 + '.' + message.object[i].title_name);
		$("#a_answer").html('A.' + message.object[i].title_as_1);
		$("#b_answer").html('B.' + message.object[i].title_as_2);
		if(message.object[i].title_as_3 != null) {
			$("#c_answer").html('C.' + message.object[i].title_as_3);
		}
		if(message.object[i].title_as_4 != null) {
			$("#d_answer").html('D.' + message.object[i].title_as_4);
		}
		$("#content1").show();
	} else if(message.object[i].type == "多选") {
		$("#title").html(i + 1 + '.' + message.object[i].title_name);
		$("#a_answer_3").html('A.' + message.object[i].title_as_1);
		$("#b_answer_3").html('B.' + message.object[i].title_as_2);
		$("#c_answer_3").html('C.' + message.object[i].title_as_3);
		$("#d_answer_3").html('D.' + message.object[i].title_as_4);
		if(message.object[i].title_as_5 != null) {
			$("#e_answer_3").html('E.' + message.object[i].title_as_5);
		}
		if(message.object[i].title_as_6 != null) {
			$("#f_answer_3").html('F.' + message.object[i].title_as_6);
		}
		$("#content1_3").show();
	}

	//下一题
	$("#next").click(function() {
		if(i < topiclength - 1) {
			i = i + 1;
			//开始 多选的值开始 
			if(message.object[i].type == "多选" && message.object[i - 1].type == "多选") {
				//console.log("多多");
				var obj = document.getElementsByName("radio-item3");
				var check_val = [];
				for(k in obj) {
					if(obj[k].checked) {
						check_val.push(obj[k].value);
					}
				}
				var answerStirng = check_val.join(""); //得到的答案，答案转为字符串
				console.log("上题选了:" + i + answerStirng);
				localStorage.setItem(i - 1, answerStirng);
				var mluitselect = localStorage.getItem(i) + ""; //下一题记录的答案
				if(mluitselect.indexOf("A") != -1 || mluitselect.indexOf("B") != -1 || mluitselect.indexOf("C") != -1 ||
					mluitselect.indexOf("D") != -1 || mluitselect.indexOf("E") != -1 || mluitselect.indexOf("F") != -1) {
					$('input:checkbox[name="radio-item3"]:checked').prop("checked", false);
					$.each(mluitselect.split(""), function(index, value) {
						console.log("这题选了:" + value);
						$('input:checkbox[value="' + value + '"]').prop("checked", true);
					});
					localStorage.setItem(i, mluitselect);
				} else {
					$('input:checkbox[name="radio-item3"]:checked').prop("checked", false);
					//	localStorage.setItem(i - 1, answerStirng);
					//	console.log("上题选了:" + (i) + answerStirng);
				}
			}
			//单多时
			if(message.object[i].type == "多选" && message.object[i - 1].type != "多选") {
				console.log("单多");
				var as = $('input:radio[name="radio-item"]:checked').val(); //单选或判断的值		
				localStorage.setItem(i - 1, as);
				console.log("上题选了:" + i + as);
				$('input:radio[name="radio-item"]:checked').prop("checked", false);
				var mluitselect = localStorage.getItem(i) + ""; //下一题记录的答案
				if(mluitselect.indexOf("A") != -1 || mluitselect.indexOf("B") != -1 || mluitselect.indexOf("C") != -1 ||
					mluitselect.indexOf("D") != -1 || mluitselect.indexOf("E") != -1 || mluitselect.indexOf("F") != -1) {
					$('input:checkbox[name="radio-item3"]:checked').prop("checked", false);
					$.each(mluitselect.split(""), function(index, value) {
						console.log("这题选了:" + value);
						$('input:checkbox[value="' + value + '"]').prop("checked", true);
					});
					//	localStorage.setItem(i, mluitselect);
				} else {
					$('input:radio[name="radio-item"]:checked').prop("checked", false);
				}
			}
			//结束多选的值			
			//开始单选或判断的值
			if(message.object[i].type != "多选" && message.object[i - 1].type != "多选") {
				//console.log("单单");
				var as = $('input:radio[name="radio-item"]:checked').val(); //单选或判断的值		
			//	console.log("上题选了:" + i + as);
				localStorage.setItem(i - 1, as);
				var c = localStorage.getItem(i); //下一题记录的答案
				if(c == "A" || c == "B" || c == "C" || c == "D") {
					$('input:radio[value="' + c + '"]').prop("checked", true);
					//	localStorage.setItem(i, c);
				} else {
					$('input:radio[name="radio-item"]:checked').prop("checked", false);
					//	localStorage.setItem(i - 1, as);
				}
			}
			//多单时
			if(message.object[i].type != "多选" && message.object[i - 1].type == "多选") {
				console.log("多单");
				var obj = document.getElementsByName("radio-item3");
				var check_val = [];
				for(k in obj) {
					if(obj[k].checked) {
						check_val.push(obj[k].value);
					}
				}
				var answerStirng = check_val.join(""); //得到的答案，答案转为字符串
			//	console.log("上题选了:" + i + answerStirng);
				localStorage.setItem(i - 1, answerStirng);
				var c = localStorage.getItem(i); //下一题记录的答案
				if(c == "A" || c == "B" || c == "C" || c == "D") {
					$('input:radio[value="' + c + '"]').prop("checked", true);
					localStorage.setItem(i, c);
				} else {
					$('input:radio[name="radio-item"]:checked').prop("checked", false);
				}
			}
			//结束单选或判断的值
			//页面放题目和选项
			$("#topicNumber").html(i + 1 + '/' + topiclength);
			if(message.object[i].type == "单选" || message.object[i].type == "判断") {
				$("#title").html(i + 1 + '.' + message.object[i].title_name);
				$("#a_answer").html('A.' + message.object[i].title_as_1);
				$("#b_answer").html('B.' + message.object[i].title_as_2);
				if(message.object[i].title_as_3 != null) {
					$("#c_div").show();
					$("#c_answer").html('C.' + message.object[i].title_as_3);
				} else {
					$("#c_div").hide();
				}
				if(message.object[i].title_as_4 != null) {
					$("#d_div").show();
					$("#d_answer").html('D.' + message.object[i].title_as_4);
				} else {
					$("#d_div").hide();
				}
				$("#content3").hide();
				$("#content1").show();
			}
			if(message.object[i].type == "多选") {
				$("#title").html(i + 1 + '.' + message.object[i].title_name);
				$("#a_answer_3").html('A.' + message.object[i].title_as_1);
				$("#b_answer_3").html('B.' + message.object[i].title_as_2);
				$("#c_answer_3").html('C.' + message.object[i].title_as_3);
				$("#d_answer_3").html('D.' + message.object[i].title_as_4);
				if(message.object[i].title_as_5 != null) {
					$("#e_div").show();
					$("#e_answer_3").html('E.' + message.object[i].title_as_5);
				} else {
					$("#e_div").hide();
				}
				if(message.object[i].title_as_6 != null) {
					$("#f_div").show();
					$("#f_answer_3").html('F.' + message.object[i].title_as_6);
				} else {
					$("#f_div").hide();
				}
				$("#content1").hide();
				$("#content3").show();
			}
		}
	});

	//上一题
	$("#top").click(function() {
		if(i > 0) {
			//开始单选或判断
			var a = localStorage.getItem(i - 1);
			if(message.object[i].type != "多选") {
				var as = $('input:radio[name="radio-item"]:checked').val();
				localStorage.setItem(i, as);
				//console.log("上题选了:" + (i + 1) + as);
			}
			$('input:radio[name="radio-item"]:checked').prop("checked", false);
			$('input:radio[value="' + a + '"]').prop("checked", true);
			//结束单选或判断

			//多选选着
			if(message.object[i].type == "多选") {
				var obj = document.getElementsByName("radio-item3");
				var check_val = [];
				for(k in obj) {
					if(obj[k].checked) {
						check_val.push(obj[k].value);
					}
				}
				var answerStirng = check_val.join(""); //得到的答案，答案转为字符串
				localStorage.setItem(i, answerStirng);
				console.log("上题选了:" + (i + 1) + answerStirng);
			}
			$('input:checkbox[name="radio-item3"]:checked').prop("checked", false); //设前面为不选
			if(a != null) {
				$.each(a.toString().split(""), function(index, value) {
					$('input:checkbox[value="' + value + '"]').prop("checked", true); //根据之前这道题选的答案放进去
				});
			}
			//结束多选选着

			//页面放题目和选项
			$("#topicNumber").html(i + '/' + topiclength);
			i--;
			if(message.object[i].type == "单选" || message.object[i].type == "判断") {
				$("#title").html(i + 1 + '.' + message.object[i].title_name);
				$("#a_answer").html('A.' + message.object[i].title_as_1);
				$("#b_answer").html('B.' + message.object[i].title_as_2);
				if(message.object[i].title_as_3 != null) {
					$("#c_div").show();
					$("#c_answer").html('C.' + message.object[i].title_as_3);
				} else {
					$("#c_div").hide();
				}
				if(message.object[i].title_as_4 != null) {
					$("#d_div").show();
					$("#d_answer").html('D.' + message.object[i].title_as_4);
				} else {
					$("#d_div").hide();
				}
				$("#content3").hide();
				$("#content1").show();
			}
			if(message.object[i].type == "多选") {
				$("#title").html(i + 1 + '.' + message.object[i].title_name);
				$("#a_answer_3").html('A.' + message.object[i].title_as_1);
				$("#b_answer_3").html('B.' + message.object[i].title_as_2);
				$("#c_answer_3").html('C.' + message.object[i].title_as_3);
				$("#d_answer_3").html('D.' + message.object[i].title_as_4);
				if(message.object[i].title_as_5 != null) {
					$("#e_div").show();
					$("#e_answer_3").html('E.' + message.object[i].title_as_5);
				} else {
					$("#e_div").hide();
				}
				if(message.object[i].title_as_6 != null) {
					$("#f_div").show();
					$("#f_answer_3").html('F.' + message.object[i].title_as_6);
				} else {
					$("#f_div").hide();
				}
				$("#content1").hide();
				$("#content3").show();
			}
		}
	});
	//确认框confirm
	document.getElementById("btn_commit").addEventListener('tap', function() {
		//多选最后一题
		if(message.object[i].type == "多选") {
			var obj = document.getElementsByName("radio-item3");
			var check_val = [];
			for(k in obj) {
				if(obj[k].checked) {
					check_val.push(obj[k].value);
				}
			}
			var answerStirng = check_val.join(""); //得到的答案，答案转为字符串
			localStorage.setItem(i, answerStirng);
		} else {
			//单选判断最后一题答案
			var as = $('input:radio[name="radio-item"]:checked').val();
			localStorage.setItem(i, as);
		}
		//剩题数开始
		var fail_count = 0;
		for(var m = 0; m < topiclength; m++) {
			var m_str = localStorage.getItem(m) + "";
			if(m_str.indexOf("A") != -1 || m_str.indexOf("B") != -1 || m_str.indexOf("C") != -1 ||
				m_str.indexOf("D") != -1 || m_str.indexOf("E") != -1 || m_str.indexOf("F") != -1) {} else {
				fail_count++;
			}
		}
		//错题数结束
		var btnArray = ['否', '是'];
		var theme = message.object[0].zt.id;
		var user = localStorage.getItem("userId");
		mui.confirm('你还剩下' + fail_count + '，是否交卷？', '交卷', btnArray, function(e) {
			if(e.index == 1) {
				//算分
				arr = [];
				arrnumber = [];
				var map = {};
				for(var n = 0; n < topiclength; n++) {
					//console.log(message.object[n].title_real_as+":" + localStorage.getItem(n));
					if(message.object[n].title_real_as == localStorage.getItem(n)) {
						sum++;
					} else {
						map[message.object[n].id] = localStorage.getItem(n);
						//console.log(message.object[n].id);
						arr.push(message.object[n].id); //将错题id放进数组
						arrnumber.push(n);
					}
				}
				console.log(arr);
				var appscore = {
					'score': sum * 15,
					'theme': theme,
					'user': user,
					'arr': arr,
					'map': map
				};
				//console.log(map);
				//交卷后转向下个页面
				var IPPost = localStorage.getItem("IPPost");
				var url = IPPost + 'examonline/exam/appfinishexam';
				mui.ajax(url, {
					contentType: "application/json",
					dataType: "json",
					data: JSON.stringify(appscore),
					type: "POST",
					timeout: 3000,
					error: function() {
						mui.toast("网路错误");
					},
					success: function(message) {
						mui.toast('你确认了交卷');
						mui.openWindow({
							url: "../home/topic_backup.html",
							id: 'topic_backup',
							extras: {
								sum: sum,
								second: second,
								arrnumber:arrnumber
							}
						});
					}
				});
			} else {
				mui.toast('你没有交卷');
			}
		})
	});
});