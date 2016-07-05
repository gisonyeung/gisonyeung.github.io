$(document).ready(function(){
	// 运行脚本时调整窗口位置
	var docH = $(document).height();
	var docW = $(document).width();
	$("#getBackPwd").css("marginTop",docH/2-120);

	// 输入框获得焦点时的交互
	$(".f_name,.e_mail").focus(function(){
		$(this).css("borderLeft","6px solid #D15858");
		$(this).siblings("span").css("color","#D15858");
	});
	$(".secCode").focus(function(){
		$(this).css("borderLeft","6px solid #D15858");
		$(this).siblings("span").css("color","#D15858");
		$(this).siblings("span").addClass("icon-spin");
	});
	// 运行脚本时即刻聚焦
	$(".f_name").focus();

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

    // 用户名邮箱输入框失去焦点
	$(".f_name,.e_mail").blur(function(){
		//  内容为空时
		if (!(/\S/.test($(this).val())) )
		{
			$(this).css("borderLeft","6px solid #FFFFFF");
			$(this).siblings("span").css("color","#a9a9a9");
		}
	});

	// 验证码输入框失去焦点
   $(".secCode").blur(function(){
		if (!(/\S/.test($(this).val())) )
		{
			$(this).css("borderLeft","6px solid #FFFFFF");
			$(this).siblings("span").css("color","#a9a9a9");
		}
		$(this).siblings("span").removeClass("icon-spin");
	});

	$(".f_name,.e_mail,.secCode").keypress(function(event){
		// 过滤空格
		if (event.which == 32) {event.preventDefault(); return false;}
		//  回车
		// else if(event.which == 13) {alert("1")};
	});

	//窗口大小调整
	$(window).resize(function(){
		// 输入框
		var docH = $(document).height();
		$("#getBackPwd").css("marginTop",docH/2-120);
		// 提示框
		var winW = $(window).width();
		var tipBoxW =  $("#tipBox").width();
		$("#tipBox").css("left",winW/2 - tipBoxW/2);
	});
	// 发送验证码前的表单验证
	$(".securitycode").click(function(){
		var _name = $(".f_name").val();
		var _email = $(".e_mail").val();
		var re = /^[a-z|_][a-z|_|0-9]{2,24}$/i;
		var aa = /^[a-z0-9|_]+@[a-z0-9]+(\.(com)|(cn)){1,2}$/i;
		if (!_name) {tip("发送失败，用户名不能为空！")}
		else if (!_email) {tip("发送失败，邮箱不能为空！");}
		else if (!re.test($(".f_name").val()))
				{tip("发送失败，用户名格式错误！");}
				//{tip("发送失败，用户名格式错误！3-25个字符，由数字、字母、下划线组成，并只能以字母或下划线开头。");} 
		else if(!aa.test($(".e_mail").val()))
				{tip("发送失败，邮箱格式错误！");}
		else {
			//tip("验证码已发送！请登陆邮箱查看。");
			var urlget = "xxx";
			myAjax({
				username: _name,
				email: _email
				},urlget,
				function(data){
					var obj = eval ("(" + data + ")");
					if(obj.match == "Y"){
						tip("验证码已发送！请登陆邮箱查看。");
					}
					else{
						tip("验证码发送失败！可能是信息不匹配。")
					}
				});
		}
	});
	// 提交验证码
	$(".Next").click(function(){
		var _code = $(".secCode").val();
		if (!_code) {tip("请填写验证码！")}
		else{
			var urlsend = "xxx";
			myAjax({
				code: _code,
				},urlsend,
				function(data){
					var obj = eval ("(" + data + ")");
					if(obj.statue == "success"){
						location.href = "";
					}
					else{
						tip("验证失败！");
					}
				});
		}
	});		
	// 提示框
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
