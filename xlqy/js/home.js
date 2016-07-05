$('document').ready(function() {


	// 点击注册标签
	$('#user_tab1').click(function() {
		$('.user_tab').removeClass('active');
		$(this).addClass('active');
		$('#user_panel2').hide();
		$('#user_panel1').show();
	});
	// 点击修改密码标签
	$('#user_tab2').click(function() {
		$('.user_tab').removeClass('active');
		$(this).addClass('active');
		$('#user_panel1').hide();
		$('#user_panel2').show();
	});



	// 点击完成注册
	$('#doReg').click(function() {
		var formData = {
			username: $('#username').val(),
			password: $('#password').val(),
			repassword: $('#repassword').val(),
			req1: $('#reg_qst').val(),
			req2: $('#reg_pwd').val()
		};

		// 表单验证
		if(formData.username.length < 1) { // 用户名非空判断
			$('#username').focus();
			return false;
		} else if(formData.password.length < 1) { // 密码非空判断
			$('#password').focus();
			return false;
		} else if(formData.repassword.length < 1) { // 密码非空判断
			$('#repassword').focus();
			return false;
		} else if(formData.req1.length < 1) { // 密保问题非空判断
			$('#reg_qst').focus();
			return false;
		} else if(formData.req2.length < 1) { // 密保答案非空判断
			$('#reg_pwd').focus();
			return false;
		} else if(formData.username.length < 6) { // 用户名长度
			alert('用户名过短，长度需大于6个字符');
			$('#username').focus();
			return false;
		} else if(formData.username.length > 15){ // 用户名长度
			alert('用户名过长，请控制在15个字符以内');
			$('#username').focus();
			return false;
		} else if(formData.password.length < 4) { // 密码长度
			alert('密码过短，长度需大于4个字符');
			$('#password').focus();
			return false;
		} else if(formData.password.length > 15){ // 密码长度
			alert('密码过长，请控制在15个字符以内');
			$('#password').focus();
			return false;
		} else if(formData.password !== formData.repassword) { // 两次密码一致
			alert('两次输入密码不一致');
			return false;
		} else if( !(/^[0-9]+$/.test(formData.req1)) ) {
			alert('密保问题只支持纯数字，请重新输入');
			$('#reg_qst').focus();
			return false;
		} else if( !(/^[0-9]+$/.test(formData.req2)) ) {
			alert('密保答案只支持纯数字，请重新输入');
			$('#reg_pwd').focus();
			return false;
		}

	});




	// 点击修改密码
	$('#doChangePwd').click(function() {
		var formData = {
			username: $('#t2_username').val(),
			password: $('#t2_password').val(),
			newpassword1: $('#t2_repassword').val(),
			newpassword2: $('#t2_repassword2').val()
		};

		// 表单验证
		if(formData.username.length < 1) { // 用户名非空判断
			$('#t2_username').focus();
			return false;
		} else if(formData.password.length < 1) { // 密码非空判断
			$('#t2_password').focus();
			return false;
		} else if(formData.newpassword1.length < 1) { // 新密码非空判断
			$('#t2_repassword').focus();
			return false;
		} else if(formData.newpassword2.length < 1) { // 确认密码非空判断
			$('#t2_repassword2').focus();
			return false;
		} else if(formData.newpassword1 !== formData.newpassword2) { // 两次密码一致
			alert('两次输入密码不一致，请重新输入');
			return false;
		}

	});



	// 注册帐号输入框聚焦
	$('.reg').on('focus', function() {
		var text = $(this).attr('data-rel');
		$('.reg_tip').text(text).addClass('on');
	});	

	// 修改密码输入框聚焦
	$('.pwd').on('focus', function() {
		var text = $(this).attr('data-rel');
		$('.pwd_tip').text(text).addClass('on');
	});	



	var preTsPage = 1;
	var maxPage = $('.ts_item').length;
	var loopTime = 4000; //轮播时间

	// 轮播
	var tsTime = setInterval(loopFun, loopTime);

	// 九大特色鼠标覆盖
	$('.ts_item').on('mouseover', function() {
		var index = parseInt($(this).attr('data-index'), 10);
		switchTs(index);
		clearTimeout(tsTime);
	});
	$('.ts_item').on('mouseout', function() {
		tsTime = setInterval(loopFun, loopTime);
	});

	function switchTs(newIndex) {
		var index = parseInt(newIndex, 10);
		if(index == preTsPage) {
			return false;
		}
		$('.sign').eq(preTsPage - 1).removeClass('active');
		$('.sign').eq(index - 1).addClass('active');
		$('#ts_panel' + preTsPage).hide();
		$('#ts_panel' + index).show();
		preTsPage = index;
	}

	function loopFun() {
		if(preTsPage == maxPage) {
			switchTs(1);
		} else {
			switchTs(preTsPage + 1);
		}
	}



	var oldJobPage = 3;
	// 点击职业标签
	$('.tab_job').on('click', function() {
		var index = parseInt($(this).attr('data-index'), 10);
		if(oldJobPage == index) {
			return false;
		}
		$('.tab_job').removeClass('active');
		$(this).addClass('active');
		var swf = $(this).attr('data-swf');
		$('#section3').removeClass('job' + oldJobPage).addClass('job' + index);
		$('#job_panel' + oldJobPage).hide();
		$('#job_panel' + index).show();
		$('.tab_media').empty();
		$('.tab_media').append(
			'<object type="application/x-shockwave-flash" name="item1" data="./img/role_job' + index + '.swf" width="1920" height="865" id="item1">' +
	            '<param name="allowfullscreen" value="true">' +
	            '<param name="wmode" value="transparent">' +
	            '<param name="allowscriptaccess" value="always">' +
	            '<param name="flashvars" value="__objectID=item1&amp;__url=http://58.221.49.71:85/">' +
	       '</object>'
	      )
		oldJobPage = index;

	});



});