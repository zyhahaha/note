/*
Version:	App Mobile for Theme
*/



!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;u>s;s++)c[a[s]]=i(c[a[s]],c);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return o&&!i&&(s=l.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i,r;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction?!0:(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===t.style.touchAction||"manipulation"===t.style.touchAction?!0:!1)},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();
/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==kb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ib.length;){if(c=ib[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return ob++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:rb?N:sb?Q:qb?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&yb&&d-e===0,g=b&(Ab|Bb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=nb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===yb||f.eventType===Ab)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Bb&&(i>xb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=mb(l.x)>mb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:lb(a.pointers[c].clientX),clientY:lb(a.pointers[c].clientY)},c++;return{timeStamp:nb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:lb(a[0].clientX),y:lb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:lb(c/b),y:lb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Cb:mb(a)>=mb(b)?a>0?Db:Eb:b>0?Fb:Gb}function I(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Lb)-J(a[1],a[0],Lb)}function L(a,b){return I(b[0],b[1],Lb)/I(a[0],a[1],Lb)}function M(){this.evEl=Nb,this.evWin=Ob,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Rb,this.evWin=Sb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ub,this.evWin=Vb,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Ab|Bb)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xb,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(yb|zb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===yb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ab|Bb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bc))return bc;var b=q(a,cc),c=q(a,dc);return b&&c?cc+" "+dc:b||c?b?cc:dc:q(a,ac)?ac:_b}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=ec,this.simultaneous={},this.requireFail=[]}function W(a){return a&jc?"cancel":a&hc?"end":a&gc?"move":a&fc?"start":""}function X(a){return a==Gb?"down":a==Fb?"up":a==Db?"left":a==Eb?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function ab(){V.apply(this,arguments),this._timer=null,this._input=null}function bb(){Z.apply(this,arguments)}function cb(){Z.apply(this,arguments)}function db(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function eb(a,b){return b=b||{},b.recognizers=m(b.recognizers,eb.defaults.preset),new fb(a,b)}function fb(a,b){b=b||{},this.options=i(b,eb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),gb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function gb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function hb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ib=["","webkit","moz","MS","ms","o"],jb=b.createElement("div"),kb="function",lb=Math.round,mb=Math.abs,nb=Date.now,ob=1,pb=/mobile|tablet|ip(ad|hone|od)|android/i,qb="ontouchstart"in a,rb=v(a,"PointerEvent")!==d,sb=qb&&pb.test(navigator.userAgent),tb="touch",ub="pen",vb="mouse",wb="kinect",xb=25,yb=1,zb=2,Ab=4,Bb=8,Cb=1,Db=2,Eb=4,Fb=8,Gb=16,Hb=Db|Eb,Ib=Fb|Gb,Jb=Hb|Ib,Kb=["x","y"],Lb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Mb={mousedown:yb,mousemove:zb,mouseup:Ab},Nb="mousedown",Ob="mousemove mouseup";j(M,y,{handler:function(a){var b=Mb[a.type];b&yb&&0===a.button&&(this.pressed=!0),b&zb&&1!==a.which&&(b=Ab),this.pressed&&this.allow&&(b&Ab&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:vb,srcEvent:a}))}});var Pb={pointerdown:yb,pointermove:zb,pointerup:Ab,pointercancel:Bb,pointerout:Bb},Qb={2:tb,3:ub,4:vb,5:wb},Rb="pointerdown",Sb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Rb="MSPointerDown",Sb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pb[d],f=Qb[a.pointerType]||a.pointerType,g=f==tb,h=s(b,a.pointerId,"pointerId");e&yb&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ab|Bb)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Tb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Ub="touchstart",Vb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Tb[a.type];if(b===yb&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Ab|Bb)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}});var Wb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Xb="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wb[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==tb,e=c.pointerType==vb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ab|Bb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Yb=v(jb.style,"touchAction"),Zb=Yb!==d,$b="compute",_b="auto",ac="manipulation",bc="none",cc="pan-x",dc="pan-y";T.prototype={set:function(a){a==$b&&(a=this.compute()),Zb&&(this.manager.element.style[Yb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Zb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bc),f=q(d,dc),g=q(d,cc);return e||f&&c&Hb||g&&c&Ib?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var ec=1,fc=2,gc=4,hc=8,ic=hc,jc=16,kc=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hc>d&&b(!0),b(),d>=hc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kc|ec)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ic|jc|kc)&&(this.state=ec),this.state=this.process(b),void(this.state&(fc|gc|hc|jc)&&this.tryEmit(b))):(this.reset(),void(this.state=kc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fc|gc),e=this.attrTest(a);return d&&(c&Bb||!e)?b|jc:d||e?c&Ab?b|hc:b&fc?b|gc:fc:kc}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Jb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Hb&&b.push(dc),a&Ib&&b.push(cc),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Hb?(e=0===f?Cb:0>f?Db:Eb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Cb:0>g?Fb:Gb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fc||!(this.state&fc)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fc)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(ab,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_b]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ab|Bb)&&!f)this.reset();else if(a.eventType&yb)this.reset(),this._timer=e(function(){this.state=ic,this.tryEmit()},b.time,this);else if(a.eventType&Ab)return ic;return kc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ic&&(a&&a.eventType&Ab?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=nb(),this.manager.emit(this.options.event,this._input)))}}),j(bb,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fc)}}),j(cb,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Hb|Ib,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Hb|Ib)?b=a.velocity:c&Hb?b=a.velocityX:c&Ib&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&mb(b)>this.options.velocity&&a.eventType&Ab},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(db,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ac]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&yb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ab)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ic,this.tryEmit()},b.interval,this),fc):ic}return kc},failTimeout:function(){return this._timer=e(function(){this.state=kc},this.options.interval,this),kc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ic&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),eb.VERSION="2.0.4",eb.defaults={domEvents:!1,touchAction:$b,enable:!0,inputTarget:null,inputClass:null,preset:[[bb,{enable:!1}],[_,{enable:!1},["rotate"]],[cb,{direction:Hb}],[$,{direction:Hb},["swipe"]],[db],[db,{event:"doubletap",taps:2},["tap"]],[ab]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lc=1,mc=2;fb.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mc:lc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ic)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fc|gc|hc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&hb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&gb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(eb,{INPUT_START:yb,INPUT_MOVE:zb,INPUT_END:Ab,INPUT_CANCEL:Bb,STATE_POSSIBLE:ec,STATE_BEGAN:fc,STATE_CHANGED:gc,STATE_ENDED:hc,STATE_RECOGNIZED:ic,STATE_CANCELLED:jc,STATE_FAILED:kc,DIRECTION_NONE:Cb,DIRECTION_LEFT:Db,DIRECTION_RIGHT:Eb,DIRECTION_UP:Fb,DIRECTION_DOWN:Gb,DIRECTION_HORIZONTAL:Hb,DIRECTION_VERTICAL:Ib,DIRECTION_ALL:Jb,Manager:fb,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:db,Pan:$,Swipe:cb,Pinch:_,Rotate:bb,Press:ab,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==kb&&define.amd?define(function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a[c]=eb}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.map


