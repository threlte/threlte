import"./disclose-version.DsnmJJEf.js";import{gG as ds,bw as hs,f5 as Be,aw as vt,T as ps,aq as V,ai as ee,t as wi,V as E,a7 as Mt,Y as X,bo as Fr,aA as ms,aB as Lt,aX as _e,u as ys,a as ie,s as tt,gB as tn,bs as bi,gA as ge,eQ as gs,O as vs,aH as Lr,a3 as xs,a6 as Tt,r as ws,ap as bs,Z as _i,j as qn,R as Se,w as Xn,g5 as Si,S as Ai,M as kt,_ as Or,bn as _s,B as Z,$ as Nr,fp as Ss,eu as Zn,bd as Kt,gq as As,ah as Y,fB as pt,h as Ms,Q as xn,G as kr,i as $r,a0 as Yn,gz as J,dQ as Ts,P as Vr,gh as Yt,D as Ds,a2 as Hr,b1 as Ps,eH as en,fn as Bs,a5 as Es,N as ht,bp as zs,aV as Cs,aW as Is,bv as Mi,bY as an,an as Ae,C as cn,W as Us,ay as Rs,a9 as Fs,b as Ls,b7 as Os}from"./observe.svelte.XHimI-Ft.js";/* empty css                                                      */import{d as wn,bJ as Ni,k as Ns,g as N,b as re,az as se,aD as ks,aE as $s,p as jr,L as Kn,u as ve,f as bn,a as Gr,n as Vs,s as _n,a6 as Hs}from"./runtime.Cq5xh0TU.js";import{c as js,a as Sn,f as Wr}from"./template.L6xDPO6U.js";import{s as Gs}from"./snippet.B1WTn4og.js";import{i as ki}from"./if.eGY2C9_P.js";import{c as An}from"./svelte-component.B_Rq4ZKt.js";import{p as Ft,s as Ws,r as qs}from"./props.BuNG_qsO.js";import{a as $i,s as Xs}from"./store.Bdk9semh.js";import{d as ln,w as un,r as Zs}from"./index.D-QOJTr1.js";import{a as Ys}from"./index-client.CbnisDQz.js";import{u as Ti}from"./useThrelte.BUOnMkyN.js";import{t as Ks}from"./transitions.Bigw4laK.js";import{i as Qs}from"./injectPlugin.vYxrg8CX.js";class Js extends Map{#t=new Map;#e=wn(0);#n=wn(0);#s=Ni||-1;constructor(t){if(super(),t){for(var[e,i]of t)super.set(e,i);this.#n.v=super.size}}#i(t){return Ni===this.#s?wn(t):Ns(t)}has(t){var e=this.#t,i=e.get(t);if(i===void 0)if(super.has(t))i=this.#i(0),e.set(t,i);else return N(this.#e),!1;return N(i),!0}forEach(t,e){this.#r(),super.forEach(t,e)}get(t){var e=this.#t,i=e.get(t);if(i===void 0)if(super.has(t))i=this.#i(0),e.set(t,i);else{N(this.#e);return}return N(i),super.get(t)}set(t,e){var i=this.#t,r=i.get(t),o=super.get(t),s=super.set(t,e),a=this.#e;if(r===void 0)r=this.#i(0),i.set(t,r),re(this.#n,super.size),se(a);else if(o!==e){se(r);var c=a.reactions===null?null:new Set(a.reactions),f=c===null||!r.reactions?.every(u=>c.has(u));f&&se(a)}return s}delete(t){var e=this.#t,i=e.get(t),r=super.delete(t);return i!==void 0&&(e.delete(t),re(i,-1)),r&&(re(this.#n,super.size),se(this.#e)),r}clear(){if(super.size!==0){super.clear();var t=this.#t;re(this.#n,0);for(var e of t.values())re(e,-1);se(this.#e),t.clear()}}#r(){N(this.#e);var t=this.#t;if(this.#n.v!==t.size){for(var e of super.keys())if(!t.has(e)){var i=this.#i(0);t.set(e,i)}}for([,i]of this.#t)N(i)}keys(){return N(this.#e),super.keys()}values(){return this.#r(),super.values()}entries(){return this.#r(),super.entries()}[Symbol.iterator](){return this.entries()}get size(){return N(this.#n),super.size}}function to(n,t,e){const i=ds();if(!i)throw new Error("No user context store found, did you invoke this function outside of your main <Canvas> component?");return n?n&&!t?ln(i,r=>r[n]):(i.update(r=>{if(n in r)return r;const o=typeof t=="function"?t():t;return r[n]=o,r}),i.current[n]):{subscribe:i.subscribe}}const nn=n=>{const t=un(void 0),e=un(void 0);return n.then(i=>{t.set(i)}).catch(i=>{console.error("Error in asyncWritable:",i.message),e.set(i)}),Object.assign(Object.assign(n,t),{error:e,promise:n})};function eo(n,t){const{remember:e,clear:i}=hs(),r=new n(...t?.args??[]);return t?.extend?.(r),{load:(a,c)=>{const f=async u=>{if("loadAsync"in r){const h=await r.loadAsync(u,c?.onProgress);return c?.transform?.(h)??h}else return new Promise((h,l)=>{r.load(u,d=>h(c?.transform?.(d)??d),d=>c?.onProgress?.(d),l)})};if(Array.isArray(a)){const u=a.map(l=>e(()=>f(l),[n,l]));return nn(Promise.all(u))}else if(typeof a=="string"){const u=e(()=>f(a),[n,a]);return nn(u)}else{const u=Object.values(a).map(l=>e(()=>f(l),[n,l]));return nn(Promise.all(u).then(l=>Object.fromEntries(Object.entries(a).map(([d],m)=>[d,l[m]]))))}},clear:a=>{Array.isArray(a)?a.forEach(c=>{i([n,c])}):typeof a=="string"?i([n,a]):Object.entries(a).forEach(([,c])=>{i([n,c])})},loader:r}}const Pt=n=>({subscribe:n.subscribe,get current(){return n.current}});let xe=0;const Di=vt(!1),pn=vt(!1),Pi=vt(void 0),Bi=vt(0),Ei=vt(0),qr=vt([]),zi=vt(0),{onStart:no,onLoad:io,onError:ro}=Be;Be.onStart=(n,t,e)=>{no?.(n,t,e),pn.set(!0),Pi.set(n),Bi.set(t),Ei.set(e);const i=(t-xe)/(e-xe);zi.set(i),i===1&&Di.set(!0)};Be.onLoad=()=>{io?.(),pn.set(!1)};Be.onError=n=>{ro?.(n),qr.update(t=>[...t,n])};Be.onProgress=(n,t,e)=>{t===e&&(xe=e),pn.set(!0),Pi.set(n),Bi.set(t),Ei.set(e);const i=(t-xe)/(e-xe)||1;zi.set(i),i===1&&Di.set(!0)};const so={active:Pt(pn),item:Pt(Pi),loaded:Pt(Bi),total:Pt(Ei),errors:Pt(qr),progress:Pt(zi),finishedOnce:Pt(Di)},Fl=()=>so,oo=(n,t)=>{const e=eo(ps,t),{renderer:i}=Ti();return e.load(n,{...t,transform:r=>(r.colorSpace=i.outputColorSpace,r.needsUpdate=!0,t?.transform?.(r)??r)})},ze=new ee,Vi=new V,Hi=new wi,Mn=new E,Ll=function(n,t){if(this.geometry.boundingSphere===null&&this.geometry.computeBoundingSphere(),ze.copy(this.geometry.boundingSphere??ze),ze.applyMatrix4(this.matrixWorld),!n.ray.intersectsSphere(ze)||(Vi.copy(this.matrixWorld).invert(),Hi.copy(n.ray).applyMatrix4(Vi),this.geometry.boundingBox!==null&&Hi.intersectBox(this.geometry.boundingBox,Mn)===null))return;const e=Mn.distanceTo(n.ray.origin),i=Mn.clone();t.push({distance:e,point:i,object:this})},Xr=Symbol("THRELTE_SUSPENSE_CONTEXT_IDENTIFIER"),Ol=n=>{const t=vt(new Set),e=vt(new Map),i=un(!1),r=()=>{t.current.size===0&&e.current.size===0&&i.set(!0)},o=un(n?.final??!1),s=d=>{t.update(m=>(m.add(d),m))},a=d=>{t.update(m=>(m.delete(d),m))},c=(d,m)=>{e.update(v=>(v.set(d,m),v))},f=d=>{e.update(m=>(m.delete(d),m))},u=ln([t,e,o,i],([d,m,v,p])=>v&&p?!1:m.size>0?!0:d.size>0),h={suspend(d){s(d),d.catch(m=>{c(d,m)}).finally(()=>{a(d),r()})},onComponentDestroy(d){a(d),f(d),r()},suspended:u},l=ln(e,d=>Array.from(d.values()));return ks(Xr,h),{promises:t,suspended:u,errors:l,setFinal:d=>o.set(d??!1)}},ao=()=>{const n=$s(Xr),t=new Set,e=r=>(n&&(n.suspend(r),t.add(r)),r),i={suspended:ln(n?.suspended??Zs(!1),r=>r)};return Ys(()=>{if(n){for(const r of t)n.onComponentDestroy(r);t.clear()}}),Object.assign(e,i)};class co extends Mt{constructor(t=new X,e=new E,i=new Fr,r=new E(1,1,1)){super();const o=[],s=[],a=[],c=new E,f=new ms().getNormalMatrix(t.matrixWorld),u=new V;u.makeRotationFromEuler(i),u.setPosition(e);const h=new V;h.copy(u).invert(),l(),this.setAttribute("position",new Lt(o,3)),this.setAttribute("uv",new Lt(a,2)),s.length>0&&this.setAttribute("normal",new Lt(s,3));function l(){let p=[];const y=new E,g=new E,x=t.geometry,w=x.attributes.position,S=x.attributes.normal;if(x.index!==null){const _=x.index;for(let b=0;b<_.count;b++)y.fromBufferAttribute(w,_.getX(b)),S?(g.fromBufferAttribute(S,_.getX(b)),d(p,y,g)):d(p,y)}else{if(w===void 0)return;for(let _=0;_<w.count;_++)y.fromBufferAttribute(w,_),S?(g.fromBufferAttribute(S,_),d(p,y,g)):d(p,y)}p=m(p,c.set(1,0,0)),p=m(p,c.set(-1,0,0)),p=m(p,c.set(0,1,0)),p=m(p,c.set(0,-1,0)),p=m(p,c.set(0,0,1)),p=m(p,c.set(0,0,-1));for(let _=0;_<p.length;_++){const b=p[_];a.push(.5+b.position.x/r.x,.5+b.position.y/r.y),b.position.applyMatrix4(u),o.push(b.position.x,b.position.y,b.position.z),b.normal!==null&&s.push(b.normal.x,b.normal.y,b.normal.z)}}function d(p,y,g=null){y.applyMatrix4(t.matrixWorld),y.applyMatrix4(h),g?(g.applyNormalMatrix(f),p.push(new Tn(y.clone(),g.clone()))):p.push(new Tn(y.clone()))}function m(p,y){const g=[],x=.5*Math.abs(r.dot(y));for(let w=0;w<p.length;w+=3){let S=0,_,b,A,T;const M=p[w+0].position.dot(y)-x,D=p[w+1].position.dot(y)-x,P=p[w+2].position.dot(y)-x,B=M>0,z=D>0,C=P>0;switch(S=(B?1:0)+(z?1:0)+(C?1:0),S){case 0:{g.push(p[w]),g.push(p[w+1]),g.push(p[w+2]);break}case 1:{if(B&&(_=p[w+1],b=p[w+2],A=v(p[w],_,y,x),T=v(p[w],b,y,x)),z){_=p[w],b=p[w+2],A=v(p[w+1],_,y,x),T=v(p[w+1],b,y,x),g.push(A),g.push(b.clone()),g.push(_.clone()),g.push(b.clone()),g.push(A.clone()),g.push(T);break}C&&(_=p[w],b=p[w+1],A=v(p[w+2],_,y,x),T=v(p[w+2],b,y,x)),g.push(_.clone()),g.push(b.clone()),g.push(A),g.push(T),g.push(A.clone()),g.push(b.clone());break}case 2:{B||(_=p[w].clone(),b=v(_,p[w+1],y,x),A=v(_,p[w+2],y,x),g.push(_),g.push(b),g.push(A)),z||(_=p[w+1].clone(),b=v(_,p[w+2],y,x),A=v(_,p[w],y,x),g.push(_),g.push(b),g.push(A)),C||(_=p[w+2].clone(),b=v(_,p[w],y,x),A=v(_,p[w+1],y,x),g.push(_),g.push(b),g.push(A));break}}}return g}function v(p,y,g,x){const w=p.position.dot(g)-x,S=y.position.dot(g)-x,_=w/(w-S),b=new E(p.position.x+_*(y.position.x-p.position.x),p.position.y+_*(y.position.y-p.position.y),p.position.z+_*(y.position.z-p.position.z));let A=null;return p.normal!==null&&y.normal!==null&&(A=new E(p.normal.x+_*(y.normal.x-p.normal.x),p.normal.y+_*(y.normal.y-p.normal.y),p.normal.z+_*(y.normal.z-p.normal.z))),new Tn(b,A)}}}class Tn{constructor(t,e=null){this.position=t,this.normal=e}clone(){const t=this.position.clone(),e=this.normal!==null?this.normal.clone():null;return new this.constructor(t,e)}}const lo=new E,ji=new V,Gi=new E,uo=new E,mt=new _e;var fo=Wr("<!> <!> <!>",1),ho=Wr("<!> <!>",1);function Nl(n,t){jr(t,!0);const e=()=>$i(h,"$parent",r),i=()=>$i(N(x),"$map",r),[r,o]=Xs();let s=Ft(t,"polygonOffsetFactor",19,()=>-10),a=Ft(t,"depthTest",3,!0),c=Ft(t,"debug",3,!1),f=Ft(t,"ref",15),u=qs(t,["$$slots","$$events","$$legacy","src","mesh","position","rotation","scale","polygonOffsetFactor","depthTest","debug","ref","children"]);const h=ys(),l=ve(()=>t.mesh??e()),d=new X,m=new E,v=new Fr,p=new E(1,1,1);let y=new X;const g=ao(),x=ve(()=>typeof t.src=="string"?g(oo(t.src)):t.src?nn(Promise.resolve(t.src)):void 0);Kn(()=>{if(!("geometry"in N(l)))throw new Error('Decal must have a Mesh as parent or specify its "mesh" prop');if(!(!i()&&!t.children)){if(t.position!==void 0&&m.fromArray(t.position),t.scale!==void 0&&(typeof t.scale=="number"?p.setScalar(t.scale):p.fromArray(t.scale)),ji.copy(N(l).matrixWorld),N(l).matrixWorld.identity(),t.rotation===void 0||typeof t.rotation=="number"){mt.matrixWorld.identity(),mt.position.copy(m);const b=N(l).geometry.attributes.position.array;N(l).geometry.attributes.normal===void 0&&N(l).geometry.computeVertexNormals();const A=N(l).geometry.attributes.normal.array;let T=1/0,M=-1;for(let D=0,P=b.length;D<P;D+=3){const B=lo.fromArray(b,D).distanceToSquared(mt.position);B<T&&(T=B,M=D)}Gi.fromArray(A,M),mt.lookAt(uo.copy(mt.position).add(Gi)),mt.rotateZ(Math.PI),mt.rotateY(Math.PI),typeof t.rotation=="number"&&mt.rotateZ(t.rotation),v.copy(mt.rotation)}else v.fromArray(t.rotation);return d.geometry=new co(N(l),m,v,p),N(l).matrixWorld.copy(ji),c()&&(y.position.copy(m),y.rotation.copy(v),y.scale.copy(p)),()=>d.geometry.dispose()}});var w=js(),S=bn(w);{var _=b=>{ie(b,Ws({get is(){return d},"material.transparent":!0,"material.polygonOffset":!0,get"material.polygonOffsetFactor"(){return s()},get"material.depthTest"(){return a()},get"material.map"(){return i()}},()=>u,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:0},get ref(){return f()},set ref(A){f(A)},children:(A,T)=>{var M=ho(),D=bn(M);Gs(D,()=>t.children??Vs,()=>({ref:d}));var P=_n(D,2);{var B=z=>{ie(z,{get is(){return y},raycast:()=>null,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:1},children:(C,I)=>{var $=fo(),ct=bn($);An(ct,()=>ie.BoxGeometry,(Dt,wt)=>{wt(Dt,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:2}})});var lt=_n(ct,2);An(lt,()=>ie.MeshNormalMaterial,(Dt,wt)=>{wt(Dt,{wireframe:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:3}})});var $t=_n(lt,2);An($t,()=>ie.AxesHelper,(Dt,wt)=>{wt(Dt,{raycast:()=>null,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Decal/Decal.svelte",index:4}})}),Sn(C,$)},$$slots:{default:!0}})};ki(P,z=>{c()&&z(B)})}Sn(A,M)},$$slots:{default:!0}}))};ki(S,b=>{(i()||t.children)&&b(_)})}Sn(n,w),Gr(),o()}var po=Object.defineProperty,mo=(n,t,e)=>t in n?po(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,U=(n,t,e)=>mo(n,typeof t!="symbol"?t+"":t,e);const Zr=(n,t)=>{const[e,i]=t.split("-");return Object.assign(n.style,{left:i==="left"?"0":i==="center"?"50%":"",right:i==="right"?"0":"",top:e==="top"?"0":e==="bottom"?"":"50%",bottom:e==="bottom"?"0":"",transform:`${i==="center"?"translateX(-50%)":""} ${e==="center"?"translateY(-50%)":""}`}),t},yo=({placement:n,size:t,offset:e,id:i,className:r})=>{const o=document.createElement("div"),{top:s,left:a,right:c,bottom:f}=e;return Object.assign(o.style,{id:i,position:"absolute",zIndex:"1000",height:`${t}px`,width:`${t}px`,margin:`${s}px ${c}px ${f}px ${a}px`,borderRadius:"100%"}),Zr(o,n),i&&(o.id=i),r&&(o.className=r),o},go=n=>{const t=typeof n=="string"?document.querySelector(n):n;if(!t)throw Error("Invalid DOM element");return t};function Qn(n,t,e){return Math.max(t,Math.min(e,n))}const vo=[["x",0,3],["y",1,4],["z",2,5]],Wi=new E;function qi({isSphere:n},t,e){n&&(Wi.set(0,0,1).applyQuaternion(e.quaternion),vo.forEach(([i,r,o])=>{const s=Wi[i];let a=t[r],c=a.userData.opacity;a.material.opacity=Qn(s>=0?c:c/2,0,1),a=t[o],c=a.userData.opacity,a.material.opacity=Qn(s>=0?c/2:c,0,1)}))}const xo=(n,t,e=10)=>Math.abs(n.clientX-t.x)<e&&Math.abs(n.clientY-t.y)<e,Xi=new bs,Zi=new tt,Yi=(n,t,e,i)=>{Zi.set((n.clientX-t.left)/t.width*2-1,-((n.clientY-t.top)/t.height)*2+1),Xi.setFromCamera(Zi,e);const r=Xi.intersectObjects(i,!1),o=r.length?r[0]:null;return!o||!o.object.visible?null:o},Dn=1e-6,wo=2*Math.PI,Yr=["x","y","z"],Me=[...Yr,"nx","ny","nz"],bo=["x","z","y","nx","nz","ny"],_o=["z","x","y","nz","nx","ny"],Jn="Right",rn="Top",ti="Front",ei="Left",sn="Bottom",ni="Back",So=[Jn,rn,ti,ei,sn,ni].map(n=>n.toLocaleLowerCase()),Kr=1.3,Ki=(n,t=!0)=>{const{material:e,userData:i}=n,{color:r,opacity:o}=t?i.hover:i;e.color.set(r),e.opacity=o},Bt=n=>JSON.parse(JSON.stringify(n)),Ao=n=>{const t=n.type||"sphere",e=t==="sphere",i=n.resolution||e?64:128,r=_e.DEFAULT_UP,o=r.z===1,s=r.x===1,{container:a}=n;n.container=void 0,n=JSON.parse(JSON.stringify(n)),n.container=a;const c=o?bo:s?_o:Me;So.forEach((l,d)=>{n[l]&&(n[c[d]]=n[l])});const f={enabled:!0,color:16777215,opacity:1,scale:.7,labelColor:2236962,line:!1,border:{size:0,color:14540253},hover:{color:e?16777215:9688043,labelColor:2236962,opacity:1,scale:.7,border:{size:0,color:14540253}}},u={line:!1,scale:e?.45:.7,hover:{scale:e?.5:.7}},h={type:t,container:document.body,size:128,placement:"top-right",resolution:i,lineWidth:4,radius:e?1:.2,smoothness:18,animated:!0,speed:1,background:{enabled:!0,color:e?16777215:14739180,opacity:e?0:1,hover:{color:e?16777215:14739180,opacity:e?.2:1}},font:{family:"sans-serif",weight:900},offset:{top:10,left:10,bottom:10,right:10},corners:{enabled:!e,color:e?15915362:16777215,opacity:1,scale:e?.15:.2,radius:1,smoothness:18,hover:{color:e?16777215:9688043,opacity:1,scale:e?.2:.225}},edges:{enabled:!e,color:e?15915362:16777215,opacity:e?1:0,radius:e?1:.125,smoothness:18,scale:e?.15:1,hover:{color:e?16777215:9688043,opacity:1,scale:e?.2:1}},x:{...Bt(f),...e?{label:"X",color:16725587,line:!0}:{label:s?rn:Jn}},y:{...Bt(f),...e?{label:"Y",color:9100032,line:!0}:{label:o||s?ti:rn}},z:{...Bt(f),...e?{label:"Z",color:2920447,line:!0}:{label:o?rn:s?Jn:ti}},nx:{...Bt(u),label:e?"":s?sn:ei},ny:{...Bt(u),label:e?"":o||s?ni:sn},nz:{...Bt(u),label:e?"":o?sn:s?ei:ni}};return ii(n,h),Yr.forEach(l=>ii(n[`n${l}`],Bt(n[l]))),{...n,isSphere:e}};function ii(n,...t){if(n instanceof HTMLElement||typeof n!="object"||n===null)return n;for(const e of t)for(const i in e)i!=="container"&&i in e&&(n[i]===void 0?n[i]=e[i]:typeof e[i]=="object"&&!Array.isArray(e[i])&&(n[i]=ii(n[i]||{},e[i])));return n}const Mo=(n,t=2)=>{const e=new _i,i=t*2,{isSphere:r,resolution:o,radius:s,font:a,corners:c,edges:f}=n,u=Me.map(b=>({...n[b],radius:s}));r&&c.enabled&&u.push(c),r&&f.enabled&&u.push(f);const h=document.createElement("canvas"),l=h.getContext("2d");h.width=o*2+i*2,h.height=o*u.length+i*u.length;const[d,m]=S(u,o,a);u.forEach(({radius:b,label:A,color:T,labelColor:M,border:D,hover:{color:P,labelColor:B,border:z}},C)=>{const I=o*C+C*i+t;w(t,I,t,o,b,A,D,T,M),w(o+t*3,I,t,o,b,A,z??D,P??T,B??M)});const v=u.length,p=t/(o*2),y=t/(o*6),g=1/v,x=new qn(h);return x.repeat.set(.5-2*p,g-2*y),x.offset.set(p,1-y),Object.assign(x,{colorSpace:Xn,wrapS:Se,wrapT:Se,userData:{offsetX:p,offsetY:y,cellHeight:g}}),x;function w(b,A,T,M,D,P,B,z,C){if(D=D*(M/2),z!=null&&z!==""&&(I(),l.fillStyle=e.set(z).getStyle(),l.fill()),B&&B.size){const $=B.size*M/2;b+=$,A+=$,M-=B.size*M,D=Math.max(0,D-$),I(),l.strokeStyle=e.set(B.color).getStyle(),l.lineWidth=B.size*M,l.stroke()}P&&_(l,b+M/2,A+(M+T)/2,P,e.set(C).getStyle());function I(){l.beginPath(),l.moveTo(b+D,A),l.lineTo(b+M-D,A),l.arcTo(b+M,A,b+M,A+D,D),l.lineTo(b+M,A+M-D),l.arcTo(b+M,A+M,b+M-D,A+M,D),l.lineTo(b+D,A+M),l.arcTo(b,A+M,b,A+M-D,D),l.lineTo(b,A+D),l.arcTo(b,A,b+D,A,D),l.closePath()}}function S(b,A,T){const M=[...b].sort(($t,Dt)=>{var wt,Oi;return(((wt=$t.label)==null?void 0:wt.length)||0)-(((Oi=Dt.label)==null?void 0:Oi.length)||0)}).pop().label,{family:D,weight:P}=T,B=r?Math.sqrt(Math.pow(A*.7,2)/2):A;let z=B,C=0,I=0;do{l.font=`${P} ${z}px ${D}`;const $t=l.measureText(M);C=$t.width,I=$t.fontBoundingBoxDescent,z--}while(C>B&&z>0);const $=B/I,ct=Math.min(B/C,$),lt=Math.floor(z*ct);return[`${P} ${lt}px ${D}`,$]}function _(b,A,T,M,D){b.font=d,b.textAlign="center",b.textBaseline="middle",b.fillStyle=D,b.fillText(M,A,T+(r?m:0))}},To=(n,t)=>n.offset.x=(t?.5:0)+n.userData.offsetX,Ci=(n,t)=>{const{offset:e,userData:{offsetY:i,cellHeight:r}}=n;e.y=1-(t+1)*r+i};function Ii(n,t,e=2,i=2){const r=e/2-n,o=i/2-n,s=n/e,a=(e-n)/e,c=n/i,f=(i-n)/i,u=[r,o,0,-r,o,0,-r,-o,0,r,-o,0],h=[a,f,s,f,s,c,a,c],l=[3*(t+1)+3,3*(t+1)+4,t+4,t+5,2*(t+1)+4,2,1,2*(t+1)+3,3,4*(t+1)+3,4,0],d=[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11].map(_=>l[_]);let m,v,p,y,g,x,w,S;for(let _=0;_<4;_++){y=_<1||_>2?r:-r,g=_<2?o:-o,x=_<1||_>2?a:s,w=_<2?f:c;for(let b=0;b<=t;b++)m=Math.PI/2*(_+b/t),v=Math.cos(m),p=Math.sin(m),u.push(y+n*v,g+n*p,0),h.push(x+s*v,w+c*p),b<t&&(S=(t+1)*_+b+4,d.push(_,S,S+1))}return new Mt().setIndex(new Z(new Uint32Array(d),1)).setAttribute("position",new Z(new Float32Array(u),3)).setAttribute("uv",new Z(new Float32Array(h),2))}const Do=(n,t)=>{const e=new E,{isSphere:i,radius:r,smoothness:o}=n,s=Ii(r,o);return Me.map((a,c)=>{const f=c<3,u=Me[c],h=c?t.clone():t;Ci(h,c);const{enabled:l,scale:d,opacity:m,hover:v}=n[u],p={map:h,opacity:m,transparent:!0},y=i?new Si(new Ai(p)):new X(s,new kt(p)),g=f?u:u[1];return y.position[g]=(f?1:-1)*(i?Kr:1),i||y.lookAt(e.copy(y.position).multiplyScalar(1.7)),y.scale.setScalar(d),y.renderOrder=1,y.visible=l,y.userData={scale:d,opacity:m,hover:v},y})},Po=(n,t)=>{const{isSphere:e,corners:i}=n;if(!i.enabled)return[];const{color:r,opacity:o,scale:s,radius:a,smoothness:c,hover:f}=i,u=e?null:Ii(a,c),h={transparent:!0,opacity:o},l=[1,1,1,-1,1,1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,-1,-1,-1,-1,-1].map(m=>m*.85),d=new E;return Array(l.length/3).fill(0).map((m,v)=>{if(e){const g=t.clone();Ci(g,6),h.map=g}else h.color=r;const p=e?new Si(new Ai(h)):new X(u,new kt(h)),y=v*3;return p.position.set(l[y],l[y+1],l[y+2]),e&&p.position.normalize().multiplyScalar(1.7),p.scale.setScalar(s),p.lookAt(d.copy(p.position).multiplyScalar(2)),p.renderOrder=1,p.userData={color:r,opacity:o,scale:s,hover:f},p})},Bo=(n,t,e)=>{const{isSphere:i,edges:r}=n;if(!r.enabled)return[];const{color:o,opacity:s,scale:a,hover:c,radius:f,smoothness:u}=r,h=i?null:Ii(f,u,1.2,.25),l={transparent:!0,opacity:s},d=[0,1,1,0,-1,1,1,0,1,-1,0,1,0,1,-1,0,-1,-1,1,0,-1,-1,0,-1,1,1,0,1,-1,0,-1,1,0,-1,-1,0].map(p=>p*.925),m=new E,v=new E(0,1,0);return Array(d.length/3).fill(0).map((p,y)=>{if(i){const w=t.clone();Ci(w,e),l.map=w}else l.color=o;const g=i?new Si(new Ai(l)):new X(h,new kt(l)),x=y*3;return g.position.set(d[x],d[x+1],d[x+2]),i&&g.position.normalize().multiplyScalar(1.7),g.scale.setScalar(a),g.up.copy(v),g.lookAt(m.copy(g.position).multiplyScalar(2)),!i&&!g.position.y&&(g.rotation.z=Math.PI/2),g.renderOrder=1,g.userData={color:o,opacity:s,scale:a,hover:c},g})};function Eo(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),o={},s={},a=n[0].morphTargetsRelative,c=new Mt;let f=0;for(let u=0;u<n.length;++u){const h=n[u];let l=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.attributes[d]),l++}if(l!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;s[d]===void 0&&(s[d]=[]),s[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(f,d,u),f+=d}}if(e){let u=0;const h=[];for(let l=0;l<n.length;++l){const d=n[l].index;for(let m=0;m<d.count;++m)h.push(d.getX(m)+u);u+=n[l].attributes.position.count}c.setIndex(h)}for(const u in o){const h=Qi(o[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in s){const h=s[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let l=0;l<h;++l){const d=[];for(let v=0;v<s[u].length;++v)d.push(s[u][v][l]);const m=Qi(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(m)}}return c}function Qi(n){let t,e,i,r=-1,o=0;for(let f=0;f<n.length;++f){const u=n[f];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=u.count*e}const s=new t(o),a=new Z(s,e,i);let c=0;for(let f=0;f<n.length;++f){const u=n[f];if(u.isInterleavedBufferAttribute){const h=c/e;for(let l=0,d=u.count;l<d;l++)for(let m=0;m<e;m++){const v=u.getComponent(l,m);a.setComponent(l+h,m,v)}}else s.set(u.array,c);c+=u.count*e}return r!==void 0&&(a.gpuType=r),a}const zo=(n,t)=>{const{isSphere:e,background:{enabled:i,color:r,opacity:o,hover:s}}=t;let a;const c=new kt({color:r,side:Or,opacity:o,transparent:!0,depthWrite:!1});if(!i)return null;if(e)a=new X(new _s(1.8,64,64),c);else{let f;n.forEach(u=>{const h=u.scale.x;u.scale.setScalar(.9),u.updateMatrix();const l=u.geometry.clone();l.applyMatrix4(u.matrix),f=f?Eo([f,l]):l,u.scale.setScalar(h)}),a=new X(f,c)}return a.userData={color:r,opacity:o,hover:s},a},Ji=new Y,Ce=new E;let Qr=class extends Ss{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Lt(t,3)),this.setAttribute("uv",new Lt(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Zn(e,6,1);return this.setAttribute("instanceStart",new Kt(i,3,0)),this.setAttribute("instanceEnd",new Kt(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Zn(e,6,1);return this.setAttribute("instanceColorStart",new Kt(i,3,0)),this.setAttribute("instanceColorEnd",new Kt(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new As(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Y);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Ji.setFromBufferAttribute(e),this.boundingBox.union(Ji))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ee),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let o=0,s=t.count;o<s;o++)Ce.fromBufferAttribute(t,o),r=Math.max(r,i.distanceToSquared(Ce)),Ce.fromBufferAttribute(e,o),r=Math.max(r,i.distanceToSquared(Ce));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}};tn.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new tt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};ge.line={uniforms:bi.merge([tn.common,tn.fog,tn.line]),vertexShader:`
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
		`};let Ui=class extends Nr{constructor(t){super({type:"LineMaterial",uniforms:bi.clone(ge.line.uniforms),vertexShader:ge.line.vertexShader,fragmentShader:ge.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};const Pn=new Tt,tr=new E,er=new E,H=new Tt,j=new Tt,ut=new Tt,Bn=new E,En=new V,q=new pt,nr=new E,Ie=new Y,Ue=new ee,ft=new Tt;let dt,Ot;function ir(n,t,e){return ft.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),ft.multiplyScalar(1/ft.w),ft.x=Ot/e.width,ft.y=Ot/e.height,ft.applyMatrix4(n.projectionMatrixInverse),ft.multiplyScalar(1/ft.w),Math.abs(Math.max(ft.x,ft.y))}function Co(n,t){const e=n.matrixWorld,i=n.geometry,r=i.attributes.instanceStart,o=i.attributes.instanceEnd,s=Math.min(i.instanceCount,r.count);for(let a=0,c=s;a<c;a++){q.start.fromBufferAttribute(r,a),q.end.fromBufferAttribute(o,a),q.applyMatrix4(e);const f=new E,u=new E;dt.distanceSqToSegment(q.start,q.end,u,f),u.distanceTo(f)<Ot*.5&&t.push({point:u,pointOnLine:f,distance:dt.origin.distanceTo(u),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function Io(n,t,e){const i=t.projectionMatrix,r=n.material.resolution,o=n.matrixWorld,s=n.geometry,a=s.attributes.instanceStart,c=s.attributes.instanceEnd,f=Math.min(s.instanceCount,a.count),u=-t.near;dt.at(1,ut),ut.w=1,ut.applyMatrix4(t.matrixWorldInverse),ut.applyMatrix4(i),ut.multiplyScalar(1/ut.w),ut.x*=r.x/2,ut.y*=r.y/2,ut.z=0,Bn.copy(ut),En.multiplyMatrices(t.matrixWorldInverse,o);for(let h=0,l=f;h<l;h++){if(H.fromBufferAttribute(a,h),j.fromBufferAttribute(c,h),H.w=1,j.w=1,H.applyMatrix4(En),j.applyMatrix4(En),H.z>u&&j.z>u)continue;if(H.z>u){const y=H.z-j.z,g=(H.z-u)/y;H.lerp(j,g)}else if(j.z>u){const y=j.z-H.z,g=(j.z-u)/y;j.lerp(H,g)}H.applyMatrix4(i),j.applyMatrix4(i),H.multiplyScalar(1/H.w),j.multiplyScalar(1/j.w),H.x*=r.x/2,H.y*=r.y/2,j.x*=r.x/2,j.y*=r.y/2,q.start.copy(H),q.start.z=0,q.end.copy(j),q.end.z=0;const d=q.closestPointToPointParameter(Bn,!0);q.at(d,nr);const m=Ms.lerp(H.z,j.z,d),v=m>=-1&&m<=1,p=Bn.distanceTo(nr)<Ot*.5;if(v&&p){q.start.fromBufferAttribute(a,h),q.end.fromBufferAttribute(c,h),q.start.applyMatrix4(o),q.end.applyMatrix4(o);const y=new E,g=new E;dt.distanceSqToSegment(q.start,q.end,g,y),e.push({point:g,pointOnLine:y,distance:dt.origin.distanceTo(g),object:n,face:null,faceIndex:h,uv:null,uv1:null})}}}let Uo=class extends X{constructor(t=new Qr,e=new Ui({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*e.count);for(let s=0,a=0,c=e.count;s<c;s++,a+=2)tr.fromBufferAttribute(e,s),er.fromBufferAttribute(i,s),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+tr.distanceTo(er);const o=new Zn(r,2,1);return t.setAttribute("instanceDistanceStart",new Kt(o,1,0)),t.setAttribute("instanceDistanceEnd",new Kt(o,1,1)),this}raycast(t,e){const i=this.material.worldUnits,r=t.camera;r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const o=t.params.Line2!==void 0&&t.params.Line2.threshold||0;dt=t.ray;const s=this.matrixWorld,a=this.geometry,c=this.material;Ot=c.linewidth+o,a.boundingSphere===null&&a.computeBoundingSphere(),Ue.copy(a.boundingSphere).applyMatrix4(s);let f;if(i)f=Ot*.5;else{const h=Math.max(r.near,Ue.distanceToPoint(dt.origin));f=ir(r,h,c.resolution)}if(Ue.radius+=f,dt.intersectsSphere(Ue)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Ie.copy(a.boundingBox).applyMatrix4(s);let u;if(i)u=Ot*.5;else{const h=Math.max(r.near,Ie.distanceToPoint(dt.origin));u=ir(r,h,c.resolution)}Ie.expandByScalar(u),dt.intersectsBox(Ie)!==!1&&(i?Co(this,e):Io(this,r,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(Pn),this.material.uniforms.resolution.value.set(Pn.z,Pn.w))}};class Jr extends Qr{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){const e=t.length-3,i=new Float32Array(2*e);for(let r=0;r<e;r+=3)i[2*r]=t[r],i[2*r+1]=t[r+1],i[2*r+2]=t[r+2],i[2*r+3]=t[r+3],i[2*r+4]=t[r+4],i[2*r+5]=t[r+5];return super.setPositions(i),this}setColors(t){const e=t.length-3,i=new Float32Array(2*e);for(let r=0;r<e;r+=3)i[2*r]=t[r],i[2*r+1]=t[r+1],i[2*r+2]=t[r+2],i[2*r+3]=t[r+3],i[2*r+4]=t[r+4],i[2*r+5]=t[r+5];return super.setColors(i),this}setFromPoints(t){const e=t.length-1,i=new Float32Array(6*e);for(let r=0;r<e;r++)i[6*r]=t[r].x,i[6*r+1]=t[r].y,i[6*r+2]=t[r].z||0,i[6*r+3]=t[r+1].x,i[6*r+4]=t[r+1].y,i[6*r+5]=t[r+1].z||0;return super.setPositions(i),this}fromLine(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}}let Ro=class extends Uo{constructor(t=new Jr,e=new Ui({color:Math.random()*16777215})){super(t,e),this.isLine2=!0,this.type="Line2"}};const Fo=n=>{const t=new _i,e=[],i=[],{isSphere:r}=n;if(Me.forEach((a,c)=>{const{enabled:f,line:u,scale:h,color:l}=n[a];if(!f||!u)return;const d=c<3?1:-1,m=(r?Kr-h/2:.975)*d;e.push(a.includes("x")?m:0,a.includes("y")?m:0,a.includes("z")?m:0,0,0,0);const v=t.set(l).toArray();i.push(...v,...v)}),!e.length)return null;const o=new Jr().setPositions(e).setColors(i),s=new Ui({linewidth:n.lineWidth,vertexColors:!0,resolution:new tt(window.innerWidth,window.innerHeight)});return new Ro(o,s).computeLineDistances()},Lo=n=>{const{corners:t,edges:e}=n,i=[],r=Mo(n),o=Do(n,r);i.push(...o),t.enabled&&i.push(...Po(n,r)),e.enabled&&i.push(...Bo(n,r,t.enabled?7:6));const s=zo(o,n),a=Fo(n);return[i,s,a]},oe=(n,t=!0)=>{const{material:e,userData:i}=n,{opacity:r,color:o,scale:s}=t?i.hover:i;n.scale.setScalar(s),e.opacity=r,e.map?To(e.map,t):e.color.set(o)},Vt=new V,rr=new ws,Oo=new tt,Et=new E,sr=new Tt;let jl=class extends _e{constructor(t,e,i={}){super(),U(this,"enabled",!0),U(this,"camera"),U(this,"renderer"),U(this,"options"),U(this,"target",new E),U(this,"animated",!0),U(this,"speed",1),U(this,"animating",!1),U(this,"_options"),U(this,"_intersections"),U(this,"_background",null),U(this,"_viewport",[0,0,0,0]),U(this,"_originalViewport",[0,0,0,0]),U(this,"_originalScissor",[0,0,0,0]),U(this,"_scene"),U(this,"_camera"),U(this,"_container"),U(this,"_domElement"),U(this,"_domRect"),U(this,"_dragging",!1),U(this,"_distance",0),U(this,"_clock",new gs),U(this,"_targetQuaternion",new xn),U(this,"_quaternionStart",new xn),U(this,"_quaternionEnd",new xn),U(this,"_pointerStart",new tt),U(this,"_focus",null),U(this,"_placement"),U(this,"_controls"),U(this,"_controlsListeners"),this.camera=t,this.renderer=e,this._scene=new vs().add(this),this.set(i)}get placement(){return this._placement}set placement(t){this._placement=Zr(this._domElement,t),this.domUpdate()}set(t={}){this.dispose(),this.options=t,this._options=Ao(t),this._camera=this._options.isSphere?new Lr(-1.8,1.8,1.8,-1.8,5,10):new xs(26,1,5,10),this._camera.position.set(0,0,7);const[e,i,r]=Lo(this._options);i&&this.add(i),r&&this.add(r),this.add(...e),this._background=i,this._intersections=e;const{container:o,animated:s,speed:a}=this._options;return this.animated=s,this.speed=a,this._container=o?go(o):document.body,this._domElement=yo(this._options),this._domElement.onpointerdown=c=>this._onPointerDown(c),this._domElement.onpointermove=c=>this._onPointerMove(c),this._domElement.onpointerleave=()=>this._onPointerLeave(),this._container.appendChild(this._domElement),this._controls&&this.attachControls(this._controls),this.update(),this._updateOrientation(!0),this}render(){this.animating&&this._animate();const{renderer:t,_viewport:e}=this,i=t.getScissorTest(),r=t.autoClear;return t.autoClear=!1,t.setViewport(...e),i&&t.setScissor(...e),t.clear(!1,!0,!1),t.render(this._scene,this._camera),t.setViewport(...this._originalViewport),i&&t.setScissor(...this._originalScissor),t.autoClear=r,this}domUpdate(){this._domRect=this._domElement.getBoundingClientRect();const t=this.renderer,e=this._domRect,i=t.domElement.getBoundingClientRect();return this._viewport.splice(0,4,e.left-i.left,t.domElement.clientHeight-(e.top-i.top+e.height),e.width,e.height),t.getViewport(sr).toArray(this._originalViewport),t.getScissorTest()&&t.getScissor(sr).toArray(this._originalScissor),this}cameraUpdate(){return this._updateOrientation(),this}update(t=!0){return t&&this._controls&&this._controls.update(),this.domUpdate().cameraUpdate()}attachControls(t){return this.detachControls(),this.target=t.target,this._controlsListeners={start:()=>t.enabled=!1,end:()=>t.enabled=!0,change:()=>this.update(!1)},this.addEventListener("start",this._controlsListeners.start),this.addEventListener("end",this._controlsListeners.end),t.addEventListener("change",this._controlsListeners.change),this._controls=t,this}detachControls(){if(!(!this._controlsListeners||!this._controls))return this.target=new E().copy(this._controls.target),this.removeEventListener("start",this._controlsListeners.start),this.removeEventListener("end",this._controlsListeners.end),this._controls.removeEventListener("change",this._controlsListeners.change),this._controlsListeners=void 0,this._controls=void 0,this}dispose(){var t;this.detachControls(),this.children.forEach(e=>{var i,r,o,s;this.remove(e);const a=e;(i=a.material)==null||i.dispose(),(o=(r=a.material)==null?void 0:r.map)==null||o.dispose(),(s=a.geometry)==null||s.dispose()}),(t=this._domElement)==null||t.remove()}_updateOrientation(t=!0){t&&(this.quaternion.copy(this.camera.quaternion).invert(),this.updateMatrixWorld()),qi(this._options,this._intersections,this.camera)}_animate(){const{position:t,quaternion:e}=this.camera;if(t.set(0,0,1),!this.animated){t.applyQuaternion(this._quaternionEnd).multiplyScalar(this._distance).add(this.target),e.copy(this._targetQuaternion),this._updateOrientation(),this.animating=!1,this.dispatchEvent({type:"change"}),this.dispatchEvent({type:"end"});return}this._controls&&(this._controls.enabled=!1);const i=this._clock.getDelta()*wo*this.speed;this._quaternionStart.rotateTowards(this._quaternionEnd,i),t.applyQuaternion(this._quaternionStart).multiplyScalar(this._distance).add(this.target),e.rotateTowards(this._targetQuaternion,i),this._updateOrientation(),requestAnimationFrame(()=>this.dispatchEvent({type:"change"})),this._quaternionStart.angleTo(this._quaternionEnd)<Dn&&(this._controls&&(this._controls.enabled=!0),this.animating=!1,this.dispatchEvent({type:"end"}))}_setOrientation(t){const e=this.camera,i=this.target;Et.copy(t).multiplyScalar(this._distance),Vt.setPosition(Et).lookAt(Et,this.position,this.up),this._targetQuaternion.setFromRotationMatrix(Vt),Et.add(i),Vt.lookAt(Et,i,this.up),this._quaternionEnd.setFromRotationMatrix(Vt),Vt.setPosition(e.position).lookAt(e.position,i,this.up),this._quaternionStart.setFromRotationMatrix(Vt),this.animating=!0,this._clock.start(),this.dispatchEvent({type:"start"})}_onPointerDown(t){if(!this.enabled)return;const e=c=>{if(!this._dragging){if(xo(c,this._pointerStart))return;this._dragging=!0}const f=Oo.set(c.clientX,c.clientY).sub(this._pointerStart).multiplyScalar(1/this._domRect.width*Math.PI),u=this.coordinateConversion(Et.subVectors(this.camera.position,this.target)),h=rr.setFromVector3(u);h.theta=s-f.x,h.phi=Qn(a-f.y,Dn,Math.PI-Dn),this.coordinateConversion(this.camera.position.setFromSpherical(h),!0).add(this.target),this.camera.lookAt(this.target),this.quaternion.copy(this.camera.quaternion).invert(),this._updateOrientation(!1),this.dispatchEvent({type:"change"})},i=()=>{if(document.removeEventListener("pointermove",e,!1),document.removeEventListener("pointerup",i,!1),!this._dragging)return this._handleClick(t);this._focus&&(oe(this._focus,!1),this._focus=null),this._dragging=!1,this.dispatchEvent({type:"end"})};if(this.animating)return;t.preventDefault(),this._pointerStart.set(t.clientX,t.clientY);const r=this.coordinateConversion(Et.subVectors(this.camera.position,this.target)),o=rr.setFromVector3(r),s=o.theta,a=o.phi;this._distance=o.radius,document.addEventListener("pointermove",e,!1),document.addEventListener("pointerup",i,!1),this.dispatchEvent({type:"start"})}coordinateConversion(t,e=!1){const{x:i,y:r,z:o}=t,s=_e.DEFAULT_UP;return s.x===1?e?t.set(r,o,i):t.set(o,i,r):s.z===1?e?t.set(o,i,r):t.set(r,o,i):t}_onPointerMove(t){!this.enabled||this._dragging||(this._background&&Ki(this._background,!0),this._handleHover(t))}_onPointerLeave(){!this.enabled||this._dragging||(this._background&&Ki(this._background,!1),this._focus&&oe(this._focus,!1),this._domElement.style.cursor="")}_handleClick(t){const e=Yi(t,this._domRect,this._camera,this._intersections);this._focus&&(oe(this._focus,!1),this._focus=null),e&&(this._setOrientation(e.object.position),this.dispatchEvent({type:"change"}))}_handleHover(t){const e=Yi(t,this._domRect,this._camera,this._intersections),i=e?.object||null;this._focus!==i&&(this._domElement.style.cursor=i?"pointer":"",this._focus&&oe(this._focus,!1),(this._focus=i)?oe(i,!0):qi(this._options,this._intersections,this.camera))}};const or=new V,ar=new V,Re=[],ae=new X;class Wl extends kr{color;instancedMesh;instances;constructor(t,e){super(),this.color=new _i("white"),this.instancedMesh=t,this.instances=e}get geometry(){return this.instancedMesh.current?.geometry}raycast(t,e){const i=this.instancedMesh.current;if(i===void 0||i.geometry===void 0||i.material===void 0)return;ae.geometry=i.geometry;const r=i.matrixWorld,o=this.instances.current.indexOf(this);if(!(o===-1||o>i.count)){i.getMatrixAt(o,or),ar.multiplyMatrices(r,or),ae.matrixWorld=ar,$r(i.material,"Material")?ae.material.side=i.material.side:ae.material.side=i.material[0]?.side??Yn,ae.raycast(t,Re);for(let s=0,a=Re.length;s<a;s++){const c=Re[s];c.instanceId=o,c.object=this,e.push(c)}Re.length=0}}}const ri=J.shadowmap_pars_fragment,fn=ri.includes("unpackRGBAToDepth"),cr=fn?"unpackRGBAToDepth(texture2D(shadowMap, ":"texture2D(shadowMap, ",lr=fn?"))":").r";function ql(n,t){jr(t,!0);const{renderer:e,scene:i}=Ti();let r=Ft(t,"size",3,25),o=Ft(t,"focus",3,0),s=Ft(t,"samples",3,10);const a=ve(()=>r()*1.25),c=ve(()=>(1/s()).toFixed(8));let f=ve(()=>`
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
			float blockerSearchScale = 2.0 * float(${r()});
			vec2 offset;
			float depth;
			float isBlocker;
			#pragma unroll_loop_start
			for (int i = 0; i < ${s()}; i++) {
				offset = offsets[ i ] * blockerSearchScale;
				depth = ${cr}uv + offset${lr};
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
				shadow += step(zReceiver, ${cr}uv + offset${lr});
			}
			#pragma unroll_loop_end

			return shadow * float(${N(c)});
	}`);const u=l=>{e.properties.remove(l),l.needsUpdate=!0},h=()=>{i.traverse(l=>{const d=l.material;if(!(d&&!$r(d,"Material")))if(Array.isArray(d))for(const m of d)u(m);else u(d)}),e.info.programs!==null&&(e.info.programs.length=0)};Kn(()=>{let l=null;return fn||(l=e.shadowMap.type,e.shadowMap.type=Ts),()=>{l!==null&&(e.shadowMap.type=l)}}),Kn(()=>{let l=ri.replace("#ifdef USE_SHADOWMAP",`#ifdef USE_SHADOWMAP
