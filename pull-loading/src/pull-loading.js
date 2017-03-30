/**
 * @pull-loading.js
 * @author gisonyeung
 * @Created: 17-03-29
 * @repository: https://github.com/gisonyeung/pull-loading.git 
 * @description 移动设备任意容器实现下拉刷新，原生JavaScript实现。
 */

(function (global, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
    } else {
        global.PullLoading = factory();
    }
}(this, function () {
    'use strict';

    var getScrollTop = function(ele) {
    	return ele.pageYoffset || ele.scrollTop;
    }

    var pl_noop_callback = function(done) {
    	setTimeout(function() {
    		done();
    	}, 2000);
    }

    var PullLoading = function(ele, options) {

    	var self = this;
    	var MAX_Y = 40;

    	var defaults = {
    		scrollElem: document.body,
            frontText: '下拉加载更多',
            loadingText: '正在加载中...',
            endText: '释放立即加载',
            bgcolor: '#eee',
            icon: 'rectAlpha',
            callback: pl_noop_callback,
            timeout: 0,
        };

        options = options || {};
        for (var key in defaults) {
            if (typeof options[key] === 'undefined') {
                options[key] = defaults[key];
            }
        }

        var iconSvg = {
        	circle: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"><path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path><path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z" transform="rotate(119.94 20 20)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.7s" repeatCount="indefinite"></animateTransform></path></svg>',
        	rect: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50" xml:space="preserve"><rect x="0" y="12.1107" width="4" height="6.77865" fill="#333"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="10" y="8.11068" width="4" height="14.7786" fill="#333"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="20" y="5.88932" width="4" height="19.2214" fill="#333"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect></svg>',
        	rectAlpha: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50" xml:space="preserve"><rect x="0" y="8.89139" width="4" height="12.2172" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="8" y="8.60861" width="4" height="12.7828" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="16" y="6.10861" width="4" height="17.7828" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect></svg>',
        };

        var HTML_tpl = '<div class="pull-loading" style="background-color: {{bgcolor}};">{{iconSvg}}<span class="pull-loading_front">{{frontText}}</span><span class="pull-loading_loading">{{loadingText}}</span><span class="pull-loading_end">{{endText}}</span></div>'
        	.replace('{{iconSvg}}', iconSvg[options.icon] || iconSvg[defaults.icon])
        	.replace('{{bgcolor}}', options.bgcolor || defaults.bgcolor)
        	.replace('{{frontText}}', options.frontText || defaults.frontText)
        	.replace('{{loadingText}}', options.loadingText || defaults.loadingText)
        	.replace('{{endText}}', options.endText || defaults.endText);

        // 若是 DOM 集合则只取第一个进行绑定
        ele = ele.length ? ele[0] : ele;

        var loading_div = document.createElement('div');
        loading_div.innerHTML = HTML_tpl;

        // 插入 HTML
        if (ele.childNodes) {
        	ele.insertBefore(loading_div,ele.childNodes[0]);
        } else {
        	ele.innerHTML = loading_div;
        }

        var pull_ele = ele.getElementsByClassName('pull-loading')[0];
       	this.pull_ele = pull_ele;

        // 缓存数据槽
        var data = {};
        this.getData = function() { return data };

        // 绑定事件
        ele.addEventListener('touchstart', function(event) {
        	var events = event.touches[0] || event;

            // 垂直方向
            data.posY = events.pageY;
            data.nowY = data.posY;
            data.distanceY = 0;
            data.displayY = 0;

            data.scrollY = getScrollTop(options.scrollElem);

            data.touching = true;

            data.markY = -1;
        });

        ele.addEventListener('touchmove', function(event) {
        	if (data.touching !== true) {
                return;
            }

            var events = event.touches[0] || event;

            // 垂直位移
            data.nowY = events.pageY;
            var distanceY = data.nowY - data.posY;
            data.distanceY = distanceY;

            var moveY;
            var valHeight;

            // 所有浏览器使用统一处理
            if (getScrollTop(options.scrollElem) == 0) {
            	if (distanceY > 0 || data.markY > 0) {
            		// 已经滚动到头，阻止默认滚动行为，例如iPhone Chrome的下拉加载
                	event.preventDefault();
            	}

                // 切换是否下拉loading标志量
                if (distanceY > 0 && data.markY == -1) {
                    // 一旦滚动到顶部，开始下拉展开交互
                    // 1. 先设置标志量，此标志量只有在touch释放到时候才变更
                    // 同时记忆现在滚动到位置
                    data.markY = distanceY;
                }
            }

            // 此时，相比顶端位置，手指移动到的距离
            moveY = distanceY - data.markY;

            // 如果符合下拉展开的条件
            if (data.markY > 0 && data.isLoading != true) {
                // 太小不处理
                if (moveY < 0) {
                    valHeight = 0;
                } else {
                    valHeight = Math.min(moveY, MAX_Y);
                }

                // overflowHeight 用于增加阻力
                var overflowHeight;

            	overflowHeight = 0 - valHeight + Math.max(0, moveY - MAX_Y); 
                if (overflowHeight > 0) {
                    overflowHeight = self.damping(overflowHeight);
                }
 

                var eleHeight = valHeight + overflowHeight;
                // if (eleHeight > 35 && eleHeight < 40) { 
                // 	eleHeight = 40;
                // }

                if (data.loading) {
                	pull_ele.className = 'pull-loading loading';
                } else if (eleHeight >= 40) {
                	pull_ele.className = 'pull-loading end';
                } else {
                	pull_ele.className = 'pull-loading';
                }

                pull_ele.style.height = eleHeight + 'px';
                pull_ele.style.transition = 'none';
            }
            // 暴露给touchend使用
            data.rectY = moveY;
        });

        ele.addEventListener('touchend', function(event) {
        	if (data.touching !== true) {
                return;
            }

            if (data.markY > 0 && data.rectY > 0) {
                // data.markY是标志量
                // data.rectY是移动量，为了减少属性值数量，使用和Safari同样的属性值
                // 释放的逻辑如下
                // 如果移动超过最大高度，加载，否则，状态还原
                if (data.rectY >= MAX_Y) {
                    pull_ele.style.height = MAX_Y + 'px';
                	pull_ele.style.transition = '';
                	if (!data.loading) {
                		data.loading = true;
	                	pull_ele.className = 'pull-loading loading';

	                    // 超时函数
	                    var timeoutId;

	                    if (options.timeout) {
		                    timeoutId = setTimeout(function() {
		                    	if (typeof options.timeoutCallback === 'function') {
		                    		options.timeoutCallback.call(self);
		                    	}
		                    	self.origin.call(self);
		                    }, options.timeout);
	                    }

	                    options.callback.call(self, self.origin.bind(self, timeoutId));
                	}
                } else {
                    self.origin();
                }
            }

            data.touching = false;
        });
        
    }

    /**
	 * 回到最初的样式
	 * @return {object} 当前实例对象
	 */
	PullLoading.prototype.origin = function (timeoutId) {
	    var self = this;
	    var pull_ele = self.pull_ele;
	    var data = self.getData();

	    data.loading = false;
	    if ( data.touching != true ) {
		    pull_ele.className = 'pull-loading';
		    pull_ele.style.transition = '';
		    pull_ele.style.height = '0';
	    }

	    // 清除超时计时函数
	    if (timeoutId) {
	    	clearTimeout(timeoutId);
	    }


	    return self;
	};

	/**
	 * 设置阻尼计算
	 * @param  {number} value 数值
	 * @return {number}       计算值
	 */
	PullLoading.prototype.damping = function (value) {
	    var step = [20, 40, 60, 80, 100];
	    var rate = [0.5, 0.4, 0.3, 0.2, 0.1];

	    var scaleedValue = value;
	    var valueStepIndex = step.length;

	    while (valueStepIndex--) {
	        if (value > step[valueStepIndex]) {
	            scaleedValue = (value - step[valueStepIndex]) * rate[valueStepIndex];
	            for (var i = valueStepIndex; i > 0; i--) {
	                scaleedValue += (step[i] - step[i - 1]) * rate[i - 1];
	            }
	            scaleedValue += step[0] * 1;
	            break;
	        }
	    }

	    return scaleedValue;
	};

    return PullLoading;
}));

