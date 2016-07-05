$(document).ready(function(){
	//加载完毕即刻判断登陆状态
	(function(){
		var _loginStatue = $(".user").attr("name");
		if (_loginStatue == 1){
			$(".loginButton").hide();
			$(".userHead").show();
		}
		else{
			$(".loginButton").show();
			$(".userHead").hide();
		}
	}())
	//侧边栏
	if ($(".sideBar").css("left").replace(/px/g,"") < -300) {
		$(".sideBar").css("left","-305px")
	}
	$(window).resize(function(){
		winW = $(window).width();
		if (!menuSwitchTemp) {
			$(".mainPage, .menu").css("transform","translate(0px, 0px)");
			var _sideBarW = $(".sideBar").width();
			if (_sideBarW < 300) {
				$(".sideBar").css("left","-"+ (_sideBarW+5) +"px");
			}
			else $(".sideBar").css("left","-"+ (_sideBarW+5) +"px");
			$("body").css("overflow-x","auto");
		}
		else {
			var sideBarW = $(".sideBar").width();
			$(".mainPage, .menu").css("transform","translate("+ (sideBarW+5) +"px, 0px)");
			$("body").css("overflow-x","hidden");
		}
		if (winW > 800) {
			$(".mainPage, .menu").css("transform","translate(0px, 0px)");
			$("body").css("overflow-x","auto");
		}
	});
	// 分级导航栏出现效果
	  // 头像覆盖
	$(".userHead").mouseenter(function(){
		$(".selfinfo").stop().fadeIn(200);
	});
	$(".userHead").mouseleave(function(){
		$(".selfinfo").stop().fadeOut(200);
	});
	  // 一级导航覆盖
	$(".nav li").mouseenter(function(){
		$(this).children(".subnav").stop().fadeIn(200);
		$(this).children(".subnav1").stop().fadeIn(200);
	});
	$(".nav li").mouseleave(function(){
		$(this).children(".subnav").stop().fadeOut(200);
		$(this).children(".subnav1").stop().fadeOut(200);
	});

	// 点击菜单按钮
	menuSwitchTemp = 0;
	$(".menuSwitch").click(function(event){
		event.stopPropagation()
		var sideBarW = $(".sideBar").width();
		if (sideBarW < 305) {
			$(".sideBar").css("left","-" + (sideBarW+5) + "px")
		}
		// 点击时为关闭状态
		if (!menuSwitchTemp) {
			$(".mainPage, .menu").css("transform","translate("+ (sideBarW+5) +"px, 0px)");
			$(".sideBar").css("transform","translate("+ (sideBarW+5) +"px, 0px)");
			$("body").css("overflow-x","hidden");
			menuSwitchTemp = 1;

		}
		else {
			$(".mainPage, .menu").css("transform","translate(0px, 0px)");
			$(".sideBar").css("transform","translate(0px, 0px)");
			$("body").css("overflow-x","auto");
			menuSwitchTemp = 0;
		};
	});
	$(".mainPage").click(function(){
		if(menuSwitchTemp) {
			if (sideBarW < 305) {
				$(".sideBar").css("left","-" + (sideBarW+5) + "px")
			}
			var sideBarW = $(".sideBar").width();
			$(".mainPage, .menu").css("transform","translate(0px, 0px)");
			$(".sideBar").css("transform","translate(0px, 0px)");
			$("body").css("overflow-x","auto");
			menuSwitchTemp = 0;
		}
	});

});