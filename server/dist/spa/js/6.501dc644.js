(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"2bb2":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"container-2 q-pa-md"},[a("div",{staticClass:"camera-frame q-pa-md"},[t.imageCaptured?t._e():a("video",{ref:"video",staticClass:"full-width",attrs:{autoplay:""}}),a("canvas",{directives:[{name:"show",rawName:"v-show",value:t.imageCaptured,expression:"imageCaptured"}],ref:"canvas",staticClass:"full-width",attrs:{height:"240"}})]),this.errorMessage?a("q-banner",{staticClass:"text-white bg-red q-mt-lg q-pa-md",attrs:{dense:"","inline-actions":""}},[t._v("\n    "+t._s(t.errorMessage)+"\n  ")]):t._e(),a("div",{staticClass:"text-center q-pa-md"},[t.hasCamera?a("q-btn",{attrs:{disable:t.imageCaptured,round:"",color:"grey-10",size:"16px",icon:"eva-camera"},on:{click:t.capturePhoto}}):t._e(),a("div",{staticClass:"row justify-center q-ma-md"},[a("q-file",{staticClass:"col col-sm-6",attrs:{accept:".jpg,.png,image/*",color:"blue-10",label:"Choose an image"},on:{input:t.grabImage},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"eva-image"}})]},proxy:!0}]),model:{value:t.imageUpload,callback:function(e){t.imageUpload=e},expression:"imageUpload"}})],1),a("div",{staticClass:"row justify-center q-ma-md"},[a("q-input",{staticClass:"col col-sm-6",attrs:{label:"Caption",dense:""},model:{value:t.post.caption,callback:function(e){t.$set(t.post,"caption",e)},expression:"post.caption"}})],1),a("div",{staticClass:"row justify-center q-ma-md"},[a("q-input",{staticClass:"col col-sm-6",attrs:{loading:t.loadingState,label:"Location",dense:""},scopedSlots:t._u([{key:"append",fn:function(){return[!t.loadingState||t.locationSupport?a("q-btn",{attrs:{round:"",dense:"",flat:"",icon:"place"},on:{click:t.getLocation}}):t._e()]},proxy:!0}]),model:{value:t.post.location,callback:function(e){t.$set(t.post,"location",e)},expression:"post.location"}})],1),a("div",{staticClass:"row justify-center q-mt-lg"},[a("q-btn",{attrs:{disable:!t.imageCaptured,unelevated:"",rounded:"",color:"primary",label:"Share"},on:{click:function(e){return t.addPost()}}})],1)],1)],1)},o=[],s=a("ded3"),n=a.n(s),r=(a("c19f"),a("ace4"),a("5cc6"),a("2f62"));const c="https://lit-citadel-51863.herokuapp.com/posts/add";a("121f");var l={name:"Camera",data(){return{post:{caption:"",location:"",image:null,date:Date.now()},imageCaptured:!1,imageUpload:[],hasCamera:!0,errorMessage:"",loadingState:!1}},computed:n()(n()({},Object(r["c"])("user",["getToken"])),{},{locationSupport(){if(!("geolocation"in navigator))return!1}}),methods:n()(n()({initCamera(){navigator.mediaDevices.getUserMedia({video:!0}).then((t=>{this.$refs.video.srcObject=t})).catch((()=>{this.hasCamera=!1}))},capturePhoto(){let t=this.$refs.video,e=this.$refs.canvas;e.width=t.getBoundingClientRect().width,e.height=t.getBoundingClientRect().height;let a=e.getContext("2d");a.drawImage(t,0,0,e.width,e.height),this.imageCaptured=!0,this.post.image=this.dataURItoBlob(e.toDataUrl()),this.disableCamera()},grabImage(t){this.post.image=t;let e=this.$refs.canvas,a=e.getContext("2d");var i=new FileReader;i.onload=t=>{var i=new Image;i.onload=()=>{e.width=i.width,e.height=i.height,a.drawImage(i,0,0),this.imageCaptured=!0,this.disableCamera()},i.src=t.target.result},i.readAsDataURL(t)},disableCamera(){this.$refs.video.srcObject.getVideoTracks().forEach((t=>{t.stop()}))},dataURItoBlob(t){for(var e=atob(t.split(",")[1]),a=t.split(",")[0].split(":")[1].split(";")[0],i=new ArrayBuffer(e.length),o=new Uint8Array(i),s=0;s<e.length;s++)o[s]=e.charCodeAt(s);var n=new Blob([i],{type:a});return n},getLocation(){this.loadingState=!0,navigator.geolocation.getCurrentPosition((t=>{this.getExactLocation(t)}),(t=>{this.errorMessage=t.message,this.loadingState=!1}),{timeout:8e3})},getExactLocation(t){let e=`https://geocode.xyz/${t.coords.latitude},${t.coords.longitude}?json=1`;this.$axios.get(e).then((t=>{this.getLocationFromApi(t)})).catch((t=>{this.errorMessage=t.message,this.loadingState=!1}))},getLocationFromApi(t){this.post.location=t.data.city,t.data.country&&(this.post.location+=`, ${t.data.country}`),this.loadingState=!1}},Object(r["b"])("vibe",["fetchVibes"])),{},{addPost(){this.$q.loading.show();let t=new FormData;t.append("caption",this.post.caption),t.append("date",this.post.date),t.append("location",this.post.location),t.append("image",this.post.image),this.$axios.post(c,t,{headers:{authorization:`Bearer ${localStorage.token}`}}).then((t=>{this.$router.push("/"),this.$q.notify({message:"Successful, redirecting...",color:"positive",actions:[{label:"Dismiss",color:"white"}]}),this.$q.loading.hide()})).catch((t=>{console.log(t.response),this.errorMessage="Unable to create the vibe",this.$q.loading.hide()}))}}),mounted(){this.initCamera()},beforeDestroy(){this.hasCamera&&this.disableCamera()}},d=l,p=(a("8f36"),a("2877")),h=a("9989"),g=a("54e1"),u=a("9c40"),m=a("7d53"),f=a("0016"),b=a("27f9"),v=a("eebe"),C=a.n(v),w=Object(p["a"])(d,i,o,!1,null,null,null);e["default"]=w.exports;C()(w,"components",{QPage:h["a"],QBanner:g["a"],QBtn:u["a"],QFile:m["a"],QIcon:f["a"],QInput:b["a"]})},"8f36":function(t,e,a){"use strict";a("c0e7")},c0e7:function(t,e,a){}}]);