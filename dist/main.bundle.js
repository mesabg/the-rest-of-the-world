webpackJsonp([2],{18:function(n,i,o){n.exports=o(19)},19:function(n,i,o){"use strict";window.$=o(3);o(21);$(document).ready(function(n){o(22)(n)})},22:function(n,i,o){"use strict";function t(){$(".page").tilt({perspective:1800,easing:"cubic-bezier(.03,.98,.52,.99)",maxTilt:20,speed:2500,transition:!0})}function a(){var n=0,i=0,o=0,t=$(".page > .content").children("[slice]"),a=$("[page-mobile] > .content").children("[slice]"),e=1,r=!0,s="up",l=!1,c=!1,d=0,u=0,f=!1;$(window).swipe(function(n,i){console.log(window.innerWidth,window.innerHeight),console.log("Direction :: ",n.y),"up"!==n.y||f?n.y:(e++,e=7===e?6:e,f=!0,a.animate({opacity:0},350),$(a.get(e-1)).animate({opacity:1},350),window.innerWidth<768&&($("body").attr("class",""),$("body").addClass("color-"+e)),3===e&&($("#answer-1").on("mouseenter",function(){$("body").attr("class",""),$("body").addClass("color-e-1")}).on("mouseleave",function(){$("body").attr("class",""),$("body").addClass("color-3")}),$("#answer-2").on("mouseenter",function(){$("body").attr("class",""),$("body").addClass("color-e-2")}).on("mouseleave",function(){$("body").attr("class",""),$("body").addClass("color-3")})),$("[icon]").animate({opacity:0},350),1===e||2===e?$("[icon]#mouse").animate({opacity:1},350):3===e?$("[icon]#pick").animate({opacity:1},350):4===e&&$("[icon]#timer").animate({opacity:1},350),setTimeout(function(){f=!1,console.log("Hier")},700))}),window.addEventListener("keyup",function(a){if("ArrowUp"==a.key){c=!0;var s={initial:n,final:d},l={initial:i,final:u};e++,e=7===e?6:e,d=-15*(e-1),u=54*(e-1),s.final=d,l.final=u,$(t.get(e-1)).animate({opacity:1},700),$("body").attr("class",""),$("body").addClass("color-"+e),3===e&&($("#answer-1").on("mouseenter",function(){$("body").attr("class",""),$("body").addClass("color-e-1")}).on("mouseleave",function(){$("body").attr("class",""),$("body").addClass("color-3")}),$("#answer-2").on("mouseenter",function(){$("body").attr("class",""),$("body").addClass("color-e-2")}).on("mouseleave",function(){$("body").attr("class",""),$("body").addClass("color-3")})),$("[icon]").animate({opacity:0},350),1===e||2===e?$("[icon]#mouse").animate({opacity:1},350):3===e?$("[icon]#pick").animate({opacity:1},350):4===e&&$("[icon]#timer").animate({opacity:1},350);var f=[];f=Array.from(t.slice(0,e)).map(function(i,o){return $(i).specialAnimation({from:n+15*o,to:s.final+15*o},{from:l.initial-54*o,to:l.final-54*o})}),Promise.all(f).then(function(t){c=!1,r=!0,o=0,n=d,i=u,console.log("Animation ends")})}}),window.addEventListener("wheel",function(a){a.deltaY<0&&(n+=.5,i-=1.8,o--,s="down"),a.deltaY>0&&(n-=.5,i+=1.8,o++,s="up"),n>0&&(n=0,i=0,o=0,l=!0),console.log("Scroll ",o),c||Array.from(t.slice(0,e)).forEach(function(o,t){$(o).customTransform(n+15*t,i-54*t)}),r&&(r=!1,setTimeout(function(a){if("up"!=a||c){if("down"==a&&!c){c=!0;var s={initial:n,final:d},l={initial:i,final:u};o>=3&&(e--,e=7===e?6:e,d=15*(e-1),u=-54*(e-1),s.final=d,l.final=u,$(t.get(e)).animate({opacity:0},700),$("body").attr("class",""),$("body").addClass("color-"+e),3===e&&($("#answer-1").on("mouseenter",function(){$("body").attr("class",""),$("body").addClass("color-e-1")}).on("mouseleave",function(){$("body").attr("class",""),$("body").addClass("color-3")}),$("#answer-2").on("mouseenter",function(){$("body").attr("class",""),$("body").addClass("color-e-2")}).on("mouseleave",function(){$("body").attr("class",""),$("body").addClass("color-3")})),$("[icon]").animate({opacity:0},350),1===e||2===e?$("[icon]#mouse").animate({opacity:1},350):3===e?$("[icon]#pick").animate({opacity:1},350):4===e&&$("[icon]#timer").animate({opacity:1},350));var f=[];f=Array.from(t.slice(0,e)).map(function(i,o){return $(i).specialAnimation({from:n-15*o,to:s.final-15*o},{from:l.initial+54*o,to:l.final+54*o})}),Promise.all(f).then(function(t){c=!1,r=!0,o=0,n=d,i=u,console.log("Animation ends")})}}else{c=!0;var m={initial:n,final:d},p={initial:i,final:u};o>=3&&(e++,e=7===e?6:e,d=-15*(e-1),u=54*(e-1),m.final=d,p.final=u,$(t.get(e-1)).animate({opacity:1},700),$("body").attr("class",""),$("body").addClass("color-"+e),3===e&&($("#answer-1").on("mouseenter",function(){$("body").attr("class",""),$("body").addClass("color-e-1")}).on("mouseleave",function(){$("body").attr("class",""),$("body").addClass("color-3")}),$("#answer-2").on("mouseenter",function(){$("body").attr("class",""),$("body").addClass("color-e-2")}).on("mouseleave",function(){$("body").attr("class",""),$("body").addClass("color-3")})),$("[icon]").animate({opacity:0},350),1===e||2===e?$("[icon]#mouse").animate({opacity:1},350):3===e?$("[icon]#pick").animate({opacity:1},350):4===e&&$("[icon]#timer").animate({opacity:1},350));var y=[];y=Array.from(t.slice(0,e)).map(function(i,o){return $(i).specialAnimation({from:n+15*o,to:m.final+15*o},{from:p.initial-54*o,to:p.final-54*o})}),Promise.all(y).then(function(t){c=!1,r=!0,o=0,n=d,i=u,console.log("Animation ends")})}},150,s))})}window.$=o(3);var e=o(23);o(36),o(37),function(n){n.fn.swipe=function(i){function o(n){if(void 0!==n.originalEvent.pageX)var i,o,t=n.originalEvent.pageX,e=n.originalEvent.pageY;else var i,o,t=n.originalEvent.touches[0].pageX,e=n.originalEvent.touches[0].pageY;return i=t>a.x?"right":"left",o=e>a.y?"down":"up",{direction:{x:i,y:o},offset:{x:t-a.x,y:a.y-e}}}var t=!1,a=null,e=n(this);return e.on("touchstart mousedown",function(n){t=!0,a=void 0!==n.originalEvent.pageX?{x:n.originalEvent.pageX,y:n.originalEvent.pageY}:{x:n.originalEvent.touches[0].pageX,y:n.originalEvent.touches[0].pageY}}),e.on("touchend mouseup",function(){t=!1,a=null}),e.on("touchmove mousemove",function(n){if(t){var a=o(n);i(a.direction,a.offset)}}),!0},n.fn.customAnimation=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{initial:0,final:0},i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{start:function(){},step:function(n){},easing:"linear",end:function(){},duration:400};n={initial:void 0===n.initial||null===n.initial?0:n.initial,final:void 0===n.final||null===n.final?0:n.final},i={start:void 0===i.start||null===i.start?function(){}:i.start,step:void 0===i.step||null===i.step?function(){}:i.step,easing:void 0===i.easing||null===i.easing?"linear":i.easing,end:void 0===i.end||null===i.end?function(){}:i.end,duration:void 0===i.duration||null===i.duration?400:i.duration},Object.keys(i).forEach(function(n,o){switch(console.log(n),n){case"start":if("function"!=typeof i.start)throw new Error('Property "start" is not a valid function');break;case"step":if("function"!=typeof i.step)throw new Error('Property "step" is not a valid function');break;case"easing":if("string"!=typeof i.easing)throw new Error('Property "easing" is not a valid string');if("linear"!==i.easing&&"ease-in"!==i.easing&&"ease-in-out"!==i.easing)throw new Error('Property "easing" is not valid');break;case"end":if("function"!=typeof i.end)throw new Error('Property "end" is not a valid function');break;case"duration":if("number"!=typeof i.duration)throw new Error('Property "duration" is not a valid number');break;default:throw new Error('Property "'+n+'" is not expected')}});var o=function(n){return n},t=function(n){return n*n},a=function(n){return n*n*n*n},e=function(n,i){switch(n){case"linear":return o(i);case"ease-in":return t(i);case"ease-in-out":return a(i)}},r=void 0,s=void 0,l=i.duration;n.initial,n.final;r=(new Date).getTime(),i.start(),function n(){s=(new Date).getTime()-r,s/=l,s<1&&requestAnimationFrame(n),s=e(i.easing,s),i.step(s)}()},n.fn.customTransform=function(i,o){n(this).css({transform:"\n                perspective(50px),\n                translate3d(0px, 0px, "+i+"px)\n            "}).find("div > span").css({color:"transparent",textShadow:"0 0 "+o+"px white"})},n.fn.specialAnimation=function(){var i=this,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{from:0,to:0},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{from:0,to:0};return new Promise(function(a,r){var s=e.interpolateNumber(o.from,o.to),l=e.interpolateNumber(t.from,t.to),c=void 0,d=void 0,u=n(i);c=(new Date).getTime(),function n(){d=(new Date).getTime()-c,d/=700,d<1?requestAnimationFrame(n):d>1&&(d=1),d=d,u.customTransform(s(d),l(d)),1==d&&a()}()})},n.fn.animationGoAndBack=function(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{initial:0,middle:0,final:0},o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{initial:0,middle:0,final:0},t=this;arguments.length>2&&void 0!==arguments[2]&&arguments[2],arguments.length>3&&void 0!==arguments[3]&&arguments[3];return new Promise(function(a,e){n(t).specialAnimation({from:i.initial,to:i.middle},{from:o.initial,to:o.middle}).then(function(t){return n(this).animation({from:i.middle,to:i.final},{from:o.middle,to:o.final})}).then(function(n){a({scroll:{initial:i.initial,final:i.final},blur:{initial:o.initial,final:o.final}})}).catch(function(){e()})})}}($),n.exports=function(n){t(),a(),n("body").css("display","block")}}},[18]);
//# sourceMappingURL=main.bundle.js.map