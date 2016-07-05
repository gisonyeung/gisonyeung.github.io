wechatApp.directive('setFocus', function() {
	return{ 
		restrict: "A",
		link: function(scope, element, attrs){
		  element[0].focus();
		}
	}
});

wechatApp.directive('navChatDirective', function() {
	return {
		restrict : 'A',
		transclude : true,
		scope : true,
		templateUrl : '../tpls/navchat.html?'/* + (new Date).valueOf()*/,
		link : function(scope, element, attrs) {
			// 获取localStorage
			var allChatContentJSON = JSON.parse(localStorage.getItem("allChatContent"));
			// 加载最近联系人列表
			scope.chatList = [];
			loadChatList();
			// 监听从mainController传递过来的广播
			scope.$on('executeRecall', function(e, newChatList) { 
		        scope.chatList = newChatList;
		    });
			// 出现新聊天人
			function newChatContact(newMessage) {
				var newChatContact = {
					id : newMessage.id,
					number : 1,
					userName : newMessage.author,
					time : newMessage.sendTime.hours + ":" + newMessage.sendTime.minutes,
					l`astMessage : newMessage.content,
					isUnread = true
				};
				scope.chatList = scope.chatListService().toTop(newMessage.id,false,newChatContact);
				if(!scope.allChatContent[newMessage.id]) {
					scope.allChatContent[newMessage.id] = [];
				}
				scope.allChatContent[newMessage.id].push(newMessage);
				resetChatContent();
				
			}
			// 旧聊天信息的操作
			// function oldChatContact(id) {
			// 	scope.getUnreadMsg(id)
			// 	.success(function(data3) {
			// 		var len = data3.length;
			// 		scope.chatList = scope.chatListService().toTop(id,true);
			// 		scope.chatList[0].number = scope.chatList[0].number-0+len;
			// 		scope.chatList[0].lastMessage = data3[len-1].content;
			// 		scope.chatList[0].isUnread = true;
			// 		scope.chatListService().setJSON(scope.chatList);
			// 		if(!scope.allChatContent[id]) {
			// 			scope.allChatContent[id] = [];
			// 		}
			// 		angular.forEach(data3, function(data4,index4,array4) {
			// 			scope.allChatContent[id].push(data4);
			// 			resetChatContent();
			// 		});
			// 	});	
			// }
			// 已有联系人出现新消息
			function oldChatContactRepeat(newMessage) {
				id = newMessage.id;
				scope.chatList = scope.chatListService().toTop(id,true);
				if(scope.current.chatPerson.userid == id) {
					scope.chatList[0].isUnread = false;
				}
				else {
					scope.chatList[0].number = scope.chatList[0].number-0+1;
					scope.chatList[0].isUnread = true;
				}
				scope.chatList[0].lastMessage = newMessage.content;
				scope.chatListService().set(scope.chatList);
				if(!scope.allChatContent[id]) {
					scope.allChatContent[id] = [];
				}
				scope.allChatContent[id].push(data4);
				if(scope.current.chatPerson.userid == id) {
					setTimeout(function() {
						try{
							var scroll = document.getElementById("chatContentPanel");
							scroll.scrollTop = scroll.scrollHeight;
						} catch(ex) {};
					},0);
				}
				resetChatContent();
			}
			// ajax加载联系人列表
			function loadChatList() {
				scope.getChatList()
				.success(function (chatList){
					if(chatList.contactUserList) {
						scope.chatList = [];
						for(var i=0, len=chatList.contactUserList.length; i<len; i++) {
							var id = chatList[i].contactUserList.id;
							var lastMessageList = chatList[i].latestMessageList;
							var isUnread = (lastMessageList.status==1);
							var newContact = {
								id : id,
								number : chatList[i].unreadMessageNumberList[id] || 0,
								userName : chatList[i].contactUserList.userInfo.nickName,
								time : lastMessageList[id].sendTime.hours + ":" + lastMessageList[id].sendTime.minutes,
								lastMessage : lastMessageList[id].content || "",
								isUnread : isUnread
							}
							scope.chatList.push(newContact);
						}
						scope.chatListService().set(scope.chatList);
					}
				});
				scope.chatLoading = false;
			};
			// 重新存储聊天记录
			var time;
			function resetChatContent() {
				// 防止操作频繁	
				if(time) clearTimeout(time);
				time = setTimeout(function() {
					scope.allChatContentService().setJSON(scope.allChatContent);
				},300);
			}
			// 处理新消息
			function handlerNewMessage (newMessage){

				if(scope.chatListService().isExist(newMessage.id) == "false")
				{
					newChatContact(newMessage);
					console.log("newContact");
				}
				else {
					oldChatContactRepeat(newMessage);
					console.log("oldContact");
				}
				setTimeout(function(){
					scope.chatListService().set(scope.chatList);
				},0);	
			};
			// 长轮询新消息
			// function longPoling() {
			// 	setTimeout(function() {
			// 		listenNewMessage();
			// 		longPoling();
			// 	},1500)
			// };
			// longPoling();
			// 更新最近联系人列表的昵称
			// function updateNickname () {
			// 	angular.forEach(scope.chatList,function(data1,index1,array1) {
			// 		scope.getFriendData(data1.userid)
			// 		.success(function(data) {
			// 			if(data.statue != "error") {
			// 				scope.chatList[index1].nickName = data.nickName;
			// 			}
			// 		})
			// 	});
			// };
			// setTimeout(updateNickname,0);
		}
	}
});
// wechatApp.directive('navContactDirective', function() {
// 		return {
// 			restrict : 'A',
// 			transclude : true,
// 			scope : true,
// 			templateUrl : '../tpls/navcontact.html?' + (new Date).valueOf(),
// 			link : function(scope, element, attrs) {
// 				// 获取localStorage
// 				var FriendListJSON = scope.friendListService().getJSON;
// 				var promise = scope.getFriendList();
// 				// 有本地数据，则使用本地数据
// 				if(FriendListJSON) {
// 					promise
// 					.success(function(data) {
// 						if(data.length == FriendListJSON.length) {
// 							scope.allContact = FriendListJSON;
// 							console.log("Load 'Friend' From LocalStorage");
// 						}
// 						else {
// 							reloadFriend(promise);
// 							console.log("Load 'Friend' From Ajax");
// 						}
// 						setTimeout(function() {
// 							scope.chatLoading = false;
// 						},0);
// 					});
// 				}
// 				else{
// 					reloadFriend(promise);
// 					setTimeout(function() {
// 						scope.chatLoading = false;
// 					},0);
// 				}
// 				// 重载好友
// 				function reloadFriend(promise) {
// 					promise
// 					.success(function(data) {
// 						if (data.statue != "error") {
// 							scope.allContact = data;
// 							angular.forEach(scope.allContact, function(data,index,array){
// 								scope.getFriendData(data.userid)
// 								.success(function(data) {
// 									array[index].nickName = data.nickName || "";
// 									array[index].age = data.age || 0;
// 									array[index].email = data.email || "";
// 									array[index].sex = data.sex || "";
// 									array[index].introduction = data.introduction || "";
// 								});
// 							});
// 							setTimeout(function(){
// 								scope.friendListService().setJSON(scope.allContact);
// 							},2000);
// 						}
// 					})
// 					.error(function(response) {
// 						tipService.show("获取好友信息失败，可能是网络原因导致！");
// 					});
// 				}
// 			}
// 		}
// });

wechatApp.directive('togglePanel', function() {
	return {
		restrict : 'A',
		scope : true,
		link : function(scope, element, attrs) {
			scope.toggle = function() {
				var name = attrs.uiSref.replace(".","");
				scope.current.name = name;
				if(name == 'chat'){
					setTimeout(function() {
						try{
							var scroll = document.getElementById("chatContentPanel");
							scroll.scrollTop = scroll.scrollHeight;
						} catch(ex) {};
					},0);
				}
			}
		}
	}
});

// wechatApp.directive('contactItemDirective', function() {
// 	return {
// 		restrict : 'A',
// 		scope : true,
// 		link : function(scope, element, attrs) {
// 			scope.toggle = function(i) {
// 				var	contact = scope.allContact;
// 				scope.current.friend = {
// 					userid : attrs.userid,
// 					nickName : contact[i].nickName,
// 					remark : contact[i].remark,
// 					age : contact[i].age,
// 					email : contact[i].email,
// 					sex : contact[i].sex,
// 					introduction : contact[i].introduction
// 				};
// 			}
// 		}
// 	}
// });

wechatApp.directive('chatContactDirective', function() {
	return {
		restrict : 'A',
		scope : true,
		link : function(scope, element, attrs) {
			var time;
			scope.toggle = function(id,index) {
				if(!scope.allChatContent[id]) {
					scope.allChatContent[id] = [];
				}
				scope.personContent = scope.allChatContent[id];
				scope.current.chatPerson = {
					userid : scope.chatList[index].userid,
					name : scope.chatList[index].remark || scope.chatList[index].nickName,
				}
				// 向mainController传播chatContent
				scope.$emit('updateContent', scope.personContent);
				scope.chatList[index].number = 0;
				scope.chatList[index].isUnread = false;
				// 滚动条移动并聚焦
				setTimeout(function() {
					try{
						document.getElementById("editArea").focus();
						var scroll = document.getElementById("chatContentPanel");
						scroll.scrollTop = scroll.scrollHeight;
					} catch(ex) {};
				},0);
				resetStorage();	
			}
			function resetStorage(){
				// 防止操作频繁	
				if(time) clearTimeout(time);
				time = setTimeout(function() {
					scope.chatListService().setJSON(scope.chatList);
				},300);
			}
		}
	}
});

wechatApp.directive('sendToDirective', function() {
	return {
		restrict : 'A',
		scope : true,
		link : function(scope, element, attrs) {
			element.on('click',function() {

				var current =  scope.current;
				var id = current.friend.userid;
				current.chatPerson = {
					name : current.friend.remark || current.friend.nickName,
					userid : id
				}
				var chatList = scope.chatListService().getJSON();
				// 若列表不存在此联系人则加入相应联系人
				if(scope.chatListService().isExist(id) == "false") {
					var newChatContact = {
						userid : id,
						remark : current.friend.remark,
						number : 0,
						nickName : current.friend.nickName,
						isUnread : false,
						lastMessage : ""
					};
					chatList = scope.chatListService().toTop(id,false,newChatContact);
					// 向mainController广播
					scope.$emit('requestRecall',chatList);
				
				}
				
				triggerClick(id,chatList);

				// current.chatPerson.name = ;
				// current.chatPerson.userid = current.friend.userid;
				current.name = 'chat';
				
		    	
			});
			function triggerClick(id,chatList) {
					var allChatContent = scope.allChatContentService().getJSON();
					if(!allChatContent[id]) {
						allChatContent[id] = [];
					}
					scope.personContent = allChatContent[id];
					var index = scope.chatListService().isExist(id);
					scope.current.chatPerson = {
						userid : chatList[index].userid,
						name : chatList[index].remark || chatList[index].nickName,
					}
					// 向mainController传播chatContent
					scope.$emit('updateContent', scope.personContent);
					chatList[index].number = 0;
					chatList[index].isUnread = false;
					// 滚动条移动并聚焦
					setTimeout(function() {
						try{
							document.getElementById("editArea").focus();
							var scroll = document.getElementById("chatContentPanel");
							scroll.scrollTop = scroll.scrollHeight;
						} catch(ex) {};
					},0);
					resetStorage(chatList);	
			};
			var time;
			function resetStorage(chatList){
				// 防止操作频繁	
				if(time) clearTimeout(time);
				time = setTimeout(function() {
					scope.chatListService().setJSON(chatList);
				},300);
			}
		}
	}
});

wechatApp.directive('sendMessageDirective', function() {
	return {
		restrict : 'A',
		scope : true,
		link : function(scope, element, attrs) {
			// 发送消息
			scope.send = function() {
				scope.$root.isEmojiShow = false;
				var id = scope.current.chatPerson.userid;
				// 清空编辑框内容并聚焦
				var content = scope.sendContent;
				if(/\S/.test(content) && content!='<br>') {
					var editArea = document.getElementById("editArea");
					editArea.innerHTML = "";
					editArea.focus();
					
					scope.sendMessage(id, content)
					.success(function(data) {
						if (data.statue == "success") {
							obj = {
								time : new Date(),
								content : content,
								fromUserId : scope.userid,
								toUserId : id
							};
							// 更新聊天内容
							var allChatContent = scope.allChatContentService().getJSON();
							if(!allChatContent[id]) {
								allChatContent[id] = [];
							}
							allChatContent[id].push(obj);
							scope.allChatContentService().setJSON(allChatContent);
							// 更新左侧面板
							var chatList = scope.chatListService().toTop(id,true);
							chatList[0].lastMessage = content;
							// 向mainController广播
							scope.$emit('requestRecall',chatList);
							scope.chatListService().setJSON(chatList);
							// 滚动条移动
							setTimeout(function() {
								try{
									var scroll = document.getElementById("chatContentPanel");
									scroll.scrollTop = scroll.scrollHeight;
								} catch(ex) {};
							},0);
							
						}
					})	
				}
			}
			scope.openEmojiPanel = function(event) {
				event.stopPropagation();
				scope.$root.isEmojiShow = !scope.$root.isEmojiShow;
			}

		}
	}
});

// 表情面板
wechatApp.directive('emojiPanelDirective', function() {
	return {
		restrict : 'A',
		scope : true,
		transclude : true,
		templateUrl : '../tpls/emojiPanel.html?' + (new Date).valueOf(),
		link : function(scope, element, attrs) {
			var currentRange,_parentElem,supportRange = typeof document.createRange === 'function';
			scope.selectEmoticon = function(event) {
				document.getElementById('editArea').focus();
				var emojiName = event.target.className.split(" ")[1];
				
				if(emojiName) {
					var imgHTML = '<img class="emoji '+ emojiName +'" src="../images/spacer.gif">';
					restoreSelection();
					if(document.selection){
			    		currentRange.pasteHTML(html); 
					}
			    	else{
						document.execCommand("insertHtml", false, imgHTML);
			    	}
			    	saveSelection();
				}
				
			}
			scope.emojiPanelClick = function(event) {
				event.stopPropagation();
				// scope.$root.isEmojiShow = true;
			}
			function getCurrentRange() {
					var selection,
					range,
					txt = document.getElementById("editArea");
					if(supportRange){
			            selection = document.getSelection();
			            if (selection.getRangeAt && selection.rangeCount) {
			            	range = document.getSelection().getRangeAt(0);
			            	_parentElem = range.commonAncestorContainer;
			            }
			        }else{
			            range = document.selection.createRange();
			            _parentElem = range.parentElement();
			        }
			        if( _parentElem && txt === _parentElem) {
			        	parentElem = _parentElem;
			        	return range;
			        }
			        return range;
		    }
		    function saveSelection() {
		    	scope.$parent.currentRange = currentRange = getCurrentRange();
		    	scope.$parent.currentSelection = document.getSelection();
		    }
		    function restoreSelection() {
		    	currentRange = scope.$parent.currentRange;
		    	if(!currentRange){
		    		return;
		    	}
		    	var selection,
		    	range;
		    	if(supportRange){
		    		selection = document.getSelection();
		    		selection.removeAllRanges();
		    		selection.addRange(currentRange);	
		    	}else{
		            range = document.selection.createRange();
		            range.setEndPoint('EndToEnd', currentRange);
		            if(currentRange.text.length === 0){
		            	range.collapse(false);
		            }else{
		            	range.setEndPoint('StartToStart', currentRange);
		            }
		            range.select();
		        }
		    }
		}
	}
});





wechatApp.directive('contenteditableDirective', function() {
	return {
		restrict : 'A',
		scope : true,
		link : function(scope, element, attrs) {
			// function 
			scope.editAreaKeyup = function() {
				scope.$parent.sendContent = filter(element.html());
				saveSelection();
			}
			scope.editAreaMouseup = function() {
				saveSelection();
			}
			scope.editAreaBlur = function() {
	      		scope.$parent.sendContent = filter(element.html());
	      	}
	      	scope.editAreaMousedown = function() {
				element.html(filter(element.html()));
	      		scope.$parent.sendContent = filter(element.html());
	      	}
	      	var currentRange,_parentElem,supportRange = typeof document.createRange === 'function';
			scope.editAreaKeydown = function(event) {
				if(event.which == 13 && event.ctrlKey){
					event.preventDefault();
					if(document.selection) {
						currentRange = getCurrentRange();
			    		currentRange.pasteHTML('<br>'); 
					}
			    	else {
			    		if (navigator.userAgent.indexOf('Firefox') >= 0) {
			    			var html = element.html();
							var position = document.getSelection().focusOffset;
							var startText = html.substr(0,position);
							var endText = html.substr(position);
							element.html(startText+'<br>'+endText);
							// element.html(element.html() + '<br>');					
			    		}
			    		else {
							var oldSelection = document.getSelection();
			    			document.execCommand('InsertHtml','false','<br>');
		    				newSelection = document.getSelection();
			    			if(oldSelection.focusOffset) {
		    					document.execCommand('InsertHtml','false','<br><br>');
			    			}
			    			// 滚动条移动并聚焦
							setTimeout(function() {
								try{
									var scroll = document.getElementById("editArea");
									scroll.scrollTop = scroll.scrollHeight;
								} catch(ex) {};
							},0);
			    		}
					}
				}
				else if(event.which == 13 || event.which == 83 && event.altKey) {
					event.preventDefault();
					scope.send();
				}
				else {
					
				}
			}

			function filter(content) {
				// 过滤除img或br外的所有标签
				// var imga = /<(?!img)(?!a)([a-z0-9]+)[^>]*>([^<\1>]*)<\1>/ig
				var imgbrLeft = /<(?!img)(?!br)([a-z0-9]+[^>]*>)/ig;
				var imgbrRight = /<\/(?!img)(?!br)([a-z0-9]+[^>]*>)/ig;
				content = content
							.replace(imgbrLeft, '')
							.replace(imgbrRight, '');
				return content;			
			}
			function getCurrentRange() {
				var selection,
				range,
				txt = document.getElementById("editArea");
				if(supportRange){
		            selection = document.getSelection();
		            if (selection.getRangeAt && selection.rangeCount) {
		            	range = document.getSelection().getRangeAt(0);
		            	_parentElem = range.commonAncestorContainer;
		        
		            }
		        }else{
		            range = document.selection.createRange();
		            _parentElem = range.parentElement();
		        }
		        return range;
		    }
		    function saveSelection() {
		    	scope.$parent.currentRange = currentRange = getCurrentRange();
		   		scope.$parent.currentSelection = document.getSelection();
		   		// console.log(currentRange);
		    }
		    function restoreSelection() {
		    	currentRange = scope.$parent.currentRange;
		    	if(!currentRange){
		    		return;
		    	}
		    	var selection,
		    	range;
		    	if(supportRange){
		    		selection = document.getSelection();
		    		selection.removeAllRanges();
		    		selection.addRange(currentRange);
		    	}else{
		            range = document.selection.createRange();
		            range.setEndPoint('EndToEnd', currentRange);
		            if(currentRange.text.length === 0){
		            	range.collapse(false);
		            }else{
		            	range.setEndPoint('StartToStart', currentRange);
		            }
		            range.select();
		        }
		    }
		}
	}
});


// wechatApp.directive('menuDirective',['$rootScope', '$window',
// 	function($rootScope,$window) {
// 		return { 
// 			restrict : 'A',
// 			scope : true,
// 			link : function(scope, element, attrs) {
// 				scope.lookdata = function(event) {
// 					$rootScope.getDataPanel = true;
// 					$rootScope.isDataShow = true;
					

// 				}
				
// 			}
// 		}
// 	}
// ]);

// wechatApp.directive('personDataDirective', ['$rootScope', 
// 	function($rootScope) {
// 		return { 
// 			restrict : 'A',
// 			scope : true,
// 			templateUrl : '../tpls/dataPanel.html?' + (new Date).valueOf(),
// 			link : function(scope, element, attrs) {
// 				scope.changeSex = function() {
// 					scope.userData.sex = scope.userData.sex=='男'?"女":"男";
// 				}
// 				scope.saveData = function() {
// 					scope.updateService().updateData(scope.userData)
// 					.success(function(data) {
// 						if(data.statue == "success") {
// 							scope.userDataService().setData(scope.userData);
// 							$rootScope.isDataShow = false;
// 						}
// 						else {
// 							scope.tipService().show(data.error);
// 							var oldData = scope.userDataService().getData();
// 							scope.userData.nickName = oldData.nickName;
// 							scope.userData.age = oldData.age;
// 							scope.userData.sex = oldData.sex;
// 							scope.userData.email = oldData.email;
// 							scope.userData.introduction = oldData.introduction;
// 						}
// 					});
// 				}
// 				scope.resetData = function(doClose) {
// 					var oldData = scope.userDataService().getData();
// 					scope.userData.nickName = oldData.nickName;
// 					scope.userData.age = oldData.age;
// 					scope.userData.sex = oldData.sex;
// 					scope.userData.email = oldData.email;
// 					scope.userData.introduction = oldData.introduction;
// 					if(doClose) {
// 						$rootScope.isDataShow = false;
// 					}
// 				}
// 			}
// 		}
// 	}
// ]);

// wechatApp.directive('itemDirective', function(){
// 	return {
// 		restrict : 'A',
// 		scope : true,
// 		link : function(scope, element, attrs) {
// 			scope.isShow = false;
// 			scope.addItem(scope);
// 			scope.input = function(event) {
// 				event.stopPropagation();
// 			}
// 			scope.getShow = function(event) {
// 				event.stopPropagation();
// 				scope.doShow(scope);
// 				setTimeout(function() {element[0].children[1].focus();},0);
// 			}
// 			scope.getShow2 = function(event) {
// 				event.stopPropagation();
// 				scope.doShow(scope);
// 				setTimeout(function() {element[0].children[2].focus();},0);
// 			}
// 		}
// 	}
// });

// wechatApp.directive('cutDirective', function(){
// 	return {
// 		restrict : 'A',
// 		require : '^ngModel',
// 		scope : true,
// 		link : function(scope, element, attrs, ngModel) {
// 			scope.cutLength = function(len) {
// 				var _item = attrs.class.split('_')[1];
// 				var text = scope.getStringByteInfo(scope.userData[_item],len).limitStr;
// 				scope.userData[_item] = text;
// 				element[0].value = text;	
// 			}
// 		}
// 	}
// });

// wechatApp.directive('emailDirective', function(){
// 	return {
// 		restrict : 'A',
// 		require : '^ngModel',
// 		scope : true,
// 		link : function(scope, element, attrs, ngModel) {
// 			scope.checkEmail = function() {
// 				var text = element[0].value.replace(/[^\x00-\xff]/g,"");
// 				scope.userData.email = text;
// 				element[0].value = text;
// 			}
// 		}
// 	}
// });

// // 个人资料高度自适应
// wechatApp.directive('infoboxHeightresize', ['$window', function($window) {
//     return {
//         restrict : 'A',
//         link: function(scope, element, attrs) {
//             scope.onResize = function() {
//             	var dataBox = document.getElementsByClassName('data_content');
//                	var tempHeight = ($window.innerHeight - dataBox[0].offsetHeight)/2;
//                	tempHeight = tempHeight < 0 ? 10 : tempHeight;
//                 scope.panelHeight = tempHeight + 'px';
//             }
//             setTimeout(function(){scope.onResize()},0);

//             angular.element($window).bind('resize', function() {
//                 scope.onResize();
//             })
//         }
//     }
// }]);

// // 好友备注
// wechatApp.directive('remarkDirective', function() {
// 	return {
// 		restrict : 'A',
// 		scope : true,
// 		link : function(scope, element, attrs) {
// 			scope.isShow = false;
// 			scope.remark = scope.current.friend.remark || scope.current.friend.nickName;
// 			scope.getShow = function() {
// 				scope.remark = scope.current.friend.remark || scope.current.friend.nickName;
// 				scope.isShow = true;
// 				setTimeout(function(){document.getElementsByClassName('remark_input')[0].focus();},0);
// 			};
// 			scope.cutLength = function() {
// 				scope.isShow = false;
// 				var text = getStringByteInfo(scope.remark,20).limitStr;
// 				var Element = document.getElementsByClassName('remark_input');
// 				if(text) {
// 					scope.remark = text;
// 					Element[0].value = text;
// 					var id = scope.current.friend.userid;
// 					scope.setRemarkService().setRemark(id,text)
// 					.success(function(data) {
// 						if(data.statue == "success") {
// 							scope.current.friend.remark = text;
// 							var friendList = scope.friendListService().getJSON();
// 							var chatList = scope.chatListService().getJSON();
// 							angular.forEach(friendList, function(data,index,array) {
// 								if(data.userid == id) {
// 									friendList[index].remark = text;
// 									return;
// 								}
// 							});
// 							angular.forEach(chatList, function(data,index,array) {
// 								if(data.userid == id) {
// 									chatList[index].remark = text;
// 									scope.chatListService().setJSON(chatList);
// 									return;
// 								}
// 							});
// 						}
// 						else {
// 							console.log(data.error);
// 						}
// 					})
// 				}
				
// 			}
// 			// 截取前n个字符
// 			 function getStringByteInfo( string, intVal ) {
// 		    	var str = string || '';
// 		    	var length = str.length;
// 		    	var len, reg, charStr;
// 		    	var limitStr = '';
// 		        if ( length > 0 ) {
// 		            len = 0;
// 		            reg = /[^\x00-\xff]/;
// 		            for ( var i = 0; i < length; i++) {
// 		                charStr = str.charAt(i);
// 		                if ( reg.test(charStr) ) {
// 		                    len += 2;
// 		                }
// 		                else {
// 		                    len ++;
// 		                }
// 		                if (len <= intVal) {
// 		                    limitStr += str.charAt(i);
// 		                }
// 		            }
// 		        }
// 		        return {
// 		            length: len || 0,
// 		            limitStr: limitStr || ''
// 		        }
// 		    }
// 		}
// 	}
// });
