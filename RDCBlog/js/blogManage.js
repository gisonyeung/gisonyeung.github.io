$(document).ready(function(){
	$(".tab").click(function(){
		var panel = $(this).attr("name");
		$(".tabActive").removeClass("tabActive");
		$(this).addClass("tabActive");
		$(".panelActive").removeClass("panelActive");
		$("."+panel).addClass("panelActive");
	});
});