$(document).ready(function(){
	//  运行脚本时调整窗口位置
	var docH = $(document).height();
	var docW = $(document).width();
	$("#changePwd").css("marginTop",docH/2-90);

	// var winH = $(window).height();
	var winW = $(window).width();
	var tipBoxW =  $("#tipBox").width();
	$("#tipBox").css("left",winW/2 - tipBoxW/2);
	//  窗口大小调整时
	$(window).resize(function(){
		// 输入框
		var docH = $(document).height();
		$("#changePwd").css("marginTop",docH/2-90);
		$("#success").css("marginTop",docH/2-30);
		$("#fail").css("marginTop",docH/2-30);
		// 提示框
		var winW = $(window).width();
		var tipBoxW =  $("#tipBox").width();
		$("#tipBox").css("left",winW/2 - tipBoxW/2);
	});

	// 输入框获得焦点时的交互
	$(".newPwd,.confirmPwd").focus(function(){
		$(this).css("borderLeft","6px solid #D15858");
		$(this).siblings("span").css("color","#D15858");
	});
	// 运行脚本时即刻聚焦
	$(".newPwd").focus();

	// 输入框失去焦点时的交互
	$(".newPwd,.confirmPwd").blur(function(){
		//  内容为空时
		if (!(/\S/.test($(this).val())) )
		{
			$(this).css("borderLeft","6px solid #FFFFFF");
			$(this).siblings("span").css("color","#a9a9a9");
		}
	});

	$(".newPwd,.confirmPwd").keypress(function(event){
		// 空格
		if (event.which == 32) {event.preventDefault(); return false;}
		//  回车
		else if(event.which == 13) {alert("1")};
	});
	//  模拟后台返回数据
	var state="success";
	$(".correctPwd").click(function(){
		if ($(".newPwd").val() != $(".confirmPwd").val()) {
			//  function
		}
		else {
			//  function
			// $("#changePwd").hide();
			// $("#mask,#tipBox").fadeIn(100);
			// tip("修改密码成功");
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
