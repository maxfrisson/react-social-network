(this["webpackJsonp01-first"]=this["webpackJsonp01-first"]||[]).push([[4],{296:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__1KJsj",dialogsContent:"Dialogs_dialogsContent__23Ao5",dialogsItems:"Dialogs_dialogsItems__tqyTr",active:"Dialogs_active__Kjiot",dialog:"Dialogs_dialog__2MaQb",activeLink:"Dialogs_activeLink__2_Dtq",messages:"Dialogs_messages__3__3j",message:"Dialogs_message__3bJ2W"}},302:function(e,s,a){"use strict";a.r(s);var t=a(13),i=a(10),n=a(5),c=a(28),o=a(29),r=a(31),d=a(30),l=a(0),j=a.n(l),g=a(7),u=a(1),b=function(e){return{isAuth:e.auth.isAuth}},m=a(127),O=a(128),h=a(129),_=a(75),f=a(64),v=a(296),x=a.n(v),p=a(18),D=function(e){var s="/dialogs/"+e.id;return Object(u.jsx)("div",{className:x.a.dialog,children:Object(u.jsx)(p.b,{to:s,activeClassName:x.a.activeLink,children:e.name})})},A=function(e){return Object(u.jsx)("div",{className:x.a.message,children:e.message})},N=Object(_.a)(30),k=Object(h.a)({form:"dialogsAddMessageForm"})((function(e){return Object(u.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(u.jsx)("div",{children:Object(u.jsx)(O.a,{name:"newMessageBody",placeholder:"Enter your message here...",component:f.b,validate:[_.b,N]})}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{children:"Send"})})]})})),y=function(e){var s=e.dialogsPage.dialogs.map((function(e){return Object(u.jsx)(D,{name:e.name,id:e.id},e.id)})),a=e.dialogsPage.messages.map((function(e){return Object(u.jsx)(A,{message:e.message},e.id)}));return e.isAuth?Object(u.jsxs)("div",{className:x.a.dialogs,children:[Object(u.jsx)("h2",{children:"DIALOGS"}),Object(u.jsxs)("div",{className:x.a.dialogsContent,children:[Object(u.jsx)("div",{className:x.a.dialogsItems,children:s}),Object(u.jsxs)("div",{className:x.a.messages,children:[a,Object(u.jsx)(k,{onSubmit:function(s){e.addMessage(s.newMessageBody)}})]})]})]}):Object(u.jsx)(g.a,{to:"/login"})};s.default=Object(i.d)(Object(t.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{addMessage:function(s){e(Object(m.a)(s))}}})),(function(e){var s=function(s){Object(r.a)(t,s);var a=Object(d.a)(t);function t(){return Object(c.a)(this,t),a.apply(this,arguments)}return Object(o.a)(t,[{key:"render",value:function(){return this.props.isAuth?Object(u.jsx)(e,Object(n.a)({},this.props)):Object(u.jsx)(g.a,{to:"/login"})}}]),t}(j.a.Component);return Object(t.b)(b)(s)}))(y)}}]);
//# sourceMappingURL=4.0a727cfb.chunk.js.map