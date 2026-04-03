import"./disclose-version.DsnmJJEf.js";import{fZ as _s,aL as yt,em as Ue,b as gn,t as Ss,g as B,aO as Gi,i as Pt,d as oe,f as V,ar as _i,Y as Bt,_ as Y,br as Wr,b4 as Ms,b1 as kt,O as Pe,u as As,T as Mt,h as q,B as K,g8 as on,fV as Si,g7 as we,V as zt,eP as mt,aD as Ts,a6 as Gr,a4 as Ps,e as Ds,c as Bs,C as Mi,am as Yn,R as De,n as Kn,ft as Ai,S as Ti,M as Ht,aF as qr,c1 as zs,w as Q,aG as Zr,eF as Es,b9 as Qn,ac as te,fP as Cs,a5 as Is,e3 as Us,Q as Mn,a3 as be,ai as Jn,g6 as at,as as Xr,fG as Jt,D as Rs,aI as Yr,U as Fs,dU as an,o as qi,bW as Os,eD as Ls,ad as ks,N as pt,I as Ns,s as Vs,dh as Pi,bD as dn,aW as Be,H as hn,au as $s,b0 as Hs,aK as js,a as Ws,a2 as Gs}from"./observe.svelte.CpLsxWCV.js";/* empty css                                                      */import{e as ee,g as X,h as ne,_ as Kr,aD as qs,aE as Zs,p as Di,$ as Zi,f as _e,a as Bi,n as zi,s as An,a8 as Xs}from"./runtime.BsM9HEgF.js";import{u as Ei}from"./useTask.svelte.D-lvA5bL.js";import{c as Ci,a as Se,f as Qr}from"./template.BGiQ9W-B.js";import{s as Ii}from"./snippet.pNoFfLl0.js";import{i as Xi}from"./if.DEmLpFs9.js";import{c as Tn}from"./svelte-component.BIfa6ww3.js";import{p as At,s as Jr,r as ts}from"./props.BdgQxxOQ.js";import{a as Yi,s as Ys}from"./store.BuonI5uc.js";import{w as pn,d as ti,r as Ks}from"./index.ujCWyV9u.js";import{a as Qs}from"./index-client.D_TSzqy_.js";import{u as Js}from"./useStage.GPR6E9rH.js";import{i as es}from"./injectPlugin.oLpntuRh.js";import{t as to}from"./transitions.CSu2MFFA.js";const cn=n=>{const t=pn(void 0),e=pn(void 0);return n.then(i=>{t.set(i)}).catch(i=>{console.error("Error in asyncWritable:",i.message),e.set(i)}),Object.assign(Object.assign(n,t),{error:e,promise:n})};function eo(n,t){const{remember:e,clear:i}=_s();let r;const o=()=>{const a=new n(...t?.args??[]);return t?.extend?.(a),a};return{load:(a,u)=>{const f=async h=>{if(r||(r=o()),"loadAsync"in r){const l=await r.loadAsync(h,u?.onProgress);return u?.transform?.(l)??l}else return new Promise((l,d)=>{r.load(h,m=>l(u?.transform?.(m)??m),m=>u?.onProgress?.(m),d)})};if(Array.isArray(a)){const h=a.map(d=>e(()=>f(d),[n,d]));return cn(Promise.all(h))}else if(typeof a=="string"){const h=e(()=>f(a),[n,a]);return cn(h)}else{const h=Object.values(a).map(d=>e(()=>f(d),[n,d]));return cn(Promise.all(h).then(d=>Object.fromEntries(Object.entries(a).map(([m],x)=>[m,d[x]]))))}},clear:a=>{Array.isArray(a)?a.forEach(u=>{i([n,u])}):typeof a=="string"?i([n,a]):Object.entries(a).forEach(([,u])=>{i([n,u])})},loader:r}}const Ct=n=>({subscribe:n.subscribe,get current(){return n.current}});let Me=0;const Ui=yt(!1),xn=yt(!1),Ri=yt(void 0),Fi=yt(0),Oi=yt(0),ns=yt([]),Li=yt(0),{onStart:no,onLoad:io,onError:ro}=Ue;Ue.onStart=(n,t,e)=>{no?.(n,t,e),xn.set(!0),Ri.set(n),Fi.set(t),Oi.set(e);const i=(t-Me)/(e-Me);Li.set(i),i===1&&Ui.set(!0)};Ue.onLoad=()=>{io?.(),xn.set(!1)};Ue.onError=n=>{ro?.(n),ns.update(t=>[...t,n])};Ue.onProgress=(n,t,e)=>{t===e&&(Me=e),xn.set(!0),Ri.set(n),Fi.set(t),Oi.set(e);const i=(t-Me)/(e-Me)||1;Li.set(i),i===1&&Ui.set(!0)};const so={active:Ct(xn),item:Ct(Ri),loaded:Ct(Fi),total:Ct(Oi),errors:Ct(ns),progress:Ct(Li),finishedOnce:Ct(Ui)},jl=()=>so,oo=(n,t)=>{const e=eo(Ss,t),{renderer:i}=gn();return e.load(n,{...t,transform:r=>(r.colorSpace=i.outputColorSpace,r.needsUpdate=!0,t?.transform?.(r)??r)})};class Ki{#t=ne(!1);get pressed(){return X(this.#t)}set pressed(t){ee(this.#t,t,!0)}#e=ne(!1);get justPressed(){return X(this.#e)}set justPressed(t){ee(this.#e,t,!0)}#n=ne(!1);get justReleased(){return X(this.#n)}set justReleased(t){ee(this.#n,t,!0)}#i=ne(0);get strength(){return X(this.#i)}set strength(t){ee(this.#i,t,!0)}}function ao(n,t){const e=t.keyboard,i=t.gamepad;let r=ne("keyboard");const o=new Map,s=new Map;for(const m of Object.keys(n()))o.set(m,new Ki),s.set(m,!1);const c=m=>{switch(m.type){case"keyboard":return e.key(m.key).pressed?1:0;case"gamepadButton":{if(!i)return 0;const x=i[m.button];return x?x.value??(x.pressed?1:0):0}case"gamepadAxis":{if(!i)return 0;const x=i[m.stick];if(!x)return 0;const y=(x[m.axis]??0)*m.direction;return y>m.threshold?y:0}}},a=m=>{let x=o.get(m);return x||(x=new Ki,o.set(m,x),s.set(m,!1)),x},{task:u}=Ei("useInputMap",()=>{const m=n();for(const[x,p]of Object.entries(m)){const y=a(x);let g=0;for(const S of p){const _=c(S);_>g&&(g=_,ee(r,S.type==="keyboard"?"keyboard":"gamepad",!0))}const v=s.get(x),w=g>0;y.strength=g,y.pressed=w,y.justPressed=w&&!v,y.justReleased=!w&&v,s.set(x,w)}},{after:e.task,autoInvalidate:!1}),f=m=>{const x=o.get(m);if(!x)throw new Error(`Unknown action: "${m}"`);return x},h=(m,x)=>f(x).strength-f(m).strength,l={x:0,y:0};return{task:u,activeDevice:{get current(){return X(r)}},action:f,axis:h,vector:(m,x,p,y)=>{l.x=h(m,x),l.y=h(p,y);const g=l.x*l.x+l.y*l.y;if(g>1){const v=Math.sqrt(g);l.x/=v,l.y/=v}return l}}}const co=n=>({type:"keyboard",key:n}),lo=n=>({type:"gamepadButton",button:n}),uo=(n,t,e,i=.1)=>({type:"gamepadAxis",stick:n,axis:t,direction:e,threshold:i}),Wl=Object.assign(ao,{key:co,gamepadButton:lo,gamepadAxis:uo}),Pn=new B,ce=new B,Qi=new B,Gl=n=>{const t=yt({width:0,height:0,factor:0,distance:0}),{camera:e,size:i,renderStage:r,scheduler:o}=gn(),s=(u,f,h)=>{t.update(l=>{const{width:d,height:m}=u;if(Array.isArray(n)&&Pn.fromArray(n),l.distance=h,Pt(f,"OrthographicCamera"))l.width=d/f.zoom,l.height=m/f.zoom,l.factor=1;else if(Pt(f,"PerspectiveCamera")){const x=f.fov*Math.PI/180,p=2*Math.tan(x/2)*h,y=p*(d/m);l.width=y,l.height=p,l.factor=d/y}return l})},c=Gi(e),a=Gi(i);return Ei(()=>{if(c.current.getWorldPosition(ce),!ce.equals(Qi)){const u=ce.distanceTo(Pn);s(a.current,c.current,u),Qi.copy(ce)}},{autoInvalidate:!1,stage:o.createStage(Symbol("viewport-stage"),{before:r})}),Kr(()=>{const u=c.current.getWorldPosition(ce).distanceTo(Pn);s(a.current,c.current,u)}),t},Fe=new oe,Ji=new V,tr=new _i,Dn=new B,ql=function(n,t){if(this.geometry.boundingSphere===null&&this.geometry.computeBoundingSphere(),Fe.copy(this.geometry.boundingSphere??Fe),Fe.applyMatrix4(this.matrixWorld),!n.ray.intersectsSphere(Fe)||(Ji.copy(this.matrixWorld).invert(),tr.copy(n.ray).applyMatrix4(Ji),this.geometry.boundingBox!==null&&tr.intersectBox(this.geometry.boundingBox,Dn)===null))return;const e=Dn.distanceTo(n.ray.origin),i=Dn.clone();t.push({distance:e,point:i,object:this})},is=Symbol("THRELTE_SUSPENSE_CONTEXT_IDENTIFIER"),Zl=n=>{const t=yt(new Set),e=yt(new Map),i=pn(!1),r=()=>{t.current.size===0&&e.current.size===0&&i.set(!0)},o=pn(n?.final??!1),s=d=>{t.update(m=>(m.add(d),m))},c=d=>{t.update(m=>(m.delete(d),m))},a=(d,m)=>{e.update(x=>(x.set(d,m),x))},u=d=>{e.update(m=>(m.delete(d),m))},f=ti([t,e,o,i],([d,m,x,p])=>x&&p?!1:m.size>0?!0:d.size>0),h={suspend(d){s(d),d.catch(m=>{a(d,m)}).finally(()=>{c(d),r()})},onComponentDestroy(d){c(d),u(d),r()},suspended:f},l=ti(e,d=>Array.from(d.values()));return qs(is,h),{promises:t,suspended:f,errors:l,setFinal:d=>o.set(d??!1)}},fo=()=>{const n=Zs(is),t=new Set,e=r=>(n&&(n.suspend(r),t.add(r)),r),i={suspended:ti(n?.suspended??Ks(!1),r=>r)};return Qs(()=>{if(n){for(const r of t)n.onComponentDestroy(r);t.clear()}}),Object.assign(e,i)};class ho extends Bt{constructor(t=new Y,e=new B,i=new Wr,r=new B(1,1,1)){super();const o=[],s=[],c=[],a=new B,u=new Ms().getNormalMatrix(t.matrixWorld),f=new V;f.makeRotationFromEuler(i),f.setPosition(e);const h=new V;h.copy(f).invert(),l(),this.setAttribute("position",new kt(o,3)),this.setAttribute("uv",new kt(c,2)),s.length>0&&this.setAttribute("normal",new kt(s,3));function l(){let p=[];const y=new B,g=new B,v=t.geometry,w=v.attributes.position,S=v.attributes.normal;if(v.index!==null){const _=v.index;for(let b=0;b<_.count;b++)y.fromBufferAttribute(w,_.getX(b)),S?(g.fromBufferAttribute(S,_.getX(b)),d(p,y,g)):d(p,y)}else{if(w===void 0)return;for(let _=0;_<w.count;_++)y.fromBufferAttribute(w,_),S?(g.fromBufferAttribute(S,_),d(p,y,g)):d(p,y)}p=m(p,a.set(1,0,0)),p=m(p,a.set(-1,0,0)),p=m(p,a.set(0,1,0)),p=m(p,a.set(0,-1,0)),p=m(p,a.set(0,0,1)),p=m(p,a.set(0,0,-1));for(let _=0;_<p.length;_++){const b=p[_];c.push(.5+b.position.x/r.x,.5+b.position.y/r.y),b.position.applyMatrix4(f),o.push(b.position.x,b.position.y,b.position.z),b.normal!==null&&s.push(b.normal.x,b.normal.y,b.normal.z)}}function d(p,y,g=null){y.applyMatrix4(t.matrixWorld),y.applyMatrix4(h),g?(g.applyNormalMatrix(u),p.push(new Bn(y.clone(),g.clone()))):p.push(new Bn(y.clone()))}function m(p,y){const g=[],v=.5*Math.abs(r.dot(y));for(let w=0;w<p.length;w+=3){let S=0,_,b,M,T;const A=p[w+0].position.dot(y)-v,P=p[w+1].position.dot(y)-v,D=p[w+2].position.dot(y)-v,z=A>0,E=P>0,C=D>0;switch(S=(z?1:0)+(E?1:0)+(C?1:0),S){case 0:{g.push(p[w]),g.push(p[w+1]),g.push(p[w+2]);break}case 1:{if(z&&(_=p[w+1],b=p[w+2],M=x(p[w],_,y,v),T=x(p[w],b,y,v)),E){_=p[w],b=p[w+2],M=x(p[w+1],_,y,v),T=x(p[w+1],b,y,v),g.push(M),g.push(b.clone()),g.push(_.clone()),g.push(b.clone()),g.push(M.clone()),g.push(T);break}C&&(_=p[w],b=p[w+1],M=x(p[w+2],_,y,v),T=x(p[w+2],b,y,v)),g.push(_.clone()),g.push(b.clone()),g.push(M),g.push(T),g.push(M.clone()),g.push(b.clone());break}case 2:{z||(_=p[w].clone(),b=x(_,p[w+1],y,v),M=x(_,p[w+2],y,v),g.push(_),g.push(b),g.push(M)),E||(_=p[w+1].clone(),b=x(_,p[w+2],y,v),M=x(_,p[w],y,v),g.push(_),g.push(b),g.push(M)),C||(_=p[w+2].clone(),b=x(_,p[w],y,v),M=x(_,p[w+1],y,v),g.push(_),g.push(b),g.push(M));break}}}return g}function x(p,y,g,v){const w=p.position.dot(g)-v,S=y.position.dot(g)-v,_=w/(w-S),b=new B(p.position.x+_*(y.position.x-p.position.x),p.position.y+_*(y.position.y-p.position.y),p.position.z+_*(y.position.z-p.position.z));let M=null;return p.normal!==null&&y.normal!==null&&(M=new B(p.normal.x+_*(y.normal.x-p.normal.x),p.normal.y+_*(y.normal.y-p.normal.y),p.normal.z+_*(y.normal.z-p.normal.z))),new Bn(b,M)}}}class Bn{constructor(t,e=null){this.position=t,this.normal=e}clone(){const t=this.position.clone(),e=this.normal!==null?this.normal.clone():null;return new this.constructor(t,e)}}const po=new B,er=new V,nr=new B,mo=new B,gt=new Pe;var yo=Qr("<!> <!> <!>",1),go=Qr("<!> <!>",1);function Xl(n,t){Di(t,!0);const e=()=>Yi(h,"$parent",r),i=()=>Yi(X(v),"$map",r),[r,o]=Ys();let s=At(t,"polygonOffsetFactor",19,()=>-10),c=At(t,"depthTest",3,!0),a=At(t,"debug",3,!1),u=At(t,"ref",15),f=ts(t,["$$slots","$$events","$$legacy","src","mesh","position","rotation","scale","polygonOffsetFactor","depthTest","debug","ref","children"]);const h=As(),l=Zi(()=>t.mesh??e()),d=new Y,m=new B,x=new Wr,p=new B(1,1,1);let y=new Y;const g=fo(),v=Zi(()=>typeof t.src=="string"?g(oo(t.src)):t.src?cn(Promise.resolve(t.src)):void 0);Kr(()=>{if(!("geometry"in X(l)))throw new Error('Decal must have a Mesh as parent or specify its "mesh" prop');if(!(!i()&&!t.children)){if(t.position!==void 0&&m.fromArray(t.position),t.scale!==void 0&&(typeof t.scale=="number"?p.setScalar(t.scale):p.fromArray(t.scale)),er.copy(X(l).matrixWorld),X(l).matrixWorld.identity(),t.rotation===void 0||typeof t.rotation=="number"){gt.matrixWorld.identity(),gt.position.copy(m);const b=X(l).geometry.attributes.position.array;X(l).geometry.attributes.normal===void 0&&X(l).geometry.computeVertexNormals();const M=X(l).geometry.attributes.normal.array;let T=1/0,A=-1;for(let P=0,D=b.length;P<D;P+=3){const z=po.fromArray(b,P).distanceToSquared(gt.position);z<T&&(T=z,A=P)}nr.fromArray(M,A),gt.lookAt(mo.copy(gt.position).add(nr)),gt.rotateZ(Math.PI),gt.rotateY(Math.PI),typeof t.rotation=="number"&&gt.rotateZ(t.rotation),x.copy(gt.rotation)}else x.fromArray(t.rotation);return d.geometry=new ho(X(l),m,x,p),X(l).matrixWorld.copy(er),a()&&(y.position.copy(m),y.rotation.copy(x),y.scale.copy(p)),()=>d.geometry.dispose()}});var w=Ci(),S=_e(w);{var _=b=>{Mt(b,Jr({get is(){return d},"material.transparent":!0,"material.polygonOffset":!0,get"material.polygonOffsetFactor"(){return s()},get"material.depthTest"(){return c()},get"material.map"(){return i()}},()=>f,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:0},get ref(){return u()},set ref(M){u(M)},children:(M,T)=>{var A=go(),P=_e(A);Ii(P,()=>t.children??zi,()=>({ref:d}));var D=An(P,2);{var z=E=>{Mt(E,{get is(){return y},raycast:()=>null,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:1},children:(C,I)=>{var N=yo(),lt=_e(N);Tn(lt,()=>Mt.BoxGeometry,(Et,bt)=>{bt(Et,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:2}})});var ut=An(lt,2);Tn(ut,()=>Mt.MeshNormalMaterial,(Et,bt)=>{bt(Et,{wireframe:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:3}})});var jt=An(ut,2);Tn(jt,()=>Mt.AxesHelper,(Et,bt)=>{bt(Et,{raycast:()=>null,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:4}})}),Se(C,N)},$$slots:{default:!0}})};Xi(D,E=>{a()&&E(z)})}Se(M,A)},$$slots:{default:!0}}))};Xi(S,b=>{(i()||t.children)&&b(_)})}Se(n,w),Bi(),o()}const Vt=new B,vn=new B,xo=new B,vo=new q,Yl=(n,t,e)=>{const i=Vt.setFromMatrixPosition(n.matrixWorld);i.project(t);const r=e.width/2,o=e.height/2;return[i.x*r+r,-(i.y*o)+o]},Kl=(n,t)=>{const e=Vt.setFromMatrixPosition(n.matrixWorld),i=vn.setFromMatrixPosition(t.matrixWorld),r=e.sub(i),o=t.getWorldDirection(xo);return r.angleTo(o)>Math.PI/2},Ql=(n,t,e,i)=>{const r=Vt.setFromMatrixPosition(n.matrixWorld),o=vn.copy(Vt);o.project(t),e.setFromCamera(vo.set(o.x,o.y),t);const s=e.intersectObjects(i,!0);if(s.length){const c=s[0].distance;return r.distanceTo(e.ray.origin)<c}return!0},Jl=(n,t)=>{if(Pt(t,"OrthographicCamera"))return t.zoom;if(Pt(t,"PerspectiveCamera")){const e=Vt.setFromMatrixPosition(n.matrixWorld),i=vn.setFromMatrixPosition(t.matrixWorld),r=t.fov*Math.PI/180,o=e.distanceTo(i);return 1/(2*Math.tan(r/2)*o)}else return 1},tu=(n,t,e)=>{const i=Vt.setFromMatrixPosition(n.matrixWorld),r=vn.setFromMatrixPosition(t.matrixWorld),o=i.distanceTo(r),s=(e[1]-e[0])/(t.far-t.near),c=e[1]-s*t.far;return Math.round(s*o+c)},Z=n=>Math.abs(n)<1e-10?0:n,rs=(n,t,e="")=>{const{elements:i}=n;return`${e}matrix3d(
    ${Z(t[0]*i[0])},${Z(t[1]*i[1])},${Z(t[2]*i[2])},${Z(t[3]*i[3])},
    ${Z(t[4]*i[4])},${Z(t[5]*i[5])},${Z(t[6]*i[6])},${Z(t[7]*i[7])},
    ${Z(t[8]*i[8])},${Z(t[9]*i[9])},${Z(t[10]*i[10])},${Z(t[11]*i[11])},
    ${Z(t[12]*i[12])},${Z(t[13]*i[13])},${Z(t[14]*i[14])},${Z(t[15]*i[15])}
  )`},eu=(n=>t=>rs(t,n))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),nu=(n=>(t,e)=>rs(t,n(e),"translate(-50%,-50%)"))(n=>[1/n,1/n,1/n,1,-1/n,-1/n,-1/n,-1,1/n,1/n,1/n,1,1,1,1,1]),iu=(n,t,e)=>{if(Pt(n,"OrthographicCamera"))return 1;if(Pt(n,"PerspectiveCamera")){const{width:i,height:r}=e,o=n.getWorldPosition(Vt).distanceTo(t),s=n.fov*Math.PI/180,a=2*Math.tan(s/2)*o*(i/r);return i/a}throw new Error("getViewportFactor needs a Perspective or Orthographic Camera")};var wo=Object.defineProperty,bo=(n,t,e)=>t in n?wo(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,U=(n,t,e)=>bo(n,typeof t!="symbol"?t+"":t,e);const ss=(n,t)=>{const[e,i]=t.split("-");return Object.assign(n.style,{left:i==="left"?"0":i==="center"?"50%":"",right:i==="right"?"0":"",top:e==="top"?"0":e==="bottom"?"":"50%",bottom:e==="bottom"?"0":"",transform:`${i==="center"?"translateX(-50%)":""} ${e==="center"?"translateY(-50%)":""}`}),t},_o=({placement:n,size:t,offset:e,id:i,className:r})=>{const o=document.createElement("div"),{top:s,left:c,right:a,bottom:u}=e;return Object.assign(o.style,{id:i,position:"absolute",zIndex:"1000",height:`${t}px`,width:`${t}px`,margin:`${s}px ${a}px ${u}px ${c}px`,borderRadius:"100%"}),ss(o,n),i&&(o.id=i),r&&(o.className=r),o},So=n=>{const t=typeof n=="string"?document.querySelector(n):n;if(!t)throw Error("Invalid DOM element");return t};function ei(n,t,e){return Math.max(t,Math.min(e,n))}const Mo=[["x",0,3],["y",1,4],["z",2,5]],ir=new B;function rr({isSphere:n},t,e){n&&(ir.set(0,0,1).applyQuaternion(e.quaternion),Mo.forEach(([i,r,o])=>{const s=ir[i];let c=t[r],a=c.userData.opacity;c.material.opacity=ei(s>=0?a:a/2,0,1),c=t[o],a=c.userData.opacity,c.material.opacity=ei(s>=0?a/2:a,0,1)}))}const Ao=(n,t,e=10)=>Math.abs(n.clientX-t.x)<e&&Math.abs(n.clientY-t.y)<e,sr=new Bs,or=new q,ar=(n,t,e,i)=>{or.set((n.clientX-t.left)/t.width*2-1,-((n.clientY-t.top)/t.height)*2+1),sr.setFromCamera(or,e);const r=sr.intersectObjects(i,!1),o=r.length?r[0]:null;return!o||!o.object.visible?null:o},zn=1e-6,To=2*Math.PI,os=["x","y","z"],ze=[...os,"nx","ny","nz"],Po=["x","z","y","nx","nz","ny"],Do=["z","x","y","nz","nx","ny"],ni="Right",ln="Top",ii="Front",ri="Left",un="Bottom",si="Back",Bo=[ni,ln,ii,ri,un,si].map(n=>n.toLocaleLowerCase()),as=1.3,cr=(n,t=!0)=>{const{material:e,userData:i}=n,{color:r,opacity:o}=t?i.hover:i;e.color.set(r),e.opacity=o},It=n=>JSON.parse(JSON.stringify(n)),zo=n=>{const t=n.type||"sphere",e=t==="sphere",i=n.resolution||e?64:128,r=Pe.DEFAULT_UP,o=r.z===1,s=r.x===1,{container:c}=n;n.container=void 0,n=JSON.parse(JSON.stringify(n)),n.container=c;const a=o?Po:s?Do:ze;Bo.forEach((l,d)=>{n[l]&&(n[a[d]]=n[l])});const u={enabled:!0,color:16777215,opacity:1,scale:.7,labelColor:2236962,line:!1,border:{size:0,color:14540253},hover:{color:e?16777215:9688043,labelColor:2236962,opacity:1,scale:.7,border:{size:0,color:14540253}}},f={line:!1,scale:e?.45:.7,hover:{scale:e?.5:.7}},h={type:t,container:document.body,size:128,placement:"top-right",resolution:i,lineWidth:4,radius:e?1:.2,smoothness:18,animated:!0,speed:1,background:{enabled:!0,color:e?16777215:14739180,opacity:e?0:1,hover:{color:e?16777215:14739180,opacity:e?.2:1}},font:{family:"sans-serif",weight:900},offset:{top:10,left:10,bottom:10,right:10},corners:{enabled:!e,color:e?15915362:16777215,opacity:1,scale:e?.15:.2,radius:1,smoothness:18,hover:{color:e?16777215:9688043,opacity:1,scale:e?.2:.225}},edges:{enabled:!e,color:e?15915362:16777215,opacity:e?1:0,radius:e?1:.125,smoothness:18,scale:e?.15:1,hover:{color:e?16777215:9688043,opacity:1,scale:e?.2:1}},x:{...It(u),...e?{label:"X",color:16725587,line:!0}:{label:s?ln:ni}},y:{...It(u),...e?{label:"Y",color:9100032,line:!0}:{label:o||s?ii:ln}},z:{...It(u),...e?{label:"Z",color:2920447,line:!0}:{label:o?ln:s?ni:ii}},nx:{...It(f),label:e?"":s?un:ri},ny:{...It(f),label:e?"":o||s?si:un},nz:{...It(f),label:e?"":o?un:s?ri:si}};return oi(n,h),os.forEach(l=>oi(n[`n${l}`],It(n[l]))),{...n,isSphere:e}};function oi(n,...t){if(n instanceof HTMLElement||typeof n!="object"||n===null)return n;for(const e of t)for(const i in e)i!=="container"&&i in e&&(n[i]===void 0?n[i]=e[i]:typeof e[i]=="object"&&!Array.isArray(e[i])&&(n[i]=oi(n[i]||{},e[i])));return n}const Eo=(n,t=2)=>{const e=new Mi,i=t*2,{isSphere:r,resolution:o,radius:s,font:c,corners:a,edges:u}=n,f=ze.map(b=>({...n[b],radius:s}));r&&a.enabled&&f.push(a),r&&u.enabled&&f.push(u);const h=document.createElement("canvas"),l=h.getContext("2d");h.width=o*2+i*2,h.height=o*f.length+i*f.length;const[d,m]=S(f,o,c);f.forEach(({radius:b,label:M,color:T,labelColor:A,border:P,hover:{color:D,labelColor:z,border:E}},C)=>{const I=o*C+C*i+t;w(t,I,t,o,b,M,P,T,A),w(o+t*3,I,t,o,b,M,E??P,D??T,z??A)});const x=f.length,p=t/(o*2),y=t/(o*6),g=1/x,v=new Yn(h);return v.repeat.set(.5-2*p,g-2*y),v.offset.set(p,1-y),Object.assign(v,{colorSpace:Kn,wrapS:De,wrapT:De,userData:{offsetX:p,offsetY:y,cellHeight:g}}),v;function w(b,M,T,A,P,D,z,E,C){if(P=P*(A/2),E!=null&&E!==""&&(I(),l.fillStyle=e.set(E).getStyle(),l.fill()),z&&z.size){const N=z.size*A/2;b+=N,M+=N,A-=z.size*A,P=Math.max(0,P-N),I(),l.strokeStyle=e.set(z.color).getStyle(),l.lineWidth=z.size*A,l.stroke()}D&&_(l,b+A/2,M+(A+T)/2,D,e.set(C).getStyle());function I(){l.beginPath(),l.moveTo(b+P,M),l.lineTo(b+A-P,M),l.arcTo(b+A,M,b+A,M+P,P),l.lineTo(b+A,M+A-P),l.arcTo(b+A,M+A,b+A-P,M+A,P),l.lineTo(b+P,M+A),l.arcTo(b,M+A,b,M+A-P,P),l.lineTo(b,M+P),l.arcTo(b,M,b+P,M,P),l.closePath()}}function S(b,M,T){const A=[...b].sort((jt,Et)=>{var bt,Wi;return(((bt=jt.label)==null?void 0:bt.length)||0)-(((Wi=Et.label)==null?void 0:Wi.length)||0)}).pop().label,{family:P,weight:D}=T,z=r?Math.sqrt(Math.pow(M*.7,2)/2):M;let E=z,C=0,I=0;do{l.font=`${D} ${E}px ${P}`;const jt=l.measureText(A);C=jt.width,I=jt.fontBoundingBoxDescent,E--}while(C>z&&E>0);const N=z/I,lt=Math.min(z/C,N),ut=Math.floor(E*lt);return[`${D} ${ut}px ${P}`,N]}function _(b,M,T,A,P){b.font=d,b.textAlign="center",b.textBaseline="middle",b.fillStyle=P,b.fillText(A,M,T+(r?m:0))}},Co=(n,t)=>n.offset.x=(t?.5:0)+n.userData.offsetX,ki=(n,t)=>{const{offset:e,userData:{offsetY:i,cellHeight:r}}=n;e.y=1-(t+1)*r+i};function Ni(n,t,e=2,i=2){const r=e/2-n,o=i/2-n,s=n/e,c=(e-n)/e,a=n/i,u=(i-n)/i,f=[r,o,0,-r,o,0,-r,-o,0,r,-o,0],h=[c,u,s,u,s,a,c,a],l=[3*(t+1)+3,3*(t+1)+4,t+4,t+5,2*(t+1)+4,2,1,2*(t+1)+3,3,4*(t+1)+3,4,0],d=[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11].map(_=>l[_]);let m,x,p,y,g,v,w,S;for(let _=0;_<4;_++){y=_<1||_>2?r:-r,g=_<2?o:-o,v=_<1||_>2?c:s,w=_<2?u:a;for(let b=0;b<=t;b++)m=Math.PI/2*(_+b/t),x=Math.cos(m),p=Math.sin(m),f.push(y+n*x,g+n*p,0),h.push(v+s*x,w+a*p),b<t&&(S=(t+1)*_+b+4,d.push(_,S,S+1))}return new Bt().setIndex(new Q(new Uint32Array(d),1)).setAttribute("position",new Q(new Float32Array(f),3)).setAttribute("uv",new Q(new Float32Array(h),2))}const Io=(n,t)=>{const e=new B,{isSphere:i,radius:r,smoothness:o}=n,s=Ni(r,o);return ze.map((c,a)=>{const u=a<3,f=ze[a],h=a?t.clone():t;ki(h,a);const{enabled:l,scale:d,opacity:m,hover:x}=n[f],p={map:h,opacity:m,transparent:!0},y=i?new Ai(new Ti(p)):new Y(s,new Ht(p)),g=u?f:f[1];return y.position[g]=(u?1:-1)*(i?as:1),i||y.lookAt(e.copy(y.position).multiplyScalar(1.7)),y.scale.setScalar(d),y.renderOrder=1,y.visible=l,y.userData={scale:d,opacity:m,hover:x},y})},Uo=(n,t)=>{const{isSphere:e,corners:i}=n;if(!i.enabled)return[];const{color:r,opacity:o,scale:s,radius:c,smoothness:a,hover:u}=i,f=e?null:Ni(c,a),h={transparent:!0,opacity:o},l=[1,1,1,-1,1,1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,-1,-1,-1,-1,-1].map(m=>m*.85),d=new B;return Array(l.length/3).fill(0).map((m,x)=>{if(e){const g=t.clone();ki(g,6),h.map=g}else h.color=r;const p=e?new Ai(new Ti(h)):new Y(f,new Ht(h)),y=x*3;return p.position.set(l[y],l[y+1],l[y+2]),e&&p.position.normalize().multiplyScalar(1.7),p.scale.setScalar(s),p.lookAt(d.copy(p.position).multiplyScalar(2)),p.renderOrder=1,p.userData={color:r,opacity:o,scale:s,hover:u},p})},Ro=(n,t,e)=>{const{isSphere:i,edges:r}=n;if(!r.enabled)return[];const{color:o,opacity:s,scale:c,hover:a,radius:u,smoothness:f}=r,h=i?null:Ni(u,f,1.2,.25),l={transparent:!0,opacity:s},d=[0,1,1,0,-1,1,1,0,1,-1,0,1,0,1,-1,0,-1,-1,1,0,-1,-1,0,-1,1,1,0,1,-1,0,-1,1,0,-1,-1,0].map(p=>p*.925),m=new B,x=new B(0,1,0);return Array(d.length/3).fill(0).map((p,y)=>{if(i){const w=t.clone();ki(w,e),l.map=w}else l.color=o;const g=i?new Ai(new Ti(l)):new Y(h,new Ht(l)),v=y*3;return g.position.set(d[v],d[v+1],d[v+2]),i&&g.position.normalize().multiplyScalar(1.7),g.scale.setScalar(c),g.up.copy(x),g.lookAt(m.copy(g.position).multiplyScalar(2)),!i&&!g.position.y&&(g.rotation.z=Math.PI/2),g.renderOrder=1,g.userData={color:o,opacity:s,scale:c,hover:a},g})};function Fo(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),o={},s={},c=n[0].morphTargetsRelative,a=new Bt;let u=0;for(let f=0;f<n.length;++f){const h=n[f];let l=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.attributes[d]),l++}if(l!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(c!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;s[d]===void 0&&(s[d]=[]),s[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;a.addGroup(u,d,f),u+=d}}if(e){let f=0;const h=[];for(let l=0;l<n.length;++l){const d=n[l].index;for(let m=0;m<d.count;++m)h.push(d.getX(m)+f);f+=n[l].attributes.position.count}a.setIndex(h)}for(const f in o){const h=lr(o[f]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" attribute."),null;a.setAttribute(f,h)}for(const f in s){const h=s[f][0].length;if(h===0)break;a.morphAttributes=a.morphAttributes||{},a.morphAttributes[f]=[];for(let l=0;l<h;++l){const d=[];for(let x=0;x<s[f].length;++x)d.push(s[f][x][l]);const m=lr(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" morphAttribute."),null;a.morphAttributes[f].push(m)}}return a}function lr(n){let t,e,i,r=-1,o=0;for(let u=0;u<n.length;++u){const f=n[u];if(t===void 0&&(t=f.array.constructor),t!==f.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=f.itemSize),e!==f.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=f.normalized),i!==f.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=f.gpuType),r!==f.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=f.count*e}const s=new t(o),c=new Q(s,e,i);let a=0;for(let u=0;u<n.length;++u){const f=n[u];if(f.isInterleavedBufferAttribute){const h=a/e;for(let l=0,d=f.count;l<d;l++)for(let m=0;m<e;m++){const x=f.getComponent(l,m);c.setComponent(l+h,m,x)}}else s.set(f.array,a);a+=f.count*e}return r!==void 0&&(c.gpuType=r),c}const Oo=(n,t)=>{const{isSphere:e,background:{enabled:i,color:r,opacity:o,hover:s}}=t;let c;const a=new Ht({color:r,side:qr,opacity:o,transparent:!0,depthWrite:!1});if(!i)return null;if(e)c=new Y(new zs(1.8,64,64),a);else{let u;n.forEach(f=>{const h=f.scale.x;f.scale.setScalar(.9),f.updateMatrix();const l=f.geometry.clone();l.applyMatrix4(f.matrix),u=u?Fo([u,l]):l,f.scale.setScalar(h)}),c=new Y(u,a)}return c.userData={color:r,opacity:o,hover:s},c},ur=new K,Oe=new B;let cs=class extends Es{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new kt(t,3)),this.setAttribute("uv",new kt(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Qn(e,6,1);return this.setAttribute("instanceStart",new te(i,3,0)),this.setAttribute("instanceEnd",new te(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Qn(e,6,1);return this.setAttribute("instanceColorStart",new te(i,3,0)),this.setAttribute("instanceColorEnd",new te(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Cs(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new K);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),ur.setFromBufferAttribute(e),this.boundingBox.union(ur))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new oe),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let o=0,s=t.count;o<s;o++)Oe.fromBufferAttribute(t,o),r=Math.max(r,i.distanceToSquared(Oe)),Oe.fromBufferAttribute(e,o),r=Math.max(r,i.distanceToSquared(Oe));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}};on.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new q(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};we.line={uniforms:Si.merge([on.common,on.fog,on.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};let Vi=class extends Zr{constructor(t){super({type:"LineMaterial",uniforms:Si.clone(we.line.uniforms),vertexShader:we.line.vertexShader,fragmentShader:we.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};const En=new zt,fr=new B,dr=new B,$=new zt,H=new zt,ft=new zt,Cn=new B,In=new V,G=new mt,hr=new B,Le=new K,ke=new oe,dt=new zt;let ht,Nt;function pr(n,t,e){return dt.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),dt.multiplyScalar(1/dt.w),dt.x=Nt/e.width,dt.y=Nt/e.height,dt.applyMatrix4(n.projectionMatrixInverse),dt.multiplyScalar(1/dt.w),Math.abs(Math.max(dt.x,dt.y))}function Lo(n,t){const e=n.matrixWorld,i=n.geometry,r=i.attributes.instanceStart,o=i.attributes.instanceEnd,s=Math.min(i.instanceCount,r.count);for(let c=0,a=s;c<a;c++){G.start.fromBufferAttribute(r,c),G.end.fromBufferAttribute(o,c),G.applyMatrix4(e);const u=new B,f=new B;ht.distanceSqToSegment(G.start,G.end,f,u),f.distanceTo(u)<Nt*.5&&t.push({point:f,pointOnLine:u,distance:ht.origin.distanceTo(f),object:n,face:null,faceIndex:c,uv:null,uv1:null})}}function ko(n,t,e){const i=t.projectionMatrix,r=n.material.resolution,o=n.matrixWorld,s=n.geometry,c=s.attributes.instanceStart,a=s.attributes.instanceEnd,u=Math.min(s.instanceCount,c.count),f=-t.near;ht.at(1,ft),ft.w=1,ft.applyMatrix4(t.matrixWorldInverse),ft.applyMatrix4(i),ft.multiplyScalar(1/ft.w),ft.x*=r.x/2,ft.y*=r.y/2,ft.z=0,Cn.copy(ft),In.multiplyMatrices(t.matrixWorldInverse,o);for(let h=0,l=u;h<l;h++){if($.fromBufferAttribute(c,h),H.fromBufferAttribute(a,h),$.w=1,H.w=1,$.applyMatrix4(In),H.applyMatrix4(In),$.z>f&&H.z>f)continue;if($.z>f){const y=$.z-H.z,g=($.z-f)/y;$.lerp(H,g)}else if(H.z>f){const y=H.z-$.z,g=(H.z-f)/y;H.lerp($,g)}$.applyMatrix4(i),H.applyMatrix4(i),$.multiplyScalar(1/$.w),H.multiplyScalar(1/H.w),$.x*=r.x/2,$.y*=r.y/2,H.x*=r.x/2,H.y*=r.y/2,G.start.copy($),G.start.z=0,G.end.copy(H),G.end.z=0;const d=G.closestPointToPointParameter(Cn,!0);G.at(d,hr);const m=Is.lerp($.z,H.z,d),x=m>=-1&&m<=1,p=Cn.distanceTo(hr)<Nt*.5;if(x&&p){G.start.fromBufferAttribute(c,h),G.end.fromBufferAttribute(a,h),G.start.applyMatrix4(o),G.end.applyMatrix4(o);const y=new B,g=new B;ht.distanceSqToSegment(G.start,G.end,g,y),e.push({point:g,pointOnLine:y,distance:ht.origin.distanceTo(g),object:n,face:null,faceIndex:h,uv:null,uv1:null})}}}let No=class extends Y{constructor(t=new cs,e=new Vi({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*e.count);for(let s=0,c=0,a=e.count;s<a;s++,c+=2)fr.fromBufferAttribute(e,s),dr.fromBufferAttribute(i,s),r[c]=c===0?0:r[c-1],r[c+1]=r[c]+fr.distanceTo(dr);const o=new Qn(r,2,1);return t.setAttribute("instanceDistanceStart",new te(o,1,0)),t.setAttribute("instanceDistanceEnd",new te(o,1,1)),this}raycast(t,e){const i=this.material.worldUnits,r=t.camera;r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const o=t.params.Line2!==void 0&&t.params.Line2.threshold||0;ht=t.ray;const s=this.matrixWorld,c=this.geometry,a=this.material;Nt=a.linewidth+o,c.boundingSphere===null&&c.computeBoundingSphere(),ke.copy(c.boundingSphere).applyMatrix4(s);let u;if(i)u=Nt*.5;else{const h=Math.max(r.near,ke.distanceToPoint(ht.origin));u=pr(r,h,a.resolution)}if(ke.radius+=u,ht.intersectsSphere(ke)===!1)return;c.boundingBox===null&&c.computeBoundingBox(),Le.copy(c.boundingBox).applyMatrix4(s);let f;if(i)f=Nt*.5;else{const h=Math.max(r.near,Le.distanceToPoint(ht.origin));f=pr(r,h,a.resolution)}Le.expandByScalar(f),ht.intersectsBox(Le)!==!1&&(i?Lo(this,e):ko(this,r,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(En),this.material.uniforms.resolution.value.set(En.z,En.w))}};class ls extends cs{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){const e=t.length-3,i=new Float32Array(2*e);for(let r=0;r<e;r+=3)i[2*r]=t[r],i[2*r+1]=t[r+1],i[2*r+2]=t[r+2],i[2*r+3]=t[r+3],i[2*r+4]=t[r+4],i[2*r+5]=t[r+5];return super.setPositions(i),this}setColors(t){const e=t.length-3,i=new Float32Array(2*e);for(let r=0;r<e;r+=3)i[2*r]=t[r],i[2*r+1]=t[r+1],i[2*r+2]=t[r+2],i[2*r+3]=t[r+3],i[2*r+4]=t[r+4],i[2*r+5]=t[r+5];return super.setColors(i),this}setFromPoints(t){const e=t.length-1,i=new Float32Array(6*e);for(let r=0;r<e;r++)i[6*r]=t[r].x,i[6*r+1]=t[r].y,i[6*r+2]=t[r].z||0,i[6*r+3]=t[r+1].x,i[6*r+4]=t[r+1].y,i[6*r+5]=t[r+1].z||0;return super.setPositions(i),this}fromLine(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}}let Vo=class extends No{constructor(t=new ls,e=new Vi({color:Math.random()*16777215})){super(t,e),this.isLine2=!0,this.type="Line2"}};const $o=n=>{const t=new Mi,e=[],i=[],{isSphere:r}=n;if(ze.forEach((c,a)=>{const{enabled:u,line:f,scale:h,color:l}=n[c];if(!u||!f)return;const d=a<3?1:-1,m=(r?as-h/2:.975)*d;e.push(c.includes("x")?m:0,c.includes("y")?m:0,c.includes("z")?m:0,0,0,0);const x=t.set(l).toArray();i.push(...x,...x)}),!e.length)return null;const o=new ls().setPositions(e).setColors(i),s=new Vi({linewidth:n.lineWidth,vertexColors:!0,resolution:new q(window.innerWidth,window.innerHeight)});return new Vo(o,s).computeLineDistances()},Ho=n=>{const{corners:t,edges:e}=n,i=[],r=Eo(n),o=Io(n,r);i.push(...o),t.enabled&&i.push(...Uo(n,r)),e.enabled&&i.push(...Ro(n,r,t.enabled?7:6));const s=Oo(o,n),c=$o(n);return[i,s,c]},le=(n,t=!0)=>{const{material:e,userData:i}=n,{opacity:r,color:o,scale:s}=t?i.hover:i;n.scale.setScalar(s),e.opacity=r,e.map?Co(e.map,t):e.color.set(o)},Wt=new V,mr=new Ds,jo=new q,Ut=new B,yr=new zt;let cu=class extends Pe{constructor(t,e,i={}){super(),U(this,"enabled",!0),U(this,"camera"),U(this,"renderer"),U(this,"options"),U(this,"target",new B),U(this,"animated",!0),U(this,"speed",1),U(this,"animating",!1),U(this,"_options"),U(this,"_intersections"),U(this,"_background",null),U(this,"_viewport",[0,0,0,0]),U(this,"_originalViewport",[0,0,0,0]),U(this,"_originalScissor",[0,0,0,0]),U(this,"_scene"),U(this,"_camera"),U(this,"_container"),U(this,"_domElement"),U(this,"_domRect"),U(this,"_dragging",!1),U(this,"_distance",0),U(this,"_clock",new Us),U(this,"_targetQuaternion",new Mn),U(this,"_quaternionStart",new Mn),U(this,"_quaternionEnd",new Mn),U(this,"_pointerStart",new q),U(this,"_focus",null),U(this,"_placement"),U(this,"_controls"),U(this,"_controlsListeners"),this.camera=t,this.renderer=e,this._scene=new Ts().add(this),this.set(i)}get placement(){return this._placement}set placement(t){this._placement=ss(this._domElement,t),this.domUpdate()}set(t={}){this.dispose(),this.options=t,this._options=zo(t),this._camera=this._options.isSphere?new Gr(-1.8,1.8,1.8,-1.8,5,10):new Ps(26,1,5,10),this._camera.position.set(0,0,7);const[e,i,r]=Ho(this._options);i&&this.add(i),r&&this.add(r),this.add(...e),this._background=i,this._intersections=e;const{container:o,animated:s,speed:c}=this._options;return this.animated=s,this.speed=c,this._container=o?So(o):document.body,this._domElement=_o(this._options),this._domElement.onpointerdown=a=>this._onPointerDown(a),this._domElement.onpointermove=a=>this._onPointerMove(a),this._domElement.onpointerleave=()=>this._onPointerLeave(),this._container.appendChild(this._domElement),this._controls&&this.attachControls(this._controls),this.update(),this._updateOrientation(!0),this}render(){this.animating&&this._animate();const{renderer:t,_viewport:e}=this,i=t.getScissorTest(),r=t.autoClear;return t.autoClear=!1,t.setViewport(...e),i&&t.setScissor(...e),t.clear(!1,!0,!1),t.render(this._scene,this._camera),t.setViewport(...this._originalViewport),i&&t.setScissor(...this._originalScissor),t.autoClear=r,this}domUpdate(){this._domRect=this._domElement.getBoundingClientRect();const t=this.renderer,e=this._domRect,i=t.domElement.getBoundingClientRect();return this._viewport.splice(0,4,e.left-i.left,t.domElement.clientHeight-(e.top-i.top+e.height),e.width,e.height),t.getViewport(yr).toArray(this._originalViewport),t.getScissorTest()&&t.getScissor(yr).toArray(this._originalScissor),this}cameraUpdate(){return this._updateOrientation(),this}update(t=!0){return t&&this._controls&&this._controls.update(),this.domUpdate().cameraUpdate()}attachControls(t){return this.detachControls(),this.target=t.target,this._controlsListeners={start:()=>t.enabled=!1,end:()=>t.enabled=!0,change:()=>this.update(!1)},this.addEventListener("start",this._controlsListeners.start),this.addEventListener("end",this._controlsListeners.end),t.addEventListener("change",this._controlsListeners.change),this._controls=t,this}detachControls(){if(!(!this._controlsListeners||!this._controls))return this.target=new B().copy(this._controls.target),this.removeEventListener("start",this._controlsListeners.start),this.removeEventListener("end",this._controlsListeners.end),this._controls.removeEventListener("change",this._controlsListeners.change),this._controlsListeners=void 0,this._controls=void 0,this}dispose(){var t;this.detachControls(),this.children.forEach(e=>{var i,r,o,s;this.remove(e);const c=e;(i=c.material)==null||i.dispose(),(o=(r=c.material)==null?void 0:r.map)==null||o.dispose(),(s=c.geometry)==null||s.dispose()}),(t=this._domElement)==null||t.remove()}_updateOrientation(t=!0){t&&(this.quaternion.copy(this.camera.quaternion).invert(),this.updateMatrixWorld()),rr(this._options,this._intersections,this.camera)}_animate(){const{position:t,quaternion:e}=this.camera;if(t.set(0,0,1),!this.animated){t.applyQuaternion(this._quaternionEnd).multiplyScalar(this._distance).add(this.target),e.copy(this._targetQuaternion),this._updateOrientation(),this.animating=!1,this.dispatchEvent({type:"change"}),this.dispatchEvent({type:"end"});return}this._controls&&(this._controls.enabled=!1);const i=this._clock.getDelta()*To*this.speed;this._quaternionStart.rotateTowards(this._quaternionEnd,i),t.applyQuaternion(this._quaternionStart).multiplyScalar(this._distance).add(this.target),e.rotateTowards(this._targetQuaternion,i),this._updateOrientation(),requestAnimationFrame(()=>this.dispatchEvent({type:"change"})),this._quaternionStart.angleTo(this._quaternionEnd)<zn&&(this._controls&&(this._controls.enabled=!0),this.animating=!1,this.dispatchEvent({type:"end"}))}_setOrientation(t){const e=this.camera,i=this.target;Ut.copy(t).multiplyScalar(this._distance),Wt.setPosition(Ut).lookAt(Ut,this.position,this.up),this._targetQuaternion.setFromRotationMatrix(Wt),Ut.add(i),Wt.lookAt(Ut,i,this.up),this._quaternionEnd.setFromRotationMatrix(Wt),Wt.setPosition(e.position).lookAt(e.position,i,this.up),this._quaternionStart.setFromRotationMatrix(Wt),this.animating=!0,this._clock.start(),this.dispatchEvent({type:"start"})}_onPointerDown(t){if(!this.enabled)return;const e=a=>{if(!this._dragging){if(Ao(a,this._pointerStart))return;this._dragging=!0}const u=jo.set(a.clientX,a.clientY).sub(this._pointerStart).multiplyScalar(1/this._domRect.width*Math.PI),f=this.coordinateConversion(Ut.subVectors(this.camera.position,this.target)),h=mr.setFromVector3(f);h.theta=s-u.x,h.phi=ei(c-u.y,zn,Math.PI-zn),this.coordinateConversion(this.camera.position.setFromSpherical(h),!0).add(this.target),this.camera.lookAt(this.target),this.quaternion.copy(this.camera.quaternion).invert(),this._updateOrientation(!1),this.dispatchEvent({type:"change"})},i=()=>{if(document.removeEventListener("pointermove",e,!1),document.removeEventListener("pointerup",i,!1),!this._dragging)return this._handleClick(t);this._focus&&(le(this._focus,!1),this._focus=null),this._dragging=!1,this.dispatchEvent({type:"end"})};if(this.animating)return;t.preventDefault(),this._pointerStart.set(t.clientX,t.clientY);const r=this.coordinateConversion(Ut.subVectors(this.camera.position,this.target)),o=mr.setFromVector3(r),s=o.theta,c=o.phi;this._distance=o.radius,document.addEventListener("pointermove",e,!1),document.addEventListener("pointerup",i,!1),this.dispatchEvent({type:"start"})}coordinateConversion(t,e=!1){const{x:i,y:r,z:o}=t,s=Pe.DEFAULT_UP;return s.x===1?e?t.set(r,o,i):t.set(o,i,r):s.z===1?e?t.set(o,i,r):t.set(r,o,i):t}_onPointerMove(t){!this.enabled||this._dragging||(this._background&&cr(this._background,!0),this._handleHover(t))}_onPointerLeave(){!this.enabled||this._dragging||(this._background&&cr(this._background,!1),this._focus&&le(this._focus,!1),this._domElement.style.cursor="")}_handleClick(t){const e=ar(t,this._domRect,this._camera,this._intersections);this._focus&&(le(this._focus,!1),this._focus=null),e&&(this._setOrientation(e.object.position),this.dispatchEvent({type:"change"}))}_handleHover(t){const e=ar(t,this._domRect,this._camera,this._intersections),i=e?.object||null;this._focus!==i&&(this._domElement.style.cursor=i?"pointer":"",this._focus&&le(this._focus,!1),(this._focus=i)?le(i,!0):rr(this._options,this._intersections,this.camera))}};const gr=new V,xr=new V,Ne=[],ue=new Y;class uu extends be{color;instancedMesh;instances;constructor(t,e){super(),this.color=new Mi("white"),this.instancedMesh=t,this.instances=e}get geometry(){return this.instancedMesh.current?.geometry}raycast(t,e){const i=this.instancedMesh.current;if(i===void 0||i.geometry===void 0||i.material===void 0)return;ue.geometry=i.geometry;const r=i.matrixWorld,o=this.instances.current.indexOf(this);if(!(o===-1||o>i.count)){i.getMatrixAt(o,gr),xr.multiplyMatrices(r,gr),ue.matrixWorld=xr,Pt(i.material,"Material")?ue.material.side=i.material.side:ue.material.side=i.material[0]?.side??Jn,ue.raycast(t,Ne);for(let s=0,c=Ne.length;s<c;s++){const a=Ne[s];a.instanceId=o,a.object=this,e.push(a)}Ne.length=0}}}const fu=`
    #include <common>
    ${at.logdepthbuf_pars_vertex}
    ${at.fog_pars_vertex}

    attribute vec3 previous;
    attribute vec3 next;
    attribute float side;
    attribute float width;
    attribute float counters;

    uniform vec2 resolution;
    uniform float lineWidth;
    uniform vec3 color;
    uniform float opacity;
    uniform float sizeAttenuation;
    uniform float scaleDown;

    varying vec2 vUV;
    varying vec4 vColor;
    varying float vCounters;

    vec2 intoScreen(vec4 i) {
        return resolution * (0.5 * i.xy / i.w + 0.5);
    }

    void main() {
        float aspect = resolution.y / resolution.x;

        mat4 m = projectionMatrix * modelViewMatrix;

        vec4 currentClip = m * vec4( position, 1.0 );
        vec4 prevClip = m * vec4( previous, 1.0 );
        vec4 nextClip = m * vec4( next, 1.0 );

        vec4 currentNormed = currentClip / currentClip.w;
        vec4 prevNormed = prevClip / prevClip.w;
        vec4 nextNormed = nextClip / nextClip.w;

        vec2 currentScreen = intoScreen(currentNormed);
        vec2 prevScreen = intoScreen(prevNormed);
        vec2 nextScreen = intoScreen(nextNormed);

        float actualWidth = lineWidth * width;

        vec2 dir;
        if(nextScreen == currentScreen) {
            dir = normalize( currentScreen - prevScreen );
        } else if(prevScreen == currentScreen) {
            dir = normalize( nextScreen - currentScreen );
        } else {
            vec2 inDir = currentScreen - prevScreen;
            vec2 outDir = nextScreen - currentScreen;
            vec2 fullDir = nextScreen - prevScreen;

            if(length(fullDir) > 0.0) {
                dir = normalize(fullDir);
            } else if(length(inDir) > 0.0){
                dir = normalize(inDir);
            } else {
                dir = normalize(outDir);
            }
        }

        vec2 normal = vec2(-dir.y, dir.x);

        if(sizeAttenuation != 0.0) {
            normal /= currentClip.w;
            normal *= min(resolution.x, resolution.y);
        }

        if (scaleDown > 0.0) {
            float dist = length(nextNormed - prevNormed);
            normal *= smoothstep(0.0, scaleDown, dist);
        }

        vec2 offsetInScreen = actualWidth * normal * side * 0.5;

        vec2 withOffsetScreen = currentScreen + offsetInScreen;
        vec3 withOffsetNormed = vec3((2.0 * withOffsetScreen/resolution - 1.0), currentNormed.z);

        vCounters = counters;
        vColor = vec4( color, opacity );
        vUV = uv;

        gl_Position = currentClip.w * vec4(withOffsetNormed, 1.0);

        ${at.logdepthbuf_vertex}
        ${at.fog_vertex}
    }
