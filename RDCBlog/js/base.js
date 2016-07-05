$(document).ready(function(){
	//侧边栏
	if ($(".sideBar").css("left").replace(/px/g,"") < -300) {
		$(".sideBar").css("left","-305px")
	}
	$(window).resize(function(){
		winW = $(window).width();
		/*---------侧边栏---------*/
		if (!menuSwitchTemp) {
			$(".mainPage, .menu, .header").css("transform","translate(0px, 0px)");
			var _sideBarW = $(".sideBar").width();
			if (_sideBarW < 300) {
				$(".sideBar").css("left","-"+ (_sideBarW+5) +"px");
			}
			else $(".sideBar").css("left","-"+ (_sideBarW+5) +"px");
			$("body").css("overflow-x","auto");
		}
		else {
			var sideBarW = $(".sideBar").width();
			$(".mainPage, .menu, .header").css("transform","translate("+ (sideBarW+5) +"px, 0px)");
			$("body").css("overflow-x","hidden");
		}
		if (winW > 800) {
			$(".mainPage, .menu, .header").css("transform","translate(0px, 0px)");
			$("body").css("overflow-x","auto");
		}


		/*---------提示框---------*/
		if ($("#tipBox").css("display") != "none") {
			var winW = $(window).width();
			var tipBoxW =  $("#tipBox").width();
			$("#tipBox").css("left",winW/2 - tipBoxW/2);
			var winH = $(window).height();
			var _bodyH = $("body").height();
			var docH = $(document).height();
			var _maskH = winH > _bodyH ? winH:docH; 
			$("#mask").height(_maskH);
		}


        /*---------确认框---------*/
        if ($("#confirmBox").css("display") != "none") {
            var winW = $(window).width();
            var confirmBoxW =  $("#confirmBox").width();
            $("#confirmBox").css("left",winW/2 - confirmBoxW/2);
            var winH = $(window).height();
            var confirmBoxH =  $("#confirmBox").height();
            var topPosition = winH/2 - confirmBoxH/2;
            topPosition = topPosition < 10 ? 10:topPosition;
            $("#confirmBox").css("top",topPosition);
            var _bodyH = $("body").height();
            var docH = $(document).height();
            var _maskH = winH > _bodyH ? winH:docH; 
            $("#mask2").height(_maskH);
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
			$(".mainPage, .menu, .header").css("transform","translate("+ (sideBarW+5) +"px, 0px)");
			$(".sideBar").css("transform","translate("+ (sideBarW+5) +"px, 0px)");
			$("body").css("overflow-x","hidden");
			menuSwitchTemp = 1;

		}
		else {
			$(".mainPage, .menu, .header").css("transform","translate(0px, 0px)");
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
			$(".mainPage, .menu, .header").css("transform","translate(0px, 0px)");
			$(".sideBar").css("transform","translate(0px, 0px)");
			$("body").css("overflow-x","auto");
			menuSwitchTemp = 0;
		}
	});
	// AJAXPOST
	function myAjax(_data, _url, callBack) {
        $.ajax({
            type: "POST",
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
    // AJAXGET
    function myGet(_data, _url, callBack) {
        $.ajax({
            type: "GET",
            url: _url,
            data: _data,
            cache: false,
//            dataType: "json",
            success: function (data) {
                if (callBack != undefined) {
                    callBack(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {tip("网络连接超时")},
            
        });
    }


    /*---------确认框---------*/
	function tip(message){
		var _tipBox = $("#tipBox");
		_tipBox.stop(true,true);
		$(".tipContent p").text(message);
		_tipBox.show();
		var winW = $(window).width();
		var tipBoxW =  _tipBox.width();
		_tipBox.css("left",winW/2 - tipBoxW/2);
		$("#mask").fadeIn(50);
		_tipBox.animate({
			opacity:'0.97',
			top: '50px',
			
		},300);	
		$(".tipBtn").focus();
	}
	// 关闭提示框
	$("#mask, .tip_color, .tipBtn").click(function(){
		var _tipBox = $("#tipBox");
		_tipBox.stop(true,true);
		_tipBox.animate({
			top: '-30px',
			opacity:'0',
		},300);
		_tipBox.hide(100);
		$("#mask").fadeOut(100);
	});


	// 登陆按钮点击函数
	$(".loginButton").click(function(event){
		var _miniLogin = $("#miniLogin");
		_miniLogin.stop(true,true);
		event.stopPropagation();
		$.when(
			_miniLogin.delay(200).css("top","30px")
		).then(function(){
			_miniLogin.css("top","0px");
			$("#miniUsername").focus();
			$(".mainPage").on("click",hideLoginMenu);
		});
	});
	// 弹出登录框
	function showLoginMenu(){
		$(".loginButton").trigger('click');
	}
	// 隐藏登录框
	function hideLoginMenu(){
		var _miniLogin = $("#miniLogin");
		_miniLogin.stop(true,true);
		$.when(
			_miniLogin.delay(200).css("top","30px")
		).then(function(){
			_miniLogin.css("top","-550px");
		  });
		$(".mainPage").unbind("click",hideLoginMenu);
	}
	// 登陆函数
	function enter(){
		var _username = $("#miniUsername").val();
		var _password = $("#miniPwd").val();
		if (!(/\S/.test(_username ))) {
			tip("用户名不能为空！");
		}
		else if(!(/\S/.test(_password))){
			tip("密码不能为空！");
		}
		else {
			var url = "/RdcBlog/Login.do";
			try{
				myAjax({
					username: _username,
					password: _password
					},url,
					function(data){
						var obj = eval ("(" + data + ")");
						if(obj.status == "success"){
							// 发送验证成功的账户
							var url2 = "/RdcBlog/doLogin.do"
							myAjax({
								username: _username,
								},url2,function(data){
									var _obj = eval ("(" + data + ")");
									if(_obj.status == "success")
										hideLoginMenu();
										location.reload();
								});
						}
						else{
							tip(obj.reason);
							$("#miniUsername").val(null);
							$("#miniPwd").val(null);
						}
				});
			}
			catch(ex){
				tip("未知错误");
			}
		}
	}	
	$(".miniSubmit").click(function(){
		enter()
	});
	//按键时
	$("#miniUsername,#miniPwd").keypress(function(event){
		// 过滤空格
		if (event.which == 32) {event.preventDefault(); return false;}
		//  回车回调函数
		else if(event.which == 13) {
			//function
			enter();
		};
	});
	// 注销
	$("#logout").click(function(){
		var urlLogout = "/RdcBlog/LogOff.do"
		myGet(
			null,urlLogout,
			function(data){
				var obj = eval ("(" + data + ")");
				if (obj.status == "success") {
					location.reload();
				}
				else{
					tip("异常错误，请重试！");
					location.reload();
				}

		});
	});

	// 字节长度转换函数
	function getLenth(str){
		return str.replace(/[^\x00-xff]/g,"xx").length;
	}
	// 截取前n个字符
	function getStringByteInfo ( string, intVal ) {
    	var str = $.trim(string) || '';
    	var length = str.length;
    	var len, reg, charStr;
    	var limitStr = '';
        if ( length > 0 ) {
            len = 0;
            reg = /[^\x00-\xff]/;
            for ( var i = 0; i < length; i++) {
                charStr = str.charAt(i);
                if ( reg.test(charStr) ) {
                    len += 2;
                }
                else {
                    len ++;
                }
                if (len <= intVal) {
                    limitStr += str.charAt(i);
                }
            }
        }
        return {
            length: len || 0,
            limitStr: limitStr || ''
        }
    }

    /*---------确认框---------*/
    function Confirm(message,callBackYes,callBackNo){
        // 显示确认框
        $(".confirmContent p").text(message);
        $("#confirmBox").show();
        $("#mask2").show();
        var winW = $(window).width(),
            confirmBoxW =  $("#confirmBox").width();
        $("#confirmBox").css("left",winW/2 - confirmBoxW/2);
        var winH = $(window).height(),
            confirmBoxH =  $("#confirmBox").height(),
            topPosition = winH/2 - confirmBoxH/2;
        topPosition = topPosition < 10 ? 10:topPosition;
        $("#confirmBox").css("top",topPosition);
        var _bodyH = $("body").height(),
            docH = $(document).height(),
            _maskH = winH > _bodyH ? winH:docH; 
        $("#mask2").height(_maskH);
        // 点击确认 
        $("#yesBtn").on("click",function(){
            $("#confirmBox").hide();
            $("#mask2").hide();
            // 解绑事件，使确认框可以通用
            $("#yesBtn,#noBtn,.confirm_color").unbind("click");
            if (callBackYes != undefined) {
                    callBackYes();
                }
        });
        // 点击取消
        $("#noBtn,.confirm_color").on("click",function(){
            $("#confirmBox").hide();
            $("#mask2").hide();
            // 解绑事件，使确认框可以通用
            $("#yesBtn,#noBtn,.confirm_color").unbind("click");
            if (callBackNo != undefined) {
                    callBackNo();
                }
        });
    }
    $("#yesBtn").click(function(){
        $("#confirmBox").hide();
        $("#mask2").hide();
        $("#yesBtn,#noBtn").unbind("click");
    });
    $("#noBtn,.confirm_color").click(function(){
        $("#confirmBox").hide();
        $("#mask2").hide();
        $("#yesBtn,#noBtn").unbind("click");
    });


    /*---------弹框---------*/
    var barrageTime;
    function barrage(message,time){
        clearTimeout(barrageTime);
        var _barrage = $("#barrage");
        _barrage.stop(true,true);
        _barrage.children("p").text(message);
        _barrage.show();
        var winW = $(window).width();
        var barrageW =  _barrage.width();
        _barrage.css("left",winW/2 - barrageW/2);
        _barrage.animate({
            opacity:'0.95',
            top: '100px'
        },200); 
       barrageTime = setTimeout(function(){
            _barrage.stop(true,true);
            _barrage.animate({
                opacity:'0',
                top: '50px'
            },200); 
            _barrage.hide(100);
        },time);
    }

});