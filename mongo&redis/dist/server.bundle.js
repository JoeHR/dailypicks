!function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=15)}([function(e,t){e.exports=require("koa-router")},function(e,t){e.exports=require("koa")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("koa-helmet")},function(e,t){e.exports=require("koa-static")},function(e,t){e.exports=require("koa-combine-routers")},function(e,t){e.exports=require("svg-captcha")},function(e,t){e.exports=require("nodemailer")},function(e,t){e.exports=require("moment")},function(e,t){e.exports=require("koa-body")},function(e,t){e.exports=require("koa-json")},function(e,t){e.exports=require("@koa/cors")},function(e,t){e.exports=require("koa-compose")},function(e,t){e.exports=require("koa-compress")},function(e,t,o){"use strict";var r=o(5),n=o.n(r),i=o(0),a=o.n(i),c=o(6),s=o.n(c);var u=new class{constructor(){}async getCaptcha(e){const t=s.a.create({size:4,ignoreChars:"0o1il",color:!0,noise:Math.floor(5*Math.random()),width:150,height:38});e.body={code:200,data:t.data}}};const p=new a.a;p.get("/getCaptcha",u.getCaptcha);var d=p,l=o(7),f=o.n(l);var m=async function(e){let t=f.a.createTransport({host:"smtp.qq.com",port:587,secure:!1,auth:{user:"imoocbrian@qq.com",pass:"rbkcbxwrurygjfca"}});return(await t.sendMail({from:'"认证邮件" <imoocbrian@qq.com>',to:e.email,subject:""!==e.user?`你好开发者，${e.user}！《慕课网前端全栈实践》注册码`:"《慕课网前端全栈实践》注册码",text:`您在《慕课网前端全栈实践》课程中注册，您的邀请码是${e.code},邀请码的过期时间: ${e.expire}`,html:`\n        <div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">\n        <div style="height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;">Imooc社区——欢迎来到官方社区</div>\n        <div style="padding: 25px">\n          <div>您好，${e.user}童鞋，重置链接有效时间30分钟，请在${e.expire}之前重置您的密码：</div>\n          <a href="http://www.imooc.com" style="padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;">立即重置密码</a>\n          <div style="padding: 5px; background: #f2f2f2;">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>\n        </div>\n        <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">系统邮件，请勿直接回复</div>\n    </div>\n    `})).messageId},x=o(8),b=o.n(x);var g=new class{constructor(){}async forget(e){const{body:t}=e.request;console.log(t);try{let o=await m({code:"1234",expire:b()().add(30,"minutes").format("YYYY-MM-DD HH:mm:ss"),email:t.username,user:"Brian"});e.body={code:200,data:o,msg:"邮件发送成功"}}catch(e){console.log(e)}}};const h=new a.a;h.post("/forget",g.forget);var y=h;t.a=n()(d,y)},function(e,t,o){"use strict";o.r(t),function(e){var t=o(1),r=o.n(t),n=o(2),i=o.n(n),a=o(3),c=o.n(a),s=o(4),u=o.n(s),p=o(14),d=o(9),l=o.n(d),f=o(10),m=o.n(f),x=o(11),b=o.n(x),g=o(12),h=o.n(g),y=o(13),v=o.n(y);const q=new r.a,k=h()([l()(),u()(i.a.join(e,"../public")),b()(),m()({pretty:!1,param:"pretty"}),c()()]);q.use(v()()),q.use(k),q.use(Object(p.a)()),q.listen(3e3)}.call(this,"src")}]);