`;function Wo(n,t){Di(t,!0),es(t.name,t.plugin);var e=Ci(),i=_e(e);Ii(i,()=>t.children??zi),Se(n,e),Bi()}const du=`
uniform vec3 glowColor;
uniform float falloffAmount;
uniform float glowSharpness;
uniform float glowInternalRadius;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
	// Normal
	vec3 normal = normalize(vNormal);
	if(!gl_FrontFacing)
			normal *= - 1.0;
	vec3 viewDirection = normalize(cameraPosition - vPosition);
	float fresnel = dot(viewDirection, normal);
	fresnel = pow(fresnel, glowInternalRadius + 0.1);
	float falloff = smoothstep(0., falloffAmount, fresnel);
	float fakeGlow = fresnel;
	fakeGlow += fresnel * glowSharpness;
	fakeGlow *= falloff;
	gl_FragColor = vec4(clamp(glowColor * fresnel, 0., 1.0), clamp(fakeGlow, 0., 1.0));

	${at.tonemapping_fragment}
	${at.colorspace_fragment}
}`,hu=`
uniform sampler2D pointTexture;
uniform float fade;
uniform float opacity;

varying vec3 vColor;
void main() {
	float pointOpacity = 1.0;
	if (fade == 1.0) {
		float d = distance(gl_PointCoord, vec2(0.5, 0.5));
		pointOpacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
	}
	gl_FragColor = vec4(vColor, pointOpacity * opacity);

	${at.tonemapping_fragment}
	${at.colorspace_fragment}
}`,us=0,Go=1,qo=2,vr=0,Zo=1,wr=2,Un=1.25,br=1,Ae=32,wn=65535,Xo=Math.pow(2,-24),Rn=Symbol("SKIP_GENERATION");function Yo(n){return n.index?n.index.count:n.attributes.position.count}function ae(n){return Yo(n)/3}function Ko(n,t=ArrayBuffer){return n>65535?new Uint32Array(new t(4*n)):new Uint16Array(new t(2*n))}function Qo(n,t){if(!n.index){const e=n.attributes.position.count,i=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=Ko(e,i);n.setIndex(new Q(r,1));for(let o=0;o<e;o++)r[o]=o}}function fs(n,t){const e=ae(n),i=t||n.drawRange,r=i.start/3,o=(i.start+i.count)/3,s=Math.max(0,r),c=Math.min(e,o)-s;return[{offset:Math.floor(s),count:Math.floor(c)}]}function ds(n,t){if(!n.groups||!n.groups.length)return fs(n,t);const e=[],i=new Set,r=t||n.drawRange,o=r.start/3,s=(r.start+r.count)/3;for(const a of n.groups){const u=a.start/3,f=(a.start+a.count)/3;i.add(Math.max(o,u)),i.add(Math.min(s,f))}const c=Array.from(i.values()).sort((a,u)=>a-u);for(let a=0;a<c.length-1;a++){const u=c[a],f=c[a+1];e.push({offset:Math.floor(u),count:Math.floor(f-u)})}return e}function Jo(n,t){const e=ae(n),i=ds(n,t).sort((s,c)=>s.offset-c.offset),r=i[i.length-1];r.count=Math.min(e-r.offset,r.count);let o=0;return i.forEach(({count:s})=>o+=s),e!==o}function Fn(n,t,e,i,r){let o=1/0,s=1/0,c=1/0,a=-1/0,u=-1/0,f=-1/0,h=1/0,l=1/0,d=1/0,m=-1/0,x=-1/0,p=-1/0;for(let y=t*6,g=(t+e)*6;y<g;y+=6){const v=n[y+0],w=n[y+1],S=v-w,_=v+w;S<o&&(o=S),_>a&&(a=_),v<h&&(h=v),v>m&&(m=v);const b=n[y+2],M=n[y+3],T=b-M,A=b+M;T<s&&(s=T),A>u&&(u=A),b<l&&(l=b),b>x&&(x=b);const P=n[y+4],D=n[y+5],z=P-D,E=P+D;z<c&&(c=z),E>f&&(f=E),P<d&&(d=P),P>p&&(p=P)}i[0]=o,i[1]=s,i[2]=c,i[3]=a,i[4]=u,i[5]=f,r[0]=h,r[1]=l,r[2]=d,r[3]=m,r[4]=x,r[5]=p}function ta(n,t=null,e=null,i=null){const r=n.attributes.position,o=n.index?n.index.array:null,s=ae(n),c=r.normalized;let a;t===null?(a=new Float32Array(s*6),e=0,i=s):(a=t,e=e||0,i=i||s);const u=r.array,f=r.offset||0;let h=3;r.isInterleavedBufferAttribute&&(h=r.data.stride);const l=["getX","getY","getZ"];for(let d=e;d<e+i;d++){const m=d*3,x=d*6;let p=m+0,y=m+1,g=m+2;o&&(p=o[p],y=o[y],g=o[g]),c||(p=p*h+f,y=y*h+f,g=g*h+f);for(let v=0;v<3;v++){let w,S,_;c?(w=r[l[v]](p),S=r[l[v]](y),_=r[l[v]](g)):(w=u[p+v],S=u[y+v],_=u[g+v]);let b=w;S<b&&(b=S),_<b&&(b=_);let M=w;S>M&&(M=S),_>M&&(M=_);const T=(M-b)/2,A=v*2;a[x+A+0]=b+T,a[x+A+1]=T+(Math.abs(b)+T)*Xo}}return a}function O(n,t,e){return e.min.x=t[n],e.min.y=t[n+1],e.min.z=t[n+2],e.max.x=t[n+3],e.max.y=t[n+4],e.max.z=t[n+5],e}function _r(n){let t=-1,e=-1/0;for(let i=0;i<3;i++){const r=n[i+3]-n[i];r>e&&(e=r,t=i)}return t}function Sr(n,t){t.set(n)}function Mr(n,t,e){let i,r;for(let o=0;o<3;o++){const s=o+3;i=n[o],r=t[o],e[o]=i<r?i:r,i=n[s],r=t[s],e[s]=i>r?i:r}}function Ve(n,t,e){for(let i=0;i<3;i++){const r=t[n+2*i],o=t[n+2*i+1],s=r-o,c=r+o;s<e[i]&&(e[i]=s),c>e[i+3]&&(e[i+3]=c)}}function fe(n){const t=n[3]-n[0],e=n[4]-n[1],i=n[5]-n[2];return 2*(t*e+e*i+i*t)}const xt=32,ea=(n,t)=>n.candidate-t.candidate,_t=new Array(xt).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),$e=new Float32Array(6);function na(n,t,e,i,r,o){let s=-1,c=0;if(o===us)s=_r(t),s!==-1&&(c=(t[s]+t[s+3])/2);else if(o===Go)s=_r(n),s!==-1&&(c=ia(e,i,r,s));else if(o===qo){const a=fe(n);let u=Un*r;const f=i*6,h=(i+r)*6;for(let l=0;l<3;l++){const d=t[l],p=(t[l+3]-d)/xt;if(r<xt/4){const y=[..._t];y.length=r;let g=0;for(let w=f;w<h;w+=6,g++){const S=y[g];S.candidate=e[w+2*l],S.count=0;const{bounds:_,leftCacheBounds:b,rightCacheBounds:M}=S;for(let T=0;T<3;T++)M[T]=1/0,M[T+3]=-1/0,b[T]=1/0,b[T+3]=-1/0,_[T]=1/0,_[T+3]=-1/0;Ve(w,e,_)}y.sort(ea);let v=r;for(let w=0;w<v;w++){const S=y[w];for(;w+1<v&&y[w+1].candidate===S.candidate;)y.splice(w+1,1),v--}for(let w=f;w<h;w+=6){const S=e[w+2*l];for(let _=0;_<v;_++){const b=y[_];S>=b.candidate?Ve(w,e,b.rightCacheBounds):(Ve(w,e,b.leftCacheBounds),b.count++)}}for(let w=0;w<v;w++){const S=y[w],_=S.count,b=r-S.count,M=S.leftCacheBounds,T=S.rightCacheBounds;let A=0;_!==0&&(A=fe(M)/a);let P=0;b!==0&&(P=fe(T)/a);const D=br+Un*(A*_+P*b);D<u&&(s=l,u=D,c=S.candidate)}}else{for(let v=0;v<xt;v++){const w=_t[v];w.count=0,w.candidate=d+p+v*p;const S=w.bounds;for(let _=0;_<3;_++)S[_]=1/0,S[_+3]=-1/0}for(let v=f;v<h;v+=6){let _=~~((e[v+2*l]-d)/p);_>=xt&&(_=xt-1);const b=_t[_];b.count++,Ve(v,e,b.bounds)}const y=_t[xt-1];Sr(y.bounds,y.rightCacheBounds);for(let v=xt-2;v>=0;v--){const w=_t[v],S=_t[v+1];Mr(w.bounds,S.rightCacheBounds,w.rightCacheBounds)}let g=0;for(let v=0;v<xt-1;v++){const w=_t[v],S=w.count,_=w.bounds,M=_t[v+1].rightCacheBounds;S!==0&&(g===0?Sr(_,$e):Mr(_,$e,$e)),g+=S;let T=0,A=0;g!==0&&(T=fe($e)/a);const P=r-g;P!==0&&(A=fe(M)/a);const D=br+Un*(T*g+A*P);D<u&&(s=l,u=D,c=w.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${o} used.`);return{axis:s,pos:c}}function ia(n,t,e,i){let r=0;for(let o=t,s=t+e;o<s;o++)r+=n[o*6+i*2];return r/e}class On{constructor(){this.boundingData=new Float32Array(6)}}function ra(n,t,e,i,r,o){let s=i,c=i+r-1;const a=o.pos,u=o.axis*2;for(;;){for(;s<=c&&e[s*6+u]<a;)s++;for(;s<=c&&e[c*6+u]>=a;)c--;if(s<c){for(let f=0;f<3;f++){let h=t[s*3+f];t[s*3+f]=t[c*3+f],t[c*3+f]=h}for(let f=0;f<6;f++){let h=e[s*6+f];e[s*6+f]=e[c*6+f],e[c*6+f]=h}s++,c--}else return s}}function sa(n,t,e,i,r,o){let s=i,c=i+r-1;const a=o.pos,u=o.axis*2;for(;;){for(;s<=c&&e[s*6+u]<a;)s++;for(;s<=c&&e[c*6+u]>=a;)c--;if(s<c){let f=n[s];n[s]=n[c],n[c]=f;for(let h=0;h<6;h++){let l=e[s*6+h];e[s*6+h]=e[c*6+h],e[c*6+h]=l}s++,c--}else return s}}function tt(n,t){return t[n+15]===65535}function et(n,t){return t[n+6]}function nt(n,t){return t[n+14]}function it(n){return n+8}function rt(n,t){return t[n+6]}function hs(n,t){return t[n+7]}function pu(n){return n}let ps,ve,fn,ms;const oa=Math.pow(2,32);function ai(n){return"count"in n?1:1+ai(n.left)+ai(n.right)}function aa(n,t,e){return ps=new Float32Array(e),ve=new Uint32Array(e),fn=new Uint16Array(e),ms=new Uint8Array(e),ci(n,t)}function ci(n,t){const e=n/4,i=n/2,r="count"in t,o=t.boundingData;for(let s=0;s<6;s++)ps[e+s]=o[s];if(r)if(t.buffer){const s=t.buffer;ms.set(new Uint8Array(s),n);for(let c=n,a=n+s.byteLength;c<a;c+=Ae){const u=c/2;tt(u,fn)||(ve[c/4+6]+=e)}return n+s.byteLength}else{const s=t.offset,c=t.count;return ve[e+6]=s,fn[i+14]=c,fn[i+15]=wn,n+Ae}else{const s=t.left,c=t.right,a=t.splitAxis;let u;if(u=ci(n+Ae,s),u/4>oa)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return ve[e+6]=u/4,u=ci(u,c),ve[e+7]=a,u}}function ca(n,t){const e=(n.index?n.index.count:n.attributes.position.count)/3,i=e>2**16,r=i?4:2,o=t?new SharedArrayBuffer(e*r):new ArrayBuffer(e*r),s=i?new Uint32Array(o):new Uint16Array(o);for(let c=0,a=s.length;c<a;c++)s[c]=c;return s}function la(n,t,e,i,r){const{maxDepth:o,verbose:s,maxLeafTris:c,strategy:a,onProgress:u,indirect:f}=r,h=n._indirectBuffer,l=n.geometry,d=l.index?l.index.array:null,m=f?sa:ra,x=ae(l),p=new Float32Array(6);let y=!1;const g=new On;return Fn(t,e,i,g.boundingData,p),w(g,e,i,p),g;function v(S){u&&u(S/x)}function w(S,_,b,M=null,T=0){if(!y&&T>=o&&(y=!0,s&&(console.warn(`MeshBVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`),console.warn(l))),b<=c||T>=o)return v(_+b),S.offset=_,S.count=b,S;const A=na(S.boundingData,M,t,_,b,a);if(A.axis===-1)return v(_+b),S.offset=_,S.count=b,S;const P=m(h,d,t,_,b,A);if(P===_||P===_+b)v(_+b),S.offset=_,S.count=b;else{S.splitAxis=A.axis;const D=new On,z=_,E=P-_;S.left=D,Fn(t,z,E,D.boundingData,p),w(D,z,E,p,T+1);const C=new On,I=P,N=b-E;S.right=C,Fn(t,I,N,C.boundingData,p),w(C,I,N,p,T+1)}return S}}function ua(n,t){const e=n.geometry;t.indirect&&(n._indirectBuffer=ca(e,t.useSharedArrayBuffer),Jo(e,t.range)&&!t.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),n._indirectBuffer||Qo(e,t);const i=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=ta(e),o=t.indirect?fs(e,t.range):ds(e,t.range);n._roots=o.map(s=>{const c=la(n,r,s.offset,s.count,t),a=ai(c),u=new i(Ae*a);return aa(0,c,u),u})}class wt{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(t,e){let i=1/0,r=-1/0;for(let o=0,s=t.length;o<s;o++){const a=t[o][e];i=a<i?a:i,r=a>r?a:r}this.min=i,this.max=r}setFromPoints(t,e){let i=1/0,r=-1/0;for(let o=0,s=e.length;o<s;o++){const c=e[o],a=t.dot(c);i=a<i?a:i,r=a>r?a:r}this.min=i,this.max=r}isSeparated(t){return this.min>t.max||t.min>this.max}}wt.prototype.setFromBox=(function(){const n=new B;return function(e,i){const r=i.min,o=i.max;let s=1/0,c=-1/0;for(let a=0;a<=1;a++)for(let u=0;u<=1;u++)for(let f=0;f<=1;f++){n.x=r.x*a+o.x*(1-a),n.y=r.y*u+o.y*(1-u),n.z=r.z*f+o.z*(1-f);const h=e.dot(n);s=Math.min(h,s),c=Math.max(h,c)}this.min=s,this.max=c}})();const fa=(function(){const n=new B,t=new B,e=new B;return function(r,o,s){const c=r.start,a=n,u=o.start,f=t;e.subVectors(c,u),n.subVectors(r.end,r.start),t.subVectors(o.end,o.start);const h=e.dot(f),l=f.dot(a),d=f.dot(f),m=e.dot(a),p=a.dot(a)*d-l*l;let y,g;p!==0?y=(h*l-m*d)/p:y=0,g=(h+y*l)/d,s.x=y,s.y=g}})(),$i=(function(){const n=new q,t=new B,e=new B;return function(r,o,s,c){fa(r,o,n);let a=n.x,u=n.y;if(a>=0&&a<=1&&u>=0&&u<=1){r.at(a,s),o.at(u,c);return}else if(a>=0&&a<=1){u<0?o.at(0,c):o.at(1,c),r.closestPointToPoint(c,!0,s);return}else if(u>=0&&u<=1){a<0?r.at(0,s):r.at(1,s),o.closestPointToPoint(s,!0,c);return}else{let f;a<0?f=r.start:f=r.end;let h;u<0?h=o.start:h=o.end;const l=t,d=e;if(r.closestPointToPoint(h,!0,t),o.closestPointToPoint(f,!0,e),l.distanceToSquared(h)<=d.distanceToSquared(f)){s.copy(l),c.copy(h);return}else{s.copy(f),c.copy(d);return}}}})(),da=(function(){const n=new B,t=new B,e=new Xr,i=new mt;return function(o,s){const{radius:c,center:a}=o,{a:u,b:f,c:h}=s;if(i.start=u,i.end=f,i.closestPointToPoint(a,!0,n).distanceTo(a)<=c||(i.start=u,i.end=h,i.closestPointToPoint(a,!0,n).distanceTo(a)<=c)||(i.start=f,i.end=h,i.closestPointToPoint(a,!0,n).distanceTo(a)<=c))return!0;const x=s.getPlane(e);if(Math.abs(x.distanceToPoint(a))<=c){const y=x.projectPoint(a,t);if(s.containsPoint(y))return!0}return!1}})(),ha=1e-15;function Ln(n){return Math.abs(n)<ha}class ct extends Jt{constructor(...t){super(...t),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new B),this.satBounds=new Array(4).fill().map(()=>new wt),this.points=[this.a,this.b,this.c],this.sphere=new oe,this.plane=new Xr,this.needsUpdate=!0}intersectsSphere(t){return da(t,this)}update(){const t=this.a,e=this.b,i=this.c,r=this.points,o=this.satAxes,s=this.satBounds,c=o[0],a=s[0];this.getNormal(c),a.setFromPoints(c,r);const u=o[1],f=s[1];u.subVectors(t,e),f.setFromPoints(u,r);const h=o[2],l=s[2];h.subVectors(e,i),l.setFromPoints(h,r);const d=o[3],m=s[3];d.subVectors(i,t),m.setFromPoints(d,r),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(c,t),this.needsUpdate=!1}}ct.prototype.closestPointToSegment=(function(){const n=new B,t=new B,e=new mt;return function(r,o=null,s=null){const{start:c,end:a}=r,u=this.points;let f,h=1/0;for(let l=0;l<3;l++){const d=(l+1)%3;e.start.copy(u[l]),e.end.copy(u[d]),$i(e,r,n,t),f=n.distanceToSquared(t),f<h&&(h=f,o&&o.copy(n),s&&s.copy(t))}return this.closestPointToPoint(c,n),f=c.distanceToSquared(n),f<h&&(h=f,o&&o.copy(n),s&&s.copy(c)),this.closestPointToPoint(a,n),f=a.distanceToSquared(n),f<h&&(h=f,o&&o.copy(n),s&&s.copy(a)),Math.sqrt(h)}})();ct.prototype.intersectsTriangle=(function(){const n=new ct,t=new Array(3),e=new Array(3),i=new wt,r=new wt,o=new B,s=new B,c=new B,a=new B,u=new B,f=new mt,h=new mt,l=new mt,d=new B;function m(x,p,y){const g=x.points;let v=0,w=-1;for(let S=0;S<3;S++){const{start:_,end:b}=f;_.copy(g[S]),b.copy(g[(S+1)%3]),f.delta(s);const M=Ln(p.distanceToPoint(_));if(Ln(p.normal.dot(s))&&M){y.copy(f),v=2;break}const T=p.intersectLine(f,d);if(!T&&M&&d.copy(_),(T||M)&&!Ln(d.distanceTo(b))){if(v<=1)(v===1?y.start:y.end).copy(d),M&&(w=v);else if(v>=2){(w===1?y.start:y.end).copy(d),v=2;break}if(v++,v===2&&w===-1)break}}return v}return function(p,y=null,g=!1){this.needsUpdate&&this.update(),p.isExtendedTriangle?p.needsUpdate&&p.update():(n.copy(p),n.update(),p=n);const v=this.plane,w=p.plane;if(Math.abs(v.normal.dot(w.normal))>1-1e-10){const S=this.satBounds,_=this.satAxes;e[0]=p.a,e[1]=p.b,e[2]=p.c;for(let T=0;T<4;T++){const A=S[T],P=_[T];if(i.setFromPoints(P,e),A.isSeparated(i))return!1}const b=p.satBounds,M=p.satAxes;t[0]=this.a,t[1]=this.b,t[2]=this.c;for(let T=0;T<4;T++){const A=b[T],P=M[T];if(i.setFromPoints(P,t),A.isSeparated(i))return!1}for(let T=0;T<4;T++){const A=_[T];for(let P=0;P<4;P++){const D=M[P];if(o.crossVectors(A,D),i.setFromPoints(o,t),r.setFromPoints(o,e),i.isSeparated(r))return!1}}return y&&(g||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),y.start.set(0,0,0),y.end.set(0,0,0)),!0}else{const S=m(this,w,h);if(S===1&&p.containsPoint(h.end))return y&&(y.start.copy(h.end),y.end.copy(h.end)),!0;if(S!==2)return!1;const _=m(p,v,l);if(_===1&&this.containsPoint(l.end))return y&&(y.start.copy(l.end),y.end.copy(l.end)),!0;if(_!==2)return!1;if(h.delta(c),l.delta(a),c.dot(a)<0){let z=l.start;l.start=l.end,l.end=z}const b=h.start.dot(c),M=h.end.dot(c),T=l.start.dot(c),A=l.end.dot(c),P=M<T,D=b<A;return b!==A&&T!==M&&P===D?!1:(y&&(u.subVectors(h.start,l.start),u.dot(c)>0?y.start.copy(h.start):y.start.copy(l.start),u.subVectors(h.end,l.end),u.dot(c)<0?y.end.copy(h.end):y.end.copy(l.end)),!0)}}})();ct.prototype.distanceToPoint=(function(){const n=new B;return function(e){return this.closestPointToPoint(e,n),e.distanceTo(n)}})();ct.prototype.distanceToTriangle=(function(){const n=new B,t=new B,e=["a","b","c"],i=new mt,r=new mt;return function(s,c=null,a=null){const u=c||a?i:null;if(this.intersectsTriangle(s,u))return(c||a)&&(c&&u.getCenter(c),a&&u.getCenter(a)),0;let f=1/0;for(let h=0;h<3;h++){let l;const d=e[h],m=s[d];this.closestPointToPoint(m,n),l=m.distanceToSquared(n),l<f&&(f=l,c&&c.copy(n),a&&a.copy(m));const x=this[d];s.closestPointToPoint(x,n),l=x.distanceToSquared(n),l<f&&(f=l,c&&c.copy(x),a&&a.copy(n))}for(let h=0;h<3;h++){const l=e[h],d=e[(h+1)%3];i.set(this[l],this[d]);for(let m=0;m<3;m++){const x=e[m],p=e[(m+1)%3];r.set(s[x],s[p]),$i(i,r,n,t);const y=n.distanceToSquared(t);y<f&&(f=y,c&&c.copy(n),a&&a.copy(t))}}return Math.sqrt(f)}})();class J{constructor(t,e,i){this.isOrientedBox=!0,this.min=new B,this.max=new B,this.matrix=new V,this.invMatrix=new V,this.points=new Array(8).fill().map(()=>new B),this.satAxes=new Array(3).fill().map(()=>new B),this.satBounds=new Array(3).fill().map(()=>new wt),this.alignedSatBounds=new Array(3).fill().map(()=>new wt),this.needsUpdate=!1,t&&this.min.copy(t),e&&this.max.copy(e),i&&this.matrix.copy(i)}set(t,e,i){this.min.copy(t),this.max.copy(e),this.matrix.copy(i),this.needsUpdate=!0}copy(t){this.min.copy(t.min),this.max.copy(t.max),this.matrix.copy(t.matrix),this.needsUpdate=!0}}J.prototype.update=(function(){return function(){const t=this.matrix,e=this.min,i=this.max,r=this.points;for(let u=0;u<=1;u++)for(let f=0;f<=1;f++)for(let h=0;h<=1;h++){const l=1*u|2*f|4*h,d=r[l];d.x=u?i.x:e.x,d.y=f?i.y:e.y,d.z=h?i.z:e.z,d.applyMatrix4(t)}const o=this.satBounds,s=this.satAxes,c=r[0];for(let u=0;u<3;u++){const f=s[u],h=o[u],l=1<<u,d=r[l];f.subVectors(c,d),h.setFromPoints(f,r)}const a=this.alignedSatBounds;a[0].setFromPointsField(r,"x"),a[1].setFromPointsField(r,"y"),a[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();J.prototype.intersectsBox=(function(){const n=new wt;return function(e){this.needsUpdate&&this.update();const i=e.min,r=e.max,o=this.satBounds,s=this.satAxes,c=this.alignedSatBounds;if(n.min=i.x,n.max=r.x,c[0].isSeparated(n)||(n.min=i.y,n.max=r.y,c[1].isSeparated(n))||(n.min=i.z,n.max=r.z,c[2].isSeparated(n)))return!1;for(let a=0;a<3;a++){const u=s[a],f=o[a];if(n.setFromBox(u,e),f.isSeparated(n))return!1}return!0}})();J.prototype.intersectsTriangle=(function(){const n=new ct,t=new Array(3),e=new wt,i=new wt,r=new B;return function(s){this.needsUpdate&&this.update(),s.isExtendedTriangle?s.needsUpdate&&s.update():(n.copy(s),n.update(),s=n);const c=this.satBounds,a=this.satAxes;t[0]=s.a,t[1]=s.b,t[2]=s.c;for(let l=0;l<3;l++){const d=c[l],m=a[l];if(e.setFromPoints(m,t),d.isSeparated(e))return!1}const u=s.satBounds,f=s.satAxes,h=this.points;for(let l=0;l<3;l++){const d=u[l],m=f[l];if(e.setFromPoints(m,h),d.isSeparated(e))return!1}for(let l=0;l<3;l++){const d=a[l];for(let m=0;m<4;m++){const x=f[m];if(r.crossVectors(d,x),e.setFromPoints(r,t),i.setFromPoints(r,h),e.isSeparated(i))return!1}}return!0}})();J.prototype.closestPointToPoint=(function(){return function(t,e){return this.needsUpdate&&this.update(),e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}})();J.prototype.distanceToPoint=(function(){const n=new B;return function(e){return this.closestPointToPoint(e,n),e.distanceTo(n)}})();J.prototype.distanceToBox=(function(){const n=["x","y","z"],t=new Array(12).fill().map(()=>new mt),e=new Array(12).fill().map(()=>new mt),i=new B,r=new B;return function(s,c=0,a=null,u=null){if(this.needsUpdate&&this.update(),this.intersectsBox(s))return(a||u)&&(s.getCenter(r),this.closestPointToPoint(r,i),s.closestPointToPoint(i,r),a&&a.copy(i),u&&u.copy(r)),0;const f=c*c,h=s.min,l=s.max,d=this.points;let m=1/0;for(let p=0;p<8;p++){const y=d[p];r.copy(y).clamp(h,l);const g=y.distanceToSquared(r);if(g<m&&(m=g,a&&a.copy(y),u&&u.copy(r),g<f))return Math.sqrt(g)}let x=0;for(let p=0;p<3;p++)for(let y=0;y<=1;y++)for(let g=0;g<=1;g++){const v=(p+1)%3,w=(p+2)%3,S=y<<v|g<<w,_=1<<p|y<<v|g<<w,b=d[S],M=d[_];t[x].set(b,M);const A=n[p],P=n[v],D=n[w],z=e[x],E=z.start,C=z.end;E[A]=h[A],E[P]=y?h[P]:l[P],E[D]=g?h[D]:l[P],C[A]=l[A],C[P]=y?h[P]:l[P],C[D]=g?h[D]:l[P],x++}for(let p=0;p<=1;p++)for(let y=0;y<=1;y++)for(let g=0;g<=1;g++){r.x=p?l.x:h.x,r.y=y?l.y:h.y,r.z=g?l.z:h.z,this.closestPointToPoint(r,i);const v=r.distanceToSquared(i);if(v<m&&(m=v,a&&a.copy(i),u&&u.copy(r),v<f))return Math.sqrt(v)}for(let p=0;p<12;p++){const y=t[p];for(let g=0;g<12;g++){const v=e[g];$i(y,v,i,r);const w=i.distanceToSquared(r);if(w<m&&(m=w,a&&a.copy(i),u&&u.copy(r),w<f))return Math.sqrt(w)}}return Math.sqrt(m)}})();class Hi{constructor(t){this._getNewPrimitive=t,this._primitives=[]}getPrimitive(){const t=this._primitives;return t.length===0?this._getNewPrimitive():t.pop()}releasePrimitive(t){this._primitives.push(t)}}class pa extends Hi{constructor(){super(()=>new ct)}}const st=new pa;class ma{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const t=[];let e=null;this.setBuffer=i=>{e&&t.push(e),e=i,this.float32Array=new Float32Array(i),this.uint16Array=new Uint16Array(i),this.uint32Array=new Uint32Array(i)},this.clearBuffer=()=>{e=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,t.length!==0&&this.setBuffer(t.pop())}}}const F=new ma;let Tt,ie;const Gt=[],He=new Hi(()=>new K);function ya(n,t,e,i,r,o){Tt=He.getPrimitive(),ie=He.getPrimitive(),Gt.push(Tt,ie),F.setBuffer(n._roots[t]);const s=li(0,n.geometry,e,i,r,o);F.clearBuffer(),He.releasePrimitive(Tt),He.releasePrimitive(ie),Gt.pop(),Gt.pop();const c=Gt.length;return c>0&&(ie=Gt[c-1],Tt=Gt[c-2]),s}function li(n,t,e,i,r=null,o=0,s=0){const{float32Array:c,uint16Array:a,uint32Array:u}=F;let f=n*2;if(tt(f,a)){const l=et(n,u),d=nt(f,a);return O(n,c,Tt),i(l,d,!1,s,o+n,Tt)}else{let A=function(D){const{uint16Array:z,uint32Array:E}=F;let C=D*2;for(;!tt(C,z);)D=it(D),C=D*2;return et(D,E)},P=function(D){const{uint16Array:z,uint32Array:E}=F;let C=D*2;for(;!tt(C,z);)D=rt(D,E),C=D*2;return et(D,E)+nt(C,z)};const l=it(n),d=rt(n,u);let m=l,x=d,p,y,g,v;if(r&&(g=Tt,v=ie,O(m,c,g),O(x,c,v),p=r(g),y=r(v),y<p)){m=d,x=l;const D=p;p=y,y=D,g=v}g||(g=Tt,O(m,c,g));const w=tt(m*2,a),S=e(g,w,p,s+1,o+m);let _;if(S===wr){const D=A(m),E=P(m)-D;_=i(D,E,!0,s+1,o+m,g)}else _=S&&li(m,t,e,i,r,o,s+1);if(_)return!0;v=ie,O(x,c,v);const b=tt(x*2,a),M=e(v,b,y,s+1,o+x);let T;if(M===wr){const D=A(x),E=P(x)-D;T=i(D,E,!0,s+1,o+x,v)}else T=M&&li(x,t,e,i,r,o,s+1);return!!T}}const de=new B,kn=new B;function ga(n,t,e={},i=0,r=1/0){const o=i*i,s=r*r;let c=1/0,a=null;if(n.shapecast({boundsTraverseOrder:f=>(de.copy(t).clamp(f.min,f.max),de.distanceToSquared(t)),intersectsBounds:(f,h,l)=>l<c&&l<s,intersectsTriangle:(f,h)=>{f.closestPointToPoint(t,de);const l=t.distanceToSquared(de);return l<c&&(kn.copy(de),c=l,a=h),l<o}}),c===1/0)return null;const u=Math.sqrt(c);return e.point?e.point.copy(kn):e.point=kn.clone(),e.distance=u,e.faceIndex=a,e}const xa=parseInt(Yr)>=169,Rt=new B,Ft=new B,Ot=new B,je=new q,We=new q,Ge=new q,Ar=new B,Tr=new B,Pr=new B,he=new B;function va(n,t,e,i,r,o,s,c){let a;if(o===qr?a=n.intersectTriangle(i,e,t,!0,r):a=n.intersectTriangle(t,e,i,o!==Rs,r),a===null)return null;const u=n.origin.distanceTo(r);return u<s||u>c?null:{distance:u,point:r.clone()}}function wa(n,t,e,i,r,o,s,c,a,u,f){Rt.fromBufferAttribute(t,o),Ft.fromBufferAttribute(t,s),Ot.fromBufferAttribute(t,c);const h=va(n,Rt,Ft,Ot,he,a,u,f);if(h){const l=new B;Jt.getBarycoord(he,Rt,Ft,Ot,l),i&&(je.fromBufferAttribute(i,o),We.fromBufferAttribute(i,s),Ge.fromBufferAttribute(i,c),h.uv=Jt.getInterpolation(he,Rt,Ft,Ot,je,We,Ge,new q)),r&&(je.fromBufferAttribute(r,o),We.fromBufferAttribute(r,s),Ge.fromBufferAttribute(r,c),h.uv1=Jt.getInterpolation(he,Rt,Ft,Ot,je,We,Ge,new q)),e&&(Ar.fromBufferAttribute(e,o),Tr.fromBufferAttribute(e,s),Pr.fromBufferAttribute(e,c),h.normal=Jt.getInterpolation(he,Rt,Ft,Ot,Ar,Tr,Pr,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:s,c,normal:new B,materialIndex:0};Jt.getNormal(Rt,Ft,Ot,d.normal),h.face=d,h.faceIndex=o,xa&&(h.barycoord=l)}return h}function bn(n,t,e,i,r,o,s){const c=i*3;let a=c+0,u=c+1,f=c+2;const h=n.index;n.index&&(a=h.getX(a),u=h.getX(u),f=h.getX(f));const{position:l,normal:d,uv:m,uv1:x}=n.attributes,p=wa(e,l,d,m,x,a,u,f,t,o,s);return p?(p.faceIndex=i,r&&r.push(p),p):null}function k(n,t,e,i){const r=n.a,o=n.b,s=n.c;let c=t,a=t+1,u=t+2;e&&(c=e.getX(c),a=e.getX(a),u=e.getX(u)),r.x=i.getX(c),r.y=i.getY(c),r.z=i.getZ(c),o.x=i.getX(a),o.y=i.getY(a),o.z=i.getZ(a),s.x=i.getX(u),s.y=i.getY(u),s.z=i.getZ(u)}function ba(n,t,e,i,r,o,s,c){const{geometry:a,_indirectBuffer:u}=n;for(let f=i,h=i+r;f<h;f++)bn(a,t,e,f,o,s,c)}function _a(n,t,e,i,r,o,s){const{geometry:c,_indirectBuffer:a}=n;let u=1/0,f=null;for(let h=i,l=i+r;h<l;h++){let d;d=bn(c,t,e,h,null,o,s),d&&d.distance<u&&(f=d,u=d.distance)}return f}function Sa(n,t,e,i,r,o,s){const{geometry:c}=e,{index:a}=c,u=c.attributes.position;for(let f=n,h=t+n;f<h;f++){let l;if(l=f,k(s,l*3,a,u),s.needsUpdate=!0,i(s,l,r,o))return!0}return!1}function Ma(n,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=n.geometry,i=e.index?e.index.array:null,r=e.attributes.position;let o,s,c,a,u=0;const f=n._roots;for(let l=0,d=f.length;l<d;l++)o=f[l],s=new Uint32Array(o),c=new Uint16Array(o),a=new Float32Array(o),h(0,u),u+=o.byteLength;function h(l,d,m=!1){const x=l*2;if(c[x+15]===wn){const y=s[l+6],g=c[x+14];let v=1/0,w=1/0,S=1/0,_=-1/0,b=-1/0,M=-1/0;for(let T=3*y,A=3*(y+g);T<A;T++){let P=i[T];const D=r.getX(P),z=r.getY(P),E=r.getZ(P);D<v&&(v=D),D>_&&(_=D),z<w&&(w=z),z>b&&(b=z),E<S&&(S=E),E>M&&(M=E)}return a[l+0]!==v||a[l+1]!==w||a[l+2]!==S||a[l+3]!==_||a[l+4]!==b||a[l+5]!==M?(a[l+0]=v,a[l+1]=w,a[l+2]=S,a[l+3]=_,a[l+4]=b,a[l+5]=M,!0):!1}else{const y=l+8,g=s[l+6],v=y+d,w=g+d;let S=m,_=!1,b=!1;t?S||(_=t.has(v),b=t.has(w),S=!_&&!b):(_=!0,b=!0);const M=S||_,T=S||b;let A=!1;M&&(A=h(y,d,S));let P=!1;T&&(P=h(g,d,S));const D=A||P;if(D)for(let z=0;z<3;z++){const E=y+z,C=g+z,I=a[E],N=a[E+3],lt=a[C],ut=a[C+3];a[l+z]=I<lt?I:lt,a[l+z+3]=N>ut?N:ut}return D}}}function Dt(n,t,e,i,r){let o,s,c,a,u,f;const h=1/e.direction.x,l=1/e.direction.y,d=1/e.direction.z,m=e.origin.x,x=e.origin.y,p=e.origin.z;let y=t[n],g=t[n+3],v=t[n+1],w=t[n+3+1],S=t[n+2],_=t[n+3+2];return h>=0?(o=(y-m)*h,s=(g-m)*h):(o=(g-m)*h,s=(y-m)*h),l>=0?(c=(v-x)*l,a=(w-x)*l):(c=(w-x)*l,a=(v-x)*l),o>a||c>s||((c>o||isNaN(o))&&(o=c),(a<s||isNaN(s))&&(s=a),d>=0?(u=(S-p)*d,f=(_-p)*d):(u=(_-p)*d,f=(S-p)*d),o>f||u>s)?!1:((u>o||o!==o)&&(o=u),(f<s||s!==s)&&(s=f),o<=r&&s>=i)}function Aa(n,t,e,i,r,o,s,c){const{geometry:a,_indirectBuffer:u}=n;for(let f=i,h=i+r;f<h;f++){let l=u?u[f]:f;bn(a,t,e,l,o,s,c)}}function Ta(n,t,e,i,r,o,s){const{geometry:c,_indirectBuffer:a}=n;let u=1/0,f=null;for(let h=i,l=i+r;h<l;h++){let d;d=bn(c,t,e,a?a[h]:h,null,o,s),d&&d.distance<u&&(f=d,u=d.distance)}return f}function Pa(n,t,e,i,r,o,s){const{geometry:c}=e,{index:a}=c,u=c.attributes.position;for(let f=n,h=t+n;f<h;f++){let l;if(l=e.resolveTriangleIndex(f),k(s,l*3,a,u),s.needsUpdate=!0,i(s,l,r,o))return!0}return!1}function Da(n,t,e,i,r,o,s){F.setBuffer(n._roots[t]),ui(0,n,e,i,r,o,s),F.clearBuffer()}function ui(n,t,e,i,r,o,s){const{float32Array:c,uint16Array:a,uint32Array:u}=F,f=n*2;if(tt(f,a)){const l=et(n,u),d=nt(f,a);ba(t,e,i,l,d,r,o,s)}else{const l=it(n);Dt(l,c,i,o,s)&&ui(l,t,e,i,r,o,s);const d=rt(n,u);Dt(d,c,i,o,s)&&ui(d,t,e,i,r,o,s)}}const Ba=["x","y","z"];function za(n,t,e,i,r,o){F.setBuffer(n._roots[t]);const s=fi(0,n,e,i,r,o);return F.clearBuffer(),s}function fi(n,t,e,i,r,o){const{float32Array:s,uint16Array:c,uint32Array:a}=F;let u=n*2;if(tt(u,c)){const h=et(n,a),l=nt(u,c);return _a(t,e,i,h,l,r,o)}else{const h=hs(n,a),l=Ba[h],m=i.direction[l]>=0;let x,p;m?(x=it(n),p=rt(n,a)):(x=rt(n,a),p=it(n));const g=Dt(x,s,i,r,o)?fi(x,t,e,i,r,o):null;if(g){const S=g.point[l];if(m?S<=s[p+h]:S>=s[p+h+3])return g}const w=Dt(p,s,i,r,o)?fi(p,t,e,i,r,o):null;return g&&w?g.distance<=w.distance?g:w:g||w||null}}const qe=new K,qt=new ct,Zt=new ct,pe=new V,Dr=new J,Ze=new J;function Ea(n,t,e,i){F.setBuffer(n._roots[t]);const r=di(0,n,e,i);return F.clearBuffer(),r}function di(n,t,e,i,r=null){const{float32Array:o,uint16Array:s,uint32Array:c}=F;let a=n*2;if(r===null&&(e.boundingBox||e.computeBoundingBox(),Dr.set(e.boundingBox.min,e.boundingBox.max,i),r=Dr),tt(a,s)){const f=t.geometry,h=f.index,l=f.attributes.position,d=e.index,m=e.attributes.position,x=et(n,c),p=nt(a,s);if(pe.copy(i).invert(),e.boundsTree)return O(n,o,Ze),Ze.matrix.copy(pe),Ze.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:g=>Ze.intersectsBox(g),intersectsTriangle:g=>{g.a.applyMatrix4(i),g.b.applyMatrix4(i),g.c.applyMatrix4(i),g.needsUpdate=!0;for(let v=x*3,w=(p+x)*3;v<w;v+=3)if(k(Zt,v,h,l),Zt.needsUpdate=!0,g.intersectsTriangle(Zt))return!0;return!1}});for(let y=x*3,g=(p+x)*3;y<g;y+=3){k(qt,y,h,l),qt.a.applyMatrix4(pe),qt.b.applyMatrix4(pe),qt.c.applyMatrix4(pe),qt.needsUpdate=!0;for(let v=0,w=d.count;v<w;v+=3)if(k(Zt,v,d,m),Zt.needsUpdate=!0,qt.intersectsTriangle(Zt))return!0}}else{const f=n+8,h=c[n+6];return O(f,o,qe),!!(r.intersectsBox(qe)&&di(f,t,e,i,r)||(O(h,o,qe),r.intersectsBox(qe)&&di(h,t,e,i,r)))}}const Xe=new V,Nn=new J,me=new J,Ca=new B,Ia=new B,Ua=new B,Ra=new B;function Fa(n,t,e,i={},r={},o=0,s=1/0){t.boundingBox||t.computeBoundingBox(),Nn.set(t.boundingBox.min,t.boundingBox.max,e),Nn.needsUpdate=!0;const c=n.geometry,a=c.attributes.position,u=c.index,f=t.attributes.position,h=t.index,l=st.getPrimitive(),d=st.getPrimitive();let m=Ca,x=Ia,p=null,y=null;r&&(p=Ua,y=Ra);let g=1/0,v=null,w=null;return Xe.copy(e).invert(),me.matrix.copy(Xe),n.shapecast({boundsTraverseOrder:S=>Nn.distanceToBox(S),intersectsBounds:(S,_,b)=>b<g&&b<s?(_&&(me.min.copy(S.min),me.max.copy(S.max),me.needsUpdate=!0),!0):!1,intersectsRange:(S,_)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:M=>me.distanceToBox(M),intersectsBounds:(M,T,A)=>A<g&&A<s,intersectsRange:(M,T)=>{for(let A=M,P=M+T;A<P;A++){k(d,3*A,h,f),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let D=S,z=S+_;D<z;D++){k(l,3*D,u,a),l.needsUpdate=!0;const E=l.distanceToTriangle(d,m,p);if(E<g&&(x.copy(m),y&&y.copy(p),g=E,v=D,w=A),E<o)return!0}}}});{const b=ae(t);for(let M=0,T=b;M<T;M++){k(d,3*M,h,f),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let A=S,P=S+_;A<P;A++){k(l,3*A,u,a),l.needsUpdate=!0;const D=l.distanceToTriangle(d,m,p);if(D<g&&(x.copy(m),y&&y.copy(p),g=D,v=A,w=M),D<o)return!0}}}}}),st.releasePrimitive(l),st.releasePrimitive(d),g===1/0?null:(i.point?i.point.copy(x):i.point=x.clone(),i.distance=g,i.faceIndex=v,r&&(r.point?r.point.copy(y):r.point=y.clone(),r.point.applyMatrix4(Xe),x.applyMatrix4(Xe),r.distance=x.sub(r.point).length(),r.faceIndex=w),i)}function Oa(n,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=n.geometry,i=e.index?e.index.array:null,r=e.attributes.position;let o,s,c,a,u=0;const f=n._roots;for(let l=0,d=f.length;l<d;l++)o=f[l],s=new Uint32Array(o),c=new Uint16Array(o),a=new Float32Array(o),h(0,u),u+=o.byteLength;function h(l,d,m=!1){const x=l*2;if(c[x+15]===wn){const y=s[l+6],g=c[x+14];let v=1/0,w=1/0,S=1/0,_=-1/0,b=-1/0,M=-1/0;for(let T=y,A=y+g;T<A;T++){const P=3*n.resolveTriangleIndex(T);for(let D=0;D<3;D++){let z=P+D;z=i?i[z]:z;const E=r.getX(z),C=r.getY(z),I=r.getZ(z);E<v&&(v=E),E>_&&(_=E),C<w&&(w=C),C>b&&(b=C),I<S&&(S=I),I>M&&(M=I)}}return a[l+0]!==v||a[l+1]!==w||a[l+2]!==S||a[l+3]!==_||a[l+4]!==b||a[l+5]!==M?(a[l+0]=v,a[l+1]=w,a[l+2]=S,a[l+3]=_,a[l+4]=b,a[l+5]=M,!0):!1}else{const y=l+8,g=s[l+6],v=y+d,w=g+d;let S=m,_=!1,b=!1;t?S||(_=t.has(v),b=t.has(w),S=!_&&!b):(_=!0,b=!0);const M=S||_,T=S||b;let A=!1;M&&(A=h(y,d,S));let P=!1;T&&(P=h(g,d,S));const D=A||P;if(D)for(let z=0;z<3;z++){const E=y+z,C=g+z,I=a[E],N=a[E+3],lt=a[C],ut=a[C+3];a[l+z]=I<lt?I:lt,a[l+z+3]=N>ut?N:ut}return D}}}function La(n,t,e,i,r,o,s){F.setBuffer(n._roots[t]),hi(0,n,e,i,r,o,s),F.clearBuffer()}function hi(n,t,e,i,r,o,s){const{float32Array:c,uint16Array:a,uint32Array:u}=F,f=n*2;if(tt(f,a)){const l=et(n,u),d=nt(f,a);Aa(t,e,i,l,d,r,o,s)}else{const l=it(n);Dt(l,c,i,o,s)&&hi(l,t,e,i,r,o,s);const d=rt(n,u);Dt(d,c,i,o,s)&&hi(d,t,e,i,r,o,s)}}const ka=["x","y","z"];function Na(n,t,e,i,r,o){F.setBuffer(n._roots[t]);const s=pi(0,n,e,i,r,o);return F.clearBuffer(),s}function pi(n,t,e,i,r,o){const{float32Array:s,uint16Array:c,uint32Array:a}=F;let u=n*2;if(tt(u,c)){const h=et(n,a),l=nt(u,c);return Ta(t,e,i,h,l,r,o)}else{const h=hs(n,a),l=ka[h],m=i.direction[l]>=0;let x,p;m?(x=it(n),p=rt(n,a)):(x=rt(n,a),p=it(n));const g=Dt(x,s,i,r,o)?pi(x,t,e,i,r,o):null;if(g){const S=g.point[l];if(m?S<=s[p+h]:S>=s[p+h+3])return g}const w=Dt(p,s,i,r,o)?pi(p,t,e,i,r,o):null;return g&&w?g.distance<=w.distance?g:w:g||w||null}}const Ye=new K,Xt=new ct,Yt=new ct,ye=new V,Br=new J,Ke=new J;function Va(n,t,e,i){F.setBuffer(n._roots[t]);const r=mi(0,n,e,i);return F.clearBuffer(),r}function mi(n,t,e,i,r=null){const{float32Array:o,uint16Array:s,uint32Array:c}=F;let a=n*2;if(r===null&&(e.boundingBox||e.computeBoundingBox(),Br.set(e.boundingBox.min,e.boundingBox.max,i),r=Br),tt(a,s)){const f=t.geometry,h=f.index,l=f.attributes.position,d=e.index,m=e.attributes.position,x=et(n,c),p=nt(a,s);if(ye.copy(i).invert(),e.boundsTree)return O(n,o,Ke),Ke.matrix.copy(ye),Ke.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:g=>Ke.intersectsBox(g),intersectsTriangle:g=>{g.a.applyMatrix4(i),g.b.applyMatrix4(i),g.c.applyMatrix4(i),g.needsUpdate=!0;for(let v=x,w=p+x;v<w;v++)if(k(Yt,3*t.resolveTriangleIndex(v),h,l),Yt.needsUpdate=!0,g.intersectsTriangle(Yt))return!0;return!1}});for(let y=x,g=p+x;y<g;y++){const v=t.resolveTriangleIndex(y);k(Xt,3*v,h,l),Xt.a.applyMatrix4(ye),Xt.b.applyMatrix4(ye),Xt.c.applyMatrix4(ye),Xt.needsUpdate=!0;for(let w=0,S=d.count;w<S;w+=3)if(k(Yt,w,d,m),Yt.needsUpdate=!0,Xt.intersectsTriangle(Yt))return!0}}else{const f=n+8,h=c[n+6];return O(f,o,Ye),!!(r.intersectsBox(Ye)&&mi(f,t,e,i,r)||(O(h,o,Ye),r.intersectsBox(Ye)&&mi(h,t,e,i,r)))}}const Qe=new V,Vn=new J,ge=new J,$a=new B,Ha=new B,ja=new B,Wa=new B;function Ga(n,t,e,i={},r={},o=0,s=1/0){t.boundingBox||t.computeBoundingBox(),Vn.set(t.boundingBox.min,t.boundingBox.max,e),Vn.needsUpdate=!0;const c=n.geometry,a=c.attributes.position,u=c.index,f=t.attributes.position,h=t.index,l=st.getPrimitive(),d=st.getPrimitive();let m=$a,x=Ha,p=null,y=null;r&&(p=ja,y=Wa);let g=1/0,v=null,w=null;return Qe.copy(e).invert(),ge.matrix.copy(Qe),n.shapecast({boundsTraverseOrder:S=>Vn.distanceToBox(S),intersectsBounds:(S,_,b)=>b<g&&b<s?(_&&(ge.min.copy(S.min),ge.max.copy(S.max),ge.needsUpdate=!0),!0):!1,intersectsRange:(S,_)=>{if(t.boundsTree){const b=t.boundsTree;return b.shapecast({boundsTraverseOrder:M=>ge.distanceToBox(M),intersectsBounds:(M,T,A)=>A<g&&A<s,intersectsRange:(M,T)=>{for(let A=M,P=M+T;A<P;A++){const D=b.resolveTriangleIndex(A);k(d,3*D,h,f),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let z=S,E=S+_;z<E;z++){const C=n.resolveTriangleIndex(z);k(l,3*C,u,a),l.needsUpdate=!0;const I=l.distanceToTriangle(d,m,p);if(I<g&&(x.copy(m),y&&y.copy(p),g=I,v=z,w=A),I<o)return!0}}}})}else{const b=ae(t);for(let M=0,T=b;M<T;M++){k(d,3*M,h,f),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let A=S,P=S+_;A<P;A++){const D=n.resolveTriangleIndex(A);k(l,3*D,u,a),l.needsUpdate=!0;const z=l.distanceToTriangle(d,m,p);if(z<g&&(x.copy(m),y&&y.copy(p),g=z,v=A,w=M),z<o)return!0}}}}}),st.releasePrimitive(l),st.releasePrimitive(d),g===1/0?null:(i.point?i.point.copy(x):i.point=x.clone(),i.distance=g,i.faceIndex=v,r&&(r.point?r.point.copy(y):r.point=y.clone(),r.point.applyMatrix4(Qe),x.applyMatrix4(Qe),r.distance=x.sub(r.point).length(),r.faceIndex=w),i)}function qa(){return typeof SharedArrayBuffer<"u"}const Te=new F.constructor,mn=new F.constructor,St=new Hi(()=>new K),Kt=new K,Qt=new K,$n=new K,Hn=new K;let jn=!1;function Za(n,t,e,i){if(jn)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");jn=!0;const r=n._roots,o=t._roots;let s,c=0,a=0;const u=new V().copy(e).invert();for(let f=0,h=r.length;f<h;f++){Te.setBuffer(r[f]),a=0;const l=St.getPrimitive();O(0,Te.float32Array,l),l.applyMatrix4(u);for(let d=0,m=o.length;d<m&&(mn.setBuffer(o[d]),s=ot(0,0,e,u,i,c,a,0,0,l),mn.clearBuffer(),a+=o[d].length,!s);d++);if(St.releasePrimitive(l),Te.clearBuffer(),c+=r[f].length,s)break}return jn=!1,s}function ot(n,t,e,i,r,o=0,s=0,c=0,a=0,u=null,f=!1){let h,l;f?(h=mn,l=Te):(h=Te,l=mn);const d=h.float32Array,m=h.uint32Array,x=h.uint16Array,p=l.float32Array,y=l.uint32Array,g=l.uint16Array,v=n*2,w=t*2,S=tt(v,x),_=tt(w,g);let b=!1;if(_&&S)f?b=r(et(t,y),nt(t*2,g),et(n,m),nt(n*2,x),a,s+t,c,o+n):b=r(et(n,m),nt(n*2,x),et(t,y),nt(t*2,g),c,o+n,a,s+t);else if(_){const M=St.getPrimitive();O(t,p,M),M.applyMatrix4(e);const T=it(n),A=rt(n,m);O(T,d,Kt),O(A,d,Qt);const P=M.intersectsBox(Kt),D=M.intersectsBox(Qt);b=P&&ot(t,T,i,e,r,s,o,a,c+1,M,!f)||D&&ot(t,A,i,e,r,s,o,a,c+1,M,!f),St.releasePrimitive(M)}else{const M=it(t),T=rt(t,y);O(M,p,$n),O(T,p,Hn);const A=u.intersectsBox($n),P=u.intersectsBox(Hn);if(A&&P)b=ot(n,M,e,i,r,o,s,c,a+1,u,f)||ot(n,T,e,i,r,o,s,c,a+1,u,f);else if(A)if(S)b=ot(n,M,e,i,r,o,s,c,a+1,u,f);else{const D=St.getPrimitive();D.copy($n).applyMatrix4(e);const z=it(n),E=rt(n,m);O(z,d,Kt),O(E,d,Qt);const C=D.intersectsBox(Kt),I=D.intersectsBox(Qt);b=C&&ot(M,z,i,e,r,s,o,a,c+1,D,!f)||I&&ot(M,E,i,e,r,s,o,a,c+1,D,!f),St.releasePrimitive(D)}else if(P)if(S)b=ot(n,T,e,i,r,o,s,c,a+1,u,f);else{const D=St.getPrimitive();D.copy(Hn).applyMatrix4(e);const z=it(n),E=rt(n,m);O(z,d,Kt),O(E,d,Qt);const C=D.intersectsBox(Kt),I=D.intersectsBox(Qt);b=C&&ot(T,z,i,e,r,s,o,a,c+1,D,!f)||I&&ot(T,E,i,e,r,s,o,a,c+1,D,!f),St.releasePrimitive(D)}}return b}const Je=new J,zr=new K,Xa={strategy:us,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null};class se{static serialize(t,e={}){e={cloneBuffers:!0,...e};const i=t.geometry,r=t._roots,o=t._indirectBuffer,s=i.getIndex();let c;return e.cloneBuffers?c={roots:r.map(a=>a.slice()),index:s?s.array.slice():null,indirectBuffer:o?o.slice():null}:c={roots:r,index:s?s.array:null,indirectBuffer:o},c}static deserialize(t,e,i={}){i={setIndex:!0,indirect:!!t.indirectBuffer,...i};const{index:r,roots:o,indirectBuffer:s}=t,c=new se(e,{...i,[Rn]:!0});if(c._roots=o,c._indirectBuffer=s||null,i.setIndex){const a=e.getIndex();if(a===null){const u=new Q(t.index,1,!1);e.setIndex(u)}else a.array!==r&&(a.array.set(r),a.needsUpdate=!0)}return c}get indirect(){return!!this._indirectBuffer}constructor(t,e={}){if(t.isBufferGeometry){if(t.index&&t.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(e=Object.assign({...Xa,[Rn]:!1},e),e.useSharedArrayBuffer&&!qa())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=t,this._roots=null,this._indirectBuffer=null,e[Rn]||(ua(this,e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new K))),this.resolveTriangleIndex=e.indirect?i=>this._indirectBuffer[i]:i=>i}refit(t=null){return(this.indirect?Oa:Ma)(this,t)}traverse(t,e=0){const i=this._roots[e],r=new Uint32Array(i),o=new Uint16Array(i);s(0);function s(c,a=0){const u=c*2,f=o[u+15]===wn;if(f){const h=r[c+6],l=o[u+14];t(a,f,new Float32Array(i,c*4,6),h,l)}else{const h=c+Ae/4,l=r[c+6],d=r[c+7];t(a,f,new Float32Array(i,c*4,6),d)||(s(h,a+1),s(l,a+1))}}}raycast(t,e=Jn,i=0,r=1/0){const o=this._roots,s=this.geometry,c=[],a=e.isMaterial,u=Array.isArray(e),f=s.groups,h=a?e.side:e,l=this.indirect?La:Da;for(let d=0,m=o.length;d<m;d++){const x=u?e[f[d].materialIndex].side:h,p=c.length;if(l(this,d,x,t,c,i,r),u){const y=f[d].materialIndex;for(let g=p,v=c.length;g<v;g++)c[g].face.materialIndex=y}}return c}raycastFirst(t,e=Jn,i=0,r=1/0){const o=this._roots,s=this.geometry,c=e.isMaterial,a=Array.isArray(e);let u=null;const f=s.groups,h=c?e.side:e,l=this.indirect?Na:za;for(let d=0,m=o.length;d<m;d++){const x=a?e[f[d].materialIndex].side:h,p=l(this,d,x,t,i,r);p!=null&&(u==null||p.distance<u.distance)&&(u=p,a&&(p.face.materialIndex=f[d].materialIndex))}return u}intersectsGeometry(t,e){let i=!1;const r=this._roots,o=this.indirect?Va:Ea;for(let s=0,c=r.length;s<c&&(i=o(this,s,t,e),!i);s++);return i}shapecast(t){const e=st.getPrimitive(),i=this.indirect?Pa:Sa;let{boundsTraverseOrder:r,intersectsBounds:o,intersectsRange:s,intersectsTriangle:c}=t;if(s&&c){const h=s;s=(l,d,m,x,p)=>h(l,d,m,x,p)?!0:i(l,d,this,c,m,x,e)}else s||(c?s=(h,l,d,m)=>i(h,l,this,c,d,m,e):s=(h,l,d)=>d);let a=!1,u=0;const f=this._roots;for(let h=0,l=f.length;h<l;h++){const d=f[h];if(a=ya(this,h,o,s,r,u),a)break;u+=d.byteLength}return st.releasePrimitive(e),a}bvhcast(t,e,i){let{intersectsRanges:r,intersectsTriangles:o}=i;const s=st.getPrimitive(),c=this.geometry.index,a=this.geometry.attributes.position,u=this.indirect?m=>{const x=this.resolveTriangleIndex(m);k(s,x*3,c,a)}:m=>{k(s,m*3,c,a)},f=st.getPrimitive(),h=t.geometry.index,l=t.geometry.attributes.position,d=t.indirect?m=>{const x=t.resolveTriangleIndex(m);k(f,x*3,h,l)}:m=>{k(f,m*3,h,l)};if(o){const m=(x,p,y,g,v,w,S,_)=>{for(let b=y,M=y+g;b<M;b++){d(b),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let T=x,A=x+p;T<A;T++)if(u(T),s.needsUpdate=!0,o(s,f,T,b,v,w,S,_))return!0}return!1};if(r){const x=r;r=function(p,y,g,v,w,S,_,b){return x(p,y,g,v,w,S,_,b)?!0:m(p,y,g,v,w,S,_,b)}}else r=m}return Za(this,t,e,r)}intersectsBox(t,e){return Je.set(t.min,t.max,e),Je.needsUpdate=!0,this.shapecast({intersectsBounds:i=>Je.intersectsBox(i),intersectsTriangle:i=>Je.intersectsTriangle(i)})}intersectsSphere(t){return this.shapecast({intersectsBounds:e=>t.intersectsBox(e),intersectsTriangle:e=>e.intersectsSphere(t)})}closestPointToGeometry(t,e,i={},r={},o=0,s=1/0){return(this.indirect?Ga:Fa)(this,t,e,i,r,o,s)}closestPointToPoint(t,e={},i=0,r=1/0){return ga(this,t,e,i,r)}getBoundingBox(t){return t.makeEmpty(),this._roots.forEach(i=>{O(0,new Float32Array(i),zr),t.union(zr)}),t}}const Er=new K,Cr=new V;class Ya extends Pe{get isMesh(){return!this.displayEdges}get isLineSegments(){return this.displayEdges}get isLine(){return this.displayEdges}getVertexPosition(...t){return Y.prototype.getVertexPosition.call(this,...t)}constructor(t,e,i=10,r=0){super(),this.material=e,this.geometry=new Bt,this.name="MeshBVHRootHelper",this.depth=i,this.displayParents=!1,this.bvh=t,this.displayEdges=!0,this._group=r}raycast(){}update(){const t=this.geometry,e=this.bvh,i=this._group;if(t.dispose(),this.visible=!1,e){const r=this.depth-1,o=this.displayParents;let s=0;e.traverse((l,d)=>{if(l>=r||d)return s++,!0;o&&s++},i);let c=0;const a=new Float32Array(24*s);e.traverse((l,d,m)=>{const x=l>=r||d;if(x||o){O(0,m,Er);const{min:p,max:y}=Er;for(let g=-1;g<=1;g+=2){const v=g<0?p.x:y.x;for(let w=-1;w<=1;w+=2){const S=w<0?p.y:y.y;for(let _=-1;_<=1;_+=2){const b=_<0?p.z:y.z;a[c+0]=v,a[c+1]=S,a[c+2]=b,c+=3}}}return x}},i);let u,f;this.displayEdges?f=new Uint8Array([0,4,1,5,2,6,3,7,0,2,1,3,4,6,5,7,0,1,2,3,4,5,6,7]):f=new Uint8Array([0,1,2,2,1,3,4,6,5,6,7,5,1,4,5,0,4,1,2,3,6,3,7,6,0,2,4,2,6,4,1,5,3,3,5,7]),a.length>65535?u=new Uint32Array(f.length*s):u=new Uint16Array(f.length*s);const h=f.length;for(let l=0;l<s;l++){const d=l*8,m=l*h;for(let x=0;x<h;x++)u[m+x]=d+f[x]}t.setIndex(new Q(u,1,!1)),t.setAttribute("position",new Q(a,3,!1)),this.visible=!0}}}class Re extends be{get color(){return this.edgeMaterial.color}get opacity(){return this.edgeMaterial.opacity}set opacity(t){this.edgeMaterial.opacity=t,this.meshMaterial.opacity=t}constructor(t=null,e=null,i=10){t instanceof se&&(i=e||10,e=t,t=null),typeof e=="number"&&(i=e,e=null),super(),this.name="MeshBVHHelper",this.depth=i,this.mesh=t,this.bvh=e,this.displayParents=!1,this.displayEdges=!0,this.objectIndex=0,this._roots=[];const r=new Fs({color:65416,transparent:!0,opacity:.3,depthWrite:!1}),o=new Ht({color:65416,transparent:!0,opacity:.3,depthWrite:!1});o.color=r.color,this.edgeMaterial=r,this.meshMaterial=o,this.update()}update(){const t=this.mesh;let e=this.bvh||t.geometry.boundsTree||null;if(t.isBatchedMesh&&t.boundsTrees&&!e){const r=t._drawInfo[this.objectIndex];r&&(e=t.boundsTrees[r.geometryIndex]||e)}const i=e?e._roots.length:0;for(;this._roots.length>i;){const r=this._roots.pop();r.geometry.dispose(),this.remove(r)}for(let r=0;r<i;r++){const{depth:o,edgeMaterial:s,meshMaterial:c,displayParents:a,displayEdges:u}=this;if(r>=this._roots.length){const h=new Ya(e,s,o,r);this.add(h),this._roots.push(h)}const f=this._roots[r];f.bvh=e,f.depth=o,f.displayParents=a,f.displayEdges=u,f.material=u?s:c,f.update()}}updateMatrixWorld(...t){const e=this.mesh,i=this.parent;e!==null&&(e.updateWorldMatrix(!0,!1),i?this.matrix.copy(i.matrixWorld).invert().multiply(e.matrixWorld):this.matrix.copy(e.matrixWorld),(e.isInstancedMesh||e.isBatchedMesh)&&(e.getMatrixAt(this.objectIndex,Cr),this.matrix.multiply(Cr)),this.matrix.decompose(this.position,this.quaternion,this.scale)),super.updateMatrixWorld(...t)}copy(t){this.depth=t.depth,this.mesh=t.mesh,this.bvh=t.bvh,this.opacity=t.opacity,this.color.copy(t.color)}clone(){return new Re(this.mesh,this.bvh,this.depth)}dispose(){this.edgeMaterial.dispose(),this.meshMaterial.dispose();const t=this.children;for(let e=0,i=t.length;e<i;e++)t[e].geometry.dispose()}}function Ir(n,t,e){return n===null?null:(n.point.applyMatrix4(t.matrixWorld),n.distance=n.point.distanceTo(e.ray.origin),n.object=t,n)}const Ka=parseInt(Yr)>=166,tn=new _i,Ur=new B,Rr=new V,Qa=Y.prototype.raycast,Ja=an.prototype.raycast,Fr=new B,j=new Y,en=[];function ys(n,t){this.isBatchedMesh?tc.call(this,n,t):ec.call(this,n,t)}function tc(n,t){if(this.boundsTrees){const e=this.boundsTrees,i=this._drawInfo||this._instanceInfo,r=this._drawRanges||this._geometryInfo,o=this.matrixWorld;j.material=this.material,j.geometry=this.geometry;const s=j.geometry.boundsTree,c=j.geometry.drawRange;j.geometry.boundingSphere===null&&(j.geometry.boundingSphere=new oe);for(let a=0,u=i.length;a<u;a++){if(!this.getVisibleAt(a))continue;const f=i[a].geometryIndex;if(j.geometry.boundsTree=e[f],this.getMatrixAt(a,j.matrixWorld).premultiply(o),!j.geometry.boundsTree){this.getBoundingBoxAt(f,j.geometry.boundingBox),this.getBoundingSphereAt(f,j.geometry.boundingSphere);const h=r[f];j.geometry.setDrawRange(h.start,h.count)}j.raycast(n,en);for(let h=0,l=en.length;h<l;h++){const d=en[h];d.object=this,d.batchId=a,t.push(d)}en.length=0}j.geometry.boundsTree=s,j.geometry.drawRange=c,j.material=null,j.geometry=null}else Ja.call(this,n,t)}function ec(n,t){if(this.geometry.boundsTree){if(this.material===void 0)return;Rr.copy(this.matrixWorld).invert(),tn.copy(n.ray).applyMatrix4(Rr),Fr.setFromMatrixScale(this.matrixWorld),Ur.copy(tn.direction).multiply(Fr);const e=Ur.length(),i=n.near/e,r=n.far/e,o=this.geometry.boundsTree;if(n.firstHitOnly===!0){const s=Ir(o.raycastFirst(tn,this.material,i,r),this,n);s&&t.push(s)}else{const s=o.raycast(tn,this.material,i,r);for(let c=0,a=s.length;c<a;c++){const u=Ir(s[c],this,n);u&&t.push(u)}}}else Qa.call(this,n,t)}function nc(n={}){return this.boundsTree=new se(this,n),this.boundsTree}function ic(){this.boundsTree=null}function rc(n=-1,t={}){if(!Ka)throw new Error("BatchedMesh: Three r166+ is required to compute bounds trees.");t.indirect&&console.warn('"Indirect" is set to false because it is not supported for BatchedMesh.'),t={...t,indirect:!1,range:null};const e=this._drawRanges||this._geometryInfo,i=this._geometryCount;this.boundsTrees||(this.boundsTrees=new Array(i).fill(null));const r=this.boundsTrees;for(;r.length<i;)r.push(null);if(n<0){for(let o=0;o<i;o++)t.range=e[o],r[o]=new se(this.geometry,t);return r}else return n<e.length&&(t.range=e[n],r[n]=new se(this.geometry,t)),r[n]||null}function sc(n=-1){n<0?this.boundsTrees.fill(null):n<this.boundsTree.length&&(this.boundsTrees[n]=null)}const oc=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`,ac=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`,cc=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,lc=cc,uc=`
	${oc}
	${ac}
`,mu=`#define ENVMAP_TYPE_CUBE_UV
precision highp isampler2D;
precision highp usampler2D;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying mat4 vModelMatrixInverse;

#ifdef USE_INSTANCING_COLOR
	varying vec3 vInstanceColor;
#endif

#ifdef ENVMAP_TYPE_CUBEM
	uniform samplerCube envMap;
#else
	uniform sampler2D envMap;
#endif

uniform float bounces;
${lc}
${uc}
uniform BVH bvh;
uniform float ior;
uniform bool correctMips;
uniform vec2 resolution;
uniform float fresnel;
uniform mat4 modelMatrix;
uniform mat4 projectionMatrixInverse;
uniform mat4 viewMatrixInverse;
uniform float aberrationStrength;
uniform vec3 color;

float fresnelFunc(vec3 viewDirection, vec3 worldNormal) {
	return pow( 1.0 + dot( viewDirection, worldNormal), 10.0 );
}

vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 normal, float ior, mat4 modelMatrixInverse) {
	vec3 rayOrigin = ro;
	vec3 rayDirection = rd;
	rayDirection = refract(rayDirection, normal, 1.0 / ior);
	rayOrigin = vWorldPosition + rayDirection * 0.001;
	rayOrigin = (modelMatrixInverse * vec4(rayOrigin, 1.0)).xyz;
	rayDirection = normalize((modelMatrixInverse * vec4(rayDirection, 0.0)).xyz);
	for(float i = 0.0; i < bounces; i++) {
		uvec4 faceIndices = uvec4( 0u );
		vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
		vec3 barycoord = vec3( 0.0 );
		float side = 1.0;
		float dist = 0.0;
		bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
		vec3 hitPos = rayOrigin + rayDirection * max(dist - 0.001, 0.0);
		vec3 tempDir = refract(rayDirection, faceNormal, ior);
		if (length(tempDir) != 0.0) {
			rayDirection = tempDir;
			break;
		}
		rayDirection = reflect(rayDirection, faceNormal);
		rayOrigin = hitPos + rayDirection * 0.01;
	}
	rayDirection = normalize((modelMatrix * vec4(rayDirection, 0.0)).xyz);
	return rayDirection;
}

