(function(e){function t(t){for(var n,o,i=t[0],l=t[1],c=t[2],u=0,d=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);h&&h(t);while(d.length)d.shift()();return s.push.apply(s,c||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,o=1;o<r.length;o++){var i=r[o];0!==a[i]&&(n=!1)}n&&(s.splice(t--,1),e=l(l.s=r[0]))}return e}var n={},o={2:0},a={2:0},s=[];function i(e){return l.p+"js/"+({}[e]||e)+"."+{1:"b32038f9",3:"ba7f8611",4:"a38e82b7",5:"b7212e8b",6:"60bfa4a4"}[e]+".js"}function l(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.e=function(e){var t=[],r={1:1,3:1,4:1,5:1,6:1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=new Promise((function(t,r){for(var n="css/"+({}[e]||e)+"."+{1:"36b14547",3:"d86a87ca",4:"430b8d81",5:"945feab0",6:"004bd44c"}[e]+".css",a=l.p+n,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var c=s[i],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===n||u===a))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){c=d[i],u=c.getAttribute("data-href");if(u===n||u===a)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var n=t&&t.target&&t.target.src||a,s=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=n,delete o[e],h.parentNode.removeChild(h),r(s)},h.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(h)})).then((function(){o[e]=0})));var n=a[e];if(0!==n)if(n)t.push(n[2]);else{var s=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=s);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=i(e);var d=new Error;c=function(t){u.onerror=u.onload=null,clearTimeout(h);var r=a[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",d.name="ChunkLoadError",d.type=n,d.request=o,r[1](d)}a[e]=void 0}};var h=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(t)},l.m=e,l.c=n,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(r,n,function(t){return e[t]}.bind(null,n));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var h=u;s.push([0,0]),r()})({0:function(e,t,r){e.exports=r("2f39")},"0047":function(e,t,r){},"2f39":function(e,t,r){"use strict";r.r(t);var n={};r.r(n),r.d(n,"getVibes",(function(){return S}));var o={};r.r(o),r.d(o,"SET_VIBES",(function(){return w}));var a={};r.r(a),r.d(a,"fetchVibes",(function(){return O}));r("5319"),r("43b9"),r("7d6e"),r("e54f"),r("985d"),r("0047");var s=r("2b0e"),i=r("1f91"),l=r("42d2"),c=r("b05d"),u=r("f508"),d=r("2a19");s["a"].use(c["a"],{config:{},lang:i["a"],iconSet:l["a"],plugins:{Loading:u["a"],Notify:d["a"]}});var h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"q-app"}},[r("router-view")],1)},p=[],f={name:"App"},m=f,g=r("2877"),b=Object(g["a"])(m,h,p,!1,null,null,null),v=b.exports,E=r("2f62"),y=function(){return{vibes:[]}};function S(e){return e.vibes}function w(e,t){e.vibes=t}var T=r("bc3a"),_=r.n(T);const k="http://localhost:4000/posts";function O({commit:e}){_.a.get(k,{headers:{authorization:`Bearer ${localStorage.token}`}}).then((t=>{e("SET_VIBES",t.data)}))}var R={namespaced:!0,getters:n,mutations:o,actions:a,state:y},P=r("d370"),j=r.n(P);const C="http://localhost:4000/auth/login",x="http://localhost:4000/auth/register",M="http://localhost:4000/",N=j.a.object({username:j.a.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),password:j.a.string().min(8).required(),avatar:j.a.any().allow("avatar")}),$={token:null,user:null,errorMessage:null},B={getError(e){return e.errorMessage},getUser(e){return e.user},getToken(e){return e.token}},A={async signNewUser({dispatch:e},t){console.log(t);let r=N.validate(t),n="";if(void 0===r.error)return e("register",t);n=r.error.message,e("handleError",n)},async authenticateUser({dispatch:e},t){let r=N.validate(t),n="";if(void 0===r.error)return e("login",t);n=r.error.message,e("handleError",n)},async login({dispatch:e},t){try{let r=await _.a.post(C,t);const n=r.data.token;localStorage.setItem("token",n),_.a.defaults.headers.common["authorization"]=`Bearer ${n}`,e("checkToken",n)}catch(r){let t=r.message;e("handleError",t)}},async register({dispatch:e},t){try{const r=new FormData;r.append("username",t.username),r.append("password",t.password),r.append("image",t.avatar);let n=await _.a.post(x,r);const o=n.data.token;localStorage.setItem("token",o),_.a.defaults.headers.common["authorization"]=`Bearer ${o}`,this.$router.push("/"),e("checkToken",o)}catch(r){let t=r.message;e("handleError",t)}},async checkToken({commit:e,dispatch:t,state:r},n){if(n&&e("SET_TOKEN",n),r.token)try{let t=await _.a.get(M);console.log(t),e("SET_USER",t.data.user),e("SET_ERROR",null)}catch(o){e("SET_TOKEN",null),e("SET_USER",null)}},signOut({commit:e}){localStorage.removeItem("token"),e("SET_TOKEN",null),e("SET_USER",null)},handleError({commit:e,dispatch:t},r){let n=r;e("SET_ERROR",n)},emptyError({dispatch:e}){let t="";e("handleError",t)}},U={SET_ERROR(e,t){e.errorMessage=t},SET_USER(e,t){e.user=t},SET_TOKEN(e,t){e.token=t}};var V={namespaced:!0,state:$,getters:B,mutations:U,actions:A};const q={comments:[],errorMessage:""},z={getComments(e){return e.comments}},I={async fetchComments({commit:e},t){try{let r=await _.a.get(`http://localhost:4000/posts/${t._id}/comments`,{headers:{authorization:`Bearer ${localStorage.token}`}});console.log(r),e("SET_COMMENTS",r.data)}catch(r){let t=r.message;e("SET_ERROR",t)}},createComment({commit:e,dispatch:t},r){_.a.post(`http://localhost:4000/posts/${r.vibe._id}/comments/new`,r,{headers:{authorization:`Bearer ${localStorage.token}`}}).then((e=>{console.log(e.vibe),t("fetchComments",e.vibe)})).catch((t=>{let r=t.message;e("SET_ERROR",r)}))}},L={SET_COMMENTS(e,t){e.comments=t},SET_ERROR(e,t){e.errorMessage=t}};var K={namespaced:!0,state:q,getters:z,mutations:L,actions:I},D=r("0e44");s["a"].use(E["a"]);var F=function(){const e=new E["a"].Store({modules:{vibe:R,user:V,comment:K},plugins:[Object(D["a"])()],strict:!1});return e},J=r("8c4f");r("ddb0");function H(e,t,r){localStorage.token?r("/"):r()}const Q=[{path:"/",component:()=>Promise.all([r.e(0),r.e(1)]).then(r.bind(null,"713b")),children:[{path:"/",component:()=>Promise.all([r.e(0),r.e(4)]).then(r.bind(null,"8b24"))}],beforeEnter:function(e,t,r){localStorage.token?r():r("/login")}},{path:"/",component:()=>Promise.all([r.e(0),r.e(1)]).then(r.bind(null,"713b")),children:[{path:"/vibe",component:()=>Promise.all([r.e(0),r.e(6)]).then(r.bind(null,"2bb2"))}],beforeEnter:function(e,t,r){localStorage.token?r():r("/login")}},{path:"/",component:()=>Promise.all([r.e(0),r.e(1)]).then(r.bind(null,"713b")),children:[{path:"/register",component:()=>Promise.all([r.e(0),r.e(3)]).then(r.bind(null,"56b4"))}],beforeEnter:H},{path:"/",component:()=>Promise.all([r.e(0),r.e(1)]).then(r.bind(null,"713b")),children:[{path:"/login",component:()=>Promise.all([r.e(0),r.e(5)]).then(r.bind(null,"013f"))}],beforeEnter:H}];var Z=Q;s["a"].use(J["a"]);var G=function(){const e=new J["a"]({scrollBehavior:()=>({x:0,y:0}),routes:Z,mode:"hash",base:""});return e},W=async function(){const e="function"===typeof F?await F({Vue:s["a"]}):F,t="function"===typeof G?await G({Vue:s["a"],store:e}):G;e.$router=t;const r={router:t,store:e,render:e=>e(v),el:"#q-app"};return{app:r,store:e,router:t}};s["a"].prototype.$axios=_.a;const X="";async function Y(){const{app:e,store:t,router:r}=await W();let n=!1;const o=e=>{n=!0;const t=Object(e)===e?r.resolve(e).route.fullPath:e;window.location.href=t},a=window.location.href.replace(window.location.origin,""),i=[void 0];for(let c=0;!1===n&&c<i.length;c++)if("function"===typeof i[c])try{await i[c]({app:e,router:r,store:t,Vue:s["a"],ssrContext:null,redirect:o,urlPath:a,publicPath:X})}catch(l){return l&&l.url?void(window.location.href=l.url):void console.error("[Quasar] boot error:",l)}!0!==n&&new s["a"](e)}Y()}});