$(document).ready(function(){
	// 运行脚本时调整窗口位置
	var docH = $(document).height();
	var docW = $(document).width();
	$("#login").css("marginTop",docH/2-90);

	//窗口大小调整
	$(window).resize(function(){
		// alert("1");
		var docH = $(document).height();
		$("#login").css("marginTop",docH/2-90);
		$("#getBackPwd").css("marginTop",docH/2-120);
		// 提示框
		if ($("#tipBox").css("display") != "none") {
			var winW = $(window).width();
			var tipBoxW =  $("#tipBox").width();
			$("#tipBox").css("left",winW/2 - tipBoxW/2);
		}
	});

	// 输入框获得焦点
	$(".name,.pwd").focus(function(){
		$(this).css("borderLeft","6px solid #36b6a1");
		$(this).siblings("span").css("color","#36b6a1");
	});
	// 运行脚本时即刻聚焦
    $(".name").focus();

    // 输入框失去焦点
	$(".name,.pwd").blur(function(){
		//  内容为空时
		if (!(/\S/.test($(this).val())) )
		{
			$(this).css("borderLeft","6px solid #FFFFFF");
			$(this).siblings("span").css("color","#a9a9a9");
		}
	});

	//按键时
	$(".name,.pwd").keypress(function(event){
		// 过滤空格
		if (event.which == 32) {event.preventDefault(); return false;}
		//  回车回调函数
		else if(event.which == 13) {
			//function
		};
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
