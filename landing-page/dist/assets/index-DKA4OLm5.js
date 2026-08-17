(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();var xx={exports:{}},nd={},yx={exports:{}},st={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pu=Symbol.for("react.element"),FE=Symbol.for("react.portal"),kE=Symbol.for("react.fragment"),zE=Symbol.for("react.strict_mode"),BE=Symbol.for("react.profiler"),HE=Symbol.for("react.provider"),GE=Symbol.for("react.context"),VE=Symbol.for("react.forward_ref"),WE=Symbol.for("react.suspense"),XE=Symbol.for("react.memo"),jE=Symbol.for("react.lazy"),J_=Symbol.iterator;function YE(n){return n===null||typeof n!="object"?null:(n=J_&&n[J_]||n["@@iterator"],typeof n=="function"?n:null)}var Sx={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Mx=Object.assign,Ex={};function Qa(n,e,t){this.props=n,this.context=e,this.refs=Ex,this.updater=t||Sx}Qa.prototype.isReactComponent={};Qa.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};Qa.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function Tx(){}Tx.prototype=Qa.prototype;function Tm(n,e,t){this.props=n,this.context=e,this.refs=Ex,this.updater=t||Sx}var wm=Tm.prototype=new Tx;wm.constructor=Tm;Mx(wm,Qa.prototype);wm.isPureReactComponent=!0;var eg=Array.isArray,wx=Object.prototype.hasOwnProperty,Am={current:null},Ax={key:!0,ref:!0,__self:!0,__source:!0};function Cx(n,e,t){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)wx.call(e,i)&&!Ax.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=t;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];r.children=l}if(n&&n.defaultProps)for(i in a=n.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Pu,type:n,key:s,ref:o,props:r,_owner:Am.current}}function qE(n,e){return{$$typeof:Pu,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function Cm(n){return typeof n=="object"&&n!==null&&n.$$typeof===Pu}function $E(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var tg=/\/+/g;function Dd(n,e){return typeof n=="object"&&n!==null&&n.key!=null?$E(""+n.key):e.toString(36)}function Gc(n,e,t,i,r){var s=typeof n;(s==="undefined"||s==="boolean")&&(n=null);var o=!1;if(n===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(n.$$typeof){case Pu:case FE:o=!0}}if(o)return o=n,r=r(o),n=i===""?"."+Dd(o,0):i,eg(r)?(t="",n!=null&&(t=n.replace(tg,"$&/")+"/"),Gc(r,e,t,"",function(u){return u})):r!=null&&(Cm(r)&&(r=qE(r,t+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(tg,"$&/")+"/")+n)),e.push(r)),1;if(o=0,i=i===""?".":i+":",eg(n))for(var a=0;a<n.length;a++){s=n[a];var l=i+Dd(s,a);o+=Gc(s,e,t,l,r)}else if(l=YE(n),typeof l=="function")for(n=l.call(n),a=0;!(s=n.next()).done;)s=s.value,l=i+Dd(s,a++),o+=Gc(s,e,t,l,r);else if(s==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Hu(n,e,t){if(n==null)return n;var i=[],r=0;return Gc(n,i,"","",function(s){return e.call(t,s,r++)}),i}function KE(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var Xn={current:null},Vc={transition:null},ZE={ReactCurrentDispatcher:Xn,ReactCurrentBatchConfig:Vc,ReactCurrentOwner:Am};function Rx(){throw Error("act(...) is not supported in production builds of React.")}st.Children={map:Hu,forEach:function(n,e,t){Hu(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return Hu(n,function(){e++}),e},toArray:function(n){return Hu(n,function(e){return e})||[]},only:function(n){if(!Cm(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};st.Component=Qa;st.Fragment=kE;st.Profiler=BE;st.PureComponent=Tm;st.StrictMode=zE;st.Suspense=WE;st.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ZE;st.act=Rx;st.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var i=Mx({},n.props),r=n.key,s=n.ref,o=n._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Am.current),e.key!==void 0&&(r=""+e.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(l in e)wx.call(e,l)&&!Ax.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=t;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];i.children=a}return{$$typeof:Pu,type:n.type,key:r,ref:s,props:i,_owner:o}};st.createContext=function(n){return n={$$typeof:GE,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:HE,_context:n},n.Consumer=n};st.createElement=Cx;st.createFactory=function(n){var e=Cx.bind(null,n);return e.type=n,e};st.createRef=function(){return{current:null}};st.forwardRef=function(n){return{$$typeof:VE,render:n}};st.isValidElement=Cm;st.lazy=function(n){return{$$typeof:jE,_payload:{_status:-1,_result:n},_init:KE}};st.memo=function(n,e){return{$$typeof:XE,type:n,compare:e===void 0?null:e}};st.startTransition=function(n){var e=Vc.transition;Vc.transition={};try{n()}finally{Vc.transition=e}};st.unstable_act=Rx;st.useCallback=function(n,e){return Xn.current.useCallback(n,e)};st.useContext=function(n){return Xn.current.useContext(n)};st.useDebugValue=function(){};st.useDeferredValue=function(n){return Xn.current.useDeferredValue(n)};st.useEffect=function(n,e){return Xn.current.useEffect(n,e)};st.useId=function(){return Xn.current.useId()};st.useImperativeHandle=function(n,e,t){return Xn.current.useImperativeHandle(n,e,t)};st.useInsertionEffect=function(n,e){return Xn.current.useInsertionEffect(n,e)};st.useLayoutEffect=function(n,e){return Xn.current.useLayoutEffect(n,e)};st.useMemo=function(n,e){return Xn.current.useMemo(n,e)};st.useReducer=function(n,e,t){return Xn.current.useReducer(n,e,t)};st.useRef=function(n){return Xn.current.useRef(n)};st.useState=function(n){return Xn.current.useState(n)};st.useSyncExternalStore=function(n,e,t){return Xn.current.useSyncExternalStore(n,e,t)};st.useTransition=function(){return Xn.current.useTransition()};st.version="18.3.1";yx.exports=st;var dt=yx.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var QE=dt,JE=Symbol.for("react.element"),eT=Symbol.for("react.fragment"),tT=Object.prototype.hasOwnProperty,nT=QE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,iT={key:!0,ref:!0,__self:!0,__source:!0};function bx(n,e,t){var i,r={},s=null,o=null;t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)tT.call(e,i)&&!iT.hasOwnProperty(i)&&(r[i]=e[i]);if(n&&n.defaultProps)for(i in e=n.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:JE,type:n,key:s,ref:o,props:r,_owner:nT.current}}nd.Fragment=eT;nd.jsx=bx;nd.jsxs=bx;xx.exports=nd;var $=xx.exports,Px={exports:{}},Ri={},Lx={exports:{}},Dx={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(N,O){var R=N.length;N.push(O);e:for(;0<R;){var K=R-1>>>1,J=N[K];if(0<r(J,O))N[K]=O,N[R]=J,R=K;else break e}}function t(N){return N.length===0?null:N[0]}function i(N){if(N.length===0)return null;var O=N[0],R=N.pop();if(R!==O){N[0]=R;e:for(var K=0,J=N.length,q=J>>>1;K<q;){var Z=2*(K+1)-1,se=N[Z],me=Z+1,de=N[me];if(0>r(se,R))me<J&&0>r(de,se)?(N[K]=de,N[me]=R,K=me):(N[K]=se,N[Z]=R,K=Z);else if(me<J&&0>r(de,R))N[K]=de,N[me]=R,K=me;else break e}}return O}function r(N,O){var R=N.sortIndex-O.sortIndex;return R!==0?R:N.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;n.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();n.unstable_now=function(){return o.now()-a}}var l=[],u=[],c=1,f=null,d=3,p=!1,g=!1,_=!1,m=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(N){for(var O=t(u);O!==null;){if(O.callback===null)i(u);else if(O.startTime<=N)i(u),O.sortIndex=O.expirationTime,e(l,O);else break;O=t(u)}}function y(N){if(_=!1,x(N),!g)if(t(l)!==null)g=!0,G(w);else{var O=t(u);O!==null&&W(y,O.startTime-N)}}function w(N,O){g=!1,_&&(_=!1,h(P),P=-1),p=!0;var R=d;try{for(x(O),f=t(l);f!==null&&(!(f.expirationTime>O)||N&&!k());){var K=f.callback;if(typeof K=="function"){f.callback=null,d=f.priorityLevel;var J=K(f.expirationTime<=O);O=n.unstable_now(),typeof J=="function"?f.callback=J:f===t(l)&&i(l),x(O)}else i(l);f=t(l)}if(f!==null)var q=!0;else{var Z=t(u);Z!==null&&W(y,Z.startTime-O),q=!1}return q}finally{f=null,d=R,p=!1}}var T=!1,S=null,P=-1,M=5,E=-1;function k(){return!(n.unstable_now()-E<M)}function U(){if(S!==null){var N=n.unstable_now();E=N;var O=!0;try{O=S(!0,N)}finally{O?Q():(T=!1,S=null)}}else T=!1}var Q;if(typeof v=="function")Q=function(){v(U)};else if(typeof MessageChannel<"u"){var L=new MessageChannel,F=L.port2;L.port1.onmessage=U,Q=function(){F.postMessage(null)}}else Q=function(){m(U,0)};function G(N){S=N,T||(T=!0,Q())}function W(N,O){P=m(function(){N(n.unstable_now())},O)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(N){N.callback=null},n.unstable_continueExecution=function(){g||p||(g=!0,G(w))},n.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<N?Math.floor(1e3/N):5},n.unstable_getCurrentPriorityLevel=function(){return d},n.unstable_getFirstCallbackNode=function(){return t(l)},n.unstable_next=function(N){switch(d){case 1:case 2:case 3:var O=3;break;default:O=d}var R=d;d=O;try{return N()}finally{d=R}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(N,O){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var R=d;d=N;try{return O()}finally{d=R}},n.unstable_scheduleCallback=function(N,O,R){var K=n.unstable_now();switch(typeof R=="object"&&R!==null?(R=R.delay,R=typeof R=="number"&&0<R?K+R:K):R=K,N){case 1:var J=-1;break;case 2:J=250;break;case 5:J=1073741823;break;case 4:J=1e4;break;default:J=5e3}return J=R+J,N={id:c++,callback:O,priorityLevel:N,startTime:R,expirationTime:J,sortIndex:-1},R>K?(N.sortIndex=R,e(u,N),t(l)===null&&N===t(u)&&(_?(h(P),P=-1):_=!0,W(y,R-K))):(N.sortIndex=J,e(l,N),g||p||(g=!0,G(w))),N},n.unstable_shouldYield=k,n.unstable_wrapCallback=function(N){var O=d;return function(){var R=d;d=O;try{return N.apply(this,arguments)}finally{d=R}}}})(Dx);Lx.exports=Dx;var rT=Lx.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sT=dt,wi=rT;function re(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Nx=new Set,tu={};function Lo(n,e){Ia(n,e),Ia(n+"Capture",e)}function Ia(n,e){for(tu[n]=e,n=0;n<e.length;n++)Nx.add(e[n])}var Hr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Kh=Object.prototype.hasOwnProperty,oT=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ng={},ig={};function aT(n){return Kh.call(ig,n)?!0:Kh.call(ng,n)?!1:oT.test(n)?ig[n]=!0:(ng[n]=!0,!1)}function lT(n,e,t,i){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function uT(n,e,t,i){if(e===null||typeof e>"u"||lT(n,e,t,i))return!0;if(i)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function jn(n,e,t,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var xn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){xn[n]=new jn(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];xn[e]=new jn(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){xn[n]=new jn(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){xn[n]=new jn(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){xn[n]=new jn(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){xn[n]=new jn(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){xn[n]=new jn(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){xn[n]=new jn(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){xn[n]=new jn(n,5,!1,n.toLowerCase(),null,!1,!1)});var Rm=/[\-:]([a-z])/g;function bm(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(Rm,bm);xn[e]=new jn(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(Rm,bm);xn[e]=new jn(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(Rm,bm);xn[e]=new jn(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){xn[n]=new jn(n,1,!1,n.toLowerCase(),null,!1,!1)});xn.xlinkHref=new jn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){xn[n]=new jn(n,1,!1,n.toLowerCase(),null,!0,!0)});function Pm(n,e,t,i){var r=xn.hasOwnProperty(e)?xn[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(uT(e,t,r,i)&&(t=null),i||r===null?aT(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):r.mustUseProperty?n[r.propertyName]=t===null?r.type===3?!1:"":t:(e=r.attributeName,i=r.attributeNamespace,t===null?n.removeAttribute(e):(r=r.type,t=r===3||r===4&&t===!0?"":""+t,i?n.setAttributeNS(i,e,t):n.setAttribute(e,t))))}var qr=sT.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Gu=Symbol.for("react.element"),ia=Symbol.for("react.portal"),ra=Symbol.for("react.fragment"),Lm=Symbol.for("react.strict_mode"),Zh=Symbol.for("react.profiler"),Ux=Symbol.for("react.provider"),Ix=Symbol.for("react.context"),Dm=Symbol.for("react.forward_ref"),Qh=Symbol.for("react.suspense"),Jh=Symbol.for("react.suspense_list"),Nm=Symbol.for("react.memo"),ns=Symbol.for("react.lazy"),Ox=Symbol.for("react.offscreen"),rg=Symbol.iterator;function sl(n){return n===null||typeof n!="object"?null:(n=rg&&n[rg]||n["@@iterator"],typeof n=="function"?n:null)}var Bt=Object.assign,Nd;function Sl(n){if(Nd===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);Nd=e&&e[1]||""}return`
`+Nd+n}var Ud=!1;function Id(n,e){if(!n||Ud)return"";Ud=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(n,[],e)}else{try{e.call()}catch(u){i=u}n.call(e.prototype)}else{try{throw Error()}catch(u){i=u}n()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return n.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",n.displayName)),l}while(1<=o&&0<=a);break}}}finally{Ud=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?Sl(n):""}function cT(n){switch(n.tag){case 5:return Sl(n.type);case 16:return Sl("Lazy");case 13:return Sl("Suspense");case 19:return Sl("SuspenseList");case 0:case 2:case 15:return n=Id(n.type,!1),n;case 11:return n=Id(n.type.render,!1),n;case 1:return n=Id(n.type,!0),n;default:return""}}function ep(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case ra:return"Fragment";case ia:return"Portal";case Zh:return"Profiler";case Lm:return"StrictMode";case Qh:return"Suspense";case Jh:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case Ix:return(n.displayName||"Context")+".Consumer";case Ux:return(n._context.displayName||"Context")+".Provider";case Dm:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case Nm:return e=n.displayName||null,e!==null?e:ep(n.type)||"Memo";case ns:e=n._payload,n=n._init;try{return ep(n(e))}catch{}}return null}function fT(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ep(e);case 8:return e===Lm?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function bs(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Fx(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function dT(n){var e=Fx(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),i=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var r=t.get,s=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function Vu(n){n._valueTracker||(n._valueTracker=dT(n))}function kx(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),i="";return n&&(i=Fx(n)?n.checked?"true":"false":n.value),n=i,n!==t?(e.setValue(n),!0):!1}function hf(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function tp(n,e){var t=e.checked;return Bt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function sg(n,e){var t=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;t=bs(e.value!=null?e.value:t),n._wrapperState={initialChecked:i,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function zx(n,e){e=e.checked,e!=null&&Pm(n,"checked",e,!1)}function np(n,e){zx(n,e);var t=bs(e.value),i=e.type;if(t!=null)i==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(i==="submit"||i==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?ip(n,e.type,t):e.hasOwnProperty("defaultValue")&&ip(n,e.type,bs(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function og(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function ip(n,e,t){(e!=="number"||hf(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var Ml=Array.isArray;function ya(n,e,t,i){if(n=n.options,e){e={};for(var r=0;r<t.length;r++)e["$"+t[r]]=!0;for(t=0;t<n.length;t++)r=e.hasOwnProperty("$"+n[t].value),n[t].selected!==r&&(n[t].selected=r),r&&i&&(n[t].defaultSelected=!0)}else{for(t=""+bs(t),e=null,r=0;r<n.length;r++){if(n[r].value===t){n[r].selected=!0,i&&(n[r].defaultSelected=!0);return}e!==null||n[r].disabled||(e=n[r])}e!==null&&(e.selected=!0)}}function rp(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(re(91));return Bt({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function ag(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(re(92));if(Ml(t)){if(1<t.length)throw Error(re(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:bs(t)}}function Bx(n,e){var t=bs(e.value),i=bs(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),i!=null&&(n.defaultValue=""+i)}function lg(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function Hx(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function sp(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?Hx(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Wu,Gx=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,i,r){MSApp.execUnsafeLocalFunction(function(){return n(e,t,i,r)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(Wu=Wu||document.createElement("div"),Wu.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Wu.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function nu(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var Nl={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},hT=["Webkit","ms","Moz","O"];Object.keys(Nl).forEach(function(n){hT.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),Nl[e]=Nl[n]})});function Vx(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||Nl.hasOwnProperty(n)&&Nl[n]?(""+e).trim():e+"px"}function Wx(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var i=t.indexOf("--")===0,r=Vx(t,e[t],i);t==="float"&&(t="cssFloat"),i?n.setProperty(t,r):n[t]=r}}var pT=Bt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function op(n,e){if(e){if(pT[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(re(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(re(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(re(61))}if(e.style!=null&&typeof e.style!="object")throw Error(re(62))}}function ap(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var lp=null;function Um(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var up=null,Sa=null,Ma=null;function ug(n){if(n=Nu(n)){if(typeof up!="function")throw Error(re(280));var e=n.stateNode;e&&(e=ad(e),up(n.stateNode,n.type,e))}}function Xx(n){Sa?Ma?Ma.push(n):Ma=[n]:Sa=n}function jx(){if(Sa){var n=Sa,e=Ma;if(Ma=Sa=null,ug(n),e)for(n=0;n<e.length;n++)ug(e[n])}}function Yx(n,e){return n(e)}function qx(){}var Od=!1;function $x(n,e,t){if(Od)return n(e,t);Od=!0;try{return Yx(n,e,t)}finally{Od=!1,(Sa!==null||Ma!==null)&&(qx(),jx())}}function iu(n,e){var t=n.stateNode;if(t===null)return null;var i=ad(t);if(i===null)return null;t=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(n=n.type,i=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!i;break e;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(re(231,e,typeof t));return t}var cp=!1;if(Hr)try{var ol={};Object.defineProperty(ol,"passive",{get:function(){cp=!0}}),window.addEventListener("test",ol,ol),window.removeEventListener("test",ol,ol)}catch{cp=!1}function mT(n,e,t,i,r,s,o,a,l){var u=Array.prototype.slice.call(arguments,3);try{e.apply(t,u)}catch(c){this.onError(c)}}var Ul=!1,pf=null,mf=!1,fp=null,_T={onError:function(n){Ul=!0,pf=n}};function gT(n,e,t,i,r,s,o,a,l){Ul=!1,pf=null,mT.apply(_T,arguments)}function vT(n,e,t,i,r,s,o,a,l){if(gT.apply(this,arguments),Ul){if(Ul){var u=pf;Ul=!1,pf=null}else throw Error(re(198));mf||(mf=!0,fp=u)}}function Do(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function Kx(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function cg(n){if(Do(n)!==n)throw Error(re(188))}function xT(n){var e=n.alternate;if(!e){if(e=Do(n),e===null)throw Error(re(188));return e!==n?null:n}for(var t=n,i=e;;){var r=t.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){t=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===t)return cg(r),n;if(s===i)return cg(r),e;s=s.sibling}throw Error(re(188))}if(t.return!==i.return)t=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===t){o=!0,t=r,i=s;break}if(a===i){o=!0,i=r,t=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===t){o=!0,t=s,i=r;break}if(a===i){o=!0,i=s,t=r;break}a=a.sibling}if(!o)throw Error(re(189))}}if(t.alternate!==i)throw Error(re(190))}if(t.tag!==3)throw Error(re(188));return t.stateNode.current===t?n:e}function Zx(n){return n=xT(n),n!==null?Qx(n):null}function Qx(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=Qx(n);if(e!==null)return e;n=n.sibling}return null}var Jx=wi.unstable_scheduleCallback,fg=wi.unstable_cancelCallback,yT=wi.unstable_shouldYield,ST=wi.unstable_requestPaint,Xt=wi.unstable_now,MT=wi.unstable_getCurrentPriorityLevel,Im=wi.unstable_ImmediatePriority,ey=wi.unstable_UserBlockingPriority,_f=wi.unstable_NormalPriority,ET=wi.unstable_LowPriority,ty=wi.unstable_IdlePriority,id=null,gr=null;function TT(n){if(gr&&typeof gr.onCommitFiberRoot=="function")try{gr.onCommitFiberRoot(id,n,void 0,(n.current.flags&128)===128)}catch{}}var rr=Math.clz32?Math.clz32:CT,wT=Math.log,AT=Math.LN2;function CT(n){return n>>>=0,n===0?32:31-(wT(n)/AT|0)|0}var Xu=64,ju=4194304;function El(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function gf(n,e){var t=n.pendingLanes;if(t===0)return 0;var i=0,r=n.suspendedLanes,s=n.pingedLanes,o=t&268435455;if(o!==0){var a=o&~r;a!==0?i=El(a):(s&=o,s!==0&&(i=El(s)))}else o=t&~r,o!==0?i=El(o):s!==0&&(i=El(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=i;0<e;)t=31-rr(e),r=1<<t,i|=n[t],e&=~r;return i}function RT(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bT(n,e){for(var t=n.suspendedLanes,i=n.pingedLanes,r=n.expirationTimes,s=n.pendingLanes;0<s;){var o=31-rr(s),a=1<<o,l=r[o];l===-1?(!(a&t)||a&i)&&(r[o]=RT(a,e)):l<=e&&(n.expiredLanes|=a),s&=~a}}function dp(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function ny(){var n=Xu;return Xu<<=1,!(Xu&4194240)&&(Xu=64),n}function Fd(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function Lu(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-rr(e),n[e]=t}function PT(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var i=n.eventTimes;for(n=n.expirationTimes;0<t;){var r=31-rr(t),s=1<<r;e[r]=0,i[r]=-1,n[r]=-1,t&=~s}}function Om(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var i=31-rr(t),r=1<<i;r&e|n[i]&e&&(n[i]|=e),t&=~r}}var vt=0;function iy(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var ry,Fm,sy,oy,ay,hp=!1,Yu=[],ms=null,_s=null,gs=null,ru=new Map,su=new Map,rs=[],LT="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function dg(n,e){switch(n){case"focusin":case"focusout":ms=null;break;case"dragenter":case"dragleave":_s=null;break;case"mouseover":case"mouseout":gs=null;break;case"pointerover":case"pointerout":ru.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":su.delete(e.pointerId)}}function al(n,e,t,i,r,s){return n===null||n.nativeEvent!==s?(n={blockedOn:e,domEventName:t,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Nu(e),e!==null&&Fm(e)),n):(n.eventSystemFlags|=i,e=n.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),n)}function DT(n,e,t,i,r){switch(e){case"focusin":return ms=al(ms,n,e,t,i,r),!0;case"dragenter":return _s=al(_s,n,e,t,i,r),!0;case"mouseover":return gs=al(gs,n,e,t,i,r),!0;case"pointerover":var s=r.pointerId;return ru.set(s,al(ru.get(s)||null,n,e,t,i,r)),!0;case"gotpointercapture":return s=r.pointerId,su.set(s,al(su.get(s)||null,n,e,t,i,r)),!0}return!1}function ly(n){var e=io(n.target);if(e!==null){var t=Do(e);if(t!==null){if(e=t.tag,e===13){if(e=Kx(t),e!==null){n.blockedOn=e,ay(n.priority,function(){sy(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Wc(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=pp(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var i=new t.constructor(t.type,t);lp=i,t.target.dispatchEvent(i),lp=null}else return e=Nu(t),e!==null&&Fm(e),n.blockedOn=t,!1;e.shift()}return!0}function hg(n,e,t){Wc(n)&&t.delete(e)}function NT(){hp=!1,ms!==null&&Wc(ms)&&(ms=null),_s!==null&&Wc(_s)&&(_s=null),gs!==null&&Wc(gs)&&(gs=null),ru.forEach(hg),su.forEach(hg)}function ll(n,e){n.blockedOn===e&&(n.blockedOn=null,hp||(hp=!0,wi.unstable_scheduleCallback(wi.unstable_NormalPriority,NT)))}function ou(n){function e(r){return ll(r,n)}if(0<Yu.length){ll(Yu[0],n);for(var t=1;t<Yu.length;t++){var i=Yu[t];i.blockedOn===n&&(i.blockedOn=null)}}for(ms!==null&&ll(ms,n),_s!==null&&ll(_s,n),gs!==null&&ll(gs,n),ru.forEach(e),su.forEach(e),t=0;t<rs.length;t++)i=rs[t],i.blockedOn===n&&(i.blockedOn=null);for(;0<rs.length&&(t=rs[0],t.blockedOn===null);)ly(t),t.blockedOn===null&&rs.shift()}var Ea=qr.ReactCurrentBatchConfig,vf=!0;function UT(n,e,t,i){var r=vt,s=Ea.transition;Ea.transition=null;try{vt=1,km(n,e,t,i)}finally{vt=r,Ea.transition=s}}function IT(n,e,t,i){var r=vt,s=Ea.transition;Ea.transition=null;try{vt=4,km(n,e,t,i)}finally{vt=r,Ea.transition=s}}function km(n,e,t,i){if(vf){var r=pp(n,e,t,i);if(r===null)Yd(n,e,i,xf,t),dg(n,i);else if(DT(r,n,e,t,i))i.stopPropagation();else if(dg(n,i),e&4&&-1<LT.indexOf(n)){for(;r!==null;){var s=Nu(r);if(s!==null&&ry(s),s=pp(n,e,t,i),s===null&&Yd(n,e,i,xf,t),s===r)break;r=s}r!==null&&i.stopPropagation()}else Yd(n,e,i,null,t)}}var xf=null;function pp(n,e,t,i){if(xf=null,n=Um(i),n=io(n),n!==null)if(e=Do(n),e===null)n=null;else if(t=e.tag,t===13){if(n=Kx(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return xf=n,null}function uy(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(MT()){case Im:return 1;case ey:return 4;case _f:case ET:return 16;case ty:return 536870912;default:return 16}default:return 16}}var os=null,zm=null,Xc=null;function cy(){if(Xc)return Xc;var n,e=zm,t=e.length,i,r="value"in os?os.value:os.textContent,s=r.length;for(n=0;n<t&&e[n]===r[n];n++);var o=t-n;for(i=1;i<=o&&e[t-i]===r[s-i];i++);return Xc=r.slice(n,1<i?1-i:void 0)}function jc(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function qu(){return!0}function pg(){return!1}function bi(n){function e(t,i,r,s,o){this._reactName=t,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in n)n.hasOwnProperty(a)&&(t=n[a],this[a]=t?t(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?qu:pg,this.isPropagationStopped=pg,this}return Bt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=qu)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=qu)},persist:function(){},isPersistent:qu}),e}var Ja={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bm=bi(Ja),Du=Bt({},Ja,{view:0,detail:0}),OT=bi(Du),kd,zd,ul,rd=Bt({},Du,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hm,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==ul&&(ul&&n.type==="mousemove"?(kd=n.screenX-ul.screenX,zd=n.screenY-ul.screenY):zd=kd=0,ul=n),kd)},movementY:function(n){return"movementY"in n?n.movementY:zd}}),mg=bi(rd),FT=Bt({},rd,{dataTransfer:0}),kT=bi(FT),zT=Bt({},Du,{relatedTarget:0}),Bd=bi(zT),BT=Bt({},Ja,{animationName:0,elapsedTime:0,pseudoElement:0}),HT=bi(BT),GT=Bt({},Ja,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),VT=bi(GT),WT=Bt({},Ja,{data:0}),_g=bi(WT),XT={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jT={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},YT={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function qT(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=YT[n])?!!e[n]:!1}function Hm(){return qT}var $T=Bt({},Du,{key:function(n){if(n.key){var e=XT[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=jc(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?jT[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hm,charCode:function(n){return n.type==="keypress"?jc(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?jc(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),KT=bi($T),ZT=Bt({},rd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gg=bi(ZT),QT=Bt({},Du,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hm}),JT=bi(QT),e1=Bt({},Ja,{propertyName:0,elapsedTime:0,pseudoElement:0}),t1=bi(e1),n1=Bt({},rd,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),i1=bi(n1),r1=[9,13,27,32],Gm=Hr&&"CompositionEvent"in window,Il=null;Hr&&"documentMode"in document&&(Il=document.documentMode);var s1=Hr&&"TextEvent"in window&&!Il,fy=Hr&&(!Gm||Il&&8<Il&&11>=Il),vg=" ",xg=!1;function dy(n,e){switch(n){case"keyup":return r1.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hy(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var sa=!1;function o1(n,e){switch(n){case"compositionend":return hy(e);case"keypress":return e.which!==32?null:(xg=!0,vg);case"textInput":return n=e.data,n===vg&&xg?null:n;default:return null}}function a1(n,e){if(sa)return n==="compositionend"||!Gm&&dy(n,e)?(n=cy(),Xc=zm=os=null,sa=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return fy&&e.locale!=="ko"?null:e.data;default:return null}}var l1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function yg(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!l1[n.type]:e==="textarea"}function py(n,e,t,i){Xx(i),e=yf(e,"onChange"),0<e.length&&(t=new Bm("onChange","change",null,t,i),n.push({event:t,listeners:e}))}var Ol=null,au=null;function u1(n){wy(n,0)}function sd(n){var e=la(n);if(kx(e))return n}function c1(n,e){if(n==="change")return e}var my=!1;if(Hr){var Hd;if(Hr){var Gd="oninput"in document;if(!Gd){var Sg=document.createElement("div");Sg.setAttribute("oninput","return;"),Gd=typeof Sg.oninput=="function"}Hd=Gd}else Hd=!1;my=Hd&&(!document.documentMode||9<document.documentMode)}function Mg(){Ol&&(Ol.detachEvent("onpropertychange",_y),au=Ol=null)}function _y(n){if(n.propertyName==="value"&&sd(au)){var e=[];py(e,au,n,Um(n)),$x(u1,e)}}function f1(n,e,t){n==="focusin"?(Mg(),Ol=e,au=t,Ol.attachEvent("onpropertychange",_y)):n==="focusout"&&Mg()}function d1(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return sd(au)}function h1(n,e){if(n==="click")return sd(e)}function p1(n,e){if(n==="input"||n==="change")return sd(e)}function m1(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var or=typeof Object.is=="function"?Object.is:m1;function lu(n,e){if(or(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),i=Object.keys(e);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var r=t[i];if(!Kh.call(e,r)||!or(n[r],e[r]))return!1}return!0}function Eg(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Tg(n,e){var t=Eg(n);n=0;for(var i;t;){if(t.nodeType===3){if(i=n+t.textContent.length,n<=e&&i>=e)return{node:t,offset:e-n};n=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Eg(t)}}function gy(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?gy(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function vy(){for(var n=window,e=hf();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=hf(n.document)}return e}function Vm(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function _1(n){var e=vy(),t=n.focusedElem,i=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&gy(t.ownerDocument.documentElement,t)){if(i!==null&&Vm(t)){if(e=i.start,n=i.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var r=t.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!n.extend&&s>i&&(r=i,i=s,s=r),r=Tg(t,s);var o=Tg(t,i);r&&o&&(n.rangeCount!==1||n.anchorNode!==r.node||n.anchorOffset!==r.offset||n.focusNode!==o.node||n.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),n.removeAllRanges(),s>i?(n.addRange(e),n.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var g1=Hr&&"documentMode"in document&&11>=document.documentMode,oa=null,mp=null,Fl=null,_p=!1;function wg(n,e,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;_p||oa==null||oa!==hf(i)||(i=oa,"selectionStart"in i&&Vm(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Fl&&lu(Fl,i)||(Fl=i,i=yf(mp,"onSelect"),0<i.length&&(e=new Bm("onSelect","select",null,e,t),n.push({event:e,listeners:i}),e.target=oa)))}function $u(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var aa={animationend:$u("Animation","AnimationEnd"),animationiteration:$u("Animation","AnimationIteration"),animationstart:$u("Animation","AnimationStart"),transitionend:$u("Transition","TransitionEnd")},Vd={},xy={};Hr&&(xy=document.createElement("div").style,"AnimationEvent"in window||(delete aa.animationend.animation,delete aa.animationiteration.animation,delete aa.animationstart.animation),"TransitionEvent"in window||delete aa.transitionend.transition);function od(n){if(Vd[n])return Vd[n];if(!aa[n])return n;var e=aa[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in xy)return Vd[n]=e[t];return n}var yy=od("animationend"),Sy=od("animationiteration"),My=od("animationstart"),Ey=od("transitionend"),Ty=new Map,Ag="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Os(n,e){Ty.set(n,e),Lo(e,[n])}for(var Wd=0;Wd<Ag.length;Wd++){var Xd=Ag[Wd],v1=Xd.toLowerCase(),x1=Xd[0].toUpperCase()+Xd.slice(1);Os(v1,"on"+x1)}Os(yy,"onAnimationEnd");Os(Sy,"onAnimationIteration");Os(My,"onAnimationStart");Os("dblclick","onDoubleClick");Os("focusin","onFocus");Os("focusout","onBlur");Os(Ey,"onTransitionEnd");Ia("onMouseEnter",["mouseout","mouseover"]);Ia("onMouseLeave",["mouseout","mouseover"]);Ia("onPointerEnter",["pointerout","pointerover"]);Ia("onPointerLeave",["pointerout","pointerover"]);Lo("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Lo("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Lo("onBeforeInput",["compositionend","keypress","textInput","paste"]);Lo("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Lo("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Lo("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Tl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),y1=new Set("cancel close invalid load scroll toggle".split(" ").concat(Tl));function Cg(n,e,t){var i=n.type||"unknown-event";n.currentTarget=t,vT(i,e,void 0,n),n.currentTarget=null}function wy(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var i=n[t],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;Cg(r,a,u),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,u=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;Cg(r,a,u),s=l}}}if(mf)throw n=fp,mf=!1,fp=null,n}function Rt(n,e){var t=e[Sp];t===void 0&&(t=e[Sp]=new Set);var i=n+"__bubble";t.has(i)||(Ay(e,n,2,!1),t.add(i))}function jd(n,e,t){var i=0;e&&(i|=4),Ay(t,n,i,e)}var Ku="_reactListening"+Math.random().toString(36).slice(2);function uu(n){if(!n[Ku]){n[Ku]=!0,Nx.forEach(function(t){t!=="selectionchange"&&(y1.has(t)||jd(t,!1,n),jd(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[Ku]||(e[Ku]=!0,jd("selectionchange",!1,e))}}function Ay(n,e,t,i){switch(uy(e)){case 1:var r=UT;break;case 4:r=IT;break;default:r=km}t=r.bind(null,e,t,n),r=void 0,!cp||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?n.addEventListener(e,t,{capture:!0,passive:r}):n.addEventListener(e,t,!0):r!==void 0?n.addEventListener(e,t,{passive:r}):n.addEventListener(e,t,!1)}function Yd(n,e,t,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=io(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}$x(function(){var u=s,c=Um(t),f=[];e:{var d=Ty.get(n);if(d!==void 0){var p=Bm,g=n;switch(n){case"keypress":if(jc(t)===0)break e;case"keydown":case"keyup":p=KT;break;case"focusin":g="focus",p=Bd;break;case"focusout":g="blur",p=Bd;break;case"beforeblur":case"afterblur":p=Bd;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=mg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=kT;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=JT;break;case yy:case Sy:case My:p=HT;break;case Ey:p=t1;break;case"scroll":p=OT;break;case"wheel":p=i1;break;case"copy":case"cut":case"paste":p=VT;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=gg}var _=(e&4)!==0,m=!_&&n==="scroll",h=_?d!==null?d+"Capture":null:d;_=[];for(var v=u,x;v!==null;){x=v;var y=x.stateNode;if(x.tag===5&&y!==null&&(x=y,h!==null&&(y=iu(v,h),y!=null&&_.push(cu(v,y,x)))),m)break;v=v.return}0<_.length&&(d=new p(d,g,null,t,c),f.push({event:d,listeners:_}))}}if(!(e&7)){e:{if(d=n==="mouseover"||n==="pointerover",p=n==="mouseout"||n==="pointerout",d&&t!==lp&&(g=t.relatedTarget||t.fromElement)&&(io(g)||g[Gr]))break e;if((p||d)&&(d=c.window===c?c:(d=c.ownerDocument)?d.defaultView||d.parentWindow:window,p?(g=t.relatedTarget||t.toElement,p=u,g=g?io(g):null,g!==null&&(m=Do(g),g!==m||g.tag!==5&&g.tag!==6)&&(g=null)):(p=null,g=u),p!==g)){if(_=mg,y="onMouseLeave",h="onMouseEnter",v="mouse",(n==="pointerout"||n==="pointerover")&&(_=gg,y="onPointerLeave",h="onPointerEnter",v="pointer"),m=p==null?d:la(p),x=g==null?d:la(g),d=new _(y,v+"leave",p,t,c),d.target=m,d.relatedTarget=x,y=null,io(c)===u&&(_=new _(h,v+"enter",g,t,c),_.target=x,_.relatedTarget=m,y=_),m=y,p&&g)t:{for(_=p,h=g,v=0,x=_;x;x=Uo(x))v++;for(x=0,y=h;y;y=Uo(y))x++;for(;0<v-x;)_=Uo(_),v--;for(;0<x-v;)h=Uo(h),x--;for(;v--;){if(_===h||h!==null&&_===h.alternate)break t;_=Uo(_),h=Uo(h)}_=null}else _=null;p!==null&&Rg(f,d,p,_,!1),g!==null&&m!==null&&Rg(f,m,g,_,!0)}}e:{if(d=u?la(u):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var w=c1;else if(yg(d))if(my)w=p1;else{w=d1;var T=f1}else(p=d.nodeName)&&p.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(w=h1);if(w&&(w=w(n,u))){py(f,w,t,c);break e}T&&T(n,d,u),n==="focusout"&&(T=d._wrapperState)&&T.controlled&&d.type==="number"&&ip(d,"number",d.value)}switch(T=u?la(u):window,n){case"focusin":(yg(T)||T.contentEditable==="true")&&(oa=T,mp=u,Fl=null);break;case"focusout":Fl=mp=oa=null;break;case"mousedown":_p=!0;break;case"contextmenu":case"mouseup":case"dragend":_p=!1,wg(f,t,c);break;case"selectionchange":if(g1)break;case"keydown":case"keyup":wg(f,t,c)}var S;if(Gm)e:{switch(n){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else sa?dy(n,t)&&(P="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(P="onCompositionStart");P&&(fy&&t.locale!=="ko"&&(sa||P!=="onCompositionStart"?P==="onCompositionEnd"&&sa&&(S=cy()):(os=c,zm="value"in os?os.value:os.textContent,sa=!0)),T=yf(u,P),0<T.length&&(P=new _g(P,n,null,t,c),f.push({event:P,listeners:T}),S?P.data=S:(S=hy(t),S!==null&&(P.data=S)))),(S=s1?o1(n,t):a1(n,t))&&(u=yf(u,"onBeforeInput"),0<u.length&&(c=new _g("onBeforeInput","beforeinput",null,t,c),f.push({event:c,listeners:u}),c.data=S))}wy(f,e)})}function cu(n,e,t){return{instance:n,listener:e,currentTarget:t}}function yf(n,e){for(var t=e+"Capture",i=[];n!==null;){var r=n,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=iu(n,t),s!=null&&i.unshift(cu(n,s,r)),s=iu(n,e),s!=null&&i.push(cu(n,s,r))),n=n.return}return i}function Uo(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Rg(n,e,t,i,r){for(var s=e._reactName,o=[];t!==null&&t!==i;){var a=t,l=a.alternate,u=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&u!==null&&(a=u,r?(l=iu(t,s),l!=null&&o.unshift(cu(t,l,a))):r||(l=iu(t,s),l!=null&&o.push(cu(t,l,a)))),t=t.return}o.length!==0&&n.push({event:e,listeners:o})}var S1=/\r\n?/g,M1=/\u0000|\uFFFD/g;function bg(n){return(typeof n=="string"?n:""+n).replace(S1,`
`).replace(M1,"")}function Zu(n,e,t){if(e=bg(e),bg(n)!==e&&t)throw Error(re(425))}function Sf(){}var gp=null,vp=null;function xp(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var yp=typeof setTimeout=="function"?setTimeout:void 0,E1=typeof clearTimeout=="function"?clearTimeout:void 0,Pg=typeof Promise=="function"?Promise:void 0,T1=typeof queueMicrotask=="function"?queueMicrotask:typeof Pg<"u"?function(n){return Pg.resolve(null).then(n).catch(w1)}:yp;function w1(n){setTimeout(function(){throw n})}function qd(n,e){var t=e,i=0;do{var r=t.nextSibling;if(n.removeChild(t),r&&r.nodeType===8)if(t=r.data,t==="/$"){if(i===0){n.removeChild(r),ou(e);return}i--}else t!=="$"&&t!=="$?"&&t!=="$!"||i++;t=r}while(t);ou(e)}function vs(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function Lg(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var el=Math.random().toString(36).slice(2),dr="__reactFiber$"+el,fu="__reactProps$"+el,Gr="__reactContainer$"+el,Sp="__reactEvents$"+el,A1="__reactListeners$"+el,C1="__reactHandles$"+el;function io(n){var e=n[dr];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Gr]||t[dr]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=Lg(n);n!==null;){if(t=n[dr])return t;n=Lg(n)}return e}n=t,t=n.parentNode}return null}function Nu(n){return n=n[dr]||n[Gr],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function la(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(re(33))}function ad(n){return n[fu]||null}var Mp=[],ua=-1;function Fs(n){return{current:n}}function Pt(n){0>ua||(n.current=Mp[ua],Mp[ua]=null,ua--)}function At(n,e){ua++,Mp[ua]=n.current,n.current=e}var Ps={},Dn=Fs(Ps),Jn=Fs(!1),So=Ps;function Oa(n,e){var t=n.type.contextTypes;if(!t)return Ps;var i=n.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in t)r[s]=e[s];return i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=r),r}function ei(n){return n=n.childContextTypes,n!=null}function Mf(){Pt(Jn),Pt(Dn)}function Dg(n,e,t){if(Dn.current!==Ps)throw Error(re(168));At(Dn,e),At(Jn,t)}function Cy(n,e,t){var i=n.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return t;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(re(108,fT(n)||"Unknown",r));return Bt({},t,i)}function Ef(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Ps,So=Dn.current,At(Dn,n),At(Jn,Jn.current),!0}function Ng(n,e,t){var i=n.stateNode;if(!i)throw Error(re(169));t?(n=Cy(n,e,So),i.__reactInternalMemoizedMergedChildContext=n,Pt(Jn),Pt(Dn),At(Dn,n)):Pt(Jn),At(Jn,t)}var Pr=null,ld=!1,$d=!1;function Ry(n){Pr===null?Pr=[n]:Pr.push(n)}function R1(n){ld=!0,Ry(n)}function ks(){if(!$d&&Pr!==null){$d=!0;var n=0,e=vt;try{var t=Pr;for(vt=1;n<t.length;n++){var i=t[n];do i=i(!0);while(i!==null)}Pr=null,ld=!1}catch(r){throw Pr!==null&&(Pr=Pr.slice(n+1)),Jx(Im,ks),r}finally{vt=e,$d=!1}}return null}var ca=[],fa=0,Tf=null,wf=0,Ni=[],Ui=0,Mo=null,Nr=1,Ur="";function qs(n,e){ca[fa++]=wf,ca[fa++]=Tf,Tf=n,wf=e}function by(n,e,t){Ni[Ui++]=Nr,Ni[Ui++]=Ur,Ni[Ui++]=Mo,Mo=n;var i=Nr;n=Ur;var r=32-rr(i)-1;i&=~(1<<r),t+=1;var s=32-rr(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Nr=1<<32-rr(e)+r|t<<r|i,Ur=s+n}else Nr=1<<s|t<<r|i,Ur=n}function Wm(n){n.return!==null&&(qs(n,1),by(n,1,0))}function Xm(n){for(;n===Tf;)Tf=ca[--fa],ca[fa]=null,wf=ca[--fa],ca[fa]=null;for(;n===Mo;)Mo=Ni[--Ui],Ni[Ui]=null,Ur=Ni[--Ui],Ni[Ui]=null,Nr=Ni[--Ui],Ni[Ui]=null}var Ei=null,yi=null,Dt=!1,er=null;function Py(n,e){var t=Bi(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function Ug(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,Ei=n,yi=vs(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,Ei=n,yi=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=Mo!==null?{id:Nr,overflow:Ur}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=Bi(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,Ei=n,yi=null,!0):!1;default:return!1}}function Ep(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Tp(n){if(Dt){var e=yi;if(e){var t=e;if(!Ug(n,e)){if(Ep(n))throw Error(re(418));e=vs(t.nextSibling);var i=Ei;e&&Ug(n,e)?Py(i,t):(n.flags=n.flags&-4097|2,Dt=!1,Ei=n)}}else{if(Ep(n))throw Error(re(418));n.flags=n.flags&-4097|2,Dt=!1,Ei=n}}}function Ig(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Ei=n}function Qu(n){if(n!==Ei)return!1;if(!Dt)return Ig(n),Dt=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!xp(n.type,n.memoizedProps)),e&&(e=yi)){if(Ep(n))throw Ly(),Error(re(418));for(;e;)Py(n,e),e=vs(e.nextSibling)}if(Ig(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(re(317));e:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){yi=vs(n.nextSibling);break e}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}yi=null}}else yi=Ei?vs(n.stateNode.nextSibling):null;return!0}function Ly(){for(var n=yi;n;)n=vs(n.nextSibling)}function Fa(){yi=Ei=null,Dt=!1}function jm(n){er===null?er=[n]:er.push(n)}var b1=qr.ReactCurrentBatchConfig;function cl(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(re(309));var i=t.stateNode}if(!i)throw Error(re(147,n));var r=i,s=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof n!="string")throw Error(re(284));if(!t._owner)throw Error(re(290,n))}return n}function Ju(n,e){throw n=Object.prototype.toString.call(e),Error(re(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function Og(n){var e=n._init;return e(n._payload)}function Dy(n){function e(h,v){if(n){var x=h.deletions;x===null?(h.deletions=[v],h.flags|=16):x.push(v)}}function t(h,v){if(!n)return null;for(;v!==null;)e(h,v),v=v.sibling;return null}function i(h,v){for(h=new Map;v!==null;)v.key!==null?h.set(v.key,v):h.set(v.index,v),v=v.sibling;return h}function r(h,v){return h=Ms(h,v),h.index=0,h.sibling=null,h}function s(h,v,x){return h.index=x,n?(x=h.alternate,x!==null?(x=x.index,x<v?(h.flags|=2,v):x):(h.flags|=2,v)):(h.flags|=1048576,v)}function o(h){return n&&h.alternate===null&&(h.flags|=2),h}function a(h,v,x,y){return v===null||v.tag!==6?(v=nh(x,h.mode,y),v.return=h,v):(v=r(v,x),v.return=h,v)}function l(h,v,x,y){var w=x.type;return w===ra?c(h,v,x.props.children,y,x.key):v!==null&&(v.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===ns&&Og(w)===v.type)?(y=r(v,x.props),y.ref=cl(h,v,x),y.return=h,y):(y=Jc(x.type,x.key,x.props,null,h.mode,y),y.ref=cl(h,v,x),y.return=h,y)}function u(h,v,x,y){return v===null||v.tag!==4||v.stateNode.containerInfo!==x.containerInfo||v.stateNode.implementation!==x.implementation?(v=ih(x,h.mode,y),v.return=h,v):(v=r(v,x.children||[]),v.return=h,v)}function c(h,v,x,y,w){return v===null||v.tag!==7?(v=uo(x,h.mode,y,w),v.return=h,v):(v=r(v,x),v.return=h,v)}function f(h,v,x){if(typeof v=="string"&&v!==""||typeof v=="number")return v=nh(""+v,h.mode,x),v.return=h,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Gu:return x=Jc(v.type,v.key,v.props,null,h.mode,x),x.ref=cl(h,null,v),x.return=h,x;case ia:return v=ih(v,h.mode,x),v.return=h,v;case ns:var y=v._init;return f(h,y(v._payload),x)}if(Ml(v)||sl(v))return v=uo(v,h.mode,x,null),v.return=h,v;Ju(h,v)}return null}function d(h,v,x,y){var w=v!==null?v.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return w!==null?null:a(h,v,""+x,y);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Gu:return x.key===w?l(h,v,x,y):null;case ia:return x.key===w?u(h,v,x,y):null;case ns:return w=x._init,d(h,v,w(x._payload),y)}if(Ml(x)||sl(x))return w!==null?null:c(h,v,x,y,null);Ju(h,x)}return null}function p(h,v,x,y,w){if(typeof y=="string"&&y!==""||typeof y=="number")return h=h.get(x)||null,a(v,h,""+y,w);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Gu:return h=h.get(y.key===null?x:y.key)||null,l(v,h,y,w);case ia:return h=h.get(y.key===null?x:y.key)||null,u(v,h,y,w);case ns:var T=y._init;return p(h,v,x,T(y._payload),w)}if(Ml(y)||sl(y))return h=h.get(x)||null,c(v,h,y,w,null);Ju(v,y)}return null}function g(h,v,x,y){for(var w=null,T=null,S=v,P=v=0,M=null;S!==null&&P<x.length;P++){S.index>P?(M=S,S=null):M=S.sibling;var E=d(h,S,x[P],y);if(E===null){S===null&&(S=M);break}n&&S&&E.alternate===null&&e(h,S),v=s(E,v,P),T===null?w=E:T.sibling=E,T=E,S=M}if(P===x.length)return t(h,S),Dt&&qs(h,P),w;if(S===null){for(;P<x.length;P++)S=f(h,x[P],y),S!==null&&(v=s(S,v,P),T===null?w=S:T.sibling=S,T=S);return Dt&&qs(h,P),w}for(S=i(h,S);P<x.length;P++)M=p(S,h,P,x[P],y),M!==null&&(n&&M.alternate!==null&&S.delete(M.key===null?P:M.key),v=s(M,v,P),T===null?w=M:T.sibling=M,T=M);return n&&S.forEach(function(k){return e(h,k)}),Dt&&qs(h,P),w}function _(h,v,x,y){var w=sl(x);if(typeof w!="function")throw Error(re(150));if(x=w.call(x),x==null)throw Error(re(151));for(var T=w=null,S=v,P=v=0,M=null,E=x.next();S!==null&&!E.done;P++,E=x.next()){S.index>P?(M=S,S=null):M=S.sibling;var k=d(h,S,E.value,y);if(k===null){S===null&&(S=M);break}n&&S&&k.alternate===null&&e(h,S),v=s(k,v,P),T===null?w=k:T.sibling=k,T=k,S=M}if(E.done)return t(h,S),Dt&&qs(h,P),w;if(S===null){for(;!E.done;P++,E=x.next())E=f(h,E.value,y),E!==null&&(v=s(E,v,P),T===null?w=E:T.sibling=E,T=E);return Dt&&qs(h,P),w}for(S=i(h,S);!E.done;P++,E=x.next())E=p(S,h,P,E.value,y),E!==null&&(n&&E.alternate!==null&&S.delete(E.key===null?P:E.key),v=s(E,v,P),T===null?w=E:T.sibling=E,T=E);return n&&S.forEach(function(U){return e(h,U)}),Dt&&qs(h,P),w}function m(h,v,x,y){if(typeof x=="object"&&x!==null&&x.type===ra&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Gu:e:{for(var w=x.key,T=v;T!==null;){if(T.key===w){if(w=x.type,w===ra){if(T.tag===7){t(h,T.sibling),v=r(T,x.props.children),v.return=h,h=v;break e}}else if(T.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===ns&&Og(w)===T.type){t(h,T.sibling),v=r(T,x.props),v.ref=cl(h,T,x),v.return=h,h=v;break e}t(h,T);break}else e(h,T);T=T.sibling}x.type===ra?(v=uo(x.props.children,h.mode,y,x.key),v.return=h,h=v):(y=Jc(x.type,x.key,x.props,null,h.mode,y),y.ref=cl(h,v,x),y.return=h,h=y)}return o(h);case ia:e:{for(T=x.key;v!==null;){if(v.key===T)if(v.tag===4&&v.stateNode.containerInfo===x.containerInfo&&v.stateNode.implementation===x.implementation){t(h,v.sibling),v=r(v,x.children||[]),v.return=h,h=v;break e}else{t(h,v);break}else e(h,v);v=v.sibling}v=ih(x,h.mode,y),v.return=h,h=v}return o(h);case ns:return T=x._init,m(h,v,T(x._payload),y)}if(Ml(x))return g(h,v,x,y);if(sl(x))return _(h,v,x,y);Ju(h,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,v!==null&&v.tag===6?(t(h,v.sibling),v=r(v,x),v.return=h,h=v):(t(h,v),v=nh(x,h.mode,y),v.return=h,h=v),o(h)):t(h,v)}return m}var ka=Dy(!0),Ny=Dy(!1),Af=Fs(null),Cf=null,da=null,Ym=null;function qm(){Ym=da=Cf=null}function $m(n){var e=Af.current;Pt(Af),n._currentValue=e}function wp(n,e,t){for(;n!==null;){var i=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),n===t)break;n=n.return}}function Ta(n,e){Cf=n,Ym=da=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&(Qn=!0),n.firstContext=null)}function Xi(n){var e=n._currentValue;if(Ym!==n)if(n={context:n,memoizedValue:e,next:null},da===null){if(Cf===null)throw Error(re(308));da=n,Cf.dependencies={lanes:0,firstContext:n}}else da=da.next=n;return e}var ro=null;function Km(n){ro===null?ro=[n]:ro.push(n)}function Uy(n,e,t,i){var r=e.interleaved;return r===null?(t.next=t,Km(e)):(t.next=r.next,r.next=t),e.interleaved=t,Vr(n,i)}function Vr(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var is=!1;function Zm(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Iy(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function kr(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function xs(n,e,t){var i=n.updateQueue;if(i===null)return null;if(i=i.shared,ct&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Vr(n,t)}return r=i.interleaved,r===null?(e.next=e,Km(i)):(e.next=r.next,r.next=e),i.interleaved=e,Vr(n,t)}function Yc(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,Om(n,t)}}function Fg(n,e){var t=n.updateQueue,i=n.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var r=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?r=s=o:s=s.next=o,t=t.next}while(t!==null);s===null?r=s=e:s=s.next=e}else r=s=e;t={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function Rf(n,e,t,i){var r=n.updateQueue;is=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,u=l.next;l.next=null,o===null?s=u:o.next=u,o=l;var c=n.alternate;c!==null&&(c=c.updateQueue,a=c.lastBaseUpdate,a!==o&&(a===null?c.firstBaseUpdate=u:a.next=u,c.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;o=0,c=u=l=null,a=s;do{var d=a.lane,p=a.eventTime;if((i&d)===d){c!==null&&(c=c.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=n,_=a;switch(d=e,p=t,_.tag){case 1:if(g=_.payload,typeof g=="function"){f=g.call(p,f,d);break e}f=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=_.payload,d=typeof g=="function"?g.call(p,f,d):g,d==null)break e;f=Bt({},f,d);break e;case 2:is=!0}}a.callback!==null&&a.lane!==0&&(n.flags|=64,d=r.effects,d===null?r.effects=[a]:d.push(a))}else p={eventTime:p,lane:d,tag:a.tag,payload:a.payload,callback:a.callback,next:null},c===null?(u=c=p,l=f):c=c.next=p,o|=d;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;d=a,a=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(!0);if(c===null&&(l=f),r.baseState=l,r.firstBaseUpdate=u,r.lastBaseUpdate=c,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);To|=o,n.lanes=o,n.memoizedState=f}}function kg(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var i=n[e],r=i.callback;if(r!==null){if(i.callback=null,i=t,typeof r!="function")throw Error(re(191,r));r.call(i)}}}var Uu={},vr=Fs(Uu),du=Fs(Uu),hu=Fs(Uu);function so(n){if(n===Uu)throw Error(re(174));return n}function Qm(n,e){switch(At(hu,e),At(du,n),At(vr,Uu),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:sp(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=sp(e,n)}Pt(vr),At(vr,e)}function za(){Pt(vr),Pt(du),Pt(hu)}function Oy(n){so(hu.current);var e=so(vr.current),t=sp(e,n.type);e!==t&&(At(du,n),At(vr,t))}function Jm(n){du.current===n&&(Pt(vr),Pt(du))}var Ot=Fs(0);function bf(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Kd=[];function e_(){for(var n=0;n<Kd.length;n++)Kd[n]._workInProgressVersionPrimary=null;Kd.length=0}var qc=qr.ReactCurrentDispatcher,Zd=qr.ReactCurrentBatchConfig,Eo=0,zt=null,en=null,cn=null,Pf=!1,kl=!1,pu=0,P1=0;function Sn(){throw Error(re(321))}function t_(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!or(n[t],e[t]))return!1;return!0}function n_(n,e,t,i,r,s){if(Eo=s,zt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,qc.current=n===null||n.memoizedState===null?U1:I1,n=t(i,r),kl){s=0;do{if(kl=!1,pu=0,25<=s)throw Error(re(301));s+=1,cn=en=null,e.updateQueue=null,qc.current=O1,n=t(i,r)}while(kl)}if(qc.current=Lf,e=en!==null&&en.next!==null,Eo=0,cn=en=zt=null,Pf=!1,e)throw Error(re(300));return n}function i_(){var n=pu!==0;return pu=0,n}function lr(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return cn===null?zt.memoizedState=cn=n:cn=cn.next=n,cn}function ji(){if(en===null){var n=zt.alternate;n=n!==null?n.memoizedState:null}else n=en.next;var e=cn===null?zt.memoizedState:cn.next;if(e!==null)cn=e,en=n;else{if(n===null)throw Error(re(310));en=n,n={memoizedState:en.memoizedState,baseState:en.baseState,baseQueue:en.baseQueue,queue:en.queue,next:null},cn===null?zt.memoizedState=cn=n:cn=cn.next=n}return cn}function mu(n,e){return typeof e=="function"?e(n):e}function Qd(n){var e=ji(),t=e.queue;if(t===null)throw Error(re(311));t.lastRenderedReducer=n;var i=en,r=i.baseQueue,s=t.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,t.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,u=s;do{var c=u.lane;if((Eo&c)===c)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:n(i,u.action);else{var f={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=f,o=i):l=l.next=f,zt.lanes|=c,To|=c}u=u.next}while(u!==null&&u!==s);l===null?o=i:l.next=a,or(i,e.memoizedState)||(Qn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,t.lastRenderedState=i}if(n=t.interleaved,n!==null){r=n;do s=r.lane,zt.lanes|=s,To|=s,r=r.next;while(r!==n)}else r===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function Jd(n){var e=ji(),t=e.queue;if(t===null)throw Error(re(311));t.lastRenderedReducer=n;var i=t.dispatch,r=t.pending,s=e.memoizedState;if(r!==null){t.pending=null;var o=r=r.next;do s=n(s,o.action),o=o.next;while(o!==r);or(s,e.memoizedState)||(Qn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),t.lastRenderedState=s}return[s,i]}function Fy(){}function ky(n,e){var t=zt,i=ji(),r=e(),s=!or(i.memoizedState,r);if(s&&(i.memoizedState=r,Qn=!0),i=i.queue,r_(Hy.bind(null,t,i,n),[n]),i.getSnapshot!==e||s||cn!==null&&cn.memoizedState.tag&1){if(t.flags|=2048,_u(9,By.bind(null,t,i,r,e),void 0,null),fn===null)throw Error(re(349));Eo&30||zy(t,e,r)}return r}function zy(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=zt.updateQueue,e===null?(e={lastEffect:null,stores:null},zt.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function By(n,e,t,i){e.value=t,e.getSnapshot=i,Gy(e)&&Vy(n)}function Hy(n,e,t){return t(function(){Gy(e)&&Vy(n)})}function Gy(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!or(n,t)}catch{return!0}}function Vy(n){var e=Vr(n,1);e!==null&&sr(e,n,1,-1)}function zg(n){var e=lr();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:mu,lastRenderedState:n},e.queue=n,n=n.dispatch=N1.bind(null,zt,n),[e.memoizedState,n]}function _u(n,e,t,i){return n={tag:n,create:e,destroy:t,deps:i,next:null},e=zt.updateQueue,e===null?(e={lastEffect:null,stores:null},zt.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(i=t.next,t.next=n,n.next=i,e.lastEffect=n)),n}function Wy(){return ji().memoizedState}function $c(n,e,t,i){var r=lr();zt.flags|=n,r.memoizedState=_u(1|e,t,void 0,i===void 0?null:i)}function ud(n,e,t,i){var r=ji();i=i===void 0?null:i;var s=void 0;if(en!==null){var o=en.memoizedState;if(s=o.destroy,i!==null&&t_(i,o.deps)){r.memoizedState=_u(e,t,s,i);return}}zt.flags|=n,r.memoizedState=_u(1|e,t,s,i)}function Bg(n,e){return $c(8390656,8,n,e)}function r_(n,e){return ud(2048,8,n,e)}function Xy(n,e){return ud(4,2,n,e)}function jy(n,e){return ud(4,4,n,e)}function Yy(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function qy(n,e,t){return t=t!=null?t.concat([n]):null,ud(4,4,Yy.bind(null,e,n),t)}function s_(){}function $y(n,e){var t=ji();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&t_(e,i[1])?i[0]:(t.memoizedState=[n,e],n)}function Ky(n,e){var t=ji();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&t_(e,i[1])?i[0]:(n=n(),t.memoizedState=[n,e],n)}function Zy(n,e,t){return Eo&21?(or(t,e)||(t=ny(),zt.lanes|=t,To|=t,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,Qn=!0),n.memoizedState=t)}function L1(n,e){var t=vt;vt=t!==0&&4>t?t:4,n(!0);var i=Zd.transition;Zd.transition={};try{n(!1),e()}finally{vt=t,Zd.transition=i}}function Qy(){return ji().memoizedState}function D1(n,e,t){var i=Ss(n);if(t={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null},Jy(n))eS(e,t);else if(t=Uy(n,e,t,i),t!==null){var r=Vn();sr(t,n,i,r),tS(t,e,i)}}function N1(n,e,t){var i=Ss(n),r={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null};if(Jy(n))eS(e,r);else{var s=n.alternate;if(n.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,t);if(r.hasEagerState=!0,r.eagerState=a,or(a,o)){var l=e.interleaved;l===null?(r.next=r,Km(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}t=Uy(n,e,r,i),t!==null&&(r=Vn(),sr(t,n,i,r),tS(t,e,i))}}function Jy(n){var e=n.alternate;return n===zt||e!==null&&e===zt}function eS(n,e){kl=Pf=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function tS(n,e,t){if(t&4194240){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,Om(n,t)}}var Lf={readContext:Xi,useCallback:Sn,useContext:Sn,useEffect:Sn,useImperativeHandle:Sn,useInsertionEffect:Sn,useLayoutEffect:Sn,useMemo:Sn,useReducer:Sn,useRef:Sn,useState:Sn,useDebugValue:Sn,useDeferredValue:Sn,useTransition:Sn,useMutableSource:Sn,useSyncExternalStore:Sn,useId:Sn,unstable_isNewReconciler:!1},U1={readContext:Xi,useCallback:function(n,e){return lr().memoizedState=[n,e===void 0?null:e],n},useContext:Xi,useEffect:Bg,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,$c(4194308,4,Yy.bind(null,e,n),t)},useLayoutEffect:function(n,e){return $c(4194308,4,n,e)},useInsertionEffect:function(n,e){return $c(4,2,n,e)},useMemo:function(n,e){var t=lr();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var i=lr();return e=t!==void 0?t(e):e,i.memoizedState=i.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},i.queue=n,n=n.dispatch=D1.bind(null,zt,n),[i.memoizedState,n]},useRef:function(n){var e=lr();return n={current:n},e.memoizedState=n},useState:zg,useDebugValue:s_,useDeferredValue:function(n){return lr().memoizedState=n},useTransition:function(){var n=zg(!1),e=n[0];return n=L1.bind(null,n[1]),lr().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var i=zt,r=lr();if(Dt){if(t===void 0)throw Error(re(407));t=t()}else{if(t=e(),fn===null)throw Error(re(349));Eo&30||zy(i,e,t)}r.memoizedState=t;var s={value:t,getSnapshot:e};return r.queue=s,Bg(Hy.bind(null,i,s,n),[n]),i.flags|=2048,_u(9,By.bind(null,i,s,t,e),void 0,null),t},useId:function(){var n=lr(),e=fn.identifierPrefix;if(Dt){var t=Ur,i=Nr;t=(i&~(1<<32-rr(i)-1)).toString(32)+t,e=":"+e+"R"+t,t=pu++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=P1++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},I1={readContext:Xi,useCallback:$y,useContext:Xi,useEffect:r_,useImperativeHandle:qy,useInsertionEffect:Xy,useLayoutEffect:jy,useMemo:Ky,useReducer:Qd,useRef:Wy,useState:function(){return Qd(mu)},useDebugValue:s_,useDeferredValue:function(n){var e=ji();return Zy(e,en.memoizedState,n)},useTransition:function(){var n=Qd(mu)[0],e=ji().memoizedState;return[n,e]},useMutableSource:Fy,useSyncExternalStore:ky,useId:Qy,unstable_isNewReconciler:!1},O1={readContext:Xi,useCallback:$y,useContext:Xi,useEffect:r_,useImperativeHandle:qy,useInsertionEffect:Xy,useLayoutEffect:jy,useMemo:Ky,useReducer:Jd,useRef:Wy,useState:function(){return Jd(mu)},useDebugValue:s_,useDeferredValue:function(n){var e=ji();return en===null?e.memoizedState=n:Zy(e,en.memoizedState,n)},useTransition:function(){var n=Jd(mu)[0],e=ji().memoizedState;return[n,e]},useMutableSource:Fy,useSyncExternalStore:ky,useId:Qy,unstable_isNewReconciler:!1};function Qi(n,e){if(n&&n.defaultProps){e=Bt({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function Ap(n,e,t,i){e=n.memoizedState,t=t(i,e),t=t==null?e:Bt({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var cd={isMounted:function(n){return(n=n._reactInternals)?Do(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var i=Vn(),r=Ss(n),s=kr(i,r);s.payload=e,t!=null&&(s.callback=t),e=xs(n,s,r),e!==null&&(sr(e,n,r,i),Yc(e,n,r))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var i=Vn(),r=Ss(n),s=kr(i,r);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=xs(n,s,r),e!==null&&(sr(e,n,r,i),Yc(e,n,r))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=Vn(),i=Ss(n),r=kr(t,i);r.tag=2,e!=null&&(r.callback=e),e=xs(n,r,i),e!==null&&(sr(e,n,i,t),Yc(e,n,i))}};function Hg(n,e,t,i,r,s,o){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!lu(t,i)||!lu(r,s):!0}function nS(n,e,t){var i=!1,r=Ps,s=e.contextType;return typeof s=="object"&&s!==null?s=Xi(s):(r=ei(e)?So:Dn.current,i=e.contextTypes,s=(i=i!=null)?Oa(n,r):Ps),e=new e(t,s),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=cd,n.stateNode=e,e._reactInternals=n,i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=s),e}function Gg(n,e,t,i){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,i),e.state!==n&&cd.enqueueReplaceState(e,e.state,null)}function Cp(n,e,t,i){var r=n.stateNode;r.props=t,r.state=n.memoizedState,r.refs={},Zm(n);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Xi(s):(s=ei(e)?So:Dn.current,r.context=Oa(n,s)),r.state=n.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Ap(n,e,s,t),r.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&cd.enqueueReplaceState(r,r.state,null),Rf(n,t,r,i),r.state=n.memoizedState),typeof r.componentDidMount=="function"&&(n.flags|=4194308)}function Ba(n,e){try{var t="",i=e;do t+=cT(i),i=i.return;while(i);var r=t}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:n,source:e,stack:r,digest:null}}function eh(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function Rp(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var F1=typeof WeakMap=="function"?WeakMap:Map;function iS(n,e,t){t=kr(-1,t),t.tag=3,t.payload={element:null};var i=e.value;return t.callback=function(){Nf||(Nf=!0,kp=i),Rp(n,e)},t}function rS(n,e,t){t=kr(-1,t),t.tag=3;var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;t.payload=function(){return i(r)},t.callback=function(){Rp(n,e)}}var s=n.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){Rp(n,e),typeof i!="function"&&(ys===null?ys=new Set([this]):ys.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),t}function Vg(n,e,t){var i=n.pingCache;if(i===null){i=n.pingCache=new F1;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(t)||(r.add(t),n=Z1.bind(null,n,e,t),e.then(n,n))}function Wg(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function Xg(n,e,t,i,r){return n.mode&1?(n.flags|=65536,n.lanes=r,n):(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=kr(-1,1),e.tag=2,xs(t,e,1))),t.lanes|=1),n)}var k1=qr.ReactCurrentOwner,Qn=!1;function kn(n,e,t,i){e.child=n===null?Ny(e,null,t,i):ka(e,n.child,t,i)}function jg(n,e,t,i,r){t=t.render;var s=e.ref;return Ta(e,r),i=n_(n,e,t,i,s,r),t=i_(),n!==null&&!Qn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,Wr(n,e,r)):(Dt&&t&&Wm(e),e.flags|=1,kn(n,e,i,r),e.child)}function Yg(n,e,t,i,r){if(n===null){var s=t.type;return typeof s=="function"&&!h_(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=s,sS(n,e,s,i,r)):(n=Jc(t.type,null,i,e,e.mode,r),n.ref=e.ref,n.return=e,e.child=n)}if(s=n.child,!(n.lanes&r)){var o=s.memoizedProps;if(t=t.compare,t=t!==null?t:lu,t(o,i)&&n.ref===e.ref)return Wr(n,e,r)}return e.flags|=1,n=Ms(s,i),n.ref=e.ref,n.return=e,e.child=n}function sS(n,e,t,i,r){if(n!==null){var s=n.memoizedProps;if(lu(s,i)&&n.ref===e.ref)if(Qn=!1,e.pendingProps=i=s,(n.lanes&r)!==0)n.flags&131072&&(Qn=!0);else return e.lanes=n.lanes,Wr(n,e,r)}return bp(n,e,t,i,r)}function oS(n,e,t){var i=e.pendingProps,r=i.children,s=n!==null?n.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},At(pa,pi),pi|=t;else{if(!(t&1073741824))return n=s!==null?s.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,At(pa,pi),pi|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:t,At(pa,pi),pi|=i}else s!==null?(i=s.baseLanes|t,e.memoizedState=null):i=t,At(pa,pi),pi|=i;return kn(n,e,r,t),e.child}function aS(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function bp(n,e,t,i,r){var s=ei(t)?So:Dn.current;return s=Oa(e,s),Ta(e,r),t=n_(n,e,t,i,s,r),i=i_(),n!==null&&!Qn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,Wr(n,e,r)):(Dt&&i&&Wm(e),e.flags|=1,kn(n,e,t,r),e.child)}function qg(n,e,t,i,r){if(ei(t)){var s=!0;Ef(e)}else s=!1;if(Ta(e,r),e.stateNode===null)Kc(n,e),nS(e,t,i),Cp(e,t,i,r),i=!0;else if(n===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,u=t.contextType;typeof u=="object"&&u!==null?u=Xi(u):(u=ei(t)?So:Dn.current,u=Oa(e,u));var c=t.getDerivedStateFromProps,f=typeof c=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==u)&&Gg(e,o,i,u),is=!1;var d=e.memoizedState;o.state=d,Rf(e,i,o,r),l=e.memoizedState,a!==i||d!==l||Jn.current||is?(typeof c=="function"&&(Ap(e,t,c,i),l=e.memoizedState),(a=is||Hg(e,t,a,i,d,l,u))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=u,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Iy(n,e),a=e.memoizedProps,u=e.type===e.elementType?a:Qi(e.type,a),o.props=u,f=e.pendingProps,d=o.context,l=t.contextType,typeof l=="object"&&l!==null?l=Xi(l):(l=ei(t)?So:Dn.current,l=Oa(e,l));var p=t.getDerivedStateFromProps;(c=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||d!==l)&&Gg(e,o,i,l),is=!1,d=e.memoizedState,o.state=d,Rf(e,i,o,r);var g=e.memoizedState;a!==f||d!==g||Jn.current||is?(typeof p=="function"&&(Ap(e,t,p,i),g=e.memoizedState),(u=is||Hg(e,t,u,i,d,g,l)||!1)?(c||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,g,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,g,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&d===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&d===n.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),o.props=i,o.state=g,o.context=l,i=u):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&d===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&d===n.memoizedState||(e.flags|=1024),i=!1)}return Pp(n,e,t,i,s,r)}function Pp(n,e,t,i,r,s){aS(n,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Ng(e,t,!1),Wr(n,e,s);i=e.stateNode,k1.current=e;var a=o&&typeof t.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,n!==null&&o?(e.child=ka(e,n.child,null,s),e.child=ka(e,null,a,s)):kn(n,e,a,s),e.memoizedState=i.state,r&&Ng(e,t,!0),e.child}function lS(n){var e=n.stateNode;e.pendingContext?Dg(n,e.pendingContext,e.pendingContext!==e.context):e.context&&Dg(n,e.context,!1),Qm(n,e.containerInfo)}function $g(n,e,t,i,r){return Fa(),jm(r),e.flags|=256,kn(n,e,t,i),e.child}var Lp={dehydrated:null,treeContext:null,retryLane:0};function Dp(n){return{baseLanes:n,cachePool:null,transitions:null}}function uS(n,e,t){var i=e.pendingProps,r=Ot.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=n!==null&&n.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(r|=1),At(Ot,r&1),n===null)return Tp(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,n=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=hd(o,i,0,null),n=uo(n,i,t,null),s.return=e,n.return=e,s.sibling=n,e.child=s,e.child.memoizedState=Dp(t),e.memoizedState=Lp,n):o_(e,o));if(r=n.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return z1(n,e,o,i,a,r,t);if(s){s=i.fallback,o=e.mode,r=n.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Ms(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Ms(a,s):(s=uo(s,o,t,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=n.child.memoizedState,o=o===null?Dp(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=n.childLanes&~t,e.memoizedState=Lp,i}return s=n.child,n=s.sibling,i=Ms(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=t),i.return=e,i.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=i,e.memoizedState=null,i}function o_(n,e){return e=hd({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function ec(n,e,t,i){return i!==null&&jm(i),ka(e,n.child,null,t),n=o_(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function z1(n,e,t,i,r,s,o){if(t)return e.flags&256?(e.flags&=-257,i=eh(Error(re(422))),ec(n,e,o,i)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=hd({mode:"visible",children:i.children},r,0,null),s=uo(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&ka(e,n.child,null,o),e.child.memoizedState=Dp(o),e.memoizedState=Lp,s);if(!(e.mode&1))return ec(n,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(re(419)),i=eh(s,i,void 0),ec(n,e,o,i)}if(a=(o&n.childLanes)!==0,Qn||a){if(i=fn,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Vr(n,r),sr(i,n,r,-1))}return d_(),i=eh(Error(re(421))),ec(n,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=n.child,e=Q1.bind(null,n),r._reactRetry=e,null):(n=s.treeContext,yi=vs(r.nextSibling),Ei=e,Dt=!0,er=null,n!==null&&(Ni[Ui++]=Nr,Ni[Ui++]=Ur,Ni[Ui++]=Mo,Nr=n.id,Ur=n.overflow,Mo=e),e=o_(e,i.children),e.flags|=4096,e)}function Kg(n,e,t){n.lanes|=e;var i=n.alternate;i!==null&&(i.lanes|=e),wp(n.return,e,t)}function th(n,e,t,i,r){var s=n.memoizedState;s===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=t,s.tailMode=r)}function cS(n,e,t){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(kn(n,e,i.children,t),i=Ot.current,i&2)i=i&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Kg(n,t,e);else if(n.tag===19)Kg(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}i&=1}if(At(Ot,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(t=e.child,r=null;t!==null;)n=t.alternate,n!==null&&bf(n)===null&&(r=t),t=t.sibling;t=r,t===null?(r=e.child,e.child=null):(r=t.sibling,t.sibling=null),th(e,!1,r,t,s);break;case"backwards":for(t=null,r=e.child,e.child=null;r!==null;){if(n=r.alternate,n!==null&&bf(n)===null){e.child=r;break}n=r.sibling,r.sibling=t,t=r,r=n}th(e,!0,t,null,s);break;case"together":th(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Kc(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function Wr(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),To|=e.lanes,!(t&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(re(153));if(e.child!==null){for(n=e.child,t=Ms(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=Ms(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function B1(n,e,t){switch(e.tag){case 3:lS(e),Fa();break;case 5:Oy(e);break;case 1:ei(e.type)&&Ef(e);break;case 4:Qm(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;At(Af,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(At(Ot,Ot.current&1),e.flags|=128,null):t&e.child.childLanes?uS(n,e,t):(At(Ot,Ot.current&1),n=Wr(n,e,t),n!==null?n.sibling:null);At(Ot,Ot.current&1);break;case 19:if(i=(t&e.childLanes)!==0,n.flags&128){if(i)return cS(n,e,t);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),At(Ot,Ot.current),i)break;return null;case 22:case 23:return e.lanes=0,oS(n,e,t)}return Wr(n,e,t)}var fS,Np,dS,hS;fS=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Np=function(){};dS=function(n,e,t,i){var r=n.memoizedProps;if(r!==i){n=e.stateNode,so(vr.current);var s=null;switch(t){case"input":r=tp(n,r),i=tp(n,i),s=[];break;case"select":r=Bt({},r,{value:void 0}),i=Bt({},i,{value:void 0}),s=[];break;case"textarea":r=rp(n,r),i=rp(n,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(n.onclick=Sf)}op(t,i);var o;t=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var a=r[u];for(o in a)a.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(tu.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var l=i[u];if(a=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(t||(t={}),t[o]=l[o])}else t||(s||(s=[]),s.push(u,t)),t=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(tu.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&Rt("scroll",n),s||a===l||(s=[])):(s=s||[]).push(u,l))}t&&(s=s||[]).push("style",t);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};hS=function(n,e,t,i){t!==i&&(e.flags|=4)};function fl(n,e){if(!Dt)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:i.sibling=null}}function Mn(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,i=0;if(e)for(var r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=n,r=r.sibling;else for(r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=n,r=r.sibling;return n.subtreeFlags|=i,n.childLanes=t,e}function H1(n,e,t){var i=e.pendingProps;switch(Xm(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Mn(e),null;case 1:return ei(e.type)&&Mf(),Mn(e),null;case 3:return i=e.stateNode,za(),Pt(Jn),Pt(Dn),e_(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(n===null||n.child===null)&&(Qu(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,er!==null&&(Hp(er),er=null))),Np(n,e),Mn(e),null;case 5:Jm(e);var r=so(hu.current);if(t=e.type,n!==null&&e.stateNode!=null)dS(n,e,t,i,r),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(re(166));return Mn(e),null}if(n=so(vr.current),Qu(e)){i=e.stateNode,t=e.type;var s=e.memoizedProps;switch(i[dr]=e,i[fu]=s,n=(e.mode&1)!==0,t){case"dialog":Rt("cancel",i),Rt("close",i);break;case"iframe":case"object":case"embed":Rt("load",i);break;case"video":case"audio":for(r=0;r<Tl.length;r++)Rt(Tl[r],i);break;case"source":Rt("error",i);break;case"img":case"image":case"link":Rt("error",i),Rt("load",i);break;case"details":Rt("toggle",i);break;case"input":sg(i,s),Rt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},Rt("invalid",i);break;case"textarea":ag(i,s),Rt("invalid",i)}op(t,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&Zu(i.textContent,a,n),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Zu(i.textContent,a,n),r=["children",""+a]):tu.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&Rt("scroll",i)}switch(t){case"input":Vu(i),og(i,s,!0);break;case"textarea":Vu(i),lg(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Sf)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Hx(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=o.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof i.is=="string"?n=o.createElement(t,{is:i.is}):(n=o.createElement(t),t==="select"&&(o=n,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):n=o.createElementNS(n,t),n[dr]=e,n[fu]=i,fS(n,e,!1,!1),e.stateNode=n;e:{switch(o=ap(t,i),t){case"dialog":Rt("cancel",n),Rt("close",n),r=i;break;case"iframe":case"object":case"embed":Rt("load",n),r=i;break;case"video":case"audio":for(r=0;r<Tl.length;r++)Rt(Tl[r],n);r=i;break;case"source":Rt("error",n),r=i;break;case"img":case"image":case"link":Rt("error",n),Rt("load",n),r=i;break;case"details":Rt("toggle",n),r=i;break;case"input":sg(n,i),r=tp(n,i),Rt("invalid",n);break;case"option":r=i;break;case"select":n._wrapperState={wasMultiple:!!i.multiple},r=Bt({},i,{value:void 0}),Rt("invalid",n);break;case"textarea":ag(n,i),r=rp(n,i),Rt("invalid",n);break;default:r=i}op(t,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Wx(n,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Gx(n,l)):s==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&nu(n,l):typeof l=="number"&&nu(n,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(tu.hasOwnProperty(s)?l!=null&&s==="onScroll"&&Rt("scroll",n):l!=null&&Pm(n,s,l,o))}switch(t){case"input":Vu(n),og(n,i,!1);break;case"textarea":Vu(n),lg(n);break;case"option":i.value!=null&&n.setAttribute("value",""+bs(i.value));break;case"select":n.multiple=!!i.multiple,s=i.value,s!=null?ya(n,!!i.multiple,s,!1):i.defaultValue!=null&&ya(n,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(n.onclick=Sf)}switch(t){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Mn(e),null;case 6:if(n&&e.stateNode!=null)hS(n,e,n.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(re(166));if(t=so(hu.current),so(vr.current),Qu(e)){if(i=e.stateNode,t=e.memoizedProps,i[dr]=e,(s=i.nodeValue!==t)&&(n=Ei,n!==null))switch(n.tag){case 3:Zu(i.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Zu(i.nodeValue,t,(n.mode&1)!==0)}s&&(e.flags|=4)}else i=(t.nodeType===9?t:t.ownerDocument).createTextNode(i),i[dr]=e,e.stateNode=i}return Mn(e),null;case 13:if(Pt(Ot),i=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Dt&&yi!==null&&e.mode&1&&!(e.flags&128))Ly(),Fa(),e.flags|=98560,s=!1;else if(s=Qu(e),i!==null&&i.dehydrated!==null){if(n===null){if(!s)throw Error(re(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(re(317));s[dr]=e}else Fa(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Mn(e),s=!1}else er!==null&&(Hp(er),er=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=t,e):(i=i!==null,i!==(n!==null&&n.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(n===null||Ot.current&1?nn===0&&(nn=3):d_())),e.updateQueue!==null&&(e.flags|=4),Mn(e),null);case 4:return za(),Np(n,e),n===null&&uu(e.stateNode.containerInfo),Mn(e),null;case 10:return $m(e.type._context),Mn(e),null;case 17:return ei(e.type)&&Mf(),Mn(e),null;case 19:if(Pt(Ot),s=e.memoizedState,s===null)return Mn(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)fl(s,!1);else{if(nn!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(o=bf(n),o!==null){for(e.flags|=128,fl(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=t,t=e.child;t!==null;)s=t,n=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=n,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,n=o.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return At(Ot,Ot.current&1|2),e.child}n=n.sibling}s.tail!==null&&Xt()>Ha&&(e.flags|=128,i=!0,fl(s,!1),e.lanes=4194304)}else{if(!i)if(n=bf(o),n!==null){if(e.flags|=128,i=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),fl(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Dt)return Mn(e),null}else 2*Xt()-s.renderingStartTime>Ha&&t!==1073741824&&(e.flags|=128,i=!0,fl(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(t=s.last,t!==null?t.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Xt(),e.sibling=null,t=Ot.current,At(Ot,i?t&1|2:t&1),e):(Mn(e),null);case 22:case 23:return f_(),i=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?pi&1073741824&&(Mn(e),e.subtreeFlags&6&&(e.flags|=8192)):Mn(e),null;case 24:return null;case 25:return null}throw Error(re(156,e.tag))}function G1(n,e){switch(Xm(e),e.tag){case 1:return ei(e.type)&&Mf(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return za(),Pt(Jn),Pt(Dn),e_(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return Jm(e),null;case 13:if(Pt(Ot),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(re(340));Fa()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return Pt(Ot),null;case 4:return za(),null;case 10:return $m(e.type._context),null;case 22:case 23:return f_(),null;case 24:return null;default:return null}}var tc=!1,Cn=!1,V1=typeof WeakSet=="function"?WeakSet:Set,Se=null;function ha(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(i){Gt(n,e,i)}else t.current=null}function Up(n,e,t){try{t()}catch(i){Gt(n,e,i)}}var Zg=!1;function W1(n,e){if(gp=vf,n=vy(),Vm(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break e}var o=0,a=-1,l=-1,u=0,c=0,f=n,d=null;t:for(;;){for(var p;f!==t||r!==0&&f.nodeType!==3||(a=o+r),f!==s||i!==0&&f.nodeType!==3||(l=o+i),f.nodeType===3&&(o+=f.nodeValue.length),(p=f.firstChild)!==null;)d=f,f=p;for(;;){if(f===n)break t;if(d===t&&++u===r&&(a=o),d===s&&++c===i&&(l=o),(p=f.nextSibling)!==null)break;f=d,d=f.parentNode}f=p}t=a===-1||l===-1?null:{start:a,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(vp={focusedElem:n,selectionRange:t},vf=!1,Se=e;Se!==null;)if(e=Se,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,Se=n;else for(;Se!==null;){e=Se;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var _=g.memoizedProps,m=g.memoizedState,h=e.stateNode,v=h.getSnapshotBeforeUpdate(e.elementType===e.type?_:Qi(e.type,_),m);h.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(re(163))}}catch(y){Gt(e,e.return,y)}if(n=e.sibling,n!==null){n.return=e.return,Se=n;break}Se=e.return}return g=Zg,Zg=!1,g}function zl(n,e,t){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&n)===n){var s=r.destroy;r.destroy=void 0,s!==void 0&&Up(e,t,s)}r=r.next}while(r!==i)}}function fd(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var i=t.create;t.destroy=i()}t=t.next}while(t!==e)}}function Ip(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function pS(n){var e=n.alternate;e!==null&&(n.alternate=null,pS(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[dr],delete e[fu],delete e[Sp],delete e[A1],delete e[C1])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function mS(n){return n.tag===5||n.tag===3||n.tag===4}function Qg(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||mS(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Op(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Sf));else if(i!==4&&(n=n.child,n!==null))for(Op(n,e,t),n=n.sibling;n!==null;)Op(n,e,t),n=n.sibling}function Fp(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(i!==4&&(n=n.child,n!==null))for(Fp(n,e,t),n=n.sibling;n!==null;)Fp(n,e,t),n=n.sibling}var hn=null,Ji=!1;function $r(n,e,t){for(t=t.child;t!==null;)_S(n,e,t),t=t.sibling}function _S(n,e,t){if(gr&&typeof gr.onCommitFiberUnmount=="function")try{gr.onCommitFiberUnmount(id,t)}catch{}switch(t.tag){case 5:Cn||ha(t,e);case 6:var i=hn,r=Ji;hn=null,$r(n,e,t),hn=i,Ji=r,hn!==null&&(Ji?(n=hn,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):hn.removeChild(t.stateNode));break;case 18:hn!==null&&(Ji?(n=hn,t=t.stateNode,n.nodeType===8?qd(n.parentNode,t):n.nodeType===1&&qd(n,t),ou(n)):qd(hn,t.stateNode));break;case 4:i=hn,r=Ji,hn=t.stateNode.containerInfo,Ji=!0,$r(n,e,t),hn=i,Ji=r;break;case 0:case 11:case 14:case 15:if(!Cn&&(i=t.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Up(t,e,o),r=r.next}while(r!==i)}$r(n,e,t);break;case 1:if(!Cn&&(ha(t,e),i=t.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=t.memoizedProps,i.state=t.memoizedState,i.componentWillUnmount()}catch(a){Gt(t,e,a)}$r(n,e,t);break;case 21:$r(n,e,t);break;case 22:t.mode&1?(Cn=(i=Cn)||t.memoizedState!==null,$r(n,e,t),Cn=i):$r(n,e,t);break;default:$r(n,e,t)}}function Jg(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new V1),e.forEach(function(i){var r=J1.bind(null,n,i);t.has(i)||(t.add(i),i.then(r,r))})}}function Yi(n,e){var t=e.deletions;if(t!==null)for(var i=0;i<t.length;i++){var r=t[i];try{var s=n,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:hn=a.stateNode,Ji=!1;break e;case 3:hn=a.stateNode.containerInfo,Ji=!0;break e;case 4:hn=a.stateNode.containerInfo,Ji=!0;break e}a=a.return}if(hn===null)throw Error(re(160));_S(s,o,r),hn=null,Ji=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(u){Gt(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)gS(e,n),e=e.sibling}function gS(n,e){var t=n.alternate,i=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Yi(e,n),ar(n),i&4){try{zl(3,n,n.return),fd(3,n)}catch(_){Gt(n,n.return,_)}try{zl(5,n,n.return)}catch(_){Gt(n,n.return,_)}}break;case 1:Yi(e,n),ar(n),i&512&&t!==null&&ha(t,t.return);break;case 5:if(Yi(e,n),ar(n),i&512&&t!==null&&ha(t,t.return),n.flags&32){var r=n.stateNode;try{nu(r,"")}catch(_){Gt(n,n.return,_)}}if(i&4&&(r=n.stateNode,r!=null)){var s=n.memoizedProps,o=t!==null?t.memoizedProps:s,a=n.type,l=n.updateQueue;if(n.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&zx(r,s),ap(a,o);var u=ap(a,s);for(o=0;o<l.length;o+=2){var c=l[o],f=l[o+1];c==="style"?Wx(r,f):c==="dangerouslySetInnerHTML"?Gx(r,f):c==="children"?nu(r,f):Pm(r,c,f,u)}switch(a){case"input":np(r,s);break;case"textarea":Bx(r,s);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?ya(r,!!s.multiple,p,!1):d!==!!s.multiple&&(s.defaultValue!=null?ya(r,!!s.multiple,s.defaultValue,!0):ya(r,!!s.multiple,s.multiple?[]:"",!1))}r[fu]=s}catch(_){Gt(n,n.return,_)}}break;case 6:if(Yi(e,n),ar(n),i&4){if(n.stateNode===null)throw Error(re(162));r=n.stateNode,s=n.memoizedProps;try{r.nodeValue=s}catch(_){Gt(n,n.return,_)}}break;case 3:if(Yi(e,n),ar(n),i&4&&t!==null&&t.memoizedState.isDehydrated)try{ou(e.containerInfo)}catch(_){Gt(n,n.return,_)}break;case 4:Yi(e,n),ar(n);break;case 13:Yi(e,n),ar(n),r=n.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(u_=Xt())),i&4&&Jg(n);break;case 22:if(c=t!==null&&t.memoizedState!==null,n.mode&1?(Cn=(u=Cn)||c,Yi(e,n),Cn=u):Yi(e,n),ar(n),i&8192){if(u=n.memoizedState!==null,(n.stateNode.isHidden=u)&&!c&&n.mode&1)for(Se=n,c=n.child;c!==null;){for(f=Se=c;Se!==null;){switch(d=Se,p=d.child,d.tag){case 0:case 11:case 14:case 15:zl(4,d,d.return);break;case 1:ha(d,d.return);var g=d.stateNode;if(typeof g.componentWillUnmount=="function"){i=d,t=d.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(_){Gt(i,t,_)}}break;case 5:ha(d,d.return);break;case 22:if(d.memoizedState!==null){t0(f);continue}}p!==null?(p.return=d,Se=p):t0(f)}c=c.sibling}e:for(c=null,f=n;;){if(f.tag===5){if(c===null){c=f;try{r=f.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Vx("display",o))}catch(_){Gt(n,n.return,_)}}}else if(f.tag===6){if(c===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(_){Gt(n,n.return,_)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===n)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===n)break e;for(;f.sibling===null;){if(f.return===null||f.return===n)break e;c===f&&(c=null),f=f.return}c===f&&(c=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Yi(e,n),ar(n),i&4&&Jg(n);break;case 21:break;default:Yi(e,n),ar(n)}}function ar(n){var e=n.flags;if(e&2){try{e:{for(var t=n.return;t!==null;){if(mS(t)){var i=t;break e}t=t.return}throw Error(re(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(nu(r,""),i.flags&=-33);var s=Qg(n);Fp(n,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Qg(n);Op(n,a,o);break;default:throw Error(re(161))}}catch(l){Gt(n,n.return,l)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function X1(n,e,t){Se=n,vS(n)}function vS(n,e,t){for(var i=(n.mode&1)!==0;Se!==null;){var r=Se,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||tc;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Cn;a=tc;var u=Cn;if(tc=o,(Cn=l)&&!u)for(Se=r;Se!==null;)o=Se,l=o.child,o.tag===22&&o.memoizedState!==null?n0(r):l!==null?(l.return=o,Se=l):n0(r);for(;s!==null;)Se=s,vS(s),s=s.sibling;Se=r,tc=a,Cn=u}e0(n)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Se=s):e0(n)}}function e0(n){for(;Se!==null;){var e=Se;if(e.flags&8772){var t=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Cn||fd(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Cn)if(t===null)i.componentDidMount();else{var r=e.elementType===e.type?t.memoizedProps:Qi(e.type,t.memoizedProps);i.componentDidUpdate(r,t.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&kg(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}kg(e,o,t)}break;case 5:var a=e.stateNode;if(t===null&&e.flags&4){t=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var f=c.dehydrated;f!==null&&ou(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(re(163))}Cn||e.flags&512&&Ip(e)}catch(d){Gt(e,e.return,d)}}if(e===n){Se=null;break}if(t=e.sibling,t!==null){t.return=e.return,Se=t;break}Se=e.return}}function t0(n){for(;Se!==null;){var e=Se;if(e===n){Se=null;break}var t=e.sibling;if(t!==null){t.return=e.return,Se=t;break}Se=e.return}}function n0(n){for(;Se!==null;){var e=Se;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{fd(4,e)}catch(l){Gt(e,t,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Gt(e,r,l)}}var s=e.return;try{Ip(e)}catch(l){Gt(e,s,l)}break;case 5:var o=e.return;try{Ip(e)}catch(l){Gt(e,o,l)}}}catch(l){Gt(e,e.return,l)}if(e===n){Se=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Se=a;break}Se=e.return}}var j1=Math.ceil,Df=qr.ReactCurrentDispatcher,a_=qr.ReactCurrentOwner,Vi=qr.ReactCurrentBatchConfig,ct=0,fn=null,Kt=null,gn=0,pi=0,pa=Fs(0),nn=0,gu=null,To=0,dd=0,l_=0,Bl=null,$n=null,u_=0,Ha=1/0,Rr=null,Nf=!1,kp=null,ys=null,nc=!1,as=null,Uf=0,Hl=0,zp=null,Zc=-1,Qc=0;function Vn(){return ct&6?Xt():Zc!==-1?Zc:Zc=Xt()}function Ss(n){return n.mode&1?ct&2&&gn!==0?gn&-gn:b1.transition!==null?(Qc===0&&(Qc=ny()),Qc):(n=vt,n!==0||(n=window.event,n=n===void 0?16:uy(n.type)),n):1}function sr(n,e,t,i){if(50<Hl)throw Hl=0,zp=null,Error(re(185));Lu(n,t,i),(!(ct&2)||n!==fn)&&(n===fn&&(!(ct&2)&&(dd|=t),nn===4&&ss(n,gn)),ti(n,i),t===1&&ct===0&&!(e.mode&1)&&(Ha=Xt()+500,ld&&ks()))}function ti(n,e){var t=n.callbackNode;bT(n,e);var i=gf(n,n===fn?gn:0);if(i===0)t!==null&&fg(t),n.callbackNode=null,n.callbackPriority=0;else if(e=i&-i,n.callbackPriority!==e){if(t!=null&&fg(t),e===1)n.tag===0?R1(i0.bind(null,n)):Ry(i0.bind(null,n)),T1(function(){!(ct&6)&&ks()}),t=null;else{switch(iy(i)){case 1:t=Im;break;case 4:t=ey;break;case 16:t=_f;break;case 536870912:t=ty;break;default:t=_f}t=AS(t,xS.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function xS(n,e){if(Zc=-1,Qc=0,ct&6)throw Error(re(327));var t=n.callbackNode;if(wa()&&n.callbackNode!==t)return null;var i=gf(n,n===fn?gn:0);if(i===0)return null;if(i&30||i&n.expiredLanes||e)e=If(n,i);else{e=i;var r=ct;ct|=2;var s=SS();(fn!==n||gn!==e)&&(Rr=null,Ha=Xt()+500,lo(n,e));do try{$1();break}catch(a){yS(n,a)}while(!0);qm(),Df.current=s,ct=r,Kt!==null?e=0:(fn=null,gn=0,e=nn)}if(e!==0){if(e===2&&(r=dp(n),r!==0&&(i=r,e=Bp(n,r))),e===1)throw t=gu,lo(n,0),ss(n,i),ti(n,Xt()),t;if(e===6)ss(n,i);else{if(r=n.current.alternate,!(i&30)&&!Y1(r)&&(e=If(n,i),e===2&&(s=dp(n),s!==0&&(i=s,e=Bp(n,s))),e===1))throw t=gu,lo(n,0),ss(n,i),ti(n,Xt()),t;switch(n.finishedWork=r,n.finishedLanes=i,e){case 0:case 1:throw Error(re(345));case 2:$s(n,$n,Rr);break;case 3:if(ss(n,i),(i&130023424)===i&&(e=u_+500-Xt(),10<e)){if(gf(n,0)!==0)break;if(r=n.suspendedLanes,(r&i)!==i){Vn(),n.pingedLanes|=n.suspendedLanes&r;break}n.timeoutHandle=yp($s.bind(null,n,$n,Rr),e);break}$s(n,$n,Rr);break;case 4:if(ss(n,i),(i&4194240)===i)break;for(e=n.eventTimes,r=-1;0<i;){var o=31-rr(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Xt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*j1(i/1960))-i,10<i){n.timeoutHandle=yp($s.bind(null,n,$n,Rr),i);break}$s(n,$n,Rr);break;case 5:$s(n,$n,Rr);break;default:throw Error(re(329))}}}return ti(n,Xt()),n.callbackNode===t?xS.bind(null,n):null}function Bp(n,e){var t=Bl;return n.current.memoizedState.isDehydrated&&(lo(n,e).flags|=256),n=If(n,e),n!==2&&(e=$n,$n=t,e!==null&&Hp(e)),n}function Hp(n){$n===null?$n=n:$n.push.apply($n,n)}function Y1(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var i=0;i<t.length;i++){var r=t[i],s=r.getSnapshot;r=r.value;try{if(!or(s(),r))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ss(n,e){for(e&=~l_,e&=~dd,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-rr(e),i=1<<t;n[t]=-1,e&=~i}}function i0(n){if(ct&6)throw Error(re(327));wa();var e=gf(n,0);if(!(e&1))return ti(n,Xt()),null;var t=If(n,e);if(n.tag!==0&&t===2){var i=dp(n);i!==0&&(e=i,t=Bp(n,i))}if(t===1)throw t=gu,lo(n,0),ss(n,e),ti(n,Xt()),t;if(t===6)throw Error(re(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,$s(n,$n,Rr),ti(n,Xt()),null}function c_(n,e){var t=ct;ct|=1;try{return n(e)}finally{ct=t,ct===0&&(Ha=Xt()+500,ld&&ks())}}function wo(n){as!==null&&as.tag===0&&!(ct&6)&&wa();var e=ct;ct|=1;var t=Vi.transition,i=vt;try{if(Vi.transition=null,vt=1,n)return n()}finally{vt=i,Vi.transition=t,ct=e,!(ct&6)&&ks()}}function f_(){pi=pa.current,Pt(pa)}function lo(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,E1(t)),Kt!==null)for(t=Kt.return;t!==null;){var i=t;switch(Xm(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Mf();break;case 3:za(),Pt(Jn),Pt(Dn),e_();break;case 5:Jm(i);break;case 4:za();break;case 13:Pt(Ot);break;case 19:Pt(Ot);break;case 10:$m(i.type._context);break;case 22:case 23:f_()}t=t.return}if(fn=n,Kt=n=Ms(n.current,null),gn=pi=e,nn=0,gu=null,l_=dd=To=0,$n=Bl=null,ro!==null){for(e=0;e<ro.length;e++)if(t=ro[e],i=t.interleaved,i!==null){t.interleaved=null;var r=i.next,s=t.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}t.pending=i}ro=null}return n}function yS(n,e){do{var t=Kt;try{if(qm(),qc.current=Lf,Pf){for(var i=zt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Pf=!1}if(Eo=0,cn=en=zt=null,kl=!1,pu=0,a_.current=null,t===null||t.return===null){nn=1,gu=e,Kt=null;break}e:{var s=n,o=t.return,a=t,l=e;if(e=gn,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,c=a,f=c.tag;if(!(c.mode&1)&&(f===0||f===11||f===15)){var d=c.alternate;d?(c.updateQueue=d.updateQueue,c.memoizedState=d.memoizedState,c.lanes=d.lanes):(c.updateQueue=null,c.memoizedState=null)}var p=Wg(o);if(p!==null){p.flags&=-257,Xg(p,o,a,s,e),p.mode&1&&Vg(s,u,e),e=p,l=u;var g=e.updateQueue;if(g===null){var _=new Set;_.add(l),e.updateQueue=_}else g.add(l);break e}else{if(!(e&1)){Vg(s,u,e),d_();break e}l=Error(re(426))}}else if(Dt&&a.mode&1){var m=Wg(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Xg(m,o,a,s,e),jm(Ba(l,a));break e}}s=l=Ba(l,a),nn!==4&&(nn=2),Bl===null?Bl=[s]:Bl.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var h=iS(s,l,e);Fg(s,h);break e;case 1:a=l;var v=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(ys===null||!ys.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=rS(s,a,e);Fg(s,y);break e}}s=s.return}while(s!==null)}ES(t)}catch(w){e=w,Kt===t&&t!==null&&(Kt=t=t.return);continue}break}while(!0)}function SS(){var n=Df.current;return Df.current=Lf,n===null?Lf:n}function d_(){(nn===0||nn===3||nn===2)&&(nn=4),fn===null||!(To&268435455)&&!(dd&268435455)||ss(fn,gn)}function If(n,e){var t=ct;ct|=2;var i=SS();(fn!==n||gn!==e)&&(Rr=null,lo(n,e));do try{q1();break}catch(r){yS(n,r)}while(!0);if(qm(),ct=t,Df.current=i,Kt!==null)throw Error(re(261));return fn=null,gn=0,nn}function q1(){for(;Kt!==null;)MS(Kt)}function $1(){for(;Kt!==null&&!yT();)MS(Kt)}function MS(n){var e=wS(n.alternate,n,pi);n.memoizedProps=n.pendingProps,e===null?ES(n):Kt=e,a_.current=null}function ES(n){var e=n;do{var t=e.alternate;if(n=e.return,e.flags&32768){if(t=G1(t,e),t!==null){t.flags&=32767,Kt=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{nn=6,Kt=null;return}}else if(t=H1(t,e,pi),t!==null){Kt=t;return}if(e=e.sibling,e!==null){Kt=e;return}Kt=e=n}while(e!==null);nn===0&&(nn=5)}function $s(n,e,t){var i=vt,r=Vi.transition;try{Vi.transition=null,vt=1,K1(n,e,t,i)}finally{Vi.transition=r,vt=i}return null}function K1(n,e,t,i){do wa();while(as!==null);if(ct&6)throw Error(re(327));t=n.finishedWork;var r=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(re(177));n.callbackNode=null,n.callbackPriority=0;var s=t.lanes|t.childLanes;if(PT(n,s),n===fn&&(Kt=fn=null,gn=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||nc||(nc=!0,AS(_f,function(){return wa(),null})),s=(t.flags&15990)!==0,t.subtreeFlags&15990||s){s=Vi.transition,Vi.transition=null;var o=vt;vt=1;var a=ct;ct|=4,a_.current=null,W1(n,t),gS(t,n),_1(vp),vf=!!gp,vp=gp=null,n.current=t,X1(t),ST(),ct=a,vt=o,Vi.transition=s}else n.current=t;if(nc&&(nc=!1,as=n,Uf=r),s=n.pendingLanes,s===0&&(ys=null),TT(t.stateNode),ti(n,Xt()),e!==null)for(i=n.onRecoverableError,t=0;t<e.length;t++)r=e[t],i(r.value,{componentStack:r.stack,digest:r.digest});if(Nf)throw Nf=!1,n=kp,kp=null,n;return Uf&1&&n.tag!==0&&wa(),s=n.pendingLanes,s&1?n===zp?Hl++:(Hl=0,zp=n):Hl=0,ks(),null}function wa(){if(as!==null){var n=iy(Uf),e=Vi.transition,t=vt;try{if(Vi.transition=null,vt=16>n?16:n,as===null)var i=!1;else{if(n=as,as=null,Uf=0,ct&6)throw Error(re(331));var r=ct;for(ct|=4,Se=n.current;Se!==null;){var s=Se,o=s.child;if(Se.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(Se=u;Se!==null;){var c=Se;switch(c.tag){case 0:case 11:case 15:zl(8,c,s)}var f=c.child;if(f!==null)f.return=c,Se=f;else for(;Se!==null;){c=Se;var d=c.sibling,p=c.return;if(pS(c),c===u){Se=null;break}if(d!==null){d.return=p,Se=d;break}Se=p}}}var g=s.alternate;if(g!==null){var _=g.child;if(_!==null){g.child=null;do{var m=_.sibling;_.sibling=null,_=m}while(_!==null)}}Se=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Se=o;else e:for(;Se!==null;){if(s=Se,s.flags&2048)switch(s.tag){case 0:case 11:case 15:zl(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,Se=h;break e}Se=s.return}}var v=n.current;for(Se=v;Se!==null;){o=Se;var x=o.child;if(o.subtreeFlags&2064&&x!==null)x.return=o,Se=x;else e:for(o=v;Se!==null;){if(a=Se,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:fd(9,a)}}catch(w){Gt(a,a.return,w)}if(a===o){Se=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,Se=y;break e}Se=a.return}}if(ct=r,ks(),gr&&typeof gr.onPostCommitFiberRoot=="function")try{gr.onPostCommitFiberRoot(id,n)}catch{}i=!0}return i}finally{vt=t,Vi.transition=e}}return!1}function r0(n,e,t){e=Ba(t,e),e=iS(n,e,1),n=xs(n,e,1),e=Vn(),n!==null&&(Lu(n,1,e),ti(n,e))}function Gt(n,e,t){if(n.tag===3)r0(n,n,t);else for(;e!==null;){if(e.tag===3){r0(e,n,t);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ys===null||!ys.has(i))){n=Ba(t,n),n=rS(e,n,1),e=xs(e,n,1),n=Vn(),e!==null&&(Lu(e,1,n),ti(e,n));break}}e=e.return}}function Z1(n,e,t){var i=n.pingCache;i!==null&&i.delete(e),e=Vn(),n.pingedLanes|=n.suspendedLanes&t,fn===n&&(gn&t)===t&&(nn===4||nn===3&&(gn&130023424)===gn&&500>Xt()-u_?lo(n,0):l_|=t),ti(n,e)}function TS(n,e){e===0&&(n.mode&1?(e=ju,ju<<=1,!(ju&130023424)&&(ju=4194304)):e=1);var t=Vn();n=Vr(n,e),n!==null&&(Lu(n,e,t),ti(n,t))}function Q1(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),TS(n,t)}function J1(n,e){var t=0;switch(n.tag){case 13:var i=n.stateNode,r=n.memoizedState;r!==null&&(t=r.retryLane);break;case 19:i=n.stateNode;break;default:throw Error(re(314))}i!==null&&i.delete(e),TS(n,t)}var wS;wS=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||Jn.current)Qn=!0;else{if(!(n.lanes&t)&&!(e.flags&128))return Qn=!1,B1(n,e,t);Qn=!!(n.flags&131072)}else Qn=!1,Dt&&e.flags&1048576&&by(e,wf,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Kc(n,e),n=e.pendingProps;var r=Oa(e,Dn.current);Ta(e,t),r=n_(null,e,i,n,r,t);var s=i_();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,ei(i)?(s=!0,Ef(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Zm(e),r.updater=cd,e.stateNode=r,r._reactInternals=e,Cp(e,i,n,t),e=Pp(null,e,i,!0,s,t)):(e.tag=0,Dt&&s&&Wm(e),kn(null,e,r,t),e=e.child),e;case 16:i=e.elementType;e:{switch(Kc(n,e),n=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=tw(i),n=Qi(i,n),r){case 0:e=bp(null,e,i,n,t);break e;case 1:e=qg(null,e,i,n,t);break e;case 11:e=jg(null,e,i,n,t);break e;case 14:e=Yg(null,e,i,Qi(i.type,n),t);break e}throw Error(re(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Qi(i,r),bp(n,e,i,r,t);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Qi(i,r),qg(n,e,i,r,t);case 3:e:{if(lS(e),n===null)throw Error(re(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Iy(n,e),Rf(e,i,null,t);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Ba(Error(re(423)),e),e=$g(n,e,i,t,r);break e}else if(i!==r){r=Ba(Error(re(424)),e),e=$g(n,e,i,t,r);break e}else for(yi=vs(e.stateNode.containerInfo.firstChild),Ei=e,Dt=!0,er=null,t=Ny(e,null,i,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Fa(),i===r){e=Wr(n,e,t);break e}kn(n,e,i,t)}e=e.child}return e;case 5:return Oy(e),n===null&&Tp(e),i=e.type,r=e.pendingProps,s=n!==null?n.memoizedProps:null,o=r.children,xp(i,r)?o=null:s!==null&&xp(i,s)&&(e.flags|=32),aS(n,e),kn(n,e,o,t),e.child;case 6:return n===null&&Tp(e),null;case 13:return uS(n,e,t);case 4:return Qm(e,e.stateNode.containerInfo),i=e.pendingProps,n===null?e.child=ka(e,null,i,t):kn(n,e,i,t),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Qi(i,r),jg(n,e,i,r,t);case 7:return kn(n,e,e.pendingProps,t),e.child;case 8:return kn(n,e,e.pendingProps.children,t),e.child;case 12:return kn(n,e,e.pendingProps.children,t),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,At(Af,i._currentValue),i._currentValue=o,s!==null)if(or(s.value,o)){if(s.children===r.children&&!Jn.current){e=Wr(n,e,t);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=kr(-1,t&-t),l.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?l.next=l:(l.next=c.next,c.next=l),u.pending=l}}s.lanes|=t,l=s.alternate,l!==null&&(l.lanes|=t),wp(s.return,t,e),a.lanes|=t;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(re(341));o.lanes|=t,a=o.alternate,a!==null&&(a.lanes|=t),wp(o,t,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}kn(n,e,r.children,t),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Ta(e,t),r=Xi(r),i=i(r),e.flags|=1,kn(n,e,i,t),e.child;case 14:return i=e.type,r=Qi(i,e.pendingProps),r=Qi(i.type,r),Yg(n,e,i,r,t);case 15:return sS(n,e,e.type,e.pendingProps,t);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Qi(i,r),Kc(n,e),e.tag=1,ei(i)?(n=!0,Ef(e)):n=!1,Ta(e,t),nS(e,i,r),Cp(e,i,r,t),Pp(null,e,i,!0,n,t);case 19:return cS(n,e,t);case 22:return oS(n,e,t)}throw Error(re(156,e.tag))};function AS(n,e){return Jx(n,e)}function ew(n,e,t,i){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Bi(n,e,t,i){return new ew(n,e,t,i)}function h_(n){return n=n.prototype,!(!n||!n.isReactComponent)}function tw(n){if(typeof n=="function")return h_(n)?1:0;if(n!=null){if(n=n.$$typeof,n===Dm)return 11;if(n===Nm)return 14}return 2}function Ms(n,e){var t=n.alternate;return t===null?(t=Bi(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function Jc(n,e,t,i,r,s){var o=2;if(i=n,typeof n=="function")h_(n)&&(o=1);else if(typeof n=="string")o=5;else e:switch(n){case ra:return uo(t.children,r,s,e);case Lm:o=8,r|=8;break;case Zh:return n=Bi(12,t,e,r|2),n.elementType=Zh,n.lanes=s,n;case Qh:return n=Bi(13,t,e,r),n.elementType=Qh,n.lanes=s,n;case Jh:return n=Bi(19,t,e,r),n.elementType=Jh,n.lanes=s,n;case Ox:return hd(t,r,s,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case Ux:o=10;break e;case Ix:o=9;break e;case Dm:o=11;break e;case Nm:o=14;break e;case ns:o=16,i=null;break e}throw Error(re(130,n==null?n:typeof n,""))}return e=Bi(o,t,e,r),e.elementType=n,e.type=i,e.lanes=s,e}function uo(n,e,t,i){return n=Bi(7,n,i,e),n.lanes=t,n}function hd(n,e,t,i){return n=Bi(22,n,i,e),n.elementType=Ox,n.lanes=t,n.stateNode={isHidden:!1},n}function nh(n,e,t){return n=Bi(6,n,null,e),n.lanes=t,n}function ih(n,e,t){return e=Bi(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function nw(n,e,t,i,r){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Fd(0),this.expirationTimes=Fd(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Fd(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function p_(n,e,t,i,r,s,o,a,l){return n=new nw(n,e,t,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Bi(3,null,null,e),n.current=s,s.stateNode=n,s.memoizedState={element:i,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Zm(s),n}function iw(n,e,t){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ia,key:i==null?null:""+i,children:n,containerInfo:e,implementation:t}}function CS(n){if(!n)return Ps;n=n._reactInternals;e:{if(Do(n)!==n||n.tag!==1)throw Error(re(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(ei(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(re(171))}if(n.tag===1){var t=n.type;if(ei(t))return Cy(n,t,e)}return e}function RS(n,e,t,i,r,s,o,a,l){return n=p_(t,i,!0,n,r,s,o,a,l),n.context=CS(null),t=n.current,i=Vn(),r=Ss(t),s=kr(i,r),s.callback=e??null,xs(t,s,r),n.current.lanes=r,Lu(n,r,i),ti(n,i),n}function pd(n,e,t,i){var r=e.current,s=Vn(),o=Ss(r);return t=CS(t),e.context===null?e.context=t:e.pendingContext=t,e=kr(s,o),e.payload={element:n},i=i===void 0?null:i,i!==null&&(e.callback=i),n=xs(r,e,o),n!==null&&(sr(n,r,o,s),Yc(n,r,o)),o}function Of(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function s0(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function m_(n,e){s0(n,e),(n=n.alternate)&&s0(n,e)}function rw(){return null}var bS=typeof reportError=="function"?reportError:function(n){console.error(n)};function __(n){this._internalRoot=n}md.prototype.render=__.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(re(409));pd(n,e,null,null)};md.prototype.unmount=__.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;wo(function(){pd(null,n,null,null)}),e[Gr]=null}};function md(n){this._internalRoot=n}md.prototype.unstable_scheduleHydration=function(n){if(n){var e=oy();n={blockedOn:null,target:n,priority:e};for(var t=0;t<rs.length&&e!==0&&e<rs[t].priority;t++);rs.splice(t,0,n),t===0&&ly(n)}};function g_(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function _d(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function o0(){}function sw(n,e,t,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=Of(o);s.call(u)}}var o=RS(e,i,n,0,null,!1,!1,"",o0);return n._reactRootContainer=o,n[Gr]=o.current,uu(n.nodeType===8?n.parentNode:n),wo(),o}for(;r=n.lastChild;)n.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var u=Of(l);a.call(u)}}var l=p_(n,0,!1,null,null,!1,!1,"",o0);return n._reactRootContainer=l,n[Gr]=l.current,uu(n.nodeType===8?n.parentNode:n),wo(function(){pd(e,l,t,i)}),l}function gd(n,e,t,i,r){var s=t._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Of(o);a.call(l)}}pd(e,o,n,r)}else o=sw(t,e,n,r,i);return Of(o)}ry=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=El(e.pendingLanes);t!==0&&(Om(e,t|1),ti(e,Xt()),!(ct&6)&&(Ha=Xt()+500,ks()))}break;case 13:wo(function(){var i=Vr(n,1);if(i!==null){var r=Vn();sr(i,n,1,r)}}),m_(n,1)}};Fm=function(n){if(n.tag===13){var e=Vr(n,134217728);if(e!==null){var t=Vn();sr(e,n,134217728,t)}m_(n,134217728)}};sy=function(n){if(n.tag===13){var e=Ss(n),t=Vr(n,e);if(t!==null){var i=Vn();sr(t,n,e,i)}m_(n,e)}};oy=function(){return vt};ay=function(n,e){var t=vt;try{return vt=n,e()}finally{vt=t}};up=function(n,e,t){switch(e){case"input":if(np(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var i=t[e];if(i!==n&&i.form===n.form){var r=ad(i);if(!r)throw Error(re(90));kx(i),np(i,r)}}}break;case"textarea":Bx(n,t);break;case"select":e=t.value,e!=null&&ya(n,!!t.multiple,e,!1)}};Yx=c_;qx=wo;var ow={usingClientEntryPoint:!1,Events:[Nu,la,ad,Xx,jx,c_]},dl={findFiberByHostInstance:io,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},aw={bundleType:dl.bundleType,version:dl.version,rendererPackageName:dl.rendererPackageName,rendererConfig:dl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:qr.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Zx(n),n===null?null:n.stateNode},findFiberByHostInstance:dl.findFiberByHostInstance||rw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ic=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ic.isDisabled&&ic.supportsFiber)try{id=ic.inject(aw),gr=ic}catch{}}Ri.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ow;Ri.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g_(e))throw Error(re(200));return iw(n,e,null,t)};Ri.createRoot=function(n,e){if(!g_(n))throw Error(re(299));var t=!1,i="",r=bS;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=p_(n,1,!1,null,null,t,!1,i,r),n[Gr]=e.current,uu(n.nodeType===8?n.parentNode:n),new __(e)};Ri.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(re(188)):(n=Object.keys(n).join(","),Error(re(268,n)));return n=Zx(e),n=n===null?null:n.stateNode,n};Ri.flushSync=function(n){return wo(n)};Ri.hydrate=function(n,e,t){if(!_d(e))throw Error(re(200));return gd(null,n,e,!0,t)};Ri.hydrateRoot=function(n,e,t){if(!g_(n))throw Error(re(405));var i=t!=null&&t.hydratedSources||null,r=!1,s="",o=bS;if(t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),e=RS(e,null,n,1,t??null,r,!1,s,o),n[Gr]=e.current,uu(n),i)for(n=0;n<i.length;n++)t=i[n],r=t._getVersion,r=r(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,r]:e.mutableSourceEagerHydrationData.push(t,r);return new md(e)};Ri.render=function(n,e,t){if(!_d(e))throw Error(re(200));return gd(null,n,e,!1,t)};Ri.unmountComponentAtNode=function(n){if(!_d(n))throw Error(re(40));return n._reactRootContainer?(wo(function(){gd(null,null,n,!1,function(){n._reactRootContainer=null,n[Gr]=null})}),!0):!1};Ri.unstable_batchedUpdates=c_;Ri.unstable_renderSubtreeIntoContainer=function(n,e,t,i){if(!_d(t))throw Error(re(200));if(n==null||n._reactInternals===void 0)throw Error(re(38));return gd(n,e,t,!1,i)};Ri.version="18.3.1-next-f1338f8080-20240426";function PS(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(PS)}catch(n){console.error(n)}}PS(),Px.exports=Ri;var lw=Px.exports,LS,a0=lw;LS=a0.createRoot,a0.hydrateRoot;const uw={pt:{nav:{links:[{href:"#tour",label:"A app"},{href:"#perfis",label:"Perfis"},{href:"#missao",label:"Missão"}],cta:"Entrar"},hero:{eyebrow:"AgTech · Moçambique",titlePre:"Tecnologia que ",titleEm:"cultiva",titlePost:" esperança",lead:"A IAgroMoz liga o saber da terra à inteligência artificial — planta com dados, vende com comunidade, cresce com quem cultiva ao teu lado.",ctaPrimary:"Entrar na plataforma →",ctaGhost:"Ver a app por dentro",chips:["Funciona offline","Multi-idioma","Texto, voz ou foto"],scrollHint:"Faz scroll"},tour:{eyebrow:"A app por dentro",title:"Percorre a IAgroMoz",lead:"Desliza pelas telas — Feed, Chat, Técnicas, Mercado e Perfis.",captions:[{num:"01 · Perfis",title:"Escolhe o teu perfil",body:"Começa por aqui: Utilizador, Produtor ou Vendedor — cada conta com as suas permissões. Cria a tua em segundos e começa a plantar com dados.",screen:"criar"},{num:"02 · Feed",title:"Tudo acontece no Feed",body:"A rede social do campo e a página inicial — visível mesmo sem sessão. Partilha colheitas, dicas e avisos; gosta, comenta e partilha.",screen:"feed"},{num:"03 · Chat IA",title:"Pergunta e recebe conselhos",body:"Descreve o problema por texto ou envia uma foto da planta. A IA responde na tua língua e guarda o histórico em sessões.",screen:"chat"},{num:"04 · Técnicas",title:"Aprende com a comunidade",body:"Boas práticas submetidas por todos. Cada técnica fica em votação (👍/👎) até ser aprovada ou reprovada pela comunidade.",screen:"tecnicas"},{num:"05 · Mercado",title:"Compra e vende",body:"Publica produtos com preço, stock e distrito. Compradores reservam, negoceiam por chat e avaliam produto e vendedor.",screen:"mercado"}],dotLabels:["Perfis","Feed","Chat","Técnicas","Mercado"]},profiles:{eyebrow:"Perfis de utilizador",title:"Um lugar para cada papel",lead:"Da pessoa curiosa ao vendedor com NUIT — cada perfil tem as suas permissões.",cards:[{key:"user",badge:"Utilizador comum",title:"Explora e aprende",desc:"A pessoa que quer descobrir a plataforma.",can:["Ver o Feed e o Mercado","Votar em Técnicas","Conversar com o Chat IA"],cannot:["Publicar ou vender"]},{key:"producer",badge:"Produtor",title:"Cultiva, partilha, vende",desc:"Quem cultiva ou cria — com painel próprio de gestão.",can:["Publicar posts no Feed","Vender no Mercado","Submeter Técnicas","Painel de vendas e feed"],cannot:[]},{key:"seller",badge:"Vendedor",title:"Foco no negócio",desc:"Conta comercial — individual ou loja/empresa, com NUIT.",can:["Vender no Mercado","Perfil de loja/empresa"],cannot:["Publicar no Feed","Votar em Técnicas"]}]},feedback:{web:{eyebrow:"Quem está a testar",title:"Vozes dos nossos primeiros testers",lead:"Recortes reais de quem já pôs a IAgroMoz à prova, enquanto entramos em produção.",hint:"↓ Faz scroll — a roda gira"},mobile:{eyebrow:"Quem está a testar",title:"Vozes dos primeiros testers",lead:"Recortes de quem já pôs a IAgroMoz à prova."}},mission:{eyebrow:"A nossa missão",quote:"Democratizar o acesso à agricultura em Moçambique. Transformar dados em colheitas, sonhos em realidade."},cta:{eyebrow:"Fase de produção",title:"Pronto para plantar com dados?",lead:"A IAgroMoz está a entrar em produção. Entra na plataforma e faz parte da rede que liga agricultura e inteligência.",button:"Entrar na plataforma →",team:"Um projeto da equipa "},footer:{small:"© 2026 IAgroMoz. Tecnologia que cultiva esperança."}},en:{nav:{links:[{href:"#tour",label:"The app"},{href:"#perfis",label:"Profiles"},{href:"#missao",label:"Mission"}],cta:"Enter"},hero:{eyebrow:"AgTech · Mozambique",titlePre:"Technology that ",titleEm:"cultivates",titlePost:" hope",lead:"IAgroMoz connects the wisdom of the land with artificial intelligence — plant with data, sell with community, grow alongside those who farm with you.",ctaPrimary:"Enter the platform →",ctaGhost:"See the app from inside",chips:["Works offline","Multi-language","Text, voice or photo"],scrollHint:"Scroll"},tour:{eyebrow:"The app from inside",title:"Take a tour of IAgroMoz",lead:"Slide through the screens — Feed, Chat, Techniques, Marketplace and Profiles.",captions:[{num:"01 · Profiles",title:"Choose your profile",body:"Start here: User, Producer or Seller — each account with its own permissions. Create yours in seconds and start planting with data.",screen:"criar"},{num:"02 · Feed",title:"Everything happens in the Feed",body:"The social network of the field and the home screen — visible even without a session. Share harvests, tips and alerts; like, comment and share.",screen:"feed"},{num:"03 · AI Chat",title:"Ask and get advice",body:"Describe the problem by text or send a photo of the plant. The AI replies in your language and keeps the history in sessions.",screen:"chat"},{num:"04 · Techniques",title:"Learn with the community",body:"Good practices submitted by everyone. Each technique goes to a vote (👍/👎) until it is approved or rejected by the community.",screen:"tecnicas"},{num:"05 · Marketplace",title:"Buy and sell",body:"Publish products with price, stock and district. Buyers reserve, negotiate by chat and rate the product and seller.",screen:"mercado"}],dotLabels:["Profiles","Feed","Chat","Techniques","Marketplace"]},profiles:{eyebrow:"User profiles",title:"A place for every role",lead:"From the curious visitor to the seller with a tax ID — each profile has its own permissions.",cards:[{key:"user",badge:"Regular user",title:"Explore and learn",desc:"The person who wants to discover the platform.",can:["View the Feed and Marketplace","Vote on Techniques","Chat with the AI assistant"],cannot:["Publish or sell"]},{key:"producer",badge:"Producer",title:"Grow, share, sell",desc:"Whoever farms or creates — with their own management dashboard.",can:["Publish posts on the Feed","Sell on the Marketplace","Submit Techniques","Sales and feed dashboard"],cannot:[]},{key:"seller",badge:"Seller",title:"Focused on business",desc:"A commercial account — individual or store/company, with a tax ID.",can:["Sell on the Marketplace","Store/company profile"],cannot:["Publish on the Feed","Vote on Techniques"]}]},feedback:{web:{eyebrow:"Who is testing",title:"Voices from our first testers",lead:"Real snippets from people already putting IAgroMoz to the test, while we head into production.",hint:"↓ Scroll — the wheel turns"},mobile:{eyebrow:"Who is testing",title:"Voices from the first testers",lead:"Snippets from people already putting IAgroMoz to the test."}},mission:{eyebrow:"Our mission",quote:"Democratize access to agriculture in Mozambique. Turn data into harvests, dreams into reality."},cta:{eyebrow:"Production phase",title:"Ready to plant with data?",lead:"IAgroMoz is heading into production. Enter the platform and be part of the network connecting agriculture and intelligence.",button:"Enter the platform →",team:"A project by the "},footer:{small:"© 2026 IAgroMoz. Technology that cultivates hope."}}},DS=dt.createContext();function cw({children:n}){const[e,t]=dt.useState("pt");return dt.useEffect(()=>{document.documentElement.lang=e},[e]),$.jsx(DS.Provider,{value:{lang:e,setLang:t,t:uw[e]},children:n})}const Sr=()=>dt.useContext(DS),NS="/assets/logo-BeZE8C6A.png";function fw(){const{lang:n,setLang:e,t}=Sr();return $.jsx("header",{className:"nav",children:$.jsxs("div",{className:"wrap nav-in",children:[$.jsxs("a",{className:"brand",href:"#top",children:[$.jsx("img",{src:NS,alt:"IAgroMoz"}),$.jsxs("span",{children:["IAgro",$.jsx("b",{children:"Moz"})]})]}),$.jsx("nav",{className:"nav-links",children:t.nav.links.map(i=>$.jsx("a",{href:i.href,children:i.label},i.href))}),$.jsxs("div",{className:"nav-right",children:[$.jsxs("div",{className:"lang",children:[$.jsx("button",{className:n==="pt"?"on":"",onClick:()=>e("pt"),children:"PT"}),$.jsx("button",{className:n==="en"?"on":"",onClick:()=>e("en"),children:"EN"})]}),$.jsx("a",{className:"btn btn-primary",href:"https://www.iagromoz.com",children:t.nav.cta})]})]})})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const v_="160",dw=0,l0=1,hw=2,US=1,pw=2,Cr=3,Ls=0,ni=1,hr=2,Es=0,Aa=1,Ff=2,u0=3,c0=4,mw=5,to=100,_w=101,gw=102,f0=103,d0=104,vw=200,xw=201,yw=202,Sw=203,Gp=204,Vp=205,Mw=206,Ew=207,Tw=208,ww=209,Aw=210,Cw=211,Rw=212,bw=213,Pw=214,Lw=0,Dw=1,Nw=2,kf=3,Uw=4,Iw=5,Ow=6,Fw=7,IS=0,kw=1,zw=2,Ts=0,Bw=1,Hw=2,Gw=3,Vw=4,Ww=5,Xw=6,OS=300,Ga=301,Va=302,Wp=303,Xp=304,vd=306,jp=1e3,nr=1001,Yp=1002,Hn=1003,h0=1004,rh=1005,Ii=1006,jw=1007,vu=1008,ws=1009,Yw=1010,qw=1011,x_=1012,FS=1013,ls=1014,us=1015,xu=1016,kS=1017,zS=1018,co=1020,$w=1021,ir=1023,Kw=1024,Zw=1025,fo=1026,Wa=1027,Qw=1028,BS=1029,Jw=1030,HS=1031,GS=1033,sh=33776,oh=33777,ah=33778,lh=33779,p0=35840,m0=35841,_0=35842,g0=35843,VS=36196,v0=37492,x0=37496,y0=37808,S0=37809,M0=37810,E0=37811,T0=37812,w0=37813,A0=37814,C0=37815,R0=37816,b0=37817,P0=37818,L0=37819,D0=37820,N0=37821,uh=36492,U0=36494,I0=36495,eA=36283,O0=36284,F0=36285,k0=36286,WS=3e3,ho=3001,tA=3200,nA=3201,iA=0,rA=1,zi="",pn="srgb",Xr="srgb-linear",y_="display-p3",xd="display-p3-linear",zf="linear",bt="srgb",Bf="rec709",Hf="p3",Io=7680,z0=519,sA=512,oA=513,aA=514,XS=515,lA=516,uA=517,cA=518,fA=519,B0=35044,H0="300 es",qp=1035,Ir=2e3,Gf=2001;class tl{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const En=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ch=Math.PI/180,$p=180/Math.PI;function Iu(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(En[n&255]+En[n>>8&255]+En[n>>16&255]+En[n>>24&255]+"-"+En[e&255]+En[e>>8&255]+"-"+En[e>>16&15|64]+En[e>>24&255]+"-"+En[t&63|128]+En[t>>8&255]+"-"+En[t>>16&255]+En[t>>24&255]+En[i&255]+En[i>>8&255]+En[i>>16&255]+En[i>>24&255]).toLowerCase()}function Kn(n,e,t){return Math.max(e,Math.min(t,n))}function dA(n,e){return(n%e+e)%e}function fh(n,e,t){return(1-t)*n+t*e}function G0(n){return(n&n-1)===0&&n!==0}function Kp(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function hl(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Yn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class St{constructor(e=0,t=0){St.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Kn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nt{constructor(e,t,i,r,s,o,a,l,u){nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,u)}set(e,t,i,r,s,o,a,l,u){const c=this.elements;return c[0]=e,c[1]=r,c[2]=a,c[3]=t,c[4]=s,c[5]=l,c[6]=i,c[7]=o,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],c=i[4],f=i[7],d=i[2],p=i[5],g=i[8],_=r[0],m=r[3],h=r[6],v=r[1],x=r[4],y=r[7],w=r[2],T=r[5],S=r[8];return s[0]=o*_+a*v+l*w,s[3]=o*m+a*x+l*T,s[6]=o*h+a*y+l*S,s[1]=u*_+c*v+f*w,s[4]=u*m+c*x+f*T,s[7]=u*h+c*y+f*S,s[2]=d*_+p*v+g*w,s[5]=d*m+p*x+g*T,s[8]=d*h+p*y+g*S,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8];return t*o*c-t*a*u-i*s*c+i*a*l+r*s*u-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],f=c*o-a*u,d=a*l-c*s,p=u*s-o*l,g=t*f+i*d+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(r*u-c*i)*_,e[2]=(a*i-r*o)*_,e[3]=d*_,e[4]=(c*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=p*_,e[7]=(i*l-u*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*o+u*a)+o+e,-r*u,r*l,-r*(-u*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(dh.makeScale(e,t)),this}rotate(e){return this.premultiply(dh.makeRotation(-e)),this}translate(e,t){return this.premultiply(dh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const dh=new nt;function jS(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Vf(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function hA(){const n=Vf("canvas");return n.style.display="block",n}const V0={};function Gl(n){n in V0||(V0[n]=!0,console.warn(n))}const W0=new nt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),X0=new nt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),rc={[Xr]:{transfer:zf,primaries:Bf,toReference:n=>n,fromReference:n=>n},[pn]:{transfer:bt,primaries:Bf,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[xd]:{transfer:zf,primaries:Hf,toReference:n=>n.applyMatrix3(X0),fromReference:n=>n.applyMatrix3(W0)},[y_]:{transfer:bt,primaries:Hf,toReference:n=>n.convertSRGBToLinear().applyMatrix3(X0),fromReference:n=>n.applyMatrix3(W0).convertLinearToSRGB()}},pA=new Set([Xr,xd]),yt={enabled:!0,_workingColorSpace:Xr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!pA.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=rc[e].toReference,r=rc[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return rc[n].primaries},getTransfer:function(n){return n===zi?zf:rc[n].transfer}};function Ca(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function hh(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Oo;class YS{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Oo===void 0&&(Oo=Vf("canvas")),Oo.width=e.width,Oo.height=e.height;const i=Oo.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Oo}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Vf("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ca(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ca(t[i]/255)*255):t[i]=Ca(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mA=0;class qS{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mA++}),this.uuid=Iu(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ph(r[o].image)):s.push(ph(r[o]))}else s=ph(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ph(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?YS.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _A=0;class ii extends tl{constructor(e=ii.DEFAULT_IMAGE,t=ii.DEFAULT_MAPPING,i=nr,r=nr,s=Ii,o=vu,a=ir,l=ws,u=ii.DEFAULT_ANISOTROPY,c=zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_A++}),this.uuid=Iu(),this.name="",this.source=new qS(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new St(0,0),this.repeat=new St(1,1),this.center=new St(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof c=="string"?this.colorSpace=c:(Gl("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=c===ho?pn:zi),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==OS)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jp:e.x=e.x-Math.floor(e.x);break;case nr:e.x=e.x<0?0:1;break;case Yp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jp:e.y=e.y-Math.floor(e.y);break;case nr:e.y=e.y<0?0:1;break;case Yp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Gl("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===pn?ho:WS}set encoding(e){Gl("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ho?pn:zi}}ii.DEFAULT_IMAGE=null;ii.DEFAULT_MAPPING=OS;ii.DEFAULT_ANISOTROPY=1;class mn{constructor(e=0,t=0,i=0,r=1){mn.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,u=l[0],c=l[4],f=l[8],d=l[1],p=l[5],g=l[9],_=l[2],m=l[6],h=l[10];if(Math.abs(c-d)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(c+d)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(u+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(u+1)/2,y=(p+1)/2,w=(h+1)/2,T=(c+d)/4,S=(f+_)/4,P=(g+m)/4;return x>y&&x>w?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=T/i,s=S/i):y>w?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=T/r,s=P/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=S/s,r=P/s),this.set(i,r,s,t),this}let v=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(d-c)*(d-c));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(f-_)/v,this.z=(d-c)/v,this.w=Math.acos((u+p+h-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gA extends tl{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new mn(0,0,e,t),this.scissorTest=!1,this.viewport=new mn(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Gl("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===ho?pn:zi),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ii,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new ii(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new qS(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ao extends gA{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class $S extends ii{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Hn,this.minFilter=Hn,this.wrapR=nr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vA extends ii{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Hn,this.minFilter=Hn,this.wrapR=nr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ou{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],u=i[r+1],c=i[r+2],f=i[r+3];const d=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=u,e[t+2]=c,e[t+3]=f;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(f!==_||l!==d||u!==p||c!==g){let m=1-a;const h=l*d+u*p+c*g+f*_,v=h>=0?1:-1,x=1-h*h;if(x>Number.EPSILON){const w=Math.sqrt(x),T=Math.atan2(w,h*v);m=Math.sin(m*T)/w,a=Math.sin(a*T)/w}const y=a*v;if(l=l*m+d*y,u=u*m+p*y,c=c*m+g*y,f=f*m+_*y,m===1-a){const w=1/Math.sqrt(l*l+u*u+c*c+f*f);l*=w,u*=w,c*=w,f*=w}}e[t]=l,e[t+1]=u,e[t+2]=c,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],u=i[r+2],c=i[r+3],f=s[o],d=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+c*f+l*p-u*d,e[t+1]=l*g+c*d+u*f-a*p,e[t+2]=u*g+c*p+a*d-l*f,e[t+3]=c*g-a*f-l*d-u*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(i/2),c=a(r/2),f=a(s/2),d=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=d*c*f+u*p*g,this._y=u*p*f-d*c*g,this._z=u*c*g+d*p*f,this._w=u*c*f-d*p*g;break;case"YXZ":this._x=d*c*f+u*p*g,this._y=u*p*f-d*c*g,this._z=u*c*g-d*p*f,this._w=u*c*f+d*p*g;break;case"ZXY":this._x=d*c*f-u*p*g,this._y=u*p*f+d*c*g,this._z=u*c*g+d*p*f,this._w=u*c*f-d*p*g;break;case"ZYX":this._x=d*c*f-u*p*g,this._y=u*p*f+d*c*g,this._z=u*c*g-d*p*f,this._w=u*c*f+d*p*g;break;case"YZX":this._x=d*c*f+u*p*g,this._y=u*p*f+d*c*g,this._z=u*c*g-d*p*f,this._w=u*c*f-d*p*g;break;case"XZY":this._x=d*c*f-u*p*g,this._y=u*p*f-d*c*g,this._z=u*c*g+d*p*f,this._w=u*c*f+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],u=t[2],c=t[6],f=t[10],d=i+a+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(c-l)*p,this._y=(s-u)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(c-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+u)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-u)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+c)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+u)/p,this._y=(l+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Kn(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,u=t._z,c=t._w;return this._x=i*c+o*a+r*u-s*l,this._y=r*c+o*l+s*a-i*u,this._z=s*c+o*u+i*l-r*a,this._w=o*c-i*a-r*l-s*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const u=Math.sqrt(l),c=Math.atan2(u,a),f=Math.sin((1-t)*c)/u,d=Math.sin(t*c)/u;return this._w=o*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{constructor(e=0,t=0,i=0){Y.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(j0.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(j0.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*r-a*i),c=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+l*u+o*f-a*c,this.y=i+l*c+a*u-s*f,this.z=r+l*f+s*c-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return mh.copy(this).projectOnVector(e),this.sub(mh)}reflect(e){return this.sub(mh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Kn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const mh=new Y,j0=new Ou;class Fu{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(qi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(qi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=qi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,qi):qi.fromBufferAttribute(s,o),qi.applyMatrix4(e.matrixWorld),this.expandByPoint(qi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),sc.copy(i.boundingBox)),sc.applyMatrix4(e.matrixWorld),this.union(sc)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,qi),qi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pl),oc.subVectors(this.max,pl),Fo.subVectors(e.a,pl),ko.subVectors(e.b,pl),zo.subVectors(e.c,pl),Kr.subVectors(ko,Fo),Zr.subVectors(zo,ko),Gs.subVectors(Fo,zo);let t=[0,-Kr.z,Kr.y,0,-Zr.z,Zr.y,0,-Gs.z,Gs.y,Kr.z,0,-Kr.x,Zr.z,0,-Zr.x,Gs.z,0,-Gs.x,-Kr.y,Kr.x,0,-Zr.y,Zr.x,0,-Gs.y,Gs.x,0];return!_h(t,Fo,ko,zo,oc)||(t=[1,0,0,0,1,0,0,0,1],!_h(t,Fo,ko,zo,oc))?!1:(ac.crossVectors(Kr,Zr),t=[ac.x,ac.y,ac.z],_h(t,Fo,ko,zo,oc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Mr=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],qi=new Y,sc=new Fu,Fo=new Y,ko=new Y,zo=new Y,Kr=new Y,Zr=new Y,Gs=new Y,pl=new Y,oc=new Y,ac=new Y,Vs=new Y;function _h(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Vs.fromArray(n,s);const a=r.x*Math.abs(Vs.x)+r.y*Math.abs(Vs.y)+r.z*Math.abs(Vs.z),l=e.dot(Vs),u=t.dot(Vs),c=i.dot(Vs);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>a)return!1}return!0}const xA=new Fu,ml=new Y,gh=new Y;class ku{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):xA.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ml.subVectors(e,this.center);const t=ml.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ml,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ml.copy(e.center).add(gh)),this.expandByPoint(ml.copy(e.center).sub(gh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Er=new Y,vh=new Y,lc=new Y,Qr=new Y,xh=new Y,uc=new Y,yh=new Y;class S_{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Er)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Er.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Er.copy(this.origin).addScaledVector(this.direction,t),Er.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){vh.copy(e).add(t).multiplyScalar(.5),lc.copy(t).sub(e).normalize(),Qr.copy(this.origin).sub(vh);const s=e.distanceTo(t)*.5,o=-this.direction.dot(lc),a=Qr.dot(this.direction),l=-Qr.dot(lc),u=Qr.lengthSq(),c=Math.abs(1-o*o);let f,d,p,g;if(c>0)if(f=o*l-a,d=o*a-l,g=s*c,f>=0)if(d>=-g)if(d<=g){const _=1/c;f*=_,d*=_,p=f*(f+o*d+2*a)+d*(o*f+d+2*l)+u}else d=s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+u;else d=-s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+u;else d<=-g?(f=Math.max(0,-(-o*s+a)),d=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+u):d<=g?(f=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+u):(f=Math.max(0,-(o*s+a)),d=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+u);else d=o>0?-s:s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(vh).addScaledVector(lc,d),p}intersectSphere(e,t){Er.subVectors(e.center,this.origin);const i=Er.dot(this.direction),r=Er.dot(Er)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const u=1/this.direction.x,c=1/this.direction.y,f=1/this.direction.z,d=this.origin;return u>=0?(i=(e.min.x-d.x)*u,r=(e.max.x-d.x)*u):(i=(e.max.x-d.x)*u,r=(e.min.x-d.x)*u),c>=0?(s=(e.min.y-d.y)*c,o=(e.max.y-d.y)*c):(s=(e.max.y-d.y)*c,o=(e.min.y-d.y)*c),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Er)!==null}intersectTriangle(e,t,i,r,s){xh.subVectors(t,e),uc.subVectors(i,e),yh.crossVectors(xh,uc);let o=this.direction.dot(yh),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Qr.subVectors(this.origin,e);const l=a*this.direction.dot(uc.crossVectors(Qr,uc));if(l<0)return null;const u=a*this.direction.dot(xh.cross(Qr));if(u<0||l+u>o)return null;const c=-a*Qr.dot(yh);return c<0?null:this.at(c/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rn{constructor(e,t,i,r,s,o,a,l,u,c,f,d,p,g,_,m){rn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,u,c,f,d,p,g,_,m)}set(e,t,i,r,s,o,a,l,u,c,f,d,p,g,_,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=u,h[6]=c,h[10]=f,h[14]=d,h[3]=p,h[7]=g,h[11]=_,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rn().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Bo.setFromMatrixColumn(e,0).length(),s=1/Bo.setFromMatrixColumn(e,1).length(),o=1/Bo.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),u=Math.sin(r),c=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=o*c,p=o*f,g=a*c,_=a*f;t[0]=l*c,t[4]=-l*f,t[8]=u,t[1]=p+g*u,t[5]=d-_*u,t[9]=-a*l,t[2]=_-d*u,t[6]=g+p*u,t[10]=o*l}else if(e.order==="YXZ"){const d=l*c,p=l*f,g=u*c,_=u*f;t[0]=d+_*a,t[4]=g*a-p,t[8]=o*u,t[1]=o*f,t[5]=o*c,t[9]=-a,t[2]=p*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*c,p=l*f,g=u*c,_=u*f;t[0]=d-_*a,t[4]=-o*f,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*c,t[9]=_-d*a,t[2]=-o*u,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*c,p=o*f,g=a*c,_=a*f;t[0]=l*c,t[4]=g*u-p,t[8]=d*u+_,t[1]=l*f,t[5]=_*u+d,t[9]=p*u-g,t[2]=-u,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*u,g=a*l,_=a*u;t[0]=l*c,t[4]=_-d*f,t[8]=g*f+p,t[1]=f,t[5]=o*c,t[9]=-a*c,t[2]=-u*c,t[6]=p*f+g,t[10]=d-_*f}else if(e.order==="XZY"){const d=o*l,p=o*u,g=a*l,_=a*u;t[0]=l*c,t[4]=-f,t[8]=u*c,t[1]=d*f+_,t[5]=o*c,t[9]=p*f-g,t[2]=g*f-p,t[6]=a*c,t[10]=_*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yA,e,SA)}lookAt(e,t,i){const r=this.elements;return fi.subVectors(e,t),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),Jr.crossVectors(i,fi),Jr.lengthSq()===0&&(Math.abs(i.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),Jr.crossVectors(i,fi)),Jr.normalize(),cc.crossVectors(fi,Jr),r[0]=Jr.x,r[4]=cc.x,r[8]=fi.x,r[1]=Jr.y,r[5]=cc.y,r[9]=fi.y,r[2]=Jr.z,r[6]=cc.z,r[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],c=i[1],f=i[5],d=i[9],p=i[13],g=i[2],_=i[6],m=i[10],h=i[14],v=i[3],x=i[7],y=i[11],w=i[15],T=r[0],S=r[4],P=r[8],M=r[12],E=r[1],k=r[5],U=r[9],Q=r[13],L=r[2],F=r[6],G=r[10],W=r[14],N=r[3],O=r[7],R=r[11],K=r[15];return s[0]=o*T+a*E+l*L+u*N,s[4]=o*S+a*k+l*F+u*O,s[8]=o*P+a*U+l*G+u*R,s[12]=o*M+a*Q+l*W+u*K,s[1]=c*T+f*E+d*L+p*N,s[5]=c*S+f*k+d*F+p*O,s[9]=c*P+f*U+d*G+p*R,s[13]=c*M+f*Q+d*W+p*K,s[2]=g*T+_*E+m*L+h*N,s[6]=g*S+_*k+m*F+h*O,s[10]=g*P+_*U+m*G+h*R,s[14]=g*M+_*Q+m*W+h*K,s[3]=v*T+x*E+y*L+w*N,s[7]=v*S+x*k+y*F+w*O,s[11]=v*P+x*U+y*G+w*R,s[15]=v*M+x*Q+y*W+w*K,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],u=e[13],c=e[2],f=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],h=e[15];return g*(+s*l*f-r*u*f-s*a*d+i*u*d+r*a*p-i*l*p)+_*(+t*l*p-t*u*d+s*o*d-r*o*p+r*u*c-s*l*c)+m*(+t*u*f-t*a*p-s*o*f+i*o*p+s*a*c-i*u*c)+h*(-r*a*c-t*l*f+t*a*d+r*o*f-i*o*d+i*l*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],f=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],h=e[15],v=f*m*u-_*d*u+_*l*p-a*m*p-f*l*h+a*d*h,x=g*d*u-c*m*u-g*l*p+o*m*p+c*l*h-o*d*h,y=c*_*u-g*f*u+g*a*p-o*_*p-c*a*h+o*f*h,w=g*f*l-c*_*l-g*a*d+o*_*d+c*a*m-o*f*m,T=t*v+i*x+r*y+s*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/T;return e[0]=v*S,e[1]=(_*d*s-f*m*s-_*r*p+i*m*p+f*r*h-i*d*h)*S,e[2]=(a*m*s-_*l*s+_*r*u-i*m*u-a*r*h+i*l*h)*S,e[3]=(f*l*s-a*d*s-f*r*u+i*d*u+a*r*p-i*l*p)*S,e[4]=x*S,e[5]=(c*m*s-g*d*s+g*r*p-t*m*p-c*r*h+t*d*h)*S,e[6]=(g*l*s-o*m*s-g*r*u+t*m*u+o*r*h-t*l*h)*S,e[7]=(o*d*s-c*l*s+c*r*u-t*d*u-o*r*p+t*l*p)*S,e[8]=y*S,e[9]=(g*f*s-c*_*s-g*i*p+t*_*p+c*i*h-t*f*h)*S,e[10]=(o*_*s-g*a*s+g*i*u-t*_*u-o*i*h+t*a*h)*S,e[11]=(c*a*s-o*f*s-c*i*u+t*f*u+o*i*p-t*a*p)*S,e[12]=w*S,e[13]=(c*_*r-g*f*r+g*i*d-t*_*d-c*i*m+t*f*m)*S,e[14]=(g*a*r-o*_*r-g*i*l+t*_*l+o*i*m-t*a*m)*S,e[15]=(o*f*r-c*a*r+c*i*l-t*f*l-o*i*d+t*a*d)*S,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,u=s*o,c=s*a;return this.set(u*o+i,u*a-r*l,u*l+r*a,0,u*a+r*l,c*a+i,c*l-r*o,0,u*l-r*a,c*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,u=s+s,c=o+o,f=a+a,d=s*u,p=s*c,g=s*f,_=o*c,m=o*f,h=a*f,v=l*u,x=l*c,y=l*f,w=i.x,T=i.y,S=i.z;return r[0]=(1-(_+h))*w,r[1]=(p+y)*w,r[2]=(g-x)*w,r[3]=0,r[4]=(p-y)*T,r[5]=(1-(d+h))*T,r[6]=(m+v)*T,r[7]=0,r[8]=(g+x)*S,r[9]=(m-v)*S,r[10]=(1-(d+_))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Bo.set(r[0],r[1],r[2]).length();const o=Bo.set(r[4],r[5],r[6]).length(),a=Bo.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],$i.copy(this);const u=1/s,c=1/o,f=1/a;return $i.elements[0]*=u,$i.elements[1]*=u,$i.elements[2]*=u,$i.elements[4]*=c,$i.elements[5]*=c,$i.elements[6]*=c,$i.elements[8]*=f,$i.elements[9]*=f,$i.elements[10]*=f,t.setFromRotationMatrix($i),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Ir){const l=this.elements,u=2*s/(t-e),c=2*s/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r);let p,g;if(a===Ir)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Gf)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=c,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Ir){const l=this.elements,u=1/(t-e),c=1/(i-r),f=1/(o-s),d=(t+e)*u,p=(i+r)*c;let g,_;if(a===Ir)g=(o+s)*f,_=-2*f;else if(a===Gf)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Bo=new Y,$i=new rn,yA=new Y(0,0,0),SA=new Y(1,1,1),Jr=new Y,cc=new Y,fi=new Y,Y0=new rn,q0=new Ou;class yd{constructor(e=0,t=0,i=0,r=yd.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],u=r[5],c=r[9],f=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Kn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Kn(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Kn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Kn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Kn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Kn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Y0.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Y0,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return q0.setFromEuler(this),this.setFromQuaternion(q0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yd.DEFAULT_ORDER="XYZ";class KS{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let MA=0;const $0=new Y,Ho=new Ou,Tr=new rn,fc=new Y,_l=new Y,EA=new Y,TA=new Ou,K0=new Y(1,0,0),Z0=new Y(0,1,0),Q0=new Y(0,0,1),wA={type:"added"},AA={type:"removed"};class Wn extends tl{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:MA++}),this.uuid=Iu(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Wn.DEFAULT_UP.clone();const e=new Y,t=new yd,i=new Ou,r=new Y(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new rn},normalMatrix:{value:new nt}}),this.matrix=new rn,this.matrixWorld=new rn,this.matrixAutoUpdate=Wn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new KS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ho.setFromAxisAngle(e,t),this.quaternion.multiply(Ho),this}rotateOnWorldAxis(e,t){return Ho.setFromAxisAngle(e,t),this.quaternion.premultiply(Ho),this}rotateX(e){return this.rotateOnAxis(K0,e)}rotateY(e){return this.rotateOnAxis(Z0,e)}rotateZ(e){return this.rotateOnAxis(Q0,e)}translateOnAxis(e,t){return $0.copy(e).applyQuaternion(this.quaternion),this.position.add($0.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(K0,e)}translateY(e){return this.translateOnAxis(Z0,e)}translateZ(e){return this.translateOnAxis(Q0,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Tr.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?fc.copy(e):fc.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),_l.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tr.lookAt(_l,fc,this.up):Tr.lookAt(fc,_l,this.up),this.quaternion.setFromRotationMatrix(Tr),r&&(Tr.extractRotation(r.matrixWorld),Ho.setFromRotationMatrix(Tr),this.quaternion.premultiply(Ho.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(wA)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(AA)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Tr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Tr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Tr),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_l,e,EA),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_l,TA,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const f=l[u];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),c=o(e.images),f=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),c.length>0&&(i.images=c),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const u in a){const c=a[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Wn.DEFAULT_UP=new Y(0,1,0);Wn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ki=new Y,wr=new Y,Sh=new Y,Ar=new Y,Go=new Y,Vo=new Y,J0=new Y,Mh=new Y,Eh=new Y,Th=new Y;let dc=!1;class tr{constructor(e=new Y,t=new Y,i=new Y){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Ki.subVectors(e,t),r.cross(Ki);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Ki.subVectors(r,t),wr.subVectors(i,t),Sh.subVectors(e,t);const o=Ki.dot(Ki),a=Ki.dot(wr),l=Ki.dot(Sh),u=wr.dot(wr),c=wr.dot(Sh),f=o*u-a*a;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(u*l-a*c)*d,g=(o*c-a*l)*d;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ar)===null?!1:Ar.x>=0&&Ar.y>=0&&Ar.x+Ar.y<=1}static getUV(e,t,i,r,s,o,a,l){return dc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),dc=!0),this.getInterpolation(e,t,i,r,s,o,a,l)}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Ar)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ar.x),l.addScaledVector(o,Ar.y),l.addScaledVector(a,Ar.z),l)}static isFrontFacing(e,t,i,r){return Ki.subVectors(i,t),wr.subVectors(e,t),Ki.cross(wr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ki.subVectors(this.c,this.b),wr.subVectors(this.a,this.b),Ki.cross(wr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tr.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tr.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return dc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),dc=!0),tr.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return tr.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return tr.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tr.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Go.subVectors(r,i),Vo.subVectors(s,i),Mh.subVectors(e,i);const l=Go.dot(Mh),u=Vo.dot(Mh);if(l<=0&&u<=0)return t.copy(i);Eh.subVectors(e,r);const c=Go.dot(Eh),f=Vo.dot(Eh);if(c>=0&&f<=c)return t.copy(r);const d=l*f-c*u;if(d<=0&&l>=0&&c<=0)return o=l/(l-c),t.copy(i).addScaledVector(Go,o);Th.subVectors(e,s);const p=Go.dot(Th),g=Vo.dot(Th);if(g>=0&&p<=g)return t.copy(s);const _=p*u-l*g;if(_<=0&&u>=0&&g<=0)return a=u/(u-g),t.copy(i).addScaledVector(Vo,a);const m=c*g-p*f;if(m<=0&&f-c>=0&&p-g>=0)return J0.subVectors(s,r),a=(f-c)/(f-c+(p-g)),t.copy(r).addScaledVector(J0,a);const h=1/(m+_+d);return o=_*h,a=d*h,t.copy(i).addScaledVector(Go,o).addScaledVector(Vo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ZS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},es={h:0,s:0,l:0},hc={h:0,s:0,l:0};function wh(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ut{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,yt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=yt.workingColorSpace){return this.r=e,this.g=t,this.b=i,yt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=yt.workingColorSpace){if(e=dA(e,1),t=Kn(t,0,1),i=Kn(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=wh(o,s,e+1/3),this.g=wh(o,s,e),this.b=wh(o,s,e-1/3)}return yt.toWorkingColorSpace(this,r),this}setStyle(e,t=pn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pn){const i=ZS[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ca(e.r),this.g=Ca(e.g),this.b=Ca(e.b),this}copyLinearToSRGB(e){return this.r=hh(e.r),this.g=hh(e.g),this.b=hh(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pn){return yt.fromWorkingColorSpace(Tn.copy(this),e),Math.round(Kn(Tn.r*255,0,255))*65536+Math.round(Kn(Tn.g*255,0,255))*256+Math.round(Kn(Tn.b*255,0,255))}getHexString(e=pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=yt.workingColorSpace){yt.fromWorkingColorSpace(Tn.copy(this),t);const i=Tn.r,r=Tn.g,s=Tn.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,u;const c=(a+o)/2;if(a===o)l=0,u=0;else{const f=o-a;switch(u=c<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,t=yt.workingColorSpace){return yt.fromWorkingColorSpace(Tn.copy(this),t),e.r=Tn.r,e.g=Tn.g,e.b=Tn.b,e}getStyle(e=pn){yt.fromWorkingColorSpace(Tn.copy(this),e);const t=Tn.r,i=Tn.g,r=Tn.b;return e!==pn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(es),this.setHSL(es.h+e,es.s+t,es.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(es),e.getHSL(hc);const i=fh(es.h,hc.h,t),r=fh(es.s,hc.s,t),s=fh(es.l,hc.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tn=new ut;ut.NAMES=ZS;let CA=0;class nl extends tl{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:CA++}),this.uuid=Iu(),this.name="",this.type="Material",this.blending=Aa,this.side=Ls,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gp,this.blendDst=Vp,this.blendEquation=to,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ut(0,0,0),this.blendAlpha=0,this.depthFunc=kf,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=z0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Io,this.stencilZFail=Io,this.stencilZPass=Io,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Aa&&(i.blending=this.blending),this.side!==Ls&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Gp&&(i.blendSrc=this.blendSrc),this.blendDst!==Vp&&(i.blendDst=this.blendDst),this.blendEquation!==to&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==kf&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==z0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Io&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Io&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Io&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class M_ extends nl{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=IS,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Yt=new Y,pc=new St;class Pn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=B0,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=us,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)pc.fromBufferAttribute(this,t),pc.applyMatrix3(e),this.setXY(t,pc.x,pc.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix3(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=hl(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Yn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hl(t,this.array)),t}setX(e,t){return this.normalized&&(t=Yn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hl(t,this.array)),t}setY(e,t){return this.normalized&&(t=Yn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hl(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Yn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hl(t,this.array)),t}setW(e,t){return this.normalized&&(t=Yn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Yn(t,this.array),i=Yn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Yn(t,this.array),i=Yn(i,this.array),r=Yn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Yn(t,this.array),i=Yn(i,this.array),r=Yn(r,this.array),s=Yn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==B0&&(e.usage=this.usage),e}}class QS extends Pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class JS extends Pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class zr extends Pn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let RA=0;const Li=new rn,Ah=new Wn,Wo=new Y,di=new Fu,gl=new Fu,an=new Y;class ri extends tl{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:RA++}),this.uuid=Iu(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jS(e)?JS:QS)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new nt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Li.makeRotationFromQuaternion(e),this.applyMatrix4(Li),this}rotateX(e){return Li.makeRotationX(e),this.applyMatrix4(Li),this}rotateY(e){return Li.makeRotationY(e),this.applyMatrix4(Li),this}rotateZ(e){return Li.makeRotationZ(e),this.applyMatrix4(Li),this}translate(e,t,i){return Li.makeTranslation(e,t,i),this.applyMatrix4(Li),this}scale(e,t,i){return Li.makeScale(e,t,i),this.applyMatrix4(Li),this}lookAt(e){return Ah.lookAt(e),Ah.updateMatrix(),this.applyMatrix4(Ah.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wo).negate(),this.translate(Wo.x,Wo.y,Wo.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new zr(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fu);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];di.setFromBufferAttribute(s),this.morphTargetsRelative?(an.addVectors(this.boundingBox.min,di.min),this.boundingBox.expandByPoint(an),an.addVectors(this.boundingBox.max,di.max),this.boundingBox.expandByPoint(an)):(this.boundingBox.expandByPoint(di.min),this.boundingBox.expandByPoint(di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ku);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new Y,1/0);return}if(e){const i=this.boundingSphere.center;if(di.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];gl.setFromBufferAttribute(a),this.morphTargetsRelative?(an.addVectors(di.min,gl.min),di.expandByPoint(an),an.addVectors(di.max,gl.max),di.expandByPoint(an)):(di.expandByPoint(gl.min),di.expandByPoint(gl.max))}di.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)an.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(an));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let u=0,c=a.count;u<c;u++)an.fromBufferAttribute(a,u),l&&(Wo.fromBufferAttribute(e,u),an.add(Wo)),r=Math.max(r,i.distanceToSquared(an))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pn(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,u=[],c=[];for(let E=0;E<a;E++)u[E]=new Y,c[E]=new Y;const f=new Y,d=new Y,p=new Y,g=new St,_=new St,m=new St,h=new Y,v=new Y;function x(E,k,U){f.fromArray(r,E*3),d.fromArray(r,k*3),p.fromArray(r,U*3),g.fromArray(o,E*2),_.fromArray(o,k*2),m.fromArray(o,U*2),d.sub(f),p.sub(f),_.sub(g),m.sub(g);const Q=1/(_.x*m.y-m.x*_.y);isFinite(Q)&&(h.copy(d).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(Q),v.copy(p).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(Q),u[E].add(h),u[k].add(h),u[U].add(h),c[E].add(v),c[k].add(v),c[U].add(v))}let y=this.groups;y.length===0&&(y=[{start:0,count:i.length}]);for(let E=0,k=y.length;E<k;++E){const U=y[E],Q=U.start,L=U.count;for(let F=Q,G=Q+L;F<G;F+=3)x(i[F+0],i[F+1],i[F+2])}const w=new Y,T=new Y,S=new Y,P=new Y;function M(E){S.fromArray(s,E*3),P.copy(S);const k=u[E];w.copy(k),w.sub(S.multiplyScalar(S.dot(k))).normalize(),T.crossVectors(P,k);const Q=T.dot(c[E])<0?-1:1;l[E*4]=w.x,l[E*4+1]=w.y,l[E*4+2]=w.z,l[E*4+3]=Q}for(let E=0,k=y.length;E<k;++E){const U=y[E],Q=U.start,L=U.count;for(let F=Q,G=Q+L;F<G;F+=3)M(i[F+0]),M(i[F+1]),M(i[F+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new Y,s=new Y,o=new Y,a=new Y,l=new Y,u=new Y,c=new Y,f=new Y;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),c.subVectors(o,s),f.subVectors(r,s),c.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,m),a.add(c),l.add(c),u.add(c),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,u.x,u.y,u.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),c.subVectors(o,s),f.subVectors(r,s),c.cross(f),i.setXYZ(d+0,c.x,c.y,c.z),i.setXYZ(d+1,c.x,c.y,c.z),i.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)an.fromBufferAttribute(e,t),an.normalize(),e.setXYZ(t,an.x,an.y,an.z)}toNonIndexed(){function e(a,l){const u=a.array,c=a.itemSize,f=a.normalized,d=new u.constructor(l.length*c);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*c;for(let h=0;h<c;h++)d[g++]=u[p++]}return new Pn(d,c,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ri,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],u=e(l,i);t.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const l=[],u=s[a];for(let c=0,f=u.length;c<f;c++){const d=u[c],p=e(d,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let f=0,d=u.length;f<d;f++){const p=u[f];c.push(p.toJSON(e.data))}c.length>0&&(r[l]=c,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const u in r){const c=r[u];this.setAttribute(u,c.clone(t))}const s=e.morphAttributes;for(const u in s){const c=[],f=s[u];for(let d=0,p=f.length;d<p;d++)c.push(f[d].clone(t));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,c=o.length;u<c;u++){const f=o[u];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ev=new rn,Ws=new S_,mc=new ku,tv=new Y,Xo=new Y,jo=new Y,Yo=new Y,Ch=new Y,_c=new Y,gc=new St,vc=new St,xc=new St,nv=new Y,iv=new Y,rv=new Y,yc=new Y,Sc=new Y;class Or extends Wn{constructor(e=new ri,t=new M_){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){_c.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const c=a[l],f=s[l];c!==0&&(Ch.fromBufferAttribute(f,e),o?_c.addScaledVector(Ch,c):_c.addScaledVector(Ch.sub(t),c))}t.add(_c)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),mc.copy(i.boundingSphere),mc.applyMatrix4(s),Ws.copy(e.ray).recast(e.near),!(mc.containsPoint(Ws.origin)===!1&&(Ws.intersectSphere(mc,tv)===null||Ws.origin.distanceToSquared(tv)>(e.far-e.near)**2))&&(ev.copy(s).invert(),Ws.copy(e.ray).applyMatrix4(ev),!(i.boundingBox!==null&&Ws.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ws)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,u=s.attributes.uv,c=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],h=o[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,w=x;y<w;y+=3){const T=a.getX(y),S=a.getX(y+1),P=a.getX(y+2);r=Mc(this,h,e,i,u,c,f,T,S,P),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,h=_;m<h;m+=3){const v=a.getX(m),x=a.getX(m+1),y=a.getX(m+2);r=Mc(this,o,e,i,u,c,f,v,x,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],h=o[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,w=x;y<w;y+=3){const T=y,S=y+1,P=y+2;r=Mc(this,h,e,i,u,c,f,T,S,P),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,h=_;m<h;m+=3){const v=m,x=m+1,y=m+2;r=Mc(this,o,e,i,u,c,f,v,x,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function bA(n,e,t,i,r,s,o,a){let l;if(e.side===ni?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Ls,a),l===null)return null;Sc.copy(a),Sc.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(Sc);return u<t.near||u>t.far?null:{distance:u,point:Sc.clone(),object:n}}function Mc(n,e,t,i,r,s,o,a,l,u){n.getVertexPosition(a,Xo),n.getVertexPosition(l,jo),n.getVertexPosition(u,Yo);const c=bA(n,e,t,i,Xo,jo,Yo,yc);if(c){r&&(gc.fromBufferAttribute(r,a),vc.fromBufferAttribute(r,l),xc.fromBufferAttribute(r,u),c.uv=tr.getInterpolation(yc,Xo,jo,Yo,gc,vc,xc,new St)),s&&(gc.fromBufferAttribute(s,a),vc.fromBufferAttribute(s,l),xc.fromBufferAttribute(s,u),c.uv1=tr.getInterpolation(yc,Xo,jo,Yo,gc,vc,xc,new St),c.uv2=c.uv1),o&&(nv.fromBufferAttribute(o,a),iv.fromBufferAttribute(o,l),rv.fromBufferAttribute(o,u),c.normal=tr.getInterpolation(yc,Xo,jo,Yo,nv,iv,rv,new Y),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const f={a,b:l,c:u,normal:new Y,materialIndex:0};tr.getNormal(Xo,jo,Yo,f.normal),c.face=f}return c}class zu extends ri{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],u=[],c=[],f=[];let d=0,p=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new zr(u,3)),this.setAttribute("normal",new zr(c,3)),this.setAttribute("uv",new zr(f,2));function g(_,m,h,v,x,y,w,T,S,P,M){const E=y/S,k=w/P,U=y/2,Q=w/2,L=T/2,F=S+1,G=P+1;let W=0,N=0;const O=new Y;for(let R=0;R<G;R++){const K=R*k-Q;for(let J=0;J<F;J++){const q=J*E-U;O[_]=q*v,O[m]=K*x,O[h]=L,u.push(O.x,O.y,O.z),O[_]=0,O[m]=0,O[h]=T>0?1:-1,c.push(O.x,O.y,O.z),f.push(J/S),f.push(1-R/P),W+=1}}for(let R=0;R<P;R++)for(let K=0;K<S;K++){const J=d+K+F*R,q=d+K+F*(R+1),Z=d+(K+1)+F*(R+1),se=d+(K+1)+F*R;l.push(J,q,se),l.push(q,Z,se),N+=6}a.addGroup(p,N,M),p+=N,d+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zu(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Xa(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function On(n){const e={};for(let t=0;t<n.length;t++){const i=Xa(n[t]);for(const r in i)e[r]=i[r]}return e}function PA(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function eM(n){return n.getRenderTarget()===null?n.outputColorSpace:yt.workingColorSpace}const LA={clone:Xa,merge:On};var DA=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,NA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Co extends nl{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=DA,this.fragmentShader=NA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xa(e.uniforms),this.uniformsGroups=PA(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class tM extends Wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rn,this.projectionMatrix=new rn,this.projectionMatrixInverse=new rn,this.coordinateSystem=Ir}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Oi extends tM{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=$p*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ch*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $p*2*Math.atan(Math.tan(ch*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ch*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/u,r*=o.width/l,i*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const qo=-90,$o=1;class UA extends Wn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Oi(qo,$o,e,t);r.layers=this.layers,this.add(r);const s=new Oi(qo,$o,e,t);s.layers=this.layers,this.add(s);const o=new Oi(qo,$o,e,t);o.layers=this.layers,this.add(o);const a=new Oi(qo,$o,e,t);a.layers=this.layers,this.add(a);const l=new Oi(qo,$o,e,t);l.layers=this.layers,this.add(l);const u=new Oi(qo,$o,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const u of t)this.remove(u);if(e===Ir)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Gf)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,u,c]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,u),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,c),e.setRenderTarget(f,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class nM extends ii{constructor(e,t,i,r,s,o,a,l,u,c){e=e!==void 0?e:[],t=t!==void 0?t:Ga,super(e,t,i,r,s,o,a,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class IA extends Ao{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Gl("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ho?pn:zi),this.texture=new nM(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ii}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new zu(5,5,5),s=new Co({name:"CubemapFromEquirect",uniforms:Xa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ni,blending:Es});s.uniforms.tEquirect.value=t;const o=new Or(r,s),a=t.minFilter;return t.minFilter===vu&&(t.minFilter=Ii),new UA(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const Rh=new Y,OA=new Y,FA=new nt;class Ks{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Rh.subVectors(i,t).cross(OA.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Rh),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||FA.getNormalMatrix(e),r=this.coplanarPoint(Rh).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xs=new ku,Ec=new Y;class iM{constructor(e=new Ks,t=new Ks,i=new Ks,r=new Ks,s=new Ks,o=new Ks){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ir){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],u=r[4],c=r[5],f=r[6],d=r[7],p=r[8],g=r[9],_=r[10],m=r[11],h=r[12],v=r[13],x=r[14],y=r[15];if(i[0].setComponents(l-s,d-u,m-p,y-h).normalize(),i[1].setComponents(l+s,d+u,m+p,y+h).normalize(),i[2].setComponents(l+o,d+c,m+g,y+v).normalize(),i[3].setComponents(l-o,d-c,m-g,y-v).normalize(),i[4].setComponents(l-a,d-f,m-_,y-x).normalize(),t===Ir)i[5].setComponents(l+a,d+f,m+_,y+x).normalize();else if(t===Gf)i[5].setComponents(a,f,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xs)}intersectsSprite(e){return Xs.center.set(0,0,0),Xs.radius=.7071067811865476,Xs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xs)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ec.x=r.normal.x>0?e.max.x:e.min.x,Ec.y=r.normal.y>0?e.max.y:e.min.y,Ec.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ec)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function rM(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function kA(n,e){const t=e.isWebGL2,i=new WeakMap;function r(u,c){const f=u.array,d=u.usage,p=f.byteLength,g=n.createBuffer();n.bindBuffer(c,g),n.bufferData(c,f,d),u.onUploadCallback();let _;if(f instanceof Float32Array)_=n.FLOAT;else if(f instanceof Uint16Array)if(u.isFloat16BufferAttribute)if(t)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)_=n.SHORT;else if(f instanceof Uint32Array)_=n.UNSIGNED_INT;else if(f instanceof Int32Array)_=n.INT;else if(f instanceof Int8Array)_=n.BYTE;else if(f instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:g,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:u.version,size:p}}function s(u,c,f){const d=c.array,p=c._updateRange,g=c.updateRanges;if(n.bindBuffer(f,u),p.count===-1&&g.length===0&&n.bufferSubData(f,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const h=g[_];t?n.bufferSubData(f,h.start*d.BYTES_PER_ELEMENT,d,h.start,h.count):n.bufferSubData(f,h.start*d.BYTES_PER_ELEMENT,d.subarray(h.start,h.start+h.count))}c.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):n.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),c.onUploadCallback()}function o(u){return u.isInterleavedBufferAttribute&&(u=u.data),i.get(u)}function a(u){u.isInterleavedBufferAttribute&&(u=u.data);const c=i.get(u);c&&(n.deleteBuffer(c.buffer),i.delete(u))}function l(u,c){if(u.isGLBufferAttribute){const d=i.get(u);(!d||d.version<u.version)&&i.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}u.isInterleavedBufferAttribute&&(u=u.data);const f=i.get(u);if(f===void 0)i.set(u,r(u,c));else if(f.version<u.version){if(f.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,u,c),f.version=u.version}}return{get:o,remove:a,update:l}}class Sd extends ri{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),u=a+1,c=l+1,f=e/a,d=t/l,p=[],g=[],_=[],m=[];for(let h=0;h<c;h++){const v=h*d-o;for(let x=0;x<u;x++){const y=x*f-s;g.push(y,-v,0),_.push(0,0,1),m.push(x/a),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let v=0;v<a;v++){const x=v+u*h,y=v+u*(h+1),w=v+1+u*(h+1),T=v+1+u*h;p.push(x,y,T),p.push(y,w,T)}this.setIndex(p),this.setAttribute("position",new zr(g,3)),this.setAttribute("normal",new zr(_,3)),this.setAttribute("uv",new zr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sd(e.width,e.height,e.widthSegments,e.heightSegments)}}var zA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,BA=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,HA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,GA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,VA=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,WA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,XA=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,YA=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,qA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,$A=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,KA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ZA=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,QA=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,JA=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,eC=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,tC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,iC=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rC=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sC=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,oC=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,aC=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,lC=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,uC=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cC=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,fC=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dC=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hC=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pC=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mC="gl_FragColor = linearToOutputTexel( gl_FragColor );",_C=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,gC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,vC=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xC=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,yC=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,SC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,MC=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,EC=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,TC=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wC=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,AC=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,CC=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,RC=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bC=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,PC=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,LC=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,DC=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,NC=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,UC=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,IC=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,OC=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,FC=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,kC=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zC=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,BC=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,HC=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,GC=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,VC=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,WC=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,XC=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,jC=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,YC=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qC=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$C=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,KC=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ZC=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,QC=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,JC=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,eR=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,tR=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,nR=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,iR=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,rR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oR=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,aR=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,lR=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uR=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cR=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fR=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dR=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hR=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,pR=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mR=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_R=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gR=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vR=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xR=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yR=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,SR=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,MR=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ER=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,TR=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wR=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,AR=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,CR=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,RR=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bR=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,PR=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,LR=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,DR=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,NR=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,UR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,IR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,OR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,FR=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kR=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zR=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,HR=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VR=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,XR=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,jR=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,YR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$R=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KR=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ZR=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,QR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,JR=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ib=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,sb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ob=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ab=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ub=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,db=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,_b=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:zA,alphahash_pars_fragment:BA,alphamap_fragment:HA,alphamap_pars_fragment:GA,alphatest_fragment:VA,alphatest_pars_fragment:WA,aomap_fragment:XA,aomap_pars_fragment:jA,batching_pars_vertex:YA,batching_vertex:qA,begin_vertex:$A,beginnormal_vertex:KA,bsdfs:ZA,iridescence_fragment:QA,bumpmap_pars_fragment:JA,clipping_planes_fragment:eC,clipping_planes_pars_fragment:tC,clipping_planes_pars_vertex:nC,clipping_planes_vertex:iC,color_fragment:rC,color_pars_fragment:sC,color_pars_vertex:oC,color_vertex:aC,common:lC,cube_uv_reflection_fragment:uC,defaultnormal_vertex:cC,displacementmap_pars_vertex:fC,displacementmap_vertex:dC,emissivemap_fragment:hC,emissivemap_pars_fragment:pC,colorspace_fragment:mC,colorspace_pars_fragment:_C,envmap_fragment:gC,envmap_common_pars_fragment:vC,envmap_pars_fragment:xC,envmap_pars_vertex:yC,envmap_physical_pars_fragment:DC,envmap_vertex:SC,fog_vertex:MC,fog_pars_vertex:EC,fog_fragment:TC,fog_pars_fragment:wC,gradientmap_pars_fragment:AC,lightmap_fragment:CC,lightmap_pars_fragment:RC,lights_lambert_fragment:bC,lights_lambert_pars_fragment:PC,lights_pars_begin:LC,lights_toon_fragment:NC,lights_toon_pars_fragment:UC,lights_phong_fragment:IC,lights_phong_pars_fragment:OC,lights_physical_fragment:FC,lights_physical_pars_fragment:kC,lights_fragment_begin:zC,lights_fragment_maps:BC,lights_fragment_end:HC,logdepthbuf_fragment:GC,logdepthbuf_pars_fragment:VC,logdepthbuf_pars_vertex:WC,logdepthbuf_vertex:XC,map_fragment:jC,map_pars_fragment:YC,map_particle_fragment:qC,map_particle_pars_fragment:$C,metalnessmap_fragment:KC,metalnessmap_pars_fragment:ZC,morphcolor_vertex:QC,morphnormal_vertex:JC,morphtarget_pars_vertex:eR,morphtarget_vertex:tR,normal_fragment_begin:nR,normal_fragment_maps:iR,normal_pars_fragment:rR,normal_pars_vertex:sR,normal_vertex:oR,normalmap_pars_fragment:aR,clearcoat_normal_fragment_begin:lR,clearcoat_normal_fragment_maps:uR,clearcoat_pars_fragment:cR,iridescence_pars_fragment:fR,opaque_fragment:dR,packing:hR,premultiplied_alpha_fragment:pR,project_vertex:mR,dithering_fragment:_R,dithering_pars_fragment:gR,roughnessmap_fragment:vR,roughnessmap_pars_fragment:xR,shadowmap_pars_fragment:yR,shadowmap_pars_vertex:SR,shadowmap_vertex:MR,shadowmask_pars_fragment:ER,skinbase_vertex:TR,skinning_pars_vertex:wR,skinning_vertex:AR,skinnormal_vertex:CR,specularmap_fragment:RR,specularmap_pars_fragment:bR,tonemapping_fragment:PR,tonemapping_pars_fragment:LR,transmission_fragment:DR,transmission_pars_fragment:NR,uv_pars_fragment:UR,uv_pars_vertex:IR,uv_vertex:OR,worldpos_vertex:FR,background_vert:kR,background_frag:zR,backgroundCube_vert:BR,backgroundCube_frag:HR,cube_vert:GR,cube_frag:VR,depth_vert:WR,depth_frag:XR,distanceRGBA_vert:jR,distanceRGBA_frag:YR,equirect_vert:qR,equirect_frag:$R,linedashed_vert:KR,linedashed_frag:ZR,meshbasic_vert:QR,meshbasic_frag:JR,meshlambert_vert:eb,meshlambert_frag:tb,meshmatcap_vert:nb,meshmatcap_frag:ib,meshnormal_vert:rb,meshnormal_frag:sb,meshphong_vert:ob,meshphong_frag:ab,meshphysical_vert:lb,meshphysical_frag:ub,meshtoon_vert:cb,meshtoon_frag:fb,points_vert:db,points_frag:hb,shadow_vert:pb,shadow_frag:mb,sprite_vert:_b,sprite_frag:gb},pe={common:{diffuse:{value:new ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new ut(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},fr={basic:{uniforms:On([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:On([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new ut(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:On([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new ut(0)},specular:{value:new ut(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:On([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:On([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new ut(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:On([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:On([pe.points,pe.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:On([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:On([pe.common,pe.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:On([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:On([pe.sprite,pe.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:On([pe.common,pe.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:On([pe.lights,pe.fog,{color:{value:new ut(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};fr.physical={uniforms:On([fr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new ut(0)},specularColor:{value:new ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Tc={r:0,b:0,g:0};function vb(n,e,t,i,r,s,o){const a=new ut(0);let l=s===!0?0:1,u,c,f=null,d=0,p=null;function g(m,h){let v=!1,x=h.isScene===!0?h.background:null;x&&x.isTexture&&(x=(h.backgroundBlurriness>0?t:e).get(x)),x===null?_(a,l):x&&x.isColor&&(_(x,1),v=!0);const y=n.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),x&&(x.isCubeTexture||x.mapping===vd)?(c===void 0&&(c=new Or(new zu(1,1,1),new Co({name:"BackgroundCubeMaterial",uniforms:Xa(fr.backgroundCube.uniforms),vertexShader:fr.backgroundCube.vertexShader,fragmentShader:fr.backgroundCube.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,T,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=h.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,c.material.toneMapped=yt.getTransfer(x.colorSpace)!==bt,(f!==x||d!==x.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=x,d=x.version,p=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(u===void 0&&(u=new Or(new Sd(2,2),new Co({name:"BackgroundMaterial",uniforms:Xa(fr.background.uniforms),vertexShader:fr.background.vertexShader,fragmentShader:fr.background.fragmentShader,side:Ls,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=x,u.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,u.material.toneMapped=yt.getTransfer(x.colorSpace)!==bt,x.matrixAutoUpdate===!0&&x.updateMatrix(),u.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||d!==x.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=x,d=x.version,p=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null))}function _(m,h){m.getRGB(Tc,eM(n)),i.buffers.color.setClear(Tc.r,Tc.g,Tc.b,h,o)}return{getClearColor:function(){return a},setClearColor:function(m,h=1){a.set(m),l=h,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(a,l)},render:g}}function xb(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=m(null);let u=l,c=!1;function f(L,F,G,W,N){let O=!1;if(o){const R=_(W,G,F);u!==R&&(u=R,p(u.object)),O=h(L,W,G,N),O&&v(L,W,G,N)}else{const R=F.wireframe===!0;(u.geometry!==W.id||u.program!==G.id||u.wireframe!==R)&&(u.geometry=W.id,u.program=G.id,u.wireframe=R,O=!0)}N!==null&&t.update(N,n.ELEMENT_ARRAY_BUFFER),(O||c)&&(c=!1,P(L,F,G,W),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function p(L){return i.isWebGL2?n.bindVertexArray(L):s.bindVertexArrayOES(L)}function g(L){return i.isWebGL2?n.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function _(L,F,G){const W=G.wireframe===!0;let N=a[L.id];N===void 0&&(N={},a[L.id]=N);let O=N[F.id];O===void 0&&(O={},N[F.id]=O);let R=O[W];return R===void 0&&(R=m(d()),O[W]=R),R}function m(L){const F=[],G=[],W=[];for(let N=0;N<r;N++)F[N]=0,G[N]=0,W[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:W,object:L,attributes:{},index:null}}function h(L,F,G,W){const N=u.attributes,O=F.attributes;let R=0;const K=G.getAttributes();for(const J in K)if(K[J].location>=0){const Z=N[J];let se=O[J];if(se===void 0&&(J==="instanceMatrix"&&L.instanceMatrix&&(se=L.instanceMatrix),J==="instanceColor"&&L.instanceColor&&(se=L.instanceColor)),Z===void 0||Z.attribute!==se||se&&Z.data!==se.data)return!0;R++}return u.attributesNum!==R||u.index!==W}function v(L,F,G,W){const N={},O=F.attributes;let R=0;const K=G.getAttributes();for(const J in K)if(K[J].location>=0){let Z=O[J];Z===void 0&&(J==="instanceMatrix"&&L.instanceMatrix&&(Z=L.instanceMatrix),J==="instanceColor"&&L.instanceColor&&(Z=L.instanceColor));const se={};se.attribute=Z,Z&&Z.data&&(se.data=Z.data),N[J]=se,R++}u.attributes=N,u.attributesNum=R,u.index=W}function x(){const L=u.newAttributes;for(let F=0,G=L.length;F<G;F++)L[F]=0}function y(L){w(L,0)}function w(L,F){const G=u.newAttributes,W=u.enabledAttributes,N=u.attributeDivisors;G[L]=1,W[L]===0&&(n.enableVertexAttribArray(L),W[L]=1),N[L]!==F&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,F),N[L]=F)}function T(){const L=u.newAttributes,F=u.enabledAttributes;for(let G=0,W=F.length;G<W;G++)F[G]!==L[G]&&(n.disableVertexAttribArray(G),F[G]=0)}function S(L,F,G,W,N,O,R){R===!0?n.vertexAttribIPointer(L,F,G,N,O):n.vertexAttribPointer(L,F,G,W,N,O)}function P(L,F,G,W){if(i.isWebGL2===!1&&(L.isInstancedMesh||W.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const N=W.attributes,O=G.getAttributes(),R=F.defaultAttributeValues;for(const K in O){const J=O[K];if(J.location>=0){let q=N[K];if(q===void 0&&(K==="instanceMatrix"&&L.instanceMatrix&&(q=L.instanceMatrix),K==="instanceColor"&&L.instanceColor&&(q=L.instanceColor)),q!==void 0){const Z=q.normalized,se=q.itemSize,me=t.get(q);if(me===void 0)continue;const de=me.buffer,De=me.type,Ne=me.bytesPerElement,Oe=i.isWebGL2===!0&&(De===n.INT||De===n.UNSIGNED_INT||q.gpuType===FS);if(q.isInterleavedBufferAttribute){const We=q.data,H=We.stride,Xe=q.offset;if(We.isInstancedInterleavedBuffer){for(let ve=0;ve<J.locationSize;ve++)w(J.location+ve,We.meshPerAttribute);L.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=We.meshPerAttribute*We.count)}else for(let ve=0;ve<J.locationSize;ve++)y(J.location+ve);n.bindBuffer(n.ARRAY_BUFFER,de);for(let ve=0;ve<J.locationSize;ve++)S(J.location+ve,se/J.locationSize,De,Z,H*Ne,(Xe+se/J.locationSize*ve)*Ne,Oe)}else{if(q.isInstancedBufferAttribute){for(let We=0;We<J.locationSize;We++)w(J.location+We,q.meshPerAttribute);L.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let We=0;We<J.locationSize;We++)y(J.location+We);n.bindBuffer(n.ARRAY_BUFFER,de);for(let We=0;We<J.locationSize;We++)S(J.location+We,se/J.locationSize,De,Z,se*Ne,se/J.locationSize*We*Ne,Oe)}}else if(R!==void 0){const Z=R[K];if(Z!==void 0)switch(Z.length){case 2:n.vertexAttrib2fv(J.location,Z);break;case 3:n.vertexAttrib3fv(J.location,Z);break;case 4:n.vertexAttrib4fv(J.location,Z);break;default:n.vertexAttrib1fv(J.location,Z)}}}}T()}function M(){U();for(const L in a){const F=a[L];for(const G in F){const W=F[G];for(const N in W)g(W[N].object),delete W[N];delete F[G]}delete a[L]}}function E(L){if(a[L.id]===void 0)return;const F=a[L.id];for(const G in F){const W=F[G];for(const N in W)g(W[N].object),delete W[N];delete F[G]}delete a[L.id]}function k(L){for(const F in a){const G=a[F];if(G[L.id]===void 0)continue;const W=G[L.id];for(const N in W)g(W[N].object),delete W[N];delete G[L.id]}}function U(){Q(),c=!0,u!==l&&(u=l,p(u.object))}function Q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:U,resetDefaultState:Q,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:k,initAttributes:x,enableAttribute:y,disableUnusedAttributes:T}}function yb(n,e,t,i){const r=i.isWebGL2;let s;function o(c){s=c}function a(c,f){n.drawArrays(s,c,f),t.update(f,s,1)}function l(c,f,d){if(d===0)return;let p,g;if(r)p=n,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](s,c,f,d),t.update(f,s,d)}function u(c,f,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<d;g++)this.render(c[g],f[g]);else{p.multiDrawArraysWEBGL(s,c,0,f,0,d);let g=0;for(let _=0;_<d;_++)g+=f[_];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=u}function Sb(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(S){if(S==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const u=o||e.has("WEBGL_draw_buffers"),c=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),h=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,y=o||e.has("OES_texture_float"),w=x&&y,T=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:u,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:c,maxTextures:f,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:h,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:y,floatVertexTextures:w,maxSamples:T}}function Mb(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Ks,a=new nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=c(f,d,0)},this.setState=function(f,d,p){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,h=n.get(f);if(!r||g===null||g.length===0||s&&!m)s?c(null):u();else{const v=s?0:i,x=v*4;let y=h.clippingState||null;l.value=y,y=c(g,d,x,p);for(let w=0;w!==x;++w)y[w]=t[w];h.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(f,d,p,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const h=p+_*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<h)&&(m=new Float32Array(h));for(let x=0,y=p;x!==_;++x,y+=4)o.copy(f[x]).applyMatrix4(v,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Eb(n){let e=new WeakMap;function t(o,a){return a===Wp?o.mapping=Ga:a===Xp&&(o.mapping=Va),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Wp||a===Xp)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new IA(l.height/2);return u.fromEquirectangularTexture(n,o),e.set(o,u),o.addEventListener("dispose",r),t(u.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Tb extends tM{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=c*this.view.offsetY,l=a-c*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ma=4,sv=[.125,.215,.35,.446,.526,.582],no=20,bh=new Tb,ov=new ut;let Ph=null,Lh=0,Dh=0;const Zs=(1+Math.sqrt(5))/2,Ko=1/Zs,av=[new Y(1,1,1),new Y(-1,1,1),new Y(1,1,-1),new Y(-1,1,-1),new Y(0,Zs,Ko),new Y(0,Zs,-Ko),new Y(Ko,0,Zs),new Y(-Ko,0,Zs),new Y(Zs,Ko,0),new Y(-Zs,Ko,0)];class lv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Ph=this._renderer.getRenderTarget(),Lh=this._renderer.getActiveCubeFace(),Dh=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ph,Lh,Dh),e.scissorTest=!1,wc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ga||e.mapping===Va?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ph=this._renderer.getRenderTarget(),Lh=this._renderer.getActiveCubeFace(),Dh=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ii,minFilter:Ii,generateMipmaps:!1,type:xu,format:ir,colorSpace:Xr,depthBuffer:!1},r=uv(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uv(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wb(s)),this._blurMaterial=Ab(s,e,t)}return r}_compileMaterial(e){const t=new Or(this._lodPlanes[0],e);this._renderer.compile(t,bh)}_sceneToCubeUV(e,t,i,r){const a=new Oi(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,f=c.autoClear,d=c.toneMapping;c.getClearColor(ov),c.toneMapping=Ts,c.autoClear=!1;const p=new M_({name:"PMREM.Background",side:ni,depthWrite:!1,depthTest:!1}),g=new Or(new zu,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(ov),_=!0);for(let h=0;h<6;h++){const v=h%3;v===0?(a.up.set(0,l[h],0),a.lookAt(u[h],0,0)):v===1?(a.up.set(0,0,l[h]),a.lookAt(0,u[h],0)):(a.up.set(0,l[h],0),a.lookAt(0,0,u[h]));const x=this._cubeSize;wc(r,v*x,h>2?x:0,x,x),c.setRenderTarget(r),_&&c.render(g,a),c.render(e,a)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=d,c.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ga||e.mapping===Va;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=fv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cv());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Or(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;wc(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,bh)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=av[(r-1)%av.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,f=new Or(this._lodPlanes[r],u),d=u.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*no-1),_=s/g,m=isFinite(s)?1+Math.floor(c*_):no;m>no&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${no}`);const h=[];let v=0;for(let S=0;S<no;++S){const P=S/_,M=Math.exp(-P*P/2);h.push(M),S===0?v+=M:S<m&&(v+=2*M)}for(let S=0;S<h.length;S++)h[S]=h[S]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-i;const y=this._sizeLods[r],w=3*y*(r>x-ma?r-x+ma:0),T=4*(this._cubeSize-y);wc(t,w,T,3*y,2*y),l.setRenderTarget(t),l.render(f,bh)}}function wb(n){const e=[],t=[],i=[];let r=n;const s=n-ma+1+sv.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-ma?l=sv[o-n+ma-1]:o===0&&(l=0),i.push(l);const u=1/(a-2),c=-u,f=1+u,d=[c,c,f,c,f,f,c,c,f,f,c,f],p=6,g=6,_=3,m=2,h=1,v=new Float32Array(_*g*p),x=new Float32Array(m*g*p),y=new Float32Array(h*g*p);for(let T=0;T<p;T++){const S=T%3*2/3-1,P=T>2?0:-1,M=[S,P,0,S+2/3,P,0,S+2/3,P+1,0,S,P,0,S+2/3,P+1,0,S,P+1,0];v.set(M,_*g*T),x.set(d,m*g*T);const E=[T,T,T,T,T,T];y.set(E,h*g*T)}const w=new ri;w.setAttribute("position",new Pn(v,_)),w.setAttribute("uv",new Pn(x,m)),w.setAttribute("faceIndex",new Pn(y,h)),e.push(w),r>ma&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function uv(n,e,t){const i=new Ao(n,e,t);return i.texture.mapping=vd,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function wc(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Ab(n,e,t){const i=new Float32Array(no),r=new Y(0,1,0);return new Co({name:"SphericalGaussianBlur",defines:{n:no,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:E_(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Es,depthTest:!1,depthWrite:!1})}function cv(){return new Co({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:E_(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Es,depthTest:!1,depthWrite:!1})}function fv(){return new Co({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:E_(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Es,depthTest:!1,depthWrite:!1})}function E_(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Cb(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,u=l===Wp||l===Xp,c=l===Ga||l===Va;if(u||c)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return t===null&&(t=new lv(n)),f=u?t.fromEquirectangular(a,f):t.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(u&&f&&f.height>0||c&&f&&r(f)){t===null&&(t=new lv(n));const d=u?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function r(a){let l=0;const u=6;for(let c=0;c<u;c++)a[c]!==void 0&&l++;return l===u}function s(a){const l=a.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Rb(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function bb(n,e,t,i){const r={},s=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,h=_.length;m<h;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const g in d)e.update(d[g],n.ARRAY_BUFFER);const p=f.morphAttributes;for(const g in p){const _=p[g];for(let m=0,h=_.length;m<h;m++)e.update(_[m],n.ARRAY_BUFFER)}}function u(f){const d=[],p=f.index,g=f.attributes.position;let _=0;if(p!==null){const v=p.array;_=p.version;for(let x=0,y=v.length;x<y;x+=3){const w=v[x+0],T=v[x+1],S=v[x+2];d.push(w,T,T,S,S,w)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,y=v.length/3-1;x<y;x+=3){const w=x+0,T=x+1,S=x+2;d.push(w,T,T,S,S,w)}}else return;const m=new(jS(d)?JS:QS)(d,1);m.version=_;const h=s.get(f);h&&e.remove(h),s.set(f,m)}function c(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&u(f)}else u(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:c}}function Pb(n,e,t,i){const r=i.isWebGL2;let s;function o(p){s=p}let a,l;function u(p){a=p.type,l=p.bytesPerElement}function c(p,g){n.drawElements(s,g,a,p*l),t.update(g,s,1)}function f(p,g,_){if(_===0)return;let m,h;if(r)m=n,h="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),h="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[h](s,g,a,p*l,_),t.update(g,s,_)}function d(p,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<_;h++)this.render(p[h]/l,g[h]);else{m.multiDrawElementsWEBGL(s,g,0,a,p,0,_);let h=0;for(let v=0;v<_;v++)h+=g[v];t.update(h,s,1)}}this.setMode=o,this.setIndex=u,this.render=c,this.renderInstances=f,this.renderMultiDraw=d}function Lb(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Db(n,e){return n[0]-e[0]}function Nb(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Ub(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,o=new mn,a=[];for(let u=0;u<8;u++)a[u]=[u,0];function l(u,c,f){const d=u.morphTargetInfluences;if(e.isWebGL2===!0){const g=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,_=g!==void 0?g.length:0;let m=s.get(c);if(m===void 0||m.count!==_){let F=function(){Q.dispose(),s.delete(c),c.removeEventListener("dispose",F)};var p=F;m!==void 0&&m.texture.dispose();const x=c.morphAttributes.position!==void 0,y=c.morphAttributes.normal!==void 0,w=c.morphAttributes.color!==void 0,T=c.morphAttributes.position||[],S=c.morphAttributes.normal||[],P=c.morphAttributes.color||[];let M=0;x===!0&&(M=1),y===!0&&(M=2),w===!0&&(M=3);let E=c.attributes.position.count*M,k=1;E>e.maxTextureSize&&(k=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const U=new Float32Array(E*k*4*_),Q=new $S(U,E,k,_);Q.type=us,Q.needsUpdate=!0;const L=M*4;for(let G=0;G<_;G++){const W=T[G],N=S[G],O=P[G],R=E*k*4*G;for(let K=0;K<W.count;K++){const J=K*L;x===!0&&(o.fromBufferAttribute(W,K),U[R+J+0]=o.x,U[R+J+1]=o.y,U[R+J+2]=o.z,U[R+J+3]=0),y===!0&&(o.fromBufferAttribute(N,K),U[R+J+4]=o.x,U[R+J+5]=o.y,U[R+J+6]=o.z,U[R+J+7]=0),w===!0&&(o.fromBufferAttribute(O,K),U[R+J+8]=o.x,U[R+J+9]=o.y,U[R+J+10]=o.z,U[R+J+11]=O.itemSize===4?o.w:1)}}m={count:_,texture:Q,size:new St(E,k)},s.set(c,m),c.addEventListener("dispose",F)}let h=0;for(let x=0;x<d.length;x++)h+=d[x];const v=c.morphTargetsRelative?1:1-h;f.getUniforms().setValue(n,"morphTargetBaseInfluence",v),f.getUniforms().setValue(n,"morphTargetInfluences",d),f.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const g=d===void 0?0:d.length;let _=i[c.id];if(_===void 0||_.length!==g){_=[];for(let y=0;y<g;y++)_[y]=[y,0];i[c.id]=_}for(let y=0;y<g;y++){const w=_[y];w[0]=y,w[1]=d[y]}_.sort(Nb);for(let y=0;y<8;y++)y<g&&_[y][1]?(a[y][0]=_[y][0],a[y][1]=_[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(Db);const m=c.morphAttributes.position,h=c.morphAttributes.normal;let v=0;for(let y=0;y<8;y++){const w=a[y],T=w[0],S=w[1];T!==Number.MAX_SAFE_INTEGER&&S?(m&&c.getAttribute("morphTarget"+y)!==m[T]&&c.setAttribute("morphTarget"+y,m[T]),h&&c.getAttribute("morphNormal"+y)!==h[T]&&c.setAttribute("morphNormal"+y,h[T]),r[y]=S,v+=S):(m&&c.hasAttribute("morphTarget"+y)===!0&&c.deleteAttribute("morphTarget"+y),h&&c.hasAttribute("morphNormal"+y)===!0&&c.deleteAttribute("morphNormal"+y),r[y]=0)}const x=c.morphTargetsRelative?1:1-v;f.getUniforms().setValue(n,"morphTargetBaseInfluence",x),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function Ib(n,e,t,i){let r=new WeakMap;function s(l){const u=i.render.frame,c=l.geometry,f=e.get(l,c);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return f}function o(){r=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:o}}class sM extends ii{constructor(e,t,i,r,s,o,a,l,u,c){if(c=c!==void 0?c:fo,c!==fo&&c!==Wa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===fo&&(i=ls),i===void 0&&c===Wa&&(i=co),super(null,r,s,o,a,l,c,i,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Hn,this.minFilter=l!==void 0?l:Hn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const oM=new ii,aM=new sM(1,1);aM.compareFunction=XS;const lM=new $S,uM=new vA,cM=new nM,dv=[],hv=[],pv=new Float32Array(16),mv=new Float32Array(9),_v=new Float32Array(4);function il(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=dv[r];if(s===void 0&&(s=new Float32Array(r),dv[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function sn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function on(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Md(n,e){let t=hv[e];t===void 0&&(t=new Int32Array(e),hv[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Ob(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Fb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;n.uniform2fv(this.addr,e),on(t,e)}}function kb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(sn(t,e))return;n.uniform3fv(this.addr,e),on(t,e)}}function zb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;n.uniform4fv(this.addr,e),on(t,e)}}function Bb(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(sn(t,i))return;_v.set(i),n.uniformMatrix2fv(this.addr,!1,_v),on(t,i)}}function Hb(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(sn(t,i))return;mv.set(i),n.uniformMatrix3fv(this.addr,!1,mv),on(t,i)}}function Gb(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(sn(t,i))return;pv.set(i),n.uniformMatrix4fv(this.addr,!1,pv),on(t,i)}}function Vb(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Wb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;n.uniform2iv(this.addr,e),on(t,e)}}function Xb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;n.uniform3iv(this.addr,e),on(t,e)}}function jb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;n.uniform4iv(this.addr,e),on(t,e)}}function Yb(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function qb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;n.uniform2uiv(this.addr,e),on(t,e)}}function $b(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;n.uniform3uiv(this.addr,e),on(t,e)}}function Kb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;n.uniform4uiv(this.addr,e),on(t,e)}}function Zb(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?aM:oM;t.setTexture2D(e||s,r)}function Qb(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||uM,r)}function Jb(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||cM,r)}function eP(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||lM,r)}function tP(n){switch(n){case 5126:return Ob;case 35664:return Fb;case 35665:return kb;case 35666:return zb;case 35674:return Bb;case 35675:return Hb;case 35676:return Gb;case 5124:case 35670:return Vb;case 35667:case 35671:return Wb;case 35668:case 35672:return Xb;case 35669:case 35673:return jb;case 5125:return Yb;case 36294:return qb;case 36295:return $b;case 36296:return Kb;case 35678:case 36198:case 36298:case 36306:case 35682:return Zb;case 35679:case 36299:case 36307:return Qb;case 35680:case 36300:case 36308:case 36293:return Jb;case 36289:case 36303:case 36311:case 36292:return eP}}function nP(n,e){n.uniform1fv(this.addr,e)}function iP(n,e){const t=il(e,this.size,2);n.uniform2fv(this.addr,t)}function rP(n,e){const t=il(e,this.size,3);n.uniform3fv(this.addr,t)}function sP(n,e){const t=il(e,this.size,4);n.uniform4fv(this.addr,t)}function oP(n,e){const t=il(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function aP(n,e){const t=il(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function lP(n,e){const t=il(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function uP(n,e){n.uniform1iv(this.addr,e)}function cP(n,e){n.uniform2iv(this.addr,e)}function fP(n,e){n.uniform3iv(this.addr,e)}function dP(n,e){n.uniform4iv(this.addr,e)}function hP(n,e){n.uniform1uiv(this.addr,e)}function pP(n,e){n.uniform2uiv(this.addr,e)}function mP(n,e){n.uniform3uiv(this.addr,e)}function _P(n,e){n.uniform4uiv(this.addr,e)}function gP(n,e,t){const i=this.cache,r=e.length,s=Md(t,r);sn(i,s)||(n.uniform1iv(this.addr,s),on(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||oM,s[o])}function vP(n,e,t){const i=this.cache,r=e.length,s=Md(t,r);sn(i,s)||(n.uniform1iv(this.addr,s),on(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||uM,s[o])}function xP(n,e,t){const i=this.cache,r=e.length,s=Md(t,r);sn(i,s)||(n.uniform1iv(this.addr,s),on(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||cM,s[o])}function yP(n,e,t){const i=this.cache,r=e.length,s=Md(t,r);sn(i,s)||(n.uniform1iv(this.addr,s),on(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||lM,s[o])}function SP(n){switch(n){case 5126:return nP;case 35664:return iP;case 35665:return rP;case 35666:return sP;case 35674:return oP;case 35675:return aP;case 35676:return lP;case 5124:case 35670:return uP;case 35667:case 35671:return cP;case 35668:case 35672:return fP;case 35669:case 35673:return dP;case 5125:return hP;case 36294:return pP;case 36295:return mP;case 36296:return _P;case 35678:case 36198:case 36298:case 36306:case 35682:return gP;case 35679:case 36299:case 36307:return vP;case 35680:case 36300:case 36308:case 36293:return xP;case 36289:case 36303:case 36311:case 36292:return yP}}class MP{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=tP(t.type)}}class EP{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=SP(t.type)}}class TP{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Nh=/(\w+)(\])?(\[|\.)?/g;function gv(n,e){n.seq.push(e),n.map[e.id]=e}function wP(n,e,t){const i=n.name,r=i.length;for(Nh.lastIndex=0;;){const s=Nh.exec(i),o=Nh.lastIndex;let a=s[1];const l=s[2]==="]",u=s[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===r){gv(t,u===void 0?new MP(a,n,e):new EP(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new TP(a),gv(t,f)),t=f}}}class ef{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);wP(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function vv(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const AP=37297;let CP=0;function RP(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function bP(n){const e=yt.getPrimaries(yt.workingColorSpace),t=yt.getPrimaries(n);let i;switch(e===t?i="":e===Hf&&t===Bf?i="LinearDisplayP3ToLinearSRGB":e===Bf&&t===Hf&&(i="LinearSRGBToLinearDisplayP3"),n){case Xr:case xd:return[i,"LinearTransferOETF"];case pn:case y_:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function xv(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+RP(n.getShaderSource(e),o)}else return r}function PP(n,e){const t=bP(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function LP(n,e){let t;switch(e){case Bw:t="Linear";break;case Hw:t="Reinhard";break;case Gw:t="OptimizedCineon";break;case Vw:t="ACESFilmic";break;case Xw:t="AgX";break;case Ww:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function DP(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(_a).join(`
`)}function NP(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(_a).join(`
`)}function UP(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function IP(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function _a(n){return n!==""}function yv(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Sv(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const OP=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zp(n){return n.replace(OP,kP)}const FP=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function kP(n,e){let t=Ze[e];if(t===void 0){const i=FP.get(e);if(i!==void 0)t=Ze[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Zp(t)}const zP=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mv(n){return n.replace(zP,BP)}function BP(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ev(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function HP(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===US?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===pw?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Cr&&(e="SHADOWMAP_TYPE_VSM"),e}function GP(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ga:case Va:e="ENVMAP_TYPE_CUBE";break;case vd:e="ENVMAP_TYPE_CUBE_UV";break}return e}function VP(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Va:e="ENVMAP_MODE_REFRACTION";break}return e}function WP(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case IS:e="ENVMAP_BLENDING_MULTIPLY";break;case kw:e="ENVMAP_BLENDING_MIX";break;case zw:e="ENVMAP_BLENDING_ADD";break}return e}function XP(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function jP(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=HP(t),u=GP(t),c=VP(t),f=WP(t),d=XP(t),p=t.isWebGL2?"":DP(t),g=NP(t),_=UP(s),m=r.createProgram();let h,v,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(_a).join(`
`),h.length>0&&(h+=`
`),v=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(_a).join(`
`),v.length>0&&(v+=`
`)):(h=[Ev(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_a).join(`
`),v=[p,Ev(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ts?"#define TONE_MAPPING":"",t.toneMapping!==Ts?Ze.tonemapping_pars_fragment:"",t.toneMapping!==Ts?LP("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,PP("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_a).join(`
`)),o=Zp(o),o=yv(o,t),o=Sv(o,t),a=Zp(a),a=yv(a,t),a=Sv(a,t),o=Mv(o),a=Mv(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,h=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+h,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===H0?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===H0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const y=x+h+o,w=x+v+a,T=vv(r,r.VERTEX_SHADER,y),S=vv(r,r.FRAGMENT_SHADER,w);r.attachShader(m,T),r.attachShader(m,S),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function P(U){if(n.debug.checkShaderErrors){const Q=r.getProgramInfoLog(m).trim(),L=r.getShaderInfoLog(T).trim(),F=r.getShaderInfoLog(S).trim();let G=!0,W=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(G=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,m,T,S);else{const N=xv(r,T,"vertex"),O=xv(r,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+Q+`
`+N+`
`+O)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(L===""||F==="")&&(W=!1);W&&(U.diagnostics={runnable:G,programLog:Q,vertexShader:{log:L,prefix:h},fragmentShader:{log:F,prefix:v}})}r.deleteShader(T),r.deleteShader(S),M=new ef(r,m),E=IP(r,m)}let M;this.getUniforms=function(){return M===void 0&&P(this),M};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=r.getProgramParameter(m,AP)),k},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=CP++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=S,this}let YP=0;class qP{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new $P(e),t.set(e,i)),i}}class $P{constructor(e){this.id=YP++,this.code=e,this.usedTimes=0}}function KP(n,e,t,i,r,s,o){const a=new KS,l=new qP,u=[],c=r.isWebGL2,f=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,E,k,U,Q){const L=U.fog,F=Q.geometry,G=M.isMeshStandardMaterial?U.environment:null,W=(M.isMeshStandardMaterial?t:e).get(M.envMap||G),N=W&&W.mapping===vd?W.image.height:null,O=g[M.type];M.precision!==null&&(p=r.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const R=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,K=R!==void 0?R.length:0;let J=0;F.morphAttributes.position!==void 0&&(J=1),F.morphAttributes.normal!==void 0&&(J=2),F.morphAttributes.color!==void 0&&(J=3);let q,Z,se,me;if(O){const Me=fr[O];q=Me.vertexShader,Z=Me.fragmentShader}else q=M.vertexShader,Z=M.fragmentShader,l.update(M),se=l.getVertexShaderID(M),me=l.getFragmentShaderID(M);const de=n.getRenderTarget(),De=Q.isInstancedMesh===!0,Ne=Q.isBatchedMesh===!0,Oe=!!M.map,We=!!M.matcap,H=!!W,Xe=!!M.aoMap,ve=!!M.lightMap,Ue=!!M.bumpMap,xe=!!M.normalMap,V=!!M.displacementMap,Be=!!M.emissiveMap,b=!!M.metalnessMap,A=!!M.roughnessMap,z=M.anisotropy>0,ne=M.clearcoat>0,te=M.iridescence>0,ie=M.sheen>0,ge=M.transmission>0,he=z&&!!M.anisotropyMap,fe=ne&&!!M.clearcoatMap,Re=ne&&!!M.clearcoatNormalMap,Ve=ne&&!!M.clearcoatRoughnessMap,ee=te&&!!M.iridescenceMap,lt=te&&!!M.iridescenceThicknessMap,Pe=ie&&!!M.sheenColorMap,je=ie&&!!M.sheenRoughnessMap,Ae=!!M.specularMap,ye=!!M.specularColorMap,Ye=!!M.specularIntensityMap,Je=ge&&!!M.transmissionMap,ht=ge&&!!M.thicknessMap,_e=!!M.gradientMap,ae=!!M.alphaMap,D=M.alphaTest>0,le=!!M.alphaHash,ue=!!M.extensions,ke=!!F.attributes.uv1,Ie=!!F.attributes.uv2,ot=!!F.attributes.uv3;let ft=Ts;return M.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(ft=n.toneMapping),{isWebGL2:c,shaderID:O,shaderType:M.type,shaderName:M.name,vertexShader:q,fragmentShader:Z,defines:M.defines,customVertexShaderID:se,customFragmentShaderID:me,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ne,instancing:De,instancingColor:De&&Q.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:de===null?n.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:Xr,map:Oe,matcap:We,envMap:H,envMapMode:H&&W.mapping,envMapCubeUVHeight:N,aoMap:Xe,lightMap:ve,bumpMap:Ue,normalMap:xe,displacementMap:d&&V,emissiveMap:Be,normalMapObjectSpace:xe&&M.normalMapType===rA,normalMapTangentSpace:xe&&M.normalMapType===iA,metalnessMap:b,roughnessMap:A,anisotropy:z,anisotropyMap:he,clearcoat:ne,clearcoatMap:fe,clearcoatNormalMap:Re,clearcoatRoughnessMap:Ve,iridescence:te,iridescenceMap:ee,iridescenceThicknessMap:lt,sheen:ie,sheenColorMap:Pe,sheenRoughnessMap:je,specularMap:Ae,specularColorMap:ye,specularIntensityMap:Ye,transmission:ge,transmissionMap:Je,thicknessMap:ht,gradientMap:_e,opaque:M.transparent===!1&&M.blending===Aa,alphaMap:ae,alphaTest:D,alphaHash:le,combine:M.combine,mapUv:Oe&&_(M.map.channel),aoMapUv:Xe&&_(M.aoMap.channel),lightMapUv:ve&&_(M.lightMap.channel),bumpMapUv:Ue&&_(M.bumpMap.channel),normalMapUv:xe&&_(M.normalMap.channel),displacementMapUv:V&&_(M.displacementMap.channel),emissiveMapUv:Be&&_(M.emissiveMap.channel),metalnessMapUv:b&&_(M.metalnessMap.channel),roughnessMapUv:A&&_(M.roughnessMap.channel),anisotropyMapUv:he&&_(M.anisotropyMap.channel),clearcoatMapUv:fe&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Re&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ve&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:je&&_(M.sheenRoughnessMap.channel),specularMapUv:Ae&&_(M.specularMap.channel),specularColorMapUv:ye&&_(M.specularColorMap.channel),specularIntensityMapUv:Ye&&_(M.specularIntensityMap.channel),transmissionMapUv:Je&&_(M.transmissionMap.channel),thicknessMapUv:ht&&_(M.thicknessMap.channel),alphaMapUv:ae&&_(M.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(xe||z),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:ke,vertexUv2s:Ie,vertexUv3s:ot,pointsUvs:Q.isPoints===!0&&!!F.attributes.uv&&(Oe||ae),fog:!!L,useFog:M.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:Q.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:J,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:ft,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Oe&&M.map.isVideoTexture===!0&&yt.getTransfer(M.map.colorSpace)===bt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===hr,flipSided:M.side===ni,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ue&&M.extensions.derivatives===!0,extensionFragDepth:ue&&M.extensions.fragDepth===!0,extensionDrawBuffers:ue&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ue&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ue&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:c||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:c||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:c||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function h(M){const E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(const k in M.defines)E.push(k),E.push(M.defines[k]);return M.isRawShaderMaterial===!1&&(v(E,M),x(E,M),E.push(n.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function v(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function x(M,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),M.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function y(M){const E=g[M.type];let k;if(E){const U=fr[E];k=LA.clone(U.uniforms)}else k=M.uniforms;return k}function w(M,E){let k;for(let U=0,Q=u.length;U<Q;U++){const L=u[U];if(L.cacheKey===E){k=L,++k.usedTimes;break}}return k===void 0&&(k=new jP(n,E,M,s),u.push(k)),k}function T(M){if(--M.usedTimes===0){const E=u.indexOf(M);u[E]=u[u.length-1],u.pop(),M.destroy()}}function S(M){l.remove(M)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:y,acquireProgram:w,releaseProgram:T,releaseShaderCache:S,programs:u,dispose:P}}function ZP(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function i(s,o,a){n.get(s)[o]=a}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function QP(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Tv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function wv(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,d,p,g,_,m){let h=n[e];return h===void 0?(h={id:f.id,object:f,geometry:d,material:p,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[e]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=p,h.groupOrder=g,h.renderOrder=f.renderOrder,h.z=_,h.group=m),e++,h}function a(f,d,p,g,_,m){const h=o(f,d,p,g,_,m);p.transmission>0?i.push(h):p.transparent===!0?r.push(h):t.push(h)}function l(f,d,p,g,_,m){const h=o(f,d,p,g,_,m);p.transmission>0?i.unshift(h):p.transparent===!0?r.unshift(h):t.unshift(h)}function u(f,d){t.length>1&&t.sort(f||QP),i.length>1&&i.sort(d||Tv),r.length>1&&r.sort(d||Tv)}function c(){for(let f=e,d=n.length;f<d;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:c,sort:u}}function JP(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new wv,n.set(i,[o])):r>=s.length?(o=new wv,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function e2(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Y,color:new ut};break;case"SpotLight":t={position:new Y,direction:new Y,color:new ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new ut,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new ut,groundColor:new ut};break;case"RectAreaLight":t={color:new ut,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return n[e.id]=t,t}}}function t2(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let n2=0;function i2(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function r2(n,e){const t=new e2,i=t2(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)r.probe.push(new Y);const s=new Y,o=new rn,a=new rn;function l(c,f){let d=0,p=0,g=0;for(let U=0;U<9;U++)r.probe[U].set(0,0,0);let _=0,m=0,h=0,v=0,x=0,y=0,w=0,T=0,S=0,P=0,M=0;c.sort(i2);const E=f===!0?Math.PI:1;for(let U=0,Q=c.length;U<Q;U++){const L=c[U],F=L.color,G=L.intensity,W=L.distance,N=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=F.r*G*E,p+=F.g*G*E,g+=F.b*G*E;else if(L.isLightProbe){for(let O=0;O<9;O++)r.probe[O].addScaledVector(L.sh.coefficients[O],G);M++}else if(L.isDirectionalLight){const O=t.get(L);if(O.color.copy(L.color).multiplyScalar(L.intensity*E),L.castShadow){const R=L.shadow,K=i.get(L);K.shadowBias=R.bias,K.shadowNormalBias=R.normalBias,K.shadowRadius=R.radius,K.shadowMapSize=R.mapSize,r.directionalShadow[_]=K,r.directionalShadowMap[_]=N,r.directionalShadowMatrix[_]=L.shadow.matrix,y++}r.directional[_]=O,_++}else if(L.isSpotLight){const O=t.get(L);O.position.setFromMatrixPosition(L.matrixWorld),O.color.copy(F).multiplyScalar(G*E),O.distance=W,O.coneCos=Math.cos(L.angle),O.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),O.decay=L.decay,r.spot[h]=O;const R=L.shadow;if(L.map&&(r.spotLightMap[S]=L.map,S++,R.updateMatrices(L),L.castShadow&&P++),r.spotLightMatrix[h]=R.matrix,L.castShadow){const K=i.get(L);K.shadowBias=R.bias,K.shadowNormalBias=R.normalBias,K.shadowRadius=R.radius,K.shadowMapSize=R.mapSize,r.spotShadow[h]=K,r.spotShadowMap[h]=N,T++}h++}else if(L.isRectAreaLight){const O=t.get(L);O.color.copy(F).multiplyScalar(G),O.halfWidth.set(L.width*.5,0,0),O.halfHeight.set(0,L.height*.5,0),r.rectArea[v]=O,v++}else if(L.isPointLight){const O=t.get(L);if(O.color.copy(L.color).multiplyScalar(L.intensity*E),O.distance=L.distance,O.decay=L.decay,L.castShadow){const R=L.shadow,K=i.get(L);K.shadowBias=R.bias,K.shadowNormalBias=R.normalBias,K.shadowRadius=R.radius,K.shadowMapSize=R.mapSize,K.shadowCameraNear=R.camera.near,K.shadowCameraFar=R.camera.far,r.pointShadow[m]=K,r.pointShadowMap[m]=N,r.pointShadowMatrix[m]=L.shadow.matrix,w++}r.point[m]=O,m++}else if(L.isHemisphereLight){const O=t.get(L);O.skyColor.copy(L.color).multiplyScalar(G*E),O.groundColor.copy(L.groundColor).multiplyScalar(G*E),r.hemi[x]=O,x++}}v>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=pe.LTC_FLOAT_1,r.rectAreaLTC2=pe.LTC_FLOAT_2):(r.rectAreaLTC1=pe.LTC_HALF_1,r.rectAreaLTC2=pe.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=pe.LTC_FLOAT_1,r.rectAreaLTC2=pe.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=pe.LTC_HALF_1,r.rectAreaLTC2=pe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=p,r.ambient[2]=g;const k=r.hash;(k.directionalLength!==_||k.pointLength!==m||k.spotLength!==h||k.rectAreaLength!==v||k.hemiLength!==x||k.numDirectionalShadows!==y||k.numPointShadows!==w||k.numSpotShadows!==T||k.numSpotMaps!==S||k.numLightProbes!==M)&&(r.directional.length=_,r.spot.length=h,r.rectArea.length=v,r.point.length=m,r.hemi.length=x,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=w,r.pointShadowMap.length=w,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=w,r.spotLightMatrix.length=T+S-P,r.spotLightMap.length=S,r.numSpotLightShadowsWithMaps=P,r.numLightProbes=M,k.directionalLength=_,k.pointLength=m,k.spotLength=h,k.rectAreaLength=v,k.hemiLength=x,k.numDirectionalShadows=y,k.numPointShadows=w,k.numSpotShadows=T,k.numSpotMaps=S,k.numLightProbes=M,r.version=n2++)}function u(c,f){let d=0,p=0,g=0,_=0,m=0;const h=f.matrixWorldInverse;for(let v=0,x=c.length;v<x;v++){const y=c[v];if(y.isDirectionalLight){const w=r.directional[d];w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(h),d++}else if(y.isSpotLight){const w=r.spot[g];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(h),w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(h),g++}else if(y.isRectAreaLight){const w=r.rectArea[_];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(h),a.identity(),o.copy(y.matrixWorld),o.premultiply(h),a.extractRotation(o),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const w=r.point[p];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(h),p++}else if(y.isHemisphereLight){const w=r.hemi[m];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(h),m++}}}return{setup:l,setupView:u,state:r}}function Av(n,e){const t=new r2(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function a(f){r.push(f)}function l(f){t.setup(i,f)}function u(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a}}function s2(n,e){let t=new WeakMap;function i(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new Av(n,e),t.set(s,[l])):o>=a.length?(l=new Av(n,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class o2 extends nl{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=tA,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class a2 extends nl{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const l2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,u2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function c2(n,e,t){let i=new iM;const r=new St,s=new St,o=new mn,a=new o2({depthPacking:nA}),l=new a2,u={},c=t.maxTextureSize,f={[Ls]:ni,[ni]:Ls,[hr]:hr},d=new Co({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:l2,fragmentShader:u2}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new ri;g.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Or(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=US;let h=this.type;this.render=function(T,S,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const M=n.getRenderTarget(),E=n.getActiveCubeFace(),k=n.getActiveMipmapLevel(),U=n.state;U.setBlending(Es),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const Q=h!==Cr&&this.type===Cr,L=h===Cr&&this.type!==Cr;for(let F=0,G=T.length;F<G;F++){const W=T[F],N=W.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);const O=N.getFrameExtents();if(r.multiply(O),s.copy(N.mapSize),(r.x>c||r.y>c)&&(r.x>c&&(s.x=Math.floor(c/O.x),r.x=s.x*O.x,N.mapSize.x=s.x),r.y>c&&(s.y=Math.floor(c/O.y),r.y=s.y*O.y,N.mapSize.y=s.y)),N.map===null||Q===!0||L===!0){const K=this.type!==Cr?{minFilter:Hn,magFilter:Hn}:{};N.map!==null&&N.map.dispose(),N.map=new Ao(r.x,r.y,K),N.map.texture.name=W.name+".shadowMap",N.camera.updateProjectionMatrix()}n.setRenderTarget(N.map),n.clear();const R=N.getViewportCount();for(let K=0;K<R;K++){const J=N.getViewport(K);o.set(s.x*J.x,s.y*J.y,s.x*J.z,s.y*J.w),U.viewport(o),N.updateMatrices(W,K),i=N.getFrustum(),y(S,P,N.camera,W,this.type)}N.isPointLightShadow!==!0&&this.type===Cr&&v(N,P),N.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(M,E,k)};function v(T,S){const P=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ao(r.x,r.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(S,null,P,d,_,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(S,null,P,p,_,null)}function x(T,S,P,M){let E=null;const k=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(k!==void 0)E=k;else if(E=P.isPointLight===!0?l:a,n.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const U=E.uuid,Q=S.uuid;let L=u[U];L===void 0&&(L={},u[U]=L);let F=L[Q];F===void 0&&(F=E.clone(),L[Q]=F,S.addEventListener("dispose",w)),E=F}if(E.visible=S.visible,E.wireframe=S.wireframe,M===Cr?E.side=S.shadowSide!==null?S.shadowSide:S.side:E.side=S.shadowSide!==null?S.shadowSide:f[S.side],E.alphaMap=S.alphaMap,E.alphaTest=S.alphaTest,E.map=S.map,E.clipShadows=S.clipShadows,E.clippingPlanes=S.clippingPlanes,E.clipIntersection=S.clipIntersection,E.displacementMap=S.displacementMap,E.displacementScale=S.displacementScale,E.displacementBias=S.displacementBias,E.wireframeLinewidth=S.wireframeLinewidth,E.linewidth=S.linewidth,P.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const U=n.properties.get(E);U.light=P}return E}function y(T,S,P,M,E){if(T.visible===!1)return;if(T.layers.test(S.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===Cr)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const Q=e.update(T),L=T.material;if(Array.isArray(L)){const F=Q.groups;for(let G=0,W=F.length;G<W;G++){const N=F[G],O=L[N.materialIndex];if(O&&O.visible){const R=x(T,O,M,E);T.onBeforeShadow(n,T,S,P,Q,R,N),n.renderBufferDirect(P,null,Q,R,T,N),T.onAfterShadow(n,T,S,P,Q,R,N)}}}else if(L.visible){const F=x(T,L,M,E);T.onBeforeShadow(n,T,S,P,Q,F,null),n.renderBufferDirect(P,null,Q,F,T,null),T.onAfterShadow(n,T,S,P,Q,F,null)}}const U=T.children;for(let Q=0,L=U.length;Q<L;Q++)y(U[Q],S,P,M,E)}function w(T){T.target.removeEventListener("dispose",w);for(const P in u){const M=u[P],E=T.target.uuid;E in M&&(M[E].dispose(),delete M[E])}}}function f2(n,e,t){const i=t.isWebGL2;function r(){let D=!1;const le=new mn;let ue=null;const ke=new mn(0,0,0,0);return{setMask:function(Ie){ue!==Ie&&!D&&(n.colorMask(Ie,Ie,Ie,Ie),ue=Ie)},setLocked:function(Ie){D=Ie},setClear:function(Ie,ot,ft,Ce,Me){Me===!0&&(Ie*=Ce,ot*=Ce,ft*=Ce),le.set(Ie,ot,ft,Ce),ke.equals(le)===!1&&(n.clearColor(Ie,ot,ft,Ce),ke.copy(le))},reset:function(){D=!1,ue=null,ke.set(-1,0,0,0)}}}function s(){let D=!1,le=null,ue=null,ke=null;return{setTest:function(Ie){Ie?Ne(n.DEPTH_TEST):Oe(n.DEPTH_TEST)},setMask:function(Ie){le!==Ie&&!D&&(n.depthMask(Ie),le=Ie)},setFunc:function(Ie){if(ue!==Ie){switch(Ie){case Lw:n.depthFunc(n.NEVER);break;case Dw:n.depthFunc(n.ALWAYS);break;case Nw:n.depthFunc(n.LESS);break;case kf:n.depthFunc(n.LEQUAL);break;case Uw:n.depthFunc(n.EQUAL);break;case Iw:n.depthFunc(n.GEQUAL);break;case Ow:n.depthFunc(n.GREATER);break;case Fw:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ue=Ie}},setLocked:function(Ie){D=Ie},setClear:function(Ie){ke!==Ie&&(n.clearDepth(Ie),ke=Ie)},reset:function(){D=!1,le=null,ue=null,ke=null}}}function o(){let D=!1,le=null,ue=null,ke=null,Ie=null,ot=null,ft=null,Ce=null,Me=null;return{setTest:function(Le){D||(Le?Ne(n.STENCIL_TEST):Oe(n.STENCIL_TEST))},setMask:function(Le){le!==Le&&!D&&(n.stencilMask(Le),le=Le)},setFunc:function(Le,oe,ze){(ue!==Le||ke!==oe||Ie!==ze)&&(n.stencilFunc(Le,oe,ze),ue=Le,ke=oe,Ie=ze)},setOp:function(Le,oe,ze){(ot!==Le||ft!==oe||Ce!==ze)&&(n.stencilOp(Le,oe,ze),ot=Le,ft=oe,Ce=ze)},setLocked:function(Le){D=Le},setClear:function(Le){Me!==Le&&(n.clearStencil(Le),Me=Le)},reset:function(){D=!1,le=null,ue=null,ke=null,Ie=null,ot=null,ft=null,Ce=null,Me=null}}}const a=new r,l=new s,u=new o,c=new WeakMap,f=new WeakMap;let d={},p={},g=new WeakMap,_=[],m=null,h=!1,v=null,x=null,y=null,w=null,T=null,S=null,P=null,M=new ut(0,0,0),E=0,k=!1,U=null,Q=null,L=null,F=null,G=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,O=0;const R=n.getParameter(n.VERSION);R.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(R)[1]),N=O>=1):R.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(R)[1]),N=O>=2);let K=null,J={};const q=n.getParameter(n.SCISSOR_BOX),Z=n.getParameter(n.VIEWPORT),se=new mn().fromArray(q),me=new mn().fromArray(Z);function de(D,le,ue,ke){const Ie=new Uint8Array(4),ot=n.createTexture();n.bindTexture(D,ot),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ft=0;ft<ue;ft++)i&&(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)?n.texImage3D(le,0,n.RGBA,1,1,ke,0,n.RGBA,n.UNSIGNED_BYTE,Ie):n.texImage2D(le+ft,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ie);return ot}const De={};De[n.TEXTURE_2D]=de(n.TEXTURE_2D,n.TEXTURE_2D,1),De[n.TEXTURE_CUBE_MAP]=de(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(De[n.TEXTURE_2D_ARRAY]=de(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),De[n.TEXTURE_3D]=de(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),u.setClear(0),Ne(n.DEPTH_TEST),l.setFunc(kf),Be(!1),b(l0),Ne(n.CULL_FACE),xe(Es);function Ne(D){d[D]!==!0&&(n.enable(D),d[D]=!0)}function Oe(D){d[D]!==!1&&(n.disable(D),d[D]=!1)}function We(D,le){return p[D]!==le?(n.bindFramebuffer(D,le),p[D]=le,i&&(D===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=le),D===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=le)),!0):!1}function H(D,le){let ue=_,ke=!1;if(D)if(ue=g.get(le),ue===void 0&&(ue=[],g.set(le,ue)),D.isWebGLMultipleRenderTargets){const Ie=D.texture;if(ue.length!==Ie.length||ue[0]!==n.COLOR_ATTACHMENT0){for(let ot=0,ft=Ie.length;ot<ft;ot++)ue[ot]=n.COLOR_ATTACHMENT0+ot;ue.length=Ie.length,ke=!0}}else ue[0]!==n.COLOR_ATTACHMENT0&&(ue[0]=n.COLOR_ATTACHMENT0,ke=!0);else ue[0]!==n.BACK&&(ue[0]=n.BACK,ke=!0);ke&&(t.isWebGL2?n.drawBuffers(ue):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ue))}function Xe(D){return m!==D?(n.useProgram(D),m=D,!0):!1}const ve={[to]:n.FUNC_ADD,[_w]:n.FUNC_SUBTRACT,[gw]:n.FUNC_REVERSE_SUBTRACT};if(i)ve[f0]=n.MIN,ve[d0]=n.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(ve[f0]=D.MIN_EXT,ve[d0]=D.MAX_EXT)}const Ue={[vw]:n.ZERO,[xw]:n.ONE,[yw]:n.SRC_COLOR,[Gp]:n.SRC_ALPHA,[Aw]:n.SRC_ALPHA_SATURATE,[Tw]:n.DST_COLOR,[Mw]:n.DST_ALPHA,[Sw]:n.ONE_MINUS_SRC_COLOR,[Vp]:n.ONE_MINUS_SRC_ALPHA,[ww]:n.ONE_MINUS_DST_COLOR,[Ew]:n.ONE_MINUS_DST_ALPHA,[Cw]:n.CONSTANT_COLOR,[Rw]:n.ONE_MINUS_CONSTANT_COLOR,[bw]:n.CONSTANT_ALPHA,[Pw]:n.ONE_MINUS_CONSTANT_ALPHA};function xe(D,le,ue,ke,Ie,ot,ft,Ce,Me,Le){if(D===Es){h===!0&&(Oe(n.BLEND),h=!1);return}if(h===!1&&(Ne(n.BLEND),h=!0),D!==mw){if(D!==v||Le!==k){if((x!==to||T!==to)&&(n.blendEquation(n.FUNC_ADD),x=to,T=to),Le)switch(D){case Aa:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ff:n.blendFunc(n.ONE,n.ONE);break;case u0:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case c0:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Aa:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ff:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case u0:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case c0:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,w=null,S=null,P=null,M.set(0,0,0),E=0,v=D,k=Le}return}Ie=Ie||le,ot=ot||ue,ft=ft||ke,(le!==x||Ie!==T)&&(n.blendEquationSeparate(ve[le],ve[Ie]),x=le,T=Ie),(ue!==y||ke!==w||ot!==S||ft!==P)&&(n.blendFuncSeparate(Ue[ue],Ue[ke],Ue[ot],Ue[ft]),y=ue,w=ke,S=ot,P=ft),(Ce.equals(M)===!1||Me!==E)&&(n.blendColor(Ce.r,Ce.g,Ce.b,Me),M.copy(Ce),E=Me),v=D,k=!1}function V(D,le){D.side===hr?Oe(n.CULL_FACE):Ne(n.CULL_FACE);let ue=D.side===ni;le&&(ue=!ue),Be(ue),D.blending===Aa&&D.transparent===!1?xe(Es):xe(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),l.setFunc(D.depthFunc),l.setTest(D.depthTest),l.setMask(D.depthWrite),a.setMask(D.colorWrite);const ke=D.stencilWrite;u.setTest(ke),ke&&(u.setMask(D.stencilWriteMask),u.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),u.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),z(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Ne(n.SAMPLE_ALPHA_TO_COVERAGE):Oe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Be(D){U!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),U=D)}function b(D){D!==dw?(Ne(n.CULL_FACE),D!==Q&&(D===l0?n.cullFace(n.BACK):D===hw?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Oe(n.CULL_FACE),Q=D}function A(D){D!==L&&(N&&n.lineWidth(D),L=D)}function z(D,le,ue){D?(Ne(n.POLYGON_OFFSET_FILL),(F!==le||G!==ue)&&(n.polygonOffset(le,ue),F=le,G=ue)):Oe(n.POLYGON_OFFSET_FILL)}function ne(D){D?Ne(n.SCISSOR_TEST):Oe(n.SCISSOR_TEST)}function te(D){D===void 0&&(D=n.TEXTURE0+W-1),K!==D&&(n.activeTexture(D),K=D)}function ie(D,le,ue){ue===void 0&&(K===null?ue=n.TEXTURE0+W-1:ue=K);let ke=J[ue];ke===void 0&&(ke={type:void 0,texture:void 0},J[ue]=ke),(ke.type!==D||ke.texture!==le)&&(K!==ue&&(n.activeTexture(ue),K=ue),n.bindTexture(D,le||De[D]),ke.type=D,ke.texture=le)}function ge(){const D=J[K];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function he(){try{n.compressedTexImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function fe(){try{n.compressedTexImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Re(){try{n.texSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ve(){try{n.texSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ee(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pe(){try{n.texStorage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function je(){try{n.texStorage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ae(){try{n.texImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ye(){try{n.texImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ye(D){se.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),se.copy(D))}function Je(D){me.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),me.copy(D))}function ht(D,le){let ue=f.get(le);ue===void 0&&(ue=new WeakMap,f.set(le,ue));let ke=ue.get(D);ke===void 0&&(ke=n.getUniformBlockIndex(le,D.name),ue.set(D,ke))}function _e(D,le){const ke=f.get(le).get(D);c.get(le)!==ke&&(n.uniformBlockBinding(le,ke,D.__bindingPointIndex),c.set(le,ke))}function ae(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},K=null,J={},p={},g=new WeakMap,_=[],m=null,h=!1,v=null,x=null,y=null,w=null,T=null,S=null,P=null,M=new ut(0,0,0),E=0,k=!1,U=null,Q=null,L=null,F=null,G=null,se.set(0,0,n.canvas.width,n.canvas.height),me.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),u.reset()}return{buffers:{color:a,depth:l,stencil:u},enable:Ne,disable:Oe,bindFramebuffer:We,drawBuffers:H,useProgram:Xe,setBlending:xe,setMaterial:V,setFlipSided:Be,setCullFace:b,setLineWidth:A,setPolygonOffset:z,setScissorTest:ne,activeTexture:te,bindTexture:ie,unbindTexture:ge,compressedTexImage2D:he,compressedTexImage3D:fe,texImage2D:Ae,texImage3D:ye,updateUBOMapping:ht,uniformBlockBinding:_e,texStorage2D:Pe,texStorage3D:je,texSubImage2D:Re,texSubImage3D:Ve,compressedTexSubImage2D:ee,compressedTexSubImage3D:lt,scissor:Ye,viewport:Je,reset:ae}}function d2(n,e,t,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new WeakMap;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,A){return p?new OffscreenCanvas(b,A):Vf("canvas")}function _(b,A,z,ne){let te=1;if((b.width>ne||b.height>ne)&&(te=ne/Math.max(b.width,b.height)),te<1||A===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const ie=A?Kp:Math.floor,ge=ie(te*b.width),he=ie(te*b.height);f===void 0&&(f=g(ge,he));const fe=z?g(ge,he):f;return fe.width=ge,fe.height=he,fe.getContext("2d").drawImage(b,0,0,ge,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+ge+"x"+he+")."),fe}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function m(b){return G0(b.width)&&G0(b.height)}function h(b){return a?!1:b.wrapS!==nr||b.wrapT!==nr||b.minFilter!==Hn&&b.minFilter!==Ii}function v(b,A){return b.generateMipmaps&&A&&b.minFilter!==Hn&&b.minFilter!==Ii}function x(b){n.generateMipmap(b)}function y(b,A,z,ne,te=!1){if(a===!1)return A;if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ie=A;if(A===n.RED&&(z===n.FLOAT&&(ie=n.R32F),z===n.HALF_FLOAT&&(ie=n.R16F),z===n.UNSIGNED_BYTE&&(ie=n.R8)),A===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(ie=n.R8UI),z===n.UNSIGNED_SHORT&&(ie=n.R16UI),z===n.UNSIGNED_INT&&(ie=n.R32UI),z===n.BYTE&&(ie=n.R8I),z===n.SHORT&&(ie=n.R16I),z===n.INT&&(ie=n.R32I)),A===n.RG&&(z===n.FLOAT&&(ie=n.RG32F),z===n.HALF_FLOAT&&(ie=n.RG16F),z===n.UNSIGNED_BYTE&&(ie=n.RG8)),A===n.RGBA){const ge=te?zf:yt.getTransfer(ne);z===n.FLOAT&&(ie=n.RGBA32F),z===n.HALF_FLOAT&&(ie=n.RGBA16F),z===n.UNSIGNED_BYTE&&(ie=ge===bt?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(ie=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(ie=n.RGB5_A1)}return(ie===n.R16F||ie===n.R32F||ie===n.RG16F||ie===n.RG32F||ie===n.RGBA16F||ie===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function w(b,A,z){return v(b,z)===!0||b.isFramebufferTexture&&b.minFilter!==Hn&&b.minFilter!==Ii?Math.log2(Math.max(A.width,A.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?A.mipmaps.length:1}function T(b){return b===Hn||b===h0||b===rh?n.NEAREST:n.LINEAR}function S(b){const A=b.target;A.removeEventListener("dispose",S),M(A),A.isVideoTexture&&c.delete(A)}function P(b){const A=b.target;A.removeEventListener("dispose",P),k(A)}function M(b){const A=i.get(b);if(A.__webglInit===void 0)return;const z=b.source,ne=d.get(z);if(ne){const te=ne[A.__cacheKey];te.usedTimes--,te.usedTimes===0&&E(b),Object.keys(ne).length===0&&d.delete(z)}i.remove(b)}function E(b){const A=i.get(b);n.deleteTexture(A.__webglTexture);const z=b.source,ne=d.get(z);delete ne[A.__cacheKey],o.memory.textures--}function k(b){const A=b.texture,z=i.get(b),ne=i.get(A);if(ne.__webglTexture!==void 0&&(n.deleteTexture(ne.__webglTexture),o.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(z.__webglFramebuffer[te]))for(let ie=0;ie<z.__webglFramebuffer[te].length;ie++)n.deleteFramebuffer(z.__webglFramebuffer[te][ie]);else n.deleteFramebuffer(z.__webglFramebuffer[te]);z.__webglDepthbuffer&&n.deleteRenderbuffer(z.__webglDepthbuffer[te])}else{if(Array.isArray(z.__webglFramebuffer))for(let te=0;te<z.__webglFramebuffer.length;te++)n.deleteFramebuffer(z.__webglFramebuffer[te]);else n.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&n.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&n.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let te=0;te<z.__webglColorRenderbuffer.length;te++)z.__webglColorRenderbuffer[te]&&n.deleteRenderbuffer(z.__webglColorRenderbuffer[te]);z.__webglDepthRenderbuffer&&n.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let te=0,ie=A.length;te<ie;te++){const ge=i.get(A[te]);ge.__webglTexture&&(n.deleteTexture(ge.__webglTexture),o.memory.textures--),i.remove(A[te])}i.remove(A),i.remove(b)}let U=0;function Q(){U=0}function L(){const b=U;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),U+=1,b}function F(b){const A=[];return A.push(b.wrapS),A.push(b.wrapT),A.push(b.wrapR||0),A.push(b.magFilter),A.push(b.minFilter),A.push(b.anisotropy),A.push(b.internalFormat),A.push(b.format),A.push(b.type),A.push(b.generateMipmaps),A.push(b.premultiplyAlpha),A.push(b.flipY),A.push(b.unpackAlignment),A.push(b.colorSpace),A.join()}function G(b,A){const z=i.get(b);if(b.isVideoTexture&&V(b),b.isRenderTargetTexture===!1&&b.version>0&&z.__version!==b.version){const ne=b.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{se(z,b,A);return}}t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+A)}function W(b,A){const z=i.get(b);if(b.version>0&&z.__version!==b.version){se(z,b,A);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+A)}function N(b,A){const z=i.get(b);if(b.version>0&&z.__version!==b.version){se(z,b,A);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+A)}function O(b,A){const z=i.get(b);if(b.version>0&&z.__version!==b.version){me(z,b,A);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+A)}const R={[jp]:n.REPEAT,[nr]:n.CLAMP_TO_EDGE,[Yp]:n.MIRRORED_REPEAT},K={[Hn]:n.NEAREST,[h0]:n.NEAREST_MIPMAP_NEAREST,[rh]:n.NEAREST_MIPMAP_LINEAR,[Ii]:n.LINEAR,[jw]:n.LINEAR_MIPMAP_NEAREST,[vu]:n.LINEAR_MIPMAP_LINEAR},J={[sA]:n.NEVER,[fA]:n.ALWAYS,[oA]:n.LESS,[XS]:n.LEQUAL,[aA]:n.EQUAL,[cA]:n.GEQUAL,[lA]:n.GREATER,[uA]:n.NOTEQUAL};function q(b,A,z){if(z?(n.texParameteri(b,n.TEXTURE_WRAP_S,R[A.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,R[A.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,R[A.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,K[A.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,K[A.minFilter])):(n.texParameteri(b,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(b,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(A.wrapS!==nr||A.wrapT!==nr)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(b,n.TEXTURE_MAG_FILTER,T(A.magFilter)),n.texParameteri(b,n.TEXTURE_MIN_FILTER,T(A.minFilter)),A.minFilter!==Hn&&A.minFilter!==Ii&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,J[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ne=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===Hn||A.minFilter!==rh&&A.minFilter!==vu||A.type===us&&e.has("OES_texture_float_linear")===!1||a===!1&&A.type===xu&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||i.get(A).__currentAnisotropy)&&(n.texParameterf(b,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,r.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy)}}function Z(b,A){let z=!1;b.__webglInit===void 0&&(b.__webglInit=!0,A.addEventListener("dispose",S));const ne=A.source;let te=d.get(ne);te===void 0&&(te={},d.set(ne,te));const ie=F(A);if(ie!==b.__cacheKey){te[ie]===void 0&&(te[ie]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),te[ie].usedTimes++;const ge=te[b.__cacheKey];ge!==void 0&&(te[b.__cacheKey].usedTimes--,ge.usedTimes===0&&E(A)),b.__cacheKey=ie,b.__webglTexture=te[ie].texture}return z}function se(b,A,z){let ne=n.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ne=n.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ne=n.TEXTURE_3D);const te=Z(b,A),ie=A.source;t.bindTexture(ne,b.__webglTexture,n.TEXTURE0+z);const ge=i.get(ie);if(ie.version!==ge.__version||te===!0){t.activeTexture(n.TEXTURE0+z);const he=yt.getPrimaries(yt.workingColorSpace),fe=A.colorSpace===zi?null:yt.getPrimaries(A.colorSpace),Re=A.colorSpace===zi||he===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const Ve=h(A)&&m(A.image)===!1;let ee=_(A.image,Ve,!1,r.maxTextureSize);ee=Be(A,ee);const lt=m(ee)||a,Pe=s.convert(A.format,A.colorSpace);let je=s.convert(A.type),Ae=y(A.internalFormat,Pe,je,A.colorSpace,A.isVideoTexture);q(ne,A,lt);let ye;const Ye=A.mipmaps,Je=a&&A.isVideoTexture!==!0&&Ae!==VS,ht=ge.__version===void 0||te===!0,_e=w(A,ee,lt);if(A.isDepthTexture)Ae=n.DEPTH_COMPONENT,a?A.type===us?Ae=n.DEPTH_COMPONENT32F:A.type===ls?Ae=n.DEPTH_COMPONENT24:A.type===co?Ae=n.DEPTH24_STENCIL8:Ae=n.DEPTH_COMPONENT16:A.type===us&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===fo&&Ae===n.DEPTH_COMPONENT&&A.type!==x_&&A.type!==ls&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=ls,je=s.convert(A.type)),A.format===Wa&&Ae===n.DEPTH_COMPONENT&&(Ae=n.DEPTH_STENCIL,A.type!==co&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=co,je=s.convert(A.type))),ht&&(Je?t.texStorage2D(n.TEXTURE_2D,1,Ae,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,Ae,ee.width,ee.height,0,Pe,je,null));else if(A.isDataTexture)if(Ye.length>0&&lt){Je&&ht&&t.texStorage2D(n.TEXTURE_2D,_e,Ae,Ye[0].width,Ye[0].height);for(let ae=0,D=Ye.length;ae<D;ae++)ye=Ye[ae],Je?t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ye.width,ye.height,Pe,je,ye.data):t.texImage2D(n.TEXTURE_2D,ae,Ae,ye.width,ye.height,0,Pe,je,ye.data);A.generateMipmaps=!1}else Je?(ht&&t.texStorage2D(n.TEXTURE_2D,_e,Ae,ee.width,ee.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ee.width,ee.height,Pe,je,ee.data)):t.texImage2D(n.TEXTURE_2D,0,Ae,ee.width,ee.height,0,Pe,je,ee.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Je&&ht&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,Ae,Ye[0].width,Ye[0].height,ee.depth);for(let ae=0,D=Ye.length;ae<D;ae++)ye=Ye[ae],A.format!==ir?Pe!==null?Je?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,ye.width,ye.height,ee.depth,Pe,ye.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,Ae,ye.width,ye.height,ee.depth,0,ye.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,ye.width,ye.height,ee.depth,Pe,je,ye.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,Ae,ye.width,ye.height,ee.depth,0,Pe,je,ye.data)}else{Je&&ht&&t.texStorage2D(n.TEXTURE_2D,_e,Ae,Ye[0].width,Ye[0].height);for(let ae=0,D=Ye.length;ae<D;ae++)ye=Ye[ae],A.format!==ir?Pe!==null?Je?t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,ye.width,ye.height,Pe,ye.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,Ae,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ye.width,ye.height,Pe,je,ye.data):t.texImage2D(n.TEXTURE_2D,ae,Ae,ye.width,ye.height,0,Pe,je,ye.data)}else if(A.isDataArrayTexture)Je?(ht&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,Ae,ee.width,ee.height,ee.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,Pe,je,ee.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,ee.width,ee.height,ee.depth,0,Pe,je,ee.data);else if(A.isData3DTexture)Je?(ht&&t.texStorage3D(n.TEXTURE_3D,_e,Ae,ee.width,ee.height,ee.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,Pe,je,ee.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,ee.width,ee.height,ee.depth,0,Pe,je,ee.data);else if(A.isFramebufferTexture){if(ht)if(Je)t.texStorage2D(n.TEXTURE_2D,_e,Ae,ee.width,ee.height);else{let ae=ee.width,D=ee.height;for(let le=0;le<_e;le++)t.texImage2D(n.TEXTURE_2D,le,Ae,ae,D,0,Pe,je,null),ae>>=1,D>>=1}}else if(Ye.length>0&&lt){Je&&ht&&t.texStorage2D(n.TEXTURE_2D,_e,Ae,Ye[0].width,Ye[0].height);for(let ae=0,D=Ye.length;ae<D;ae++)ye=Ye[ae],Je?t.texSubImage2D(n.TEXTURE_2D,ae,0,0,Pe,je,ye):t.texImage2D(n.TEXTURE_2D,ae,Ae,Pe,je,ye);A.generateMipmaps=!1}else Je?(ht&&t.texStorage2D(n.TEXTURE_2D,_e,Ae,ee.width,ee.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Pe,je,ee)):t.texImage2D(n.TEXTURE_2D,0,Ae,Pe,je,ee);v(A,lt)&&x(ne),ge.__version=ie.version,A.onUpdate&&A.onUpdate(A)}b.__version=A.version}function me(b,A,z){if(A.image.length!==6)return;const ne=Z(b,A),te=A.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+z);const ie=i.get(te);if(te.version!==ie.__version||ne===!0){t.activeTexture(n.TEXTURE0+z);const ge=yt.getPrimaries(yt.workingColorSpace),he=A.colorSpace===zi?null:yt.getPrimaries(A.colorSpace),fe=A.colorSpace===zi||ge===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Re=A.isCompressedTexture||A.image[0].isCompressedTexture,Ve=A.image[0]&&A.image[0].isDataTexture,ee=[];for(let ae=0;ae<6;ae++)!Re&&!Ve?ee[ae]=_(A.image[ae],!1,!0,r.maxCubemapSize):ee[ae]=Ve?A.image[ae].image:A.image[ae],ee[ae]=Be(A,ee[ae]);const lt=ee[0],Pe=m(lt)||a,je=s.convert(A.format,A.colorSpace),Ae=s.convert(A.type),ye=y(A.internalFormat,je,Ae,A.colorSpace),Ye=a&&A.isVideoTexture!==!0,Je=ie.__version===void 0||ne===!0;let ht=w(A,lt,Pe);q(n.TEXTURE_CUBE_MAP,A,Pe);let _e;if(Re){Ye&&Je&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ht,ye,lt.width,lt.height);for(let ae=0;ae<6;ae++){_e=ee[ae].mipmaps;for(let D=0;D<_e.length;D++){const le=_e[D];A.format!==ir?je!==null?Ye?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D,0,0,le.width,le.height,je,le.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D,ye,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D,0,0,le.width,le.height,je,Ae,le.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D,ye,le.width,le.height,0,je,Ae,le.data)}}}else{_e=A.mipmaps,Ye&&Je&&(_e.length>0&&ht++,t.texStorage2D(n.TEXTURE_CUBE_MAP,ht,ye,ee[0].width,ee[0].height));for(let ae=0;ae<6;ae++)if(Ve){Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ee[ae].width,ee[ae].height,je,Ae,ee[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,ye,ee[ae].width,ee[ae].height,0,je,Ae,ee[ae].data);for(let D=0;D<_e.length;D++){const ue=_e[D].image[ae].image;Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D+1,0,0,ue.width,ue.height,je,Ae,ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D+1,ye,ue.width,ue.height,0,je,Ae,ue.data)}}else{Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,je,Ae,ee[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,ye,je,Ae,ee[ae]);for(let D=0;D<_e.length;D++){const le=_e[D];Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D+1,0,0,je,Ae,le.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D+1,ye,je,Ae,le.image[ae])}}}v(A,Pe)&&x(n.TEXTURE_CUBE_MAP),ie.__version=te.version,A.onUpdate&&A.onUpdate(A)}b.__version=A.version}function de(b,A,z,ne,te,ie){const ge=s.convert(z.format,z.colorSpace),he=s.convert(z.type),fe=y(z.internalFormat,ge,he,z.colorSpace);if(!i.get(A).__hasExternalTextures){const Ve=Math.max(1,A.width>>ie),ee=Math.max(1,A.height>>ie);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,ie,fe,Ve,ee,A.depth,0,ge,he,null):t.texImage2D(te,ie,fe,Ve,ee,0,ge,he,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),xe(A)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,te,i.get(z).__webglTexture,0,Ue(A)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ne,te,i.get(z).__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function De(b,A,z){if(n.bindRenderbuffer(n.RENDERBUFFER,b),A.depthBuffer&&!A.stencilBuffer){let ne=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(z||xe(A)){const te=A.depthTexture;te&&te.isDepthTexture&&(te.type===us?ne=n.DEPTH_COMPONENT32F:te.type===ls&&(ne=n.DEPTH_COMPONENT24));const ie=Ue(A);xe(A)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie,ne,A.width,A.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,ne,A.width,A.height)}else n.renderbufferStorage(n.RENDERBUFFER,ne,A.width,A.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,b)}else if(A.depthBuffer&&A.stencilBuffer){const ne=Ue(A);z&&xe(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,n.DEPTH24_STENCIL8,A.width,A.height):xe(A)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ne,n.DEPTH24_STENCIL8,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,b)}else{const ne=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let te=0;te<ne.length;te++){const ie=ne[te],ge=s.convert(ie.format,ie.colorSpace),he=s.convert(ie.type),fe=y(ie.internalFormat,ge,he,ie.colorSpace),Re=Ue(A);z&&xe(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,fe,A.width,A.height):xe(A)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re,fe,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,fe,A.width,A.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ne(b,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),G(A.depthTexture,0);const ne=i.get(A.depthTexture).__webglTexture,te=Ue(A);if(A.depthTexture.format===fo)xe(A)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0,te):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0);else if(A.depthTexture.format===Wa)xe(A)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0,te):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Oe(b){const A=i.get(b),z=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!A.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Ne(A.__webglFramebuffer,b)}else if(z){A.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer[ne]),A.__webglDepthbuffer[ne]=n.createRenderbuffer(),De(A.__webglDepthbuffer[ne],b,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=n.createRenderbuffer(),De(A.__webglDepthbuffer,b,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function We(b,A,z){const ne=i.get(b);A!==void 0&&de(ne.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Oe(b)}function H(b){const A=b.texture,z=i.get(b),ne=i.get(A);b.addEventListener("dispose",P),b.isWebGLMultipleRenderTargets!==!0&&(ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture()),ne.__version=A.version,o.memory.textures++);const te=b.isWebGLCubeRenderTarget===!0,ie=b.isWebGLMultipleRenderTargets===!0,ge=m(b)||a;if(te){z.__webglFramebuffer=[];for(let he=0;he<6;he++)if(a&&A.mipmaps&&A.mipmaps.length>0){z.__webglFramebuffer[he]=[];for(let fe=0;fe<A.mipmaps.length;fe++)z.__webglFramebuffer[he][fe]=n.createFramebuffer()}else z.__webglFramebuffer[he]=n.createFramebuffer()}else{if(a&&A.mipmaps&&A.mipmaps.length>0){z.__webglFramebuffer=[];for(let he=0;he<A.mipmaps.length;he++)z.__webglFramebuffer[he]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(ie)if(r.drawBuffers){const he=b.texture;for(let fe=0,Re=he.length;fe<Re;fe++){const Ve=i.get(he[fe]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&b.samples>0&&xe(b)===!1){const he=ie?A:[A];z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let fe=0;fe<he.length;fe++){const Re=he[fe];z.__webglColorRenderbuffer[fe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[fe]);const Ve=s.convert(Re.format,Re.colorSpace),ee=s.convert(Re.type),lt=y(Re.internalFormat,Ve,ee,Re.colorSpace,b.isXRRenderTarget===!0),Pe=Ue(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,lt,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,z.__webglColorRenderbuffer[fe])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),De(z.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(te){t.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),q(n.TEXTURE_CUBE_MAP,A,ge);for(let he=0;he<6;he++)if(a&&A.mipmaps&&A.mipmaps.length>0)for(let fe=0;fe<A.mipmaps.length;fe++)de(z.__webglFramebuffer[he][fe],b,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,fe);else de(z.__webglFramebuffer[he],b,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);v(A,ge)&&x(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ie){const he=b.texture;for(let fe=0,Re=he.length;fe<Re;fe++){const Ve=he[fe],ee=i.get(Ve);t.bindTexture(n.TEXTURE_2D,ee.__webglTexture),q(n.TEXTURE_2D,Ve,ge),de(z.__webglFramebuffer,b,Ve,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,0),v(Ve,ge)&&x(n.TEXTURE_2D)}t.unbindTexture()}else{let he=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(a?he=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(he,ne.__webglTexture),q(he,A,ge),a&&A.mipmaps&&A.mipmaps.length>0)for(let fe=0;fe<A.mipmaps.length;fe++)de(z.__webglFramebuffer[fe],b,A,n.COLOR_ATTACHMENT0,he,fe);else de(z.__webglFramebuffer,b,A,n.COLOR_ATTACHMENT0,he,0);v(A,ge)&&x(he),t.unbindTexture()}b.depthBuffer&&Oe(b)}function Xe(b){const A=m(b)||a,z=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let ne=0,te=z.length;ne<te;ne++){const ie=z[ne];if(v(ie,A)){const ge=b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,he=i.get(ie).__webglTexture;t.bindTexture(ge,he),x(ge),t.unbindTexture()}}}function ve(b){if(a&&b.samples>0&&xe(b)===!1){const A=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],z=b.width,ne=b.height;let te=n.COLOR_BUFFER_BIT;const ie=[],ge=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=i.get(b),fe=b.isWebGLMultipleRenderTargets===!0;if(fe)for(let Re=0;Re<A.length;Re++)t.bindFramebuffer(n.FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,he.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let Re=0;Re<A.length;Re++){ie.push(n.COLOR_ATTACHMENT0+Re),b.depthBuffer&&ie.push(ge);const Ve=he.__ignoreDepthValues!==void 0?he.__ignoreDepthValues:!1;if(Ve===!1&&(b.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),fe&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,he.__webglColorRenderbuffer[Re]),Ve===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[ge]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[ge])),fe){const ee=i.get(A[Re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ee,0)}n.blitFramebuffer(0,0,z,ne,0,0,z,ne,te,n.NEAREST),u&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ie)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),fe)for(let Re=0;Re<A.length;Re++){t.bindFramebuffer(n.FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,he.__webglColorRenderbuffer[Re]);const Ve=i.get(A[Re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,he.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,Ve,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}}function Ue(b){return Math.min(r.maxSamples,b.samples)}function xe(b){const A=i.get(b);return a&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function V(b){const A=o.render.frame;c.get(b)!==A&&(c.set(b,A),b.update())}function Be(b,A){const z=b.colorSpace,ne=b.format,te=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===qp||z!==Xr&&z!==zi&&(yt.getTransfer(z)===bt?a===!1?e.has("EXT_sRGB")===!0&&ne===ir?(b.format=qp,b.minFilter=Ii,b.generateMipmaps=!1):A=YS.sRGBToLinear(A):(ne!==ir||te!==ws)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),A}this.allocateTextureUnit=L,this.resetTextureUnits=Q,this.setTexture2D=G,this.setTexture2DArray=W,this.setTexture3D=N,this.setTextureCube=O,this.rebindTextures=We,this.setupRenderTarget=H,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=de,this.useMultisampledRTT=xe}function h2(n,e,t){const i=t.isWebGL2;function r(s,o=zi){let a;const l=yt.getTransfer(o);if(s===ws)return n.UNSIGNED_BYTE;if(s===kS)return n.UNSIGNED_SHORT_4_4_4_4;if(s===zS)return n.UNSIGNED_SHORT_5_5_5_1;if(s===Yw)return n.BYTE;if(s===qw)return n.SHORT;if(s===x_)return n.UNSIGNED_SHORT;if(s===FS)return n.INT;if(s===ls)return n.UNSIGNED_INT;if(s===us)return n.FLOAT;if(s===xu)return i?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===$w)return n.ALPHA;if(s===ir)return n.RGBA;if(s===Kw)return n.LUMINANCE;if(s===Zw)return n.LUMINANCE_ALPHA;if(s===fo)return n.DEPTH_COMPONENT;if(s===Wa)return n.DEPTH_STENCIL;if(s===qp)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Qw)return n.RED;if(s===BS)return n.RED_INTEGER;if(s===Jw)return n.RG;if(s===HS)return n.RG_INTEGER;if(s===GS)return n.RGBA_INTEGER;if(s===sh||s===oh||s===ah||s===lh)if(l===bt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===sh)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===oh)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===ah)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===lh)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===sh)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===oh)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===ah)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===lh)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===p0||s===m0||s===_0||s===g0)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===p0)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===m0)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===_0)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===g0)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===VS)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===v0||s===x0)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===v0)return l===bt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===x0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===y0||s===S0||s===M0||s===E0||s===T0||s===w0||s===A0||s===C0||s===R0||s===b0||s===P0||s===L0||s===D0||s===N0)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===y0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===S0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===M0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===E0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===T0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===w0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===A0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===C0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===R0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===b0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===P0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===L0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===D0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===N0)return l===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===uh||s===U0||s===I0)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===uh)return l===bt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===U0)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===I0)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===eA||s===O0||s===F0||s===k0)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===uh)return a.COMPRESSED_RED_RGTC1_EXT;if(s===O0)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===F0)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===k0)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===co?i?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class p2 extends Oi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class wl extends Wn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const m2={type:"move"};class Uh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),h=this._getHandJoint(u,_);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const c=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],d=c.position.distanceTo(f.position),p=.02,g=.005;u.inputState.pinching&&d>p+g?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=p-g&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(m2)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new wl;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class _2 extends tl{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,u=null,c=null,f=null,d=null,p=null,g=null;const _=t.getContextAttributes();let m=null,h=null;const v=[],x=[],y=new St;let w=null;const T=new Oi;T.layers.enable(1),T.viewport=new mn;const S=new Oi;S.layers.enable(2),S.viewport=new mn;const P=[T,S],M=new p2;M.layers.enable(1),M.layers.enable(2);let E=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=v[q];return Z===void 0&&(Z=new Uh,v[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=v[q];return Z===void 0&&(Z=new Uh,v[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=v[q];return Z===void 0&&(Z=new Uh,v[q]=Z),Z.getHandSpace()};function U(q){const Z=x.indexOf(q.inputSource);if(Z===-1)return;const se=v[Z];se!==void 0&&(se.update(q.inputSource,q.frame,u||o),se.dispatchEvent({type:q.type,data:q.inputSource}))}function Q(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",Q),r.removeEventListener("inputsourceschange",L);for(let q=0;q<v.length;q++){const Z=x[q];Z!==null&&(x[q]=null,v[q].disconnect(Z))}E=null,k=null,e.setRenderTarget(m),p=null,d=null,f=null,r=null,h=null,J.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(y.width,y.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(q){u=q},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",Q),r.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(y),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,Z),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),h=new Ao(p.framebufferWidth,p.framebufferHeight,{format:ir,type:ws,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let Z=null,se=null,me=null;_.depth&&(me=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=_.stencil?Wa:fo,se=_.stencil?co:ls);const de={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:s};f=new XRWebGLBinding(r,t),d=f.createProjectionLayer(de),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),h=new Ao(d.textureWidth,d.textureHeight,{format:ir,type:ws,depthTexture:new sM(d.textureWidth,d.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const De=e.properties.get(h);De.__ignoreDepthValues=d.ignoreDepthValues}h.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await r.requestReferenceSpace(a),J.setContext(r),J.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function L(q){for(let Z=0;Z<q.removed.length;Z++){const se=q.removed[Z],me=x.indexOf(se);me>=0&&(x[me]=null,v[me].disconnect(se))}for(let Z=0;Z<q.added.length;Z++){const se=q.added[Z];let me=x.indexOf(se);if(me===-1){for(let De=0;De<v.length;De++)if(De>=x.length){x.push(se),me=De;break}else if(x[De]===null){x[De]=se,me=De;break}if(me===-1)break}const de=v[me];de&&de.connect(se)}}const F=new Y,G=new Y;function W(q,Z,se){F.setFromMatrixPosition(Z.matrixWorld),G.setFromMatrixPosition(se.matrixWorld);const me=F.distanceTo(G),de=Z.projectionMatrix.elements,De=se.projectionMatrix.elements,Ne=de[14]/(de[10]-1),Oe=de[14]/(de[10]+1),We=(de[9]+1)/de[5],H=(de[9]-1)/de[5],Xe=(de[8]-1)/de[0],ve=(De[8]+1)/De[0],Ue=Ne*Xe,xe=Ne*ve,V=me/(-Xe+ve),Be=V*-Xe;Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Be),q.translateZ(V),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const b=Ne+V,A=Oe+V,z=Ue-Be,ne=xe+(me-Be),te=We*Oe/A*b,ie=H*Oe/A*b;q.projectionMatrix.makePerspective(z,ne,te,ie,b,A),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function N(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;M.near=S.near=T.near=q.near,M.far=S.far=T.far=q.far,(E!==M.near||k!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),E=M.near,k=M.far);const Z=q.parent,se=M.cameras;N(M,Z);for(let me=0;me<se.length;me++)N(se[me],Z);se.length===2?W(M,T,S):M.projectionMatrix.copy(T.projectionMatrix),O(q,M,Z)};function O(q,Z,se){se===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(se.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=$p*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)};let R=null;function K(q,Z){if(c=Z.getViewerPose(u||o),g=Z,c!==null){const se=c.views;p!==null&&(e.setRenderTargetFramebuffer(h,p.framebuffer),e.setRenderTarget(h));let me=!1;se.length!==M.cameras.length&&(M.cameras.length=0,me=!0);for(let de=0;de<se.length;de++){const De=se[de];let Ne=null;if(p!==null)Ne=p.getViewport(De);else{const We=f.getViewSubImage(d,De);Ne=We.viewport,de===0&&(e.setRenderTargetTextures(h,We.colorTexture,d.ignoreDepthValues?void 0:We.depthStencilTexture),e.setRenderTarget(h))}let Oe=P[de];Oe===void 0&&(Oe=new Oi,Oe.layers.enable(de),Oe.viewport=new mn,P[de]=Oe),Oe.matrix.fromArray(De.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(De.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),de===0&&(M.matrix.copy(Oe.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),me===!0&&M.cameras.push(Oe)}}for(let se=0;se<v.length;se++){const me=x[se],de=v[se];me!==null&&de!==void 0&&de.update(me,Z,u||o)}R&&R(q,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),g=null}const J=new rM;J.setAnimationLoop(K),this.setAnimationLoop=function(q){R=q},this.dispose=function(){}}}function g2(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,eM(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,v,x,y){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),f(m,h)):h.isMeshPhongMaterial?(s(m,h),c(m,h)):h.isMeshStandardMaterial?(s(m,h),d(m,h),h.isMeshPhysicalMaterial&&p(m,h,y)):h.isMeshMatcapMaterial?(s(m,h),g(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),_(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?l(m,h,v,x):h.isSpriteMaterial?u(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===ni&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===ni&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const v=e.get(h).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap){m.lightMap.value=h.lightMap;const x=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=h.lightMapIntensity*x,t(h.lightMap,m.lightMapTransform)}h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,v,x){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*v,m.scale.value=x*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),e.get(h).envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,v){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===ni&&m.clearcoatNormalScale.value.negate())),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function _(m,h){const v=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function v2(n,e,t,i){let r={},s={},o=[];const a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,x){const y=x.program;i.uniformBlockBinding(v,y)}function u(v,x){let y=r[v.id];y===void 0&&(g(v),y=c(v),r[v.id]=y,v.addEventListener("dispose",m));const w=x.program;i.updateUBOMapping(v,w);const T=e.render.frame;s[v.id]!==T&&(d(v),s[v.id]=T)}function c(v){const x=f();v.__bindingPointIndex=x;const y=n.createBuffer(),w=v.__size,T=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,w,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,y),y}function f(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const x=r[v.id],y=v.uniforms,w=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let T=0,S=y.length;T<S;T++){const P=Array.isArray(y[T])?y[T]:[y[T]];for(let M=0,E=P.length;M<E;M++){const k=P[M];if(p(k,T,M,w)===!0){const U=k.__offset,Q=Array.isArray(k.value)?k.value:[k.value];let L=0;for(let F=0;F<Q.length;F++){const G=Q[F],W=_(G);typeof G=="number"||typeof G=="boolean"?(k.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,U+L,k.__data)):G.isMatrix3?(k.__data[0]=G.elements[0],k.__data[1]=G.elements[1],k.__data[2]=G.elements[2],k.__data[3]=0,k.__data[4]=G.elements[3],k.__data[5]=G.elements[4],k.__data[6]=G.elements[5],k.__data[7]=0,k.__data[8]=G.elements[6],k.__data[9]=G.elements[7],k.__data[10]=G.elements[8],k.__data[11]=0):(G.toArray(k.__data,L),L+=W.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,k.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(v,x,y,w){const T=v.value,S=x+"_"+y;if(w[S]===void 0)return typeof T=="number"||typeof T=="boolean"?w[S]=T:w[S]=T.clone(),!0;{const P=w[S];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return w[S]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function g(v){const x=v.uniforms;let y=0;const w=16;for(let S=0,P=x.length;S<P;S++){const M=Array.isArray(x[S])?x[S]:[x[S]];for(let E=0,k=M.length;E<k;E++){const U=M[E],Q=Array.isArray(U.value)?U.value:[U.value];for(let L=0,F=Q.length;L<F;L++){const G=Q[L],W=_(G),N=y%w;N!==0&&w-N<W.boundary&&(y+=w-N),U.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=y,y+=W.storage}}}const T=y%w;return T>0&&(y+=w-T),v.__size=y,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){const x=v.target;x.removeEventListener("dispose",m);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function h(){for(const v in r)n.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:u,dispose:h}}class fM{constructor(e={}){const{canvas:t=hA(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const h=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pn,this._useLegacyLights=!1,this.toneMapping=Ts,this.toneMappingExposure=1;const x=this;let y=!1,w=0,T=0,S=null,P=-1,M=null;const E=new mn,k=new mn;let U=null;const Q=new ut(0);let L=0,F=t.width,G=t.height,W=1,N=null,O=null;const R=new mn(0,0,F,G),K=new mn(0,0,F,G);let J=!1;const q=new iM;let Z=!1,se=!1,me=null;const de=new rn,De=new St,Ne=new Y,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function We(){return S===null?W:1}let H=i;function Xe(C,I){for(let j=0;j<C.length;j++){const X=C[j],B=t.getContext(X,I);if(B!==null)return B}return null}try{const C={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${v_}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",le,!1),H===null){const I=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&I.shift(),H=Xe(I,C),H===null)throw Xe(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&H instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),H.getShaderPrecisionFormat===void 0&&(H.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let ve,Ue,xe,V,Be,b,A,z,ne,te,ie,ge,he,fe,Re,Ve,ee,lt,Pe,je,Ae,ye,Ye,Je;function ht(){ve=new Rb(H),Ue=new Sb(H,ve,e),ve.init(Ue),ye=new h2(H,ve,Ue),xe=new f2(H,ve,Ue),V=new Lb(H),Be=new ZP,b=new d2(H,ve,xe,Be,Ue,ye,V),A=new Eb(x),z=new Cb(x),ne=new kA(H,Ue),Ye=new xb(H,ve,ne,Ue),te=new bb(H,ne,V,Ye),ie=new Ib(H,te,ne,V),Pe=new Ub(H,Ue,b),Ve=new Mb(Be),ge=new KP(x,A,z,ve,Ue,Ye,Ve),he=new g2(x,Be),fe=new JP,Re=new s2(ve,Ue),lt=new vb(x,A,z,xe,ie,d,l),ee=new c2(x,ie,Ue),Je=new v2(H,V,Ue,xe),je=new yb(H,ve,V,Ue),Ae=new Pb(H,ve,V,Ue),V.programs=ge.programs,x.capabilities=Ue,x.extensions=ve,x.properties=Be,x.renderLists=fe,x.shadowMap=ee,x.state=xe,x.info=V}ht();const _e=new _2(x,H);this.xr=_e,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const C=ve.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ve.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(C){C!==void 0&&(W=C,this.setSize(F,G,!1))},this.getSize=function(C){return C.set(F,G)},this.setSize=function(C,I,j=!0){if(_e.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=C,G=I,t.width=Math.floor(C*W),t.height=Math.floor(I*W),j===!0&&(t.style.width=C+"px",t.style.height=I+"px"),this.setViewport(0,0,C,I)},this.getDrawingBufferSize=function(C){return C.set(F*W,G*W).floor()},this.setDrawingBufferSize=function(C,I,j){F=C,G=I,W=j,t.width=Math.floor(C*j),t.height=Math.floor(I*j),this.setViewport(0,0,C,I)},this.getCurrentViewport=function(C){return C.copy(E)},this.getViewport=function(C){return C.copy(R)},this.setViewport=function(C,I,j,X){C.isVector4?R.set(C.x,C.y,C.z,C.w):R.set(C,I,j,X),xe.viewport(E.copy(R).multiplyScalar(W).floor())},this.getScissor=function(C){return C.copy(K)},this.setScissor=function(C,I,j,X){C.isVector4?K.set(C.x,C.y,C.z,C.w):K.set(C,I,j,X),xe.scissor(k.copy(K).multiplyScalar(W).floor())},this.getScissorTest=function(){return J},this.setScissorTest=function(C){xe.setScissorTest(J=C)},this.setOpaqueSort=function(C){N=C},this.setTransparentSort=function(C){O=C},this.getClearColor=function(C){return C.copy(lt.getClearColor())},this.setClearColor=function(){lt.setClearColor.apply(lt,arguments)},this.getClearAlpha=function(){return lt.getClearAlpha()},this.setClearAlpha=function(){lt.setClearAlpha.apply(lt,arguments)},this.clear=function(C=!0,I=!0,j=!0){let X=0;if(C){let B=!1;if(S!==null){const ce=S.texture.format;B=ce===GS||ce===HS||ce===BS}if(B){const ce=S.texture.type,Te=ce===ws||ce===ls||ce===x_||ce===co||ce===kS||ce===zS,He=lt.getClearColor(),we=lt.getClearAlpha(),be=He.r,Ge=He.g,Ke=He.b;Te?(p[0]=be,p[1]=Ge,p[2]=Ke,p[3]=we,H.clearBufferuiv(H.COLOR,0,p)):(g[0]=be,g[1]=Ge,g[2]=Ke,g[3]=we,H.clearBufferiv(H.COLOR,0,g))}else X|=H.COLOR_BUFFER_BIT}I&&(X|=H.DEPTH_BUFFER_BIT),j&&(X|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",le,!1),fe.dispose(),Re.dispose(),Be.dispose(),A.dispose(),z.dispose(),ie.dispose(),Ye.dispose(),Je.dispose(),ge.dispose(),_e.dispose(),_e.removeEventListener("sessionstart",Me),_e.removeEventListener("sessionend",Le),me&&(me.dispose(),me=null),oe.stop()};function ae(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const C=V.autoReset,I=ee.enabled,j=ee.autoUpdate,X=ee.needsUpdate,B=ee.type;ht(),V.autoReset=C,ee.enabled=I,ee.autoUpdate=j,ee.needsUpdate=X,ee.type=B}function le(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ue(C){const I=C.target;I.removeEventListener("dispose",ue),ke(I)}function ke(C){Ie(C),Be.remove(C)}function Ie(C){const I=Be.get(C).programs;I!==void 0&&(I.forEach(function(j){ge.releaseProgram(j)}),C.isShaderMaterial&&ge.releaseShaderCache(C))}this.renderBufferDirect=function(C,I,j,X,B,ce){I===null&&(I=Oe);const Te=B.isMesh&&B.matrixWorld.determinant()<0,He=wt(C,I,j,X,B);xe.setMaterial(X,Te);let we=j.index,be=1;if(X.wireframe===!0){if(we=te.getWireframeAttribute(j),we===void 0)return;be=2}const Ge=j.drawRange,Ke=j.attributes.position;let Lt=Ge.start*be,Qt=(Ge.start+Ge.count)*be;ce!==null&&(Lt=Math.max(Lt,ce.start*be),Qt=Math.min(Qt,(ce.start+ce.count)*be)),we!==null?(Lt=Math.max(Lt,0),Qt=Math.min(Qt,we.count)):Ke!=null&&(Lt=Math.max(Lt,0),Qt=Math.min(Qt,Ke.count));const _t=Qt-Lt;if(_t<0||_t===1/0)return;Ye.setup(B,X,He,j,we);let Nn,xt=je;if(we!==null&&(Nn=ne.get(we),xt=Ae,xt.setIndex(Nn)),B.isMesh)X.wireframe===!0?(xe.setLineWidth(X.wireframeLinewidth*We()),xt.setMode(H.LINES)):xt.setMode(H.TRIANGLES);else if(B.isLine){let qe=X.linewidth;qe===void 0&&(qe=1),xe.setLineWidth(qe*We()),B.isLineSegments?xt.setMode(H.LINES):B.isLineLoop?xt.setMode(H.LINE_LOOP):xt.setMode(H.LINE_STRIP)}else B.isPoints?xt.setMode(H.POINTS):B.isSprite&&xt.setMode(H.TRIANGLES);if(B.isBatchedMesh)xt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else if(B.isInstancedMesh)xt.renderInstances(Lt,_t,B.count);else if(j.isInstancedBufferGeometry){const qe=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Rd=Math.min(j.instanceCount,qe);xt.renderInstances(Lt,_t,Rd)}else xt.render(Lt,_t)};function ot(C,I,j){C.transparent===!0&&C.side===hr&&C.forceSinglePass===!1?(C.side=ni,C.needsUpdate=!0,Tt(C,I,j),C.side=Ls,C.needsUpdate=!0,Tt(C,I,j),C.side=hr):Tt(C,I,j)}this.compile=function(C,I,j=null){j===null&&(j=C),m=Re.get(j),m.init(),v.push(m),j.traverseVisible(function(B){B.isLight&&B.layers.test(I.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),C!==j&&C.traverseVisible(function(B){B.isLight&&B.layers.test(I.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights(x._useLegacyLights);const X=new Set;return C.traverse(function(B){const ce=B.material;if(ce)if(Array.isArray(ce))for(let Te=0;Te<ce.length;Te++){const He=ce[Te];ot(He,j,B),X.add(He)}else ot(ce,j,B),X.add(ce)}),v.pop(),m=null,X},this.compileAsync=function(C,I,j=null){const X=this.compile(C,I,j);return new Promise(B=>{function ce(){if(X.forEach(function(Te){Be.get(Te).currentProgram.isReady()&&X.delete(Te)}),X.size===0){B(C);return}setTimeout(ce,10)}ve.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let ft=null;function Ce(C){ft&&ft(C)}function Me(){oe.stop()}function Le(){oe.start()}const oe=new rM;oe.setAnimationLoop(Ce),typeof self<"u"&&oe.setContext(self),this.setAnimationLoop=function(C){ft=C,_e.setAnimationLoop(C),C===null?oe.stop():oe.start()},_e.addEventListener("sessionstart",Me),_e.addEventListener("sessionend",Le),this.render=function(C,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),_e.enabled===!0&&_e.isPresenting===!0&&(_e.cameraAutoUpdate===!0&&_e.updateCamera(I),I=_e.getCamera()),C.isScene===!0&&C.onBeforeRender(x,C,I,S),m=Re.get(C,v.length),m.init(),v.push(m),de.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),q.setFromProjectionMatrix(de),se=this.localClippingEnabled,Z=Ve.init(this.clippingPlanes,se),_=fe.get(C,h.length),_.init(),h.push(_),ze(C,I,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(N,O),this.info.render.frame++,Z===!0&&Ve.beginShadows();const j=m.state.shadowsArray;if(ee.render(j,C,I),Z===!0&&Ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),lt.render(_,C),m.setupLights(x._useLegacyLights),I.isArrayCamera){const X=I.cameras;for(let B=0,ce=X.length;B<ce;B++){const Te=X[B];Fe(_,C,Te,Te.viewport)}}else Fe(_,C,I);S!==null&&(b.updateMultisampleRenderTarget(S),b.updateRenderTargetMipmap(S)),C.isScene===!0&&C.onAfterRender(x,C,I),Ye.resetDefaultState(),P=-1,M=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,h.pop(),h.length>0?_=h[h.length-1]:_=null};function ze(C,I,j,X){if(C.visible===!1)return;if(C.layers.test(I.layers)){if(C.isGroup)j=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(I);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||q.intersectsSprite(C)){X&&Ne.setFromMatrixPosition(C.matrixWorld).applyMatrix4(de);const Te=ie.update(C),He=C.material;He.visible&&_.push(C,Te,He,j,Ne.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||q.intersectsObject(C))){const Te=ie.update(C),He=C.material;if(X&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ne.copy(C.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),Ne.copy(Te.boundingSphere.center)),Ne.applyMatrix4(C.matrixWorld).applyMatrix4(de)),Array.isArray(He)){const we=Te.groups;for(let be=0,Ge=we.length;be<Ge;be++){const Ke=we[be],Lt=He[Ke.materialIndex];Lt&&Lt.visible&&_.push(C,Te,Lt,j,Ne.z,Ke)}}else He.visible&&_.push(C,Te,He,j,Ne.z,null)}}const ce=C.children;for(let Te=0,He=ce.length;Te<He;Te++)ze(ce[Te],I,j,X)}function Fe(C,I,j,X){const B=C.opaque,ce=C.transmissive,Te=C.transparent;m.setupLightsView(j),Z===!0&&Ve.setGlobalState(x.clippingPlanes,j),ce.length>0&&$e(B,ce,I,j),X&&xe.viewport(E.copy(X)),B.length>0&&Ut(B,I,j),ce.length>0&&Ut(ce,I,j),Te.length>0&&Ut(Te,I,j),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function $e(C,I,j,X){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;const ce=Ue.isWebGL2;me===null&&(me=new Ao(1,1,{generateMipmaps:!0,type:ve.has("EXT_color_buffer_half_float")?xu:ws,minFilter:vu,samples:ce?4:0})),x.getDrawingBufferSize(De),ce?me.setSize(De.x,De.y):me.setSize(Kp(De.x),Kp(De.y));const Te=x.getRenderTarget();x.setRenderTarget(me),x.getClearColor(Q),L=x.getClearAlpha(),L<1&&x.setClearColor(16777215,.5),x.clear();const He=x.toneMapping;x.toneMapping=Ts,Ut(C,j,X),b.updateMultisampleRenderTarget(me),b.updateRenderTargetMipmap(me);let we=!1;for(let be=0,Ge=I.length;be<Ge;be++){const Ke=I[be],Lt=Ke.object,Qt=Ke.geometry,_t=Ke.material,Nn=Ke.group;if(_t.side===hr&&Lt.layers.test(X.layers)){const xt=_t.side;_t.side=ni,_t.needsUpdate=!0,et(Lt,j,X,Qt,_t,Nn),_t.side=xt,_t.needsUpdate=!0,we=!0}}we===!0&&(b.updateMultisampleRenderTarget(me),b.updateRenderTargetMipmap(me)),x.setRenderTarget(Te),x.setClearColor(Q,L),x.toneMapping=He}function Ut(C,I,j){const X=I.isScene===!0?I.overrideMaterial:null;for(let B=0,ce=C.length;B<ce;B++){const Te=C[B],He=Te.object,we=Te.geometry,be=X===null?Te.material:X,Ge=Te.group;He.layers.test(j.layers)&&et(He,I,j,we,be,Ge)}}function et(C,I,j,X,B,ce){C.onBeforeRender(x,I,j,X,B,ce),C.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),B.onBeforeRender(x,I,j,X,C,ce),B.transparent===!0&&B.side===hr&&B.forceSinglePass===!1?(B.side=ni,B.needsUpdate=!0,x.renderBufferDirect(j,I,X,B,C,ce),B.side=Ls,B.needsUpdate=!0,x.renderBufferDirect(j,I,X,B,C,ce),B.side=hr):x.renderBufferDirect(j,I,X,B,C,ce),C.onAfterRender(x,I,j,X,B,ce)}function Tt(C,I,j){I.isScene!==!0&&(I=Oe);const X=Be.get(C),B=m.state.lights,ce=m.state.shadowsArray,Te=B.state.version,He=ge.getParameters(C,B.state,ce,I,j),we=ge.getProgramCacheKey(He);let be=X.programs;X.environment=C.isMeshStandardMaterial?I.environment:null,X.fog=I.fog,X.envMap=(C.isMeshStandardMaterial?z:A).get(C.envMap||X.environment),be===void 0&&(C.addEventListener("dispose",ue),be=new Map,X.programs=be);let Ge=be.get(we);if(Ge!==void 0){if(X.currentProgram===Ge&&X.lightsStateVersion===Te)return Ct(C,He),Ge}else He.uniforms=ge.getUniforms(C),C.onBuild(j,He,x),C.onBeforeCompile(He,x),Ge=ge.acquireProgram(He,we),be.set(we,Ge),X.uniforms=He.uniforms;const Ke=X.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ke.clippingPlanes=Ve.uniform),Ct(C,He),X.needsLights=ci(C),X.lightsStateVersion=Te,X.needsLights&&(Ke.ambientLightColor.value=B.state.ambient,Ke.lightProbe.value=B.state.probe,Ke.directionalLights.value=B.state.directional,Ke.directionalLightShadows.value=B.state.directionalShadow,Ke.spotLights.value=B.state.spot,Ke.spotLightShadows.value=B.state.spotShadow,Ke.rectAreaLights.value=B.state.rectArea,Ke.ltc_1.value=B.state.rectAreaLTC1,Ke.ltc_2.value=B.state.rectAreaLTC2,Ke.pointLights.value=B.state.point,Ke.pointLightShadows.value=B.state.pointShadow,Ke.hemisphereLights.value=B.state.hemi,Ke.directionalShadowMap.value=B.state.directionalShadowMap,Ke.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ke.spotShadowMap.value=B.state.spotShadowMap,Ke.spotLightMatrix.value=B.state.spotLightMatrix,Ke.spotLightMap.value=B.state.spotLightMap,Ke.pointShadowMap.value=B.state.pointShadowMap,Ke.pointShadowMatrix.value=B.state.pointShadowMatrix),X.currentProgram=Ge,X.uniformsList=null,Ge}function Zt(C){if(C.uniformsList===null){const I=C.currentProgram.getUniforms();C.uniformsList=ef.seqWithValue(I.seq,C.uniforms)}return C.uniformsList}function Ct(C,I){const j=Be.get(C);j.outputColorSpace=I.outputColorSpace,j.batching=I.batching,j.instancing=I.instancing,j.instancingColor=I.instancingColor,j.skinning=I.skinning,j.morphTargets=I.morphTargets,j.morphNormals=I.morphNormals,j.morphColors=I.morphColors,j.morphTargetsCount=I.morphTargetsCount,j.numClippingPlanes=I.numClippingPlanes,j.numIntersection=I.numClipIntersection,j.vertexAlphas=I.vertexAlphas,j.vertexTangents=I.vertexTangents,j.toneMapping=I.toneMapping}function wt(C,I,j,X,B){I.isScene!==!0&&(I=Oe),b.resetTextureUnits();const ce=I.fog,Te=X.isMeshStandardMaterial?I.environment:null,He=S===null?x.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Xr,we=(X.isMeshStandardMaterial?z:A).get(X.envMap||Te),be=X.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ge=!!j.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ke=!!j.morphAttributes.position,Lt=!!j.morphAttributes.normal,Qt=!!j.morphAttributes.color;let _t=Ts;X.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(_t=x.toneMapping);const Nn=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,xt=Nn!==void 0?Nn.length:0,qe=Be.get(X),Rd=m.state.lights;if(Z===!0&&(se===!0||C!==M)){const Pi=C===M&&X.id===P;Ve.setState(X,C,Pi)}let Ht=!1;X.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==Rd.state.version||qe.outputColorSpace!==He||B.isBatchedMesh&&qe.batching===!1||!B.isBatchedMesh&&qe.batching===!0||B.isInstancedMesh&&qe.instancing===!1||!B.isInstancedMesh&&qe.instancing===!0||B.isSkinnedMesh&&qe.skinning===!1||!B.isSkinnedMesh&&qe.skinning===!0||B.isInstancedMesh&&qe.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&qe.instancingColor===!1&&B.instanceColor!==null||qe.envMap!==we||X.fog===!0&&qe.fog!==ce||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Ve.numPlanes||qe.numIntersection!==Ve.numIntersection)||qe.vertexAlphas!==be||qe.vertexTangents!==Ge||qe.morphTargets!==Ke||qe.morphNormals!==Lt||qe.morphColors!==Qt||qe.toneMapping!==_t||Ue.isWebGL2===!0&&qe.morphTargetsCount!==xt)&&(Ht=!0):(Ht=!0,qe.__version=X.version);let Bs=qe.currentProgram;Ht===!0&&(Bs=Tt(X,I,B));let Z_=!1,rl=!1,bd=!1;const yn=Bs.getUniforms(),Hs=qe.uniforms;if(xe.useProgram(Bs.program)&&(Z_=!0,rl=!0,bd=!0),X.id!==P&&(P=X.id,rl=!0),Z_||M!==C){yn.setValue(H,"projectionMatrix",C.projectionMatrix),yn.setValue(H,"viewMatrix",C.matrixWorldInverse);const Pi=yn.map.cameraPosition;Pi!==void 0&&Pi.setValue(H,Ne.setFromMatrixPosition(C.matrixWorld)),Ue.logarithmicDepthBuffer&&yn.setValue(H,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&yn.setValue(H,"isOrthographic",C.isOrthographicCamera===!0),M!==C&&(M=C,rl=!0,bd=!0)}if(B.isSkinnedMesh){yn.setOptional(H,B,"bindMatrix"),yn.setOptional(H,B,"bindMatrixInverse");const Pi=B.skeleton;Pi&&(Ue.floatVertexTextures?(Pi.boneTexture===null&&Pi.computeBoneTexture(),yn.setValue(H,"boneTexture",Pi.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}B.isBatchedMesh&&(yn.setOptional(H,B,"batchingTexture"),yn.setValue(H,"batchingTexture",B._matricesTexture,b));const Pd=j.morphAttributes;if((Pd.position!==void 0||Pd.normal!==void 0||Pd.color!==void 0&&Ue.isWebGL2===!0)&&Pe.update(B,j,Bs),(rl||qe.receiveShadow!==B.receiveShadow)&&(qe.receiveShadow=B.receiveShadow,yn.setValue(H,"receiveShadow",B.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Hs.envMap.value=we,Hs.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),rl&&(yn.setValue(H,"toneMappingExposure",x.toneMappingExposure),qe.needsLights&&mt(Hs,bd),ce&&X.fog===!0&&he.refreshFogUniforms(Hs,ce),he.refreshMaterialUniforms(Hs,X,W,G,me),ef.upload(H,Zt(qe),Hs,b)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(ef.upload(H,Zt(qe),Hs,b),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&yn.setValue(H,"center",B.center),yn.setValue(H,"modelViewMatrix",B.modelViewMatrix),yn.setValue(H,"normalMatrix",B.normalMatrix),yn.setValue(H,"modelMatrix",B.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Pi=X.uniformsGroups;for(let Ld=0,OE=Pi.length;Ld<OE;Ld++)if(Ue.isWebGL2){const Q_=Pi[Ld];Je.update(Q_,Bs),Je.bind(Q_,Bs)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Bs}function mt(C,I){C.ambientLightColor.needsUpdate=I,C.lightProbe.needsUpdate=I,C.directionalLights.needsUpdate=I,C.directionalLightShadows.needsUpdate=I,C.pointLights.needsUpdate=I,C.pointLightShadows.needsUpdate=I,C.spotLights.needsUpdate=I,C.spotLightShadows.needsUpdate=I,C.rectAreaLights.needsUpdate=I,C.hemisphereLights.needsUpdate=I}function ci(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(C,I,j){Be.get(C.texture).__webglTexture=I,Be.get(C.depthTexture).__webglTexture=j;const X=Be.get(C);X.__hasExternalTextures=!0,X.__hasExternalTextures&&(X.__autoAllocateDepthBuffer=j===void 0,X.__autoAllocateDepthBuffer||ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,I){const j=Be.get(C);j.__webglFramebuffer=I,j.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(C,I=0,j=0){S=C,w=I,T=j;let X=!0,B=null,ce=!1,Te=!1;if(C){const we=Be.get(C);we.__useDefaultFramebuffer!==void 0?(xe.bindFramebuffer(H.FRAMEBUFFER,null),X=!1):we.__webglFramebuffer===void 0?b.setupRenderTarget(C):we.__hasExternalTextures&&b.rebindTextures(C,Be.get(C.texture).__webglTexture,Be.get(C.depthTexture).__webglTexture);const be=C.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(Te=!0);const Ge=Be.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ge[I])?B=Ge[I][j]:B=Ge[I],ce=!0):Ue.isWebGL2&&C.samples>0&&b.useMultisampledRTT(C)===!1?B=Be.get(C).__webglMultisampledFramebuffer:Array.isArray(Ge)?B=Ge[j]:B=Ge,E.copy(C.viewport),k.copy(C.scissor),U=C.scissorTest}else E.copy(R).multiplyScalar(W).floor(),k.copy(K).multiplyScalar(W).floor(),U=J;if(xe.bindFramebuffer(H.FRAMEBUFFER,B)&&Ue.drawBuffers&&X&&xe.drawBuffers(C,B),xe.viewport(E),xe.scissor(k),xe.setScissorTest(U),ce){const we=Be.get(C.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+I,we.__webglTexture,j)}else if(Te){const we=Be.get(C.texture),be=I||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,we.__webglTexture,j||0,be)}P=-1},this.readRenderTargetPixels=function(C,I,j,X,B,ce,Te){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let He=Be.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Te!==void 0&&(He=He[Te]),He){xe.bindFramebuffer(H.FRAMEBUFFER,He);try{const we=C.texture,be=we.format,Ge=we.type;if(be!==ir&&ye.convert(be)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ke=Ge===xu&&(ve.has("EXT_color_buffer_half_float")||Ue.isWebGL2&&ve.has("EXT_color_buffer_float"));if(Ge!==ws&&ye.convert(Ge)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ge===us&&(Ue.isWebGL2||ve.has("OES_texture_float")||ve.has("WEBGL_color_buffer_float")))&&!Ke){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=C.width-X&&j>=0&&j<=C.height-B&&H.readPixels(I,j,X,B,ye.convert(be),ye.convert(Ge),ce)}finally{const we=S!==null?Be.get(S).__webglFramebuffer:null;xe.bindFramebuffer(H.FRAMEBUFFER,we)}}},this.copyFramebufferToTexture=function(C,I,j=0){const X=Math.pow(2,-j),B=Math.floor(I.image.width*X),ce=Math.floor(I.image.height*X);b.setTexture2D(I,0),H.copyTexSubImage2D(H.TEXTURE_2D,j,0,0,C.x,C.y,B,ce),xe.unbindTexture()},this.copyTextureToTexture=function(C,I,j,X=0){const B=I.image.width,ce=I.image.height,Te=ye.convert(j.format),He=ye.convert(j.type);b.setTexture2D(j,0),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,j.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,j.unpackAlignment),I.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,X,C.x,C.y,B,ce,Te,He,I.image.data):I.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,X,C.x,C.y,I.mipmaps[0].width,I.mipmaps[0].height,Te,I.mipmaps[0].data):H.texSubImage2D(H.TEXTURE_2D,X,C.x,C.y,Te,He,I.image),X===0&&j.generateMipmaps&&H.generateMipmap(H.TEXTURE_2D),xe.unbindTexture()},this.copyTextureToTexture3D=function(C,I,j,X,B=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ce=C.max.x-C.min.x+1,Te=C.max.y-C.min.y+1,He=C.max.z-C.min.z+1,we=ye.convert(X.format),be=ye.convert(X.type);let Ge;if(X.isData3DTexture)b.setTexture3D(X,0),Ge=H.TEXTURE_3D;else if(X.isDataArrayTexture||X.isCompressedArrayTexture)b.setTexture2DArray(X,0),Ge=H.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,X.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,X.unpackAlignment);const Ke=H.getParameter(H.UNPACK_ROW_LENGTH),Lt=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Qt=H.getParameter(H.UNPACK_SKIP_PIXELS),_t=H.getParameter(H.UNPACK_SKIP_ROWS),Nn=H.getParameter(H.UNPACK_SKIP_IMAGES),xt=j.isCompressedTexture?j.mipmaps[B]:j.image;H.pixelStorei(H.UNPACK_ROW_LENGTH,xt.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,xt.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,C.min.x),H.pixelStorei(H.UNPACK_SKIP_ROWS,C.min.y),H.pixelStorei(H.UNPACK_SKIP_IMAGES,C.min.z),j.isDataTexture||j.isData3DTexture?H.texSubImage3D(Ge,B,I.x,I.y,I.z,ce,Te,He,we,be,xt.data):j.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),H.compressedTexSubImage3D(Ge,B,I.x,I.y,I.z,ce,Te,He,we,xt.data)):H.texSubImage3D(Ge,B,I.x,I.y,I.z,ce,Te,He,we,be,xt),H.pixelStorei(H.UNPACK_ROW_LENGTH,Ke),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Lt),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Qt),H.pixelStorei(H.UNPACK_SKIP_ROWS,_t),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Nn),B===0&&X.generateMipmaps&&H.generateMipmap(Ge),xe.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?b.setTextureCube(C,0):C.isData3DTexture?b.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?b.setTexture2DArray(C,0):b.setTexture2D(C,0),xe.unbindTexture()},this.resetState=function(){w=0,T=0,S=null,xe.reset(),Ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ir}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===y_?"display-p3":"srgb",t.unpackColorSpace=yt.workingColorSpace===xd?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===pn?ho:WS}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ho?pn:Xr}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class x2 extends fM{}x2.prototype.isWebGL1Renderer=!0;class y2 extends Wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Wf extends nl{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ut(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Cv=new Y,Rv=new Y,bv=new rn,Ih=new S_,Ac=new ku;class S2 extends Wn{constructor(e=new ri,t=new Wf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Cv.fromBufferAttribute(t,r-1),Rv.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Cv.distanceTo(Rv);e.setAttribute("lineDistance",new zr(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ac.copy(i.boundingSphere),Ac.applyMatrix4(r),Ac.radius+=s,e.ray.intersectsSphere(Ac)===!1)return;bv.copy(r).invert(),Ih.copy(e.ray).applyMatrix4(bv);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,u=new Y,c=new Y,f=new Y,d=new Y,p=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const h=Math.max(0,o.start),v=Math.min(g.count,o.start+o.count);for(let x=h,y=v-1;x<y;x+=p){const w=g.getX(x),T=g.getX(x+1);if(u.fromBufferAttribute(m,w),c.fromBufferAttribute(m,T),Ih.distanceSqToSegment(u,c,d,f)>l)continue;d.applyMatrix4(this.matrixWorld);const P=e.ray.origin.distanceTo(d);P<e.near||P>e.far||t.push({distance:P,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const h=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let x=h,y=v-1;x<y;x+=p){if(u.fromBufferAttribute(m,x),c.fromBufferAttribute(m,x+1),Ih.distanceSqToSegment(u,c,d,f)>l)continue;d.applyMatrix4(this.matrixWorld);const T=e.ray.origin.distanceTo(d);T<e.near||T>e.far||t.push({distance:T,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const Pv=new Y,Lv=new Y;class Qp extends S2{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Pv.fromBufferAttribute(t,r),Lv.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Pv.distanceTo(Lv);e.setAttribute("lineDistance",new zr(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class T_ extends nl{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ut(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Dv=new rn,Jp=new S_,Cc=new ku,Rc=new Y;class dM extends Wn{constructor(e=new ri,t=new T_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Cc.copy(i.boundingSphere),Cc.applyMatrix4(r),Cc.radius+=s,e.ray.intersectsSphere(Cc)===!1)return;Dv.copy(r).invert(),Jp.copy(e.ray).applyMatrix4(Dv);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,u=i.index,f=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,_=p;g<_;g++){const m=u.getX(g);Rc.fromBufferAttribute(f,m),Nv(Rc,m,l,r,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let g=d,_=p;g<_;g++)Rc.fromBufferAttribute(f,g),Nv(Rc,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Nv(n,e,t,i,r,s,o){const a=Jp.distanceSqToPoint(n);if(a<t){const l=new Y;Jp.closestPointToPoint(n,l),l.applyMatrix4(i);const u=r.ray.origin.distanceTo(l);if(u<r.near||u>r.far)return;s.push({distance:u,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class M2 extends ii{constructor(e,t,i,r,s,o,a,l,u){super(e,t,i,r,s,o,a,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:v_}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=v_);function E2(){const n=document.createElement("canvas");n.width=64,n.height=64;const e=n.getContext("2d");e.fillStyle="#3E8E2E",e.beginPath(),e.moveTo(32,4),e.bezierCurveTo(58,20,58,44,32,60),e.bezierCurveTo(6,44,6,20,32,4),e.fill(),e.strokeStyle="rgba(10,30,20,.35)",e.lineWidth=1,e.beginPath(),e.moveTo(32,6),e.lineTo(32,58),e.stroke();for(let i=1;i<5;i++){const r=10+i*9;e.beginPath(),e.moveTo(32,r),e.lineTo(22,r+6),e.moveTo(32,r),e.lineTo(42,r+6),e.stroke()}const t=new M2(n);return t.needsUpdate=!0,t}function T2(n,e,t){return new ut(n).lerp(new ut(e),t)}function w2(n){const e=[],r=[],s=new ri,o=new Float32Array(70*3),a=new Float32Array(70*3);for(let T=0;T<70;T++){const S=3+Math.random()*11,P=(Math.random()-.5)*16,M=(Math.random()-.5)*10;o.set([S,P,M],T*3),r.push(new Y(S,P,M));const E=T2("#F0A824","#7CBE3C",(P+8)/16).lerp(new ut("#17726A"),.15);a.set([E.r,E.g,E.b],T*3)}s.setAttribute("position",new Pn(o,3)),s.setAttribute("color",new Pn(a,3));const l=new T_({size:.22,vertexColors:!0,transparent:!0,opacity:.85,blending:Ff,depthWrite:!1}),u=new dM(s,l);n.add(u),e.push(()=>{s.dispose(),l.dispose()});const c=[];for(let T=0;T<70;T++)for(let S=T+1;S<70;S++)r[T].distanceTo(r[S])<8&&c.push(r[T].x,r[T].y,r[T].z,r[S].x,r[S].y,r[S].z);const f=new ri;f.setAttribute("position",new Pn(new Float32Array(c),3));const d=new Wf({color:"#3E8E2E",transparent:!0,opacity:.18}),p=new Qp(f,d);n.add(p),e.push(()=>{f.dispose(),d.dispose()});const g=E2(),_=new Sd(1.6,1.6),m=[];for(let T=0;T<24;T++){const S=new M_({map:g,transparent:!0,opacity:.9,depthWrite:!1,side:hr}),P=new Or(_,S);P.position.set(-3-Math.random()*11,(Math.random()-.5)*18,(Math.random()-.5)*8),P.rotation.z=Math.random()*Math.PI,P.userData={speed:.004+Math.random()*.006,sway:.4+Math.random()*.6,swaySpeed:.3+Math.random()*.5,rotSpeed:(Math.random()-.5)*.01,baseX:P.position.x,phase:Math.random()*Math.PI*2},n.add(P),m.push(P),e.push(()=>S.dispose())}e.push(()=>{_.dispose(),g.dispose()});const h=[];for(let T=0;T<12;T++){const S=m[Math.floor(Math.random()*m.length)],P=r[Math.floor(Math.random()*r.length)];h.push(S.position.x,S.position.y,S.position.z,P.x,P.y,P.z)}const v=new ri;v.setAttribute("position",new Pn(new Float32Array(h),3));const x=new Wf({color:"#F0A824",transparent:!0,opacity:.12}),y=new Qp(v,x);n.add(y),e.push(()=>{v.dispose(),x.dispose()});function w(T){m.forEach(P=>{const M=P.userData;P.position.y-=M.speed*12,P.position.x=M.baseX+Math.sin(T*.001*M.swaySpeed+M.phase)*M.sway,P.rotation.z+=M.rotSpeed,P.position.y<-10&&(P.position.y=10)});const S=(Math.sin(T*.0015)+1)/2;l.opacity=.55+S*.35}return{animate:w,dispose:()=>e.forEach(T=>T())}}function A2(n){const e=[];n.position.x=-3;const r=[],s=new Float32Array(120*3);for(let g=0;g<120;g++){const _=(Math.random()-.5)*20,m=(Math.random()-.5)*14,h=(Math.random()-.5)*12;s.set([_,m,h],g*3),r.push(new Y(_,m,h))}const o=new ri;o.setAttribute("position",new Pn(s,3));const a=new T_({color:"#8fe3c0",size:.16,transparent:!0,opacity:.7,blending:Ff,depthWrite:!1}),l=new dM(o,a);n.add(l),e.push(()=>{o.dispose(),a.dispose()});const u=[];for(let g=0;g<120;g++)for(let _=g+1;_<120;_++)r[g].distanceTo(r[_])<6.2&&u.push(r[g].x,r[g].y,r[g].z,r[_].x,r[_].y,r[_].z);const c=new ri;c.setAttribute("position",new Pn(new Float32Array(u),3));const f=new Wf({color:"#17726A",transparent:!0,opacity:.22}),d=new Qp(c,f);n.add(d),e.push(()=>{c.dispose(),f.dispose()});function p(){n.rotation.y+=6e-5*16}return{animate:p,dispose:()=>e.forEach(g=>g())}}function hM(n,e){dt.useEffect(()=>{const t=n.current;if(!t)return;const i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=t.closest("section"),s={v:!0};let o=null;r&&(o=new IntersectionObserver(([v])=>{s.v=v.isIntersecting},{threshold:.05}),o.observe(r));const a=new fM({canvas:t,alpha:!0,antialias:!0});a.setPixelRatio(Math.min(window.devicePixelRatio||1,2));const l=new Oi(50,1,.1,100);l.position.z=e==="leaves"?22:18;const u=new y2,c=new wl;u.add(c);const f=e==="leaves"?w2(c):A2(c);let d=0,p=0;const g=v=>{d=v.clientX/window.innerWidth-.5,p=v.clientY/window.innerHeight-.5};window.addEventListener("mousemove",g);function _(){const v=t.parentElement,x=(v==null?void 0:v.clientWidth)||window.innerWidth,y=(v==null?void 0:v.clientHeight)||window.innerHeight;a.setSize(x,y,!1),l.aspect=x/(y||1),l.updateProjectionMatrix()}_(),window.addEventListener("resize",_);let m=null;function h(v){s.v&&(c.rotation.y=d*.25*(e==="leaves"?1:.4),c.rotation.x=-p*.15,f.animate(v),a.render(u,l)),i||(m=requestAnimationFrame(h))}return i?a.render(u,l):m=requestAnimationFrame(h),()=>{m&&cancelAnimationFrame(m),window.removeEventListener("mousemove",g),window.removeEventListener("resize",_),o&&o.disconnect(),f.dispose(),a.dispose()}},[n,e])}function C2(){const{t:n}=Sr(),e=dt.useRef(null);return hM(e,"leaves"),$.jsxs("section",{className:"hero",id:"top",children:[$.jsx("canvas",{id:"leaves",ref:e}),$.jsxs("div",{className:"wrap",children:[$.jsx("span",{className:"eyebrow",children:n.hero.eyebrow}),$.jsxs("h1",{children:[n.hero.titlePre,$.jsx("span",{className:"em",children:n.hero.titleEm}),n.hero.titlePost]}),$.jsx("p",{className:"lead",children:n.hero.lead}),$.jsxs("div",{className:"hero-cta",children:[$.jsx("a",{className:"btn btn-light",href:"https://www.iagromoz.com",children:n.hero.ctaPrimary}),$.jsx("a",{className:"btn btn-ghost",href:"#tour",children:n.hero.ctaGhost})]}),$.jsx("div",{className:"chips",children:n.hero.chips.map(t=>$.jsxs("span",{className:"chip",children:["✳ ",$.jsx("b",{children:t})]},t))}),$.jsxs("div",{className:"scroll-hint",children:[$.jsx("div",{className:"mouse"}),$.jsx("span",{children:n.hero.scrollHint})]})]})]})}function br(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function pM(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Ti={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},yu={duration:.5,overwrite:!1,delay:0},w_,vn,Nt,Hi=1e8,Et=1/Hi,em=Math.PI*2,R2=em/4,b2=0,mM=Math.sqrt,P2=Math.cos,L2=Math.sin,dn=function(e){return typeof e=="string"},Vt=function(e){return typeof e=="function"},jr=function(e){return typeof e=="number"},A_=function(e){return typeof e>"u"},yr=function(e){return typeof e=="object"},si=function(e){return e!==!1},C_=function(){return typeof window<"u"},bc=function(e){return Vt(e)||dn(e)},_M=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Ln=Array.isArray,D2=/random\([^)]+\)/g,N2=/,\s*/g,Uv=/(?:-?\.?\d|\.)+/gi,gM=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ga=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Oh=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,vM=/[+-]=-?[.\d]+/,U2=/[^,'"\[\]\s]+/gi,I2=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ft,ur,tm,R_,Ai={},Xf={},xM,yM=function(e){return(Xf=ja(e,Ai))&&ui},b_=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Su=function(e,t){return!t&&console.warn(e)},SM=function(e,t){return e&&(Ai[e]=t)&&Xf&&(Xf[e]=t)||Ai},Mu=function(){return 0},O2={suppressEvents:!0,isStart:!0,kill:!1},tf={suppressEvents:!0,kill:!1},F2={suppressEvents:!0},P_={},As=[],nm={},MM,_i={},Fh={},Iv=30,nf=[],L_="",D_=function(e){var t=e[0],i,r;if(yr(t)||Vt(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=nf.length;r--&&!nf[r].targetTest(t););i=nf[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new WM(e[r],i)))||e.splice(r,1);return e},po=function(e){return e._gsap||D_(Gi(e))[0]._gsap},EM=function(e,t,i){return(i=e[t])&&Vt(i)?e[t]():A_(i)&&e.getAttribute&&e.getAttribute(t)||i},oi=function(e,t){return(e=e.split(",")).forEach(t)||e},Wt=function(e){return Math.round(e*1e5)/1e5||0},It=function(e){return Math.round(e*1e7)/1e7||0},Ra=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},k2=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},jf=function(){var e=As.length,t=As.slice(0),i,r;for(nm={},As.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},N_=function(e){return!!(e._initted||e._startAt||e.add)},TM=function(e,t,i,r){As.length&&!vn&&jf(),e.render(t,i,!!(vn&&t<0&&N_(e))),As.length&&!vn&&jf()},wM=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(U2).length<2?t:dn(e)?e.trim():e},AM=function(e){return e},Ci=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},z2=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},ja=function(e,t){for(var i in t)e[i]=t[i];return e},Ov=function n(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=yr(t[i])?n(e[i]||(e[i]={}),t[i]):t[i]);return e},Yf=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},Vl=function(e){var t=e.parent||Ft,i=e.keyframes?z2(Ln(e.keyframes)):Ci;if(si(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},B2=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},CM=function(e,t,i,r,s){var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},Ed=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[i]===t&&(e[i]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},Ds=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},mo=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},H2=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},im=function(e,t,i,r){return e._startAt&&(vn?e._startAt.revert(tf):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},G2=function n(e){return!e||e._ts&&n(e.parent)},Fv=function(e){return e._repeat?Ya(e._tTime,e=e.duration()+e._rDelay)*e:0},Ya=function(e,t){var i=Math.floor(e=It(e/t));return e&&i===e?i-1:i},qf=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Td=function(e){return e._end=It(e._start+(e._tDur/Math.abs(e._ts||e._rts||Et)||0))},wd=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=It(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Td(e),i._dirty||mo(i,e)),e},RM=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=qf(e.rawTime(),t),(!t._dur||Bu(0,t.totalDuration(),i)-t._tTime>Et)&&t.render(i,!0)),mo(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-Et}},pr=function(e,t,i,r){return t.parent&&Ds(t),t._start=It((jr(i)?i:i||e!==Ft?Di(e,i,t):e._time)+t._delay),t._end=It(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),CM(e,t,"_first","_last",e._sort?"_start":0),rm(t)||(e._recent=t),r||RM(e,t),e._ts<0&&wd(e,e._tTime),e},bM=function(e,t){return(Ai.ScrollTrigger||b_("scrollTrigger",t))&&Ai.ScrollTrigger.create(t,e)},PM=function(e,t,i,r,s){if(I_(e,t,s),!e._initted)return 1;if(!i&&e._pt&&!vn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&MM!==vi.frame)return As.push(e),e._lazy=[s,r],1},V2=function n(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||n(t))},rm=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},W2=function(e,t,i,r){var s=e.ratio,o=t<0||!t&&(!e._start&&V2(e)&&!(!e._initted&&rm(e))||(e._ts<0||e._dp._ts<0)&&!rm(e))?0:1,a=e._rDelay,l=0,u,c,f;if(a&&e._repeat&&(l=Bu(0,e._tDur,t),c=Ya(l,a),e._yoyo&&c&1&&(o=1-o),c!==Ya(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||vn||r||e._zTime===Et||!t&&e._zTime){if(!e._initted&&PM(e,t,r,i,l))return;for(f=e._zTime,e._zTime=t||(i?Et:0),i||(i=t&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,u=e._pt;u;)u.r(o,u.d),u=u._next;t<0&&im(e,t,i,!0),e._onUpdate&&!i&&Si(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&Si(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Ds(e,1),!i&&!vn&&(Si(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},X2=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},qa=function(e,t,i,r){var s=e._repeat,o=It(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:It(o*(s+1)+e._rDelay*s):o,a>0&&!r&&wd(e,e._tTime=e._tDur*a),e.parent&&Td(e),i||mo(e.parent,e),e},kv=function(e){return e instanceof Zn?mo(e):qa(e,e._dur)},j2={_start:0,endTime:Mu,totalDuration:Mu},Di=function n(e,t,i){var r=e.labels,s=e._recent||j2,o=e.duration()>=Hi?s.endTime(!1):e._dur,a,l,u;return dn(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),u=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(u?(a<0?s:i).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),u&&i&&(l=l/100*(Ln(i)?i[0]:i).totalDuration()),a>1?n(e,t.substr(0,a-1),i)+l:o+l)):t==null?o:+t},Wl=function(e,t,i){var r=jr(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=i,e){for(a=o,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=si(l.vars.inherit)&&l.parent;o.immediateRender=si(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new $t(t[0],o,t[s+1])},zs=function(e,t){return e||e===0?t(e):t},Bu=function(e,t,i){return i<e?e:i>t?t:i},Rn=function(e,t){return!dn(e)||!(t=I2.exec(e))?"":t[1]},Y2=function(e,t,i){return zs(i,function(r){return Bu(e,t,r)})},sm=[].slice,LM=function(e,t){return e&&yr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&yr(e[0]))&&!e.nodeType&&e!==ur},q2=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var s;return dn(r)&&!t||LM(r,1)?(s=i).push.apply(s,Gi(r)):i.push(r)})||i},Gi=function(e,t,i){return Nt&&!t&&Nt.selector?Nt.selector(e):dn(e)&&!i&&(tm||!$a())?sm.call((t||R_).querySelectorAll(e),0):Ln(e)?q2(e,i):LM(e)?sm.call(e,0):e?[e]:[]},om=function(e){return e=Gi(e)[0]||Su("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return Gi(t,i.querySelectorAll?i:i===e?Su("Invalid scope")||R_.createElement("div"):e)}},DM=function(e){return e.sort(function(){return .5-Math.random()})},NM=function(e){if(Vt(e))return e;var t=yr(e)?e:{each:e},i=_o(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,u=t.axis,c=r,f=r;return dn(r)?c=f={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(c=r[0],f=r[1]),function(d,p,g){var _=(g||t).length,m=o[_],h,v,x,y,w,T,S,P,M;if(!m){if(M=t.grid==="auto"?0:(t.grid||[1,Hi])[1],!M){for(S=-Hi;S<(S=g[M++].getBoundingClientRect().left)&&M<_;);M<_&&M--}for(m=o[_]=[],h=l?Math.min(M,_)*c-.5:r%M,v=M===Hi?0:l?_*f/M-.5:r/M|0,S=0,P=Hi,T=0;T<_;T++)x=T%M-h,y=v-(T/M|0),m[T]=w=u?Math.abs(u==="y"?y:x):mM(x*x+y*y),w>S&&(S=w),w<P&&(P=w);r==="random"&&DM(m),m.max=S-P,m.min=P,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(M>_?_-1:u?u==="y"?_/M:M:Math.max(M,_/M))||0)*(r==="edges"?-1:1),m.b=_<0?s-_:s,m.u=Rn(t.amount||t.each)||0,i=i&&_<0?aL(i):i}return _=(m[d]-m.min)/m.max||0,It(m.b+(i?i(_):_)*m.v)+m.u}},am=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=It(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(jr(i)?0:Rn(i))}},UM=function(e,t){var i=Ln(e),r,s;return!i&&yr(e)&&(r=i=e.radius||Hi,e.values?(e=Gi(e.values),(s=!jr(e[0]))&&(r*=r)):e=am(e.increment)),zs(t,i?Vt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),u=Hi,c=0,f=e.length,d,p;f--;)s?(d=e[f].x-a,p=e[f].y-l,d=d*d+p*p):d=Math.abs(e[f]-a),d<u&&(u=d,c=f);return c=!r||u<=r?e[c]:o,s||c===o||jr(o)?c:c+Rn(o)}:am(e))},IM=function(e,t,i,r){return zs(Ln(e)?!t:i===!0?!!(i=0):!r,function(){return Ln(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},$2=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(s,o){return o(s)},r)}},K2=function(e,t){return function(i){return e(parseFloat(i))+(t||Rn(i))}},Z2=function(e,t,i){return FM(e,t,0,1,i)},OM=function(e,t,i){return zs(i,function(r){return e[~~t(r)]})},Q2=function n(e,t,i){var r=t-e;return Ln(e)?OM(e,n(0,e.length),t):zs(i,function(s){return(r+(s-e)%r)%r+e})},J2=function n(e,t,i){var r=t-e,s=r*2;return Ln(e)?OM(e,n(0,e.length-1),t):zs(i,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},Eu=function(e){return e.replace(D2,function(t){var i=t.indexOf("[")+1,r=t.substring(i||7,i?t.indexOf("]"):t.length-1).split(N2);return IM(i?r:+r[0],i?0:+r[1],+r[2]||1e-5)})},FM=function(e,t,i,r,s){var o=t-e,a=r-i;return zs(s,function(l){return i+((l-e)/o*a||0)})},eL=function n(e,t,i,r){var s=isNaN(e+t)?0:function(p){return(1-p)*e+p*t};if(!s){var o=dn(e),a={},l,u,c,f,d;if(i===!0&&(r=1)&&(i=null),o)e={p:e},t={p:t};else if(Ln(e)&&!Ln(t)){for(c=[],f=e.length,d=f-2,u=1;u<f;u++)c.push(n(e[u-1],e[u]));f--,s=function(g){g*=f;var _=Math.min(d,~~g);return c[_](g-_)},i=t}else r||(e=ja(Ln(e)?[]:{},e));if(!c){for(l in t)U_.call(a,e,l,"get",t[l]);s=function(g){return k_(g,a)||(o?e.p:e)}}}return zs(i,s)},zv=function(e,t,i){var r=e.labels,s=Hi,o,a,l;for(o in r)a=r[o]-t,a<0==!!i&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Si=function(e,t,i){var r=e.vars,s=r[t],o=Nt,a=e._ctx,l,u,c;if(s)return l=r[t+"Params"],u=r.callbackScope||e,i&&As.length&&jf(),a&&(Nt=a),c=l?s.apply(u,l):s.call(u),Nt=o,c},Al=function(e){return Ds(e),e.scrollTrigger&&e.scrollTrigger.kill(!!vn),e.progress()<1&&Si(e,"onInterrupt"),e},va,kM=[],zM=function(e){if(e)if(e=!e.name&&e.default||e,C_()||e.headless){var t=e.name,i=Vt(e),r=t&&!i&&e.init?function(){this._props=[]}:e,s={init:Mu,render:k_,add:U_,kill:gL,modifier:_L,rawVars:0},o={targetTest:0,get:0,getSetter:F_,aliases:{},register:0};if($a(),e!==r){if(_i[t])return;Ci(r,Ci(Yf(e,s),o)),ja(r.prototype,ja(s,Yf(e,o))),_i[r.prop=t]=r,e.targetTest&&(nf.push(r),P_[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}SM(t,r),e.register&&e.register(ui,r,ai)}else kM.push(e)},Mt=255,Cl={aqua:[0,Mt,Mt],lime:[0,Mt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Mt],navy:[0,0,128],white:[Mt,Mt,Mt],olive:[128,128,0],yellow:[Mt,Mt,0],orange:[Mt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Mt,0,0],pink:[Mt,192,203],cyan:[0,Mt,Mt],transparent:[Mt,Mt,Mt,0]},kh=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*Mt+.5|0},BM=function(e,t,i){var r=e?jr(e)?[e>>16,e>>8&Mt,e&Mt]:0:Cl.black,s,o,a,l,u,c,f,d,p,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Cl[e])r=Cl[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Mt,r&Mt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Mt,e&Mt]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(Uv),!t)l=+r[0]%360/360,u=+r[1]/100,c=+r[2]/100,o=c<=.5?c*(u+1):c+u-c*u,s=c*2-o,r.length>3&&(r[3]*=1),r[0]=kh(l+1/3,s,o),r[1]=kh(l,s,o),r[2]=kh(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(gM),i&&r.length<4&&(r[3]=1),r}else r=e.match(Uv)||Cl.transparent;r=r.map(Number)}return t&&!g&&(s=r[0]/Mt,o=r[1]/Mt,a=r[2]/Mt,f=Math.max(s,o,a),d=Math.min(s,o,a),c=(f+d)/2,f===d?l=u=0:(p=f-d,u=c>.5?p/(2-f-d):p/(f+d),l=f===s?(o-a)/p+(o<a?6:0):f===o?(a-s)/p+2:(s-o)/p+4,l*=60),r[0]=~~(l+.5),r[1]=~~(u*100+.5),r[2]=~~(c*100+.5)),i&&r.length<4&&(r[3]=1),r},HM=function(e){var t=[],i=[],r=-1;return e.split(Cs).forEach(function(s){var o=s.match(ga)||[];t.push.apply(t,o),i.push(r+=o.length+1)}),t.c=i,t},Bv=function(e,t,i){var r="",s=(e+r).match(Cs),o=t?"hsla(":"rgba(",a=0,l,u,c,f;if(!s)return e;if(s=s.map(function(d){return(d=BM(d,t,1))&&o+(t?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),i&&(c=HM(e),l=i.c,l.join(r)!==c.c.join(r)))for(u=e.replace(Cs,"1").split(ga),f=u.length-1;a<f;a++)r+=u[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(c.length?c:s.length?s:i).shift());if(!u)for(u=e.split(Cs),f=u.length-1;a<f;a++)r+=u[a]+s[a];return r+u[f]},Cs=function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Cl)n+="|"+e+"\\b";return new RegExp(n+")","gi")}(),tL=/hsl[a]?\(/,GM=function(e){var t=e.join(" "),i;if(Cs.lastIndex=0,Cs.test(t))return i=tL.test(t),e[1]=Bv(e[1],i),e[0]=Bv(e[0],i,HM(e[1])),!0},Tu,vi=function(){var n=Date.now,e=500,t=33,i=n(),r=i,s=1e3/240,o=s,a=[],l,u,c,f,d,p,g=function _(m){var h=n()-r,v=m===!0,x,y,w,T;if((h>e||h<0)&&(i+=h-t),r+=h,w=r-i,x=w-o,(x>0||v)&&(T=++f.frame,d=w-f.time*1e3,f.time=w=w/1e3,o+=x+(x>=s?4:s-x),y=1),v||(l=u(_)),y)for(p=0;p<a.length;p++)a[p](w,d,T,m)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return d/(1e3/(m||60))},wake:function(){xM&&(!tm&&C_()&&(ur=tm=window,R_=ur.document||{},Ai.gsap=ui,(ur.gsapVersions||(ur.gsapVersions=[])).push(ui.version),yM(Xf||ur.GreenSockGlobals||!ur.gsap&&ur||{}),kM.forEach(zM)),c=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),u=c||function(m){return setTimeout(m,o-f.time*1e3+1|0)},Tu=1,g(2))},sleep:function(){(c?cancelAnimationFrame:clearTimeout)(l),Tu=0,u=Mu},lagSmoothing:function(m,h){e=m||1/0,t=Math.min(h||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,h,v){var x=h?function(y,w,T,S){m(y,w,T,S),f.remove(x)}:m;return f.remove(m),a[v?"unshift":"push"](x),$a(),x},remove:function(m,h){~(h=a.indexOf(m))&&a.splice(h,1)&&p>=h&&p--},_listeners:a},f}(),$a=function(){return!Tu&&vi.wake()},at={},nL=/^[\d.\-M][\d.\-,\s]/,iL=/["']/g,rL=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],s=1,o=i.length,a,l,u;s<o;s++)l=i[s],a=s!==o-1?l.lastIndexOf(","):l.length,u=l.substr(0,a),t[r]=isNaN(u)?u.replace(iL,"").trim():+u,r=l.substr(a+1).trim();return t},sL=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},oL=function(e){var t=(e+"").split("("),i=at[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[rL(t[1])]:sL(e).split(",").map(wM)):at._CE&&nL.test(e)?at._CE("",e):i},aL=function(e){return function(t){return 1-e(1-t)}},_o=function(e,t){return e&&(Vt(e)?e:at[e]||oL(e))||t},No=function(e,t,i,r){i===void 0&&(i=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:i,easeInOut:r},o;return oi(e,function(a){at[a]=Ai[a]=s,at[o=a.toLowerCase()]=i;for(var l in s)at[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=at[a+"."+l]=s[l]}),s},VM=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},zh=function n(e,t,i){var r=t>=1?t:1,s=(i||(e?.3:.45))/(t<1?t:1),o=s/em*(Math.asin(1/r)||0),a=function(c){return c===1?1:r*Math.pow(2,-10*c)*L2((c-o)*s)+1},l=e==="out"?a:e==="in"?function(u){return 1-a(1-u)}:VM(a);return s=em/s,l.config=function(u,c){return n(e,u,c)},l},Bh=function n(e,t){t===void 0&&(t=1.70158);var i=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?i:e==="in"?function(s){return 1-i(1-s)}:VM(i);return r.config=function(s){return n(e,s)},r};oi("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,e){var t=e<5?e+1:e;No(n+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});at.Linear.easeNone=at.none=at.Linear.easeIn;No("Elastic",zh("in"),zh("out"),zh());(function(n,e){var t=1/e,i=2*t,r=2.5*t,s=function(a){return a<t?n*a*a:a<i?n*Math.pow(a-1.5/e,2)+.75:a<r?n*(a-=2.25/e)*a+.9375:n*Math.pow(a-2.625/e,2)+.984375};No("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);No("Expo",function(n){return Math.pow(2,10*(n-1))*n+n*n*n*n*n*n*(1-n)});No("Circ",function(n){return-(mM(1-n*n)-1)});No("Sine",function(n){return n===1?1:-P2(n*R2)+1});No("Back",Bh("in"),Bh("out"),Bh());at.SteppedEase=at.steps=Ai.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),s=t?1:0,o=1-Et;return function(a){return((r*Bu(0,o,a)|0)+s)*i}}};yu.ease=at["quad.out"];oi("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return L_+=n+","+n+"Params,"});var WM=function(e,t){this.id=b2++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:EM,this.set=t?t.getSetter:F_},wu=function(){function n(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,qa(this,+t.duration,1,1),this.data=t.data,Nt&&(this._ctx=Nt,Nt.data.push(this)),Tu||vi.wake()}var e=n.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,qa(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if($a(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(wd(this,i),!s._dp||s.parent||RM(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&pr(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Et||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),TM(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+Fv(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+Fv(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*s,r):this._repeat?Ya(this._tTime,s)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-Et?0:this._rts;if(this._rts===i)return this;var s=this.parent&&this._ts?qf(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-Et?0:this._rts,this.totalTime(Bu(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Td(this),H2(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):($a(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Et&&(this._tTime-=Et)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=It(i);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&pr(r,this,this._start-this._delay),this}return this._start},e.endTime=function(i){return this._start+(si(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?qf(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=F2);var r=vn;return vn=i,N_(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),vn=r,this},e.globalTime=function(i){for(var r=this,s=arguments.length?i:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):s},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,kv(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,kv(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(Di(this,i),si(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,si(r)),this._dur||(this._zTime=-Et),this},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-Et:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Et,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,s;return!!(!i||this._ts&&this._initted&&i.isActive()&&(s=i.rawTime(!0))>=r&&s<this.endTime(!0)-Et)},e.eventCallback=function(i,r,s){var o=this.vars;return arguments.length>1?(r?(o[i]=r,s&&(o[i+"Params"]=s),i==="onUpdate"&&(this._onUpdate=r)):delete o[i],this):o[i]},e.then=function(i){var r=this,s=r._prom;return new Promise(function(o){var a=Vt(i)?i:AM,l=function(){var c=r.then;r.then=null,s&&s(),Vt(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=c),o(a),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){Al(this)},n}();Ci(wu.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Et,_prom:0,_ps:!1,_rts:1});var Zn=function(n){pM(e,n);function e(i,r){var s;return i===void 0&&(i={}),s=n.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=si(i.sortChildren),Ft&&pr(i.parent||Ft,br(s),r),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&bM(br(s),i.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return Wl(0,arguments,this),this},t.from=function(r,s,o){return Wl(1,arguments,this),this},t.fromTo=function(r,s,o,a){return Wl(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,Vl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new $t(r,s,Di(this,o),1),this},t.call=function(r,s,o){return pr(this,$t.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,u,c){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=u,o.onCompleteParams=c,o.parent=this,new $t(r,o,Di(this,l)),this},t.staggerFrom=function(r,s,o,a,l,u,c){return o.runBackwards=1,Vl(o).immediateRender=si(o.immediateRender),this.staggerTo(r,s,o,a,l,u,c)},t.staggerFromTo=function(r,s,o,a,l,u,c,f){return a.startAt=o,Vl(a).immediateRender=si(a.immediateRender),this.staggerTo(r,s,a,l,u,c,f)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,u=this._dur,c=r<=0?0:It(r),f=this._zTime<0!=r<0&&(this._initted||!u),d,p,g,_,m,h,v,x,y,w,T,S;if(this!==Ft&&c>l&&r>=0&&(c=l),c!==this._tTime||o||f){if(a!==this._time&&u&&(c+=this._time-a,r+=this._time-a),d=c,y=this._start,x=this._ts,h=!x,f&&(u||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(T=this._yoyo,m=u+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(d=It(c%m),c===l?(_=this._repeat,d=u):(w=It(c/m),_=~~w,_&&_===w&&(d=u,_--),d>u&&(d=u)),w=Ya(this._tTime,m),!a&&this._tTime&&w!==_&&this._tTime-w*m-this._dur<=0&&(w=_),T&&_&1&&(d=u-d,S=1),_!==w&&!this._lock){var P=T&&w&1,M=P===(T&&_&1);if(_<w&&(P=!P),a=P?0:c%u?u:c,this._lock=1,this.render(a||(S?0:It(_*m)),s,!u)._lock=0,this._tTime=c,!s&&this.parent&&Si(this,"onRepeat"),this.vars.repeatRefresh&&!S&&(this.invalidate()._lock=1,w=_),a&&a!==this._time||h!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(u=this._dur,l=this._tDur,M&&(this._lock=2,a=P?u:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!S&&this.invalidate()),this._lock=0,!this._ts&&!h)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=X2(this,It(a),It(d)),v&&(c-=d-(d=v._start))),this._tTime=c,this._time=d,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&c&&u&&!s&&!w&&(Si(this,"onStart"),this._tTime!==c))return this;if(d>=a&&r>=0)for(p=this._first;p;){if(g=p._next,(p._act||d>=p._start)&&p._ts&&v!==p){if(p.parent!==this)return this.render(r,s,o);if(p.render(p._ts>0?(d-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(d-p._start)*p._ts,s,o),d!==this._time||!this._ts&&!h){v=0,g&&(c+=this._zTime=-Et);break}}p=g}else{p=this._last;for(var E=r<0?r:d;p;){if(g=p._prev,(p._act||E<=p._end)&&p._ts&&v!==p){if(p.parent!==this)return this.render(r,s,o);if(p.render(p._ts>0?(E-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(E-p._start)*p._ts,s,o||vn&&N_(p)),d!==this._time||!this._ts&&!h){v=0,g&&(c+=this._zTime=E?-Et:Et);break}}p=g}}if(v&&!s&&(this.pause(),v.render(d>=a?0:-Et)._zTime=d>=a?1:-1,this._ts))return this._start=y,Td(this),this.render(r,s,o);this._onUpdate&&!s&&Si(this,"onUpdate",!0),(c===l&&this._tTime>=this.totalDuration()||!c&&a)&&(y===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((r||!u)&&(c===l&&this._ts>0||!c&&this._ts<0)&&Ds(this,1),!s&&!(r<0&&!a)&&(c||a||!l)&&(Si(this,c===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(jr(s)||(s=Di(this,s,r)),!(r instanceof wu)){if(Ln(r))return r.forEach(function(a){return o.add(a,s)}),this;if(dn(r))return this.addLabel(r,s);if(Vt(r))r=$t.delayedCall(0,r);else return this}return this!==r?pr(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Hi);for(var l=[],u=this._first;u;)u._start>=a&&(u instanceof $t?s&&l.push(u):(o&&l.push(u),r&&l.push.apply(l,u.getChildren(!0,s,o)))),u=u._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return dn(r)?this.removeLabel(r):Vt(r)?this.killTweensOf(r):(r.parent===this&&Ed(this,r),r===this._recent&&(this._recent=this._last),mo(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=It(vi.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),n.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=Di(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=$t.delayedCall(0,s||Mu,o);return a.data="isPause",this._hasPause=1,pr(this,a,Di(this,r))},t.removePause=function(r){var s=this._first;for(r=Di(this,r);s;)s._start===r&&s.data==="isPause"&&Ds(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)cs!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=Gi(r),l=this._first,u=jr(s),c;l;)l instanceof $t?k2(l._targets,a)&&(u?(!cs||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(c=l.getTweensOf(a,s)).length&&o.push.apply(o,c),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=Di(o,r),l=s,u=l.startAt,c=l.onStart,f=l.onStartParams,d=l.immediateRender,p,g=$t.to(o,Ci({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(u&&"time"in u?u.time:o._time))/o.timeScale())||Et,onStart:function(){if(o.pause(),!p){var m=s.duration||Math.abs((a-(u&&"time"in u?u.time:o._time))/o.timeScale());g._dur!==m&&qa(g,m,0,1).render(g._time,!0,!0),p=1}c&&c.apply(g,f||[])}},s));return d?g.render(0):g},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,Ci({startAt:{time:Di(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),zv(this,Di(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),zv(this,Di(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Et)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,u;for(r=It(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(u in l)l[u]>=o&&(l[u]+=r);return mo(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return n.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),mo(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=Hi,u,c,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)u=a._prev,a._dirty&&a.totalDuration(),c=a._start,c>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,pr(o,a,c-a._delay,1)._lock=0):l=c,c<0&&a._ts&&(s-=c,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=It(c/o._ts),o._time-=c,o._tTime-=c),o.shiftChildren(-c,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=u;qa(o,o===Ft&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(Ft._ts&&(TM(Ft,qf(r,Ft)),MM=vi.frame),vi.frame>=Iv){Iv+=Ti.autoSleep||120;var s=Ft._first;if((!s||!s._ts)&&Ti.autoSleep&&vi._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||vi.sleep()}}},e}(wu);Ci(Zn.prototype,{_lock:0,_hasPause:0,_forcing:0});var lL=function(e,t,i,r,s,o,a){var l=new ai(this._pt,e,t,0,1,KM,null,s),u=0,c=0,f,d,p,g,_,m,h,v;for(l.b=i,l.e=r,i+="",r+="",(h=~r.indexOf("random("))&&(r=Eu(r)),o&&(v=[i,r],o(v,e,t),i=v[0],r=v[1]),d=i.match(Oh)||[];f=Oh.exec(r);)g=f[0],_=r.substring(u,f.index),p?p=(p+1)%5:_.substr(-5)==="rgba("&&(p=1),g!==d[c++]&&(m=parseFloat(d[c-1])||0,l._pt={_next:l._pt,p:_||c===1?_:",",s:m,c:g.charAt(1)==="="?Ra(m,g)-m:parseFloat(g)-m,m:p&&p<4?Math.round:0},u=Oh.lastIndex);return l.c=u<r.length?r.substring(u,r.length):"",l.fp=a,(vM.test(r)||h)&&(l.e=0),this._pt=l,l},U_=function(e,t,i,r,s,o,a,l,u,c){Vt(r)&&(r=r(s||0,e,o));var f=e[t],d=i!=="get"?i:Vt(f)?u?e[t.indexOf("set")||!Vt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](u):e[t]():f,p=Vt(f)?u?hL:qM:O_,g;if(dn(r)&&(~r.indexOf("random(")&&(r=Eu(r)),r.charAt(1)==="="&&(g=Ra(d,r)+(Rn(d)||0),(g||g===0)&&(r=g))),!c||d!==r||lm)return!isNaN(d*r)&&r!==""?(g=new ai(this._pt,e,t,+d||0,r-(d||0),typeof f=="boolean"?mL:$M,0,p),u&&(g.fp=u),a&&g.modifier(a,this,e),this._pt=g):(!f&&!(t in e)&&b_(t,r),lL.call(this,e,t,d,r,p,l||Ti.stringFilter,u))},uL=function(e,t,i,r,s){if(Vt(e)&&(e=Xl(e,s,t,i,r)),!yr(e)||e.style&&e.nodeType||Ln(e)||_M(e))return dn(e)?Xl(e,s,t,i,r):e;var o={},a;for(a in e)o[a]=Xl(e[a],s,t,i,r);return o},XM=function(e,t,i,r,s,o){var a,l,u,c;if(_i[e]&&(a=new _i[e]).init(s,a.rawVars?t[e]:uL(t[e],r,s,o,i),i,r,o)!==!1&&(i._pt=l=new ai(i._pt,s,e,0,1,a.render,a,0,a.priority),i!==va))for(u=i._ptLookup[i._targets.indexOf(s)],c=a._props.length;c--;)u[a._props[c]]=l;return a},cs,lm,I_=function n(e,t,i){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,u=r.onUpdate,c=r.runBackwards,f=r.yoyoEase,d=r.keyframes,p=r.autoRevert,g=e._dur,_=e._startAt,m=e._targets,h=e.parent,v=h&&h.data==="nested"?h.vars.targets:m,x=e._overwrite==="auto"&&!w_,y=e.timeline,w=r.easeReverse||f,T,S,P,M,E,k,U,Q,L,F,G,W,N;if(y&&(!d||!s)&&(s="none"),e._ease=_o(s,yu.ease),e._rEase=w&&(_o(w)||e._ease),e._from=!y&&!!r.runBackwards,e._from&&(e.ratio=1),!y||d&&!r.stagger){if(Q=m[0]?po(m[0]).harness:0,W=Q&&r[Q.prop],T=Yf(r,P_),_&&(_._zTime<0&&_.progress(1),t<0&&c&&a&&!p?_.render(-1,!0):_.revert(c&&g?tf:O2),_._lazy=0),o){if(Ds(e._startAt=$t.set(m,Ci({data:"isStart",overwrite:!1,parent:h,immediateRender:!0,lazy:!_&&si(l),startAt:null,delay:0,onUpdate:u&&function(){return Si(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(vn||!a&&!p)&&e._startAt.revert(tf),a&&g&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(c&&g&&!_){if(t&&(a=!1),P=Ci({overwrite:!1,data:"isFromStart",lazy:a&&!_&&si(l),immediateRender:a,stagger:0,parent:h},T),W&&(P[Q.prop]=W),Ds(e._startAt=$t.set(m,P)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(vn?e._startAt.revert(tf):e._startAt.render(-1,!0)),e._zTime=t,!a)n(e._startAt,Et,Et);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&si(l)||l&&!g,S=0;S<m.length;S++){if(E=m[S],U=E._gsap||D_(m)[S]._gsap,e._ptLookup[S]=F={},nm[U.id]&&As.length&&jf(),G=v===m?S:v.indexOf(E),Q&&(L=new Q).init(E,W||T,e,G,v)!==!1&&(e._pt=M=new ai(e._pt,E,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(O){F[O]=M}),L.priority&&(k=1)),!Q||W)for(P in T)_i[P]&&(L=XM(P,T,e,G,E,v))?L.priority&&(k=1):F[P]=M=U_.call(e,E,P,"get",T[P],G,v,0,r.stringFilter);e._op&&e._op[S]&&e.kill(E,e._op[S]),x&&e._pt&&(cs=e,Ft.killTweensOf(E,F,e.globalTime(t)),N=!e.parent,cs=0),e._pt&&l&&(nm[U.id]=1)}k&&ZM(e),e._onInit&&e._onInit(e)}e._onUpdate=u,e._initted=(!e._op||e._pt)&&!N,d&&t<=0&&y.render(Hi,!0,!0)},cL=function(e,t,i,r,s,o,a,l){var u=(e._pt&&e._ptCache||(e._ptCache={}))[t],c,f,d,p;if(!u)for(u=e._ptCache[t]=[],d=e._ptLookup,p=e._targets.length;p--;){if(c=d[p][t],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==t&&c.fp!==t;)c=c._next;if(!c)return lm=1,e.vars[t]="+=0",I_(e,a),lm=0,l?Su(t+" not eligible for reset. Try splitting into individual properties"):1;u.push(c)}for(p=u.length;p--;)f=u[p],c=f._pt||f,c.s=(r||r===0)&&!s?r:c.s+(r||0)+o*c.c,c.c=i-c.s,f.e&&(f.e=Wt(i)+Rn(f.e)),f.b&&(f.b=c.s+Rn(f.b))},fL=function(e,t){var i=e[0]?po(e[0]).harness:0,r=i&&i.aliases,s,o,a,l;if(!r)return t;s=ja({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},dL=function(e,t,i,r){var s=t.ease||r||"power1.inOut",o,a;if(Ln(t))a=i[e]||(i[e]=[]),t.forEach(function(l,u){return a.push({t:u/(t.length-1)*100,v:l,e:s})});else for(o in t)a=i[o]||(i[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Xl=function(e,t,i,r,s){return Vt(e)?e.call(t,i,r,s):dn(e)&&~e.indexOf("random(")?Eu(e):e},jM=L_+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",YM={};oi(jM+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return YM[n]=1});var $t=function(n){pM(e,n);function e(i,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=n.call(this,o?r:Vl(r))||this;var l=a.vars,u=l.duration,c=l.delay,f=l.immediateRender,d=l.stagger,p=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,h=r.parent||Ft,v=(Ln(i)||_M(i)?jr(i[0]):"length"in r)?[i]:Gi(i),x,y,w,T,S,P,M,E;if(a._targets=v.length?D_(v):Su("GSAP target "+i+" not found. https://gsap.com",!Ti.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=p,g||d||bc(u)||bc(c)){r=a.vars;var k=r.easeReverse||r.yoyoEase;if(x=a.timeline=new Zn({data:"nested",defaults:_||{},targets:h&&h.data==="nested"?h.vars.targets:v}),x.kill(),x.parent=x._dp=br(a),x._start=0,d||bc(u)||bc(c)){if(T=v.length,M=d&&NM(d),yr(d))for(S in d)~jM.indexOf(S)&&(E||(E={}),E[S]=d[S]);for(y=0;y<T;y++)w=Yf(r,YM),w.stagger=0,k&&(w.easeReverse=k),E&&ja(w,E),P=v[y],w.duration=+Xl(u,br(a),y,P,v),w.delay=(+Xl(c,br(a),y,P,v)||0)-a._delay,!d&&T===1&&w.delay&&(a._delay=c=w.delay,a._start+=c,w.delay=0),x.to(P,w,M?M(y,P,v):0),x._ease=at.none;x.duration()?u=c=0:a.timeline=0}else if(g){Vl(Ci(x.vars.defaults,{ease:"none"})),x._ease=_o(g.ease||r.ease||"none");var U=0,Q,L,F;if(Ln(g))g.forEach(function(G){return x.to(v,G,">")}),x.duration();else{w={};for(S in g)S==="ease"||S==="easeEach"||dL(S,g[S],w,g.easeEach);for(S in w)for(Q=w[S].sort(function(G,W){return G.t-W.t}),U=0,y=0;y<Q.length;y++)L=Q[y],F={ease:L.e,duration:(L.t-(y?Q[y-1].t:0))/100*u},F[S]=L.v,x.to(v,F,U),U+=F.duration;x.duration()<u&&x.to({},{duration:u-x.duration()})}}u||a.duration(u=x.duration())}else a.timeline=0;return p===!0&&!w_&&(cs=br(a),Ft.killTweensOf(v),cs=0),pr(h,br(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!u&&!g&&a._start===It(h._time)&&si(f)&&G2(br(a))&&h.data!=="nested")&&(a._tTime=-Et,a.render(Math.max(0,-c)||0)),m&&bM(br(a),m),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,u=this._dur,c=r<0,f=r>l-Et&&!c?l:r<Et?0:r,d,p,g,_,m,h,v,x;if(!u)W2(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c||this._lazy){if(d=f,x=this.timeline,this._repeat){if(_=u+this._rDelay,this._repeat<-1&&c)return this.totalTime(_*100+r,s,o);if(d=It(f%_),f===l?(g=this._repeat,d=u):(m=It(f/_),g=~~m,g&&g===m?(d=u,g--):d>u&&(d=u)),h=this._yoyo&&g&1,h&&(d=u-d),m=Ya(this._tTime,_),d===a&&!o&&this._initted&&g===m)return this._tTime=f,this;g!==m&&this.vars.repeatRefresh&&!h&&!this._lock&&d!==_&&this._initted&&(this._lock=o=1,this.render(It(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(PM(this,c?r:d,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(u!==this._dur)return this.render(r,s,o)}if(this._rEase){var y=d<a;if(y!==this._inv){var w=y?a:u-a;this._inv=y,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=w?(y?-1:1)/w:0,this._invScale=y?-this.ratio:1-this.ratio,this._invEase=y?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((d-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(d/u);if(this._from&&(this.ratio=v=1-v),this._tTime=f,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&f&&!s&&!m&&(Si(this,"onStart"),this._tTime!==f))return this;for(p=this._pt;p;)p.r(v,p.d),p=p._next;x&&x.render(r<0?r:x._dur*x._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(c&&im(this,r,s,o),Si(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&Si(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(c&&!this._onUpdate&&im(this,r,!0,!0),(r||!u)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&Ds(this,1),!s&&!(c&&!a)&&(f||a||h)&&(Si(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),n.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){Tu||vi.wake(),this._ts||this.play();var u=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||I_(this,u),c=this._ease(u/this._dur),cL(this,r,s,o,a,c,u,l)?this.resetTo(r,s,o,a,1):(wd(this,0),this.parent||CM(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Al(this):this.scrollTrigger&&this.scrollTrigger.kill(!!vn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,cs&&cs.vars.overwrite!==!0)._first||Al(this),this.parent&&o!==this.timeline.totalDuration()&&qa(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?Gi(r):a,u=this._ptLookup,c=this._pt,f,d,p,g,_,m,h;if((!s||s==="all")&&B2(a,l))return s==="all"&&(this._pt=0),Al(this);for(f=this._op=this._op||[],s!=="all"&&(dn(s)&&(_={},oi(s,function(v){return _[v]=1}),s=_),s=fL(a,s)),h=a.length;h--;)if(~l.indexOf(a[h])){d=u[h],s==="all"?(f[h]=s,g=d,p={}):(p=f[h]=f[h]||{},g=s);for(_ in g)m=d&&d[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&Ed(this,m,"_pt"),delete d[_]),p!=="all"&&(p[_]=1)}return this._initted&&!this._pt&&c&&Al(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Wl(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return Wl(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return Ft.killTweensOf(r,s,o)},e}(wu);Ci($t.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});oi("staggerTo,staggerFrom,staggerFromTo",function(n){$t[n]=function(){var e=new Zn,t=sm.call(arguments,0);return t.splice(n==="staggerFromTo"?5:4,0,0),e[n].apply(e,t)}});var O_=function(e,t,i){return e[t]=i},qM=function(e,t,i){return e[t](i)},hL=function(e,t,i,r){return e[t](r.fp,i)},pL=function(e,t,i){return e.setAttribute(t,i)},F_=function(e,t){return Vt(e[t])?qM:A_(e[t])&&e.setAttribute?pL:O_},$M=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},mL=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},KM=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},k_=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},_L=function(e,t,i,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,i),s=o},gL=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Ed(this,t,"_pt"):t.dep||(i=1),t=r;return!i},vL=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},ZM=function(e){for(var t=e._pt,i,r,s,o;t;){for(i=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=i}e._pt=s},ai=function(){function n(t,i,r,s,o,a,l,u,c){this.t=i,this.s=s,this.c=o,this.p=r,this.r=a||$M,this.d=l||this,this.set=u||O_,this.pr=c||0,this._next=t,t&&(t._prev=this)}var e=n.prototype;return e.modifier=function(i,r,s){this.mSet=this.mSet||this.set,this.set=vL,this.m=i,this.mt=s,this.tween=r},n}();oi(L_+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(n){return P_[n]=1});Ai.TweenMax=Ai.TweenLite=$t;Ai.TimelineLite=Ai.TimelineMax=Zn;Ft=new Zn({sortChildren:!1,defaults:yu,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Ti.stringFilter=GM;var go=[],rf={},xL=[],Hv=0,yL=0,Hh=function(e){return(rf[e]||xL).map(function(t){return t()})},um=function(){var e=Date.now(),t=[];e-Hv>2&&(Hh("matchMediaInit"),go.forEach(function(i){var r=i.queries,s=i.conditions,o,a,l,u;for(a in r)o=ur.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,u=1);u&&(i.revert(),l&&t.push(i))}),Hh("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),Hv=e,Hh("matchMedia"))},QM=function(){function n(t,i){this.selector=i&&om(i),this.data=[],this._r=[],this.isReverted=!1,this.id=yL++,t&&this.add(t)}var e=n.prototype;return e.add=function(i,r,s){Vt(i)&&(s=r,r=i,i=Vt);var o=this,a=function(){var u=Nt,c=o.selector,f;return u&&u!==o&&u.data.push(o),s&&(o.selector=om(s)),Nt=o,f=r.apply(o,arguments),Vt(f)&&o._r.push(f),Nt=u,o.selector=c,o.isReverted=!1,f};return o.last=a,i===Vt?a(o,function(l){return o.add(null,l)}):i?o[i]=a:a},e.ignore=function(i){var r=Nt;Nt=null,i(this),Nt=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof n?i.push.apply(i,r.getTweens()):r instanceof $t&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var s=this;if(i?function(){for(var a=s.getTweens(),l=s.data.length,u;l--;)u=s.data[l],u.data==="isFlip"&&(u.revert(),u.getChildren(!0,!0,!1).forEach(function(c){return a.splice(a.indexOf(c),1)}));for(a.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,f){return f.g-c.g||-1/0}).forEach(function(c){return c.t.revert(i)}),l=s.data.length;l--;)u=s.data[l],u instanceof Zn?u.data!=="nested"&&(u.scrollTrigger&&u.scrollTrigger.revert(),u.kill()):!(u instanceof $t)&&u.revert&&u.revert(i);s._r.forEach(function(c){return c(i,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=go.length;o--;)go[o].id===this.id&&go.splice(o,1)},e.revert=function(i){this.kill(i||{})},n}(),SL=function(){function n(t){this.contexts=[],this.scope=t,Nt&&Nt.data.push(this)}var e=n.prototype;return e.add=function(i,r,s){yr(i)||(i={matches:i});var o=new QM(0,s||this.scope),a=o.conditions={},l,u,c;Nt&&!o.selector&&(o.selector=Nt.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=i;for(u in i)u==="all"?c=1:(l=ur.matchMedia(i[u]),l&&(go.indexOf(o)<0&&go.push(o),(a[u]=l.matches)&&(c=1),l.addListener?l.addListener(um):l.addEventListener("change",um)));return c&&r(o,function(f){return o.add(null,f)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},n}(),$f={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return zM(r)})},timeline:function(e){return new Zn(e)},getTweensOf:function(e,t){return Ft.getTweensOf(e,t)},getProperty:function(e,t,i,r){dn(e)&&(e=Gi(e)[0]);var s=po(e||{}).get,o=i?AM:wM;return i==="native"&&(i=""),e&&(t?o((_i[t]&&_i[t].get||s)(e,t,i,r)):function(a,l,u){return o((_i[a]&&_i[a].get||s)(e,a,l,u))})},quickSetter:function(e,t,i){if(e=Gi(e),e.length>1){var r=e.map(function(c){return ui.quickSetter(c,t,i)}),s=r.length;return function(c){for(var f=s;f--;)r[f](c)}}e=e[0]||{};var o=_i[t],a=po(e),l=a.harness&&(a.harness.aliases||{})[t]||t,u=o?function(c){var f=new o;va._pt=0,f.init(e,i?c+i:c,va,0,[e]),f.render(1,f),va._pt&&k_(1,va)}:a.set(e,l);return o?u:function(c){return u(e,l,i?c+i:c,a,1)}},quickTo:function(e,t,i){var r,s=ui.to(e,Ci((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),i||{})),o=function(l,u,c){return s.resetTo(t,l,u,c)};return o.tween=s,o},isTweening:function(e){return Ft.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=_o(e.ease,yu.ease)),Ov(yu,e||{})},config:function(e){return Ov(Ti,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!_i[a]&&!Ai[a]&&Su(t+" effect requires "+a+" plugin.")}),Fh[t]=function(a,l,u){return i(Gi(a),Ci(l||{},s),u)},o&&(Zn.prototype[t]=function(a,l,u){return this.add(Fh[t](a,yr(l)?l:(u=l)&&{},this),u)})},registerEase:function(e,t){at[e]=_o(t)},parseEase:function(e,t){return arguments.length?_o(e,t):at},getById:function(e){return Ft.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new Zn(e),r,s;for(i.smoothChildTiming=si(e.smoothChildTiming),Ft.remove(i),i._dp=0,i._time=i._tTime=Ft._time,r=Ft._first;r;)s=r._next,(t||!(!r._dur&&r instanceof $t&&r.vars.onComplete===r._targets[0]))&&pr(i,r,r._start-r._delay),r=s;return pr(Ft,i,0),i},context:function(e,t){return e?new QM(e,t):Nt},matchMedia:function(e){return new SL(e)},matchMediaRefresh:function(){return go.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||um()},addEventListener:function(e,t){var i=rf[e]||(rf[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=rf[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:Q2,wrapYoyo:J2,distribute:NM,random:IM,snap:UM,normalize:Z2,getUnit:Rn,clamp:Y2,splitColor:BM,toArray:Gi,selector:om,mapRange:FM,pipe:$2,unitize:K2,interpolate:eL,shuffle:DM},install:yM,effects:Fh,ticker:vi,updateRoot:Zn.updateRoot,plugins:_i,globalTimeline:Ft,core:{PropTween:ai,globals:SM,Tween:$t,Timeline:Zn,Animation:wu,getCache:po,_removeLinkedListItem:Ed,reverting:function(){return vn},context:function(e){return e&&Nt&&(Nt.data.push(e),e._ctx=Nt),Nt},suppressOverwrites:function(e){return w_=e}}};oi("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return $f[n]=$t[n]});vi.add(Zn.updateRoot);va=$f.to({},{duration:0});var ML=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},EL=function(e,t){var i=e._targets,r,s,o;for(r in t)for(s=i.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=ML(o,r)),o&&o.modifier&&o.modifier(t[r],e,i[s],r))},Gh=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,u;if(dn(s)&&(l={},oi(s,function(c){return l[c]=1}),s=l),t){l={};for(u in s)l[u]=t(s[u]);s=l}EL(a,s)}}}},ui=$f.registerPlugin({name:"attr",init:function(e,t,i,r,s){var o,a,l;this.tween=i;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var i=t._pt;i;)vn?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},Gh("roundProps",am),Gh("modifiers"),Gh("snap",UM))||$f;$t.version=Zn.version=ui.version="3.15.0";xM=1;C_()&&$a();at.Power0;at.Power1;at.Power2;at.Power3;at.Power4;at.Linear;at.Quad;at.Cubic;at.Quart;at.Quint;at.Strong;at.Elastic;at.Back;at.SteppedEase;at.Bounce;at.Sine;at.Expo;at.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Gv,fs,ba,z_,oo,Vv,B_,TL=function(){return typeof window<"u"},Yr={},Qs=180/Math.PI,Pa=Math.PI/180,Zo=Math.atan2,Wv=1e8,H_=/([A-Z])/g,wL=/(left|right|width|margin|padding|x)/i,AL=/[\s,\(]\S/,mr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},cm=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},CL=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},RL=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},bL=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},PL=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},JM=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},eE=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},LL=function(e,t,i){return e.style[t]=i},DL=function(e,t,i){return e.style.setProperty(t,i)},NL=function(e,t,i){return e._gsap[t]=i},UL=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},IL=function(e,t,i,r,s){var o=e._gsap;o.scaleX=o.scaleY=i,o.renderTransform(s,o)},OL=function(e,t,i,r,s){var o=e._gsap;o[t]=i,o.renderTransform(s,o)},kt="transform",li=kt+"Origin",FL=function n(e,t){var i=this,r=this.target,s=r.style,o=r._gsap;if(e in Yr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=mr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=Lr(r,a)}):this.tfm[e]=o.x?o[e]:Lr(r,e),e===li&&(this.tfm.zOrigin=o.zOrigin);else return mr.transform.split(",").forEach(function(a){return n.call(i,a,t)});if(this.props.indexOf(kt)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(li,t,"")),e=kt}(s||t)&&this.props.push(e,t,s[e])},tE=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},kL=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?i[e[s]]=e[s+2]:i.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(H_,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=B_(),(!s||!s.isStart)&&!i[kt]&&(tE(i),r.zOrigin&&i[li]&&(i[li]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},nE=function(e,t){var i={target:e,props:[],revert:kL,save:FL};return e._gsap||ui.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return i.save(r)}),i},iE,fm=function(e,t){var i=fs.createElementNS?fs.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):fs.createElement(e);return i&&i.style?i:fs.createElement(e)},Mi=function n(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(H_,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&n(e,Ka(t)||t,1)||""},Xv="O,Moz,ms,Ms,Webkit".split(","),Ka=function(e,t,i){var r=t||oo,s=r.style,o=5;if(e in s&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Xv[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Xv[o]:"")+e},dm=function(){TL()&&window.document&&(Gv=window,fs=Gv.document,ba=fs.documentElement,oo=fm("div")||{style:{}},fm("div"),kt=Ka(kt),li=kt+"Origin",oo.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",iE=!!Ka("perspective"),B_=ui.core.reverting,z_=1)},jv=function(e){var t=e.ownerSVGElement,i=fm("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",i.appendChild(r),ba.appendChild(i);try{s=r.getBBox()}catch{}return i.removeChild(r),ba.removeChild(i),s},Yv=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},rE=function(e){var t,i;try{t=e.getBBox()}catch{t=jv(e),i=1}return t&&(t.width||t.height)||i||(t=jv(e)),t&&!t.width&&!t.x&&!t.y?{x:+Yv(e,["x","cx","x1"])||0,y:+Yv(e,["y","cy","y1"])||0,width:0,height:0}:t},sE=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&rE(e))},Ns=function(e,t){if(t){var i=e.style,r;t in Yr&&t!==li&&(t=kt),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(H_,"-$1").toLowerCase())):i.removeAttribute(t)}},ds=function(e,t,i,r,s,o){var a=new ai(e._pt,t,i,0,1,o?eE:JM);return e._pt=a,a.b=r,a.e=s,e._props.push(i),a},qv={deg:1,rad:1,turn:1},zL={grid:1,flex:1},Us=function n(e,t,i,r){var s=parseFloat(i)||0,o=(i+"").trim().substr((s+"").length)||"px",a=oo.style,l=wL.test(t),u=e.tagName.toLowerCase()==="svg",c=(u?"client":"offset")+(l?"Width":"Height"),f=100,d=r==="px",p=r==="%",g,_,m,h;if(r===o||!s||qv[r]||qv[o])return s;if(o!=="px"&&!d&&(s=n(e,t,i,"px")),h=e.getCTM&&sE(e),(p||o==="%")&&(Yr[t]||~t.indexOf("adius")))return g=h?e.getBBox()[l?"width":"height"]:e[c],Wt(p?s/g*f:s/100*g);if(a[l?"width":"height"]=f+(d?o:r),_=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!u?e:e.parentNode,h&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===fs||!_.appendChild)&&(_=fs.body),m=_._gsap,m&&p&&m.width&&l&&m.time===vi.time&&!m.uncache)return Wt(s/m.width*f);if(p&&(t==="height"||t==="width")){var v=e.style[t];e.style[t]=f+r,g=e[c],v?e.style[t]=v:Ns(e,t)}else(p||o==="%")&&!zL[Mi(_,"display")]&&(a.position=Mi(e,"position")),_===e&&(a.position="static"),_.appendChild(oo),g=oo[c],_.removeChild(oo),a.position="absolute";return l&&p&&(m=po(_),m.time=vi.time,m.width=_[c]),Wt(d?g*s/f:g&&s?f/g*s:0)},Lr=function(e,t,i,r){var s;return z_||dm(),t in mr&&t!=="transform"&&(t=mr[t],~t.indexOf(",")&&(t=t.split(",")[0])),Yr[t]&&t!=="transform"?(s=Cu(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Zf(Mi(e,li))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Kf[t]&&Kf[t](e,t,i)||Mi(e,t)||EM(e,t)||(t==="opacity"?1:0))),i&&!~(s+"").trim().indexOf(" ")?Us(e,t,s,i)+i:s},BL=function(e,t,i,r){if(!i||i==="none"){var s=Ka(t,e,1),o=s&&Mi(e,s,1);o&&o!==i?(t=s,i=o):t==="borderColor"&&(i=Mi(e,"borderTopColor"))}var a=new ai(this._pt,e.style,t,0,1,KM),l=0,u=0,c,f,d,p,g,_,m,h,v,x,y,w;if(a.b=i,a.e=r,i+="",r+="",r.substring(0,6)==="var(--"&&(r=Mi(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(_=e.style[t],e.style[t]=r,r=Mi(e,t)||r,_?e.style[t]=_:Ns(e,t)),c=[i,r],GM(c),i=c[0],r=c[1],d=i.match(ga)||[],w=r.match(ga)||[],w.length){for(;f=ga.exec(r);)m=f[0],v=r.substring(l,f.index),g?g=(g+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(g=1),m!==(_=d[u++]||"")&&(p=parseFloat(_)||0,y=_.substr((p+"").length),m.charAt(1)==="="&&(m=Ra(p,m)+y),h=parseFloat(m),x=m.substr((h+"").length),l=ga.lastIndex-x.length,x||(x=x||Ti.units[t]||y,l===r.length&&(r+=x,a.e+=x)),y!==x&&(p=Us(e,t,_,x)||0),a._pt={_next:a._pt,p:v||u===1?v:",",s:p,c:h-p,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?eE:JM;return vM.test(r)&&(a.e=0),this._pt=a,a},$v={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},HL=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=$v[i]||i,t[1]=$v[r]||r,t.join(" ")},GL=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,s=t.u,o=i._gsap,a,l,u;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),u=s.length;--u>-1;)a=s[u],Yr[a]&&(l=1,a=a==="transformOrigin"?li:kt),Ns(i,a);l&&(Ns(i,kt),o&&(o.svg&&i.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Cu(i,1),o.uncache=1,tE(r)))}},Kf={clearProps:function(e,t,i,r,s){if(s.data!=="isFromStart"){var o=e._pt=new ai(e._pt,t,i,0,0,GL);return o.u=r,o.pr=-10,o.tween=s,e._props.push(i),1}}},Au=[1,0,0,1,0,0],oE={},aE=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Kv=function(e){var t=Mi(e,kt);return aE(t)?Au:t.substr(7).match(gM).map(Wt)},G_=function(e,t){var i=e._gsap||po(e),r=e.style,s=Kv(e),o,a,l,u;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Au:s):(s===Au&&!e.offsetParent&&e!==ba&&!i.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(u=1,a=e.nextElementSibling,ba.appendChild(e)),s=Kv(e),l?r.display=l:Ns(e,"display"),u&&(a?o.insertBefore(e,a):o?o.appendChild(e):ba.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},hm=function(e,t,i,r,s,o){var a=e._gsap,l=s||G_(e,!0),u=a.xOrigin||0,c=a.yOrigin||0,f=a.xOffset||0,d=a.yOffset||0,p=l[0],g=l[1],_=l[2],m=l[3],h=l[4],v=l[5],x=t.split(" "),y=parseFloat(x[0])||0,w=parseFloat(x[1])||0,T,S,P,M;i?l!==Au&&(S=p*m-g*_)&&(P=y*(m/S)+w*(-_/S)+(_*v-m*h)/S,M=y*(-g/S)+w*(p/S)-(p*v-g*h)/S,y=P,w=M):(T=rE(e),y=T.x+(~x[0].indexOf("%")?y/100*T.width:y),w=T.y+(~(x[1]||x[0]).indexOf("%")?w/100*T.height:w)),r||r!==!1&&a.smooth?(h=y-u,v=w-c,a.xOffset=f+(h*p+v*_)-h,a.yOffset=d+(h*g+v*m)-v):a.xOffset=a.yOffset=0,a.xOrigin=y,a.yOrigin=w,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!i,e.style[li]="0px 0px",o&&(ds(o,a,"xOrigin",u,y),ds(o,a,"yOrigin",c,w),ds(o,a,"xOffset",f,a.xOffset),ds(o,a,"yOffset",d,a.yOffset)),e.setAttribute("data-svg-origin",y+" "+w)},Cu=function(e,t){var i=e._gsap||new WM(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,s=i.scaleX<0,o="px",a="deg",l=getComputedStyle(e),u=Mi(e,li)||"0",c,f,d,p,g,_,m,h,v,x,y,w,T,S,P,M,E,k,U,Q,L,F,G,W,N,O,R,K,J,q,Z,se;return c=f=d=_=m=h=v=x=y=0,p=g=1,i.svg=!!(e.getCTM&&sE(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[kt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[kt]!=="none"?l[kt]:"")),r.scale=r.rotate=r.translate="none"),S=G_(e,i.svg),i.svg&&(i.uncache?(N=e.getBBox(),u=i.xOrigin-N.x+"px "+(i.yOrigin-N.y)+"px",W=""):W=!t&&e.getAttribute("data-svg-origin"),hm(e,W||u,!!W||i.originIsAbsolute,i.smooth!==!1,S)),w=i.xOrigin||0,T=i.yOrigin||0,S!==Au&&(k=S[0],U=S[1],Q=S[2],L=S[3],c=F=S[4],f=G=S[5],S.length===6?(p=Math.sqrt(k*k+U*U),g=Math.sqrt(L*L+Q*Q),_=k||U?Zo(U,k)*Qs:0,v=Q||L?Zo(Q,L)*Qs+_:0,v&&(g*=Math.abs(Math.cos(v*Pa))),i.svg&&(c-=w-(w*k+T*Q),f-=T-(w*U+T*L))):(se=S[6],q=S[7],R=S[8],K=S[9],J=S[10],Z=S[11],c=S[12],f=S[13],d=S[14],P=Zo(se,J),m=P*Qs,P&&(M=Math.cos(-P),E=Math.sin(-P),W=F*M+R*E,N=G*M+K*E,O=se*M+J*E,R=F*-E+R*M,K=G*-E+K*M,J=se*-E+J*M,Z=q*-E+Z*M,F=W,G=N,se=O),P=Zo(-Q,J),h=P*Qs,P&&(M=Math.cos(-P),E=Math.sin(-P),W=k*M-R*E,N=U*M-K*E,O=Q*M-J*E,Z=L*E+Z*M,k=W,U=N,Q=O),P=Zo(U,k),_=P*Qs,P&&(M=Math.cos(P),E=Math.sin(P),W=k*M+U*E,N=F*M+G*E,U=U*M-k*E,G=G*M-F*E,k=W,F=N),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,h=180-h),p=Wt(Math.sqrt(k*k+U*U+Q*Q)),g=Wt(Math.sqrt(G*G+se*se)),P=Zo(F,G),v=Math.abs(P)>2e-4?P*Qs:0,y=Z?1/(Z<0?-Z:Z):0),i.svg&&(W=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!aE(Mi(e,kt)),W&&e.setAttribute("transform",W))),Math.abs(v)>90&&Math.abs(v)<270&&(s?(p*=-1,v+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,v+=v<=0?180:-180)),t=t||i.uncache,i.x=c-((i.xPercent=c&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-c)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+o,i.y=f-((i.yPercent=f&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+o,i.z=d+o,i.scaleX=Wt(p),i.scaleY=Wt(g),i.rotation=Wt(_)+a,i.rotationX=Wt(m)+a,i.rotationY=Wt(h)+a,i.skewX=v+a,i.skewY=x+a,i.transformPerspective=y+o,(i.zOrigin=parseFloat(u.split(" ")[2])||!t&&i.zOrigin||0)&&(r[li]=Zf(u)),i.xOffset=i.yOffset=0,i.force3D=Ti.force3D,i.renderTransform=i.svg?WL:iE?lE:VL,i.uncache=0,i},Zf=function(e){return(e=e.split(" "))[0]+" "+e[1]},Vh=function(e,t,i){var r=Rn(t);return Wt(parseFloat(t)+parseFloat(Us(e,"x",i+"px",r)))+r},VL=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,lE(e,t)},js="0deg",vl="0px",Ys=") ",lE=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.z,u=i.rotation,c=i.rotationY,f=i.rotationX,d=i.skewX,p=i.skewY,g=i.scaleX,_=i.scaleY,m=i.transformPerspective,h=i.force3D,v=i.target,x=i.zOrigin,y="",w=h==="auto"&&e&&e!==1||h===!0;if(x&&(f!==js||c!==js)){var T=parseFloat(c)*Pa,S=Math.sin(T),P=Math.cos(T),M;T=parseFloat(f)*Pa,M=Math.cos(T),o=Vh(v,o,S*M*-x),a=Vh(v,a,-Math.sin(T)*-x),l=Vh(v,l,P*M*-x+x)}m!==vl&&(y+="perspective("+m+Ys),(r||s)&&(y+="translate("+r+"%, "+s+"%) "),(w||o!==vl||a!==vl||l!==vl)&&(y+=l!==vl||w?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Ys),u!==js&&(y+="rotate("+u+Ys),c!==js&&(y+="rotateY("+c+Ys),f!==js&&(y+="rotateX("+f+Ys),(d!==js||p!==js)&&(y+="skew("+d+", "+p+Ys),(g!==1||_!==1)&&(y+="scale("+g+", "+_+Ys),v.style[kt]=y||"translate(0, 0)"},WL=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.rotation,u=i.skewX,c=i.skewY,f=i.scaleX,d=i.scaleY,p=i.target,g=i.xOrigin,_=i.yOrigin,m=i.xOffset,h=i.yOffset,v=i.forceCSS,x=parseFloat(o),y=parseFloat(a),w,T,S,P,M;l=parseFloat(l),u=parseFloat(u),c=parseFloat(c),c&&(c=parseFloat(c),u+=c,l+=c),l||u?(l*=Pa,u*=Pa,w=Math.cos(l)*f,T=Math.sin(l)*f,S=Math.sin(l-u)*-d,P=Math.cos(l-u)*d,u&&(c*=Pa,M=Math.tan(u-c),M=Math.sqrt(1+M*M),S*=M,P*=M,c&&(M=Math.tan(c),M=Math.sqrt(1+M*M),w*=M,T*=M)),w=Wt(w),T=Wt(T),S=Wt(S),P=Wt(P)):(w=f,P=d,T=S=0),(x&&!~(o+"").indexOf("px")||y&&!~(a+"").indexOf("px"))&&(x=Us(p,"x",o,"px"),y=Us(p,"y",a,"px")),(g||_||m||h)&&(x=Wt(x+g-(g*w+_*S)+m),y=Wt(y+_-(g*T+_*P)+h)),(r||s)&&(M=p.getBBox(),x=Wt(x+r/100*M.width),y=Wt(y+s/100*M.height)),M="matrix("+w+","+T+","+S+","+P+","+x+","+y+")",p.setAttribute("transform",M),v&&(p.style[kt]=M)},XL=function(e,t,i,r,s){var o=360,a=dn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Qs:1),u=l-r,c=r+u+"deg",f,d;return a&&(f=s.split("_")[1],f==="short"&&(u%=o,u!==u%(o/2)&&(u+=u<0?o:-o)),f==="cw"&&u<0?u=(u+o*Wv)%o-~~(u/o)*o:f==="ccw"&&u>0&&(u=(u-o*Wv)%o-~~(u/o)*o)),e._pt=d=new ai(e._pt,t,i,r,u,CL),d.e=c,d.u="deg",e._props.push(i),d},Zv=function(e,t){for(var i in t)e[i]=t[i];return e},jL=function(e,t,i){var r=Zv({},i._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=i.style,a,l,u,c,f,d,p,g;r.svg?(u=i.getAttribute("transform"),i.setAttribute("transform",""),o[kt]=t,a=Cu(i,1),Ns(i,kt),i.setAttribute("transform",u)):(u=getComputedStyle(i)[kt],o[kt]=t,a=Cu(i,1),o[kt]=u);for(l in Yr)u=r[l],c=a[l],u!==c&&s.indexOf(l)<0&&(p=Rn(u),g=Rn(c),f=p!==g?Us(i,l,u,g):parseFloat(u),d=parseFloat(c),e._pt=new ai(e._pt,a,l,f,d-f,cm),e._pt.u=g||0,e._props.push(l));Zv(a,r)};oi("padding,margin,Width,Radius",function(n,e){var t="Top",i="Right",r="Bottom",s="Left",o=(e<3?[t,i,r,s]:[t+s,t+i,r+i,r+s]).map(function(a){return e<2?n+a:"border"+a+n});Kf[e>1?"border"+n:n]=function(a,l,u,c,f){var d,p;if(arguments.length<4)return d=o.map(function(g){return Lr(a,g,u)}),p=d.join(" "),p.split(d[0]).length===5?d[0]:p;d=(c+"").split(" "),p={},o.forEach(function(g,_){return p[g]=d[_]=d[_]||d[(_-1)/2|0]}),a.init(l,p,f)}});var uE={name:"css",register:dm,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,s){var o=this._props,a=e.style,l=i.vars.startAt,u,c,f,d,p,g,_,m,h,v,x,y,w,T,S,P,M;z_||dm(),this.styles=this.styles||nE(e),P=this.styles.props,this.tween=i;for(_ in t)if(_!=="autoRound"&&(c=t[_],!(_i[_]&&XM(_,t,i,r,e,s)))){if(p=typeof c,g=Kf[_],p==="function"&&(c=c.call(i,r,e,s),p=typeof c),p==="string"&&~c.indexOf("random(")&&(c=Eu(c)),g)g(this,e,_,c,i)&&(S=1);else if(_.substr(0,2)==="--")u=(getComputedStyle(e).getPropertyValue(_)+"").trim(),c+="",Cs.lastIndex=0,Cs.test(u)||(m=Rn(u),h=Rn(c),h?m!==h&&(u=Us(e,_,u,h)+h):m&&(c+=m)),this.add(a,"setProperty",u,c,r,s,0,0,_),o.push(_),P.push(_,0,a[_]);else if(p!=="undefined"){if(l&&_ in l?(u=typeof l[_]=="function"?l[_].call(i,r,e,s):l[_],dn(u)&&~u.indexOf("random(")&&(u=Eu(u)),Rn(u+"")||u==="auto"||(u+=Ti.units[_]||Rn(Lr(e,_))||""),(u+"").charAt(1)==="="&&(u=Lr(e,_))):u=Lr(e,_),d=parseFloat(u),v=p==="string"&&c.charAt(1)==="="&&c.substr(0,2),v&&(c=c.substr(2)),f=parseFloat(c),_ in mr&&(_==="autoAlpha"&&(d===1&&Lr(e,"visibility")==="hidden"&&f&&(d=0),P.push("visibility",0,a.visibility),ds(this,a,"visibility",d?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=mr[_],~_.indexOf(",")&&(_=_.split(",")[0]))),x=_ in Yr,x){if(this.styles.save(_),M=c,p==="string"&&c.substring(0,6)==="var(--"){if(c=Mi(e,c.substring(4,c.indexOf(")"))),c.substring(0,5)==="calc("){var E=e.style.perspective;e.style.perspective=c,c=Mi(e,"perspective"),E?e.style.perspective=E:Ns(e,"perspective")}f=parseFloat(c)}if(y||(w=e._gsap,w.renderTransform&&!t.parseTransform||Cu(e,t.parseTransform),T=t.smoothOrigin!==!1&&w.smooth,y=this._pt=new ai(this._pt,a,kt,0,1,w.renderTransform,w,0,-1),y.dep=1),_==="scale")this._pt=new ai(this._pt,w,"scaleY",w.scaleY,(v?Ra(w.scaleY,v+f):f)-w.scaleY||0,cm),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){P.push(li,0,a[li]),c=HL(c),w.svg?hm(e,c,0,T,0,this):(h=parseFloat(c.split(" ")[2])||0,h!==w.zOrigin&&ds(this,w,"zOrigin",w.zOrigin,h),ds(this,a,_,Zf(u),Zf(c)));continue}else if(_==="svgOrigin"){hm(e,c,1,T,0,this);continue}else if(_ in oE){XL(this,w,_,d,v?Ra(d,v+c):c);continue}else if(_==="smoothOrigin"){ds(this,w,"smooth",w.smooth,c);continue}else if(_==="force3D"){w[_]=c;continue}else if(_==="transform"){jL(this,c,e);continue}}else _ in a||(_=Ka(_)||_);if(x||(f||f===0)&&(d||d===0)&&!AL.test(c)&&_ in a)m=(u+"").substr((d+"").length),f||(f=0),h=Rn(c)||(_ in Ti.units?Ti.units[_]:m),m!==h&&(d=Us(e,_,u,h)),this._pt=new ai(this._pt,x?w:a,_,d,(v?Ra(d,v+f):f)-d,!x&&(h==="px"||_==="zIndex")&&t.autoRound!==!1?PL:cm),this._pt.u=h||0,x&&M!==c?(this._pt.b=u,this._pt.e=M,this._pt.r=bL):m!==h&&h!=="%"&&(this._pt.b=u,this._pt.r=RL);else if(_ in a)BL.call(this,e,_,u,v?v+c:c);else if(_ in e)this.add(e,_,u||e[_],v?v+c:c,r,s);else if(_!=="parseTransform"){b_(_,c);continue}x||(_ in a?P.push(_,0,a[_]):typeof e[_]=="function"?P.push(_,2,e[_]()):P.push(_,1,u||e[_])),o.push(_)}}S&&ZM(this)},render:function(e,t){if(t.tween._time||!B_())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Lr,aliases:mr,getSetter:function(e,t,i){var r=mr[t];return r&&r.indexOf(",")<0&&(t=r),t in Yr&&t!==li&&(e._gsap.x||Lr(e,"x"))?i&&Vv===i?t==="scale"?UL:NL:(Vv=i||{})&&(t==="scale"?IL:OL):e.style&&!A_(e.style[t])?LL:~t.indexOf("-")?DL:F_(e,t)},core:{_removeProperty:Ns,_getMatrix:G_}};ui.utils.checkPrefix=Ka;ui.core.getStyleSaver=nE;(function(n,e,t,i){var r=oi(n+","+e+","+t,function(s){Yr[s]=1});oi(e,function(s){Ti.units[s]="deg",oE[s]=1}),mr[r[13]]=n+","+e,oi(i,function(s){var o=s.split(":");mr[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");oi("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){Ti.units[n]="px"});ui.registerPlugin(uE);var sf=ui.registerPlugin(uE)||ui;sf.core.Tween;function YL(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}function qL(n,e,t){return e&&YL(n.prototype,e),n}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var _n,of,xi,hs,ps,La,cE,Js,Da,fE,Fr,Zi,dE,hE=function(){return _n||typeof window<"u"&&(_n=window.gsap)&&_n.registerPlugin&&_n},pE=1,xa=[],it=[],xr=[],jl=Date.now,pm=function(e,t){return t},$L=function(){var e=Da.core,t=e.bridge||{},i=e._scrollers,r=e._proxies;i.push.apply(i,it),r.push.apply(r,xr),it=i,xr=r,pm=function(o,a){return t[o](a)}},Rs=function(e,t){return~xr.indexOf(e)&&xr[xr.indexOf(e)+1][t]},Yl=function(e){return!!~fE.indexOf(e)},In=function(e,t,i,r,s){return e.addEventListener(t,i,{passive:r!==!1,capture:!!s})},Un=function(e,t,i,r){return e.removeEventListener(t,i,!!r)},Pc="scrollLeft",Lc="scrollTop",mm=function(){return Fr&&Fr.isPressed||it.cache++},Qf=function(e,t){var i=function r(s){if(s||s===0){pE&&(xi.history.scrollRestoration="manual");var o=Fr&&Fr.isPressed;s=r.v=Math.round(s)||(Fr&&Fr.iOS?1:0),e(s),r.cacheID=it.cache,o&&pm("ss",s)}else(t||it.cache!==r.cacheID||pm("ref"))&&(r.cacheID=it.cache,r.v=e());return r.v+r.offset};return i.offset=0,e&&i},Gn={s:Pc,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Qf(function(n){return arguments.length?xi.scrollTo(n,tn.sc()):xi.pageXOffset||hs[Pc]||ps[Pc]||La[Pc]||0})},tn={s:Lc,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Gn,sc:Qf(function(n){return arguments.length?xi.scrollTo(Gn.sc(),n):xi.pageYOffset||hs[Lc]||ps[Lc]||La[Lc]||0})},qn=function(e,t){return(t&&t._ctx&&t._ctx.selector||_n.utils.toArray)(e)[0]||(typeof e=="string"&&_n.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},KL=function(e,t){for(var i=t.length;i--;)if(t[i]===e||t[i].contains(e))return!0;return!1},Is=function(e,t){var i=t.s,r=t.sc;Yl(e)&&(e=hs.scrollingElement||ps);var s=it.indexOf(e),o=r===tn.sc?1:2;!~s&&(s=it.push(e)-1),it[s+o]||In(e,"scroll",mm);var a=it[s+o],l=a||(it[s+o]=Qf(Rs(e,i),!0)||(Yl(e)?r:Qf(function(u){return arguments.length?e[i]=u:e[i]})));return l.target=e,a||(l.smooth=_n.getProperty(e,"scrollBehavior")==="smooth"),l},_m=function(e,t,i){var r=e,s=e,o=jl(),a=o,l=t||50,u=Math.max(500,l*3),c=function(g,_){var m=jl();_||m-o>l?(s=r,r=g,a=o,o=m):i?r+=g:r=s+(g-s)/(m-a)*(o-a)},f=function(){s=r=i?0:r,a=o=0},d=function(g){var _=a,m=s,h=jl();return(g||g===0)&&g!==r&&c(g),o===a||h-a>u?0:(r+(i?m:-m))/((i?h:o)-_)*1e3};return{update:c,reset:f,getVelocity:d}},xl=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Qv=function(e){var t=Math.max.apply(Math,e),i=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(i)?t:i},mE=function(){Da=_n.core.globals().ScrollTrigger,Da&&Da.core&&$L()},_E=function(e){return _n=e||hE(),!of&&_n&&typeof document<"u"&&document.body&&(xi=window,hs=document,ps=hs.documentElement,La=hs.body,fE=[xi,hs,ps,La],_n.utils.clamp,dE=_n.core.context||function(){},Js="onpointerenter"in La?"pointer":"mouse",cE=jt.isTouch=xi.matchMedia&&xi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in xi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Zi=jt.eventTypes=("ontouchstart"in ps?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in ps?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return pE=0},500),of=1),Da||mE(),of};Gn.op=tn;it.cache=0;var jt=function(){function n(t){this.init(t)}var e=n.prototype;return e.init=function(i){of||_E(_n)||console.warn("Please gsap.registerPlugin(Observer)"),Da||mE();var r=i.tolerance,s=i.dragMinimum,o=i.type,a=i.target,l=i.lineHeight,u=i.debounce,c=i.preventDefault,f=i.onStop,d=i.onStopDelay,p=i.ignore,g=i.wheelSpeed,_=i.event,m=i.onDragStart,h=i.onDragEnd,v=i.onDrag,x=i.onPress,y=i.onRelease,w=i.onRight,T=i.onLeft,S=i.onUp,P=i.onDown,M=i.onChangeX,E=i.onChangeY,k=i.onChange,U=i.onToggleX,Q=i.onToggleY,L=i.onHover,F=i.onHoverEnd,G=i.onMove,W=i.ignoreCheck,N=i.isNormalizer,O=i.onGestureStart,R=i.onGestureEnd,K=i.onWheel,J=i.onEnable,q=i.onDisable,Z=i.onClick,se=i.scrollSpeed,me=i.capture,de=i.allowClicks,De=i.lockAxis,Ne=i.onLockAxis;this.target=a=qn(a)||ps,this.vars=i,p&&(p=_n.utils.toArray(p)),r=r||1e-9,s=s||0,g=g||1,se=se||1,o=o||"wheel,touch,pointer",u=u!==!1,l||(l=parseFloat(xi.getComputedStyle(La).lineHeight)||22);var Oe,We,H,Xe,ve,Ue,xe,V=this,Be=0,b=0,A=i.passive||!c&&i.passive!==!1,z=Is(a,Gn),ne=Is(a,tn),te=z(),ie=ne(),ge=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Zi[0]==="pointerdown",he=Yl(a),fe=a.ownerDocument||hs,Re=[0,0,0],Ve=[0,0,0],ee=0,lt=function(){return ee=jl()},Pe=function(Me,Le){return(V.event=Me)&&p&&KL(Me.target,p)||Le&&ge&&Me.pointerType!=="touch"||W&&W(Me,Le)},je=function(){V._vx.reset(),V._vy.reset(),We.pause(),f&&f(V)},Ae=function(){var Me=V.deltaX=Qv(Re),Le=V.deltaY=Qv(Ve),oe=Math.abs(Me)>=r,ze=Math.abs(Le)>=r;k&&(oe||ze)&&k(V,Me,Le,Re,Ve),oe&&(w&&V.deltaX>0&&w(V),T&&V.deltaX<0&&T(V),M&&M(V),U&&V.deltaX<0!=Be<0&&U(V),Be=V.deltaX,Re[0]=Re[1]=Re[2]=0),ze&&(P&&V.deltaY>0&&P(V),S&&V.deltaY<0&&S(V),E&&E(V),Q&&V.deltaY<0!=b<0&&Q(V),b=V.deltaY,Ve[0]=Ve[1]=Ve[2]=0),(Xe||H)&&(G&&G(V),H&&(m&&H===1&&m(V),v&&v(V),H=0),Xe=!1),Ue&&!(Ue=!1)&&Ne&&Ne(V),ve&&(K(V),ve=!1),Oe=0},ye=function(Me,Le,oe){Re[oe]+=Me,Ve[oe]+=Le,V._vx.update(Me),V._vy.update(Le),u?Oe||(Oe=requestAnimationFrame(Ae)):Ae()},Ye=function(Me,Le){De&&!xe&&(V.axis=xe=Math.abs(Me)>Math.abs(Le)?"x":"y",Ue=!0),xe!=="y"&&(Re[2]+=Me,V._vx.update(Me,!0)),xe!=="x"&&(Ve[2]+=Le,V._vy.update(Le,!0)),u?Oe||(Oe=requestAnimationFrame(Ae)):Ae()},Je=function(Me){if(!Pe(Me,1)){Me=xl(Me,c);var Le=Me.clientX,oe=Me.clientY,ze=Le-V.x,Fe=oe-V.y,$e=V.isDragging;V.x=Le,V.y=oe,($e||(ze||Fe)&&(Math.abs(V.startX-Le)>=s||Math.abs(V.startY-oe)>=s))&&(H||(H=$e?2:1),$e||(V.isDragging=!0),Ye(ze,Fe))}},ht=V.onPress=function(Ce){Pe(Ce,1)||Ce&&Ce.button||(V.axis=xe=null,We.pause(),V.isPressed=!0,Ce=xl(Ce),Be=b=0,V.startX=V.x=Ce.clientX,V.startY=V.y=Ce.clientY,V._vx.reset(),V._vy.reset(),In(N?a:fe,Zi[1],Je,A,!0),V.deltaX=V.deltaY=0,x&&x(V))},_e=V.onRelease=function(Ce){if(!Pe(Ce,1)){Un(N?a:fe,Zi[1],Je,!0);var Me=!isNaN(V.y-V.startY),Le=V.isDragging,oe=Le&&(Math.abs(V.x-V.startX)>3||Math.abs(V.y-V.startY)>3),ze=xl(Ce);!oe&&Me&&(V._vx.reset(),V._vy.reset(),c&&de&&_n.delayedCall(.08,function(){if(jl()-ee>300&&!Ce.defaultPrevented){if(Ce.target.click)Ce.target.click();else if(fe.createEvent){var Fe=fe.createEvent("MouseEvents");Fe.initMouseEvent("click",!0,!0,xi,1,ze.screenX,ze.screenY,ze.clientX,ze.clientY,!1,!1,!1,!1,0,null),Ce.target.dispatchEvent(Fe)}}})),V.isDragging=V.isGesturing=V.isPressed=!1,f&&Le&&!N&&We.restart(!0),H&&Ae(),h&&Le&&h(V),y&&y(V,oe)}},ae=function(Me){return Me.touches&&Me.touches.length>1&&(V.isGesturing=!0)&&O(Me,V.isDragging)},D=function(){return(V.isGesturing=!1)||R(V)},le=function(Me){if(!Pe(Me)){var Le=z(),oe=ne();ye((Le-te)*se,(oe-ie)*se,1),te=Le,ie=oe,f&&We.restart(!0)}},ue=function(Me){if(!Pe(Me)){Me=xl(Me,c),K&&(ve=!0);var Le=(Me.deltaMode===1?l:Me.deltaMode===2?xi.innerHeight:1)*g;ye(Me.deltaX*Le,Me.deltaY*Le,0),f&&!N&&We.restart(!0)}},ke=function(Me){if(!Pe(Me)){var Le=Me.clientX,oe=Me.clientY,ze=Le-V.x,Fe=oe-V.y;V.x=Le,V.y=oe,Xe=!0,f&&We.restart(!0),(ze||Fe)&&Ye(ze,Fe)}},Ie=function(Me){V.event=Me,L(V)},ot=function(Me){V.event=Me,F(V)},ft=function(Me){return Pe(Me)||xl(Me,c)&&Z(V)};We=V._dc=_n.delayedCall(d||.25,je).pause(),V.deltaX=V.deltaY=0,V._vx=_m(0,50,!0),V._vy=_m(0,50,!0),V.scrollX=z,V.scrollY=ne,V.isDragging=V.isGesturing=V.isPressed=!1,dE(this),V.enable=function(Ce){return V.isEnabled||(In(he?fe:a,"scroll",mm),o.indexOf("scroll")>=0&&In(he?fe:a,"scroll",le,A,me),o.indexOf("wheel")>=0&&In(a,"wheel",ue,A,me),(o.indexOf("touch")>=0&&cE||o.indexOf("pointer")>=0)&&(In(a,Zi[0],ht,A,me),In(fe,Zi[2],_e),In(fe,Zi[3],_e),de&&In(a,"click",lt,!0,!0),Z&&In(a,"click",ft),O&&In(fe,"gesturestart",ae),R&&In(fe,"gestureend",D),L&&In(a,Js+"enter",Ie),F&&In(a,Js+"leave",ot),G&&In(a,Js+"move",ke)),V.isEnabled=!0,V.isDragging=V.isGesturing=V.isPressed=Xe=H=!1,V._vx.reset(),V._vy.reset(),te=z(),ie=ne(),Ce&&Ce.type&&ht(Ce),J&&J(V)),V},V.disable=function(){V.isEnabled&&(xa.filter(function(Ce){return Ce!==V&&Yl(Ce.target)}).length||Un(he?fe:a,"scroll",mm),V.isPressed&&(V._vx.reset(),V._vy.reset(),Un(N?a:fe,Zi[1],Je,!0)),Un(he?fe:a,"scroll",le,me),Un(a,"wheel",ue,me),Un(a,Zi[0],ht,me),Un(fe,Zi[2],_e),Un(fe,Zi[3],_e),Un(a,"click",lt,!0),Un(a,"click",ft),Un(fe,"gesturestart",ae),Un(fe,"gestureend",D),Un(a,Js+"enter",Ie),Un(a,Js+"leave",ot),Un(a,Js+"move",ke),V.isEnabled=V.isPressed=V.isDragging=!1,q&&q(V))},V.kill=V.revert=function(){V.disable();var Ce=xa.indexOf(V);Ce>=0&&xa.splice(Ce,1),Fr===V&&(Fr=0)},xa.push(V),N&&Yl(a)&&(Fr=V),V.enable(_)},qL(n,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),n}();jt.version="3.15.0";jt.create=function(n){return new jt(n)};jt.register=_E;jt.getAll=function(){return xa.slice()};jt.getById=function(n){return xa.filter(function(e){return e.vars.id===n})[0]};hE()&&_n.registerPlugin(jt);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Ee,ta,tt,gt,gi,pt,V_,Jf,Ru,ql,Rl,Dc,wn,Ad,gm,zn,Jv,ex,na,gE,Wh,vE,Fn,vm,xE,yE,ts,xm,W_,Na,X_,$l,ym,Xh,Nc=1,An=Date.now,jh=An(),Wi=0,bl=0,tx=function(e,t,i){var r=mi(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return i["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},nx=function(e,t){return t&&(!mi(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},ZL=function n(){return bl&&requestAnimationFrame(n)},ix=function(){return Ad=1},rx=function(){return Ad=0},cr=function(e){return e},Pl=function(e){return Math.round(e*1e5)/1e5||0},SE=function(){return typeof window<"u"},ME=function(){return Ee||SE()&&(Ee=window.gsap)&&Ee.registerPlugin&&Ee},Ro=function(e){return!!~V_.indexOf(e)},EE=function(e){return(e==="Height"?X_:tt["inner"+e])||gi["client"+e]||pt["client"+e]},TE=function(e){return Rs(e,"getBoundingClientRect")||(Ro(e)?function(){return ff.width=tt.innerWidth,ff.height=X_,ff}:function(){return Dr(e)})},QL=function(e,t,i){var r=i.d,s=i.d2,o=i.a;return(o=Rs(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(t?EE(s):e["client"+s])||0}},JL=function(e,t){return!t||~xr.indexOf(e)?TE(e):function(){return ff}},_r=function(e,t){var i=t.s,r=t.d2,s=t.d,o=t.a;return Math.max(0,(i="scroll"+r)&&(o=Rs(e,i))?o()-TE(e)()[s]:Ro(e)?(gi[i]||pt[i])-EE(r):e[i]-e["offset"+r])},Uc=function(e,t){for(var i=0;i<na.length;i+=3)(!t||~t.indexOf(na[i+1]))&&e(na[i],na[i+1],na[i+2])},mi=function(e){return typeof e=="string"},bn=function(e){return typeof e=="function"},Ll=function(e){return typeof e=="number"},eo=function(e){return typeof e=="object"},yl=function(e,t,i){return e&&e.progress(t?0:1)&&i&&e.pause()},Qo=function(e,t,i){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,i)}):t(e,i);r&&r.totalTime&&(e.callbackAnimation=r)}},Jo=Math.abs,wE="left",AE="top",j_="right",Y_="bottom",vo="width",xo="height",Kl="Right",Zl="Left",Ql="Top",Jl="Bottom",qt="padding",Fi="margin",Za="Width",q_="Height",Jt="px",ki=function(e){return tt.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},eD=function(e){var t=ki(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},sx=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},Dr=function(e,t){var i=t&&ki(e)[gm]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ee.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return i&&i.progress(0).kill(),r},ed=function(e,t){var i=t.d2;return e["offset"+i]||e["client"+i]||0},CE=function(e){var t=[],i=e.labels,r=e.duration(),s;for(s in i)t.push(i[s]/r);return t},tD=function(e){return function(t){return Ee.utils.snap(CE(e),t)}},$_=function(e){var t=Ee.utils.snap(e),i=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return i?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return t(r);if(s>0){for(r-=o,a=0;a<i.length;a++)if(i[a]>=r)return i[a];return i[a-1]}else for(a=i.length,r+=o;a--;)if(i[a]<=r)return i[a];return i[0]}:function(r,s,o){o===void 0&&(o=.001);var a=t(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:t(s<0?r-e:r+e)}},nD=function(e){return function(t,i){return $_(CE(e))(t,i.direction)}},Ic=function(e,t,i,r){return i.split(",").forEach(function(s){return e(t,s,r)})},un=function(e,t,i,r,s){return e.addEventListener(t,i,{passive:!r,capture:!!s})},ln=function(e,t,i,r){return e.removeEventListener(t,i,!!r)},Oc=function(e,t,i){i=i&&i.wheelHandler,i&&(e(t,"wheel",i),e(t,"touchmove",i))},ox={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Fc={toggleActions:"play",anticipatePin:0},td={top:0,left:0,center:.5,bottom:1,right:1},af=function(e,t){if(mi(e)){var i=e.indexOf("="),r=~i?+(e.charAt(i-1)+1)*parseFloat(e.substr(i+1)):0;~i&&(e.indexOf("%")>i&&(r*=t/100),e=e.substr(0,i-1)),e=r+(e in td?td[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},kc=function(e,t,i,r,s,o,a,l){var u=s.startColor,c=s.endColor,f=s.fontSize,d=s.indent,p=s.fontWeight,g=gt.createElement("div"),_=Ro(i)||Rs(i,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,h=_?pt:i.tagName==="IFRAME"?i.contentDocument.body:i,v=e.indexOf("start")!==-1,x=v?u:c,y="border-color:"+x+";font-size:"+f+";color:"+x+";font-weight:"+p+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return y+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(y+=(r===tn?j_:Y_)+":"+(o+parseFloat(d))+"px;"),a&&(y+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=v,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=y,g.innerText=t||t===0?e+"-"+t:e,h.children[0]?h.insertBefore(g,h.children[0]):h.appendChild(g),g._offset=g["offset"+r.op.d2],lf(g,0,r,v),g},lf=function(e,t,i,r){var s={display:"block"},o=i[r?"os2":"p2"],a=i[r?"p2":"os2"];e._isFlipped=r,s[i.a+"Percent"]=r?-100:0,s[i.a]=r?"1px":0,s["border"+o+Za]=1,s["border"+a+Za]=0,s[i.p]=t+"px",Ee.set(e,s)},Qe=[],Sm={},bu,ax=function(){return An()-Wi>34&&(bu||(bu=requestAnimationFrame(Br)))},ea=function(){(!Fn||!Fn.isPressed||Fn.startX>pt.clientWidth)&&(it.cache++,Fn?bu||(bu=requestAnimationFrame(Br)):Br(),Wi||Po("scrollStart"),Wi=An())},Yh=function(){yE=tt.innerWidth,xE=tt.innerHeight},Dl=function(e){it.cache++,(e===!0||!wn&&!vE&&!gt.fullscreenElement&&!gt.webkitFullscreenElement&&(!vm||yE!==tt.innerWidth||Math.abs(tt.innerHeight-xE)>tt.innerHeight*.25))&&Jf.restart(!0)},bo={},iD=[],RE=function n(){return ln(rt,"scrollEnd",n)||ao(!0)},Po=function(e){return bo[e]&&bo[e].map(function(t){return t()})||iD},hi=[],bE=function(e){for(var t=0;t<hi.length;t+=5)(!e||hi[t+4]&&hi[t+4].query===e)&&(hi[t].style.cssText=hi[t+1],hi[t].getBBox&&hi[t].setAttribute("transform",hi[t+2]||""),hi[t+3].uncache=1)},PE=function(){return it.forEach(function(e){return bn(e)&&++e.cacheID&&(e.rec=e())})},K_=function(e,t){var i;for(zn=0;zn<Qe.length;zn++)i=Qe[zn],i&&(!t||i._ctx===t)&&(e?i.kill(1):i.revert(!0,!0));$l=!0,t&&bE(t),t||Po("revert")},LE=function(e,t){it.cache++,(t||!Bn)&&it.forEach(function(i){return bn(i)&&i.cacheID++&&(i.rec=0)}),mi(e)&&(tt.history.scrollRestoration=W_=e)},Bn,yo=0,lx,rD=function(){if(lx!==yo){var e=lx=yo;requestAnimationFrame(function(){return e===yo&&ao(!0)})}},DE=function(){pt.appendChild(Na),X_=!Fn&&Na.offsetHeight||tt.innerHeight,pt.removeChild(Na)},ux=function(e){return Ru(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},ao=function(e,t){if(gi=gt.documentElement,pt=gt.body,V_=[tt,gt,gi,pt],Wi&&!e&&!$l){un(rt,"scrollEnd",RE);return}DE(),Bn=rt.isRefreshing=!0,$l||PE();var i=Po("refreshInit");gE&&rt.sort(),t||K_(),it.forEach(function(r){bn(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),Qe.slice(0).forEach(function(r){return r.refresh()}),$l=!1,Qe.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),ym=1,ux(!0),Qe.forEach(function(r){var s=_r(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),ux(!1),ym=0,i.forEach(function(r){return r&&r.render&&r.render(-1)}),it.forEach(function(r){bn(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),LE(W_,1),Jf.pause(),yo++,Bn=2,Br(2),Qe.forEach(function(r){return bn(r.vars.onRefresh)&&r.vars.onRefresh(r)}),Bn=rt.isRefreshing=!1,Po("refresh")},Mm=0,uf=1,eu,Br=function(e){if(e===2||!Bn&&!$l){rt.isUpdating=!0,eu&&eu.update(0);var t=Qe.length,i=An(),r=i-jh>=50,s=t&&Qe[0].scroll();if(uf=Mm>s?-1:1,Bn||(Mm=s),r&&(Wi&&!Ad&&i-Wi>200&&(Wi=0,Po("scrollEnd")),Rl=jh,jh=i),uf<0){for(zn=t;zn-- >0;)Qe[zn]&&Qe[zn].update(0,r);uf=1}else for(zn=0;zn<t;zn++)Qe[zn]&&Qe[zn].update(0,r);rt.isUpdating=!1}bu=0},Em=[wE,AE,Y_,j_,Fi+Jl,Fi+Kl,Fi+Ql,Fi+Zl,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],cf=Em.concat([vo,xo,"boxSizing","max"+Za,"max"+q_,"position",Fi,qt,qt+Ql,qt+Kl,qt+Jl,qt+Zl]),sD=function(e,t,i){Ua(i);var r=e._gsap;if(r.spacerIsNative)Ua(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},qh=function(e,t,i,r){if(!e._gsap.swappedIn){for(var s=Em.length,o=t.style,a=e.style,l;s--;)l=Em[s],o[l]=i[l];o.position=i.position==="absolute"?"absolute":"relative",i.display==="inline"&&(o.display="inline-block"),a[Y_]=a[j_]="auto",o.flexBasis=i.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[vo]=ed(e,Gn)+Jt,o[xo]=ed(e,tn)+Jt,o[qt]=a[Fi]=a[AE]=a[wE]="0",Ua(r),a[vo]=a["max"+Za]=i[vo],a[xo]=a["max"+q_]=i[xo],a[qt]=i[qt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},oD=/([A-Z])/g,Ua=function(e){if(e){var t=e.t.style,i=e.length,r=0,s,o;for((e.t._gsap||Ee.core.getCache(e.t)).uncache=1;r<i;r+=2)o=e[r+1],s=e[r],o?t[s]=o:t[s]&&t.removeProperty(s.replace(oD,"-$1").toLowerCase())}},zc=function(e){for(var t=cf.length,i=e.style,r=[],s=0;s<t;s++)r.push(cf[s],i[cf[s]]);return r.t=e,r},aD=function(e,t,i){for(var r=[],s=e.length,o=i?8:0,a;o<s;o+=2)a=e[o],r.push(a,a in t?t[a]:e[o+1]);return r.t=e.t,r},ff={left:0,top:0},cx=function(e,t,i,r,s,o,a,l,u,c,f,d,p,g){bn(e)&&(e=e(l)),mi(e)&&e.substr(0,3)==="max"&&(e=d+(e.charAt(4)==="="?af("0"+e.substr(3),i):0));var _=p?p.time():0,m,h,v;if(p&&p.seek(0),isNaN(e)||(e=+e),Ll(e))p&&(e=Ee.utils.mapRange(p.scrollTrigger.start,p.scrollTrigger.end,0,d,e)),a&&lf(a,i,r,!0);else{bn(t)&&(t=t(l));var x=(e||"0").split(" "),y,w,T,S;v=qn(t,l)||pt,y=Dr(v)||{},(!y||!y.left&&!y.top)&&ki(v).display==="none"&&(S=v.style.display,v.style.display="block",y=Dr(v),S?v.style.display=S:v.style.removeProperty("display")),w=af(x[0],y[r.d]),T=af(x[1]||"0",i),e=y[r.p]-u[r.p]-c+w+s-T,a&&lf(a,T,r,i-T<20||a._isStart&&T>20),i-=i-T}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var P=e+i,M=o._isStart;m="scroll"+r.d2,lf(o,P,r,M&&P>20||!M&&(f?Math.max(pt[m],gi[m]):o.parentNode[m])<=P+1),f&&(u=Dr(a),f&&(o.style[r.op.p]=u[r.op.p]-r.op.m-o._offset+Jt))}return p&&v&&(m=Dr(v),p.seek(d),h=Dr(v),p._caScrollDist=m[r.p]-h[r.p],e=e/p._caScrollDist*d),p&&p.seek(_),p?e:Math.round(e)},lD=/(webkit|moz|length|cssText|inset)/i,fx=function(e,t,i,r){if(e.parentNode!==t){var s=e.style,o,a;if(t===pt){e._stOrig=s.cssText,a=ki(e);for(o in a)!+o&&!lD.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=i,s.left=r}else s.cssText=e._stOrig;Ee.core.getCache(e).uncache=1,t.appendChild(e)}},NE=function(e,t,i){var r=t,s=r;return function(o){var a=Math.round(e());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,i&&i()),s=r,r=Math.round(o),r}},Bc=function(e,t,i){var r={};r[t.p]="+="+i,Ee.set(e,r)},dx=function(e,t){var i=Is(e,t),r="_scroll"+t.p2,s=function o(a,l,u,c,f){var d=o.tween,p=l.onComplete,g={};u=u||i();var _=NE(i,u,function(){d.kill(),o.tween=0});return f=c&&f||0,c=c||a-u,d&&d.kill(),l[r]=a,l.inherit=!1,l.modifiers=g,g[r]=function(){return _(u+c*d.ratio+f*d.ratio*d.ratio)},l.onUpdate=function(){it.cache++,o.tween&&Br()},l.onComplete=function(){o.tween=0,p&&p.call(d)},d=o.tween=Ee.to(e,l),d};return e[r]=i,i.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},un(e,"wheel",i.wheelHandler),rt.isTouch&&un(e,"touchmove",i.wheelHandler),s},rt=function(){function n(t,i){ta||n.register(Ee)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),xm(this),this.init(t,i)}var e=n.prototype;return e.init=function(i,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!bl){this.update=this.refresh=this.kill=cr;return}i=sx(mi(i)||Ll(i)||i.nodeType?{trigger:i}:i,Fc);var s=i,o=s.onUpdate,a=s.toggleClass,l=s.id,u=s.onToggle,c=s.onRefresh,f=s.scrub,d=s.trigger,p=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,h=s.onScrubComplete,v=s.onSnapComplete,x=s.once,y=s.snap,w=s.pinReparent,T=s.pinSpacer,S=s.containerAnimation,P=s.fastScrollEnd,M=s.preventOverlaps,E=i.horizontal||i.containerAnimation&&i.horizontal!==!1?Gn:tn,k=!f&&f!==0,U=qn(i.scroller||tt),Q=Ee.core.getCache(U),L=Ro(U),F=("pinType"in i?i.pinType:Rs(U,"pinType")||L&&"fixed")==="fixed",G=[i.onEnter,i.onLeave,i.onEnterBack,i.onLeaveBack],W=k&&i.toggleActions.split(" "),N="markers"in i?i.markers:Fc.markers,O=L?0:parseFloat(ki(U)["border"+E.p2+Za])||0,R=this,K=i.onRefreshInit&&function(){return i.onRefreshInit(R)},J=QL(U,L,E),q=JL(U,L),Z=0,se=0,me=0,de=Is(U,E),De,Ne,Oe,We,H,Xe,ve,Ue,xe,V,Be,b,A,z,ne,te,ie,ge,he,fe,Re,Ve,ee,lt,Pe,je,Ae,ye,Ye,Je,ht,_e,ae,D,le,ue,ke,Ie,ot;if(R._startClamp=R._endClamp=!1,R._dir=E,m*=45,R.scroller=U,R.scroll=S?S.time.bind(S):de,We=de(),R.vars=i,r=r||i.animation,"refreshPriority"in i&&(gE=1,i.refreshPriority===-9999&&(eu=R)),Q.tweenScroll=Q.tweenScroll||{top:dx(U,tn),left:dx(U,Gn)},R.tweenTo=De=Q.tweenScroll[E.p],R.scrubDuration=function(oe){ae=Ll(oe)&&oe,ae?_e?_e.duration(oe):_e=Ee.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ae,paused:!0,onComplete:function(){return h&&h(R)}}):(_e&&_e.progress(1).kill(),_e=0)},r&&(r.vars.lazy=!1,r._initted&&!R.isReverted||r.vars.immediateRender!==!1&&i.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),R.animation=r.pause(),r.scrollTrigger=R,R.scrubDuration(f),Je=0,l||(l=r.vars.id)),y&&((!eo(y)||y.push)&&(y={snapTo:y}),"scrollBehavior"in pt.style&&Ee.set(L?[pt,gi]:U,{scrollBehavior:"auto"}),it.forEach(function(oe){return bn(oe)&&oe.target===(L?gt.scrollingElement||gi:U)&&(oe.smooth=!1)}),Oe=bn(y.snapTo)?y.snapTo:y.snapTo==="labels"?tD(r):y.snapTo==="labelsDirectional"?nD(r):y.directional!==!1?function(oe,ze){return $_(y.snapTo)(oe,An()-se<500?0:ze.direction)}:Ee.utils.snap(y.snapTo),D=y.duration||{min:.1,max:2},D=eo(D)?ql(D.min,D.max):ql(D,D),le=Ee.delayedCall(y.delay||ae/2||.1,function(){var oe=de(),ze=An()-se<500,Fe=De.tween;if((ze||Math.abs(R.getVelocity())<10)&&!Fe&&!Ad&&Z!==oe){var $e=(oe-Xe)/z,Ut=r&&!k?r.totalProgress():$e,et=ze?0:(Ut-ht)/(An()-Rl)*1e3||0,Tt=Ee.utils.clamp(-$e,1-$e,Jo(et/2)*et/.185),Zt=$e+(y.inertia===!1?0:Tt),Ct,wt,mt=y,ci=mt.onStart,C=mt.onInterrupt,I=mt.onComplete;if(Ct=Oe(Zt,R),Ll(Ct)||(Ct=Zt),wt=Math.max(0,Math.round(Xe+Ct*z)),oe<=ve&&oe>=Xe&&wt!==oe){if(Fe&&!Fe._initted&&Fe.data<=Jo(wt-oe))return;y.inertia===!1&&(Tt=Ct-$e),De(wt,{duration:D(Jo(Math.max(Jo(Zt-Ut),Jo(Ct-Ut))*.185/et/.05||0)),ease:y.ease||"power3",data:Jo(wt-oe),onInterrupt:function(){return le.restart(!0)&&C&&Qo(R,C)},onComplete:function(){R.update(),Z=de(),r&&!k&&(_e?_e.resetTo("totalProgress",Ct,r._tTime/r._tDur):r.progress(Ct)),Je=ht=r&&!k?r.totalProgress():R.progress,v&&v(R),I&&Qo(R,I)}},oe,Tt*z,wt-oe-Tt*z),ci&&Qo(R,ci,De.tween)}}else R.isActive&&Z!==oe&&le.restart(!0)}).pause()),l&&(Sm[l]=R),d=R.trigger=qn(d||p!==!0&&p),ot=d&&d._gsap&&d._gsap.stRevert,ot&&(ot=ot(R)),p=p===!0?d:qn(p),mi(a)&&(a={targets:d,className:a}),p&&(g===!1||g===Fi||(g=!g&&p.parentNode&&p.parentNode.style&&ki(p.parentNode).display==="flex"?!1:qt),R.pin=p,Ne=Ee.core.getCache(p),Ne.spacer?ne=Ne.pinState:(T&&(T=qn(T),T&&!T.nodeType&&(T=T.current||T.nativeElement),Ne.spacerIsNative=!!T,T&&(Ne.spacerState=zc(T))),Ne.spacer=ge=T||gt.createElement("div"),ge.classList.add("pin-spacer"),l&&ge.classList.add("pin-spacer-"+l),Ne.pinState=ne=zc(p)),i.force3D!==!1&&Ee.set(p,{force3D:!0}),R.spacer=ge=Ne.spacer,Ye=ki(p),lt=Ye[g+E.os2],fe=Ee.getProperty(p),Re=Ee.quickSetter(p,E.a,Jt),qh(p,ge,Ye),ie=zc(p)),N){b=eo(N)?sx(N,ox):ox,V=kc("scroller-start",l,U,E,b,0),Be=kc("scroller-end",l,U,E,b,0,V),he=V["offset"+E.op.d2];var ft=qn(Rs(U,"content")||U);Ue=this.markerStart=kc("start",l,ft,E,b,he,0,S),xe=this.markerEnd=kc("end",l,ft,E,b,he,0,S),S&&(Ie=Ee.quickSetter([Ue,xe],E.a,Jt)),!F&&!(xr.length&&Rs(U,"fixedMarkers")===!0)&&(eD(L?pt:U),Ee.set([V,Be],{force3D:!0}),je=Ee.quickSetter(V,E.a,Jt),ye=Ee.quickSetter(Be,E.a,Jt))}if(S){var Ce=S.vars.onUpdate,Me=S.vars.onUpdateParams;S.eventCallback("onUpdate",function(){R.update(0,0,1),Ce&&Ce.apply(S,Me||[])})}if(R.previous=function(){return Qe[Qe.indexOf(R)-1]},R.next=function(){return Qe[Qe.indexOf(R)+1]},R.revert=function(oe,ze){if(!ze)return R.kill(!0);var Fe=oe!==!1||!R.enabled,$e=wn;Fe!==R.isReverted&&(Fe&&(ue=Math.max(de(),R.scroll.rec||0),me=R.progress,ke=r&&r.progress()),Ue&&[Ue,xe,V,Be].forEach(function(Ut){return Ut.style.display=Fe?"none":"block"}),Fe&&(wn=R,R.update(Fe)),p&&(!w||!R.isActive)&&(Fe?sD(p,ge,ne):qh(p,ge,ki(p),Pe)),Fe||R.update(Fe),wn=$e,R.isReverted=Fe)},R.refresh=function(oe,ze,Fe,$e){if(!((wn||!R.enabled)&&!ze)){if(p&&oe&&Wi){un(n,"scrollEnd",RE);return}!Bn&&K&&K(R),wn=R,De.tween&&!Fe&&(De.tween.kill(),De.tween=0),_e&&_e.pause(),_&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(qe){return qe.vars.immediateRender&&qe.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),R.isReverted||R.revert(!0,!0),R._subPinOffset=!1;var Ut=J(),et=q(),Tt=S?S.duration():_r(U,E),Zt=z<=.01||!z,Ct=0,wt=$e||0,mt=eo(Fe)?Fe.end:i.end,ci=i.endTrigger||d,C=eo(Fe)?Fe.start:i.start||(i.start===0||!d?0:p?"0 0":"0 100%"),I=R.pinnedContainer=i.pinnedContainer&&qn(i.pinnedContainer,R),j=d&&Math.max(0,Qe.indexOf(R))||0,X=j,B,ce,Te,He,we,be,Ge,Ke,Lt,Qt,_t,Nn,xt;for(N&&eo(Fe)&&(Nn=Ee.getProperty(V,E.p),xt=Ee.getProperty(Be,E.p));X-- >0;)be=Qe[X],be.end||be.refresh(0,1)||(wn=R),Ge=be.pin,Ge&&(Ge===d||Ge===p||Ge===I)&&!be.isReverted&&(Qt||(Qt=[]),Qt.unshift(be),be.revert(!0,!0)),be!==Qe[X]&&(j--,X--);for(bn(C)&&(C=C(R)),C=tx(C,"start",R),Xe=cx(C,d,Ut,E,de(),Ue,V,R,et,O,F,Tt,S,R._startClamp&&"_startClamp")||(p?-.001:0),bn(mt)&&(mt=mt(R)),mi(mt)&&!mt.indexOf("+=")&&(~mt.indexOf(" ")?mt=(mi(C)?C.split(" ")[0]:"")+mt:(Ct=af(mt.substr(2),Ut),mt=mi(C)?C:(S?Ee.utils.mapRange(0,S.duration(),S.scrollTrigger.start,S.scrollTrigger.end,Xe):Xe)+Ct,ci=d)),mt=tx(mt,"end",R),ve=Math.max(Xe,cx(mt||(ci?"100% 0":Tt),ci,Ut,E,de()+Ct,xe,Be,R,et,O,F,Tt,S,R._endClamp&&"_endClamp"))||-.001,Ct=0,X=j;X--;)be=Qe[X]||{},Ge=be.pin,Ge&&be.start-be._pinPush<=Xe&&!S&&be.end>0&&(B=be.end-(R._startClamp?Math.max(0,be.start):be.start),(Ge===d&&be.start-be._pinPush<Xe||Ge===I)&&isNaN(C)&&(Ct+=B*(1-be.progress)),Ge===p&&(wt+=B));if(Xe+=Ct,ve+=Ct,R._startClamp&&(R._startClamp+=Ct),R._endClamp&&!Bn&&(R._endClamp=ve||-.001,ve=Math.min(ve,_r(U,E))),z=ve-Xe||(Xe-=.01)&&.001,Zt&&(me=Ee.utils.clamp(0,1,Ee.utils.normalize(Xe,ve,ue))),R._pinPush=wt,Ue&&Ct&&(B={},B[E.a]="+="+Ct,I&&(B[E.p]="-="+de()),Ee.set([Ue,xe],B)),p&&!(ym&&R.end>=_r(U,E)))B=ki(p),He=E===tn,Te=de(),Ve=parseFloat(fe(E.a))+wt,!Tt&&ve>1&&(_t=(L?gt.scrollingElement||gi:U).style,_t={style:_t,value:_t["overflow"+E.a.toUpperCase()]},L&&ki(pt)["overflow"+E.a.toUpperCase()]!=="scroll"&&(_t.style["overflow"+E.a.toUpperCase()]="scroll")),qh(p,ge,B),ie=zc(p),ce=Dr(p,!0),Ke=F&&Is(U,He?Gn:tn)(),g?(Pe=[g+E.os2,z+wt+Jt],Pe.t=ge,X=g===qt?ed(p,E)+z+wt:0,X&&(Pe.push(E.d,X+Jt),ge.style.flexBasis!=="auto"&&(ge.style.flexBasis=X+Jt)),Ua(Pe),I&&Qe.forEach(function(qe){qe.pin===I&&qe.vars.pinSpacing!==!1&&(qe._subPinOffset=!0)}),F&&de(ue)):(X=ed(p,E),X&&ge.style.flexBasis!=="auto"&&(ge.style.flexBasis=X+Jt)),F&&(we={top:ce.top+(He?Te-Xe:Ke)+Jt,left:ce.left+(He?Ke:Te-Xe)+Jt,boxSizing:"border-box",position:"fixed"},we[vo]=we["max"+Za]=Math.ceil(ce.width)+Jt,we[xo]=we["max"+q_]=Math.ceil(ce.height)+Jt,we[Fi]=we[Fi+Ql]=we[Fi+Kl]=we[Fi+Jl]=we[Fi+Zl]="0",we[qt]=B[qt],we[qt+Ql]=B[qt+Ql],we[qt+Kl]=B[qt+Kl],we[qt+Jl]=B[qt+Jl],we[qt+Zl]=B[qt+Zl],te=aD(ne,we,w),Bn&&de(0)),r?(Lt=r._initted,Wh(1),r.render(r.duration(),!0,!0),ee=fe(E.a)-Ve+z+wt,Ae=Math.abs(z-ee)>1,F&&Ae&&te.splice(te.length-2,2),r.render(0,!0,!0),Lt||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),Wh(0)):ee=z,_t&&(_t.value?_t.style["overflow"+E.a.toUpperCase()]=_t.value:_t.style.removeProperty("overflow-"+E.a));else if(d&&de()&&!S)for(ce=d.parentNode;ce&&ce!==pt;)ce._pinOffset&&(Xe-=ce._pinOffset,ve-=ce._pinOffset),ce=ce.parentNode;Qt&&Qt.forEach(function(qe){return qe.revert(!1,!0)}),R.start=Xe,R.end=ve,We=H=Bn?ue:de(),!S&&!Bn&&(We<ue&&de(ue),R.scroll.rec=0),R.revert(!1,!0),se=An(),le&&(Z=-1,le.restart(!0)),wn=0,r&&k&&(r._initted||ke)&&r.progress()!==ke&&r.progress(ke||0,!0).render(r.time(),!0,!0),(Zt||me!==R.progress||S||_||r&&!r._initted)&&(r&&!k&&(r._initted||me||r.vars.immediateRender!==!1)&&r.totalProgress(S&&Xe<-.001&&!me?Ee.utils.normalize(Xe,ve,0):me,!0),R.progress=Zt||(We-Xe)/z===me?0:me),p&&g&&(ge._pinOffset=Math.round(R.progress*ee)),_e&&_e.invalidate(),isNaN(Nn)||(Nn-=Ee.getProperty(V,E.p),xt-=Ee.getProperty(Be,E.p),Bc(V,E,Nn),Bc(Ue,E,Nn-($e||0)),Bc(Be,E,xt),Bc(xe,E,xt-($e||0))),Zt&&!Bn&&R.update(),c&&!Bn&&!A&&(A=!0,c(R),A=!1)}},R.getVelocity=function(){return(de()-H)/(An()-Rl)*1e3||0},R.endAnimation=function(){yl(R.callbackAnimation),r&&(_e?_e.progress(1):r.paused()?k||yl(r,R.direction<0,1):yl(r,r.reversed()))},R.labelToScroll=function(oe){return r&&r.labels&&(Xe||R.refresh()||Xe)+r.labels[oe]/r.duration()*z||0},R.getTrailing=function(oe){var ze=Qe.indexOf(R),Fe=R.direction>0?Qe.slice(0,ze).reverse():Qe.slice(ze+1);return(mi(oe)?Fe.filter(function($e){return $e.vars.preventOverlaps===oe}):Fe).filter(function($e){return R.direction>0?$e.end<=Xe:$e.start>=ve})},R.update=function(oe,ze,Fe){if(!(S&&!Fe&&!oe)){var $e=Bn===!0?ue:R.scroll(),Ut=oe?0:($e-Xe)/z,et=Ut<0?0:Ut>1?1:Ut||0,Tt=R.progress,Zt,Ct,wt,mt,ci,C,I,j;if(ze&&(H=We,We=S?de():$e,y&&(ht=Je,Je=r&&!k?r.totalProgress():et)),m&&p&&!wn&&!Nc&&Wi&&(!et&&Xe<$e+($e-H)/(An()-Rl)*m?et=1e-4:et===1&&ve>$e+($e-H)/(An()-Rl)*m&&(et=.9999)),et!==Tt&&R.enabled){if(Zt=R.isActive=!!et&&et<1,Ct=!!Tt&&Tt<1,C=Zt!==Ct,ci=C||!!et!=!!Tt,R.direction=et>Tt?1:-1,R.progress=et,ci&&!wn&&(wt=et&&!Tt?0:et===1?1:Tt===1?2:3,k&&(mt=!C&&W[wt+1]!=="none"&&W[wt+1]||W[wt],j=r&&(mt==="complete"||mt==="reset"||mt in r))),M&&(C||j)&&(j||f||!r)&&(bn(M)?M(R):R.getTrailing(M).forEach(function(Te){return Te.endAnimation()})),k||(_e&&!wn&&!Nc?(_e._dp._time-_e._start!==_e._time&&_e.render(_e._dp._time-_e._start),_e.resetTo?_e.resetTo("totalProgress",et,r._tTime/r._tDur):(_e.vars.totalProgress=et,_e.invalidate().restart())):r&&r.totalProgress(et,!!(wn&&(se||oe)))),p){if(oe&&g&&(ge.style[g+E.os2]=lt),!F)Re(Pl(Ve+ee*et));else if(ci){if(I=!oe&&et>Tt&&ve+1>$e&&$e+1>=_r(U,E),w)if(!oe&&(Zt||I)){var X=Dr(p,!0),B=$e-Xe;fx(p,pt,X.top+(E===tn?B:0)+Jt,X.left+(E===tn?0:B)+Jt)}else fx(p,ge);Ua(Zt||I?te:ie),Ae&&et<1&&Zt||Re(Ve+(et===1&&!I?ee:0))}}y&&!De.tween&&!wn&&!Nc&&le.restart(!0),a&&(C||x&&et&&(et<1||!Xh))&&Ru(a.targets).forEach(function(Te){return Te.classList[Zt||x?"add":"remove"](a.className)}),o&&!k&&!oe&&o(R),ci&&!wn?(k&&(j&&(mt==="complete"?r.pause().totalProgress(1):mt==="reset"?r.restart(!0).pause():mt==="restart"?r.restart(!0):r[mt]()),o&&o(R)),(C||!Xh)&&(u&&C&&Qo(R,u),G[wt]&&Qo(R,G[wt]),x&&(et===1?R.kill(!1,1):G[wt]=0),C||(wt=et===1?1:3,G[wt]&&Qo(R,G[wt]))),P&&!Zt&&Math.abs(R.getVelocity())>(Ll(P)?P:2500)&&(yl(R.callbackAnimation),_e?_e.progress(1):yl(r,mt==="reverse"?1:!et,1))):k&&o&&!wn&&o(R)}if(ye){var ce=S?$e/S.duration()*(S._caScrollDist||0):$e;je(ce+(V._isFlipped?1:0)),ye(ce)}Ie&&Ie(-$e/S.duration()*(S._caScrollDist||0))}},R.enable=function(oe,ze){R.enabled||(R.enabled=!0,un(U,"resize",Dl),L||un(U,"scroll",ea),K&&un(n,"refreshInit",K),oe!==!1&&(R.progress=me=0,We=H=Z=de()),ze!==!1&&R.refresh())},R.getTween=function(oe){return oe&&De?De.tween:_e},R.setPositions=function(oe,ze,Fe,$e){if(S){var Ut=S.scrollTrigger,et=S.duration(),Tt=Ut.end-Ut.start;oe=Ut.start+Tt*oe/et,ze=Ut.start+Tt*ze/et}R.refresh(!1,!1,{start:nx(oe,Fe&&!!R._startClamp),end:nx(ze,Fe&&!!R._endClamp)},$e),R.update()},R.adjustPinSpacing=function(oe){if(Pe&&oe){var ze=Pe.indexOf(E.d)+1;Pe[ze]=parseFloat(Pe[ze])+oe+Jt,Pe[1]=parseFloat(Pe[1])+oe+Jt,Ua(Pe)}},R.disable=function(oe,ze){if(oe!==!1&&R.revert(!0,!0),R.enabled&&(R.enabled=R.isActive=!1,ze||_e&&_e.pause(),ue=0,Ne&&(Ne.uncache=1),K&&ln(n,"refreshInit",K),le&&(le.pause(),De.tween&&De.tween.kill()&&(De.tween=0)),!L)){for(var Fe=Qe.length;Fe--;)if(Qe[Fe].scroller===U&&Qe[Fe]!==R)return;ln(U,"resize",Dl),L||ln(U,"scroll",ea)}},R.kill=function(oe,ze){R.disable(oe,ze),_e&&!ze&&_e.kill(),l&&delete Sm[l];var Fe=Qe.indexOf(R);Fe>=0&&Qe.splice(Fe,1),Fe===zn&&uf>0&&zn--,Fe=0,Qe.forEach(function($e){return $e.scroller===R.scroller&&(Fe=1)}),Fe||Bn||(R.scroll.rec=0),r&&(r.scrollTrigger=null,oe&&r.revert({kill:!1}),ze||r.kill()),Ue&&[Ue,xe,V,Be].forEach(function($e){return $e.parentNode&&$e.parentNode.removeChild($e)}),eu===R&&(eu=0),p&&(Ne&&(Ne.uncache=1),Fe=0,Qe.forEach(function($e){return $e.pin===p&&Fe++}),Fe||(Ne.spacer=0)),i.onKill&&i.onKill(R)},Qe.push(R),R.enable(!1,!1),ot&&ot(R),r&&r.add&&!z){var Le=R.update;R.update=function(){R.update=Le,it.cache++,Xe||ve||R.refresh()},Ee.delayedCall(.01,R.update),z=.01,Xe=ve=0}else R.refresh();p&&rD()},n.register=function(i){return ta||(Ee=i||ME(),SE()&&window.document&&n.enable(),ta=bl),ta},n.defaults=function(i){if(i)for(var r in i)Fc[r]=i[r];return Fc},n.disable=function(i,r){bl=0,Qe.forEach(function(o){return o[r?"kill":"disable"](i)}),ln(tt,"wheel",ea),ln(gt,"scroll",ea),clearInterval(Dc),ln(gt,"touchcancel",cr),ln(pt,"touchstart",cr),Ic(ln,gt,"pointerdown,touchstart,mousedown",ix),Ic(ln,gt,"pointerup,touchend,mouseup",rx),Jf.kill(),Uc(ln);for(var s=0;s<it.length;s+=3)Oc(ln,it[s],it[s+1]),Oc(ln,it[s],it[s+2])},n.enable=function(){if(tt=window,gt=document,gi=gt.documentElement,pt=gt.body,Ee){if(Ru=Ee.utils.toArray,ql=Ee.utils.clamp,xm=Ee.core.context||cr,Wh=Ee.core.suppressOverwrites||cr,W_=tt.history.scrollRestoration||"auto",Mm=tt.pageYOffset||0,Ee.core.globals("ScrollTrigger",n),pt){bl=1,Na=document.createElement("div"),Na.style.height="100vh",Na.style.position="absolute",DE(),ZL(),jt.register(Ee),n.isTouch=jt.isTouch,ts=jt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),vm=jt.isTouch===1,un(tt,"wheel",ea),V_=[tt,gt,gi,pt],Ee.matchMedia?(n.matchMedia=function(c){var f=Ee.matchMedia(),d;for(d in c)f.add(d,c[d]);return f},Ee.addEventListener("matchMediaInit",function(){PE(),K_()}),Ee.addEventListener("matchMediaRevert",function(){return bE()}),Ee.addEventListener("matchMedia",function(){ao(0,1),Po("matchMedia")}),Ee.matchMedia().add("(orientation: portrait)",function(){return Yh(),Yh})):console.warn("Requires GSAP 3.11.0 or later"),Yh(),un(gt,"scroll",ea);var i=pt.hasAttribute("style"),r=pt.style,s=r.borderTopStyle,o=Ee.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=Dr(pt),tn.m=Math.round(a.top+tn.sc())||0,Gn.m=Math.round(a.left+Gn.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),i||(pt.setAttribute("style",""),pt.removeAttribute("style")),Dc=setInterval(ax,250),Ee.delayedCall(.5,function(){return Nc=0}),un(gt,"touchcancel",cr),un(pt,"touchstart",cr),Ic(un,gt,"pointerdown,touchstart,mousedown",ix),Ic(un,gt,"pointerup,touchend,mouseup",rx),gm=Ee.utils.checkPrefix("transform"),cf.push(gm),ta=An(),Jf=Ee.delayedCall(.2,ao).pause(),na=[gt,"visibilitychange",function(){var c=tt.innerWidth,f=tt.innerHeight;gt.hidden?(Jv=c,ex=f):(Jv!==c||ex!==f)&&Dl()},gt,"DOMContentLoaded",ao,tt,"load",ao,tt,"resize",Dl],Uc(un),Qe.forEach(function(c){return c.enable(0,1)}),l=0;l<it.length;l+=3)Oc(ln,it[l],it[l+1]),Oc(ln,it[l],it[l+2])}else if(gt){var u=function c(){n.enable(),gt.removeEventListener("DOMContentLoaded",c)};gt.addEventListener("DOMContentLoaded",u)}}},n.config=function(i){"limitCallbacks"in i&&(Xh=!!i.limitCallbacks);var r=i.syncInterval;r&&clearInterval(Dc)||(Dc=r)&&setInterval(ax,r),"ignoreMobileResize"in i&&(vm=n.isTouch===1&&i.ignoreMobileResize),"autoRefreshEvents"in i&&(Uc(ln)||Uc(un,i.autoRefreshEvents||"none"),vE=(i.autoRefreshEvents+"").indexOf("resize")===-1)},n.scrollerProxy=function(i,r){var s=qn(i),o=it.indexOf(s),a=Ro(s);~o&&it.splice(o,a?6:2),r&&(a?xr.unshift(tt,r,pt,r,gi,r):xr.unshift(s,r))},n.clearMatchMedia=function(i){Qe.forEach(function(r){return r._ctx&&r._ctx.query===i&&r._ctx.kill(!0,!0)})},n.isInViewport=function(i,r,s){var o=(mi(i)?qn(i):i).getBoundingClientRect(),a=o[s?vo:xo]*r||0;return s?o.right-a>0&&o.left+a<tt.innerWidth:o.bottom-a>0&&o.top+a<tt.innerHeight},n.positionInViewport=function(i,r,s){mi(i)&&(i=qn(i));var o=i.getBoundingClientRect(),a=o[s?vo:xo],l=r==null?a/2:r in td?td[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/tt.innerWidth:(o.top+l)/tt.innerHeight},n.killAll=function(i){if(Qe.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),i!==!0){var r=bo.killAll||[];bo={},r.forEach(function(s){return s()})}},n}();rt.version="3.15.0";rt.saveStyles=function(n){return n?Ru(n).forEach(function(e){if(e&&e.style){var t=hi.indexOf(e);t>=0&&hi.splice(t,5),hi.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ee.core.getCache(e),xm())}}):hi};rt.revert=function(n,e){return K_(!n,e)};rt.create=function(n,e){return new rt(n,e)};rt.refresh=function(n){return n?Dl(!0):(ta||rt.register())&&ao(!0)};rt.update=function(n){return++it.cache&&Br(n===!0?2:0)};rt.clearScrollMemory=LE;rt.maxScroll=function(n,e){return _r(n,e?Gn:tn)};rt.getScrollFunc=function(n,e){return Is(qn(n),e?Gn:tn)};rt.getById=function(n){return Sm[n]};rt.getAll=function(){return Qe.filter(function(n){return n.vars.id!=="ScrollSmoother"})};rt.isScrolling=function(){return!!Wi};rt.snapDirectional=$_;rt.addEventListener=function(n,e){var t=bo[n]||(bo[n]=[]);~t.indexOf(e)||t.push(e)};rt.removeEventListener=function(n,e){var t=bo[n],i=t&&t.indexOf(e);i>=0&&t.splice(i,1)};rt.batch=function(n,e){var t=[],i={},r=e.interval||.016,s=e.batchMax||1e9,o=function(u,c){var f=[],d=[],p=Ee.delayedCall(r,function(){c(f,d),f=[],d=[]}).pause();return function(g){f.length||p.restart(!0),f.push(g.trigger),d.push(g),s<=f.length&&p.progress(1)}},a;for(a in e)i[a]=a.substr(0,2)==="on"&&bn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return bn(s)&&(s=s(),un(rt,"refresh",function(){return s=e.batchMax()})),Ru(n).forEach(function(l){var u={};for(a in i)u[a]=i[a];u.trigger=l,t.push(rt.create(u))}),t};var hx=function(e,t,i,r){return t>r?e(r):t<0&&e(0),i>r?(r-t)/(i-t):i<0?t/(t-i):1},$h=function n(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(jt.isTouch?" pinch-zoom":""):"none",e===gi&&n(pt,t)},Hc={auto:1,scroll:1},uD=function(e){var t=e.event,i=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Ee.core.getCache(s),a=An(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==pt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Hc[(l=ki(s)).overflowY]||Hc[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==i&&!Ro(s)&&(Hc[(l=ki(s)).overflowY]||Hc[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},UE=function(e,t,i,r){return jt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&uD,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return i&&un(gt,jt.eventTypes[0],mx,!1,!0)},onDisable:function(){return ln(gt,jt.eventTypes[0],mx,!0)}})},cD=/(input|label|select|textarea)/i,px,mx=function(e){var t=cD.test(e.target.tagName);(t||px)&&(e._gsapAllow=!0,px=t)},fD=function(e){eo(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,i=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,u=qn(e.target)||gi,c=Ee.core.globals().ScrollSmoother,f=c&&c.get(),d=ts&&(e.content&&qn(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),p=Is(u,tn),g=Is(u,Gn),_=1,m=(jt.isTouch&&tt.visualViewport?tt.visualViewport.scale*tt.visualViewport.width:tt.outerWidth)/tt.innerWidth,h=0,v=bn(r)?function(){return r(a)}:function(){return r||2.8},x,y,w=UE(u,e.type,!0,s),T=function(){return y=!1},S=cr,P=cr,M=function(){l=_r(u,tn),P=ql(ts?1:0,l),i&&(S=ql(0,_r(u,Gn))),x=yo},E=function(){d._gsap.y=Pl(parseFloat(d._gsap.y)+p.offset)+"px",d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(d._gsap.y)+", 0, 1)",p.offset=p.cacheID=0},k=function(){if(y){requestAnimationFrame(T);var N=Pl(a.deltaY/2),O=P(p.v-N);if(d&&O!==p.v+p.offset){p.offset=O-p.v;var R=Pl((parseFloat(d&&d._gsap.y)||0)-p.offset);d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+R+", 0, 1)",d._gsap.y=R+"px",p.cacheID=it.cache,Br()}return!0}p.offset&&E(),y=!0},U,Q,L,F,G=function(){M(),U.isActive()&&U.vars.scrollY>l&&(p()>l?U.progress(1)&&p(l):U.resetTo("scrollY",l))};return d&&Ee.set(d,{y:"+=0"}),e.ignoreCheck=function(W){return ts&&W.type==="touchmove"&&k()||_>1.05&&W.type!=="touchstart"||a.isGesturing||W.touches&&W.touches.length>1},e.onPress=function(){y=!1;var W=_;_=Pl((tt.visualViewport&&tt.visualViewport.scale||1)/m),U.pause(),W!==_&&$h(u,_>1.01?!0:i?!1:"x"),Q=g(),L=p(),M(),x=yo},e.onRelease=e.onGestureStart=function(W,N){if(p.offset&&E(),!N)F.restart(!0);else{it.cache++;var O=v(),R,K;i&&(R=g(),K=R+O*.05*-W.velocityX/.227,O*=hx(g,R,K,_r(u,Gn)),U.vars.scrollX=S(K)),R=p(),K=R+O*.05*-W.velocityY/.227,O*=hx(p,R,K,_r(u,tn)),U.vars.scrollY=P(K),U.invalidate().duration(O).play(.01),(ts&&U.vars.scrollY>=l||R>=l-1)&&Ee.to({},{onUpdate:G,duration:O})}o&&o(W)},e.onWheel=function(){U._ts&&U.pause(),An()-h>1e3&&(x=0,h=An())},e.onChange=function(W,N,O,R,K){if(yo!==x&&M(),N&&i&&g(S(R[2]===N?Q+(W.startX-W.x):g()+N-R[1])),O){p.offset&&E();var J=K[2]===O,q=J?L+W.startY-W.y:p()+O-K[1],Z=P(q);J&&q!==Z&&(L+=Z-q),p(Z)}(O||N)&&Br()},e.onEnable=function(){$h(u,i?!1:"x"),rt.addEventListener("refresh",G),un(tt,"resize",G),p.smooth&&(p.target.style.scrollBehavior="auto",p.smooth=g.smooth=!1),w.enable()},e.onDisable=function(){$h(u,!0),ln(tt,"resize",G),rt.removeEventListener("refresh",G),w.kill()},e.lockAxis=e.lockAxis!==!1,a=new jt(e),a.iOS=ts,ts&&!p()&&p(1),ts&&Ee.ticker.add(cr),F=a._dc,U=Ee.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:i?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:NE(p,p(),function(){return U.pause()})},onUpdate:Br,onComplete:F.vars.onComplete}),a};rt.sort=function(n){if(bn(n))return Qe.sort(n);var e=tt.pageYOffset||0;return rt.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+tt.innerHeight}),Qe.sort(n||function(t,i){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((i.vars.containerAnimation?1e6:i._sortY)+(i.vars.refreshPriority||0)*-1e6)})};rt.observe=function(n){return new jt(n)};rt.normalizeScroll=function(n){if(typeof n>"u")return Fn;if(n===!0&&Fn)return Fn.enable();if(n===!1){Fn&&Fn.kill(),Fn=n;return}var e=n instanceof jt?n:fD(n);return Fn&&Fn.target===e.target&&Fn.kill(),Ro(e.target)&&(Fn=e),e};rt.core={_getVelocityProp:_m,_inputObserver:UE,_scrollers:it,_proxies:xr,bridge:{ss:function(){Wi||Po("scrollStart"),Wi=An()},ref:function(){return wn}}};ME()&&Ee.registerPlugin(rt);let _x=!1;function dD({stickyRef:n,screenRef:e,tiltRef:t,count:i,active:r,setActive:s}){const o=dt.useRef(null),a=dt.useRef(r);return a.current=r,dt.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.body.classList.add("tour-static");return}_x||(sf.registerPlugin(rt),_x=!0);const c=sf.matchMedia();return c.add("(min-width: 900px)",()=>{const f=n.current;if(!f)return;const d=rt.create({trigger:f,start:"top top",end:()=>`+=${(i-1)*window.innerHeight*1.05}`,pin:!0,scrub:1,invalidateOnRefresh:!0,onUpdate:p=>{const g=Math.min(i-1,Math.round(p.progress*(i-1)));g!==a.current&&s(g)}});return o.current=d,()=>{o.current=null,d.kill()}}),c.add("(max-width: 899px)",()=>{let f=a.current;const p=setInterval(()=>{f=(f+1)%i,s(f)},3600),g=e.current;let _=0;const m=v=>{_=v.touches?v.touches[0].clientX:v.clientX},h=v=>{const y=(v.changedTouches?v.changedTouches[0].clientX:v.clientX)-_;Math.abs(y)>40&&(f=y<0?(f+1)%i:(f-1+i)%i,s(f))};return g==null||g.addEventListener("touchstart",m),g==null||g.addEventListener("touchend",h),()=>{clearInterval(p),g==null||g.removeEventListener("touchstart",m),g==null||g.removeEventListener("touchend",h)}}),()=>c.revert()},[n,e,i,s]),dt.useEffect(()=>{const u=window.matchMedia("(prefers-reduced-motion: reduce)").matches,c=t.current;!c||u||sf.fromTo(c,{rotateY:10},{rotateY:0,duration:.6,ease:"power2.out"})},[r,t]),{goTo:dt.useCallback(u=>{s(u);const c=o.current;if(c){const f=c.start+u/(i-1)*(c.end-c.start);window.scrollTo({top:f,behavior:"smooth"})}},[i,s])}}const hD="/assets/criar-6uqdewLi.webp",pD="/assets/feed-BdslZZ94.webp",mD="/assets/chat-w7nxOgzC.webp",_D="/assets/tecnicas-Dif3zcL-.webp",gD="/assets/mercado-Ct8FWaLS.webp",gx={criar:hD,feed:pD,chat:mD,tecnicas:_D,mercado:gD};function vD(){const{t:n}=Sr(),e=dt.useRef(null),t=dt.useRef(null),i=dt.useRef(null),r=dt.useRef(null),s=dt.useRef(null),[o,a]=dt.useState(0);hM(e,"net");const{goTo:l}=dD({stickyRef:i,screenRef:r,tiltRef:s,count:n.tour.captions.length,active:o,setActive:a});return $.jsxs("div",{className:"tour",id:"tour",children:[$.jsx("canvas",{id:"net",ref:e}),$.jsxs("div",{className:"tour-head reveal",children:[$.jsx("span",{className:"eyebrow",children:n.tour.eyebrow}),$.jsx("h2",{children:n.tour.title}),$.jsx("p",{children:n.tour.lead})]}),$.jsx("section",{className:"stage",id:"stage",ref:t,children:$.jsxs("div",{className:"stage-sticky",id:"stageSticky",ref:i,children:[$.jsx("div",{className:"captions",children:n.tour.captions.map((u,c)=>$.jsxs("div",{className:`cap${c===o?" active":""}`,children:[$.jsx("span",{className:"num",children:u.num}),$.jsx("h2",{children:u.title}),$.jsx("p",{children:u.body}),$.jsx("img",{className:"cap-shot",src:gx[u.screen],alt:u.title})]},u.num))}),$.jsxs("div",{className:"phone-col",children:[$.jsx("div",{className:"device-tilt",id:"tilt",ref:s,children:$.jsxs("div",{className:"device",children:[$.jsx("span",{className:"power"}),$.jsxs("div",{className:"screen",id:"screen",ref:r,children:[n.tour.captions.map((u,c)=>$.jsx("div",{className:"slide",style:{opacity:c===o?1:0,zIndex:c===o?2:1},children:$.jsx("img",{src:gx[u.screen],alt:u.title,"data-screen":u.screen})},u.num)),$.jsx("div",{className:"gloss"})]})]})}),$.jsx("div",{className:"dots",id:"dots",children:n.tour.dotLabels.map((u,c)=>$.jsx("button",{className:`dot${c===o?" on":""}`,"aria-label":u,onClick:()=>l(c)},u))})]})]})})]})}function Cd(n){dt.useEffect(()=>{const e=n.current;if(!e)return;const t=e.querySelectorAll(".reveal");if(!t.length)return;const i=new IntersectionObserver(r=>{r.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),i.unobserve(s.target))})},{threshold:.14});return t.forEach(r=>i.observe(r)),()=>i.disconnect()},[n])}function xD(n){dt.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=n.current;if(!t)return;const i=t.querySelectorAll(".tilt3"),r=o=>{const a=o.currentTarget,l=a.getBoundingClientRect(),u=(o.clientX-l.left)/l.width-.5,c=(o.clientY-l.top)/l.height-.5;a.style.transform=`rotateX(${-c*8}deg) rotateY(${u*8}deg)`},s=o=>{o.currentTarget.style.transform=""};return i.forEach(o=>{o.addEventListener("mousemove",r),o.addEventListener("mouseleave",s)}),()=>{i.forEach(o=>{o.removeEventListener("mousemove",r),o.removeEventListener("mouseleave",s)})}},[n])}const yD={user:{background:"#e7f0e2",color:"#1E6B3A"},producer:{background:"#eef7e1",color:"#3E8E2E",borderColor:"#7CBE3C"},seller:{background:"#fbe9e5",color:"#D24A2E"}};function SD(){const{t:n}=Sr(),e=dt.useRef(null);return Cd(e),xD(e),$.jsx("section",{className:"block",id:"perfis",style:{background:"linear-gradient(180deg,#EDF2E4,#e6eedb)"},ref:e,children:$.jsxs("div",{className:"wrap",children:[$.jsxs("div",{className:"sec-head reveal",children:[$.jsx("span",{className:"eyebrow",children:n.profiles.eyebrow}),$.jsx("h2",{children:n.profiles.title}),$.jsx("p",{children:n.profiles.lead})]}),$.jsx("div",{className:"profiles",children:n.profiles.cards.map(t=>$.jsxs("div",{className:"prof tilt3 reveal",style:t.key==="producer"?{borderColor:"#7CBE3C"}:void 0,children:[$.jsx("span",{className:"badge",style:yD[t.key],children:t.badge}),$.jsx("h3",{children:t.title}),$.jsx("p",{children:t.desc}),$.jsxs("div",{className:"can",children:[t.can.map(i=>$.jsxs("span",{children:[$.jsx("i",{children:"✓"}),i]},i)),t.cannot.map(i=>$.jsxs("span",{className:"no",children:[$.jsx("i",{children:"✕"}),i]},i))]})]},t.key))})]})})}const df=[{name:"João Matlombe",color:"#1E6B3A",type:"chat",sub:{pt:"testou o Chat IA",en:"tried the AI Chat"},q:{pt:"Como controlo a lagarta no milho?",en:"How do I control the fall armyworm in my maize?"},a:{pt:"Inspeciona as folhas de manhã e trata logo que vires os primeiros sinais.",en:"Inspect the leaves in the morning and treat as soon as you see the first signs."}},{name:"Ana Cumbe",color:"#3E8E2E",type:"note",emoji:"🌱",sub:{pt:"testes iniciais",en:"early tests"},msg:{pt:"Testei o assistente e respondeu rápido — parece que percebe mesmo de agricultura.",en:"I tried the assistant and it replied fast — it really seems to understand farming."}},{name:"Fátima Nhaca",color:"#D24A2E",type:"note",emoji:"✨",sub:{pt:"testes iniciais",en:"early tests"},msg:{pt:"A interface é simples, dá para usar sem ajuda de ninguém.",en:"The interface is simple, you can use it without anyone’s help."}},{name:"Dércio Sitoe",color:"#17726A",type:"note",emoji:"📷",sub:{pt:"testou o Chat IA",en:"tried the AI Chat"},msg:{pt:"Gostei de enviar a foto da planta e receber logo uma resposta.",en:"I liked sending a photo of the plant and getting a reply right away."}},{name:"Carlos Tembe",color:"#F0A824",type:"note",emoji:"🤞",sub:{pt:"à espera do lançamento",en:"awaiting launch"},msg:{pt:"Curioso para ver se o Mercado facilita mesmo a venda dos meus produtos.",en:"Curious to see if the Marketplace really makes it easier to sell my produce."}},{name:"Mércia Alexandre",color:"#7CBE3C",type:"chat",sub:{pt:"testou o Chat IA",en:"tried the AI Chat"},q:{pt:"Que adubo uso para o tomate?",en:"What fertilizer should I use for tomatoes?"},a:{pt:"Começa com composto orgânico e ajusta conforme a análise do solo.",en:"Start with organic compost and adjust according to your soil analysis."}},{name:"Rosa Manjate",color:"#1E6B3A",type:"note",emoji:"💚",sub:{pt:"produtora",en:"producer"},msg:{pt:"Vai ajudar muita gente aqui no distrito a vender melhor.",en:"This is going to help a lot of people here in the district sell better."}},{name:"Paulo Guambe",color:"#D24A2E",type:"note",emoji:"🚀",sub:{pt:"beta tester",en:"beta tester"},msg:{pt:"Ainda em testes, mas promete muito.",en:"Still in testing, but it shows a lot of promise."}}],MD=220;function ED({sectionRef:n,rimRef:e,cardRefs:t}){dt.useEffect(()=>{const i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=n.current,s=e.current,o=t.current.filter(Boolean);if(!r||!s||!o.length)return;let a=0,l=0,u=380;function c(){const v=r.getBoundingClientRect(),x=window.innerHeight;l=x/2,a=0,u=Math.min(430,x*.42,v.width*.34),s.style.setProperty("--wd",`${u*2}px`)}c(),window.addEventListener("resize",c);const f={v:!0},d=new IntersectionObserver(([v])=>{f.v=v.isIntersecting},{threshold:.05});d.observe(r);function p(){const v=r.getBoundingClientRect(),x=r.offsetHeight-window.innerHeight;if(x<=0)return 0;const y=-v.top;return Math.min(1,Math.max(0,y/x))}const g=2*Math.PI/o.length;function _(v){o.forEach((x,y)=>{let w=y*g-v;w=(w+Math.PI)%(2*Math.PI)-Math.PI;const T=w*180/Math.PI;if(Math.abs(T)>86){x.style.opacity=0,x.style.pointerEvents="none";return}const S=a+Math.cos(w)*u,P=l+Math.sin(w)*u,M=.72+(1-Math.abs(T)/86)*.4,E=1-Math.abs(T)/100;x.style.transform=`translate(${S}px, ${P}px) translate(-50%, -50%) scale(${M})`,x.style.opacity=E,x.style.pointerEvents="auto",x.style.zIndex=String(1e3-Math.round(Math.abs(T)))})}let m=null;function h(v){if(f.v){const x=p()*(MD*Math.PI/180)+v*12e-5;_(x)}i||(m=requestAnimationFrame(h))}return i?_(0):m=requestAnimationFrame(h),()=>{m&&cancelAnimationFrame(m),window.removeEventListener("resize",c),d.disconnect()}},[n,e,t])}function TD(n){return n.split(" ").map(e=>e[0]).slice(0,2).join("").toUpperCase()}const IE=dt.forwardRef(function({item:e,style:t},i){const{lang:r}=Sr();return $.jsxs("div",{className:"chatcard",style:t,ref:i,children:[$.jsxs("div",{className:"cc-head",children:[$.jsx("div",{className:"cc-av",style:{background:e.color},children:TD(e.name)}),$.jsxs("div",{children:[$.jsx("div",{className:"cc-name",children:e.name}),$.jsx("div",{className:"cc-sub",children:e.sub[r]})]})]}),$.jsx("div",{className:"cc-body",children:e.type==="chat"?$.jsxs($.Fragment,{children:[$.jsx("div",{className:"bubble me",children:e.q[r]}),$.jsx("div",{className:"bubble ai",children:e.a[r]})]}):$.jsxs("div",{className:"bubble note",children:[$.jsx("span",{className:"em",children:e.emoji})," ",e.msg[r]]})})]})});function wD(){const{t:n}=Sr(),e=dt.useRef(null),t=dt.useRef(null),i=dt.useRef([]);return ED({sectionRef:e,rimRef:t,cardRefs:i}),$.jsx("section",{className:"fb-web feedback-web",id:"feedbackWeb",ref:e,children:$.jsxs("div",{className:"fb-sticky",children:[$.jsx("div",{className:"wheel-rim",ref:t}),$.jsx("div",{className:"wheel",id:"wheel",children:df.map((r,s)=>$.jsx(IE,{item:r,ref:o=>{i.current[s]=o}},r.name))}),$.jsx("div",{className:"wheel-hub"}),$.jsxs("div",{className:"fb-copy",children:[$.jsx("span",{className:"eyebrow",children:n.feedback.web.eyebrow}),$.jsx("h2",{children:n.feedback.web.title}),$.jsx("p",{children:n.feedback.web.lead}),$.jsx("div",{className:"hint",children:n.feedback.web.hint})]})]})})}function vx({items:n,className:e}){const t=[...n,...n];return $.jsx("div",{className:"marquee reveal",style:e==="r2"?{marginTop:".4rem"}:void 0,children:$.jsx("div",{className:`mtrack ${e}`,children:t.map((i,r)=>$.jsx(IE,{item:i},`${i.name}-${r}`))})})}function AD(){const{t:n}=Sr(),e=dt.useRef(null);Cd(e);const t=Math.ceil(df.length/2);return $.jsxs("section",{className:"fb-mobile block",id:"feedbackMobile",style:{background:"linear-gradient(180deg,#e6eedb,#EDF2E4)",paddingBottom:"5rem"},ref:e,children:[$.jsx("div",{className:"wrap",children:$.jsxs("div",{className:"sec-head reveal",children:[$.jsx("span",{className:"eyebrow",children:n.feedback.mobile.eyebrow}),$.jsx("h2",{children:n.feedback.mobile.title}),$.jsx("p",{children:n.feedback.mobile.lead})]})}),$.jsx(vx,{items:df.slice(0,t),className:"r1"}),$.jsx(vx,{items:df.slice(t),className:"r2"})]})}function CD(){const{t:n}=Sr(),e=dt.useRef(null);return Cd(e),$.jsx("section",{className:"block",id:"missao",style:{paddingBottom:0},ref:e,children:$.jsxs("div",{className:"mission reveal",children:[$.jsx("span",{className:"eyebrow",children:n.mission.eyebrow}),$.jsx("blockquote",{children:n.mission.quote})]})})}function RD(){const{t:n}=Sr(),e=dt.useRef(null);return Cd(e),$.jsx("section",{className:"block",id:"cta",ref:e,children:$.jsxs("div",{className:"cta reveal",children:[$.jsx("span",{className:"eyebrow",children:n.cta.eyebrow}),$.jsx("h2",{children:n.cta.title}),$.jsx("p",{children:n.cta.lead}),$.jsx("a",{className:"btn btn-light",href:"https://www.iagromoz.com",children:n.cta.button}),$.jsxs("div",{className:"team",children:[n.cta.team,$.jsx("b",{children:"Ku_kulaDevz"})," · ",$.jsx("a",{href:"mailto:kukuladevz@gmail.com",children:"kukuladevz@gmail.com"})]})]})})}function bD(){const{t:n}=Sr();return $.jsx("footer",{children:$.jsxs("div",{className:"wrap foot",children:[$.jsxs("a",{className:"brand",href:"#top",children:[$.jsx("img",{src:NS,alt:"",style:{width:44,height:44}}),$.jsxs("span",{children:["IAgro",$.jsx("b",{children:"Moz"})]})]}),$.jsx("small",{children:n.footer.small}),$.jsxs("nav",{style:{display:"flex",gap:"1.2rem"},children:[n.nav.links.map(e=>$.jsx("a",{href:e.href,children:e.label},e.href)),$.jsx("a",{href:"mailto:kukuladevz@gmail.com",children:"kukuladevz@gmail.com"})]})]})})}function PD(){return $.jsxs(cw,{children:[$.jsx(fw,{}),$.jsx(C2,{}),$.jsx(vD,{}),$.jsx(SD,{}),$.jsx(wD,{}),$.jsx(AD,{}),$.jsx(CD,{}),$.jsx(RD,{}),$.jsx(bD,{})]})}LS(document.getElementById("root")).render($.jsx(dt.StrictMode,{children:$.jsx(PD,{})}));
