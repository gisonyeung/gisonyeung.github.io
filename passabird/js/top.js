// UTF-8


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
  def: 'easeOutQuad',
  swing: function (x, t, b, c, d) {
    //alert(jQuery.easing.default);
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
  },
  easeInQuad: function (x, t, b, c, d) {
    return c*(t/=d)*t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
    return c*(t/=d)*t*t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  easeOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  },
  easeInOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  },
  easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158; 
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  },
  easeInBounce: function (x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
  },
  easeInOutBounce: function (x, t, b, c, d) {
    if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
    return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
  }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */


var moveAfterStop,
    heightCheck;

(function($){

  var userAgent = window.navigator.userAgent.toLowerCase();

  $(function() {

    //スマホ/タブレット振り分け
    if((navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') == -1) || navigator.userAgent.indexOf('iPad') > 0 || (navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)){
      var sp = true;
      $('body').addClass('sp');
    }

    /* parallax
    --------------------------------------*/
    'use strict';
    var containerDiv = $('#container');
    var container = ScrollTween.container(containerDiv,{wheelSpeed: 40,touchSpeed:1.5});
    var elmObj = {
      m01 : $('#m01'),
      m02 : $('#m02'),
      m03 : $('#m03'),
      // m04 : $('#m04'),
      topFooter : $('#topFooter'),
      topID : $('#topID'),
      topID02 : $('#topID02'),
      topID03 : $('#topID03'),
      // nav04 : $('#nav04'),
      // nav05 : $('#nav05'),
      // nav06 : $('#nav06'),
      pNav01 : $('#pNav01'),
      pNav02 : $('#pNav02'),
      // pNav03 : $('#pNav03'),
      pNav04 : $('#pNav04'),
      pNav05 : $('#pNav05'),
      // pNav06 : $('#pNav06'),
      obj01 : $('#obj01'),
      info01 : $('#info01'),
      obj02 : $('#obj02'),
      obj03 : $('#obj03'),
      obj04 : $('#obj04'),
      pro01 : $('#pro01'),
      pro02 : $('#pro02'),
      pro03 : $('#pro03'),
      // btn02 : $('#btn02'),
      lab01 : $('#lab01'),
      // btn03 : $('#btn03'),
      // column01 : $('#column01')
    };

    var windowHeight,
        tempNav05,
        tempColumn01;

      /* page01
      --------------------------------------*/

      container.add(elmObj.topID, function(tween) { //考过鸟
        tween
          .to(0, tween.styles().top(-20))
          .to(1250, tween.styles().topOut());
      });

      if(!sp){
        container.add(elmObj.pNav01, function(tween) { //第一页文字
          tween
            .to(0, tween.styles().bottom(-10).left(0))
            .to(200, tween.styles().top(766))
            .to(1300, tween.styles().topOut());
        });
      }

      container.add(elmObj.m01, function(tween) { //第一页背景
        if (!$.support.noCloneEvent) { //IE6~8
          tween
            .to(100, 0 , { progress: function (tween) { elmObj.obj01.css("opacity", 1); } })
            .to(500, 0 , { progress: function (tween) { elmObj.obj01.css("opacity", 1-tween); } })
            .to(0, tween.styles().center().top())
            .to(1500, tween.styles().topOut());
        }
        else {
          tween
            .to(100, 0 , { progress: function (tween) { $('"'+elmObj.obj01+','+elmObj.info01+'"').css("opacity", 1); } })
            .to(500, 0 , { progress: function (tween) { elmObj.obj01.css("opacity", 1-tween); } })
            .to(1000, 0 , { progress: function (tween) { elmObj.info01.css("opacity", 1-tween); } })
            .to(0, tween.styles().center().top())
            .to(1500, tween.styles().topOut());
        }
      });


      /* page02
      --------------------------------------*/

      container.add(elmObj.topID02, function(tween) { //软件介绍
        tween
          .to(0, tween.styles().bottomOut().top(1200))
          .range(1300, 1700, tween.styles().top(150))
          .to(2500, tween.styles().topOut().top(-610));
      });


      if(!sp){
        container.add(elmObj.pNav02, function(tween) { //02下一页
          tween
            .to(0, tween.styles().bottomOut().top(1600))
            .range(1300, 1700, tween.styles().bottom(-10))
            .to(2500, tween.styles().topOut().top(-200));
        });
        container.add(elmObj.pNav04, function(tween) { //02上一页
          tween
            .to(0, tween.styles().bottomOut().top(1000))
            .range(1400, 1700, tween.styles().top(10))
            .to(2500, tween.styles().topOut().top(-450));
        });
      }

      container.add(elmObj.obj02, function(tween) { //第二页左侧
        tween
          .to(0, 0 , { progress: function (tween) { elmObj.obj02.css("opacity", 0); } })
          .to(500, 0 , { progress: function (tween) { elmObj.obj02.css("opacity", 0); } })
          .to(1200, 0 , { progress: function (tween) { elmObj.obj02.css("opacity", tween); } })
          .to(1400, 0 , { progress: function (tween) { elmObj.obj02.css("opacity", 1); } })
          .to(200, tween.styles().topOut().left(20).top(0))
          .range(900, 1700,  tween.styles().top(310))
          .to(2400, tween.styles().topOut());
      });

      container.add(elmObj.obj03, function(tween) { //第二页右侧
        tween
          .to(0, 0 , { progress: function (tween) { elmObj.obj03.css("opacity", 0); } })
          .to(500, 0 , { progress: function (tween) { elmObj.obj03.css("opacity", 0); } })
          .to(1200, 0 , { progress: function (tween) { elmObj.obj03.css("opacity", tween); } })
          .to(1900, 0 , { progress: function (tween) { elmObj.obj03.css("opacity", 1); } })
          .to(300, 0 , { progress: function (tween) { elmObj.pro02.css("opacity", 0); } })
          .to(750, 0 , { progress: function (tween) { elmObj.pro02.css("opacity", 0); } })
          .to(950, 0 , { progress: function (tween) { elmObj.pro02.css("opacity", tween); } })
          .to(2000, 0 , { progress: function (tween) { elmObj.pro02.css("opacity", 1); } })
          .to(300, 0 , { progress: function (tween) { elmObj.pro01.css("opacity", 0); } })
          .to(850, 0 , { progress: function (tween) { elmObj.pro01.css("opacity", 0); } })
          .to(1050, 0 , { progress: function (tween) { elmObj.pro01.css("opacity", tween); } })
          .to(2000, 0 , { progress: function (tween) { elmObj.pro01.css("opacity", 1); } })
          .to(0, tween.styles().topOut().center(100).top(0))
          .range(700, 1700,  tween.styles().top(430))
          .to(2000, tween.styles().topOut());
      });

       container.add(elmObj.obj04, function(tween) { //第二页小鸟
        tween
          // .to(0, 0 , { progress: function (tween) { elmObj.obj04.css("opacity", 0); } })
          // .to(500, 0 , { progress: function (tween) { elmObj.obj04.css("opacity", 0); } })
          // .to(1200, 0 , { progress: function (tween) { elmObj.obj04.css("opacity", tween); } })
          // .to(1400, 0 , { progress: function (tween) { elmObj.obj04.css("opacity", 1); } })
          // .to(300, tween.styles().rightOut().right(-400).top(500))
          // .range(1200, 2000,  tween.styles().left(-550).top(100))
          // .to(2100, tween.styles().leftOut().left(-550));
          .to(1200, tween.styles().right(-300).top(50))
          .range(1900, 2400,  tween.styles().left(-650).top(350))
          .to(2500, tween.styles().leftOut().left(-550));
      });

      container.add(elmObj.m02, function(tween) { //背景
        tween
          .range(0, 1050, tween.styles().center().top(100))
          .to(2650, tween.styles().topOut());
      });


      /* page03
      --------------------------------------*/

      container.add(elmObj.topID03, function(tween) { //即将上线
        tween
          .to(1700, tween.styles().bottomOut().top(1100))
          .range(2550, 2650, tween.styles().top(100));
      });

      // container.add(elmObj.nav04, function(tween) { //はんなりLab. ナビ
      //   tween
      //     .to(1700, tween.styles().bottomOut().top(1310))
      //     .range(2500, 2900, tween.styles().top(310))
      //     .to(3600, tween.styles().topOut().top(-310));
      // });

      if(!sp){
        // container.add(elmObj.pNav03, function(tween) { //スクロール用ナビ03
        //   tween
        //     .to(1700, tween.styles().bottomOut().top(1600))
        //     .range(2500, 2900, tween.styles().bottom(0))
        //     .to(3600, tween.styles().topOut().top(-50));
        // });
        container.add(elmObj.pNav05, function(tween) {// 03上一页
          tween
            .to(1700, tween.styles().bottomOut().top(1000))
            .range(2500, 2600, tween.styles().top(10))
            .to(2650, tween.styles().top(10))
        });
      }

      // container.add(elmObj.btn02, function(tween) { //ブランド紹介 ボタン
      //   tween
      //     .to(1900, tween.styles().topOut().center(315).top())
      //     .range(2600, 2900,  tween.styles().top(65))
      //     .to(3300, tween.styles().rightOut());
      // });

      container.add(elmObj.lab01, function(tween) { //微信
        tween
          .to(1600, tween.styles().rightOut().right(300).bottom(-380))
          .range(2500, 2700,  tween.styles().right(-80));
      });

      container.add(elmObj.m03, function(tween) { //第三页背景
        tween
          .range(0, 2100, tween.styles().center().bottom(0))
          .to(2300, tween.styles().bottom(-120))
          .to(2800, tween.styles().bottom(-120));
      });


      /* page04
      --------------------------------------*/
      heightCheck = function(){

        windowHeight = $(window).height();

        // if(!sp){
        //   container.add(elmObj.pNav06, function(tween) { //スクロール用ナビ06
        //     tween
        //       .to(2900, tween.styles().bottomOut().top(1000))
        //       .to(3900, tween.styles().top(0));
        //   });
        // }
        if(windowHeight<700){

          // tempNav05 = elmObj.nav05.detach();
          // tempColumn01 = elmObj.column01.detach();

          // container.add(elmObj.nav06, function(tween) { //お問い合わせ ナビ
          //   tween
          //     .to(2900, tween.styles().bottomOut().top(1000))
          //     .to(3900, tween.styles().top(0));
          // });

          // container.add(elmObj.btn03, function(tween) { //お問い合わせ ボタン
          //   tween
          //     .to(3100, tween.styles().topOut().center(250).top())
          //     .to(3900, tween.styles().top(95));
          // });
          container.add(elmObj.lab01, function(tween) { //微信
            tween
              .to(1600, tween.styles().rightOut().right(300).bottom(-200))
              .range(2500, 2700,  tween.styles().right(-80));
          });
          // container.add(elmObj.obj04, function(tween) { //第二页小鸟
          //   tween
          //     .to(1200, tween.styles().rightOut().right(-400).top(50))
          //     .range(2000, 2400,  tween.styles().left(-550).top(400))
          //     .to(2500, tween.styles().leftOut().left(-550));
          // });
        }
        else {
          
          // if(tempNav05){
          //   elmObj.nav06.before(tempNav05);
          //   // elmObj.btn03.before(tempColumn01);
          // }

          // container.add(elmObj.nav05, function(tween) { //商品コラム ナビ
          //   tween
          //     .to(2900, tween.styles().bottomOut().top(1000))
          //     .to(3900, tween.styles().top(0));
          // });

          // container.add(elmObj.nav06, function(tween) { //お問い合わせ ナビ
          //   tween
          //     .to(2900, tween.styles().bottomOut().top(1310))
          //     .to(3900, tween.styles().top(310));
          // });

          // container.add(elmObj.column01, function(tween) { //商品コラム 一覧
          //   tween
          //     .to(3100, tween.styles().topOut().center(315).top())
          //     .to(3900, tween.styles().top(95));
          // });

          // container.add(elmObj.btn03, function(tween) { //お問い合わせ ボタン
          //   tween
          //     .to(3100, tween.styles().topOut().center(250).top())
          //     .to(3900, tween.styles().top(390));
          // });
        }
      }

      // heightCheck();

      // container.add(elmObj.m04, function(tween) { //背景
      //   tween
      //     .range(0, 3550, tween.styles().center().bottom(0))
      //     .to(3900, tween.styles().bottom(-90));
      // });

      /* footer
      --------------------------------------*/

      container.add(elmObj.topFooter, function(tween) {
        tween
          .range(0, 2100, tween.styles().center().bottom(120))
          .to(2300, tween.styles().bottom(0))
          .to(3900, tween.styles().bottom(0));
      });

      setTimeout(function(){
        container.play();
      },50);

      /* ページ内リンク
      --------------------------------------*/
      (function () {
        var a = [{
            id: "#scrollPageTop",
            hash: "container",
            sectionTop: 0,
            scrollTop: 0 + 1
          },
          {
            id: "#pNav01",
            hash: "m01",
            sectionTop: 1380,
            scrollTop: 1380 + 1
          },
          {
            id: "#pNav02",
            hash: "m02",
            sectionTop: 2580,
            scrollTop: 2580 + 1
          },
          // {
          //   id: "#pNav03",
          //   hash: "m03",
          //   sectionTop: 3898,
          //   scrollTop: 3898 + 1
          // },
          {
            id: "#pNav04",
            hash: "m01",
            sectionTop: -1380,
            scrollTop: -1380 + 1
          },
          {
            id: "#pNav05",
            hash: "m02",
            sectionTop: 1380,
            scrollTop: 1380 + 1
          },
          {
            id: "#pNav06",
            hash: "m03",
            sectionTop: 2580,
            scrollTop: 2580 + 1
          }
        ];

        for (var b = 0, c = a.length; b < c; b++) {
          var d = a[b];
          (function (a) {
            var b = $(a.id);
            b.on("touchstart mousedown", function (){
              console.log(a.scrollTop);
              container.scrollTo(a.scrollTop);
            });
          })(d), location.hash === "#" + d.hash && container.scrollTo(d.scrollTop);
        }

        if (!$.support.noCloneEvent) { //IE6~8
          $(".ieFix").each(function() {
            $(this).css({
              'filter' : 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + $(this).attr('src') + '", sizingMethod="scale");'
            });
          });
        }

      })();

      /* call
      --------------------------------------*/
      //停止后缓动
      moveAfterStop = function(pos){
        container.scrollTo(pos);
      };


      /* info01 hover
      --------------------------------------*/

      $("#info01").one("mouseover",function(){
        container.scrollTo(300,0); //1回目だけホバー時に移動
      });

      /* menuTog
      --------------------------------------*/
      var hdrHeight = $("#topHeader").height();
      $("#menuTog").click(function(){
        if($(this).data("tog") === 0){
          $(this).data("tog",1);
          $("#topHeader").animate({ "top" : "-20px" }, 450, "easeOutBack");
        }
        else {
          $(this).data("tog",0);
          $("#topHeader").animate({ "top" : "-"+hdrHeight+"px" }, 300, "easeOutBack");
        }
      }).data("tog",0);

  });

})(jQuery);

