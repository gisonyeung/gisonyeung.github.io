wechatApp.controller('appController', ['$rootScope', '$scope',
	function($rootScope,$scope) {
		$rootScope.isMenuShow = false;
		$scope.appClick = function() {
			$rootScope.isMenuShow = false;
			$rootScope.isEmojiShow = false;
		}
    	// 监听userData并向下广播
    	$scope.$on('requestUserData', function(e, newData) {
	    	$scope.$broadcast('updateUserData', newData);
	    });
	}
]);

// wechatApp.controller('loginController', 
// 	['$rootScope', '$scope', '$location', '$cookies', 'loginService', 'tipService', 'cookiesService', 'userDataService', 'getUserDataService',  
// 	function($rootScope,$scope,$location,$cookies,loginService,tipService,cookiesService,userDataService,getUserDataService){
// 		$scope.user = {
// 			username : cookiesService.get("username"),
// 			password : cookiesService.get("password"),
// 			isRemember : false
// 		};
// 		if(cookiesService.get("isRemember") == "true") {
// 			$scope.user.isRemember = true;
// 		}
// 		$scope.goLogin = function() {
// 				if(!$scope.user.username) {
// 					document.getElementById('username').focus();
// 				}
// 				else if(!$scope.user.password) {
// 					document.getElementById('password').focus();
// 				}
// 				else {
// 					loginService.doLogin($scope.user.username,$scope.user.password)
// 		            	.success(function(data, status) {
// 		            		$rootScope.userid = data.userid;
// 		            		if (data.statue == "success") {
// 		            			if ($scope.user.isRemember) {
// 			            			cookiesService.put('username', $scope.user.username);
// 			            			cookiesService.put('password', $scope.user.password);
// 			            			cookiesService.put('isRemember', true);
// 		            			}
// 		            			else if ($scope.user.username == cookiesService.get("username")) {
// 		            				cookiesService.remove('username','password','isRemember');
// 		            			}
// 		            			userDataService.setUserid(data.userid);
// 		            			setSelfData(data.userid);
// 		            			setTimeout(function(){$location.url('webwxindex/ch')},0);
// 		            		}
// 		            		else {
// 		            			tipService.show(data.error);
// 		            		}
// 		            	});	
// 		        }
// 		};
// 		// 输入框按键
// 		$scope.keypress = function(event) {
// 			if(event.which == 32) {
// 				event.preventDefault();
// 			}
// 			else if(event.which == 13) {
// 				$scope.goLogin();
// 			}
// 		}
// 		// 获取个人资料并保存进userDataService
// 		function setSelfData(userid){
// 			getUserDataService.getData(userid)
// 			.success(function(data) {
// 				if (data.statue != "error") {
// 					userDataService.setData(data);
// 					var newData = {
// 						userid : data.userid,
// 						nickName : data.nickName,
// 						age : data.age,
// 						sex : data.sex,
// 						email : data.email,
// 						introduction : data.introduction
// 					};
// 					// 向上广播userData的变化
// 			    	$scope.$emit('requestUserData', newData);
// 					// userDataService.changeTag = !userDataService.changeTag;
// 				}
// 				else {tipService.show(data.error);}
// 			})
// 			.error(function(response) {
// 				tipService.show("获取个人资料失败，请重新登陆！");
// 			});
// 		}
// 		// $scope.$watch('username', function(newUsername) {
// 		// 	if (newUsername) {
// 		// 		loginService.doLogin(newUsername)
// 	 //            	.success(function(data, status) {
// 	 //            		console.log(data);
// 	 //            	});
// 		// 	}
// 		// });
// 	}
// ]);

wechatApp.controller('tipController', ['$scope', '$rootScope', 'tipService', 
	function($scope,$rootScope) {
		// $scope.tipShow = false;
		$scope.closeTip = function() {
			$rootScope.tipShow = false;
		}
	}
]);

// wechatApp.controller('selfController', ['$scope', 'userDataService', 
// 	function($scope,userDataService) {
// 		$scope.nickname = userDataService.getData().nickName;
// 		$scope.selfData = userDataService;
// 		var watchTag = 0;
// 		var selfDataWatch = $scope.$watch('selfData', function(newVal) {
// 			$scope.nickname = newVal.getData().nickName;
// 			watchTag++;
// 			// 中止监听
// 			if(watchTag == 2) { 
// 				selfDataWatch();
// 			}
// 		},true);

// 	}
// ]);

