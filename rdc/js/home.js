$(document).ready(function() {
	/*
	* 检测当前浏览器窗口高度，如果高度小于768，使banner高度变小，否则保持
	* 传入window高度(可选)
	*/
	function bnHListen(wH) {
		var windowHeight = wH || $(window).height();
		var canvas_bg = $('#canvas_bg');
		if(windowHeight > 768) {
			if(windowHeight > 1000) {
				// 浏览器窗口高度太大，则将banner图高度设为窗口高度的85%
				canvas_bg.height(windowHeight * 0.85);
				return;
			}
			canvas_bg.height(825);
		} else if(windowHeight <= 585) {
			canvas_bg.height(500);
		} else {
			canvas_bg.height(585);
		}
	}

	bnHListen();

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
		var footer = $('#about'),
			footHeight = footer.outerHeight(),
			footPercent = Math.floor(footHeight / winHeight * 100);
		$('#bg').attr('data-end','background-position:center -' + (bgHeight - 200 - $(window).height()) + 'px;');
		footer.attr('data-14000','top: -' + (footPercent - 75) + '%;');
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
		// banner高度监听
		bnHListen(winHeight);

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
	
	/*
	* 函数作用：移动背景图
	*
	* 视觉差实现原理：背景图片高度比页面小，滚动页面时，背景图
	* 以一个比document小的速度滑动，相对位置发生改变，
	* 就形成了视觉差。而要做到当页面滑至底部时，背景图
	* 也恰好到达底部，就需要按照背景图与页面高度的比例
	* 实时进行背景图滑动速度控制。
	* 注：因为背景图使用了cover的方式，其宽度将总是与
	* 窗口宽度一致，为防止中途调整浏览器窗口大小，所以
	* 需要实时算出背景图当前的长度，再进行剩下的计算。
	*/
	function moveBg() {
		// 窗口顶部到文档顶部的距离
		var scrollTop = $(document).scrollTop();
		// 当前窗口宽度 == 背景图宽度
		var bgWidth = winWidth,
			bgHeight = bgWidth * bgSize.hw,
			// docHeight = $(document).height() - winHeight,// scrollTop滑至底部时的数值
			progress = (Math.floor(scrollTop / docHeight * 1000000) / 10000); // 四舍五入保留四位小数
		if(progress > 100) { progress = 100 };
		$('body').css('background-position', 'center ' + progress + '%');
	}


	
});