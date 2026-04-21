import"./disclose-version.DsnmJJEf.js";import"./legacy.CUIl4KX-.js";import{f as k,s as L,p as yt,a as gt,g as T,u as I,d as ee,b as Lt,bx as Fe,n as Le,L as Re,Z as as,P as hs,c as ls,r as cs}from"./runtime.D20saW8m.js";import{c as ot,f as Y,a as B}from"./template.DY3hUOmN.js";import{C as us}from"./Canvas.CVWzSuoq.js";import{T as U,l as ut,J as Ri,U as Ii,_ as Fi,D as yi,Q as ds,bW as Li,g6 as ms,O as Vi,eN as Ie,M as Ve,cs as Mi,m as At,ba as j,eF as fs,ar as ct,aE as gi,B as zt,G as ps,e as ys,fG as gs,b as Ji,u as vs,i as Ti,$ as xs,C as _s}from"./observe.svelte.BHiIsSLZ.js";import{u as Di,R as Ss,W as Ms}from"./createCollidersFromChildren.BP1Syjhr.js";import{D as ws}from"./Debug.gzP_wyNa.js";import{i as Gi}from"./if.KLqBe-U_.js";import{k as zs}from"./key.B3tbYqbZ.js";/* empty css                                                      */import{a as bs}from"./raycast.CxKKhBrm.js";import{S as Ts}from"./Stars.B1Ez1f3v.js";import{a as Xi,P as Os}from"./PortalTarget.B6ZHkX_9.js";import{e as qi,i as Yi}from"./each.CiIpPjm0.js";import{c as F}from"./svelte-component.C-qodc9T.js";import{A as He}from"./AutoColliders.DSIqRd41.js";import{C as Ps}from"./Collider.5d4Iz5CV.js";import{e as Je}from"./events.D9j-qKmp.js";import{s as Ze}from"./snippet.ZYtLD8wA.js";import{u as Ae}from"./useTask.svelte.Dq8lO6gS.js";import{T as Ns}from"./Text.CXVScSX4.js";import{a as As}from"./await.BumtOvqZ.js";import{p as Hi,r as Es}from"./props.BLzNsRtJ.js";import{a as Cs,s as Us}from"./store.Djq20Duq.js";import{u as Bs}from"./useThrelteUserContext.DfTM5ErO.js";import{i as Zi}from"./lifecycle.DPViJDaG.js";/* empty css                                                   */import"./index.XLhfXAo9.js";import"./create-subscriber.DvowZspB.js";import"./index-client.Ci3t-hyE.js";import"./useStage.DnSfKqbf.js";import"./branches.HJW2H96n.js";import"./injectPlugin.D55qsLoq.js";import"./transitions.Dv_byTtB.js";import"./loop.BGGTUj09.js";import"./render.CEiySluT.js";import"./utils.NcpWCyqV.js";import"./map.CeawGrax.js";import"./troika-three-text.esm.CXlYUiuC.js";var ks=Y("<!> <!>",1),Rs=Y("<!> <!>",1);function Is(c,t){var e=ot(),i=k(e);F(i,()=>U.Group,(s,r)=>{r(s,{get position(){return t.position},get rotation(){return t.rotation},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:0},children:(n,a)=>{var o=Rs(),h=k(o);F(h,()=>U.Group,(u,m)=>{m(u,{"position.y":.1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:1},children:(d,f)=>{Ps(d,{shape:"cuboid",args:[.4,.5,.4],sensor:!0,get onsensorenter(){return t.ongoal}})},$$slots:{default:!0}})});var l=L(h,2);He(l,{children:(u,m)=>{var d=ot(),f=k(d);F(f,()=>U.Mesh,(p,g)=>{g(p,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:2},children:(v,b)=>{var M=ks(),S=k(M);F(S,()=>U.BoxGeometry,(_,x)=>{x(_,{args:[1,1,1],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:3}})});var y=L(S,2);F(y,()=>U.MeshStandardMaterial,(_,x)=>{x(_,{color:"green",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:4}})}),B(v,M)},$$slots:{default:!0}})}),B(u,d)},$$slots:{default:!0}}),B(n,o)},$$slots:{default:!0}})}),B(c,e)}function Fs(c,t){yt(t,!0);const e=Di(),i=new ut,s=(r,n)=>(i.set(r.x,r.y,r.z),i.length()<n);Ae(()=>{s(t.rigidBody.angvel(),t.angularMax)&&s(t.rigidBody.linvel(),t.linearMax)&&t.onstatic()},{after:e.simulationTask}),gt()}var Ls=Y("<!> <!>",1),Vs=Y("<!> <!>",1),Js=Y("<!> <!>",1),Ds=Y("<!> <!> <!>",1);function Gs(c,t){yt(t,!0);let e=I(()=>t.color??"red");const i=new Ri,s=new ut,r=new Ii,n=new Fi;Ae(()=>{const u=new ut(t.origin.x,t.origin.y,t.origin.z);t.length?s.set(t.impulse.x,t.impulse.y,t.impulse.z).normalize().multiplyScalar(t.length):s.set(t.impulse.x,t.impulse.y,t.impulse.z),t.multiplier&&s.multiplyScalar(t.multiplier);const m=u.clone().add(s),d=[];d.push(u),d.push(m),i.setFromPoints(d),!(!r||!n)&&(r.position.copy(u),n.position.copy(m),n.lookAt(u))},{after:t.afterTask??[]});var a=Ds(),o=k(a);F(o,()=>U.Line,(u,m)=>{m(u,{renderOrder:1,frustumCulled:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:0},children:(d,f)=>{var p=Ls(),g=k(p);U(g,{get is(){return i},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:1}});var v=L(g,2);F(v,()=>U.LineBasicMaterial,(b,M)=>{M(b,{get color(){return T(e)},depthTest:!1,depthWrite:!1,get side(){return yi},transparent:!0,opacity:1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:2}})}),B(d,p)},$$slots:{default:!0}})});var h=L(o,2);U(h,{get is(){return r},frustumCulled:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:3},children:(u,m)=>{var d=Vs(),f=k(d);F(f,()=>U.SphereGeometry,(g,v)=>{v(g,{args:[.03],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:4}})});var p=L(f,2);F(p,()=>U.MeshBasicMaterial,(g,v)=>{v(g,{get color(){return T(e)},depthTest:!1,depthWrite:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:5}})}),B(u,d)},$$slots:{default:!0}});var l=L(h,2);U(l,{get is(){return n},frustumCulled:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:6},children:(u,m)=>{var d=ot(),f=k(d);F(f,()=>U.Mesh,(p,g)=>{g(p,{"rotation.x":-90*Math.PI/180,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:7},children:(v,b)=>{var M=Js(),S=k(M);F(S,()=>U.ConeGeometry,(_,x)=>{x(_,{args:[.03,.1],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:8}})});var y=L(S,2);F(y,()=>U.MeshBasicMaterial,(_,x)=>{x(_,{get color(){return T(e)},depthTest:!1,depthWrite:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:9}})}),B(v,M)},$$slots:{default:!0}})}),B(u,d)},$$slots:{default:!0}}),B(c,a),gt()}const Xs=(c,t)=>Math.random()*(t-c)+c;var qs=Y("<!> <!>",1),Ys=Y("<!> <!>",1);function Hs(c,t){yt(t,!0);const e=Di();let i=ee(!1);const s=5,r=new ut(Xs(t.min,t.max),-.5,0),n=new ut,a=new ut,o=new ut,h=new ds,l=Ae(p=>{if(!t.rigidBody)return;const g=t.rigidBody.rotation();h.set(g.x,g.y,g.z,g.w);const v=t.rigidBody.translation();a.set(v.x,v.y,v.z),o.copy(r),o.applyQuaternion(h),a.add(o),n.set(0,s*p,0),n.applyQuaternion(h),T(i)&&t.active&&t.rigidBody.applyImpulseAtPoint(n,a,!0)},{before:e.simulationTask}),u=I(()=>T(i)&&t.active);var m=Ys();Je("keydown",Fe,p=>{p.key===t.key&&Lt(i,!0)}),Je("keyup",Fe,p=>{p.key===t.key&&Lt(i,!1)});var d=k(m);F(d,()=>U.Group,(p,g)=>{g(p,{"position.y":-.5,get"position.x"(){return r.x},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Player.svelte",index:0},children:(v,b)=>{var M=qs(),S=k(M);Ns(S,{"position.y":-.1,get text(){return t.key},renderOrder:1e3});var y=L(S,2);Ze(y,()=>t.children??Le,()=>T(u)),B(v,M)},$$slots:{default:!0}})});var f=L(d,2);Xi(f,{id:"scene",children:(p,g)=>{{let v=I(()=>T(i)&&t.active?10:1);Gs(p,{get origin(){return a},get impulse(){return n},get afterTask(){return l.task},get multiplier(){return T(v)}})}},$$slots:{default:!0}}),B(c,m),gt()}const $=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Oi=1234567;const Et=Math.PI/180,$i=180/Math.PI;function Zs(){const c=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return($[c&255]+$[c>>8&255]+$[c>>16&255]+$[c>>24&255]+"-"+$[t&255]+$[t>>8&255]+"-"+$[t>>16&15|64]+$[t>>24&255]+"-"+$[e&63|128]+$[e>>8&255]+"-"+$[e>>16&255]+$[e>>24&255]+$[i&255]+$[i>>8&255]+$[i>>16&255]+$[i>>24&255]).toLowerCase()}function ft(c,t,e){return Math.max(t,Math.min(e,c))}function Wi(c,t){return(c%t+t)%t}function $s(c,t,e,i,s){return i+(c-t)*(s-i)/(e-t)}function Ws(c,t,e){return c!==t?(e-c)/(t-c):0}function Qi(c,t,e){return(1-e)*c+e*t}function Qs(c,t,e,i){return Qi(c,t,1-Math.exp(-e*i))}function Ks(c,t=1){return t-Math.abs(Wi(c,t*2)-t)}function js(c,t,e){return c<=t?0:c>=e?1:(c=(c-t)/(e-t),c*c*(3-2*c))}function tr(c,t,e){return c<=t?0:c>=e?1:(c=(c-t)/(e-t),c*c*c*(c*(c*6-15)+10))}function er(c,t){return c+Math.floor(Math.random()*(t-c+1))}function ir(c,t){return c+Math.random()*(t-c)}function sr(c){return c*(.5-Math.random())}function rr(c){c!==void 0&&(Oi=c);let t=Oi+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function nr(c){return c*Et}function or(c){return c*$i}function ar(c){return(c&c-1)===0&&c!==0}function hr(c){return Math.pow(2,Math.ceil(Math.log(c)/Math.LN2))}function lr(c){return Math.pow(2,Math.floor(Math.log(c)/Math.LN2))}function cr(c,t,e,i,s){const r=Math.cos,n=Math.sin,a=r(e/2),o=n(e/2),h=r((t+i)/2),l=n((t+i)/2),u=r((t-i)/2),m=n((t-i)/2),d=r((i-t)/2),f=n((i-t)/2);switch(s){case"XYX":c.set(a*l,o*u,o*m,a*h);break;case"YZY":c.set(o*m,a*l,o*u,a*h);break;case"ZXZ":c.set(o*u,o*m,a*l,a*h);break;case"XZX":c.set(a*l,o*f,o*d,a*h);break;case"YXY":c.set(o*d,a*l,o*f,a*h);break;case"ZYZ":c.set(o*f,o*d,a*l,a*h);break;default:console.warn("../math.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ur(c,t){switch(t.constructor){case Float32Array:return c;case Uint32Array:return c/4294967295;case Uint16Array:return c/65535;case Uint8Array:return c/255;case Int32Array:return Math.max(c/2147483647,-1);case Int16Array:return Math.max(c/32767,-1);case Int8Array:return Math.max(c/127,-1);default:throw new Error("Invalid component type.")}}function dr(c,t){switch(t.constructor){case Float32Array:return c;case Uint32Array:return Math.round(c*4294967295);case Uint16Array:return Math.round(c*65535);case Uint8Array:return Math.round(c*255);case Int32Array:return Math.round(c*2147483647);case Int16Array:return Math.round(c*32767);case Int8Array:return Math.round(c*127);default:throw new Error("Invalid component type.")}}const Xt={DEG2RAD:Et,RAD2DEG:$i,generateUUID:Zs,clamp:ft,euclideanModulo:Wi,mapLinear:$s,inverseLerp:Ws,lerp:Qi,damp:Qs,pingpong:Ks,smoothstep:js,smootherstep:tr,randInt:er,randFloat:ir,randFloatSpread:sr,seededRandom:rr,degToRad:nr,radToDeg:or,isPowerOfTwo:ar,ceilPowerOfTwo:hr,floorPowerOfTwo:lr,setQuaternionFromProperEuler:cr,normalize:dr,denormalize:ur};class V{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,n,a){let o=i[s+0],h=i[s+1],l=i[s+2],u=i[s+3];const m=r[n+0],d=r[n+1],f=r[n+2],p=r[n+3];if(a===0){t[e+0]=o,t[e+1]=h,t[e+2]=l,t[e+3]=u;return}if(a===1){t[e+0]=m,t[e+1]=d,t[e+2]=f,t[e+3]=p;return}if(u!==p||o!==m||h!==d||l!==f){let g=1-a;const v=o*m+h*d+l*f+u*p,b=v>=0?1:-1,M=1-v*v;if(M>Number.EPSILON){const y=Math.sqrt(M),_=Math.atan2(y,v*b);g=Math.sin(g*_)/y,a=Math.sin(a*_)/y}const S=a*b;if(o=o*g+m*S,h=h*g+d*S,l=l*g+f*S,u=u*g+p*S,g===1-a){const y=1/Math.sqrt(o*o+h*h+l*l+u*u);o*=y,h*=y,l*=y,u*=y}}t[e]=o,t[e+1]=h,t[e+2]=l,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,n){const a=i[s],o=i[s+1],h=i[s+2],l=i[s+3],u=r[n],m=r[n+1],d=r[n+2],f=r[n+3];return t[e]=a*f+l*u+o*d-h*m,t[e+1]=o*f+l*m+h*u-a*d,t[e+2]=h*f+l*d+a*m-o*u,t[e+3]=l*f-a*u-o*m-h*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new V(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,n=t._order,a=Math.cos,o=Math.sin,h=a(i/2),l=a(s/2),u=a(r/2),m=o(i/2),d=o(s/2),f=o(r/2);switch(n){case"XYZ":this._x=m*l*u+h*d*f,this._y=h*d*u-m*l*f,this._z=h*l*f+m*d*u,this._w=h*l*u-m*d*f;break;case"YXZ":this._x=m*l*u+h*d*f,this._y=h*d*u-m*l*f,this._z=h*l*f-m*d*u,this._w=h*l*u+m*d*f;break;case"ZXY":this._x=m*l*u-h*d*f,this._y=h*d*u+m*l*f,this._z=h*l*f+m*d*u,this._w=h*l*u-m*d*f;break;case"ZYX":this._x=m*l*u-h*d*f,this._y=h*d*u+m*l*f,this._z=h*l*f-m*d*u,this._w=h*l*u+m*d*f;break;case"YZX":this._x=m*l*u+h*d*f,this._y=h*d*u+m*l*f,this._z=h*l*f-m*d*u,this._w=h*l*u-m*d*f;break;case"XZY":this._x=m*l*u-h*d*f,this._y=h*d*u-m*l*f,this._z=h*l*f+m*d*u,this._w=h*l*u+m*d*f;break;default:console.warn("../math.Quaternion: .setFromEuler() encountered an unknown order: "+n)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],n=e[1],a=e[5],o=e[9],h=e[2],l=e[6],u=e[10],m=i+a+u;if(m>0){const d=.5/Math.sqrt(m+1);this._w=.25/d,this._x=(l-o)*d,this._y=(r-h)*d,this._z=(n-s)*d}else if(i>a&&i>u){const d=2*Math.sqrt(1+i-a-u);this._w=(l-o)/d,this._x=.25*d,this._y=(s+n)/d,this._z=(r+h)/d}else if(a>u){const d=2*Math.sqrt(1+a-i-u);this._w=(r-h)/d,this._x=(s+n)/d,this._y=.25*d,this._z=(o+l)/d}else{const d=2*Math.sqrt(1+u-i-a);this._w=(n-s)/d,this._x=(r+h)/d,this._y=(o+l)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ft(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,n=t._w,a=e._x,o=e._y,h=e._z,l=e._w;return this._x=i*l+n*a+s*h-r*o,this._y=s*l+n*o+r*a-i*h,this._z=r*l+n*h+i*o-s*a,this._w=n*l-i*a-s*o-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,n=this._w;let a=n*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=n,this._x=i,this._y=s,this._z=r,this;const o=1-a*a;if(o<=Number.EPSILON){const d=1-e;return this._w=d*n+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const h=Math.sqrt(o),l=Math.atan2(h,a),u=Math.sin((1-e)*l)/h,m=Math.sin(e*l)/h;return this._w=n*u+this._w*m,this._x=i*u+this._x*m,this._y=s*u+this._y*m,this._z=r*u+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(t=0,e=0,i=0){this.isVector3=!0,z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new z(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Pi.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Pi.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,n=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*n,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*n,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*n,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,n=t.y,a=t.z,o=t.w,h=2*(n*s-a*i),l=2*(a*e-r*s),u=2*(r*i-n*e);return this.x=e+o*h+n*u-a*l,this.y=i+o*l+a*h-r*u,this.z=s+o*u+r*l-n*h,this}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,n=e.x,a=e.y,o=e.z;return this.x=s*o-r*a,this.y=r*n-i*o,this.z=i*a-s*n,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return hi.copy(this).projectOnVector(t),this.sub(hi)}reflect(t){return this.sub(hi.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ft(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}abs(){return this.x=Math.abs(this.x),this.y=Math.abs(this.y),this.z=Math.abs(this.z),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const hi=new z,Pi=new V,Ce=2e3,Ni=2001;class Vt{constructor(t,e,i,s,r,n,a,o,h,l,u,m,d,f,p,g){this.isMatrix4=!0,Vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,n,a,o,h,l,u,m,d,f,p,g)}extractPosition(t){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(t)}multiplyToArray(t,e,i){return console.error("THREE.Matrix4: .multiplyToArray() has been removed."),this}setRotationFromQuaternion(t){return this.makeRotationFromQuaternion(t)}set(t,e,i,s,r,n,a,o,h,l,u,m,d,f,p,g){const v=this.elements;return v[0]=t,v[4]=e,v[8]=i,v[12]=s,v[1]=r,v[5]=n,v[9]=a,v[13]=o,v[2]=h,v[6]=l,v[10]=u,v[14]=m,v[3]=d,v[7]=f,v[11]=p,v[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Vt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/It.setFromMatrixColumn(t,0).length(),r=1/It.setFromMatrixColumn(t,1).length(),n=1/It.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*n,e[9]=i[9]*n,e[10]=i[10]*n,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,n=Math.cos(i),a=Math.sin(i),o=Math.cos(s),h=Math.sin(s),l=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const m=n*l,d=n*u,f=a*l,p=a*u;e[0]=o*l,e[4]=-o*u,e[8]=h,e[1]=d+f*h,e[5]=m-p*h,e[9]=-a*o,e[2]=p-m*h,e[6]=f+d*h,e[10]=n*o}else if(t.order==="YXZ"){const m=o*l,d=o*u,f=h*l,p=h*u;e[0]=m+p*a,e[4]=f*a-d,e[8]=n*h,e[1]=n*u,e[5]=n*l,e[9]=-a,e[2]=d*a-f,e[6]=p+m*a,e[10]=n*o}else if(t.order==="ZXY"){const m=o*l,d=o*u,f=h*l,p=h*u;e[0]=m-p*a,e[4]=-n*u,e[8]=f+d*a,e[1]=d+f*a,e[5]=n*l,e[9]=p-m*a,e[2]=-n*h,e[6]=a,e[10]=n*o}else if(t.order==="ZYX"){const m=n*l,d=n*u,f=a*l,p=a*u;e[0]=o*l,e[4]=f*h-d,e[8]=m*h+p,e[1]=o*u,e[5]=p*h+m,e[9]=d*h-f,e[2]=-h,e[6]=a*o,e[10]=n*o}else if(t.order==="YZX"){const m=n*o,d=n*h,f=a*o,p=a*h;e[0]=o*l,e[4]=p-m*u,e[8]=f*u+d,e[1]=u,e[5]=n*l,e[9]=-a*l,e[2]=-h*l,e[6]=d*u+f,e[10]=m-p*u}else if(t.order==="XZY"){const m=n*o,d=n*h,f=a*o,p=a*h;e[0]=o*l,e[4]=-u,e[8]=h*l,e[1]=m*u+p,e[5]=n*l,e[9]=d*u-f,e[2]=f*u-d,e[6]=a*l,e[10]=p*u+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(mr,t,fr)}lookAt(t,e,i){const s=this.elements;return it.subVectors(t,e),it.lengthSq()===0&&(it.z=1),it.normalize(),bt.crossVectors(i,it),bt.lengthSq()===0&&(Math.abs(i.z)===1?it.x+=1e-4:it.z+=1e-4,it.normalize(),bt.crossVectors(i,it)),bt.normalize(),Ue.crossVectors(it,bt),s[0]=bt.x,s[4]=Ue.x,s[8]=it.x,s[1]=bt.y,s[5]=Ue.y,s[9]=it.y,s[2]=bt.z,s[6]=Ue.z,s[10]=it.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,n=i[0],a=i[4],o=i[8],h=i[12],l=i[1],u=i[5],m=i[9],d=i[13],f=i[2],p=i[6],g=i[10],v=i[14],b=i[3],M=i[7],S=i[11],y=i[15],_=s[0],x=s[4],O=s[8],A=s[12],P=s[1],N=s[5],R=s[9],G=s[13],X=s[2],W=s[6],Q=s[10],K=s[14],at=s[3],ht=s[7],rt=s[11],nt=s[15];return r[0]=n*_+a*P+o*X+h*at,r[4]=n*x+a*N+o*W+h*ht,r[8]=n*O+a*R+o*Q+h*rt,r[12]=n*A+a*G+o*K+h*nt,r[1]=l*_+u*P+m*X+d*at,r[5]=l*x+u*N+m*W+d*ht,r[9]=l*O+u*R+m*Q+d*rt,r[13]=l*A+u*G+m*K+d*nt,r[2]=f*_+p*P+g*X+v*at,r[6]=f*x+p*N+g*W+v*ht,r[10]=f*O+p*R+g*Q+v*rt,r[14]=f*A+p*G+g*K+v*nt,r[3]=b*_+M*P+S*X+y*at,r[7]=b*x+M*N+S*W+y*ht,r[11]=b*O+M*R+S*Q+y*rt,r[15]=b*A+M*G+S*K+y*nt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],n=t[1],a=t[5],o=t[9],h=t[13],l=t[2],u=t[6],m=t[10],d=t[14],f=t[3],p=t[7],g=t[11],v=t[15];return f*(+r*o*u-s*h*u-r*a*m+i*h*m+s*a*d-i*o*d)+p*(+e*o*d-e*h*m+r*n*m-s*n*d+s*h*l-r*o*l)+g*(+e*h*u-e*a*d-r*n*u+i*n*d+r*a*l-i*h*l)+v*(-s*a*l-e*o*u+e*a*m+s*n*u-i*n*m+i*o*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],n=t[4],a=t[5],o=t[6],h=t[7],l=t[8],u=t[9],m=t[10],d=t[11],f=t[12],p=t[13],g=t[14],v=t[15],b=u*g*h-p*m*h+p*o*d-a*g*d-u*o*v+a*m*v,M=f*m*h-l*g*h-f*o*d+n*g*d+l*o*v-n*m*v,S=l*p*h-f*u*h+f*a*d-n*p*d-l*a*v+n*u*v,y=f*u*o-l*p*o-f*a*m+n*p*m+l*a*g-n*u*g,_=e*b+i*M+s*S+r*y;if(_===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const x=1/_;return t[0]=b*x,t[1]=(p*m*r-u*g*r-p*s*d+i*g*d+u*s*v-i*m*v)*x,t[2]=(a*g*r-p*o*r+p*s*h-i*g*h-a*s*v+i*o*v)*x,t[3]=(u*o*r-a*m*r-u*s*h+i*m*h+a*s*d-i*o*d)*x,t[4]=M*x,t[5]=(l*g*r-f*m*r+f*s*d-e*g*d-l*s*v+e*m*v)*x,t[6]=(f*o*r-n*g*r-f*s*h+e*g*h+n*s*v-e*o*v)*x,t[7]=(n*m*r-l*o*r+l*s*h-e*m*h-n*s*d+e*o*d)*x,t[8]=S*x,t[9]=(f*u*r-l*p*r-f*i*d+e*p*d+l*i*v-e*u*v)*x,t[10]=(n*p*r-f*a*r+f*i*h-e*p*h-n*i*v+e*a*v)*x,t[11]=(l*a*r-n*u*r-l*i*h+e*u*h+n*i*d-e*a*d)*x,t[12]=y*x,t[13]=(l*p*s-f*u*s+f*i*m-e*p*m-l*i*g+e*u*g)*x,t[14]=(f*a*s-n*p*s-f*i*o+e*p*o+n*i*g-e*a*g)*x,t[15]=(n*u*s-l*a*s+l*i*o-e*u*o-n*i*m+e*a*m)*x,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,n=t.x,a=t.y,o=t.z,h=r*n,l=r*a;return this.set(h*n+i,h*a-s*o,h*o+s*a,0,h*a+s*o,l*a+i,l*o-s*n,0,h*o-s*a,l*o+s*n,r*o*o+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,n){return this.set(1,i,r,0,t,1,n,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,n=e._y,a=e._z,o=e._w,h=r+r,l=n+n,u=a+a,m=r*h,d=r*l,f=r*u,p=n*l,g=n*u,v=a*u,b=o*h,M=o*l,S=o*u,y=i.x,_=i.y,x=i.z;return s[0]=(1-(p+v))*y,s[1]=(d+S)*y,s[2]=(f-M)*y,s[3]=0,s[4]=(d-S)*_,s[5]=(1-(m+v))*_,s[6]=(g+b)*_,s[7]=0,s[8]=(f+M)*x,s[9]=(g-b)*x,s[10]=(1-(m+p))*x,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=It.set(s[0],s[1],s[2]).length();const n=It.set(s[4],s[5],s[6]).length(),a=It.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],lt.copy(this);const h=1/r,l=1/n,u=1/a;return lt.elements[0]*=h,lt.elements[1]*=h,lt.elements[2]*=h,lt.elements[4]*=l,lt.elements[5]*=l,lt.elements[6]*=l,lt.elements[8]*=u,lt.elements[9]*=u,lt.elements[10]*=u,e.setFromRotationMatrix(lt),i.x=r,i.y=n,i.z=a,this}makePerspective(t,e,i,s,r,n,a=Ce){const o=this.elements,h=2*r/(e-t),l=2*r/(i-s),u=(e+t)/(e-t),m=(i+s)/(i-s);let d,f;if(a===Ce)d=-(n+r)/(n-r),f=-2*n*r/(n-r);else if(a===Ni)d=-n/(n-r),f=-n*r/(n-r);else throw new Error("Matrix4.makePerspective(): Invalid coordinate system: "+a);return o[0]=h,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=l,o[9]=m,o[13]=0,o[2]=0,o[6]=0,o[10]=d,o[14]=f,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,i,s,r,n,a=Ce){const o=this.elements,h=1/(e-t),l=1/(i-s),u=1/(n-r),m=(e+t)*h,d=(i+s)*l;let f,p;if(a===Ce)f=(n+r)*u,p=-2*u;else if(a===Ni)f=r*u,p=-1*u;else throw new Error("../math.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return o[0]=2*h,o[4]=0,o[8]=0,o[12]=-m,o[1]=0,o[5]=2*l,o[9]=0,o[13]=-d,o[2]=0,o[6]=0,o[10]=p,o[14]=-f,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const It=new z,lt=new Vt,mr=new z(0,0,0),fr=new z(1,1,1),bt=new z,Ue=new z,it=new z,Ai=new Vt,Ei=new V;class ie{constructor(t=0,e=0,i=0,s=ie.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new ie(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],n=s[4],a=s[8],o=s[1],h=s[5],l=s[9],u=s[2],m=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-l,d),this._z=Math.atan2(-n,r)):(this._x=Math.atan2(m,h),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(o,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ft(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-n,h)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-ft(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(m,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-n,h));break;case"YZX":this._z=Math.asin(ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ft(n,-1,1)),Math.abs(n)<.9999999?(this._x=Math.atan2(m,h),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-l,d),this._y=0);break;default:console.warn("../math.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Ai.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ai,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ei.setFromEuler(this),this.setFromQuaternion(Ei,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(t){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ie.DEFAULT_ORDER="XYZ";class Jt{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new Jt(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ft(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,n=this.y-t.y;return this.x=r*i-n*s+t.x,this.y=r*s+n*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}Jt.isVector2=!0;class et{constructor(t=0,e=0,i=0,s=1){et.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new et(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,n=t.elements;return this.x=n[0]*e+n[4]*i+n[8]*s+n[12]*r,this.y=n[1]*e+n[5]*i+n[9]*s+n[13]*r,this.z=n[2]*e+n[6]*i+n[10]*s+n[14]*r,this.w=n[3]*e+n[7]*i+n[11]*s+n[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const o=t.elements,h=o[0],l=o[4],u=o[8],m=o[1],d=o[5],f=o[9],p=o[2],g=o[6],v=o[10];if(Math.abs(l-m)<.01&&Math.abs(u-p)<.01&&Math.abs(f-g)<.01){if(Math.abs(l+m)<.1&&Math.abs(u+p)<.1&&Math.abs(f+g)<.1&&Math.abs(h+d+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(h+1)/2,S=(d+1)/2,y=(v+1)/2,_=(l+m)/4,x=(u+p)/4,O=(f+g)/4;return M>S&&M>y?M<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(M),s=_/i,r=x/i):S>y?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=_/s,r=O/s):y<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),i=x/r,s=O/r),this.set(i,s,r,e),this}let b=Math.sqrt((g-f)*(g-f)+(u-p)*(u-p)+(m-l)*(m-l));return Math.abs(b)<.001&&(b=1),this.x=(g-f)/b,this.y=(u-p)/b,this.z=(m-l)/b,this.w=Math.acos((h+d+v-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pt{constructor(t,e,i,s,r,n,a,o,h){pt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,n,a,o,h)}set(t,e,i,s,r,n,a,o,h){const l=this.elements;return l[0]=t,l[1]=s,l[2]=a,l[3]=e,l[4]=r,l[5]=o,l[6]=i,l[7]=n,l[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,n=i[0],a=i[3],o=i[6],h=i[1],l=i[4],u=i[7],m=i[2],d=i[5],f=i[8],p=s[0],g=s[3],v=s[6],b=s[1],M=s[4],S=s[7],y=s[2],_=s[5],x=s[8];return r[0]=n*p+a*b+o*y,r[3]=n*g+a*M+o*_,r[6]=n*v+a*S+o*x,r[1]=h*p+l*b+u*y,r[4]=h*g+l*M+u*_,r[7]=h*v+l*S+u*x,r[2]=m*p+d*b+f*y,r[5]=m*g+d*M+f*_,r[8]=m*v+d*S+f*x,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],n=t[4],a=t[5],o=t[6],h=t[7],l=t[8];return e*n*l-e*a*h-i*r*l+i*a*o+s*r*h-s*n*o}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],n=t[4],a=t[5],o=t[6],h=t[7],l=t[8],u=l*n-a*h,m=a*o-l*r,d=h*r-n*o,f=e*u+i*m+s*d;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/f;return t[0]=u*p,t[1]=(s*h-l*i)*p,t[2]=(a*i-s*n)*p,t[3]=m*p,t[4]=(l*e-s*o)*p,t[5]=(s*r-a*e)*p,t[6]=d*p,t[7]=(i*o-h*e)*p,t[8]=(n*e-i*r)*p,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,n,a){const o=Math.cos(r),h=Math.sin(r);return this.set(i*o,i*h,-i*(o*n+h*a)+n+t,-s*h,s*o,-s*(-h*n+o*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(li.makeScale(t,e)),this}rotate(t){return this.premultiply(li.makeRotation(-t)),this}translate(t,e){return this.premultiply(li.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new pt().fromArray(this.elements)}}const li=new pt;var tt;(function(c){c[c.Random=0]="Random",c[c.Loop=1]="Loop",c[c.PingPong=2]="PingPong",c[c.Burst=3]="Burst"})(tt||(tt={}));function Ee(c,t,e,i){let s;switch(tt.Random===c?t=Math.random():tt.Burst===c&&i.isBursting&&(t=i.burstParticleIndex/i.burstParticleCount),e>0?s=Math.floor(t/e)*e:s=t,c){case tt.Loop:s=s%1;break;case tt.PingPong:s=Math.abs(s%2-1);break}return s}class _t{constructor(t,e,i,s){this.p=[t,e,i,s]}genValue(t){const e=t*t,i=t*t*t,s=1-t,r=s*s,n=r*s;return this.p[0]*n+this.p[1]*r*t*3+this.p[2]*s*e*3+this.p[3]*i}derivativeCoefficients(t){const e=[];for(let i=t,s=i.length-1;s>0;s--){const r=[];for(let n=0;n<s;n++){const a=s*(i[n+1]-i[n]);r.push(a)}e.push(r),i=r}return e}getSlope(t){const e=this.derivativeCoefficients(this.p)[0],i=1-t,s=i*i,r=i*t*2,n=t*t;return s*e[0]+r*e[1]+n*e[2]}controlCurve(t,e){this.p[1]=t/3+this.p[0],this.p[2]=this.p[3]-e/3}hull(t){let e=this.p,i=[],s,r=0,n=0,a=0;const o=[];for(o[r++]=e[0],o[r++]=e[1],o[r++]=e[2],o[r++]=e[3];e.length>1;){for(i=[],n=0,a=e.length-1;n<a;n++)s=t*e[n]+(1-t)*e[n+1],o[r++]=s,i.push(s);e=i}return o}split(t){const e=this.hull(t);return{left:new _t(e[0],e[4],e[7],e[9]),right:new _t(e[9],e[8],e[6],e[3]),span:e}}clone(){return new _t(this.p[0],this.p[1],this.p[2],this.p[3])}toJSON(){return{p0:this.p[0],p1:this.p[1],p2:this.p[2],p3:this.p[3]}}static fromJSON(t){return new _t(t.p0,t.p1,t.p2,t.p3)}}const se=c=>({r:c.x,g:c.y,b:c.z,a:c.w}),re=c=>new et(c.r,c.g,c.b,c.a),pr=(c,t)=>{switch(t){case"Vector3":return new z(c.x,c.y,c.z);case"Vector4":return new et(c.x,c.y,c.z,c.w);case"Color":return new z(c.r,c.g,c.b);case"Number":return c;default:return c}},yr=(c,t)=>{switch(t){case"Vector3":return{x:c.x,y:c.y,z:c.z};case"Vector4":return{x:c.x,y:c.y,z:c.z,w:c.w};case"Color":return{r:c.x,g:c.y,b:c.z};case"Number":return c;default:return c}};class De{constructor(t,e){this.a=t,this.b=e,this.type="value"}startGen(t){}genColor(t,e){const i=Math.random();return e.copy(this.a).lerp(this.b,i)}toJSON(){return{type:"RandomColor",a:se(this.a),b:se(this.b)}}static fromJSON(t){return new De(re(t.a),re(t.b))}clone(){return new De(this.a.clone(),this.b.clone())}}class Dt{constructor(t,e){this.a=t,this.b=e,this.indexCount=-1,this.type="value"}startGen(t){this.indexCount=t.length,t.push(Math.random())}genColor(t,e){return this.indexCount===-1&&this.startGen(t),e.copy(this.a).lerp(this.b,t[this.indexCount])}toJSON(){return{type:"ColorRange",a:se(this.a),b:se(this.b)}}static fromJSON(t){return new Dt(re(t.a),re(t.b))}clone(){return new Dt(this.a.clone(),this.b.clone())}}class Ot{constructor(t,e){this.subType=e,this.type="function",this.keys=t}findKey(t){let e=0,i=0,s=this.keys.length-1;for(;i+1<s;)if(e=Math.floor((i+s)/2),t<this.getStartX(e))s=e-1;else if(t>this.getEndX(e))i=e+1;else return e;for(let r=i;r<=s;r++)if(t>=this.getStartX(r)&&t<=this.getEndX(r))return r;return-1}getStartX(t){return this.keys[t][1]}getEndX(t){return t+1<this.keys.length?this.keys[t+1][1]:1}genValue(t,e){const i=this.findKey(e);return this.subType==="Number"?i===-1?this.keys[0][0]:i+1>=this.keys.length?this.keys[this.keys.length-1][0]:(this.keys[i+1][0]-this.keys[i][0])*((e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))+this.keys[i][0]:i===-1?t.copy(this.keys[0][0]):i+1>=this.keys.length?t.copy(this.keys[this.keys.length-1][0]):t.copy(this.keys[i][0]).lerp(this.keys[i+1][0],(e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))}toJSON(){return this.keys[0][0].constructor.name,{type:"CLinearFunction",subType:this.subType,keys:this.keys.map(([t,e])=>({value:yr(t,this.subType),pos:e}))}}static fromJSON(t){return new Ot(t.keys.map(e=>[pr(e.value,t.subType),e.pos]),t.subType)}clone(){return this.subType==="Number"?new Ot(this.keys.map(([t,e])=>[t,e]),this.subType):new Ot(this.keys.map(([t,e])=>[t.clone(),e]),this.subType)}}const Be=new z;class St{constructor(t=[[new z(0,0,0),0],[new z(1,1,1),0]],e=[[1,0],[1,1]]){this.type="function",this.color=new Ot(t,"Color"),this.alpha=new Ot(e,"Number")}genColor(t,e,i){return this.color.genValue(Be,i),e.set(Be.x,Be.y,Be.z,this.alpha.genValue(1,i))}toJSON(){return{type:"Gradient",color:this.color.toJSON(),alpha:this.alpha.toJSON()}}static fromJSON(t){if(t.functions){const e=t.functions.map(i=>[Dt.fromJSON(i.function).a,i.start]);return t.functions.length>0&&e.push([Dt.fromJSON(t.functions[t.functions.length-1].function).b,1]),new St(e.map(i=>[new z(i[0].x,i[0].y,i[0].z),i[1]]),e.map(i=>[i[0].w,i[1]]))}else{const e=new St;return e.alpha=Ot.fromJSON(t.alpha),e.color=Ot.fromJSON(t.color),e}}clone(){const t=new St;return t.alpha=this.alpha.clone(),t.color=this.color.clone(),t}startGen(t){}}const ci=new et;class Ge{constructor(t,e){this.indexCount=0,this.type="function",this.gradient1=t,this.gradient2=e}startGen(t){this.indexCount=t.length,t.push(Math.random())}genColor(t,e,i){return this.gradient1.genColor(t,e,i),this.gradient2.genColor(t,ci,i),t&&t[this.indexCount]!==void 0?e.lerp(ci,t[this.indexCount]):e.lerp(ci,Math.random()),e}toJSON(){return{type:"RandomColorBetweenGradient",gradient1:this.gradient1.toJSON(),gradient2:this.gradient2.toJSON()}}static fromJSON(t){return new Ge(St.fromJSON(t.gradient1),St.fromJSON(t.gradient2))}clone(){return new Ge(this.gradient1.clone(),this.gradient2.clone())}}class Pt{constructor(t){this.color=t,this.type="value"}startGen(t){}genColor(t,e){return e.copy(this.color)}toJSON(){return{type:"ConstantColor",color:se(this.color)}}static fromJSON(t){return new Pt(re(t.color))}clone(){return new Pt(this.color.clone())}}function wi(c){switch(c.type){case"ConstantColor":return Pt.fromJSON(c);case"ColorRange":return Dt.fromJSON(c);case"RandomColor":return De.fromJSON(c);case"Gradient":return St.fromJSON(c);case"RandomColorBetweenGradient":return Ge.fromJSON(c);default:return new Pt(new et(1,1,1,1))}}class C{constructor(t){this.value=t,this.type="value"}startGen(t){}genValue(t){return this.value}toJSON(){return{type:"ConstantValue",value:this.value}}static fromJSON(t){return new C(t.value)}clone(){return new C(this.value)}}class st{constructor(t,e){this.a=t,this.b=e,this.indexCount=-1,this.type="value"}startGen(t){this.indexCount=t.length,t.push(Math.random())}genValue(t){return this.indexCount===-1&&this.startGen(t),Xt.lerp(this.a,this.b,t[this.indexCount])}toJSON(){return{type:"IntervalValue",a:this.a,b:this.b}}static fromJSON(t){return new st(t.a,t.b)}clone(){return new st(this.a,this.b)}}class gr{constructor(){this.functions=new Array}findFunction(t){let e=0,i=0,s=this.functions.length-1;for(;i+1<s;)if(e=Math.floor((i+s)/2),t<this.getStartX(e))s=e-1;else if(t>this.getEndX(e))i=e+1;else return e;for(let r=i;r<=s;r++)if(t>=this.functions[r][1]&&t<=this.getEndX(r))return r;return-1}getStartX(t){return this.functions[t][1]}setStartX(t,e){t>0&&(this.functions[t][1]=e)}getEndX(t){return t+1<this.functions.length?this.functions[t+1][1]:1}setEndX(t,e){t+1<this.functions.length&&(this.functions[t+1][1]=e)}insertFunction(t,e){const i=this.findFunction(t);this.functions.splice(i+1,0,[e,t])}removeFunction(t){return this.functions.splice(t,1)[0][0]}getFunction(t){return this.functions[t][0]}setFunction(t,e){this.functions[t][0]=e}get numOfFunctions(){return this.functions.length}}class Ct extends gr{constructor(t=[[new _t(0,1/3,1/3*2,1),0]]){super(),this.type="function",this.functions=t}genValue(t,e=0){const i=this.findFunction(e);return i===-1?0:this.functions[i][0].genValue((e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))}toSVG(t,e){if(e<1)return"";let i=["M",0,this.functions[0][0].p[0]].join(" ");for(let s=1/e;s<=1;s+=1/e)i=[i,"L",s*t,this.genValue(void 0,s)].join(" ");return i}toJSON(){return{type:"PiecewiseBezier",functions:this.functions.map(([t,e])=>({function:t.toJSON(),start:e}))}}static fromJSON(t){return new Ct(t.functions.map(e=>[_t.fromJSON(e.function),e.start]))}clone(){return new Ct(this.functions.map(([t,e])=>[t.clone(),e]))}startGen(t){}}function E(c){switch(c.type){case"ConstantValue":return C.fromJSON(c);case"IntervalValue":return st.fromJSON(c);case"PiecewiseBezier":return Ct.fromJSON(c);default:return new C(0)}}class ne{constructor(){this.indexCount=0,this.type="rotation"}startGen(t){this.indexCount=t.length,t.push(new V);let e,i,s,r,n,a;do e=Math.random()*2-1,i=Math.random()*2-1,s=e*e+i*i;while(s>1);do r=Math.random()*2-1,n=Math.random()*2-1,a=r*r+n*n;while(a>1);const o=Math.sqrt((1-s)/a);t[this.indexCount].set(e,i,o*r,o*n)}genValue(t,e,i,s){return this.indexCount===-1&&this.startGen(t),e.copy(t[this.indexCount]),e}toJSON(){return{type:"RandomQuat"}}static fromJSON(t){return new ne}clone(){return new ne}}class oe{constructor(t,e){this.axis=t,this.angle=e,this.type="rotation"}startGen(t){this.angle.startGen(t)}genValue(t,e,i,s){return e.setFromAxisAngle(this.axis,this.angle.genValue(t,s)*i)}toJSON(){return{type:"AxisAngle",axis:{x:this.axis.x,y:this.axis.y,z:this.axis.z},angle:this.angle.toJSON()}}static fromJSON(t){return new oe(new z(t.axis.x,t.axis.y,t.axis.z),E(t.angle))}clone(){return new oe(this.axis.clone(),this.angle.clone())}}class Xe{constructor(t,e,i,s){this.angleX=t,this.angleY=e,this.angleZ=i,this.type="rotation",this.eular=new ie(0,0,0,s)}startGen(t){this.angleX.startGen(t),this.angleY.startGen(t),this.angleZ.startGen(t)}genValue(t,e,i,s){return this.eular.set(this.angleX.genValue(t,s)*i,this.angleY.genValue(t,s)*i,this.angleZ.genValue(t,s)*i),e.setFromEuler(this.eular)}toJSON(){return{type:"Euler",angleX:this.angleX.toJSON(),angleY:this.angleY.toJSON(),angleZ:this.angleZ.toJSON(),eulerOrder:this.eular.order}}static fromJSON(t){return new Xe(E(t.angleX),E(t.angleY),E(t.angleZ),t.eulerOrder)}clone(){return new Xe(this.angleX,this.angleY,this.angleZ,this.eular.order)}}function Ki(c){switch(c.type){case"AxisAngle":return oe.fromJSON(c);case"Euler":return Xe.fromJSON(c);case"RandomQuat":return ne.fromJSON(c);default:return new ne}}class Ut{constructor(t,e,i){this.x=t,this.y=e,this.z=i,this.type="vec3function"}startGen(t){this.x.startGen(t),this.y.startGen(t),this.z.startGen(t)}genValue(t,e,i){return e.set(this.x.genValue(t,i),this.y.genValue(t,i),this.z.genValue(t,i))}toJSON(){return{type:"Vector3Function",x:this.x.toJSON(),y:this.y.toJSON(),z:this.z.toJSON()}}static fromJSON(t){return new Ut(E(t.x),E(t.y),E(t.z))}clone(){return new Ut(this.x,this.y,this.z)}}function vr(c){switch(c.type){case"Vector3Function":return Ut.fromJSON(c);default:return new Ut(new C(0),new C(0),new C(0))}}function qe(c){switch(c.type){case"ConstantValue":case"IntervalValue":case"PiecewiseBezier":return E(c);case"AxisAngle":case"RandomQuat":case"Euler":return Ki(c);case"Vector3Function":return vr(c);default:return new C(0)}}class Bt{constructor(t={}){var e,i,s,r,n,a,o;this.type="cone",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.angle=(r=t.angle)!==null&&r!==void 0?r:Math.PI/6,this.mode=(n=t.mode)!==null&&n!==void 0?n:tt.Random,this.spread=(a=t.spread)!==null&&a!==void 0?a:0,this.speed=(o=t.speed)!==null&&o!==void 0?o:new C(1),this.memory=[]}update(t,e){tt.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Ee(this.mode,this.currentValue,this.spread,e),s=Xt.lerp(1-this.thickness,1,Math.random()),r=i*this.arc,n=Math.sqrt(s),a=Math.sin(r),o=Math.cos(r);t.position.x=n*o,t.position.y=n*a,t.position.z=0;const h=this.angle*n;t.velocity.set(0,0,Math.cos(h)).addScaledVector(t.position,Math.sin(h)).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius)}toJSON(){return{type:"cone",radius:this.radius,arc:this.arc,thickness:this.thickness,angle:this.angle,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new Bt({radius:t.radius,arc:t.arc,thickness:t.thickness,angle:t.angle,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new Bt({radius:this.radius,arc:this.arc,thickness:this.thickness,angle:this.angle,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class ae{constructor(t={}){var e,i,s,r,n,a;this.type="circle",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.mode=(r=t.mode)!==null&&r!==void 0?r:tt.Random,this.spread=(n=t.spread)!==null&&n!==void 0?n:0,this.speed=(a=t.speed)!==null&&a!==void 0?a:new C(1),this.memory=[]}update(t,e){this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e}initialize(t,e){const i=Ee(this.mode,this.currentValue,this.spread,e),s=Xt.lerp(1-this.thickness,1,Math.random()),r=i*this.arc;t.position.x=Math.cos(r),t.position.y=Math.sin(r),t.position.z=0,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*s)}toJSON(){return{type:"circle",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new ae({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new ae({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class he{constructor(t={}){var e,i,s,r,n,a,o;this.type="donut",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.donutRadius=(r=t.donutRadius)!==null&&r!==void 0?r:this.radius*.2,this.mode=(n=t.mode)!==null&&n!==void 0?n:tt.Random,this.spread=(a=t.spread)!==null&&a!==void 0?a:0,this.speed=(o=t.speed)!==null&&o!==void 0?o:new C(1),this.memory=[]}update(t,e){tt.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Ee(this.mode,this.currentValue,this.spread,e),s=Math.random(),r=Xt.lerp(1-this.thickness,1,Math.random()),n=i*this.arc,a=s*Math.PI*2,o=Math.sin(n),h=Math.cos(n);t.position.x=this.radius*h,t.position.y=this.radius*o,t.position.z=0,t.velocity.z=this.donutRadius*r*Math.sin(a),t.velocity.x=this.donutRadius*r*Math.cos(a)*h,t.velocity.y=this.donutRadius*r*Math.cos(a)*o,t.position.add(t.velocity),t.velocity.normalize().multiplyScalar(t.startSpeed)}toJSON(){return{type:"donut",radius:this.radius,arc:this.arc,thickness:this.thickness,donutRadius:this.donutRadius,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new he({radius:t.radius,arc:t.arc,thickness:t.thickness,donutRadius:t.donutRadius,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new he({radius:this.radius,arc:this.arc,thickness:this.thickness,donutRadius:this.donutRadius,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class le{constructor(){this.type="point"}update(t,e){}initialize(t){const e=Math.random(),i=Math.random(),s=e*Math.PI*2,r=Math.acos(2*i-1),n=Math.cbrt(Math.random()),a=Math.sin(s),o=Math.cos(s),h=Math.sin(r),l=Math.cos(r);t.velocity.x=n*h*o,t.velocity.y=n*h*a,t.velocity.z=n*l,t.velocity.multiplyScalar(t.startSpeed),t.position.setScalar(0)}toJSON(){return{type:"point"}}static fromJSON(t){return new le}clone(){return new le}}class Gt{constructor(t={}){var e,i,s,r,n,a;this.type="sphere",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.mode=(r=t.mode)!==null&&r!==void 0?r:tt.Random,this.spread=(n=t.spread)!==null&&n!==void 0?n:0,this.speed=(a=t.speed)!==null&&a!==void 0?a:new C(1),this.memory=[]}update(t,e){tt.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Ee(this.mode,this.currentValue,this.spread,e),s=Math.random(),r=Xt.lerp(1-this.thickness,1,Math.random()),n=i*this.arc,a=Math.acos(2*s-1),o=Math.sin(n),h=Math.cos(n),l=Math.sin(a),u=Math.cos(a);t.position.x=l*h,t.position.y=l*o,t.position.z=u,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*r)}toJSON(){return{type:"sphere",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new Gt({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new Gt({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class ce{constructor(t={}){var e,i,s,r,n,a;this.type="sphere",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.mode=(r=t.mode)!==null&&r!==void 0?r:tt.Random,this.spread=(n=t.spread)!==null&&n!==void 0?n:0,this.speed=(a=t.speed)!==null&&a!==void 0?a:new C(1),this.memory=[]}update(t,e){tt.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Ee(this.mode,this.currentValue,this.spread,e),s=Math.random(),r=Xt.lerp(1-this.thickness,1,Math.random()),n=i*this.arc,a=Math.acos(s),o=Math.sin(n),h=Math.cos(n),l=Math.sin(a),u=Math.cos(a);t.position.x=l*h,t.position.y=l*o,t.position.z=u,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*r)}toJSON(){return{type:"hemisphere",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new ce({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new ce({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class ue{constructor(t={}){var e,i,s,r;this.type="grid",this.width=(e=t.width)!==null&&e!==void 0?e:1,this.height=(i=t.height)!==null&&i!==void 0?i:1,this.column=(s=t.column)!==null&&s!==void 0?s:10,this.row=(r=t.row)!==null&&r!==void 0?r:10}initialize(t){const e=Math.floor(Math.random()*this.row),i=Math.floor(Math.random()*this.column);t.position.x=i*this.width/this.column-this.width/2,t.position.y=e*this.height/this.row-this.height/2,t.position.z=0,t.velocity.set(0,0,t.startSpeed)}toJSON(){return{type:"grid",width:this.width,height:this.height,column:this.column,row:this.row}}static fromJSON(t){return new ue(t)}clone(){return new ue({width:this.width,height:this.height,column:this.column,row:this.row})}update(t,e){}}const vi={circle:{type:"circle",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:ae,loadJSON:ae.fromJSON},cone:{type:"cone",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:Bt,loadJSON:Bt.fromJSON},donut:{type:"donut",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["donutRadius",["number"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:he,loadJSON:he.fromJSON},point:{type:"point",params:[],constructor:le,loadJSON:le.fromJSON},sphere:{type:"sphere",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:Gt,loadJSON:Gt.fromJSON},hemisphere:{type:"hemisphere",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:ce,loadJSON:ce.fromJSON},grid:{type:"grid",params:[["width",["number"]],["height",["number"]],["rows",["number"]],["column",["number"]]],constructor:ue,loadJSON:ue.fromJSON}};function xr(c,t){return vi[c.type].loadJSON(c,t)}class kt{constructor(t){this.color=t,this.type="ColorOverLife"}initialize(t){this.color.startGen(t.memory)}update(t,e){this.color.genColor(t.memory,t.color,t.age/t.life),t.color.x*=t.startColor.x,t.color.y*=t.startColor.y,t.color.z*=t.startColor.z,t.color.w*=t.startColor.w}frameUpdate(t){}toJSON(){return{type:this.type,color:this.color.toJSON()}}static fromJSON(t){return new kt(wi(t.color))}clone(){return new kt(this.color.clone())}reset(){}}class de{constructor(t){this.angularVelocity=t,this.type="RotationOverLife"}initialize(t){typeof t.rotation=="number"&&this.angularVelocity.startGen(t.memory)}update(t,e){typeof t.rotation=="number"&&(t.rotation+=e*this.angularVelocity.genValue(t.memory,t.age/t.life))}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON()}}static fromJSON(t){return new de(E(t.angularVelocity))}frameUpdate(t){}clone(){return new de(this.angularVelocity.clone())}reset(){}}class me{constructor(t){this.angularVelocity=t,this.type="Rotation3DOverLife",this.tempQuat=new V,this.tempQuat2=new V}initialize(t){t.rotation instanceof V&&(t.angularVelocity=new V,this.angularVelocity.startGen(t.memory))}update(t,e){t.rotation instanceof V&&(this.angularVelocity.genValue(t.memory,this.tempQuat,e,t.age/t.life),t.rotation.multiply(this.tempQuat))}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON()}}static fromJSON(t){return new me(Ki(t.angularVelocity))}frameUpdate(t){}clone(){return new me(this.angularVelocity.clone())}reset(){}}class fe{initialize(t,e){this.ps=e,this.x.startGen(t.memory),this.y.startGen(t.memory),this.z.startGen(t.memory)}constructor(t,e,i){this.x=t,this.y=e,this.z=i,this.type="ForceOverLife",this._temp=new z,this._tempScale=new z,this._tempQ=new V}update(t,e){this._temp.set(this.x.genValue(t.memory,t.age/t.life),this.y.genValue(t.memory,t.age/t.life),this.z.genValue(t.memory,t.age/t.life)),this.ps.worldSpace?t.velocity.addScaledVector(this._temp,e):(this._temp.multiply(this._tempScale).applyQuaternion(this._tempQ),t.velocity.addScaledVector(this._temp,e))}toJSON(){return{type:this.type,x:this.x.toJSON(),y:this.y.toJSON(),z:this.z.toJSON()}}static fromJSON(t){return new fe(E(t.x),E(t.y),E(t.z))}frameUpdate(t){if(this.ps&&!this.ps.worldSpace){const e=this._temp,i=this._tempQ,s=this._tempScale;this.ps.emitter.matrixWorld.decompose(e,i,s),i.invert(),s.set(1/s.x,1/s.y,1/s.z)}}clone(){return new fe(this.x.clone(),this.y.clone(),this.z.clone())}reset(){}}class Rt{initialize(t){this.size.startGen(t.memory)}constructor(t){this.size=t,this.type="SizeOverLife"}update(t){this.size instanceof Ut?this.size.genValue(t.memory,t.size,t.age/t.life).multiply(t.startSize):t.size.copy(t.startSize).multiplyScalar(this.size.genValue(t.memory,t.age/t.life))}toJSON(){return{type:this.type,size:this.size.toJSON()}}static fromJSON(t){return new Rt(qe(t.size))}frameUpdate(t){}clone(){return new Rt(this.size.clone())}reset(){}}class pe{initialize(t){this.speed.startGen(t.memory)}constructor(t){this.speed=t,this.type="SpeedOverLife"}update(t){t.speedModifier=this.speed.genValue(t.memory,t.age/t.life)}toJSON(){return{type:this.type,speed:this.speed.toJSON()}}static fromJSON(t){return new pe(E(t.speed))}frameUpdate(t){}clone(){return new pe(this.speed.clone())}reset(){}}class ye{constructor(t){this.frame=t,this.type="FrameOverLife"}initialize(t){this.frame.startGen(t.memory)}update(t,e){this.frame instanceof Ct&&(t.uvTile=this.frame.genValue(t.memory,t.age/t.life))}frameUpdate(t){}toJSON(){return{type:this.type,frame:this.frame.toJSON()}}static fromJSON(t){return new ye(E(t.frame))}clone(){return new ye(this.frame.clone())}reset(){}}new z(0,0,1);class ge{constructor(t,e=new z(0,1,0)){this.orbitSpeed=t,this.axis=e,this.type="OrbitOverLife",this.temp=new z,this.rotation=new V}initialize(t){this.orbitSpeed.startGen(t.memory)}update(t,e){this.temp.copy(t.position).projectOnVector(this.axis),this.rotation.setFromAxisAngle(this.axis,this.orbitSpeed.genValue(t.memory,t.age/t.life)*e),t.position.sub(this.temp),t.position.applyQuaternion(this.rotation),t.position.add(this.temp)}frameUpdate(t){}toJSON(){return{type:this.type,orbitSpeed:this.orbitSpeed.toJSON(),axis:[this.axis.x,this.axis.y,this.axis.z]}}static fromJSON(t){return new ge(E(t.orbitSpeed),t.axis?new z(t.axis[0],t.axis[1],t.axis[2]):void 0)}clone(){return new ge(this.orbitSpeed.clone())}reset(){}}class ui{constructor(t){this.data=t,this.next=null,this.prev=null}hasPrev(){return this.prev!==null}hasNext(){return this.next!==null}}class _r{constructor(){this.length=0,this.head=this.tail=null}isEmpty(){return this.head===null}clear(){this.length=0,this.head=this.tail=null}front(){return this.head===null?null:this.head.data}back(){return this.tail===null?null:this.tail.data}dequeue(){if(this.head){const t=this.head.data;return this.head=this.head.next,this.head?this.head.prev=null:this.tail=null,this.length--,t}}pop(){if(this.tail){const t=this.tail.data;return this.tail=this.tail.prev,this.tail?this.tail.next=null:this.head=null,this.length--,t}}queue(t){const e=new ui(t);this.tail||(this.tail=e),this.head&&(this.head.prev=e,e.next=this.head),this.head=e,this.length++}push(t){const e=new ui(t);this.head||(this.head=e),this.tail&&(this.tail.next=e,e.prev=this.tail),this.tail=e,this.length++}insertBefore(t,e){const i=new ui(e);i.next=t,i.prev=t.prev,i.prev!==null&&(i.prev.next=i),i.next.prev=i,t==this.head&&(this.head=i),this.length++}remove(t){if(this.head===null||this.tail===null)return;let e=this.head;for(t===this.head.data&&(this.head=this.head.next),t===this.tail.data&&(this.tail=this.tail.prev);e.next!==null&&e.data!==t;)e=e.next;e.data===t&&(e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.length--)}*values(){let t=this.head;for(;t!==null;)yield t.data,t=t.next}}class Sr{constructor(){this.startSpeed=0,this.startColor=new et,this.startSize=new z(1,1,1),this.position=new z,this.velocity=new z,this.age=0,this.life=1,this.size=new z(1,1,1),this.speedModifier=1,this.rotation=0,this.color=new et,this.uvTile=0,this.memory=[]}get died(){return this.age>=this.life}reset(){this.memory.length=0}}class Mr{constructor(t,e,i){this.position=t,this.size=e,this.color=i}}class xi{constructor(){this.startSpeed=0,this.startColor=new et,this.startSize=new z(1,1,1),this.position=new z,this.velocity=new z,this.age=0,this.life=1,this.size=new z(1,1,1),this.length=100,this.speedModifier=1,this.color=new et,this.previous=new _r,this.uvTile=0,this.memory=[]}update(){for(this.age<=this.life?this.previous.push(new Mr(this.position.clone(),this.size.x,this.color.clone())):this.previous.length>0&&this.previous.dequeue();this.previous.length>this.length;)this.previous.dequeue()}get died(){return this.age>=this.life}reset(){this.memory.length=0,this.previous.clear()}}class ve{initialize(t){this.width.startGen(t.memory)}constructor(t){this.width=t,this.type="WidthOverLength"}update(t){if(t instanceof xi){const e=t.previous.values();for(let i=0;i<t.previous.length;i++){const s=e.next();s.value.size=this.width.genValue(t.memory,(t.previous.length-i)/t.length)}}}frameUpdate(t){}toJSON(){return{type:this.type,width:this.width.toJSON()}}static fromJSON(t){return new ve(E(t.width))}clone(){return new ve(this.width.clone())}reset(){}}class xe{constructor(t,e){this.direction=t,this.magnitude=e,this.type="ApplyForce",this.memory={data:[],dataCount:0},this.magnitudeValue=this.magnitude.genValue(this.memory)}initialize(t){}update(t,e){t.velocity.addScaledVector(this.direction,this.magnitudeValue*e)}frameUpdate(t){this.magnitudeValue=this.magnitude.genValue(this.memory)}toJSON(){return{type:this.type,direction:[this.direction.x,this.direction.y,this.direction.z],magnitude:this.magnitude.toJSON()}}static fromJSON(t){var e;return new xe(new z(t.direction[0],t.direction[1],t.direction[2]),E((e=t.magnitude)!==null&&e!==void 0?e:t.force))}clone(){return new xe(this.direction.clone(),this.magnitude.clone())}reset(){}}class _e{constructor(t,e){this.center=t,this.magnitude=e,this.type="GravityForce",this.temp=new z}initialize(t){}update(t,e){this.temp.copy(this.center).sub(t.position).normalize(),t.velocity.addScaledVector(this.temp,this.magnitude/t.position.distanceToSquared(this.center)*e)}frameUpdate(t){}toJSON(){return{type:this.type,center:[this.center.x,this.center.y,this.center.z],magnitude:this.magnitude}}static fromJSON(t){return new _e(new z(t.center[0],t.center[1],t.center[2]),t.magnitude)}clone(){return new _e(this.center.clone(),this.magnitude)}reset(){}}new z(0,0,1);class Se{constructor(t){this.angle=t,this.type="ChangeEmitDirection",this._temp=new z,this._q=new V,this.memory={data:[],dataCount:0}}initialize(t){const e=t.velocity.length();e!=0&&(t.velocity.normalize(),t.velocity.x===0&&t.velocity.y===0?this._temp.set(0,t.velocity.z,0):this._temp.set(-t.velocity.y,t.velocity.x,0),this.angle.startGen(this.memory),this._q.setFromAxisAngle(this._temp.normalize(),this.angle.genValue(this.memory)),this._temp.copy(t.velocity),t.velocity.applyQuaternion(this._q),this._q.setFromAxisAngle(this._temp,Math.random()*Math.PI*2),t.velocity.applyQuaternion(this._q),t.velocity.setLength(e))}update(t,e){}frameUpdate(t){}toJSON(){return{type:this.type,angle:this.angle.toJSON()}}static fromJSON(t){return new Se(E(t.angle))}clone(){return new Se(this.angle)}reset(){}}const wr=new z(1,1,1),Ci=new z(0,0,1);var Ft;(function(c){c[c.Death=0]="Death",c[c.Birth=1]="Birth",c[c.Frame=2]="Frame"})(Ft||(Ft={}));class Me{constructor(t,e,i,s=Ft.Frame,r=1){this.particleSystem=t,this.useVelocityAsBasis=e,this.subParticleSystem=i,this.mode=s,this.emitProbability=r,this.type="EmitSubParticleSystem",this.q_=new V,this.v_=new z,this.v2_=new z,this.subEmissions=new Array,this.subParticleSystem&&this.subParticleSystem.system&&(this.subParticleSystem.system.onlyUsedByOther=!0)}initialize(t){}update(t,e){this.mode===Ft.Frame?this.emit(t,e):this.mode===Ft.Birth&&t.age===0?this.emit(t,e):this.mode===Ft.Death&&t.age+e>=t.life&&this.emit(t,e)}emit(t,e){if(!this.subParticleSystem||Math.random()>this.emitProbability)return;const i=new Vt;this.setMatrixFromParticle(i,t),this.subEmissions.push({burstParticleCount:0,burstParticleIndex:0,isBursting:!1,burstIndex:0,burstWaveIndex:0,time:0,waitEmiting:0,matrix:i,travelDistance:0,particle:t})}frameUpdate(t){if(this.subParticleSystem)for(let e=0;e<this.subEmissions.length;e++)if(this.subEmissions[e].time>=this.subParticleSystem.system.duration)this.subEmissions[e]=this.subEmissions[this.subEmissions.length-1],this.subEmissions.length=this.subEmissions.length-1,e--;else{const i=this.subEmissions[e];i.particle&&i.particle.age<i.particle.life?this.setMatrixFromParticle(i.matrix,i.particle):i.particle=void 0,this.subParticleSystem.system.emit(t,i,i.matrix)}}toJSON(){return{type:this.type,subParticleSystem:this.subParticleSystem?this.subParticleSystem.uuid:"",useVelocityAsBasis:this.useVelocityAsBasis,mode:this.mode,emitProbability:this.emitProbability}}static fromJSON(t,e){return new Me(e,t.useVelocityAsBasis,t.subParticleSystem,t.mode,t.emitProbability)}clone(){return new Me(this.particleSystem,this.useVelocityAsBasis,this.subParticleSystem,this.mode,this.emitProbability)}reset(){}setMatrixFromParticle(t,e){let i;if(e.rotation===void 0||this.useVelocityAsBasis)if(e.velocity.x===0&&e.velocity.y===0&&(e.velocity.z===1||e.velocity.z===0))t.set(1,0,0,e.position.x,0,1,0,e.position.y,0,0,1,e.position.z,0,0,0,1);else{this.v_.copy(Ci).cross(e.velocity),this.v2_.copy(e.velocity).cross(this.v_);const s=this.v_.length(),r=this.v2_.length();t.set(this.v_.x/s,this.v2_.x/r,e.velocity.x,e.position.x,this.v_.y/s,this.v2_.y/r,e.velocity.y,e.position.y,this.v_.z/s,this.v2_.z/r,e.velocity.z,e.position.z,0,0,0,1)}else e.rotation instanceof V?i=e.rotation:(this.q_.setFromAxisAngle(Ci,e.rotation),i=this.q_),t.compose(e.position,i,wr);this.particleSystem.worldSpace||t.multiplyMatrices(this.particleSystem.emitter.matrixWorld,t)}}const zr=.5*(Math.sqrt(3)-1),te=(3-Math.sqrt(3))/6,br=1/3,dt=1/6,Tr=(Math.sqrt(5)-1)/4,Z=(5-Math.sqrt(5))/20,H=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),D=new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]);class ji{constructor(t=Math.random){const e=typeof t=="function"?t:Pr(t);this.p=Or(e),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(let i=0;i<512;i++)this.perm[i]=this.p[i&255],this.permMod12[i]=this.perm[i]%12}noise2D(t,e){const i=this.permMod12,s=this.perm;let r=0,n=0,a=0;const o=(t+e)*zr,h=Math.floor(t+o),l=Math.floor(e+o),u=(h+l)*te,m=h-u,d=l-u,f=t-m,p=e-d;let g,v;f>p?(g=1,v=0):(g=0,v=1);const b=f-g+te,M=p-v+te,S=f-1+2*te,y=p-1+2*te,_=h&255,x=l&255;let O=.5-f*f-p*p;if(O>=0){const N=i[_+s[x]]*3;O*=O,r=O*O*(H[N]*f+H[N+1]*p)}let A=.5-b*b-M*M;if(A>=0){const N=i[_+g+s[x+v]]*3;A*=A,n=A*A*(H[N]*b+H[N+1]*M)}let P=.5-S*S-y*y;if(P>=0){const N=i[_+1+s[x+1]]*3;P*=P,a=P*P*(H[N]*S+H[N+1]*y)}return 70*(r+n+a)}noise3D(t,e,i){const s=this.permMod12,r=this.perm;let n,a,o,h;const l=(t+e+i)*br,u=Math.floor(t+l),m=Math.floor(e+l),d=Math.floor(i+l),f=(u+m+d)*dt,p=u-f,g=m-f,v=d-f,b=t-p,M=e-g,S=i-v;let y,_,x,O,A,P;b>=M?M>=S?(y=1,_=0,x=0,O=1,A=1,P=0):b>=S?(y=1,_=0,x=0,O=1,A=0,P=1):(y=0,_=0,x=1,O=1,A=0,P=1):M<S?(y=0,_=0,x=1,O=0,A=1,P=1):b<S?(y=0,_=1,x=0,O=0,A=1,P=1):(y=0,_=1,x=0,O=1,A=1,P=0);const N=b-y+dt,R=M-_+dt,G=S-x+dt,X=b-O+2*dt,W=M-A+2*dt,Q=S-P+2*dt,K=b-1+3*dt,at=M-1+3*dt,ht=S-1+3*dt,rt=u&255,nt=m&255,Nt=d&255;let Mt=.6-b*b-M*M-S*S;if(Mt<0)n=0;else{const q=s[rt+r[nt+r[Nt]]]*3;Mt*=Mt,n=Mt*Mt*(H[q]*b+H[q+1]*M+H[q+2]*S)}let wt=.6-N*N-R*R-G*G;if(wt<0)a=0;else{const q=s[rt+y+r[nt+_+r[Nt+x]]]*3;wt*=wt,a=wt*wt*(H[q]*N+H[q+1]*R+H[q+2]*G)}let vt=.6-X*X-W*W-Q*Q;if(vt<0)o=0;else{const q=s[rt+O+r[nt+A+r[Nt+P]]]*3;vt*=vt,o=vt*vt*(H[q]*X+H[q+1]*W+H[q+2]*Q)}let xt=.6-K*K-at*at-ht*ht;if(xt<0)h=0;else{const q=s[rt+1+r[nt+1+r[Nt+1]]]*3;xt*=xt,h=xt*xt*(H[q]*K+H[q+1]*at+H[q+2]*ht)}return 32*(n+a+o+h)}noise4D(t,e,i,s){const r=this.perm;let n,a,o,h,l;const u=(t+e+i+s)*Tr,m=Math.floor(t+u),d=Math.floor(e+u),f=Math.floor(i+u),p=Math.floor(s+u),g=(m+d+f+p)*Z,v=m-g,b=d-g,M=f-g,S=p-g,y=t-v,_=e-b,x=i-M,O=s-S;let A=0,P=0,N=0,R=0;y>_?A++:P++,y>x?A++:N++,y>O?A++:R++,_>x?P++:N++,_>O?P++:R++,x>O?N++:R++;const G=A>=3?1:0,X=P>=3?1:0,W=N>=3?1:0,Q=R>=3?1:0,K=A>=2?1:0,at=P>=2?1:0,ht=N>=2?1:0,rt=R>=2?1:0,nt=A>=1?1:0,Nt=P>=1?1:0,Mt=N>=1?1:0,wt=R>=1?1:0,vt=y-G+Z,xt=_-X+Z,q=x-W+Z,$e=O-Q+Z,We=y-K+2*Z,Qe=_-at+2*Z,Ke=x-ht+2*Z,je=O-rt+2*Z,ti=y-nt+3*Z,ei=_-Nt+3*Z,ii=x-Mt+3*Z,si=O-wt+3*Z,ri=y-1+4*Z,ni=_-1+4*Z,oi=x-1+4*Z,ai=O-1+4*Z,qt=m&255,Yt=d&255,Ht=f&255,Zt=p&255;let $t=.6-y*y-_*_-x*x-O*O;if($t<0)n=0;else{const J=r[qt+r[Yt+r[Ht+r[Zt]]]]%32*4;$t*=$t,n=$t*$t*(D[J]*y+D[J+1]*_+D[J+2]*x+D[J+3]*O)}let Wt=.6-vt*vt-xt*xt-q*q-$e*$e;if(Wt<0)a=0;else{const J=r[qt+G+r[Yt+X+r[Ht+W+r[Zt+Q]]]]%32*4;Wt*=Wt,a=Wt*Wt*(D[J]*vt+D[J+1]*xt+D[J+2]*q+D[J+3]*$e)}let Qt=.6-We*We-Qe*Qe-Ke*Ke-je*je;if(Qt<0)o=0;else{const J=r[qt+K+r[Yt+at+r[Ht+ht+r[Zt+rt]]]]%32*4;Qt*=Qt,o=Qt*Qt*(D[J]*We+D[J+1]*Qe+D[J+2]*Ke+D[J+3]*je)}let Kt=.6-ti*ti-ei*ei-ii*ii-si*si;if(Kt<0)h=0;else{const J=r[qt+nt+r[Yt+Nt+r[Ht+Mt+r[Zt+wt]]]]%32*4;Kt*=Kt,h=Kt*Kt*(D[J]*ti+D[J+1]*ei+D[J+2]*ii+D[J+3]*si)}let jt=.6-ri*ri-ni*ni-oi*oi-ai*ai;if(jt<0)l=0;else{const J=r[qt+1+r[Yt+1+r[Ht+1+r[Zt+1]]]]%32*4;jt*=jt,l=jt*jt*(D[J]*ri+D[J+1]*ni+D[J+2]*oi+D[J+3]*ai)}return 27*(n+a+o+h+l)}}function Or(c){const t=new Uint8Array(256);for(let e=0;e<256;e++)t[e]=e;for(let e=0;e<255;e++){const i=e+~~(c()*(256-e)),s=t[e];t[e]=t[i],t[i]=s}return t}function Pr(c){let t=0,e=0,i=0,s=1;const r=Nr();return t=r(" "),e=r(" "),i=r(" "),t-=r(c),t<0&&(t+=1),e-=r(c),e<0&&(e+=1),i-=r(c),i<0&&(i+=1),function(){const n=2091639*t+s*23283064365386963e-26;return t=e,e=i,i=n-(s=n|0)}}function Nr(){let c=4022871197;return function(t){t=t.toString();for(let e=0;e<t.length;e++){c+=t.charCodeAt(e);let i=.02519603282416938*c;c=i>>>0,i-=c,i*=c,c=i>>>0,i-=c,c+=i*4294967296}return(c>>>0)*23283064365386963e-26}}class we{constructor(t,e,i,s){this.scale=t,this.octaves=e,this.velocityMultiplier=i,this.timeScale=s,this.type="TurbulenceField",this.generator=new ji,this.timeOffset=new z,this.temp=new z,this.temp2=new z,this.timeOffset.x=Math.random()/this.scale.x*this.timeScale.x,this.timeOffset.y=Math.random()/this.scale.y*this.timeScale.y,this.timeOffset.z=Math.random()/this.scale.z*this.timeScale.z}initialize(t){}update(t,e){const i=t.position.x/this.scale.x,s=t.position.y/this.scale.y,r=t.position.z/this.scale.z;this.temp.set(0,0,0);let n=1;for(let a=0;a<this.octaves;a++)this.temp2.set(this.generator.noise4D(i*n,s*n,r*n,this.timeOffset.x*n)/n,this.generator.noise4D(i*n,s*n,r*n,this.timeOffset.y*n)/n,this.generator.noise4D(i*n,s*n,r*n,this.timeOffset.z*n)/n),this.temp.add(this.temp2),n*=2;this.temp.multiply(this.velocityMultiplier),t.velocity.addScaledVector(this.temp,e)}toJSON(){return{type:this.type,scale:[this.scale.x,this.scale.y,this.scale.z],octaves:this.octaves,velocityMultiplier:[this.velocityMultiplier.x,this.velocityMultiplier.y,this.velocityMultiplier.z],timeScale:[this.timeScale.x,this.timeScale.y,this.timeScale.z]}}frameUpdate(t){this.timeOffset.x+=t*this.timeScale.x,this.timeOffset.y+=t*this.timeScale.y,this.timeOffset.z+=t*this.timeScale.z}static fromJSON(t){return new we(new z(t.scale[0],t.scale[1],t.scale[2]),t.octaves,new z(t.velocityMultiplier[0],t.velocityMultiplier[1],t.velocityMultiplier[2]),new z(t.timeScale[0],t.timeScale[1],t.timeScale[2]))}clone(){return new we(this.scale.clone(),this.octaves,this.velocityMultiplier.clone(),this.timeScale.clone())}reset(){}}function ke(c,t){return Math.floor(Math.random()*(t-c))+c}const mt=[],di=new z,mi=new V;class ze{constructor(t,e,i=new C(1),s=new C(0)){if(this.frequency=t,this.power=e,this.positionAmount=i,this.rotationAmount=s,this.type="Noise",this.duration=0,mt.length===0)for(let r=0;r<100;r++)mt.push(new ji)}initialize(t){t.lastPosNoise=new z,typeof t.rotation=="number"?t.lastRotNoise=0:t.lastRotNoise=new V,t.generatorIndex=[ke(0,100),ke(0,100),ke(0,100),ke(0,100)],this.positionAmount.startGen(t.memory),this.rotationAmount.startGen(t.memory),this.frequency.startGen(t.memory),this.power.startGen(t.memory)}update(t,e){let i=this.frequency.genValue(t.memory,t.age/t.life),s=this.power.genValue(t.memory,t.age/t.life),r=this.positionAmount.genValue(t.memory,t.age/t.life),n=this.rotationAmount.genValue(t.memory,t.age/t.life);r>0&&t.lastPosNoise!==void 0&&(t.position.sub(t.lastPosNoise),di.set(mt[t.generatorIndex[0]].noise2D(0,t.age*i)*s*r,mt[t.generatorIndex[1]].noise2D(0,t.age*i)*s*r,mt[t.generatorIndex[2]].noise2D(0,t.age*i)*s*r),t.position.add(di),t.lastPosNoise.copy(di)),n>0&&t.lastRotNoise!==void 0&&(typeof t.rotation=="number"?(t.rotation-=t.lastRotNoise,t.rotation+=mt[t.generatorIndex[3]].noise2D(0,t.age*i)*Math.PI*s*n):(t.lastRotNoise.invert(),t.rotation.multiply(t.lastRotNoise),mi.set(mt[t.generatorIndex[0]].noise2D(0,t.age*i)*s*n,mt[t.generatorIndex[1]].noise2D(0,t.age*i)*s*n,mt[t.generatorIndex[2]].noise2D(0,t.age*i)*s*n,mt[t.generatorIndex[3]].noise2D(0,t.age*i)*s*n).normalize(),t.rotation.multiply(mi),t.lastRotNoise.copy(mi)))}toJSON(){return{type:this.type,frequency:this.frequency.toJSON(),power:this.power.toJSON(),positionAmount:this.positionAmount.toJSON(),rotationAmount:this.rotationAmount.toJSON()}}frameUpdate(t){this.duration+=t}static fromJSON(t){return new ze(E(t.frequency),E(t.power),E(t.positionAmount),E(t.rotationAmount))}clone(){return new ze(this.frequency.clone(),this.power.clone(),this.positionAmount.clone(),this.rotationAmount.clone())}reset(){}}class be{constructor(t,e){this.color=t,this.speedRange=e,this.type="ColorBySpeed"}initialize(t){this.color.startGen(t.memory)}update(t,e){const i=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);this.color.genColor(t.memory,t.color,i),t.color.x*=t.startColor.x,t.color.y*=t.startColor.y,t.color.z*=t.startColor.z,t.color.w*=t.startColor.w}frameUpdate(t){}toJSON(){return{type:this.type,color:this.color.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new be(wi(t.color),st.fromJSON(t.speedRange))}clone(){return new be(this.color.clone(),this.speedRange.clone())}reset(){}}class Te{initialize(t){this.size.startGen(t.memory)}constructor(t,e){this.size=t,this.speedRange=e,this.type="SizeBySpeed"}update(t){const e=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);this.size instanceof Ut?this.size.genValue(t.memory,t.size,e).multiply(t.startSize):t.size.copy(t.startSize).multiplyScalar(this.size.genValue(t.memory,e))}toJSON(){return{type:this.type,size:this.size.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new Te(qe(t.size),st.fromJSON(t.speedRange))}frameUpdate(t){}clone(){return new Te(this.size.clone(),this.speedRange.clone())}reset(){}}class Oe{constructor(t,e){this.angularVelocity=t,this.speedRange=e,this.type="RotationBySpeed",this.tempQuat=new V}initialize(t){typeof t.rotation=="number"&&this.angularVelocity.startGen(t.memory)}update(t,e){if(typeof t.rotation=="number"){const i=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);t.rotation+=e*this.angularVelocity.genValue(t.memory,i)}}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new Oe(E(t.angularVelocity),st.fromJSON(t.speedRange))}frameUpdate(t){}clone(){return new Oe(this.angularVelocity.clone(),this.speedRange.clone())}reset(){}}class Pe{initialize(t){this.speed.startGen(t.memory)}constructor(t,e){this.speed=t,this.dampen=e,this.type="LimitSpeedOverLife"}update(t,e){let i=t.velocity.length(),s=this.speed.genValue(t.memory,t.age/t.life);if(i>s){const r=(i-s)/i;t.velocity.multiplyScalar(1-r*this.dampen*e*20)}}toJSON(){return{type:this.type,speed:this.speed.toJSON(),dampen:this.dampen}}static fromJSON(t){return new Pe(E(t.speed),t.dampen)}frameUpdate(t){}clone(){return new Pe(this.speed.clone(),this.dampen)}reset(){}}const _i={ApplyForce:{type:"ApplyForce",constructor:xe,params:[["direction",["vec3"]],["magnitude",["value"]]],loadJSON:xe.fromJSON},Noise:{type:"Noise",constructor:ze,params:[["frequency",["value"]],["power",["value"]],["positionAmount",["value"]],["rotationAmount",["value"]]],loadJSON:ze.fromJSON},TurbulenceField:{type:"TurbulenceField",constructor:we,params:[["scale",["vec3"]],["octaves",["number"]],["velocityMultiplier",["vec3"]],["timeScale",["vec3"]]],loadJSON:we.fromJSON},GravityForce:{type:"GravityForce",constructor:_e,params:[["center",["vec3"]],["magnitude",["number"]]],loadJSON:_e.fromJSON},ColorOverLife:{type:"ColorOverLife",constructor:kt,params:[["color",["colorFunc"]]],loadJSON:kt.fromJSON},RotationOverLife:{type:"RotationOverLife",constructor:de,params:[["angularVelocity",["value","valueFunc"]]],loadJSON:de.fromJSON},Rotation3DOverLife:{type:"Rotation3DOverLife",constructor:me,params:[["angularVelocity",["rotationFunc"]]],loadJSON:me.fromJSON},SizeOverLife:{type:"SizeOverLife",constructor:Rt,params:[["size",["value","valueFunc","vec3Func"]]],loadJSON:Rt.fromJSON},ColorBySpeed:{type:"ColorBySpeed",constructor:be,params:[["color",["colorFunc"]],["speedRange",["range"]]],loadJSON:be.fromJSON},RotationBySpeed:{type:"RotationBySpeed",constructor:Oe,params:[["angularVelocity",["value","valueFunc"]],["speedRange",["range"]]],loadJSON:Oe.fromJSON},SizeBySpeed:{type:"SizeBySpeed",constructor:Te,params:[["size",["value","valueFunc","vec3Func"]],["speedRange",["range"]]],loadJSON:Te.fromJSON},SpeedOverLife:{type:"SpeedOverLife",constructor:pe,params:[["speed",["value","valueFunc"]]],loadJSON:pe.fromJSON},FrameOverLife:{type:"FrameOverLife",constructor:ye,params:[["frame",["value","valueFunc"]]],loadJSON:ye.fromJSON},ForceOverLife:{type:"ForceOverLife",constructor:fe,params:[["x",["value","valueFunc"]],["y",["value","valueFunc"]],["z",["value","valueFunc"]]],loadJSON:fe.fromJSON},OrbitOverLife:{type:"OrbitOverLife",constructor:ge,params:[["orbitSpeed",["value","valueFunc"]],["axis",["vec3"]]],loadJSON:ge.fromJSON},WidthOverLength:{type:"WidthOverLength",constructor:ve,params:[["width",["value","valueFunc"]]],loadJSON:ve.fromJSON},ChangeEmitDirection:{type:"ChangeEmitDirection",constructor:Se,params:[["angle",["value"]]],loadJSON:Se.fromJSON},EmitSubParticleSystem:{type:"EmitSubParticleSystem",constructor:Me,params:[["particleSystem",["self"]],["useVelocityAsBasis",["boolean"]],["subParticleSystem",["particleSystem"]],["mode",["number"]],["emitProbability",["number"]]],loadJSON:Me.fromJSON},LimitSpeedOverLife:{type:"LimitSpeedOverLife",constructor:Pe,params:[["speed",["value","valueFunc"]],["dampen",["number"]]],loadJSON:Pe.fromJSON}};function Ar(c,t){return _i[c.type].loadJSON(c,t)}const Er=[];function Cr(c){if(!Er.find(e=>e.id===c.id)){for(const e of c.emitterShapes)vi[e.type]||(vi[e.type]=e);for(const e of c.behaviors)_i[e.type]||(_i[e.type]=e)}}var Ur=`
#ifdef SOFT_PARTICLES

    /* #ifdef LOGDEPTH
    float distSample = linearize_depth_log(sampleDepth, near, far);
    #else
    float distSample = ortho ? linearize_depth_ortho(sampleDepth, near, far) : linearize_depth(sampleDepth, near, far);
    #endif */

    vec2 p2 = projPosition.xy / projPosition.w;
    
    p2 = 0.5 * p2 + 0.5;

    float readDepth = texture2D(depthTexture, p2.xy).r;
    float viewDepth = linearize_depth(readDepth);

    float softParticlesFade = saturate(SOFT_INV_FADE_DISTANCE * ((viewDepth - SOFT_NEAR_FADE) - linearDepth));
    
    gl_FragColor *= softParticlesFade;

    //gl_FragColor = vec4(softParticlesFade , 0, 0, 1);
#endif
`,Br=`
#ifdef SOFT_PARTICLES

    uniform sampler2D depthTexture;
    uniform vec4 projParams;
    uniform vec2 softParams;

    varying vec4 projPosition;
    varying float linearDepth;

    #define SOFT_NEAR_FADE softParams.x
    #define SOFT_INV_FADE_DISTANCE softParams.y

    #define zNear projParams.x
    #define zFar projParams.y

    float linearize_depth(float d)
    {
        return (zFar * zNear) / (zFar - d * (zFar - zNear));
    }

#endif
`,kr=`
#ifdef SOFT_PARTICLES
    varying vec4 projPosition;
    varying float linearDepth;
#endif
`,Rr=`
#ifdef SOFT_PARTICLES
    projPosition = gl_Position;
    linearDepth = -mvPosition.z;
#endif
`,Ir=`
#ifdef USE_MAP
    vec4 texelColor = texture2D( map, vUv);
    #ifdef TILE_BLEND
        texelColor = mix( texelColor, texture2D( map, vUvNext ), vUvBlend );
    #endif
    diffuseColor *= texelColor;
#endif
`,Fr=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;
#ifdef TILE_BLEND
    varying vec2 vUvNext;
    varying float vUvBlend;
#endif

#endif
#ifdef USE_MAP

	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#ifdef TILE_BLEND
    varying vec2 vMapUvNext;
#endif

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

#endif
`,Lr=`
#ifdef UV_TILE
    attribute float uvTile;
    uniform vec2 tileCount;
    
    mat3 makeTileTransform(float uvTile) {
        float col = mod(uvTile, tileCount.x);
        float row = (tileCount.y - floor(uvTile / tileCount.x) - 1.0);
        
        return mat3(
          1.0 / tileCount.x, 0.0, 0.0,
          0.0, 1.0 / tileCount.y, 0.0, 
          col / tileCount.x, row / tileCount.y, 1.0);
    }
#else
    mat3 makeTileTransform(float uvTile) {
        return mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
    }
#endif

#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;
#ifdef TILE_BLEND
    varying vec2 vUvNext;
    varying float vUvBlend;
#endif

#endif
#ifdef USE_MAP

	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#ifdef TILE_BLEND
    varying vec2 vMapUvNext;
#endif

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

#endif
`,Vr=`
#ifdef UV_TILE
    mat3 tileTransform = makeTileTransform(floor(uvTile));
    #ifdef TILE_BLEND
        mat3 nextTileTransform = makeTileTransform(ceil(uvTile));
        vUvBlend = fract(uvTile);
    #endif
#else
    mat3 tileTransform = makeTileTransform(0.0);
#endif

#if defined( USE_UV ) || defined( USE_ANISOTROPY )

vUv = (tileTransform *vec3( uv, 1 )).xy;
#if defined( TILE_BLEND ) && defined( UV_TILE )
    vUvNext = (nextTileTransform *vec3( uv, 1 )).xy;
#endif

#endif
#ifdef USE_MAP

vMapUv = ( tileTransform * (mapTransform * vec3( MAP_UV, 1 ) )).xy;
#if defined( TILE_BLEND ) && defined( UV_TILE )
    vMapUvNext = (nextTileTransform * (mapTransform * vec3( MAP_UV, 1 ))).xy;
#endif

#endif
#ifdef USE_ALPHAMAP

vAlphaMapUv = ( tileTransform * (alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) )).xy;
    
#endif
#ifdef USE_LIGHTMAP

vLightMapUv = ( tileTransform * (lightMapTransform * vec3( LIGHTMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_AOMAP

vAoMapUv = ( tileTransform * (aoMapTransform * vec3( AOMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_BUMPMAP

vBumpMapUv = ( tileTransform * (bumpMapTransform * vec3( BUMPMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_NORMALMAP

vNormalMapUv = ( tileTransform * (normalMapTransform * vec3( NORMALMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_DISPLACEMENTMAP

vDisplacementMapUv = ( tileTransform * (displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_EMISSIVEMAP

vEmissiveMapUv = ( tileTransform * (emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_METALNESSMAP

vMetalnessMapUv = ( tileTransform * (metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_ROUGHNESSMAP

vRoughnessMapUv = ( tileTransform * (roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_ANISOTROPYMAP

vAnisotropyMapUv = ( tileTransform * (anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_CLEARCOATMAP

vClearcoatMapUv = ( tileTransform * (clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

vClearcoatNormalMapUv = ( tileTransform * (clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

vClearcoatRoughnessMapUv = ( tileTransform * (clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_IRIDESCENCEMAP

vIridescenceMapUv = ( tileTransform * (iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

vIridescenceThicknessMapUv = ( tileTransform * (iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SHEEN_COLORMAP

vSheenColorMapUv = ( tileTransform * (sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

vSheenRoughnessMapUv = ( tileTransform * (sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SPECULARMAP

vSpecularMapUv = ( tileTransform * (specularMapTransform * vec3( SPECULARMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SPECULAR_COLORMAP

vSpecularColorMapUv = ( tileTransform * (specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

vSpecularIntensityMapUv = ( tileTransform * (specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_TRANSMISSIONMAP

vTransmissionMapUv = ( tileTransform * transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_THICKNESSMAP

vThicknessMapUv = ( tileTransform * thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) )).xy;

#endif

`;const Tt=ms;function Jr(){Tt.tile_pars_vertex=Lr,Tt.tile_vertex=Vr,Tt.tile_pars_fragment=Fr,Tt.tile_fragment=Ir,Tt.soft_pars_vertex=kr,Tt.soft_vertex=Rr,Tt.soft_pars_fragment=Br,Tt.soft_fragment=Ur}class Dr extends Vi{constructor(t){super(),this.type="ParticleEmitter",this.system=t}clone(){const t=this.system.clone();return t.emitter.copy(this,!0),t.emitter}dispose(){}extractFromCache(t){const e=[];for(const i in t){const s=t[i];delete s.metadata,e.push(s)}return e}toJSON(t,e={}){const i=this.children;this.children=this.children.filter(r=>r.type!=="ParticleSystemPreview");const s=super.toJSON(t);return this.children=i,this.system!==null&&(s.object.ps=this.system.toJSON(t,e)),s}}var w;(function(c){c[c.BillBoard=0]="BillBoard",c[c.StretchedBillBoard=1]="StretchedBillBoard",c[c.Mesh=2]="Mesh",c[c.Trail=3]="Trail",c[c.HorizontalBillBoard=4]="HorizontalBillBoard",c[c.VerticalBillBoard=5]="VerticalBillBoard"})(w||(w={}));class ts extends Ii{constructor(t){super(),this.type="VFXBatch",this.maxParticles=1e3,this.systems=new Set;const e=new Ie;e.mask=t.layers.mask;const i=t.material.clone();i.defines={},Object.assign(i.defines,t.material.defines),this.settings={instancingGeometry:t.instancingGeometry,renderMode:t.renderMode,renderOrder:t.renderOrder,material:i,uTileCount:t.uTileCount,vTileCount:t.vTileCount,blendTiles:t.blendTiles,softParticles:t.softParticles,softNearFade:t.softNearFade,softFarFade:t.softFarFade,layers:e},this.frustumCulled=!1,this.renderOrder=this.settings.renderOrder}addSystem(t){this.systems.add(t)}removeSystem(t){this.systems.delete(t)}applyDepthTexture(t){const e=this.material.uniforms.depthTexture;e&&e.value!==t&&(e.value=t,this.material.needsUpdate=!0)}}const Gr=new z(0,0,1),fi=new V,Xr=new z,qr=new z;new z;const Ui=60,Yr=new Li(1,1,1,1);class Ye{set time(t){this.emissionState.time=t}get time(){return this.emissionState.time}get layers(){return this.rendererSettings.layers}get texture(){return this.rendererSettings.material.map}set texture(t){this.rendererSettings.material.map=t,this.neededToUpdateRender=!0}get material(){return this.rendererSettings.material}set material(t){this.rendererSettings.material=t,this.neededToUpdateRender=!0}get uTileCount(){return this.rendererSettings.uTileCount}set uTileCount(t){this.rendererSettings.uTileCount=t,this.neededToUpdateRender=!0}get vTileCount(){return this.rendererSettings.vTileCount}set vTileCount(t){this.rendererSettings.vTileCount=t,this.neededToUpdateRender=!0}get blendTiles(){return this.rendererSettings.blendTiles}set blendTiles(t){this.rendererSettings.blendTiles=t,this.neededToUpdateRender=!0}get softParticles(){return this.rendererSettings.softParticles}set softParticles(t){this.rendererSettings.softParticles=t,this.neededToUpdateRender=!0}get softNearFade(){return this.rendererSettings.softNearFade}set softNearFade(t){this.rendererSettings.softNearFade=t,this.neededToUpdateRender=!0}get softFarFade(){return this.rendererSettings.softFarFade}set softFarFade(t){this.rendererSettings.softFarFade=t,this.neededToUpdateRender=!0}get instancingGeometry(){return this.rendererSettings.instancingGeometry}set instancingGeometry(t){this.restart(),this.particles.length=0,this.rendererSettings.instancingGeometry=t,this.neededToUpdateRender=!0}get renderMode(){return this.rendererSettings.renderMode}set renderMode(t){if((this.rendererSettings.renderMode!=w.Trail&&t===w.Trail||this.rendererSettings.renderMode==w.Trail&&t!==w.Trail)&&(this.restart(),this.particles.length=0),this.rendererSettings.renderMode!==t)switch(t){case w.Trail:this.rendererEmitterSettings={startLength:new C(30),followLocalOrigin:!1};break;case w.Mesh:this.rendererEmitterSettings={geometry:new Li(1,1)},this.startRotation=new oe(new z(0,1,0),new C(0));break;case w.StretchedBillBoard:this.rendererEmitterSettings={speedFactor:0,lengthFactor:2},this.rendererSettings.renderMode===w.Mesh&&(this.startRotation=new C(0));break;case w.BillBoard:case w.VerticalBillBoard:case w.HorizontalBillBoard:this.rendererEmitterSettings={},this.rendererSettings.renderMode===w.Mesh&&(this.startRotation=new C(0));break}this.rendererSettings.renderMode=t,this.neededToUpdateRender=!0}get renderOrder(){return this.rendererSettings.renderOrder}set renderOrder(t){this.rendererSettings.renderOrder=t,this.neededToUpdateRender=!0}get blending(){return this.rendererSettings.material.blending}set blending(t){this.rendererSettings.material.blending=t,this.neededToUpdateRender=!0}constructor(t){var e,i,s,r,n,a,o,h,l,u,m,d,f,p,g,v,b,M,S,y,_,x,O,A,P,N;if(this.temp=new z,this.travelDistance=0,this.normalMatrix=new pt,this.memory=[],this.firstTimeUpdate=!0,this.autoDestroy=t.autoDestroy===void 0?!1:t.autoDestroy,this.duration=(e=t.duration)!==null&&e!==void 0?e:1,this.looping=t.looping===void 0?!0:t.looping,this.prewarm=t.prewarm===void 0?!1:t.prewarm,this.startLife=(i=t.startLife)!==null&&i!==void 0?i:new C(5),this.startSpeed=(s=t.startSpeed)!==null&&s!==void 0?s:new C(0),this.startRotation=(r=t.startRotation)!==null&&r!==void 0?r:new C(0),this.startSize=(n=t.startSize)!==null&&n!==void 0?n:new C(1),this.startColor=(a=t.startColor)!==null&&a!==void 0?a:new Pt(new et(1,1,1,1)),this.emissionOverTime=(o=t.emissionOverTime)!==null&&o!==void 0?o:new C(10),this.emissionOverDistance=(h=t.emissionOverDistance)!==null&&h!==void 0?h:new C(0),this.emissionBursts=(l=t.emissionBursts)!==null&&l!==void 0?l:[],this.onlyUsedByOther=(u=t.onlyUsedByOther)!==null&&u!==void 0?u:!1,this.emitterShape=(m=t.shape)!==null&&m!==void 0?m:new Gt,this.behaviors=(d=t.behaviors)!==null&&d!==void 0?d:new Array,this.worldSpace=(f=t.worldSpace)!==null&&f!==void 0?f:!1,this.rendererEmitterSettings=(p=t.rendererEmitterSettings)!==null&&p!==void 0?p:{},t.renderMode===w.StretchedBillBoard){const R=this.rendererEmitterSettings;t.speedFactor!==void 0&&(R.speedFactor=t.speedFactor),R.speedFactor=(g=R.speedFactor)!==null&&g!==void 0?g:0,R.lengthFactor=(v=R.lengthFactor)!==null&&v!==void 0?v:0}this.rendererSettings={instancingGeometry:(b=t.instancingGeometry)!==null&&b!==void 0?b:Yr,renderMode:(M=t.renderMode)!==null&&M!==void 0?M:w.BillBoard,renderOrder:(S=t.renderOrder)!==null&&S!==void 0?S:0,material:t.material,uTileCount:(y=t.uTileCount)!==null&&y!==void 0?y:1,vTileCount:(_=t.vTileCount)!==null&&_!==void 0?_:1,blendTiles:(x=t.blendTiles)!==null&&x!==void 0?x:!1,softParticles:(O=t.softParticles)!==null&&O!==void 0?O:!1,softNearFade:(A=t.softNearFade)!==null&&A!==void 0?A:0,softFarFade:(P=t.softFarFade)!==null&&P!==void 0?P:0,layers:(N=t.layers)!==null&&N!==void 0?N:new Ie},this.neededToUpdateRender=!0,this.particles=new Array,this.startTileIndex=t.startTileIndex||new C(0),this.emitter=new Dr(this),this.paused=!1,this.particleNum=0,this.emissionState={isBursting:!1,burstParticleIndex:0,burstParticleCount:0,burstIndex:0,burstWaveIndex:0,time:0,waitEmiting:0,travelDistance:0},this.emissionBursts.forEach(R=>R.count.startGen(this.memory)),this.emissionOverDistance.startGen(this.memory),this.emitEnded=!1,this.markForDestroy=!1,this.prewarmed=!1}pause(){this.paused=!0}play(){this.paused=!1}stop(){this.restart(),this.pause()}spawn(t,e,i){fi.setFromRotationMatrix(i);const s=Xr,r=fi,n=qr;i.decompose(s,r,n);for(let a=0;a<t;a++){for(e.burstParticleIndex=a,this.particleNum++;this.particles.length<this.particleNum;)this.rendererSettings.renderMode===w.Trail?this.particles.push(new xi):this.particles.push(new Sr);const o=this.particles[this.particleNum-1];if(o.reset(),o.speedModifier=1,this.startColor.startGen(o.memory),this.startColor.genColor(o.memory,o.startColor,this.emissionState.time),o.color.copy(o.startColor),this.startSpeed.startGen(o.memory),o.startSpeed=this.startSpeed.genValue(o.memory,e.time/this.duration),this.startLife.startGen(o.memory),o.life=this.startLife.genValue(o.memory,e.time/this.duration),o.age=0,this.startSize.startGen(o.memory),this.startSize.type==="vec3function")this.startSize.genValue(o.memory,o.startSize,e.time/this.duration);else{const h=this.startSize.genValue(o.memory,e.time/this.duration);o.startSize.set(h,h,h)}if(this.startTileIndex.startGen(o.memory),o.uvTile=this.startTileIndex.genValue(o.memory),o.size.copy(o.startSize),this.rendererSettings.renderMode===w.Mesh||this.rendererSettings.renderMode===w.BillBoard||this.rendererSettings.renderMode===w.VerticalBillBoard||this.rendererSettings.renderMode===w.HorizontalBillBoard||this.rendererSettings.renderMode===w.StretchedBillBoard){const h=o;this.startRotation.startGen(o.memory),this.rendererSettings.renderMode===w.Mesh?(h.rotation instanceof V||(h.rotation=new V),this.startRotation.type==="rotation"?this.startRotation.genValue(o.memory,h.rotation,1,e.time/this.duration):h.rotation.setFromAxisAngle(Gr,this.startRotation.genValue(h.memory,e.time/this.duration))):this.startRotation.type==="rotation"?h.rotation=0:h.rotation=this.startRotation.genValue(h.memory,e.time/this.duration)}else if(this.rendererSettings.renderMode===w.Trail){const h=o;this.rendererEmitterSettings.startLength.startGen(h.memory),h.length=this.rendererEmitterSettings.startLength.genValue(h.memory,e.time/this.duration)}if(this.emitterShape.initialize(o,e),this.rendererSettings.renderMode===w.Trail&&this.rendererEmitterSettings.followLocalOrigin){const h=o;h.localPosition=new z().copy(h.position)}this.worldSpace?(o.position.applyMatrix4(i),o.startSize.multiply(n).abs(),o.size.copy(o.startSize),o.velocity.multiply(n).applyMatrix3(this.normalMatrix),o.rotation&&o.rotation instanceof V&&o.rotation.multiplyQuaternions(fi,o.rotation)):this.onlyUsedByOther&&(o.parentMatrix=i);for(let h=0;h<this.behaviors.length;h++)this.behaviors[h].initialize(o,this)}}endEmit(){this.emitEnded=!0,this.autoDestroy&&(this.markForDestroy=!0)}dispose(){this._renderer&&this._renderer.deleteSystem(this),this.emitter.dispose(),this.emitter.parent&&this.emitter.parent.remove(this.emitter)}restart(){this.memory.length=0,this.paused=!1,this.particleNum=0,this.emissionState.isBursting=!1,this.emissionState.burstIndex=0,this.emissionState.burstWaveIndex=0,this.emissionState.time=0,this.emissionState.waitEmiting=0,this.behaviors.forEach(t=>{t.reset()}),this.emitEnded=!1,this.markForDestroy=!1,this.prewarmed=!1,this.emissionBursts.forEach(t=>t.count.startGen(this.memory)),this.emissionOverDistance.startGen(this.memory)}update(t){if(this.paused)return;let e=this.emitter;for(;e.parent;)e=e.parent;if(e.type!=="Scene"){this.dispose();return}if(this.firstTimeUpdate&&(this.firstTimeUpdate=!1,this.emitter.updateWorldMatrix(!0,!1)),this.emitEnded&&this.particleNum===0){this.markForDestroy&&this.emitter.parent&&this.dispose();return}if(this.looping&&this.prewarm&&!this.prewarmed){this.prewarmed=!0;for(let i=0;i<this.duration*Ui;i++)this.update(1/Ui)}t>.1&&(t=.1),this.neededToUpdateRender&&(this._renderer&&this._renderer.updateSystem(this),this.neededToUpdateRender=!1),this.onlyUsedByOther||this.emit(t,this.emissionState,this.emitter.matrixWorld),this.emitterShape.update(this,t);for(let i=0;i<this.behaviors.length;i++){this.behaviors[i].frameUpdate(t);for(let s=0;s<this.particleNum;s++)this.particles[s].died||this.behaviors[i].update(this.particles[s],t)}for(let i=0;i<this.particleNum;i++)this.rendererEmitterSettings.followLocalOrigin&&this.particles[i].localPosition?(this.particles[i].position.copy(this.particles[i].localPosition),this.particles[i].parentMatrix?this.particles[i].position.applyMatrix4(this.particles[i].parentMatrix):this.particles[i].position.applyMatrix4(this.emitter.matrixWorld)):this.particles[i].position.addScaledVector(this.particles[i].velocity,t*this.particles[i].speedModifier),this.particles[i].age+=t;if(this.rendererSettings.renderMode===w.Trail)for(let i=0;i<this.particleNum;i++)this.particles[i].update();for(let i=0;i<this.particleNum;i++){const s=this.particles[i];s.died&&(!(s instanceof xi)||s.previous.length===0)&&(this.particles[i]=this.particles[this.particleNum-1],this.particles[this.particleNum-1]=s,this.particleNum--,i--)}}emit(t,e,i){e.time>this.duration&&(this.looping?(e.time-=this.duration,e.burstIndex=0,this.behaviors.forEach(r=>{r.reset()})):!this.emitEnded&&!this.onlyUsedByOther&&this.endEmit()),this.normalMatrix.getNormalMatrix(i);const s=Math.ceil(e.waitEmiting);for(this.spawn(s,e,i),e.waitEmiting-=s;e.burstIndex<this.emissionBursts.length&&this.emissionBursts[e.burstIndex].time<=e.time;){if(Math.random()<this.emissionBursts[e.burstIndex].probability){const r=this.emissionBursts[e.burstIndex].count.genValue(this.memory,this.time);e.isBursting=!0,e.burstParticleCount=r,this.spawn(r,e,i),e.isBursting=!1}e.burstIndex++}if(!this.emitEnded&&(e.waitEmiting+=t*this.emissionOverTime.genValue(this.memory,e.time/this.duration),e.previousWorldPos!=null)){this.temp.set(i.elements[12],i.elements[13],i.elements[14]),e.travelDistance+=e.previousWorldPos.distanceTo(this.temp);const r=this.emissionOverDistance.genValue(this.memory,e.time/this.duration);if(e.travelDistance*r>0){const n=Math.floor(e.travelDistance*r);e.travelDistance-=n/r,e.waitEmiting+=n}}e.previousWorldPos===void 0&&(e.previousWorldPos=new z),e.previousWorldPos.set(i.elements[12],i.elements[13],i.elements[14]),e.time+=t}toJSON(t,e={}){var i;if((t===void 0||typeof t=="string")&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}}),t.materials[this.rendererSettings.material.uuid]=this.rendererSettings.material.toJSON(t),e.useUrlForImage&&((i=this.texture)===null||i===void 0?void 0:i.source)!==void 0){const a=this.texture.source;t.images[a.uuid]={uuid:a.uuid,url:this.texture.image.url}}let r;this.renderMode===w.Trail?r={startLength:this.rendererEmitterSettings.startLength.toJSON(),followLocalOrigin:this.rendererEmitterSettings.followLocalOrigin}:this.renderMode===w.Mesh?r={}:this.renderMode===w.StretchedBillBoard?r={speedFactor:this.rendererEmitterSettings.speedFactor,lengthFactor:this.rendererEmitterSettings.lengthFactor}:r={};const n=this.rendererSettings.instancingGeometry;return t.geometries&&!t.geometries[n.uuid]&&(t.geometries[n.uuid]=n.toJSON()),{version:"3.0",autoDestroy:this.autoDestroy,looping:this.looping,prewarm:this.prewarm,duration:this.duration,shape:this.emitterShape.toJSON(),startLife:this.startLife.toJSON(),startSpeed:this.startSpeed.toJSON(),startRotation:this.startRotation.toJSON(),startSize:this.startSize.toJSON(),startColor:this.startColor.toJSON(),emissionOverTime:this.emissionOverTime.toJSON(),emissionOverDistance:this.emissionOverDistance.toJSON(),emissionBursts:this.emissionBursts.map(a=>({time:a.time,count:a.count.toJSON(),probability:a.probability,interval:a.interval,cycle:a.cycle})),onlyUsedByOther:this.onlyUsedByOther,instancingGeometry:this.rendererSettings.instancingGeometry.uuid,renderOrder:this.renderOrder,renderMode:this.renderMode,rendererEmitterSettings:r,material:this.rendererSettings.material.uuid,layers:this.layers.mask,startTileIndex:this.startTileIndex.toJSON(),uTileCount:this.uTileCount,vTileCount:this.vTileCount,blendTiles:this.blendTiles,softParticles:this.rendererSettings.softParticles,softFarFade:this.rendererSettings.softFarFade,softNearFade:this.rendererSettings.softNearFade,behaviors:this.behaviors.map(a=>a.toJSON()),worldSpace:this.worldSpace}}static fromJSON(t,e,i){var s,r;const n=xr(t.shape,e);let a;if(t.renderMode===w.Trail){const l=t.rendererEmitterSettings;a={startLength:l.startLength!=null?E(l.startLength):new C(30),followLocalOrigin:l.followLocalOrigin}}else t.renderMode===w.Mesh?a={}:t.renderMode===w.StretchedBillBoard?(a=t.rendererEmitterSettings,t.speedFactor!=null&&(a.speedFactor=t.speedFactor)):a={};const o=new Ie;t.layers&&(o.mask=t.layers);const h=new Ye({autoDestroy:t.autoDestroy,looping:t.looping,prewarm:t.prewarm,duration:t.duration,shape:n,startLife:E(t.startLife),startSpeed:E(t.startSpeed),startRotation:qe(t.startRotation),startSize:qe(t.startSize),startColor:wi(t.startColor),emissionOverTime:E(t.emissionOverTime),emissionOverDistance:E(t.emissionOverDistance),emissionBursts:(s=t.emissionBursts)===null||s===void 0?void 0:s.map(l=>{var u,m,d;return{time:l.time,count:typeof l.count=="number"?new C(l.count):E(l.count),probability:(u=l.probability)!==null&&u!==void 0?u:1,interval:(m=l.interval)!==null&&m!==void 0?m:.1,cycle:(d=l.cycle)!==null&&d!==void 0?d:1}}),onlyUsedByOther:t.onlyUsedByOther,instancingGeometry:e.geometries[t.instancingGeometry],renderMode:t.renderMode,rendererEmitterSettings:a,renderOrder:t.renderOrder,layers:o,material:t.material?e.materials[t.material]:t.texture?new Ve({map:e.textures[t.texture],transparent:(r=t.transparent)!==null&&r!==void 0?r:!0,blending:t.blending,side:yi}):new Ve({color:16777215,transparent:!0,blending:Mi,side:yi}),startTileIndex:typeof t.startTileIndex=="number"?new C(t.startTileIndex):E(t.startTileIndex),uTileCount:t.uTileCount,vTileCount:t.vTileCount,blendTiles:t.blendTiles,softParticles:t.softParticles,softFarFade:t.softFarFade,softNearFade:t.softNearFade,behaviors:[],worldSpace:t.worldSpace});return h.behaviors=t.behaviors.map(l=>{const u=Ar(l,h);return u.type==="EmitSubParticleSystem"&&(i[l.subParticleSystem]=u),u}),h}addBehavior(t){this.behaviors.push(t)}getRendererSettings(){return this.rendererSettings}clone(){const t=[];for(const r of this.emissionBursts){const n={};Object.assign(n,r),t.push(n)}const e=[];for(const r of this.behaviors)e.push(r.clone());let i;this.renderMode===w.Trail?i={startLength:this.rendererEmitterSettings.startLength.clone(),followLocalOrigin:this.rendererEmitterSettings.followLocalOrigin}:i={};const s=new Ie;return s.mask=this.layers.mask,new Ye({autoDestroy:this.autoDestroy,looping:this.looping,duration:this.duration,shape:this.emitterShape.clone(),startLife:this.startLife.clone(),startSpeed:this.startSpeed.clone(),startRotation:this.startRotation.clone(),startSize:this.startSize.clone(),startColor:this.startColor.clone(),emissionOverTime:this.emissionOverTime.clone(),emissionOverDistance:this.emissionOverDistance.clone(),emissionBursts:t,onlyUsedByOther:this.onlyUsedByOther,instancingGeometry:this.rendererSettings.instancingGeometry,renderMode:this.renderMode,renderOrder:this.renderOrder,rendererEmitterSettings:i,material:this.rendererSettings.material,startTileIndex:this.startTileIndex,uTileCount:this.uTileCount,vTileCount:this.vTileCount,blendTiles:this.blendTiles,softParticles:this.softParticles,softFarFade:this.softFarFade,softNearFade:this.softNearFade,behaviors:e,worldSpace:this.worldSpace,layers:s})}}var pi=`

#include <common>
#include <color_pars_fragment>
#include <map_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <alphatest_pars_fragment>

#include <tile_pars_fragment>
#include <soft_pars_fragment>

void main() {

    #include <clipping_planes_fragment>
    
    vec3 outgoingLight = vec3( 0.0 );
    vec4 diffuseColor = vColor;
    
    #include <logdepthbuf_fragment>
    
    #include <tile_fragment>
    #include <alphatest_fragment>

    outgoingLight = diffuseColor.rgb;
    
    #ifdef USE_COLOR_AS_ALPHA
    gl_FragColor = vec4( outgoingLight, diffuseColor.r );
    #else
    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
    #endif
    
    #include <soft_fragment>
    #include <tonemapping_fragment>
}
`,zi=`
#define STANDARD

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

#ifdef USE_DISPERSION
uniform float dispersion;
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

vec4 diffuseColor = vec4( diffuse, opacity );
#include <clipping_planes_fragment>

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

// accumulation
#include <lights_physical_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>

// modulation
#include <aomap_fragment>

vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

#include <transmission_fragment>

vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

#ifdef USE_SHEEN

// Sheen energy compensation approximation calculation can be found at the end of
// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
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
}`,Hr=`
#include <common>
#include <color_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#include <tile_pars_vertex>
#include <soft_pars_vertex>

attribute vec3 offset;
attribute float rotation;
attribute vec3 size;

void main() {
	
    vec2 alignedPosition = position.xy * size.xy;
    
    vec2 rotatedPosition;
    rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
    rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
#ifdef HORIZONTAL
    vec4 mvPosition = modelMatrix * vec4( offset, 1.0 );
    mvPosition.x += rotatedPosition.x;
    mvPosition.z -= rotatedPosition.y;
    mvPosition = viewMatrix * mvPosition;
#elif defined(VERTICAL)
    vec4 mvPosition = modelMatrix * vec4( offset, 1.0 );
    mvPosition.y += rotatedPosition.y;
    mvPosition = viewMatrix * mvPosition;
    mvPosition.x += rotatedPosition.x;
#else
    vec4 mvPosition = modelViewMatrix * vec4( offset, 1.0 );
    mvPosition.xy += rotatedPosition;
#endif

	vColor = color;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>

	#include <clipping_planes_vertex>

	#include <tile_vertex>
	#include <soft_vertex>
}
`,Zr=`
#include <common>
#include <color_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#include <tile_pars_vertex>
#include <soft_pars_vertex>

attribute vec3 offset;
attribute vec4 rotation;
attribute vec3 size;
// attribute vec4 color;

void main() {

    float x2 = rotation.x + rotation.x, y2 = rotation.y + rotation.y, z2 = rotation.z + rotation.z;
    float xx = rotation.x * x2, xy = rotation.x * y2, xz = rotation.x * z2;
    float yy = rotation.y * y2, yz = rotation.y * z2, zz = rotation.z * z2;
    float wx = rotation.w * x2, wy = rotation.w * y2, wz = rotation.w * z2;
    float sx = size.x, sy = size.y, sz = size.z;
    
    mat4 matrix = mat4(( 1.0 - ( yy + zz ) ) * sx, ( xy + wz ) * sx, ( xz - wy ) * sx, 0.0,  // 1. column
                      ( xy - wz ) * sy, ( 1.0 - ( xx + zz ) ) * sy, ( yz + wx ) * sy, 0.0,  // 2. column
                      ( xz + wy ) * sz, ( yz - wx ) * sz, ( 1.0 - ( xx + yy ) ) * sz, 0.0,  // 3. column
                      offset.x, offset.y, offset.z, 1.0);
    
    vec4 mvPosition = modelViewMatrix * (matrix * vec4( position, 1.0 ));

	vColor = color;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
    #include <tile_vertex>
    #include <soft_vertex>
}
`,bi=`
#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>

attribute vec3 offset;
attribute vec4 rotation;
attribute vec3 size;
#include <tile_pars_vertex>
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

    #include <tile_vertex>
    float x2 = rotation.x + rotation.x, y2 = rotation.y + rotation.y, z2 = rotation.z + rotation.z;
    float xx = rotation.x * x2, xy = rotation.x * y2, xz = rotation.x * z2;
    float yy = rotation.y * y2, yz = rotation.y * z2, zz = rotation.z * z2;
    float wx = rotation.w * x2, wy = rotation.w * y2, wz = rotation.w * z2;
    float sx = size.x, sy = size.y, sz = size.z;

    mat4 particleMatrix = mat4(( 1.0 - ( yy + zz ) ) * sx, ( xy + wz ) * sx, ( xz - wy ) * sx, 0.0,  // 1. column
                      ( xy - wz ) * sy, ( 1.0 - ( xx + zz ) ) * sy, ( yz + wx ) * sy, 0.0,  // 2. column
                      ( xz + wy ) * sz, ( yz - wx ) * sz, ( 1.0 - ( xx + yy ) ) * sz, 0.0,  // 3. column
                      offset.x, offset.y, offset.z, 1.0);

#include <color_vertex>
#include <morphinstance_vertex>
#include <morphcolor_vertex>
#include <batching_vertex>

#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>

	// replace defaultnormal_vertex
	vec3 transformedNormal = objectNormal;
    mat3 m = mat3( particleMatrix );
    transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
    transformedNormal = m * transformedNormal;
    transformedNormal = normalMatrix * transformedNormal;
    #ifdef FLIP_SIDED
        transformedNormal = - transformedNormal;
    #endif
    #ifdef USE_TANGENT
        vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
        #ifdef FLIP_SIDED
        transformedTangent = - transformedTangent;
        #endif
    #endif

	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>

	// replace include <project_vertex>
  vec4 mvPosition = vec4( transformed, 1.0 );
  mvPosition = modelViewMatrix * (particleMatrix * mvPosition);
	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	
	vViewPosition = - mvPosition.xyz;
	
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
    vWorldPosition = worldPosition.xyz;
#endif
}
`,$r=`
#include <common>
#include <color_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#include <tile_pars_vertex>
#include <soft_pars_vertex>

attribute vec3 offset;
attribute float rotation;
attribute vec3 size;
attribute vec4 velocity;

uniform float speedFactor;

void main() {
    float lengthFactor = velocity.w;
    float avgSize = (size.x + size.y) * 0.5;
#ifdef USE_SKEW
    vec4 mvPosition = modelViewMatrix * vec4( offset, 1.0 );
    vec3 viewVelocity = normalMatrix * velocity.xyz;

    vec3 scaledPos = vec3(position.xy * size.xy, position.z);
    float vlength = length(viewVelocity);
    vec3 projVelocity =  dot(scaledPos, viewVelocity) * viewVelocity / vlength;
    mvPosition.xyz += scaledPos + projVelocity * (speedFactor / avgSize + lengthFactor / vlength);
#else
    vec4 mvPosition = modelViewMatrix * vec4( offset, 1.0 );
    vec3 viewVelocity = normalMatrix * velocity.xyz;
    float vlength = length(viewVelocity); 
    mvPosition.xyz += position.y * normalize(cross(mvPosition.xyz, viewVelocity)) * avgSize; // switch the cross to  match unity implementation
    mvPosition.xyz -= (position.x + 0.5) * viewVelocity * (1.0 + lengthFactor / vlength) * avgSize; // minus position.x to match unity implementation
#endif
	vColor = color;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <tile_vertex>
	#include <soft_vertex>
}
`;function Si(c){return c===0?"uv":`uv${c}`}class Wr extends ps{constructor(t){super(t)}onBeforeCompile(t,e){super.onBeforeCompile(t,e),t.vertexShader=bi,t.fragmentShader=zi}}class Qr extends ys{constructor(t){super(t)}onBeforeCompile(t,e){super.onBeforeCompile(t,e),t.vertexShader=bi,t.fragmentShader=zi}}new z(0,0,1);class Kr extends ts{constructor(t){super(t),this.vector_=new z,this.vector2_=new z,this.vector3_=new z,this.quaternion_=new V,this.quaternion2_=new V,this.quaternion3_=new V,this.rotationMat_=new pt,this.rotationMat2_=new pt,this.maxParticles=1e3,this.setupBuffers(),this.rebuildMaterial()}buildExpandableBuffers(){this.offsetBuffer=new At(new Float32Array(this.maxParticles*3),3),this.offsetBuffer.setUsage(j),this.geometry.setAttribute("offset",this.offsetBuffer),this.colorBuffer=new At(new Float32Array(this.maxParticles*4),4),this.colorBuffer.setUsage(j),this.geometry.setAttribute("color",this.colorBuffer),this.settings.renderMode===w.Mesh?(this.rotationBuffer=new At(new Float32Array(this.maxParticles*4),4),this.rotationBuffer.setUsage(j),this.geometry.setAttribute("rotation",this.rotationBuffer)):(this.settings.renderMode===w.BillBoard||this.settings.renderMode===w.HorizontalBillBoard||this.settings.renderMode===w.VerticalBillBoard||this.settings.renderMode===w.StretchedBillBoard)&&(this.rotationBuffer=new At(new Float32Array(this.maxParticles),1),this.rotationBuffer.setUsage(j),this.geometry.setAttribute("rotation",this.rotationBuffer)),this.sizeBuffer=new At(new Float32Array(this.maxParticles*3),3),this.sizeBuffer.setUsage(j),this.geometry.setAttribute("size",this.sizeBuffer),this.uvTileBuffer=new At(new Float32Array(this.maxParticles),1),this.uvTileBuffer.setUsage(j),this.geometry.setAttribute("uvTile",this.uvTileBuffer),this.settings.renderMode===w.StretchedBillBoard&&(this.velocityBuffer=new At(new Float32Array(this.maxParticles*4),4),this.velocityBuffer.setUsage(j),this.geometry.setAttribute("velocity",this.velocityBuffer))}setupBuffers(){this.geometry&&this.geometry.dispose(),this.geometry=new fs,this.geometry.setIndex(this.settings.instancingGeometry.getIndex()),this.settings.instancingGeometry.hasAttribute("normal")&&this.geometry.setAttribute("normal",this.settings.instancingGeometry.getAttribute("normal")),this.geometry.setAttribute("position",this.settings.instancingGeometry.getAttribute("position")),this.geometry.setAttribute("uv",this.settings.instancingGeometry.getAttribute("uv")),this.buildExpandableBuffers()}expandBuffers(t){for(;t>=this.maxParticles;)this.maxParticles*=2;this.setupBuffers()}rebuildMaterial(){this.layers.mask=this.settings.layers.mask;const t={},e={};this.settings.material.type!=="MeshStandardMaterial"&&this.settings.material.type!=="MeshPhysicalMaterial"&&(t.map=new ct(this.settings.material.map)),this.settings.material.alphaTest&&(e.USE_ALPHATEST="",t.alphaTest=new ct(this.settings.material.alphaTest)),e.USE_UV="";const i=this.settings.uTileCount,s=this.settings.vTileCount;(i>1||s>1)&&(e.UV_TILE="",t.tileCount=new ct(new Jt(i,s))),this.settings.material.defines&&this.settings.material.defines.USE_COLOR_AS_ALPHA!==void 0&&(e.USE_COLOR_AS_ALPHA=""),this.settings.material.normalMap&&(e.USE_NORMALMAP="",e.NORMALMAP_UV=Si(this.settings.material.normalMap.channel),t.normalMapTransform=new ct(new pt().copy(this.settings.material.normalMap.matrix))),this.settings.material.map&&(e.USE_MAP="",this.settings.blendTiles&&(e.TILE_BLEND=""),e.MAP_UV=Si(this.settings.material.map.channel),t.mapTransform=new ct(new pt().copy(this.settings.material.map.matrix))),e.USE_COLOR_ALPHA="";let r;if(this.settings.softParticles){e.SOFT_PARTICLES="";const a=this.settings.softNearFade,o=1/(this.settings.softFarFade-this.settings.softNearFade);t.softParams=new ct(new Jt(a,o)),t.depthTexture=new ct(null);const h=t.projParams=new ct(new et);r=(l,u,m)=>{h.value.set(m.near,m.far,0,0)}}let n=!1;if(this.settings.renderMode===w.BillBoard||this.settings.renderMode===w.VerticalBillBoard||this.settings.renderMode===w.HorizontalBillBoard||this.settings.renderMode===w.Mesh){let a,o;this.settings.renderMode===w.Mesh?this.settings.material.type==="MeshStandardMaterial"||this.settings.material.type==="MeshPhysicalMaterial"?(e.USE_COLOR="",a=bi,o=zi,n=!0):(a=Zr,o=pi):(a=Hr,o=pi),this.settings.renderMode===w.VerticalBillBoard?e.VERTICAL="":this.settings.renderMode===w.HorizontalBillBoard&&(e.HORIZONTAL="");let h=!1;this.settings.renderMode===w.Mesh&&(this.settings.material.type==="MeshStandardMaterial"?(this.material=new Wr({}),this.material.copy(this.settings.material),this.material.uniforms=t,this.material.defines=e,h=!0):this.settings.material.type==="MeshPhysicalMaterial"&&(this.material=new Qr({}),this.material.copy(this.settings.material),this.material.uniforms=t,this.material.defines=e,h=!0)),h||(this.material=new gi({uniforms:t,defines:e,vertexShader:a,fragmentShader:o,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,blending:this.settings.material.blending,side:this.settings.material.side,alphaTest:this.settings.material.alphaTest,depthTest:this.settings.material.depthTest,lights:n}))}else if(this.settings.renderMode===w.StretchedBillBoard)t.speedFactor=new ct(1),this.material=new gi({uniforms:t,defines:e,vertexShader:$r,fragmentShader:pi,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,blending:this.settings.material.blending,side:this.settings.material.side,alphaTest:this.settings.material.alphaTest,depthTest:this.settings.material.depthTest});else throw new Error("render mode unavailable");this.material&&r&&(this.material.onBeforeRender=r)}update(){let t=0,e=0;this.systems.forEach(i=>{e+=i.particleNum}),e>this.maxParticles&&this.expandBuffers(e),this.systems.forEach(i=>{const s=i.particles,r=i.particleNum,n=this.quaternion2_,a=this.vector2_,o=this.vector3_;i.emitter.matrixWorld.decompose(a,n,o),this.rotationMat_.setFromMatrix4(i.emitter.matrixWorld);for(let h=0;h<r;h++,t++){const l=s[h];if(this.settings.renderMode===w.Mesh){let m;if(i.worldSpace)m=l.rotation;else{let d;l.parentMatrix?d=this.quaternion3_.setFromRotationMatrix(l.parentMatrix):d=n,m=this.quaternion_,m.copy(d).multiply(l.rotation)}this.rotationBuffer.setXYZW(t,m.x,m.y,m.z,m.w)}else(this.settings.renderMode===w.StretchedBillBoard||this.settings.renderMode===w.VerticalBillBoard||this.settings.renderMode===w.HorizontalBillBoard||this.settings.renderMode===w.BillBoard)&&this.rotationBuffer.setX(t,l.rotation);let u;if(i.worldSpace?u=l.position:(u=this.vector_,l.parentMatrix?u.copy(l.position).applyMatrix4(l.parentMatrix):u.copy(l.position).applyMatrix4(i.emitter.matrixWorld)),this.offsetBuffer.setXYZ(t,u.x,u.y,u.z),this.colorBuffer.setXYZW(t,l.color.x,l.color.y,l.color.z,l.color.w),i.worldSpace?this.sizeBuffer.setXYZ(t,l.size.x,l.size.y,l.size.z):l.parentMatrix?this.sizeBuffer.setXYZ(t,l.size.x,l.size.y,l.size.z):this.sizeBuffer.setXYZ(t,l.size.x*Math.abs(o.x),l.size.y*Math.abs(o.y),l.size.z*Math.abs(o.z)),this.uvTileBuffer.setX(t,l.uvTile),this.settings.renderMode===w.StretchedBillBoard&&this.velocityBuffer){let m=i.rendererEmitterSettings.speedFactor;m===0&&(m=.001);const d=i.rendererEmitterSettings.lengthFactor;let f;i.worldSpace?f=l.velocity:(f=this.vector_,l.parentMatrix?(this.rotationMat2_.setFromMatrix4(l.parentMatrix),f.copy(l.velocity).applyMatrix3(this.rotationMat2_)):f.copy(l.velocity).applyMatrix3(this.rotationMat_)),this.velocityBuffer.setXYZW(t,f.x*m,f.y*m,f.z*m,d)}}}),this.geometry.instanceCount=t,t>0&&(this.offsetBuffer.clearUpdateRanges(),this.offsetBuffer.addUpdateRange(0,t*3),this.offsetBuffer.needsUpdate=!0,this.sizeBuffer.clearUpdateRanges(),this.sizeBuffer.addUpdateRange(0,t*3),this.sizeBuffer.needsUpdate=!0,this.colorBuffer.clearUpdateRanges(),this.colorBuffer.addUpdateRange(0,t*4),this.colorBuffer.needsUpdate=!0,this.uvTileBuffer.clearUpdateRanges(),this.uvTileBuffer.addUpdateRange(0,t),this.uvTileBuffer.needsUpdate=!0,this.settings.renderMode===w.StretchedBillBoard&&this.velocityBuffer&&(this.velocityBuffer.clearUpdateRanges(),this.velocityBuffer.addUpdateRange(0,t*4),this.velocityBuffer.needsUpdate=!0),this.settings.renderMode===w.Mesh?(this.rotationBuffer.clearUpdateRanges(),this.rotationBuffer.addUpdateRange(0,t*4),this.rotationBuffer.needsUpdate=!0):(this.settings.renderMode===w.StretchedBillBoard||this.settings.renderMode===w.HorizontalBillBoard||this.settings.renderMode===w.VerticalBillBoard||this.settings.renderMode===w.BillBoard)&&(this.rotationBuffer.clearUpdateRanges(),this.rotationBuffer.addUpdateRange(0,t),this.rotationBuffer.needsUpdate=!0))}dispose(){this.geometry.dispose()}}var jr=`

#include <common>
#include <tile_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform sampler2D alphaMap;
uniform float useAlphaMap;
uniform float visibility;
uniform float alphaTest;

varying vec4 vColor;
    
void main() {
    #include <clipping_planes_fragment>
    #include <logdepthbuf_fragment>

    vec4 diffuseColor = vColor;
    
    #ifdef USE_MAP
    #include <tile_fragment>
    #ifndef USE_COLOR_AS_ALPHA
    #endif
    #endif
    if( useAlphaMap == 1. ) diffuseColor.a *= texture2D( alphaMap, vUv).a;
    if( diffuseColor.a < alphaTest ) discard;
    gl_FragColor = diffuseColor;

    #include <fog_fragment>
    #include <tonemapping_fragment>
}`,tn=`
#include <common>
#include <tile_pars_vertex>
#include <color_pars_vertex>
#include <clipping_planes_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <fog_pars_vertex>

attribute vec3 previous;
attribute vec3 next;
attribute float side;
attribute float width;

uniform vec2 resolution;
uniform float lineWidth;
uniform float sizeAttenuation;
    
vec2 fix(vec4 i, float aspect) {
    vec2 res = i.xy / i.w;
    res.x *= aspect;
    return res;
}
    
void main() {

    #include <tile_vertex>
    
    float aspect = resolution.x / resolution.y;

    vColor = color;

    mat4 m = projectionMatrix * modelViewMatrix;
    vec4 finalPosition = m * vec4( position, 1.0 );
    vec4 prevPos = m * vec4( previous, 1.0 );
    vec4 nextPos = m * vec4( next, 1.0 );

    vec2 currentP = fix( finalPosition, aspect );
    vec2 prevP = fix( prevPos, aspect );
    vec2 nextP = fix( nextPos, aspect );

    float w = lineWidth * width;

    vec2 dir;
    if( nextP == currentP ) dir = normalize( currentP - prevP );
    else if( prevP == currentP ) dir = normalize( nextP - currentP );
    else {
        vec2 dir1 = normalize( currentP - prevP );
        vec2 dir2 = normalize( nextP - currentP );
        dir = normalize( dir1 + dir2 );

        vec2 perp = vec2( -dir1.y, dir1.x );
        vec2 miter = vec2( -dir.y, dir.x );
        //w = clamp( w / dot( miter, perp ), 0., 4., * lineWidth * width );

    }

    //vec2 normal = ( cross( vec3( dir, 0. ) vec3( 0., 0., 1. ) ) ).xy;
    vec4 normal = vec4( -dir.y, dir.x, 0., 1. );
    normal.xy *= .5 * w;
    normal *= projectionMatrix;
    if( sizeAttenuation == 0. ) {
        normal.xy *= finalPosition.w;
        normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;
    }

    finalPosition.xy += normal.xy * side;

    gl_Position = finalPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    
	#include <fog_vertex>
}`;new z(0,0,1);class en extends ts{constructor(t){super(t),this.vector_=new z,this.vector2_=new z,this.vector3_=new z,this.quaternion_=new V,this.maxParticles=1e4,this.setupBuffers(),this.rebuildMaterial()}setupBuffers(){this.geometry&&this.geometry.dispose(),this.geometry=new Ri,this.indexBuffer=new zt(new Uint32Array(this.maxParticles*6),1),this.indexBuffer.setUsage(j),this.geometry.setIndex(this.indexBuffer),this.positionBuffer=new zt(new Float32Array(this.maxParticles*6),3),this.positionBuffer.setUsage(j),this.geometry.setAttribute("position",this.positionBuffer),this.previousBuffer=new zt(new Float32Array(this.maxParticles*6),3),this.previousBuffer.setUsage(j),this.geometry.setAttribute("previous",this.previousBuffer),this.nextBuffer=new zt(new Float32Array(this.maxParticles*6),3),this.nextBuffer.setUsage(j),this.geometry.setAttribute("next",this.nextBuffer),this.widthBuffer=new zt(new Float32Array(this.maxParticles*2),1),this.widthBuffer.setUsage(j),this.geometry.setAttribute("width",this.widthBuffer),this.sideBuffer=new zt(new Float32Array(this.maxParticles*2),1),this.sideBuffer.setUsage(j),this.geometry.setAttribute("side",this.sideBuffer),this.uvBuffer=new zt(new Float32Array(this.maxParticles*4),2),this.uvBuffer.setUsage(j),this.geometry.setAttribute("uv",this.uvBuffer),this.colorBuffer=new zt(new Float32Array(this.maxParticles*8),4),this.colorBuffer.setUsage(j),this.geometry.setAttribute("color",this.colorBuffer)}expandBuffers(t){for(;t>=this.maxParticles;)this.maxParticles*=2;this.setupBuffers()}rebuildMaterial(){this.layers.mask=this.settings.layers.mask;const t={lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},resolution:{value:new Jt(1,1)},sizeAttenuation:{value:1},visibility:{value:1},alphaTest:{value:0}},e={};if(e.USE_UV="",e.USE_COLOR_ALPHA="",this.settings.material.map&&(e.USE_MAP="",e.MAP_UV=Si(this.settings.material.map.channel),t.map=new ct(this.settings.material.map),t.mapTransform=new ct(new pt().copy(this.settings.material.map.matrix))),this.settings.material.defines&&this.settings.material.defines.USE_COLOR_AS_ALPHA!==void 0&&(e.USE_COLOR_AS_ALPHA=""),this.settings.renderMode===w.Trail)this.material=new gi({uniforms:t,defines:e,vertexShader:tn,fragmentShader:jr,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,side:this.settings.material.side,blending:this.settings.material.blending||Mi});else throw new Error("render mode unavailable")}update(){let t=0,e=0,i=0;this.systems.forEach(s=>{for(let r=0;r<s.particleNum;r++)i+=s.particles[r].previous.length*2}),i>this.maxParticles&&this.expandBuffers(i),this.systems.forEach(s=>{const r=this.quaternion_,n=this.vector2_,a=this.vector3_;s.emitter.matrixWorld.decompose(n,r,a);const o=s.particles,h=s.particleNum,l=this.settings.uTileCount,u=this.settings.vTileCount,m=1/l,d=1/u;for(let f=0;f<h;f++){const p=o[f],g=p.uvTile%u,v=Math.floor(p.uvTile/u+.001),b=p.previous.values();let M=b.next(),S=M.value,y=S;M.done||(M=b.next());let _;M.value!==void 0?_=M.value:_=y;for(let x=0;x<p.previous.length;x++,t+=2){if(this.positionBuffer.setXYZ(t,y.position.x,y.position.y,y.position.z),this.positionBuffer.setXYZ(t+1,y.position.x,y.position.y,y.position.z),s.worldSpace?(this.positionBuffer.setXYZ(t,y.position.x,y.position.y,y.position.z),this.positionBuffer.setXYZ(t+1,y.position.x,y.position.y,y.position.z)):(p.parentMatrix?this.vector_.copy(y.position).applyMatrix4(p.parentMatrix):this.vector_.copy(y.position).applyMatrix4(s.emitter.matrixWorld),this.positionBuffer.setXYZ(t,this.vector_.x,this.vector_.y,this.vector_.z),this.positionBuffer.setXYZ(t+1,this.vector_.x,this.vector_.y,this.vector_.z)),s.worldSpace?(this.previousBuffer.setXYZ(t,S.position.x,S.position.y,S.position.z),this.previousBuffer.setXYZ(t+1,S.position.x,S.position.y,S.position.z)):(p.parentMatrix?this.vector_.copy(S.position).applyMatrix4(p.parentMatrix):this.vector_.copy(S.position).applyMatrix4(s.emitter.matrixWorld),this.previousBuffer.setXYZ(t,this.vector_.x,this.vector_.y,this.vector_.z),this.previousBuffer.setXYZ(t+1,this.vector_.x,this.vector_.y,this.vector_.z)),s.worldSpace?(this.nextBuffer.setXYZ(t,_.position.x,_.position.y,_.position.z),this.nextBuffer.setXYZ(t+1,_.position.x,_.position.y,_.position.z)):(p.parentMatrix?this.vector_.copy(_.position).applyMatrix4(p.parentMatrix):this.vector_.copy(_.position).applyMatrix4(s.emitter.matrixWorld),this.nextBuffer.setXYZ(t,this.vector_.x,this.vector_.y,this.vector_.z),this.nextBuffer.setXYZ(t+1,this.vector_.x,this.vector_.y,this.vector_.z)),this.sideBuffer.setX(t,-1),this.sideBuffer.setX(t+1,1),s.worldSpace)this.widthBuffer.setX(t,y.size),this.widthBuffer.setX(t+1,y.size);else if(p.parentMatrix)this.widthBuffer.setX(t,y.size),this.widthBuffer.setX(t+1,y.size);else{const O=(Math.abs(a.x)+Math.abs(a.y)+Math.abs(a.z))/3;this.widthBuffer.setX(t,y.size*O),this.widthBuffer.setX(t+1,y.size*O)}this.uvBuffer.setXY(t,(x/p.previous.length+g)*m,(u-v-1)*d),this.uvBuffer.setXY(t+1,(x/p.previous.length+g)*m,(u-v)*d),this.colorBuffer.setXYZW(t,y.color.x,y.color.y,y.color.z,y.color.w),this.colorBuffer.setXYZW(t+1,y.color.x,y.color.y,y.color.z,y.color.w),x+1<p.previous.length&&(this.indexBuffer.setX(e*3,t),this.indexBuffer.setX(e*3+1,t+1),this.indexBuffer.setX(e*3+2,t+2),e++,this.indexBuffer.setX(e*3,t+2),this.indexBuffer.setX(e*3+1,t+1),this.indexBuffer.setX(e*3+2,t+3),e++),S=y,y=_,M.done||(M=b.next(),M.value!==void 0&&(_=M.value))}}}),this.positionBuffer.clearUpdateRanges(),this.positionBuffer.addUpdateRange(0,t*3),this.positionBuffer.needsUpdate=!0,this.previousBuffer.clearUpdateRanges(),this.previousBuffer.addUpdateRange(0,t*3),this.previousBuffer.needsUpdate=!0,this.nextBuffer.clearUpdateRanges(),this.nextBuffer.addUpdateRange(0,t*3),this.nextBuffer.needsUpdate=!0,this.sideBuffer.clearUpdateRanges(),this.sideBuffer.addUpdateRange(0,t),this.sideBuffer.needsUpdate=!0,this.widthBuffer.clearUpdateRanges(),this.widthBuffer.addUpdateRange(0,t),this.widthBuffer.needsUpdate=!0,this.uvBuffer.clearUpdateRanges(),this.uvBuffer.addUpdateRange(0,t*2),this.uvBuffer.needsUpdate=!0,this.colorBuffer.clearUpdateRanges(),this.colorBuffer.addUpdateRange(0,t*4),this.colorBuffer.needsUpdate=!0,this.indexBuffer.clearUpdateRanges(),this.indexBuffer.addUpdateRange(0,e*3),this.indexBuffer.needsUpdate=!0,this.geometry.setDrawRange(0,e*3)}dispose(){this.geometry.dispose()}}class Ne{get geometry(){return this._geometry}set geometry(t){if(this._geometry=t,t===void 0||typeof t=="string")return;const e=new gs;this._triangleIndexToArea.length=0;let i=0;if(!t.getIndex())return;const s=t.getIndex().array,r=s.length/3;this._triangleIndexToArea.push(0);for(let n=0;n<r;n++)e.setFromAttributeAndIndices(t.getAttribute("position"),s[n*3],s[n*3+1],s[n*3+2]),i+=e.getArea(),this._triangleIndexToArea.push(i);t.userData.triangleIndexToArea=this._triangleIndexToArea}constructor(t){this.type="mesh_surface",this._triangleIndexToArea=[],this._tempA=new ut,this._tempB=new ut,this._tempC=new ut,t&&(this.geometry=t)}initialize(t){const e=this._geometry;if(!e||e.getIndex()===null){t.position.set(0,0,0),t.velocity.set(0,0,1).multiplyScalar(t.startSpeed);return}const i=this._triangleIndexToArea.length-1;let s=0,r=i;const n=Math.random()*this._triangleIndexToArea[i];for(;s+1<r;){const d=Math.floor((s+r)/2);n<this._triangleIndexToArea[d]?r=d:s=d}let a=Math.random(),o=Math.random();a+o>1&&(a=1-a,o=1-o);const h=e.getIndex().array[s*3],l=e.getIndex().array[s*3+1],u=e.getIndex().array[s*3+2],m=e.getAttribute("position");this._tempA.fromBufferAttribute(m,h),this._tempB.fromBufferAttribute(m,l),this._tempC.fromBufferAttribute(m,u),this._tempB.sub(this._tempA),this._tempC.sub(this._tempA),this._tempA.addScaledVector(this._tempB,a).addScaledVector(this._tempC,o),t.position.copy(this._tempA),this._tempA.copy(this._tempB).cross(this._tempC).normalize(),t.velocity.copy(this._tempA).normalize().multiplyScalar(t.startSpeed)}toJSON(){return{type:"mesh_surface",mesh:this._geometry?this._geometry.uuid:""}}static fromJSON(t,e){return new Ne(e.geometries[t.geometry])}clone(){return new Ne(this._geometry)}update(t,e){}}Cr({id:"three.quarks",emitterShapes:[{type:"mesh_surface",params:[["geometry",["geometry"]]],constructor:Ne,loadJSON:Ne.fromJSON}],behaviors:[]});let sn=class es extends Vi{constructor(){super(),this.batches=[],this.systemToBatchIndex=new Map,this.type="BatchedRenderer",this.depthTexture=null}static equals(t,e){return t.material.side===e.material.side&&t.material.blending===e.material.blending&&t.material.transparent===e.material.transparent&&t.material.depthTest===e.material.depthTest&&t.material.type===e.material.type&&t.material.alphaTest===e.material.alphaTest&&t.material.map===e.material.map&&t.renderMode===e.renderMode&&t.blendTiles===e.blendTiles&&t.softParticles===e.softParticles&&t.softFarFade===e.softFarFade&&t.softNearFade===e.softNearFade&&t.uTileCount===e.uTileCount&&t.vTileCount===e.vTileCount&&t.instancingGeometry===e.instancingGeometry&&t.renderOrder===e.renderOrder&&t.layers.mask===e.layers.mask}addSystem(t){t._renderer=this;const e=t.getRendererSettings();for(let s=0;s<this.batches.length;s++)if(es.equals(this.batches[s].settings,e)){this.batches[s].addSystem(t),this.systemToBatchIndex.set(t,s);return}let i;switch(e.renderMode){case w.Trail:i=new en(e);break;case w.Mesh:case w.BillBoard:case w.VerticalBillBoard:case w.HorizontalBillBoard:case w.StretchedBillBoard:i=new Kr(e);break}this.depthTexture&&i.applyDepthTexture(this.depthTexture),i.addSystem(t),this.batches.push(i),this.systemToBatchIndex.set(t,this.batches.length-1),this.add(i)}deleteSystem(t){const e=this.systemToBatchIndex.get(t);e!=null&&(this.batches[e].removeSystem(t),this.systemToBatchIndex.delete(t))}setDepthTexture(t){this.depthTexture=t;for(const e of this.batches)e.applyDepthTexture(t)}updateSystem(t){this.deleteSystem(t),this.addSystem(t)}update(t){this.systemToBatchIndex.forEach((e,i)=>{i.update(t)});for(let e=0;e<this.batches.length;e++)this.batches[e].update()}};Jr();console.log("%c Particle system powered by three.quarks. https://quarks.art/","font-size: 14px; font-weight: bold;");const rn="/previews/pr-1751/_astro/fire3.lFy7OwnQ.png",nn="/previews/pr-1751/_astro/smoke.DKJcQUg-.png",is=()=>Bs("quarks-renderer",()=>{console.log("RENDERER");const{autoRenderTask:c,scene:t}=Ji(),e=new sn;return t.add(e),Ae(i=>{e.update(i)},{before:c}),{renderer:e}});function Bi(c,t){yt(t,!0);const e=()=>Cs(o,"$parent",i),[i,s]=Us();let r=Hi(t,"system",15),n=Es(t,["$$slots","$$events","$$legacy","name","children","system"]);const{renderer:a}=is();r(new Ye({...n}));const o=vs();Re(()=>(Ti(e(),"Object3D")&&e().add(r().emitter),()=>{Ti(e(),"Object3D")&&e().remove(r().emitter)})),Re(()=>{t.name&&r(r().emitter.name=t.name,!0)}),Re(()=>(a.addSystem(r()),()=>{a.deleteSystem(r())}));var h=ot(),l=k(h);Ze(l,()=>t.children??Le,()=>({system:r()})),B(c,h),gt(),s()}function ki(c,t){yt(t,!0);let e=Hi(t,"system",7);const i=e().emissionOverTime,s=new C(0);as(()=>{t.active?e().emissionOverTime=i:e().emissionOverTime=s}),gt()}var on=Y("<!> <!>",1);function an(c,t){yt(t,!0);const e=(n,a,o)=>[n/255,a/255,o/255],i=n=>{n=n.replace(/^#/,"");const a=parseInt(n,16),o=a>>16&255,h=a>>8&255,l=a&255;return[o/255,h/255,l/255]};var s=ot(),r=k(s);As(r,()=>bs([nn,rn]),null,(n,a)=>{var o=I(()=>{var[d,f]=T(a);return{smokeMap:d,fireMap:f}}),h=I(()=>T(o).smokeMap),l=I(()=>T(o).fireMap),u=ot(),m=k(u);{let d=I(()=>90*Et);F(m,()=>U.Group,(f,p)=>{p(f,{get"rotation.x"(){return T(d)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Thruster.svelte",index:0},children:(g,v)=>{var b=on(),M=k(b);{const y=(W,Q)=>{let K=()=>Q?.().system;ki(W,{get system(){return K()},get active(){return t.active}})};let _=I(()=>new Ve({map:T(h),transparent:!0})),x=I(()=>new st(1,3)),O=I(()=>new C(2)),A=I(()=>new st(.2,.4)),P=I(()=>new st(0,360*Et)),N=I(()=>new Pt(new et(1,1,1,1))),R=I(()=>new C(200)),G=I(()=>new Bt({radius:.05,angle:10*Et})),X=I(()=>[new kt(new St([[new z(...i("#493B32")),0],[new z(...e(38,38,38)),.2],[new z(1,1,1),1]],[[1,0],[0,1]])),new Rt(new Ct([[new _t(1,1.1,2.1,5),0]]))]);Bi(M,{get material(){return T(_)},duration:1,looping:!0,get startLife(){return T(x)},get startSpeed(){return T(O)},get startSize(){return T(A)},get startRotation(){return T(P)},get startColor(){return T(N)},worldSpace:!0,get emissionOverTime(){return T(R)},get shape(){return T(G)},uTileCount:1,vTileCount:1,get renderMode(){return w.BillBoard},rendererEmitterSettings:{followLocalOrigin:!0},get behaviors(){return T(X)},children:y,$$slots:{default:!0}})}var S=L(M,2);{const y=(W,Q)=>{let K=()=>Q?.().system;ki(W,{get system(){return K()},get active(){return t.active}})};let _=I(()=>new Ve({map:T(l),transparent:!0,blending:Mi})),x=I(()=>new st(.2,.4)),O=I(()=>new C(2)),A=I(()=>new st(.2,.3)),P=I(()=>new st(0,360*Et)),N=I(()=>new Pt(new et(...i("#FFFFFF"),1))),R=I(()=>new C(150)),G=I(()=>new Bt({radius:.05,angle:10*Et})),X=I(()=>[new kt(new St([[new z(...i("#FFFFFF")),0],[new z(...i("#FFFFFF")),1]],[[1,0],[0,1]])),new Rt(new Ct([[new _t(1,1.1,1.2,3),0]]))]);Bi(S,{get material(){return T(_)},duration:1,looping:!0,get startLife(){return T(x)},get startSpeed(){return T(O)},get startSize(){return T(A)},get startRotation(){return T(P)},get startColor(){return T(N)},worldSpace:!0,get emissionOverTime(){return T(R)},get shape(){return T(G)},uTileCount:1,vTileCount:1,get renderMode(){return w.BillBoard},rendererEmitterSettings:{followLocalOrigin:!0},get behaviors(){return T(X)},children:y,$$slots:{default:!0}})}B(g,b)},$$slots:{default:!0}})})}B(n,u)}),B(c,s),gt()}var hn=Y("<!> <!>",1),ln=Y("<!> <!> <!> <!>",1);function cn(c,t){let e=ee("left");const i=r=>s.find(n=>n.key===r);let s=hs([]);Je("keydown",Fe,r=>{const n=r.key;if(i(n)||!n.match(/^[a-z]$/)||r.ctrlKey||r.shiftKey||r.altKey||r.metaKey)return;const a={side:T(e),key:n,active:!1};s.push(a),Lt(e,T(e)==="left"?"right":"left",!0)}),Je("keyup",Fe,r=>{const n=r.key,a=i(n);a&&(a.active=!0)}),Ss(c,{canSleep:!1,linearDamping:.4,angularDamping:5,enabledRotations:[!1,!1,!0],type:"dynamic",children:(n,a)=>{let o=()=>a?.().rigidBody;var h=ln(),l=k(h);Ze(l,()=>t.children??Le);var u=L(l,2);{var m=p=>{Fs(p,{get rigidBody(){return o()},linearMax:1e-5,angularMax:1e-5,get onstatic(){return t.onsleep}})};Gi(u,p=>{t.checkIsStatic&&p(m)})}var d=L(u,2);qi(d,17,()=>s,Yi,(p,g)=>{{const v=(S,y=Le)=>{an(S,{get active(){return y()}})};let b=I(()=>T(g).side==="left"?-.5:.25),M=I(()=>T(g).side==="left"?-.25:.5);Hs(p,{get rigidBody(){return o()},get key(){return T(g).key},get min(){return T(b)},get max(){return T(M)},get active(){return T(g).active},children:v,$$slots:{default:!0}})}});var f=L(d,2);He(f,{children:(p,g)=>{var v=ot(),b=k(v);F(b,()=>U.Mesh,(M,S)=>{S(M,{castShadow:!0,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Rocket.svelte",index:0},children:(y,_)=>{var x=hn(),O=k(x);F(O,()=>U.MeshStandardMaterial,(P,N)=>{N(P,{color:"red",transparent:!0,opacity:.4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Rocket.svelte",index:1}})});var A=L(O,2);F(A,()=>U.BoxGeometry,(P,N)=>{N(P,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Rocket.svelte",index:2}})}),B(y,x)},$$slots:{default:!0}})}),B(p,v)},$$slots:{default:!0}}),B(n,h)},$$slots:{default:!0}})}var un=Y("<!> <!>",1),dn=Y("<!> <!>",1);function mn(c,t){var e=ot(),i=k(e);F(i,()=>U.Group,(s,r)=>{r(s,{get position(){return t.position},get rotation(){return t.rotation},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Start.svelte",index:0},children:(n,a)=>{var o=dn(),h=k(o);Ze(h,()=>t.children);var l=L(h,2);He(l,{children:(u,m)=>{var d=ot(),f=k(d);F(f,()=>U.Mesh,(p,g)=>{g(p,{position:[0,-1.1,0],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Start.svelte",index:1},children:(v,b)=>{var M=un(),S=k(M);F(S,()=>U.BoxGeometry,(_,x)=>{x(_,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Start.svelte",index:2}})});var y=L(S,2);F(y,()=>U.MeshStandardMaterial,(_,x)=>{x(_,{color:"red",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Start.svelte",index:3}})}),B(v,M)},$$slots:{default:!0}})}),B(u,d)},$$slots:{default:!0}}),B(n,o)},$$slots:{default:!0}})}),B(c,e)}var fn=Y("<!> <!>",1);function pn(c,t){yt(t,!1);const e=new ut;let i=!1,s=new Fi,r=new xs;Ae(()=>{s.getWorldPosition(e),e.z=r.position.z,i?r.position.lerp(e,.05):(i=!0,r.position.copy(e))}),Zi();var n=fn(),a=k(n);U(a,{get is(){return s},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/FollowCamera.svelte",index:0}});var o=L(a,2);Xi(o,{id:"scene",children:(h,l)=>{U(h,{get is(){return r},makeDefault:!0,position:[0,0,10],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/FollowCamera.svelte",index:1}})},$$slots:{default:!0}}),B(c,n),gt()}var yn=Y("<!> <!>",1),gn=Y("<!> <!> <!> <!> <!>",1);function vn(c,t){yt(t,!0);let e=ee(!1),i=ee(!1);Re(()=>{T(e)&&T(i)&&t.levelcomplete()});var s=gn(),r=k(s);mn(r,{get position(){return t.level.start.position},get rotation(){return t.level.start.rotation},children:(l,u)=>{cn(l,{get checkIsStatic(){return T(e)},onsleep:()=>Lt(i,!0),children:d=>{pn(d,{})}})}});var n=L(r,2);Is(n,{get position(){return t.level.goal.position},get rotation(){return t.level.goal.rotation},ongoal:()=>{Lt(e,!0)}});var a=L(n,2);qi(a,17,()=>t.level.blocks,Yi,(l,u)=>{var m=ot(),d=k(m);F(d,()=>U.Group,(f,p)=>{p(f,{get position(){return T(u).position},get rotation(){return T(u).rotation},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:0},children:(g,v)=>{He(g,{children:(b,M)=>{var S=ot(),y=k(S);F(y,()=>U.Mesh,(_,x)=>{x(_,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:1},children:(O,A)=>{var P=yn(),N=k(P);F(N,()=>U.BoxGeometry,(G,X)=>{X(G,{args:[1,1,1],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:2}})});var R=L(N,2);F(R,()=>U.MeshStandardMaterial,(G,X)=>{X(G,{color:"blue",transparent:!0,opacity:.4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:3}})}),B(O,P)},$$slots:{default:!0}})}),B(b,S)},$$slots:{default:!0}})},$$slots:{default:!0}})}),B(l,m)});var o=L(a,2);F(o,()=>U.AmbientLight,(l,u)=>{u(l,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:4}})});var h=L(o,2);F(h,()=>U.DirectionalLight,(l,u)=>{u(l,{position:[4,10,0],castShadow:!0,"shadow.mapSize":1024,"shadow.camera.left":-10,"shadow.camera.right":10,"shadow.camera.top":10,"shadow.camera.bottom":-10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:5}})}),B(c,s),gt()}class ss{constructor(t,e,i){this.type=t,this.position=e,this.rotation=i}}class rs{constructor(t,e){this.position=t,this.rotation=e}}class ns{constructor(t,e){this.position=t,this.rotation=e}}class os{constructor(t,e,i){this.start=t,this.goal=e,this.blocks=i}}const xn=new os(new rs([0,-1,0],[0,0,0]),new ns([3,0,0],[0,0,0]),[new ss("Box",[-3,0,0],[0,0,0])]),_n=new os(new rs([0,-2,0],[0,0,0]),new ns([2,0,0],[0,0,0]),[new ss("Box",[-2,0,0],[0,0,0])]);var Sn=Y("<!> <!> <!>",1);function Mn(c,t){yt(t,!0);const e=[xn,_n];let i=ee(0);const s=I(()=>e[T(i)]),r=()=>{T(i)<e.length-1&&Lt(i,T(i)+1)},{scene:n}=Ji();n.background=new _s("black");var a=Sn(),o=k(a);Os(o,{id:"scene"});var h=L(o,2);zs(h,()=>T(i),u=>{var m=ot(),d=k(m);{var f=p=>{vn(p,{get level(){return T(s)},levelcomplete:r})};Gi(d,p=>{T(s)&&p(f)})}B(u,m)});var l=L(h,2);Ts(l,{}),B(c,a),gt()}function wn(c,t){yt(t,!1),is(),Zi(),gt()}var zn=Y("<!> <!> <!>",1),bn=Y('<main class="svelte-1e2szb4"><!></main>');function mo(c){var t=bn(),e=ls(t);us(e,{children:(i,s)=>{Ms(i,{gravity:[0,-1,0],framerate:120,children:(r,n)=>{var a=zn(),o=k(a);ws(o,{});var h=L(o,2);wn(h,{});var l=L(h,2);Mn(l,{}),B(r,a)},$$slots:{default:!0}})},$$slots:{default:!0}}),cs(t),B(c,t)}export{mo as default};