#include <common>
#include <cube_uv_reflection_fragment>

#ifdef ENVMAP_TYPE_CUBEM
	vec4 textureGradient(samplerCube envMap, vec3 rayDirection, vec3 directionCamPerfect) {
		return textureGrad(envMap, rayDirection, dFdx(correctMips ? directionCamPerfect: rayDirection), dFdy(correctMips ? directionCamPerfect: rayDirection));
	}
#else
	vec4 textureGradient(sampler2D envMap, vec3 rayDirection, vec3 directionCamPerfect) {
		vec2 uvv = equirectUv( rayDirection );
		vec2 smoothUv = equirectUv( directionCamPerfect );
		return textureGrad(envMap, uvv, dFdx(correctMips ? smoothUv : uvv), dFdy(correctMips ? smoothUv : uvv));
	}
#endif

void main() {
	vec2 uv = gl_FragCoord.xy / resolution;
	vec3 directionCamPerfect = (projectionMatrixInverse * vec4(uv * 2.0 - 1.0, 0.0, 1.0)).xyz;
	directionCamPerfect = (viewMatrixInverse * vec4(directionCamPerfect, 0.0)).xyz;
	directionCamPerfect = normalize(directionCamPerfect);
	vec3 normal = vNormal;
	vec3 rayOrigin = cameraPosition;
	vec3 rayDirection = normalize(vWorldPosition - cameraPosition);
	vec3 finalColor;
	#ifdef CHROMATIC_ABERRATIONS
		vec3 rayDirectionG = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), vModelMatrixInverse);
		#ifdef FAST_CHROMA
			vec3 rayDirectionR = normalize(rayDirectionG + 1.0 * vec3(aberrationStrength / 2.0));
			vec3 rayDirectionB = normalize(rayDirectionG - 1.0 * vec3(aberrationStrength / 2.0));
		#else
			vec3 rayDirectionR = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 - aberrationStrength), 1.0), vModelMatrixInverse);
			vec3 rayDirectionB = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 + aberrationStrength), 1.0), vModelMatrixInverse);
		#endif
		float finalColorR = textureGradient(envMap, rayDirectionR, directionCamPerfect).r;
		float finalColorG = textureGradient(envMap, rayDirectionG, directionCamPerfect).g;
		float finalColorB = textureGradient(envMap, rayDirectionB, directionCamPerfect).b;
		finalColor = vec3(finalColorR, finalColorG, finalColorB);
	#else
		rayDirection = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), vModelMatrixInverse);
		finalColor = textureGradient(envMap, rayDirection, directionCamPerfect).rgb;
	#endif

	finalColor *= color;
	#ifdef USE_INSTANCING_COLOR
		finalColor *= vInstanceColor;
	#endif

	vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
	float nFresnel = fresnelFunc(viewDirection, normal) * fresnel;
	gl_FragColor = vec4(mix(finalColor, vec3(1.0), nFresnel), 1.0);
	${at.tonemapping_fragment}
	${at.colorspace_fragment}
}`,fc=new K;function yu(n,t){Di(t,!0);const{renderStage:e}=gn();let i=At(t,"auto",3,!1),r=At(t,"box",3,fc),o=At(t,"stage",19,()=>Js("<Resize>",{before:e})),s=At(t,"ref",15),c=ts(t,["$$slots","$$events","$$legacy","axis","auto","box","precise","onresize","stage","ref","children"]);const a=new be,u=new be,f=new be,h=()=>{f.matrixWorld.identity();const{max:y,min:g}=r().setFromObject(u,t.precise),v=y.x-g.x,w=y.y-g.y,S=y.z-g.z,_=t.axis==="x"?v:t.axis==="y"?w:t.axis==="z"?S:Math.max(v,w,S);f.scale.setScalar(1/_),t.onresize?.()};let l=ne(!1);const d=()=>{ee(l,!0)};Ei(()=>{h(),stop()},{stage:o(),running:()=>X(l)});const m=d;qi(()=>[t.axis,t.precise],d);const x=y=>{Pt(y.ref,"Object3D")&&qi.pre(()=>[y.ref],()=>(i()&&d(),()=>{i()&&d()}))};var p={resize:m};return Mt(n,Jr({get is(){return a}},()=>c,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Resize/Resize.svelte",index:0},get ref(){return s()},set ref(y){s(y)},children:(y,g)=>{Mt(y,{get is(){return f},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Resize/Resize.svelte",index:1},children:(v,w)=>{Mt(v,{get is(){return u},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Resize/Resize.svelte",index:2},children:(S,_)=>{Wo(S,{name:"resize",plugin:x,children:(b,M)=>{var T=Ci(),A=_e(T);Ii(A,()=>t.children??zi,()=>({ref:a,resize:d})),Se(b,T)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})),Bi(p)}const Wn=typeof window<"u"?document.createElement("div"):void 0,gu=()=>{es("transitions",n=>{if(!Wn||!n.props.in&&!n.props.out&&!n.props.transition)return;const{invalidate:t}=gn();Wn.dispatchEvent=c=>(c.type==="introstart"?n.props.onintrostart?.():c.type==="outrostart"?n.props.onoutrostart?.():c.type==="introend"?n.props.onintroend?.():c.type==="outroend"&&n.props.onoutroend?.(),!0);const e=c=>(a,u,f)=>{const h=c(n.ref,{direction:f.direction});return{...h,tick(...l){t(),h?.tick?.(...l)}}},i=["in","out","transition"],r={in:5,out:6,transition:7},o={in:1,out:2,transition:3},s=Xs;s&&!("transitions"in s)&&s.nodes==null&&(s.nodes={start:null,end:null,a:null,t:null});for(const c of i){const a=n.props[c];if(a){const f="global"in a?r[c]:o[c];to(f,Wn,()=>e(a))}}return{pluginProps:["in","out","transition","onintrostart","onoutrostart","onintroend","onoutroend"]}})};var dc=Object.defineProperty,hc=(n,t,e)=>t in n?dc(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,R=(n,t,e)=>(hc(n,typeof t!="symbol"?t+"":t,e),e);const gs=/\bvoid\s+main\s*\(\s*\)\s*{/g;function yi(n){const t=/^[ \t]*#include +<([\w\d./]+)>/gm;function e(i,r){let o=at[r];return o?yi(o):i}return n.replace(t,e)}const W=[];for(let n=0;n<256;n++)W[n]=(n<16?"0":"")+n.toString(16);function pc(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(W[n&255]+W[n>>8&255]+W[n>>16&255]+W[n>>24&255]+"-"+W[t&255]+W[t>>8&255]+"-"+W[t>>16&15|64]+W[t>>24&255]+"-"+W[e&63|128]+W[e>>8&255]+"-"+W[e>>16&255]+W[e>>24&255]+W[i&255]+W[i>>8&255]+W[i>>16&255]+W[i>>24&255]).toUpperCase()}const Lt=Object.assign||function(){let n=arguments[0];for(let t=1,e=arguments.length;t<e;t++){let i=arguments[t];if(i)for(let r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n[r]=i[r])}return n},mc=Date.now(),Or=new WeakMap,Lr=new Map;let yc=1e10;function yn(n,t){const e=wc(t);let i=Or.get(n);if(i||Or.set(n,i=Object.create(null)),i[e])return new i[e];const r=`_onBeforeCompile${e}`,o=function(u,f){n.onBeforeCompile.call(this,u,f);const h=this.customProgramCacheKey()+"|"+u.vertexShader+"|"+u.fragmentShader;let l=Lr[h];if(!l){const d=gc(this,u,t,e);l=Lr[h]=d}u.vertexShader=l.vertexShader,u.fragmentShader=l.fragmentShader,Lt(u.uniforms,this.uniforms),t.timeUniform&&(u.uniforms[t.timeUniform]={get value(){return Date.now()-mc}}),this[r]&&this[r](u)},s=function(){return c(t.chained?n:n.clone())},c=function(u){const f=Object.create(u,a);return Object.defineProperty(f,"baseMaterial",{value:n}),Object.defineProperty(f,"id",{value:yc++}),f.uuid=pc(),f.uniforms=Lt({},u.uniforms,t.uniforms),f.defines=Lt({},u.defines,t.defines),f.defines[`TROIKA_DERIVED_MATERIAL_${e}`]="",f.extensions=Lt({},u.extensions,t.extensions),f._listeners=void 0,f},a={constructor:{value:s},isDerivedMaterial:{value:!0},type:{get:()=>n.type,set:u=>{n.type=u}},isDerivedFrom:{writable:!0,configurable:!0,value:function(u){const f=this.baseMaterial;return u===f||f.isDerivedMaterial&&f.isDerivedFrom(u)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return n.customProgramCacheKey()+"|"+e}},onBeforeCompile:{get(){return o},set(u){this[r]=u}},copy:{writable:!0,configurable:!0,value:function(u){return n.copy.call(this,u),!n.isShaderMaterial&&!n.isDerivedMaterial&&(Lt(this.extensions,u.extensions),Lt(this.defines,u.defines),Lt(this.uniforms,Si.clone(u.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const u=new n.constructor;return c(u).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let u=this._depthMaterial;return u||(u=this._depthMaterial=yn(n.isDerivedMaterial?n.getDepthMaterial():new js({depthPacking:Ws}),t),u.defines.IS_DEPTH_MATERIAL="",u.uniforms=this.uniforms),u}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let u=this._distanceMaterial;return u||(u=this._distanceMaterial=yn(n.isDerivedMaterial?n.getDistanceMaterial():new Hs,t),u.defines.IS_DISTANCE_MATERIAL="",u.uniforms=this.uniforms),u}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:u,_distanceMaterial:f}=this;u&&u.dispose(),f&&f.dispose(),n.dispose.call(this)}}};return i[e]=s,new s}function gc(n,{vertexShader:t,fragmentShader:e},i,r){let{vertexDefs:o,vertexMainIntro:s,vertexMainOutro:c,vertexTransform:a,fragmentDefs:u,fragmentMainIntro:f,fragmentMainOutro:h,fragmentColorTransform:l,customRewriter:d,timeUniform:m}=i;if(o=o||"",s=s||"",c=c||"",u=u||"",f=f||"",h=h||"",(a||d)&&(t=yi(t)),(l||d)&&(e=e.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),e=yi(e)),d){let x=d({vertexShader:t,fragmentShader:e});t=x.vertexShader,e=x.fragmentShader}if(l){let x=[];e=e.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,p=>(x.push(p),"")),h=`${l}
${x.join(`
`)}
${h}`}if(m){const x=`
uniform float ${m};
`;o=x+o,u=x+u}return a&&(t=`vec3 troika_position_${r};
vec3 troika_normal_${r};
vec2 troika_uv_${r};
${t}
`,o=`${o}
void troikaVertexTransform${r}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${a}
}
`,s=`
troika_position_${r} = vec3(position);
troika_normal_${r} = vec3(normal);
troika_uv_${r} = vec2(uv);
troikaVertexTransform${r}(troika_position_${r}, troika_normal_${r}, troika_uv_${r});
${s}
`,t=t.replace(/\b(position|normal|uv)\b/g,(x,p,y,g)=>/\battribute\s+vec[23]\s+$/.test(g.substr(0,y))?p:`troika_${p}_${r}`),n.map&&n.map.channel>0||(t=t.replace(/\bMAP_UV\b/g,`troika_uv_${r}`))),t=kr(t,r,o,s,c),e=kr(e,r,u,f,h),{vertexShader:t,fragmentShader:e}}function kr(n,t,e,i,r){return(i||r||e)&&(n=n.replace(gs,`
${e}
void troikaOrigMain${t}() {`),n+=`
void main() {
  ${i}
  troikaOrigMain${t}();
  ${r}
}`),n}function xc(n,t){return n==="uniforms"?void 0:typeof t=="function"?t.toString():t}let vc=0;const Nr=new Map;function wc(n){const t=JSON.stringify(n,xc);let e=Nr.get(t);return e==null&&Nr.set(t,e=++vc),e}const bc={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _c(n){let t=bc[n.type];return t?we[t]:n}function Vr(n){let t=/\buniform\s+(int|float|vec[234]|mat[34])\s+([A-Za-z_][\w]*)/g,e=Object.create(null),i;for(;(i=t.exec(n))!==null;)e[i[2]]=i[1];return e}function Sc(n){let t=[],e="";const i=yn(n,{chained:!0,customRewriter({vertexShader:o,fragmentShader:s}){let c=[],a=[],u=[],f=Vr(o),h=Vr(s);return t.forEach(l=>{let d=f[l],m=h[l];const x=d||m;if(x){const p=new RegExp(`\\buniform\\s+${x}\\s+${l}\\s*;`,"g"),y=new RegExp(`\\b${l}\\b`,"g"),g=`troika_attr_${l}`,v=`troika_vary_${l}`;if(c.push(`attribute ${x} ${g};`),d&&(o=o.replace(p,""),o=o.replace(y,g)),m){s=s.replace(p,""),s=s.replace(y,v);let w=`varying ${m} ${v};`;c.push(w),u.push(w),a.push(`${v} = ${g};`)}}}),o=`${c.join(`
`)}
${o.replace(gs,`
$&
${a.join(`
`)}`)}`,u.length&&(s=`${u.join(`
`)}
${s}`),{vertexShader:o,fragmentShader:s}}});i.setUniformNames=function(o){t=o||[];const s=t.sort().join("|");s!==e&&(e=s,this.needsUpdate=!0)};const r=i.customProgramCacheKey();return i.customProgramCacheKey=function(){return r+"|"+e},i.isInstancedUniformsMaterial=!0,i}class Mc extends Ns{constructor(t,e,i){super(t,e,i),this._maxCount=i,this._instancedUniformNames=[]}get geometry(){let t=this._derivedGeometry;const e=this._baseGeometry;return(!t||t.baseGeometry!==e)&&(t=this._derivedGeometry=Object.create(e),t.baseGeometry=e,t.attributes=Object.create(e.attributes),e.addEventListener("dispose",function i(){e.removeEventListener("dispose",i),t.dispose()})),t}set geometry(t){this._baseGeometry=t}get material(){let t=this._derivedMaterial;const e=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=new Ht);return(!t||t.baseMaterial!==e)&&(t=this._derivedMaterial=Sc(e),e.addEventListener("dispose",function i(){e.removeEventListener("dispose",i),t.dispose()})),t.setUniformNames(this._instancedUniformNames),t}set material(t){if(Array.isArray(t))throw new Error("InstancedUniformsMesh does not support multiple materials");for(;t&&t.isInstancedUniformsMaterial;)t=t.baseMaterial;this._baseMaterial=t}get customDepthMaterial(){return this.material.getDepthMaterial()}set customDepthMaterial(t){}get customDistanceMaterial(){return this.material.getDistanceMaterial()}set customDistanceMaterial(t){}setUniformAt(t,e,i){const r=this.geometry.attributes,o=`troika_attr_${t}`;let s=r[o];if(!s){const c=Ac(this._baseMaterial,t),a=Tc(c);if(s=r[o]=new Vs(new Float32Array(a*this._maxCount),a),c!==null)for(let u=0;u<this._maxCount;u++)$r(s,u,c);this._instancedUniformNames=[...this._instancedUniformNames,t]}$r(s,e,i),s.needsUpdate=!0}unsetUniform(t){this.geometry.deleteAttribute(`troika_attr_${t}`),this._instancedUniformNames=this._instancedUniformNames.filter(e=>e!==t)}}function $r(n,t,e){let i=n.itemSize;i===1?n.setX(t,e):i===2?n.setXY(t,e.x,e.y):i===3?e.isColor?n.setXYZ(t,e.r,e.g,e.b):n.setXYZ(t,e.x,e.y,e.z):i===4?n.setXYZW(t,e.x,e.y,e.z,e.w):e.toArray?e.toArray(n.array,t*i):n.set(e,t*i)}function Ac(n,t){let e=n.uniforms;return e&&e[t]||(e=_c(n).uniforms,e&&e[t])?e[t].value:null}function Tc(n){return n==null?0:typeof n=="number"?1:n.isVector2?2:n.isVector3||n.isColor?3:n.isVector4||n.isQuaternion?4:n.elements?n.elements.length:Array.isArray(n)?n.length:0}const Pc=(n,t)=>{const e=n.split(`
`),i=/vMapUv|vAlphaMapUv|vNormalMapUv/g;return e.map(r=>!r.includes("varying")&&!r.includes("uniform")?r.replace(i,t):r).join(`
`)},Dc=(n,t)=>{const e={USE_UV:""};return t&&(e.TRI_GEOMETRY=""),yn(n,{defines:e,uniforms:{animationData:{value:null},animationDataSize:{value:0},billboarding:{value:0},flipX:{value:0},flipY:{value:0},spritesheetData:{value:null},dataSize:{value:new q(0,0)},tint:{value:new zt(0,0,0,0)}},vertexDefs:`
    uniform float billboarding;
    flat varying int vId;
    `,vertexMainOutro:`
    vId = gl_InstanceID;
    if(billboarding == 1.){
      vec3 instancePosition = vec3(instanceMatrix[3]);
      vec3 instanceScale = vec3(length(instanceMatrix[0]), length(instanceMatrix[1]), length(instanceMatrix[2]));

      vec3 cameraRight_worldspace = vec3(modelViewMatrix[0][0], modelViewMatrix[1][0], modelViewMatrix[2][0]);
      vec3 cameraUp_worldspace = vec3(modelViewMatrix[0][1], modelViewMatrix[1][1], modelViewMatrix[2][1]);

      vec3 vertexPosition_worldspace = instancePosition
        + cameraRight_worldspace * position.x * instanceScale.x
        + cameraUp_worldspace * position.y * instanceScale.y;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition_worldspace, 1.0);
    }
    `,customRewriter:({vertexShader:i,fragmentShader:r})=>(r=r.replace("void main() {",`void main() {
      float y = float(vId / animationDataSize) / float(animationDataSize);
      float x = mod(float(vId),float(animationDataSize)) / float(animationDataSize);

      float spritesheetFrameId = texture2D(animationData, vec2(x,y)).r;

			// x,y,w,h
			vec4 frameMeta = readData(spritesheetFrameId, 0.f);

			vec2 fSize = frameMeta.zw;
			vec2 fOffset = vec2(frameMeta.xy);

      vec2 transformedPlaneUv = vUv + vec2(0.,0.);

      // todo  == 1. caused a flickering bug. look into Precision/interpolation?
      if(flipX > 0.){
        transformedPlaneUv.x = 1. - transformedPlaneUv.x;
      }
      if(flipY > 0.){
        transformedPlaneUv.y = 1. - transformedPlaneUv.y;
      }

			vec2 spriteUv = fSize * transformedPlaneUv + fOffset ;

      #ifdef TRI_GEOMETRY
        // Shift UVs if mesh uses triangle geometry
        // TODO optimize ugly math
        if(vUv.y>0.5 || vUv.x<0.25 || vUv.x>0.75){
          discard;
        }

        vec2 zoomCenter = vec2(fSize.x * 0.5,0.) + fOffset;
        float zoomFactor = 2.;
        vec2 shiftedUV = spriteUv - zoomCenter;
        shiftedUV *= zoomFactor;
        shiftedUV += zoomCenter;
        spriteUv = shiftedUV;
      #endif



			`),r=`
			
			uniform sampler2D animationData;
      uniform int animationDataSize;
			uniform sampler2D spritesheetData;
      uniform float startTime;
			uniform float time;
			uniform float flipX;
			uniform float flipY;
			uniform vec2 dataSize;
      uniform vec4 tint;

      flat varying int vId;
			
			
			vec4 readData(float col, float row) {
				float wStep = 1.f / dataSize.x;
				float wHalfStep = wStep * 0.5f;
				float hStep = 1.f / dataSize.y;
				float hHalfStep = 1.f / dataSize.y * 0.5f;
				return texture2D(spritesheetData, vec2(col * wStep + wHalfStep, row * hStep + hHalfStep));
			}

      vec2 zoomUV(vec2 uv, vec2 zoomCenter, float zoomFactor) {
        // Shift UVs so that the zoom center is the origin
        vec2 shiftedUV = uv - zoomCenter;

        // Scale (zoom) the UV coordinates
        shiftedUV *= zoomFactor;

        // Shift back
        shiftedUV += zoomCenter;

        return shiftedUV;
    }
			
			${r}
			`,r=r.replace("vec4 sampledDiffuseColor = texture2D( map, vMapUv );",`
        vec4 sampledDiffuseColor = texture2D( map, vMapUv );
        if(tint.w == 1.){
          vec3 hue_term = 1.0 - min(abs(vec3(tint.x) - vec3(0,2.0,1.0)), 1.0);
          hue_term.x = 1.0 - dot(hue_term.yz, vec2(1));
          vec3 res = vec3(dot(sampledDiffuseColor.xyz, hue_term.xyz), dot(sampledDiffuseColor.xyz, hue_term.zxy), dot(sampledDiffuseColor.xyz, hue_term.yzx));
          res = mix(vec3(dot(res, vec3(0.2, 0.5, 0.3))), res, tint.y);
          res = res * tint.z;

          sampledDiffuseColor = vec4(res, sampledDiffuseColor.a);
        }

        // sampledDiffuseColor = vec4(texture2D(animationData, vUv).rgb, 1.);
      `),r=Pc(r,"spriteUv"),{vertexShader:i,fragmentShader:r})})},xu=n=>{const t=[],e=[],i={},r=[],o=n.meta.size.w,s=n.meta.size.h,c=[n.meta.size.w,n.meta.size.h];for(const a in n.frames){const u=n.frames[a];t.push([u.frame.x/o,u.frame.y/s,u.frame.w/o,u.frame.h/s]),e.push(u.duration)}for(const a of n.meta.frameTags){i[a.name]=[];for(let u=a.from;u<=a.to;u++)i[a.name].push([u,e[u]]);r.push(i[a.name].length)}return{frames:t,animations:i,sheetSize:c,animationLengths:r}},Bc=n=>{const{frames:t,animationLengths:e,animations:i}=n,r=Math.max(t.length,e.length,...Object.values(i).map(d=>d.length)),o=2+Object.values(i).length,s=t.flat().concat(new Array((r-t.length)*4).fill(0)),c=e.map(d=>[d,0,0,0]).flat().concat(new Array((r-e.length)*4).fill(0)),a=[],u=new Map;for(let d=0;d<Object.keys(i).length;d++){const m=Object.keys(i)[d];u.set(m,d);const x=i[m].map(p=>[...p,0,0]).flat().concat(new Array((r-i[m].length)*4).fill(0));a.push(...x)}const f=[...s,...c,...a],h=new Float32Array(f);h.set(f);const l=new Pi(h,r,o,dn,Be);return l.type=Be,l.minFilter=pt,l.magFilter=pt,l.wrapS=hn,l.wrapT=De,l.needsUpdate=!0,{dataTexture:l,dataWidth:r,dataHeight:o,animMap:u}},zc=()=>{const n=new Bt,t=new Float32Array([0,1,0,-1,-1,0,1,-1,0]);n.setAttribute("position",new Q(t,3));const e=new Float32Array([.5,1,0,0,1,0]);return n.setAttribute("uv",new Q(e,2)),n.computeVertexNormals(),n},Ec=new Gr(-1,1,1,-1,0,1);class Cc extends Bt{constructor(){super(),this.setAttribute("position",new kt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new kt([0,2,0,0,2,0],2))}}const Ic=new Cc;class Uc{constructor(t){this._mesh=new Y(Ic,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Ec)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Rc{constructor(t,e,i){this.variables=[],this.currentTextureIndex=0;let r=Be;const o={passThruTexture:{value:null}},s=u(h(),o),c=new Uc(s);this.setDataType=function(l){return r=l,this},this.addVariable=function(l,d,m){const x=this.createShaderMaterial(d),p={name:l,initialValueTexture:m,material:x,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:pt,magFilter:pt};return this.variables.push(p),p},this.setVariableDependencies=function(l,d){l.dependencies=d},this.init=function(){if(i.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let l=0;l<this.variables.length;l++){const d=this.variables[l];d.renderTargets[0]=this.createRenderTarget(t,e,d.wrapS,d.wrapT,d.minFilter,d.magFilter),d.renderTargets[1]=this.createRenderTarget(t,e,d.wrapS,d.wrapT,d.minFilter,d.magFilter),this.renderTexture(d.initialValueTexture,d.renderTargets[0]),this.renderTexture(d.initialValueTexture,d.renderTargets[1]);const m=d.material,x=m.uniforms;if(d.dependencies!==null)for(let p=0;p<d.dependencies.length;p++){const y=d.dependencies[p];if(y.name!==d.name){let g=!1;for(let v=0;v<this.variables.length;v++)if(y.name===this.variables[v].name){g=!0;break}if(!g)return"Variable dependency not found. Variable="+d.name+", dependency="+y.name}x[y.name]={value:null},m.fragmentShader=`
uniform sampler2D `+y.name+`;
`+m.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){const l=this.currentTextureIndex,d=this.currentTextureIndex===0?1:0;for(let m=0,x=this.variables.length;m<x;m++){const p=this.variables[m];if(p.dependencies!==null){const y=p.material.uniforms;for(let g=0,v=p.dependencies.length;g<v;g++){const w=p.dependencies[g];y[w.name].value=w.renderTargets[l].texture}}this.doRenderTarget(p.material,p.renderTargets[d])}this.currentTextureIndex=d},this.getCurrentRenderTarget=function(l){return l.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(l){return l.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){c.dispose();const l=this.variables;for(let d=0;d<l.length;d++){const m=l[d];m.initialValueTexture&&m.initialValueTexture.dispose();const x=m.renderTargets;for(let p=0;p<x.length;p++)x[p].dispose()}};function a(l){l.defines.resolution="vec2( "+t.toFixed(1)+", "+e.toFixed(1)+" )"}this.addResolutionDefine=a;function u(l,d){d=d||{};const m=new Zr({name:"GPUComputationShader",uniforms:d,vertexShader:f(),fragmentShader:l});return a(m),m}this.createShaderMaterial=u,this.createRenderTarget=function(l,d,m,x,p,y){return l=l||t,d=d||e,m=m||hn,x=x||hn,p=p||pt,y=y||pt,new $s(l,d,{wrapS:m,wrapT:x,minFilter:p,magFilter:y,format:dn,type:r,depthBuffer:!1})},this.createTexture=function(){const l=new Float32Array(t*e*4),d=new Pi(l,t,e,dn,Be);return d.needsUpdate=!0,d},this.renderTexture=function(l,d){o.passThruTexture.value=l,this.doRenderTarget(s,d),o.passThruTexture.value=null},this.doRenderTarget=function(l,d){const m=i.getRenderTarget(),x=i.xr.enabled,p=i.shadowMap.autoUpdate;i.xr.enabled=!1,i.shadowMap.autoUpdate=!1,c.material=l,i.setRenderTarget(d),c.render(i),c.material=s,i.xr.enabled=x,i.shadowMap.autoUpdate=p,i.setRenderTarget(m)};function f(){return`void main()	{

	gl_Position = vec4( position, 1.0 );

}
`}function h(){return`uniform sampler2D passThruTexture;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = texture2D( passThruTexture, uv );

}
`}}}const Fc=`
  #include <common>
  uniform sampler2D instructionsTexture;

  uniform sampler2D spritesheetData;
  uniform vec2 dataSize;
  uniform float fps;
  uniform float deltaTime;

  // read spritesheet metadata
  vec4 readData(float col, float row, sampler2D tex) {
    float wStep = 1.f / dataSize.x;
    float wHalfStep = wStep * 0.5f;
    float hStep = 1.f / dataSize.y;
    float hHalfStep = 1.f / dataSize.y * 0.5f;
    return texture2D(spritesheetData, vec2(col * wStep + wHalfStep, row * hStep + hHalfStep));
  }



  void main()	{

    // OUTPUT FROM THIS SHADER
    // progressValue.r - picked animation frame
    // progressValue.g - previous progress state (for pause, reverse & pingpong consistency)
    // progressValue.b - not used yet
    // progressValue.a - previous animationID

    vec2 cellSize = 1.0 / resolution.xy;
    vec2 uv = gl_FragCoord.xy * cellSize;


    vec4 progressValue = texture2D( progress, uv );

    vec4 instructions = texture2D( instructionsTexture, uv);

    // FREEZE FRAME - return to save calculations?
    if(instructions.a >=10.){
      progressValue.r = instructions.a - 10.;
      progressValue.a = instructions.x;
      progressValue.g = progressValue.g;
      gl_FragColor = progressValue;
      return;
    }


    progressValue.b = 0.;

    // todo shouldn't be rounding here, pick
    float animationId = round(instructions.x);

    float offset = instructions.g;

    float animLength = readData(animationId, 1.f, spritesheetData).r;
    float totalTime = animLength / fps;

    // new delta is % of animation
    float newProgress = deltaTime / totalTime;
    // add new delta to saved progress
    float frameTimedId = mod(progressValue.g + newProgress, 1.);
    // frameTimedId = 0.;
    // float frameTimedId = progressValue.g;
    // save for use in next frame



    float playMode = mod(instructions.b, 10.);

    // forward
    if(playMode == 0.){
      frameTimedId = progressValue.g + newProgress;
    }
    // reverse
    if(playMode == 1.){
      frameTimedId = progressValue.g - newProgress;
    }
    // 2 - pause - do nothing
    if(playMode == 2.){
      frameTimedId = progressValue.g;
    }

    // //todo pingpong
    // if(playMode == 3.){
    // }

    // loop (play once over 10.)
    if(instructions.b < 10.){
      frameTimedId = mod(frameTimedId, 1.);
    }

    // todo This could be optional and user would reset manually,
    // todo allowing for consistent movement across multiple animations
    // todo for example - running steps being syncec
    // start anim from beginning if animationID changes
    if(progressValue.a != instructions.x){
      frameTimedId = 0.;
    }

    float frameId = floor(animLength * frameTimedId);
    float spritesheetFrameId = readData(frameId, 2.f + animationId, spritesheetData).r;



    // Picked sprite frame that goes to material
    progressValue.r = spritesheetFrameId;

    progressValue.a = instructions.x;
    progressValue.g = frameTimedId;

    gl_FragColor = progressValue;
  }