app.support={
	uiHack:function(){
		$('.box > .con .forms').each(function(){
			$(this).parents('.con').addClass('bod').removeClass('con');
			$(this).find('textarea').each(function(){
				var jitem=$(this).parents('dt');
				jitem.addClass('con');
				var jcaption=jitem.find('h2');
				if(!$(this).attr('placeholder')) $(this).attr('placeholder',jcaption.text());
				jcaption.hide();
			});
			$(this).find('p.put pic').each(function(){
				var jitem=$(this).parents('dt');
				jitem.addClass('con');
			});
		});
	},
	tester:function(){
		if(!isMobile() || !isLocal()) return false;
		var id='test-toolbar';
		var o=dbg.box(id,{place:'right'});
		o.find('in').append('<p><a href="#swiper" data-action="up">向上</a></p>');
		o.find('in').append('<p><a href="#swiper" data-action="left">向左</a></p>');
		o.find('in').append('<p><a href="#swiper" data-action="down">向下</a></p>');
		o.find('in').append('<p><a href="#swiper" data-action="right">向右</a></p>');
		o.on('click','a[href="#swiper"]',function(){
			app.swiper.run($(this).attrd('action'));
			return false
		});
	},
};

app.swiper={obj:null,
	_init:function(){
		if(!this.obj) this.obj = new Hammer(document.getElementsByTagName('body')[0]);
	},

	is:function(){return !!this.obj},
	run:function(action){
		if(!this.is()){
			dbg.t('Swiper','no init!');
			return false
		}
		this.obj.emit('swipe'+action,{});
	},
	
	left:function(callback){return this.on('left',callback)},
	right:function(callback){return this.on('right',callback)},
	up:function(callback){return this.on('up',callback)},
	down:function(callback){return this.on('down',callback)},
	on:function(action,callback){
		this._init();
		return this.obj.on('swipe'+action,function (e){
			//dbg.t('Swiper','hammer.'+action);
			callback()
		})
	}
};




/* Include File(mobile/widget/sider/sider.js@E:\wwwroot\sites\zn.market\node/themes/mobile/widget/sider/sider.js) no found. */
/* Include File(default/app.slider.js@E:\wwwroot\sites\zn.market\node/themes/default/app.slider.js) no found. */


$(function(){
	//FastClick
	FastClick.attach(document.body);

	app.support.uiHack();
	app.support.tester();

	// widget.sider.initer();
});


vBasic.fn.extend({
	binder:function(opt){
		ui.binder.data({jwrap:$(this)})
	}
});

