//修改post方式 form格式传值
var wechatApp = angular.module('wechatApp', ['ngAnimate', 'ngCookies', 'ui.router'], function($httpProvider) {//MyModule是你自己的app名称
  // Use x-www-form-urlencoded Content-Type
  // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';  
  $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';  
  $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';  
   
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for(name in obj) {
      value = obj[name];
        
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
  };
 
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
});










wechatApp.config(function($animateProvider) {
  //  只在类名含[animate-]上执行动画操作
  $animateProvider.classNameFilter(/\banimate-/);
});






/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
wechatApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});
// wechatApp.run(['$rootScope', '$location', 'userDataService', 
//   function($rootScope,$location,userDataService) {
//     $rootScope.$on('$stateChangeStart',
//         function(event, toState, toParams, fromState, fromParams){
//             if(toState.name == '#') return;
//             if(!userDataService.getData().userid){
//                 $location.path('/');
//             }
//          }) 
// }]);






/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
wechatApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('webwxindex', {
            url: '/',
            templateUrl: '../tpls/main.html'
        })
        .state('webwxindex.chat', {
            url: '/ch',
            templateUrl: '../tpls/chat.html',
        })
        .state('webwxindex.contact', {
            url: '/cn',
            templateUrl: '../tpls/contact.html'
        })
});
