$(document).ready(function() {




	// // 点击标签
	// $('.main-wrapper').on('click', '.news-tab', function() {

	// 	switchTab($(this).index());

	// });

	// // 切换标签
	// var curIndex = 0;
	// function switchTab(index) {

	// 	if( index == curIndex ) {
	// 		return false;
	// 	}
		
	// 	var tabs = $('.news-tab');

	// 	if( index == 0 ) {
	// 		tabs.eq(0).addClass('active');
	// 		$('.news-content').show();
	// 		tabs.eq(1).removeClass('active');
	// 		$('.company-content').hide();
	// 	} else {
	// 		tabs.eq(0).removeClass('active');
	// 		$('.news-content').hide();
	// 		tabs.eq(1).addClass('active');
	// 		$('.company-content').show();
	// 	}
	// 	curIndex = index;
	// }



	// 获取url查询字符串并保存在全局变量中
	var param = {};
	(function () {
		var search = location.search.replace('?', '').split('&');
		for(var i = 0; i < search.length; i++) {
			var item = search[i].split('=');
			param[item[0]] = item[1];
		};
		param.pageNow = parseInt(param.pageNow, 10) || 1;
		param.type = param.type || 'news';
	})()

	/*
		@description 根据页码生成url
		@param {String} pageNum 页码
		@return {String} url 生成的新闻页面url

	*/
	function createUrl(pageNum) {
		return 'http://' + location.host + '/news/getNews?pageNow=' + pageNum + '&type=' + param.type;
	}


	// 页码更新
	function updatePage() {
		var pagination = $('.pagination'),
			curPage = param.pageNow,
			allPage = parseInt(pagination.attr('data-all'), 10) || 1,
			page_tpl_curr = $('#page_tpl_curr').html().trim(),
			page_tpl_break = $('#page_tpl_break').html().trim(),
			page_tpl_spec = $('#page_tpl_spec').html().trim(),
			page_tpl_first = $('#page_tpl_first').html().trim(),
			allpagesHTML = '',
			pageArray = calPage(curPage, allPage);
		
		// 修改上一页下一页指向
		if(curPage == 1) {
			$('.arrow-prev').hide().attr('href', '#');
		} else {
			$('.arrow-prev').attr('href', createUrl(curPage - 1));
		}
		if(curPage == allPage) {
			$('.arrow-next').hide().attr('href', '#');
		} else {
			$('.arrow-next').attr('href', createUrl(curPage + 1));
		}

		for(var i = 0, len = pageArray.length; i < len; i++) {
			var item = '';
			var page = pageArray[i];
			if( page == param.pageNow ) {
				item = page_tpl_curr.replace('{{number}}', page);
			} else {
				item = page_tpl_spec.replace('{{url}}', createUrl(page))
									.replace('{{number}}', page);
			}
			allpagesHTML += item;
		}


		// 不是第一页，则生成省略块
		if( pageArray[0] != 1) {
			var item = page_tpl_first.replace('{{url}}', createUrl(1))
									 .replace('{{number}}', 1);
			allpagesHTML += item;						 
		}
		// 不是最后一页，则生成省略块
		if( pageArray[len - 1] != allPage) {
			var item = page_tpl_break.replace('{{url}}', createUrl(allPage))
									 .replace('{{number}}', allPage);
			allpagesHTML += item;						 
		}


		// 写入DOM
		$('#nextPage').before($(allpagesHTML));
	}
	updatePage();


	// 计算当前页码块，返回页码数组
	function calPage(curPage, allPage) {
		curPage = parseInt(curPage);
		allPage = parseInt(allPage);
		var pageArray = [],
			pageCount = 10;
		if(allPage < pageCount) {
			for(var i = 1; i <= allPage; i++) {
				pageArray.push(i);
			}	
			return pageArray;
		}
		// 如果当前页等于最后一页，则往前生成10页
		if(curPage == allPage) {
			for(var i = allPage - pageCount + 1; i <= allPage; i++) {
				pageArray.push(i);
			}
			return pageArray;
		}

		var pageSection = Math.floor(curPage / pageCount), //当前页码区间
			pageIndex = curPage % pageCount; // 当前页下标
		// 如果当前页为10，20，30等尾数页，则往后偏移8页，不足则前面页码补齐	
		if(pageIndex == 0) {
			var objLastPage = curPage + pageCount - 2,
				lastPage = objLastPage > allPage ? allPage : objLastPage;
			for(var i = lastPage; i >= curPage; i--) {
				// 将当前页后八页页码以及当前页页码倒序推入数组
				pageArray.push(i);
			}
			var prevPage = objLastPage - lastPage + 1; //若上一步生成页码不足9页则补全
			for(var i = 1; i <= prevPage; i++) {
				pageArray.push(curPage - i);
			}
			pageArray = pageArray.reverse(); //原数组为倒序
			return pageArray;
		}

		// 如果当前页尾数为9，前+8 ① 后+1
		if(pageIndex == 9) {
			for(var j = curPage - 8; j <= curPage + 1; j++) {
				pageArray.push(j);
			}
			return pageArray;
		}

		// 如果当前页尾数为8，前+7 ① 后+2
		if(pageIndex == 8) {
			if(allPage - curPage < 2) {
				for(var j = curPage - 8; j <= curPage + 1; j++) {
					pageArray.push(j);
				}
				return pageArray;
			}
			for(var j = curPage - 7; j <= curPage + 2; j++) {
				pageArray.push(j);
			}
			return pageArray;
		}
		// 其他情况下，从当前区间第一位的前一位开始生成10页
		var firstPage = pageSection * pageCount - 1;

		firstPage = firstPage > 0 ? firstPage : 1;
		var lastNum = firstPage + 9;
		for(var i = 0; i < 10; i++) {
			if(lastNum > allPage) {
				lastNum--;
			}
		}
		for(var i = 0; i < 10 ; i++, lastNum--) {
			pageArray.push(lastNum);
		}
		pageArray.reverse();
		return pageArray;
	}

});