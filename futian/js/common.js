$(document).ready(function() {


	var menuStatus = false;
	// 点击菜单按钮
	$('.header').on('click', '.menu', function() {
		switchMenu();
	});
	// 点击遮罩
	$('.header').on('click', '.mask', function() {
		switchMenu();
	});

	function switchMenu() {
		// 关闭状态则打开
		if( !menuStatus ) {
			$('.nav').addClass('active');
			$('.mask').addClass('active');
			$('body').addClass('hidden');
			menuStatus = !menuStatus;
		} else { // 否则关闭
			$('.nav').removeClass('active');
			$('.mask').removeClass('active');
			$('body').removeClass('hidden');
			menuStatus = !menuStatus;
		}
	}

});