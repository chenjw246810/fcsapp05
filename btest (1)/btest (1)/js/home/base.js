// mui初始化
mui.init();

//实现双击退出引用，不返还登录界面
mui.oldback = mui.back;
var clickNum = 0;
mui.back = function(event){
   clickNum++;
   if(clickNum > 1){
       plus.runtime.quit();
   }else{
       mui.toast("再按一次退出应用");
   }
   setTimeout(function(){
       clickNum = 0
   },1000);
        return false;
}

/*浏览器的兼容处理方法*/
var createIframe = function (el, opt) {
    var elContainer = document.querySelector(el);
    var wrapper = document.querySelector(".mui-iframe-wrapper");
    if(!wrapper){
        // 创建wrapper 和 iframe
        wrapper = document.createElement('div');
        wrapper.className = 'mui-iframe-wrapper';
        for(var i in opt.style){
            wrapper.style[i] = opt.style[i];
        }
        var iframe = document.createElement('iframe');
        iframe.src = opt.url;
        iframe.id = opt.id || opt.url;
        iframe.name = opt.id;
        wrapper.appendChild(iframe);
        elContainer.appendChild(wrapper);
    }else{
        var iframe = wrapper.querySelector('iframe');
        iframe.src = opt.url;
        iframe.id = opt.id || opt.url;
        iframe.name = iframe.id;
    }
}

var subpages = ['html/home/tab-main.html', 'html/errors/tab-errors.html', 
				'html/score/tab-score.html', 'html/personal/tab-personal.html'];
var subpage_style = {
	top: '0px',
	bottom: '51px'
};
var aniShow = {};
// 当前激活选项
var activeTab = subpages[0];

if(mui.os.plus){
	// 创建子页面，首个选项卡页面显示，其它均隐藏；
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		for (var i = 0; i < 4; i++) {
			var temp = {};
			var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
			if (i > 0) {
				sub.hide();
			}else{
				temp[subpages[i]] = "true";
				mui.extend(aniShow,temp);
			}
			self.append(sub);
		}
	});
}else{
	// 创建iframe代替子页面
    createIframe('.mui-content',{
        url: activeTab,
        style: subpage_style
    });
}

// 选项卡点击事件
mui('.mui-bar-tab').on('tap', 'a', function(e) {
	var targetTab = this.getAttribute('href');
	
	if (targetTab == activeTab) {return;}
	//显示目标选项卡
	if(mui.os.plus){
		//若为iOS平台或非首次显示，则直接显示
		if(mui.os.ios||aniShow[targetTab]){
			plus.webview.show(targetTab);
		}else{
			//否则，使用fade-in动画，且保存变量
			var temp = {};
			temp[targetTab] = "true";
			mui.extend(aniShow,temp);
			plus.webview.show(targetTab,"fade-in",300);
		}
		//隐藏当前;
		plus.webview.hide(activeTab);
	}else{
		// 创建iframe代替子页面
        createIframe('.mui-content',{
            url: targetTab,
            style: subpage_style
        });
	}
	//更改当前活跃的选项卡
	activeTab = targetTab;
});