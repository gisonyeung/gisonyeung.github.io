wechatApp.filter('trustHtml', function ($sce) {
	return function (input) {
	    return $sce.trustAsHtml(input);
	}
});
// 2015-10-11T08:50:34.097Z
wechatApp.filter('chatTime', function () {
	return function (time) {
		try{
			return time.replace(/(\d{4}-\d{2}-\d{2}).(\d{2}:\d{2}:\d{2}).*/,'$1 $2');
		} catch (ex) {
			console.log(time);

		}
	   
	}
});