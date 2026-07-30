import"./disclose-version.DwdwGuwu.js";import{At as Qs,Ft as B,G as Ks,H as Ms,It as I,Kt as R,Lt as js,Nt as ae,Pt as tr,R as k,U as er,Ut as Gt,V as ws,Vt as Nt,W as zs,Xt as pt,Yt as yt,Z as ye,_ as bs,ht as T,it as Y,kt as ee,lt as oe,n as Ts,nn as ir,nt as U,o as sr,on as he,r as rr,rt as nt,s as nr}from"./client.CmGS4DHB.js";import"./legacy.BVIVHw1B.js";import{An as ar,Ir as or,Jn as ie,Lr as hr,O as lr,Or as Os,Qr as cr,a as $t,b as ur,ei as Ps,f as dr,i as mr,kn as zt,kr as le,l as C,m as Ji,ot as St,pi as fr,qr as Ns,s as Es,so as lt,st as As,tn as j,to as pr,vo as ct,ya as Le,yn as Cs,yt as yr}from"./lib.BP7gumtS.js";import{At as gr,P as vr,f as xr,m as Us,p as _r}from"./lib.CCfBeaz9.js";import{a as Sr,g as Bs,i as Mr,o as wr,r as ge,s as zr}from"./lib2.D0ymwsy2.js";var br=Y("<!> <!>",1),Tr=Y("<!> <!>",1);function Or(r,t){var e=nt(),i=B(e);k(i,()=>C.Group,(s,n)=>{n(s,{get position(){return t.position},get rotation(){return t.rotation},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:0},children:(a,h)=>{var o=Tr(),l=B(o);k(l,()=>C.Group,(c,u)=>{u(c,{"position.y":.1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:1},children:(m,d)=>{Mr(m,{shape:"cuboid",args:[.4,.5,.4],sensor:!0,get onsensorenter(){return t.ongoal}})},$$slots:{default:!0}})}),ge(I(l,2),{children:(c,u)=>{var m=nt(),d=B(m);k(d,()=>C.Mesh,(f,p)=>{p(f,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:2},children:(g,v)=>{var _=br(),M=B(_);k(M,()=>C.BoxGeometry,(x,S)=>{S(x,{args:[1,1,1],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:3}})});var y=I(M,2);k(y,()=>C.MeshStandardMaterial,(x,S)=>{S(x,{color:"green",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:4}})}),U(g,_)},$$slots:{default:!0}})}),U(c,m)},$$slots:{default:!0}}),U(a,o)},$$slots:{default:!0}})}),U(r,e)}function Pr(r,t){pt(t,!0);const e=Bs(),i=new ct,s=(n,a)=>(i.set(n.x,n.y,n.z),i.length()<a);$t(()=>{s(t.rigidBody.angvel(),t.angularMax)&&s(t.rigidBody.linvel(),t.linearMax)&&t.onstatic()},{after:e.simulationTask}),yt()}var Nr=Y("<!> <!>",1),Er=Y("<!> <!>",1),Ar=Y("<!> <!>",1),Cr=Y("<!> <!> <!>",1);function Ur(r,t){pt(t,!0);let e=R(()=>t.color??"red");const i=new As,s=new ct,n=new Os,a=new Cs;$t(()=>{const c=new ct(t.origin.x,t.origin.y,t.origin.z);t.length?s.set(t.impulse.x,t.impulse.y,t.impulse.z).normalize().multiplyScalar(t.length):s.set(t.impulse.x,t.impulse.y,t.impulse.z),t.multiplier&&s.multiplyScalar(t.multiplier);const u=c.clone().add(s),m=[];m.push(c),m.push(u),i.setFromPoints(m),!(!n||!a)&&(n.position.copy(c),a.position.copy(u),a.lookAt(c))},{after:t.afterTask??[]});var h=Cr(),o=B(h);k(o,()=>C.Line,(c,u)=>{u(c,{renderOrder:1,frustumCulled:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:0},children:(m,d)=>{var f=Nr(),p=B(f);C(p,{get is(){return i},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:1}});var g=I(p,2);k(g,()=>C.LineBasicMaterial,(v,_)=>{_(v,{get color(){return T(e)},depthTest:!1,depthWrite:!1,get side(){return 2},transparent:!0,opacity:1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:2}})}),U(m,f)},$$slots:{default:!0}})});var l=I(o,2);C(l,{get is(){return n},frustumCulled:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:3},children:(c,u)=>{var m=Er(),d=B(m);k(d,()=>C.SphereGeometry,(p,g)=>{g(p,{args:[.03],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:4}})});var f=I(d,2);k(f,()=>C.MeshBasicMaterial,(p,g)=>{g(p,{get color(){return T(e)},depthTest:!1,depthWrite:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:5}})}),U(c,m)},$$slots:{default:!0}}),C(I(l,2),{get is(){return a},frustumCulled:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:6},children:(c,u)=>{var m=nt(),d=B(m);k(d,()=>C.Mesh,(f,p)=>{p(f,{"rotation.x":-90*Math.PI/180,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:7},children:(g,v)=>{var _=Ar(),M=B(_);k(M,()=>C.ConeGeometry,(x,S)=>{S(x,{args:[.03,.1],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:8}})});var y=I(M,2);k(y,()=>C.MeshBasicMaterial,(x,S)=>{S(x,{get color(){return T(e)},depthTest:!1,depthWrite:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:9}})}),U(g,_)},$$slots:{default:!0}})}),U(c,m)},$$slots:{default:!0}}),U(r,h),yt()}var Br=(r,t)=>Math.random()*(t-r)+r,Rr=Y("<!> <!>",1),kr=Y("<!> <!>",1);function Fr(r,t){pt(t,!0);const e=Bs();let i=Gt(!1);const s=5,n=new ct(Br(t.min,t.max),-.5,0),a=new ct,h=new ct,o=new ct,l=new fr,c=$t(f=>{if(!t.rigidBody)return;const p=t.rigidBody.rotation();l.set(p.x,p.y,p.z,p.w);const g=t.rigidBody.translation();h.set(g.x,g.y,g.z),o.copy(n),o.applyQuaternion(l),h.add(o),a.set(0,s*f,0),a.applyQuaternion(l),T(i)&&t.active&&t.rigidBody.applyImpulseAtPoint(a,h,!0)},{before:e.simulationTask}),u=R(()=>T(i)&&t.active);var m=kr();oe("keydown",ae,f=>{f.key===t.key&&Nt(i,!0)}),oe("keyup",ae,f=>{f.key===t.key&&Nt(i,!1)});var d=B(m);k(d,()=>C.Group,(f,p)=>{p(f,{"position.y":-.5,get"position.x"(){return n.x},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Player.svelte",index:0},children:(g,v)=>{var _=Rr(),M=B(_);xr(M,{"position.y":-.1,get text(){return t.key},renderOrder:1e3});var y=I(M,2);ye(y,()=>t.children??he,()=>T(u)),U(g,_)},$$slots:{default:!0}})}),Us(I(d,2),{id:"scene",children:(f,p)=>{{let g=R(()=>T(i)&&t.active?10:1);Ur(f,{get origin(){return h},get impulse(){return a},get afterTask(){return c.task},get multiplier(){return T(g)}})}},$$slots:{default:!0}}),U(r,m),yt()}var $=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Di=1234567,bt=Math.PI/180,Rs=180/Math.PI;function Ir(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return($[r&255]+$[r>>8&255]+$[r>>16&255]+$[r>>24&255]+"-"+$[t&255]+$[t>>8&255]+"-"+$[t>>16&15|64]+$[t>>24&255]+"-"+$[e&63|128]+$[e>>8&255]+"-"+$[e>>16&255]+$[e>>24&255]+$[i&255]+$[i>>8&255]+$[i>>16&255]+$[i>>24&255]).toLowerCase()}function mt(r,t,e){return Math.max(t,Math.min(e,r))}function ks(r,t){return(r%t+t)%t}function Lr(r,t,e,i,s){return i+(r-t)*(s-i)/(e-t)}function Vr(r,t,e){return r!==t?(e-r)/(t-r):0}function Fs(r,t,e){return(1-e)*r+e*t}function Jr(r,t,e,i){return Fs(r,t,1-Math.exp(-e*i))}function Dr(r,t=1){return t-Math.abs(ks(r,t*2)-t)}function Gr(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function Xr(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function qr(r,t){return r+Math.floor(Math.random()*(t-r+1))}function Yr(r,t){return r+Math.random()*(t-r)}function Hr(r){return r*(.5-Math.random())}function Zr(r){r!==void 0&&(Di=r);let t=Di+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function $r(r){return r*bt}function Wr(r){return r*Rs}function Qr(r){return(r&r-1)===0&&r!==0}function Kr(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function jr(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function tn(r,t,e,i,s){const n=Math.cos,a=Math.sin,h=n(e/2),o=a(e/2),l=n((t+i)/2),c=a((t+i)/2),u=n((t-i)/2),m=a((t-i)/2),d=n((i-t)/2),f=a((i-t)/2);switch(s){case"XYX":r.set(h*c,o*u,o*m,h*l);break;case"YZY":r.set(o*m,h*c,o*u,h*l);break;case"ZXZ":r.set(o*u,o*m,h*c,h*l);break;case"XZX":r.set(h*c,o*f,o*d,h*l);break;case"YXY":r.set(o*d,h*c,o*f,h*l);break;case"ZYZ":r.set(o*f,o*d,h*c,h*l);break;default:console.warn("../math.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function en(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function sn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var At={DEG2RAD:bt,RAD2DEG:Rs,generateUUID:Ir,clamp:mt,euclideanModulo:ks,mapLinear:Lr,inverseLerp:Vr,lerp:Fs,damp:Jr,pingpong:Dr,smoothstep:Gr,smootherstep:Xr,randInt:qr,randFloat:Yr,randFloatSpread:Hr,seededRandom:Zr,degToRad:$r,radToDeg:Wr,isPowerOfTwo:Qr,ceilPowerOfTwo:Kr,floorPowerOfTwo:jr,setQuaternionFromProperEuler:tn,normalize:sn,denormalize:en},J=class Is{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,n,a,h){let o=i[s+0],l=i[s+1],c=i[s+2],u=i[s+3];const m=n[a+0],d=n[a+1],f=n[a+2],p=n[a+3];if(h===0){t[e+0]=o,t[e+1]=l,t[e+2]=c,t[e+3]=u;return}if(h===1){t[e+0]=m,t[e+1]=d,t[e+2]=f,t[e+3]=p;return}if(u!==p||o!==m||l!==d||c!==f){let g=1-h;const v=o*m+l*d+c*f+u*p,_=v>=0?1:-1,M=1-v*v;if(M>Number.EPSILON){const x=Math.sqrt(M),S=Math.atan2(x,v*_);g=Math.sin(g*S)/x,h=Math.sin(h*S)/x}const y=h*_;if(o=o*g+m*y,l=l*g+d*y,c=c*g+f*y,u=u*g+p*y,g===1-h){const x=1/Math.sqrt(o*o+l*l+c*c+u*u);o*=x,l*=x,c*=x,u*=x}}t[e]=o,t[e+1]=l,t[e+2]=c,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,n,a){const h=i[s],o=i[s+1],l=i[s+2],c=i[s+3],u=n[a],m=n[a+1],d=n[a+2],f=n[a+3];return t[e]=h*f+c*u+o*d-l*m,t[e+1]=o*f+c*m+l*u-h*d,t[e+2]=l*f+c*d+h*m-o*u,t[e+3]=c*f-h*u-o*m-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new Is(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,n=t._z,a=t._order,h=Math.cos,o=Math.sin,l=h(i/2),c=h(s/2),u=h(n/2),m=o(i/2),d=o(s/2),f=o(n/2);switch(a){case"XYZ":this._x=m*c*u+l*d*f,this._y=l*d*u-m*c*f,this._z=l*c*f+m*d*u,this._w=l*c*u-m*d*f;break;case"YXZ":this._x=m*c*u+l*d*f,this._y=l*d*u-m*c*f,this._z=l*c*f-m*d*u,this._w=l*c*u+m*d*f;break;case"ZXY":this._x=m*c*u-l*d*f,this._y=l*d*u+m*c*f,this._z=l*c*f+m*d*u,this._w=l*c*u-m*d*f;break;case"ZYX":this._x=m*c*u-l*d*f,this._y=l*d*u+m*c*f,this._z=l*c*f-m*d*u,this._w=l*c*u+m*d*f;break;case"YZX":this._x=m*c*u+l*d*f,this._y=l*d*u+m*c*f,this._z=l*c*f-m*d*u,this._w=l*c*u-m*d*f;break;case"XZY":this._x=m*c*u-l*d*f,this._y=l*d*u-m*c*f,this._z=l*c*f+m*d*u,this._w=l*c*u+m*d*f;break;default:console.warn("../math.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],n=e[8],a=e[1],h=e[5],o=e[9],l=e[2],c=e[6],u=e[10],m=i+h+u;if(m>0){const d=.5/Math.sqrt(m+1);this._w=.25/d,this._x=(c-o)*d,this._y=(n-l)*d,this._z=(a-s)*d}else if(i>h&&i>u){const d=2*Math.sqrt(1+i-h-u);this._w=(c-o)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(n+l)/d}else if(h>u){const d=2*Math.sqrt(1+h-i-u);this._w=(n-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(o+c)/d}else{const d=2*Math.sqrt(1+u-i-h);this._w=(a-s)/d,this._x=(n+l)/d,this._y=(o+c)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(mt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,n=t._z,a=t._w,h=e._x,o=e._y,l=e._z,c=e._w;return this._x=i*c+a*h+s*l-n*o,this._y=s*c+a*o+n*h-i*l,this._z=n*c+a*l+i*o-s*h,this._w=a*c-i*h-s*o-n*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,n=this._z,a=this._w;let h=a*t._w+i*t._x+s*t._y+n*t._z;if(h<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,h=-h):this.copy(t),h>=1)return this._w=a,this._x=i,this._y=s,this._z=n,this;const o=1-h*h;if(o<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*n+e*this._z,this.normalize(),this}const l=Math.sqrt(o),c=Math.atan2(l,h),u=Math.sin((1-e)*c)/l,m=Math.sin(e*c)/l;return this._w=a*u+this._w*m,this._x=i*u+this._x*m,this._y=s*u+this._y*m,this._z=n*u+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),n=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),n*Math.sin(e),n*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},z=class Ve{constructor(t=0,e=0,i=0){this.isVector3=!0,Ve.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new Ve(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gi.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gi.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6]*s,this.y=n[1]*e+n[4]*i+n[7]*s,this.z=n[2]*e+n[5]*i+n[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,n=t.elements,a=1/(n[3]*e+n[7]*i+n[11]*s+n[15]);return this.x=(n[0]*e+n[4]*i+n[8]*s+n[12])*a,this.y=(n[1]*e+n[5]*i+n[9]*s+n[13])*a,this.z=(n[2]*e+n[6]*i+n[10]*s+n[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,n=t.x,a=t.y,h=t.z,o=t.w,l=2*(a*s-h*i),c=2*(h*e-n*s),u=2*(n*i-a*e);return this.x=e+o*l+a*u-h*c,this.y=i+o*c+h*l-n*u,this.z=s+o*u+n*c-a*l,this}transformDirection(t){const e=this.x,i=this.y,s=this.z,n=t.elements;return this.x=n[0]*e+n[4]*i+n[8]*s,this.y=n[1]*e+n[5]*i+n[9]*s,this.z=n[2]*e+n[6]*i+n[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,n=t.z,a=e.x,h=e.y,o=e.z;return this.x=s*o-n*h,this.y=n*a-i*o,this.z=i*h-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ae.copy(this).projectOnVector(t),this.sub(Ae)}reflect(t){return this.sub(Ae.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(mt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}abs(){return this.x=Math.abs(this.x),this.y=Math.abs(this.y),this.z=Math.abs(this.z),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ae=new z,Gi=new J,Xi=2e3;var Fi=class Je{constructor(t,e,i,s,n,a,h,o,l,c,u,m,d,f,p,g){this.isMatrix4=!0,Je.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,n,a,h,o,l,c,u,m,d,f,p,g)}extractPosition(t){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(t)}multiplyToArray(t,e,i){return console.error("THREE.Matrix4: .multiplyToArray() has been removed."),this}setRotationFromQuaternion(t){return this.makeRotationFromQuaternion(t)}set(t,e,i,s,n,a,h,o,l,c,u,m,d,f,p,g){const v=this.elements;return v[0]=t,v[4]=e,v[8]=i,v[12]=s,v[1]=n,v[5]=a,v[9]=h,v[13]=o,v[2]=l,v[6]=c,v[10]=u,v[14]=m,v[3]=d,v[7]=f,v[11]=p,v[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Je().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Ot.setFromMatrixColumn(t,0).length(),n=1/Ot.setFromMatrixColumn(t,1).length(),a=1/Ot.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*n,e[5]=i[5]*n,e[6]=i[6]*n,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,n=t.z,a=Math.cos(i),h=Math.sin(i),o=Math.cos(s),l=Math.sin(s),c=Math.cos(n),u=Math.sin(n);if(t.order==="XYZ"){const m=a*c,d=a*u,f=h*c,p=h*u;e[0]=o*c,e[4]=-o*u,e[8]=l,e[1]=d+f*l,e[5]=m-p*l,e[9]=-h*o,e[2]=p-m*l,e[6]=f+d*l,e[10]=a*o}else if(t.order==="YXZ"){const m=o*c,d=o*u,f=l*c,p=l*u;e[0]=m+p*h,e[4]=f*h-d,e[8]=a*l,e[1]=a*u,e[5]=a*c,e[9]=-h,e[2]=d*h-f,e[6]=p+m*h,e[10]=a*o}else if(t.order==="ZXY"){const m=o*c,d=o*u,f=l*c,p=l*u;e[0]=m-p*h,e[4]=-a*u,e[8]=f+d*h,e[1]=d+f*h,e[5]=a*c,e[9]=p-m*h,e[2]=-a*l,e[6]=h,e[10]=a*o}else if(t.order==="ZYX"){const m=a*c,d=a*u,f=h*c,p=h*u;e[0]=o*c,e[4]=f*l-d,e[8]=m*l+p,e[1]=o*u,e[5]=p*l+m,e[9]=d*l-f,e[2]=-l,e[6]=h*o,e[10]=a*o}else if(t.order==="YZX"){const m=a*o,d=a*l,f=h*o,p=h*l;e[0]=o*c,e[4]=p-m*u,e[8]=f*u+d,e[1]=u,e[5]=a*c,e[9]=-h*c,e[2]=-l*c,e[6]=d*u+f,e[10]=m-p*u}else if(t.order==="XZY"){const m=a*o,d=a*l,f=h*o,p=h*l;e[0]=o*c,e[4]=-u,e[8]=l*c,e[1]=m*u+p,e[5]=a*c,e[9]=d*u-f,e[2]=f*u-d,e[6]=h*c,e[10]=p*u+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(rn,t,nn)}lookAt(t,e,i){const s=this.elements;return et.subVectors(t,e),et.lengthSq()===0&&(et.z=1),et.normalize(),Mt.crossVectors(i,et),Mt.lengthSq()===0&&(Math.abs(i.z)===1?et.x+=1e-4:et.z+=1e-4,et.normalize(),Mt.crossVectors(i,et)),Mt.normalize(),Qt.crossVectors(et,Mt),s[0]=Mt.x,s[4]=Qt.x,s[8]=et.x,s[1]=Mt.y,s[5]=Qt.y,s[9]=et.y,s[2]=Mt.z,s[6]=Qt.z,s[10]=et.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,n=this.elements,a=i[0],h=i[4],o=i[8],l=i[12],c=i[1],u=i[5],m=i[9],d=i[13],f=i[2],p=i[6],g=i[10],v=i[14],_=i[3],M=i[7],y=i[11],x=i[15],S=s[0],w=s[4],O=s[8],P=s[12],N=s[1],F=s[5],L=s[9],G=s[13],X=s[2],W=s[6],Q=s[10],K=s[14],ot=s[3],it=s[7],st=s[11],rt=s[15];return n[0]=a*S+h*N+o*X+l*ot,n[4]=a*w+h*F+o*W+l*it,n[8]=a*O+h*L+o*Q+l*st,n[12]=a*P+h*G+o*K+l*rt,n[1]=c*S+u*N+m*X+d*ot,n[5]=c*w+u*F+m*W+d*it,n[9]=c*O+u*L+m*Q+d*st,n[13]=c*P+u*G+m*K+d*rt,n[2]=f*S+p*N+g*X+v*ot,n[6]=f*w+p*F+g*W+v*it,n[10]=f*O+p*L+g*Q+v*st,n[14]=f*P+p*G+g*K+v*rt,n[3]=_*S+M*N+y*X+x*ot,n[7]=_*w+M*F+y*W+x*it,n[11]=_*O+M*L+y*Q+x*st,n[15]=_*P+M*G+y*K+x*rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],n=t[12],a=t[1],h=t[5],o=t[9],l=t[13],c=t[2],u=t[6],m=t[10],d=t[14],f=t[3],p=t[7],g=t[11],v=t[15];return f*(+n*o*u-s*l*u-n*h*m+i*l*m+s*h*d-i*o*d)+p*(+e*o*d-e*l*m+n*a*m-s*a*d+s*l*c-n*o*c)+g*(+e*l*u-e*h*d-n*a*u+i*a*d+n*h*c-i*l*c)+v*(-s*h*c-e*o*u+e*h*m+s*a*u-i*a*m+i*o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],n=t[3],a=t[4],h=t[5],o=t[6],l=t[7],c=t[8],u=t[9],m=t[10],d=t[11],f=t[12],p=t[13],g=t[14],v=t[15],_=u*g*l-p*m*l+p*o*d-h*g*d-u*o*v+h*m*v,M=f*m*l-c*g*l-f*o*d+a*g*d+c*o*v-a*m*v,y=c*p*l-f*u*l+f*h*d-a*p*d-c*h*v+a*u*v,x=f*u*o-c*p*o-f*h*m+a*p*m+c*h*g-a*u*g,S=e*_+i*M+s*y+n*x;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/S;return t[0]=_*w,t[1]=(p*m*n-u*g*n-p*s*d+i*g*d+u*s*v-i*m*v)*w,t[2]=(h*g*n-p*o*n+p*s*l-i*g*l-h*s*v+i*o*v)*w,t[3]=(u*o*n-h*m*n-u*s*l+i*m*l+h*s*d-i*o*d)*w,t[4]=M*w,t[5]=(c*g*n-f*m*n+f*s*d-e*g*d-c*s*v+e*m*v)*w,t[6]=(f*o*n-a*g*n-f*s*l+e*g*l+a*s*v-e*o*v)*w,t[7]=(a*m*n-c*o*n+c*s*l-e*m*l-a*s*d+e*o*d)*w,t[8]=y*w,t[9]=(f*u*n-c*p*n-f*i*d+e*p*d+c*i*v-e*u*v)*w,t[10]=(a*p*n-f*h*n+f*i*l-e*p*l-a*i*v+e*h*v)*w,t[11]=(c*h*n-a*u*n-c*i*l+e*u*l+a*i*d-e*h*d)*w,t[12]=x*w,t[13]=(c*p*s-f*u*s+f*i*m-e*p*m-c*i*g+e*u*g)*w,t[14]=(f*h*s-a*p*s-f*i*o+e*p*o+a*i*g-e*h*g)*w,t[15]=(a*u*s-c*h*s+c*i*o-e*u*o-a*i*m+e*h*m)*w,this}scale(t){const e=this.elements,i=t.x,s=t.y,n=t.z;return e[0]*=i,e[4]*=s,e[8]*=n,e[1]*=i,e[5]*=s,e[9]*=n,e[2]*=i,e[6]*=s,e[10]*=n,e[3]*=i,e[7]*=s,e[11]*=n,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),n=1-i,a=t.x,h=t.y,o=t.z,l=n*a,c=n*h;return this.set(l*a+i,l*h-s*o,l*o+s*h,0,l*h+s*o,c*h+i,c*o-s*a,0,l*o-s*h,c*o+s*a,n*o*o+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,n,a){return this.set(1,i,n,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,n=e._x,a=e._y,h=e._z,o=e._w,l=n+n,c=a+a,u=h+h,m=n*l,d=n*c,f=n*u,p=a*c,g=a*u,v=h*u,_=o*l,M=o*c,y=o*u,x=i.x,S=i.y,w=i.z;return s[0]=(1-(p+v))*x,s[1]=(d+y)*x,s[2]=(f-M)*x,s[3]=0,s[4]=(d-y)*S,s[5]=(1-(m+v))*S,s[6]=(g+_)*S,s[7]=0,s[8]=(f+M)*w,s[9]=(g-_)*w,s[10]=(1-(m+p))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let n=Ot.set(s[0],s[1],s[2]).length();const a=Ot.set(s[4],s[5],s[6]).length(),h=Ot.set(s[8],s[9],s[10]).length();this.determinant()<0&&(n=-n),t.x=s[12],t.y=s[13],t.z=s[14],ht.copy(this);const o=1/n,l=1/a,c=1/h;return ht.elements[0]*=o,ht.elements[1]*=o,ht.elements[2]*=o,ht.elements[4]*=l,ht.elements[5]*=l,ht.elements[6]*=l,ht.elements[8]*=c,ht.elements[9]*=c,ht.elements[10]*=c,e.setFromRotationMatrix(ht),i.x=n,i.y=a,i.z=h,this}makePerspective(t,e,i,s,n,a,h=Xi){const o=this.elements,l=2*n/(e-t),c=2*n/(i-s),u=(e+t)/(e-t),m=(i+s)/(i-s);let d,f;if(h===2e3)d=-(a+n)/(a-n),f=-2*a*n/(a-n);else if(h===2001)d=-a/(a-n),f=-a*n/(a-n);else throw new Error("Matrix4.makePerspective(): Invalid coordinate system: "+h);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=m,o[13]=0,o[2]=0,o[6]=0,o[10]=d,o[14]=f,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,i,s,n,a,h=Xi){const o=this.elements,l=1/(e-t),c=1/(i-s),u=1/(a-n),m=(e+t)*l,d=(i+s)*c;let f,p;if(h===2e3)f=(a+n)*u,p=-2*u;else if(h===2001)f=n*u,p=-1*u;else throw new Error("../math.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-m,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-d,o[2]=0,o[6]=0,o[10]=p,o[14]=-f,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Ot=new z,ht=new Fi,rn=new z(0,0,0),nn=new z(1,1,1),Mt=new z,Qt=new z,et=new z,qi=new Fi,Yi=new J,Ls=class De{constructor(t=0,e=0,i=0,s=De.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new De(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,n=s[0],a=s[4],h=s[8],o=s[1],l=s[5],c=s[9],u=s[2],m=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(mt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-c,d),this._z=Math.atan2(-a,n)):(this._x=Math.atan2(m,l),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(h,d),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-u,n),this._z=0);break;case"ZXY":this._x=Math.asin(mt(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,n));break;case"ZYX":this._y=Math.asin(-mt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(m,d),this._z=Math.atan2(o,n)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,n)):(this._x=0,this._y=Math.atan2(h,d));break;case"XZY":this._z=Math.asin(-mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(m,l),this._y=Math.atan2(h,n)):(this._x=Math.atan2(-c,d),this._y=0);break;default:console.warn("../math.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return qi.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qi,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Yi.setFromEuler(this),this.setFromQuaternion(Yi,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(t){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ls.DEFAULT_ORDER="XYZ";var Et=class Vs{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new Vs(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(mt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),n=this.x-t.x,a=this.y-t.y;return this.x=n*i-a*s+t.x,this.y=n*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Et.isVector2=!0;var at=class Ge{constructor(t=0,e=0,i=0,s=1){Ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new Ge(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,n=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*n,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*n,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*n,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*n,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,n;const o=t.elements,l=o[0],c=o[4],u=o[8],m=o[1],d=o[5],f=o[9],p=o[2],g=o[6],v=o[10];if(Math.abs(c-m)<.01&&Math.abs(u-p)<.01&&Math.abs(f-g)<.01){if(Math.abs(c+m)<.1&&Math.abs(u+p)<.1&&Math.abs(f+g)<.1&&Math.abs(l+d+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,y=(d+1)/2,x=(v+1)/2,S=(c+m)/4,w=(u+p)/4,O=(f+g)/4;return M>y&&M>x?M<.01?(i=0,s=.707106781,n=.707106781):(i=Math.sqrt(M),s=S/i,n=w/i):y>x?y<.01?(i=.707106781,s=0,n=.707106781):(s=Math.sqrt(y),i=S/s,n=O/s):x<.01?(i=.707106781,s=.707106781,n=0):(n=Math.sqrt(x),i=w/n,s=O/n),this.set(i,s,n,e),this}let _=Math.sqrt((g-f)*(g-f)+(u-p)*(u-p)+(m-c)*(m-c));return Math.abs(_)<.001&&(_=1),this.x=(g-f)/_,this.y=(u-p)/_,this.z=(m-c)/_,this.w=Math.acos((l+d+v-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Tt=class Xe{constructor(t,e,i,s,n,a,h,o,l){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,n,a,h,o,l)}set(t,e,i,s,n,a,h,o,l){const c=this.elements;return c[0]=t,c[1]=s,c[2]=h,c[3]=e,c[4]=n,c[5]=o,c[6]=i,c[7]=a,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,n=this.elements,a=i[0],h=i[3],o=i[6],l=i[1],c=i[4],u=i[7],m=i[2],d=i[5],f=i[8],p=s[0],g=s[3],v=s[6],_=s[1],M=s[4],y=s[7],x=s[2],S=s[5],w=s[8];return n[0]=a*p+h*_+o*x,n[3]=a*g+h*M+o*S,n[6]=a*v+h*y+o*w,n[1]=l*p+c*_+u*x,n[4]=l*g+c*M+u*S,n[7]=l*v+c*y+u*w,n[2]=m*p+d*_+f*x,n[5]=m*g+d*M+f*S,n[8]=m*v+d*y+f*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],n=t[3],a=t[4],h=t[5],o=t[6],l=t[7],c=t[8];return e*a*c-e*h*l-i*n*c+i*h*o+s*n*l-s*a*o}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],n=t[3],a=t[4],h=t[5],o=t[6],l=t[7],c=t[8],u=c*a-h*l,m=h*o-c*n,d=l*n-a*o,f=e*u+i*m+s*d;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/f;return t[0]=u*p,t[1]=(s*l-c*i)*p,t[2]=(h*i-s*a)*p,t[3]=m*p,t[4]=(c*e-s*o)*p,t[5]=(s*n-h*e)*p,t[6]=d*p,t[7]=(i*o-l*e)*p,t[8]=(a*e-i*n)*p,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,n,a,h){const o=Math.cos(n),l=Math.sin(n);return this.set(i*o,i*l,-i*(o*a+l*h)+a+t,-s*l,s*o,-s*(-l*a+o*h)+h+e,0,0,1),this}scale(t,e){return this.premultiply(Ce.makeScale(t,e)),this}rotate(t){return this.premultiply(Ce.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ce.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new Xe().fromArray(this.elements)}},Ce=new Tt,tt;(function(r){r[r.Random=0]="Random",r[r.Loop=1]="Loop",r[r.PingPong=2]="PingPong",r[r.Burst=3]="Burst"})(tt||(tt={}));function Wt(r,t,e,i){let s;switch(tt.Random===r?t=Math.random():tt.Burst===r&&i.isBursting&&(t=i.burstParticleIndex/i.burstParticleCount),e>0?s=Math.floor(t/e)*e:s=t,r){case tt.Loop:s=s%1;break;case tt.PingPong:s=Math.abs(s%2-1);break}return s}var Xt=class Dt{constructor(t,e,i,s){this.p=[t,e,i,s]}genValue(t){const e=t*t,i=t*t*t,s=1-t,n=s*s,a=n*s;return this.p[0]*a+this.p[1]*n*t*3+this.p[2]*s*e*3+this.p[3]*i}derivativeCoefficients(t){const e=[];for(let i=t,s=i.length-1;s>0;s--){const n=[];for(let a=0;a<s;a++){const h=s*(i[a+1]-i[a]);n.push(h)}e.push(n),i=n}return e}getSlope(t){const e=this.derivativeCoefficients(this.p)[0],i=1-t,s=i*i,n=i*t*2,a=t*t;return s*e[0]+n*e[1]+a*e[2]}controlCurve(t,e){this.p[1]=t/3+this.p[0],this.p[2]=this.p[3]-e/3}hull(t){let e=this.p,i=[],s,n=0,a=0,h=0;const o=[];for(o[n++]=e[0],o[n++]=e[1],o[n++]=e[2],o[n++]=e[3];e.length>1;){for(i=[],a=0,h=e.length-1;a<h;a++)s=t*e[a]+(1-t)*e[a+1],o[n++]=s,i.push(s);e=i}return o}split(t){const e=this.hull(t);return{left:new Dt(e[0],e[4],e[7],e[9]),right:new Dt(e[9],e[8],e[6],e[3]),span:e}}clone(){return new Dt(this.p[0],this.p[1],this.p[2],this.p[3])}toJSON(){return{p0:this.p[0],p1:this.p[1],p2:this.p[2],p3:this.p[3]}}static fromJSON(t){return new Dt(t.p0,t.p1,t.p2,t.p3)}},qt=r=>({r:r.x,g:r.y,b:r.z,a:r.w}),Yt=r=>new at(r.r,r.g,r.b,r.a),an=(r,t)=>{switch(t){case"Vector3":return new z(r.x,r.y,r.z);case"Vector4":return new at(r.x,r.y,r.z,r.w);case"Color":return new z(r.r,r.g,r.b);case"Number":return r;default:return r}},on=(r,t)=>{switch(t){case"Vector3":return{x:r.x,y:r.y,z:r.z};case"Vector4":return{x:r.x,y:r.y,z:r.z,w:r.w};case"Color":return{r:r.x,g:r.y,b:r.z};case"Number":return r;default:return r}},hn=class qe{constructor(t,e){this.a=t,this.b=e,this.type="value"}startGen(t){}genColor(t,e){const i=Math.random();return e.copy(this.a).lerp(this.b,i)}toJSON(){return{type:"RandomColor",a:qt(this.a),b:qt(this.b)}}static fromJSON(t){return new qe(Yt(t.a),Yt(t.b))}clone(){return new qe(this.a.clone(),this.b.clone())}},Ye=class He{constructor(t,e){this.a=t,this.b=e,this.indexCount=-1,this.type="value"}startGen(t){this.indexCount=t.length,t.push(Math.random())}genColor(t,e){return this.indexCount===-1&&this.startGen(t),e.copy(this.a).lerp(this.b,t[this.indexCount])}toJSON(){return{type:"ColorRange",a:qt(this.a),b:qt(this.b)}}static fromJSON(t){return new He(Yt(t.a),Yt(t.b))}clone(){return new He(this.a.clone(),this.b.clone())}},Kt=class se{constructor(t,e){this.subType=e,this.type="function",this.keys=t}findKey(t){let e=0,i=0,s=this.keys.length-1;for(;i+1<s;)if(e=Math.floor((i+s)/2),t<this.getStartX(e))s=e-1;else if(t>this.getEndX(e))i=e+1;else return e;for(let n=i;n<=s;n++)if(t>=this.getStartX(n)&&t<=this.getEndX(n))return n;return-1}getStartX(t){return this.keys[t][1]}getEndX(t){return t+1<this.keys.length?this.keys[t+1][1]:1}genValue(t,e){const i=this.findKey(e);return this.subType==="Number"?i===-1?this.keys[0][0]:i+1>=this.keys.length?this.keys[this.keys.length-1][0]:(this.keys[i+1][0]-this.keys[i][0])*((e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))+this.keys[i][0]:i===-1?t.copy(this.keys[0][0]):i+1>=this.keys.length?t.copy(this.keys[this.keys.length-1][0]):t.copy(this.keys[i][0]).lerp(this.keys[i+1][0],(e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))}toJSON(){return this.keys[0][0].constructor.name,{type:"CLinearFunction",subType:this.subType,keys:this.keys.map(([t,e])=>({value:on(t,this.subType),pos:e}))}}static fromJSON(t){return new se(t.keys.map(e=>[an(e.value,t.subType),e.pos]),t.subType)}clone(){return this.subType==="Number"?new se(this.keys.map(([t,e])=>[t,e]),this.subType):new se(this.keys.map(([t,e])=>[t.clone(),e]),this.subType)}},jt=new z,Ht=class re{constructor(t=[[new z(0,0,0),0],[new z(1,1,1),0]],e=[[1,0],[1,1]]){this.type="function",this.color=new Kt(t,"Color"),this.alpha=new Kt(e,"Number")}genColor(t,e,i){return this.color.genValue(jt,i),e.set(jt.x,jt.y,jt.z,this.alpha.genValue(1,i))}toJSON(){return{type:"Gradient",color:this.color.toJSON(),alpha:this.alpha.toJSON()}}static fromJSON(t){if(t.functions){const e=t.functions.map(i=>[Ye.fromJSON(i.function).a,i.start]);return t.functions.length>0&&e.push([Ye.fromJSON(t.functions[t.functions.length-1].function).b,1]),new re(e.map(i=>[new z(i[0].x,i[0].y,i[0].z),i[1]]),e.map(i=>[i[0].w,i[1]]))}else{const e=new re;return e.alpha=Kt.fromJSON(t.alpha),e.color=Kt.fromJSON(t.color),e}}clone(){const t=new re;return t.alpha=this.alpha.clone(),t.color=this.color.clone(),t}startGen(t){}},Ue=new at,ln=class Ze{constructor(t,e){this.indexCount=0,this.type="function",this.gradient1=t,this.gradient2=e}startGen(t){this.indexCount=t.length,t.push(Math.random())}genColor(t,e,i){return this.gradient1.genColor(t,e,i),this.gradient2.genColor(t,Ue,i),t&&t[this.indexCount]!==void 0?e.lerp(Ue,t[this.indexCount]):e.lerp(Ue,Math.random()),e}toJSON(){return{type:"RandomColorBetweenGradient",gradient1:this.gradient1.toJSON(),gradient2:this.gradient2.toJSON()}}static fromJSON(t){return new Ze(Ht.fromJSON(t.gradient1),Ht.fromJSON(t.gradient2))}clone(){return new Ze(this.gradient1.clone(),this.gradient2.clone())}},Zt=class $e{constructor(t){this.color=t,this.type="value"}startGen(t){}genColor(t,e){return e.copy(this.color)}toJSON(){return{type:"ConstantColor",color:qt(this.color)}}static fromJSON(t){return new $e(Yt(t.color))}clone(){return new $e(this.color.clone())}};function Ii(r){switch(r.type){case"ConstantColor":return Zt.fromJSON(r);case"ColorRange":return Ye.fromJSON(r);case"RandomColor":return hn.fromJSON(r);case"Gradient":return Ht.fromJSON(r);case"RandomColorBetweenGradient":return ln.fromJSON(r);default:return new Zt(new at(1,1,1,1))}}var A=class We{constructor(t){this.value=t,this.type="value"}startGen(t){}genValue(t){return this.value}toJSON(){return{type:"ConstantValue",value:this.value}}static fromJSON(t){return new We(t.value)}clone(){return new We(this.value)}},ft=class Qe{constructor(t,e){this.a=t,this.b=e,this.indexCount=-1,this.type="value"}startGen(t){this.indexCount=t.length,t.push(Math.random())}genValue(t){return this.indexCount===-1&&this.startGen(t),At.lerp(this.a,this.b,t[this.indexCount])}toJSON(){return{type:"IntervalValue",a:this.a,b:this.b}}static fromJSON(t){return new Qe(t.a,t.b)}clone(){return new Qe(this.a,this.b)}},cn=class{constructor(){this.functions=new Array}findFunction(r){let t=0,e=0,i=this.functions.length-1;for(;e+1<i;)if(t=Math.floor((e+i)/2),r<this.getStartX(t))i=t-1;else if(r>this.getEndX(t))e=t+1;else return t;for(let s=e;s<=i;s++)if(r>=this.functions[s][1]&&r<=this.getEndX(s))return s;return-1}getStartX(r){return this.functions[r][1]}setStartX(r,t){r>0&&(this.functions[r][1]=t)}getEndX(r){return r+1<this.functions.length?this.functions[r+1][1]:1}setEndX(r,t){r+1<this.functions.length&&(this.functions[r+1][1]=t)}insertFunction(r,t){const e=this.findFunction(r);this.functions.splice(e+1,0,[t,r])}removeFunction(r){return this.functions.splice(r,1)[0][0]}getFunction(r){return this.functions[r][0]}setFunction(r,t){this.functions[r][0]=t}get numOfFunctions(){return this.functions.length}},ce=class Ke extends cn{constructor(t=[[new Xt(0,1/3,1/3*2,1),0]]){super(),this.type="function",this.functions=t}genValue(t,e=0){const i=this.findFunction(e);return i===-1?0:this.functions[i][0].genValue((e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))}toSVG(t,e){if(e<1)return"";let i=["M",0,this.functions[0][0].p[0]].join(" ");for(let s=1/e;s<=1;s+=1/e)i=[i,"L",s*t,this.genValue(void 0,s)].join(" ");return i}toJSON(){return{type:"PiecewiseBezier",functions:this.functions.map(([t,e])=>({function:t.toJSON(),start:e}))}}static fromJSON(t){return new Ke(t.functions.map(e=>[Xt.fromJSON(e.function),e.start]))}clone(){return new Ke(this.functions.map(([t,e])=>[t.clone(),e]))}startGen(t){}};function E(r){switch(r.type){case"ConstantValue":return A.fromJSON(r);case"IntervalValue":return ft.fromJSON(r);case"PiecewiseBezier":return ce.fromJSON(r);default:return new A(0)}}var Hi=class je{constructor(){this.indexCount=0,this.type="rotation"}startGen(t){this.indexCount=t.length,t.push(new J);let e,i,s,n,a,h;do e=Math.random()*2-1,i=Math.random()*2-1,s=e*e+i*i;while(s>1);do n=Math.random()*2-1,a=Math.random()*2-1,h=n*n+a*a;while(h>1);const o=Math.sqrt((1-s)/h);t[this.indexCount].set(e,i,o*n,o*a)}genValue(t,e,i,s){return this.indexCount===-1&&this.startGen(t),e.copy(t[this.indexCount]),e}toJSON(){return{type:"RandomQuat"}}static fromJSON(t){return new je}clone(){return new je}},Js=class ti{constructor(t,e){this.axis=t,this.angle=e,this.type="rotation"}startGen(t){this.angle.startGen(t)}genValue(t,e,i,s){return e.setFromAxisAngle(this.axis,this.angle.genValue(t,s)*i)}toJSON(){return{type:"AxisAngle",axis:{x:this.axis.x,y:this.axis.y,z:this.axis.z},angle:this.angle.toJSON()}}static fromJSON(t){return new ti(new z(t.axis.x,t.axis.y,t.axis.z),E(t.angle))}clone(){return new ti(this.axis.clone(),this.angle.clone())}},un=class ei{constructor(t,e,i,s){this.angleX=t,this.angleY=e,this.angleZ=i,this.type="rotation",this.eular=new Ls(0,0,0,s)}startGen(t){this.angleX.startGen(t),this.angleY.startGen(t),this.angleZ.startGen(t)}genValue(t,e,i,s){return this.eular.set(this.angleX.genValue(t,s)*i,this.angleY.genValue(t,s)*i,this.angleZ.genValue(t,s)*i),e.setFromEuler(this.eular)}toJSON(){return{type:"Euler",angleX:this.angleX.toJSON(),angleY:this.angleY.toJSON(),angleZ:this.angleZ.toJSON(),eulerOrder:this.eular.order}}static fromJSON(t){return new ei(E(t.angleX),E(t.angleY),E(t.angleZ),t.eulerOrder)}clone(){return new ei(this.angleX,this.angleY,this.angleZ,this.eular.order)}};function Ds(r){switch(r.type){case"AxisAngle":return Js.fromJSON(r);case"Euler":return un.fromJSON(r);case"RandomQuat":return Hi.fromJSON(r);default:return new Hi}}var ue=class ii{constructor(t,e,i){this.x=t,this.y=e,this.z=i,this.type="vec3function"}startGen(t){this.x.startGen(t),this.y.startGen(t),this.z.startGen(t)}genValue(t,e,i){return e.set(this.x.genValue(t,i),this.y.genValue(t,i),this.z.genValue(t,i))}toJSON(){return{type:"Vector3Function",x:this.x.toJSON(),y:this.y.toJSON(),z:this.z.toJSON()}}static fromJSON(t){return new ii(E(t.x),E(t.y),E(t.z))}clone(){return new ii(this.x,this.y,this.z)}};function dn(r){return r.type==="Vector3Function"?ue.fromJSON(r):new ue(new A(0),new A(0),new A(0))}function de(r){switch(r.type){case"ConstantValue":case"IntervalValue":case"PiecewiseBezier":return E(r);case"AxisAngle":case"RandomQuat":case"Euler":return Ds(r);case"Vector3Function":return dn(r);default:return new A(0)}}var me=class si{constructor(t={}){var e,i,s,n,a,h,o;this.type="cone",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.angle=(n=t.angle)!==null&&n!==void 0?n:Math.PI/6,this.mode=(a=t.mode)!==null&&a!==void 0?a:tt.Random,this.spread=(h=t.spread)!==null&&h!==void 0?h:0,this.speed=(o=t.speed)!==null&&o!==void 0?o:new A(1),this.memory=[]}update(t,e){tt.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Wt(this.mode,this.currentValue,this.spread,e),s=At.lerp(1-this.thickness,1,Math.random()),n=i*this.arc,a=Math.sqrt(s),h=Math.sin(n),o=Math.cos(n);t.position.x=a*o,t.position.y=a*h,t.position.z=0;const l=this.angle*a;t.velocity.set(0,0,Math.cos(l)).addScaledVector(t.position,Math.sin(l)).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius)}toJSON(){return{type:"cone",radius:this.radius,arc:this.arc,thickness:this.thickness,angle:this.angle,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new si({radius:t.radius,arc:t.arc,thickness:t.thickness,angle:t.angle,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new si({radius:this.radius,arc:this.arc,thickness:this.thickness,angle:this.angle,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}},Zi=class ri{constructor(t={}){var e,i,s,n,a,h;this.type="circle",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.mode=(n=t.mode)!==null&&n!==void 0?n:tt.Random,this.spread=(a=t.spread)!==null&&a!==void 0?a:0,this.speed=(h=t.speed)!==null&&h!==void 0?h:new A(1),this.memory=[]}update(t,e){this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e}initialize(t,e){const i=Wt(this.mode,this.currentValue,this.spread,e),s=At.lerp(1-this.thickness,1,Math.random()),n=i*this.arc;t.position.x=Math.cos(n),t.position.y=Math.sin(n),t.position.z=0,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*s)}toJSON(){return{type:"circle",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new ri({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new ri({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}},$i=class ni{constructor(t={}){var e,i,s,n,a,h,o;this.type="donut",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.donutRadius=(n=t.donutRadius)!==null&&n!==void 0?n:this.radius*.2,this.mode=(a=t.mode)!==null&&a!==void 0?a:tt.Random,this.spread=(h=t.spread)!==null&&h!==void 0?h:0,this.speed=(o=t.speed)!==null&&o!==void 0?o:new A(1),this.memory=[]}update(t,e){tt.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Wt(this.mode,this.currentValue,this.spread,e),s=Math.random(),n=At.lerp(1-this.thickness,1,Math.random()),a=i*this.arc,h=s*Math.PI*2,o=Math.sin(a),l=Math.cos(a);t.position.x=this.radius*l,t.position.y=this.radius*o,t.position.z=0,t.velocity.z=this.donutRadius*n*Math.sin(h),t.velocity.x=this.donutRadius*n*Math.cos(h)*l,t.velocity.y=this.donutRadius*n*Math.cos(h)*o,t.position.add(t.velocity),t.velocity.normalize().multiplyScalar(t.startSpeed)}toJSON(){return{type:"donut",radius:this.radius,arc:this.arc,thickness:this.thickness,donutRadius:this.donutRadius,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new ni({radius:t.radius,arc:t.arc,thickness:t.thickness,donutRadius:t.donutRadius,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new ni({radius:this.radius,arc:this.arc,thickness:this.thickness,donutRadius:this.donutRadius,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}},Wi=class ai{constructor(){this.type="point"}update(t,e){}initialize(t){const e=Math.random(),i=Math.random(),s=e*Math.PI*2,n=Math.acos(2*i-1),a=Math.cbrt(Math.random()),h=Math.sin(s),o=Math.cos(s),l=Math.sin(n),c=Math.cos(n);t.velocity.x=a*l*o,t.velocity.y=a*l*h,t.velocity.z=a*c,t.velocity.multiplyScalar(t.startSpeed),t.position.setScalar(0)}toJSON(){return{type:"point"}}static fromJSON(t){return new ai}clone(){return new ai}},oi=class hi{constructor(t={}){var e,i,s,n,a,h;this.type="sphere",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.mode=(n=t.mode)!==null&&n!==void 0?n:tt.Random,this.spread=(a=t.spread)!==null&&a!==void 0?a:0,this.speed=(h=t.speed)!==null&&h!==void 0?h:new A(1),this.memory=[]}update(t,e){tt.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Wt(this.mode,this.currentValue,this.spread,e),s=Math.random(),n=At.lerp(1-this.thickness,1,Math.random()),a=i*this.arc,h=Math.acos(2*s-1),o=Math.sin(a),l=Math.cos(a),c=Math.sin(h),u=Math.cos(h);t.position.x=c*l,t.position.y=c*o,t.position.z=u,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*n)}toJSON(){return{type:"sphere",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new hi({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new hi({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}},Qi=class li{constructor(t={}){var e,i,s,n,a,h;this.type="sphere",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.mode=(n=t.mode)!==null&&n!==void 0?n:tt.Random,this.spread=(a=t.spread)!==null&&a!==void 0?a:0,this.speed=(h=t.speed)!==null&&h!==void 0?h:new A(1),this.memory=[]}update(t,e){tt.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Wt(this.mode,this.currentValue,this.spread,e),s=Math.random(),n=At.lerp(1-this.thickness,1,Math.random()),a=i*this.arc,h=Math.acos(s),o=Math.sin(a),l=Math.cos(a),c=Math.sin(h),u=Math.cos(h);t.position.x=c*l,t.position.y=c*o,t.position.z=u,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*n)}toJSON(){return{type:"hemisphere",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new li({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new li({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}},Ki=class ci{constructor(t={}){var e,i,s,n;this.type="grid",this.width=(e=t.width)!==null&&e!==void 0?e:1,this.height=(i=t.height)!==null&&i!==void 0?i:1,this.column=(s=t.column)!==null&&s!==void 0?s:10,this.row=(n=t.row)!==null&&n!==void 0?n:10}initialize(t){const e=Math.floor(Math.random()*this.row),i=Math.floor(Math.random()*this.column);t.position.x=i*this.width/this.column-this.width/2,t.position.y=e*this.height/this.row-this.height/2,t.position.z=0,t.velocity.set(0,0,t.startSpeed)}toJSON(){return{type:"grid",width:this.width,height:this.height,column:this.column,row:this.row}}static fromJSON(t){return new ci(t)}clone(){return new ci({width:this.width,height:this.height,column:this.column,row:this.row})}update(t,e){}},ui={circle:{type:"circle",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:Zi,loadJSON:Zi.fromJSON},cone:{type:"cone",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:me,loadJSON:me.fromJSON},donut:{type:"donut",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["donutRadius",["number"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:$i,loadJSON:$i.fromJSON},point:{type:"point",params:[],constructor:Wi,loadJSON:Wi.fromJSON},sphere:{type:"sphere",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:oi,loadJSON:oi.fromJSON},hemisphere:{type:"hemisphere",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:Qi,loadJSON:Qi.fromJSON},grid:{type:"grid",params:[["width",["number"]],["height",["number"]],["rows",["number"]],["column",["number"]]],constructor:Ki,loadJSON:Ki.fromJSON}};function mn(r,t){return ui[r.type].loadJSON(r,t)}var fe=class di{constructor(t){this.color=t,this.type="ColorOverLife"}initialize(t){this.color.startGen(t.memory)}update(t,e){this.color.genColor(t.memory,t.color,t.age/t.life),t.color.x*=t.startColor.x,t.color.y*=t.startColor.y,t.color.z*=t.startColor.z,t.color.w*=t.startColor.w}frameUpdate(t){}toJSON(){return{type:this.type,color:this.color.toJSON()}}static fromJSON(t){return new di(Ii(t.color))}clone(){return new di(this.color.clone())}reset(){}},ji=class mi{constructor(t){this.angularVelocity=t,this.type="RotationOverLife"}initialize(t){typeof t.rotation=="number"&&this.angularVelocity.startGen(t.memory)}update(t,e){typeof t.rotation=="number"&&(t.rotation+=e*this.angularVelocity.genValue(t.memory,t.age/t.life))}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON()}}static fromJSON(t){return new mi(E(t.angularVelocity))}frameUpdate(t){}clone(){return new mi(this.angularVelocity.clone())}reset(){}},ts=class fi{constructor(t){this.angularVelocity=t,this.type="Rotation3DOverLife",this.tempQuat=new J,this.tempQuat2=new J}initialize(t){t.rotation instanceof J&&(t.angularVelocity=new J,this.angularVelocity.startGen(t.memory))}update(t,e){t.rotation instanceof J&&(this.angularVelocity.genValue(t.memory,this.tempQuat,e,t.age/t.life),t.rotation.multiply(this.tempQuat))}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON()}}static fromJSON(t){return new fi(Ds(t.angularVelocity))}frameUpdate(t){}clone(){return new fi(this.angularVelocity.clone())}reset(){}},es=class pi{initialize(t,e){this.ps=e,this.x.startGen(t.memory),this.y.startGen(t.memory),this.z.startGen(t.memory)}constructor(t,e,i){this.x=t,this.y=e,this.z=i,this.type="ForceOverLife",this._temp=new z,this._tempScale=new z,this._tempQ=new J}update(t,e){this._temp.set(this.x.genValue(t.memory,t.age/t.life),this.y.genValue(t.memory,t.age/t.life),this.z.genValue(t.memory,t.age/t.life)),this.ps.worldSpace?t.velocity.addScaledVector(this._temp,e):(this._temp.multiply(this._tempScale).applyQuaternion(this._tempQ),t.velocity.addScaledVector(this._temp,e))}toJSON(){return{type:this.type,x:this.x.toJSON(),y:this.y.toJSON(),z:this.z.toJSON()}}static fromJSON(t){return new pi(E(t.x),E(t.y),E(t.z))}frameUpdate(t){if(this.ps&&!this.ps.worldSpace){const e=this._temp,i=this._tempQ,s=this._tempScale;this.ps.emitter.matrixWorld.decompose(e,i,s),i.invert(),s.set(1/s.x,1/s.y,1/s.z)}}clone(){return new pi(this.x.clone(),this.y.clone(),this.z.clone())}reset(){}},pe=class yi{initialize(t){this.size.startGen(t.memory)}constructor(t){this.size=t,this.type="SizeOverLife"}update(t){this.size instanceof ue?this.size.genValue(t.memory,t.size,t.age/t.life).multiply(t.startSize):t.size.copy(t.startSize).multiplyScalar(this.size.genValue(t.memory,t.age/t.life))}toJSON(){return{type:this.type,size:this.size.toJSON()}}static fromJSON(t){return new yi(de(t.size))}frameUpdate(t){}clone(){return new yi(this.size.clone())}reset(){}},is=class gi{initialize(t){this.speed.startGen(t.memory)}constructor(t){this.speed=t,this.type="SpeedOverLife"}update(t){t.speedModifier=this.speed.genValue(t.memory,t.age/t.life)}toJSON(){return{type:this.type,speed:this.speed.toJSON()}}static fromJSON(t){return new gi(E(t.speed))}frameUpdate(t){}clone(){return new gi(this.speed.clone())}reset(){}},ss=class vi{constructor(t){this.frame=t,this.type="FrameOverLife"}initialize(t){this.frame.startGen(t.memory)}update(t,e){this.frame instanceof ce&&(t.uvTile=this.frame.genValue(t.memory,t.age/t.life))}frameUpdate(t){}toJSON(){return{type:this.type,frame:this.frame.toJSON()}}static fromJSON(t){return new vi(E(t.frame))}clone(){return new vi(this.frame.clone())}reset(){}};new z(0,0,1);var rs=class xi{constructor(t,e=new z(0,1,0)){this.orbitSpeed=t,this.axis=e,this.type="OrbitOverLife",this.temp=new z,this.rotation=new J}initialize(t){this.orbitSpeed.startGen(t.memory)}update(t,e){this.temp.copy(t.position).projectOnVector(this.axis),this.rotation.setFromAxisAngle(this.axis,this.orbitSpeed.genValue(t.memory,t.age/t.life)*e),t.position.sub(this.temp),t.position.applyQuaternion(this.rotation),t.position.add(this.temp)}frameUpdate(t){}toJSON(){return{type:this.type,orbitSpeed:this.orbitSpeed.toJSON(),axis:[this.axis.x,this.axis.y,this.axis.z]}}static fromJSON(t){return new xi(E(t.orbitSpeed),t.axis?new z(t.axis[0],t.axis[1],t.axis[2]):void 0)}clone(){return new xi(this.orbitSpeed.clone())}reset(){}},Be=class{constructor(r){this.data=r,this.next=null,this.prev=null}hasPrev(){return this.prev!==null}hasNext(){return this.next!==null}},fn=class{constructor(){this.length=0,this.head=this.tail=null}isEmpty(){return this.head===null}clear(){this.length=0,this.head=this.tail=null}front(){return this.head===null?null:this.head.data}back(){return this.tail===null?null:this.tail.data}dequeue(){if(this.head){const r=this.head.data;return this.head=this.head.next,this.head?this.head.prev=null:this.tail=null,this.length--,r}}pop(){if(this.tail){const r=this.tail.data;return this.tail=this.tail.prev,this.tail?this.tail.next=null:this.head=null,this.length--,r}}queue(r){const t=new Be(r);this.tail||(this.tail=t),this.head&&(this.head.prev=t,t.next=this.head),this.head=t,this.length++}push(r){const t=new Be(r);this.head||(this.head=t),this.tail&&(this.tail.next=t,t.prev=this.tail),this.tail=t,this.length++}insertBefore(r,t){const e=new Be(t);e.next=r,e.prev=r.prev,e.prev!==null&&(e.prev.next=e),e.next.prev=e,r==this.head&&(this.head=e),this.length++}remove(r){if(this.head===null||this.tail===null)return;let t=this.head;for(r===this.head.data&&(this.head=this.head.next),r===this.tail.data&&(this.tail=this.tail.prev);t.next!==null&&t.data!==r;)t=t.next;t.data===r&&(t.prev!==null&&(t.prev.next=t.next),t.next!==null&&(t.next.prev=t.prev),this.length--)}*values(){let r=this.head;for(;r!==null;)yield r.data,r=r.next}},pn=class{constructor(){this.startSpeed=0,this.startColor=new at,this.startSize=new z(1,1,1),this.position=new z,this.velocity=new z,this.age=0,this.life=1,this.size=new z(1,1,1),this.speedModifier=1,this.rotation=0,this.color=new at,this.uvTile=0,this.memory=[]}get died(){return this.age>=this.life}reset(){this.memory.length=0}},yn=class{constructor(r,t,e){this.position=r,this.size=t,this.color=e}},_i=class{constructor(){this.startSpeed=0,this.startColor=new at,this.startSize=new z(1,1,1),this.position=new z,this.velocity=new z,this.age=0,this.life=1,this.size=new z(1,1,1),this.length=100,this.speedModifier=1,this.color=new at,this.previous=new fn,this.uvTile=0,this.memory=[]}update(){for(this.age<=this.life?this.previous.push(new yn(this.position.clone(),this.size.x,this.color.clone())):this.previous.length>0&&this.previous.dequeue();this.previous.length>this.length;)this.previous.dequeue()}get died(){return this.age>=this.life}reset(){this.memory.length=0,this.previous.clear()}},ns=class Si{initialize(t){this.width.startGen(t.memory)}constructor(t){this.width=t,this.type="WidthOverLength"}update(t){if(t instanceof _i){const e=t.previous.values();for(let i=0;i<t.previous.length;i++){const s=e.next();s.value.size=this.width.genValue(t.memory,(t.previous.length-i)/t.length)}}}frameUpdate(t){}toJSON(){return{type:this.type,width:this.width.toJSON()}}static fromJSON(t){return new Si(E(t.width))}clone(){return new Si(this.width.clone())}reset(){}},as=class Mi{constructor(t,e){this.direction=t,this.magnitude=e,this.type="ApplyForce",this.memory={data:[],dataCount:0},this.magnitudeValue=this.magnitude.genValue(this.memory)}initialize(t){}update(t,e){t.velocity.addScaledVector(this.direction,this.magnitudeValue*e)}frameUpdate(t){this.magnitudeValue=this.magnitude.genValue(this.memory)}toJSON(){return{type:this.type,direction:[this.direction.x,this.direction.y,this.direction.z],magnitude:this.magnitude.toJSON()}}static fromJSON(t){var e;return new Mi(new z(t.direction[0],t.direction[1],t.direction[2]),E((e=t.magnitude)!==null&&e!==void 0?e:t.force))}clone(){return new Mi(this.direction.clone(),this.magnitude.clone())}reset(){}},os=class wi{constructor(t,e){this.center=t,this.magnitude=e,this.type="GravityForce",this.temp=new z}initialize(t){}update(t,e){this.temp.copy(this.center).sub(t.position).normalize(),t.velocity.addScaledVector(this.temp,this.magnitude/t.position.distanceToSquared(this.center)*e)}frameUpdate(t){}toJSON(){return{type:this.type,center:[this.center.x,this.center.y,this.center.z],magnitude:this.magnitude}}static fromJSON(t){return new wi(new z(t.center[0],t.center[1],t.center[2]),t.magnitude)}clone(){return new wi(this.center.clone(),this.magnitude)}reset(){}};new z(0,0,1);var hs=class zi{constructor(t){this.angle=t,this.type="ChangeEmitDirection",this._temp=new z,this._q=new J,this.memory={data:[],dataCount:0}}initialize(t){const e=t.velocity.length();e!=0&&(t.velocity.normalize(),t.velocity.x===0&&t.velocity.y===0?this._temp.set(0,t.velocity.z,0):this._temp.set(-t.velocity.y,t.velocity.x,0),this.angle.startGen(this.memory),this._q.setFromAxisAngle(this._temp.normalize(),this.angle.genValue(this.memory)),this._temp.copy(t.velocity),t.velocity.applyQuaternion(this._q),this._q.setFromAxisAngle(this._temp,Math.random()*Math.PI*2),t.velocity.applyQuaternion(this._q),t.velocity.setLength(e))}update(t,e){}frameUpdate(t){}toJSON(){return{type:this.type,angle:this.angle.toJSON()}}static fromJSON(t){return new zi(E(t.angle))}clone(){return new zi(this.angle)}reset(){}},gn=new z(1,1,1),ls=new z(0,0,1),Pt;(function(r){r[r.Death=0]="Death",r[r.Birth=1]="Birth",r[r.Frame=2]="Frame"})(Pt||(Pt={}));var cs=class bi{constructor(t,e,i,s=Pt.Frame,n=1){this.particleSystem=t,this.useVelocityAsBasis=e,this.subParticleSystem=i,this.mode=s,this.emitProbability=n,this.type="EmitSubParticleSystem",this.q_=new J,this.v_=new z,this.v2_=new z,this.subEmissions=new Array,this.subParticleSystem&&this.subParticleSystem.system&&(this.subParticleSystem.system.onlyUsedByOther=!0)}initialize(t){}update(t,e){this.mode===Pt.Frame?this.emit(t,e):this.mode===Pt.Birth&&t.age===0?this.emit(t,e):this.mode===Pt.Death&&t.age+e>=t.life&&this.emit(t,e)}emit(t,e){if(!this.subParticleSystem||Math.random()>this.emitProbability)return;const i=new Fi;this.setMatrixFromParticle(i,t),this.subEmissions.push({burstParticleCount:0,burstParticleIndex:0,isBursting:!1,burstIndex:0,burstWaveIndex:0,time:0,waitEmiting:0,matrix:i,travelDistance:0,particle:t})}frameUpdate(t){if(this.subParticleSystem)for(let e=0;e<this.subEmissions.length;e++)if(this.subEmissions[e].time>=this.subParticleSystem.system.duration)this.subEmissions[e]=this.subEmissions[this.subEmissions.length-1],this.subEmissions.length=this.subEmissions.length-1,e--;else{const i=this.subEmissions[e];i.particle&&i.particle.age<i.particle.life?this.setMatrixFromParticle(i.matrix,i.particle):i.particle=void 0,this.subParticleSystem.system.emit(t,i,i.matrix)}}toJSON(){return{type:this.type,subParticleSystem:this.subParticleSystem?this.subParticleSystem.uuid:"",useVelocityAsBasis:this.useVelocityAsBasis,mode:this.mode,emitProbability:this.emitProbability}}static fromJSON(t,e){return new bi(e,t.useVelocityAsBasis,t.subParticleSystem,t.mode,t.emitProbability)}clone(){return new bi(this.particleSystem,this.useVelocityAsBasis,this.subParticleSystem,this.mode,this.emitProbability)}reset(){}setMatrixFromParticle(t,e){let i;if(e.rotation===void 0||this.useVelocityAsBasis)if(e.velocity.x===0&&e.velocity.y===0&&(e.velocity.z===1||e.velocity.z===0))t.set(1,0,0,e.position.x,0,1,0,e.position.y,0,0,1,e.position.z,0,0,0,1);else{this.v_.copy(ls).cross(e.velocity),this.v2_.copy(e.velocity).cross(this.v_);const s=this.v_.length(),n=this.v2_.length();t.set(this.v_.x/s,this.v2_.x/n,e.velocity.x,e.position.x,this.v_.y/s,this.v2_.y/n,e.velocity.y,e.position.y,this.v_.z/s,this.v2_.z/n,e.velocity.z,e.position.z,0,0,0,1)}else e.rotation instanceof J?i=e.rotation:(this.q_.setFromAxisAngle(ls,e.rotation),i=this.q_),t.compose(e.position,i,gn);this.particleSystem.worldSpace||t.multiplyMatrices(this.particleSystem.emitter.matrixWorld,t)}},vn=.5*(Math.sqrt(3)-1),Jt=(3-Math.sqrt(3))/6,xn=1/3,ut=1/6,_n=(Math.sqrt(5)-1)/4,Z=(5-Math.sqrt(5))/20,H=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),D=new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),Gs=class{constructor(r=Math.random){const t=typeof r=="function"?r:Mn(r);this.p=Sn(t),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(let e=0;e<512;e++)this.perm[e]=this.p[e&255],this.permMod12[e]=this.perm[e]%12}noise2D(r,t){const e=this.permMod12,i=this.perm;let s=0,n=0,a=0;const h=(r+t)*vn,o=Math.floor(r+h),l=Math.floor(t+h),c=(o+l)*Jt,u=o-c,m=l-c,d=r-u,f=t-m;let p,g;d>f?(p=1,g=0):(p=0,g=1);const v=d-p+Jt,_=f-g+Jt,M=d-1+2*Jt,y=f-1+2*Jt,x=o&255,S=l&255;let w=.5-d*d-f*f;if(w>=0){const N=e[x+i[S]]*3;w*=w,s=w*w*(H[N]*d+H[N+1]*f)}let O=.5-v*v-_*_;if(O>=0){const N=e[x+p+i[S+g]]*3;O*=O,n=O*O*(H[N]*v+H[N+1]*_)}let P=.5-M*M-y*y;if(P>=0){const N=e[x+1+i[S+1]]*3;P*=P,a=P*P*(H[N]*M+H[N+1]*y)}return 70*(s+n+a)}noise3D(r,t,e){const i=this.permMod12,s=this.perm;let n,a,h,o;const l=(r+t+e)*xn,c=Math.floor(r+l),u=Math.floor(t+l),m=Math.floor(e+l),d=(c+u+m)*ut,f=c-d,p=u-d,g=m-d,v=r-f,_=t-p,M=e-g;let y,x,S,w,O,P;v>=_?_>=M?(y=1,x=0,S=0,w=1,O=1,P=0):v>=M?(y=1,x=0,S=0,w=1,O=0,P=1):(y=0,x=0,S=1,w=1,O=0,P=1):_<M?(y=0,x=0,S=1,w=0,O=1,P=1):v<M?(y=0,x=1,S=0,w=0,O=1,P=1):(y=0,x=1,S=0,w=1,O=1,P=0);const N=v-y+ut,F=_-x+ut,L=M-S+ut,G=v-w+2*ut,X=_-O+2*ut,W=M-P+2*ut,Q=v-1+3*ut,K=_-1+3*ut,ot=M-1+3*ut,it=c&255,st=u&255,rt=m&255;let xt=.6-v*v-_*_-M*M;if(xt<0)n=0;else{const q=i[it+s[st+s[rt]]]*3;xt*=xt,n=xt*xt*(H[q]*v+H[q+1]*_+H[q+2]*M)}let _t=.6-N*N-F*F-L*L;if(_t<0)a=0;else{const q=i[it+y+s[st+x+s[rt+S]]]*3;_t*=_t,a=_t*_t*(H[q]*N+H[q+1]*F+H[q+2]*L)}let gt=.6-G*G-X*X-W*W;if(gt<0)h=0;else{const q=i[it+w+s[st+O+s[rt+P]]]*3;gt*=gt,h=gt*gt*(H[q]*G+H[q+1]*X+H[q+2]*W)}let vt=.6-Q*Q-K*K-ot*ot;if(vt<0)o=0;else{const q=i[it+1+s[st+1+s[rt+1]]]*3;vt*=vt,o=vt*vt*(H[q]*Q+H[q+1]*K+H[q+2]*ot)}return 32*(n+a+h+o)}noise4D(r,t,e,i){const s=this.perm;let n,a,h,o,l;const c=(r+t+e+i)*_n,u=Math.floor(r+c),m=Math.floor(t+c),d=Math.floor(e+c),f=Math.floor(i+c),p=(u+m+d+f)*Z,g=u-p,v=m-p,_=d-p,M=f-p,y=r-g,x=t-v,S=e-_,w=i-M;let O=0,P=0,N=0,F=0;y>x?O++:P++,y>S?O++:N++,y>w?O++:F++,x>S?P++:N++,x>w?P++:F++,S>w?N++:F++;const L=O>=3?1:0,G=P>=3?1:0,X=N>=3?1:0,W=F>=3?1:0,Q=O>=2?1:0,K=P>=2?1:0,ot=N>=2?1:0,it=F>=2?1:0,st=O>=1?1:0,rt=P>=1?1:0,xt=N>=1?1:0,_t=F>=1?1:0,gt=y-L+Z,vt=x-G+Z,q=S-X+Z,ve=w-W+Z,xe=y-Q+2*Z,_e=x-K+2*Z,Se=S-ot+2*Z,Me=w-it+2*Z,we=y-st+3*Z,ze=x-rt+3*Z,be=S-xt+3*Z,Te=w-_t+3*Z,Oe=y-1+4*Z,Pe=x-1+4*Z,Ne=S-1+4*Z,Ee=w-1+4*Z,Ct=u&255,Ut=m&255,Bt=d&255,Rt=f&255;let kt=.6-y*y-x*x-S*S-w*w;if(kt<0)n=0;else{const V=s[Ct+s[Ut+s[Bt+s[Rt]]]]%32*4;kt*=kt,n=kt*kt*(D[V]*y+D[V+1]*x+D[V+2]*S+D[V+3]*w)}let Ft=.6-gt*gt-vt*vt-q*q-ve*ve;if(Ft<0)a=0;else{const V=s[Ct+L+s[Ut+G+s[Bt+X+s[Rt+W]]]]%32*4;Ft*=Ft,a=Ft*Ft*(D[V]*gt+D[V+1]*vt+D[V+2]*q+D[V+3]*ve)}let It=.6-xe*xe-_e*_e-Se*Se-Me*Me;if(It<0)h=0;else{const V=s[Ct+Q+s[Ut+K+s[Bt+ot+s[Rt+it]]]]%32*4;It*=It,h=It*It*(D[V]*xe+D[V+1]*_e+D[V+2]*Se+D[V+3]*Me)}let Lt=.6-we*we-ze*ze-be*be-Te*Te;if(Lt<0)o=0;else{const V=s[Ct+st+s[Ut+rt+s[Bt+xt+s[Rt+_t]]]]%32*4;Lt*=Lt,o=Lt*Lt*(D[V]*we+D[V+1]*ze+D[V+2]*be+D[V+3]*Te)}let Vt=.6-Oe*Oe-Pe*Pe-Ne*Ne-Ee*Ee;if(Vt<0)l=0;else{const V=s[Ct+1+s[Ut+1+s[Bt+1+s[Rt+1]]]]%32*4;Vt*=Vt,l=Vt*Vt*(D[V]*Oe+D[V+1]*Pe+D[V+2]*Ne+D[V+3]*Ee)}return 27*(n+a+h+o+l)}};function Sn(r){const t=new Uint8Array(256);for(let e=0;e<256;e++)t[e]=e;for(let e=0;e<255;e++){const i=e+~~(r()*(256-e)),s=t[e];t[e]=t[i],t[i]=s}return t}function Mn(r){let t=0,e=0,i=0,s=1;const n=wn();return t=n(" "),e=n(" "),i=n(" "),t-=n(r),t<0&&(t+=1),e-=n(r),e<0&&(e+=1),i-=n(r),i<0&&(i+=1),function(){const a=2091639*t+s*23283064365386963e-26;return t=e,e=i,i=a-(s=a|0)}}function wn(){let r=4022871197;return function(t){t=t.toString();for(let e=0;e<t.length;e++){r+=t.charCodeAt(e);let i=.02519603282416938*r;r=i>>>0,i-=r,i*=r,r=i>>>0,i-=r,r+=i*4294967296}return(r>>>0)*23283064365386963e-26}}var us=class Ti{constructor(t,e,i,s){this.scale=t,this.octaves=e,this.velocityMultiplier=i,this.timeScale=s,this.type="TurbulenceField",this.generator=new Gs,this.timeOffset=new z,this.temp=new z,this.temp2=new z,this.timeOffset.x=Math.random()/this.scale.x*this.timeScale.x,this.timeOffset.y=Math.random()/this.scale.y*this.timeScale.y,this.timeOffset.z=Math.random()/this.scale.z*this.timeScale.z}initialize(t){}update(t,e){const i=t.position.x/this.scale.x,s=t.position.y/this.scale.y,n=t.position.z/this.scale.z;this.temp.set(0,0,0);let a=1;for(let h=0;h<this.octaves;h++)this.temp2.set(this.generator.noise4D(i*a,s*a,n*a,this.timeOffset.x*a)/a,this.generator.noise4D(i*a,s*a,n*a,this.timeOffset.y*a)/a,this.generator.noise4D(i*a,s*a,n*a,this.timeOffset.z*a)/a),this.temp.add(this.temp2),a*=2;this.temp.multiply(this.velocityMultiplier),t.velocity.addScaledVector(this.temp,e)}toJSON(){return{type:this.type,scale:[this.scale.x,this.scale.y,this.scale.z],octaves:this.octaves,velocityMultiplier:[this.velocityMultiplier.x,this.velocityMultiplier.y,this.velocityMultiplier.z],timeScale:[this.timeScale.x,this.timeScale.y,this.timeScale.z]}}frameUpdate(t){this.timeOffset.x+=t*this.timeScale.x,this.timeOffset.y+=t*this.timeScale.y,this.timeOffset.z+=t*this.timeScale.z}static fromJSON(t){return new Ti(new z(t.scale[0],t.scale[1],t.scale[2]),t.octaves,new z(t.velocityMultiplier[0],t.velocityMultiplier[1],t.velocityMultiplier[2]),new z(t.timeScale[0],t.timeScale[1],t.timeScale[2]))}clone(){return new Ti(this.scale.clone(),this.octaves,this.velocityMultiplier.clone(),this.timeScale.clone())}reset(){}};function te(r,t){return Math.floor(Math.random()*(t-r))+r}var dt=[],Re=new z,ke=new J,ds=class Oi{constructor(t,e,i=new A(1),s=new A(0)){if(this.frequency=t,this.power=e,this.positionAmount=i,this.rotationAmount=s,this.type="Noise",this.duration=0,dt.length===0)for(let n=0;n<100;n++)dt.push(new Gs)}initialize(t){t.lastPosNoise=new z,typeof t.rotation=="number"?t.lastRotNoise=0:t.lastRotNoise=new J,t.generatorIndex=[te(0,100),te(0,100),te(0,100),te(0,100)],this.positionAmount.startGen(t.memory),this.rotationAmount.startGen(t.memory),this.frequency.startGen(t.memory),this.power.startGen(t.memory)}update(t,e){let i=this.frequency.genValue(t.memory,t.age/t.life),s=this.power.genValue(t.memory,t.age/t.life),n=this.positionAmount.genValue(t.memory,t.age/t.life),a=this.rotationAmount.genValue(t.memory,t.age/t.life);n>0&&t.lastPosNoise!==void 0&&(t.position.sub(t.lastPosNoise),Re.set(dt[t.generatorIndex[0]].noise2D(0,t.age*i)*s*n,dt[t.generatorIndex[1]].noise2D(0,t.age*i)*s*n,dt[t.generatorIndex[2]].noise2D(0,t.age*i)*s*n),t.position.add(Re),t.lastPosNoise.copy(Re)),a>0&&t.lastRotNoise!==void 0&&(typeof t.rotation=="number"?(t.rotation-=t.lastRotNoise,t.rotation+=dt[t.generatorIndex[3]].noise2D(0,t.age*i)*Math.PI*s*a):(t.lastRotNoise.invert(),t.rotation.multiply(t.lastRotNoise),ke.set(dt[t.generatorIndex[0]].noise2D(0,t.age*i)*s*a,dt[t.generatorIndex[1]].noise2D(0,t.age*i)*s*a,dt[t.generatorIndex[2]].noise2D(0,t.age*i)*s*a,dt[t.generatorIndex[3]].noise2D(0,t.age*i)*s*a).normalize(),t.rotation.multiply(ke),t.lastRotNoise.copy(ke)))}toJSON(){return{type:this.type,frequency:this.frequency.toJSON(),power:this.power.toJSON(),positionAmount:this.positionAmount.toJSON(),rotationAmount:this.rotationAmount.toJSON()}}frameUpdate(t){this.duration+=t}static fromJSON(t){return new Oi(E(t.frequency),E(t.power),E(t.positionAmount),E(t.rotationAmount))}clone(){return new Oi(this.frequency.clone(),this.power.clone(),this.positionAmount.clone(),this.rotationAmount.clone())}reset(){}},ms=class Pi{constructor(t=0,e=0,i=new z){this.scaleX=t,this.scaleY=e,this.position=i,this.locations=[]}transform(t,e){t.x=this.locations[e%this.locations.length].x*this.scaleX+this.position.x,t.y=this.locations[e%this.locations.length].y*this.scaleY+this.position.y,t.z=this.position.z}static fromJSON(t){const e=new Pi(t.scaleX,t.scaleY,new z(t.position[0],t.position[1],t.position[2]));return e.locations=t.locations.map(i=>new Et(i.x,i.y)),e}clone(){const t=new Pi(this.scaleX,this.scaleY,this.position.clone());return t.locations=this.locations.map(e=>e.clone()),t}toJSON(){return{scaleX:this.scaleX,scaleY:this.scaleY,position:this.position,locations:this.locations.map(t=>({x:t.x,y:t.y}))}}fromImage(t,e){const i=document.createElement("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");if(!s)return;s.drawImage(t,0,0);const n=s.getImageData(0,0,i.width,i.height,{colorSpace:"srgb"});i.remove(),this.locations.length=0;for(let a=0;a<n.height;a++)for(let h=0;h<n.width;h++)n.data[(a*n.width+h)*4+3]>e&&this.locations.push(new Et(h,n.height-a))}};function zn(r){return r.type==="TextureSequencer"?ms.fromJSON(r):new ms}var bn=class ne{constructor(t){this.type="ApplySequences",this.sequencers=[],this.time=0,this.index=0,this.pCount=0,this.tempV=new z,this.delay=t}initialize(t){t.id=this.pCount,t.dst=new z,t.begin=new z,t.inMotion=!1,this.pCount++}reset(){this.time=0,this.index=0,this.pCount=0}update(t,e){const i=this.sequencers[this.index],s=t.id*this.delay;this.time>=i[0].a+s&&this.time<=i[0].b+s?(t.inMotion||(t.inMotion=!0,t.begin.copy(t.position),i[1].transform(t.dst,t.id)),t.position.lerpVectors(t.begin,t.dst,ne.BEZIER.genValue((this.time-i[0].a-s)/(i[0].b-i[0].a)))):this.time>i[0].b+s&&(t.inMotion=!1)}frameUpdate(t){for(;this.index+1<this.sequencers.length&&this.time>=this.sequencers[this.index+1][0].a;)this.index++;this.time+=t}appendSequencer(t,e){this.sequencers.push([t,e])}toJSON(){return{type:this.type,delay:this.delay,sequencers:this.sequencers.map(([t,e])=>({range:t.toJSON(),sequencer:e.toJSON()}))}}static fromJSON(t){const e=new ne(t.delay);return t.sequencers.forEach(i=>{e.sequencers.push([E(i.range),zn(i.sequencer)])}),e}clone(){const t=new ne(this.delay);return t.sequencers=this.sequencers.map(e=>[e[0].clone(),e[1].clone()]),t}};bn.BEZIER=new Xt(0,0,1,1);var fs=class Ni{constructor(t,e){this.color=t,this.speedRange=e,this.type="ColorBySpeed"}initialize(t){this.color.startGen(t.memory)}update(t,e){const i=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);this.color.genColor(t.memory,t.color,i),t.color.x*=t.startColor.x,t.color.y*=t.startColor.y,t.color.z*=t.startColor.z,t.color.w*=t.startColor.w}frameUpdate(t){}toJSON(){return{type:this.type,color:this.color.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new Ni(Ii(t.color),ft.fromJSON(t.speedRange))}clone(){return new Ni(this.color.clone(),this.speedRange.clone())}reset(){}},ps=class Ei{initialize(t){this.size.startGen(t.memory)}constructor(t,e){this.size=t,this.speedRange=e,this.type="SizeBySpeed"}update(t){const e=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);this.size instanceof ue?this.size.genValue(t.memory,t.size,e).multiply(t.startSize):t.size.copy(t.startSize).multiplyScalar(this.size.genValue(t.memory,e))}toJSON(){return{type:this.type,size:this.size.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new Ei(de(t.size),ft.fromJSON(t.speedRange))}frameUpdate(t){}clone(){return new Ei(this.size.clone(),this.speedRange.clone())}reset(){}},ys=class Ai{constructor(t,e){this.angularVelocity=t,this.speedRange=e,this.type="RotationBySpeed",this.tempQuat=new J}initialize(t){typeof t.rotation=="number"&&this.angularVelocity.startGen(t.memory)}update(t,e){if(typeof t.rotation=="number"){const i=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);t.rotation+=e*this.angularVelocity.genValue(t.memory,i)}}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new Ai(E(t.angularVelocity),ft.fromJSON(t.speedRange))}frameUpdate(t){}clone(){return new Ai(this.angularVelocity.clone(),this.speedRange.clone())}reset(){}},gs=class Ci{initialize(t){this.speed.startGen(t.memory)}constructor(t,e){this.speed=t,this.dampen=e,this.type="LimitSpeedOverLife"}update(t,e){let i=t.velocity.length(),s=this.speed.genValue(t.memory,t.age/t.life);if(i>s){const n=(i-s)/i;t.velocity.multiplyScalar(1-n*this.dampen*e*20)}}toJSON(){return{type:this.type,speed:this.speed.toJSON(),dampen:this.dampen}}static fromJSON(t){return new Ci(E(t.speed),t.dampen)}frameUpdate(t){}clone(){return new Ci(this.speed.clone(),this.dampen)}reset(){}},Ui={ApplyForce:{type:"ApplyForce",constructor:as,params:[["direction",["vec3"]],["magnitude",["value"]]],loadJSON:as.fromJSON},Noise:{type:"Noise",constructor:ds,params:[["frequency",["value"]],["power",["value"]],["positionAmount",["value"]],["rotationAmount",["value"]]],loadJSON:ds.fromJSON},TurbulenceField:{type:"TurbulenceField",constructor:us,params:[["scale",["vec3"]],["octaves",["number"]],["velocityMultiplier",["vec3"]],["timeScale",["vec3"]]],loadJSON:us.fromJSON},GravityForce:{type:"GravityForce",constructor:os,params:[["center",["vec3"]],["magnitude",["number"]]],loadJSON:os.fromJSON},ColorOverLife:{type:"ColorOverLife",constructor:fe,params:[["color",["colorFunc"]]],loadJSON:fe.fromJSON},RotationOverLife:{type:"RotationOverLife",constructor:ji,params:[["angularVelocity",["value","valueFunc"]]],loadJSON:ji.fromJSON},Rotation3DOverLife:{type:"Rotation3DOverLife",constructor:ts,params:[["angularVelocity",["rotationFunc"]]],loadJSON:ts.fromJSON},SizeOverLife:{type:"SizeOverLife",constructor:pe,params:[["size",["value","valueFunc","vec3Func"]]],loadJSON:pe.fromJSON},ColorBySpeed:{type:"ColorBySpeed",constructor:fs,params:[["color",["colorFunc"]],["speedRange",["range"]]],loadJSON:fs.fromJSON},RotationBySpeed:{type:"RotationBySpeed",constructor:ys,params:[["angularVelocity",["value","valueFunc"]],["speedRange",["range"]]],loadJSON:ys.fromJSON},SizeBySpeed:{type:"SizeBySpeed",constructor:ps,params:[["size",["value","valueFunc","vec3Func"]],["speedRange",["range"]]],loadJSON:ps.fromJSON},SpeedOverLife:{type:"SpeedOverLife",constructor:is,params:[["speed",["value","valueFunc"]]],loadJSON:is.fromJSON},FrameOverLife:{type:"FrameOverLife",constructor:ss,params:[["frame",["value","valueFunc"]]],loadJSON:ss.fromJSON},ForceOverLife:{type:"ForceOverLife",constructor:es,params:[["x",["value","valueFunc"]],["y",["value","valueFunc"]],["z",["value","valueFunc"]]],loadJSON:es.fromJSON},OrbitOverLife:{type:"OrbitOverLife",constructor:rs,params:[["orbitSpeed",["value","valueFunc"]],["axis",["vec3"]]],loadJSON:rs.fromJSON},WidthOverLength:{type:"WidthOverLength",constructor:ns,params:[["width",["value","valueFunc"]]],loadJSON:ns.fromJSON},ChangeEmitDirection:{type:"ChangeEmitDirection",constructor:hs,params:[["angle",["value"]]],loadJSON:hs.fromJSON},EmitSubParticleSystem:{type:"EmitSubParticleSystem",constructor:cs,params:[["particleSystem",["self"]],["useVelocityAsBasis",["boolean"]],["subParticleSystem",["particleSystem"]],["mode",["number"]],["emitProbability",["number"]]],loadJSON:cs.fromJSON},LimitSpeedOverLife:{type:"LimitSpeedOverLife",constructor:gs,params:[["speed",["value","valueFunc"]],["dampen",["number"]]],loadJSON:gs.fromJSON}};function Tn(r,t){return Ui[r.type].loadJSON(r,t)}var On=[];function Pn(r){if(!On.find(t=>t.id===r.id)){r.initialize();for(const t of r.emitterShapes)ui[t.type]||(ui[t.type]=t);for(const t of r.behaviors)Ui[t.type]||(Ui[t.type]=t)}}var Nn=`
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
`,En=`
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
`,An=`
#ifdef SOFT_PARTICLES
    varying vec4 projPosition;
    varying float linearDepth;
#endif
`,Cn=`
#ifdef SOFT_PARTICLES
    projPosition = gl_Position;
    linearDepth = -mvPosition.z;
#endif
`,Un=`
#ifdef USE_MAP
    vec4 texelColor = texture2D( map, vUv);
    #ifdef TILE_BLEND
        texelColor = mix( texelColor, texture2D( map, vUvNext ), vUvBlend );
    #endif
    diffuseColor *= texelColor;
#endif
`,Bn=`
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
`,Rn=`
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
`,kn=`
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

`,wt=lr;function Fn(){wt.tile_pars_vertex=Rn,wt.tile_vertex=kn,wt.tile_pars_fragment=Bn,wt.tile_fragment=Un,wt.soft_pars_vertex=An,wt.soft_vertex=Cn,wt.soft_pars_fragment=En,wt.soft_fragment=Nn}var In=class extends Ns{constructor(r){super(),this.type="ParticleEmitter",this.system=r}clone(){const r=this.system.clone();return r.emitter.copy(this,!0),r.emitter}dispose(){}extractFromCache(r){const t=[];for(const e in r){const i=r[e];delete i.metadata,t.push(i)}return t}toJSON(r,t={}){const e=this.children;this.children=this.children.filter(s=>s.type!=="ParticleSystemPreview");const i=super.toJSON(r);return this.children=e,this.system!==null&&(i.object.ps=this.system.toJSON(r,t)),i}},b;(function(r){r[r.BillBoard=0]="BillBoard",r[r.StretchedBillBoard=1]="StretchedBillBoard",r[r.Mesh=2]="Mesh",r[r.Trail=3]="Trail",r[r.HorizontalBillBoard=4]="HorizontalBillBoard",r[r.VerticalBillBoard=5]="VerticalBillBoard"})(b||(b={}));var Xs=class extends Os{constructor(r){super(),this.type="VFXBatch",this.maxParticles=1e3,this.systems=new Set;const t=new ie;t.mask=r.layers.mask;const e=r.material.clone();e.defines={},Object.assign(e.defines,r.material.defines),this.settings={instancingGeometry:r.instancingGeometry,renderMode:r.renderMode,renderOrder:r.renderOrder,material:e,uTileCount:r.uTileCount,vTileCount:r.vTileCount,blendTiles:r.blendTiles,softParticles:r.softParticles,softNearFade:r.softNearFade,softFarFade:r.softFarFade,layers:t},this.frustumCulled=!1,this.renderOrder=this.settings.renderOrder}addSystem(r){this.systems.add(r)}removeSystem(r){this.systems.delete(r)}applyDepthTexture(r){const t=this.material.uniforms.depthTexture;t&&t.value!==r&&(t.value=r,this.material.needsUpdate=!0)}},Ln=new z(0,0,1),Fe=new J,Vn=new z,Jn=new z;new z;var vs=60,Dn=new Ps(1,1,1,1),Gn=class Bi{set time(t){this.emissionState.time=t}get time(){return this.emissionState.time}get layers(){return this.rendererSettings.layers}get texture(){return this.rendererSettings.material.map}set texture(t){this.rendererSettings.material.map=t,this.neededToUpdateRender=!0}get material(){return this.rendererSettings.material}set material(t){this.rendererSettings.material=t,this.neededToUpdateRender=!0}get uTileCount(){return this.rendererSettings.uTileCount}set uTileCount(t){this.rendererSettings.uTileCount=t,this.neededToUpdateRender=!0}get vTileCount(){return this.rendererSettings.vTileCount}set vTileCount(t){this.rendererSettings.vTileCount=t,this.neededToUpdateRender=!0}get blendTiles(){return this.rendererSettings.blendTiles}set blendTiles(t){this.rendererSettings.blendTiles=t,this.neededToUpdateRender=!0}get softParticles(){return this.rendererSettings.softParticles}set softParticles(t){this.rendererSettings.softParticles=t,this.neededToUpdateRender=!0}get softNearFade(){return this.rendererSettings.softNearFade}set softNearFade(t){this.rendererSettings.softNearFade=t,this.neededToUpdateRender=!0}get softFarFade(){return this.rendererSettings.softFarFade}set softFarFade(t){this.rendererSettings.softFarFade=t,this.neededToUpdateRender=!0}get instancingGeometry(){return this.rendererSettings.instancingGeometry}set instancingGeometry(t){this.restart(),this.particles.length=0,this.rendererSettings.instancingGeometry=t,this.neededToUpdateRender=!0}get renderMode(){return this.rendererSettings.renderMode}set renderMode(t){if((this.rendererSettings.renderMode!=b.Trail&&t===b.Trail||this.rendererSettings.renderMode==b.Trail&&t!==b.Trail)&&(this.restart(),this.particles.length=0),this.rendererSettings.renderMode!==t)switch(t){case b.Trail:this.rendererEmitterSettings={startLength:new A(30),followLocalOrigin:!1};break;case b.Mesh:this.rendererEmitterSettings={geometry:new Ps(1,1)},this.startRotation=new Js(new z(0,1,0),new A(0));break;case b.StretchedBillBoard:this.rendererEmitterSettings={speedFactor:0,lengthFactor:2},this.rendererSettings.renderMode===b.Mesh&&(this.startRotation=new A(0));break;case b.BillBoard:case b.VerticalBillBoard:case b.HorizontalBillBoard:this.rendererEmitterSettings={},this.rendererSettings.renderMode===b.Mesh&&(this.startRotation=new A(0));break}this.rendererSettings.renderMode=t,this.neededToUpdateRender=!0}get renderOrder(){return this.rendererSettings.renderOrder}set renderOrder(t){this.rendererSettings.renderOrder=t,this.neededToUpdateRender=!0}get blending(){return this.rendererSettings.material.blending}set blending(t){this.rendererSettings.material.blending=t,this.neededToUpdateRender=!0}constructor(t){var e,i,s,n,a,h,o,l,c,u,m,d,f,p,g,v,_,M,y,x,S,w,O,P,N,F;if(this.temp=new z,this.travelDistance=0,this.normalMatrix=new Tt,this.memory=[],this.firstTimeUpdate=!0,this.autoDestroy=t.autoDestroy===void 0?!1:t.autoDestroy,this.duration=(e=t.duration)!==null&&e!==void 0?e:1,this.looping=t.looping===void 0?!0:t.looping,this.prewarm=t.prewarm===void 0?!1:t.prewarm,this.startLife=(i=t.startLife)!==null&&i!==void 0?i:new A(5),this.startSpeed=(s=t.startSpeed)!==null&&s!==void 0?s:new A(0),this.startRotation=(n=t.startRotation)!==null&&n!==void 0?n:new A(0),this.startSize=(a=t.startSize)!==null&&a!==void 0?a:new A(1),this.startColor=(h=t.startColor)!==null&&h!==void 0?h:new Zt(new at(1,1,1,1)),this.emissionOverTime=(o=t.emissionOverTime)!==null&&o!==void 0?o:new A(10),this.emissionOverDistance=(l=t.emissionOverDistance)!==null&&l!==void 0?l:new A(0),this.emissionBursts=(c=t.emissionBursts)!==null&&c!==void 0?c:[],this.onlyUsedByOther=(u=t.onlyUsedByOther)!==null&&u!==void 0?u:!1,this.emitterShape=(m=t.shape)!==null&&m!==void 0?m:new oi,this.behaviors=(d=t.behaviors)!==null&&d!==void 0?d:new Array,this.worldSpace=(f=t.worldSpace)!==null&&f!==void 0?f:!1,this.rendererEmitterSettings=(p=t.rendererEmitterSettings)!==null&&p!==void 0?p:{},t.renderMode===b.StretchedBillBoard){const L=this.rendererEmitterSettings;t.speedFactor!==void 0&&(L.speedFactor=t.speedFactor),L.speedFactor=(g=L.speedFactor)!==null&&g!==void 0?g:0,L.lengthFactor=(v=L.lengthFactor)!==null&&v!==void 0?v:0}this.rendererSettings={instancingGeometry:(_=t.instancingGeometry)!==null&&_!==void 0?_:Dn,renderMode:(M=t.renderMode)!==null&&M!==void 0?M:b.BillBoard,renderOrder:(y=t.renderOrder)!==null&&y!==void 0?y:0,material:t.material,uTileCount:(x=t.uTileCount)!==null&&x!==void 0?x:1,vTileCount:(S=t.vTileCount)!==null&&S!==void 0?S:1,blendTiles:(w=t.blendTiles)!==null&&w!==void 0?w:!1,softParticles:(O=t.softParticles)!==null&&O!==void 0?O:!1,softNearFade:(P=t.softNearFade)!==null&&P!==void 0?P:0,softFarFade:(N=t.softFarFade)!==null&&N!==void 0?N:0,layers:(F=t.layers)!==null&&F!==void 0?F:new ie},this.neededToUpdateRender=!0,this.particles=new Array,this.startTileIndex=t.startTileIndex||new A(0),this.emitter=new In(this),this.paused=!1,this.particleNum=0,this.emissionState={isBursting:!1,burstParticleIndex:0,burstParticleCount:0,burstIndex:0,burstWaveIndex:0,time:0,waitEmiting:0,travelDistance:0},this.emissionBursts.forEach(L=>L.count.startGen(this.memory)),this.emissionOverDistance.startGen(this.memory),this.emitEnded=!1,this.markForDestroy=!1,this.prewarmed=!1}pause(){this.paused=!0}play(){this.paused=!1}stop(){this.restart(),this.pause()}spawn(t,e,i){Fe.setFromRotationMatrix(i);const s=Vn,n=Fe,a=Jn;i.decompose(s,n,a);for(let h=0;h<t;h++){for(e.burstParticleIndex=h,this.particleNum++;this.particles.length<this.particleNum;)this.rendererSettings.renderMode===b.Trail?this.particles.push(new _i):this.particles.push(new pn);const o=this.particles[this.particleNum-1];if(o.reset(),o.speedModifier=1,this.startColor.startGen(o.memory),this.startColor.genColor(o.memory,o.startColor,this.emissionState.time),o.color.copy(o.startColor),this.startSpeed.startGen(o.memory),o.startSpeed=this.startSpeed.genValue(o.memory,e.time/this.duration),this.startLife.startGen(o.memory),o.life=this.startLife.genValue(o.memory,e.time/this.duration),o.age=0,this.startSize.startGen(o.memory),this.startSize.type==="vec3function")this.startSize.genValue(o.memory,o.startSize,e.time/this.duration);else{const l=this.startSize.genValue(o.memory,e.time/this.duration);o.startSize.set(l,l,l)}if(this.startTileIndex.startGen(o.memory),o.uvTile=this.startTileIndex.genValue(o.memory),o.size.copy(o.startSize),this.rendererSettings.renderMode===b.Mesh||this.rendererSettings.renderMode===b.BillBoard||this.rendererSettings.renderMode===b.VerticalBillBoard||this.rendererSettings.renderMode===b.HorizontalBillBoard||this.rendererSettings.renderMode===b.StretchedBillBoard){const l=o;this.startRotation.startGen(o.memory),this.rendererSettings.renderMode===b.Mesh?(l.rotation instanceof J||(l.rotation=new J),this.startRotation.type==="rotation"?this.startRotation.genValue(o.memory,l.rotation,1,e.time/this.duration):l.rotation.setFromAxisAngle(Ln,this.startRotation.genValue(l.memory,e.time/this.duration))):this.startRotation.type==="rotation"?l.rotation=0:l.rotation=this.startRotation.genValue(l.memory,e.time/this.duration)}else if(this.rendererSettings.renderMode===b.Trail){const l=o;this.rendererEmitterSettings.startLength.startGen(l.memory),l.length=this.rendererEmitterSettings.startLength.genValue(l.memory,e.time/this.duration)}if(this.emitterShape.initialize(o,e),this.rendererSettings.renderMode===b.Trail&&this.rendererEmitterSettings.followLocalOrigin){const l=o;l.localPosition=new z().copy(l.position)}this.worldSpace?(o.position.applyMatrix4(i),o.startSize.multiply(a).abs(),o.size.copy(o.startSize),o.velocity.multiply(a).applyMatrix3(this.normalMatrix),o.rotation&&o.rotation instanceof J&&o.rotation.multiplyQuaternions(Fe,o.rotation)):this.onlyUsedByOther&&(o.parentMatrix=i);for(let l=0;l<this.behaviors.length;l++)this.behaviors[l].initialize(o,this)}}endEmit(){this.emitEnded=!0,this.autoDestroy&&(this.markForDestroy=!0)}dispose(){this._renderer&&this._renderer.deleteSystem(this),this.emitter.dispose(),this.emitter.parent&&this.emitter.parent.remove(this.emitter)}restart(){this.memory.length=0,this.paused=!1,this.particleNum=0,this.emissionState.isBursting=!1,this.emissionState.burstIndex=0,this.emissionState.burstWaveIndex=0,this.emissionState.time=0,this.emissionState.waitEmiting=0,this.behaviors.forEach(t=>{t.reset()}),this.emitEnded=!1,this.markForDestroy=!1,this.prewarmed=!1,this.emissionBursts.forEach(t=>t.count.startGen(this.memory)),this.emissionOverDistance.startGen(this.memory)}update(t){if(this.paused)return;let e=this.emitter;for(;e.parent;)e=e.parent;if(e.type!=="Scene"){this.dispose();return}if(this.firstTimeUpdate&&(this.firstTimeUpdate=!1,this.emitter.updateWorldMatrix(!0,!1)),this.emitEnded&&this.particleNum===0){this.markForDestroy&&this.emitter.parent&&this.dispose();return}if(this.looping&&this.prewarm&&!this.prewarmed){this.prewarmed=!0;for(let i=0;i<this.duration*vs;i++)this.update(1/vs)}t>.1&&(t=.1),this.neededToUpdateRender&&(this._renderer&&this._renderer.updateSystem(this),this.neededToUpdateRender=!1),this.onlyUsedByOther||this.emit(t,this.emissionState,this.emitter.matrixWorld),this.emitterShape.update(this,t);for(let i=0;i<this.behaviors.length;i++){this.behaviors[i].frameUpdate(t);for(let s=0;s<this.particleNum;s++)this.particles[s].died||this.behaviors[i].update(this.particles[s],t)}for(let i=0;i<this.particleNum;i++)this.rendererEmitterSettings.followLocalOrigin&&this.particles[i].localPosition?(this.particles[i].position.copy(this.particles[i].localPosition),this.particles[i].parentMatrix?this.particles[i].position.applyMatrix4(this.particles[i].parentMatrix):this.particles[i].position.applyMatrix4(this.emitter.matrixWorld)):this.particles[i].position.addScaledVector(this.particles[i].velocity,t*this.particles[i].speedModifier),this.particles[i].age+=t;if(this.rendererSettings.renderMode===b.Trail)for(let i=0;i<this.particleNum;i++)this.particles[i].update();for(let i=0;i<this.particleNum;i++){const s=this.particles[i];s.died&&(!(s instanceof _i)||s.previous.length===0)&&(this.particles[i]=this.particles[this.particleNum-1],this.particles[this.particleNum-1]=s,this.particleNum--,i--)}}emit(t,e,i){e.time>this.duration&&(this.looping?(e.time-=this.duration,e.burstIndex=0,this.behaviors.forEach(n=>{n.reset()})):!this.emitEnded&&!this.onlyUsedByOther&&this.endEmit()),this.normalMatrix.getNormalMatrix(i);const s=Math.ceil(e.waitEmiting);for(this.spawn(s,e,i),e.waitEmiting-=s;e.burstIndex<this.emissionBursts.length&&this.emissionBursts[e.burstIndex].time<=e.time;){if(Math.random()<this.emissionBursts[e.burstIndex].probability){const n=this.emissionBursts[e.burstIndex].count.genValue(this.memory,this.time);e.isBursting=!0,e.burstParticleCount=n,this.spawn(n,e,i),e.isBursting=!1}e.burstIndex++}if(!this.emitEnded&&(e.waitEmiting+=t*this.emissionOverTime.genValue(this.memory,e.time/this.duration),e.previousWorldPos!=null)){this.temp.set(i.elements[12],i.elements[13],i.elements[14]),e.travelDistance+=e.previousWorldPos.distanceTo(this.temp);const n=this.emissionOverDistance.genValue(this.memory,e.time/this.duration);if(e.travelDistance*n>0){const a=Math.floor(e.travelDistance*n);e.travelDistance-=a/n,e.waitEmiting+=a}}e.previousWorldPos===void 0&&(e.previousWorldPos=new z),e.previousWorldPos.set(i.elements[12],i.elements[13],i.elements[14]),e.time+=t}toJSON(t,e={}){var i;if((t===void 0||typeof t=="string")&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}}),t.materials[this.rendererSettings.material.uuid]=this.rendererSettings.material.toJSON(t),e.useUrlForImage&&((i=this.texture)===null||i===void 0?void 0:i.source)!==void 0){const a=this.texture.source;t.images[a.uuid]={uuid:a.uuid,url:this.texture.image.url}}let s;this.renderMode===b.Trail?s={startLength:this.rendererEmitterSettings.startLength.toJSON(),followLocalOrigin:this.rendererEmitterSettings.followLocalOrigin}:this.renderMode===b.Mesh?s={}:this.renderMode===b.StretchedBillBoard?s={speedFactor:this.rendererEmitterSettings.speedFactor,lengthFactor:this.rendererEmitterSettings.lengthFactor}:s={};const n=this.rendererSettings.instancingGeometry;return t.geometries&&!t.geometries[n.uuid]&&(t.geometries[n.uuid]=n.toJSON()),{version:"3.0",autoDestroy:this.autoDestroy,looping:this.looping,prewarm:this.prewarm,duration:this.duration,shape:this.emitterShape.toJSON(),startLife:this.startLife.toJSON(),startSpeed:this.startSpeed.toJSON(),startRotation:this.startRotation.toJSON(),startSize:this.startSize.toJSON(),startColor:this.startColor.toJSON(),emissionOverTime:this.emissionOverTime.toJSON(),emissionOverDistance:this.emissionOverDistance.toJSON(),emissionBursts:this.emissionBursts.map(a=>({time:a.time,count:a.count.toJSON(),probability:a.probability,interval:a.interval,cycle:a.cycle})),onlyUsedByOther:this.onlyUsedByOther,instancingGeometry:this.rendererSettings.instancingGeometry.uuid,renderOrder:this.renderOrder,renderMode:this.renderMode,rendererEmitterSettings:s,material:this.rendererSettings.material.uuid,layers:this.layers.mask,startTileIndex:this.startTileIndex.toJSON(),uTileCount:this.uTileCount,vTileCount:this.vTileCount,blendTiles:this.blendTiles,softParticles:this.rendererSettings.softParticles,softFarFade:this.rendererSettings.softFarFade,softNearFade:this.rendererSettings.softNearFade,behaviors:this.behaviors.map(a=>a.toJSON()),worldSpace:this.worldSpace}}static fromJSON(t,e,i){var s,n;const a=mn(t.shape,e);let h;if(t.renderMode===b.Trail){const c=t.rendererEmitterSettings;h={startLength:c.startLength!=null?E(c.startLength):new A(30),followLocalOrigin:c.followLocalOrigin}}else t.renderMode===b.Mesh?h={}:t.renderMode===b.StretchedBillBoard?(h=t.rendererEmitterSettings,t.speedFactor!=null&&(h.speedFactor=t.speedFactor)):h={};const o=new ie;t.layers&&(o.mask=t.layers);const l=new Bi({autoDestroy:t.autoDestroy,looping:t.looping,prewarm:t.prewarm,duration:t.duration,shape:a,startLife:E(t.startLife),startSpeed:E(t.startSpeed),startRotation:de(t.startRotation),startSize:de(t.startSize),startColor:Ii(t.startColor),emissionOverTime:E(t.emissionOverTime),emissionOverDistance:E(t.emissionOverDistance),emissionBursts:(s=t.emissionBursts)===null||s===void 0?void 0:s.map(c=>{var u,m,d;return{time:c.time,count:typeof c.count=="number"?new A(c.count):E(c.count),probability:(u=c.probability)!==null&&u!==void 0?u:1,interval:(m=c.interval)!==null&&m!==void 0?m:.1,cycle:(d=c.cycle)!==null&&d!==void 0?d:1}}),onlyUsedByOther:t.onlyUsedByOther,instancingGeometry:e.geometries[t.instancingGeometry],renderMode:t.renderMode,rendererEmitterSettings:h,renderOrder:t.renderOrder,layers:o,material:t.material?e.materials[t.material]:t.texture?new le({map:e.textures[t.texture],transparent:(n=t.transparent)!==null&&n!==void 0?n:!0,blending:t.blending,side:2}):new le({color:16777215,transparent:!0,blending:2,side:2}),startTileIndex:typeof t.startTileIndex=="number"?new A(t.startTileIndex):E(t.startTileIndex),uTileCount:t.uTileCount,vTileCount:t.vTileCount,blendTiles:t.blendTiles,softParticles:t.softParticles,softFarFade:t.softFarFade,softNearFade:t.softNearFade,behaviors:[],worldSpace:t.worldSpace});return l.behaviors=t.behaviors.map(c=>{const u=Tn(c,l);return u.type==="EmitSubParticleSystem"&&(i[c.subParticleSystem]=u),u}),l}addBehavior(t){this.behaviors.push(t)}getRendererSettings(){return this.rendererSettings}clone(){const t=[];for(const n of this.emissionBursts){const a={};Object.assign(a,n),t.push(a)}const e=[];for(const n of this.behaviors)e.push(n.clone());let i;this.renderMode===b.Trail?i={startLength:this.rendererEmitterSettings.startLength.clone(),followLocalOrigin:this.rendererEmitterSettings.followLocalOrigin}:i={};const s=new ie;return s.mask=this.layers.mask,new Bi({autoDestroy:this.autoDestroy,looping:this.looping,duration:this.duration,shape:this.emitterShape.clone(),startLife:this.startLife.clone(),startSpeed:this.startSpeed.clone(),startRotation:this.startRotation.clone(),startSize:this.startSize.clone(),startColor:this.startColor.clone(),emissionOverTime:this.emissionOverTime.clone(),emissionOverDistance:this.emissionOverDistance.clone(),emissionBursts:t,onlyUsedByOther:this.onlyUsedByOther,instancingGeometry:this.rendererSettings.instancingGeometry,renderMode:this.renderMode,renderOrder:this.renderOrder,rendererEmitterSettings:i,material:this.rendererSettings.material,startTileIndex:this.startTileIndex,uTileCount:this.uTileCount,vTileCount:this.vTileCount,blendTiles:this.blendTiles,softParticles:this.softParticles,softFarFade:this.softFarFade,softNearFade:this.softNearFade,behaviors:e,worldSpace:this.worldSpace,layers:s})}},Ie=`

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
`,Li=`
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
}`,Xn=`
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
`,qn=`
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
`,Vi=`
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
`,Yn=`
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
`;function Ri(r){return r===0?"uv":`uv${r}`}var Hn=class extends hr{constructor(r){super(r)}onBeforeCompile(r,t){super.onBeforeCompile(r,t),r.vertexShader=Vi,r.fragmentShader=Li}},Zn=class extends or{constructor(r){super(r)}onBeforeCompile(r,t){super.onBeforeCompile(r,t),r.vertexShader=Vi,r.fragmentShader=Li}};new z(0,0,1);var $n=class extends Xs{constructor(r){super(r),this.vector_=new z,this.vector2_=new z,this.vector3_=new z,this.quaternion_=new J,this.quaternion2_=new J,this.quaternion3_=new J,this.rotationMat_=new Tt,this.rotationMat2_=new Tt,this.maxParticles=1e3,this.setupBuffers(),this.rebuildMaterial()}buildExpandableBuffers(){this.offsetBuffer=new zt(new Float32Array(this.maxParticles*3),3),this.offsetBuffer.setUsage(j),this.geometry.setAttribute("offset",this.offsetBuffer),this.colorBuffer=new zt(new Float32Array(this.maxParticles*4),4),this.colorBuffer.setUsage(j),this.geometry.setAttribute("color",this.colorBuffer),this.settings.renderMode===b.Mesh?(this.rotationBuffer=new zt(new Float32Array(this.maxParticles*4),4),this.rotationBuffer.setUsage(j),this.geometry.setAttribute("rotation",this.rotationBuffer)):(this.settings.renderMode===b.BillBoard||this.settings.renderMode===b.HorizontalBillBoard||this.settings.renderMode===b.VerticalBillBoard||this.settings.renderMode===b.StretchedBillBoard)&&(this.rotationBuffer=new zt(new Float32Array(this.maxParticles),1),this.rotationBuffer.setUsage(j),this.geometry.setAttribute("rotation",this.rotationBuffer)),this.sizeBuffer=new zt(new Float32Array(this.maxParticles*3),3),this.sizeBuffer.setUsage(j),this.geometry.setAttribute("size",this.sizeBuffer),this.uvTileBuffer=new zt(new Float32Array(this.maxParticles),1),this.uvTileBuffer.setUsage(j),this.geometry.setAttribute("uvTile",this.uvTileBuffer),this.settings.renderMode===b.StretchedBillBoard&&(this.velocityBuffer=new zt(new Float32Array(this.maxParticles*4),4),this.velocityBuffer.setUsage(j),this.geometry.setAttribute("velocity",this.velocityBuffer))}setupBuffers(){this.geometry&&this.geometry.dispose(),this.geometry=new ar,this.geometry.setIndex(this.settings.instancingGeometry.getIndex()),this.settings.instancingGeometry.hasAttribute("normal")&&this.geometry.setAttribute("normal",this.settings.instancingGeometry.getAttribute("normal")),this.geometry.setAttribute("position",this.settings.instancingGeometry.getAttribute("position")),this.geometry.setAttribute("uv",this.settings.instancingGeometry.getAttribute("uv")),this.buildExpandableBuffers()}expandBuffers(r){for(;r>=this.maxParticles;)this.maxParticles*=2;this.setupBuffers()}rebuildMaterial(){this.layers.mask=this.settings.layers.mask;const r={},t={};this.settings.material.type!=="MeshStandardMaterial"&&this.settings.material.type!=="MeshPhysicalMaterial"&&(r.map=new lt(this.settings.material.map)),this.settings.material.alphaTest&&(t.USE_ALPHATEST="",r.alphaTest=new lt(this.settings.material.alphaTest)),t.USE_UV="";const e=this.settings.uTileCount,i=this.settings.vTileCount;(e>1||i>1)&&(t.UV_TILE="",r.tileCount=new lt(new Et(e,i))),this.settings.material.defines&&this.settings.material.defines.USE_COLOR_AS_ALPHA!==void 0&&(t.USE_COLOR_AS_ALPHA=""),this.settings.material.normalMap&&(t.USE_NORMALMAP="",t.NORMALMAP_UV=Ri(this.settings.material.normalMap.channel),r.normalMapTransform=new lt(new Tt().copy(this.settings.material.normalMap.matrix))),this.settings.material.map&&(t.USE_MAP="",this.settings.blendTiles&&(t.TILE_BLEND=""),t.MAP_UV=Ri(this.settings.material.map.channel),r.mapTransform=new lt(new Tt().copy(this.settings.material.map.matrix))),t.USE_COLOR_ALPHA="";let s;if(this.settings.softParticles){t.SOFT_PARTICLES="";const a=this.settings.softNearFade;r.softParams=new lt(new Et(a,1/(this.settings.softFarFade-this.settings.softNearFade))),r.depthTexture=new lt(null);const h=r.projParams=new lt(new at);s=(o,l,c)=>{h.value.set(c.near,c.far,0,0)}}let n=!1;if(this.settings.renderMode===b.BillBoard||this.settings.renderMode===b.VerticalBillBoard||this.settings.renderMode===b.HorizontalBillBoard||this.settings.renderMode===b.Mesh){let a,h;this.settings.renderMode===b.Mesh?this.settings.material.type==="MeshStandardMaterial"||this.settings.material.type==="MeshPhysicalMaterial"?(t.USE_COLOR="",a=Vi,h=Li,n=!0):(a=qn,h=Ie):(a=Xn,h=Ie),this.settings.renderMode===b.VerticalBillBoard?t.VERTICAL="":this.settings.renderMode===b.HorizontalBillBoard&&(t.HORIZONTAL="");let o=!1;this.settings.renderMode===b.Mesh&&(this.settings.material.type==="MeshStandardMaterial"?(this.material=new Hn({}),this.material.copy(this.settings.material),this.material.uniforms=r,this.material.defines=t,o=!0):this.settings.material.type==="MeshPhysicalMaterial"&&(this.material=new Zn({}),this.material.copy(this.settings.material),this.material.uniforms=r,this.material.defines=t,o=!0)),o||(this.material=new Le({uniforms:r,defines:t,vertexShader:a,fragmentShader:h,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,blending:this.settings.material.blending,side:this.settings.material.side,alphaTest:this.settings.material.alphaTest,depthTest:this.settings.material.depthTest,lights:n}))}else if(this.settings.renderMode===b.StretchedBillBoard)r.speedFactor=new lt(1),this.material=new Le({uniforms:r,defines:t,vertexShader:Yn,fragmentShader:Ie,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,blending:this.settings.material.blending,side:this.settings.material.side,alphaTest:this.settings.material.alphaTest,depthTest:this.settings.material.depthTest});else throw new Error("render mode unavailable");this.material&&s&&(this.material.onBeforeRender=s)}update(){let r=0,t=0;this.systems.forEach(e=>{t+=e.particleNum}),t>this.maxParticles&&this.expandBuffers(t),this.systems.forEach(e=>{const i=e.particles,s=e.particleNum,n=this.quaternion2_,a=this.vector2_,h=this.vector3_;e.emitter.matrixWorld.decompose(a,n,h),this.rotationMat_.setFromMatrix4(e.emitter.matrixWorld);for(let o=0;o<s;o++,r++){const l=i[o];if(this.settings.renderMode===b.Mesh){let u;if(e.worldSpace)u=l.rotation;else{let m;l.parentMatrix?m=this.quaternion3_.setFromRotationMatrix(l.parentMatrix):m=n,u=this.quaternion_,u.copy(m).multiply(l.rotation)}this.rotationBuffer.setXYZW(r,u.x,u.y,u.z,u.w)}else(this.settings.renderMode===b.StretchedBillBoard||this.settings.renderMode===b.VerticalBillBoard||this.settings.renderMode===b.HorizontalBillBoard||this.settings.renderMode===b.BillBoard)&&this.rotationBuffer.setX(r,l.rotation);let c;if(e.worldSpace?c=l.position:(c=this.vector_,l.parentMatrix?c.copy(l.position).applyMatrix4(l.parentMatrix):c.copy(l.position).applyMatrix4(e.emitter.matrixWorld)),this.offsetBuffer.setXYZ(r,c.x,c.y,c.z),this.colorBuffer.setXYZW(r,l.color.x,l.color.y,l.color.z,l.color.w),e.worldSpace?this.sizeBuffer.setXYZ(r,l.size.x,l.size.y,l.size.z):l.parentMatrix?this.sizeBuffer.setXYZ(r,l.size.x,l.size.y,l.size.z):this.sizeBuffer.setXYZ(r,l.size.x*Math.abs(h.x),l.size.y*Math.abs(h.y),l.size.z*Math.abs(h.z)),this.uvTileBuffer.setX(r,l.uvTile),this.settings.renderMode===b.StretchedBillBoard&&this.velocityBuffer){let u=e.rendererEmitterSettings.speedFactor;u===0&&(u=.001);const m=e.rendererEmitterSettings.lengthFactor;let d;e.worldSpace?d=l.velocity:(d=this.vector_,l.parentMatrix?(this.rotationMat2_.setFromMatrix4(l.parentMatrix),d.copy(l.velocity).applyMatrix3(this.rotationMat2_)):d.copy(l.velocity).applyMatrix3(this.rotationMat_)),this.velocityBuffer.setXYZW(r,d.x*u,d.y*u,d.z*u,m)}}}),this.geometry.instanceCount=r,r>0&&(this.offsetBuffer.clearUpdateRanges(),this.offsetBuffer.addUpdateRange(0,r*3),this.offsetBuffer.needsUpdate=!0,this.sizeBuffer.clearUpdateRanges(),this.sizeBuffer.addUpdateRange(0,r*3),this.sizeBuffer.needsUpdate=!0,this.colorBuffer.clearUpdateRanges(),this.colorBuffer.addUpdateRange(0,r*4),this.colorBuffer.needsUpdate=!0,this.uvTileBuffer.clearUpdateRanges(),this.uvTileBuffer.addUpdateRange(0,r),this.uvTileBuffer.needsUpdate=!0,this.settings.renderMode===b.StretchedBillBoard&&this.velocityBuffer&&(this.velocityBuffer.clearUpdateRanges(),this.velocityBuffer.addUpdateRange(0,r*4),this.velocityBuffer.needsUpdate=!0),this.settings.renderMode===b.Mesh?(this.rotationBuffer.clearUpdateRanges(),this.rotationBuffer.addUpdateRange(0,r*4),this.rotationBuffer.needsUpdate=!0):(this.settings.renderMode===b.StretchedBillBoard||this.settings.renderMode===b.HorizontalBillBoard||this.settings.renderMode===b.VerticalBillBoard||this.settings.renderMode===b.BillBoard)&&(this.rotationBuffer.clearUpdateRanges(),this.rotationBuffer.addUpdateRange(0,r),this.rotationBuffer.needsUpdate=!0))}dispose(){this.geometry.dispose()}},Wn=`

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
}`,Qn=`
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
}`;new z(0,0,1);var Kn=class extends Xs{constructor(r){super(r),this.vector_=new z,this.vector2_=new z,this.vector3_=new z,this.quaternion_=new J,this.maxParticles=1e4,this.setupBuffers(),this.rebuildMaterial()}setupBuffers(){this.geometry&&this.geometry.dispose(),this.geometry=new As,this.indexBuffer=new St(new Uint32Array(this.maxParticles*6),1),this.indexBuffer.setUsage(j),this.geometry.setIndex(this.indexBuffer),this.positionBuffer=new St(new Float32Array(this.maxParticles*6),3),this.positionBuffer.setUsage(j),this.geometry.setAttribute("position",this.positionBuffer),this.previousBuffer=new St(new Float32Array(this.maxParticles*6),3),this.previousBuffer.setUsage(j),this.geometry.setAttribute("previous",this.previousBuffer),this.nextBuffer=new St(new Float32Array(this.maxParticles*6),3),this.nextBuffer.setUsage(j),this.geometry.setAttribute("next",this.nextBuffer),this.widthBuffer=new St(new Float32Array(this.maxParticles*2),1),this.widthBuffer.setUsage(j),this.geometry.setAttribute("width",this.widthBuffer),this.sideBuffer=new St(new Float32Array(this.maxParticles*2),1),this.sideBuffer.setUsage(j),this.geometry.setAttribute("side",this.sideBuffer),this.uvBuffer=new St(new Float32Array(this.maxParticles*4),2),this.uvBuffer.setUsage(j),this.geometry.setAttribute("uv",this.uvBuffer),this.colorBuffer=new St(new Float32Array(this.maxParticles*8),4),this.colorBuffer.setUsage(j),this.geometry.setAttribute("color",this.colorBuffer)}expandBuffers(r){for(;r>=this.maxParticles;)this.maxParticles*=2;this.setupBuffers()}rebuildMaterial(){this.layers.mask=this.settings.layers.mask;const r={lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},resolution:{value:new Et(1,1)},sizeAttenuation:{value:1},visibility:{value:1},alphaTest:{value:0}},t={};if(t.USE_UV="",t.USE_COLOR_ALPHA="",this.settings.material.map&&(t.USE_MAP="",t.MAP_UV=Ri(this.settings.material.map.channel),r.map=new lt(this.settings.material.map),r.mapTransform=new lt(new Tt().copy(this.settings.material.map.matrix))),this.settings.material.defines&&this.settings.material.defines.USE_COLOR_AS_ALPHA!==void 0&&(t.USE_COLOR_AS_ALPHA=""),this.settings.renderMode===b.Trail)this.material=new Le({uniforms:r,defines:t,vertexShader:Qn,fragmentShader:Wn,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,side:this.settings.material.side,blending:this.settings.material.blending||2});else throw new Error("render mode unavailable")}update(){let r=0,t=0,e=0;this.systems.forEach(i=>{for(let s=0;s<i.particleNum;s++)e+=i.particles[s].previous.length*2}),e>this.maxParticles&&this.expandBuffers(e),this.systems.forEach(i=>{const s=this.quaternion_,n=this.vector2_,a=this.vector3_;i.emitter.matrixWorld.decompose(n,s,a);const h=i.particles,o=i.particleNum,l=this.settings.uTileCount,c=this.settings.vTileCount,u=1/l,m=1/c;for(let d=0;d<o;d++){const f=h[d],p=f.uvTile%c,g=Math.floor(f.uvTile/c+.001),v=f.previous.values();let _=v.next(),M=_.value,y=M;_.done||(_=v.next());let x;_.value!==void 0?x=_.value:x=y;for(let S=0;S<f.previous.length;S++,r+=2){if(this.positionBuffer.setXYZ(r,y.position.x,y.position.y,y.position.z),this.positionBuffer.setXYZ(r+1,y.position.x,y.position.y,y.position.z),i.worldSpace?(this.positionBuffer.setXYZ(r,y.position.x,y.position.y,y.position.z),this.positionBuffer.setXYZ(r+1,y.position.x,y.position.y,y.position.z)):(f.parentMatrix?this.vector_.copy(y.position).applyMatrix4(f.parentMatrix):this.vector_.copy(y.position).applyMatrix4(i.emitter.matrixWorld),this.positionBuffer.setXYZ(r,this.vector_.x,this.vector_.y,this.vector_.z),this.positionBuffer.setXYZ(r+1,this.vector_.x,this.vector_.y,this.vector_.z)),i.worldSpace?(this.previousBuffer.setXYZ(r,M.position.x,M.position.y,M.position.z),this.previousBuffer.setXYZ(r+1,M.position.x,M.position.y,M.position.z)):(f.parentMatrix?this.vector_.copy(M.position).applyMatrix4(f.parentMatrix):this.vector_.copy(M.position).applyMatrix4(i.emitter.matrixWorld),this.previousBuffer.setXYZ(r,this.vector_.x,this.vector_.y,this.vector_.z),this.previousBuffer.setXYZ(r+1,this.vector_.x,this.vector_.y,this.vector_.z)),i.worldSpace?(this.nextBuffer.setXYZ(r,x.position.x,x.position.y,x.position.z),this.nextBuffer.setXYZ(r+1,x.position.x,x.position.y,x.position.z)):(f.parentMatrix?this.vector_.copy(x.position).applyMatrix4(f.parentMatrix):this.vector_.copy(x.position).applyMatrix4(i.emitter.matrixWorld),this.nextBuffer.setXYZ(r,this.vector_.x,this.vector_.y,this.vector_.z),this.nextBuffer.setXYZ(r+1,this.vector_.x,this.vector_.y,this.vector_.z)),this.sideBuffer.setX(r,-1),this.sideBuffer.setX(r+1,1),i.worldSpace)this.widthBuffer.setX(r,y.size),this.widthBuffer.setX(r+1,y.size);else if(f.parentMatrix)this.widthBuffer.setX(r,y.size),this.widthBuffer.setX(r+1,y.size);else{const w=(Math.abs(a.x)+Math.abs(a.y)+Math.abs(a.z))/3;this.widthBuffer.setX(r,y.size*w),this.widthBuffer.setX(r+1,y.size*w)}this.uvBuffer.setXY(r,(S/f.previous.length+p)*u,(c-g-1)*m),this.uvBuffer.setXY(r+1,(S/f.previous.length+p)*u,(c-g)*m),this.colorBuffer.setXYZW(r,y.color.x,y.color.y,y.color.z,y.color.w),this.colorBuffer.setXYZW(r+1,y.color.x,y.color.y,y.color.z,y.color.w),S+1<f.previous.length&&(this.indexBuffer.setX(t*3,r),this.indexBuffer.setX(t*3+1,r+1),this.indexBuffer.setX(t*3+2,r+2),t++,this.indexBuffer.setX(t*3,r+2),this.indexBuffer.setX(t*3+1,r+1),this.indexBuffer.setX(t*3+2,r+3),t++),M=y,y=x,_.done||(_=v.next(),_.value!==void 0&&(x=_.value))}}}),this.positionBuffer.clearUpdateRanges(),this.positionBuffer.addUpdateRange(0,r*3),this.positionBuffer.needsUpdate=!0,this.previousBuffer.clearUpdateRanges(),this.previousBuffer.addUpdateRange(0,r*3),this.previousBuffer.needsUpdate=!0,this.nextBuffer.clearUpdateRanges(),this.nextBuffer.addUpdateRange(0,r*3),this.nextBuffer.needsUpdate=!0,this.sideBuffer.clearUpdateRanges(),this.sideBuffer.addUpdateRange(0,r),this.sideBuffer.needsUpdate=!0,this.widthBuffer.clearUpdateRanges(),this.widthBuffer.addUpdateRange(0,r),this.widthBuffer.needsUpdate=!0,this.uvBuffer.clearUpdateRanges(),this.uvBuffer.addUpdateRange(0,r*2),this.uvBuffer.needsUpdate=!0,this.colorBuffer.clearUpdateRanges(),this.colorBuffer.addUpdateRange(0,r*4),this.colorBuffer.needsUpdate=!0,this.indexBuffer.clearUpdateRanges(),this.indexBuffer.addUpdateRange(0,t*3),this.indexBuffer.needsUpdate=!0,this.geometry.setDrawRange(0,t*3)}dispose(){this.geometry.dispose()}},xs=class ki{get geometry(){return this._geometry}set geometry(t){if(this._geometry=t,t===void 0||typeof t=="string")return;const e=new pr;this._triangleIndexToArea.length=0;let i=0;if(!t.getIndex())return;const s=t.getIndex().array,n=s.length/3;this._triangleIndexToArea.push(0);for(let a=0;a<n;a++)e.setFromAttributeAndIndices(t.getAttribute("position"),s[a*3],s[a*3+1],s[a*3+2]),i+=e.getArea(),this._triangleIndexToArea.push(i);t.userData.triangleIndexToArea=this._triangleIndexToArea}constructor(t){this.type="mesh_surface",this._triangleIndexToArea=[],this._tempA=new ct,this._tempB=new ct,this._tempC=new ct,t&&(this.geometry=t)}initialize(t){const e=this._geometry;if(!e||e.getIndex()===null){t.position.set(0,0,0),t.velocity.set(0,0,1).multiplyScalar(t.startSpeed);return}const i=this._triangleIndexToArea.length-1;let s=0,n=i;const a=Math.random()*this._triangleIndexToArea[i];for(;s+1<n;){const d=Math.floor((s+n)/2);a<this._triangleIndexToArea[d]?n=d:s=d}let h=Math.random(),o=Math.random();h+o>1&&(h=1-h,o=1-o);const l=e.getIndex().array[s*3],c=e.getIndex().array[s*3+1],u=e.getIndex().array[s*3+2],m=e.getAttribute("position");this._tempA.fromBufferAttribute(m,l),this._tempB.fromBufferAttribute(m,c),this._tempC.fromBufferAttribute(m,u),this._tempB.sub(this._tempA),this._tempC.sub(this._tempA),this._tempA.addScaledVector(this._tempB,h).addScaledVector(this._tempC,o),t.position.copy(this._tempA),this._tempA.copy(this._tempB).cross(this._tempC).normalize(),t.velocity.copy(this._tempA).normalize().multiplyScalar(t.startSpeed)}toJSON(){return{type:"mesh_surface",mesh:this._geometry?this._geometry.uuid:""}}static fromJSON(t,e){return new ki(e.geometries[t.geometry])}clone(){return new ki(this._geometry)}update(t,e){}};Pn({id:"three.quarks",initialize:()=>{},emitterShapes:[{type:"mesh_surface",params:[["geometry",["geometry"]]],constructor:xs,loadJSON:xs.fromJSON}],behaviors:[]});var jn=class qs extends Ns{constructor(){super(),this.batches=[],this.systemToBatchIndex=new Map,this.type="BatchedRenderer",this.depthTexture=null}static equals(t,e){return t.material.side===e.material.side&&t.material.blending===e.material.blending&&t.material.transparent===e.material.transparent&&t.material.depthTest===e.material.depthTest&&t.material.type===e.material.type&&t.material.alphaTest===e.material.alphaTest&&t.material.map===e.material.map&&t.renderMode===e.renderMode&&t.blendTiles===e.blendTiles&&t.softParticles===e.softParticles&&t.softFarFade===e.softFarFade&&t.softNearFade===e.softNearFade&&t.uTileCount===e.uTileCount&&t.vTileCount===e.vTileCount&&t.instancingGeometry===e.instancingGeometry&&t.renderOrder===e.renderOrder&&t.layers.mask===e.layers.mask}addSystem(t){t._renderer=this;const e=t.getRendererSettings();for(let s=0;s<this.batches.length;s++)if(qs.equals(this.batches[s].settings,e)){this.batches[s].addSystem(t),this.systemToBatchIndex.set(t,s);return}let i;switch(e.renderMode){case b.Trail:i=new Kn(e);break;case b.Mesh:case b.BillBoard:case b.VerticalBillBoard:case b.HorizontalBillBoard:case b.StretchedBillBoard:i=new $n(e);break}this.depthTexture&&i.applyDepthTexture(this.depthTexture),i.addSystem(t),this.batches.push(i),this.systemToBatchIndex.set(t,this.batches.length-1),this.add(i)}deleteSystem(t){const e=this.systemToBatchIndex.get(t);e!=null&&(this.batches[e].removeSystem(t),this.systemToBatchIndex.delete(t))}setDepthTexture(t){this.depthTexture=t;for(const e of this.batches)e.applyDepthTexture(t)}updateSystem(t){this.deleteSystem(t),this.addSystem(t)}update(t){this.systemToBatchIndex.forEach((e,i)=>{i.update(t)});for(let e=0;e<this.batches.length;e++)this.batches[e].update()}};Fn();console.log("%c Particle system powered by three.quarks. https://quarks.art/","font-size: 14px; font-weight: bold;");var ta="/previews/pr-1839/_astro/fire3.lFy7OwnQ.png",ea="/previews/pr-1839/_astro/smoke.DKJcQUg-.png",Ys=()=>mr("quarks-renderer",()=>{console.log("RENDERER");const{autoRenderTask:r,scene:t}=Es(),e=new jn;return t.add(e),$t(i=>{e.update(i)},{before:r}),{renderer:e}});function _s(r,t){pt(t,!0);const e=()=>nr(o,"$parent",i),[i,s]=sr();let n=Ts(t,"system",15),a=rr(t,["$$slots","$$events","$$legacy","name","children","system"]);const{renderer:h}=Ys();n(new Gn({...a}));const o=ur();ee(()=>(Ji(e(),"Object3D")&&e().add(n().emitter),()=>{Ji(e(),"Object3D")&&e().remove(n().emitter)})),ee(()=>{t.name&&n(n().emitter.name=t.name,!0)}),ee(()=>(h.addSystem(n()),()=>{h.deleteSystem(n())}));var l=nt(),c=B(l);ye(c,()=>t.children??he,()=>({system:n()})),U(r,l),yt(),s()}function Ss(r,t){pt(t,!0);let e=Ts(t,"system",7);const i=e().emissionOverTime,s=new A(0);Qs(()=>{t.active?e().emissionOverTime=i:e().emissionOverTime=s}),yt()}var ia=Y("<!> <!>",1);function sa(r,t){pt(t,!0);const e=(a,h,o)=>[a/255,h/255,o/255],i=a=>{a=a.replace(/^#/,"");const h=parseInt(a,16),o=h>>16&255,l=h>>8&255,c=h&255;return[o/255,l/255,c/255]};var s=nt(),n=B(s);Ks(n,()=>gr([ea,ta]),null,(a,h)=>{var o=R(()=>{var[d,f]=T(h);return{smokeMap:d,fireMap:f}}),l=R(()=>T(o).smokeMap),c=R(()=>T(o).fireMap),u=nt(),m=B(u);{let d=R(()=>90*bt);k(m,()=>C.Group,(f,p)=>{p(f,{get"rotation.x"(){return T(d)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Thruster.svelte",index:0},children:(g,v)=>{var _=ia(),M=B(_);{const x=(W,Q)=>{let K=()=>Q?.().system;Ss(W,{get system(){return K()},get active(){return t.active}})};let S=R(()=>new le({map:T(l),transparent:!0})),w=R(()=>new ft(1,3)),O=R(()=>new A(2)),P=R(()=>new ft(.2,.4)),N=R(()=>new ft(0,360*bt)),F=R(()=>new Zt(new at(1,1,1,1))),L=R(()=>new A(200)),G=R(()=>new me({radius:.05,angle:10*bt})),X=R(()=>[new fe(new Ht([[new z(...i("#493B32")),0],[new z(...e(38,38,38)),.2],[new z(1,1,1),1]],[[1,0],[0,1]])),new pe(new ce([[new Xt(1,1.1,2.1,5),0]]))]);_s(M,{get material(){return T(S)},duration:1,looping:!0,get startLife(){return T(w)},get startSpeed(){return T(O)},get startSize(){return T(P)},get startRotation(){return T(N)},get startColor(){return T(F)},worldSpace:!0,get emissionOverTime(){return T(L)},get shape(){return T(G)},uTileCount:1,vTileCount:1,get renderMode(){return b.BillBoard},rendererEmitterSettings:{followLocalOrigin:!0},get behaviors(){return T(X)},children:x,$$slots:{default:!0}})}var y=I(M,2);{const x=(W,Q)=>{let K=()=>Q?.().system;Ss(W,{get system(){return K()},get active(){return t.active}})};let S=R(()=>new le({map:T(c),transparent:!0,blending:2})),w=R(()=>new ft(.2,.4)),O=R(()=>new A(2)),P=R(()=>new ft(.2,.3)),N=R(()=>new ft(0,360*bt)),F=R(()=>new Zt(new at(...i("#FFFFFF"),1))),L=R(()=>new A(150)),G=R(()=>new me({radius:.05,angle:10*bt})),X=R(()=>[new fe(new Ht([[new z(...i("#FFFFFF")),0],[new z(...i("#FFFFFF")),1]],[[1,0],[0,1]])),new pe(new ce([[new Xt(1,1.1,1.2,3),0]]))]);_s(y,{get material(){return T(S)},duration:1,looping:!0,get startLife(){return T(w)},get startSpeed(){return T(O)},get startSize(){return T(P)},get startRotation(){return T(N)},get startColor(){return T(F)},worldSpace:!0,get emissionOverTime(){return T(L)},get shape(){return T(G)},uTileCount:1,vTileCount:1,get renderMode(){return b.BillBoard},rendererEmitterSettings:{followLocalOrigin:!0},get behaviors(){return T(X)},children:x,$$slots:{default:!0}})}U(g,_)},$$slots:{default:!0}})})}U(a,u)}),U(r,s),yt()}var ra=Y("<!> <!>",1),na=Y("<!> <!> <!> <!>",1);function aa(r,t){let e=Gt("left");const i=n=>s.find(a=>a.key===n);let s=js([]);oe("keydown",ae,n=>{const a=n.key;if(i(a)||!a.match(/^[a-z]$/)||n.ctrlKey||n.shiftKey||n.altKey||n.metaKey)return;const h={side:T(e),key:a,active:!1};s.push(h),Nt(e,T(e)==="left"?"right":"left",!0)}),oe("keyup",ae,n=>{const a=n.key,h=i(a);h&&(h.active=!0)}),wr(r,{canSleep:!1,linearDamping:.4,angularDamping:5,enabledRotations:[!1,!1,!0],type:"dynamic",children:(a,h)=>{let o=()=>h?.().rigidBody;var l=na(),c=B(l);ye(c,()=>t.children??he);var u=I(c,2),m=f=>{Pr(f,{get rigidBody(){return o()},linearMax:1e-5,angularMax:1e-5,get onstatic(){return t.onsleep}})};zs(u,f=>{t.checkIsStatic&&f(m)});var d=I(u,2);ws(d,17,()=>s,Ms,(f,p)=>{{const g=(M,y=he)=>{sa(M,{get active(){return y()}})};let v=R(()=>T(p).side==="left"?-.5:.25),_=R(()=>T(p).side==="left"?-.25:.5);Fr(f,{get rigidBody(){return o()},get key(){return T(p).key},get min(){return T(v)},get max(){return T(_)},get active(){return T(p).active},children:g,$$slots:{default:!0}})}}),ge(I(d,2),{children:(f,p)=>{var g=nt(),v=B(g);k(v,()=>C.Mesh,(_,M)=>{M(_,{castShadow:!0,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Rocket.svelte",index:0},children:(y,x)=>{var S=ra(),w=B(S);k(w,()=>C.MeshStandardMaterial,(P,N)=>{N(P,{color:"red",transparent:!0,opacity:.4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Rocket.svelte",index:1}})});var O=I(w,2);k(O,()=>C.BoxGeometry,(P,N)=>{N(P,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Rocket.svelte",index:2}})}),U(y,S)},$$slots:{default:!0}})}),U(f,g)},$$slots:{default:!0}}),U(a,l)},$$slots:{default:!0}})}var oa=Y("<!> <!>",1),ha=Y("<!> <!>",1);function la(r,t){var e=nt(),i=B(e);k(i,()=>C.Group,(s,n)=>{n(s,{get position(){return t.position},get rotation(){return t.rotation},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Start.svelte",index:0},children:(a,h)=>{var o=ha(),l=B(o);ye(l,()=>t.children),ge(I(l,2),{children:(c,u)=>{var m=nt(),d=B(m);k(d,()=>C.Mesh,(f,p)=>{p(f,{position:[0,-1.1,0],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Start.svelte",index:1},children:(g,v)=>{var _=oa(),M=B(_);k(M,()=>C.BoxGeometry,(x,S)=>{S(x,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Start.svelte",index:2}})});var y=I(M,2);k(y,()=>C.MeshStandardMaterial,(x,S)=>{S(x,{color:"red",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Start.svelte",index:3}})}),U(g,_)},$$slots:{default:!0}})}),U(c,m)},$$slots:{default:!0}}),U(a,o)},$$slots:{default:!0}})}),U(r,e)}var ca=Y("<!> <!>",1);function ua(r,t){pt(t,!1);const e=new ct;let i=!1,s=new Cs,n=new cr;$t(()=>{s.getWorldPosition(e),e.z=n.position.z,i?n.position.lerp(e,.05):(i=!0,n.position.copy(e))}),bs();var a=ca(),h=B(a);C(h,{get is(){return s},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/FollowCamera.svelte",index:0}}),Us(I(h,2),{id:"scene",children:(o,l)=>{C(o,{get is(){return n},makeDefault:!0,position:[0,0,10],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/FollowCamera.svelte",index:1}})},$$slots:{default:!0}}),U(r,a),yt()}var da=Y("<!> <!>",1),ma=Y("<!> <!> <!> <!> <!>",1);function fa(r,t){pt(t,!0);let e=Gt(!1),i=Gt(!1);ee(()=>{T(e)&&T(i)&&t.levelcomplete()});var s=ma(),n=B(s);la(n,{get position(){return t.level.start.position},get rotation(){return t.level.start.rotation},children:(c,u)=>{aa(c,{get checkIsStatic(){return T(e)},onsleep:()=>Nt(i,!0),children:d=>{ua(d,{})},$$slots:{default:!0}})},$$slots:{default:!0}});var a=I(n,2);Or(a,{get position(){return t.level.goal.position},get rotation(){return t.level.goal.rotation},ongoal:()=>{Nt(e,!0)}});var h=I(a,2);ws(h,17,()=>t.level.blocks,Ms,(c,u)=>{var m=nt(),d=B(m);k(d,()=>C.Group,(f,p)=>{p(f,{get position(){return T(u).position},get rotation(){return T(u).rotation},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:0},children:(g,v)=>{ge(g,{children:(_,M)=>{var y=nt(),x=B(y);k(x,()=>C.Mesh,(S,w)=>{w(S,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:1},children:(O,P)=>{var N=da(),F=B(N);k(F,()=>C.BoxGeometry,(G,X)=>{X(G,{args:[1,1,1],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:2}})});var L=I(F,2);k(L,()=>C.MeshStandardMaterial,(G,X)=>{X(G,{color:"blue",transparent:!0,opacity:.4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:3}})}),U(O,N)},$$slots:{default:!0}})}),U(_,y)},$$slots:{default:!0}})},$$slots:{default:!0}})}),U(c,m)});var o=I(h,2);k(o,()=>C.AmbientLight,(c,u)=>{u(c,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:4}})});var l=I(o,2);k(l,()=>C.DirectionalLight,(c,u)=>{u(c,{position:[4,10,0],castShadow:!0,"shadow.mapSize":1024,"shadow.camera.left":-10,"shadow.camera.right":10,"shadow.camera.top":10,"shadow.camera.bottom":-10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:5}})}),U(r,s),yt()}var Hs=class{type;position;rotation;constructor(r,t,e){this.type=r,this.position=t,this.rotation=e}},Zs=class{position;rotation;constructor(r,t){this.position=r,this.rotation=t}},$s=class{position;rotation;constructor(r,t){this.position=r,this.rotation=t}},Ws=class{start;goal;blocks;constructor(r,t,e){this.start=r,this.goal=t,this.blocks=e}},pa=new Ws(new Zs([0,-1,0],[0,0,0]),new $s([3,0,0],[0,0,0]),[new Hs("Box",[-3,0,0],[0,0,0])]),ya=new Ws(new Zs([0,-2,0],[0,0,0]),new $s([2,0,0],[0,0,0]),[new Hs("Box",[-2,0,0],[0,0,0])]),ga=Y("<!> <!> <!>",1);function va(r,t){pt(t,!0);const e=[pa,ya];let i=Gt(0);const s=R(()=>e[T(i)]),n=()=>{T(i)<e.length-1&&Nt(i,T(i)+1)},{scene:a}=Es();a.background=new yr("black");var h=ga(),o=B(h);_r(o,{id:"scene"});var l=I(o,2);er(l,()=>T(i),c=>{var u=nt(),m=B(u),d=f=>{fa(f,{get level(){return T(s)},levelcomplete:n})};zs(m,f=>{T(s)&&f(d)}),U(c,u)}),vr(I(l,2),{}),U(r,h),yt()}function xa(r,t){pt(t,!1),Ys(),bs(),yt()}var _a=Y("<!> <!> <!>",1),Sa=Y('<main class="svelte-1e2szb4"><!></main>');function Pa(r){var t=Sa();dr(tr(t),{children:(e,i)=>{zr(e,{gravity:[0,-1,0],framerate:120,children:(s,n)=>{var a=_a(),h=B(a);Sr(h,{});var o=I(h,2);xa(o,{}),va(I(o,2),{}),U(s,a)},$$slots:{default:!0}})},$$slots:{default:!0}}),ir(t),U(r,t)}export{Pa as default};
