(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{48312:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(88809)}])},88809:function(t,e,n){"use strict";n.r(e),n.d(e,{__N_SSG:function(){return t$},default:function(){return tz}});var i=n(85893),r=n(2734),o=n(67294),a=n.t(o,2),s=n(34168),l=n(20539),u=n(16600).Z;function d(t,e,n,i,r){let[a,s]=o.useState(()=>r&&n?n(t).matches:i?i(t).matches:e);return u(()=>{let e=!0;if(!n)return;let i=n(t),r=()=>{e&&s(i.matches)};return r(),i.addListener(r),()=>{e=!1,i.removeListener(r)}},[t,n]),a}let c=a.useSyncExternalStore;function p(t,e,n,i,r){let a=o.useCallback(()=>e,[e]),s=o.useMemo(()=>{if(r&&n)return()=>n(t).matches;if(null!==i){let{matches:e}=i(t);return()=>e}return a},[a,t,i,r,n]),[l,u]=o.useMemo(()=>{if(null===n)return[a,()=>()=>{}];let e=n(t);return[()=>e.matches,t=>(e.addListener(t),()=>{e.removeListener(t)})]},[a,n,t]),d=c(u,l,s);return d}var h=n(7297),f=n(77366),m=n(41664),x=n.n(m);function g(){let t=(0,h.Z)(["\n  label: github-link;\n\n  .url {\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n  }\n"]);return g=function(){return t},t}function v(){let t=(0,h.Z)(["\n  label: github-icon;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 0.1rem;\n\n  img {\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .title {\n    font-weight: bold;\n  }\n"]);return v=function(){return t},t}let b=(0,f.Z)(x())(g()),E=f.Z.div(v());var w=function(t){let{url:e}=t,n=(0,r.Z)(),o=function(t,e={}){let n=(0,s.Z)(),i="undefined"!=typeof window&&void 0!==window.matchMedia,{defaultMatches:r=!1,matchMedia:o=i?window.matchMedia:null,ssrMatchMedia:a=null,noSsr:u=!1}=(0,l.Z)({name:"MuiUseMediaQuery",props:e,theme:n}),h="function"==typeof t?t(n):t;h=h.replace(/^@media( ?)/m,"");let f=(void 0!==c?p:d)(h,r,o,a,u);return f}(n.breakpoints.down("md"));return(0,i.jsx)(b,{href:e,passHref:!0,children:(0,i.jsxs)("a",{children:[(0,i.jsxs)(E,{children:[(0,i.jsx)("img",{src:"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",alt:"github-icon"}),(0,i.jsx)("div",{className:"title",children:"GitHub"})]}),(0,i.jsx)("div",{className:"url",children:o?e.replace("blob/master/issues/",""):e})]})})},Z=n(31850);function y(){let t=(0,h.Z)(["\n  list-style: none;\n  padding: 0.5rem;\n  border: 1px solid #ddd;\n  border-radius: 0.5rem;\n\n  display: grid;\n  // 좁은 화면\n  @media (max-width: ","px) {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  // 넓은 화면\n  @media (min-width: ","px) {\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  }\n  gap: 0.5rem;\n\n  li {\n    padding: 0.5rem 1rem;\n    border-radius: 0.5rem;\n    border: 1px solid #ddd;\n    &:hover {\n      cursor: pointer;\n      color: #77f;\n    }\n  }\n"]);return y=function(){return t},t}let S=f.Z.ul(y(),Z.Z.BREAK_POINTS.md,Z.Z.BREAK_POINTS.md);var C=function(t){let{urls:e}=t;return(0,i.jsx)(S,{children:e.map(t=>(0,i.jsx)("li",{children:(0,i.jsx)(w,{url:t})},t))})},N=n(70848),j=n(76322),T=n(51958),k=n(54695),_=n(60916),R=n(86010),O=n(78883),M=n(86523),I=n(39707),D=n(96682);let L=["className","component"];var A=n(37078),P=n(44551),W=n(10606);let B=(0,P.Z)(),$=function(t={}){let{themeId:e,defaultTheme:n,defaultClassName:r="MuiBox-root",generateClassName:a}=t,s=(0,O.ZP)("div",{shouldForwardProp:t=>"theme"!==t&&"sx"!==t&&"as"!==t})(M.Z),l=o.forwardRef(function(t,o){let l=(0,D.Z)(n),u=(0,I.Z)(t),{className:d,component:c="div"}=u,p=(0,_.Z)(u,L);return(0,i.jsx)(s,(0,k.Z)({as:c,ref:o,className:(0,R.Z)(d,a?a(r):r),theme:e&&l[e]||l},p))});return l}({themeId:W.Z,defaultTheme:B,defaultClassName:"MuiBox-root",generateClassName:A.Z.generate});function z(){let t=(0,h.Z)(["\n  font-size: 1.5rem;\n  line-height: 2rem;\n  font-weight: bold;\n  font-style: italic;\n  margin-bottom: 1rem;\n  width: fit-content;\n  padding: 0 0.5rem;\n  border-radius: 0.5rem 0;\n  display: inline-block;\n"]);return z=function(){return t},t}let F=(0,f.Z)($)(z());var G=function(t){let{children:e}=t;return(0,i.jsx)(F,{boxShadow:2,children:"".concat(e," !!")})},V=n(53282),X=n(30381),H=n.n(X);function U(){return H()().zone("+09:00").startOf("day")}let J=t=>t(),K="experimental_visit";function Q(){let t=J(()=>localStorage.getItem(K));if(!t)return 1;let e=JSON.parse(t);return!(e&&"object"==typeof e&&"nextCount"in e&&"timestamp"in e&&"number"==typeof e.nextCount&&"number"==typeof e.timestamp)||function(t){var e;let n=(e=t.timestamp,H()(e).zone("+09:00")).diff(U(),"day");return n>=1}(e)?1:e.nextCount}var q=n(90948),Y=n(32793),tt=n(1048),te=n(63366),tn=n(75068);n(66149);var ti=n(73935),tr={disabled:!1},to=n(220),ta="unmounted",ts="exited",tl="entering",tu="entered",td="exiting",tc=function(t){function e(e,n){i=t.call(this,e,n)||this;var i,r,o=n&&!n.isMounting?e.enter:e.appear;return i.appearStatus=null,e.in?o?(r=ts,i.appearStatus=tl):r=tu:r=e.unmountOnExit||e.mountOnEnter?ta:ts,i.state={status:r},i.nextCallback=null,i}(0,tn.Z)(e,t),e.getDerivedStateFromProps=function(t,e){return t.in&&e.status===ta?{status:ts}:null};var n=e.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(t){var e=null;if(t!==this.props){var n=this.state.status;this.props.in?n!==tl&&n!==tu&&(e=tl):(n===tl||n===tu)&&(e=td)}this.updateStatus(!1,e)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var t,e,n,i=this.props.timeout;return t=e=n=i,null!=i&&"number"!=typeof i&&(t=i.exit,e=i.enter,n=void 0!==i.appear?i.appear:e),{exit:t,enter:e,appear:n}},n.updateStatus=function(t,e){if(void 0===t&&(t=!1),null!==e){if(this.cancelNextCallback(),e===tl){if(this.props.unmountOnExit||this.props.mountOnEnter){var n=this.props.nodeRef?this.props.nodeRef.current:ti.findDOMNode(this);n&&n.scrollTop}this.performEnter(t)}else this.performExit()}else this.props.unmountOnExit&&this.state.status===ts&&this.setState({status:ta})},n.performEnter=function(t){var e=this,n=this.props.enter,i=this.context?this.context.isMounting:t,r=this.props.nodeRef?[i]:[ti.findDOMNode(this),i],o=r[0],a=r[1],s=this.getTimeouts(),l=i?s.appear:s.enter;if(!t&&!n||tr.disabled){this.safeSetState({status:tu},function(){e.props.onEntered(o)});return}this.props.onEnter(o,a),this.safeSetState({status:tl},function(){e.props.onEntering(o,a),e.onTransitionEnd(l,function(){e.safeSetState({status:tu},function(){e.props.onEntered(o,a)})})})},n.performExit=function(){var t=this,e=this.props.exit,n=this.getTimeouts(),i=this.props.nodeRef?void 0:ti.findDOMNode(this);if(!e||tr.disabled){this.safeSetState({status:ts},function(){t.props.onExited(i)});return}this.props.onExit(i),this.safeSetState({status:td},function(){t.props.onExiting(i),t.onTransitionEnd(n.exit,function(){t.safeSetState({status:ts},function(){t.props.onExited(i)})})})},n.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(t,e){e=this.setNextCallback(e),this.setState(t,e)},n.setNextCallback=function(t){var e=this,n=!0;return this.nextCallback=function(i){n&&(n=!1,e.nextCallback=null,t(i))},this.nextCallback.cancel=function(){n=!1},this.nextCallback},n.onTransitionEnd=function(t,e){this.setNextCallback(e);var n=this.props.nodeRef?this.props.nodeRef.current:ti.findDOMNode(this),i=null==t&&!this.props.addEndListener;if(!n||i){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var r=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],o=r[0],a=r[1];this.props.addEndListener(o,a)}null!=t&&setTimeout(this.nextCallback,t)},n.render=function(){var t=this.state.status;if(t===ta)return null;var e=this.props,n=e.children,i=(e.in,e.mountOnEnter,e.unmountOnExit,e.appear,e.enter,e.exit,e.timeout,e.addEndListener,e.onEnter,e.onEntering,e.onEntered,e.onExit,e.onExiting,e.onExited,e.nodeRef,(0,te.Z)(e,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return o.createElement(to.Z.Provider,{value:null},"function"==typeof n?n(t,i):o.cloneElement(o.Children.only(n),i))},e}(o.Component);function tp(){}tc.contextType=to.Z,tc.propTypes={},tc.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:tp,onEntering:tp,onEntered:tp,onExit:tp,onExiting:tp,onExited:tp},tc.UNMOUNTED=ta,tc.EXITED=ts,tc.ENTERING=tl,tc.ENTERED=tu,tc.EXITING=td;let th=t=>t.scrollTop;function tf(t,e){var n,i;let{timeout:r,easing:o,style:a={}}=t;return{duration:null!=(n=a.transitionDuration)?n:"number"==typeof r?r:r[e.mode]||0,easing:null!=(i=a.transitionTimingFunction)?i:"object"==typeof o?o[e.mode]:o,delay:a.transitionDelay}}var tm=n(51705);let tx=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],tg={entering:{opacity:1},entered:{opacity:1}},tv=o.forwardRef(function(t,e){let n=(0,r.Z)(),a={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:s,appear:l=!0,children:u,easing:d,in:c,onEnter:p,onEntered:h,onEntering:f,onExit:m,onExited:x,onExiting:g,style:v,timeout:b=a,TransitionComponent:E=tc}=t,w=(0,tt.Z)(t,tx),Z=o.useRef(null),y=(0,tm.Z)(Z,u.ref,e),S=t=>e=>{if(t){let n=Z.current;void 0===e?t(n):t(n,e)}},C=S(f),N=S((t,e)=>{th(t);let i=tf({style:v,timeout:b,easing:d},{mode:"enter"});t.style.webkitTransition=n.transitions.create("opacity",i),t.style.transition=n.transitions.create("opacity",i),p&&p(t,e)}),j=S(h),T=S(g),k=S(t=>{let e=tf({style:v,timeout:b,easing:d},{mode:"exit"});t.style.webkitTransition=n.transitions.create("opacity",e),t.style.transition=n.transitions.create("opacity",e),m&&m(t)}),_=S(x),R=t=>{s&&s(Z.current,t)};return(0,i.jsx)(E,(0,Y.Z)({appear:l,in:c,nodeRef:Z,onEnter:N,onEntered:j,onEntering:C,onExit:k,onExited:_,onExiting:T,addEndListener:R,timeout:b},w,{children:(t,e)=>o.cloneElement(u,(0,Y.Z)({style:(0,Y.Z)({opacity:0,visibility:"exited"!==t||c?void 0:"hidden"},tg[t],v,u.props.style),ref:y},e))}))});function tb(t){let[e,n]=(0,o.useState)(null!=t&&t),i=(0,o.useCallback)(()=>n(!0),[]),r=(0,o.useCallback)(()=>n(!1),[]),a=(0,o.useCallback)(()=>n(t=>!t),[]);return{isOn:e,on:i,off:r,toggle:a}}let tE=(0,q.ZP)("div")({position:"fixed",top:0,bottom:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.1)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1});var tw=function(t){let{isOpen:e,closeAfterTime:n=5e3}=t,{isOn:r,on:a,off:s}=tb(),l=(0,o.useRef)();return(0,o.useEffect)(()=>(e&&(a(),l.current=window.setTimeout(s,n)),()=>window.clearTimeout(l.current)),[e]),(0,i.jsx)(tv,{in:r,timeout:2e3,children:(0,i.jsx)(tE,{onClick:s,children:(0,i.jsx)(V.Z,{count:Q()-1,scale:2})})})},tZ=n(31536),ty=n(94780),tS=n(41796),tC=n(71657),tN=n(1588),tj=n(34867);function tT(t){return(0,tj.Z)("MuiDivider",t)}(0,tN.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);let tk=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],t_=t=>{let{absolute:e,children:n,classes:i,flexItem:r,light:o,orientation:a,textAlign:s,variant:l}=t;return(0,ty.Z)({root:["root",e&&"absolute",l,o&&"light","vertical"===a&&"vertical",r&&"flexItem",n&&"withChildren",n&&"vertical"===a&&"withChildrenVertical","right"===s&&"vertical"!==a&&"textAlignRight","left"===s&&"vertical"!==a&&"textAlignLeft"],wrapper:["wrapper","vertical"===a&&"wrapperVertical"]},tT,i)},tR=(0,q.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver(t,e){let{ownerState:n}=t;return[e.root,n.absolute&&e.absolute,e[n.variant],n.light&&e.light,"vertical"===n.orientation&&e.vertical,n.flexItem&&e.flexItem,n.children&&e.withChildren,n.children&&"vertical"===n.orientation&&e.withChildrenVertical,"right"===n.textAlign&&"vertical"!==n.orientation&&e.textAlignRight,"left"===n.textAlign&&"vertical"!==n.orientation&&e.textAlignLeft]}})(({theme:t,ownerState:e})=>(0,Y.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},e.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},e.light&&{borderColor:t.vars?`rgba(${t.vars.palette.dividerChannel} / 0.08)`:(0,tS.Fq)(t.palette.divider,.08)},"inset"===e.variant&&{marginLeft:72},"middle"===e.variant&&"horizontal"===e.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===e.variant&&"vertical"===e.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===e.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},e.flexItem&&{alignSelf:"stretch",height:"auto"}),({theme:t,ownerState:e})=>(0,Y.Z)({},e.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:`thin solid ${(t.vars||t).palette.divider}`,top:"50%",content:'""',transform:"translateY(50%)"}}),({theme:t,ownerState:e})=>(0,Y.Z)({},e.children&&"vertical"===e.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:`thin solid ${(t.vars||t).palette.divider}`,transform:"translateX(0%)"}}),({ownerState:t})=>(0,Y.Z)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),tO=(0,q.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver(t,e){let{ownerState:n}=t;return[e.wrapper,"vertical"===n.orientation&&e.wrapperVertical]}})(({theme:t,ownerState:e})=>(0,Y.Z)({display:"inline-block",paddingLeft:`calc(${t.spacing(1)} * 1.2)`,paddingRight:`calc(${t.spacing(1)} * 1.2)`},"vertical"===e.orientation&&{paddingTop:`calc(${t.spacing(1)} * 1.2)`,paddingBottom:`calc(${t.spacing(1)} * 1.2)`})),tM=o.forwardRef(function(t,e){let n=(0,tC.Z)({props:t,name:"MuiDivider"}),{absolute:r=!1,children:o,className:a,component:s=o?"div":"hr",flexItem:l=!1,light:u=!1,orientation:d="horizontal",role:c="hr"!==s?"separator":void 0,textAlign:p="center",variant:h="fullWidth"}=n,f=(0,tt.Z)(n,tk),m=(0,Y.Z)({},n,{absolute:r,component:s,flexItem:l,light:u,orientation:d,role:c,textAlign:p,variant:h}),x=t_(m);return(0,i.jsx)(tR,(0,Y.Z)({as:s,className:(0,R.Z)(x.root,a),role:c,ref:e,ownerState:m},f,{children:o?(0,i.jsx)(tO,{className:x.wrapper,ownerState:m,children:o}):null}))});function tI(){let t=(0,h.Z)(["\n  label: home-layout;\n\n  margin: 30px auto;\n  width: ",";\n  max-width: ",";\n\n  .introduce {\n    padding: 0.5rem;\n    margin-bottom: 20px;\n  }\n"]);return tI=function(){return t},t}let tD=f.Z.main(tI(),Z.Z.CONTENT_WIDTH,Z.Z.CONTENT_MAX_WIDTH);var tL=n(74531),tA=n.n(tL),tP=n(69770),tW=n(17539);let tB=t=>{let{urls:e}=t,{isOn:n,on:r}=tb();return(0,o.useEffect)(()=>{let t=function(){let t=Q();return function(t){let e={nextCount:t,timestamp:U().valueOf()};J(()=>localStorage.setItem(K,JSON.stringify(e)))}(t+1),t}();console.log("visitCount",t),t%50==0&&r()},[]),(0,i.jsxs)("div",{className:tA().container,children:[(0,i.jsx)(T.Z,{usePersonRichSnippet:!0}),(0,i.jsx)(j.h,{}),(0,i.jsx)(tD,{children:(0,i.jsxs)(tZ.Z,{spacing:4,children:[(0,i.jsxs)("div",{className:"postlist",children:[(0,i.jsx)(x(),{href:"/posts",children:(0,i.jsx)(G,{children:"Posts"})}),(0,i.jsx)(tW.PostListSection,{})]}),(0,i.jsx)(tM,{}),(0,i.jsxs)("div",{className:"galleries",children:[(0,i.jsx)(x(),{href:"/galleries",children:(0,i.jsx)(G,{children:"Galleries"})}),(0,i.jsx)(tP.GalleryListSection,{})]}),(0,i.jsx)(tM,{}),(0,i.jsxs)("div",{children:[(0,i.jsx)(G,{children:"FE News"}),(0,i.jsx)(C,{urls:e.slice(0,10)})]})]})}),(0,i.jsx)(N.$,{}),(0,i.jsx)(tw,{isOpen:n})]})};var t$=!0,tz=tB},74531:function(t){t.exports={container:"Index_container__szTFR",main:"Index_main__TFvkh",button:"Index_button___QimS"}}},function(t){t.O(0,[296,885,689,670,886,857,128,107,539,770,774,888,179],function(){return t(t.s=48312)}),_N_E=t.O()}]);
//# sourceMappingURL=index-dd6a0e97fe3f7825.js.map