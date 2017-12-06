var ctx = document.getElementById('chart').getContext('2d');
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.elements.point.radius = 4;
Chart.defaults.global.elements.point.backgroundColor = 'rgba(0,0,0,1)';
Chart.defaults.global.elements.line.tension = 0.3; //设置贝赛尔曲线弯曲张力
mui.init()
mui.plusReady(function() {
	plus.webview.currentWebview().setStyle({
		scrollIndicator: 'none'
	}); //隐藏webview下面的滚动栏
	plus.screen.lockOrientation("landscape-primary");
	plus.key.addEventListener("backbutton", function() {
		plus.screen.unlockOrientation("lanscape-primary");
		plus.screen.lockOrientation("portrait-primary");
	}, false);
	
});

mui('.mui-bar').on('tap', 'a', function(e) {
	plus.screen.unlockOrientation("lanscape-primary");
	plus.screen.lockOrientation("portrait-primary");
});

var data = {
	labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
	datasets: [{
			label: "历史",
			borderColor: '#1FAB9E',
			backgroundColor: 'rgba(0,0,0,0)',
			fillColor: "rgba(220,220,220,0.5)",
			pointBackgroundColor: "#1FAB9E",
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

		},
		{
			label: "智力",
			borderColor: '#B1D781',
			fillColor: "rgba(220,220,220,0.5)",
			backgroundColor: 'rgba(0,0,0,0)',
			pointBackgroundColor: "#B1D781",
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			label: "情感",
			borderColor: '#FAD02F',
			fillColor: "rgba(220,220,220,1)",
			backgroundColor: 'rgba(0,0,0,0)',
			pointBackgroundColor: "#FAD02F",
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			label: "两性",
			borderColor: '#F69229',
			fillColor: "rgba(220,220,220,0)",
			backgroundColor: 'rgba(0,0,0,0)',
			pointBackgroundColor: "#F69229",
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			label: "英语",
			borderColor: '#F16950',
			fillColor: "rgba(220,220,220,0)",
			backgroundColor: 'rgba(0,0,0,0)',
			pointBackgroundColor: "#F16950",
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			label: "文学",
			borderColor: '#DE2A4A',
			fillColor: "rgba(220,220,220,0)",
			backgroundColor: 'rgba(0,0,0,0)',
			pointBackgroundColor: "#DE2A4A",
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		}
	]
};

var options = {
	layout: {
		padding: {
			left: 0,
			right: 0,
			top: 10,
			bottom: 0
		}
	},
	legend: {
		display: true,
		labels: {
			fontColor: 'rgb(0, 0, 0)',
			boxWidth: 45 //彩色框的宽度
		}
	},
	scales: {
		yAxes: [{
			ticks: {
				// Include a dollar sign in the ticks
				callback: function(value, index, values) {
					return value + '分';
				}
			}
		}],
		xAxes: [{
			ticks: {
				// Include a dollar sign in the ticks
				callback: function(value, index, values) {
					return '第' + value + '天';
				}
			}
		}]
	}
};

var Historyscores = new Array(100,0,100,0,100,0,100,0,100,0);
var IQscores = new Array(85,85,85,85,85,85,85,85,8,5);


function updateData(){
	for(var i=0;i<10;i++){
		data.datasets[0].data[i] = Historyscores[i];
		data.datasets[1].data[i] = IQscores[i];
	}	
}
updateData();	
var chart = Chart.Line(ctx,{
	data:data,
	options:options
});
chart.update({
	    duration: 800,
    easing: 'easeOutBounce'
});
