$(document).ready(function(){
	//加载完毕即刻判断登陆状态
	(function(){
		var _loginStatue = $(".user").attr("name");
		if (1){
			$(".loginButton").hide();
			$(".userHead").show();
			// 点赞状态判定
			isPraised();
		}
		else{
			$(".loginButton").show();
			$(".userHead").hide();
			// 点赞按钮绑定登陆事件
			goLogin();
		}
	}());
	//侧边栏
	if ($(".sideBar").css("left").replace(/px/g,"") < -300) {
		$(".sideBar").css("left","-305px")
	}
	$(window).resize(function(){
		winW = $(window).width();
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
    // 提示框
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














	// 未登录点赞绑定函数
   function goLogin(){
   		$(".likeUp").bind("click",function(){
   			$(".loginButton").trigger("click");
   		});
   }
    // 点赞状态判断
    function isPraised(){
			$(".like").each(function(){
				var _this = $(this).children(".likeUp");
				if(_this.attr("name") == "1"){
					_this.css("color","#E74C3C");
				}
				else{
					$(this).bind("click",function(){
						getlike(_this);
					});
				}
			});
    }
	// // 点赞
	// $(".likeUp").on('click',function(){
	// 	var _this = $(this);
	// 	var _that = _this.next().next();
	// 	var urlLike = "/RdcBlog/addPraise.do";
	// 	var _articleId = $(this).attr("data-articleId");
	// 		myAjax({
	// 			articleId: _articleId
	// 			},urlLike,
	// 			function(data){
	// 				var obj = eval ("(" + data + ")");
	// 				if(obj.status == "success"){
	// 					_this.css("color","#E74C3C");
	// 					_that.text(_that.text()-0+1);
	// 					_this.unbind("click");
	// 				}
	// 				else{
	// 					_this.css("color","#d0d3d7");
	// 				}
	// 		});
	// });
	// 点赞绑定
	function getlike(elem){
    	var _this = elem;
		var _that = _this.next().next();
		var urlLike = "/RdcBlog/addPraise.do";
		var _articleId = _this.attr("data-articleId");
			myAjax({
				articleId: _articleId
				},urlLike,
				function(data){
					var obj = eval ("(" + data + ")");
					if(obj.status == "success"){
						_this.css("color","#E74C3C");
						_that.text(_that.text()-0+1);
						_this.unbind("click");
					}
					else{
						_this.css("color","#d0d3d7");
					}
			});
    }
	// 进入页面加载分页
	var pageLength = 1;
	(function(){
		pageLength = $(".pagenition").attr("name");
		if(pageLength == "0" || pageLength == 0){
			pageLength = 1;
		}
		// 循环推入元素
		for (var i = 2; i <= pageLength; i++) {
		 	$(".pageNumPack").append(
		 		'<a class="pageButton pageNum" id="page'+i+'" href="#title">'+i+'</a>'
		 	);
		 }
		 // 判断是否省略
		 if (pageLength>6) {
		 	for (var i=6; i<pageLength; i++) {
		 		$('#page'+i).hide();
		 	}
		 	$('#page'+(i-1)).after('<span class="ellipsis">…</span>');
			// 添加页码块事件
			for (var j=4,k=5; k<pageLength-1; j+=3,k+=3) {
				// 切换上页块
				$('#page'+j).bind("click",function(){			
					var j = $(this).text();
					$(".ellipsis").show();
					for(var _g=j-0+2; _g<pageLength; _g++) {
						$('#page'+_g).hide();
					}
					for (var _b=j-1; _b>=j-3; _b--) {
						$('#page'+_b).show();
					}
				});
				// 切换下页块
				$('#page'+k).bind("click",function(){
					var j = $(this).text();
					if (pageLength-j<5) {
						$(".ellipsis").hide();
					}
					for(var _g=j-0+1; _g<j-0+4; _g++) {
						$('#page'+_g).show();
					}
					for (var _b=j-2; _b>=1; _b--) {
						$('#page'+_b).hide();
					}
				});
			};
		}
		// 末页绑定事件
		function calculate(){
			var j=1,k=5;
			var _lastK;
			return function(){
				for (; k<=pageLength-2; j+=3,k+=3) {
					_lastK = k;
				}
				return _lastK;
			}();
		}
		if (pageLength>6) {
			$('#page'+pageLength).bind("click",function(){	
					
				$(".pageNum").hide();
				for (var i=calculate()-1; i<=pageLength; i++){
					$("#page"+ i).show(); 
					$(".ellipsis").hide();		 		
				}							
			});
		}
	}())	
	// 点击页码
	$(".pageNum").on('click',function(){
		if($(this).text() != $(".pageActive").text()){	
			var that = this,
				urlPage = "/RdcBlog/changePage.do",
				_page = $(this).text(),
				urlUser = "/RdcBlog/viewUser.do",
				urlBlog = "/RdcBlog/blogSkim.do";
			myGet({
				currentPage: _page,
				categoryId: _id1,
				attachedId: _id2
				},urlPage,
				function(data){
						var title = $(document).title;       
		        		history.pushState(
		            		{ 
		            			title: title 
		            		}, 
		            		title, 
		            		location.href.split("?")[0] + "?" + "currentPage="
		            		 + _page + "&categoryId="+ _id1 + "&attachedId=" + _id2
		            	);
		    			$(".pagenition").attr("data-current",_page);
		    			$(".title").attr("name",_id1);
						 $(".pageActive").removeClass("pageActive");
						 $(that).addClass("pageActive");
						$(".articleList").empty();
						$(".blogLoadding").show();
						setArticle(data);
	//				}
	//				else{
	//					// 错误处理
	//					return false;
	//				}
			});
		}	
	});
	// 注入博文
	function setArticle(data){
		for(var i=0, LEN=data.length;i<LEN;i++){
			$(".blogLoadding").hide();
			$(".articleList").append($("#blogDemo").children(".articleElement").clone(true));
			var _lastELement = $(".articleList").children(".articleElement:last");
			// 头像
			_lastELement
				.find(".authorHead")
				.attr("src",data[i].img)

 			// 标题
			_lastELement
				.find(".articleheader")
				.text(data[i].title);
 			// 时间
			_lastELement
				.find(".blogTime")
				.text(data[i].date);
			// 作者
			_lastELement
				.find(".blogAuthor")
				.text(data[i].author);
			// 评论数
			_lastELement
				.find(".blogComment")
				.text(data[i]["reviewNum"]);	
			// 阅读数
			_lastELement
				.find(".blogView")
				.text(data[i]["browseNum"]);
			// 点赞数
			_lastELement
				.find(".blogLike")
				.text(data[i]["praiseNum"]);
			// 用户链接
			_lastELement
				.find(".articleUser")
				.attr("href",urlUser+"?authorId="+data[i]["authorId"]);
			_lastELement
				.find(".authorHeadHref")	
				.attr("href",urlUser+"?authorId="+data[i]["authorId"]);
			// 文章ID
			_lastELement
				.find(".likeUp")
				.attr("data-articleId",data[i]["id"]);
			// 文章链接
			_lastELement
				.find(".articleheader")
				.attr("href",urlBlog+"?articleId="+data[i]["id"]);
			// 点赞状态判断
			if ($(".user").attr("name")) {
				if(data[i]["isPraised"]){
					_lastELement
						.find(".likeUp")
						.css("color","#E74C3C");
					_lastELement
						.find(".likeUp")
						.unbind("click");
				}
			}
			else{
				$(".likeUp").unbind("click");
			}	
		}
	}
	// 上一页
	$("#pageBack").click(function(){
		if($(".pageActive").text() == "1"){
			tip("当前已是第一页！");
		}
		else{
			 var _nowPage = $(".pageActive").text();
			 location.href += "#title";
			 $("#page"+(_nowPage-1)).trigger("click");
		}
	});
	// 下一页
	$("#pageGo").click(function(){
		if($(".pageActive").text() == pageLength){
			tip("当前已是最后一页！");
		}
		else{
			 var _nowPage = $(".pageActive").text();
			 location.href += "#title";
			 $("#page"+(_nowPage-0+1)).trigger("click");
		}
	});
	// 页码输入框聚焦
	$("#goNum").keypress(function(event){
		if(event.which == 13) {
			$("#goButton").trigger("click");
		}
	});
	// Go
	$("#goButton").click(function(){
		var _goNum = parseInt($("#goNum").val());
		if (!_goNum) {
			tip("页码不能为空！");
			return false;
		}
		else if (_goNum>pageLength) {_goNum = pageLength;}
		else if (_goNum<1) {_goNum = 1;}
		var _tag = 0;
		var _lastK = 0;
		for (var j=1,k=5; k<pageLength-2; j+=3,k+=3) {
			if (j<=_goNum && _goNum<=k) {
				$(".pageNum").hide();
				$("#page"+pageLength).show();
				for (var _j=j; _j<=k; _j++) {
					$("#page"+_j).show();
				}
				$(".ellipsis").show();
				location.href += "#title";
				$("#page"+_goNum).trigger("click");
				$("#goNum").val(null);
				_tag  = 1;
				return false;
			}
			_lastK = k;

		}
		if (!_tag) {
			$(".pageNum").hide();
			for (var i=_lastK-1; i<=pageLength; i++){
				$("#page"+ i).show();
				$(".ellipsis").hide();
			}
			location.href += "#title";
			$("#page"+_goNum).trigger("click");
			$("#goNum").val(null);
			_tag = 0;
		}
	});
	// 页面加载完毕即刻获取页码并模拟点击页码
	(function(){
		var _currentPage = $(".pagenition").attr("data-current");
		if(_currentPage == "0" || _currentPage == 0){
			_currentPage = 1;
		}
		 $(".pageActive").removeClass("pageActive");
		 $("#page"+_currentPage).addClass("pageActive");
		// $("#page"+_currentPage).trigger("click");
	}());
	// 页面加载完毕即刻异步请求分类
	(function(){
		 _id1 = $(".title").attr("data-categoryId");
		 _id2 = $(".title").attr("data-attachedId");
		if(!_id1){_id1=0};
		if(!_id2){_id2=0};
		var urlCatagory = "/RdcBlog/getCategory.do";
		myAjax({
			categoryId: _id1,
			attachedId: _id2
			},urlCatagory,
			function(data){
				var obj = eval ("(" + data + ")");
					if(obj.status != "error"){
						if(obj.first == "全部文章"){
							$(".location span").empty();
							return false;
						}
						else{
							var _text = " > " + obj.first;
							$(".location span").text(_text);
							if (obj.second != "null") {
								_text +=" > " + obj.second;
								$(".location span").text(_text);
							}
						}
					}
		});
	}());

	// 点击浏览器前进后退按钮，AJAX加载私有部分
	$(window).on("popstate",function(){
		var url = location.href.split("?")[1];
		var urlEle = url.split("&");
		var page = urlEle[0].split("=")[1];
		var categoryId = urlEle[1].split("=")[1];
		var attachedId = urlEle[2].split("=")[1];
		$(".title").attr("name",categoryId)
				   .attr("data-current",attachedId);
		$("#page"+page).trigger("click");		   
	});



});