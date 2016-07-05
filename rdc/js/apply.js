$(document).ready(function() {
	// 背景图长宽信息
	var bgSize = {
		height: 3473,
		width: 1920,
		hw: 3473 / 1920,
		wh: 1920 / 3473
	}


	var winWidth = $(window).width(),
		winHeight = $(window).height(),
		docHeight = $(document).height() - winHeight;

	var bgWidth = winWidth,
		bgHeight = Math.floor(bgWidth * bgSize.hw);

	// 初始化data-end
	function refreshDistance() {
		$('#bg').attr('data-end','background-position:center -' + (bgHeight - 200 - $(window).height()) + 'px;');
	}
	refreshDistance();

	// 初始化视觉差插件
	var s = skrollr.init();	
	hideTopBtn(s.getScrollTop());
	// 初始化锚点定位插件
	skrollr.menu.init(s, {
	    animate: true,
	    easing: 'sqrt',
	    // scale: 2,
	    duration: function(currentTop, targetTop) {
	        return 300;
	    },
	    // handleLink: function(link) {
	    //     return 400;
	    // },
	    complexLinks: false,// 必须
	    change: function(newHash, newTopPosition) {
	    	// console.log(newHash,newTopPosition);
	    },
	    updateUrl: false
	});


	/*
	* 窗口大小调整监听
	*/
	var resetTimer = null;
	$(window).resize(function() {

		winWidth = $(window).width(),
		winHeight = $(window).height(),
		docHeight = $(document).height() - winHeight;

		// 刷新视觉差参数
		if (resetTimer) {
            clearTimeout(resetTimer)
        }
        resetTimer = setTimeout(function(){ 
            resetScroll();
        }, 200);
		
	});
	// 重置滚动插件
	function resetScroll() {
		// s.destroy();
		bgWidth = winWidth;
		bgHeight = Math.floor(bgWidth * bgSize.hw);
		// $('#bg').attr('data-end','background-position:center -' + (bgHeight - 200 - $(window).height()) + 'px;');
		refreshDistance();
		s.refresh();
	}
	
	var scrollTimer = null,
		lastDir = 'up',
		curStasus = '';

	$(window).scroll(function() {

		var topbar = $('#topbar');
		if (scrollTimer) {
            clearTimeout(scrollTimer)
        }
        scrollTimer = setTimeout(function(){ 
        	// 与下面的dom事件貌似重复了，但是下面监听的是鼠标滚轮，
        	// 而这里监听的是页面滑动，没注释是因为，在点击菜单锚点的时候，
        	// 并不能触发滚轮事件，只能触发滑动事件。
        	var dir = judgeDir();
			if(dir == 'up' && curStasus != 'up') {
				topbar.css('top', '0px');
				curStasus = 'up';
			} else if(dir == 'down' && curStasus != 'down') {
				topbar.css('top', '-75px');
				curStasus = 'down';
			}
            var _scrollTop = s.getScrollTop();
            // console.log(_scrollTop);
            // 隐藏返回顶部按钮
            hideTopBtn(_scrollTop);

            if(_scrollTop >= 10000) {
            	topbar.addClass('alt');
            } else {
            	topbar.removeClass('alt');
            }
        }, 100);
	});

	// 兼容FF的JQ鼠标滚轮监听
	$(document).on("mousewheel DOMMouseScroll", function (e) {
    	
	    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
	                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
	    var topbar = $('#topbar');            	
	    
	    if (delta > 0) {
	        // 向上滚
	        if(curStasus != 'up') { //防止Chrome平凡进行操作
	        	topbar.css('top', '0px');
				curStasus = 'up';
	        }

	    } else if (delta < 0) {
	        // 向下滚
	       if(curStasus != 'down') { //防止Chrome平凡进行操作
	        	topbar.css('top', '-75px');
				curStasus = 'down';
	        }
	    }
	});
	/*判断上下滚动 上滚动返回'up' 下滚动返回'down' 没发生变化返回false*/
	var beforeScrollTop = document.body.scrollTop;
	function judgeDir(){
		var afterScrollTop = document.body.scrollTop,
			delta = afterScrollTop - beforeScrollTop;
		beforeScrollTop = afterScrollTop;
		if( delta === 0 ) return false;	
		return delta > 0 ? "down" : "up";
	}

	function hideTopBtn(_scrollTop) {
		if(_scrollTop < 1000) {
        	$('#totop').addClass('hide');
        } else {
        	$('#totop').removeClass('hide');
        }
	}


	$('.title').on('click', function() {
		/*var elem = $(this).parent().next();
		if($(this).hasClass('opened')) {
			elem.slideUp(200);
			$(this).removeClass('opened');
		} else {
			elem.slideDown(200);
			$(this).addClass('opened');
		}*/
		var _objElem = $(this).parent().next();
		_objElem.stop(true,false);
		_objElem.slideToggle();
	});

	$('#upload').on('click', function() {
		Confirm('hahaha');
		return false;
	});

	var studentSex = '男';
	// 点击性别选框
	$('#sexChoice').click(function() {
		var sexText = $('#sexText');
		var sexInput = $('#sex');
		if(sexInput.val() == '男') {
			sexText.text('女');
			sexInput.val('女');
			studentSex = '女';
		} else {
			sexText.text('男');
			sexInput.val('男');
			studentSex = '男';
		}
	});

	// 确认提交报名表
	$('#c-ok').on('click', function() {
		hideConfirm();
		var postData = {
			name: $('#name').val(),
			class: $('#class').val(),
			sex: studentSex,
			duty: $('#duty').val(),
			studentId: $('#studentId').val(),
			phone: $('#phone').val(),
			phoneShort: $('#phone-short').val(),
			email: $('#email').val(),
			qq: $('#qq').val(),
			direction: $('.radio:checked').val(),
			strongpoint: $('#strongpoint').val(),
			introduction: $('#introduction').val(),
			expectation: $('#expectation').val()
		}
		// 判断各个必须项是否为空
		var isEmpty = /\S/;
		if(!( isEmpty.test(postData.name) )) {
			openChecked(1, 'name');
			tip('请填写姓名');
			return false;
		} else if(!( isEmpty.test(postData.class) )) {
			openChecked(1, 'class');
			tip('请填写专业班级');
			return false;
		} else if(!( isEmpty.test(postData.studentId) )) {
			openChecked(1, 'studentId');
			tip('请填写宿舍');
			return false;
		} else if(!( isEmpty.test(postData.phone) )) {
			openChecked(1, 'phone');
			tip('请填写手机号码');
			return false;
		} else if(!( isEmpty.test(postData.qq) )) {
			openChecked(1, 'qq');
			tip('请填写QQ号码');
			return false;
		} else if(!( isEmpty.test(postData.introduction) )) {
			openChecked(2, 'introduction');
			tip('请填写自我简介');
			return false;
		}

		// 判断某些项是否符合格式
		if(!( /^1[0-9]{10}/.test(postData.phone) )) {
			openChecked(1, 'phone');
			tip('手机号码格式错误，请重新核对');
			return false
		}
		// 3115******  3215******
		var studentIdFilter = /^(3115)|(3215)[0-9]{6}/;
		if(!( studentIdFilter.test(postData.studentId) )) {
			openChecked(1, 'studentId');
			tip('学号格式错误，请重新核对');
			return false;
		}
		var emailFilter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(postData.email && !( emailFilter.test(postData.email) )) {
			openChecked(1, 'email');
			tip('邮箱格式错误，请重新核对');
			return false;
		}
		if(!( /^[1-9][0-9]{4,9}/.test(postData.qq) )) {
			openChecked(1, 'qq');
			tip('QQ格式错误，请重新核对');
			return false;
		}
	});
	// 打开分组栏并聚焦
	function openChecked(index, elemId) {
		// console.log(index);
		// console.log(elemId);
		var _objElem = $('#switch_' + index);
		_objElem.prop('checked', true);
		_objElem.next().next().slideDown();
		if(elemId) {
			$('#' + elemId).focus();
		}
	}


	// 确认框
	function Confirm(){
		var confirmBox = $("#confirm");
		confirmBox.stop(true,true);
		confirmBox.show();
		$("#mask1").fadeIn(50);
		confirmBox.animate({
			opacity:'0.97',
			top: '20%',
		},300);	
	}
	// 关闭确认框
	$("#mask1, #c-cancel, #c-close").click(function(){
		hideConfirm();
	});

	function hideConfirm() {
		confirmBox = $("#confirm");
		confirmBox.stop(true,true);
		confirmBox.animate({
			top: '10%',
			opacity:'0',
		},300);
		$("#mask1, #confirm").fadeOut(100);
	}

	// 提示框
	function tip(message) {
		var tipBox = $("#tip");
		$('#tipMsg').text(message);
		tipBox.stop(true,true);
		tipBox.show();
		$("#mask2").fadeIn(50);
		tipBox.animate({
			opacity:'0.97',
			top: '20%',
		},300);	
	}
	// 关闭提示框
	$("#mask2, #t-cancel, #t-close").click(function(){
		var tipBox = $("#tip");
		tipBox.stop(true,true);
		tipBox.animate({
			top: '10%',
			opacity:'0',
		},300);
		$("#mask2, #tip").fadeOut(100);
	});


});