ui.binder=extendo(newEvent(),{
	serves:{},
	setServe:function(key,value,opts){
		var obj=this.serves[key]||{};
		obj['value']=value;
		obj['opts']=opts||{};
		this.serves[key]=obj;
		this.data_load(key);
		return this
	},
	setServeField:function(key,field,result){
		var obj=this.serves[key]||{};
		obj[field]=result;
		this.serves[key]=obj;
		return this
	},
	setServeResults:function(key,results){return this.setServeField(key,'results',results)},
	getServe:function(key,field,def){
		var obj=this.serves[key]||{};
		return obj[field]||(def||{});
	},
	getServeVar:function(key){
		var ret=this.getServe(key,'value',{api:key,action:'info'});
		if(isf(ret)) ret=ret(key);
		return ret
	},

	initer:function(opt){
		var that=this;
		this.opt=opt=ox({},opt);
		if(!opt.jwrap) opt.jwrap=$('body');
		this.jwrap=opt.jwrap;
	},

	is_loads:{},
	load_delay:0.1,
	data_load:function(serve){
		var that=this;
		vdcs.timeout(this.load_delay,function(){
			that.data_loader(serve);
		});
	},
	data_loader:function(serve){
		var that=this;
		if(this.is_loads[serve]) return;this.is_loads[serve]=true;
		// dbg.t('data_loader',serve);
		var serveVar=this.getServeVar(serve);
		var opts=this.getServe(serve,'opts');
		var opt=opts['data_opt'];
		var filter_px=opts['filter']||'info.';
		$request(serveVar,opt,function(vars,maps){
			var en=serve+'.filter';
			var json=that.isEvent(en)?that.emit(en,vars,maps):(function(vars){
				return utilJSON.getFilter(vars,filter_px)
			})(vars);
			that.setServeResults(serve,json);
			that._render(serve,json);
			that.emit(serve+'.data',json,vars,maps);
		});
	},
	_render:function(serve,json){
		var that=this;
		// dbg.t('_render',serve);
		var _replace=function(s){return that.replacer(s,serve,json)};
		this.jwrap.find('[edb^="'+serve+':"]').each(function(){
			// alert($(this).outerHTML())
			var field=$(this).attr('edb').split(':')[1];
			$(this).html(json[field]);
		});
		this.jwrap.find('[href*="{'+serve+':"]').each(function(){			// href="id={task:id}"
			var jo=$(this);
			jo.attr('href',_replace(jo.attr('href')));
		});
		$('span:contains({'+serve+'\:)').each(function(){					// <span>{task:topic}</span>
			var jo=$(this);
			jo.html(_replace(jo.html()));
		});
		$('i:contains({'+serve+'\:)').each(function(){
			var jo=$(this);
			jo.html(_replace(jo.html()));
		});
	},

	replacer:function(str,serve,json){
		return util.replaceRegex('\{'+serve+'\:([^}]*)}',str,json)
	},
	replace_attr:function(attr,value){
		// dbg.t('replace_attr',attr+'='+value);
		$('body').find('['+attr+']').each(function(){
			$(this).attr(attr,value)
		});
	},
});