wechatApp.controller('mainController', ['$scope', '$rootScope', 'getChatListService', 'allChatContentService', 'chatListService', 'getCurrentUserService', 'userDataService',
	function($scope,$rootScope,getChatListService,allChatContentService,chatListService,getCurrentUserService,userDataService) {
		$scope.current = {
			name : 'chat',
			friend : '',
			chatPerson : '',
			chatContact : ''
		};
		$scope.chatLoading = true;
		$scope.chatContent = [];
		// 监听聊天面板指令中chatContent的变化
		$scope.$on('updateContent', function(e, newContent) {
        	$scope.chatContent = newContent;
    	});
    	// 监听最近联系人列表并向下广播
    	$scope.$on('requestRecall', function(e, newChatList) {
	    	$scope.$broadcast('executeRecall', newChatList);
	    });

  //   	// 获取好友列表
		// $scope.getFriendList = function() {
		// 	return getFriendListService.getFrientList();
		// };

		// 获取个人资料
		getCurrentUserService.getData()
		.success(function(data) {
			try {
				var obj = {
					id : data.id,
					nickName : data.userInfo.nickName
				}
			} catch(ex) {
				var obj = {
					id : data.id,
					nickName : ""
				}
			}
			userDataService.setData(obj);
		})

		// 请求最近联系人列表
		$scope.getChatList = function() {
			return getChatListService.getList();
		}
		// 操作最近联系人列表
		$scope.chatListService = function() {
			return chatListService;
		}
		// 获取最后一条消息
		$scope.getLatestMsg = function(userid) {
			return getLatestMsgService.getList(userid);
		}
		// 聊天内容缓存服务
		$scope.allChatContentService = function() {
			return allChatContentService;
		}
		$scope.toggleSystemMenu = function(event) {
			$rootScope.isMenuShow = !$rootScope.isMenuShow;
			event.stopPropagation();
		}
	}
]);

wechatApp.controller('chatSenderController', ['$scope', '$rootScope', 'sendMessageService', 'allChatContentService', 'chatListService', 
	function($scope,$rootScope,sendMessageService,allChatContentService,chatListService){
		$scope.sendContent = "";
		$scope.sendMessage = function(userid,content) {
			return sendMessageService.sendMessage(userid,content);
		};
		$scope.allChatContentService = function() {
			return allChatContentService;
		}
		$scope.chatListService = function() {
			return chatListService;
		}
		$scope.currentRange = {};
		$rootScope.isEmojiShow = false;
	}	
]);

// wechatApp.controller('dataController', ['$scope', '$rootScope', 'userDataService', 'updateService', 'tipService',
// 	function($scope,$rootScope,userDataService,updateService,tipService) {
// 		$rootScope.isDataShow = true;
// 		var items = [];
// 		// 监听userData的变化
// 		$scope.$on('updateUserData', function(e, newData) {
//         	$scope.userData = newData;
//     	});
//     	$scope.userData = userDataService.getData();
//     	var oldData = userDataService.getData();
//     	$scope.userData = {};
// 		$scope.userData["nickName"] = oldData.nickName;
// 		$scope.userData["age"] = oldData.age;
// 		$scope.userData["sex"] = oldData.sex;
// 		$scope.userData["email"] = oldData.email;
// 		$scope.userData["introduction"] = oldData.introduction;
// 		$scope.doShow = function(item) {
// 			item.isShow = true;
// 			angular.forEach(items, function(data) {
// 				if (item != data) {
// 					data.isShow = false;
// 				}
// 			});
// 		};
// 		$scope.closeData = function() {
// 			$rootScope.isDataShow = false;
// 		};
// 		$scope.hideInput = function() {
// 			angular.forEach(items, function(data) {
// 				data.isShow = false;
// 			});
// 		};
// 		$scope.addItem = function(item) {
// 			items.push(item);
// 		}
// 		$scope.userDataService = function() {
// 			return userDataService;
// 		}
// 		$scope.updateService = function() {
// 			return updateService;
// 		}
// 		$scope.tipService = function() {
// 			return tipService;
// 		}
// 		// 截取前n个字符
// 		$scope.getStringByteInfo = function( string, intVal ) {
// 	    	var str = string || '';
// 	    	var length = str.length;
// 	    	var len, reg, charStr;
// 	    	var limitStr = '';
// 	        if ( length > 0 ) {
// 	            len = 0;
// 	            reg = /[^\x00-\xff]/;
// 	            for ( var i = 0; i < length; i++) {
// 	                charStr = str.charAt(i);
// 	                if ( reg.test(charStr) ) {
// 	                    len += 2;
// 	                }
// 	                else {
// 	                    len ++;
// 	                }
// 	                if (len <= intVal) {
// 	                    limitStr += str.charAt(i);
// 	                }
// 	            }
// 	        }
// 	        return {
// 	            length: len || 0,
// 	            limitStr: limitStr || ''
// 	        }
// 	    }
// 	}
// ]);