`,Oc=(n=512)=>{const t=new Float32Array(n**2*4);for(let i=0;i<n**2*4;i++)t[i]=0;const e=new Pi(t,n,n,dn,Be);return e.minFilter=pt,e.magFilter=pt,e.wrapS=hn,e.wrapT=De,e.needsUpdate=!0,e},Lc=n=>{if(n<=0)return 1;let t=1;for(;t<n;)t<<=1;return t},kc=(n,t)=>{const e=Lc(Math.sqrt(t)),i=new Rc(e,e,n),r=i.createTexture(),o=i.addVariable("progress",Fc,r),s=Oc(e);o.material.uniforms.instructionsTexture={value:s},o.material.uniforms.spritesheetData={value:null},o.material.uniforms.fps={value:0},o.material.uniforms.deltaTime={value:0},o.material.uniforms.dataSize={value:new q},i.setVariableDependencies(o,[o]);const c=i.init();c!==null&&console.error(c);let a=!1;return{gpuCompute:i,animationRunner:o,progressDataTexture:s,utils:{updateAnimationAt:(u,f)=>{const h=u*4;s.image.data[h]=f,a=!0},updateOffsetAt:(u,f)=>{const h=u*4;s.image.data[h+1]=f,a=!0},updatePlaymodeAt:(u,f)=>{const h=u*4;s.image.data[h+2]=f,a=!0},updateFrameAt:(u,f)=>{const h=u*4;s.image.data[h+3]=f+10,a=!0}},update:()=>{a&&(s.needsUpdate=!0,a=!1),i.compute()}}};class Nc{constructor(){R(this,"_previousTime"),R(this,"_currentTime"),R(this,"_startTime"),R(this,"_delta"),R(this,"_elapsed"),R(this,"_timescale"),R(this,"_useFixedDelta"),R(this,"_fixedDelta"),R(this,"_usePageVisibilityAPI"),R(this,"_pageVisibilityHandler"),this._previousTime=0,this._currentTime=0,this._startTime=Gn(),this._delta=0,this._elapsed=0,this._timescale=1,this._useFixedDelta=!1,this._fixedDelta=16.67,this._usePageVisibilityAPI=typeof document<"u"&&document.hidden!==void 0,this._usePageVisibilityAPI===!0&&(this._pageVisibilityHandler=Vc.bind(this),document.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disableFixedDelta(){return this._useFixedDelta=!1,this}dispose(){return this._usePageVisibilityAPI===!0&&document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this}enableFixedDelta(){return this._useFixedDelta=!0,this}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getFixedDelta(){return this._fixedDelta/1e3}getTimescale(){return this._timescale}reset(){return this._currentTime=Gn()-this._startTime,this}setFixedDelta(t){return this._fixedDelta=t*1e3,this}setTimescale(t){return this._timescale=t,this}update(){return this._useFixedDelta===!0?this._delta=this._fixedDelta:(this._previousTime=this._currentTime,this._currentTime=Gn()-this._startTime,this._delta=this._currentTime-this._previousTime),this._delta*=this._timescale,this._elapsed+=this._delta,this}}function Gn(){return(typeof performance>"u"?Date:performance).now()}function Vc(){document.hidden===!1&&this.reset()}const qn={FORWARD:0,REVERSE:1,PAUSE:2,PINGPONG:3};class vu extends Mc{constructor(t,e,i,r={geometry:"quad"}){let o;r.geometry||(r.geometry="quad"),r.geometry==="tri"&&(o=zc()),r.geometry==="quad"&&(o=new Os(1,1)),r.geometry&&typeof r.geometry!="string"&&(o=r.geometry);const s=Dc(t,r?.geometry==="tri");super(o,s,e),R(this,"_spriteMaterial"),R(this,"_spritesheet"),R(this,"_animationMap"),R(this,"_fps",15),R(this,"_timer"),R(this,"compute"),this.instanceMatrix.clearUpdateRanges(),this.instanceMatrix.addUpdateRange(0,e*16),this.instanceColor&&(this.instanceColor.clearUpdateRanges(),this.instanceColor.addUpdateRange(0,e*3)),this.compute=kc(i,e),this._spriteMaterial=s,r.spritesheet&&this.updateSpritesheet(r.spritesheet),this._timer=new Nc,this._animationMap=new Map,this._spriteMaterial.uniforms.animationData.value=this.compute.gpuCompute.getCurrentRenderTarget(this.compute.animationRunner).texture,this._spriteMaterial.uniforms.animationDataSize.value=this.compute.progressDataTexture.image.width}updateSpritesheet(t){const{dataTexture:e,dataWidth:i,dataHeight:r,animMap:o}=Bc(t);this._spriteMaterial.uniforms.spritesheetData.value=e,this._spriteMaterial.uniforms.dataSize.value.x=i,this._spriteMaterial.uniforms.dataSize.value.y=r,this.compute.animationRunner.material.uniforms.dataSize.value=new q(i,r),this.compute.animationRunner.material.uniforms.spritesheetData.value=e,this._animationMap=o}get spritesheet(){return this._spritesheet}set spritesheet(t){this.updateSpritesheet(t),this._spritesheet=t}get animationMap(){return this._animationMap}get animation(){return{setAt:(t,e)=>{this.compute.utils.updateAnimationAt(t,this._animationMap.get(e)||0)}}}get frame(){return{setAt:(t,e,i)=>{var r;let o=e;i&&(o=(r=this.spritesheet)==null?void 0:r.animations[i][e][0]),this.compute.utils.updateFrameAt(t,o)},unsetAt:t=>{this.compute.utils.updateFrameAt(t,-10)},unsetAll:()=>{for(let t=0;t<this.count;t++)this.compute.utils.updateFrameAt(t,-10)}}}get playmode(){return{setAt:(t,e)=>{this.compute.utils.updatePlaymodeAt(t,qn[e])},setAll:t=>{for(let e=0;e<this.count;e++){const i=this.compute.progressDataTexture.image.data[e*4+2]>=10?10:0;this.compute.utils.updatePlaymodeAt(e,i+qn[t])}}}}get billboarding(){return{setAt:(t,e)=>{this.setUniformAt("billboarding",t,e?1:0)},setAll:t=>{this._spriteMaterial.uniforms.billboarding.value=t?1:0},unsetAll:()=>{this.unsetUniform("billboarding")}}}get offset(){return{setAt:(t,e)=>{this.compute.utils.updateOffsetAt(t,e)},randomizeAll:(t=1)=>{for(let e=0;e<this.count;e++)this.compute.utils.updateOffsetAt(e,Math.random()*t)}}}get loop(){return{setAt:(t,e)=>{const i=this.compute.progressDataTexture.image.data[t*4+2]%10;this.compute.utils.updatePlaymodeAt(t,i+(e?0:10))},setAll:t=>{for(let e=0;e<this.count;e++){const i=this.compute.progressDataTexture.image.data[e*4+2]%10;this.compute.utils.updatePlaymodeAt(e,i+(t?0:10))}}}}get flipX(){return{setAt:(t,e)=>{this.setUniformAt("flipX",t,e?1:0)},setGlobal:t=>{this._spriteMaterial.uniforms.flipX.value=t?1:0},unsetAll:()=>{this.unsetUniform("flipX")}}}get flipY(){return{setAt:(t,e)=>{this.setUniformAt("flipY",t,e?1:0)},setGlobal:t=>{this._spriteMaterial.uniforms.flipY.value=t?1:0},unsetAll:()=>{this.unsetUniform("flipY")}}}play(t,e=!0,i="FORWARD"){return{at:r=>{this.compute.utils.updateAnimationAt(r,this._animationMap.get(t)||0),this.compute.utils.updatePlaymodeAt(r,qn[i]+(e?0:10))}}}get hueShift(){const t=new zt;return{setGlobal:e=>{e?t.set(e.h,e.s,e.v,1):t.setW(0),this._spriteMaterial.uniforms.tint.value=t}}}get fps(){return this._fps}set fps(t){this._fps=t,this.compute.animationRunner.material.uniforms.fps.value=t}update(){this._timer.update();const t=this._timer.getDelta();this.compute.animationRunner.material.uniforms.deltaTime.value=t,this.compute.update()}}function $c(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var ji={exports:{}};ji.exports=_n;ji.exports.default=_n;function _n(n,t,e){e=e||2;var i=t&&t.length,r=i?t[0]*e:n.length,o=xs(n,0,r,e,!0),s=[];if(!o||o.next===o.prev)return s;var c,a,u,f,h,l,d;if(i&&(o=qc(n,t,o,e)),n.length>80*e){c=u=n[0],a=f=n[1];for(var m=e;m<r;m+=e)h=n[m],l=n[m+1],h<c&&(c=h),l<a&&(a=l),h>u&&(u=h),l>f&&(f=l);d=Math.max(u-c,f-a),d=d!==0?32767/d:0}return Ee(o,s,e,c,a,d,0),s}function xs(n,t,e,i,r){var o,s;if(r===vi(n,t,e,i)>0)for(o=t;o<e;o+=i)s=Hr(o,n[o],n[o+1],s);else for(o=e-i;o>=t;o-=i)s=Hr(o,n[o],n[o+1],s);return s&&Sn(s,s.next)&&(Ie(s),s=s.next),s}function $t(n,t){if(!n)return n;t||(t=n);var e=n,i;do if(i=!1,!e.steiner&&(Sn(e,e.next)||L(e.prev,e,e.next)===0)){if(Ie(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Ee(n,t,e,i,r,o,s){if(n){!s&&o&&Qc(n,i,r,o);for(var c=n,a,u;n.prev!==n.next;){if(a=n.prev,u=n.next,o?jc(n,i,r,o):Hc(n)){t.push(a.i/e|0),t.push(n.i/e|0),t.push(u.i/e|0),Ie(n),n=u.next,c=u.next;continue}if(n=u,n===c){s?s===1?(n=Wc($t(n),t,e),Ee(n,t,e,i,r,o,2)):s===2&&Gc(n,t,e,i,r,o):Ee($t(n),t,e,i,r,o,1);break}}}}function Hc(n){var t=n.prev,e=n,i=n.next;if(L(t,e,i)>=0)return!1;for(var r=t.x,o=e.x,s=i.x,c=t.y,a=e.y,u=i.y,f=r<o?r<s?r:s:o<s?o:s,h=c<a?c<u?c:u:a<u?a:u,l=r>o?r>s?r:s:o>s?o:s,d=c>a?c>u?c:u:a>u?a:u,m=i.next;m!==t;){if(m.x>=f&&m.x<=l&&m.y>=h&&m.y<=d&&re(r,c,o,a,s,u,m.x,m.y)&&L(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function jc(n,t,e,i){var r=n.prev,o=n,s=n.next;if(L(r,o,s)>=0)return!1;for(var c=r.x,a=o.x,u=s.x,f=r.y,h=o.y,l=s.y,d=c<a?c<u?c:u:a<u?a:u,m=f<h?f<l?f:l:h<l?h:l,x=c>a?c>u?c:u:a>u?a:u,p=f>h?f>l?f:l:h>l?h:l,y=gi(d,m,t,e,i),g=gi(x,p,t,e,i),v=n.prevZ,w=n.nextZ;v&&v.z>=y&&w&&w.z<=g;){if(v.x>=d&&v.x<=x&&v.y>=m&&v.y<=p&&v!==r&&v!==s&&re(c,f,a,h,u,l,v.x,v.y)&&L(v.prev,v,v.next)>=0||(v=v.prevZ,w.x>=d&&w.x<=x&&w.y>=m&&w.y<=p&&w!==r&&w!==s&&re(c,f,a,h,u,l,w.x,w.y)&&L(w.prev,w,w.next)>=0))return!1;w=w.nextZ}for(;v&&v.z>=y;){if(v.x>=d&&v.x<=x&&v.y>=m&&v.y<=p&&v!==r&&v!==s&&re(c,f,a,h,u,l,v.x,v.y)&&L(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;w&&w.z<=g;){if(w.x>=d&&w.x<=x&&w.y>=m&&w.y<=p&&w!==r&&w!==s&&re(c,f,a,h,u,l,w.x,w.y)&&L(w.prev,w,w.next)>=0)return!1;w=w.nextZ}return!0}function Wc(n,t,e){var i=n;do{var r=i.prev,o=i.next.next;!Sn(r,o)&&vs(r,i,i.next,o)&&Ce(r,o)&&Ce(o,r)&&(t.push(r.i/e|0),t.push(i.i/e|0),t.push(o.i/e|0),Ie(i),Ie(i.next),i=n=o),i=i.next}while(i!==n);return $t(i)}function Gc(n,t,e,i,r,o){var s=n;do{for(var c=s.next.next;c!==s.prev;){if(s.i!==c.i&&el(s,c)){var a=ws(s,c);s=$t(s,s.next),a=$t(a,a.next),Ee(s,t,e,i,r,o,0),Ee(a,t,e,i,r,o,0);return}c=c.next}s=s.next}while(s!==n)}function qc(n,t,e,i){var r=[],o,s,c,a,u;for(o=0,s=t.length;o<s;o++)c=t[o]*i,a=o<s-1?t[o+1]*i:n.length,u=xs(n,c,a,i,!1),u===u.next&&(u.steiner=!0),r.push(tl(u));for(r.sort(Zc),o=0;o<r.length;o++)e=Xc(r[o],e);return e}function Zc(n,t){return n.x-t.x}function Xc(n,t){var e=Yc(n,t);if(!e)return t;var i=ws(e,n);return $t(i,i.next),$t(e,e.next)}function Yc(n,t){var e=t,i=n.x,r=n.y,o=-1/0,s;do{if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){var c=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(c<=i&&c>o&&(o=c,s=e.x<e.next.x?e:e.next,c===i))return s}e=e.next}while(e!==t);if(!s)return null;var a=s,u=s.x,f=s.y,h=1/0,l;e=s;do i>=e.x&&e.x>=u&&i!==e.x&&re(r<f?i:o,r,u,f,r<f?o:i,r,e.x,e.y)&&(l=Math.abs(r-e.y)/(i-e.x),Ce(e,n)&&(l<h||l===h&&(e.x>s.x||e.x===s.x&&Kc(s,e)))&&(s=e,h=l)),e=e.next;while(e!==a);return s}function Kc(n,t){return L(n.prev,n,t.prev)<0&&L(t.next,n,n.next)<0}function Qc(n,t,e,i){var r=n;do r.z===0&&(r.z=gi(r.x,r.y,t,e,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Jc(r)}function Jc(n){var t,e,i,r,o,s,c,a,u=1;do{for(e=n,n=null,o=null,s=0;e;){for(s++,i=e,c=0,t=0;t<u&&(c++,i=i.nextZ,!!i);t++);for(a=u;c>0||a>0&&i;)c!==0&&(a===0||!i||e.z<=i.z)?(r=e,e=e.nextZ,c--):(r=i,i=i.nextZ,a--),o?o.nextZ=r:n=r,r.prevZ=o,o=r;e=i}o.nextZ=null,u*=2}while(s>1);return n}function gi(n,t,e,i,r){return n=(n-e)*r|0,t=(t-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function tl(n){var t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function re(n,t,e,i,r,o,s,c){return(r-s)*(t-c)>=(n-s)*(o-c)&&(n-s)*(i-c)>=(e-s)*(t-c)&&(e-s)*(o-c)>=(r-s)*(i-c)}function el(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!nl(n,t)&&(Ce(n,t)&&Ce(t,n)&&il(n,t)&&(L(n.prev,n,t.prev)||L(n,t.prev,t))||Sn(n,t)&&L(n.prev,n,n.next)>0&&L(t.prev,t,t.next)>0)}function L(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Sn(n,t){return n.x===t.x&&n.y===t.y}function vs(n,t,e,i){var r=rn(L(n,t,e)),o=rn(L(n,t,i)),s=rn(L(e,i,n)),c=rn(L(e,i,t));return!!(r!==o&&s!==c||r===0&&nn(n,e,t)||o===0&&nn(n,i,t)||s===0&&nn(e,n,i)||c===0&&nn(e,t,i))}function nn(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function rn(n){return n>0?1:n<0?-1:0}function nl(n,t){var e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&vs(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Ce(n,t){return L(n.prev,n,n.next)<0?L(n,t,n.next)>=0&&L(n,n.prev,t)>=0:L(n,t,n.prev)<0||L(n,n.next,t)<0}function il(n,t){var e=n,i=!1,r=(n.x+t.x)/2,o=(n.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&r<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function ws(n,t){var e=new xi(n.i,n.x,n.y),i=new xi(t.i,t.x,t.y),r=n.next,o=t.prev;return n.next=t,t.prev=n,e.next=r,r.prev=e,i.next=e,e.prev=i,o.next=i,i.prev=o,i}function Hr(n,t,e,i){var r=new xi(n,t,e);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Ie(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function xi(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}_n.deviation=function(n,t,e,i){var r=t&&t.length,o=r?t[0]*e:n.length,s=Math.abs(vi(n,0,o,e));if(r)for(var c=0,a=t.length;c<a;c++){var u=t[c]*e,f=c<a-1?t[c+1]*e:n.length;s-=Math.abs(vi(n,u,f,e))}var h=0;for(c=0;c<i.length;c+=3){var l=i[c]*e,d=i[c+1]*e,m=i[c+2]*e;h+=Math.abs((n[l]-n[m])*(n[d+1]-n[l+1])-(n[l]-n[d])*(n[m+1]-n[l+1]))}return s===0&&h===0?0:Math.abs((h-s)/s)};function vi(n,t,e,i){for(var r=0,o=t,s=e-i;o<e;o+=i)r+=(n[s]-n[o])*(n[o+1]+n[s+1]),s=o;return r}_n.flatten=function(n){for(var t=n[0][0].length,e={vertices:[],holes:[],dimensions:t},i=0,r=0;r<n.length;r++){for(var o=0;o<n[r].length;o++)for(var s=0;s<t;s++)e.vertices.push(n[r][o][s]);r>0&&(i+=n[r-1].length,e.holes.push(i))}return e};var rl=ji.exports;const sl=$c(rl);new q;new q;function ol(n,t){var e=n%t,i=Math.floor(n/t);return[e,i]}function al(n,t,e){for(var i=0,r=0;i<n.length;i+=t,r++)n.set(e([n[i],n[i+1]],r),i);return n}function cl(n,t,e,i){var r=e.x-i.x,o=n.x-t.x,s=e.y-i.y,c=n.y-t.y,a=o*s-c*r;if(a==0)throw new Error("Number of intersection points is zero or infinity.");var u=n.x*t.y-n.y*t.x,f=e.x*i.y-e.y*i.x,h=(u*r-o*f)/a,l=(u*s-c*f)/a,d={x:h,y:l};return d}function ll(n){for(var t=0,e=0,i=n.length;e<i;e++){var r=n[e].x,o=n[e==n.length-1?0:e+1].y,s=n[e==n.length-1?0:e+1].x,c=n[e].y;t+=r*o*.5,t-=s*c*.5}return Math.abs(t)}function ul([n,t,e]){return Math.abs((n.x*(t.y-e.y)+t.x*(e.y-n.y)+e.x*(n.y-t.y))/2)}function fl(n,t=8){const e=n.slice();let i=0;for(;e.length>t&&i<1e3;){i++;let r=1/0,o=null;for(let s=0;s<=e.length-1;s++){const c=e.length,a=[s,(s+1)%c,(s+2)%c,(s+3)%c],u=e[a[0]],f=e[a[1]],h=e[a[2]],l=e[a[3]];try{const d=cl(u,f,h,l),m=ul([d,f,h]);m<r&&(r=m,o={point:d,area:m,indicesToRemove:[a[1],a[2]]})}catch(d){console.log(d)}}if(o){const s=o.indicesToRemove[0],c=o.indicesToRemove[1];c>s?(e.splice(c,1),e.splice(s,1)):(e.splice(s,1),e.splice(c,1)),e.splice(Math.min(s,c),0,o.point)}}return e}var wi;(n=>{function t(r){let o=r.slice();return o.sort(n.POINT_COMPARATOR),n.makeHullPresorted(o)}n.makeHull=t;function e(r){if(r.length<=1)return r.slice();let o=[];for(let c=0;c<r.length;c++){const a=r[c];for(;o.length>=2;){const u=o[o.length-1],f=o[o.length-2];if((u.x-f.x)*(a.y-f.y)>=(u.y-f.y)*(a.x-f.x))o.pop();else break}o.push(a)}o.pop();let s=[];for(let c=r.length-1;c>=0;c--){const a=r[c];for(;s.length>=2;){const u=s[s.length-1],f=s[s.length-2];if((u.x-f.x)*(a.y-f.y)>=(u.y-f.y)*(a.x-f.x))s.pop();else break}s.push(a)}return s.pop(),o.length==1&&s.length==1&&o[0].x==s[0].x&&o[0].y==s[0].y?o:o.concat(s)}n.makeHullPresorted=e;function i(r,o){return r.x<o.x?-1:r.x>o.x?1:r.y<o.y?-1:r.y>o.y?1:0}n.POINT_COMPARATOR=i})(wi||(wi={}));function dl(n,t){const e=new Float32Array(n);for(let i=0;i<n;i++)e[i*3]=t[0],e[i*3+1]=t[1],e[i*3+2]=t[2];return e}function hl(n,t,e=()=>Math.random()){const i=t+1,r=new Float32Array(n.length/t*i);for(let o=0;o<n.length;o+=t){let s=o/t*i;r[s]=n[o],r[s+1]=n[o+1],r[s+2]=e(s)}return r}function pl(n){const t=new Float32Array(n.length*2);for(let e=0;e<n.length;e++)t[e*2]=n[e].x,t[e*2+1]=n[e].y;return t}function ml(n,t,e){const i=[],r=n%(t*4)/4,o=Math.floor(n/(t*4)),s=o-1,c=o+1,a=r-1,u=r+1;return s>=0?i.push(s*t+r):i.push(null),c<e?i.push(c*t+r):i.push(null),a>=0?i.push(o*t+a):i.push(null),u<t?i.push(o*t+u):i.push(null),i}const yl=n=>(...t)=>t[3]/255>0,gl={threshold:.01,slices:[1,1],indices:[0,0],scale:1,filter:yl};class xl{constructor(t,e,i){R(this,"points",[]),R(this,"data",{areaReduction:0}),R(this,"debug",!0),R(this,"index"),R(this,"positions"),R(this,"uv"),R(this,"defaultSettings",gl),R(this,"settings"),this.vertices=i,this.settings={...this.defaultSettings,...e};const{slices:r}=this.settings,o=vl("bvc-image",t.width,t.height);this.points=this.getPoints(t,o);let s=wi.makeHull(this.points);const c=fl(s,i),a=c.map(l=>{let d=wl(l,[t.width,t.height],r);return d.y=-1*d.y,d}),{scale:u}=this.settings;this.data.areaReduction=1-ll(c)/(t.width/r[0]*(t.height/r[1]))*u;const f=pl(a),h=sl(f,null,2);this.positions=hl(f,2,()=>0),this.index=Uint32Array.from(h),this.uv=al(f.slice(0),2,l=>{let d=l[0]+.5;d=d/this.settings.slices[0]+1/this.settings.slices[0]*this.settings.indices[0];let m=l[1]+.5;return m=m/this.settings.slices[1]+1-1/this.settings.slices[1]*(this.settings.indices[1]+1),[d,m]})}getImageData(t,e){const i=e.getContext("2d");i.drawImage(t,0,0);const[r,o]=this.settings.indices,[s,c]=this.settings.slices,a=e.width/s,u=e.height/c;return i.getImageData(a*r,u*o,a,u)}getPoints(t,e){const i=this.getImageData(t,e),r=i.data,o=[],s=this.settings.filter(this.settings.threshold),c=a=>a!==null&&s(r[a*4],r[a*4+1],r[a*4+2],r[a*4+3]);for(let a=0;a<r.length;a+=4)if(s(r[a+0],r[a+1],r[a+2],r[a+3])){if(ml(a,e.width,e.height).every(c))continue;const[u,f]=ol(a/4,i.width);o.push({x:u,y:f})}return o}}const vl=(n="debug-canvas",t,e)=>{const i=document.querySelector(`#${n}`)||document.createElement("canvas");return i.id=n,i.width=t,i.height=e,i.id=n,i},wl=(n,t,e)=>({x:(n.x-t[0]/(2*e[0]))/(t[0]/e[0]),y:(n.y-t[1]/(2*e[1]))/(t[1]/e[1])}),bl={threshold:.01,slices:[1,1],indices:[1,1]};class _l extends Bt{constructor(t,e=8,i=.01,r=[1,1],o=[0,0]){super(),R(this,"image"),R(this,"vertices",8),R(this,"settings",bl),this.vertices=e,this.settings={...this.settings,threshold:i,slices:r,indices:o},this.image="image"in t?t.image:t,this.build()}build(){const t=new xl(this.image,this.settings,this.vertices),e=t.positions.length,i=new Q(t.index,1),r=new Q(t.positions,3),o=new Q(dl(e,[0,0,1]),3),s=new Q(t.uv,2);this.userData.reduction=t.data.areaReduction,this.setIndex(i),this.setAttribute("position",r),this.setAttribute("normal",o),this.setAttribute("uv",s)}}const wu=()=>new Sl;class Sl{constructor(){R(this,"animations"),this.animations=[]}add(t,e,i){const r={name:"",imageUrl:t};return Array.isArray(i)?r.multiAnimations=i:r.name=i,e.type=="rowColumn"&&(r.auto={type:"rowColumn",width:e.width,height:e.height}),e.type=="frameSize"&&(r.auto={type:"frameSize",width:e.width,height:e.height}),this.animations.push(r),this}async build(t={}){const e=new Ls,i={frames:[],animations:{},sheetSize:[0,0],animationLengths:[]};let r=new ks;const o=[];let s=0,c=0;for(const x of this.animations){const p=await e.loadAsync(x.imageUrl),y=p.width,g=p.height;s=Math.max(s,y),c+=g,o.push({img:p,w:y,h:g})}const a=document.createElement("canvas");a.width=s,a.height=c;const u=a.getContext("2d");let f=0;for(const{img:x,h:p}of o)u?.drawImage(x,0,f,x.width,x.height),f+=p;r=new Yn(a),r.needsUpdate=!0;let h=0,l=0,d=0,m=64;for(const x of this.animations){const p=o[h];let y=0;if(x.auto){let g=0,v=0;x.auto.type=="frameSize"&&(v=p.w/x.auto.width,g=p.h/x.auto.height),x.auto.type=="rowColumn"&&(v=x.auto.width,g=x.auto.height);const w=p.w/v,S=p.h/g;y=g*v,x.multiAnimations||(i.animations[x.name]=[]);const _=new Map;for(let b=0;b<g;b++){d+=S;for(let M=0;M<v;M++){if(i.frames.push([p.w/v*M/s,1-d/c,w/s,S/c]),x.multiAnimations){const T=b*v+M;_.set(T,l)}else i.animations[x.name].push([l,1]);l++}}if(x.multiAnimations)for(const b of x.multiAnimations){i.animations[b.name]=[],i.animationLengths.push(b.frameRange[1]-b.frameRange[0]+1);for(let M=b.frameRange[0];M<=b.frameRange[1];M++)i.animations[b.name].push([_.get(M),1])}else i.animationLengths.push(y)}h++}if(r.matrixAutoUpdate=!1,r.generateMipmaps=!1,r.premultiplyAlpha=!1,r.wrapS=r.wrapT=De,r.magFilter=r.minFilter=pt,r.colorSpace=Kn,i.sheetSize=[s,c],t.makeSlimGeometry){const x=document.createElement("canvas");x.width=m,x.height=m;const p=x.getContext("2d"),y=s/m,g=c/m;for(let S=0;S<y;S++)for(let _=0;_<g;_++){const b=S*m,M=_*m;p?.drawImage(a,b,M,m,m,0,0,m,m)}const v=new Yn(x);v.magFilter=r.minFilter=pt,v.colorSpace=Kn;const w=new _l(v,t.slimOptions?t.slimOptions.vertices:8,t.slimOptions?t.slimOptions.alphaThreshold:0);return{spritesheet:i,texture:r,geometry:w}}return{spritesheet:i,texture:r}}}const Ml=new Ht,sn=new B,jr=new V,xe=new _i,Zn=new oe,Al=new K,Xn=new B,Tl=new B,bi=new WeakMap,vt=new WeakMap,bs=(n,t)=>(n.computeBoundsTree=nc,n.disposeBoundsTree=ic,n.computeBoundsTree(t),()=>{n.disposeBoundsTree()}),bu=(n,t)=>{const e=bs(n.geometry,t);if(n.raycast=ys,t.helper){const i=new Re(n);n.add(i),vt.set(n,i)}return()=>{e(),n.geometry.disposeBoundsTree(),n.raycast=Y.prototype.raycast,t.helper&&(vt.get(n)?.removeFromParent(),vt.delete(n))}},_u=(n,t)=>{if(n.computeBoundsTree=rc,n.disposeBoundsTree=sc,n.addGeometry=(...e)=>{const i=an.prototype.addGeometry.call(n,...e);return n.computeBoundsTree(i,t),i},t.helper){const e=new Re(n);n.add(e),vt.set(n,e)}return()=>{n.boundsTrees&&n.disposeBoundsTree(),n.addGeometry=an.prototype.addGeometry,n.raycast=an.prototype.raycast,t.helper&&(vt.get(n)?.removeFromParent(),vt.delete(n))}},Su=(n,t)=>{const e=new Bt,i=n.geometry.getAttribute("position"),r=new Uint32Array(i.count*3);for(let c=0,a=0,u=i.count;c<u;c+=1,a+=3)r[a+0]=r[a+1]=r[a+2]=c;e.setAttribute("position",i),e.setIndex(new Q(r,1));const o=bs(e,t),s=new Y(e,Ml);if(s.visible=!1,s.raycast=ys,bi.set(n,s),n.raycast=Pl,t.helper){const c=new Re(s);vt.set(n,c),n.add(c,s)}return()=>{o(),n.raycast=Gs.prototype.raycast,bi.delete(n),t.helper&&(vt.get(n)?.removeFromParent(),s.removeFromParent(),vt.delete(n))}};function Pl(n,t){const e=bi.get(this);if(!e)return;const{threshold:i}=n.params.Points;if(this.geometry.boundingSphere===null&&this.geometry.computeBoundingSphere(),Zn.copy(this.geometry.boundingSphere).applyMatrix4(this.matrixWorld),Zn.radius+=i,!n.ray.intersectsSphere(Zn))return;const{geometry:r}=e,o=r.getIndex().array,s=r.getAttribute("position").array,c=this.matrixWorld.getMaxScaleOnAxis(),a=i/c,u=a*a,f=n.firstHitOnly===!0;let h=Number.POSITIVE_INFINITY;jr.copy(this.matrixWorld).invert(),xe.copy(n.ray).applyMatrix4(jr),r.boundsTree?.shapecast({boundsTraverseOrder:f?l=>l.distanceToPoint(xe.origin):void 0,intersectsBounds:(l,d,m)=>{if(m!==void 0&&m>h)return vr;const x=Al.copy(l).expandByScalar(a);return xe.intersectsBox(x)?Zo:vr},intersectsRange:(l,d)=>{const m=l+d;for(let x=l;x<m;x++){const p=r.boundsTree?.resolveTriangleIndex?.(x)??x,y=o[3*p],g=s[3*y],v=s[3*y+1],w=s[3*y+2];if(sn.set(g,v,w),xe.distanceSqToPoint(sn)>u)continue;if(f){const T=xe.origin.distanceTo(sn);if(T>=h)continue;h=T}Xn.copy(sn).applyMatrix4(this.matrixWorld);const _=n.ray.closestPointToPoint(Xn,Tl),b=n.ray.origin.distanceTo(_);if(b<n.near||b>n.far){if(!f)continue;return!1}const M=Math.sqrt(n.ray.distanceSqToPoint(Xn));if(t.push({distance:b,distanceToRay:M,point:_.clone(),index:y,face:null,faceIndex:null,barycoord:null,object:this}),f)return!0}return!1}})}export{Go as A,Ko as B,us as C,Xl as D,Yo as E,Ae as F,tt as G,nt as H,Wo as I,wu as J,rt as K,hs as L,pu as M,mu as N,et as O,uu as P,se as Q,yu as R,qo as S,cu as X,xu as Y,oo as a,eo as b,cn as c,Zl as d,bu as e,_u as f,Su as g,du as h,hu as i,jl as j,Gl as k,Yl as l,ql as m,Kl as n,Ql as o,tu as p,eu as q,Z as r,nu as s,gu as t,fo as u,Jl as v,iu as w,vu as x,fu as y,Wl as z};
