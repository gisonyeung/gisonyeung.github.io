$(document).ready(function(){
	//  运行脚本时调整窗口位置
	var docH = $(document).height();
	var docW = $(document).width();
	$("#register").css("marginTop",docH/2-280);

	var winW = $(window).width();
	var tipBoxW =  $("#tipBox").width();
	$("#tipBox").css("left",winW/2 - tipBoxW/2);
	//  窗口大小调整时
	$(window).resize(function(){
		// 输入框
		var docH = $(document).height();
		$("#register").css("marginTop",docH/2-280);
		if ($("#register").css("display") == "none") {
			$("#success").css("marginTop",docH/2-30);
			$("#fail").css("marginTop",docH/2-30);
		}
		// 提示框
		if ($("#tipBox").css("display") != "none") {
			var winW = $(window).width();
			var tipBoxW =  $("#tipBox").width();
			$("#tipBox").css("left",winW/2 - tipBoxW/2);
		}
	});
	// AJAX包
	function myAjax(_data, _url, callBack) {
       $.ajax({
           type: "post",
           url: _url,
           data: _data,
           cache: false,
           success: function (data) {
               if (callBack != undefined) {
                   callBack(data);
               }
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {tip("网络连接超时")},
       });
   }
	// 输入框获得焦点时的通用交互
	$(".inputPack input").focus(function(){
		$(this).css("borderLeft","6px solid #f79361");
		$(this).siblings("span").css("color","#f79361");
		$(this).next(".textTipPack").show();
	});
	$(".passCheck").focus(function(){
		$(".icon-key").addClass("icon-spin");
	});
	$(".gra,.maj").change(function(){
		$(this).parent("div").css("borderLeft","6px solid #f79361");
		$(this).prev("span").css("color","#f79361");
		$(this).css("color","#f79361");
	});
	$(".Sex input").change(function(){
		$(this).parent("div").css("borderLeft","6px solid #f79361");
		$(".Sex span:first").css("color","#f79361");
	});


	// 正则改变图标通用函数
	function right(e,message,num){
		var _temp = e.next().children(".textTipIcon");
		var _text = e.next().children(".textTip");
		_text.text(message);
		result[num] = 1;
		_temp.css("color","#15a18a");
		_temp.removeClass("icon-lightbulb");
		_temp.removeClass("icon-remove");
		_temp.addClass("icon-ok");
	}
	function error(e,message,num){
		var _temp = e.next().children(".textTipIcon");
		var _text = e.next().children(".textTip");
		_text.text(message);
		result[num] = 0;
		_temp.css("color","#ff4f4f");
		_temp.removeClass("icon-lightbulb");
		_temp.addClass("icon-remove");
		_temp.removeClass("icon-ok");
	}
	function light(e,message,num){
		var _temp = e.next().children(".textTipIcon");
		var _text = e.next().children(".textTip");
		_text.text(message);
		result[num] = 0;
		_temp.css("color","#f79361");
		_temp.addClass("icon-lightbulb");
		_temp.removeClass("icon-remove");
		_temp.removeClass("icon-ok");
	}
	// 正则检验结果
	var result = [0,0,0,0,0];
	// 账户输入框
	$(".username").keyup(function(){
		var _thisL = $(this).val().length;
		var _this = $(this).val();
		var _text = $(this).next().children(".textTip");
		var re = /^[a-z|_|0-9]{3,25}$/i;
		if (!(/\S/.test(_this))) {
			light(
				$(this),
				"用户名不能修改，3-25个字符，可由字母、数字、下划线组成",
				0
			);
		}
		else if (_thisL < 3) {
			error(
				$(this),
				"长度不能少于3字符！",
				0
			);
		}
		else if (_thisL > 25) {
			error(
				$(this),
				"长度不能多于25字符！",
				0
			);
		}
		else if(!re.test(_this)){
			error(
				$(this),
				"格式不符！",
				0
			);
		}
		else{
			right(
				$(this),
				"OK！",
				0
			);
		}
	});
	// $(".username").change(function(){
	// 	if(result[0]){
	// 		var _username = $(this).val();
	// 		var urlUsernameCheck = "xxx";
	// 		myAjax({username: _username},urlUsernameCheck,
	// 		      function(data){
	// 		        var obj = eval ("(" + data + ")");
	// 		        if(obj.statue != "success"){
	// 		        	error(
	// 						$(this),
	// 						"用户名已经存在！",
	// 						0
	// 					);
	// 		        }
	// 		});
	// 	}
	// });

	//密码输入框
	$(".newPwd").keyup(function(){
		var _thisL = $(this).val().length;
		var _this = $(this).val();
		var _text = $(this).next().children(".textTip");
		var re = /^[\x00-\xff]{6,30}$/i;
		if (!(/\S/.test(_this))) {
			light(
				$(this),
				"6-30个字符，可由字母、数字、标点符号组成",
				1
			);
			$(".confirmPwd").attr("readonly","readonly");
		}
		else if (_thisL < 6) {
			error(
				$(this),
				"长度不能少于6字符！",
				1
			);
			$(".confirmPwd").attr("readonly","readonly");
		}
		else if (_thisL > 30) {
			error(
				$(this),
				"长度不能多于25字符！",
				1
			);
			$(".confirmPwd").attr("readonly","readonly");
		}
		else if(!re.test(_this)){
			error(
				$(this),
				"格式不符！",
				1
			);
			$(".confirmPwd").attr("readonly","readonly");
		}
		else{
			right(
				$(this),
				"OK！",
				1
			);
			$(".confirmPwd").attr("readonly",null);
			if($(".confirmPwd").val() 
				&& $(".confirmPwd").val() != _this){
					error(
						$(".confirmPwd"),
						"两次输入密码不一致！",
						2
					);
			}
			else if($(".confirmPwd").val() == _this){
				right(
						$(".confirmPwd"),
						"OK！",
						2
					);
			}
			return false;
		}
		if($(".confirmPwd").val() 
				&& $(".confirmPwd").val() != _this){
					error(
						$(".confirmPwd"),
						"两次输入密码不一致！",
						2
					);
			}
	});
	$(".newPwd").blur(function(){
		if ($(".confirmPwd").attr("readonly") == "readonly") {
			$(".confirmPwd").val(null);
			$(".confirmPwd").blur();
			light(
				$(".confirmPwd"),
				"密码格式不符",
				2
			);
		}
		else if (!result[2] && !(/\S/.test($(".confirmPwd").val()))){
			light(
				$(".confirmPwd"),
				"重新输入密码",
				2
			);
		}
	});
	$(".confirmPwd").keyup(function(){
		var _confirmPwd = $(this).val();
		var _newPwd = $(".newPwd").val();
		if (!(/\S/.test(_confirmPwd))) {
			return false;
		}
		else if (_confirmPwd != _newPwd) {
			error(
				$(this),
				"两次输入密码不一致！",
				2
			);
		}
		else{
			right(
				$(this),
				"OK！",
				2
			);
		}
	});
	$(".confirmPwd").blur(function(){
		var _confirmPwd = $(this).val();
		if (!(/\S/.test(_confirmPwd)) && result[1]) {
			light(
				$(".confirmPwd"),
				"重新输入密码",
				2
			);
		}
		else if(!result[2] && result[1]){
			error(
				$(this),
				"两次输入密码不一致！",
				2
			);
		}
	});

	// 邮箱输入框
	$(".email").keyup(function(){
		var _thisL = $(this).val().length;
		var _this = $(this).val();
		var _text = $(this).next().children(".textTip");
		var re = /^[a-z0-9|_]+@[a-z0-9]+(\.(com)|(cn)){1,2}$/i;
		if (!(/\S/.test(_this))) {
			light(
				$(this),
				"注册邮箱不能修改，是找回密码的凭证",
				3
			);
		}
		else if(!re.test(_this)){
			error(
				$(this),
				"格式不符！",
				3
			);
		}
		else{
			right(
				$(this),
				"OK！",
				3
			);
		}
	});
	// $(".email").change(function(){
	// 	if(result[3]){
	// 		var _email = $(this).val();
	// 		var urlemailCheck = "xxx";
	// 		myAjax({email: _email},urlemailCheck,
	// 		      function(data){
	// 		        var obj = eval ("(" + data + ")");
	// 		        if(obj.statue != "success"){
	// 		        	error(
	// 						$(this),
	// 						"该邮箱已经注册！",
	// 						3
	// 					);
	// 		        }
	// 		});
	// 	}
	// });
	
	// 昵称输入框
	$(".nickname").keyup(function(){
		var _this = $(this).val();
		// 字节长度转换函数
		function getLenth(str){
			return str.replace(/[^\x00-xff]/g,"xx").length;
		}
		var _lengthTemp = getLenth(_this);
		if (!(/\S/.test(_this))) {
			light(
				$(this),
				"最多20个字符，一个汉字为两个字符",
				4
			);
		}
		else if ( _lengthTemp < 20) {
			right(
				$(this),
				_lengthTemp +"个字符",
				4
			);
		}
		else{
			error(
				$(this),
				"昵称过长！",
				4
			);
		}

	});



	// 运行脚本时即刻聚焦
	$(".username").focus();

	// 输入框失去焦点时的交互
	$(".inputPack input").blur(function(){
		//  内容为空时
		if (!(/\S/.test($(this).val())) )
		{
			$(this).css("borderLeft","6px solid #FFFFFF");
			$(this).siblings("span").css("color","#a9a9a9");
			$(this).next(".textTipPack").hide();
		}
	});
	$(".passCheck").blur(function(){
		$(".icon-key").removeClass("icon-spin");
	});

	// 按键过滤空格
	$(".inputPack input").keypress(function(event){
		// 空格
		if (event.which == 32) {
			event.preventDefault();
			return false;
		}
	});

	// 动态加载年级option
	(function(){
		var myDate = new Date();
		var year = myDate.getFullYear();
		for(var yearNum = 2000; yearNum <= year; yearNum++){  
			$(".gra").prepend("<option>"+ yearNum +"</option>")
		}
	}());

	// 按下注册按钮
	$(".submit").click(function(){
		var _result = result[0] && result[1] && result[2] 
					  && result[3] && result[4];
		// console.log(result[0],result[1],result[2],result[3],result[4],_result);			  
		if (_result) {
			if (!( /\S/.test($(".passCheck").val()) )) {
				tip("请输入注册码！");
			}
			else{
				var _username = $(".username").val();
				var _newPwd = $(".newPwd").val();
				var _confirmPwd = $(".confirmPwd").val();
				var _email = $(".email").val();
				var _gra = $(".gra").val();
				var _maj = $(".maj").val();
				var _nickname = $(".nickname").val();
				var _sex = "男";
				if ($("#female").prop("checked")) {
					_sex = "女";
				}
				var _passCheck = $(".passCheck").val();
				var urlregister = "xxx";
				myAjax({
					username: _username,
					password: _newPwd,
					repassword: _confirmPwd,
					email: _email,
					nickname: _nickname,
					group: _gra,
					diretion: _maj,
					sex: _sex,
					passcheck: _passCheck
					},urlregister,
				      function(data){
				        var obj = eval ("(" + data + ")");
				        if(obj.statue == "success"){
				        	$("#register").hide();
				        	$("#success").show();
				        	var docH = $(document).height();
							$("#success").css("marginTop",docH/2-30);
				        	setTimeOut(function(){
				        		location.href = "xxx";
				        	},3000);
				        }
				        else{
				        	$("#register").hide();
				        	$("#fail").show();
				        	var docH = $(document).height();
							$("#fail").css("marginTop",docH/2-30);
				        }
				});
			}			  
		}
		else{
			tip("信息不全或有误，请重新填写！");
		}
		
	});



	// 错误提示框
	function tip(message){
		$(".tipContent p").text(message);
		$("#tipBox").show();
		var winW = $(window).width();
		var tipBoxW =  $("#tipBox").width();
		$("#tipBox").css("left",winW/2 - tipBoxW/2);
		$("#mask").fadeIn(50);
		$("#tipBox").animate({
			opacity:'0.97',
			top: '50px',
		},300);	
	}
	// 关闭提示框
	$("#mask, .tip_color, .tipBtn").click(function(){
		$("#tipBox").animate({
			top: '-30px',
			opacity:'0',
		},300);
		$("#mask, #tipBox").hide(100);
	});
});
