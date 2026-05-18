import"./disclose-version.DsnmJJEf.js";import{gg as Bs,fZ as zs,et as Fe,fX as gt,t as Cs,r as B,aO as Yr,i as Dt,ak as oe,q as $,at as Br,X as Bt,Z as Y,bz as Ki,b5 as Es,b9 as kt,O as Be,u as Is,T as At,V as Z,aj as K,gc as ln,fY as zr,gb as be,aL as zt,eW as yt,aF as Us,a5 as Ji,a3 as Rs,as as Fs,a_ as Os,C as Cr,an as rr,R as ze,l as ir,fw as Er,S as Ir,M as jt,aH as Qi,c9 as Ls,B as J,aI as ts,eM as Ns,bh as sr,ab as ne,fS as ks,a4 as Vs,ea as $s,Q as Cn,a2 as _e,ah as or,g9 as et,c0 as Hs,au as es,fJ as te,D as js,aK as ns,K as Ws,e0 as un,o as Kr,eK as Gs,ac as qs,N as mt,c2 as Zs,I as Xs,s as Ys,dq as Ur,bL as yn,aY as Ce,G as gn,aw as Ks,b4 as Js,aN as Qs,a as to,a1 as eo}from"./observe.svelte.BzV77cWn.js";/* empty css                                                      */import{d as fn,bJ as Jr,k as no,g as N,b as ee,aC as ce,Z as rs,aF as ro,aG as io,p as Sn,u as Se,f as Me,a as Mn,n as Rr,s as En,L as Qr,a9 as so}from"./runtime.DlhdfUbH.js";import{u as Oe}from"./useThrelte.hy2iYxhn.js";import{u as is}from"./useTask.svelte.CiDF47B2.js";import{c as Fr,a as Ae,f as ss}from"./template.Bu2kAh_t.js";import{s as Or}from"./snippet.nMAcNWpK.js";import{i as ti}from"./if.C3kzB4LH.js";import{c as In}from"./svelte-component.D5cvIrCJ.js";import{p as ct,s as os,r as as}from"./props.DYdebOnd.js";import{a as ei,s as oo}from"./store.Cj21Qh7F.js";import{d as vn,w as xn,r as ao}from"./index.jPPQmAdV.js";import{a as co}from"./index-client.BDBavK0Q.js";import{u as lo}from"./useStage.CYVDpzNh.js";import{i as cs}from"./injectPlugin.CNmwTLAT.js";import{t as uo}from"./transitions.CM0pWbTY.js";class fo extends Map{#t=new Map;#e=fn(0);#n=fn(0);#s=Jr||-1;constructor(t){if(super(),t){for(var[e,r]of t)super.set(e,r);this.#n.v=super.size}}#r(t){return Jr===this.#s?fn(t):no(t)}has(t){var e=this.#t,r=e.get(t);if(r===void 0)if(super.has(t))r=this.#r(0),e.set(t,r);else return N(this.#e),!1;return N(r),!0}forEach(t,e){this.#i(),super.forEach(t,e)}get(t){var e=this.#t,r=e.get(t);if(r===void 0)if(super.has(t))r=this.#r(0),e.set(t,r);else{N(this.#e);return}return N(r),super.get(t)}set(t,e){var r=this.#t,i=r.get(t),o=super.get(t),s=super.set(t,e),a=this.#e;if(i===void 0)i=this.#r(0),r.set(t,i),ee(this.#n,super.size),ce(a);else if(o!==e){ce(i);var c=a.reactions===null?null:new Set(a.reactions),f=c===null||!i.reactions?.every(u=>c.has(u));f&&ce(a)}return s}delete(t){var e=this.#t,r=e.get(t),i=super.delete(t);return r!==void 0&&(e.delete(t),ee(r,-1)),i&&(ee(this.#n,super.size),ce(this.#e)),i}clear(){if(super.size!==0){super.clear();var t=this.#t;ee(this.#n,0);for(var e of t.values())ee(e,-1);ce(this.#e),t.clear()}}#i(){N(this.#e);var t=this.#t;if(this.#n.v!==t.size){for(var e of super.keys())if(!t.has(e)){var r=this.#r(0);t.set(e,r)}}for([,r]of this.#t)N(r)}keys(){return N(this.#e),super.keys()}values(){return this.#i(),super.values()}entries(){return this.#i(),super.entries()}[Symbol.iterator](){return this.entries()}get size(){return N(this.#n),super.size}}function ho(n,t,e){const r=Bs();if(!r)throw new Error("No user context store found, did you invoke this function outside of your main <Canvas> component?");return n?n&&!t?vn(r,i=>i[n]):(r.update(i=>{if(n in i)return i;const o=typeof t=="function"?t():t;return i[n]=o,i}),r.current[n]):{subscribe:r.subscribe}}const dn=n=>{const t=xn(void 0),e=xn(void 0);return n.then(r=>{t.set(r)}).catch(r=>{console.error("Error in asyncWritable:",r.message),e.set(r)}),Object.assign(Object.assign(n,t),{error:e,promise:n})};function po(n,t){const{remember:e,clear:r}=zs(),i=new n(...t?.args??[]);return t?.extend?.(i),{load:(a,c)=>{const f=async u=>{if("loadAsync"in i){const h=await i.loadAsync(u,c?.onProgress);return c?.transform?.(h)??h}else return new Promise((h,l)=>{i.load(u,d=>h(c?.transform?.(d)??d),d=>c?.onProgress?.(d),l)})};if(Array.isArray(a)){const u=a.map(l=>e(()=>f(l),[n,l]));return dn(Promise.all(u))}else if(typeof a=="string"){const u=e(()=>f(a),[n,a]);return dn(u)}else{const u=Object.values(a).map(l=>e(()=>f(l),[n,l]));return dn(Promise.all(u).then(l=>Object.fromEntries(Object.entries(a).map(([d],m)=>[d,l[m]]))))}},clear:a=>{Array.isArray(a)?a.forEach(c=>{r([n,c])}):typeof a=="string"?r([n,a]):Object.entries(a).forEach(([,c])=>{r([n,c])})},loader:i}}const Et=n=>({subscribe:n.subscribe,get current(){return n.current}});let Te=0;const Lr=gt(!1),An=gt(!1),Nr=gt(void 0),kr=gt(0),Vr=gt(0),ls=gt([]),$r=gt(0),{onStart:mo,onLoad:yo,onError:go}=Fe;Fe.onStart=(n,t,e)=>{mo?.(n,t,e),An.set(!0),Nr.set(n),kr.set(t),Vr.set(e);const r=(t-Te)/(e-Te);$r.set(r),r===1&&Lr.set(!0)};Fe.onLoad=()=>{yo?.(),An.set(!1)};Fe.onError=n=>{go?.(n),ls.update(t=>[...t,n])};Fe.onProgress=(n,t,e)=>{t===e&&(Te=e),An.set(!0),Nr.set(n),kr.set(t),Vr.set(e);const r=(t-Te)/(e-Te)||1;$r.set(r),r===1&&Lr.set(!0)};const vo={active:Et(An),item:Et(Nr),loaded:Et(kr),total:Et(Vr),errors:Et(ls),progress:Et($r),finishedOnce:Et(Lr)},tu=()=>vo,xo=(n,t)=>{const e=po(Cs,t),{renderer:r}=Oe();return e.load(n,{...t,transform:i=>(i.colorSpace=r.outputColorSpace,i.needsUpdate=!0,t?.transform?.(i)??i)})},Un=new B,le=new B,ni=new B,eu=n=>{const t=gt({width:0,height:0,factor:0,distance:0}),{camera:e,size:r,renderStage:i,scheduler:o}=Oe(),s=(f,u,h)=>{t.update(l=>{const{width:d,height:m}=f;if(Array.isArray(n)&&Un.fromArray(n),l.distance=h,Dt(u,"OrthographicCamera"))l.width=d/u.zoom,l.height=m/u.zoom,l.factor=1;else if(Dt(u,"PerspectiveCamera")){const v=u.fov*Math.PI/180,p=2*Math.tan(v/2)*h,y=p*(d/m);l.width=y,l.height=p,l.factor=d/y}return l})},a=Yr(e),c=Yr(r);return is(()=>{if(a.current.getWorldPosition(le),!le.equals(ni)){const f=le.distanceTo(Un);s(c.current,a.current,f),ni.copy(le)}},{autoInvalidate:!1,stage:o.createStage(Symbol("viewport-stage"),{before:i})}),rs(()=>{const f=a.current.getWorldPosition(le).distanceTo(Un);s(c.current,a.current,f)}),t},Ne=new oe,ri=new $,ii=new Br,Rn=new B,nu=function(n,t){if(this.geometry.boundingSphere===null&&this.geometry.computeBoundingSphere(),Ne.copy(this.geometry.boundingSphere??Ne),Ne.applyMatrix4(this.matrixWorld),!n.ray.intersectsSphere(Ne)||(ri.copy(this.matrixWorld).invert(),ii.copy(n.ray).applyMatrix4(ri),this.geometry.boundingBox!==null&&ii.intersectBox(this.geometry.boundingBox,Rn)===null))return;const e=Rn.distanceTo(n.ray.origin),r=Rn.clone();t.push({distance:e,point:r,object:this})},us=Symbol("THRELTE_SUSPENSE_CONTEXT_IDENTIFIER"),ru=n=>{const t=gt(new Set),e=gt(new Map),r=xn(!1),i=()=>{t.current.size===0&&e.current.size===0&&r.set(!0)},o=xn(n?.final??!1),s=d=>{t.update(m=>(m.add(d),m))},a=d=>{t.update(m=>(m.delete(d),m))},c=(d,m)=>{e.update(v=>(v.set(d,m),v))},f=d=>{e.update(m=>(m.delete(d),m))},u=vn([t,e,o,r],([d,m,v,p])=>v&&p?!1:m.size>0?!0:d.size>0),h={suspend(d){s(d),d.catch(m=>{c(d,m)}).finally(()=>{a(d),i()})},onComponentDestroy(d){a(d),f(d),i()},suspended:u},l=vn(e,d=>Array.from(d.values()));return ro(us,h),{promises:t,suspended:u,errors:l,setFinal:d=>o.set(d??!1)}},wo=()=>{const n=io(us),t=new Set,e=i=>(n&&(n.suspend(i),t.add(i)),i),r={suspended:vn(n?.suspended??ao(!1),i=>i)};return co(()=>{if(n){for(const i of t)n.onComponentDestroy(i);t.clear()}}),Object.assign(e,r)};class bo extends Bt{constructor(t=new Y,e=new B,r=new Ki,i=new B(1,1,1)){super();const o=[],s=[],a=[],c=new B,f=new Es().getNormalMatrix(t.matrixWorld),u=new $;u.makeRotationFromEuler(r),u.setPosition(e);const h=new $;h.copy(u).invert(),l(),this.setAttribute("position",new kt(o,3)),this.setAttribute("uv",new kt(a,2)),s.length>0&&this.setAttribute("normal",new kt(s,3));function l(){let p=[];const y=new B,g=new B,x=t.geometry,w=x.attributes.position,S=x.attributes.normal;if(x.index!==null){const _=x.index;for(let b=0;b<_.count;b++)y.fromBufferAttribute(w,_.getX(b)),S?(g.fromBufferAttribute(S,_.getX(b)),d(p,y,g)):d(p,y)}else{if(w===void 0)return;for(let _=0;_<w.count;_++)y.fromBufferAttribute(w,_),S?(g.fromBufferAttribute(S,_),d(p,y,g)):d(p,y)}p=m(p,c.set(1,0,0)),p=m(p,c.set(-1,0,0)),p=m(p,c.set(0,1,0)),p=m(p,c.set(0,-1,0)),p=m(p,c.set(0,0,1)),p=m(p,c.set(0,0,-1));for(let _=0;_<p.length;_++){const b=p[_];a.push(.5+b.position.x/i.x,.5+b.position.y/i.y),b.position.applyMatrix4(u),o.push(b.position.x,b.position.y,b.position.z),b.normal!==null&&s.push(b.normal.x,b.normal.y,b.normal.z)}}function d(p,y,g=null){y.applyMatrix4(t.matrixWorld),y.applyMatrix4(h),g?(g.applyNormalMatrix(f),p.push(new Fn(y.clone(),g.clone()))):p.push(new Fn(y.clone()))}function m(p,y){const g=[],x=.5*Math.abs(i.dot(y));for(let w=0;w<p.length;w+=3){let S=0,_,b,M,T;const A=p[w+0].position.dot(y)-x,D=p[w+1].position.dot(y)-x,P=p[w+2].position.dot(y)-x,z=A>0,C=D>0,E=P>0;switch(S=(z?1:0)+(C?1:0)+(E?1:0),S){case 0:{g.push(p[w]),g.push(p[w+1]),g.push(p[w+2]);break}case 1:{if(z&&(_=p[w+1],b=p[w+2],M=v(p[w],_,y,x),T=v(p[w],b,y,x)),C){_=p[w],b=p[w+2],M=v(p[w+1],_,y,x),T=v(p[w+1],b,y,x),g.push(M),g.push(b.clone()),g.push(_.clone()),g.push(b.clone()),g.push(M.clone()),g.push(T);break}E&&(_=p[w],b=p[w+1],M=v(p[w+2],_,y,x),T=v(p[w+2],b,y,x)),g.push(_.clone()),g.push(b.clone()),g.push(M),g.push(T),g.push(M.clone()),g.push(b.clone());break}case 2:{z||(_=p[w].clone(),b=v(_,p[w+1],y,x),M=v(_,p[w+2],y,x),g.push(_),g.push(b),g.push(M)),C||(_=p[w+1].clone(),b=v(_,p[w+2],y,x),M=v(_,p[w],y,x),g.push(_),g.push(b),g.push(M)),E||(_=p[w+2].clone(),b=v(_,p[w],y,x),M=v(_,p[w+1],y,x),g.push(_),g.push(b),g.push(M));break}}}return g}function v(p,y,g,x){const w=p.position.dot(g)-x,S=y.position.dot(g)-x,_=w/(w-S),b=new B(p.position.x+_*(y.position.x-p.position.x),p.position.y+_*(y.position.y-p.position.y),p.position.z+_*(y.position.z-p.position.z));let M=null;return p.normal!==null&&y.normal!==null&&(M=new B(p.normal.x+_*(y.normal.x-p.normal.x),p.normal.y+_*(y.normal.y-p.normal.y),p.normal.z+_*(y.normal.z-p.normal.z))),new Fn(b,M)}}}class Fn{constructor(t,e=null){this.position=t,this.normal=e}clone(){const t=this.position.clone(),e=this.normal!==null?this.normal.clone():null;return new this.constructor(t,e)}}const _o=new B,si=new $,oi=new B,So=new B,vt=new Be;var Mo=ss("<!> <!> <!>",1),Ao=ss("<!> <!>",1);function iu(n,t){Sn(t,!0);const e=()=>ei(h,"$parent",i),r=()=>ei(N(x),"$map",i),[i,o]=oo();let s=ct(t,"polygonOffsetFactor",19,()=>-10),a=ct(t,"depthTest",3,!0),c=ct(t,"debug",3,!1),f=ct(t,"ref",15),u=as(t,["$$slots","$$events","$$legacy","src","mesh","position","rotation","scale","polygonOffsetFactor","depthTest","debug","ref","children"]);const h=Is(),l=Se(()=>t.mesh??e()),d=new Y,m=new B,v=new Ki,p=new B(1,1,1);let y=new Y;const g=wo(),x=Se(()=>typeof t.src=="string"?g(xo(t.src)):t.src?dn(Promise.resolve(t.src)):void 0);rs(()=>{if(!("geometry"in N(l)))throw new Error('Decal must have a Mesh as parent or specify its "mesh" prop');if(!(!r()&&!t.children)){if(t.position!==void 0&&m.fromArray(t.position),t.scale!==void 0&&(typeof t.scale=="number"?p.setScalar(t.scale):p.fromArray(t.scale)),si.copy(N(l).matrixWorld),N(l).matrixWorld.identity(),t.rotation===void 0||typeof t.rotation=="number"){vt.matrixWorld.identity(),vt.position.copy(m);const b=N(l).geometry.attributes.position.array;N(l).geometry.attributes.normal===void 0&&N(l).geometry.computeVertexNormals();const M=N(l).geometry.attributes.normal.array;let T=1/0,A=-1;for(let D=0,P=b.length;D<P;D+=3){const z=_o.fromArray(b,D).distanceToSquared(vt.position);z<T&&(T=z,A=D)}oi.fromArray(M,A),vt.lookAt(So.copy(vt.position).add(oi)),vt.rotateZ(Math.PI),vt.rotateY(Math.PI),typeof t.rotation=="number"&&vt.rotateZ(t.rotation),v.copy(vt.rotation)}else v.fromArray(t.rotation);return d.geometry=new bo(N(l),m,v,p),N(l).matrixWorld.copy(si),c()&&(y.position.copy(m),y.rotation.copy(v),y.scale.copy(p)),()=>d.geometry.dispose()}});var w=Fr(),S=Me(w);{var _=b=>{At(b,os({get is(){return d},"material.transparent":!0,"material.polygonOffset":!0,get"material.polygonOffsetFactor"(){return s()},get"material.depthTest"(){return a()},get"material.map"(){return r()}},()=>u,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:0},get ref(){return f()},set ref(M){f(M)},children:(M,T)=>{var A=Ao(),D=Me(A);Or(D,()=>t.children??Rr,()=>({ref:d}));var P=En(D,2);{var z=C=>{At(C,{get is(){return y},raycast:()=>null,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:1},children:(E,I)=>{var V=Mo(),ut=Me(V);In(ut,()=>At.BoxGeometry,(Ct,_t)=>{_t(Ct,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:2}})});var ft=En(ut,2);In(ft,()=>At.MeshNormalMaterial,(Ct,_t)=>{_t(Ct,{wireframe:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:3}})});var Wt=En(ft,2);In(Wt,()=>At.AxesHelper,(Ct,_t)=>{_t(Ct,{raycast:()=>null,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:4}})}),Ae(E,V)},$$slots:{default:!0}})};ti(P,C=>{c()&&C(z)})}Ae(M,A)},$$slots:{default:!0}}))};ti(S,b=>{(r()||t.children)&&b(_)})}Ae(n,w),Mn(),o()}const $t=new B,Tn=new B,To=new B,Do=new Z,su=(n,t,e)=>{const r=$t.setFromMatrixPosition(n.matrixWorld);r.project(t);const i=e.width/2,o=e.height/2;return[r.x*i+i,-(r.y*o)+o]},ou=(n,t)=>{const e=$t.setFromMatrixPosition(n.matrixWorld),r=Tn.setFromMatrixPosition(t.matrixWorld),i=e.sub(r),o=t.getWorldDirection(To);return i.dot(o)<0},au=(n,t,e,r)=>{const i=$t.setFromMatrixPosition(n.matrixWorld),o=Tn.copy($t);o.project(t),e.setFromCamera(Do.set(o.x,o.y),t);const s=e.intersectObjects(r,!0);if(s.length){const a=s[0].distance;return i.distanceTo(e.ray.origin)<a}return!0},cu=(n,t)=>{if(Dt(t,"OrthographicCamera"))return t.zoom;if(Dt(t,"PerspectiveCamera")){const e=$t.setFromMatrixPosition(n.matrixWorld),r=Tn.setFromMatrixPosition(t.matrixWorld),i=t.fov*Math.PI/180,o=e.distanceTo(r);return 1/(2*Math.tan(i/2)*o)}else return 1},lu=(n,t,e)=>{const r=$t.setFromMatrixPosition(n.matrixWorld),i=Tn.setFromMatrixPosition(t.matrixWorld),o=r.distanceTo(i),s=(e[1]-e[0])/(t.far-t.near),a=e[1]-s*t.far;return Math.round(s*o+a)},X=n=>Math.abs(n)<1e-10?0:n,fs=(n,t,e="")=>{const r=n.elements;return`${e}matrix3d(${X(t[0]*r[0])},${X(t[1]*r[1])},${X(t[2]*r[2])},${X(t[3]*r[3])},${X(t[4]*r[4])},${X(t[5]*r[5])},${X(t[6]*r[6])},${X(t[7]*r[7])},${X(t[8]*r[8])},${X(t[9]*r[9])},${X(t[10]*r[10])},${X(t[11]*r[11])},${X(t[12]*r[12])},${X(t[13]*r[13])},${X(t[14]*r[14])},${X(t[15]*r[15])})`},uu=(n=>t=>fs(t,n))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),fu=(n=>(t,e)=>fs(t,n(e),"translate(-50%,-50%)"))(n=>[1/n,1/n,1/n,1,-1/n,-1/n,-1/n,-1,1/n,1/n,1/n,1,1,1,1,1]),du=(n,t,e)=>{if(Dt(n,"OrthographicCamera"))return 1;if(Dt(n,"PerspectiveCamera")){const{width:r,height:i}=e,o=n.getWorldPosition($t).distanceTo(t),s=n.fov*Math.PI/180,c=2*Math.tan(s/2)*o*(r/i);return r/c}throw new Error("getViewportFactor needs a Perspective or Orthographic Camera")};var Po=Object.defineProperty,Bo=(n,t,e)=>t in n?Po(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,U=(n,t,e)=>Bo(n,typeof t!="symbol"?t+"":t,e);const ds=(n,t)=>{const[e,r]=t.split("-");return Object.assign(n.style,{left:r==="left"?"0":r==="center"?"50%":"",right:r==="right"?"0":"",top:e==="top"?"0":e==="bottom"?"":"50%",bottom:e==="bottom"?"0":"",transform:`${r==="center"?"translateX(-50%)":""} ${e==="center"?"translateY(-50%)":""}`}),t},zo=({placement:n,size:t,offset:e,id:r,className:i})=>{const o=document.createElement("div"),{top:s,left:a,right:c,bottom:f}=e;return Object.assign(o.style,{id:r,position:"absolute",zIndex:"1000",height:`${t}px`,width:`${t}px`,margin:`${s}px ${c}px ${f}px ${a}px`,borderRadius:"100%"}),ds(o,n),r&&(o.id=r),i&&(o.className=i),o},Co=n=>{const t=typeof n=="string"?document.querySelector(n):n;if(!t)throw Error("Invalid DOM element");return t};function ar(n,t,e){return Math.max(t,Math.min(e,n))}const Eo=[["x",0,3],["y",1,4],["z",2,5]],ai=new B;function ci({isSphere:n},t,e){n&&(ai.set(0,0,1).applyQuaternion(e.quaternion),Eo.forEach(([r,i,o])=>{const s=ai[r];let a=t[i],c=a.userData.opacity;a.material.opacity=ar(s>=0?c:c/2,0,1),a=t[o],c=a.userData.opacity,a.material.opacity=ar(s>=0?c/2:c,0,1)}))}const Io=(n,t,e=10)=>Math.abs(n.clientX-t.x)<e&&Math.abs(n.clientY-t.y)<e,li=new Os,ui=new Z,fi=(n,t,e,r)=>{ui.set((n.clientX-t.left)/t.width*2-1,-((n.clientY-t.top)/t.height)*2+1),li.setFromCamera(ui,e);const i=li.intersectObjects(r,!1),o=i.length?i[0]:null;return!o||!o.object.visible?null:o},On=1e-6,Uo=2*Math.PI,hs=["x","y","z"],Ee=[...hs,"nx","ny","nz"],Ro=["x","z","y","nx","nz","ny"],Fo=["z","x","y","nz","nx","ny"],cr="Right",hn="Top",lr="Front",ur="Left",pn="Bottom",fr="Back",Oo=[cr,hn,lr,ur,pn,fr].map(n=>n.toLocaleLowerCase()),ps=1.3,di=(n,t=!0)=>{const{material:e,userData:r}=n,{color:i,opacity:o}=t?r.hover:r;e.color.set(i),e.opacity=o},It=n=>JSON.parse(JSON.stringify(n)),Lo=n=>{const t=n.type||"sphere",e=t==="sphere",r=n.resolution||e?64:128,i=Be.DEFAULT_UP,o=i.z===1,s=i.x===1,{container:a}=n;n.container=void 0,n=JSON.parse(JSON.stringify(n)),n.container=a;const c=o?Ro:s?Fo:Ee;Oo.forEach((l,d)=>{n[l]&&(n[c[d]]=n[l])});const f={enabled:!0,color:16777215,opacity:1,scale:.7,labelColor:2236962,line:!1,border:{size:0,color:14540253},hover:{color:e?16777215:9688043,labelColor:2236962,opacity:1,scale:.7,border:{size:0,color:14540253}}},u={line:!1,scale:e?.45:.7,hover:{scale:e?.5:.7}},h={type:t,container:document.body,size:128,placement:"top-right",resolution:r,lineWidth:4,radius:e?1:.2,smoothness:18,animated:!0,speed:1,background:{enabled:!0,color:e?16777215:14739180,opacity:e?0:1,hover:{color:e?16777215:14739180,opacity:e?.2:1}},font:{family:"sans-serif",weight:900},offset:{top:10,left:10,bottom:10,right:10},corners:{enabled:!e,color:e?15915362:16777215,opacity:1,scale:e?.15:.2,radius:1,smoothness:18,hover:{color:e?16777215:9688043,opacity:1,scale:e?.2:.225}},edges:{enabled:!e,color:e?15915362:16777215,opacity:e?1:0,radius:e?1:.125,smoothness:18,scale:e?.15:1,hover:{color:e?16777215:9688043,opacity:1,scale:e?.2:1}},x:{...It(f),...e?{label:"X",color:16725587,line:!0}:{label:s?hn:cr}},y:{...It(f),...e?{label:"Y",color:9100032,line:!0}:{label:o||s?lr:hn}},z:{...It(f),...e?{label:"Z",color:2920447,line:!0}:{label:o?hn:s?cr:lr}},nx:{...It(u),label:e?"":s?pn:ur},ny:{...It(u),label:e?"":o||s?fr:pn},nz:{...It(u),label:e?"":o?pn:s?ur:fr}};return dr(n,h),hs.forEach(l=>dr(n[`n${l}`],It(n[l]))),{...n,isSphere:e}};function dr(n,...t){if(n instanceof HTMLElement||typeof n!="object"||n===null)return n;for(const e of t)for(const r in e)r!=="container"&&r in e&&(n[r]===void 0?n[r]=e[r]:typeof e[r]=="object"&&!Array.isArray(e[r])&&(n[r]=dr(n[r]||{},e[r])));return n}const No=(n,t=2)=>{const e=new Cr,r=t*2,{isSphere:i,resolution:o,radius:s,font:a,corners:c,edges:f}=n,u=Ee.map(b=>({...n[b],radius:s}));i&&c.enabled&&u.push(c),i&&f.enabled&&u.push(f);const h=document.createElement("canvas"),l=h.getContext("2d");h.width=o*2+r*2,h.height=o*u.length+r*u.length;const[d,m]=S(u,o,a);u.forEach(({radius:b,label:M,color:T,labelColor:A,border:D,hover:{color:P,labelColor:z,border:C}},E)=>{const I=o*E+E*r+t;w(t,I,t,o,b,M,D,T,A),w(o+t*3,I,t,o,b,M,C??D,P??T,z??A)});const v=u.length,p=t/(o*2),y=t/(o*6),g=1/v,x=new rr(h);return x.repeat.set(.5-2*p,g-2*y),x.offset.set(p,1-y),Object.assign(x,{colorSpace:ir,wrapS:ze,wrapT:ze,userData:{offsetX:p,offsetY:y,cellHeight:g}}),x;function w(b,M,T,A,D,P,z,C,E){if(D=D*(A/2),C!=null&&C!==""&&(I(),l.fillStyle=e.set(C).getStyle(),l.fill()),z&&z.size){const V=z.size*A/2;b+=V,M+=V,A-=z.size*A,D=Math.max(0,D-V),I(),l.strokeStyle=e.set(z.color).getStyle(),l.lineWidth=z.size*A,l.stroke()}P&&_(l,b+A/2,M+(A+T)/2,P,e.set(E).getStyle());function I(){l.beginPath(),l.moveTo(b+D,M),l.lineTo(b+A-D,M),l.arcTo(b+A,M,b+A,M+D,D),l.lineTo(b+A,M+A-D),l.arcTo(b+A,M+A,b+A-D,M+A,D),l.lineTo(b+D,M+A),l.arcTo(b,M+A,b,M+A-D,D),l.lineTo(b,M+D),l.arcTo(b,M,b+D,M,D),l.closePath()}}function S(b,M,T){const A=[...b].sort((Wt,Ct)=>{var _t,Xr;return(((_t=Wt.label)==null?void 0:_t.length)||0)-(((Xr=Ct.label)==null?void 0:Xr.length)||0)}).pop().label,{family:D,weight:P}=T,z=i?Math.sqrt(Math.pow(M*.7,2)/2):M;let C=z,E=0,I=0;do{l.font=`${P} ${C}px ${D}`;const Wt=l.measureText(A);E=Wt.width,I=Wt.fontBoundingBoxDescent,C--}while(E>z&&C>0);const V=z/I,ut=Math.min(z/E,V),ft=Math.floor(C*ut);return[`${P} ${ft}px ${D}`,V]}function _(b,M,T,A,D){b.font=d,b.textAlign="center",b.textBaseline="middle",b.fillStyle=D,b.fillText(A,M,T+(i?m:0))}},ko=(n,t)=>n.offset.x=(t?.5:0)+n.userData.offsetX,Hr=(n,t)=>{const{offset:e,userData:{offsetY:r,cellHeight:i}}=n;e.y=1-(t+1)*i+r};function jr(n,t,e=2,r=2){const i=e/2-n,o=r/2-n,s=n/e,a=(e-n)/e,c=n/r,f=(r-n)/r,u=[i,o,0,-i,o,0,-i,-o,0,i,-o,0],h=[a,f,s,f,s,c,a,c],l=[3*(t+1)+3,3*(t+1)+4,t+4,t+5,2*(t+1)+4,2,1,2*(t+1)+3,3,4*(t+1)+3,4,0],d=[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11].map(_=>l[_]);let m,v,p,y,g,x,w,S;for(let _=0;_<4;_++){y=_<1||_>2?i:-i,g=_<2?o:-o,x=_<1||_>2?a:s,w=_<2?f:c;for(let b=0;b<=t;b++)m=Math.PI/2*(_+b/t),v=Math.cos(m),p=Math.sin(m),u.push(y+n*v,g+n*p,0),h.push(x+s*v,w+c*p),b<t&&(S=(t+1)*_+b+4,d.push(_,S,S+1))}return new Bt().setIndex(new J(new Uint32Array(d),1)).setAttribute("position",new J(new Float32Array(u),3)).setAttribute("uv",new J(new Float32Array(h),2))}const Vo=(n,t)=>{const e=new B,{isSphere:r,radius:i,smoothness:o}=n,s=jr(i,o);return Ee.map((a,c)=>{const f=c<3,u=Ee[c],h=c?t.clone():t;Hr(h,c);const{enabled:l,scale:d,opacity:m,hover:v}=n[u],p={map:h,opacity:m,transparent:!0},y=r?new Er(new Ir(p)):new Y(s,new jt(p)),g=f?u:u[1];return y.position[g]=(f?1:-1)*(r?ps:1),r||y.lookAt(e.copy(y.position).multiplyScalar(1.7)),y.scale.setScalar(d),y.renderOrder=1,y.visible=l,y.userData={scale:d,opacity:m,hover:v},y})},$o=(n,t)=>{const{isSphere:e,corners:r}=n;if(!r.enabled)return[];const{color:i,opacity:o,scale:s,radius:a,smoothness:c,hover:f}=r,u=e?null:jr(a,c),h={transparent:!0,opacity:o},l=[1,1,1,-1,1,1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,-1,-1,-1,-1,-1].map(m=>m*.85),d=new B;return Array(l.length/3).fill(0).map((m,v)=>{if(e){const g=t.clone();Hr(g,6),h.map=g}else h.color=i;const p=e?new Er(new Ir(h)):new Y(u,new jt(h)),y=v*3;return p.position.set(l[y],l[y+1],l[y+2]),e&&p.position.normalize().multiplyScalar(1.7),p.scale.setScalar(s),p.lookAt(d.copy(p.position).multiplyScalar(2)),p.renderOrder=1,p.userData={color:i,opacity:o,scale:s,hover:f},p})},Ho=(n,t,e)=>{const{isSphere:r,edges:i}=n;if(!i.enabled)return[];const{color:o,opacity:s,scale:a,hover:c,radius:f,smoothness:u}=i,h=r?null:jr(f,u,1.2,.25),l={transparent:!0,opacity:s},d=[0,1,1,0,-1,1,1,0,1,-1,0,1,0,1,-1,0,-1,-1,1,0,-1,-1,0,-1,1,1,0,1,-1,0,-1,1,0,-1,-1,0].map(p=>p*.925),m=new B,v=new B(0,1,0);return Array(d.length/3).fill(0).map((p,y)=>{if(r){const w=t.clone();Hr(w,e),l.map=w}else l.color=o;const g=r?new Er(new Ir(l)):new Y(h,new jt(l)),x=y*3;return g.position.set(d[x],d[x+1],d[x+2]),r&&g.position.normalize().multiplyScalar(1.7),g.scale.setScalar(a),g.up.copy(v),g.lookAt(m.copy(g.position).multiplyScalar(2)),!r&&!g.position.y&&(g.rotation.z=Math.PI/2),g.renderOrder=1,g.userData={color:o,opacity:s,scale:a,hover:c},g})};function jo(n,t=!1){const e=n[0].index!==null,r=new Set(Object.keys(n[0].attributes)),i=new Set(Object.keys(n[0].morphAttributes)),o={},s={},a=n[0].morphTargetsRelative,c=new Bt;let f=0;for(let u=0;u<n.length;++u){const h=n[u];let l=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.attributes[d]),l++}if(l!==r.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;s[d]===void 0&&(s[d]=[]),s[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(f,d,u),f+=d}}if(e){let u=0;const h=[];for(let l=0;l<n.length;++l){const d=n[l].index;for(let m=0;m<d.count;++m)h.push(d.getX(m)+u);u+=n[l].attributes.position.count}c.setIndex(h)}for(const u in o){const h=hi(o[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in s){const h=s[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let l=0;l<h;++l){const d=[];for(let v=0;v<s[u].length;++v)d.push(s[u][v][l]);const m=hi(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(m)}}return c}function hi(n){let t,e,r,i=-1,o=0;for(let f=0;f<n.length;++f){const u=n[f];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(r===void 0&&(r=u.normalized),r!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=u.count*e}const s=new t(o),a=new J(s,e,r);let c=0;for(let f=0;f<n.length;++f){const u=n[f];if(u.isInterleavedBufferAttribute){const h=c/e;for(let l=0,d=u.count;l<d;l++)for(let m=0;m<e;m++){const v=u.getComponent(l,m);a.setComponent(l+h,m,v)}}else s.set(u.array,c);c+=u.count*e}return i!==void 0&&(a.gpuType=i),a}const Wo=(n,t)=>{const{isSphere:e,background:{enabled:r,color:i,opacity:o,hover:s}}=t;let a;const c=new jt({color:i,side:Qi,opacity:o,transparent:!0,depthWrite:!1});if(!r)return null;if(e)a=new Y(new Ls(1.8,64,64),c);else{let f;n.forEach(u=>{const h=u.scale.x;u.scale.setScalar(.9),u.updateMatrix();const l=u.geometry.clone();l.applyMatrix4(u.matrix),f=f?jo([f,l]):l,u.scale.setScalar(h)}),a=new Y(f,c)}return a.userData={color:i,opacity:o,hover:s},a},pi=new K,ke=new B;let ms=class extends Ns{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],r=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(r),this.setAttribute("position",new kt(t,3)),this.setAttribute("uv",new kt(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,r=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),r.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const r=new sr(e,6,1);return this.setAttribute("instanceStart",new ne(r,3,0)),this.setAttribute("instanceEnd",new ne(r,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const r=new sr(e,6,1);return this.setAttribute("instanceColorStart",new ne(r,3,0)),this.setAttribute("instanceColorEnd",new ne(r,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new ks(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new K);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),pi.setFromBufferAttribute(e),this.boundingBox.union(pi))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new oe),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const r=this.boundingSphere.center;this.boundingBox.getCenter(r);let i=0;for(let o=0,s=t.count;o<s;o++)ke.fromBufferAttribute(t,o),i=Math.max(i,r.distanceToSquared(ke)),ke.fromBufferAttribute(e,o),i=Math.max(i,r.distanceToSquared(ke));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}};ln.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Z(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};be.line={uniforms:zr.merge([ln.common,ln.fog,ln.line]),vertexShader:`
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
		`};let Wr=class extends ts{constructor(t){super({type:"LineMaterial",uniforms:zr.clone(be.line.uniforms),vertexShader:be.line.vertexShader,fragmentShader:be.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};const Ln=new zt,mi=new B,yi=new B,H=new zt,j=new zt,dt=new zt,Nn=new B,kn=new $,q=new yt,gi=new B,Ve=new K,$e=new oe,ht=new zt;let pt,Vt;function vi(n,t,e){return ht.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),ht.multiplyScalar(1/ht.w),ht.x=Vt/e.width,ht.y=Vt/e.height,ht.applyMatrix4(n.projectionMatrixInverse),ht.multiplyScalar(1/ht.w),Math.abs(Math.max(ht.x,ht.y))}function Go(n,t){const e=n.matrixWorld,r=n.geometry,i=r.attributes.instanceStart,o=r.attributes.instanceEnd,s=Math.min(r.instanceCount,i.count);for(let a=0,c=s;a<c;a++){q.start.fromBufferAttribute(i,a),q.end.fromBufferAttribute(o,a),q.applyMatrix4(e);const f=new B,u=new B;pt.distanceSqToSegment(q.start,q.end,u,f),u.distanceTo(f)<Vt*.5&&t.push({point:u,pointOnLine:f,distance:pt.origin.distanceTo(u),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function qo(n,t,e){const r=t.projectionMatrix,i=n.material.resolution,o=n.matrixWorld,s=n.geometry,a=s.attributes.instanceStart,c=s.attributes.instanceEnd,f=Math.min(s.instanceCount,a.count),u=-t.near;pt.at(1,dt),dt.w=1,dt.applyMatrix4(t.matrixWorldInverse),dt.applyMatrix4(r),dt.multiplyScalar(1/dt.w),dt.x*=i.x/2,dt.y*=i.y/2,dt.z=0,Nn.copy(dt),kn.multiplyMatrices(t.matrixWorldInverse,o);for(let h=0,l=f;h<l;h++){if(H.fromBufferAttribute(a,h),j.fromBufferAttribute(c,h),H.w=1,j.w=1,H.applyMatrix4(kn),j.applyMatrix4(kn),H.z>u&&j.z>u)continue;if(H.z>u){const y=H.z-j.z,g=(H.z-u)/y;H.lerp(j,g)}else if(j.z>u){const y=j.z-H.z,g=(j.z-u)/y;j.lerp(H,g)}H.applyMatrix4(r),j.applyMatrix4(r),H.multiplyScalar(1/H.w),j.multiplyScalar(1/j.w),H.x*=i.x/2,H.y*=i.y/2,j.x*=i.x/2,j.y*=i.y/2,q.start.copy(H),q.start.z=0,q.end.copy(j),q.end.z=0;const d=q.closestPointToPointParameter(Nn,!0);q.at(d,gi);const m=Vs.lerp(H.z,j.z,d),v=m>=-1&&m<=1,p=Nn.distanceTo(gi)<Vt*.5;if(v&&p){q.start.fromBufferAttribute(a,h),q.end.fromBufferAttribute(c,h),q.start.applyMatrix4(o),q.end.applyMatrix4(o);const y=new B,g=new B;pt.distanceSqToSegment(q.start,q.end,g,y),e.push({point:g,pointOnLine:y,distance:pt.origin.distanceTo(g),object:n,face:null,faceIndex:h,uv:null,uv1:null})}}}let Zo=class extends Y{constructor(t=new ms,e=new Wr({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,r=t.attributes.instanceEnd,i=new Float32Array(2*e.count);for(let s=0,a=0,c=e.count;s<c;s++,a+=2)mi.fromBufferAttribute(e,s),yi.fromBufferAttribute(r,s),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+mi.distanceTo(yi);const o=new sr(i,2,1);return t.setAttribute("instanceDistanceStart",new ne(o,1,0)),t.setAttribute("instanceDistanceEnd",new ne(o,1,1)),this}raycast(t,e){const r=this.material.worldUnits,i=t.camera;i===null&&!r&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const o=t.params.Line2!==void 0&&t.params.Line2.threshold||0;pt=t.ray;const s=this.matrixWorld,a=this.geometry,c=this.material;Vt=c.linewidth+o,a.boundingSphere===null&&a.computeBoundingSphere(),$e.copy(a.boundingSphere).applyMatrix4(s);let f;if(r)f=Vt*.5;else{const h=Math.max(i.near,$e.distanceToPoint(pt.origin));f=vi(i,h,c.resolution)}if($e.radius+=f,pt.intersectsSphere($e)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Ve.copy(a.boundingBox).applyMatrix4(s);let u;if(r)u=Vt*.5;else{const h=Math.max(i.near,Ve.distanceToPoint(pt.origin));u=vi(i,h,c.resolution)}Ve.expandByScalar(u),pt.intersectsBox(Ve)!==!1&&(r?Go(this,e):qo(this,i,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(Ln),this.material.uniforms.resolution.value.set(Ln.z,Ln.w))}};class ys extends ms{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){const e=t.length-3,r=new Float32Array(2*e);for(let i=0;i<e;i+=3)r[2*i]=t[i],r[2*i+1]=t[i+1],r[2*i+2]=t[i+2],r[2*i+3]=t[i+3],r[2*i+4]=t[i+4],r[2*i+5]=t[i+5];return super.setPositions(r),this}setColors(t){const e=t.length-3,r=new Float32Array(2*e);for(let i=0;i<e;i+=3)r[2*i]=t[i],r[2*i+1]=t[i+1],r[2*i+2]=t[i+2],r[2*i+3]=t[i+3],r[2*i+4]=t[i+4],r[2*i+5]=t[i+5];return super.setColors(r),this}setFromPoints(t){const e=t.length-1,r=new Float32Array(6*e);for(let i=0;i<e;i++)r[6*i]=t[i].x,r[6*i+1]=t[i].y,r[6*i+2]=t[i].z||0,r[6*i+3]=t[i+1].x,r[6*i+4]=t[i+1].y,r[6*i+5]=t[i+1].z||0;return super.setPositions(r),this}fromLine(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}}let Xo=class extends Zo{constructor(t=new ys,e=new Wr({color:Math.random()*16777215})){super(t,e),this.isLine2=!0,this.type="Line2"}};const Yo=n=>{const t=new Cr,e=[],r=[],{isSphere:i}=n;if(Ee.forEach((a,c)=>{const{enabled:f,line:u,scale:h,color:l}=n[a];if(!f||!u)return;const d=c<3?1:-1,m=(i?ps-h/2:.975)*d;e.push(a.includes("x")?m:0,a.includes("y")?m:0,a.includes("z")?m:0,0,0,0);const v=t.set(l).toArray();r.push(...v,...v)}),!e.length)return null;const o=new ys().setPositions(e).setColors(r),s=new Wr({linewidth:n.lineWidth,vertexColors:!0,resolution:new Z(window.innerWidth,window.innerHeight)});return new Xo(o,s).computeLineDistances()},Ko=n=>{const{corners:t,edges:e}=n,r=[],i=No(n),o=Vo(n,i);r.push(...o),t.enabled&&r.push(...$o(n,i)),e.enabled&&r.push(...Ho(n,i,t.enabled?7:6));const s=Wo(o,n),a=Yo(n);return[r,s,a]},ue=(n,t=!0)=>{const{material:e,userData:r}=n,{opacity:i,color:o,scale:s}=t?r.hover:r;n.scale.setScalar(s),e.opacity=i,e.map?ko(e.map,t):e.color.set(o)},Gt=new $,xi=new Fs,Jo=new Z,Ut=new B,wi=new zt;let gu=class extends Be{constructor(t,e,r={}){super(),U(this,"enabled",!0),U(this,"camera"),U(this,"renderer"),U(this,"options"),U(this,"target",new B),U(this,"animated",!0),U(this,"speed",1),U(this,"animating",!1),U(this,"_options"),U(this,"_intersections"),U(this,"_background",null),U(this,"_viewport",[0,0,0,0]),U(this,"_originalViewport",[0,0,0,0]),U(this,"_originalScissor",[0,0,0,0]),U(this,"_scene"),U(this,"_camera"),U(this,"_container"),U(this,"_domElement"),U(this,"_domRect"),U(this,"_dragging",!1),U(this,"_distance",0),U(this,"_clock",new $s),U(this,"_targetQuaternion",new Cn),U(this,"_quaternionStart",new Cn),U(this,"_quaternionEnd",new Cn),U(this,"_pointerStart",new Z),U(this,"_focus",null),U(this,"_placement"),U(this,"_controls"),U(this,"_controlsListeners"),this.camera=t,this.renderer=e,this._scene=new Us().add(this),this.set(r)}get placement(){return this._placement}set placement(t){this._placement=ds(this._domElement,t),this.domUpdate()}set(t={}){this.dispose(),this.options=t,this._options=Lo(t),this._camera=this._options.isSphere?new Ji(-1.8,1.8,1.8,-1.8,5,10):new Rs(26,1,5,10),this._camera.position.set(0,0,7);const[e,r,i]=Ko(this._options);r&&this.add(r),i&&this.add(i),this.add(...e),this._background=r,this._intersections=e;const{container:o,animated:s,speed:a}=this._options;return this.animated=s,this.speed=a,this._container=o?Co(o):document.body,this._domElement=zo(this._options),this._domElement.onpointerdown=c=>this._onPointerDown(c),this._domElement.onpointermove=c=>this._onPointerMove(c),this._domElement.onpointerleave=()=>this._onPointerLeave(),this._container.appendChild(this._domElement),this._controls&&this.attachControls(this._controls),this.update(),this._updateOrientation(!0),this}render(){this.animating&&this._animate();const{renderer:t,_viewport:e}=this,r=t.getScissorTest(),i=t.autoClear;return t.autoClear=!1,t.setViewport(...e),r&&t.setScissor(...e),t.clear(!1,!0,!1),t.render(this._scene,this._camera),t.setViewport(...this._originalViewport),r&&t.setScissor(...this._originalScissor),t.autoClear=i,this}domUpdate(){this._domRect=this._domElement.getBoundingClientRect();const t=this.renderer,e=this._domRect,r=t.domElement.getBoundingClientRect();return this._viewport.splice(0,4,e.left-r.left,t.domElement.clientHeight-(e.top-r.top+e.height),e.width,e.height),t.getViewport(wi).toArray(this._originalViewport),t.getScissorTest()&&t.getScissor(wi).toArray(this._originalScissor),this}cameraUpdate(){return this._updateOrientation(),this}update(t=!0){return t&&this._controls&&this._controls.update(),this.domUpdate().cameraUpdate()}attachControls(t){return this.detachControls(),this.target=t.target,this._controlsListeners={start:()=>t.enabled=!1,end:()=>t.enabled=!0,change:()=>this.update(!1)},this.addEventListener("start",this._controlsListeners.start),this.addEventListener("end",this._controlsListeners.end),t.addEventListener("change",this._controlsListeners.change),this._controls=t,this}detachControls(){if(!(!this._controlsListeners||!this._controls))return this.target=new B().copy(this._controls.target),this.removeEventListener("start",this._controlsListeners.start),this.removeEventListener("end",this._controlsListeners.end),this._controls.removeEventListener("change",this._controlsListeners.change),this._controlsListeners=void 0,this._controls=void 0,this}dispose(){var t;this.detachControls(),this.children.forEach(e=>{var r,i,o,s;this.remove(e);const a=e;(r=a.material)==null||r.dispose(),(o=(i=a.material)==null?void 0:i.map)==null||o.dispose(),(s=a.geometry)==null||s.dispose()}),(t=this._domElement)==null||t.remove()}_updateOrientation(t=!0){t&&(this.quaternion.copy(this.camera.quaternion).invert(),this.updateMatrixWorld()),ci(this._options,this._intersections,this.camera)}_animate(){const{position:t,quaternion:e}=this.camera;if(t.set(0,0,1),!this.animated){t.applyQuaternion(this._quaternionEnd).multiplyScalar(this._distance).add(this.target),e.copy(this._targetQuaternion),this._updateOrientation(),this.animating=!1,this.dispatchEvent({type:"change"}),this.dispatchEvent({type:"end"});return}this._controls&&(this._controls.enabled=!1);const r=this._clock.getDelta()*Uo*this.speed;this._quaternionStart.rotateTowards(this._quaternionEnd,r),t.applyQuaternion(this._quaternionStart).multiplyScalar(this._distance).add(this.target),e.rotateTowards(this._targetQuaternion,r),this._updateOrientation(),requestAnimationFrame(()=>this.dispatchEvent({type:"change"})),this._quaternionStart.angleTo(this._quaternionEnd)<On&&(this._controls&&(this._controls.enabled=!0),this.animating=!1,this.dispatchEvent({type:"end"}))}_setOrientation(t){const e=this.camera,r=this.target;Ut.copy(t).multiplyScalar(this._distance),Gt.setPosition(Ut).lookAt(Ut,this.position,this.up),this._targetQuaternion.setFromRotationMatrix(Gt),Ut.add(r),Gt.lookAt(Ut,r,this.up),this._quaternionEnd.setFromRotationMatrix(Gt),Gt.setPosition(e.position).lookAt(e.position,r,this.up),this._quaternionStart.setFromRotationMatrix(Gt),this.animating=!0,this._clock.start(),this.dispatchEvent({type:"start"})}_onPointerDown(t){if(!this.enabled)return;const e=c=>{if(!this._dragging){if(Io(c,this._pointerStart))return;this._dragging=!0}const f=Jo.set(c.clientX,c.clientY).sub(this._pointerStart).multiplyScalar(1/this._domRect.width*Math.PI),u=this.coordinateConversion(Ut.subVectors(this.camera.position,this.target)),h=xi.setFromVector3(u);h.theta=s-f.x,h.phi=ar(a-f.y,On,Math.PI-On),this.coordinateConversion(this.camera.position.setFromSpherical(h),!0).add(this.target),this.camera.lookAt(this.target),this.quaternion.copy(this.camera.quaternion).invert(),this._updateOrientation(!1),this.dispatchEvent({type:"change"})},r=()=>{if(document.removeEventListener("pointermove",e,!1),document.removeEventListener("pointerup",r,!1),!this._dragging)return this._handleClick(t);this._focus&&(ue(this._focus,!1),this._focus=null),this._dragging=!1,this.dispatchEvent({type:"end"})};if(this.animating)return;t.preventDefault(),this._pointerStart.set(t.clientX,t.clientY);const i=this.coordinateConversion(Ut.subVectors(this.camera.position,this.target)),o=xi.setFromVector3(i),s=o.theta,a=o.phi;this._distance=o.radius,document.addEventListener("pointermove",e,!1),document.addEventListener("pointerup",r,!1),this.dispatchEvent({type:"start"})}coordinateConversion(t,e=!1){const{x:r,y:i,z:o}=t,s=Be.DEFAULT_UP;return s.x===1?e?t.set(i,o,r):t.set(o,r,i):s.z===1?e?t.set(o,r,i):t.set(i,o,r):t}_onPointerMove(t){!this.enabled||this._dragging||(this._background&&di(this._background,!0),this._handleHover(t))}_onPointerLeave(){!this.enabled||this._dragging||(this._background&&di(this._background,!1),this._focus&&ue(this._focus,!1),this._domElement.style.cursor="")}_handleClick(t){const e=fi(t,this._domRect,this._camera,this._intersections);this._focus&&(ue(this._focus,!1),this._focus=null),e&&(this._setOrientation(e.object.position),this.dispatchEvent({type:"change"}))}_handleHover(t){const e=fi(t,this._domRect,this._camera,this._intersections),r=e?.object||null;this._focus!==r&&(this._domElement.style.cursor=r?"pointer":"",this._focus&&ue(this._focus,!1),(this._focus=r)?ue(r,!0):ci(this._options,this._intersections,this.camera))}};const bi=new $,_i=new $,He=[],fe=new Y;class xu extends _e{color;instancedMesh;instances;constructor(t,e){super(),this.color=new Cr("white"),this.instancedMesh=t,this.instances=e}get geometry(){return this.instancedMesh.current?.geometry}raycast(t,e){const r=this.instancedMesh.current;if(r===void 0||r.geometry===void 0||r.material===void 0)return;fe.geometry=r.geometry;const i=r.matrixWorld,o=this.instances.current.indexOf(this);if(!(o===-1||o>r.count)){r.getMatrixAt(o,bi),_i.multiplyMatrices(i,bi),fe.matrixWorld=_i,Dt(r.material,"Material")?fe.material.side=r.material.side:fe.material.side=r.material[0]?.side??or,fe.raycast(t,He);for(let s=0,a=He.length;s<a;s++){const c=He[s];c.instanceId=o,c.object=this,e.push(c)}He.length=0}}}const hr=et.shadowmap_pars_fragment,wn=hr.includes("unpackRGBAToDepth"),Si=wn?"unpackRGBAToDepth(texture2D(shadowMap, ":"texture2D(shadowMap, ",Mi=wn?"))":").r";function wu(n,t){Sn(t,!0);const{renderer:e,scene:r}=Oe();let i=ct(t,"size",3,25),o=ct(t,"focus",3,0),s=ct(t,"samples",3,10);const a=Se(()=>i()*1.25),c=Se(()=>(1/s()).toFixed(8));let f=Se(()=>`
		// Hash from a single dot+fract; same statistical quality as the
		// 10-tap RGB high-pass it replaces, ~30x cheaper.
		float pcssNoise(vec2 position) {
			return fract(52.9829189 * fract(dot(position, vec2(0.06711056, 0.00583715))));
		}

		// Note: three.js's #pragma unroll_loop only substitutes "[ i ]"
		// subscripts and the UNROLLED_LOOP_INDEX token; bare i references
		// stay literal and won't compile. Use UNROLLED_LOOP_INDEX everywhere
		// the iteration index appears outside an array subscript, and hoist
		// any per-iteration declarations out of the loop body to avoid
		// "redefinition" errors after unrolling.

		vec2 vogelDiskSample(int sampleIndex, float angle) {
			const float goldenAngle = 2.399963f;
			float r = sqrt(float(sampleIndex) + 0.5) / sqrt(float(${s()}));
			float theta = float(sampleIndex) * goldenAngle + angle;
			return vec2(cos(theta), sin(theta)) * r;
		}

		float PCSS (sampler2D shadowMap, vec4 coords) {
			vec2 uv = coords.xy;
			float zReceiver = coords.z;
			float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);

			float angle = pcssNoise(gl_FragCoord.xy) * PI2;

			// The blocker search and the penumbra filter both want N Vogel
			// samples around the same angle — only their scale differs. Compute
			// the unscaled offsets once instead of recomputing sin/cos per loop.
			vec2 offsets[${s()}];
			#pragma unroll_loop_start
			for (int i = 0; i < ${s()}; i++) {
				offsets[ i ] = vogelDiskSample(UNROLLED_LOOP_INDEX, angle) * texelSize;
			}
			#pragma unroll_loop_end

			// Blocker search.
			float blockerDepthSum = float(${o()});
			float blockers = 0.0;
			float blockerSearchScale = 2.0 * float(${i()});
			vec2 offset;
			float depth;
			float isBlocker;
			#pragma unroll_loop_start
			for (int i = 0; i < ${s()}; i++) {
				offset = offsets[ i ] * blockerSearchScale;
				depth = ${Si}uv + offset${Mi};
				// Branchless: 1 when depth < zReceiver (blocker), 0 otherwise.
				isBlocker = 1.0 - step(zReceiver, depth);
				blockerDepthSum += depth * isBlocker;
				blockers += isBlocker;
			}
			#pragma unroll_loop_end

			if (blockers == 0.0) return 1.0;

			float avgBlockerDepth = blockerDepthSum / blockers;
			float penumbraRatio = (zReceiver - avgBlockerDepth) / avgBlockerDepth;
			float filterMult = 1.0 + penumbraRatio * float(${N(a)});

			float shadow = 0.0;
			#pragma unroll_loop_start
			for (int i = 0; i < ${s()}; i++) {
				offset = offsets[ i ] * filterMult;
				shadow += step(zReceiver, ${Si}uv + offset${Mi});
			}
			#pragma unroll_loop_end

			return shadow * float(${N(c)});
	}`);const u=l=>{e.properties.remove(l),l.needsUpdate=!0},h=()=>{r.traverse(l=>{const d=l.material;if(d)if(Array.isArray(d))for(const m of d)u(m);else u(d)}),e.info.programs.length=0};Qr(()=>{let l=null;return wn||(l=e.shadowMap.type,e.shadowMap.type=Hs),()=>{l!==null&&(e.shadowMap.type=l)}}),Qr(()=>{let l=hr.replace("#ifdef USE_SHADOWMAP",`#ifdef USE_SHADOWMAP
