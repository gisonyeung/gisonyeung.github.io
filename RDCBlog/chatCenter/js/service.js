// 配置全局变量
wechatApp.factory('userDataService', function() {
    var userData = {
      userid : "",
      nickName : "",
    }
    this.changeTag = false;
    function setData(obj) {
        this.changeTag = !this.changeTag;
        userData.userid = obj.userid;
        userData.nickName = obj.nickName;
    }
    function setUserid(id) {
        userData.userid = id;
    }
    function getData() {
        return userData;
    }
    return{
        setData : setData,
        setUserid : setUserid,
        getData : getData,
        changeTag : this.changeTag
    }
});

// 登陆请求
wechatApp.factory('loginService', ['$http','$location', 
    function($http,$location) {
        var doRequest = function(username,password) {
            return $http({
                method: 'POST',
                data:{
                    username: username,
                    password: password
                },
                url: 'http://'+$location.host()+'/WeChat/?action=User&method=login'
            });
            // return $http.post(
            //     'http://localhost/WeChat/?action=User&method=login',{ 
            //         username: 'admin',
            //         password: '123'
            //     }
            // )
        };
        return {
            doLogin: function(username,password) {
                return doRequest(username,password);
            }
        };
    }
]);

// 弹框
wechatApp.factory('tipService', ['$rootScope', 
    function($rootScope) {
        $rootScope.tipShow = false; 
        return {
            show: function(message) {
                $rootScope.tipShow = true;
                $rootScope.tipText = message;
            },
            hide: function(message) {
                $rootScope.tipShow = false;
                $rootScope.tipText = message;
            }
        }

    }

]);

// cookies
wechatApp.factory('cookiesService', ['$cookies', 
    function($cookies) {
        return {
            remove: function() {
                var Len = arguments.length;
                for(var i=0; i<Len; i++) {
                    $cookies.remove(arguments[i]);
                }
            },
            put: function(key, value) {
                $cookies.put(key, value);
            },
            get: function(key) {
                return $cookies.get(key);
            }
        }

    }

]);

// 获取当前用户
/*
    {
        "email": "",
        "id": 0,
        "messagesUnread": 0,
        "password": "123456",
        "role": 0,
        "userInfo": null,
        "userName": "cong"
    }
*/
wechatApp.factory('getCurrentUserService', ['$http', 
    function($http) {
       var doRequest = function() {
            return $http({
                method: 'GET',
                url: '/user/current_user'
            });
        };
        return {
            getData: function() {
                return doRequest();
            }
        }; 
    }
]);


// 获取用户信息
wechatApp.factory('getUserDataService', ['$http','$location', 
    function($http,$location) {
        var doRequest = function(userid) {
            return $http({
                method: 'POST',
                data:{
                    userid: userid
                },
                url: 'http://'+$location.host()+'/WeChat/?action=User&method=getUserById'
            });
        };
        return {
            getData: function(userid) {
                return doRequest(userid);
            }
        };
    }
]);

// 获取好友列表
wechatApp.factory('getFriendListService', ['$http','$location',
    function($http,$location) {
        var doRequest = function() {
            return $http({
                method: 'POST',
                data: null,
                url: 'http://'+$location.host()+'/WeChat/?action=Friend&method=getFriendsList'
            });
        };
        return {
            getFrientList: function() {
                return doRequest();
            }
        };
    }
]);



// 获取最近联系人列表
/*
    [
        {
            "email": "",
            "id": 0,
            "messagesUnread": 0,
            "password": "123456",
            "role": 0,
            "userInfo":null,
            "userName": "congA"
            
        },
        {
            "email": "",
            "id": 0,
            "messagesUnread": 0,
            "password": "123456",
            "role": 0,
            "userInfo": null,
            "userName": "congB"
        }
    ]
*/
wechatApp.factory('getChatListService', ['$http',
    function($http) {
        var doRequest = function() {
            return $http({
                method: 'GET',
                url: '/message/communication_users'
            });
        };
        return {
            getList: function() {
                return doRequest();
            }
        };
    }
]);

