$(document).ready(function(){
	// 页面加载完毕即刻加载颜色列表
	(function(){
		var color=["#D15858","#36B6A1","#778899","#FF8282",
				   "#F79B6D","#B289CC","#4898EB","#7948DB"];
		for (var i = 0; i < color.length; i++) {
			  	$(".colorPack").append(
			  		'<span class="color" title="'+ color[i]
			  		+'" style="background-color:'+ color[i] +'"></span>'
			  	);
			  };	  
	}())
	//修改颜色通用函数
	function changeColor(color){
		$("#colorNum").val(_color.replace("#",""));
		$(".header").css("background-color",color);
		$(".information, #save").css("color",color);
		$("#save:hover").css("color","#fff");
		$("#save").css("border-color",color);
		$("#save:hover").css("background-color",color);
	}
	var defultColor = $(".header").attr("name").replace("#","");
	var _color = "#" + $("#colorNum").val().replace("#","");
	var keyTempColor = _color;
	// 页面加载完毕后加载默认颜色
	(function(){
		_color = $(".header").attr("name");
		changeColor(_color);
	}())
	// ajax包装
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

	// 点击颜色
	$(".header").on('click','.color',function(){
		_color = $(this).attr("title");
		changeColor(_color);
		defultColor = _color.replace("#","");
		$(".header").attr("name",_color);
	});
	// 输入颜色
		//过滤非字母数字
	$("#colorNum").keypress(function(event){
		//只允许输入a-zA-Z0-9
		if (!(event.which<=70&&event.which>=65 
			|| event.which<=102&&event.which>=97
			|| event.which<=57&&event.which>=48)) {
			return false;
		};
	});
	$("#colorNum").keyup(function(){
		var _colorNum = $(this).val();
		var reg = /[^a-f0-9]/ig;
		if (_colorNum.length%3 == 0 && _colorNum.length != 0) {
			_color = "#" + _colorNum;
			changeColor(_color);
			keyTempColor = _color;
		}
	});
	$("#colorNum").change(function(){
		//缺省自动填充
		var _colorNum = $(this).val() || defultColor;
		// 失去焦点后过滤非法数值
		var reg = /[^a-f0-9]/ig;
		_colorNum = _colorNum.replace(reg,"");
		var _colorNumL = _colorNum.length;
		if (_colorNumL%3 == 0 && _colorNumL != 0) {
			if(_colorNumL == 3){
				_colorNum = _colorNum[0]+_colorNum[0]+
							_colorNum[1]+_colorNum[1]+
							_colorNum[2]+_colorNum[2];
			}
			_color = "#" + _colorNum;
			changeColor(_color);
			defultColor = _colorNum;
			$(".header").attr("name",_color);
		}
		//自动补全
		else if (_colorNumL>3){
			var _keyTempColor = keyTempColor.replace("#","");
			if (_keyTempColor != defultColor) {
				_colorNum = _keyTempColor[0]+_keyTempColor[0]+
							_keyTempColor[1]+_keyTempColor[1]+
							_keyTempColor[2]+_keyTempColor[2];	
				_color = "#" + _colorNum;
				changeColor(_color);
				defultColor = _colorNum;
				$(".header").attr("name",_color);	
			}
			else{
				$(this).val(defultColor);
			}			
		}
		else{
			$(this).val(defultColor);
		}
	});
	// 输入年级
		//过滤非数字
	$("#backYear").text($("#frontYear").text()-0+4);
	$("#frontYear,#backYear").keypress(function(event){
		//只允许输入0-9
		if (!(event.which<=57&&event.which>=48)) {
			return false;
		};
	});
	$("#backYear").attr("name",$("#frontYear").attr("name")-0+4);
	$("#frontYear").blur(function(){
		var _defultYear = $(this).attr("name");
		//缺省自动填充
		var _year = $(this).text() || _defultYear;
		// 失去焦点后过滤非法数值
		var reg = /[^0-9]/ig;
		_year = _year.replace(reg,"");
		var _yearL = _year.length;
		if (_yearL > 4) {
			_year = _year[0] + _year[1] + _year[2] + _year[3];
		}
		$(this).text(_year);
		$("#backYear").text(_year-0+4);
	});
	$("#backYear").blur(function(){
		var _defultYear = $(this).attr("name");
		//缺省自动填充
		var _year = $(this).text() || _defultYear;
		// 失去焦点后过滤非法数值
		var reg = /[^0-9]/ig;
		_year = _year.replace(reg,"");
		var _yearL = _year.length;
		console.log(_yearL);
		if (_yearL > 4) {
			_year = _year[0] + _year[1] + _year[2] + _year[3];
		}
		$(this).text(_year);
	});
	// 输入性别
	$("#sex").blur(function(){
		if ($(this).val() == "女" || 
			$(this).attr("name") == "女")
		{
			$(this).val("女");
		}
		else{
			$(this).val("男");
		}
	});
	$(".nickname,.selfInfo,.information").keypress(function(event){
		if(event.which == 13){
			return false;
		}
	});
	$("#message").one("focus",function(){
		tip("可通过输入[br]换行");
	});
	//失去焦点时检验是否为空
	$(".nickname,.selfInfo,.information").blur(function(){
		if (!$(this).text()) {
			$(this).text("无");
		}
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
	$(".nickname").blur(function(){
		var _nickname = $(".nickname").text();
		if (getLenth(_nickname) > 20) {
			var _strObj = getStringByteInfo(_nickname,20);
			if(_strObj.length > 20){
				tip("昵称最多只能输入20字节");
				$(".nickname").text(_strObj.limitStr);
			}
		}
	});
	$(".selfInfo").blur(function(){
		var _selfInfo = $(".selfInfo").text();
		if (getLenth(_selfInfo) > 80) {
			var _strObj = getStringByteInfo(_selfInfo,60);
			if(_strObj.length > 80){
				tip("个人签名最多只能输入80字节");
				$(".selfInfo").text(_strObj.limitStr);
			}
		}
	});
	
	$(".nickname,.selfInfo,.information,#frontYear,#backYear").blur(function(){
		$(this).text($(this).text());
	});
	$("#message").blur(function(){
		// $(this).html($(this).text().replace(/\[br\]/ig,"<br>"));
	});

	//保存按钮
	$("#save").mouseover(function(){
		$(this).css("color","#fff");
		$(this).css("background-color",_color);
	});
	$("#save").mouseout(function(){
		$(this).css("color",_color);
		$(this).css("background-color","#fff");
	});
	$("#save").click(function(){
		var _nickname = $(".nickname").text().replace(/^(\s*)|(\s*$)/g,"");
		var _selfInfo = $(".selfInfo").text().replace(/^(\s*)|(\s*$)/g,"");
		var _sex = $("#sex").val();
		var _color = $(".header").attr("name");
		var _frontYear = $("#frontYear").text().replace(/^(\s*)|(\s*$)/g,"");
		var _direction = $("#direction").text().replace(/^(\s*)|(\s*$)/g,"");
		var _field = $("#field").text().replace(/^(\s*)|(\s*$)/g,"");
		var _email = $("#email").text().replace(/^(\s*)|(\s*$)/g,"");
		var _selfBlog = $("#selfBlog").text().replace(/^(\s*)|(\s*$)/g,"");
		var _address = $("#address").text().replace(/^(\s*)|(\s*$)/g,"");
		var _message = $("#message").text().replace(/^(\s*)|(\s*$)/g,"");
		var urlSendData = "/RdcBlog/changeUserData.do";
			myAjax({
				nickname: _nickname,
				signature: _selfInfo,
				gender: _sex,
				color: _color,
				grade: _frontYear,
				major: _direction,
				focusArea: _field,
				emailAddress: _email,
				personalBlog: _selfBlog,
				address: _address,
				message: _message,
				},urlSendData,
				function(data){
					var obj = eval ("(" + data + ")");
					if(obj.status == "success"){
						tip("保存成功！")
					}
					else{
						tip("保存失败！")
					}
			});
	});


	//头像预览相关
	var options =
	{
		thumbBox: '.thumbBox',
		spinner: '.spinner',
		imgSrc: 'images/demoheadSkim.png'
	}
	var cropper = $('.imageBox').cropbox(options);
	$('#upload-file').on('change', function(){
		var reader = new FileReader();
		reader.onload = function(e) {
			options.imgSrc = e.target.result;
			cropper = $('.imageBox').cropbox(options);
		}
		reader.readAsDataURL(this.files[0]);
		this.files = [];
//		ajaxFileUpload();
	})
//	function ajaxFileUpload() {
//            $.ajaxFileUpload
//            (
//                {
//                    url: '/RdcBlog/upload.do', //用于文件上传的服务器端请求地址
//                    secureuri: false, //是否需要安全协议，一般设置为false
//                    fileElementId: 'upload-file', //文件上传域的ID
//                    dataType: 'JSON', //返回值类型 一般设置为json
//                    success: function (data, status)  //服务器成功响应处理函数
//                    {
//                        // $("#img1").attr("src", data.imgurl);
//                        if (typeof (data.error) != 'undefined') {
//                            if (data.error != '') {
//                                alert(data.error);
//                            } else {
//                                alert(data.msg);
//                            }
//                        }
//                    },
//                    error: function (data, status, e)//服务器响应失败处理函数
//                    {
//                        alert(e);
//                    }
//                }
//            )
//            return false;
//        }
	$('#btnCrop').on('click', function(){
		var img = cropper.getDataURL();
		$('.cropped').html('');
		$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow: 0px 0px 1px #36B1A1;" ><p style="font-size:14px;color:#36B1A1;">64px*64px</p>');
		$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow: 0px 0px 1px #36B1A1;"><p style="font-size:14px;color:#36B1A1;">128px*128px</p>');
		$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow: 0px 0px 1px #36B1A1;"><p style="font-size:14px;color:#36B1A1;">180px*180px</p>');
//		$("#upload-file").val(img);
		console.log($('#upload-file').val());	
	})
	$('#btnZoomIn').on('click', function(){
		cropper.zoomIn();
	})
	$('#btnZoomOut').on('click', function(){
		cropper.zoomOut();
	})
	// 点击头像
	$(".userhead").click(function(event){
		$("#headPart").show();
		$("#mask1").show();
		var _headPartH = $("#headPart").outerHeight();
		var _headPartW = $("#headPart").outerWidth();
		var winH = $(window).height();
		var winW = $(window).width();
		var _tempH = winH/2 - _headPartH/2;
		if (_tempH < 0) {_tempH = 10;}
		$("#headPart").css("top", _tempH);
		var _tempW = winW/2 - _headPartW/2;
		if (_tempW < 0) {_tempW = 10;}
		$("#headPart").css("left", _tempW);
		$("body").css("overflow-y","hidden");
	});
	// 关闭
	$(".closeHeadWindow").click(function(){
		$("#headPart").fadeOut(150);
		$("#mask1").hide();
		$("body").css("overflow-y","auto");
	});
	// 保存头像
	$("#btnSave").click(function(){
		var _imgSrc = cropper.getDataURL();
		console.log(_imgSrc);
		var urlSendHead = "/RdcBlog/upload1.do";
			myAjax({
				image: _imgSrc
//				file: "upload-file"
				},urlSendHead,
				function(data){
					var obj = eval ("(" + data + ")");
					if(obj.status == "success"){
						tip("头像保存成功！");
						$(".userhead").attr("src",_imgSrc);
						$("#headPart").fadeOut(150);
						$("#mask1").hide();
						$("body").css("overflow-y","auto");
					}
					else{
						tip("头像保存失败！");
					}
			});
		
	});






	$(window).resize(function(){
		if($(".headSkim").css("display") == "block"){
			var _headSkimH = $(".headSkim").height();
			var _headSkimW = $(".headSkim").width();
			$("#bighead").css("max-height",_headSkimH-10);
			$("#bighead").css("max-width",_headSkimW-10);
			var _bighead = $("#bighead").height();
			var _temp = _headSkimH/2 - _bighead/2;
			if (_temp < 0) {_temp = 10;}
			$("#bighead").css("margin-top", _temp);
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
		if ($("#headPart").css("display") != "none") {
			var winW = $(window).width();
			var winH = $(window).height();
			var _bodyH = $("body").height();
			var docH = $(document).height();
			var _maskH = winH > _bodyH ? winH:docH; 
			$("#mask1").height(_maskH);
			var _headPartH = $("#headPart").outerHeight();
			var _headPartW = $("#headPart").outerWidth();
			var _tempH = winH/2 - _headPartH/2;
			if (_tempH < 0) {_tempH = 10;}
			$("#headPart").css("top", _tempH);
			var _tempW = winW/2 - _headPartW/2;
			if (_tempW < 0) {_tempW = 10;}
			$("#headPart").css("left", _tempW);
			$("body").css("overflow-y","hidden");
		}
	});
	// 错误提示框
	function tip(message){
		$(".tipContent p").text(message);
		$("#tipBox").show();
		var winW = $(window).width();
		var winH = $(window).height();
		var tipBoxW =  $("#tipBox").width();
		$("#tipBox").css("left",winW/2 - tipBoxW/2);
		$("#mask").show();
		// $("#mask").height($(document).height());
		$("#tipBox").animate({
			opacity:'0.97',
			top: '50px',
		},300);	
		var winH = $(window).height();
			var _bodyH = $("body").height();
			var docH = $(document).height();
			var _maskH = winH > _bodyH ? winH:docH; 
			$("#mask").height(_maskH);
	}
	// 关闭提示框
	$("#mask, .tip_color, .tipBtn").click(function(){
		$("#tipBox").animate({
			top: '-30px',
			opacity:'0',
		},300);
		$("#tipBox").hide(100);
		$("#mask").hide();
	});
});