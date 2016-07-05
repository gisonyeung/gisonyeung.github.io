$(document).ready(function(){
	// 点击头像
	$(".userhead").click(function(event){
		$(".headSkim").fadeIn(100);
		event.stopPropagation();
		var _headSkimH = $(".headSkim").height();
		var _headSkimW = $(".headSkim").width();
		$("#bighead").css("max-height",_headSkimH-10);
		$("#bighead").css("max-width",_headSkimW-10);
		var _bighead = $("#bighead").height();
		var _temp = _headSkimH/2 - _bighead/2;
		if (_temp < 0) {_temp = 10;}
		$("#bighead").css("margin-top", _temp);
	});
	$(document).click(function(){
		$(".headSkim").fadeOut(100);
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
	});
	// 加载完毕后即刻 渲染颜色 并执行 个人博客链接化 及 个人留言的换行
	(function(){
		// 性别
		var _sex = $(".sex").attr("alt");
		if (_sex == "女") {
			$(".sex").attr("src","../images/girl.png");
		}
		else if(_sex == "男"){
			$(".sex").attr("src","../images/boy.png");
		}
		else{
			$(".sex").attr("src","../mages/dog.png");
		}
		// 颜色
		var _color = $(".header").attr("name") || "#36b6a1";
		$(".information").css("color",_color);
		$(".header").css("background-color",_color);

		// 博客
		var a = $("#selfBlog").text();
		if(a.replace(/(^\s*)|(\s*$)/g,"") != "无"){
			$("#selfBlog").empty();
			$("#selfBlog").append(
				'<a href="http://'+ a +'" target="_blank">'+ a +'</a>'
			);
		}
		
		// 个人留言
		var text = $("#message").html().split("[br]");
		$("#message").empty();
		for (var i=0; i<text.length; i++) {
			$("#message").append("<p></p>");
			$("#message").children("p:last").text(text[i]);
		}
	}());

});