${N(f)}`);return wn?l=l.replace("#if defined( SHADOWMAP_TYPE_PCF )",`
return PCSS(shadowMap, shadowCoord);
#if defined( SHADOWMAP_TYPE_PCF )`):l=l.replace("float depth = texture2D( shadowMap, shadowCoord.xy ).r;",`return PCSS( shadowMap, shadowCoord );
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;`),et.shadowmap_pars_fragment=l,h(),()=>{et.shadowmap_pars_fragment=hr,h()}}),Mn()}const bu=`
    #include <common>
    ${et.logdepthbuf_pars_vertex}
    ${et.fog_pars_vertex}

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

        ${et.logdepthbuf_vertex}
        ${et.fog_vertex}
    }
`;function Qo(n,t){Sn(t,!0),cs(t.name,t.plugin);var e=Fr(),r=Me(e);Or(r,()=>t.children??Rr),Ae(n,e),Mn()}const _u=`
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

	${et.tonemapping_fragment}
	${et.colorspace_fragment}
}`,Su=`
uniform sampler2D pointTexture;
uniform float fade;
uniform float opacity;
uniform float rounded;

varying vec3 vColor;
void main() {
	float d = distance(gl_PointCoord, vec2(0.5, 0.5));
	float pointOpacity = 1.0;
	if (fade == 1.0) {
		pointOpacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
	}
	if (rounded == 1.0) {
		pointOpacity *= 1.0 - smoothstep(0.3, 0.5, d);
	}
	gl_FragColor = vec4(vColor, pointOpacity * opacity);

	${et.tonemapping_fragment}
	${et.colorspace_fragment}
}`,gs=0,ta=1,ea=2,Ai=0,na=1,Ti=2,Vn=1.25,Di=1,De=32,Dn=65535,ra=Math.pow(2,-24),$n=Symbol("SKIP_GENERATION");function ia(n){return n.index?n.index.count:n.attributes.position.count}function ae(n){return ia(n)/3}function sa(n,t=ArrayBuffer){return n>65535?new Uint32Array(new t(4*n)):new Uint16Array(new t(2*n))}function oa(n,t){if(!n.index){const e=n.attributes.position.count,r=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=sa(e,r);n.setIndex(new J(i,1));for(let o=0;o<e;o++)i[o]=o}}function vs(n,t){const e=ae(n),r=t||n.drawRange,i=r.start/3,o=(r.start+r.count)/3,s=Math.max(0,i),a=Math.min(e,o)-s;return[{offset:Math.floor(s),count:Math.floor(a)}]}function xs(n,t){if(!n.groups||!n.groups.length)return vs(n,t);const e=[],r=new Set,i=t||n.drawRange,o=i.start/3,s=(i.start+i.count)/3;for(const c of n.groups){const f=c.start/3,u=(c.start+c.count)/3;r.add(Math.max(o,f)),r.add(Math.min(s,u))}const a=Array.from(r.values()).sort((c,f)=>c-f);for(let c=0;c<a.length-1;c++){const f=a[c],u=a[c+1];e.push({offset:Math.floor(f),count:Math.floor(u-f)})}return e}function aa(n,t){const e=ae(n),r=xs(n,t).sort((s,a)=>s.offset-a.offset),i=r[r.length-1];i.count=Math.min(e-i.offset,i.count);let o=0;return r.forEach(({count:s})=>o+=s),e!==o}function Hn(n,t,e,r,i){let o=1/0,s=1/0,a=1/0,c=-1/0,f=-1/0,u=-1/0,h=1/0,l=1/0,d=1/0,m=-1/0,v=-1/0,p=-1/0;for(let y=t*6,g=(t+e)*6;y<g;y+=6){const x=n[y+0],w=n[y+1],S=x-w,_=x+w;S<o&&(o=S),_>c&&(c=_),x<h&&(h=x),x>m&&(m=x);const b=n[y+2],M=n[y+3],T=b-M,A=b+M;T<s&&(s=T),A>f&&(f=A),b<l&&(l=b),b>v&&(v=b);const D=n[y+4],P=n[y+5],z=D-P,C=D+P;z<a&&(a=z),C>u&&(u=C),D<d&&(d=D),D>p&&(p=D)}r[0]=o,r[1]=s,r[2]=a,r[3]=c,r[4]=f,r[5]=u,i[0]=h,i[1]=l,i[2]=d,i[3]=m,i[4]=v,i[5]=p}function ca(n,t=null,e=null,r=null){const i=n.attributes.position,o=n.index?n.index.array:null,s=ae(n),a=i.normalized;let c;t===null?(c=new Float32Array(s*6),e=0,r=s):(c=t,e=e||0,r=r||s);const f=i.array,u=i.offset||0;let h=3;i.isInterleavedBufferAttribute&&(h=i.data.stride);const l=["getX","getY","getZ"];for(let d=e;d<e+r;d++){const m=d*3,v=d*6;let p=m+0,y=m+1,g=m+2;o&&(p=o[p],y=o[y],g=o[g]),a||(p=p*h+u,y=y*h+u,g=g*h+u);for(let x=0;x<3;x++){let w,S,_;a?(w=i[l[x]](p),S=i[l[x]](y),_=i[l[x]](g)):(w=f[p+x],S=f[y+x],_=f[g+x]);let b=w;S<b&&(b=S),_<b&&(b=_);let M=w;S>M&&(M=S),_>M&&(M=_);const T=(M-b)/2,A=x*2;c[v+A+0]=b+T,c[v+A+1]=T+(Math.abs(b)+T)*ra}}return c}function O(n,t,e){return e.min.x=t[n],e.min.y=t[n+1],e.min.z=t[n+2],e.max.x=t[n+3],e.max.y=t[n+4],e.max.z=t[n+5],e}function Pi(n){let t=-1,e=-1/0;for(let r=0;r<3;r++){const i=n[r+3]-n[r];i>e&&(e=i,t=r)}return t}function Bi(n,t){t.set(n)}function zi(n,t,e){let r,i;for(let o=0;o<3;o++){const s=o+3;r=n[o],i=t[o],e[o]=r<i?r:i,r=n[s],i=t[s],e[s]=r>i?r:i}}function je(n,t,e){for(let r=0;r<3;r++){const i=t[n+2*r],o=t[n+2*r+1],s=i-o,a=i+o;s<e[r]&&(e[r]=s),a>e[r+3]&&(e[r+3]=a)}}function de(n){const t=n[3]-n[0],e=n[4]-n[1],r=n[5]-n[2];return 2*(t*e+e*r+r*t)}const xt=32,la=(n,t)=>n.candidate-t.candidate,St=new Array(xt).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),We=new Float32Array(6);function ua(n,t,e,r,i,o){let s=-1,a=0;if(o===gs)s=Pi(t),s!==-1&&(a=(t[s]+t[s+3])/2);else if(o===ta)s=Pi(n),s!==-1&&(a=fa(e,r,i,s));else if(o===ea){const c=de(n);let f=Vn*i;const u=r*6,h=(r+i)*6;for(let l=0;l<3;l++){const d=t[l],p=(t[l+3]-d)/xt;if(i<xt/4){const y=[...St];y.length=i;let g=0;for(let w=u;w<h;w+=6,g++){const S=y[g];S.candidate=e[w+2*l],S.count=0;const{bounds:_,leftCacheBounds:b,rightCacheBounds:M}=S;for(let T=0;T<3;T++)M[T]=1/0,M[T+3]=-1/0,b[T]=1/0,b[T+3]=-1/0,_[T]=1/0,_[T+3]=-1/0;je(w,e,_)}y.sort(la);let x=i;for(let w=0;w<x;w++){const S=y[w];for(;w+1<x&&y[w+1].candidate===S.candidate;)y.splice(w+1,1),x--}for(let w=u;w<h;w+=6){const S=e[w+2*l];for(let _=0;_<x;_++){const b=y[_];S>=b.candidate?je(w,e,b.rightCacheBounds):(je(w,e,b.leftCacheBounds),b.count++)}}for(let w=0;w<x;w++){const S=y[w],_=S.count,b=i-S.count,M=S.leftCacheBounds,T=S.rightCacheBounds;let A=0;_!==0&&(A=de(M)/c);let D=0;b!==0&&(D=de(T)/c);const P=Di+Vn*(A*_+D*b);P<f&&(s=l,f=P,a=S.candidate)}}else{for(let x=0;x<xt;x++){const w=St[x];w.count=0,w.candidate=d+p+x*p;const S=w.bounds;for(let _=0;_<3;_++)S[_]=1/0,S[_+3]=-1/0}for(let x=u;x<h;x+=6){let _=~~((e[x+2*l]-d)/p);_>=xt&&(_=xt-1);const b=St[_];b.count++,je(x,e,b.bounds)}const y=St[xt-1];Bi(y.bounds,y.rightCacheBounds);for(let x=xt-2;x>=0;x--){const w=St[x],S=St[x+1];zi(w.bounds,S.rightCacheBounds,w.rightCacheBounds)}let g=0;for(let x=0;x<xt-1;x++){const w=St[x],S=w.count,_=w.bounds,M=St[x+1].rightCacheBounds;S!==0&&(g===0?Bi(_,We):zi(_,We,We)),g+=S;let T=0,A=0;g!==0&&(T=de(We)/c);const D=i-g;D!==0&&(A=de(M)/c);const P=Di+Vn*(T*g+A*D);P<f&&(s=l,f=P,a=w.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${o} used.`);return{axis:s,pos:a}}function fa(n,t,e,r){let i=0;for(let o=t,s=t+e;o<s;o++)i+=n[o*6+r*2];return i/e}class jn{constructor(){this.boundingData=new Float32Array(6)}}function da(n,t,e,r,i,o){let s=r,a=r+i-1;const c=o.pos,f=o.axis*2;for(;;){for(;s<=a&&e[s*6+f]<c;)s++;for(;s<=a&&e[a*6+f]>=c;)a--;if(s<a){for(let u=0;u<3;u++){let h=t[s*3+u];t[s*3+u]=t[a*3+u],t[a*3+u]=h}for(let u=0;u<6;u++){let h=e[s*6+u];e[s*6+u]=e[a*6+u],e[a*6+u]=h}s++,a--}else return s}}function ha(n,t,e,r,i,o){let s=r,a=r+i-1;const c=o.pos,f=o.axis*2;for(;;){for(;s<=a&&e[s*6+f]<c;)s++;for(;s<=a&&e[a*6+f]>=c;)a--;if(s<a){let u=n[s];n[s]=n[a],n[a]=u;for(let h=0;h<6;h++){let l=e[s*6+h];e[s*6+h]=e[a*6+h],e[a*6+h]=l}s++,a--}else return s}}function tt(n,t){return t[n+15]===65535}function nt(n,t){return t[n+6]}function rt(n,t){return t[n+14]}function it(n){return n+8}function st(n,t){return t[n+6]}function ws(n,t){return t[n+7]}function Mu(n){return n}let bs,we,mn,_s;const pa=Math.pow(2,32);function pr(n){return"count"in n?1:1+pr(n.left)+pr(n.right)}function ma(n,t,e){return bs=new Float32Array(e),we=new Uint32Array(e),mn=new Uint16Array(e),_s=new Uint8Array(e),mr(n,t)}function mr(n,t){const e=n/4,r=n/2,i="count"in t,o=t.boundingData;for(let s=0;s<6;s++)bs[e+s]=o[s];if(i)if(t.buffer){const s=t.buffer;_s.set(new Uint8Array(s),n);for(let a=n,c=n+s.byteLength;a<c;a+=De){const f=a/2;tt(f,mn)||(we[a/4+6]+=e)}return n+s.byteLength}else{const s=t.offset,a=t.count;return we[e+6]=s,mn[r+14]=a,mn[r+15]=Dn,n+De}else{const s=t.left,a=t.right,c=t.splitAxis;let f;if(f=mr(n+De,s),f/4>pa)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return we[e+6]=f/4,f=mr(f,a),we[e+7]=c,f}}function ya(n,t){const e=(n.index?n.index.count:n.attributes.position.count)/3,r=e>2**16,i=r?4:2,o=t?new SharedArrayBuffer(e*i):new ArrayBuffer(e*i),s=r?new Uint32Array(o):new Uint16Array(o);for(let a=0,c=s.length;a<c;a++)s[a]=a;return s}function ga(n,t,e,r,i){const{maxDepth:o,verbose:s,maxLeafTris:a,strategy:c,onProgress:f,indirect:u}=i,h=n._indirectBuffer,l=n.geometry,d=l.index?l.index.array:null,m=u?ha:da,v=ae(l),p=new Float32Array(6);let y=!1;const g=new jn;return Hn(t,e,r,g.boundingData,p),w(g,e,r,p),g;function x(S){f&&f(S/v)}function w(S,_,b,M=null,T=0){if(!y&&T>=o&&(y=!0,s&&(console.warn(`MeshBVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`),console.warn(l))),b<=a||T>=o)return x(_+b),S.offset=_,S.count=b,S;const A=ua(S.boundingData,M,t,_,b,c);if(A.axis===-1)return x(_+b),S.offset=_,S.count=b,S;const D=m(h,d,t,_,b,A);if(D===_||D===_+b)x(_+b),S.offset=_,S.count=b;else{S.splitAxis=A.axis;const P=new jn,z=_,C=D-_;S.left=P,Hn(t,z,C,P.boundingData,p),w(P,z,C,p,T+1);const E=new jn,I=D,V=b-C;S.right=E,Hn(t,I,V,E.boundingData,p),w(E,I,V,p,T+1)}return S}}function va(n,t){const e=n.geometry;t.indirect&&(n._indirectBuffer=ya(e,t.useSharedArrayBuffer),aa(e,t.range)&&!t.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),n._indirectBuffer||oa(e,t);const r=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=ca(e),o=t.indirect?vs(e,t.range):xs(e,t.range);n._roots=o.map(s=>{const a=ga(n,i,s.offset,s.count,t),c=pr(a),f=new r(De*c);return ma(0,a,f),f})}class bt{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(t,e){let r=1/0,i=-1/0;for(let o=0,s=t.length;o<s;o++){const c=t[o][e];r=c<r?c:r,i=c>i?c:i}this.min=r,this.max=i}setFromPoints(t,e){let r=1/0,i=-1/0;for(let o=0,s=e.length;o<s;o++){const a=e[o],c=t.dot(a);r=c<r?c:r,i=c>i?c:i}this.min=r,this.max=i}isSeparated(t){return this.min>t.max||t.min>this.max}}bt.prototype.setFromBox=(function(){const n=new B;return function(e,r){const i=r.min,o=r.max;let s=1/0,a=-1/0;for(let c=0;c<=1;c++)for(let f=0;f<=1;f++)for(let u=0;u<=1;u++){n.x=i.x*c+o.x*(1-c),n.y=i.y*f+o.y*(1-f),n.z=i.z*u+o.z*(1-u);const h=e.dot(n);s=Math.min(h,s),a=Math.max(h,a)}this.min=s,this.max=a}})();const xa=(function(){const n=new B,t=new B,e=new B;return function(i,o,s){const a=i.start,c=n,f=o.start,u=t;e.subVectors(a,f),n.subVectors(i.end,i.start),t.subVectors(o.end,o.start);const h=e.dot(u),l=u.dot(c),d=u.dot(u),m=e.dot(c),p=c.dot(c)*d-l*l;let y,g;p!==0?y=(h*l-m*d)/p:y=0,g=(h+y*l)/d,s.x=y,s.y=g}})(),Gr=(function(){const n=new Z,t=new B,e=new B;return function(i,o,s,a){xa(i,o,n);let c=n.x,f=n.y;if(c>=0&&c<=1&&f>=0&&f<=1){i.at(c,s),o.at(f,a);return}else if(c>=0&&c<=1){f<0?o.at(0,a):o.at(1,a),i.closestPointToPoint(a,!0,s);return}else if(f>=0&&f<=1){c<0?i.at(0,s):i.at(1,s),o.closestPointToPoint(s,!0,a);return}else{let u;c<0?u=i.start:u=i.end;let h;f<0?h=o.start:h=o.end;const l=t,d=e;if(i.closestPointToPoint(h,!0,t),o.closestPointToPoint(u,!0,e),l.distanceToSquared(h)<=d.distanceToSquared(u)){s.copy(l),a.copy(h);return}else{s.copy(u),a.copy(d);return}}}})(),wa=(function(){const n=new B,t=new B,e=new es,r=new yt;return function(o,s){const{radius:a,center:c}=o,{a:f,b:u,c:h}=s;if(r.start=f,r.end=u,r.closestPointToPoint(c,!0,n).distanceTo(c)<=a||(r.start=f,r.end=h,r.closestPointToPoint(c,!0,n).distanceTo(c)<=a)||(r.start=u,r.end=h,r.closestPointToPoint(c,!0,n).distanceTo(c)<=a))return!0;const v=s.getPlane(e);if(Math.abs(v.distanceToPoint(c))<=a){const y=v.projectPoint(c,t);if(s.containsPoint(y))return!0}return!1}})(),ba=1e-15;function Wn(n){return Math.abs(n)<ba}class lt extends te{constructor(...t){super(...t),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new B),this.satBounds=new Array(4).fill().map(()=>new bt),this.points=[this.a,this.b,this.c],this.sphere=new oe,this.plane=new es,this.needsUpdate=!0}intersectsSphere(t){return wa(t,this)}update(){const t=this.a,e=this.b,r=this.c,i=this.points,o=this.satAxes,s=this.satBounds,a=o[0],c=s[0];this.getNormal(a),c.setFromPoints(a,i);const f=o[1],u=s[1];f.subVectors(t,e),u.setFromPoints(f,i);const h=o[2],l=s[2];h.subVectors(e,r),l.setFromPoints(h,i);const d=o[3],m=s[3];d.subVectors(r,t),m.setFromPoints(d,i),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(a,t),this.needsUpdate=!1}}lt.prototype.closestPointToSegment=(function(){const n=new B,t=new B,e=new yt;return function(i,o=null,s=null){const{start:a,end:c}=i,f=this.points;let u,h=1/0;for(let l=0;l<3;l++){const d=(l+1)%3;e.start.copy(f[l]),e.end.copy(f[d]),Gr(e,i,n,t),u=n.distanceToSquared(t),u<h&&(h=u,o&&o.copy(n),s&&s.copy(t))}return this.closestPointToPoint(a,n),u=a.distanceToSquared(n),u<h&&(h=u,o&&o.copy(n),s&&s.copy(a)),this.closestPointToPoint(c,n),u=c.distanceToSquared(n),u<h&&(h=u,o&&o.copy(n),s&&s.copy(c)),Math.sqrt(h)}})();lt.prototype.intersectsTriangle=(function(){const n=new lt,t=new Array(3),e=new Array(3),r=new bt,i=new bt,o=new B,s=new B,a=new B,c=new B,f=new B,u=new yt,h=new yt,l=new yt,d=new B;function m(v,p,y){const g=v.points;let x=0,w=-1;for(let S=0;S<3;S++){const{start:_,end:b}=u;_.copy(g[S]),b.copy(g[(S+1)%3]),u.delta(s);const M=Wn(p.distanceToPoint(_));if(Wn(p.normal.dot(s))&&M){y.copy(u),x=2;break}const T=p.intersectLine(u,d);if(!T&&M&&d.copy(_),(T||M)&&!Wn(d.distanceTo(b))){if(x<=1)(x===1?y.start:y.end).copy(d),M&&(w=x);else if(x>=2){(w===1?y.start:y.end).copy(d),x=2;break}if(x++,x===2&&w===-1)break}}return x}return function(p,y=null,g=!1){this.needsUpdate&&this.update(),p.isExtendedTriangle?p.needsUpdate&&p.update():(n.copy(p),n.update(),p=n);const x=this.plane,w=p.plane;if(Math.abs(x.normal.dot(w.normal))>1-1e-10){const S=this.satBounds,_=this.satAxes;e[0]=p.a,e[1]=p.b,e[2]=p.c;for(let T=0;T<4;T++){const A=S[T],D=_[T];if(r.setFromPoints(D,e),A.isSeparated(r))return!1}const b=p.satBounds,M=p.satAxes;t[0]=this.a,t[1]=this.b,t[2]=this.c;for(let T=0;T<4;T++){const A=b[T],D=M[T];if(r.setFromPoints(D,t),A.isSeparated(r))return!1}for(let T=0;T<4;T++){const A=_[T];for(let D=0;D<4;D++){const P=M[D];if(o.crossVectors(A,P),r.setFromPoints(o,t),i.setFromPoints(o,e),r.isSeparated(i))return!1}}return y&&(g||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),y.start.set(0,0,0),y.end.set(0,0,0)),!0}else{const S=m(this,w,h);if(S===1&&p.containsPoint(h.end))return y&&(y.start.copy(h.end),y.end.copy(h.end)),!0;if(S!==2)return!1;const _=m(p,x,l);if(_===1&&this.containsPoint(l.end))return y&&(y.start.copy(l.end),y.end.copy(l.end)),!0;if(_!==2)return!1;if(h.delta(a),l.delta(c),a.dot(c)<0){let z=l.start;l.start=l.end,l.end=z}const b=h.start.dot(a),M=h.end.dot(a),T=l.start.dot(a),A=l.end.dot(a),D=M<T,P=b<A;return b!==A&&T!==M&&D===P?!1:(y&&(f.subVectors(h.start,l.start),f.dot(a)>0?y.start.copy(h.start):y.start.copy(l.start),f.subVectors(h.end,l.end),f.dot(a)<0?y.end.copy(h.end):y.end.copy(l.end)),!0)}}})();lt.prototype.distanceToPoint=(function(){const n=new B;return function(e){return this.closestPointToPoint(e,n),e.distanceTo(n)}})();lt.prototype.distanceToTriangle=(function(){const n=new B,t=new B,e=["a","b","c"],r=new yt,i=new yt;return function(s,a=null,c=null){const f=a||c?r:null;if(this.intersectsTriangle(s,f))return(a||c)&&(a&&f.getCenter(a),c&&f.getCenter(c)),0;let u=1/0;for(let h=0;h<3;h++){let l;const d=e[h],m=s[d];this.closestPointToPoint(m,n),l=m.distanceToSquared(n),l<u&&(u=l,a&&a.copy(n),c&&c.copy(m));const v=this[d];s.closestPointToPoint(v,n),l=v.distanceToSquared(n),l<u&&(u=l,a&&a.copy(v),c&&c.copy(n))}for(let h=0;h<3;h++){const l=e[h],d=e[(h+1)%3];r.set(this[l],this[d]);for(let m=0;m<3;m++){const v=e[m],p=e[(m+1)%3];i.set(s[v],s[p]),Gr(r,i,n,t);const y=n.distanceToSquared(t);y<u&&(u=y,a&&a.copy(n),c&&c.copy(t))}}return Math.sqrt(u)}})();class Q{constructor(t,e,r){this.isOrientedBox=!0,this.min=new B,this.max=new B,this.matrix=new $,this.invMatrix=new $,this.points=new Array(8).fill().map(()=>new B),this.satAxes=new Array(3).fill().map(()=>new B),this.satBounds=new Array(3).fill().map(()=>new bt),this.alignedSatBounds=new Array(3).fill().map(()=>new bt),this.needsUpdate=!1,t&&this.min.copy(t),e&&this.max.copy(e),r&&this.matrix.copy(r)}set(t,e,r){this.min.copy(t),this.max.copy(e),this.matrix.copy(r),this.needsUpdate=!0}copy(t){this.min.copy(t.min),this.max.copy(t.max),this.matrix.copy(t.matrix),this.needsUpdate=!0}}Q.prototype.update=(function(){return function(){const t=this.matrix,e=this.min,r=this.max,i=this.points;for(let f=0;f<=1;f++)for(let u=0;u<=1;u++)for(let h=0;h<=1;h++){const l=1*f|2*u|4*h,d=i[l];d.x=f?r.x:e.x,d.y=u?r.y:e.y,d.z=h?r.z:e.z,d.applyMatrix4(t)}const o=this.satBounds,s=this.satAxes,a=i[0];for(let f=0;f<3;f++){const u=s[f],h=o[f],l=1<<f,d=i[l];u.subVectors(a,d),h.setFromPoints(u,i)}const c=this.alignedSatBounds;c[0].setFromPointsField(i,"x"),c[1].setFromPointsField(i,"y"),c[2].setFromPointsField(i,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();Q.prototype.intersectsBox=(function(){const n=new bt;return function(e){this.needsUpdate&&this.update();const r=e.min,i=e.max,o=this.satBounds,s=this.satAxes,a=this.alignedSatBounds;if(n.min=r.x,n.max=i.x,a[0].isSeparated(n)||(n.min=r.y,n.max=i.y,a[1].isSeparated(n))||(n.min=r.z,n.max=i.z,a[2].isSeparated(n)))return!1;for(let c=0;c<3;c++){const f=s[c],u=o[c];if(n.setFromBox(f,e),u.isSeparated(n))return!1}return!0}})();Q.prototype.intersectsTriangle=(function(){const n=new lt,t=new Array(3),e=new bt,r=new bt,i=new B;return function(s){this.needsUpdate&&this.update(),s.isExtendedTriangle?s.needsUpdate&&s.update():(n.copy(s),n.update(),s=n);const a=this.satBounds,c=this.satAxes;t[0]=s.a,t[1]=s.b,t[2]=s.c;for(let l=0;l<3;l++){const d=a[l],m=c[l];if(e.setFromPoints(m,t),d.isSeparated(e))return!1}const f=s.satBounds,u=s.satAxes,h=this.points;for(let l=0;l<3;l++){const d=f[l],m=u[l];if(e.setFromPoints(m,h),d.isSeparated(e))return!1}for(let l=0;l<3;l++){const d=c[l];for(let m=0;m<4;m++){const v=u[m];if(i.crossVectors(d,v),e.setFromPoints(i,t),r.setFromPoints(i,h),e.isSeparated(r))return!1}}return!0}})();Q.prototype.closestPointToPoint=(function(){return function(t,e){return this.needsUpdate&&this.update(),e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}})();Q.prototype.distanceToPoint=(function(){const n=new B;return function(e){return this.closestPointToPoint(e,n),e.distanceTo(n)}})();Q.prototype.distanceToBox=(function(){const n=["x","y","z"],t=new Array(12).fill().map(()=>new yt),e=new Array(12).fill().map(()=>new yt),r=new B,i=new B;return function(s,a=0,c=null,f=null){if(this.needsUpdate&&this.update(),this.intersectsBox(s))return(c||f)&&(s.getCenter(i),this.closestPointToPoint(i,r),s.closestPointToPoint(r,i),c&&c.copy(r),f&&f.copy(i)),0;const u=a*a,h=s.min,l=s.max,d=this.points;let m=1/0;for(let p=0;p<8;p++){const y=d[p];i.copy(y).clamp(h,l);const g=y.distanceToSquared(i);if(g<m&&(m=g,c&&c.copy(y),f&&f.copy(i),g<u))return Math.sqrt(g)}let v=0;for(let p=0;p<3;p++)for(let y=0;y<=1;y++)for(let g=0;g<=1;g++){const x=(p+1)%3,w=(p+2)%3,S=y<<x|g<<w,_=1<<p|y<<x|g<<w,b=d[S],M=d[_];t[v].set(b,M);const A=n[p],D=n[x],P=n[w],z=e[v],C=z.start,E=z.end;C[A]=h[A],C[D]=y?h[D]:l[D],C[P]=g?h[P]:l[D],E[A]=l[A],E[D]=y?h[D]:l[D],E[P]=g?h[P]:l[D],v++}for(let p=0;p<=1;p++)for(let y=0;y<=1;y++)for(let g=0;g<=1;g++){i.x=p?l.x:h.x,i.y=y?l.y:h.y,i.z=g?l.z:h.z,this.closestPointToPoint(i,r);const x=i.distanceToSquared(r);if(x<m&&(m=x,c&&c.copy(r),f&&f.copy(i),x<u))return Math.sqrt(x)}for(let p=0;p<12;p++){const y=t[p];for(let g=0;g<12;g++){const x=e[g];Gr(y,x,r,i);const w=r.distanceToSquared(i);if(w<m&&(m=w,c&&c.copy(r),f&&f.copy(i),w<u))return Math.sqrt(w)}}return Math.sqrt(m)}})();class qr{constructor(t){this._getNewPrimitive=t,this._primitives=[]}getPrimitive(){const t=this._primitives;return t.length===0?this._getNewPrimitive():t.pop()}releasePrimitive(t){this._primitives.push(t)}}class _a extends qr{constructor(){super(()=>new lt)}}const ot=new _a;class Sa{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const t=[];let e=null;this.setBuffer=r=>{e&&t.push(e),e=r,this.float32Array=new Float32Array(r),this.uint16Array=new Uint16Array(r),this.uint32Array=new Uint32Array(r)},this.clearBuffer=()=>{e=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,t.length!==0&&this.setBuffer(t.pop())}}}const F=new Sa;let Tt,re;const qt=[],Ge=new qr(()=>new K);function Ma(n,t,e,r,i,o){Tt=Ge.getPrimitive(),re=Ge.getPrimitive(),qt.push(Tt,re),F.setBuffer(n._roots[t]);const s=yr(0,n.geometry,e,r,i,o);F.clearBuffer(),Ge.releasePrimitive(Tt),Ge.releasePrimitive(re),qt.pop(),qt.pop();const a=qt.length;return a>0&&(re=qt[a-1],Tt=qt[a-2]),s}function yr(n,t,e,r,i=null,o=0,s=0){const{float32Array:a,uint16Array:c,uint32Array:f}=F;let u=n*2;if(tt(u,c)){const l=nt(n,f),d=rt(u,c);return O(n,a,Tt),r(l,d,!1,s,o+n,Tt)}else{let A=function(P){const{uint16Array:z,uint32Array:C}=F;let E=P*2;for(;!tt(E,z);)P=it(P),E=P*2;return nt(P,C)},D=function(P){const{uint16Array:z,uint32Array:C}=F;let E=P*2;for(;!tt(E,z);)P=st(P,C),E=P*2;return nt(P,C)+rt(E,z)};const l=it(n),d=st(n,f);let m=l,v=d,p,y,g,x;if(i&&(g=Tt,x=re,O(m,a,g),O(v,a,x),p=i(g),y=i(x),y<p)){m=d,v=l;const P=p;p=y,y=P,g=x}g||(g=Tt,O(m,a,g));const w=tt(m*2,c),S=e(g,w,p,s+1,o+m);let _;if(S===Ti){const P=A(m),C=D(m)-P;_=r(P,C,!0,s+1,o+m,g)}else _=S&&yr(m,t,e,r,i,o,s+1);if(_)return!0;x=re,O(v,a,x);const b=tt(v*2,c),M=e(x,b,y,s+1,o+v);let T;if(M===Ti){const P=A(v),C=D(v)-P;T=r(P,C,!0,s+1,o+v,x)}else T=M&&yr(v,t,e,r,i,o,s+1);return!!T}}const he=new B,Gn=new B;function Aa(n,t,e={},r=0,i=1/0){const o=r*r,s=i*i;let a=1/0,c=null;if(n.shapecast({boundsTraverseOrder:u=>(he.copy(t).clamp(u.min,u.max),he.distanceToSquared(t)),intersectsBounds:(u,h,l)=>l<a&&l<s,intersectsTriangle:(u,h)=>{u.closestPointToPoint(t,he);const l=t.distanceToSquared(he);return l<a&&(Gn.copy(he),a=l,c=h),l<o}}),a===1/0)return null;const f=Math.sqrt(a);return e.point?e.point.copy(Gn):e.point=Gn.clone(),e.distance=f,e.faceIndex=c,e}const Ta=parseInt(ns)>=169,Rt=new B,Ft=new B,Ot=new B,qe=new Z,Ze=new Z,Xe=new Z,Ci=new B,Ei=new B,Ii=new B,pe=new B;function Da(n,t,e,r,i,o,s,a){let c;if(o===Qi?c=n.intersectTriangle(r,e,t,!0,i):c=n.intersectTriangle(t,e,r,o!==js,i),c===null)return null;const f=n.origin.distanceTo(i);return f<s||f>a?null:{distance:f,point:i.clone()}}function Pa(n,t,e,r,i,o,s,a,c,f,u){Rt.fromBufferAttribute(t,o),Ft.fromBufferAttribute(t,s),Ot.fromBufferAttribute(t,a);const h=Da(n,Rt,Ft,Ot,pe,c,f,u);if(h){const l=new B;te.getBarycoord(pe,Rt,Ft,Ot,l),r&&(qe.fromBufferAttribute(r,o),Ze.fromBufferAttribute(r,s),Xe.fromBufferAttribute(r,a),h.uv=te.getInterpolation(pe,Rt,Ft,Ot,qe,Ze,Xe,new Z)),i&&(qe.fromBufferAttribute(i,o),Ze.fromBufferAttribute(i,s),Xe.fromBufferAttribute(i,a),h.uv1=te.getInterpolation(pe,Rt,Ft,Ot,qe,Ze,Xe,new Z)),e&&(Ci.fromBufferAttribute(e,o),Ei.fromBufferAttribute(e,s),Ii.fromBufferAttribute(e,a),h.normal=te.getInterpolation(pe,Rt,Ft,Ot,Ci,Ei,Ii,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:s,c:a,normal:new B,materialIndex:0};te.getNormal(Rt,Ft,Ot,d.normal),h.face=d,h.faceIndex=o,Ta&&(h.barycoord=l)}return h}function Pn(n,t,e,r,i,o,s){const a=r*3;let c=a+0,f=a+1,u=a+2;const h=n.index;n.index&&(c=h.getX(c),f=h.getX(f),u=h.getX(u));const{position:l,normal:d,uv:m,uv1:v}=n.attributes,p=Pa(e,l,d,m,v,c,f,u,t,o,s);return p?(p.faceIndex=r,i&&i.push(p),p):null}function k(n,t,e,r){const i=n.a,o=n.b,s=n.c;let a=t,c=t+1,f=t+2;e&&(a=e.getX(a),c=e.getX(c),f=e.getX(f)),i.x=r.getX(a),i.y=r.getY(a),i.z=r.getZ(a),o.x=r.getX(c),o.y=r.getY(c),o.z=r.getZ(c),s.x=r.getX(f),s.y=r.getY(f),s.z=r.getZ(f)}function Ba(n,t,e,r,i,o,s,a){const{geometry:c,_indirectBuffer:f}=n;for(let u=r,h=r+i;u<h;u++)Pn(c,t,e,u,o,s,a)}function za(n,t,e,r,i,o,s){const{geometry:a,_indirectBuffer:c}=n;let f=1/0,u=null;for(let h=r,l=r+i;h<l;h++){let d;d=Pn(a,t,e,h,null,o,s),d&&d.distance<f&&(u=d,f=d.distance)}return u}function Ca(n,t,e,r,i,o,s){const{geometry:a}=e,{index:c}=a,f=a.attributes.position;for(let u=n,h=t+n;u<h;u++){let l;if(l=u,k(s,l*3,c,f),s.needsUpdate=!0,r(s,l,i,o))return!0}return!1}function Ea(n,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=n.geometry,r=e.index?e.index.array:null,i=e.attributes.position;let o,s,a,c,f=0;const u=n._roots;for(let l=0,d=u.length;l<d;l++)o=u[l],s=new Uint32Array(o),a=new Uint16Array(o),c=new Float32Array(o),h(0,f),f+=o.byteLength;function h(l,d,m=!1){const v=l*2;if(a[v+15]===Dn){const y=s[l+6],g=a[v+14];let x=1/0,w=1/0,S=1/0,_=-1/0,b=-1/0,M=-1/0;for(let T=3*y,A=3*(y+g);T<A;T++){let D=r[T];const P=i.getX(D),z=i.getY(D),C=i.getZ(D);P<x&&(x=P),P>_&&(_=P),z<w&&(w=z),z>b&&(b=z),C<S&&(S=C),C>M&&(M=C)}return c[l+0]!==x||c[l+1]!==w||c[l+2]!==S||c[l+3]!==_||c[l+4]!==b||c[l+5]!==M?(c[l+0]=x,c[l+1]=w,c[l+2]=S,c[l+3]=_,c[l+4]=b,c[l+5]=M,!0):!1}else{const y=l+8,g=s[l+6],x=y+d,w=g+d;let S=m,_=!1,b=!1;t?S||(_=t.has(x),b=t.has(w),S=!_&&!b):(_=!0,b=!0);const M=S||_,T=S||b;let A=!1;M&&(A=h(y,d,S));let D=!1;T&&(D=h(g,d,S));const P=A||D;if(P)for(let z=0;z<3;z++){const C=y+z,E=g+z,I=c[C],V=c[C+3],ut=c[E],ft=c[E+3];c[l+z]=I<ut?I:ut,c[l+z+3]=V>ft?V:ft}return P}}}function Pt(n,t,e,r,i){let o,s,a,c,f,u;const h=1/e.direction.x,l=1/e.direction.y,d=1/e.direction.z,m=e.origin.x,v=e.origin.y,p=e.origin.z;let y=t[n],g=t[n+3],x=t[n+1],w=t[n+3+1],S=t[n+2],_=t[n+3+2];return h>=0?(o=(y-m)*h,s=(g-m)*h):(o=(g-m)*h,s=(y-m)*h),l>=0?(a=(x-v)*l,c=(w-v)*l):(a=(w-v)*l,c=(x-v)*l),o>c||a>s||((a>o||isNaN(o))&&(o=a),(c<s||isNaN(s))&&(s=c),d>=0?(f=(S-p)*d,u=(_-p)*d):(f=(_-p)*d,u=(S-p)*d),o>u||f>s)?!1:((f>o||o!==o)&&(o=f),(u<s||s!==s)&&(s=u),o<=i&&s>=r)}function Ia(n,t,e,r,i,o,s,a){const{geometry:c,_indirectBuffer:f}=n;for(let u=r,h=r+i;u<h;u++){let l=f?f[u]:u;Pn(c,t,e,l,o,s,a)}}function Ua(n,t,e,r,i,o,s){const{geometry:a,_indirectBuffer:c}=n;let f=1/0,u=null;for(let h=r,l=r+i;h<l;h++){let d;d=Pn(a,t,e,c?c[h]:h,null,o,s),d&&d.distance<f&&(u=d,f=d.distance)}return u}function Ra(n,t,e,r,i,o,s){const{geometry:a}=e,{index:c}=a,f=a.attributes.position;for(let u=n,h=t+n;u<h;u++){let l;if(l=e.resolveTriangleIndex(u),k(s,l*3,c,f),s.needsUpdate=!0,r(s,l,i,o))return!0}return!1}function Fa(n,t,e,r,i,o,s){F.setBuffer(n._roots[t]),gr(0,n,e,r,i,o,s),F.clearBuffer()}function gr(n,t,e,r,i,o,s){const{float32Array:a,uint16Array:c,uint32Array:f}=F,u=n*2;if(tt(u,c)){const l=nt(n,f),d=rt(u,c);Ba(t,e,r,l,d,i,o,s)}else{const l=it(n);Pt(l,a,r,o,s)&&gr(l,t,e,r,i,o,s);const d=st(n,f);Pt(d,a,r,o,s)&&gr(d,t,e,r,i,o,s)}}const Oa=["x","y","z"];function La(n,t,e,r,i,o){F.setBuffer(n._roots[t]);const s=vr(0,n,e,r,i,o);return F.clearBuffer(),s}function vr(n,t,e,r,i,o){const{float32Array:s,uint16Array:a,uint32Array:c}=F;let f=n*2;if(tt(f,a)){const h=nt(n,c),l=rt(f,a);return za(t,e,r,h,l,i,o)}else{const h=ws(n,c),l=Oa[h],m=r.direction[l]>=0;let v,p;m?(v=it(n),p=st(n,c)):(v=st(n,c),p=it(n));const g=Pt(v,s,r,i,o)?vr(v,t,e,r,i,o):null;if(g){const S=g.point[l];if(m?S<=s[p+h]:S>=s[p+h+3])return g}const w=Pt(p,s,r,i,o)?vr(p,t,e,r,i,o):null;return g&&w?g.distance<=w.distance?g:w:g||w||null}}const Ye=new K,Zt=new lt,Xt=new lt,me=new $,Ui=new Q,Ke=new Q;function Na(n,t,e,r){F.setBuffer(n._roots[t]);const i=xr(0,n,e,r);return F.clearBuffer(),i}function xr(n,t,e,r,i=null){const{float32Array:o,uint16Array:s,uint32Array:a}=F;let c=n*2;if(i===null&&(e.boundingBox||e.computeBoundingBox(),Ui.set(e.boundingBox.min,e.boundingBox.max,r),i=Ui),tt(c,s)){const u=t.geometry,h=u.index,l=u.attributes.position,d=e.index,m=e.attributes.position,v=nt(n,a),p=rt(c,s);if(me.copy(r).invert(),e.boundsTree)return O(n,o,Ke),Ke.matrix.copy(me),Ke.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:g=>Ke.intersectsBox(g),intersectsTriangle:g=>{g.a.applyMatrix4(r),g.b.applyMatrix4(r),g.c.applyMatrix4(r),g.needsUpdate=!0;for(let x=v*3,w=(p+v)*3;x<w;x+=3)if(k(Xt,x,h,l),Xt.needsUpdate=!0,g.intersectsTriangle(Xt))return!0;return!1}});for(let y=v*3,g=(p+v)*3;y<g;y+=3){k(Zt,y,h,l),Zt.a.applyMatrix4(me),Zt.b.applyMatrix4(me),Zt.c.applyMatrix4(me),Zt.needsUpdate=!0;for(let x=0,w=d.count;x<w;x+=3)if(k(Xt,x,d,m),Xt.needsUpdate=!0,Zt.intersectsTriangle(Xt))return!0}}else{const u=n+8,h=a[n+6];return O(u,o,Ye),!!(i.intersectsBox(Ye)&&xr(u,t,e,r,i)||(O(h,o,Ye),i.intersectsBox(Ye)&&xr(h,t,e,r,i)))}}const Je=new $,qn=new Q,ye=new Q,ka=new B,Va=new B,$a=new B,Ha=new B;function ja(n,t,e,r={},i={},o=0,s=1/0){t.boundingBox||t.computeBoundingBox(),qn.set(t.boundingBox.min,t.boundingBox.max,e),qn.needsUpdate=!0;const a=n.geometry,c=a.attributes.position,f=a.index,u=t.attributes.position,h=t.index,l=ot.getPrimitive(),d=ot.getPrimitive();let m=ka,v=Va,p=null,y=null;i&&(p=$a,y=Ha);let g=1/0,x=null,w=null;return Je.copy(e).invert(),ye.matrix.copy(Je),n.shapecast({boundsTraverseOrder:S=>qn.distanceToBox(S),intersectsBounds:(S,_,b)=>b<g&&b<s?(_&&(ye.min.copy(S.min),ye.max.copy(S.max),ye.needsUpdate=!0),!0):!1,intersectsRange:(S,_)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:M=>ye.distanceToBox(M),intersectsBounds:(M,T,A)=>A<g&&A<s,intersectsRange:(M,T)=>{for(let A=M,D=M+T;A<D;A++){k(d,3*A,h,u),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let P=S,z=S+_;P<z;P++){k(l,3*P,f,c),l.needsUpdate=!0;const C=l.distanceToTriangle(d,m,p);if(C<g&&(v.copy(m),y&&y.copy(p),g=C,x=P,w=A),C<o)return!0}}}});{const b=ae(t);for(let M=0,T=b;M<T;M++){k(d,3*M,h,u),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let A=S,D=S+_;A<D;A++){k(l,3*A,f,c),l.needsUpdate=!0;const P=l.distanceToTriangle(d,m,p);if(P<g&&(v.copy(m),y&&y.copy(p),g=P,x=A,w=M),P<o)return!0}}}}}),ot.releasePrimitive(l),ot.releasePrimitive(d),g===1/0?null:(r.point?r.point.copy(v):r.point=v.clone(),r.distance=g,r.faceIndex=x,i&&(i.point?i.point.copy(y):i.point=y.clone(),i.point.applyMatrix4(Je),v.applyMatrix4(Je),i.distance=v.sub(i.point).length(),i.faceIndex=w),r)}function Wa(n,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=n.geometry,r=e.index?e.index.array:null,i=e.attributes.position;let o,s,a,c,f=0;const u=n._roots;for(let l=0,d=u.length;l<d;l++)o=u[l],s=new Uint32Array(o),a=new Uint16Array(o),c=new Float32Array(o),h(0,f),f+=o.byteLength;function h(l,d,m=!1){const v=l*2;if(a[v+15]===Dn){const y=s[l+6],g=a[v+14];let x=1/0,w=1/0,S=1/0,_=-1/0,b=-1/0,M=-1/0;for(let T=y,A=y+g;T<A;T++){const D=3*n.resolveTriangleIndex(T);for(let P=0;P<3;P++){let z=D+P;z=r?r[z]:z;const C=i.getX(z),E=i.getY(z),I=i.getZ(z);C<x&&(x=C),C>_&&(_=C),E<w&&(w=E),E>b&&(b=E),I<S&&(S=I),I>M&&(M=I)}}return c[l+0]!==x||c[l+1]!==w||c[l+2]!==S||c[l+3]!==_||c[l+4]!==b||c[l+5]!==M?(c[l+0]=x,c[l+1]=w,c[l+2]=S,c[l+3]=_,c[l+4]=b,c[l+5]=M,!0):!1}else{const y=l+8,g=s[l+6],x=y+d,w=g+d;let S=m,_=!1,b=!1;t?S||(_=t.has(x),b=t.has(w),S=!_&&!b):(_=!0,b=!0);const M=S||_,T=S||b;let A=!1;M&&(A=h(y,d,S));let D=!1;T&&(D=h(g,d,S));const P=A||D;if(P)for(let z=0;z<3;z++){const C=y+z,E=g+z,I=c[C],V=c[C+3],ut=c[E],ft=c[E+3];c[l+z]=I<ut?I:ut,c[l+z+3]=V>ft?V:ft}return P}}}function Ga(n,t,e,r,i,o,s){F.setBuffer(n._roots[t]),wr(0,n,e,r,i,o,s),F.clearBuffer()}function wr(n,t,e,r,i,o,s){const{float32Array:a,uint16Array:c,uint32Array:f}=F,u=n*2;if(tt(u,c)){const l=nt(n,f),d=rt(u,c);Ia(t,e,r,l,d,i,o,s)}else{const l=it(n);Pt(l,a,r,o,s)&&wr(l,t,e,r,i,o,s);const d=st(n,f);Pt(d,a,r,o,s)&&wr(d,t,e,r,i,o,s)}}const qa=["x","y","z"];function Za(n,t,e,r,i,o){F.setBuffer(n._roots[t]);const s=br(0,n,e,r,i,o);return F.clearBuffer(),s}function br(n,t,e,r,i,o){const{float32Array:s,uint16Array:a,uint32Array:c}=F;let f=n*2;if(tt(f,a)){const h=nt(n,c),l=rt(f,a);return Ua(t,e,r,h,l,i,o)}else{const h=ws(n,c),l=qa[h],m=r.direction[l]>=0;let v,p;m?(v=it(n),p=st(n,c)):(v=st(n,c),p=it(n));const g=Pt(v,s,r,i,o)?br(v,t,e,r,i,o):null;if(g){const S=g.point[l];if(m?S<=s[p+h]:S>=s[p+h+3])return g}const w=Pt(p,s,r,i,o)?br(p,t,e,r,i,o):null;return g&&w?g.distance<=w.distance?g:w:g||w||null}}const Qe=new K,Yt=new lt,Kt=new lt,ge=new $,Ri=new Q,tn=new Q;function Xa(n,t,e,r){F.setBuffer(n._roots[t]);const i=_r(0,n,e,r);return F.clearBuffer(),i}function _r(n,t,e,r,i=null){const{float32Array:o,uint16Array:s,uint32Array:a}=F;let c=n*2;if(i===null&&(e.boundingBox||e.computeBoundingBox(),Ri.set(e.boundingBox.min,e.boundingBox.max,r),i=Ri),tt(c,s)){const u=t.geometry,h=u.index,l=u.attributes.position,d=e.index,m=e.attributes.position,v=nt(n,a),p=rt(c,s);if(ge.copy(r).invert(),e.boundsTree)return O(n,o,tn),tn.matrix.copy(ge),tn.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:g=>tn.intersectsBox(g),intersectsTriangle:g=>{g.a.applyMatrix4(r),g.b.applyMatrix4(r),g.c.applyMatrix4(r),g.needsUpdate=!0;for(let x=v,w=p+v;x<w;x++)if(k(Kt,3*t.resolveTriangleIndex(x),h,l),Kt.needsUpdate=!0,g.intersectsTriangle(Kt))return!0;return!1}});for(let y=v,g=p+v;y<g;y++){const x=t.resolveTriangleIndex(y);k(Yt,3*x,h,l),Yt.a.applyMatrix4(ge),Yt.b.applyMatrix4(ge),Yt.c.applyMatrix4(ge),Yt.needsUpdate=!0;for(let w=0,S=d.count;w<S;w+=3)if(k(Kt,w,d,m),Kt.needsUpdate=!0,Yt.intersectsTriangle(Kt))return!0}}else{const u=n+8,h=a[n+6];return O(u,o,Qe),!!(i.intersectsBox(Qe)&&_r(u,t,e,r,i)||(O(h,o,Qe),i.intersectsBox(Qe)&&_r(h,t,e,r,i)))}}const en=new $,Zn=new Q,ve=new Q,Ya=new B,Ka=new B,Ja=new B,Qa=new B;function tc(n,t,e,r={},i={},o=0,s=1/0){t.boundingBox||t.computeBoundingBox(),Zn.set(t.boundingBox.min,t.boundingBox.max,e),Zn.needsUpdate=!0;const a=n.geometry,c=a.attributes.position,f=a.index,u=t.attributes.position,h=t.index,l=ot.getPrimitive(),d=ot.getPrimitive();let m=Ya,v=Ka,p=null,y=null;i&&(p=Ja,y=Qa);let g=1/0,x=null,w=null;return en.copy(e).invert(),ve.matrix.copy(en),n.shapecast({boundsTraverseOrder:S=>Zn.distanceToBox(S),intersectsBounds:(S,_,b)=>b<g&&b<s?(_&&(ve.min.copy(S.min),ve.max.copy(S.max),ve.needsUpdate=!0),!0):!1,intersectsRange:(S,_)=>{if(t.boundsTree){const b=t.boundsTree;return b.shapecast({boundsTraverseOrder:M=>ve.distanceToBox(M),intersectsBounds:(M,T,A)=>A<g&&A<s,intersectsRange:(M,T)=>{for(let A=M,D=M+T;A<D;A++){const P=b.resolveTriangleIndex(A);k(d,3*P,h,u),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let z=S,C=S+_;z<C;z++){const E=n.resolveTriangleIndex(z);k(l,3*E,f,c),l.needsUpdate=!0;const I=l.distanceToTriangle(d,m,p);if(I<g&&(v.copy(m),y&&y.copy(p),g=I,x=z,w=A),I<o)return!0}}}})}else{const b=ae(t);for(let M=0,T=b;M<T;M++){k(d,3*M,h,u),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let A=S,D=S+_;A<D;A++){const P=n.resolveTriangleIndex(A);k(l,3*P,f,c),l.needsUpdate=!0;const z=l.distanceToTriangle(d,m,p);if(z<g&&(v.copy(m),y&&y.copy(p),g=z,x=A,w=M),z<o)return!0}}}}}),ot.releasePrimitive(l),ot.releasePrimitive(d),g===1/0?null:(r.point?r.point.copy(v):r.point=v.clone(),r.distance=g,r.faceIndex=x,i&&(i.point?i.point.copy(y):i.point=y.clone(),i.point.applyMatrix4(en),v.applyMatrix4(en),i.distance=v.sub(i.point).length(),i.faceIndex=w),r)}function ec(){return typeof SharedArrayBuffer<"u"}const Pe=new F.constructor,bn=new F.constructor,Mt=new qr(()=>new K),Jt=new K,Qt=new K,Xn=new K,Yn=new K;let Kn=!1;function nc(n,t,e,r){if(Kn)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Kn=!0;const i=n._roots,o=t._roots;let s,a=0,c=0;const f=new $().copy(e).invert();for(let u=0,h=i.length;u<h;u++){Pe.setBuffer(i[u]),c=0;const l=Mt.getPrimitive();O(0,Pe.float32Array,l),l.applyMatrix4(f);for(let d=0,m=o.length;d<m&&(bn.setBuffer(o[d]),s=at(0,0,e,f,r,a,c,0,0,l),bn.clearBuffer(),c+=o[d].length,!s);d++);if(Mt.releasePrimitive(l),Pe.clearBuffer(),a+=i[u].length,s)break}return Kn=!1,s}function at(n,t,e,r,i,o=0,s=0,a=0,c=0,f=null,u=!1){let h,l;u?(h=bn,l=Pe):(h=Pe,l=bn);const d=h.float32Array,m=h.uint32Array,v=h.uint16Array,p=l.float32Array,y=l.uint32Array,g=l.uint16Array,x=n*2,w=t*2,S=tt(x,v),_=tt(w,g);let b=!1;if(_&&S)u?b=i(nt(t,y),rt(t*2,g),nt(n,m),rt(n*2,v),c,s+t,a,o+n):b=i(nt(n,m),rt(n*2,v),nt(t,y),rt(t*2,g),a,o+n,c,s+t);else if(_){const M=Mt.getPrimitive();O(t,p,M),M.applyMatrix4(e);const T=it(n),A=st(n,m);O(T,d,Jt),O(A,d,Qt);const D=M.intersectsBox(Jt),P=M.intersectsBox(Qt);b=D&&at(t,T,r,e,i,s,o,c,a+1,M,!u)||P&&at(t,A,r,e,i,s,o,c,a+1,M,!u),Mt.releasePrimitive(M)}else{const M=it(t),T=st(t,y);O(M,p,Xn),O(T,p,Yn);const A=f.intersectsBox(Xn),D=f.intersectsBox(Yn);if(A&&D)b=at(n,M,e,r,i,o,s,a,c+1,f,u)||at(n,T,e,r,i,o,s,a,c+1,f,u);else if(A)if(S)b=at(n,M,e,r,i,o,s,a,c+1,f,u);else{const P=Mt.getPrimitive();P.copy(Xn).applyMatrix4(e);const z=it(n),C=st(n,m);O(z,d,Jt),O(C,d,Qt);const E=P.intersectsBox(Jt),I=P.intersectsBox(Qt);b=E&&at(M,z,r,e,i,s,o,c,a+1,P,!u)||I&&at(M,C,r,e,i,s,o,c,a+1,P,!u),Mt.releasePrimitive(P)}else if(D)if(S)b=at(n,T,e,r,i,o,s,a,c+1,f,u);else{const P=Mt.getPrimitive();P.copy(Yn).applyMatrix4(e);const z=it(n),C=st(n,m);O(z,d,Jt),O(C,d,Qt);const E=P.intersectsBox(Jt),I=P.intersectsBox(Qt);b=E&&at(T,z,r,e,i,s,o,c,a+1,P,!u)||I&&at(T,C,r,e,i,s,o,c,a+1,P,!u),Mt.releasePrimitive(P)}}return b}const nn=new Q,Fi=new K,rc={strategy:gs,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null};class se{static serialize(t,e={}){e={cloneBuffers:!0,...e};const r=t.geometry,i=t._roots,o=t._indirectBuffer,s=r.getIndex();let a;return e.cloneBuffers?a={roots:i.map(c=>c.slice()),index:s?s.array.slice():null,indirectBuffer:o?o.slice():null}:a={roots:i,index:s?s.array:null,indirectBuffer:o},a}static deserialize(t,e,r={}){r={setIndex:!0,indirect:!!t.indirectBuffer,...r};const{index:i,roots:o,indirectBuffer:s}=t,a=new se(e,{...r,[$n]:!0});if(a._roots=o,a._indirectBuffer=s||null,r.setIndex){const c=e.getIndex();if(c===null){const f=new J(t.index,1,!1);e.setIndex(f)}else c.array!==i&&(c.array.set(i),c.needsUpdate=!0)}return a}get indirect(){return!!this._indirectBuffer}constructor(t,e={}){if(t.isBufferGeometry){if(t.index&&t.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(e=Object.assign({...rc,[$n]:!1},e),e.useSharedArrayBuffer&&!ec())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=t,this._roots=null,this._indirectBuffer=null,e[$n]||(va(this,e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new K))),this.resolveTriangleIndex=e.indirect?r=>this._indirectBuffer[r]:r=>r}refit(t=null){return(this.indirect?Wa:Ea)(this,t)}traverse(t,e=0){const r=this._roots[e],i=new Uint32Array(r),o=new Uint16Array(r);s(0);function s(a,c=0){const f=a*2,u=o[f+15]===Dn;if(u){const h=i[a+6],l=o[f+14];t(c,u,new Float32Array(r,a*4,6),h,l)}else{const h=a+De/4,l=i[a+6],d=i[a+7];t(c,u,new Float32Array(r,a*4,6),d)||(s(h,c+1),s(l,c+1))}}}raycast(t,e=or,r=0,i=1/0){const o=this._roots,s=this.geometry,a=[],c=e.isMaterial,f=Array.isArray(e),u=s.groups,h=c?e.side:e,l=this.indirect?Ga:Fa;for(let d=0,m=o.length;d<m;d++){const v=f?e[u[d].materialIndex].side:h,p=a.length;if(l(this,d,v,t,a,r,i),f){const y=u[d].materialIndex;for(let g=p,x=a.length;g<x;g++)a[g].face.materialIndex=y}}return a}raycastFirst(t,e=or,r=0,i=1/0){const o=this._roots,s=this.geometry,a=e.isMaterial,c=Array.isArray(e);let f=null;const u=s.groups,h=a?e.side:e,l=this.indirect?Za:La;for(let d=0,m=o.length;d<m;d++){const v=c?e[u[d].materialIndex].side:h,p=l(this,d,v,t,r,i);p!=null&&(f==null||p.distance<f.distance)&&(f=p,c&&(p.face.materialIndex=u[d].materialIndex))}return f}intersectsGeometry(t,e){let r=!1;const i=this._roots,o=this.indirect?Xa:Na;for(let s=0,a=i.length;s<a&&(r=o(this,s,t,e),!r);s++);return r}shapecast(t){const e=ot.getPrimitive(),r=this.indirect?Ra:Ca;let{boundsTraverseOrder:i,intersectsBounds:o,intersectsRange:s,intersectsTriangle:a}=t;if(s&&a){const h=s;s=(l,d,m,v,p)=>h(l,d,m,v,p)?!0:r(l,d,this,a,m,v,e)}else s||(a?s=(h,l,d,m)=>r(h,l,this,a,d,m,e):s=(h,l,d)=>d);let c=!1,f=0;const u=this._roots;for(let h=0,l=u.length;h<l;h++){const d=u[h];if(c=Ma(this,h,o,s,i,f),c)break;f+=d.byteLength}return ot.releasePrimitive(e),c}bvhcast(t,e,r){let{intersectsRanges:i,intersectsTriangles:o}=r;const s=ot.getPrimitive(),a=this.geometry.index,c=this.geometry.attributes.position,f=this.indirect?m=>{const v=this.resolveTriangleIndex(m);k(s,v*3,a,c)}:m=>{k(s,m*3,a,c)},u=ot.getPrimitive(),h=t.geometry.index,l=t.geometry.attributes.position,d=t.indirect?m=>{const v=t.resolveTriangleIndex(m);k(u,v*3,h,l)}:m=>{k(u,m*3,h,l)};if(o){const m=(v,p,y,g,x,w,S,_)=>{for(let b=y,M=y+g;b<M;b++){d(b),u.a.applyMatrix4(e),u.b.applyMatrix4(e),u.c.applyMatrix4(e),u.needsUpdate=!0;for(let T=v,A=v+p;T<A;T++)if(f(T),s.needsUpdate=!0,o(s,u,T,b,x,w,S,_))return!0}return!1};if(i){const v=i;i=function(p,y,g,x,w,S,_,b){return v(p,y,g,x,w,S,_,b)?!0:m(p,y,g,x,w,S,_,b)}}else i=m}return nc(this,t,e,i)}intersectsBox(t,e){return nn.set(t.min,t.max,e),nn.needsUpdate=!0,this.shapecast({intersectsBounds:r=>nn.intersectsBox(r),intersectsTriangle:r=>nn.intersectsTriangle(r)})}intersectsSphere(t){return this.shapecast({intersectsBounds:e=>t.intersectsBox(e),intersectsTriangle:e=>e.intersectsSphere(t)})}closestPointToGeometry(t,e,r={},i={},o=0,s=1/0){return(this.indirect?tc:ja)(this,t,e,r,i,o,s)}closestPointToPoint(t,e={},r=0,i=1/0){return Aa(this,t,e,r,i)}getBoundingBox(t){return t.makeEmpty(),this._roots.forEach(r=>{O(0,new Float32Array(r),Fi),t.union(Fi)}),t}}const Oi=new K,Li=new $;class ic extends Be{get isMesh(){return!this.displayEdges}get isLineSegments(){return this.displayEdges}get isLine(){return this.displayEdges}getVertexPosition(...t){return Y.prototype.getVertexPosition.call(this,...t)}constructor(t,e,r=10,i=0){super(),this.material=e,this.geometry=new Bt,this.name="MeshBVHRootHelper",this.depth=r,this.displayParents=!1,this.bvh=t,this.displayEdges=!0,this._group=i}raycast(){}update(){const t=this.geometry,e=this.bvh,r=this._group;if(t.dispose(),this.visible=!1,e){const i=this.depth-1,o=this.displayParents;let s=0;e.traverse((l,d)=>{if(l>=i||d)return s++,!0;o&&s++},r);let a=0;const c=new Float32Array(24*s);e.traverse((l,d,m)=>{const v=l>=i||d;if(v||o){O(0,m,Oi);const{min:p,max:y}=Oi;for(let g=-1;g<=1;g+=2){const x=g<0?p.x:y.x;for(let w=-1;w<=1;w+=2){const S=w<0?p.y:y.y;for(let _=-1;_<=1;_+=2){const b=_<0?p.z:y.z;c[a+0]=x,c[a+1]=S,c[a+2]=b,a+=3}}}return v}},r);let f,u;this.displayEdges?u=new Uint8Array([0,4,1,5,2,6,3,7,0,2,1,3,4,6,5,7,0,1,2,3,4,5,6,7]):u=new Uint8Array([0,1,2,2,1,3,4,6,5,6,7,5,1,4,5,0,4,1,2,3,6,3,7,6,0,2,4,2,6,4,1,5,3,3,5,7]),c.length>65535?f=new Uint32Array(u.length*s):f=new Uint16Array(u.length*s);const h=u.length;for(let l=0;l<s;l++){const d=l*8,m=l*h;for(let v=0;v<h;v++)f[m+v]=d+u[v]}t.setIndex(new J(f,1,!1)),t.setAttribute("position",new J(c,3,!1)),this.visible=!0}}}class Le extends _e{get color(){return this.edgeMaterial.color}get opacity(){return this.edgeMaterial.opacity}set opacity(t){this.edgeMaterial.opacity=t,this.meshMaterial.opacity=t}constructor(t=null,e=null,r=10){t instanceof se&&(r=e||10,e=t,t=null),typeof e=="number"&&(r=e,e=null),super(),this.name="MeshBVHHelper",this.depth=r,this.mesh=t,this.bvh=e,this.displayParents=!1,this.displayEdges=!0,this.objectIndex=0,this._roots=[];const i=new Ws({color:65416,transparent:!0,opacity:.3,depthWrite:!1}),o=new jt({color:65416,transparent:!0,opacity:.3,depthWrite:!1});o.color=i.color,this.edgeMaterial=i,this.meshMaterial=o,this.update()}update(){const t=this.mesh;let e=this.bvh||t.geometry.boundsTree||null;if(t.isBatchedMesh&&t.boundsTrees&&!e){const i=t._drawInfo[this.objectIndex];i&&(e=t.boundsTrees[i.geometryIndex]||e)}const r=e?e._roots.length:0;for(;this._roots.length>r;){const i=this._roots.pop();i.geometry.dispose(),this.remove(i)}for(let i=0;i<r;i++){const{depth:o,edgeMaterial:s,meshMaterial:a,displayParents:c,displayEdges:f}=this;if(i>=this._roots.length){const h=new ic(e,s,o,i);this.add(h),this._roots.push(h)}const u=this._roots[i];u.bvh=e,u.depth=o,u.displayParents=c,u.displayEdges=f,u.material=f?s:a,u.update()}}updateMatrixWorld(...t){const e=this.mesh,r=this.parent;e!==null&&(e.updateWorldMatrix(!0,!1),r?this.matrix.copy(r.matrixWorld).invert().multiply(e.matrixWorld):this.matrix.copy(e.matrixWorld),(e.isInstancedMesh||e.isBatchedMesh)&&(e.getMatrixAt(this.objectIndex,Li),this.matrix.multiply(Li)),this.matrix.decompose(this.position,this.quaternion,this.scale)),super.updateMatrixWorld(...t)}copy(t){this.depth=t.depth,this.mesh=t.mesh,this.bvh=t.bvh,this.opacity=t.opacity,this.color.copy(t.color)}clone(){return new Le(this.mesh,this.bvh,this.depth)}dispose(){this.edgeMaterial.dispose(),this.meshMaterial.dispose();const t=this.children;for(let e=0,r=t.length;e<r;e++)t[e].geometry.dispose()}}function Ni(n,t,e){return n===null?null:(n.point.applyMatrix4(t.matrixWorld),n.distance=n.point.distanceTo(e.ray.origin),n.object=t,n)}const sc=parseInt(ns)>=166,rn=new Br,ki=new B,Vi=new $,oc=Y.prototype.raycast,ac=un.prototype.raycast,$i=new B,W=new Y,sn=[];function Ss(n,t){this.isBatchedMesh?cc.call(this,n,t):lc.call(this,n,t)}function cc(n,t){if(this.boundsTrees){const e=this.boundsTrees,r=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,o=this.matrixWorld;W.material=this.material,W.geometry=this.geometry;const s=W.geometry.boundsTree,a=W.geometry.drawRange;W.geometry.boundingSphere===null&&(W.geometry.boundingSphere=new oe);for(let c=0,f=r.length;c<f;c++){if(!this.getVisibleAt(c))continue;const u=r[c].geometryIndex;if(W.geometry.boundsTree=e[u],this.getMatrixAt(c,W.matrixWorld).premultiply(o),!W.geometry.boundsTree){this.getBoundingBoxAt(u,W.geometry.boundingBox),this.getBoundingSphereAt(u,W.geometry.boundingSphere);const h=i[u];W.geometry.setDrawRange(h.start,h.count)}W.raycast(n,sn);for(let h=0,l=sn.length;h<l;h++){const d=sn[h];d.object=this,d.batchId=c,t.push(d)}sn.length=0}W.geometry.boundsTree=s,W.geometry.drawRange=a,W.material=null,W.geometry=null}else ac.call(this,n,t)}function lc(n,t){if(this.geometry.boundsTree){if(this.material===void 0)return;Vi.copy(this.matrixWorld).invert(),rn.copy(n.ray).applyMatrix4(Vi),$i.setFromMatrixScale(this.matrixWorld),ki.copy(rn.direction).multiply($i);const e=ki.length(),r=n.near/e,i=n.far/e,o=this.geometry.boundsTree;if(n.firstHitOnly===!0){const s=Ni(o.raycastFirst(rn,this.material,r,i),this,n);s&&t.push(s)}else{const s=o.raycast(rn,this.material,r,i);for(let a=0,c=s.length;a<c;a++){const f=Ni(s[a],this,n);f&&t.push(f)}}}else oc.call(this,n,t)}function uc(n={}){return this.boundsTree=new se(this,n),this.boundsTree}function fc(){this.boundsTree=null}function dc(n=-1,t={}){if(!sc)throw new Error("BatchedMesh: Three r166+ is required to compute bounds trees.");t.indirect&&console.warn('"Indirect" is set to false because it is not supported for BatchedMesh.'),t={...t,indirect:!1,range:null};const e=this._drawRanges||this._geometryInfo,r=this._geometryCount;this.boundsTrees||(this.boundsTrees=new Array(r).fill(null));const i=this.boundsTrees;for(;i.length<r;)i.push(null);if(n<0){for(let o=0;o<r;o++)t.range=e[o],i[o]=new se(this.geometry,t);return i}else return n<e.length&&(t.range=e[n],i[n]=new se(this.geometry,t)),i[n]||null}function hc(n=-1){n<0?this.boundsTrees.fill(null):n<this.boundsTree.length&&(this.boundsTrees[n]=null)}const pc=`

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
`,mc=`

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
`,yc=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,gc=yc,vc=`
	${pc}
	${mc}
`,Au=`#define ENVMAP_TYPE_CUBE_UV
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
${gc}
${vc}
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
	${et.tonemapping_fragment}
	${et.colorspace_fragment}
}`,xc=new K;function Tu(n,t){Sn(t,!0);const{renderStage:e}=Oe();let r=ct(t,"auto",3,!1),i=ct(t,"box",3,xc),o=ct(t,"stage",19,()=>lo("<Resize>",{before:e})),s=ct(t,"ref",15),a=as(t,["$$slots","$$events","$$legacy","axis","auto","box","precise","onresize","stage","ref","children"]);const c=new _e,f=new _e,u=new _e,h=()=>{u.matrixWorld.identity();const{max:y,min:g}=i().setFromObject(f,t.precise),x=y.x-g.x,w=y.y-g.y,S=y.z-g.z,_=t.axis==="x"?x:t.axis==="y"?w:t.axis==="z"?S:Math.max(x,w,S);u.scale.setScalar(1/_),t.onresize?.()};let l=fn(!1);const d=()=>{ee(l,!0)};is(()=>{h(),stop()},{stage:o(),running:()=>N(l)});const m=d;Kr(()=>[t.axis,t.precise],d);const v=y=>{Dt(y.ref,"Object3D")&&Kr.pre(()=>[y.ref],()=>(r()&&d(),()=>{r()&&d()}))};var p={resize:m};return At(n,os({get is(){return c}},()=>a,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Resize/Resize.svelte",index:0},get ref(){return s()},set ref(y){s(y)},children:(y,g)=>{At(y,{get is(){return u},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Resize/Resize.svelte",index:1},children:(x,w)=>{At(x,{get is(){return f},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Resize/Resize.svelte",index:2},children:(S,_)=>{Qo(S,{name:"resize",plugin:v,children:(b,M)=>{var T=Fr(),A=Me(T);Or(A,()=>t.children??Rr,()=>({ref:c,resize:d})),Ae(b,T)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})),Mn(p)}const Jn=typeof window<"u"?document.createElement("div"):void 0,Du=()=>{cs("transitions",n=>{if(!Jn||!n.props.in&&!n.props.out&&!n.props.transition)return;const{invalidate:t}=Oe();Jn.dispatchEvent=a=>(a.type==="introstart"?n.props.onintrostart?.():a.type==="outrostart"?n.props.onoutrostart?.():a.type==="introend"?n.props.onintroend?.():a.type==="outroend"&&n.props.onoutroend?.(),!0);const e=a=>(c,f,u)=>{const h=a(n.ref,{direction:u.direction});return{...h,tick(...l){t(),h?.tick?.(...l)}}},r=["in","out","transition"],i={in:5,out:6,transition:7},o={in:1,out:2,transition:3},s=so;s&&!("transitions"in s)&&s.nodes==null&&(s.nodes={start:null,end:null,a:null,t:null});for(const a of r){const c=n.props[a];if(c){const u="global"in c?i[a]:o[a];uo(u,Jn,()=>e(c))}}return{pluginProps:["in","out","transition","onintrostart","onoutrostart","onintroend","onoutroend"]}})},Lt=new fo,wc={audioListeners:Lt,addAudioListener:(n,t="default")=>{if(Lt.has(t)){console.warn(`An AudioListener with the id "${t}" has already been added, aborting.`);return}Lt.set(t,n)},removeAudioListener:(n="default")=>{if(!Lt.has(n)){console.warn(`No AudioListener with the id "${n}" found, aborting.`);return}Lt.delete(n)},getAudioListener:(n="default")=>{if(!Lt.has(n)){console.warn(`No AudioListener with the id "${n}" found, aborting.`);return}return Lt.get(n)}};function Pu(){return ho("threlte-audio",wc)}var bc=Object.defineProperty,_c=(n,t,e)=>t in n?bc(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,R=(n,t,e)=>(_c(n,typeof t!="symbol"?t+"":t,e),e);const Ms=/\bvoid\s+main\s*\(\s*\)\s*{/g;function Sr(n){const t=/^[ \t]*#include +<([\w\d./]+)>/gm;function e(r,i){let o=et[i];return o?Sr(o):r}return n.replace(t,e)}const G=[];for(let n=0;n<256;n++)G[n]=(n<16?"0":"")+n.toString(16);function Sc(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(G[n&255]+G[n>>8&255]+G[n>>16&255]+G[n>>24&255]+"-"+G[t&255]+G[t>>8&255]+"-"+G[t>>16&15|64]+G[t>>24&255]+"-"+G[e&63|128]+G[e>>8&255]+"-"+G[e>>16&255]+G[e>>24&255]+G[r&255]+G[r>>8&255]+G[r>>16&255]+G[r>>24&255]).toUpperCase()}const Nt=Object.assign||function(){let n=arguments[0];for(let t=1,e=arguments.length;t<e;t++){let r=arguments[t];if(r)for(let i in r)Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=r[i])}return n},Mc=Date.now(),Hi=new WeakMap,ji=new Map;let Ac=1e10;function _n(n,t){const e=Bc(t);let r=Hi.get(n);if(r||Hi.set(n,r=Object.create(null)),r[e])return new r[e];const i=`_onBeforeCompile${e}`,o=function(f,u){n.onBeforeCompile.call(this,f,u);const h=this.customProgramCacheKey()+"|"+f.vertexShader+"|"+f.fragmentShader;let l=ji[h];if(!l){const d=Tc(this,f,t,e);l=ji[h]=d}f.vertexShader=l.vertexShader,f.fragmentShader=l.fragmentShader,Nt(f.uniforms,this.uniforms),t.timeUniform&&(f.uniforms[t.timeUniform]={get value(){return Date.now()-Mc}}),this[i]&&this[i](f)},s=function(){return a(t.chained?n:n.clone())},a=function(f){const u=Object.create(f,c);return Object.defineProperty(u,"baseMaterial",{value:n}),Object.defineProperty(u,"id",{value:Ac++}),u.uuid=Sc(),u.uniforms=Nt({},f.uniforms,t.uniforms),u.defines=Nt({},f.defines,t.defines),u.defines[`TROIKA_DERIVED_MATERIAL_${e}`]="",u.extensions=Nt({},f.extensions,t.extensions),u._listeners=void 0,u},c={constructor:{value:s},isDerivedMaterial:{value:!0},type:{get:()=>n.type,set:f=>{n.type=f}},isDerivedFrom:{writable:!0,configurable:!0,value:function(f){const u=this.baseMaterial;return f===u||u.isDerivedMaterial&&u.isDerivedFrom(f)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return n.customProgramCacheKey()+"|"+e}},onBeforeCompile:{get(){return o},set(f){this[i]=f}},copy:{writable:!0,configurable:!0,value:function(f){return n.copy.call(this,f),!n.isShaderMaterial&&!n.isDerivedMaterial&&(Nt(this.extensions,f.extensions),Nt(this.defines,f.defines),Nt(this.uniforms,zr.clone(f.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const f=new n.constructor;return a(f).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let f=this._depthMaterial;return f||(f=this._depthMaterial=_n(n.isDerivedMaterial?n.getDepthMaterial():new Qs({depthPacking:to}),t),f.defines.IS_DEPTH_MATERIAL="",f.uniforms=this.uniforms),f}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let f=this._distanceMaterial;return f||(f=this._distanceMaterial=_n(n.isDerivedMaterial?n.getDistanceMaterial():new Js,t),f.defines.IS_DISTANCE_MATERIAL="",f.uniforms=this.uniforms),f}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:f,_distanceMaterial:u}=this;f&&f.dispose(),u&&u.dispose(),n.dispose.call(this)}}};return r[e]=s,new s}function Tc(n,{vertexShader:t,fragmentShader:e},r,i){let{vertexDefs:o,vertexMainIntro:s,vertexMainOutro:a,vertexTransform:c,fragmentDefs:f,fragmentMainIntro:u,fragmentMainOutro:h,fragmentColorTransform:l,customRewriter:d,timeUniform:m}=r;if(o=o||"",s=s||"",a=a||"",f=f||"",u=u||"",h=h||"",(c||d)&&(t=Sr(t)),(l||d)&&(e=e.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),e=Sr(e)),d){let v=d({vertexShader:t,fragmentShader:e});t=v.vertexShader,e=v.fragmentShader}if(l){let v=[];e=e.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,p=>(v.push(p),"")),h=`${l}
${v.join(`
`)}
${h}`}if(m){const v=`
uniform float ${m};
`;o=v+o,f=v+f}return c&&(t=`vec3 troika_position_${i};
vec3 troika_normal_${i};
vec2 troika_uv_${i};
${t}
`,o=`${o}
void troikaVertexTransform${i}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${c}
}
`,s=`
troika_position_${i} = vec3(position);
troika_normal_${i} = vec3(normal);
troika_uv_${i} = vec2(uv);
troikaVertexTransform${i}(troika_position_${i}, troika_normal_${i}, troika_uv_${i});
${s}
`,t=t.replace(/\b(position|normal|uv)\b/g,(v,p,y,g)=>/\battribute\s+vec[23]\s+$/.test(g.substr(0,y))?p:`troika_${p}_${i}`),n.map&&n.map.channel>0||(t=t.replace(/\bMAP_UV\b/g,`troika_uv_${i}`))),t=Wi(t,i,o,s,a),e=Wi(e,i,f,u,h),{vertexShader:t,fragmentShader:e}}function Wi(n,t,e,r,i){return(r||i||e)&&(n=n.replace(Ms,`
${e}
void troikaOrigMain${t}() {`),n+=`
void main() {
  ${r}
  troikaOrigMain${t}();
  ${i}
}`),n}function Dc(n,t){return n==="uniforms"?void 0:typeof t=="function"?t.toString():t}let Pc=0;const Gi=new Map;function Bc(n){const t=JSON.stringify(n,Dc);let e=Gi.get(t);return e==null&&Gi.set(t,e=++Pc),e}const zc={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function Cc(n){let t=zc[n.type];return t?be[t]:n}function qi(n){let t=/\buniform\s+(int|float|vec[234]|mat[34])\s+([A-Za-z_][\w]*)/g,e=Object.create(null),r;for(;(r=t.exec(n))!==null;)e[r[2]]=r[1];return e}function Ec(n){let t=[],e="";const r=_n(n,{chained:!0,customRewriter({vertexShader:o,fragmentShader:s}){let a=[],c=[],f=[],u=qi(o),h=qi(s);return t.forEach(l=>{let d=u[l],m=h[l];const v=d||m;if(v){const p=new RegExp(`\\buniform\\s+${v}\\s+${l}\\s*;`,"g"),y=new RegExp(`\\b${l}\\b`,"g"),g=`troika_attr_${l}`,x=`troika_vary_${l}`;if(a.push(`attribute ${v} ${g};`),d&&(o=o.replace(p,""),o=o.replace(y,g)),m){s=s.replace(p,""),s=s.replace(y,x);let w=`varying ${m} ${x};`;a.push(w),f.push(w),c.push(`${x} = ${g};`)}}}),o=`${a.join(`
`)}
${o.replace(Ms,`
$&
${c.join(`
`)}`)}`,f.length&&(s=`${f.join(`
`)}
${s}`),{vertexShader:o,fragmentShader:s}}});r.setUniformNames=function(o){t=o||[];const s=t.sort().join("|");s!==e&&(e=s,this.needsUpdate=!0)};const i=r.customProgramCacheKey();return r.customProgramCacheKey=function(){return i+"|"+e},r.isInstancedUniformsMaterial=!0,r}class Ic extends Xs{constructor(t,e,r){super(t,e,r),this._maxCount=r,this._instancedUniformNames=[]}get geometry(){let t=this._derivedGeometry;const e=this._baseGeometry;return(!t||t.baseGeometry!==e)&&(t=this._derivedGeometry=Object.create(e),t.baseGeometry=e,t.attributes=Object.create(e.attributes),e.addEventListener("dispose",function r(){e.removeEventListener("dispose",r),t.dispose()})),t}set geometry(t){this._baseGeometry=t}get material(){let t=this._derivedMaterial;const e=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=new jt);return(!t||t.baseMaterial!==e)&&(t=this._derivedMaterial=Ec(e),e.addEventListener("dispose",function r(){e.removeEventListener("dispose",r),t.dispose()})),t.setUniformNames(this._instancedUniformNames),t}set material(t){if(Array.isArray(t))throw new Error("InstancedUniformsMesh does not support multiple materials");for(;t&&t.isInstancedUniformsMaterial;)t=t.baseMaterial;this._baseMaterial=t}get customDepthMaterial(){return this.material.getDepthMaterial()}set customDepthMaterial(t){}get customDistanceMaterial(){return this.material.getDistanceMaterial()}set customDistanceMaterial(t){}setUniformAt(t,e,r){const i=this.geometry.attributes,o=`troika_attr_${t}`;let s=i[o];if(!s){const a=Uc(this._baseMaterial,t),c=Rc(a);if(s=i[o]=new Ys(new Float32Array(c*this._maxCount),c),a!==null)for(let f=0;f<this._maxCount;f++)Zi(s,f,a);this._instancedUniformNames=[...this._instancedUniformNames,t]}Zi(s,e,r),s.needsUpdate=!0}unsetUniform(t){this.geometry.deleteAttribute(`troika_attr_${t}`),this._instancedUniformNames=this._instancedUniformNames.filter(e=>e!==t)}}function Zi(n,t,e){let r=n.itemSize;r===1?n.setX(t,e):r===2?n.setXY(t,e.x,e.y):r===3?e.isColor?n.setXYZ(t,e.r,e.g,e.b):n.setXYZ(t,e.x,e.y,e.z):r===4?n.setXYZW(t,e.x,e.y,e.z,e.w):e.toArray?e.toArray(n.array,t*r):n.set(e,t*r)}function Uc(n,t){let e=n.uniforms;return e&&e[t]||(e=Cc(n).uniforms,e&&e[t])?e[t].value:null}function Rc(n){return n==null?0:typeof n=="number"?1:n.isVector2?2:n.isVector3||n.isColor?3:n.isVector4||n.isQuaternion?4:n.elements?n.elements.length:Array.isArray(n)?n.length:0}const Fc=(n,t)=>{const e=n.split(`
`),r=/vMapUv|vAlphaMapUv|vNormalMapUv/g;return e.map(i=>!i.includes("varying")&&!i.includes("uniform")?i.replace(r,t):i).join(`
`)},Oc=(n,t)=>{const e={USE_UV:""};return t&&(e.TRI_GEOMETRY=""),_n(n,{defines:e,uniforms:{animationData:{value:null},animationDataSize:{value:0},billboarding:{value:0},flipX:{value:0},flipY:{value:0},spritesheetData:{value:null},dataSize:{value:new Z(0,0)},tint:{value:new zt(0,0,0,0)}},vertexDefs:`
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
    `,customRewriter:({vertexShader:r,fragmentShader:i})=>(i=i.replace("void main() {",`void main() {
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



			`),i=`
			
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
			
			${i}
			`,i=i.replace("vec4 sampledDiffuseColor = texture2D( map, vMapUv );",`
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
      `),i=Fc(i,"spriteUv"),{vertexShader:r,fragmentShader:i})})},Bu=n=>{const t=[],e=[],r={},i=[],o=n.meta.size.w,s=n.meta.size.h,a=[n.meta.size.w,n.meta.size.h];for(const c in n.frames){const f=n.frames[c];t.push([f.frame.x/o,f.frame.y/s,f.frame.w/o,f.frame.h/s]),e.push(f.duration)}for(const c of n.meta.frameTags){r[c.name]=[];for(let f=c.from;f<=c.to;f++)r[c.name].push([f,e[f]]);i.push(r[c.name].length)}return{frames:t,animations:r,sheetSize:a,animationLengths:i}},Lc=n=>{const{frames:t,animationLengths:e,animations:r}=n,i=Math.max(t.length,e.length,...Object.values(r).map(d=>d.length)),o=2+Object.values(r).length,s=t.flat().concat(new Array((i-t.length)*4).fill(0)),a=e.map(d=>[d,0,0,0]).flat().concat(new Array((i-e.length)*4).fill(0)),c=[],f=new Map;for(let d=0;d<Object.keys(r).length;d++){const m=Object.keys(r)[d];f.set(m,d);const v=r[m].map(p=>[...p,0,0]).flat().concat(new Array((i-r[m].length)*4).fill(0));c.push(...v)}const u=[...s,...a,...c],h=new Float32Array(u);h.set(u);const l=new Ur(h,i,o,yn,Ce);return l.type=Ce,l.minFilter=mt,l.magFilter=mt,l.wrapS=gn,l.wrapT=ze,l.needsUpdate=!0,{dataTexture:l,dataWidth:i,dataHeight:o,animMap:f}},Nc=()=>{const n=new Bt,t=new Float32Array([0,1,0,-1,-1,0,1,-1,0]);n.setAttribute("position",new J(t,3));const e=new Float32Array([.5,1,0,0,1,0]);return n.setAttribute("uv",new J(e,2)),n.computeVertexNormals(),n},kc=new Ji(-1,1,1,-1,0,1);class Vc extends Bt{constructor(){super(),this.setAttribute("position",new kt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new kt([0,2,0,0,2,0],2))}}const $c=new Vc;class Hc{constructor(t){this._mesh=new Y($c,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,kc)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class jc{constructor(t,e,r){this.variables=[],this.currentTextureIndex=0;let i=Ce;const o={passThruTexture:{value:null}},s=f(h(),o),a=new Hc(s);this.setDataType=function(l){return i=l,this},this.addVariable=function(l,d,m){const v=this.createShaderMaterial(d),p={name:l,initialValueTexture:m,material:v,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:mt,magFilter:mt};return this.variables.push(p),p},this.setVariableDependencies=function(l,d){l.dependencies=d},this.init=function(){if(r.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let l=0;l<this.variables.length;l++){const d=this.variables[l];d.renderTargets[0]=this.createRenderTarget(t,e,d.wrapS,d.wrapT,d.minFilter,d.magFilter),d.renderTargets[1]=this.createRenderTarget(t,e,d.wrapS,d.wrapT,d.minFilter,d.magFilter),this.renderTexture(d.initialValueTexture,d.renderTargets[0]),this.renderTexture(d.initialValueTexture,d.renderTargets[1]);const m=d.material,v=m.uniforms;if(d.dependencies!==null)for(let p=0;p<d.dependencies.length;p++){const y=d.dependencies[p];if(y.name!==d.name){let g=!1;for(let x=0;x<this.variables.length;x++)if(y.name===this.variables[x].name){g=!0;break}if(!g)return"Variable dependency not found. Variable="+d.name+", dependency="+y.name}v[y.name]={value:null},m.fragmentShader=`
uniform sampler2D `+y.name+`;
`+m.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){const l=this.currentTextureIndex,d=this.currentTextureIndex===0?1:0;for(let m=0,v=this.variables.length;m<v;m++){const p=this.variables[m];if(p.dependencies!==null){const y=p.material.uniforms;for(let g=0,x=p.dependencies.length;g<x;g++){const w=p.dependencies[g];y[w.name].value=w.renderTargets[l].texture}}this.doRenderTarget(p.material,p.renderTargets[d])}this.currentTextureIndex=d},this.getCurrentRenderTarget=function(l){return l.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(l){return l.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){a.dispose();const l=this.variables;for(let d=0;d<l.length;d++){const m=l[d];m.initialValueTexture&&m.initialValueTexture.dispose();const v=m.renderTargets;for(let p=0;p<v.length;p++)v[p].dispose()}};function c(l){l.defines.resolution="vec2( "+t.toFixed(1)+", "+e.toFixed(1)+" )"}this.addResolutionDefine=c;function f(l,d){d=d||{};const m=new ts({name:"GPUComputationShader",uniforms:d,vertexShader:u(),fragmentShader:l});return c(m),m}this.createShaderMaterial=f,this.createRenderTarget=function(l,d,m,v,p,y){return l=l||t,d=d||e,m=m||gn,v=v||gn,p=p||mt,y=y||mt,new Ks(l,d,{wrapS:m,wrapT:v,minFilter:p,magFilter:y,format:yn,type:i,depthBuffer:!1})},this.createTexture=function(){const l=new Float32Array(t*e*4),d=new Ur(l,t,e,yn,Ce);return d.needsUpdate=!0,d},this.renderTexture=function(l,d){o.passThruTexture.value=l,this.doRenderTarget(s,d),o.passThruTexture.value=null},this.doRenderTarget=function(l,d){const m=r.getRenderTarget(),v=r.xr.enabled,p=r.shadowMap.autoUpdate;r.xr.enabled=!1,r.shadowMap.autoUpdate=!1,a.material=l,r.setRenderTarget(d),a.render(r),a.material=s,r.xr.enabled=v,r.shadowMap.autoUpdate=p,r.setRenderTarget(m)};function u(){return`void main()	{

	gl_Position = vec4( position, 1.0 );

}
`}function h(){return`uniform sampler2D passThruTexture;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = texture2D( passThruTexture, uv );

}
`}}}const Wc=`
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
`,Gc=(n=512)=>{const t=new Float32Array(n**2*4);for(let r=0;r<n**2*4;r++)t[r]=0;const e=new Ur(t,n,n,yn,Ce);return e.minFilter=mt,e.magFilter=mt,e.wrapS=gn,e.wrapT=ze,e.needsUpdate=!0,e},qc=n=>{if(n<=0)return 1;let t=1;for(;t<n;)t<<=1;return t},Zc=(n,t)=>{const e=qc(Math.sqrt(t)),r=new jc(e,e,n),i=r.createTexture(),o=r.addVariable("progress",Wc,i),s=Gc(e);o.material.uniforms.instructionsTexture={value:s},o.material.uniforms.spritesheetData={value:null},o.material.uniforms.fps={value:0},o.material.uniforms.deltaTime={value:0},o.material.uniforms.dataSize={value:new Z},r.setVariableDependencies(o,[o]);const a=r.init();a!==null&&console.error(a);let c=!1;return{gpuCompute:r,animationRunner:o,progressDataTexture:s,utils:{updateAnimationAt:(f,u)=>{const h=f*4;s.image.data[h]=u,c=!0},updateOffsetAt:(f,u)=>{const h=f*4;s.image.data[h+1]=u,c=!0},updatePlaymodeAt:(f,u)=>{const h=f*4;s.image.data[h+2]=u,c=!0},updateFrameAt:(f,u)=>{const h=f*4;s.image.data[h+3]=u+10,c=!0}},update:()=>{c&&(s.needsUpdate=!0,c=!1),r.compute()}}};class Xc{constructor(){R(this,"_previousTime"),R(this,"_currentTime"),R(this,"_startTime"),R(this,"_delta"),R(this,"_elapsed"),R(this,"_timescale"),R(this,"_useFixedDelta"),R(this,"_fixedDelta"),R(this,"_usePageVisibilityAPI"),R(this,"_pageVisibilityHandler"),this._previousTime=0,this._currentTime=0,this._startTime=Qn(),this._delta=0,this._elapsed=0,this._timescale=1,this._useFixedDelta=!1,this._fixedDelta=16.67,this._usePageVisibilityAPI=typeof document<"u"&&document.hidden!==void 0,this._usePageVisibilityAPI===!0&&(this._pageVisibilityHandler=Yc.bind(this),document.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disableFixedDelta(){return this._useFixedDelta=!1,this}dispose(){return this._usePageVisibilityAPI===!0&&document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this}enableFixedDelta(){return this._useFixedDelta=!0,this}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getFixedDelta(){return this._fixedDelta/1e3}getTimescale(){return this._timescale}reset(){return this._currentTime=Qn()-this._startTime,this}setFixedDelta(t){return this._fixedDelta=t*1e3,this}setTimescale(t){return this._timescale=t,this}update(){return this._useFixedDelta===!0?this._delta=this._fixedDelta:(this._previousTime=this._currentTime,this._currentTime=Qn()-this._startTime,this._delta=this._currentTime-this._previousTime),this._delta*=this._timescale,this._elapsed+=this._delta,this}}function Qn(){return(typeof performance>"u"?Date:performance).now()}function Yc(){document.hidden===!1&&this.reset()}const tr={FORWARD:0,REVERSE:1,PAUSE:2,PINGPONG:3};class zu extends Ic{constructor(t,e,r,i={geometry:"quad"}){let o;i.geometry||(i.geometry="quad"),i.geometry==="tri"&&(o=Nc()),i.geometry==="quad"&&(o=new Zs(1,1)),i.geometry&&typeof i.geometry!="string"&&(o=i.geometry);const s=Oc(t,i?.geometry==="tri");super(o,s,e),R(this,"_spriteMaterial"),R(this,"_spritesheet"),R(this,"_animationMap"),R(this,"_fps",15),R(this,"_timer"),R(this,"compute"),this.instanceMatrix.clearUpdateRanges(),this.instanceMatrix.addUpdateRange(0,e*16),this.instanceColor&&(this.instanceColor.clearUpdateRanges(),this.instanceColor.addUpdateRange(0,e*3)),this.compute=Zc(r,e),this._spriteMaterial=s,i.spritesheet&&this.updateSpritesheet(i.spritesheet),this._timer=new Xc,this._animationMap=new Map,this._spriteMaterial.uniforms.animationData.value=this.compute.gpuCompute.getCurrentRenderTarget(this.compute.animationRunner).texture,this._spriteMaterial.uniforms.animationDataSize.value=this.compute.progressDataTexture.image.width}updateSpritesheet(t){const{dataTexture:e,dataWidth:r,dataHeight:i,animMap:o}=Lc(t);this._spriteMaterial.uniforms.spritesheetData.value=e,this._spriteMaterial.uniforms.dataSize.value.x=r,this._spriteMaterial.uniforms.dataSize.value.y=i,this.compute.animationRunner.material.uniforms.dataSize.value=new Z(r,i),this.compute.animationRunner.material.uniforms.spritesheetData.value=e,this._animationMap=o}get spritesheet(){return this._spritesheet}set spritesheet(t){this.updateSpritesheet(t),this._spritesheet=t}get animationMap(){return this._animationMap}get animation(){return{setAt:(t,e)=>{this.compute.utils.updateAnimationAt(t,this._animationMap.get(e)||0)}}}get frame(){return{setAt:(t,e,r)=>{var i;let o=e;r&&(o=(i=this.spritesheet)==null?void 0:i.animations[r][e][0]),this.compute.utils.updateFrameAt(t,o)},unsetAt:t=>{this.compute.utils.updateFrameAt(t,-10)},unsetAll:()=>{for(let t=0;t<this.count;t++)this.compute.utils.updateFrameAt(t,-10)}}}get playmode(){return{setAt:(t,e)=>{this.compute.utils.updatePlaymodeAt(t,tr[e])},setAll:t=>{for(let e=0;e<this.count;e++){const r=this.compute.progressDataTexture.image.data[e*4+2]>=10?10:0;this.compute.utils.updatePlaymodeAt(e,r+tr[t])}}}}get billboarding(){return{setAt:(t,e)=>{this.setUniformAt("billboarding",t,e?1:0)},setAll:t=>{this._spriteMaterial.uniforms.billboarding.value=t?1:0},unsetAll:()=>{this.unsetUniform("billboarding")}}}get offset(){return{setAt:(t,e)=>{this.compute.utils.updateOffsetAt(t,e)},randomizeAll:(t=1)=>{for(let e=0;e<this.count;e++)this.compute.utils.updateOffsetAt(e,Math.random()*t)}}}get loop(){return{setAt:(t,e)=>{const r=this.compute.progressDataTexture.image.data[t*4+2]%10;this.compute.utils.updatePlaymodeAt(t,r+(e?0:10))},setAll:t=>{for(let e=0;e<this.count;e++){const r=this.compute.progressDataTexture.image.data[e*4+2]%10;this.compute.utils.updatePlaymodeAt(e,r+(t?0:10))}}}}get flipX(){return{setAt:(t,e)=>{this.setUniformAt("flipX",t,e?1:0)},setGlobal:t=>{this._spriteMaterial.uniforms.flipX.value=t?1:0},unsetAll:()=>{this.unsetUniform("flipX")}}}get flipY(){return{setAt:(t,e)=>{this.setUniformAt("flipY",t,e?1:0)},setGlobal:t=>{this._spriteMaterial.uniforms.flipY.value=t?1:0},unsetAll:()=>{this.unsetUniform("flipY")}}}play(t,e=!0,r="FORWARD"){return{at:i=>{this.compute.utils.updateAnimationAt(i,this._animationMap.get(t)||0),this.compute.utils.updatePlaymodeAt(i,tr[r]+(e?0:10))}}}get hueShift(){const t=new zt;return{setGlobal:e=>{e?t.set(e.h,e.s,e.v,1):t.setW(0),this._spriteMaterial.uniforms.tint.value=t}}}get fps(){return this._fps}set fps(t){this._fps=t,this.compute.animationRunner.material.uniforms.fps.value=t}update(){this._timer.update();const t=this._timer.getDelta();this.compute.animationRunner.material.uniforms.deltaTime.value=t,this.compute.update()}}function Kc(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Zr={exports:{}};Zr.exports=Bn;Zr.exports.default=Bn;function Bn(n,t,e){e=e||2;var r=t&&t.length,i=r?t[0]*e:n.length,o=As(n,0,i,e,!0),s=[];if(!o||o.next===o.prev)return s;var a,c,f,u,h,l,d;if(r&&(o=nl(n,t,o,e)),n.length>80*e){a=f=n[0],c=u=n[1];for(var m=e;m<i;m+=e)h=n[m],l=n[m+1],h<a&&(a=h),l<c&&(c=l),h>f&&(f=h),l>u&&(u=l);d=Math.max(f-a,u-c),d=d!==0?32767/d:0}return Ie(o,s,e,a,c,d,0),s}function As(n,t,e,r,i){var o,s;if(i===Tr(n,t,e,r)>0)for(o=t;o<e;o+=r)s=Xi(o,n[o],n[o+1],s);else for(o=e-r;o>=t;o-=r)s=Xi(o,n[o],n[o+1],s);return s&&zn(s,s.next)&&(Re(s),s=s.next),s}function Ht(n,t){if(!n)return n;t||(t=n);var e=n,r;do if(r=!1,!e.steiner&&(zn(e,e.next)||L(e.prev,e,e.next)===0)){if(Re(e),e=t=e.prev,e===e.next)break;r=!0}else e=e.next;while(r||e!==t);return t}function Ie(n,t,e,r,i,o,s){if(n){!s&&o&&al(n,r,i,o);for(var a=n,c,f;n.prev!==n.next;){if(c=n.prev,f=n.next,o?Qc(n,r,i,o):Jc(n)){t.push(c.i/e|0),t.push(n.i/e|0),t.push(f.i/e|0),Re(n),n=f.next,a=f.next;continue}if(n=f,n===a){s?s===1?(n=tl(Ht(n),t,e),Ie(n,t,e,r,i,o,2)):s===2&&el(n,t,e,r,i,o):Ie(Ht(n),t,e,r,i,o,1);break}}}}function Jc(n){var t=n.prev,e=n,r=n.next;if(L(t,e,r)>=0)return!1;for(var i=t.x,o=e.x,s=r.x,a=t.y,c=e.y,f=r.y,u=i<o?i<s?i:s:o<s?o:s,h=a<c?a<f?a:f:c<f?c:f,l=i>o?i>s?i:s:o>s?o:s,d=a>c?a>f?a:f:c>f?c:f,m=r.next;m!==t;){if(m.x>=u&&m.x<=l&&m.y>=h&&m.y<=d&&ie(i,a,o,c,s,f,m.x,m.y)&&L(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Qc(n,t,e,r){var i=n.prev,o=n,s=n.next;if(L(i,o,s)>=0)return!1;for(var a=i.x,c=o.x,f=s.x,u=i.y,h=o.y,l=s.y,d=a<c?a<f?a:f:c<f?c:f,m=u<h?u<l?u:l:h<l?h:l,v=a>c?a>f?a:f:c>f?c:f,p=u>h?u>l?u:l:h>l?h:l,y=Mr(d,m,t,e,r),g=Mr(v,p,t,e,r),x=n.prevZ,w=n.nextZ;x&&x.z>=y&&w&&w.z<=g;){if(x.x>=d&&x.x<=v&&x.y>=m&&x.y<=p&&x!==i&&x!==s&&ie(a,u,c,h,f,l,x.x,x.y)&&L(x.prev,x,x.next)>=0||(x=x.prevZ,w.x>=d&&w.x<=v&&w.y>=m&&w.y<=p&&w!==i&&w!==s&&ie(a,u,c,h,f,l,w.x,w.y)&&L(w.prev,w,w.next)>=0))return!1;w=w.nextZ}for(;x&&x.z>=y;){if(x.x>=d&&x.x<=v&&x.y>=m&&x.y<=p&&x!==i&&x!==s&&ie(a,u,c,h,f,l,x.x,x.y)&&L(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;w&&w.z<=g;){if(w.x>=d&&w.x<=v&&w.y>=m&&w.y<=p&&w!==i&&w!==s&&ie(a,u,c,h,f,l,w.x,w.y)&&L(w.prev,w,w.next)>=0)return!1;w=w.nextZ}return!0}function tl(n,t,e){var r=n;do{var i=r.prev,o=r.next.next;!zn(i,o)&&Ts(i,r,r.next,o)&&Ue(i,o)&&Ue(o,i)&&(t.push(i.i/e|0),t.push(r.i/e|0),t.push(o.i/e|0),Re(r),Re(r.next),r=n=o),r=r.next}while(r!==n);return Ht(r)}function el(n,t,e,r,i,o){var s=n;do{for(var a=s.next.next;a!==s.prev;){if(s.i!==a.i&&ul(s,a)){var c=Ds(s,a);s=Ht(s,s.next),c=Ht(c,c.next),Ie(s,t,e,r,i,o,0),Ie(c,t,e,r,i,o,0);return}a=a.next}s=s.next}while(s!==n)}function nl(n,t,e,r){var i=[],o,s,a,c,f;for(o=0,s=t.length;o<s;o++)a=t[o]*r,c=o<s-1?t[o+1]*r:n.length,f=As(n,a,c,r,!1),f===f.next&&(f.steiner=!0),i.push(ll(f));for(i.sort(rl),o=0;o<i.length;o++)e=il(i[o],e);return e}function rl(n,t){return n.x-t.x}function il(n,t){var e=sl(n,t);if(!e)return t;var r=Ds(e,n);return Ht(r,r.next),Ht(e,e.next)}function sl(n,t){var e=t,r=n.x,i=n.y,o=-1/0,s;do{if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){var a=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(a<=r&&a>o&&(o=a,s=e.x<e.next.x?e:e.next,a===r))return s}e=e.next}while(e!==t);if(!s)return null;var c=s,f=s.x,u=s.y,h=1/0,l;e=s;do r>=e.x&&e.x>=f&&r!==e.x&&ie(i<u?r:o,i,f,u,i<u?o:r,i,e.x,e.y)&&(l=Math.abs(i-e.y)/(r-e.x),Ue(e,n)&&(l<h||l===h&&(e.x>s.x||e.x===s.x&&ol(s,e)))&&(s=e,h=l)),e=e.next;while(e!==c);return s}function ol(n,t){return L(n.prev,n,t.prev)<0&&L(t.next,n,n.next)<0}function al(n,t,e,r){var i=n;do i.z===0&&(i.z=Mr(i.x,i.y,t,e,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==n);i.prevZ.nextZ=null,i.prevZ=null,cl(i)}function cl(n){var t,e,r,i,o,s,a,c,f=1;do{for(e=n,n=null,o=null,s=0;e;){for(s++,r=e,a=0,t=0;t<f&&(a++,r=r.nextZ,!!r);t++);for(c=f;a>0||c>0&&r;)a!==0&&(c===0||!r||e.z<=r.z)?(i=e,e=e.nextZ,a--):(i=r,r=r.nextZ,c--),o?o.nextZ=i:n=i,i.prevZ=o,o=i;e=r}o.nextZ=null,f*=2}while(s>1);return n}function Mr(n,t,e,r,i){return n=(n-e)*i|0,t=(t-r)*i|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function ll(n){var t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function ie(n,t,e,r,i,o,s,a){return(i-s)*(t-a)>=(n-s)*(o-a)&&(n-s)*(r-a)>=(e-s)*(t-a)&&(e-s)*(o-a)>=(i-s)*(r-a)}function ul(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!fl(n,t)&&(Ue(n,t)&&Ue(t,n)&&dl(n,t)&&(L(n.prev,n,t.prev)||L(n,t.prev,t))||zn(n,t)&&L(n.prev,n,n.next)>0&&L(t.prev,t,t.next)>0)}function L(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function zn(n,t){return n.x===t.x&&n.y===t.y}function Ts(n,t,e,r){var i=an(L(n,t,e)),o=an(L(n,t,r)),s=an(L(e,r,n)),a=an(L(e,r,t));return!!(i!==o&&s!==a||i===0&&on(n,e,t)||o===0&&on(n,r,t)||s===0&&on(e,n,r)||a===0&&on(e,t,r))}function on(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function an(n){return n>0?1:n<0?-1:0}function fl(n,t){var e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Ts(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Ue(n,t){return L(n.prev,n,n.next)<0?L(n,t,n.next)>=0&&L(n,n.prev,t)>=0:L(n,t,n.prev)<0||L(n,n.next,t)<0}function dl(n,t){var e=n,r=!1,i=(n.x+t.x)/2,o=(n.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&i<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(r=!r),e=e.next;while(e!==n);return r}function Ds(n,t){var e=new Ar(n.i,n.x,n.y),r=new Ar(t.i,t.x,t.y),i=n.next,o=t.prev;return n.next=t,t.prev=n,e.next=i,i.prev=e,r.next=e,e.prev=r,o.next=r,r.prev=o,r}function Xi(n,t,e,r){var i=new Ar(n,t,e);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Re(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ar(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}Bn.deviation=function(n,t,e,r){var i=t&&t.length,o=i?t[0]*e:n.length,s=Math.abs(Tr(n,0,o,e));if(i)for(var a=0,c=t.length;a<c;a++){var f=t[a]*e,u=a<c-1?t[a+1]*e:n.length;s-=Math.abs(Tr(n,f,u,e))}var h=0;for(a=0;a<r.length;a+=3){var l=r[a]*e,d=r[a+1]*e,m=r[a+2]*e;h+=Math.abs((n[l]-n[m])*(n[d+1]-n[l+1])-(n[l]-n[d])*(n[m+1]-n[l+1]))}return s===0&&h===0?0:Math.abs((h-s)/s)};function Tr(n,t,e,r){for(var i=0,o=t,s=e-r;o<e;o+=r)i+=(n[s]-n[o])*(n[o+1]+n[s+1]),s=o;return i}Bn.flatten=function(n){for(var t=n[0][0].length,e={vertices:[],holes:[],dimensions:t},r=0,i=0;i<n.length;i++){for(var o=0;o<n[i].length;o++)for(var s=0;s<t;s++)e.vertices.push(n[i][o][s]);i>0&&(r+=n[i-1].length,e.holes.push(r))}return e};var hl=Zr.exports;const pl=Kc(hl);new Z;new Z;function ml(n,t){var e=n%t,r=Math.floor(n/t);return[e,r]}function yl(n,t,e){for(var r=0,i=0;r<n.length;r+=t,i++)n.set(e([n[r],n[r+1]],i),r);return n}function gl(n,t,e,r){var i=e.x-r.x,o=n.x-t.x,s=e.y-r.y,a=n.y-t.y,c=o*s-a*i;if(c==0)throw new Error("Number of intersection points is zero or infinity.");var f=n.x*t.y-n.y*t.x,u=e.x*r.y-e.y*r.x,h=(f*i-o*u)/c,l=(f*s-a*u)/c,d={x:h,y:l};return d}function vl(n){for(var t=0,e=0,r=n.length;e<r;e++){var i=n[e].x,o=n[e==n.length-1?0:e+1].y,s=n[e==n.length-1?0:e+1].x,a=n[e].y;t+=i*o*.5,t-=s*a*.5}return Math.abs(t)}function xl([n,t,e]){return Math.abs((n.x*(t.y-e.y)+t.x*(e.y-n.y)+e.x*(n.y-t.y))/2)}function wl(n,t=8){const e=n.slice();let r=0;for(;e.length>t&&r<1e3;){r++;let i=1/0,o=null;for(let s=0;s<=e.length-1;s++){const a=e.length,c=[s,(s+1)%a,(s+2)%a,(s+3)%a],f=e[c[0]],u=e[c[1]],h=e[c[2]],l=e[c[3]];try{const d=gl(f,u,h,l),m=xl([d,u,h]);m<i&&(i=m,o={point:d,area:m,indicesToRemove:[c[1],c[2]]})}catch(d){console.log(d)}}if(o){const s=o.indicesToRemove[0],a=o.indicesToRemove[1];a>s?(e.splice(a,1),e.splice(s,1)):(e.splice(s,1),e.splice(a,1)),e.splice(Math.min(s,a),0,o.point)}}return e}var Dr;(n=>{function t(i){let o=i.slice();return o.sort(n.POINT_COMPARATOR),n.makeHullPresorted(o)}n.makeHull=t;function e(i){if(i.length<=1)return i.slice();let o=[];for(let a=0;a<i.length;a++){const c=i[a];for(;o.length>=2;){const f=o[o.length-1],u=o[o.length-2];if((f.x-u.x)*(c.y-u.y)>=(f.y-u.y)*(c.x-u.x))o.pop();else break}o.push(c)}o.pop();let s=[];for(let a=i.length-1;a>=0;a--){const c=i[a];for(;s.length>=2;){const f=s[s.length-1],u=s[s.length-2];if((f.x-u.x)*(c.y-u.y)>=(f.y-u.y)*(c.x-u.x))s.pop();else break}s.push(c)}return s.pop(),o.length==1&&s.length==1&&o[0].x==s[0].x&&o[0].y==s[0].y?o:o.concat(s)}n.makeHullPresorted=e;function r(i,o){return i.x<o.x?-1:i.x>o.x?1:i.y<o.y?-1:i.y>o.y?1:0}n.POINT_COMPARATOR=r})(Dr||(Dr={}));function bl(n,t){const e=new Float32Array(n);for(let r=0;r<n;r++)e[r*3]=t[0],e[r*3+1]=t[1],e[r*3+2]=t[2];return e}function _l(n,t,e=()=>Math.random()){const r=t+1,i=new Float32Array(n.length/t*r);for(let o=0;o<n.length;o+=t){let s=o/t*r;i[s]=n[o],i[s+1]=n[o+1],i[s+2]=e(s)}return i}function Sl(n){const t=new Float32Array(n.length*2);for(let e=0;e<n.length;e++)t[e*2]=n[e].x,t[e*2+1]=n[e].y;return t}function Ml(n,t,e){const r=[],i=n%(t*4)/4,o=Math.floor(n/(t*4)),s=o-1,a=o+1,c=i-1,f=i+1;return s>=0?r.push(s*t+i):r.push(null),a<e?r.push(a*t+i):r.push(null),c>=0?r.push(o*t+c):r.push(null),f<t?r.push(o*t+f):r.push(null),r}const Al=n=>(...t)=>t[3]/255>0,Tl={threshold:.01,slices:[1,1],indices:[0,0],scale:1,filter:Al};class Dl{constructor(t,e,r){R(this,"points",[]),R(this,"data",{areaReduction:0}),R(this,"debug",!0),R(this,"index"),R(this,"positions"),R(this,"uv"),R(this,"defaultSettings",Tl),R(this,"settings"),this.vertices=r,this.settings={...this.defaultSettings,...e};const{slices:i}=this.settings,o=Pl("bvc-image",t.width,t.height);this.points=this.getPoints(t,o);let s=Dr.makeHull(this.points);const a=wl(s,r),c=a.map(l=>{let d=Bl(l,[t.width,t.height],i);return d.y=-1*d.y,d}),{scale:f}=this.settings;this.data.areaReduction=1-vl(a)/(t.width/i[0]*(t.height/i[1]))*f;const u=Sl(c),h=pl(u,null,2);this.positions=_l(u,2,()=>0),this.index=Uint32Array.from(h),this.uv=yl(u.slice(0),2,l=>{let d=l[0]+.5;d=d/this.settings.slices[0]+1/this.settings.slices[0]*this.settings.indices[0];let m=l[1]+.5;return m=m/this.settings.slices[1]+1-1/this.settings.slices[1]*(this.settings.indices[1]+1),[d,m]})}getImageData(t,e){const r=e.getContext("2d");r.drawImage(t,0,0);const[i,o]=this.settings.indices,[s,a]=this.settings.slices,c=e.width/s,f=e.height/a;return r.getImageData(c*i,f*o,c,f)}getPoints(t,e){const r=this.getImageData(t,e),i=r.data,o=[],s=this.settings.filter(this.settings.threshold),a=c=>c!==null&&s(i[c*4],i[c*4+1],i[c*4+2],i[c*4+3]);for(let c=0;c<i.length;c+=4)if(s(i[c+0],i[c+1],i[c+2],i[c+3])){if(Ml(c,e.width,e.height).every(a))continue;const[f,u]=ml(c/4,r.width);o.push({x:f,y:u})}return o}}const Pl=(n="debug-canvas",t,e)=>{const r=document.querySelector(`#${n}`)||document.createElement("canvas");return r.id=n,r.width=t,r.height=e,r.id=n,r},Bl=(n,t,e)=>({x:(n.x-t[0]/(2*e[0]))/(t[0]/e[0]),y:(n.y-t[1]/(2*e[1]))/(t[1]/e[1])}),zl={threshold:.01,slices:[1,1],indices:[1,1]};class Cl extends Bt{constructor(t,e=8,r=.01,i=[1,1],o=[0,0]){super(),R(this,"image"),R(this,"vertices",8),R(this,"settings",zl),this.vertices=e,this.settings={...this.settings,threshold:r,slices:i,indices:o},this.image="image"in t?t.image:t,this.build()}build(){const t=new Dl(this.image,this.settings,this.vertices),e=t.positions.length,r=new J(t.index,1),i=new J(t.positions,3),o=new J(bl(e,[0,0,1]),3),s=new J(t.uv,2);this.userData.reduction=t.data.areaReduction,this.setIndex(r),this.setAttribute("position",i),this.setAttribute("normal",o),this.setAttribute("uv",s)}}const Cu=()=>new El;class El{constructor(){R(this,"animations"),this.animations=[]}add(t,e,r){const i={name:"",imageUrl:t};return Array.isArray(r)?i.multiAnimations=r:i.name=r,e.type=="rowColumn"&&(i.auto={type:"rowColumn",width:e.width,height:e.height}),e.type=="frameSize"&&(i.auto={type:"frameSize",width:e.width,height:e.height}),this.animations.push(i),this}async build(t={}){const e=new Gs,r={frames:[],animations:{},sheetSize:[0,0],animationLengths:[]};let i=new qs;const o=[];let s=0,a=0;for(const v of this.animations){const p=await e.loadAsync(v.imageUrl),y=p.width,g=p.height;s=Math.max(s,y),a+=g,o.push({img:p,w:y,h:g})}const c=document.createElement("canvas");c.width=s,c.height=a;const f=c.getContext("2d");let u=0;for(const{img:v,h:p}of o)f?.drawImage(v,0,u,v.width,v.height),u+=p;i=new rr(c),i.needsUpdate=!0;let h=0,l=0,d=0,m=64;for(const v of this.animations){const p=o[h];let y=0;if(v.auto){let g=0,x=0;v.auto.type=="frameSize"&&(x=p.w/v.auto.width,g=p.h/v.auto.height),v.auto.type=="rowColumn"&&(x=v.auto.width,g=v.auto.height);const w=p.w/x,S=p.h/g;y=g*x,v.multiAnimations||(r.animations[v.name]=[]);const _=new Map;for(let b=0;b<g;b++){d+=S;for(let M=0;M<x;M++){if(r.frames.push([p.w/x*M/s,1-d/a,w/s,S/a]),v.multiAnimations){const T=b*x+M;_.set(T,l)}else r.animations[v.name].push([l,1]);l++}}if(v.multiAnimations)for(const b of v.multiAnimations){r.animations[b.name]=[],r.animationLengths.push(b.frameRange[1]-b.frameRange[0]+1);for(let M=b.frameRange[0];M<=b.frameRange[1];M++)r.animations[b.name].push([_.get(M),1])}else r.animationLengths.push(y)}h++}if(i.matrixAutoUpdate=!1,i.generateMipmaps=!1,i.premultiplyAlpha=!1,i.wrapS=i.wrapT=ze,i.magFilter=i.minFilter=mt,i.colorSpace=ir,r.sheetSize=[s,a],t.makeSlimGeometry){const v=document.createElement("canvas");v.width=m,v.height=m;const p=v.getContext("2d"),y=s/m,g=a/m;for(let S=0;S<y;S++)for(let _=0;_<g;_++){const b=S*m,M=_*m;p?.drawImage(c,b,M,m,m,0,0,m,m)}const x=new rr(v);x.magFilter=i.minFilter=mt,x.colorSpace=ir;const w=new Cl(x,t.slimOptions?t.slimOptions.vertices:8,t.slimOptions?t.slimOptions.alphaThreshold:0);return{spritesheet:r,texture:i,geometry:w}}return{spritesheet:r,texture:i}}}const Il=new jt,cn=new B,Yi=new $,xe=new Br,er=new oe,Ul=new K,nr=new B,Rl=new B,Pr=new WeakMap,wt=new WeakMap,Ps=(n,t)=>(n.computeBoundsTree=uc,n.disposeBoundsTree=fc,n.computeBoundsTree(t),()=>{n.disposeBoundsTree()}),Eu=(n,t)=>{const e=Ps(n.geometry,t);if(n.raycast=Ss,t.helper){const r=new Le(n);n.add(r),wt.set(n,r)}return()=>{e(),n.geometry.disposeBoundsTree(),n.raycast=Y.prototype.raycast,t.helper&&(wt.get(n)?.removeFromParent(),wt.delete(n))}},Iu=(n,t)=>{if(n.computeBoundsTree=dc,n.disposeBoundsTree=hc,n.addGeometry=(...e)=>{const r=un.prototype.addGeometry.call(n,...e);return n.computeBoundsTree(r,t),r},t.helper){const e=new Le(n);n.add(e),wt.set(n,e)}return()=>{n.boundsTrees&&n.disposeBoundsTree(),n.addGeometry=un.prototype.addGeometry,n.raycast=un.prototype.raycast,t.helper&&(wt.get(n)?.removeFromParent(),wt.delete(n))}},Uu=(n,t)=>{const e=new Bt,r=n.geometry.getAttribute("position"),i=new Uint32Array(r.count*3);for(let a=0,c=0,f=r.count;a<f;a+=1,c+=3)i[c+0]=i[c+1]=i[c+2]=a;e.setAttribute("position",r),e.setIndex(new J(i,1));const o=Ps(e,t),s=new Y(e,Il);if(s.visible=!1,s.raycast=Ss,Pr.set(n,s),n.raycast=Fl,t.helper){const a=new Le(s);wt.set(n,a),n.add(a,s)}return()=>{o(),n.raycast=eo.prototype.raycast,Pr.delete(n),t.helper&&(wt.get(n)?.removeFromParent(),s.removeFromParent(),wt.delete(n))}};function Fl(n,t){const e=Pr.get(this);if(!e)return;const{threshold:r}=n.params.Points;if(this.geometry.boundingSphere===null&&this.geometry.computeBoundingSphere(),er.copy(this.geometry.boundingSphere).applyMatrix4(this.matrixWorld),er.radius+=r,!n.ray.intersectsSphere(er))return;const{geometry:i}=e,o=i.getIndex().array,s=i.getAttribute("position").array,a=this.matrixWorld.getMaxScaleOnAxis(),c=r/a,f=c*c,u=n.firstHitOnly===!0;let h=Number.POSITIVE_INFINITY;Yi.copy(this.matrixWorld).invert(),xe.copy(n.ray).applyMatrix4(Yi),i.boundsTree?.shapecast({boundsTraverseOrder:u?l=>l.distanceToPoint(xe.origin):void 0,intersectsBounds:(l,d,m)=>{if(m!==void 0&&m>h)return Ai;const v=Ul.copy(l).expandByScalar(c);return xe.intersectsBox(v)?na:Ai},intersectsRange:(l,d)=>{const m=l+d;for(let v=l;v<m;v++){const p=i.boundsTree?.resolveTriangleIndex?.(v)??v,y=o[3*p],g=s[3*y],x=s[3*y+1],w=s[3*y+2];if(cn.set(g,x,w),xe.distanceSqToPoint(cn)>f)continue;if(u){const T=xe.origin.distanceTo(cn);if(T>=h)continue;h=T}nr.copy(cn).applyMatrix4(this.matrixWorld);const _=n.ray.closestPointToPoint(nr,Rl),b=n.ray.origin.distanceTo(_);if(b<n.near||b>n.far){if(!u)continue;return!1}const M=Math.sqrt(n.ray.distanceSqToPoint(nr));if(t.push({distance:b,distanceToRay:M,point:_.clone(),index:y,face:null,faceIndex:null,barycoord:null,object:this}),u)return!0}return!1}})}export{ta as A,zu as B,gs as C,iu as D,bu as E,fo as F,sa as G,ia as H,Qo as I,Cu as J,De as K,tt as L,rt as M,st as N,nt as O,xu as P,ws as Q,Tu as R,ea as S,Mu as T,Au as U,se as V,gu as X,Bu as Y,xo as a,po as b,dn as c,ho as d,ru as e,Pu as f,Eu as g,Iu as h,Uu as i,_u as j,su as k,ou as l,au as m,uu as n,lu as o,X as p,fu as q,cu as r,du as s,nu as t,wo as u,Su as v,tu as w,Du as x,eu as y,wu as z};
