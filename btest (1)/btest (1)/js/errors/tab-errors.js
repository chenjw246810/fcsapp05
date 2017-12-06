var lastId = ''; //最新新闻的id
var webview_detail = null; //详情页webview
var titleNView = { //详情页原生导航配置
	backgroundColor: '#f7f7f7', //导航栏背景色
	titleText: '', //导航栏标题
	titleColor: '#000000', //文字颜色
	type: 'transparent', //透明渐变样式
	autoBackButton: true, //自动绘制返回箭头
	splitLine: { //底部分割线
		color: '#cccccc'
	}
}
//mui初始化，配置下拉刷新
mui.init({
	pullRefresh: {
		container: '#list',
		down: {
			style: 'circle',
			offset: '0px',
			auto: true,
			callback: function() {
				if(window.plus && plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
					plus.nativeUI.toast('似乎已断开与互联网的连接', {
						verticalAlign: 'top'
					});
					return;
				}

				if(lastId) { //说明已有数据，目前处于下拉刷新，增加时间戳，触发服务端立即刷新，返回最新数据
					data.lastId = lastId;
					data.time = new Date().getTime() + "";
				}
				var news = new Vue({
					el: '#news',
					data: {
						banner: {}, //顶部banner数据
						items: [] //列表信息流数据
					}
				});
				var userId = 1;
				mui.ajax('http://172.16.41.160:9090/examonline/appmistaken/appgetMistaken', {

					data: {
						'userId': userId
					},
					type: 'GET', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(message) {
						//停止刷新
						mui('#list').pullRefresh().endPulldown();

						var result = message.result;
						console.log(result + "123");
						//var titleName = message.object[0].tl.title_name;
						if(result == "success") {
							for(var i = 0; i < message.object.length; i++) {
								news.items.push({
									title: message.object[i].tl.title_name,
									time: dateUtils.format(message.object[i].tl.createDate)

								});
							}
						} else {
							mui.toast(result);
						}
					},
					error: function(xhr, type, errorThrown) {
						//异常处理；
						console.log(type);
					}
				});
			}
		}
	}
});

mui.plusReady(function() {
	//预加载详情页
	webview_detail = mui.preload({
		url: 'detail.html',
		id: 'news_detail',
		styles: {
			"render": "always",
			"popGesture": "hide",
			"bounce": "vertical",
			"bounceBackground": "#efeff4",
			"titleNView": titleNView
		}
	});
});

/**
 * 打开错题详情
 * 
 * @param {Object} item 当前点击的对象
 */
function open_detail(item) {
	//触发子窗口变更错题详情
	mui.fire(webview_detail, 'get_detail', {
		guid: item.guid,
		title: item.title,
		author: item.author,
		time: item.time,
		cover: item.cover
	});

	//更改详情页原生导航条信息
	titleNView.titleText = item.title;
	webview_detail.setStyle({
		"titleNView": titleNView
	});
	setTimeout(function() {
		webview_detail.show("slide-in-right", 300);
	}, 150);
}

function get_items(user_id, theme_id) {
	var userId = user_id;
	mui.ajax('http://172.16.41.160:9090/examonline/appmistaken/appgetMistaken', {

		data: {
			'userId': userId
		},
		type: 'GET', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(message) {
			//停止刷新
			mui('#list').pullRefresh().endPulldown();

			var result = message.result;
			var titleName = message.object[0].tl.title_name;
			if(result == "success") {
				for(var i = 0; i < message.object.length; i++) {
					news.items.push({
						title: message.object[i].tl.title_name,
						time: dateUtils.format(message.object[i].tl.createDate)

					});
				}
			} else {
				mui.toast(result);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}

var item2Show = false,
	item3Show = false; //子选项卡是否显示标志
document.querySelector('.mui-slider').addEventListener('slide', function(event) {
	if(event.detail.slideNumber === 1 && !item2Show) {
		//切换到第二个选项卡
		//根据具体业务，动态获得第二个选项卡内容；
		var content = '<ul id="list" class="mui-table-view"><li class="mui-table-view-cell mui-media" v-for="item in items"><a href="javascript:;" :data-guid="item.guid" @tap="open_detail(item)">';

		//循环添加item
		// ....

		content = content + '</a></li></ul>';

		console.log("2222222222222");

		//显示内容
		document.getElementById("item2").innerHTML = content;
		//改变标志位，下次直接显示
		item2Show = true;
	} else if(event.detail.slideNumber === 2 && !item3Show) {
		//切换到第三个选项卡
		//根据具体业务，动态获得第三个选项卡内容；
		var content = "....";

		console.log("33333333333333");

		//显示内容
		document.getElementById("item3").innerHTML = content;
		//改变标志位，下次直接显示
		item3Show = true;
	}
});

/**
 * 格式化时间的辅助类，将一个时间毫秒转换成x小时前、y天前等
 */
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		mui.each(this.UNITS, function(unit, value) {
			if(milliseconds >= value) {
				humanize = Math.floor(milliseconds / value) + unit + '前';
				return false;
			}
			return true;
		});
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if(diff < this.UNITS['天']) {
			return this.humanize(diff);
		}

		var _format = function(number) {
			return(number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' + _format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		return new Date(str);
	}
};