
$(document).ready(function(){
    //加载完毕即刻判断登陆状态
    (function(){
        var _loginStatue = $(".user").attr("name");
        if (_loginStatue){
            $(".loginButton").hide();
            $(".userHead").show();
        }
        else{
            $(".loginButton").show();
            $(".userHead").hide();
        }
    }());
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


        // 提示框
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
    // 点击登陆
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
        tip("注销失败，当前页面不允许注销!");
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
	// 点击标签
	$(".tagContainer").click(function(){
		$(this).css("visibility","hidden");
		$(this).next("input").show();
		$(this).next("input").focus();
	});
	// 标签输入框失去焦点
	$(".tagInput").blur(function(){
		var tag = $(this).val();
		$(this).hide();
		$(this).prev("p").css("visibility","visible");
		if (/\S/.test(tag)) {
			var _strObj = getStringByteInfo(tag,14);
			if(_strObj.length > 14){
				barrage("单个标签最多只能输入14字节",2000);
			}
			$(this).val(_strObj.limitStr);
			$(this).prev("p").children(".tag").text(_strObj.limitStr);	
			$(this).prev("p").children(".icon-circle").css("color","#5cb1cc");
		}
		else
		{
			$(this).prev("p").children(".icon-circle").css("color","#d0d0d0");
			$(this).prev("p").children(".tag").text("");
		}

	});
	// 标题框失去焦点
	$(".title_txt").blur(function(){
		var _titleText = $(this).val();
		var _strObj = getStringByteInfo(_titleText,70);
			if(_strObj.length > 70){
				tip("标题最多只能输入70字节");
			}
		$(this).val(_strObj.limitStr);	
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
    // 标签框第一次获得焦点
	function firstClick(){
	   barrage("可输入“，”(英文逗号) 或“回车”快捷切换至下一标签。",2000);
	   $(".tagInput").unbind('focus',firstClick);
    }
    $(".tagInput").bind("focus",firstClick);
    // 标签框输入逗号
    $(".tagInput").keypress(function(event){

    	if (event.which == 44 || event.which == 13) {
    		var _index = $(".tagInput").index($(this));
    		if (_index < 2) {
	    		_index++;
	    		$(".tagContainer:eq("+ _index +")").trigger("click");
    		}
    		else{
    			$(".tagInput:last").blur();
    		}
    		return false;
    	}
    });
    // 确认发布后回调函数
    function putArticle() {
        // 标题
        var _title = $(".title_txt").val();
        // 标签
        var _tagContent = "";
        $(".tagInput").each(function(i){
            if(/\S/.test($(this).val())){
                if (_tagContent != "") {
                    _tagContent += " , "+$(this).val();
                }
                else{
                    _tagContent = $(this).val();
                }
            }
        });
        var _catagoryId = $("#categoryName option:selected").attr("data-id");
        var _attachedId = $("#attachedName option:selected").attr("data-id");
        var _content = $("#articleContent").val();
        if(!(/\S/.test(_title))){
            tip("标题不能为空！");
            return false;
        }
        else if(_tagContent == ""){
            $(".tagInput:first").unbind("focus",firstClick);
            tip("请至少填写一个标签！");
            $(".tagContainer:first").trigger("click");
            return false;
        }
        else if(!_catagoryId){
            tip("请选择文章一级分类！");
            $("#categoryName").focus();
            return false;
        }
        else if(!_attachedId){
            tip("请选择文章二级分类！");
            $("#attachedName").focus();
            return false;
        }
        else if(!_content){
            tip("请填写博文内容！");
            return false;
        }
        else if(getLenth(_content) < 200){
            tip("发布失败，文章内容过短。");
            return false;
        }
        var urlPublish = "/RdcBlog/doPublish.do";
        myAjax(
            {
                title: _title,
                tag: _tagContent,
                categoryId: _catagoryId,
                attachedId: _attachedId,
                content: _content
            },
            urlPublish,
            function(data){
                var obj = eval ("(" + data + ")");
                if(obj.status == "success"){
                    tip("发布成功！三秒后自动跳转至博文浏览页。");
                    setTimeout(function(){window.href = "#";},3000);
                }          
                else{
                    tip("发布失败！" + obj.reason);
                }
            });
     }   
    // 点击发布按钮
    $(".btn").click(function(){
    	Confirm("发布前务必做好备份，是否确认发布？",putArticle);
    });
    // 页面加载成功后即刻请求一级分类
    (function(){
        var urlCategory = "/RdcBlog/getCategory.do";
        var cateTemp = $("#categoryName");
        var htmlTemp = "";
        myAjax(null,urlCategory,
            function(data){
            // var data=[ {"id":1,"name":"hehe1"},
            //             {"id":2,"name":"hehe2"},
            //             {"id":3,"name":"hehe3"}
            // ]
                for(var i=0,LEN=data.length;i<LEN;i++){
                    htmlTemp += '<option data-id="'+ data[i]["id"] +'">'+ data[i].name +'</option>';
                }
                cateTemp.append(htmlTemp);
        });
    }());
    // 一级分类改变，请求二级分类
    $("#categoryName").change(function(){
        var urlAttached = "/RdcBlog/getAttached.do";
        var attaTemp = $("#attachedName");
        attaTemp.html('<option></option>');
        var htmlTemp = "";
        var _categoryId = $("#categoryName option:selected").attr("data-id");
        if (_categoryId){
            myAjax(
                {
                   categoryId: _categoryId
                },
                urlAttached,
                function(data){
                    for(var i=0,LEN=data.length;i<LEN;i++){
                        htmlTemp += '<option data-id="'+ data[i]["id"] +'">'+ data[i].name +'</option>';
                    }
                    attaTemp.append(htmlTemp);
            });
        }
    });





	$(window).resize(function(){
    	/*----------------------提示框↓-------------------------------*/
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
        /*----------------------提示框↑-------------------------------*/


        /*----------------------确认框↓-------------------------------*/
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
        /*----------------------确认框↑-------------------------------*/
    });


    /*----------------------提示框↓-------------------------------*/
	function tip(message){
        var _tipBox = $("#tipBox");
        _tipBox.stop(true,true);
		$(".tipContent p").text(message);
		_tipBox.show();
		var winW = $(window).width();
		var winH = $(window).height();
		var tipBoxW =  _tipBox.width();
		_tipBox.css("left",winW/2 - tipBoxW/2);
		$("#mask").show();
		// $("#mask").height($(document).height());
		_tipBox.animate({
			opacity:'0.97',
			top: '50px',
		},300);	
		// var winH = $(window).height();
		// var _bodyH = $("body").height();
		// var docH = $(document).height();
		// var _maskH = winH > _bodyH ? winH:docH; 
		// $("#mask").height(_maskH);
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
		$("#mask").hide();
	});
    /*----------------------提示框↑-------------------------------*/


    /*----------------------确认框↓-------------------------------*/
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
    /*----------------------确认框↑-------------------------------*/

    // 弹幕
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