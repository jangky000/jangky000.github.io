(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[591],{33443:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/experimentals/mobilenet",function(){return n(90132)}])},27746:function(e,t,n){"use strict";n.d(t,{_:function(){return o}});var i=n(85893),r=n(51857),c=n.n(r);let a=new String("span.jsx-d781c217aee5da50{-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;font-weight:bold;opacity:.8;padding:0 .5rem;font-size:.8rem}");a.__hash="d781c217aee5da50";let s={new:{bgc:"#ec2F4B",c:"#fff"},reference:{bgc:"#009FFF",c:"#fff"},summary:{bgc:"#FFB75E",c:"#fff"}},o=e=>{let{label:t,children:n}=e;return(0,i.jsxs)("span",{className:"jsx-".concat(a.__hash)+" "+c().dynamic([["7e461612c3cf4703",[s[t].bgc,s[t].c]]]),children:[n,(0,i.jsx)(c(),{id:a.__hash,children:a}),(0,i.jsx)(c(),{id:"7e461612c3cf4703",dynamic:[s[t].bgc,s[t].c],children:"span.__jsx-style-dynamic-selector{background-color:".concat(s[t].bgc,";color:").concat(s[t].c,"}")})]})}},51958:function(e,t,n){"use strict";var i=n(85893),r=n(45835),c=n(9008),a=n.n(c);t.Z=function(e){var t,n;let{seoInfo:c,usePersonRichSnippet:s=!1}=e,o=null!==(t=null==c?void 0:c.title)&&void 0!==t?t:r.O.title,l=null!==(n=null==c?void 0:c.desc)&&void 0!==n?n:r.O.description,u=(null==c?void 0:c.desc)?"article":"website";return(0,i.jsxs)(a(),{children:[(0,i.jsx)("title",{children:o}),(0,i.jsx)("meta",{name:"title",content:o}),(0,i.jsx)("meta",{name:"keywords",content:"FE, ReactJS, NextJS, javascript, typescript"}),(0,i.jsx)("meta",{name:"description",content:l}),(0,i.jsx)("meta",{httpEquiv:"Title",content:o}),(0,i.jsx)("meta",{httpEquiv:"Subject",content:l}),(0,i.jsx)("meta",{property:"og:type",content:u}),(0,i.jsx)("meta",{property:"og:url",content:"https://jangky000.github.io"}),(0,i.jsx)("meta",{property:"og:title",content:o}),(0,i.jsx)("meta",{property:"og:image",content:"https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"}),(0,i.jsx)("meta",{property:"og:description",content:l}),(0,i.jsx)("meta",{property:"og:site_name",content:r.O.title}),(0,i.jsx)("meta",{property:"og:locale",content:"ko_KR"}),(0,i.jsx)("meta",{property:"og:image:width",content:"316"}),(0,i.jsx)("meta",{property:"og:image:height",content:"562"}),(0,i.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,i.jsx)("meta",{name:"twitter:title",content:o}),(0,i.jsx)("meta",{name:"twitter:description",content:l}),(0,i.jsx)("meta",{name:"twitter:image",content:"https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"}),s&&(0,i.jsx)("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"Person",name:r.O.author,url:r.O.url,sameAs:[r.O.github]})})]})}},34746:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var i=n(85893),r=n(70848),c=n(76322),a=n(27746),s=n(93842),o=n(7297),l=n(77366),u=n(31850);function d(){let e=(0,o.Z)(["\n  label: gallery-detail-layout;\n\n  min-height: calc(var(--vh, 1vh) * 90);\n  display: flex;\n  flex-direction: column;\n\n  .gallery-content {\n    flex: 1;\n    margin: 20px auto;\n    max-width: ",";\n    width: ",";\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .gallery-reference {\n    margin: 0 auto;\n    max-width: ",";\n    width: ",";\n    display: flex;\n    gap: 0.5rem;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    a {\n      flex: 1;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n  }\n"]);return d=function(){return e},e}let m=l.Z.div(d(),u.Z.CONTENT_MAX_WIDTH,u.Z.CONTENT_WIDTH,u.Z.CONTENT_MAX_WIDTH,u.Z.CONTENT_WIDTH);var p=function(e){let{url:t,children:n}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(m,{children:[(0,i.jsx)(c.h,{}),(0,i.jsx)("div",{className:"gallery-content",children:n}),(0,i.jsxs)("div",{className:"gallery-reference",children:[(0,i.jsx)(a._,{label:"reference",children:"Source code"}),(0,i.jsx)("a",{href:t,children:t})]})]}),(0,i.jsx)(s.H,{repo:"jangky000/jangky000.github.io",theme:"github-light",issueTerm:"pathname"}),(0,i.jsx)(r.$,{})]})}},90132:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m},meta:function(){return d}});var i=n(85893),r=n(30784),c=n(15814),a=n(67294),s=function(){let e=(0,a.useRef)(null),t=(0,a.useRef)(null),n=async()=>{var n;let i=await r.z(),a=null!==(n=e.current)&&void 0!==n?n:void 0,s=await c.aTG.webcam(a,{resizeWidth:220,resizeHeight:227});for(;;){let o=await s.capture(),l=await i.classify(o);t.current&&(t.current.innerText="prediction : ".concat(l[0].className," \n probability: ").concat(l[0].probability)),o.dispose(),await c.glt()}};return(0,a.useEffect)(()=>{n()},[n]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{ref:t}),(0,i.jsx)("video",{autoPlay:!0,playsInline:!0,muted:!0,ref:e,width:"220",height:"227"})]})},o=n(51958),l=n(79104),u=n(34746);let d={subUrl:"mobilenet",title:"이미지 분류",tagList:["Tensorflow.js","mobilenet"],desc:"이미지 분류 예제"};var m=function(){return(0,i.jsxs)(u.Z,{url:"",children:[(0,i.jsx)(o.Z,{seoInfo:d}),(0,i.jsx)(l.Z,{children:(0,i.jsx)(s,{})})]})}},75410:function(){},48628:function(){},31601:function(){},67792:function(){},34977:function(){},75042:function(){}},function(e){e.O(0,[296,723,864,132,773,974,904,689,876,769,784,107,774,888,179],function(){return e(e.s=33443)}),_N_E=e.O()}]);
//# sourceMappingURL=mobilenet-8f5d72188af55d35.js.map