// 获取最后一条消息
/*
    {
        "author": "userName1",
        "category": 1,
        "content": "this is content.",
        "id": 0,
        "receiver": "userName2",
        "sendTime": {
            "date": 9,
            "day": 5,
            "hours": 15,
            "minutes": 59,
            "month": 9,
            "seconds": 22,
            "time": 1444377562976,
            "timezoneOffset": -480,
            "year": 115
        },
        "status": 1
    }
*/
wechatApp.factory('getLatestMsgService', ['http', 
    function($http) {
        var doRequest = function(userid) {
            return $http({
                method: 'POST',
                data: {
                    targetUserName: userid
                },
                url: '/message/communication_users'
            });
        };
        return {
            getList: function(userid) {
                return doRequest(userid);
            }
        };
    }
]);





// 发送消息
/*
    {
        "author": "userName1",
        "category": 1,
        "content": "this is content.",
        "id": 0,
        "receiver": "userName2",
        "sendTime": {
            "date": 9,
            "day": 5,
            "hours": 15,
            "minutes": 59,
            "month": 9,
            "seconds": 22,
            "time": 1444377562976,
            "timezoneOffset": -480,
            "year": 115
        },
        "status": 1
    }
*/
wechatApp.factory('sendMessageService', ['$http',
    function($http) {
        var doRequest = function(userid,content) {
            return $http({
                method: 'POST',
                data: {
                    targetUserName : userid,
                    content : content
                },
                url:  '/message/sending'
            });
        };
        return {
            sendMessage: function(userid,content) {
                return doRequest(userid,content);
            }
        };
    }
]);

// 查询聊天记录
/*
[
    {
        "author": "userName1",
        "category": 1,
        "content": "this is content.",
        "id": 0,
        "receiver": "userName2",
        "sendTime": {
            "date": 9,
            "day": 5,
            "hours": 15,
            "minutes": 59,
            "month": 9,
            "seconds": 22,
            "time": 1444377562976,
            "timezoneOffset": -480,
            "year": 115
        },
        "status": 1
    },
    {
        "author": "userName1",
        "category": 1,
        "content": "this is content.",
        "id": 0,
        "receiver": "userName2",
        "sendTime": {
            "date": 9,
            "day": 5,
            "hours": 15,
            "minutes": 59,
            "month": 9,
            "seconds": 22,
            "time": 1444377562976,
            "timezoneOffset": -480,
            "year": 115
        },
        "status": 1
    }
]
*/
wechatApp.factory('chatRecordService', ['http', 
    function($http){
        var doRequest = function(userid,number) {
            return $http({
                method: 'POST',
                data: {
                    targetUserName : userid,
                    number : number
                },
                url:  '/message/recent_messages'
            });
        };
        return {
            getRecord: function(userid,number) {
                return doRequest(userid,number);
            }
        };
    }
]);

// 未读消息
// wechatApp.factory('getUnreadMsgService', ['$http', '$location', 
//     function($http,$location) {
//         var doRequest = function(userid) {
//             return $http({
//                 method: 'POST',
//                 data: {
//                     userid : userid,
//                 },
//                 url: 'http://'+$location.host()+'/WeChat/?action=Message&method=getUnreadByUserId'
//             });
//         };
//         return {
//             getMessage: function(userid) {
//                 return doRequest(userid);
//             }
//         };
//     }
// ]);

// 好友列表localStorage
// wechatApp.factory('friendListService', ['$rootScope', 
//     function($rootScope) {
//         var userid = $rootScope.userid;
//         try {
//             var friendListJSON = JSON.parse(localStorage.getItem("FriendList")) || {};
//             if(!friendListJSON[userid]) {
//                 friendListJSON[userid] = [];
//             }
//             var friendList = friendListJSON[userid];
//         }
//         catch(ex) {
//             localStorage.setItem("FriendList",{});
//             var friendListJSON = {};
//             var friendList = friendListJSON[userid] = [];
//         }

//         function getJSON() {
//             return friendList;
//         }
//         function setJSON(obj) {
//             friendList = obj;
//             friendListJSON[userid] = obj;
//             var friendListStr = JSON.stringify(friendListJSON);
//             localStorage.setItem("FriendList",friendListStr); 
//         }
//         return {
//             getJSON : getJSON,
//             setJSON : setJSON
//         }
//     }
// ]);


