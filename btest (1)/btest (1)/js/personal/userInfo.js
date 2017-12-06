//返回个人中心页时重新刷新该页
mui.init({
    beforeback: function() {
    	//找寻当前Webview打开的前一个页面
	    var list = plus.webview.currentWebview().opener();  
	    mui.fire(list, 'refresh');  
	    return true;  
    }  
}); 
	
	function initUserInfo(loginName,name,mobile,email,memo){
		var inputArray = document.getElementsByTagName('input');
		for(var i=0;i<inputArray.length;i++){
			if(inputArray[i].type=='text'){
				inputArray[0].value = loginName;
				inputArray[1].value = name;
				inputArray[4].value = mobile;
				inputArray[5].value = email;
				inputArray[6].value = memo;
			}
		}
	}
	var img;//数据库保存的img路径
	mui.plusReady(function(){
		var self = plus.webview.currentWebview();
		var imgsrc = document.getElementById('photo');
		var loginName = self.loginName;
		var name = self.name;
		var email = self.email;
		var mobile = self.mobile;
		var memo = self.memo;
		var gender = self.gender;
		img = self.imgsrc;
		imgsrc.src = img;
		initUserInfo(loginName,name,mobile,email,memo);
		if(gender!=null){
			$('input:radio[value="' + gender+ '"]').prop("checked", true);
		}else{
			$('input:radio[value="' + 0 + '"]').prop("checked", true);
		}
		
	});
	
	//判断input里面内容是否为空
	function isNull(str,attribute){    
	    if(str.length==0){
	    	mui.toast('对不起，'+attribute+'不能为空或者为空格!'); 
	    	return true;
	    }else if(str.length >=15){
	    	mui.toast('输入内容请在15字以内');
	    	return true;
	    }else
	    	return false;
	    
	}
	//验证用户名
	$("#loginName").blur(function(){
		var str = $(this).val().trim();
		var isnull = isNull(str,"用户名");
		if(isnull==true){
			$(this).focus();
			$(this).val('');
		}			
	});
	//验证姓名
	$("#Name").blur(function(){
		var str = $(this).val().trim();
		var isnull = isNull(str,"姓名");
		if(isnull==true){
			$(this).focus();
			$(this).val('');
		}			
	});
	//验证手机号
	$("#phone").blur(function(){
		var str = $(this).val().trim();
		reg = /^1[34578]\d{9}$/;
		if(isNull(str,"手机号码")==true){
			$(this).focus();
			$(this).val('');
		}else if(!reg.test(str)){
			mui.toast("手机号码有误");		
			$(this).focus();
			$(this).val('');
		}
	});
	//验证个性签名
	$("#memo").blur(function(){
		var str = $(this).val().trim();
		var isnull = isNull(str,"个性签名");
		if(isnull==true){
			$(this).focus();
			$(this).val('');
		}			
	});
	//验证性别单选框
	function verifyRadioButton(){
		var val = $('input:radio[name="Genderradio"]:checked').val();
		if(val==null){
            mui.toast("请选择性别");
            return false;
       	}else{
           //	console.log(val);
        } 
	}
	//点击添加图片 
	var portrait = document.getElementById('portrait');
	var photo = document.getElementById('photo');
	var imgsrc =img;
	portrait.addEventListener('tap', function() {
		plus.gallery.pick(
	        function(path) {
	            photo.src = path;
	            imgsrc = path;
	            portrait.onload = function() {
	                data = getBase64Image(photo);    //base64编码
	                //uploadimg(data);
	            }
	        },
	        function(e) {
	        });
	});
	      	
	function getBase64Image(img){
	    var canvas=document.createElement("canvas");
	    var width=img.width;
	    var height=img.height;
	
	    canvas.width=width;
	    canvas.height=height;
	    var ctx=canvas.getContext('2d');
	    ctx.drawImage(img,0,0,width,height);
	
	    var dataUrl=canvas.toDataURL('image/png',0.8);
	    return dataUrl.replace('data:image/png:base64,','');
	}
//保存按钮			
	mui(document.body).on('tap', '.mui-btn', function(e) { 
		//验证性别单选框
		verifyRadioButton();
		//获取各项的值
		var loginName = $("#loginName").val().trim();
		var name = $("#Name").val().trim();
		var phone = $("#phone").val().trim();
		var memo = $("#memo").val().trim();
		var val = $('input:radio[name="Genderradio"]:checked').val();
		var userId = localStorage.getItem("userId");
		console.log(imgsrc);
		if(loginName.length!=0&&name.length!=0&&phone.length!=0&&memo.length!=0&&memo.length<=15){
			var IPPost = localStorage.getItem("IPPost");
			var url = IPPost+'examonline/appsign/appmodifysend';
			var user={'loginName':loginName ,'name': name,'mobile':phone,'memo':memo,'gender':val,'id':userId,'imgsrc':imgsrc}; 
	      	mui.ajax(url, {
	      		contentType:"application/json",
	      		dataType:"json",
		        data:  JSON.stringify(user),
		        type: "POST",
		        timeout: 3000,
		     	success: function(message){
		     		var resultJson = JSON.parse(JSON.stringify(message));
		     		var result = resultJson.result;
		     		if(result=="success"){
		     			tab_Personal = plus.webview.currentWebview().opener();
		     			mui.fire(tab_Personal,'refresh',{});
		   				mui.back();
		     		}else{
		     			mui.toast(result);
		     		}
		     	},
		        error: function(){
		        	mui.toast("修改个人信息失败，网络错误");
		        }
			});
		}else{
			mui.toast("你的个人信息有空或有内容超过15字，请重新填写");
		}	
	});


	

