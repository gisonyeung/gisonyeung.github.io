$(document).ready(function() {




	// 点击标签
	$('.main-wrapper').on('click', '.news-tab', function() {

		switchTab($(this).index());

	});

	// 切换标签
	var curIndex = 0;
	function switchTab(index) {

		if( index == curIndex ) {
			return false;
		}
		
		var tabs = $('.news-tab');

		if( index == 0 ) {
			tabs.eq(0).addClass('active');
			$('.news-content').show();
			tabs.eq(1).removeClass('active');
			$('.company-content').hide();
		} else {
			tabs.eq(0).removeClass('active');
			$('.news-content').hide();
			tabs.eq(1).addClass('active');
			$('.company-content').show();
		}
		curIndex = index;
	}

});