${N(f)}`);return fn?l=l.replace("#if defined( SHADOWMAP_TYPE_PCF )",`
return PCSS(shadowMap, shadowCoord);
#if defined( SHADOWMAP_TYPE_PCF )`):l=l.replace("float depth = texture2D( shadowMap, shadowCoord.xy ).r;",`return PCSS( shadowMap, shadowCoord );
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;`),J.shadowmap_pars_fragment=l,h(),()=>{J.shadowmap_pars_fragment=ri,h()}}),Gr()}const Xl=`
    #include <common>
    ${J.logdepthbuf_pars_vertex}
    ${J.fog_pars_vertex}

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

        ${J.logdepthbuf_vertex}
        ${J.fog_vertex}
    }
`,Zl=`
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

	${J.tonemapping_fragment}
	${J.colorspace_fragment}
}`,Yl=`
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

	${J.tonemapping_fragment}
	${J.colorspace_fragment}
}`,ts=0,No=1,ko=2,ur=0,$o=1,fr=2,zn=1.25,dr=1,we=32,mn=65535,Vo=Math.pow(2,-24),Cn=Symbol("SKIP_GENERATION");function Ho(n){return n.index?n.index.count:n.attributes.position.count}function ne(n){return Ho(n)/3}function jo(n,t=ArrayBuffer){return n>65535?new Uint32Array(new t(4*n)):new Uint16Array(new t(2*n))}function Go(n,t){if(!n.index){const e=n.attributes.position.count,i=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=jo(e,i);n.setIndex(new Z(r,1));for(let o=0;o<e;o++)r[o]=o}}function es(n,t){const e=ne(n),i=t||n.drawRange,r=i.start/3,o=(i.start+i.count)/3,s=Math.max(0,r),a=Math.min(e,o)-s;return[{offset:Math.floor(s),count:Math.floor(a)}]}function ns(n,t){if(!n.groups||!n.groups.length)return es(n,t);const e=[],i=new Set,r=t||n.drawRange,o=r.start/3,s=(r.start+r.count)/3;for(const c of n.groups){const f=c.start/3,u=(c.start+c.count)/3;i.add(Math.max(o,f)),i.add(Math.min(s,u))}const a=Array.from(i.values()).sort((c,f)=>c-f);for(let c=0;c<a.length-1;c++){const f=a[c],u=a[c+1];e.push({offset:Math.floor(f),count:Math.floor(u-f)})}return e}function Wo(n,t){const e=ne(n),i=ns(n,t).sort((s,a)=>s.offset-a.offset),r=i[i.length-1];r.count=Math.min(e-r.offset,r.count);let o=0;return i.forEach(({count:s})=>o+=s),e!==o}function In(n,t,e,i,r){let o=1/0,s=1/0,a=1/0,c=-1/0,f=-1/0,u=-1/0,h=1/0,l=1/0,d=1/0,m=-1/0,v=-1/0,p=-1/0;for(let y=t*6,g=(t+e)*6;y<g;y+=6){const x=n[y+0],w=n[y+1],S=x-w,_=x+w;S<o&&(o=S),_>c&&(c=_),x<h&&(h=x),x>m&&(m=x);const b=n[y+2],A=n[y+3],T=b-A,M=b+A;T<s&&(s=T),M>f&&(f=M),b<l&&(l=b),b>v&&(v=b);const D=n[y+4],P=n[y+5],B=D-P,z=D+P;B<a&&(a=B),z>u&&(u=z),D<d&&(d=D),D>p&&(p=D)}i[0]=o,i[1]=s,i[2]=a,i[3]=c,i[4]=f,i[5]=u,r[0]=h,r[1]=l,r[2]=d,r[3]=m,r[4]=v,r[5]=p}function qo(n,t=null,e=null,i=null){const r=n.attributes.position,o=n.index?n.index.array:null,s=ne(n),a=r.normalized;let c;t===null?(c=new Float32Array(s*6),e=0,i=s):(c=t,e=e||0,i=i||s);const f=r.array,u=r.offset||0;let h=3;r.isInterleavedBufferAttribute&&(h=r.data.stride);const l=["getX","getY","getZ"];for(let d=e;d<e+i;d++){const m=d*3,v=d*6;let p=m+0,y=m+1,g=m+2;o&&(p=o[p],y=o[y],g=o[g]),a||(p=p*h+u,y=y*h+u,g=g*h+u);for(let x=0;x<3;x++){let w,S,_;a?(w=r[l[x]](p),S=r[l[x]](y),_=r[l[x]](g)):(w=f[p+x],S=f[y+x],_=f[g+x]);let b=w;S<b&&(b=S),_<b&&(b=_);let A=w;S>A&&(A=S),_>A&&(A=_);const T=(A-b)/2,M=x*2;c[v+M+0]=b+T,c[v+M+1]=T+(Math.abs(b)+T)*Vo}}return c}function L(n,t,e){return e.min.x=t[n],e.min.y=t[n+1],e.min.z=t[n+2],e.max.x=t[n+3],e.max.y=t[n+4],e.max.z=t[n+5],e}function hr(n){let t=-1,e=-1/0;for(let i=0;i<3;i++){const r=n[i+3]-n[i];r>e&&(e=r,t=i)}return t}function pr(n,t){t.set(n)}function mr(n,t,e){let i,r;for(let o=0;o<3;o++){const s=o+3;i=n[o],r=t[o],e[o]=i<r?i:r,i=n[s],r=t[s],e[s]=i>r?i:r}}function Fe(n,t,e){for(let i=0;i<3;i++){const r=t[n+2*i],o=t[n+2*i+1],s=r-o,a=r+o;s<e[i]&&(e[i]=s),a>e[i+3]&&(e[i+3]=a)}}function ce(n){const t=n[3]-n[0],e=n[4]-n[1],i=n[5]-n[2];return 2*(t*e+e*i+i*t)}const yt=32,Xo=(n,t)=>n.candidate-t.candidate,bt=new Array(yt).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),Le=new Float32Array(6);function Zo(n,t,e,i,r,o){let s=-1,a=0;if(o===ts)s=hr(t),s!==-1&&(a=(t[s]+t[s+3])/2);else if(o===No)s=hr(n),s!==-1&&(a=Yo(e,i,r,s));else if(o===ko){const c=ce(n);let f=zn*r;const u=i*6,h=(i+r)*6;for(let l=0;l<3;l++){const d=t[l],p=(t[l+3]-d)/yt;if(r<yt/4){const y=[...bt];y.length=r;let g=0;for(let w=u;w<h;w+=6,g++){const S=y[g];S.candidate=e[w+2*l],S.count=0;const{bounds:_,leftCacheBounds:b,rightCacheBounds:A}=S;for(let T=0;T<3;T++)A[T]=1/0,A[T+3]=-1/0,b[T]=1/0,b[T+3]=-1/0,_[T]=1/0,_[T+3]=-1/0;Fe(w,e,_)}y.sort(Xo);let x=r;for(let w=0;w<x;w++){const S=y[w];for(;w+1<x&&y[w+1].candidate===S.candidate;)y.splice(w+1,1),x--}for(let w=u;w<h;w+=6){const S=e[w+2*l];for(let _=0;_<x;_++){const b=y[_];S>=b.candidate?Fe(w,e,b.rightCacheBounds):(Fe(w,e,b.leftCacheBounds),b.count++)}}for(let w=0;w<x;w++){const S=y[w],_=S.count,b=r-S.count,A=S.leftCacheBounds,T=S.rightCacheBounds;let M=0;_!==0&&(M=ce(A)/c);let D=0;b!==0&&(D=ce(T)/c);const P=dr+zn*(M*_+D*b);P<f&&(s=l,f=P,a=S.candidate)}}else{for(let x=0;x<yt;x++){const w=bt[x];w.count=0,w.candidate=d+p+x*p;const S=w.bounds;for(let _=0;_<3;_++)S[_]=1/0,S[_+3]=-1/0}for(let x=u;x<h;x+=6){let _=~~((e[x+2*l]-d)/p);_>=yt&&(_=yt-1);const b=bt[_];b.count++,Fe(x,e,b.bounds)}const y=bt[yt-1];pr(y.bounds,y.rightCacheBounds);for(let x=yt-2;x>=0;x--){const w=bt[x],S=bt[x+1];mr(w.bounds,S.rightCacheBounds,w.rightCacheBounds)}let g=0;for(let x=0;x<yt-1;x++){const w=bt[x],S=w.count,_=w.bounds,A=bt[x+1].rightCacheBounds;S!==0&&(g===0?pr(_,Le):mr(_,Le,Le)),g+=S;let T=0,M=0;g!==0&&(T=ce(Le)/c);const D=r-g;D!==0&&(M=ce(A)/c);const P=dr+zn*(T*g+M*D);P<f&&(s=l,f=P,a=w.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${o} used.`);return{axis:s,pos:a}}function Yo(n,t,e,i){let r=0;for(let o=t,s=t+e;o<s;o++)r+=n[o*6+i*2];return r/e}class Un{constructor(){this.boundingData=new Float32Array(6)}}function Ko(n,t,e,i,r,o){let s=i,a=i+r-1;const c=o.pos,f=o.axis*2;for(;;){for(;s<=a&&e[s*6+f]<c;)s++;for(;s<=a&&e[a*6+f]>=c;)a--;if(s<a){for(let u=0;u<3;u++){let h=t[s*3+u];t[s*3+u]=t[a*3+u],t[a*3+u]=h}for(let u=0;u<6;u++){let h=e[s*6+u];e[s*6+u]=e[a*6+u],e[a*6+u]=h}s++,a--}else return s}}function Qo(n,t,e,i,r,o){let s=i,a=i+r-1;const c=o.pos,f=o.axis*2;for(;;){for(;s<=a&&e[s*6+f]<c;)s++;for(;s<=a&&e[a*6+f]>=c;)a--;if(s<a){let u=n[s];n[s]=n[a],n[a]=u;for(let h=0;h<6;h++){let l=e[s*6+h];e[s*6+h]=e[a*6+h],e[a*6+h]=l}s++,a--}else return s}}function Q(n,t){return t[n+15]===65535}function et(n,t){return t[n+6]}function nt(n,t){return t[n+14]}function it(n){return n+8}function rt(n,t){return t[n+6]}function is(n,t){return t[n+7]}function Kl(n){return n}let rs,ye,on,ss;const Jo=Math.pow(2,32);function si(n){return"count"in n?1:1+si(n.left)+si(n.right)}function ta(n,t,e){return rs=new Float32Array(e),ye=new Uint32Array(e),on=new Uint16Array(e),ss=new Uint8Array(e),oi(n,t)}function oi(n,t){const e=n/4,i=n/2,r="count"in t,o=t.boundingData;for(let s=0;s<6;s++)rs[e+s]=o[s];if(r)if(t.buffer){const s=t.buffer;ss.set(new Uint8Array(s),n);for(let a=n,c=n+s.byteLength;a<c;a+=we){const f=a/2;Q(f,on)||(ye[a/4+6]+=e)}return n+s.byteLength}else{const s=t.offset,a=t.count;return ye[e+6]=s,on[i+14]=a,on[i+15]=mn,n+we}else{const s=t.left,a=t.right,c=t.splitAxis;let f;if(f=oi(n+we,s),f/4>Jo)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return ye[e+6]=f/4,f=oi(f,a),ye[e+7]=c,f}}function ea(n,t){const e=(n.index?n.index.count:n.attributes.position.count)/3,i=e>2**16,r=i?4:2,o=t?new SharedArrayBuffer(e*r):new ArrayBuffer(e*r),s=i?new Uint32Array(o):new Uint16Array(o);for(let a=0,c=s.length;a<c;a++)s[a]=a;return s}function na(n,t,e,i,r){const{maxDepth:o,verbose:s,maxLeafTris:a,strategy:c,onProgress:f,indirect:u}=r,h=n._indirectBuffer,l=n.geometry,d=l.index?l.index.array:null,m=u?Qo:Ko,v=ne(l),p=new Float32Array(6);let y=!1;const g=new Un;return In(t,e,i,g.boundingData,p),w(g,e,i,p),g;function x(S){f&&f(S/v)}function w(S,_,b,A=null,T=0){if(!y&&T>=o&&(y=!0,s&&(console.warn(`MeshBVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`),console.warn(l))),b<=a||T>=o)return x(_+b),S.offset=_,S.count=b,S;const M=Zo(S.boundingData,A,t,_,b,c);if(M.axis===-1)return x(_+b),S.offset=_,S.count=b,S;const D=m(h,d,t,_,b,M);if(D===_||D===_+b)x(_+b),S.offset=_,S.count=b;else{S.splitAxis=M.axis;const P=new Un,B=_,z=D-_;S.left=P,In(t,B,z,P.boundingData,p),w(P,B,z,p,T+1);const C=new Un,I=D,$=b-z;S.right=C,In(t,I,$,C.boundingData,p),w(C,I,$,p,T+1)}return S}}function ia(n,t){const e=n.geometry;t.indirect&&(n._indirectBuffer=ea(e,t.useSharedArrayBuffer),Wo(e,t.range)&&!t.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),n._indirectBuffer||Go(e,t);const i=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=qo(e),o=t.indirect?es(e,t.range):ns(e,t.range);n._roots=o.map(s=>{const a=na(n,r,s.offset,s.count,t),c=si(a),f=new i(we*c);return ta(0,a,f),f})}class xt{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(t,e){let i=1/0,r=-1/0;for(let o=0,s=t.length;o<s;o++){const c=t[o][e];i=c<i?c:i,r=c>r?c:r}this.min=i,this.max=r}setFromPoints(t,e){let i=1/0,r=-1/0;for(let o=0,s=e.length;o<s;o++){const a=e[o],c=t.dot(a);i=c<i?c:i,r=c>r?c:r}this.min=i,this.max=r}isSeparated(t){return this.min>t.max||t.min>this.max}}xt.prototype.setFromBox=(function(){const n=new E;return function(e,i){const r=i.min,o=i.max;let s=1/0,a=-1/0;for(let c=0;c<=1;c++)for(let f=0;f<=1;f++)for(let u=0;u<=1;u++){n.x=r.x*c+o.x*(1-c),n.y=r.y*f+o.y*(1-f),n.z=r.z*u+o.z*(1-u);const h=e.dot(n);s=Math.min(h,s),a=Math.max(h,a)}this.min=s,this.max=a}})();const ra=(function(){const n=new E,t=new E,e=new E;return function(r,o,s){const a=r.start,c=n,f=o.start,u=t;e.subVectors(a,f),n.subVectors(r.end,r.start),t.subVectors(o.end,o.start);const h=e.dot(u),l=u.dot(c),d=u.dot(u),m=e.dot(c),p=c.dot(c)*d-l*l;let y,g;p!==0?y=(h*l-m*d)/p:y=0,g=(h+y*l)/d,s.x=y,s.y=g}})(),Ri=(function(){const n=new tt,t=new E,e=new E;return function(r,o,s,a){ra(r,o,n);let c=n.x,f=n.y;if(c>=0&&c<=1&&f>=0&&f<=1){r.at(c,s),o.at(f,a);return}else if(c>=0&&c<=1){f<0?o.at(0,a):o.at(1,a),r.closestPointToPoint(a,!0,s);return}else if(f>=0&&f<=1){c<0?r.at(0,s):r.at(1,s),o.closestPointToPoint(s,!0,a);return}else{let u;c<0?u=r.start:u=r.end;let h;f<0?h=o.start:h=o.end;const l=t,d=e;if(r.closestPointToPoint(h,!0,t),o.closestPointToPoint(u,!0,e),l.distanceToSquared(h)<=d.distanceToSquared(u)){s.copy(l),a.copy(h);return}else{s.copy(u),a.copy(d);return}}}})(),sa=(function(){const n=new E,t=new E,e=new Vr,i=new pt;return function(o,s){const{radius:a,center:c}=o,{a:f,b:u,c:h}=s;if(i.start=f,i.end=u,i.closestPointToPoint(c,!0,n).distanceTo(c)<=a||(i.start=f,i.end=h,i.closestPointToPoint(c,!0,n).distanceTo(c)<=a)||(i.start=u,i.end=h,i.closestPointToPoint(c,!0,n).distanceTo(c)<=a))return!0;const v=s.getPlane(e);if(Math.abs(v.distanceToPoint(c))<=a){const y=v.projectPoint(c,t);if(s.containsPoint(y))return!0}return!1}})(),oa=1e-15;function Rn(n){return Math.abs(n)<oa}class at extends Yt{constructor(...t){super(...t),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new E),this.satBounds=new Array(4).fill().map(()=>new xt),this.points=[this.a,this.b,this.c],this.sphere=new ee,this.plane=new Vr,this.needsUpdate=!0}intersectsSphere(t){return sa(t,this)}update(){const t=this.a,e=this.b,i=this.c,r=this.points,o=this.satAxes,s=this.satBounds,a=o[0],c=s[0];this.getNormal(a),c.setFromPoints(a,r);const f=o[1],u=s[1];f.subVectors(t,e),u.setFromPoints(f,r);const h=o[2],l=s[2];h.subVectors(e,i),l.setFromPoints(h,r);const d=o[3],m=s[3];d.subVectors(i,t),m.setFromPoints(d,r),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(a,t),this.needsUpdate=!1}}at.prototype.closestPointToSegment=(function(){const n=new E,t=new E,e=new pt;return function(r,o=null,s=null){const{start:a,end:c}=r,f=this.points;let u,h=1/0;for(let l=0;l<3;l++){const d=(l+1)%3;e.start.copy(f[l]),e.end.copy(f[d]),Ri(e,r,n,t),u=n.distanceToSquared(t),u<h&&(h=u,o&&o.copy(n),s&&s.copy(t))}return this.closestPointToPoint(a,n),u=a.distanceToSquared(n),u<h&&(h=u,o&&o.copy(n),s&&s.copy(a)),this.closestPointToPoint(c,n),u=c.distanceToSquared(n),u<h&&(h=u,o&&o.copy(n),s&&s.copy(c)),Math.sqrt(h)}})();at.prototype.intersectsTriangle=(function(){const n=new at,t=new Array(3),e=new Array(3),i=new xt,r=new xt,o=new E,s=new E,a=new E,c=new E,f=new E,u=new pt,h=new pt,l=new pt,d=new E;function m(v,p,y){const g=v.points;let x=0,w=-1;for(let S=0;S<3;S++){const{start:_,end:b}=u;_.copy(g[S]),b.copy(g[(S+1)%3]),u.delta(s);const A=Rn(p.distanceToPoint(_));if(Rn(p.normal.dot(s))&&A){y.copy(u),x=2;break}const T=p.intersectLine(u,d);if(!T&&A&&d.copy(_),(T||A)&&!Rn(d.distanceTo(b))){if(x<=1)(x===1?y.start:y.end).copy(d),A&&(w=x);else if(x>=2){(w===1?y.start:y.end).copy(d),x=2;break}if(x++,x===2&&w===-1)break}}return x}return function(p,y=null,g=!1){this.needsUpdate&&this.update(),p.isExtendedTriangle?p.needsUpdate&&p.update():(n.copy(p),n.update(),p=n);const x=this.plane,w=p.plane;if(Math.abs(x.normal.dot(w.normal))>1-1e-10){const S=this.satBounds,_=this.satAxes;e[0]=p.a,e[1]=p.b,e[2]=p.c;for(let T=0;T<4;T++){const M=S[T],D=_[T];if(i.setFromPoints(D,e),M.isSeparated(i))return!1}const b=p.satBounds,A=p.satAxes;t[0]=this.a,t[1]=this.b,t[2]=this.c;for(let T=0;T<4;T++){const M=b[T],D=A[T];if(i.setFromPoints(D,t),M.isSeparated(i))return!1}for(let T=0;T<4;T++){const M=_[T];for(let D=0;D<4;D++){const P=A[D];if(o.crossVectors(M,P),i.setFromPoints(o,t),r.setFromPoints(o,e),i.isSeparated(r))return!1}}return y&&(g||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),y.start.set(0,0,0),y.end.set(0,0,0)),!0}else{const S=m(this,w,h);if(S===1&&p.containsPoint(h.end))return y&&(y.start.copy(h.end),y.end.copy(h.end)),!0;if(S!==2)return!1;const _=m(p,x,l);if(_===1&&this.containsPoint(l.end))return y&&(y.start.copy(l.end),y.end.copy(l.end)),!0;if(_!==2)return!1;if(h.delta(a),l.delta(c),a.dot(c)<0){let B=l.start;l.start=l.end,l.end=B}const b=h.start.dot(a),A=h.end.dot(a),T=l.start.dot(a),M=l.end.dot(a),D=A<T,P=b<M;return b!==M&&T!==A&&D===P?!1:(y&&(f.subVectors(h.start,l.start),f.dot(a)>0?y.start.copy(h.start):y.start.copy(l.start),f.subVectors(h.end,l.end),f.dot(a)<0?y.end.copy(h.end):y.end.copy(l.end)),!0)}}})();at.prototype.distanceToPoint=(function(){const n=new E;return function(e){return this.closestPointToPoint(e,n),e.distanceTo(n)}})();at.prototype.distanceToTriangle=(function(){const n=new E,t=new E,e=["a","b","c"],i=new pt,r=new pt;return function(s,a=null,c=null){const f=a||c?i:null;if(this.intersectsTriangle(s,f))return(a||c)&&(a&&f.getCenter(a),c&&f.getCenter(c)),0;let u=1/0;for(let h=0;h<3;h++){let l;const d=e[h],m=s[d];this.closestPointToPoint(m,n),l=m.distanceToSquared(n),l<u&&(u=l,a&&a.copy(n),c&&c.copy(m));const v=this[d];s.closestPointToPoint(v,n),l=v.distanceToSquared(n),l<u&&(u=l,a&&a.copy(v),c&&c.copy(n))}for(let h=0;h<3;h++){const l=e[h],d=e[(h+1)%3];i.set(this[l],this[d]);for(let m=0;m<3;m++){const v=e[m],p=e[(m+1)%3];r.set(s[v],s[p]),Ri(i,r,n,t);const y=n.distanceToSquared(t);y<u&&(u=y,a&&a.copy(n),c&&c.copy(t))}}return Math.sqrt(u)}})();class K{constructor(t,e,i){this.isOrientedBox=!0,this.min=new E,this.max=new E,this.matrix=new V,this.invMatrix=new V,this.points=new Array(8).fill().map(()=>new E),this.satAxes=new Array(3).fill().map(()=>new E),this.satBounds=new Array(3).fill().map(()=>new xt),this.alignedSatBounds=new Array(3).fill().map(()=>new xt),this.needsUpdate=!1,t&&this.min.copy(t),e&&this.max.copy(e),i&&this.matrix.copy(i)}set(t,e,i){this.min.copy(t),this.max.copy(e),this.matrix.copy(i),this.needsUpdate=!0}copy(t){this.min.copy(t.min),this.max.copy(t.max),this.matrix.copy(t.matrix),this.needsUpdate=!0}}K.prototype.update=(function(){return function(){const t=this.matrix,e=this.min,i=this.max,r=this.points;for(let f=0;f<=1;f++)for(let u=0;u<=1;u++)for(let h=0;h<=1;h++){const l=1*f|2*u|4*h,d=r[l];d.x=f?i.x:e.x,d.y=u?i.y:e.y,d.z=h?i.z:e.z,d.applyMatrix4(t)}const o=this.satBounds,s=this.satAxes,a=r[0];for(let f=0;f<3;f++){const u=s[f],h=o[f],l=1<<f,d=r[l];u.subVectors(a,d),h.setFromPoints(u,r)}const c=this.alignedSatBounds;c[0].setFromPointsField(r,"x"),c[1].setFromPointsField(r,"y"),c[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();K.prototype.intersectsBox=(function(){const n=new xt;return function(e){this.needsUpdate&&this.update();const i=e.min,r=e.max,o=this.satBounds,s=this.satAxes,a=this.alignedSatBounds;if(n.min=i.x,n.max=r.x,a[0].isSeparated(n)||(n.min=i.y,n.max=r.y,a[1].isSeparated(n))||(n.min=i.z,n.max=r.z,a[2].isSeparated(n)))return!1;for(let c=0;c<3;c++){const f=s[c],u=o[c];if(n.setFromBox(f,e),u.isSeparated(n))return!1}return!0}})();K.prototype.intersectsTriangle=(function(){const n=new at,t=new Array(3),e=new xt,i=new xt,r=new E;return function(s){this.needsUpdate&&this.update(),s.isExtendedTriangle?s.needsUpdate&&s.update():(n.copy(s),n.update(),s=n);const a=this.satBounds,c=this.satAxes;t[0]=s.a,t[1]=s.b,t[2]=s.c;for(let l=0;l<3;l++){const d=a[l],m=c[l];if(e.setFromPoints(m,t),d.isSeparated(e))return!1}const f=s.satBounds,u=s.satAxes,h=this.points;for(let l=0;l<3;l++){const d=f[l],m=u[l];if(e.setFromPoints(m,h),d.isSeparated(e))return!1}for(let l=0;l<3;l++){const d=c[l];for(let m=0;m<4;m++){const v=u[m];if(r.crossVectors(d,v),e.setFromPoints(r,t),i.setFromPoints(r,h),e.isSeparated(i))return!1}}return!0}})();K.prototype.closestPointToPoint=(function(){return function(t,e){return this.needsUpdate&&this.update(),e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}})();K.prototype.distanceToPoint=(function(){const n=new E;return function(e){return this.closestPointToPoint(e,n),e.distanceTo(n)}})();K.prototype.distanceToBox=(function(){const n=["x","y","z"],t=new Array(12).fill().map(()=>new pt),e=new Array(12).fill().map(()=>new pt),i=new E,r=new E;return function(s,a=0,c=null,f=null){if(this.needsUpdate&&this.update(),this.intersectsBox(s))return(c||f)&&(s.getCenter(r),this.closestPointToPoint(r,i),s.closestPointToPoint(i,r),c&&c.copy(i),f&&f.copy(r)),0;const u=a*a,h=s.min,l=s.max,d=this.points;let m=1/0;for(let p=0;p<8;p++){const y=d[p];r.copy(y).clamp(h,l);const g=y.distanceToSquared(r);if(g<m&&(m=g,c&&c.copy(y),f&&f.copy(r),g<u))return Math.sqrt(g)}let v=0;for(let p=0;p<3;p++)for(let y=0;y<=1;y++)for(let g=0;g<=1;g++){const x=(p+1)%3,w=(p+2)%3,S=y<<x|g<<w,_=1<<p|y<<x|g<<w,b=d[S],A=d[_];t[v].set(b,A);const M=n[p],D=n[x],P=n[w],B=e[v],z=B.start,C=B.end;z[M]=h[M],z[D]=y?h[D]:l[D],z[P]=g?h[P]:l[D],C[M]=l[M],C[D]=y?h[D]:l[D],C[P]=g?h[P]:l[D],v++}for(let p=0;p<=1;p++)for(let y=0;y<=1;y++)for(let g=0;g<=1;g++){r.x=p?l.x:h.x,r.y=y?l.y:h.y,r.z=g?l.z:h.z,this.closestPointToPoint(r,i);const x=r.distanceToSquared(i);if(x<m&&(m=x,c&&c.copy(i),f&&f.copy(r),x<u))return Math.sqrt(x)}for(let p=0;p<12;p++){const y=t[p];for(let g=0;g<12;g++){const x=e[g];Ri(y,x,i,r);const w=i.distanceToSquared(r);if(w<m&&(m=w,c&&c.copy(i),f&&f.copy(r),w<u))return Math.sqrt(w)}}return Math.sqrt(m)}})();class Fi{constructor(t){this._getNewPrimitive=t,this._primitives=[]}getPrimitive(){const t=this._primitives;return t.length===0?this._getNewPrimitive():t.pop()}releasePrimitive(t){this._primitives.push(t)}}class aa extends Fi{constructor(){super(()=>new at)}}const st=new aa;class ca{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const t=[];let e=null;this.setBuffer=i=>{e&&t.push(e),e=i,this.float32Array=new Float32Array(i),this.uint16Array=new Uint16Array(i),this.uint32Array=new Uint32Array(i)},this.clearBuffer=()=>{e=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,t.length!==0&&this.setBuffer(t.pop())}}}const F=new ca;let St,Qt;const Ht=[],Oe=new Fi(()=>new Y);function la(n,t,e,i,r,o){St=Oe.getPrimitive(),Qt=Oe.getPrimitive(),Ht.push(St,Qt),F.setBuffer(n._roots[t]);const s=ai(0,n.geometry,e,i,r,o);F.clearBuffer(),Oe.releasePrimitive(St),Oe.releasePrimitive(Qt),Ht.pop(),Ht.pop();const a=Ht.length;return a>0&&(Qt=Ht[a-1],St=Ht[a-2]),s}function ai(n,t,e,i,r=null,o=0,s=0){const{float32Array:a,uint16Array:c,uint32Array:f}=F;let u=n*2;if(Q(u,c)){const l=et(n,f),d=nt(u,c);return L(n,a,St),i(l,d,!1,s,o+n,St)}else{let M=function(P){const{uint16Array:B,uint32Array:z}=F;let C=P*2;for(;!Q(C,B);)P=it(P),C=P*2;return et(P,z)},D=function(P){const{uint16Array:B,uint32Array:z}=F;let C=P*2;for(;!Q(C,B);)P=rt(P,z),C=P*2;return et(P,z)+nt(C,B)};const l=it(n),d=rt(n,f);let m=l,v=d,p,y,g,x;if(r&&(g=St,x=Qt,L(m,a,g),L(v,a,x),p=r(g),y=r(x),y<p)){m=d,v=l;const P=p;p=y,y=P,g=x}g||(g=St,L(m,a,g));const w=Q(m*2,c),S=e(g,w,p,s+1,o+m);let _;if(S===fr){const P=M(m),z=D(m)-P;_=i(P,z,!0,s+1,o+m,g)}else _=S&&ai(m,t,e,i,r,o,s+1);if(_)return!0;x=Qt,L(v,a,x);const b=Q(v*2,c),A=e(x,b,y,s+1,o+v);let T;if(A===fr){const P=M(v),z=D(v)-P;T=i(P,z,!0,s+1,o+v,x)}else T=A&&ai(v,t,e,i,r,o,s+1);return!!T}}const le=new E,Fn=new E;function ua(n,t,e={},i=0,r=1/0){const o=i*i,s=r*r;let a=1/0,c=null;if(n.shapecast({boundsTraverseOrder:u=>(le.copy(t).clamp(u.min,u.max),le.distanceToSquared(t)),intersectsBounds:(u,h,l)=>l<a&&l<s,intersectsTriangle:(u,h)=>{u.closestPointToPoint(t,le);const l=t.distanceToSquared(le);return l<a&&(Fn.copy(le),a=l,c=h),l<o}}),a===1/0)return null;const f=Math.sqrt(a);return e.point?e.point.copy(Fn):e.point=Fn.clone(),e.distance=f,e.faceIndex=c,e}const fa=parseInt(Hr)>=169,zt=new E,Ct=new E,It=new E,Ne=new tt,ke=new tt,$e=new tt,yr=new E,gr=new E,vr=new E,ue=new E;function da(n,t,e,i,r,o,s,a){let c;if(o===Or?c=n.intersectTriangle(i,e,t,!0,r):c=n.intersectTriangle(t,e,i,o!==Ds,r),c===null)return null;const f=n.origin.distanceTo(r);return f<s||f>a?null:{distance:f,point:r.clone()}}function ha(n,t,e,i,r,o,s,a,c,f,u){zt.fromBufferAttribute(t,o),Ct.fromBufferAttribute(t,s),It.fromBufferAttribute(t,a);const h=da(n,zt,Ct,It,ue,c,f,u);if(h){const l=new E;Yt.getBarycoord(ue,zt,Ct,It,l),i&&(Ne.fromBufferAttribute(i,o),ke.fromBufferAttribute(i,s),$e.fromBufferAttribute(i,a),h.uv=Yt.getInterpolation(ue,zt,Ct,It,Ne,ke,$e,new tt)),r&&(Ne.fromBufferAttribute(r,o),ke.fromBufferAttribute(r,s),$e.fromBufferAttribute(r,a),h.uv1=Yt.getInterpolation(ue,zt,Ct,It,Ne,ke,$e,new tt)),e&&(yr.fromBufferAttribute(e,o),gr.fromBufferAttribute(e,s),vr.fromBufferAttribute(e,a),h.normal=Yt.getInterpolation(ue,zt,Ct,It,yr,gr,vr,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:s,c:a,normal:new E,materialIndex:0};Yt.getNormal(zt,Ct,It,d.normal),h.face=d,h.faceIndex=o,fa&&(h.barycoord=l)}return h}function yn(n,t,e,i,r,o,s){const a=i*3;let c=a+0,f=a+1,u=a+2;const h=n.index;n.index&&(c=h.getX(c),f=h.getX(f),u=h.getX(u));const{position:l,normal:d,uv:m,uv1:v}=n.attributes,p=ha(e,l,d,m,v,c,f,u,t,o,s);return p?(p.faceIndex=i,r&&r.push(p),p):null}function k(n,t,e,i){const r=n.a,o=n.b,s=n.c;let a=t,c=t+1,f=t+2;e&&(a=e.getX(a),c=e.getX(c),f=e.getX(f)),r.x=i.getX(a),r.y=i.getY(a),r.z=i.getZ(a),o.x=i.getX(c),o.y=i.getY(c),o.z=i.getZ(c),s.x=i.getX(f),s.y=i.getY(f),s.z=i.getZ(f)}function pa(n,t,e,i,r,o,s,a){const{geometry:c,_indirectBuffer:f}=n;for(let u=i,h=i+r;u<h;u++)yn(c,t,e,u,o,s,a)}function ma(n,t,e,i,r,o,s){const{geometry:a,_indirectBuffer:c}=n;let f=1/0,u=null;for(let h=i,l=i+r;h<l;h++){let d;d=yn(a,t,e,h,null,o,s),d&&d.distance<f&&(u=d,f=d.distance)}return u}function ya(n,t,e,i,r,o,s){const{geometry:a}=e,{index:c}=a,f=a.attributes.position;for(let u=n,h=t+n;u<h;u++){let l;if(l=u,k(s,l*3,c,f),s.needsUpdate=!0,i(s,l,r,o))return!0}return!1}function ga(n,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=n.geometry,i=e.index?e.index.array:null,r=e.attributes.position;let o,s,a,c,f=0;const u=n._roots;for(let l=0,d=u.length;l<d;l++)o=u[l],s=new Uint32Array(o),a=new Uint16Array(o),c=new Float32Array(o),h(0,f),f+=o.byteLength;function h(l,d,m=!1){const v=l*2;if(a[v+15]===mn){const y=s[l+6],g=a[v+14];let x=1/0,w=1/0,S=1/0,_=-1/0,b=-1/0,A=-1/0;for(let T=3*y,M=3*(y+g);T<M;T++){let D=i[T];const P=r.getX(D),B=r.getY(D),z=r.getZ(D);P<x&&(x=P),P>_&&(_=P),B<w&&(w=B),B>b&&(b=B),z<S&&(S=z),z>A&&(A=z)}return c[l+0]!==x||c[l+1]!==w||c[l+2]!==S||c[l+3]!==_||c[l+4]!==b||c[l+5]!==A?(c[l+0]=x,c[l+1]=w,c[l+2]=S,c[l+3]=_,c[l+4]=b,c[l+5]=A,!0):!1}else{const y=l+8,g=s[l+6],x=y+d,w=g+d;let S=m,_=!1,b=!1;t?S||(_=t.has(x),b=t.has(w),S=!_&&!b):(_=!0,b=!0);const A=S||_,T=S||b;let M=!1;A&&(M=h(y,d,S));let D=!1;T&&(D=h(g,d,S));const P=M||D;if(P)for(let B=0;B<3;B++){const z=y+B,C=g+B,I=c[z],$=c[z+3],ct=c[C],lt=c[C+3];c[l+B]=I<ct?I:ct,c[l+B+3]=$>lt?$:lt}return P}}}function At(n,t,e,i,r){let o,s,a,c,f,u;const h=1/e.direction.x,l=1/e.direction.y,d=1/e.direction.z,m=e.origin.x,v=e.origin.y,p=e.origin.z;let y=t[n],g=t[n+3],x=t[n+1],w=t[n+3+1],S=t[n+2],_=t[n+3+2];return h>=0?(o=(y-m)*h,s=(g-m)*h):(o=(g-m)*h,s=(y-m)*h),l>=0?(a=(x-v)*l,c=(w-v)*l):(a=(w-v)*l,c=(x-v)*l),o>c||a>s||((a>o||isNaN(o))&&(o=a),(c<s||isNaN(s))&&(s=c),d>=0?(f=(S-p)*d,u=(_-p)*d):(f=(_-p)*d,u=(S-p)*d),o>u||f>s)?!1:((f>o||o!==o)&&(o=f),(u<s||s!==s)&&(s=u),o<=r&&s>=i)}function va(n,t,e,i,r,o,s,a){const{geometry:c,_indirectBuffer:f}=n;for(let u=i,h=i+r;u<h;u++){let l=f?f[u]:u;yn(c,t,e,l,o,s,a)}}function xa(n,t,e,i,r,o,s){const{geometry:a,_indirectBuffer:c}=n;let f=1/0,u=null;for(let h=i,l=i+r;h<l;h++){let d;d=yn(a,t,e,c?c[h]:h,null,o,s),d&&d.distance<f&&(u=d,f=d.distance)}return u}function wa(n,t,e,i,r,o,s){const{geometry:a}=e,{index:c}=a,f=a.attributes.position;for(let u=n,h=t+n;u<h;u++){let l;if(l=e.resolveTriangleIndex(u),k(s,l*3,c,f),s.needsUpdate=!0,i(s,l,r,o))return!0}return!1}function ba(n,t,e,i,r,o,s){F.setBuffer(n._roots[t]),ci(0,n,e,i,r,o,s),F.clearBuffer()}function ci(n,t,e,i,r,o,s){const{float32Array:a,uint16Array:c,uint32Array:f}=F,u=n*2;if(Q(u,c)){const l=et(n,f),d=nt(u,c);pa(t,e,i,l,d,r,o,s)}else{const l=it(n);At(l,a,i,o,s)&&ci(l,t,e,i,r,o,s);const d=rt(n,f);At(d,a,i,o,s)&&ci(d,t,e,i,r,o,s)}}const _a=["x","y","z"];function Sa(n,t,e,i,r,o){F.setBuffer(n._roots[t]);const s=li(0,n,e,i,r,o);return F.clearBuffer(),s}function li(n,t,e,i,r,o){const{float32Array:s,uint16Array:a,uint32Array:c}=F;let f=n*2;if(Q(f,a)){const h=et(n,c),l=nt(f,a);return ma(t,e,i,h,l,r,o)}else{const h=is(n,c),l=_a[h],m=i.direction[l]>=0;let v,p;m?(v=it(n),p=rt(n,c)):(v=rt(n,c),p=it(n));const g=At(v,s,i,r,o)?li(v,t,e,i,r,o):null;if(g){const S=g.point[l];if(m?S<=s[p+h]:S>=s[p+h+3])return g}const w=At(p,s,i,r,o)?li(p,t,e,i,r,o):null;return g&&w?g.distance<=w.distance?g:w:g||w||null}}const Ve=new Y,jt=new at,Gt=new at,fe=new V,xr=new K,He=new K;function Aa(n,t,e,i){F.setBuffer(n._roots[t]);const r=ui(0,n,e,i);return F.clearBuffer(),r}function ui(n,t,e,i,r=null){const{float32Array:o,uint16Array:s,uint32Array:a}=F;let c=n*2;if(r===null&&(e.boundingBox||e.computeBoundingBox(),xr.set(e.boundingBox.min,e.boundingBox.max,i),r=xr),Q(c,s)){const u=t.geometry,h=u.index,l=u.attributes.position,d=e.index,m=e.attributes.position,v=et(n,a),p=nt(c,s);if(fe.copy(i).invert(),e.boundsTree)return L(n,o,He),He.matrix.copy(fe),He.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:g=>He.intersectsBox(g),intersectsTriangle:g=>{g.a.applyMatrix4(i),g.b.applyMatrix4(i),g.c.applyMatrix4(i),g.needsUpdate=!0;for(let x=v*3,w=(p+v)*3;x<w;x+=3)if(k(Gt,x,h,l),Gt.needsUpdate=!0,g.intersectsTriangle(Gt))return!0;return!1}});for(let y=v*3,g=(p+v)*3;y<g;y+=3){k(jt,y,h,l),jt.a.applyMatrix4(fe),jt.b.applyMatrix4(fe),jt.c.applyMatrix4(fe),jt.needsUpdate=!0;for(let x=0,w=d.count;x<w;x+=3)if(k(Gt,x,d,m),Gt.needsUpdate=!0,jt.intersectsTriangle(Gt))return!0}}else{const u=n+8,h=a[n+6];return L(u,o,Ve),!!(r.intersectsBox(Ve)&&ui(u,t,e,i,r)||(L(h,o,Ve),r.intersectsBox(Ve)&&ui(h,t,e,i,r)))}}const je=new V,Ln=new K,de=new K,Ma=new E,Ta=new E,Da=new E,Pa=new E;function Ba(n,t,e,i={},r={},o=0,s=1/0){t.boundingBox||t.computeBoundingBox(),Ln.set(t.boundingBox.min,t.boundingBox.max,e),Ln.needsUpdate=!0;const a=n.geometry,c=a.attributes.position,f=a.index,u=t.attributes.position,h=t.index,l=st.getPrimitive(),d=st.getPrimitive();let m=Ma,v=Ta,p=null,y=null;r&&(p=Da,y=Pa);let g=1/0,x=null,w=null;return je.copy(e).invert(),de.matrix.copy(je),n.shapecast({boundsTraverseOrder:S=>Ln.distanceToBox(S),intersectsBounds:(S,_,b)=>b<g&&b<s?(_&&(de.min.copy(S.min),de.max.copy(S.max),de.needsUpdate=!0),!0):!1,intersectsRange:(S,_)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:A=>de.distanceToBox(A),intersectsBounds:(A,T,M)=>M<g&&M<s,intersectsRange:(A,T)=>{for(let M=A,D=A+T;M<D;M++){k(d,3*M,h,u),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let P=S,B=S+_;P<B;P++){k(l,3*P,f,c),l.needsUpdate=!0;const z=l.distanceToTriangle(d,m,p);if(z<g&&(v.copy(m),y&&y.copy(p),g=z,x=P,w=M),z<o)return!0}}}});{const b=ne(t);for(let A=0,T=b;A<T;A++){k(d,3*A,h,u),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let M=S,D=S+_;M<D;M++){k(l,3*M,f,c),l.needsUpdate=!0;const P=l.distanceToTriangle(d,m,p);if(P<g&&(v.copy(m),y&&y.copy(p),g=P,x=M,w=A),P<o)return!0}}}}}),st.releasePrimitive(l),st.releasePrimitive(d),g===1/0?null:(i.point?i.point.copy(v):i.point=v.clone(),i.distance=g,i.faceIndex=x,r&&(r.point?r.point.copy(y):r.point=y.clone(),r.point.applyMatrix4(je),v.applyMatrix4(je),r.distance=v.sub(r.point).length(),r.faceIndex=w),i)}function Ea(n,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=n.geometry,i=e.index?e.index.array:null,r=e.attributes.position;let o,s,a,c,f=0;const u=n._roots;for(let l=0,d=u.length;l<d;l++)o=u[l],s=new Uint32Array(o),a=new Uint16Array(o),c=new Float32Array(o),h(0,f),f+=o.byteLength;function h(l,d,m=!1){const v=l*2;if(a[v+15]===mn){const y=s[l+6],g=a[v+14];let x=1/0,w=1/0,S=1/0,_=-1/0,b=-1/0,A=-1/0;for(let T=y,M=y+g;T<M;T++){const D=3*n.resolveTriangleIndex(T);for(let P=0;P<3;P++){let B=D+P;B=i?i[B]:B;const z=r.getX(B),C=r.getY(B),I=r.getZ(B);z<x&&(x=z),z>_&&(_=z),C<w&&(w=C),C>b&&(b=C),I<S&&(S=I),I>A&&(A=I)}}return c[l+0]!==x||c[l+1]!==w||c[l+2]!==S||c[l+3]!==_||c[l+4]!==b||c[l+5]!==A?(c[l+0]=x,c[l+1]=w,c[l+2]=S,c[l+3]=_,c[l+4]=b,c[l+5]=A,!0):!1}else{const y=l+8,g=s[l+6],x=y+d,w=g+d;let S=m,_=!1,b=!1;t?S||(_=t.has(x),b=t.has(w),S=!_&&!b):(_=!0,b=!0);const A=S||_,T=S||b;let M=!1;A&&(M=h(y,d,S));let D=!1;T&&(D=h(g,d,S));const P=M||D;if(P)for(let B=0;B<3;B++){const z=y+B,C=g+B,I=c[z],$=c[z+3],ct=c[C],lt=c[C+3];c[l+B]=I<ct?I:ct,c[l+B+3]=$>lt?$:lt}return P}}}function za(n,t,e,i,r,o,s){F.setBuffer(n._roots[t]),fi(0,n,e,i,r,o,s),F.clearBuffer()}function fi(n,t,e,i,r,o,s){const{float32Array:a,uint16Array:c,uint32Array:f}=F,u=n*2;if(Q(u,c)){const l=et(n,f),d=nt(u,c);va(t,e,i,l,d,r,o,s)}else{const l=it(n);At(l,a,i,o,s)&&fi(l,t,e,i,r,o,s);const d=rt(n,f);At(d,a,i,o,s)&&fi(d,t,e,i,r,o,s)}}const Ca=["x","y","z"];function Ia(n,t,e,i,r,o){F.setBuffer(n._roots[t]);const s=di(0,n,e,i,r,o);return F.clearBuffer(),s}function di(n,t,e,i,r,o){const{float32Array:s,uint16Array:a,uint32Array:c}=F;let f=n*2;if(Q(f,a)){const h=et(n,c),l=nt(f,a);return xa(t,e,i,h,l,r,o)}else{const h=is(n,c),l=Ca[h],m=i.direction[l]>=0;let v,p;m?(v=it(n),p=rt(n,c)):(v=rt(n,c),p=it(n));const g=At(v,s,i,r,o)?di(v,t,e,i,r,o):null;if(g){const S=g.point[l];if(m?S<=s[p+h]:S>=s[p+h+3])return g}const w=At(p,s,i,r,o)?di(p,t,e,i,r,o):null;return g&&w?g.distance<=w.distance?g:w:g||w||null}}const Ge=new Y,Wt=new at,qt=new at,he=new V,wr=new K,We=new K;function Ua(n,t,e,i){F.setBuffer(n._roots[t]);const r=hi(0,n,e,i);return F.clearBuffer(),r}function hi(n,t,e,i,r=null){const{float32Array:o,uint16Array:s,uint32Array:a}=F;let c=n*2;if(r===null&&(e.boundingBox||e.computeBoundingBox(),wr.set(e.boundingBox.min,e.boundingBox.max,i),r=wr),Q(c,s)){const u=t.geometry,h=u.index,l=u.attributes.position,d=e.index,m=e.attributes.position,v=et(n,a),p=nt(c,s);if(he.copy(i).invert(),e.boundsTree)return L(n,o,We),We.matrix.copy(he),We.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:g=>We.intersectsBox(g),intersectsTriangle:g=>{g.a.applyMatrix4(i),g.b.applyMatrix4(i),g.c.applyMatrix4(i),g.needsUpdate=!0;for(let x=v,w=p+v;x<w;x++)if(k(qt,3*t.resolveTriangleIndex(x),h,l),qt.needsUpdate=!0,g.intersectsTriangle(qt))return!0;return!1}});for(let y=v,g=p+v;y<g;y++){const x=t.resolveTriangleIndex(y);k(Wt,3*x,h,l),Wt.a.applyMatrix4(he),Wt.b.applyMatrix4(he),Wt.c.applyMatrix4(he),Wt.needsUpdate=!0;for(let w=0,S=d.count;w<S;w+=3)if(k(qt,w,d,m),qt.needsUpdate=!0,Wt.intersectsTriangle(qt))return!0}}else{const u=n+8,h=a[n+6];return L(u,o,Ge),!!(r.intersectsBox(Ge)&&hi(u,t,e,i,r)||(L(h,o,Ge),r.intersectsBox(Ge)&&hi(h,t,e,i,r)))}}const qe=new V,On=new K,pe=new K,Ra=new E,Fa=new E,La=new E,Oa=new E;function Na(n,t,e,i={},r={},o=0,s=1/0){t.boundingBox||t.computeBoundingBox(),On.set(t.boundingBox.min,t.boundingBox.max,e),On.needsUpdate=!0;const a=n.geometry,c=a.attributes.position,f=a.index,u=t.attributes.position,h=t.index,l=st.getPrimitive(),d=st.getPrimitive();let m=Ra,v=Fa,p=null,y=null;r&&(p=La,y=Oa);let g=1/0,x=null,w=null;return qe.copy(e).invert(),pe.matrix.copy(qe),n.shapecast({boundsTraverseOrder:S=>On.distanceToBox(S),intersectsBounds:(S,_,b)=>b<g&&b<s?(_&&(pe.min.copy(S.min),pe.max.copy(S.max),pe.needsUpdate=!0),!0):!1,intersectsRange:(S,_)=>{if(t.boundsTree){const b=t.boundsTree;return b.shapecast({boundsTraverseOrder:A=>pe.distanceToBox(A),intersectsBounds:(A,T,M)=>M<g&&M<s,intersectsRange:(A,T)=>{for(let M=A,D=A+T;M<D;M++){const P=b.resolveTriangleIndex(M);k(d,3*P,h,u),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let B=S,z=S+_;B<z;B++){const C=n.resolveTriangleIndex(B);k(l,3*C,f,c),l.needsUpdate=!0;const I=l.distanceToTriangle(d,m,p);if(I<g&&(v.copy(m),y&&y.copy(p),g=I,x=B,w=M),I<o)return!0}}}})}else{const b=ne(t);for(let A=0,T=b;A<T;A++){k(d,3*A,h,u),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let M=S,D=S+_;M<D;M++){const P=n.resolveTriangleIndex(M);k(l,3*P,f,c),l.needsUpdate=!0;const B=l.distanceToTriangle(d,m,p);if(B<g&&(v.copy(m),y&&y.copy(p),g=B,x=M,w=A),B<o)return!0}}}}}),st.releasePrimitive(l),st.releasePrimitive(d),g===1/0?null:(i.point?i.point.copy(v):i.point=v.clone(),i.distance=g,i.faceIndex=x,r&&(r.point?r.point.copy(y):r.point=y.clone(),r.point.applyMatrix4(qe),v.applyMatrix4(qe),r.distance=v.sub(r.point).length(),r.faceIndex=w),i)}function ka(){return typeof SharedArrayBuffer<"u"}const be=new F.constructor,dn=new F.constructor,_t=new Fi(()=>new Y),Xt=new Y,Zt=new Y,Nn=new Y,kn=new Y;let $n=!1;function $a(n,t,e,i){if($n)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");$n=!0;const r=n._roots,o=t._roots;let s,a=0,c=0;const f=new V().copy(e).invert();for(let u=0,h=r.length;u<h;u++){be.setBuffer(r[u]),c=0;const l=_t.getPrimitive();L(0,be.float32Array,l),l.applyMatrix4(f);for(let d=0,m=o.length;d<m&&(dn.setBuffer(o[d]),s=ot(0,0,e,f,i,a,c,0,0,l),dn.clearBuffer(),c+=o[d].length,!s);d++);if(_t.releasePrimitive(l),be.clearBuffer(),a+=r[u].length,s)break}return $n=!1,s}function ot(n,t,e,i,r,o=0,s=0,a=0,c=0,f=null,u=!1){let h,l;u?(h=dn,l=be):(h=be,l=dn);const d=h.float32Array,m=h.uint32Array,v=h.uint16Array,p=l.float32Array,y=l.uint32Array,g=l.uint16Array,x=n*2,w=t*2,S=Q(x,v),_=Q(w,g);let b=!1;if(_&&S)u?b=r(et(t,y),nt(t*2,g),et(n,m),nt(n*2,v),c,s+t,a,o+n):b=r(et(n,m),nt(n*2,v),et(t,y),nt(t*2,g),a,o+n,c,s+t);else if(_){const A=_t.getPrimitive();L(t,p,A),A.applyMatrix4(e);const T=it(n),M=rt(n,m);L(T,d,Xt),L(M,d,Zt);const D=A.intersectsBox(Xt),P=A.intersectsBox(Zt);b=D&&ot(t,T,i,e,r,s,o,c,a+1,A,!u)||P&&ot(t,M,i,e,r,s,o,c,a+1,A,!u),_t.releasePrimitive(A)}else{const A=it(t),T=rt(t,y);L(A,p,Nn),L(T,p,kn);const M=f.intersectsBox(Nn),D=f.intersectsBox(kn);if(M&&D)b=ot(n,A,e,i,r,o,s,a,c+1,f,u)||ot(n,T,e,i,r,o,s,a,c+1,f,u);else if(M)if(S)b=ot(n,A,e,i,r,o,s,a,c+1,f,u);else{const P=_t.getPrimitive();P.copy(Nn).applyMatrix4(e);const B=it(n),z=rt(n,m);L(B,d,Xt),L(z,d,Zt);const C=P.intersectsBox(Xt),I=P.intersectsBox(Zt);b=C&&ot(A,B,i,e,r,s,o,c,a+1,P,!u)||I&&ot(A,z,i,e,r,s,o,c,a+1,P,!u),_t.releasePrimitive(P)}else if(D)if(S)b=ot(n,T,e,i,r,o,s,a,c+1,f,u);else{const P=_t.getPrimitive();P.copy(kn).applyMatrix4(e);const B=it(n),z=rt(n,m);L(B,d,Xt),L(z,d,Zt);const C=P.intersectsBox(Xt),I=P.intersectsBox(Zt);b=C&&ot(T,B,i,e,r,s,o,c,a+1,P,!u)||I&&ot(T,z,i,e,r,s,o,c,a+1,P,!u),_t.releasePrimitive(P)}}return b}const Xe=new K,br=new Y,Va={strategy:ts,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null};class te{static serialize(t,e={}){e={cloneBuffers:!0,...e};const i=t.geometry,r=t._roots,o=t._indirectBuffer,s=i.getIndex();let a;return e.cloneBuffers?a={roots:r.map(c=>c.slice()),index:s?s.array.slice():null,indirectBuffer:o?o.slice():null}:a={roots:r,index:s?s.array:null,indirectBuffer:o},a}static deserialize(t,e,i={}){i={setIndex:!0,indirect:!!t.indirectBuffer,...i};const{index:r,roots:o,indirectBuffer:s}=t,a=new te(e,{...i,[Cn]:!0});if(a._roots=o,a._indirectBuffer=s||null,i.setIndex){const c=e.getIndex();if(c===null){const f=new Z(t.index,1,!1);e.setIndex(f)}else c.array!==r&&(c.array.set(r),c.needsUpdate=!0)}return a}get indirect(){return!!this._indirectBuffer}constructor(t,e={}){if(t.isBufferGeometry){if(t.index&&t.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(e=Object.assign({...Va,[Cn]:!1},e),e.useSharedArrayBuffer&&!ka())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=t,this._roots=null,this._indirectBuffer=null,e[Cn]||(ia(this,e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new Y))),this.resolveTriangleIndex=e.indirect?i=>this._indirectBuffer[i]:i=>i}refit(t=null){return(this.indirect?Ea:ga)(this,t)}traverse(t,e=0){const i=this._roots[e],r=new Uint32Array(i),o=new Uint16Array(i);s(0);function s(a,c=0){const f=a*2,u=o[f+15]===mn;if(u){const h=r[a+6],l=o[f+14];t(c,u,new Float32Array(i,a*4,6),h,l)}else{const h=a+we/4,l=r[a+6],d=r[a+7];t(c,u,new Float32Array(i,a*4,6),d)||(s(h,c+1),s(l,c+1))}}}raycast(t,e=Yn,i=0,r=1/0){const o=this._roots,s=this.geometry,a=[],c=e.isMaterial,f=Array.isArray(e),u=s.groups,h=c?e.side:e,l=this.indirect?za:ba;for(let d=0,m=o.length;d<m;d++){const v=f?e[u[d].materialIndex].side:h,p=a.length;if(l(this,d,v,t,a,i,r),f){const y=u[d].materialIndex;for(let g=p,x=a.length;g<x;g++)a[g].face.materialIndex=y}}return a}raycastFirst(t,e=Yn,i=0,r=1/0){const o=this._roots,s=this.geometry,a=e.isMaterial,c=Array.isArray(e);let f=null;const u=s.groups,h=a?e.side:e,l=this.indirect?Ia:Sa;for(let d=0,m=o.length;d<m;d++){const v=c?e[u[d].materialIndex].side:h,p=l(this,d,v,t,i,r);p!=null&&(f==null||p.distance<f.distance)&&(f=p,c&&(p.face.materialIndex=u[d].materialIndex))}return f}intersectsGeometry(t,e){let i=!1;const r=this._roots,o=this.indirect?Ua:Aa;for(let s=0,a=r.length;s<a&&(i=o(this,s,t,e),!i);s++);return i}shapecast(t){const e=st.getPrimitive(),i=this.indirect?wa:ya;let{boundsTraverseOrder:r,intersectsBounds:o,intersectsRange:s,intersectsTriangle:a}=t;if(s&&a){const h=s;s=(l,d,m,v,p)=>h(l,d,m,v,p)?!0:i(l,d,this,a,m,v,e)}else s||(a?s=(h,l,d,m)=>i(h,l,this,a,d,m,e):s=(h,l,d)=>d);let c=!1,f=0;const u=this._roots;for(let h=0,l=u.length;h<l;h++){const d=u[h];if(c=la(this,h,o,s,r,f),c)break;f+=d.byteLength}return st.releasePrimitive(e),c}bvhcast(t,e,i){let{intersectsRanges:r,intersectsTriangles:o}=i;const s=st.getPrimitive(),a=this.geometry.index,c=this.geometry.attributes.position,f=this.indirect?m=>{const v=this.resolveTriangleIndex(m);k(s,v*3,a,c)}:m=>{k(s,m*3,a,c)},u=st.getPrimitive(),h=t.geometry.index,l=t.geometry.attributes.position,d=t.indirect?m=>{const v=t.resolveTriangleIndex(m);k(u,v*3,h,l)}:m=>{k(u,m*3,h,l)};if(o){const m=(v,p,y,g,x,w,S,_)=>{for(let b=y,A=y+g;b<A;b++){d(b),u.a.applyMatrix4(e),u.b.applyMatrix4(e),u.c.applyMatrix4(e),u.needsUpdate=!0;for(let T=v,M=v+p;T<M;T++)if(f(T),s.needsUpdate=!0,o(s,u,T,b,x,w,S,_))return!0}return!1};if(r){const v=r;r=function(p,y,g,x,w,S,_,b){return v(p,y,g,x,w,S,_,b)?!0:m(p,y,g,x,w,S,_,b)}}else r=m}return $a(this,t,e,r)}intersectsBox(t,e){return Xe.set(t.min,t.max,e),Xe.needsUpdate=!0,this.shapecast({intersectsBounds:i=>Xe.intersectsBox(i),intersectsTriangle:i=>Xe.intersectsTriangle(i)})}intersectsSphere(t){return this.shapecast({intersectsBounds:e=>t.intersectsBox(e),intersectsTriangle:e=>e.intersectsSphere(t)})}closestPointToGeometry(t,e,i={},r={},o=0,s=1/0){return(this.indirect?Na:Ba)(this,t,e,i,r,o,s)}closestPointToPoint(t,e={},i=0,r=1/0){return ua(this,t,e,i,r)}getBoundingBox(t){return t.makeEmpty(),this._roots.forEach(i=>{L(0,new Float32Array(i),br),t.union(br)}),t}}const _r=new Y,Sr=new V;class Ha extends _e{get isMesh(){return!this.displayEdges}get isLineSegments(){return this.displayEdges}get isLine(){return this.displayEdges}getVertexPosition(...t){return X.prototype.getVertexPosition.call(this,...t)}constructor(t,e,i=10,r=0){super(),this.material=e,this.geometry=new Mt,this.name="MeshBVHRootHelper",this.depth=i,this.displayParents=!1,this.bvh=t,this.displayEdges=!0,this._group=r}raycast(){}update(){const t=this.geometry,e=this.bvh,i=this._group;if(t.dispose(),this.visible=!1,e){const r=this.depth-1,o=this.displayParents;let s=0;e.traverse((l,d)=>{if(l>=r||d)return s++,!0;o&&s++},i);let a=0;const c=new Float32Array(24*s);e.traverse((l,d,m)=>{const v=l>=r||d;if(v||o){L(0,m,_r);const{min:p,max:y}=_r;for(let g=-1;g<=1;g+=2){const x=g<0?p.x:y.x;for(let w=-1;w<=1;w+=2){const S=w<0?p.y:y.y;for(let _=-1;_<=1;_+=2){const b=_<0?p.z:y.z;c[a+0]=x,c[a+1]=S,c[a+2]=b,a+=3}}}return v}},i);let f,u;this.displayEdges?u=new Uint8Array([0,4,1,5,2,6,3,7,0,2,1,3,4,6,5,7,0,1,2,3,4,5,6,7]):u=new Uint8Array([0,1,2,2,1,3,4,6,5,6,7,5,1,4,5,0,4,1,2,3,6,3,7,6,0,2,4,2,6,4,1,5,3,3,5,7]),c.length>65535?f=new Uint32Array(u.length*s):f=new Uint16Array(u.length*s);const h=u.length;for(let l=0;l<s;l++){const d=l*8,m=l*h;for(let v=0;v<h;v++)f[m+v]=d+u[v]}t.setIndex(new Z(f,1,!1)),t.setAttribute("position",new Z(c,3,!1)),this.visible=!0}}}class Ee extends kr{get color(){return this.edgeMaterial.color}get opacity(){return this.edgeMaterial.opacity}set opacity(t){this.edgeMaterial.opacity=t,this.meshMaterial.opacity=t}constructor(t=null,e=null,i=10){t instanceof te&&(i=e||10,e=t,t=null),typeof e=="number"&&(i=e,e=null),super(),this.name="MeshBVHHelper",this.depth=i,this.mesh=t,this.bvh=e,this.displayParents=!1,this.displayEdges=!0,this.objectIndex=0,this._roots=[];const r=new Ps({color:65416,transparent:!0,opacity:.3,depthWrite:!1}),o=new kt({color:65416,transparent:!0,opacity:.3,depthWrite:!1});o.color=r.color,this.edgeMaterial=r,this.meshMaterial=o,this.update()}update(){const t=this.mesh;let e=this.bvh||t.geometry.boundsTree||null;if(t.isBatchedMesh&&t.boundsTrees&&!e){const r=t._drawInfo[this.objectIndex];r&&(e=t.boundsTrees[r.geometryIndex]||e)}const i=e?e._roots.length:0;for(;this._roots.length>i;){const r=this._roots.pop();r.geometry.dispose(),this.remove(r)}for(let r=0;r<i;r++){const{depth:o,edgeMaterial:s,meshMaterial:a,displayParents:c,displayEdges:f}=this;if(r>=this._roots.length){const h=new Ha(e,s,o,r);this.add(h),this._roots.push(h)}const u=this._roots[r];u.bvh=e,u.depth=o,u.displayParents=c,u.displayEdges=f,u.material=f?s:a,u.update()}}updateMatrixWorld(...t){const e=this.mesh,i=this.parent;e!==null&&(e.updateWorldMatrix(!0,!1),i?this.matrix.copy(i.matrixWorld).invert().multiply(e.matrixWorld):this.matrix.copy(e.matrixWorld),(e.isInstancedMesh||e.isBatchedMesh)&&(e.getMatrixAt(this.objectIndex,Sr),this.matrix.multiply(Sr)),this.matrix.decompose(this.position,this.quaternion,this.scale)),super.updateMatrixWorld(...t)}copy(t){this.depth=t.depth,this.mesh=t.mesh,this.bvh=t.bvh,this.opacity=t.opacity,this.color.copy(t.color)}clone(){return new Ee(this.mesh,this.bvh,this.depth)}dispose(){this.edgeMaterial.dispose(),this.meshMaterial.dispose();const t=this.children;for(let e=0,i=t.length;e<i;e++)t[e].geometry.dispose()}}function Ar(n,t,e){return n===null?null:(n.point.applyMatrix4(t.matrixWorld),n.distance=n.point.distanceTo(e.ray.origin),n.object=t,n)}const ja=parseInt(Hr)>=166,Ze=new wi,Mr=new E,Tr=new V,Ga=X.prototype.raycast,Wa=en.prototype.raycast,Dr=new E,G=new X,Ye=[];function os(n,t){this.isBatchedMesh?qa.call(this,n,t):Xa.call(this,n,t)}function qa(n,t){if(this.boundsTrees){const e=this.boundsTrees,i=this._drawInfo||this._instanceInfo,r=this._drawRanges||this._geometryInfo,o=this.matrixWorld;G.material=this.material,G.geometry=this.geometry;const s=G.geometry.boundsTree,a=G.geometry.drawRange;G.geometry.boundingSphere===null&&(G.geometry.boundingSphere=new ee);for(let c=0,f=i.length;c<f;c++){if(!this.getVisibleAt(c))continue;const u=i[c].geometryIndex;if(G.geometry.boundsTree=e[u],this.getMatrixAt(c,G.matrixWorld).premultiply(o),!G.geometry.boundsTree){this.getBoundingBoxAt(u,G.geometry.boundingBox),this.getBoundingSphereAt(u,G.geometry.boundingSphere);const h=r[u];G.geometry.setDrawRange(h.start,h.count)}G.raycast(n,Ye);for(let h=0,l=Ye.length;h<l;h++){const d=Ye[h];d.object=this,d.batchId=c,t.push(d)}Ye.length=0}G.geometry.boundsTree=s,G.geometry.drawRange=a,G.material=null,G.geometry=null}else Wa.call(this,n,t)}function Xa(n,t){if(this.geometry.boundsTree){if(this.material===void 0)return;Tr.copy(this.matrixWorld).invert(),Ze.copy(n.ray).applyMatrix4(Tr),Dr.setFromMatrixScale(this.matrixWorld),Mr.copy(Ze.direction).multiply(Dr);const e=Mr.length(),i=n.near/e,r=n.far/e,o=this.geometry.boundsTree;if(n.firstHitOnly===!0){const s=Ar(o.raycastFirst(Ze,this.material,i,r),this,n);s&&t.push(s)}else{const s=o.raycast(Ze,this.material,i,r);for(let a=0,c=s.length;a<c;a++){const f=Ar(s[a],this,n);f&&t.push(f)}}}else Ga.call(this,n,t)}function Za(n={}){return this.boundsTree=new te(this,n),this.boundsTree}function Ya(){this.boundsTree=null}function Ka(n=-1,t={}){if(!ja)throw new Error("BatchedMesh: Three r166+ is required to compute bounds trees.");t.indirect&&console.warn('"Indirect" is set to false because it is not supported for BatchedMesh.'),t={...t,indirect:!1,range:null};const e=this._drawRanges||this._geometryInfo,i=this._geometryCount;this.boundsTrees||(this.boundsTrees=new Array(i).fill(null));const r=this.boundsTrees;for(;r.length<i;)r.push(null);if(n<0){for(let o=0;o<i;o++)t.range=e[o],r[o]=new te(this.geometry,t);return r}else return n<e.length&&(t.range=e[n],r[n]=new te(this.geometry,t)),r[n]||null}function Qa(n=-1){n<0?this.boundsTrees.fill(null):n<this.boundsTree.length&&(this.boundsTrees[n]=null)}const Ja=`

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
`,tc=`

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
`,ec=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,nc=ec,ic=`
	${Ja}
	${tc}
`,Ql=`#define ENVMAP_TYPE_CUBE_UV
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
${nc}
${ic}
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
	${J.tonemapping_fragment}
	${J.colorspace_fragment}
}`,Vn=typeof window<"u"?document.createElement("div"):void 0,Jl=()=>{Qs("transitions",n=>{if(!Vn||!n.props.in&&!n.props.out&&!n.props.transition)return;const{invalidate:t}=Ti();Vn.dispatchEvent=a=>(a.type==="introstart"?n.props.onintrostart?.():a.type==="outrostart"?n.props.onoutrostart?.():a.type==="introend"?n.props.onintroend?.():a.type==="outroend"&&n.props.onoutroend?.(),!0);const e=a=>(c,f,u)=>{const h=a(n.ref,{direction:u.direction});return{...h,tick(...l){t(),h?.tick?.(...l)}}},i=["in","out","transition"],r={in:5,out:6,transition:7},o={in:1,out:2,transition:3},s=Hs;s&&!("transitions"in s)&&s.nodes==null&&(s.nodes={start:null,end:null,a:null,t:null});for(const a of i){const c=n.props[a];if(c){const u="global"in c?r[a]:o[a];Ks(u,Vn,()=>e(c))}}return{pluginProps:["in","out","transition","onintrostart","onoutrostart","onintroend","onoutroend"]}})},Ut=new Js,rc={audioListeners:Ut,addAudioListener:(n,t="default")=>{if(Ut.has(t)){console.warn(`An AudioListener with the id "${t}" has already been added, aborting.`);return}Ut.set(t,n)},removeAudioListener:(n="default")=>{if(!Ut.has(n)){console.warn(`No AudioListener with the id "${n}" found, aborting.`);return}Ut.delete(n)},getAudioListener:(n="default")=>{if(!Ut.has(n)){console.warn(`No AudioListener with the id "${n}" found, aborting.`);return}return Ut.get(n)}};function tu(){return to("threlte-audio",rc)}var sc=Object.defineProperty,oc=(n,t,e)=>t in n?sc(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,R=(n,t,e)=>(oc(n,typeof t!="symbol"?t+"":t,e),e);const as=/\bvoid\s+main\s*\(\s*\)\s*{/g;function pi(n){const t=/^[ \t]*#include +<([\w\d./]+)>/gm;function e(i,r){let o=J[r];return o?pi(o):i}return n.replace(t,e)}const W=[];for(let n=0;n<256;n++)W[n]=(n<16?"0":"")+n.toString(16);function ac(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(W[n&255]+W[n>>8&255]+W[n>>16&255]+W[n>>24&255]+"-"+W[t&255]+W[t>>8&255]+"-"+W[t>>16&15|64]+W[t>>24&255]+"-"+W[e&63|128]+W[e>>8&255]+"-"+W[e>>16&255]+W[e>>24&255]+W[i&255]+W[i>>8&255]+W[i>>16&255]+W[i>>24&255]).toUpperCase()}const Rt=Object.assign||function(){let n=arguments[0];for(let t=1,e=arguments.length;t<e;t++){let i=arguments[t];if(i)for(let r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n[r]=i[r])}return n},cc=Date.now(),Pr=new WeakMap,Br=new Map;let lc=1e10;function hn(n,t){const e=hc(t);let i=Pr.get(n);if(i||Pr.set(n,i=Object.create(null)),i[e])return new i[e];const r=`_onBeforeCompile${e}`,o=function(f,u){n.onBeforeCompile.call(this,f,u);const h=this.customProgramCacheKey()+"|"+f.vertexShader+"|"+f.fragmentShader;let l=Br[h];if(!l){const d=uc(this,f,t,e);l=Br[h]=d}f.vertexShader=l.vertexShader,f.fragmentShader=l.fragmentShader,Rt(f.uniforms,this.uniforms),t.timeUniform&&(f.uniforms[t.timeUniform]={get value(){return Date.now()-cc}}),this[r]&&this[r](f)},s=function(){return a(t.chained?n:n.clone())},a=function(f){const u=Object.create(f,c);return Object.defineProperty(u,"baseMaterial",{value:n}),Object.defineProperty(u,"id",{value:lc++}),u.uuid=ac(),u.uniforms=Rt({},f.uniforms,t.uniforms),u.defines=Rt({},f.defines,t.defines),u.defines[`TROIKA_DERIVED_MATERIAL_${e}`]="",u.extensions=Rt({},f.extensions,t.extensions),u._listeners=void 0,u},c={constructor:{value:s},isDerivedMaterial:{value:!0},type:{get:()=>n.type,set:f=>{n.type=f}},isDerivedFrom:{writable:!0,configurable:!0,value:function(f){const u=this.baseMaterial;return f===u||u.isDerivedMaterial&&u.isDerivedFrom(f)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return n.customProgramCacheKey()+"|"+e}},onBeforeCompile:{get(){return o},set(f){this[r]=f}},copy:{writable:!0,configurable:!0,value:function(f){return n.copy.call(this,f),!n.isShaderMaterial&&!n.isDerivedMaterial&&(Rt(this.extensions,f.extensions),Rt(this.defines,f.defines),Rt(this.uniforms,bi.clone(f.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const f=new n.constructor;return a(f).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let f=this._depthMaterial;return f||(f=this._depthMaterial=hn(n.isDerivedMaterial?n.getDepthMaterial():new Fs({depthPacking:Ls}),t),f.defines.IS_DEPTH_MATERIAL="",f.uniforms=this.uniforms),f}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let f=this._distanceMaterial;return f||(f=this._distanceMaterial=hn(n.isDerivedMaterial?n.getDistanceMaterial():new Rs,t),f.defines.IS_DISTANCE_MATERIAL="",f.uniforms=this.uniforms),f}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:f,_distanceMaterial:u}=this;f&&f.dispose(),u&&u.dispose(),n.dispose.call(this)}}};return i[e]=s,new s}function uc(n,{vertexShader:t,fragmentShader:e},i,r){let{vertexDefs:o,vertexMainIntro:s,vertexMainOutro:a,vertexTransform:c,fragmentDefs:f,fragmentMainIntro:u,fragmentMainOutro:h,fragmentColorTransform:l,customRewriter:d,timeUniform:m}=i;if(o=o||"",s=s||"",a=a||"",f=f||"",u=u||"",h=h||"",(c||d)&&(t=pi(t)),(l||d)&&(e=e.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),e=pi(e)),d){let v=d({vertexShader:t,fragmentShader:e});t=v.vertexShader,e=v.fragmentShader}if(l){let v=[];e=e.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,p=>(v.push(p),"")),h=`${l}
${v.join(`
`)}
${h}`}if(m){const v=`
uniform float ${m};
`;o=v+o,f=v+f}return c&&(t=`vec3 troika_position_${r};
vec3 troika_normal_${r};
vec2 troika_uv_${r};
${t}
`,o=`${o}
void troikaVertexTransform${r}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${c}
}
`,s=`
troika_position_${r} = vec3(position);
troika_normal_${r} = vec3(normal);
troika_uv_${r} = vec2(uv);
troikaVertexTransform${r}(troika_position_${r}, troika_normal_${r}, troika_uv_${r});
${s}
`,t=t.replace(/\b(position|normal|uv)\b/g,(v,p,y,g)=>/\battribute\s+vec[23]\s+$/.test(g.substr(0,y))?p:`troika_${p}_${r}`),n.map&&n.map.channel>0||(t=t.replace(/\bMAP_UV\b/g,`troika_uv_${r}`))),t=Er(t,r,o,s,a),e=Er(e,r,f,u,h),{vertexShader:t,fragmentShader:e}}function Er(n,t,e,i,r){return(i||r||e)&&(n=n.replace(as,`
${e}
void troikaOrigMain${t}() {`),n+=`
void main() {
  ${i}
  troikaOrigMain${t}();
  ${r}
}`),n}function fc(n,t){return n==="uniforms"?void 0:typeof t=="function"?t.toString():t}let dc=0;const zr=new Map;function hc(n){const t=JSON.stringify(n,fc);let e=zr.get(t);return e==null&&zr.set(t,e=++dc),e}const pc={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function mc(n){let t=pc[n.type];return t?ge[t]:n}function Cr(n){let t=/\buniform\s+(int|float|vec[234]|mat[34])\s+([A-Za-z_][\w]*)/g,e=Object.create(null),i;for(;(i=t.exec(n))!==null;)e[i[2]]=i[1];return e}function yc(n){let t=[],e="";const i=hn(n,{chained:!0,customRewriter({vertexShader:o,fragmentShader:s}){let a=[],c=[],f=[],u=Cr(o),h=Cr(s);return t.forEach(l=>{let d=u[l],m=h[l];const v=d||m;if(v){const p=new RegExp(`\\buniform\\s+${v}\\s+${l}\\s*;`,"g"),y=new RegExp(`\\b${l}\\b`,"g"),g=`troika_attr_${l}`,x=`troika_vary_${l}`;if(a.push(`attribute ${v} ${g};`),d&&(o=o.replace(p,""),o=o.replace(y,g)),m){s=s.replace(p,""),s=s.replace(y,x);let w=`varying ${m} ${x};`;a.push(w),f.push(w),c.push(`${x} = ${g};`)}}}),o=`${a.join(`
`)}
${o.replace(as,`
$&
${c.join(`
`)}`)}`,f.length&&(s=`${f.join(`
`)}
${s}`),{vertexShader:o,fragmentShader:s}}});i.setUniformNames=function(o){t=o||[];const s=t.sort().join("|");s!==e&&(e=s,this.needsUpdate=!0)};const r=i.customProgramCacheKey();return i.customProgramCacheKey=function(){return r+"|"+e},i.isInstancedUniformsMaterial=!0,i}class gc extends Cs{constructor(t,e,i){super(t,e,i),this._maxCount=i,this._instancedUniformNames=[]}get geometry(){let t=this._derivedGeometry;const e=this._baseGeometry;return(!t||t.baseGeometry!==e)&&(t=this._derivedGeometry=Object.create(e),t.baseGeometry=e,t.attributes=Object.create(e.attributes),e.addEventListener("dispose",function i(){e.removeEventListener("dispose",i),t.dispose()})),t}set geometry(t){this._baseGeometry=t}get material(){let t=this._derivedMaterial;const e=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=new kt);return(!t||t.baseMaterial!==e)&&(t=this._derivedMaterial=yc(e),e.addEventListener("dispose",function i(){e.removeEventListener("dispose",i),t.dispose()})),t.setUniformNames(this._instancedUniformNames),t}set material(t){if(Array.isArray(t))throw new Error("InstancedUniformsMesh does not support multiple materials");for(;t&&t.isInstancedUniformsMaterial;)t=t.baseMaterial;this._baseMaterial=t}get customDepthMaterial(){return this.material.getDepthMaterial()}set customDepthMaterial(t){}get customDistanceMaterial(){return this.material.getDistanceMaterial()}set customDistanceMaterial(t){}setUniformAt(t,e,i){const r=this.geometry.attributes,o=`troika_attr_${t}`;let s=r[o];if(!s){const a=vc(this._baseMaterial,t),c=xc(a);if(s=r[o]=new Is(new Float32Array(c*this._maxCount),c),a!==null)for(let f=0;f<this._maxCount;f++)Ir(s,f,a);this._instancedUniformNames=[...this._instancedUniformNames,t]}Ir(s,e,i),s.needsUpdate=!0}unsetUniform(t){this.geometry.deleteAttribute(`troika_attr_${t}`),this._instancedUniformNames=this._instancedUniformNames.filter(e=>e!==t)}}function Ir(n,t,e){let i=n.itemSize;i===1?n.setX(t,e):i===2?n.setXY(t,e.x,e.y):i===3?e.isColor?n.setXYZ(t,e.r,e.g,e.b):n.setXYZ(t,e.x,e.y,e.z):i===4?n.setXYZW(t,e.x,e.y,e.z,e.w):e.toArray?e.toArray(n.array,t*i):n.set(e,t*i)}function vc(n,t){let e=n.uniforms;return e&&e[t]||(e=mc(n).uniforms,e&&e[t])?e[t].value:null}function xc(n){return n==null?0:typeof n=="number"?1:n.isVector2?2:n.isVector3||n.isColor?3:n.isVector4||n.isQuaternion?4:n.elements?n.elements.length:Array.isArray(n)?n.length:0}const wc=(n,t)=>{const e=n.split(`
`),i=/vMapUv|vAlphaMapUv|vNormalMapUv/g;return e.map(r=>!r.includes("varying")&&!r.includes("uniform")?r.replace(i,t):r).join(`
`)},bc=(n,t)=>{const e={USE_UV:""};return t&&(e.TRI_GEOMETRY=""),hn(n,{defines:e,uniforms:{animationData:{value:null},animationDataSize:{value:0},billboarding:{value:0},flipX:{value:0},flipY:{value:0},spritesheetData:{value:null},dataSize:{value:new tt(0,0)},tint:{value:new Tt(0,0,0,0)}},vertexDefs:`
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
      `),r=wc(r,"spriteUv"),{vertexShader:i,fragmentShader:r})})},eu=n=>{const t=[],e=[],i={},r=[],o=n.meta.size.w,s=n.meta.size.h,a=[n.meta.size.w,n.meta.size.h];for(const c in n.frames){const f=n.frames[c];t.push([f.frame.x/o,f.frame.y/s,f.frame.w/o,f.frame.h/s]),e.push(f.duration)}for(const c of n.meta.frameTags){i[c.name]=[];for(let f=c.from;f<=c.to;f++)i[c.name].push([f,e[f]]);r.push(i[c.name].length)}return{frames:t,animations:i,sheetSize:a,animationLengths:r}},_c=n=>{const{frames:t,animationLengths:e,animations:i}=n,r=Math.max(t.length,e.length,...Object.values(i).map(d=>d.length)),o=2+Object.values(i).length,s=t.flat().concat(new Array((r-t.length)*4).fill(0)),a=e.map(d=>[d,0,0,0]).flat().concat(new Array((r-e.length)*4).fill(0)),c=[],f=new Map;for(let d=0;d<Object.keys(i).length;d++){const m=Object.keys(i)[d];f.set(m,d);const v=i[m].map(p=>[...p,0,0]).flat().concat(new Array((r-i[m].length)*4).fill(0));c.push(...v)}const u=[...s,...a,...c],h=new Float32Array(u);h.set(u);const l=new Mi(h,r,o,an,Ae);return l.type=Ae,l.minFilter=ht,l.magFilter=ht,l.wrapS=cn,l.wrapT=Se,l.needsUpdate=!0,{dataTexture:l,dataWidth:r,dataHeight:o,animMap:f}},Sc=()=>{const n=new Mt,t=new Float32Array([0,1,0,-1,-1,0,1,-1,0]);n.setAttribute("position",new Z(t,3));const e=new Float32Array([.5,1,0,0,1,0]);return n.setAttribute("uv",new Z(e,2)),n.computeVertexNormals(),n},Ac=new Lr(-1,1,1,-1,0,1);class Mc extends Mt{constructor(){super(),this.setAttribute("position",new Lt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Lt([0,2,0,0,2,0],2))}}const Tc=new Mc;class Dc{constructor(t){this._mesh=new X(Tc,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Ac)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Pc{constructor(t,e,i){this.variables=[],this.currentTextureIndex=0;let r=Ae;const o={passThruTexture:{value:null}},s=f(h(),o),a=new Dc(s);this.setDataType=function(l){return r=l,this},this.addVariable=function(l,d,m){const v=this.createShaderMaterial(d),p={name:l,initialValueTexture:m,material:v,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:ht,magFilter:ht};return this.variables.push(p),p},this.setVariableDependencies=function(l,d){l.dependencies=d},this.init=function(){if(i.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let l=0;l<this.variables.length;l++){const d=this.variables[l];d.renderTargets[0]=this.createRenderTarget(t,e,d.wrapS,d.wrapT,d.minFilter,d.magFilter),d.renderTargets[1]=this.createRenderTarget(t,e,d.wrapS,d.wrapT,d.minFilter,d.magFilter),this.renderTexture(d.initialValueTexture,d.renderTargets[0]),this.renderTexture(d.initialValueTexture,d.renderTargets[1]);const m=d.material,v=m.uniforms;if(d.dependencies!==null)for(let p=0;p<d.dependencies.length;p++){const y=d.dependencies[p];if(y.name!==d.name){let g=!1;for(let x=0;x<this.variables.length;x++)if(y.name===this.variables[x].name){g=!0;break}if(!g)return"Variable dependency not found. Variable="+d.name+", dependency="+y.name}v[y.name]={value:null},m.fragmentShader=`
uniform sampler2D `+y.name+`;
`+m.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){const l=this.currentTextureIndex,d=this.currentTextureIndex===0?1:0;for(let m=0,v=this.variables.length;m<v;m++){const p=this.variables[m];if(p.dependencies!==null){const y=p.material.uniforms;for(let g=0,x=p.dependencies.length;g<x;g++){const w=p.dependencies[g];y[w.name].value=w.renderTargets[l].texture}}this.doRenderTarget(p.material,p.renderTargets[d])}this.currentTextureIndex=d},this.getCurrentRenderTarget=function(l){return l.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(l){return l.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){a.dispose();const l=this.variables;for(let d=0;d<l.length;d++){const m=l[d];m.initialValueTexture&&m.initialValueTexture.dispose();const v=m.renderTargets;for(let p=0;p<v.length;p++)v[p].dispose()}};function c(l){l.defines.resolution="vec2( "+t.toFixed(1)+", "+e.toFixed(1)+" )"}this.addResolutionDefine=c;function f(l,d){d=d||{};const m=new Nr({name:"GPUComputationShader",uniforms:d,vertexShader:u(),fragmentShader:l});return c(m),m}this.createShaderMaterial=f,this.createRenderTarget=function(l,d,m,v,p,y){return l=l||t,d=d||e,m=m||cn,v=v||cn,p=p||ht,y=y||ht,new Us(l,d,{wrapS:m,wrapT:v,minFilter:p,magFilter:y,format:an,type:r,depthBuffer:!1})},this.createTexture=function(){const l=new Float32Array(t*e*4),d=new Mi(l,t,e,an,Ae);return d.needsUpdate=!0,d},this.renderTexture=function(l,d){o.passThruTexture.value=l,this.doRenderTarget(s,d),o.passThruTexture.value=null},this.doRenderTarget=function(l,d){const m=i.getRenderTarget(),v=i.xr.enabled,p=i.shadowMap.autoUpdate;i.xr.enabled=!1,i.shadowMap.autoUpdate=!1,a.material=l,i.setRenderTarget(d),a.render(i),a.material=s,i.xr.enabled=v,i.shadowMap.autoUpdate=p,i.setRenderTarget(m)};function u(){return`void main()	{

	gl_Position = vec4( position, 1.0 );

}
`}function h(){return`uniform sampler2D passThruTexture;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = texture2D( passThruTexture, uv );

}
`}}}const Bc=`
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
`,Ec=(n=512)=>{const t=new Float32Array(n**2*4);for(let i=0;i<n**2*4;i++)t[i]=0;const e=new Mi(t,n,n,an,Ae);return e.minFilter=ht,e.magFilter=ht,e.wrapS=cn,e.wrapT=Se,e.needsUpdate=!0,e},zc=n=>{if(n<=0)return 1;let t=1;for(;t<n;)t<<=1;return t},Cc=(n,t)=>{const e=zc(Math.sqrt(t)),i=new Pc(e,e,n),r=i.createTexture(),o=i.addVariable("progress",Bc,r),s=Ec(e);o.material.uniforms.instructionsTexture={value:s},o.material.uniforms.spritesheetData={value:null},o.material.uniforms.fps={value:0},o.material.uniforms.deltaTime={value:0},o.material.uniforms.dataSize={value:new tt},i.setVariableDependencies(o,[o]);const a=i.init();a!==null&&console.error(a);let c=!1;return{gpuCompute:i,animationRunner:o,progressDataTexture:s,utils:{updateAnimationAt:(f,u)=>{const h=f*4;s.image.data[h]=u,c=!0},updateOffsetAt:(f,u)=>{const h=f*4;s.image.data[h+1]=u,c=!0},updatePlaymodeAt:(f,u)=>{const h=f*4;s.image.data[h+2]=u,c=!0},updateFrameAt:(f,u)=>{const h=f*4;s.image.data[h+3]=u+10,c=!0}},update:()=>{c&&(s.needsUpdate=!0,c=!1),i.compute()}}};class Ic{constructor(){R(this,"_previousTime"),R(this,"_currentTime"),R(this,"_startTime"),R(this,"_delta"),R(this,"_elapsed"),R(this,"_timescale"),R(this,"_useFixedDelta"),R(this,"_fixedDelta"),R(this,"_usePageVisibilityAPI"),R(this,"_pageVisibilityHandler"),this._previousTime=0,this._currentTime=0,this._startTime=Hn(),this._delta=0,this._elapsed=0,this._timescale=1,this._useFixedDelta=!1,this._fixedDelta=16.67,this._usePageVisibilityAPI=typeof document<"u"&&document.hidden!==void 0,this._usePageVisibilityAPI===!0&&(this._pageVisibilityHandler=Uc.bind(this),document.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disableFixedDelta(){return this._useFixedDelta=!1,this}dispose(){return this._usePageVisibilityAPI===!0&&document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this}enableFixedDelta(){return this._useFixedDelta=!0,this}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getFixedDelta(){return this._fixedDelta/1e3}getTimescale(){return this._timescale}reset(){return this._currentTime=Hn()-this._startTime,this}setFixedDelta(t){return this._fixedDelta=t*1e3,this}setTimescale(t){return this._timescale=t,this}update(){return this._useFixedDelta===!0?this._delta=this._fixedDelta:(this._previousTime=this._currentTime,this._currentTime=Hn()-this._startTime,this._delta=this._currentTime-this._previousTime),this._delta*=this._timescale,this._elapsed+=this._delta,this}}function Hn(){return(typeof performance>"u"?Date:performance).now()}function Uc(){document.hidden===!1&&this.reset()}const jn={FORWARD:0,REVERSE:1,PAUSE:2,PINGPONG:3};class nu extends gc{constructor(t,e,i,r={geometry:"quad"}){let o;r.geometry||(r.geometry="quad"),r.geometry==="tri"&&(o=Sc()),r.geometry==="quad"&&(o=new zs(1,1)),r.geometry&&typeof r.geometry!="string"&&(o=r.geometry);const s=bc(t,r?.geometry==="tri");super(o,s,e),R(this,"_spriteMaterial"),R(this,"_spritesheet"),R(this,"_animationMap"),R(this,"_fps",15),R(this,"_timer"),R(this,"compute"),this.instanceMatrix.clearUpdateRanges(),this.instanceMatrix.addUpdateRange(0,e*16),this.instanceColor&&(this.instanceColor.clearUpdateRanges(),this.instanceColor.addUpdateRange(0,e*3)),this.compute=Cc(i,e),this._spriteMaterial=s,r.spritesheet&&this.updateSpritesheet(r.spritesheet),this._timer=new Ic,this._animationMap=new Map,this._spriteMaterial.uniforms.animationData.value=this.compute.gpuCompute.getCurrentRenderTarget(this.compute.animationRunner).texture,this._spriteMaterial.uniforms.animationDataSize.value=this.compute.progressDataTexture.image.width}updateSpritesheet(t){const{dataTexture:e,dataWidth:i,dataHeight:r,animMap:o}=_c(t);this._spriteMaterial.uniforms.spritesheetData.value=e,this._spriteMaterial.uniforms.dataSize.value.x=i,this._spriteMaterial.uniforms.dataSize.value.y=r,this.compute.animationRunner.material.uniforms.dataSize.value=new tt(i,r),this.compute.animationRunner.material.uniforms.spritesheetData.value=e,this._animationMap=o}get spritesheet(){return this._spritesheet}set spritesheet(t){this.updateSpritesheet(t),this._spritesheet=t}get animationMap(){return this._animationMap}get animation(){return{setAt:(t,e)=>{this.compute.utils.updateAnimationAt(t,this._animationMap.get(e)||0)}}}get frame(){return{setAt:(t,e,i)=>{var r;let o=e;i&&(o=(r=this.spritesheet)==null?void 0:r.animations[i][e][0]),this.compute.utils.updateFrameAt(t,o)},unsetAt:t=>{this.compute.utils.updateFrameAt(t,-10)},unsetAll:()=>{for(let t=0;t<this.count;t++)this.compute.utils.updateFrameAt(t,-10)}}}get playmode(){return{setAt:(t,e)=>{this.compute.utils.updatePlaymodeAt(t,jn[e])},setAll:t=>{for(let e=0;e<this.count;e++){const i=this.compute.progressDataTexture.image.data[e*4+2]>=10?10:0;this.compute.utils.updatePlaymodeAt(e,i+jn[t])}}}}get billboarding(){return{setAt:(t,e)=>{this.setUniformAt("billboarding",t,e?1:0)},setAll:t=>{this._spriteMaterial.uniforms.billboarding.value=t?1:0},unsetAll:()=>{this.unsetUniform("billboarding")}}}get offset(){return{setAt:(t,e)=>{this.compute.utils.updateOffsetAt(t,e)},randomizeAll:(t=1)=>{for(let e=0;e<this.count;e++)this.compute.utils.updateOffsetAt(e,Math.random()*t)}}}get loop(){return{setAt:(t,e)=>{const i=this.compute.progressDataTexture.image.data[t*4+2]%10;this.compute.utils.updatePlaymodeAt(t,i+(e?0:10))},setAll:t=>{for(let e=0;e<this.count;e++){const i=this.compute.progressDataTexture.image.data[e*4+2]%10;this.compute.utils.updatePlaymodeAt(e,i+(t?0:10))}}}}get flipX(){return{setAt:(t,e)=>{this.setUniformAt("flipX",t,e?1:0)},setGlobal:t=>{this._spriteMaterial.uniforms.flipX.value=t?1:0},unsetAll:()=>{this.unsetUniform("flipX")}}}get flipY(){return{setAt:(t,e)=>{this.setUniformAt("flipY",t,e?1:0)},setGlobal:t=>{this._spriteMaterial.uniforms.flipY.value=t?1:0},unsetAll:()=>{this.unsetUniform("flipY")}}}play(t,e=!0,i="FORWARD"){return{at:r=>{this.compute.utils.updateAnimationAt(r,this._animationMap.get(t)||0),this.compute.utils.updatePlaymodeAt(r,jn[i]+(e?0:10))}}}get hueShift(){const t=new Tt;return{setGlobal:e=>{e?t.set(e.h,e.s,e.v,1):t.setW(0),this._spriteMaterial.uniforms.tint.value=t}}}get fps(){return this._fps}set fps(t){this._fps=t,this.compute.animationRunner.material.uniforms.fps.value=t}update(){this._timer.update();const t=this._timer.getDelta();this.compute.animationRunner.material.uniforms.deltaTime.value=t,this.compute.update()}}function Rc(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Li={exports:{}};Li.exports=gn;Li.exports.default=gn;function gn(n,t,e){e=e||2;var i=t&&t.length,r=i?t[0]*e:n.length,o=cs(n,0,r,e,!0),s=[];if(!o||o.next===o.prev)return s;var a,c,f,u,h,l,d;if(i&&(o=kc(n,t,o,e)),n.length>80*e){a=f=n[0],c=u=n[1];for(var m=e;m<r;m+=e)h=n[m],l=n[m+1],h<a&&(a=h),l<c&&(c=l),h>f&&(f=h),l>u&&(u=l);d=Math.max(f-a,u-c),d=d!==0?32767/d:0}return Te(o,s,e,a,c,d,0),s}function cs(n,t,e,i,r){var o,s;if(r===gi(n,t,e,i)>0)for(o=t;o<e;o+=i)s=Ur(o,n[o],n[o+1],s);else for(o=e-i;o>=t;o-=i)s=Ur(o,n[o],n[o+1],s);return s&&vn(s,s.next)&&(Pe(s),s=s.next),s}function Nt(n,t){if(!n)return n;t||(t=n);var e=n,i;do if(i=!1,!e.steiner&&(vn(e,e.next)||O(e.prev,e,e.next)===0)){if(Pe(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Te(n,t,e,i,r,o,s){if(n){!s&&o&&Gc(n,i,r,o);for(var a=n,c,f;n.prev!==n.next;){if(c=n.prev,f=n.next,o?Lc(n,i,r,o):Fc(n)){t.push(c.i/e|0),t.push(n.i/e|0),t.push(f.i/e|0),Pe(n),n=f.next,a=f.next;continue}if(n=f,n===a){s?s===1?(n=Oc(Nt(n),t,e),Te(n,t,e,i,r,o,2)):s===2&&Nc(n,t,e,i,r,o):Te(Nt(n),t,e,i,r,o,1);break}}}}function Fc(n){var t=n.prev,e=n,i=n.next;if(O(t,e,i)>=0)return!1;for(var r=t.x,o=e.x,s=i.x,a=t.y,c=e.y,f=i.y,u=r<o?r<s?r:s:o<s?o:s,h=a<c?a<f?a:f:c<f?c:f,l=r>o?r>s?r:s:o>s?o:s,d=a>c?a>f?a:f:c>f?c:f,m=i.next;m!==t;){if(m.x>=u&&m.x<=l&&m.y>=h&&m.y<=d&&Jt(r,a,o,c,s,f,m.x,m.y)&&O(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Lc(n,t,e,i){var r=n.prev,o=n,s=n.next;if(O(r,o,s)>=0)return!1;for(var a=r.x,c=o.x,f=s.x,u=r.y,h=o.y,l=s.y,d=a<c?a<f?a:f:c<f?c:f,m=u<h?u<l?u:l:h<l?h:l,v=a>c?a>f?a:f:c>f?c:f,p=u>h?u>l?u:l:h>l?h:l,y=mi(d,m,t,e,i),g=mi(v,p,t,e,i),x=n.prevZ,w=n.nextZ;x&&x.z>=y&&w&&w.z<=g;){if(x.x>=d&&x.x<=v&&x.y>=m&&x.y<=p&&x!==r&&x!==s&&Jt(a,u,c,h,f,l,x.x,x.y)&&O(x.prev,x,x.next)>=0||(x=x.prevZ,w.x>=d&&w.x<=v&&w.y>=m&&w.y<=p&&w!==r&&w!==s&&Jt(a,u,c,h,f,l,w.x,w.y)&&O(w.prev,w,w.next)>=0))return!1;w=w.nextZ}for(;x&&x.z>=y;){if(x.x>=d&&x.x<=v&&x.y>=m&&x.y<=p&&x!==r&&x!==s&&Jt(a,u,c,h,f,l,x.x,x.y)&&O(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;w&&w.z<=g;){if(w.x>=d&&w.x<=v&&w.y>=m&&w.y<=p&&w!==r&&w!==s&&Jt(a,u,c,h,f,l,w.x,w.y)&&O(w.prev,w,w.next)>=0)return!1;w=w.nextZ}return!0}function Oc(n,t,e){var i=n;do{var r=i.prev,o=i.next.next;!vn(r,o)&&ls(r,i,i.next,o)&&De(r,o)&&De(o,r)&&(t.push(r.i/e|0),t.push(i.i/e|0),t.push(o.i/e|0),Pe(i),Pe(i.next),i=n=o),i=i.next}while(i!==n);return Nt(i)}function Nc(n,t,e,i,r,o){var s=n;do{for(var a=s.next.next;a!==s.prev;){if(s.i!==a.i&&Xc(s,a)){var c=us(s,a);s=Nt(s,s.next),c=Nt(c,c.next),Te(s,t,e,i,r,o,0),Te(c,t,e,i,r,o,0);return}a=a.next}s=s.next}while(s!==n)}function kc(n,t,e,i){var r=[],o,s,a,c,f;for(o=0,s=t.length;o<s;o++)a=t[o]*i,c=o<s-1?t[o+1]*i:n.length,f=cs(n,a,c,i,!1),f===f.next&&(f.steiner=!0),r.push(qc(f));for(r.sort($c),o=0;o<r.length;o++)e=Vc(r[o],e);return e}function $c(n,t){return n.x-t.x}function Vc(n,t){var e=Hc(n,t);if(!e)return t;var i=us(e,n);return Nt(i,i.next),Nt(e,e.next)}function Hc(n,t){var e=t,i=n.x,r=n.y,o=-1/0,s;do{if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){var a=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(a<=i&&a>o&&(o=a,s=e.x<e.next.x?e:e.next,a===i))return s}e=e.next}while(e!==t);if(!s)return null;var c=s,f=s.x,u=s.y,h=1/0,l;e=s;do i>=e.x&&e.x>=f&&i!==e.x&&Jt(r<u?i:o,r,f,u,r<u?o:i,r,e.x,e.y)&&(l=Math.abs(r-e.y)/(i-e.x),De(e,n)&&(l<h||l===h&&(e.x>s.x||e.x===s.x&&jc(s,e)))&&(s=e,h=l)),e=e.next;while(e!==c);return s}function jc(n,t){return O(n.prev,n,t.prev)<0&&O(t.next,n,n.next)<0}function Gc(n,t,e,i){var r=n;do r.z===0&&(r.z=mi(r.x,r.y,t,e,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Wc(r)}function Wc(n){var t,e,i,r,o,s,a,c,f=1;do{for(e=n,n=null,o=null,s=0;e;){for(s++,i=e,a=0,t=0;t<f&&(a++,i=i.nextZ,!!i);t++);for(c=f;a>0||c>0&&i;)a!==0&&(c===0||!i||e.z<=i.z)?(r=e,e=e.nextZ,a--):(r=i,i=i.nextZ,c--),o?o.nextZ=r:n=r,r.prevZ=o,o=r;e=i}o.nextZ=null,f*=2}while(s>1);return n}function mi(n,t,e,i,r){return n=(n-e)*r|0,t=(t-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function qc(n){var t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Jt(n,t,e,i,r,o,s,a){return(r-s)*(t-a)>=(n-s)*(o-a)&&(n-s)*(i-a)>=(e-s)*(t-a)&&(e-s)*(o-a)>=(r-s)*(i-a)}function Xc(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Zc(n,t)&&(De(n,t)&&De(t,n)&&Yc(n,t)&&(O(n.prev,n,t.prev)||O(n,t.prev,t))||vn(n,t)&&O(n.prev,n,n.next)>0&&O(t.prev,t,t.next)>0)}function O(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function vn(n,t){return n.x===t.x&&n.y===t.y}function ls(n,t,e,i){var r=Qe(O(n,t,e)),o=Qe(O(n,t,i)),s=Qe(O(e,i,n)),a=Qe(O(e,i,t));return!!(r!==o&&s!==a||r===0&&Ke(n,e,t)||o===0&&Ke(n,i,t)||s===0&&Ke(e,n,i)||a===0&&Ke(e,t,i))}function Ke(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Qe(n){return n>0?1:n<0?-1:0}function Zc(n,t){var e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&ls(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function De(n,t){return O(n.prev,n,n.next)<0?O(n,t,n.next)>=0&&O(n,n.prev,t)>=0:O(n,t,n.prev)<0||O(n,n.next,t)<0}function Yc(n,t){var e=n,i=!1,r=(n.x+t.x)/2,o=(n.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&r<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function us(n,t){var e=new yi(n.i,n.x,n.y),i=new yi(t.i,t.x,t.y),r=n.next,o=t.prev;return n.next=t,t.prev=n,e.next=r,r.prev=e,i.next=e,e.prev=i,o.next=i,i.prev=o,i}function Ur(n,t,e,i){var r=new yi(n,t,e);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Pe(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function yi(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}gn.deviation=function(n,t,e,i){var r=t&&t.length,o=r?t[0]*e:n.length,s=Math.abs(gi(n,0,o,e));if(r)for(var a=0,c=t.length;a<c;a++){var f=t[a]*e,u=a<c-1?t[a+1]*e:n.length;s-=Math.abs(gi(n,f,u,e))}var h=0;for(a=0;a<i.length;a+=3){var l=i[a]*e,d=i[a+1]*e,m=i[a+2]*e;h+=Math.abs((n[l]-n[m])*(n[d+1]-n[l+1])-(n[l]-n[d])*(n[m+1]-n[l+1]))}return s===0&&h===0?0:Math.abs((h-s)/s)};function gi(n,t,e,i){for(var r=0,o=t,s=e-i;o<e;o+=i)r+=(n[s]-n[o])*(n[o+1]+n[s+1]),s=o;return r}gn.flatten=function(n){for(var t=n[0][0].length,e={vertices:[],holes:[],dimensions:t},i=0,r=0;r<n.length;r++){for(var o=0;o<n[r].length;o++)for(var s=0;s<t;s++)e.vertices.push(n[r][o][s]);r>0&&(i+=n[r-1].length,e.holes.push(i))}return e};var Kc=Li.exports;const Qc=Rc(Kc);function Jc(n,t){var e=n%t,i=Math.floor(n/t);return[e,i]}function tl(n,t,e){for(var i=0,r=0;i<n.length;i+=t,r++)n.set(e([n[i],n[i+1]],r),i);return n}function el(n,t,e,i){var r=e.x-i.x,o=n.x-t.x,s=e.y-i.y,a=n.y-t.y,c=o*s-a*r;if(c==0)throw new Error("Number of intersection points is zero or infinity.");var f=n.x*t.y-n.y*t.x,u=e.x*i.y-e.y*i.x,h=(f*r-o*u)/c,l=(f*s-a*u)/c,d={x:h,y:l};return d}function nl(n){for(var t=0,e=0,i=n.length;e<i;e++){var r=n[e].x,o=n[e==n.length-1?0:e+1].y,s=n[e==n.length-1?0:e+1].x,a=n[e].y;t+=r*o*.5,t-=s*a*.5}return Math.abs(t)}function il([n,t,e]){return Math.abs((n.x*(t.y-e.y)+t.x*(e.y-n.y)+e.x*(n.y-t.y))/2)}function rl(n,t=8){const e=n.slice();let i=0;for(;e.length>t&&i<1e3;){i++;let r=1/0,o=null;for(let s=0;s<=e.length-1;s++){const a=e.length,c=[s,(s+1)%a,(s+2)%a,(s+3)%a],f=e[c[0]],u=e[c[1]],h=e[c[2]],l=e[c[3]];try{const d=el(f,u,h,l),m=il([d,u,h]);m<r&&(r=m,o={point:d,area:m,indicesToRemove:[c[1],c[2]]})}catch(d){console.log(d)}}if(o){const s=o.indicesToRemove[0],a=o.indicesToRemove[1];a>s?(e.splice(a,1),e.splice(s,1)):(e.splice(s,1),e.splice(a,1)),e.splice(Math.min(s,a),0,o.point)}}return e}var vi;(n=>{function t(r){let o=r.slice();return o.sort(n.POINT_COMPARATOR),n.makeHullPresorted(o)}n.makeHull=t;function e(r){if(r.length<=1)return r.slice();let o=[];for(let a=0;a<r.length;a++){const c=r[a];for(;o.length>=2;){const f=o[o.length-1],u=o[o.length-2];if((f.x-u.x)*(c.y-u.y)>=(f.y-u.y)*(c.x-u.x))o.pop();else break}o.push(c)}o.pop();let s=[];for(let a=r.length-1;a>=0;a--){const c=r[a];for(;s.length>=2;){const f=s[s.length-1],u=s[s.length-2];if((f.x-u.x)*(c.y-u.y)>=(f.y-u.y)*(c.x-u.x))s.pop();else break}s.push(c)}return s.pop(),o.length==1&&s.length==1&&o[0].x==s[0].x&&o[0].y==s[0].y?o:o.concat(s)}n.makeHullPresorted=e;function i(r,o){return r.x<o.x?-1:r.x>o.x?1:r.y<o.y?-1:r.y>o.y?1:0}n.POINT_COMPARATOR=i})(vi||(vi={}));function sl(n,t){const e=new Float32Array(n);for(let i=0;i<n;i++)e[i*3]=t[0],e[i*3+1]=t[1],e[i*3+2]=t[2];return e}function ol(n,t,e=()=>Math.random()){const i=t+1,r=new Float32Array(n.length/t*i);for(let o=0;o<n.length;o+=t){let s=o/t*i;r[s]=n[o],r[s+1]=n[o+1],r[s+2]=e(s)}return r}function al(n){const t=new Float32Array(n.length*2);for(let e=0;e<n.length;e++)t[e*2]=n[e].x,t[e*2+1]=n[e].y;return t}function cl(n,t,e){const i=[],r=n%(t*4)/4,o=Math.floor(n/(t*4)),s=o-1,a=o+1,c=r-1,f=r+1;return s>=0?i.push(s*t+r):i.push(null),a<e?i.push(a*t+r):i.push(null),c>=0?i.push(o*t+c):i.push(null),f<t?i.push(o*t+f):i.push(null),i}const ll=n=>(...t)=>t[3]/255>0,ul={threshold:.01,slices:[1,1],indices:[0,0],scale:1,filter:ll};class fl{constructor(t,e,i){R(this,"points",[]),R(this,"data",{areaReduction:0}),R(this,"debug",!0),R(this,"index"),R(this,"positions"),R(this,"uv"),R(this,"defaultSettings",ul),R(this,"settings"),this.vertices=i,this.settings={...this.defaultSettings,...e};const{slices:r}=this.settings,o=dl("bvc-image",t.width,t.height);this.points=this.getPoints(t,o);let s=vi.makeHull(this.points);const a=rl(s,i),c=a.map(l=>{let d=hl(l,[t.width,t.height],r);return d.y=-1*d.y,d}),{scale:f}=this.settings;this.data.areaReduction=1-nl(a)/(t.width/r[0]*(t.height/r[1]))*f;const u=al(c),h=Qc(u,null,2);this.positions=ol(u,2,()=>0),this.index=Uint32Array.from(h),this.uv=tl(u.slice(0),2,l=>{let d=l[0]+.5;d=d/this.settings.slices[0]+1/this.settings.slices[0]*this.settings.indices[0];let m=l[1]+.5;return m=m/this.settings.slices[1]+1-1/this.settings.slices[1]*(this.settings.indices[1]+1),[d,m]})}getImageData(t,e){const i=e.getContext("2d");i.drawImage(t,0,0);const[r,o]=this.settings.indices,[s,a]=this.settings.slices,c=e.width/s,f=e.height/a;return i.getImageData(c*r,f*o,c,f)}getPoints(t,e){const i=this.getImageData(t,e),r=i.data,o=[],s=this.settings.filter(this.settings.threshold),a=c=>c!==null&&s(r[c*4],r[c*4+1],r[c*4+2],r[c*4+3]);for(let c=0;c<r.length;c+=4)if(s(r[c+0],r[c+1],r[c+2],r[c+3])){if(cl(c,e.width,e.height).every(a))continue;const[f,u]=Jc(c/4,i.width);o.push({x:f,y:u})}return o}}const dl=(n="debug-canvas",t,e)=>{const i=document.querySelector(`#${n}`)||document.createElement("canvas");return i.id=n,i.width=t,i.height=e,i.id=n,i},hl=(n,t,e)=>({x:(n.x-t[0]/(2*e[0]))/(t[0]/e[0]),y:(n.y-t[1]/(2*e[1]))/(t[1]/e[1])}),pl={threshold:.01,slices:[1,1],indices:[1,1]};class ml extends Mt{constructor(t,e=8,i=.01,r=[1,1],o=[0,0]){super(),R(this,"image"),R(this,"vertices",8),R(this,"settings",pl),this.vertices=e,this.settings={...this.settings,threshold:i,slices:r,indices:o},this.image="image"in t?t.image:t,this.build()}build(){const t=new fl(this.image,this.settings,this.vertices),e=t.positions.length,i=new Z(t.index,1),r=new Z(t.positions,3),o=new Z(sl(e,[0,0,1]),3),s=new Z(t.uv,2);this.userData.reduction=t.data.areaReduction,this.setIndex(i),this.setAttribute("position",r),this.setAttribute("normal",o),this.setAttribute("uv",s)}}const iu=()=>new yl;class yl{constructor(){R(this,"animations"),this.animations=[]}add(t,e,i){const r={name:"",imageUrl:t};return Array.isArray(i)?r.multiAnimations=i:r.name=i,e.type=="rowColumn"&&(r.auto={type:"rowColumn",width:e.width,height:e.height}),e.type=="frameSize"&&(r.auto={type:"frameSize",width:e.width,height:e.height}),this.animations.push(r),this}async build(t={}){const e=new Bs,i={frames:[],animations:{},sheetSize:[0,0],animationLengths:[]};let r=new Es;const o=[];let s=0,a=0;for(const v of this.animations){const p=await e.loadAsync(v.imageUrl),y=p.width,g=p.height;s=Math.max(s,y),a+=g,o.push({img:p,w:y,h:g})}const c=document.createElement("canvas");c.width=s,c.height=a;const f=c.getContext("2d");let u=0;for(const{img:v,h:p}of o)f?.drawImage(v,0,u,v.width,v.height),u+=p;r=new qn(c),r.needsUpdate=!0;let h=0,l=0,d=0,m=64;for(const v of this.animations){const p=o[h];let y=0;if(v.auto){let g=0,x=0;v.auto.type=="frameSize"&&(x=p.w/v.auto.width,g=p.h/v.auto.height),v.auto.type=="rowColumn"&&(x=v.auto.width,g=v.auto.height);const w=p.w/x,S=p.h/g;y=g*x,v.multiAnimations||(i.animations[v.name]=[]);const _=new Map;for(let b=0;b<g;b++){d+=S;for(let A=0;A<x;A++){if(i.frames.push([p.w/x*A/s,1-d/a,w/s,S/a]),v.multiAnimations){const T=b*x+A;_.set(T,l)}else i.animations[v.name].push([l,1]);l++}}if(v.multiAnimations)for(const b of v.multiAnimations){i.animations[b.name]=[],i.animationLengths.push(b.frameRange[1]-b.frameRange[0]+1);for(let A=b.frameRange[0];A<=b.frameRange[1];A++)i.animations[b.name].push([_.get(A),1])}else i.animationLengths.push(y)}h++}if(r.matrixAutoUpdate=!1,r.generateMipmaps=!1,r.premultiplyAlpha=!1,r.wrapS=r.wrapT=Se,r.magFilter=r.minFilter=ht,r.colorSpace=Xn,i.sheetSize=[s,a],t.makeSlimGeometry){const v=document.createElement("canvas");v.width=m,v.height=m;const p=v.getContext("2d"),y=s/m,g=a/m;for(let S=0;S<y;S++)for(let _=0;_<g;_++){const b=S*m,A=_*m;p?.drawImage(c,b,A,m,m,0,0,m,m)}const x=new qn(v);x.magFilter=r.minFilter=ht,x.colorSpace=Xn;const w=new ml(x,t.slimOptions?t.slimOptions.vertices:8,t.slimOptions?t.slimOptions.alphaThreshold:0);return{spritesheet:i,texture:r,geometry:w}}return{spritesheet:i,texture:r}}}const gl=new kt,Je=new E,Rr=new V,me=new wi,Gn=new ee,vl=new Y,Wn=new E,xl=new E,xi=new WeakMap,gt=new WeakMap,fs=(n,t)=>(n.computeBoundsTree=Za,n.disposeBoundsTree=Ya,n.computeBoundsTree(t),()=>{n.disposeBoundsTree()}),ru=(n,t)=>{const e=fs(n.geometry,t);if(n.raycast=os,t.helper){const i=new Ee(n);n.add(i),gt.set(n,i)}return()=>{e(),n.geometry.disposeBoundsTree(),n.raycast=X.prototype.raycast,t.helper&&(gt.get(n)?.removeFromParent(),gt.delete(n))}},su=(n,t)=>{if(n.computeBoundsTree=Ka,n.disposeBoundsTree=Qa,n.addGeometry=(...e)=>{const i=en.prototype.addGeometry.call(n,...e);return n.computeBoundsTree(i,t),i},t.helper){const e=new Ee(n);n.add(e),gt.set(n,e)}return()=>{n.boundsTrees&&n.disposeBoundsTree(),n.addGeometry=en.prototype.addGeometry,n.raycast=en.prototype.raycast,t.helper&&(gt.get(n)?.removeFromParent(),gt.delete(n))}},ou=(n,t)=>{const e=new Mt,i=n.geometry.getAttribute("position"),r=new Uint32Array(i.count*3);for(let a=0,c=0,f=i.count;a<f;a+=1,c+=3)r[c+0]=r[c+1]=r[c+2]=a;e.setAttribute("position",i),e.setIndex(new Z(r,1));const o=fs(e,t),s=new X(e,gl);if(s.visible=!1,s.raycast=os,xi.set(n,s),n.raycast=wl,t.helper){const a=new Ee(s);gt.set(n,a),n.add(a,s)}return()=>{o(),n.raycast=Os.prototype.raycast,xi.delete(n),t.helper&&(gt.get(n)?.removeFromParent(),s.removeFromParent(),gt.delete(n))}};function wl(n,t){const e=xi.get(this);if(!e)return;const{threshold:i}=n.params.Points;if(this.geometry.boundingSphere===null&&this.geometry.computeBoundingSphere(),Gn.copy(this.geometry.boundingSphere).applyMatrix4(this.matrixWorld),Gn.radius+=i,!n.ray.intersectsSphere(Gn))return;const{geometry:r}=e,o=r.getIndex().array,s=r.getAttribute("position").array,a=this.matrixWorld.getMaxScaleOnAxis(),c=i/a,f=c*c,u=n.firstHitOnly===!0;let h=Number.POSITIVE_INFINITY;Rr.copy(this.matrixWorld).invert(),me.copy(n.ray).applyMatrix4(Rr),r.boundsTree?.shapecast({boundsTraverseOrder:u?l=>l.distanceToPoint(me.origin):void 0,intersectsBounds:(l,d,m)=>{if(m!==void 0&&m>h)return ur;const v=vl.copy(l).expandByScalar(c);return me.intersectsBox(v)?$o:ur},intersectsRange:(l,d)=>{const m=l+d;for(let v=l;v<m;v++){const p=r.boundsTree?.resolveTriangleIndex?.(v)??v,y=o[3*p],g=s[3*y],x=s[3*y+1],w=s[3*y+2];if(Je.set(g,x,w),me.distanceSqToPoint(Je)>f)continue;if(u){const T=me.origin.distanceTo(Je);if(T>=h)continue;h=T}Wn.copy(Je).applyMatrix4(this.matrixWorld);const _=n.ray.closestPointToPoint(Wn,xl),b=n.ray.origin.distanceTo(_);if(b<n.near||b>n.far){if(!u)continue;return!1}const A=Math.sqrt(n.ray.distanceSqToPoint(Wn));if(t.push({distance:b,distanceToRay:A,point:_.clone(),index:y,face:null,faceIndex:null,barycoord:null,object:this}),u)return!0}return!1}})}export{No as A,we as B,ts as C,Nl as D,Q as I,iu as J,te as M,et as O,Wl as P,rt as R,ko as S,jl as X,eu as Y,ao as a,to as b,Ol as c,tu as d,ru as e,su as f,ou as g,oo as h,Zl as i,Yl as j,Fl as k,ql as l,Ll as m,nu as n,Js as o,nn as p,jo as q,Ho as r,nt as s,Jl as t,eo as u,Xl as v,is as w,Kl as x,Ql as y};