// 聊天记录localStorage
wechatApp.factory('allChatContentService', ['$rootScope', 
    function($rootScope) {
        var userid = $rootScope.userid;
        try {
            var allChatContentJSON = JSON.parse(localStorage.getItem("AllChatContent")) || {};
            if(!allChatContentJSON[userid]) {
                allChatContentJSON[userid] = {};
            }
            var allChatContent = allChatContentJSON[userid];
        }
        catch(ex) {
            localStorage.setItem("AllChatContent",{});
            var allChatContentJSON = {};
            allChatContentJSON[userid] = {};
        }
        
        function getJSON() {
            return allChatContent;
        }
        function setJSON(obj) {
            allChatContent = obj;
            allChatContentJSON[userid] = obj;
            var allChatContentStr = JSON.stringify(allChatContentJSON);
            localStorage.setItem("AllChatContent",allChatContentStr);
        }
        return {
            getJSON : getJSON,
            setJSON : setJSON
        }
    }
]);




// 聊天列表
wechatApp.factory('chatListService', ['$rootScope', 
    function($rootScope) {
        var ChatList = [];
        var ChatListIndex = [];
        function get() {
            return ChatList;
        }
        function set(obj) {
            ChatList = obj;
            if(!ChatListIndex) {
                angular.forEach(ChatList, function(data, index, array) {
                    ChatListIndex.push(data.id);
                });
            }
        }
        function isExist(id) {
            var index = ChatListIndex.indexOf(id);
            if(index>=0) {
                return index;
            }
            else {
                return "false";
            }
            // return index>=0 ? index : "false";
        }
        function toTop(id,exist,obj) {
            // 存在，需要置顶
            if(exist) {
                var index = ChatListIndex.indexOf(id);
                if(index!=0) {
                    // 列表置顶
                    var tArray = []; tArray[0] = ChatList[index];
                    ChatList.splice(index,1);
                    ChatList = tArray.concat(ChatList);
                    // 顺序列表置顶
                    ChatListIndex.splice(index,1);
                    var tempArray = [];tempArray[0] = id;
                    ChatListIndex = tempArray.concat(ChatListIndex);
                }
            }    
            // 不存在，需要新创建并在顶部压入
            else {
                var newChatContact = [];
                newChatContact[0] = obj;
                ChatList = newChatContact.concat(ChatList);
                var tempArray = [];tempArray[0] = id;
                ChatListIndex = tempArray.concat(ChatListIndex);
            }
            return ChatList;
        }
        return {
            get : get,
            set : set,
            isExist : isExist,
            toTop : toTop
        }
    }
]);

// 修改个人信息
// wechatApp.factory('updateService', ['$http', '$location',
//     function($http,$location) {
//         var doRequest = function(newData) {
//             return $http({
//                 method: 'POST',
//                 data: {
//                     nickname : newData.nickName,//字符串，用户的昵称
//                     age : newData.age,//整型，用户的年龄
//                     sex : newData.sex,//单个字符，用户的性别用“男”“女”表示
//                     introduction : newData.introduction,//字符串，用户的自我介绍
//                     email : newData.email//字符串，用户的email
//                 },
//                 url: 'http://'+$location.host()+'/WeChat/?action=User&method=update'
//             });
//         };
//         return {
//             updateData: function(newData) {
//                 return doRequest(newData);
//             }
//         };
//     }
// ]);

// 修改好友备注
// wechatApp.factory('setRemarkService', ['$http', '$location',
//     function($http,$location) {
//         var doRequest = function(userid,remark) {
//             return $http({
//                 method: 'POST',
//                 data: {
//                     userid : userid,
//                     remark : remark
//                 },
//                 url: 'http://'+$location.host()+'/WeChat/?action=Friend&method=setRemark'
//             });
//         };
//         return {
//             setRemark: function(userid,remark) {
//                 return doRequest(userid,remark);
//             }
//         };
//     }
// ]);

// wechatApp.factory('friendService', ['$q', '$http', 
//     function($q,$http) {
//         var setDataRequest = function(scope,userid,index) {
//             var deferred = $q.defer();
//                 scope.getFriendData(scope,userid,index)
//                 .success(function(data) {
//                     deferred.resolve(data);
//                 })
//                 .error(function(reason) {
//                     deferred.reject(reason);
//                 });
            
//             return deferred.promise;
//         }
//         return {
//             setFriendData : function(scope,userid,index) {
//                 return setDataRequest(scope,userid,index);
//             }
//         }
//     }
// ]);