/*! jquery.cookie v1.4.1 | MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});
var data_emoji={
	'微笑':'0',
	'撇嘴':'1',
	'色':'2',
	'发呆':'3',
	'得意':'4',
	'流泪':'5',
	'害羞':'6',
	'闭嘴':'7',
	'睡':'8',
	'大哭':'9',
	'尴尬':'10',
	'发怒':'11',
	'调皮':'12',
	'呲牙':'13',
	'惊讶':'14',
	'难过':'15',
	'酷':'16',
	'冷汗':'17',
	'抓狂':'18',
	'吐':'19',
	'偷笑':'20',
	'愉快':'21',
	'白眼':'22',
	'傲慢':'23',
	'饥饿':'24',
	'困':'25',
	'惊恐':'26',
	'流汗':'27',
	'憨笑':'28',
	'悠闲':'29',
	'奋斗':'30',
	'咒骂':'31',
	'疑问':'32',
	'嘘':'33',
	'晕':'34',
	'疯了':'35',
	'衰':'36',
	'骷髅':'37',
	'敲打':'38',
	'再见':'39',
	'擦汗':'40',
	'抠鼻':'41',
	'鼓掌':'42',
	'糗大了':'43',
	'坏笑':'44',
	'左哼哼':'45',
	'右哼哼':'46',
	'哈欠':'47',
	'鄙视':'48',
	'委屈':'49',
	'快哭了':'50',
	'阴险':'51',
	'亲亲':'52',
	'吓':'53',
	'可怜':'54',
	'菜刀':'55',
	'西瓜':'56',
	'啤酒':'57',
	'篮球':'58',
	'乒乓':'59',
	'咖啡':'60',
	'饭':'61',
	'猪头':'62',
	'玫瑰':'63',
	'凋谢':'64',
	'嘴唇':'65',
	'爱心':'66',
	'心碎':'67',
	'蛋糕':'68',
	'闪电':'69',
	'炸弹':'70',
	'刀':'71',
	'足球':'72',
	'瓢虫':'73',
	'便便':'74',
	'月亮':'75',
	'太阳':'76',
	'礼物':'77',
	'拥抱':'78',
	'强':'79',
	'弱':'80',
	'握手':'81',
	'胜利':'82',
	'抱拳':'83',
	'勾引':'84',
	'拳头':'85',
	'差劲':'86',
	'爱你':'87',
	'NO':'88',
	'OK':'89',
	'爱情':'90',
	'飞吻':'91',
	'跳跳':'92',
	'发抖':'93',
	'怄火':'94',
	'转圈':'95',
	'磕头':'96',
	'回头':'97',
	'跳绳':'98',
	'激动':'99',
	'激动':'100',
	'乱舞':'101',
	'献吻':'102',
	'左太极':'103',
	'右太极':'104',
	'嘿哈':'105',
	'捂脸':'106',
	'奸笑':'107',
	'机智':'108',
	'皱眉':'109',
	'耶':'110',
	'鸡':'111',
	'红包':'112'
};



//xpaging 分页
(function($) {
	var ms = {
		init: function(obj, args) {
			return (function() {
				ms.fillHtml(obj, args);
				ms.bindEvent(obj, args);
			})();
		},
		fillHtml: function(obj, args) {
			return (function() {
				obj.empty();
				if (args.current > 1) {
					obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
				} else {
					obj.remove('.prevPage');
					obj.append('<span class="disabled">上一页</span>');
				}

				// if (args.current != 1 && args.current >= 4 && args.pageTotal != 4) {
				// 	obj.append('<a href="javascript:;" class="tcdNumber">' + 1 + '</a>');
				// }
				// if (args.current - 2 > 2 && args.current <= args.pageTotal && args.pageTotal > 3) {
				// 	obj.append('<span>...</span>');
				// }
				var start = args.current,
				end = args.current;
				obj.append('<span class="current">' + start + '</span>');

				// if ((start > 1 && args.current < 4) || args.current == 1) {
				// 	end++;
				// }
				// if (args.current > args.pageTotal - 4 && args.current >= args.pageTotal) {
				// 	start--;
				// }
				// for (; start <= end; start++) {
				// 	if (start <= args.pageTotal && start >= 1) {
				// 		if (start != args.current) {
				// 			obj.append('<a href="javascript:;" class="tcdNumber">' + start + '</a>');
				// 		} else {
				// 			obj.append('<span class="current">' + start + '</span>');
				// 		}
				// 	}
				// }
				// if (args.current + 2 < args.pageTotal - 1 && args.current >= 1 && args.pageTotal > 3) {
				// 	obj.append('<span>...</span>');
				// }
				// if (args.current != args.pageTotal && args.current < args.pageTotal - 2 && args.pageTotal != 4) {
				// 	obj.append('<a href="javascript:;" class="tcdNumber">' + args.pageTotal + '</a>');
				// }
				if (args.current < args.pageTotal) {
					obj.append('<a href="javascript:;" class="nextPage">下一页<em class="pagetotal">'+args.pageTotal+'</em></a>');
				} else {
					obj.remove('.nextPage');
					obj.append('<span class="disabled nextPage">下一页<em class="pagetotal">'+args.pageTotal+'</em></span>');
				}
			})();
		},
		bindEvent: function(obj, args) {
			return (function() {
				obj.off();
				obj.on("click", "a.tcdNumber",
				function() {
					var current = parseInt($(this).text());
					ms.fillHtml(obj, {
						"current": current,
						"pageTotal": args.pageTotal
					});
					if (typeof(args.callback) == "function") {
						args.callback(current);
					}
				});
				obj.on("click", "a.prevPage",
				function() {
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj, {
						"current": current - 1,
						"pageTotal": args.pageTotal
					});
					if (typeof(args.callback) == "function") {
						args.callback(current - 1);
					}
				});
				obj.on("click", "a.nextPage",
				function() {
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj, {
						"current": current + 1,
						"pageTotal": args.pageTotal
					});
					if (typeof(args.callback) == "function") {
						args.callback(current + 1);
					}
				});
			})();
		}
	}
	$.fn.xpaging = function(options) {
		var args = $.extend({
			pageTotal: 10,
			current: 1,
			callback: function() {}
		},
		options);
		ms.init(this, args);
	}
})(jQuery);

$form.formCheck=function(that){
	if(!that) that=this;
	var ischeck=true,checkv=false,_data={};
	that.err=new VDCS.Error(),that.jformitem=null;
	if(typeof VCheck != 'undefined'){
		VCheck.resete();
		checkv=true
	}
	//:text,input,select,textarea
	that.jform.find('input,select,textarea').each(function(i){
		var jfield=$(this),_name=jfield.attr('name');
		var name=(_name && _name.substr(-2)=='[]')?_name.substr(0,_name.length-2):_name;
		if(name && typeof(_data[name])=='undefined' && !jfield.attr('ignore-val')){
			var _value=jfield.vals();
			_data[name]=_value;
			if(checkv && !VCheck.elementv(jfield)) ischeck=false;
			if(!checkv){
				var min=toi(jfield.attr('vmin')||jfield.attr('min')||jfield.attr('minlength'));
				if(min>0 && !jfield.val().length) ischeck=false;
				if(min > jfield.val().length) ischeck=false;
			}
			if(!ischeck && !that.jformitem) that.jformitem=jfield
		}
	});
	that.jform.find('input[type="radio"]:checked').each(function(){
		var name=$(this).attr('name'),value=$(this).val();
		if(name) _data[name]=value
	});
	if(that.opt && that.opt.encrypt){
		var _timer=that.opt.encrypt_timer?$tim.timer():'';
		_data['_encrypt_timer_']=_timer;
		var fielda=(that.opt.encrypt_field||'').split(','),_field;
		for(var a in fielda){
			_field=fielda[a];
			if(_data[_field]){
				_data[_field]=$.md5(_data[_field]);
				if(_timer) _data[_field]=$.md5(_data[_field]+','+_timer);
			}
		}
	}
	that.form_data=_data;
	if(that.formVerify) that.formVerify(that.form_data);
	if(isdebug('data')) dbg.o(that.form_data);
	if(ischeck && that.err) ischeck=that.err.is();
	if(!ischeck && that.tips && that.err) that.tips('error',that.err.toString(),true);
	//if(ischeck && that.tips) that.tips('hide');
	//ischeck=false;
	return ischeck
};

// api.url


util.request_parser=function(result,opt,fn){
	if(opt.format=='result') return fn(result);
	var maps=util.toMap(result);
	var heads=maps.get('head');
	if(inp(opt.succeed,heads.status)<1){
		var calle=opt.error||function(status,message,heads){
			ui.minipop(message);
			if(heads.status == 'auth' || heads.status == 'sid' || heads.status == 'sid_dated'){
				setTimeout(function(){
					$.cookie('ua',null,{path:'/'});
					window.parent.app.browser.goLogin();
					// ui.gox('/login.html');
				},500)
			}
		};
		calle(heads.status,heads.message||$form.statusString(heads.status),heads);
		return
	}
	var vars=maps.get('var');
	fn(vars,maps,heads)
};

// ui.binder.filter_px=function(opts){
// 	return 'lists';
// }

app.init_api=function(){
	var host = window.location.host;
	if(!iapp.proxy){
		$serve.setMode('api').setEntry('mdesk');
	}else{
		if(host != 'app.vflux.cn:800'){
			$serve.setMode('api').setEntry('mec_proxy');
		}else{
			$serve.setMode('api').setEntry('mdesk');
		}
	}
};

var cons=iapp={
	channel:'mec',
	flag:'false',
	proxy:'true',
	sid:'',
	names:'',
	deptno:'',
	workno:'',
	grade:'',
	grade_name:'',
	listnum:15,
	listNoPage:1000,
	ua:{},
	initer:function(){
		var that=this;
		var login_url='/login.html',ua_cookie=ua.getSid();
		if(ua_cookie){
			this.sid=query('sid')||ua.getSid();
			this.names=ua.session().get('names');
			this.deptno=ua.session().get('deptno');
			this.workno=ua.session().get('workno');
			this.grade=ua.session().get('grade');
			this.grade_name=ua.session().get('grade.name');
			if(this.sid) $serve.xparami({sid:this.sid});
		}else{
			// if(this.flag) ui.gox(login_url,'跳转登录中，请稍后');
		}
		
	},
	request:function(){
		return $request.apply(null,arguments);
	},
	ua_login_jump_url:function(sid){
		// ui.gox('/index.html');
	},
};

$(function(){
	app.init_api();
	iapp.initer();
	ui.binder.initer();

	app.browser.iframeRefresh();

	$('body').on('click','a[data-open="frame"]',function(){
		var url=$(this).attr('href');
		if(!url) return dbg.t('open','url bad');
		var tit=$(this).attrd('title');
		app.browser.open_url(url,tit);
		return false
	});
});


app.browser={
	inter:function(){
		
	},
	open_url:function(url,tit){
		var mframe=parent.mframe;
		if(!mframe) return window.open(url);
		mframe.open_url(url,tit);
	},
	isweixin:function(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger"){
			return true;
		} else {
			return false;
		}
	},
	noscroll:function(){
		window.ontouchmove=function(e){
			e.preventDefault && e.preventDefault();
			e.returnValue=false;
			e.stopPropagation && e.stopPropagation();
			return false;
		}
	},
	goLogin:function(){
		// ui.gox('/login.html');
	},
	goHome:function(){
		ui.gox('/');
	},
	onscroll:function(){
		window.ontouchmove=function(e){
			e.stopPropagation();
		}
	},
	getHost:function(){
		var host = window.location.host;
		switch(host){
			case 'www.vflux.cn:800':
				host='www.vflux.cn:800';
				break;
			default :
				host='192.168.10.10:9220';
		}
		return host;
	},
	ishttp:function($url){
		$preg='|^http://|';
		if(ins($preg,$url)<0){
			$url='http://'+app.browser.getHost()+$url;
		}
		return $url;
	},
	channel:function(){
		var _url=vdcs.urls().paths;
		return _url.split('/')[1];
	},
	avatar:function(path){
		var _getTime=Math.round(new Date().getTime()/1000);
		return path;
	},
	iframeRefresh:function(){
		$('.zbx-part').find('.refresh').on('click',function(){refresh();})
	},
	getRealDir:function(path){
		var host = window.location.host,path_pre;
		switch(host){
			case 'localhost:8580':
				path_pre='/data/wwwroot/sites/xwx.node';
				break;
			case '192.168.10.10:8580':
				path_pre='/data/wwwroot/sites/xwx.node';
				break;
			default :
				path_pre='/data/wwwroot/xwx.node';
		}

		path=path_pre+path;
		return path;
	},
	permissions:function(){
		// ua.session().get('permissions_channel')
		// "{"stat":1,"res":1,"staff":1,"team":1,"wx":1}"
		var sider=$('#sider');
		var _permissions_channel=ua.session().get('permissions_channel'),_permissions=ua.session().get('permissions');
		for(var key in _permissions_channel){
			if(_permissions[key] == 1){
				sider.find('.sider-'+key+'').removeClass('hide');
			}
		}
	},
};

app.data={
	initer:function(){

	},
	sort:function(type,key){
		var that=this;
		if(!(type in data_common)){
			// return '('+that.unin(key)+')';
			return '';
		}else{
			var json_type=data_common[type];
			if(!(key in json_type)){
				// return that.unin(key);
				return '';
			}else{
				return json_type[key];
			}
		}
	},
	term:function(type){
		var that=this;
		if(!data_common[type]){
			return that.unin(type);
		}else{
			return data_common[type];
		}
		
	},
	unin:function(key){
		return '('+key+')';
	},
	mobileFormat:function(string){
		return string.substring(0,3)+'****'+string.substring(7,11);
	},
	emoji:function(string){
		var string=string.replace(/\[.*?\]/g, function(_string) {
			var _string=_string.replace('[','').replace(']','');
			return '<em class="qqemoji qqemoji'+data_emoji[_string]+'"></em>';
		})
		return string;
	}
};

app.calculate={
	initer:function(){

	},
	lnglat:function(data){
		return data/1000000;
	}
};

app.vue={
	initer:function(){

	},
	department:function(arry,vars,maps,arry_grade){
		var tableLists=maps.getItemTable('lists'),_fatherid=vars.fatherid;
		var arry_department=tableLists._data,arry_department_length=arry_department.length;
		if(arry_grade){
			var grade=vars.grade;
			for (var ss in grade) {
				var _json={};
				_json.value=ss;
				_json.label=grade[ss];
				arry_grade.push(_json);
			}
		}
		for (var i = 0; i < arry_department_length; i++) {
			arry_department[i]['grade_class']='grade_'+arry_department[i].grade_num;
			if(arry_department[i].fatherid == _fatherid){
				arry.push(arry_department[i]);
				//获取子集数量  1层
				for(var k = 0; k < arry_department_length; k++){
					if(arry_department[k].fatherid == arry_department[i].no){
						arry.push(arry_department[k]);
						//2层
						for (var j = 0; j < arry_department_length; j++) {
							if(arry_department[j].fatherid == arry_department[k].no){
								arry.push(arry_department[j]);
								// 3层
								for (var z = 0; z < arry_department_length; z++) {
									if(arry_department[z].fatherid == arry_department[j].no){
										arry.push(arry_department[z]);
										// 4层
										for (var x = 0; x < arry_department_length; x++) {
											if(arry_department[x].fatherid == arry_department[z].no){
												arry.push(arry_department[x]);
												// 5层
												for (var v = 0; v < arry_department_length; v++) {
													if(arry_department[v].fatherid == arry_department[x].no){
														arry.push(arry_department[v]);
														// 6层
														for (var n = 0; n < arry_department_length; n++) {
															if(arry_department[n].fatherid == arry_department[v].no){
																arry.push(arry_department[n]);
																// 7层
																for (var m = 0; m < arry_department_length; m++) {
																	if(arry_department[m].fatherid == arry_department[n].no){
																		arry.push(arry_department[m]);
																		// 8层
																		
																	}
																}//7层 end
															}
														}//6层 end
													}
												}//5层 end
											}
										}//4层 end
									}
								}//3层 end
							}
						}//2层 end
					}
				}
			}//1层 end
		}
	},
	department_company:function(arry,vars,maps){
		var tableLists=maps.getItemTable('lists'),_fatherid=vars.fatherid;
		var arry_department=tableLists._data,arry_department_length=arry_department.length;
		var company_json={};
		company_json.topic='公司';
		company_json.grade_class='company';
		company_json.no='';
		arry.push(company_json);
		for (var i = 0; i < arry_department_length; i++) {
			arry_department[i]['grade_class']='grade_'+arry_department[i].grade_num;
			arry_department[i]['label']=arry_department[i].topic;
			if(arry_department[i].fatherid == _fatherid){
				arry.push(arry_department[i]);
				//获取子集数量  1层
				for(var k = 0; k < arry_department_length; k++){
					if(arry_department[k].fatherid == arry_department[i].no){
						arry.push(arry_department[k]);
						//2层
						for (var j = 0; j < arry_department_length; j++) {
							if(arry_department[j].fatherid == arry_department[k].no){
								arry.push(arry_department[j]);
								// 3层
								for (var z = 0; z < arry_department_length; z++) {
									if(arry_department[z].fatherid == arry_department[j].no){
										arry.push(arry_department[z]);
										// 4层
										for (var x = 0; x < arry_department_length; x++) {
											if(arry_department[x].fatherid == arry_department[z].no){
												arry.push(arry_department[x]);
												// 5层
												for (var v = 0; v < arry_department_length; v++) {
													if(arry_department[v].fatherid == arry_department[x].no){
														arry.push(arry_department[v]);
														// 6层
														for (var n = 0; n < arry_department_length; n++) {
															if(arry_department[n].fatherid == arry_department[v].no){
																arry.push(arry_department[n]);
																// 7层
																for (var m = 0; m < arry_department_length; m++) {
																	if(arry_department[m].fatherid == arry_department[n].no){
																		arry.push(arry_department[m]);
																		// 8层
																		
																	}
																}//7层 end
															}
														}//6层 end
													}
												}//5层 end
											}
										}//4层 end
									}
								}//3层 end
							}
						}//2层 end
					}
				}
			}//1层 end
		}
	}
}

app.window={
	initer:function(){

	},
	width:function(){
		return $(window).width();
	},
	height:function(){
		return $(window).height();
	},
	loadingHide:function(){
		$('#l-loading').addClass('hide');
	},
	loadingShow:function(){
		$('#l-loading').removeClass('hide');
	},
	shareShow:function(){
		if(app.browser.isweixin()){
			$('.l-share').on('click',function(){
				$('.wx_share').removeClass('hide');
				return false;
			});
			$(document).click(function(e){
				if(e.target.className == 'wx_share'){
				 	$('.wx_share').addClass('hide');
					return false;
				}
			});
		}
	},
	confirm_box_light:function(text,callback,styl){
		var _class='';
		if(styl) _class=styl;
		var layer_confirm_box='<div class="ui-mt-confirm">'
									+'<div class="inners animated '+_class+'">'
										+'<em class="notice"></em>'
										+'<div class="cont">'+text+'</div>'
										+'<h5>'
											// +'<a class="btn b cancel" el="cancel">取消</a>'
											// +'<a class="btn m b submit" el="submit">确定</a>'
											+'<button type="button" class="el-button el-button--default cancel"><span>取 消</span></button>'
											+'<button type="button" class="el-button el-button--primary submit"><span>确 定</span></button>'
										+'</h5>'
									+'</div>'
								+'</div>';
		$('body').append(layer_confirm_box);
		var layer_confirm_box=$('.ui-mt-confirm');

		layer_confirm_box.find('.inners').addClass('bounceIn').removeClass('fadeOut');

		layer_confirm_box.find('.submit').on('click',function(){
			callback();
			layer_confirm_box.find('.inners').removeClass('bounceIn').addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				layer_confirm_box.remove();
			});
			return false;
		})

		layer_confirm_box.find('.cancel').on('click',function(){
			layer_confirm_box.find('.inners').removeClass('bounceIn').addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				layer_confirm_box.remove();
			});
			return false;
		})
	},
	confirm_box:function(text,btn1,callback1,styl,btn2,callback2){
		var _class='';
		if(styl) _class=styl;
		if(btn2){
			btn2='<button type="button" class="el-button el-button--default cancel"><span>'+btn2+'</span></button>';
		}else{
			btn2='';
		}
		var layer_confirm_box='<div class="ui-mt-confirm">'
									+'<div class="inners animated '+_class+'">'
										+'<em class="notice"></em>'
										+'<div class="cont">'+text+'</div>'
										+'<h5>'
											+'<button type="button" class="el-button el-button--primary submit"><span>'+btn1+'</span></button>'
											+btn2
										+'</h5>'
									+'</div>'
								+'</div>';
		$('body').append(layer_confirm_box);
		var layer_confirm_box=$('.ui-mt-confirm');

		layer_confirm_box.find('.inners').addClass('bounceIn').removeClass('fadeOut');

		layer_confirm_box.find('.submit').on('click',function(){
			if(callback1) callback1();
			layer_confirm_box.find('.inners').removeClass('bounceIn').addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				layer_confirm_box.remove();
			});
			return false;
		})

		layer_confirm_box.find('.cancel').on('click',function(){
			if(callback2) callback2();
			layer_confirm_box.find('.inners').removeClass('bounceIn').addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				layer_confirm_box.remove();
			});
			return false;
		})
	},
	not_open:function(msg){
		var msg=msg?msg:'暂未开放，敬请期待'
		ui.minipop(msg);
	},
	clearInput:function(ja){
		ja.find('input:not([readonly])').val('');
	},
};

app.btn={
	inter:function(){

	},
	addDisabled:function(classTag){
		classTag.addClass('disabled');
	},
	removeDisabled:function(classTag){
		classTag.removeClass('disabled');
	}
};

app.string={
	initer:function(){

	},
	ntobr:function(str){
		return str.replace(/\r\n/ig,'<br/>');
	}
};

app.year={
	inter:function(){

	},
	getYear:function(y){
		var d=new Date();
		var year=d.getFullYear();
		if(y){
			year=year+y;
		}

		return year;
	},
	getDate:function(d,t){
		var _date=newDate(d).format('date').toString();
		if(t) _date=newDate(d).format(t).toString();
		return _date;
	},
	getMinites:function(d){
		var _time=newDate(d).format('time').toString().split(' ')[1];
		_time=_time.substr(0,5);
		return _time;
	}
};

app.mlist={
	inter:function(opt){
		if(typeof opt == 'undefined' || typeof opt != 'object') opt={};
		this.opt = ox({
			api: 'order/manage',
			action:'',
			order:'asc',
			append:'after',
			page: 1,
			listnum: 10, 			//每页显示数量
			loading: true,			// 默认加载多页
			pagetotal: 1000,		//max
			params: {},  			
			wraps: $('.mlist'),
			empty: '暂无数据',
			more: '没有更多了..',
			scroll:$(window),
			failure: '加载失败',
			callback: function(){}
		},opt);

		this.list(this.opt.callback);
	},

	_params:function(){
		var that=this;

		this.opt.params['page']=this.opt.page;
		this.opt.params['listnum']=this.opt.listnum;
	},
	figure:function(items){
		var that=this;

		var figure;
		// if(this.opt.figure){
		// 	console.log(this.opt.figure);
		// 	// var _figure=this.opt.figure;
		// 	this.opt.figure(items);
		// }

		return figure;
	},
	fixFigure:function(tableLists){
		var that=this;

		var _figure='';
		tableLists.eachRow(function(row,n){
			var items=cloner(row);
			var figure=that.figure(items);

			if(that.opt.order == 'desc'){
				_figure=figure+_figure;
			}else{
				_figure+=figure;
			}
		})
		return _figure;
	},
	list:function(callback){
		var that=this;
		if(this.page==1) this.opt.wraps.html('');
		this._params();
		var opt={api:this.opt.api,action:this.opt.action,params:this.opt.params};
		iapp.request(opt,function(vars,maps,heads){
			var tableLists=maps.getItemTable('lists'),rows=tableLists.row();
			var total=vars.total;
			that.opt.pagetotal=vars['paging.pagetotal'];
			if(that.opt.wraps.find('.loading'))	that.opt.wraps.find('.loading').remove();
			// that.opt.maxpage=Math.ceil(total/that.opt.listnum);
			
			//empty
			if(rows<1&&that.opt.page==1){
				if(that.opt.append == 'before'){
					that.opt.wraps.prepend('<figure class="info infos">'+that.opt.empty+'</figure>');
				}else{
					that.opt.wraps.append('<figure class="info infos">'+that.opt.empty+'</figure>');
				}
				return false;
			}
			//加载更多
			if(that.opt.page > that.opt.pagetotal){
				if(that.opt.append == 'before'){
					that.opt.wraps.prepend('<figure class="info infos info_nomore">'+that.opt.more+'</figure>');
				}else{
					that.opt.wraps.append('<figure class="info infos info_nomore">'+that.opt.more+'</figure>');
				}
				setTimeout(function(){
					that.opt.wraps.find('figure.info.info_nomore').remove();
				},3000);
				return false;
			}else{
				if(that.opt.append == 'before'){
					that._doUpScroll(that.opt.scroll);
				}else{
					that._doDownScroll(that.opt.scroll);
				}
			}
			// console.log('that.opt.page='+that.opt.page+',that.opt.pagetotal='+that.opt.pagetotal);
			var figure_html=that.fixFigure(tableLists);

			if(that.opt.append == 'before'){
				that.opt.wraps.prepend(figure_html);
			}else{
				that.opt.wraps.append(figure_html);
			}
			// console.log(that.opt.wraps.attr('class'))
			if(callback) callback();

		})
	},
	_doDownScroll:function(scroll){
		var that=this,
			scrollTimer;

		scroll.on('scroll',function(){
			if(scrollTimer){
				clearTimeout(scrollTimer);
			}

			scrollTimer=setTimeout(function(){
				// var $last=$('.mlist > figure').last(),
				var $last=that.opt.wraps.find('figure').last(),
					scrollTop=$(window).scrollTop()+$(window).height();
				// if(DEBUGV)	dbg.log(scrollTop+','+parseInt( $last.offset().top + $last.outerHeight()/2) );
				if(that.opt.loading&&(scrollTop > parseInt( $last.offset().top + $last.outerHeight()/2 )/2 ) ){
					that.opt.loading=false;
					that.opt.wraps.append('<div class="loading"><em></em></div>');
					// var loading_time=DEBUGV?5000:1000;
					 var loading_time=1000;
					setTimeout(function(){
						that.opt.page++;
						that.list(function(){
							that.opt.loading=true;
						});
					},loading_time);
				}
			},100);
		});
	},
	_doUpScroll:function(scroll){
		var that=this,
			ja_scroll=that.opt.scroll
			t=0,p=0,
			scroll_height=app.mlist.opt.scroll.height();

		scroll.on('scroll',function(){
				var $last=that.opt.wraps.find('figure').last(),
				p = scroll.scrollTop();
				if(p < t){
					// console.log('$last.offset().top='+$last.offset().top);
					// console.log('p='+p);
					// console.log('scroll_height='+scroll_height);
					// console.log('################');
					//上滚
					if(that.opt.loading && ( p*2 < scroll_height )){
						that.opt.loading=false;
						that.opt.wraps.prepend('<div class="loading"><em></em></div>');
						// var loading_time=DEBUGV?5000:1000;
						 var loading_time=1000;
						setTimeout(function(){
							that.opt.page++;
							that.list(function(){
								that.opt.loading=true;
							});
						},loading_time);
					}
				}
			setTimeout(function(){t=p;},0);  
		});
	}
}





/* Process in 0.443 s. */