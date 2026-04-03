import"./disclose-version.DsnmJJEf.js";import"./legacy.CiYaW_ib.js";import{f as R,s as F,p as yt,a as gt,aG as as,e as Ut,o as hs,d as ls,aH as cs,g as T,u as us,h as ie,bx as Le,$ as I,n as Ve,N as Ie,_ as ds,Q as ms,c as fs,r as ps}from"./runtime.BsM9HEgF.js";import{c as ut,f as q,a as B}from"./template.BGiQ9W-B.js";import{C as ys}from"./Canvas.B2gaXdQD.js";import{T as U,g as ct,Y as Fi,_ as Li,a3 as Vi,D as gi,Q as gs,bW as Ji,g6 as vs,O as Di,eN as Fe,M as Je,cs as wi,s as Et,ba as j,eF as xs,at as lt,aG as vi,w as zt,W as _s,l as Ss,fG as Ms,b as Gi,u as ws,i as Pi,a4 as zs,C as bs}from"./observe.svelte.CpLsxWCV.js";import{u as Xi,R as Ts,W as Os}from"./createCollidersFromChildren.CGluYhOW.js";import{D as Ps}from"./Debug.DYb5MSHO.js";import{i as Yi}from"./if.DEmLpFs9.js";import{k as Ns}from"./key.CL8Y6E8H.js";/* empty css                                                      */import{a as As}from"./raycast.BjdWmyxG.js";import{S as Es}from"./Stars.BvPvfS8c.js";import{a as qi,P as Cs}from"./PortalTarget.zh8Tus5F.js";import{e as $i,i as Hi}from"./each.CtD7MayK.js";import{c as D}from"./svelte-component.BIfa6ww3.js";import{A as He}from"./AutoColliders.BhgNLcEi.js";import{C as Us}from"./Collider.C71HaC7g.js";import{e as De}from"./events.ClkcKFNI.js";import{s as Ze}from"./snippet.pNoFfLl0.js";import{u as Ee}from"./useTask.svelte.BIdf647n.js";import{T as Bs}from"./Text.B1slcQ-l.js";import{i as zi}from"./lifecycle.B1F0kgQF.js";import{p as Ot,r as ks}from"./props.BdgQxxOQ.js";import{a as Rs}from"./await.7Smc-hRr.js";import{a as Is,s as Fs}from"./store.BuonI5uc.js";import{u as Ls}from"./useThrelteUserContext.BnZJeu9W.js";/* empty css                                                   */import"./index.ujCWyV9u.js";import"./create-subscriber.Cjf9iS6d.js";import"./index-client.D_TSzqy_.js";import"./useStage.GPR6E9rH.js";import"./branches.DU2v-rCt.js";import"./injectPlugin.oLpntuRh.js";import"./transitions.CSu2MFFA.js";import"./loop.BGGTUj09.js";import"./render.CLVLJyMH.js";import"./utils.NcpWCyqV.js";import"./map.WiSrq4sD.js";import"./troika-three-text.esm.8slnJyhz.js";var Vs=q("<!> <!>",1),Js=q("<!> <!>",1);function Ds(c,t){var e=ut(),i=R(e);D(i,()=>U.Group,(s,r)=>{r(s,{get position(){return t.position},get rotation(){return t.rotation},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:0},children:(n,a)=>{var o=Js(),l=R(o);D(l,()=>U.Group,(u,m)=>{m(u,{"position.y":.1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:1},children:(d,f)=>{Us(d,{shape:"cuboid",args:[.4,.5,.4],sensor:!0,get onsensorenter(){return t.ongoal}})},$$slots:{default:!0}})});var h=F(l,2);He(h,{children:(u,m)=>{var d=ut(),f=R(d);D(f,()=>U.Mesh,(p,v)=>{v(p,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:2},children:(g,b)=>{var _=Vs(),S=R(_);D(S,()=>U.BoxGeometry,(M,x)=>{x(M,{args:[1,1,1],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:3}})});var y=F(S,2);D(y,()=>U.MeshStandardMaterial,(M,x)=>{x(M,{color:"green",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Goal.svelte",index:4}})}),B(g,_)},$$slots:{default:!0}})}),B(u,d)},$$slots:{default:!0}}),B(n,o)},$$slots:{default:!0}})}),B(c,e)}function Gs(c,t){yt(t,!0);const e=Xi(),i=new ct,s=(r,n)=>(i.set(r.x,r.y,r.z),i.length()<n);Ee(()=>{s(t.rigidBody.angvel(),t.angularMax)&&s(t.rigidBody.linvel(),t.linearMax)&&t.onstatic()},{after:e.simulationTask}),gt()}var Xs=q("<!> <!>",1),Ys=q("<!> <!>",1),qs=q("<!> <!>",1),$s=q("<!> <!> <!>",1);function Hs(c,t){yt(t,!1);const e=hs();let i=Ot(t,"origin",8),s=Ot(t,"impulse",8),r=Ot(t,"length",8,void 0),n=Ot(t,"color",8,void 0),a=Ot(t,"multiplier",8,void 0),o=Ot(t,"afterTask",8);const l=new Fi,h=new ct,u=new Li,m=new Vi;Ee(()=>{const g=new ct(i().x,i().y,i().z);r()?h.set(s().x,s().y,s().z).normalize().multiplyScalar(r()):h.set(s().x,s().y,s().z),a()&&h.multiplyScalar(a());const b=g.clone().add(h),_=[];_.push(g),_.push(b),l.setFromPoints(_),!(!u||!m)&&(u.position.copy(g),m.position.copy(b),m.lookAt(g))},{after:o()??[]}),as(()=>ls(n()),()=>{Ut(e,n()??"red")}),cs(),zi();var d=$s(),f=R(d);U.Line(f,{renderOrder:1,frustumCulled:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:0},children:(g,b)=>{var _=Xs(),S=R(_);U(S,{get is(){return l},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:1}});var y=F(S,2);U.LineBasicMaterial(y,{get color(){return T(e)},depthTest:!1,depthWrite:!1,get side(){return gi},transparent:!0,opacity:1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:2}}),B(g,_)},$$slots:{default:!0}});var p=F(f,2);U(p,{get is(){return u},frustumCulled:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:3},children:(g,b)=>{var _=Ys(),S=R(_);U.SphereGeometry(S,{args:[.03],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:4}});var y=F(S,2);U.MeshBasicMaterial(y,{get color(){return T(e)},depthTest:!1,depthWrite:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:5}}),B(g,_)},$$slots:{default:!0}});var v=F(p,2);U(v,{get is(){return m},frustumCulled:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:6},children:(g,b)=>{U.Mesh(g,{"rotation.x":us(()=>-90*Math.PI/180),threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:7},children:(_,S)=>{var y=qs(),M=R(y);U.ConeGeometry(M,{args:[.03,.1],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:8}});var x=F(M,2);U.MeshBasicMaterial(x,{get color(){return T(e)},depthTest:!1,depthWrite:!1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Impulse.svelte",index:9}}),B(_,y)},$$slots:{default:!0}})},$$slots:{default:!0}}),B(c,d),gt()}const Zs=(c,t)=>Math.random()*(t-c)+c;var Ws=q("<!> <!>",1),Qs=q("<!> <!>",1);function Ks(c,t){yt(t,!0);const e=Xi();let i=ie(!1);const s=5,r=new ct(Zs(t.min,t.max),-.5,0),n=new ct,a=new ct,o=new ct,l=new gs,h=Ee(p=>{if(!t.rigidBody)return;const v=t.rigidBody.rotation();l.set(v.x,v.y,v.z,v.w);const g=t.rigidBody.translation();a.set(g.x,g.y,g.z),o.copy(r),o.applyQuaternion(l),a.add(o),n.set(0,s*p,0),n.applyQuaternion(l),T(i)&&t.active&&t.rigidBody.applyImpulseAtPoint(n,a,!0)},{before:e.simulationTask}),u=I(()=>T(i)&&t.active);var m=Qs();De("keydown",Le,p=>{p.key===t.key&&Ut(i,!0)}),De("keyup",Le,p=>{p.key===t.key&&Ut(i,!1)});var d=R(m);D(d,()=>U.Group,(p,v)=>{v(p,{"position.y":-.5,get"position.x"(){return r.x},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Player.svelte",index:0},children:(g,b)=>{var _=Ws(),S=R(_);Bs(S,{"position.y":-.1,get text(){return t.key},renderOrder:1e3});var y=F(S,2);Ze(y,()=>t.children??Ve,()=>T(u)),B(g,_)},$$slots:{default:!0}})});var f=F(d,2);qi(f,{id:"scene",children:(p,v)=>{{let g=I(()=>T(i)&&t.active?10:1);Hs(p,{get origin(){return a},get impulse(){return n},get afterTask(){return h.task},get multiplier(){return T(g)}})}},$$slots:{default:!0}}),B(c,m),gt()}const Z=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ni=1234567;const Ct=Math.PI/180,Zi=180/Math.PI;function js(){const c=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Z[c&255]+Z[c>>8&255]+Z[c>>16&255]+Z[c>>24&255]+"-"+Z[t&255]+Z[t>>8&255]+"-"+Z[t>>16&15|64]+Z[t>>24&255]+"-"+Z[e&63|128]+Z[e>>8&255]+"-"+Z[e>>16&255]+Z[e>>24&255]+Z[i&255]+Z[i>>8&255]+Z[i>>16&255]+Z[i>>24&255]).toLowerCase()}function ft(c,t,e){return Math.max(t,Math.min(e,c))}function Wi(c,t){return(c%t+t)%t}function tr(c,t,e,i,s){return i+(c-t)*(s-i)/(e-t)}function er(c,t,e){return c!==t?(e-c)/(t-c):0}function Qi(c,t,e){return(1-e)*c+e*t}function ir(c,t,e,i){return Qi(c,t,1-Math.exp(-e*i))}function sr(c,t=1){return t-Math.abs(Wi(c,t*2)-t)}function rr(c,t,e){return c<=t?0:c>=e?1:(c=(c-t)/(e-t),c*c*(3-2*c))}function nr(c,t,e){return c<=t?0:c>=e?1:(c=(c-t)/(e-t),c*c*c*(c*(c*6-15)+10))}function or(c,t){return c+Math.floor(Math.random()*(t-c+1))}function ar(c,t){return c+Math.random()*(t-c)}function hr(c){return c*(.5-Math.random())}function lr(c){c!==void 0&&(Ni=c);let t=Ni+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function cr(c){return c*Ct}function ur(c){return c*Zi}function dr(c){return(c&c-1)===0&&c!==0}function mr(c){return Math.pow(2,Math.ceil(Math.log(c)/Math.LN2))}function fr(c){return Math.pow(2,Math.floor(Math.log(c)/Math.LN2))}function pr(c,t,e,i,s){const r=Math.cos,n=Math.sin,a=r(e/2),o=n(e/2),l=r((t+i)/2),h=n((t+i)/2),u=r((t-i)/2),m=n((t-i)/2),d=r((i-t)/2),f=n((i-t)/2);switch(s){case"XYX":c.set(a*h,o*u,o*m,a*l);break;case"YZY":c.set(o*m,a*h,o*u,a*l);break;case"ZXZ":c.set(o*u,o*m,a*h,a*l);break;case"XZX":c.set(a*h,o*f,o*d,a*l);break;case"YXY":c.set(o*d,a*h,o*f,a*l);break;case"ZYZ":c.set(o*f,o*d,a*h,a*l);break;default:console.warn("../math.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function yr(c,t){switch(t.constructor){case Float32Array:return c;case Uint32Array:return c/4294967295;case Uint16Array:return c/65535;case Uint8Array:return c/255;case Int32Array:return Math.max(c/2147483647,-1);case Int16Array:return Math.max(c/32767,-1);case Int8Array:return Math.max(c/127,-1);default:throw new Error("Invalid component type.")}}function gr(c,t){switch(t.constructor){case Float32Array:return c;case Uint32Array:return Math.round(c*4294967295);case Uint16Array:return Math.round(c*65535);case Uint8Array:return Math.round(c*255);case Int32Array:return Math.round(c*2147483647);case Int16Array:return Math.round(c*32767);case Int8Array:return Math.round(c*127);default:throw new Error("Invalid component type.")}}const Yt={DEG2RAD:Ct,RAD2DEG:Zi,generateUUID:js,clamp:ft,euclideanModulo:Wi,mapLinear:tr,inverseLerp:er,lerp:Qi,damp:ir,pingpong:sr,smoothstep:rr,smootherstep:nr,randInt:or,randFloat:ar,randFloatSpread:hr,seededRandom:lr,degToRad:cr,radToDeg:ur,isPowerOfTwo:dr,ceilPowerOfTwo:mr,floorPowerOfTwo:fr,setQuaternionFromProperEuler:pr,normalize:gr,denormalize:yr};class L{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,n,a){let o=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3];const m=r[n+0],d=r[n+1],f=r[n+2],p=r[n+3];if(a===0){t[e+0]=o,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=m,t[e+1]=d,t[e+2]=f,t[e+3]=p;return}if(u!==p||o!==m||l!==d||h!==f){let v=1-a;const g=o*m+l*d+h*f+u*p,b=g>=0?1:-1,_=1-g*g;if(_>Number.EPSILON){const y=Math.sqrt(_),M=Math.atan2(y,g*b);v=Math.sin(v*M)/y,a=Math.sin(a*M)/y}const S=a*b;if(o=o*v+m*S,l=l*v+d*S,h=h*v+f*S,u=u*v+p*S,v===1-a){const y=1/Math.sqrt(o*o+l*l+h*h+u*u);o*=y,l*=y,h*=y,u*=y}}t[e]=o,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,n){const a=i[s],o=i[s+1],l=i[s+2],h=i[s+3],u=r[n],m=r[n+1],d=r[n+2],f=r[n+3];return t[e]=a*f+h*u+o*d-l*m,t[e+1]=o*f+h*m+l*u-a*d,t[e+2]=l*f+h*d+a*m-o*u,t[e+3]=h*f-a*u-o*m-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new L(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,n=t._order,a=Math.cos,o=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),m=o(i/2),d=o(s/2),f=o(r/2);switch(n){case"XYZ":this._x=m*h*u+l*d*f,this._y=l*d*u-m*h*f,this._z=l*h*f+m*d*u,this._w=l*h*u-m*d*f;break;case"YXZ":this._x=m*h*u+l*d*f,this._y=l*d*u-m*h*f,this._z=l*h*f-m*d*u,this._w=l*h*u+m*d*f;break;case"ZXY":this._x=m*h*u-l*d*f,this._y=l*d*u+m*h*f,this._z=l*h*f+m*d*u,this._w=l*h*u-m*d*f;break;case"ZYX":this._x=m*h*u-l*d*f,this._y=l*d*u+m*h*f,this._z=l*h*f-m*d*u,this._w=l*h*u+m*d*f;break;case"YZX":this._x=m*h*u+l*d*f,this._y=l*d*u+m*h*f,this._z=l*h*f-m*d*u,this._w=l*h*u-m*d*f;break;case"XZY":this._x=m*h*u-l*d*f,this._y=l*d*u-m*h*f,this._z=l*h*f+m*d*u,this._w=l*h*u+m*d*f;break;default:console.warn("../math.Quaternion: .setFromEuler() encountered an unknown order: "+n)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],n=e[1],a=e[5],o=e[9],l=e[2],h=e[6],u=e[10],m=i+a+u;if(m>0){const d=.5/Math.sqrt(m+1);this._w=.25/d,this._x=(h-o)*d,this._y=(r-l)*d,this._z=(n-s)*d}else if(i>a&&i>u){const d=2*Math.sqrt(1+i-a-u);this._w=(h-o)/d,this._x=.25*d,this._y=(s+n)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-i-u);this._w=(r-l)/d,this._x=(s+n)/d,this._y=.25*d,this._z=(o+h)/d}else{const d=2*Math.sqrt(1+u-i-a);this._w=(n-s)/d,this._x=(r+l)/d,this._y=(o+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ft(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,n=t._w,a=e._x,o=e._y,l=e._z,h=e._w;return this._x=i*h+n*a+s*l-r*o,this._y=s*h+n*o+r*a-i*l,this._z=r*h+n*l+i*o-s*a,this._w=n*h-i*a-s*o-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,n=this._w;let a=n*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=n,this._x=i,this._y=s,this._z=r,this;const o=1-a*a;if(o<=Number.EPSILON){const d=1-e;return this._w=d*n+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(o),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,m=Math.sin(e*h)/l;return this._w=n*u+this._w*m,this._x=i*u+this._x*m,this._y=s*u+this._y*m,this._z=r*u+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(t=0,e=0,i=0){this.isVector3=!0,z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new z(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ai.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ai.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,n=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*n,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*n,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*n,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,n=t.y,a=t.z,o=t.w,l=2*(n*s-a*i),h=2*(a*e-r*s),u=2*(r*i-n*e);return this.x=e+o*l+n*u-a*h,this.y=i+o*h+a*l-r*u,this.z=s+o*u+r*h-n*l,this}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,n=e.x,a=e.y,o=e.z;return this.x=s*o-r*a,this.y=r*n-i*o,this.z=i*a-s*n,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return li.copy(this).projectOnVector(t),this.sub(li)}reflect(t){return this.sub(li.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ft(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}abs(){return this.x=Math.abs(this.x),this.y=Math.abs(this.y),this.z=Math.abs(this.z),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const li=new z,Ai=new L,Ue=2e3,Ei=2001;class Jt{constructor(t,e,i,s,r,n,a,o,l,h,u,m,d,f,p,v){this.isMatrix4=!0,Jt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,n,a,o,l,h,u,m,d,f,p,v)}extractPosition(t){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(t)}multiplyToArray(t,e,i){return console.error("THREE.Matrix4: .multiplyToArray() has been removed."),this}setRotationFromQuaternion(t){return this.makeRotationFromQuaternion(t)}set(t,e,i,s,r,n,a,o,l,h,u,m,d,f,p,v){const g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=s,g[1]=r,g[5]=n,g[9]=a,g[13]=o,g[2]=l,g[6]=h,g[10]=u,g[14]=m,g[3]=d,g[7]=f,g[11]=p,g[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Jt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Lt.setFromMatrixColumn(t,0).length(),r=1/Lt.setFromMatrixColumn(t,1).length(),n=1/Lt.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*n,e[9]=i[9]*n,e[10]=i[10]*n,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,n=Math.cos(i),a=Math.sin(i),o=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const m=n*h,d=n*u,f=a*h,p=a*u;e[0]=o*h,e[4]=-o*u,e[8]=l,e[1]=d+f*l,e[5]=m-p*l,e[9]=-a*o,e[2]=p-m*l,e[6]=f+d*l,e[10]=n*o}else if(t.order==="YXZ"){const m=o*h,d=o*u,f=l*h,p=l*u;e[0]=m+p*a,e[4]=f*a-d,e[8]=n*l,e[1]=n*u,e[5]=n*h,e[9]=-a,e[2]=d*a-f,e[6]=p+m*a,e[10]=n*o}else if(t.order==="ZXY"){const m=o*h,d=o*u,f=l*h,p=l*u;e[0]=m-p*a,e[4]=-n*u,e[8]=f+d*a,e[1]=d+f*a,e[5]=n*h,e[9]=p-m*a,e[2]=-n*l,e[6]=a,e[10]=n*o}else if(t.order==="ZYX"){const m=n*h,d=n*u,f=a*h,p=a*u;e[0]=o*h,e[4]=f*l-d,e[8]=m*l+p,e[1]=o*u,e[5]=p*l+m,e[9]=d*l-f,e[2]=-l,e[6]=a*o,e[10]=n*o}else if(t.order==="YZX"){const m=n*o,d=n*l,f=a*o,p=a*l;e[0]=o*h,e[4]=p-m*u,e[8]=f*u+d,e[1]=u,e[5]=n*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+f,e[10]=m-p*u}else if(t.order==="XZY"){const m=n*o,d=n*l,f=a*o,p=a*l;e[0]=o*h,e[4]=-u,e[8]=l*h,e[1]=m*u+p,e[5]=n*h,e[9]=d*u-f,e[2]=f*u-d,e[6]=a*h,e[10]=p*u+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vr,t,xr)}lookAt(t,e,i){const s=this.elements;return it.subVectors(t,e),it.lengthSq()===0&&(it.z=1),it.normalize(),bt.crossVectors(i,it),bt.lengthSq()===0&&(Math.abs(i.z)===1?it.x+=1e-4:it.z+=1e-4,it.normalize(),bt.crossVectors(i,it)),bt.normalize(),Be.crossVectors(it,bt),s[0]=bt.x,s[4]=Be.x,s[8]=it.x,s[1]=bt.y,s[5]=Be.y,s[9]=it.y,s[2]=bt.z,s[6]=Be.z,s[10]=it.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,n=i[0],a=i[4],o=i[8],l=i[12],h=i[1],u=i[5],m=i[9],d=i[13],f=i[2],p=i[6],v=i[10],g=i[14],b=i[3],_=i[7],S=i[11],y=i[15],M=s[0],x=s[4],O=s[8],A=s[12],P=s[1],N=s[5],k=s[9],G=s[13],X=s[2],W=s[6],Q=s[10],K=s[14],ot=s[3],at=s[7],rt=s[11],nt=s[15];return r[0]=n*M+a*P+o*X+l*ot,r[4]=n*x+a*N+o*W+l*at,r[8]=n*O+a*k+o*Q+l*rt,r[12]=n*A+a*G+o*K+l*nt,r[1]=h*M+u*P+m*X+d*ot,r[5]=h*x+u*N+m*W+d*at,r[9]=h*O+u*k+m*Q+d*rt,r[13]=h*A+u*G+m*K+d*nt,r[2]=f*M+p*P+v*X+g*ot,r[6]=f*x+p*N+v*W+g*at,r[10]=f*O+p*k+v*Q+g*rt,r[14]=f*A+p*G+v*K+g*nt,r[3]=b*M+_*P+S*X+y*ot,r[7]=b*x+_*N+S*W+y*at,r[11]=b*O+_*k+S*Q+y*rt,r[15]=b*A+_*G+S*K+y*nt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],n=t[1],a=t[5],o=t[9],l=t[13],h=t[2],u=t[6],m=t[10],d=t[14],f=t[3],p=t[7],v=t[11],g=t[15];return f*(+r*o*u-s*l*u-r*a*m+i*l*m+s*a*d-i*o*d)+p*(+e*o*d-e*l*m+r*n*m-s*n*d+s*l*h-r*o*h)+v*(+e*l*u-e*a*d-r*n*u+i*n*d+r*a*h-i*l*h)+g*(-s*a*h-e*o*u+e*a*m+s*n*u-i*n*m+i*o*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],n=t[4],a=t[5],o=t[6],l=t[7],h=t[8],u=t[9],m=t[10],d=t[11],f=t[12],p=t[13],v=t[14],g=t[15],b=u*v*l-p*m*l+p*o*d-a*v*d-u*o*g+a*m*g,_=f*m*l-h*v*l-f*o*d+n*v*d+h*o*g-n*m*g,S=h*p*l-f*u*l+f*a*d-n*p*d-h*a*g+n*u*g,y=f*u*o-h*p*o-f*a*m+n*p*m+h*a*v-n*u*v,M=e*b+i*_+s*S+r*y;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const x=1/M;return t[0]=b*x,t[1]=(p*m*r-u*v*r-p*s*d+i*v*d+u*s*g-i*m*g)*x,t[2]=(a*v*r-p*o*r+p*s*l-i*v*l-a*s*g+i*o*g)*x,t[3]=(u*o*r-a*m*r-u*s*l+i*m*l+a*s*d-i*o*d)*x,t[4]=_*x,t[5]=(h*v*r-f*m*r+f*s*d-e*v*d-h*s*g+e*m*g)*x,t[6]=(f*o*r-n*v*r-f*s*l+e*v*l+n*s*g-e*o*g)*x,t[7]=(n*m*r-h*o*r+h*s*l-e*m*l-n*s*d+e*o*d)*x,t[8]=S*x,t[9]=(f*u*r-h*p*r-f*i*d+e*p*d+h*i*g-e*u*g)*x,t[10]=(n*p*r-f*a*r+f*i*l-e*p*l-n*i*g+e*a*g)*x,t[11]=(h*a*r-n*u*r-h*i*l+e*u*l+n*i*d-e*a*d)*x,t[12]=y*x,t[13]=(h*p*s-f*u*s+f*i*m-e*p*m-h*i*v+e*u*v)*x,t[14]=(f*a*s-n*p*s-f*i*o+e*p*o+n*i*v-e*a*v)*x,t[15]=(n*u*s-h*a*s+h*i*o-e*u*o-n*i*m+e*a*m)*x,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,n=t.x,a=t.y,o=t.z,l=r*n,h=r*a;return this.set(l*n+i,l*a-s*o,l*o+s*a,0,l*a+s*o,h*a+i,h*o-s*n,0,l*o-s*a,h*o+s*n,r*o*o+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,n){return this.set(1,i,r,0,t,1,n,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,n=e._y,a=e._z,o=e._w,l=r+r,h=n+n,u=a+a,m=r*l,d=r*h,f=r*u,p=n*h,v=n*u,g=a*u,b=o*l,_=o*h,S=o*u,y=i.x,M=i.y,x=i.z;return s[0]=(1-(p+g))*y,s[1]=(d+S)*y,s[2]=(f-_)*y,s[3]=0,s[4]=(d-S)*M,s[5]=(1-(m+g))*M,s[6]=(v+b)*M,s[7]=0,s[8]=(f+_)*x,s[9]=(v-b)*x,s[10]=(1-(m+p))*x,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Lt.set(s[0],s[1],s[2]).length();const n=Lt.set(s[4],s[5],s[6]).length(),a=Lt.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ht.copy(this);const l=1/r,h=1/n,u=1/a;return ht.elements[0]*=l,ht.elements[1]*=l,ht.elements[2]*=l,ht.elements[4]*=h,ht.elements[5]*=h,ht.elements[6]*=h,ht.elements[8]*=u,ht.elements[9]*=u,ht.elements[10]*=u,e.setFromRotationMatrix(ht),i.x=r,i.y=n,i.z=a,this}makePerspective(t,e,i,s,r,n,a=Ue){const o=this.elements,l=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),m=(i+s)/(i-s);let d,f;if(a===Ue)d=-(n+r)/(n-r),f=-2*n*r/(n-r);else if(a===Ei)d=-n/(n-r),f=-n*r/(n-r);else throw new Error("Matrix4.makePerspective(): Invalid coordinate system: "+a);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=h,o[9]=m,o[13]=0,o[2]=0,o[6]=0,o[10]=d,o[14]=f,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,i,s,r,n,a=Ue){const o=this.elements,l=1/(e-t),h=1/(i-s),u=1/(n-r),m=(e+t)*l,d=(i+s)*h;let f,p;if(a===Ue)f=(n+r)*u,p=-2*u;else if(a===Ei)f=r*u,p=-1*u;else throw new Error("../math.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-m,o[1]=0,o[5]=2*h,o[9]=0,o[13]=-d,o[2]=0,o[6]=0,o[10]=p,o[14]=-f,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Lt=new z,ht=new Jt,vr=new z(0,0,0),xr=new z(1,1,1),bt=new z,Be=new z,it=new z,Ci=new Jt,Ui=new L;class se{constructor(t=0,e=0,i=0,s=se.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new se(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],n=s[4],a=s[8],o=s[1],l=s[5],h=s[9],u=s[2],m=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-n,r)):(this._x=Math.atan2(m,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ft(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-n,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-ft(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(m,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-n,l));break;case"YZX":this._z=Math.asin(ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ft(n,-1,1)),Math.abs(n)<.9999999?(this._x=Math.atan2(m,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("../math.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Ci.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ci,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ui.setFromEuler(this),this.setFromQuaternion(Ui,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(t){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}se.DEFAULT_ORDER="XYZ";class Dt{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new Dt(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ft(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,n=this.y-t.y;return this.x=r*i-n*s+t.x,this.y=r*s+n*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}Dt.isVector2=!0;class et{constructor(t=0,e=0,i=0,s=1){et.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new et(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,n=t.elements;return this.x=n[0]*e+n[4]*i+n[8]*s+n[12]*r,this.y=n[1]*e+n[5]*i+n[9]*s+n[13]*r,this.z=n[2]*e+n[6]*i+n[10]*s+n[14]*r,this.w=n[3]*e+n[7]*i+n[11]*s+n[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const o=t.elements,l=o[0],h=o[4],u=o[8],m=o[1],d=o[5],f=o[9],p=o[2],v=o[6],g=o[10];if(Math.abs(h-m)<.01&&Math.abs(u-p)<.01&&Math.abs(f-v)<.01){if(Math.abs(h+m)<.1&&Math.abs(u+p)<.1&&Math.abs(f+v)<.1&&Math.abs(l+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(l+1)/2,S=(d+1)/2,y=(g+1)/2,M=(h+m)/4,x=(u+p)/4,O=(f+v)/4;return _>S&&_>y?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=M/i,r=x/i):S>y?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=M/s,r=O/s):y<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),i=x/r,s=O/r),this.set(i,s,r,e),this}let b=Math.sqrt((v-f)*(v-f)+(u-p)*(u-p)+(m-h)*(m-h));return Math.abs(b)<.001&&(b=1),this.x=(v-f)/b,this.y=(u-p)/b,this.z=(m-h)/b,this.w=Math.acos((l+d+g-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pt{constructor(t,e,i,s,r,n,a,o,l){pt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,n,a,o,l)}set(t,e,i,s,r,n,a,o,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=o,h[6]=i,h[7]=n,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,n=i[0],a=i[3],o=i[6],l=i[1],h=i[4],u=i[7],m=i[2],d=i[5],f=i[8],p=s[0],v=s[3],g=s[6],b=s[1],_=s[4],S=s[7],y=s[2],M=s[5],x=s[8];return r[0]=n*p+a*b+o*y,r[3]=n*v+a*_+o*M,r[6]=n*g+a*S+o*x,r[1]=l*p+h*b+u*y,r[4]=l*v+h*_+u*M,r[7]=l*g+h*S+u*x,r[2]=m*p+d*b+f*y,r[5]=m*v+d*_+f*M,r[8]=m*g+d*S+f*x,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],n=t[4],a=t[5],o=t[6],l=t[7],h=t[8];return e*n*h-e*a*l-i*r*h+i*a*o+s*r*l-s*n*o}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],n=t[4],a=t[5],o=t[6],l=t[7],h=t[8],u=h*n-a*l,m=a*o-h*r,d=l*r-n*o,f=e*u+i*m+s*d;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/f;return t[0]=u*p,t[1]=(s*l-h*i)*p,t[2]=(a*i-s*n)*p,t[3]=m*p,t[4]=(h*e-s*o)*p,t[5]=(s*r-a*e)*p,t[6]=d*p,t[7]=(i*o-l*e)*p,t[8]=(n*e-i*r)*p,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,n,a){const o=Math.cos(r),l=Math.sin(r);return this.set(i*o,i*l,-i*(o*n+l*a)+n+t,-s*l,s*o,-s*(-l*n+o*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ci.makeScale(t,e)),this}rotate(t){return this.premultiply(ci.makeRotation(-t)),this}translate(t,e){return this.premultiply(ci.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new pt().fromArray(this.elements)}}const ci=new pt;var tt;(function(c){c[c.Random=0]="Random",c[c.Loop=1]="Loop",c[c.PingPong=2]="PingPong",c[c.Burst=3]="Burst"})(tt||(tt={}));function Ce(c,t,e,i){let s;switch(tt.Random===c?t=Math.random():tt.Burst===c&&i.isBursting&&(t=i.burstParticleIndex/i.burstParticleCount),e>0?s=Math.floor(t/e)*e:s=t,c){case tt.Loop:s=s%1;break;case tt.PingPong:s=Math.abs(s%2-1);break}return s}class _t{constructor(t,e,i,s){this.p=[t,e,i,s]}genValue(t){const e=t*t,i=t*t*t,s=1-t,r=s*s,n=r*s;return this.p[0]*n+this.p[1]*r*t*3+this.p[2]*s*e*3+this.p[3]*i}derivativeCoefficients(t){const e=[];for(let i=t,s=i.length-1;s>0;s--){const r=[];for(let n=0;n<s;n++){const a=s*(i[n+1]-i[n]);r.push(a)}e.push(r),i=r}return e}getSlope(t){const e=this.derivativeCoefficients(this.p)[0],i=1-t,s=i*i,r=i*t*2,n=t*t;return s*e[0]+r*e[1]+n*e[2]}controlCurve(t,e){this.p[1]=t/3+this.p[0],this.p[2]=this.p[3]-e/3}hull(t){let e=this.p,i=[],s,r=0,n=0,a=0;const o=[];for(o[r++]=e[0],o[r++]=e[1],o[r++]=e[2],o[r++]=e[3];e.length>1;){for(i=[],n=0,a=e.length-1;n<a;n++)s=t*e[n]+(1-t)*e[n+1],o[r++]=s,i.push(s);e=i}return o}split(t){const e=this.hull(t);return{left:new _t(e[0],e[4],e[7],e[9]),right:new _t(e[9],e[8],e[6],e[3]),span:e}}clone(){return new _t(this.p[0],this.p[1],this.p[2],this.p[3])}toJSON(){return{p0:this.p[0],p1:this.p[1],p2:this.p[2],p3:this.p[3]}}static fromJSON(t){return new _t(t.p0,t.p1,t.p2,t.p3)}}const re=c=>({r:c.x,g:c.y,b:c.z,a:c.w}),ne=c=>new et(c.r,c.g,c.b,c.a),_r=(c,t)=>{switch(t){case"Vector3":return new z(c.x,c.y,c.z);case"Vector4":return new et(c.x,c.y,c.z,c.w);case"Color":return new z(c.r,c.g,c.b);case"Number":return c;default:return c}},Sr=(c,t)=>{switch(t){case"Vector3":return{x:c.x,y:c.y,z:c.z};case"Vector4":return{x:c.x,y:c.y,z:c.z,w:c.w};case"Color":return{r:c.x,g:c.y,b:c.z};case"Number":return c;default:return c}};class Ge{constructor(t,e){this.a=t,this.b=e,this.type="value"}startGen(t){}genColor(t,e){const i=Math.random();return e.copy(this.a).lerp(this.b,i)}toJSON(){return{type:"RandomColor",a:re(this.a),b:re(this.b)}}static fromJSON(t){return new Ge(ne(t.a),ne(t.b))}clone(){return new Ge(this.a.clone(),this.b.clone())}}class Gt{constructor(t,e){this.a=t,this.b=e,this.indexCount=-1,this.type="value"}startGen(t){this.indexCount=t.length,t.push(Math.random())}genColor(t,e){return this.indexCount===-1&&this.startGen(t),e.copy(this.a).lerp(this.b,t[this.indexCount])}toJSON(){return{type:"ColorRange",a:re(this.a),b:re(this.b)}}static fromJSON(t){return new Gt(ne(t.a),ne(t.b))}clone(){return new Gt(this.a.clone(),this.b.clone())}}class Pt{constructor(t,e){this.subType=e,this.type="function",this.keys=t}findKey(t){let e=0,i=0,s=this.keys.length-1;for(;i+1<s;)if(e=Math.floor((i+s)/2),t<this.getStartX(e))s=e-1;else if(t>this.getEndX(e))i=e+1;else return e;for(let r=i;r<=s;r++)if(t>=this.getStartX(r)&&t<=this.getEndX(r))return r;return-1}getStartX(t){return this.keys[t][1]}getEndX(t){return t+1<this.keys.length?this.keys[t+1][1]:1}genValue(t,e){const i=this.findKey(e);return this.subType==="Number"?i===-1?this.keys[0][0]:i+1>=this.keys.length?this.keys[this.keys.length-1][0]:(this.keys[i+1][0]-this.keys[i][0])*((e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))+this.keys[i][0]:i===-1?t.copy(this.keys[0][0]):i+1>=this.keys.length?t.copy(this.keys[this.keys.length-1][0]):t.copy(this.keys[i][0]).lerp(this.keys[i+1][0],(e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))}toJSON(){return this.keys[0][0].constructor.name,{type:"CLinearFunction",subType:this.subType,keys:this.keys.map(([t,e])=>({value:Sr(t,this.subType),pos:e}))}}static fromJSON(t){return new Pt(t.keys.map(e=>[_r(e.value,t.subType),e.pos]),t.subType)}clone(){return this.subType==="Number"?new Pt(this.keys.map(([t,e])=>[t,e]),this.subType):new Pt(this.keys.map(([t,e])=>[t.clone(),e]),this.subType)}}const ke=new z;class St{constructor(t=[[new z(0,0,0),0],[new z(1,1,1),0]],e=[[1,0],[1,1]]){this.type="function",this.color=new Pt(t,"Color"),this.alpha=new Pt(e,"Number")}genColor(t,e,i){return this.color.genValue(ke,i),e.set(ke.x,ke.y,ke.z,this.alpha.genValue(1,i))}toJSON(){return{type:"Gradient",color:this.color.toJSON(),alpha:this.alpha.toJSON()}}static fromJSON(t){if(t.functions){const e=t.functions.map(i=>[Gt.fromJSON(i.function).a,i.start]);return t.functions.length>0&&e.push([Gt.fromJSON(t.functions[t.functions.length-1].function).b,1]),new St(e.map(i=>[new z(i[0].x,i[0].y,i[0].z),i[1]]),e.map(i=>[i[0].w,i[1]]))}else{const e=new St;return e.alpha=Pt.fromJSON(t.alpha),e.color=Pt.fromJSON(t.color),e}}clone(){const t=new St;return t.alpha=this.alpha.clone(),t.color=this.color.clone(),t}startGen(t){}}const ui=new et;class Xe{constructor(t,e){this.indexCount=0,this.type="function",this.gradient1=t,this.gradient2=e}startGen(t){this.indexCount=t.length,t.push(Math.random())}genColor(t,e,i){return this.gradient1.genColor(t,e,i),this.gradient2.genColor(t,ui,i),t&&t[this.indexCount]!==void 0?e.lerp(ui,t[this.indexCount]):e.lerp(ui,Math.random()),e}toJSON(){return{type:"RandomColorBetweenGradient",gradient1:this.gradient1.toJSON(),gradient2:this.gradient2.toJSON()}}static fromJSON(t){return new Xe(St.fromJSON(t.gradient1),St.fromJSON(t.gradient2))}clone(){return new Xe(this.gradient1.clone(),this.gradient2.clone())}}class Nt{constructor(t){this.color=t,this.type="value"}startGen(t){}genColor(t,e){return e.copy(this.color)}toJSON(){return{type:"ConstantColor",color:re(this.color)}}static fromJSON(t){return new Nt(ne(t.color))}clone(){return new Nt(this.color.clone())}}function bi(c){switch(c.type){case"ConstantColor":return Nt.fromJSON(c);case"ColorRange":return Gt.fromJSON(c);case"RandomColor":return Ge.fromJSON(c);case"Gradient":return St.fromJSON(c);case"RandomColorBetweenGradient":return Xe.fromJSON(c);default:return new Nt(new et(1,1,1,1))}}class C{constructor(t){this.value=t,this.type="value"}startGen(t){}genValue(t){return this.value}toJSON(){return{type:"ConstantValue",value:this.value}}static fromJSON(t){return new C(t.value)}clone(){return new C(this.value)}}class st{constructor(t,e){this.a=t,this.b=e,this.indexCount=-1,this.type="value"}startGen(t){this.indexCount=t.length,t.push(Math.random())}genValue(t){return this.indexCount===-1&&this.startGen(t),Yt.lerp(this.a,this.b,t[this.indexCount])}toJSON(){return{type:"IntervalValue",a:this.a,b:this.b}}static fromJSON(t){return new st(t.a,t.b)}clone(){return new st(this.a,this.b)}}class Mr{constructor(){this.functions=new Array}findFunction(t){let e=0,i=0,s=this.functions.length-1;for(;i+1<s;)if(e=Math.floor((i+s)/2),t<this.getStartX(e))s=e-1;else if(t>this.getEndX(e))i=e+1;else return e;for(let r=i;r<=s;r++)if(t>=this.functions[r][1]&&t<=this.getEndX(r))return r;return-1}getStartX(t){return this.functions[t][1]}setStartX(t,e){t>0&&(this.functions[t][1]=e)}getEndX(t){return t+1<this.functions.length?this.functions[t+1][1]:1}setEndX(t,e){t+1<this.functions.length&&(this.functions[t+1][1]=e)}insertFunction(t,e){const i=this.findFunction(t);this.functions.splice(i+1,0,[e,t])}removeFunction(t){return this.functions.splice(t,1)[0][0]}getFunction(t){return this.functions[t][0]}setFunction(t,e){this.functions[t][0]=e}get numOfFunctions(){return this.functions.length}}class Bt extends Mr{constructor(t=[[new _t(0,1/3,1/3*2,1),0]]){super(),this.type="function",this.functions=t}genValue(t,e=0){const i=this.findFunction(e);return i===-1?0:this.functions[i][0].genValue((e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))}toSVG(t,e){if(e<1)return"";let i=["M",0,this.functions[0][0].p[0]].join(" ");for(let s=1/e;s<=1;s+=1/e)i=[i,"L",s*t,this.genValue(void 0,s)].join(" ");return i}toJSON(){return{type:"PiecewiseBezier",functions:this.functions.map(([t,e])=>({function:t.toJSON(),start:e}))}}static fromJSON(t){return new Bt(t.functions.map(e=>[_t.fromJSON(e.function),e.start]))}clone(){return new Bt(this.functions.map(([t,e])=>[t.clone(),e]))}startGen(t){}}function E(c){switch(c.type){case"ConstantValue":return C.fromJSON(c);case"IntervalValue":return st.fromJSON(c);case"PiecewiseBezier":return Bt.fromJSON(c);default:return new C(0)}}class oe{constructor(){this.indexCount=0,this.type="rotation"}startGen(t){this.indexCount=t.length,t.push(new L);let e,i,s,r,n,a;do e=Math.random()*2-1,i=Math.random()*2-1,s=e*e+i*i;while(s>1);do r=Math.random()*2-1,n=Math.random()*2-1,a=r*r+n*n;while(a>1);const o=Math.sqrt((1-s)/a);t[this.indexCount].set(e,i,o*r,o*n)}genValue(t,e,i,s){return this.indexCount===-1&&this.startGen(t),e.copy(t[this.indexCount]),e}toJSON(){return{type:"RandomQuat"}}static fromJSON(t){return new oe}clone(){return new oe}}class ae{constructor(t,e){this.axis=t,this.angle=e,this.type="rotation"}startGen(t){this.angle.startGen(t)}genValue(t,e,i,s){return e.setFromAxisAngle(this.axis,this.angle.genValue(t,s)*i)}toJSON(){return{type:"AxisAngle",axis:{x:this.axis.x,y:this.axis.y,z:this.axis.z},angle:this.angle.toJSON()}}static fromJSON(t){return new ae(new z(t.axis.x,t.axis.y,t.axis.z),E(t.angle))}clone(){return new ae(this.axis.clone(),this.angle.clone())}}class Ye{constructor(t,e,i,s){this.angleX=t,this.angleY=e,this.angleZ=i,this.type="rotation",this.eular=new se(0,0,0,s)}startGen(t){this.angleX.startGen(t),this.angleY.startGen(t),this.angleZ.startGen(t)}genValue(t,e,i,s){return this.eular.set(this.angleX.genValue(t,s)*i,this.angleY.genValue(t,s)*i,this.angleZ.genValue(t,s)*i),e.setFromEuler(this.eular)}toJSON(){return{type:"Euler",angleX:this.angleX.toJSON(),angleY:this.angleY.toJSON(),angleZ:this.angleZ.toJSON(),eulerOrder:this.eular.order}}static fromJSON(t){return new Ye(E(t.angleX),E(t.angleY),E(t.angleZ),t.eulerOrder)}clone(){return new Ye(this.angleX,this.angleY,this.angleZ,this.eular.order)}}function Ki(c){switch(c.type){case"AxisAngle":return ae.fromJSON(c);case"Euler":return Ye.fromJSON(c);case"RandomQuat":return oe.fromJSON(c);default:return new oe}}class kt{constructor(t,e,i){this.x=t,this.y=e,this.z=i,this.type="vec3function"}startGen(t){this.x.startGen(t),this.y.startGen(t),this.z.startGen(t)}genValue(t,e,i){return e.set(this.x.genValue(t,i),this.y.genValue(t,i),this.z.genValue(t,i))}toJSON(){return{type:"Vector3Function",x:this.x.toJSON(),y:this.y.toJSON(),z:this.z.toJSON()}}static fromJSON(t){return new kt(E(t.x),E(t.y),E(t.z))}clone(){return new kt(this.x,this.y,this.z)}}function wr(c){switch(c.type){case"Vector3Function":return kt.fromJSON(c);default:return new kt(new C(0),new C(0),new C(0))}}function qe(c){switch(c.type){case"ConstantValue":case"IntervalValue":case"PiecewiseBezier":return E(c);case"AxisAngle":case"RandomQuat":case"Euler":return Ki(c);case"Vector3Function":return wr(c);default:return new C(0)}}class Rt{constructor(t={}){var e,i,s,r,n,a,o;this.type="cone",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.angle=(r=t.angle)!==null&&r!==void 0?r:Math.PI/6,this.mode=(n=t.mode)!==null&&n!==void 0?n:tt.Random,this.spread=(a=t.spread)!==null&&a!==void 0?a:0,this.speed=(o=t.speed)!==null&&o!==void 0?o:new C(1),this.memory=[]}update(t,e){tt.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Ce(this.mode,this.currentValue,this.spread,e),s=Yt.lerp(1-this.thickness,1,Math.random()),r=i*this.arc,n=Math.sqrt(s),a=Math.sin(r),o=Math.cos(r);t.position.x=n*o,t.position.y=n*a,t.position.z=0;const l=this.angle*n;t.velocity.set(0,0,Math.cos(l)).addScaledVector(t.position,Math.sin(l)).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius)}toJSON(){return{type:"cone",radius:this.radius,arc:this.arc,thickness:this.thickness,angle:this.angle,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new Rt({radius:t.radius,arc:t.arc,thickness:t.thickness,angle:t.angle,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new Rt({radius:this.radius,arc:this.arc,thickness:this.thickness,angle:this.angle,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class he{constructor(t={}){var e,i,s,r,n,a;this.type="circle",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.mode=(r=t.mode)!==null&&r!==void 0?r:tt.Random,this.spread=(n=t.spread)!==null&&n!==void 0?n:0,this.speed=(a=t.speed)!==null&&a!==void 0?a:new C(1),this.memory=[]}update(t,e){this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e}initialize(t,e){const i=Ce(this.mode,this.currentValue,this.spread,e),s=Yt.lerp(1-this.thickness,1,Math.random()),r=i*this.arc;t.position.x=Math.cos(r),t.position.y=Math.sin(r),t.position.z=0,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*s)}toJSON(){return{type:"circle",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new he({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new he({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class le{constructor(t={}){var e,i,s,r,n,a,o;this.type="donut",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.donutRadius=(r=t.donutRadius)!==null&&r!==void 0?r:this.radius*.2,this.mode=(n=t.mode)!==null&&n!==void 0?n:tt.Random,this.spread=(a=t.spread)!==null&&a!==void 0?a:0,this.speed=(o=t.speed)!==null&&o!==void 0?o:new C(1),this.memory=[]}update(t,e){tt.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Ce(this.mode,this.currentValue,this.spread,e),s=Math.random(),r=Yt.lerp(1-this.thickness,1,Math.random()),n=i*this.arc,a=s*Math.PI*2,o=Math.sin(n),l=Math.cos(n);t.position.x=this.radius*l,t.position.y=this.radius*o,t.position.z=0,t.velocity.z=this.donutRadius*r*Math.sin(a),t.velocity.x=this.donutRadius*r*Math.cos(a)*l,t.velocity.y=this.donutRadius*r*Math.cos(a)*o,t.position.add(t.velocity),t.velocity.normalize().multiplyScalar(t.startSpeed)}toJSON(){return{type:"donut",radius:this.radius,arc:this.arc,thickness:this.thickness,donutRadius:this.donutRadius,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new le({radius:t.radius,arc:t.arc,thickness:t.thickness,donutRadius:t.donutRadius,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new le({radius:this.radius,arc:this.arc,thickness:this.thickness,donutRadius:this.donutRadius,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class ce{constructor(){this.type="point"}update(t,e){}initialize(t){const e=Math.random(),i=Math.random(),s=e*Math.PI*2,r=Math.acos(2*i-1),n=Math.cbrt(Math.random()),a=Math.sin(s),o=Math.cos(s),l=Math.sin(r),h=Math.cos(r);t.velocity.x=n*l*o,t.velocity.y=n*l*a,t.velocity.z=n*h,t.velocity.multiplyScalar(t.startSpeed),t.position.setScalar(0)}toJSON(){return{type:"point"}}static fromJSON(t){return new ce}clone(){return new ce}}class Xt{constructor(t={}){var e,i,s,r,n,a;this.type="sphere",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.mode=(r=t.mode)!==null&&r!==void 0?r:tt.Random,this.spread=(n=t.spread)!==null&&n!==void 0?n:0,this.speed=(a=t.speed)!==null&&a!==void 0?a:new C(1),this.memory=[]}update(t,e){tt.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Ce(this.mode,this.currentValue,this.spread,e),s=Math.random(),r=Yt.lerp(1-this.thickness,1,Math.random()),n=i*this.arc,a=Math.acos(2*s-1),o=Math.sin(n),l=Math.cos(n),h=Math.sin(a),u=Math.cos(a);t.position.x=h*l,t.position.y=h*o,t.position.z=u,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*r)}toJSON(){return{type:"sphere",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new Xt({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new Xt({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class ue{constructor(t={}){var e,i,s,r,n,a;this.type="sphere",this.currentValue=0,this.radius=(e=t.radius)!==null&&e!==void 0?e:10,this.arc=(i=t.arc)!==null&&i!==void 0?i:2*Math.PI,this.thickness=(s=t.thickness)!==null&&s!==void 0?s:1,this.mode=(r=t.mode)!==null&&r!==void 0?r:tt.Random,this.spread=(n=t.spread)!==null&&n!==void 0?n:0,this.speed=(a=t.speed)!==null&&a!==void 0?a:new C(1),this.memory=[]}update(t,e){tt.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Ce(this.mode,this.currentValue,this.spread,e),s=Math.random(),r=Yt.lerp(1-this.thickness,1,Math.random()),n=i*this.arc,a=Math.acos(s),o=Math.sin(n),l=Math.cos(n),h=Math.sin(a),u=Math.cos(a);t.position.x=h*l,t.position.y=h*o,t.position.z=u,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*r)}toJSON(){return{type:"hemisphere",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new ue({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?E(t.speed):void 0,spread:t.spread})}clone(){return new ue({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class de{constructor(t={}){var e,i,s,r;this.type="grid",this.width=(e=t.width)!==null&&e!==void 0?e:1,this.height=(i=t.height)!==null&&i!==void 0?i:1,this.column=(s=t.column)!==null&&s!==void 0?s:10,this.row=(r=t.row)!==null&&r!==void 0?r:10}initialize(t){const e=Math.floor(Math.random()*this.row),i=Math.floor(Math.random()*this.column);t.position.x=i*this.width/this.column-this.width/2,t.position.y=e*this.height/this.row-this.height/2,t.position.z=0,t.velocity.set(0,0,t.startSpeed)}toJSON(){return{type:"grid",width:this.width,height:this.height,column:this.column,row:this.row}}static fromJSON(t){return new de(t)}clone(){return new de({width:this.width,height:this.height,column:this.column,row:this.row})}update(t,e){}}const xi={circle:{type:"circle",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:he,loadJSON:he.fromJSON},cone:{type:"cone",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:Rt,loadJSON:Rt.fromJSON},donut:{type:"donut",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["donutRadius",["number"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:le,loadJSON:le.fromJSON},point:{type:"point",params:[],constructor:ce,loadJSON:ce.fromJSON},sphere:{type:"sphere",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:Xt,loadJSON:Xt.fromJSON},hemisphere:{type:"hemisphere",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc"]]],constructor:ue,loadJSON:ue.fromJSON},grid:{type:"grid",params:[["width",["number"]],["height",["number"]],["rows",["number"]],["column",["number"]]],constructor:de,loadJSON:de.fromJSON}};function zr(c,t){return xi[c.type].loadJSON(c,t)}class It{constructor(t){this.color=t,this.type="ColorOverLife"}initialize(t){this.color.startGen(t.memory)}update(t,e){this.color.genColor(t.memory,t.color,t.age/t.life),t.color.x*=t.startColor.x,t.color.y*=t.startColor.y,t.color.z*=t.startColor.z,t.color.w*=t.startColor.w}frameUpdate(t){}toJSON(){return{type:this.type,color:this.color.toJSON()}}static fromJSON(t){return new It(bi(t.color))}clone(){return new It(this.color.clone())}reset(){}}class me{constructor(t){this.angularVelocity=t,this.type="RotationOverLife"}initialize(t){typeof t.rotation=="number"&&this.angularVelocity.startGen(t.memory)}update(t,e){typeof t.rotation=="number"&&(t.rotation+=e*this.angularVelocity.genValue(t.memory,t.age/t.life))}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON()}}static fromJSON(t){return new me(E(t.angularVelocity))}frameUpdate(t){}clone(){return new me(this.angularVelocity.clone())}reset(){}}class fe{constructor(t){this.angularVelocity=t,this.type="Rotation3DOverLife",this.tempQuat=new L,this.tempQuat2=new L}initialize(t){t.rotation instanceof L&&(t.angularVelocity=new L,this.angularVelocity.startGen(t.memory))}update(t,e){t.rotation instanceof L&&(this.angularVelocity.genValue(t.memory,this.tempQuat,e,t.age/t.life),t.rotation.multiply(this.tempQuat))}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON()}}static fromJSON(t){return new fe(Ki(t.angularVelocity))}frameUpdate(t){}clone(){return new fe(this.angularVelocity.clone())}reset(){}}class pe{initialize(t,e){this.ps=e,this.x.startGen(t.memory),this.y.startGen(t.memory),this.z.startGen(t.memory)}constructor(t,e,i){this.x=t,this.y=e,this.z=i,this.type="ForceOverLife",this._temp=new z,this._tempScale=new z,this._tempQ=new L}update(t,e){this._temp.set(this.x.genValue(t.memory,t.age/t.life),this.y.genValue(t.memory,t.age/t.life),this.z.genValue(t.memory,t.age/t.life)),this.ps.worldSpace?t.velocity.addScaledVector(this._temp,e):(this._temp.multiply(this._tempScale).applyQuaternion(this._tempQ),t.velocity.addScaledVector(this._temp,e))}toJSON(){return{type:this.type,x:this.x.toJSON(),y:this.y.toJSON(),z:this.z.toJSON()}}static fromJSON(t){return new pe(E(t.x),E(t.y),E(t.z))}frameUpdate(t){if(this.ps&&!this.ps.worldSpace){const e=this._temp,i=this._tempQ,s=this._tempScale;this.ps.emitter.matrixWorld.decompose(e,i,s),i.invert(),s.set(1/s.x,1/s.y,1/s.z)}}clone(){return new pe(this.x.clone(),this.y.clone(),this.z.clone())}reset(){}}class Ft{initialize(t){this.size.startGen(t.memory)}constructor(t){this.size=t,this.type="SizeOverLife"}update(t){this.size instanceof kt?this.size.genValue(t.memory,t.size,t.age/t.life).multiply(t.startSize):t.size.copy(t.startSize).multiplyScalar(this.size.genValue(t.memory,t.age/t.life))}toJSON(){return{type:this.type,size:this.size.toJSON()}}static fromJSON(t){return new Ft(qe(t.size))}frameUpdate(t){}clone(){return new Ft(this.size.clone())}reset(){}}class ye{initialize(t){this.speed.startGen(t.memory)}constructor(t){this.speed=t,this.type="SpeedOverLife"}update(t){t.speedModifier=this.speed.genValue(t.memory,t.age/t.life)}toJSON(){return{type:this.type,speed:this.speed.toJSON()}}static fromJSON(t){return new ye(E(t.speed))}frameUpdate(t){}clone(){return new ye(this.speed.clone())}reset(){}}class ge{constructor(t){this.frame=t,this.type="FrameOverLife"}initialize(t){this.frame.startGen(t.memory)}update(t,e){this.frame instanceof Bt&&(t.uvTile=this.frame.genValue(t.memory,t.age/t.life))}frameUpdate(t){}toJSON(){return{type:this.type,frame:this.frame.toJSON()}}static fromJSON(t){return new ge(E(t.frame))}clone(){return new ge(this.frame.clone())}reset(){}}new z(0,0,1);class ve{constructor(t,e=new z(0,1,0)){this.orbitSpeed=t,this.axis=e,this.type="OrbitOverLife",this.temp=new z,this.rotation=new L}initialize(t){this.orbitSpeed.startGen(t.memory)}update(t,e){this.temp.copy(t.position).projectOnVector(this.axis),this.rotation.setFromAxisAngle(this.axis,this.orbitSpeed.genValue(t.memory,t.age/t.life)*e),t.position.sub(this.temp),t.position.applyQuaternion(this.rotation),t.position.add(this.temp)}frameUpdate(t){}toJSON(){return{type:this.type,orbitSpeed:this.orbitSpeed.toJSON(),axis:[this.axis.x,this.axis.y,this.axis.z]}}static fromJSON(t){return new ve(E(t.orbitSpeed),t.axis?new z(t.axis[0],t.axis[1],t.axis[2]):void 0)}clone(){return new ve(this.orbitSpeed.clone())}reset(){}}class di{constructor(t){this.data=t,this.next=null,this.prev=null}hasPrev(){return this.prev!==null}hasNext(){return this.next!==null}}class br{constructor(){this.length=0,this.head=this.tail=null}isEmpty(){return this.head===null}clear(){this.length=0,this.head=this.tail=null}front(){return this.head===null?null:this.head.data}back(){return this.tail===null?null:this.tail.data}dequeue(){if(this.head){const t=this.head.data;return this.head=this.head.next,this.head?this.head.prev=null:this.tail=null,this.length--,t}}pop(){if(this.tail){const t=this.tail.data;return this.tail=this.tail.prev,this.tail?this.tail.next=null:this.head=null,this.length--,t}}queue(t){const e=new di(t);this.tail||(this.tail=e),this.head&&(this.head.prev=e,e.next=this.head),this.head=e,this.length++}push(t){const e=new di(t);this.head||(this.head=e),this.tail&&(this.tail.next=e,e.prev=this.tail),this.tail=e,this.length++}insertBefore(t,e){const i=new di(e);i.next=t,i.prev=t.prev,i.prev!==null&&(i.prev.next=i),i.next.prev=i,t==this.head&&(this.head=i),this.length++}remove(t){if(this.head===null||this.tail===null)return;let e=this.head;for(t===this.head.data&&(this.head=this.head.next),t===this.tail.data&&(this.tail=this.tail.prev);e.next!==null&&e.data!==t;)e=e.next;e.data===t&&(e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.length--)}*values(){let t=this.head;for(;t!==null;)yield t.data,t=t.next}}class Tr{constructor(){this.startSpeed=0,this.startColor=new et,this.startSize=new z(1,1,1),this.position=new z,this.velocity=new z,this.age=0,this.life=1,this.size=new z(1,1,1),this.speedModifier=1,this.rotation=0,this.color=new et,this.uvTile=0,this.memory=[]}get died(){return this.age>=this.life}reset(){this.memory.length=0}}class Or{constructor(t,e,i){this.position=t,this.size=e,this.color=i}}class _i{constructor(){this.startSpeed=0,this.startColor=new et,this.startSize=new z(1,1,1),this.position=new z,this.velocity=new z,this.age=0,this.life=1,this.size=new z(1,1,1),this.length=100,this.speedModifier=1,this.color=new et,this.previous=new br,this.uvTile=0,this.memory=[]}update(){for(this.age<=this.life?this.previous.push(new Or(this.position.clone(),this.size.x,this.color.clone())):this.previous.length>0&&this.previous.dequeue();this.previous.length>this.length;)this.previous.dequeue()}get died(){return this.age>=this.life}reset(){this.memory.length=0,this.previous.clear()}}class xe{initialize(t){this.width.startGen(t.memory)}constructor(t){this.width=t,this.type="WidthOverLength"}update(t){if(t instanceof _i){const e=t.previous.values();for(let i=0;i<t.previous.length;i++){const s=e.next();s.value.size=this.width.genValue(t.memory,(t.previous.length-i)/t.length)}}}frameUpdate(t){}toJSON(){return{type:this.type,width:this.width.toJSON()}}static fromJSON(t){return new xe(E(t.width))}clone(){return new xe(this.width.clone())}reset(){}}class _e{constructor(t,e){this.direction=t,this.magnitude=e,this.type="ApplyForce",this.memory={data:[],dataCount:0},this.magnitudeValue=this.magnitude.genValue(this.memory)}initialize(t){}update(t,e){t.velocity.addScaledVector(this.direction,this.magnitudeValue*e)}frameUpdate(t){this.magnitudeValue=this.magnitude.genValue(this.memory)}toJSON(){return{type:this.type,direction:[this.direction.x,this.direction.y,this.direction.z],magnitude:this.magnitude.toJSON()}}static fromJSON(t){var e;return new _e(new z(t.direction[0],t.direction[1],t.direction[2]),E((e=t.magnitude)!==null&&e!==void 0?e:t.force))}clone(){return new _e(this.direction.clone(),this.magnitude.clone())}reset(){}}class Se{constructor(t,e){this.center=t,this.magnitude=e,this.type="GravityForce",this.temp=new z}initialize(t){}update(t,e){this.temp.copy(this.center).sub(t.position).normalize(),t.velocity.addScaledVector(this.temp,this.magnitude/t.position.distanceToSquared(this.center)*e)}frameUpdate(t){}toJSON(){return{type:this.type,center:[this.center.x,this.center.y,this.center.z],magnitude:this.magnitude}}static fromJSON(t){return new Se(new z(t.center[0],t.center[1],t.center[2]),t.magnitude)}clone(){return new Se(this.center.clone(),this.magnitude)}reset(){}}new z(0,0,1);class Me{constructor(t){this.angle=t,this.type="ChangeEmitDirection",this._temp=new z,this._q=new L,this.memory={data:[],dataCount:0}}initialize(t){const e=t.velocity.length();e!=0&&(t.velocity.normalize(),t.velocity.x===0&&t.velocity.y===0?this._temp.set(0,t.velocity.z,0):this._temp.set(-t.velocity.y,t.velocity.x,0),this.angle.startGen(this.memory),this._q.setFromAxisAngle(this._temp.normalize(),this.angle.genValue(this.memory)),this._temp.copy(t.velocity),t.velocity.applyQuaternion(this._q),this._q.setFromAxisAngle(this._temp,Math.random()*Math.PI*2),t.velocity.applyQuaternion(this._q),t.velocity.setLength(e))}update(t,e){}frameUpdate(t){}toJSON(){return{type:this.type,angle:this.angle.toJSON()}}static fromJSON(t){return new Me(E(t.angle))}clone(){return new Me(this.angle)}reset(){}}const Pr=new z(1,1,1),Bi=new z(0,0,1);var Vt;(function(c){c[c.Death=0]="Death",c[c.Birth=1]="Birth",c[c.Frame=2]="Frame"})(Vt||(Vt={}));class we{constructor(t,e,i,s=Vt.Frame,r=1){this.particleSystem=t,this.useVelocityAsBasis=e,this.subParticleSystem=i,this.mode=s,this.emitProbability=r,this.type="EmitSubParticleSystem",this.q_=new L,this.v_=new z,this.v2_=new z,this.subEmissions=new Array,this.subParticleSystem&&this.subParticleSystem.system&&(this.subParticleSystem.system.onlyUsedByOther=!0)}initialize(t){}update(t,e){this.mode===Vt.Frame?this.emit(t,e):this.mode===Vt.Birth&&t.age===0?this.emit(t,e):this.mode===Vt.Death&&t.age+e>=t.life&&this.emit(t,e)}emit(t,e){if(!this.subParticleSystem||Math.random()>this.emitProbability)return;const i=new Jt;this.setMatrixFromParticle(i,t),this.subEmissions.push({burstParticleCount:0,burstParticleIndex:0,isBursting:!1,burstIndex:0,burstWaveIndex:0,time:0,waitEmiting:0,matrix:i,travelDistance:0,particle:t})}frameUpdate(t){if(this.subParticleSystem)for(let e=0;e<this.subEmissions.length;e++)if(this.subEmissions[e].time>=this.subParticleSystem.system.duration)this.subEmissions[e]=this.subEmissions[this.subEmissions.length-1],this.subEmissions.length=this.subEmissions.length-1,e--;else{const i=this.subEmissions[e];i.particle&&i.particle.age<i.particle.life?this.setMatrixFromParticle(i.matrix,i.particle):i.particle=void 0,this.subParticleSystem.system.emit(t,i,i.matrix)}}toJSON(){return{type:this.type,subParticleSystem:this.subParticleSystem?this.subParticleSystem.uuid:"",useVelocityAsBasis:this.useVelocityAsBasis,mode:this.mode,emitProbability:this.emitProbability}}static fromJSON(t,e){return new we(e,t.useVelocityAsBasis,t.subParticleSystem,t.mode,t.emitProbability)}clone(){return new we(this.particleSystem,this.useVelocityAsBasis,this.subParticleSystem,this.mode,this.emitProbability)}reset(){}setMatrixFromParticle(t,e){let i;if(e.rotation===void 0||this.useVelocityAsBasis)if(e.velocity.x===0&&e.velocity.y===0&&(e.velocity.z===1||e.velocity.z===0))t.set(1,0,0,e.position.x,0,1,0,e.position.y,0,0,1,e.position.z,0,0,0,1);else{this.v_.copy(Bi).cross(e.velocity),this.v2_.copy(e.velocity).cross(this.v_);const s=this.v_.length(),r=this.v2_.length();t.set(this.v_.x/s,this.v2_.x/r,e.velocity.x,e.position.x,this.v_.y/s,this.v2_.y/r,e.velocity.y,e.position.y,this.v_.z/s,this.v2_.z/r,e.velocity.z,e.position.z,0,0,0,1)}else e.rotation instanceof L?i=e.rotation:(this.q_.setFromAxisAngle(Bi,e.rotation),i=this.q_),t.compose(e.position,i,Pr);this.particleSystem.worldSpace||t.multiplyMatrices(this.particleSystem.emitter.matrixWorld,t)}}const Nr=.5*(Math.sqrt(3)-1),ee=(3-Math.sqrt(3))/6,Ar=1/3,dt=1/6,Er=(Math.sqrt(5)-1)/4,H=(5-Math.sqrt(5))/20,$=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),J=new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]);class ji{constructor(t=Math.random){const e=typeof t=="function"?t:Ur(t);this.p=Cr(e),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(let i=0;i<512;i++)this.perm[i]=this.p[i&255],this.permMod12[i]=this.perm[i]%12}noise2D(t,e){const i=this.permMod12,s=this.perm;let r=0,n=0,a=0;const o=(t+e)*Nr,l=Math.floor(t+o),h=Math.floor(e+o),u=(l+h)*ee,m=l-u,d=h-u,f=t-m,p=e-d;let v,g;f>p?(v=1,g=0):(v=0,g=1);const b=f-v+ee,_=p-g+ee,S=f-1+2*ee,y=p-1+2*ee,M=l&255,x=h&255;let O=.5-f*f-p*p;if(O>=0){const N=i[M+s[x]]*3;O*=O,r=O*O*($[N]*f+$[N+1]*p)}let A=.5-b*b-_*_;if(A>=0){const N=i[M+v+s[x+g]]*3;A*=A,n=A*A*($[N]*b+$[N+1]*_)}let P=.5-S*S-y*y;if(P>=0){const N=i[M+1+s[x+1]]*3;P*=P,a=P*P*($[N]*S+$[N+1]*y)}return 70*(r+n+a)}noise3D(t,e,i){const s=this.permMod12,r=this.perm;let n,a,o,l;const h=(t+e+i)*Ar,u=Math.floor(t+h),m=Math.floor(e+h),d=Math.floor(i+h),f=(u+m+d)*dt,p=u-f,v=m-f,g=d-f,b=t-p,_=e-v,S=i-g;let y,M,x,O,A,P;b>=_?_>=S?(y=1,M=0,x=0,O=1,A=1,P=0):b>=S?(y=1,M=0,x=0,O=1,A=0,P=1):(y=0,M=0,x=1,O=1,A=0,P=1):_<S?(y=0,M=0,x=1,O=0,A=1,P=1):b<S?(y=0,M=1,x=0,O=0,A=1,P=1):(y=0,M=1,x=0,O=1,A=1,P=0);const N=b-y+dt,k=_-M+dt,G=S-x+dt,X=b-O+2*dt,W=_-A+2*dt,Q=S-P+2*dt,K=b-1+3*dt,ot=_-1+3*dt,at=S-1+3*dt,rt=u&255,nt=m&255,At=d&255;let Mt=.6-b*b-_*_-S*S;if(Mt<0)n=0;else{const Y=s[rt+r[nt+r[At]]]*3;Mt*=Mt,n=Mt*Mt*($[Y]*b+$[Y+1]*_+$[Y+2]*S)}let wt=.6-N*N-k*k-G*G;if(wt<0)a=0;else{const Y=s[rt+y+r[nt+M+r[At+x]]]*3;wt*=wt,a=wt*wt*($[Y]*N+$[Y+1]*k+$[Y+2]*G)}let vt=.6-X*X-W*W-Q*Q;if(vt<0)o=0;else{const Y=s[rt+O+r[nt+A+r[At+P]]]*3;vt*=vt,o=vt*vt*($[Y]*X+$[Y+1]*W+$[Y+2]*Q)}let xt=.6-K*K-ot*ot-at*at;if(xt<0)l=0;else{const Y=s[rt+1+r[nt+1+r[At+1]]]*3;xt*=xt,l=xt*xt*($[Y]*K+$[Y+1]*ot+$[Y+2]*at)}return 32*(n+a+o+l)}noise4D(t,e,i,s){const r=this.perm;let n,a,o,l,h;const u=(t+e+i+s)*Er,m=Math.floor(t+u),d=Math.floor(e+u),f=Math.floor(i+u),p=Math.floor(s+u),v=(m+d+f+p)*H,g=m-v,b=d-v,_=f-v,S=p-v,y=t-g,M=e-b,x=i-_,O=s-S;let A=0,P=0,N=0,k=0;y>M?A++:P++,y>x?A++:N++,y>O?A++:k++,M>x?P++:N++,M>O?P++:k++,x>O?N++:k++;const G=A>=3?1:0,X=P>=3?1:0,W=N>=3?1:0,Q=k>=3?1:0,K=A>=2?1:0,ot=P>=2?1:0,at=N>=2?1:0,rt=k>=2?1:0,nt=A>=1?1:0,At=P>=1?1:0,Mt=N>=1?1:0,wt=k>=1?1:0,vt=y-G+H,xt=M-X+H,Y=x-W+H,We=O-Q+H,Qe=y-K+2*H,Ke=M-ot+2*H,je=x-at+2*H,ti=O-rt+2*H,ei=y-nt+3*H,ii=M-At+3*H,si=x-Mt+3*H,ri=O-wt+3*H,ni=y-1+4*H,oi=M-1+4*H,ai=x-1+4*H,hi=O-1+4*H,qt=m&255,$t=d&255,Ht=f&255,Zt=p&255;let Wt=.6-y*y-M*M-x*x-O*O;if(Wt<0)n=0;else{const V=r[qt+r[$t+r[Ht+r[Zt]]]]%32*4;Wt*=Wt,n=Wt*Wt*(J[V]*y+J[V+1]*M+J[V+2]*x+J[V+3]*O)}let Qt=.6-vt*vt-xt*xt-Y*Y-We*We;if(Qt<0)a=0;else{const V=r[qt+G+r[$t+X+r[Ht+W+r[Zt+Q]]]]%32*4;Qt*=Qt,a=Qt*Qt*(J[V]*vt+J[V+1]*xt+J[V+2]*Y+J[V+3]*We)}let Kt=.6-Qe*Qe-Ke*Ke-je*je-ti*ti;if(Kt<0)o=0;else{const V=r[qt+K+r[$t+ot+r[Ht+at+r[Zt+rt]]]]%32*4;Kt*=Kt,o=Kt*Kt*(J[V]*Qe+J[V+1]*Ke+J[V+2]*je+J[V+3]*ti)}let jt=.6-ei*ei-ii*ii-si*si-ri*ri;if(jt<0)l=0;else{const V=r[qt+nt+r[$t+At+r[Ht+Mt+r[Zt+wt]]]]%32*4;jt*=jt,l=jt*jt*(J[V]*ei+J[V+1]*ii+J[V+2]*si+J[V+3]*ri)}let te=.6-ni*ni-oi*oi-ai*ai-hi*hi;if(te<0)h=0;else{const V=r[qt+1+r[$t+1+r[Ht+1+r[Zt+1]]]]%32*4;te*=te,h=te*te*(J[V]*ni+J[V+1]*oi+J[V+2]*ai+J[V+3]*hi)}return 27*(n+a+o+l+h)}}function Cr(c){const t=new Uint8Array(256);for(let e=0;e<256;e++)t[e]=e;for(let e=0;e<255;e++){const i=e+~~(c()*(256-e)),s=t[e];t[e]=t[i],t[i]=s}return t}function Ur(c){let t=0,e=0,i=0,s=1;const r=Br();return t=r(" "),e=r(" "),i=r(" "),t-=r(c),t<0&&(t+=1),e-=r(c),e<0&&(e+=1),i-=r(c),i<0&&(i+=1),function(){const n=2091639*t+s*23283064365386963e-26;return t=e,e=i,i=n-(s=n|0)}}function Br(){let c=4022871197;return function(t){t=t.toString();for(let e=0;e<t.length;e++){c+=t.charCodeAt(e);let i=.02519603282416938*c;c=i>>>0,i-=c,i*=c,c=i>>>0,i-=c,c+=i*4294967296}return(c>>>0)*23283064365386963e-26}}class ze{constructor(t,e,i,s){this.scale=t,this.octaves=e,this.velocityMultiplier=i,this.timeScale=s,this.type="TurbulenceField",this.generator=new ji,this.timeOffset=new z,this.temp=new z,this.temp2=new z,this.timeOffset.x=Math.random()/this.scale.x*this.timeScale.x,this.timeOffset.y=Math.random()/this.scale.y*this.timeScale.y,this.timeOffset.z=Math.random()/this.scale.z*this.timeScale.z}initialize(t){}update(t,e){const i=t.position.x/this.scale.x,s=t.position.y/this.scale.y,r=t.position.z/this.scale.z;this.temp.set(0,0,0);let n=1;for(let a=0;a<this.octaves;a++)this.temp2.set(this.generator.noise4D(i*n,s*n,r*n,this.timeOffset.x*n)/n,this.generator.noise4D(i*n,s*n,r*n,this.timeOffset.y*n)/n,this.generator.noise4D(i*n,s*n,r*n,this.timeOffset.z*n)/n),this.temp.add(this.temp2),n*=2;this.temp.multiply(this.velocityMultiplier),t.velocity.addScaledVector(this.temp,e)}toJSON(){return{type:this.type,scale:[this.scale.x,this.scale.y,this.scale.z],octaves:this.octaves,velocityMultiplier:[this.velocityMultiplier.x,this.velocityMultiplier.y,this.velocityMultiplier.z],timeScale:[this.timeScale.x,this.timeScale.y,this.timeScale.z]}}frameUpdate(t){this.timeOffset.x+=t*this.timeScale.x,this.timeOffset.y+=t*this.timeScale.y,this.timeOffset.z+=t*this.timeScale.z}static fromJSON(t){return new ze(new z(t.scale[0],t.scale[1],t.scale[2]),t.octaves,new z(t.velocityMultiplier[0],t.velocityMultiplier[1],t.velocityMultiplier[2]),new z(t.timeScale[0],t.timeScale[1],t.timeScale[2]))}clone(){return new ze(this.scale.clone(),this.octaves,this.velocityMultiplier.clone(),this.timeScale.clone())}reset(){}}function Re(c,t){return Math.floor(Math.random()*(t-c))+c}const mt=[],mi=new z,fi=new L;class be{constructor(t,e,i=new C(1),s=new C(0)){if(this.frequency=t,this.power=e,this.positionAmount=i,this.rotationAmount=s,this.type="Noise",this.duration=0,mt.length===0)for(let r=0;r<100;r++)mt.push(new ji)}initialize(t){t.lastPosNoise=new z,typeof t.rotation=="number"?t.lastRotNoise=0:t.lastRotNoise=new L,t.generatorIndex=[Re(0,100),Re(0,100),Re(0,100),Re(0,100)],this.positionAmount.startGen(t.memory),this.rotationAmount.startGen(t.memory),this.frequency.startGen(t.memory),this.power.startGen(t.memory)}update(t,e){let i=this.frequency.genValue(t.memory,t.age/t.life),s=this.power.genValue(t.memory,t.age/t.life),r=this.positionAmount.genValue(t.memory,t.age/t.life),n=this.rotationAmount.genValue(t.memory,t.age/t.life);r>0&&t.lastPosNoise!==void 0&&(t.position.sub(t.lastPosNoise),mi.set(mt[t.generatorIndex[0]].noise2D(0,t.age*i)*s*r,mt[t.generatorIndex[1]].noise2D(0,t.age*i)*s*r,mt[t.generatorIndex[2]].noise2D(0,t.age*i)*s*r),t.position.add(mi),t.lastPosNoise.copy(mi)),n>0&&t.lastRotNoise!==void 0&&(typeof t.rotation=="number"?(t.rotation-=t.lastRotNoise,t.rotation+=mt[t.generatorIndex[3]].noise2D(0,t.age*i)*Math.PI*s*n):(t.lastRotNoise.invert(),t.rotation.multiply(t.lastRotNoise),fi.set(mt[t.generatorIndex[0]].noise2D(0,t.age*i)*s*n,mt[t.generatorIndex[1]].noise2D(0,t.age*i)*s*n,mt[t.generatorIndex[2]].noise2D(0,t.age*i)*s*n,mt[t.generatorIndex[3]].noise2D(0,t.age*i)*s*n).normalize(),t.rotation.multiply(fi),t.lastRotNoise.copy(fi)))}toJSON(){return{type:this.type,frequency:this.frequency.toJSON(),power:this.power.toJSON(),positionAmount:this.positionAmount.toJSON(),rotationAmount:this.rotationAmount.toJSON()}}frameUpdate(t){this.duration+=t}static fromJSON(t){return new be(E(t.frequency),E(t.power),E(t.positionAmount),E(t.rotationAmount))}clone(){return new be(this.frequency.clone(),this.power.clone(),this.positionAmount.clone(),this.rotationAmount.clone())}reset(){}}class Te{constructor(t,e){this.color=t,this.speedRange=e,this.type="ColorBySpeed"}initialize(t){this.color.startGen(t.memory)}update(t,e){const i=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);this.color.genColor(t.memory,t.color,i),t.color.x*=t.startColor.x,t.color.y*=t.startColor.y,t.color.z*=t.startColor.z,t.color.w*=t.startColor.w}frameUpdate(t){}toJSON(){return{type:this.type,color:this.color.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new Te(bi(t.color),st.fromJSON(t.speedRange))}clone(){return new Te(this.color.clone(),this.speedRange.clone())}reset(){}}class Oe{initialize(t){this.size.startGen(t.memory)}constructor(t,e){this.size=t,this.speedRange=e,this.type="SizeBySpeed"}update(t){const e=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);this.size instanceof kt?this.size.genValue(t.memory,t.size,e).multiply(t.startSize):t.size.copy(t.startSize).multiplyScalar(this.size.genValue(t.memory,e))}toJSON(){return{type:this.type,size:this.size.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new Oe(qe(t.size),st.fromJSON(t.speedRange))}frameUpdate(t){}clone(){return new Oe(this.size.clone(),this.speedRange.clone())}reset(){}}class Pe{constructor(t,e){this.angularVelocity=t,this.speedRange=e,this.type="RotationBySpeed",this.tempQuat=new L}initialize(t){typeof t.rotation=="number"&&this.angularVelocity.startGen(t.memory)}update(t,e){if(typeof t.rotation=="number"){const i=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);t.rotation+=e*this.angularVelocity.genValue(t.memory,i)}}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new Pe(E(t.angularVelocity),st.fromJSON(t.speedRange))}frameUpdate(t){}clone(){return new Pe(this.angularVelocity.clone(),this.speedRange.clone())}reset(){}}class Ne{initialize(t){this.speed.startGen(t.memory)}constructor(t,e){this.speed=t,this.dampen=e,this.type="LimitSpeedOverLife"}update(t,e){let i=t.velocity.length(),s=this.speed.genValue(t.memory,t.age/t.life);if(i>s){const r=(i-s)/i;t.velocity.multiplyScalar(1-r*this.dampen*e*20)}}toJSON(){return{type:this.type,speed:this.speed.toJSON(),dampen:this.dampen}}static fromJSON(t){return new Ne(E(t.speed),t.dampen)}frameUpdate(t){}clone(){return new Ne(this.speed.clone(),this.dampen)}reset(){}}const Si={ApplyForce:{type:"ApplyForce",constructor:_e,params:[["direction",["vec3"]],["magnitude",["value"]]],loadJSON:_e.fromJSON},Noise:{type:"Noise",constructor:be,params:[["frequency",["value"]],["power",["value"]],["positionAmount",["value"]],["rotationAmount",["value"]]],loadJSON:be.fromJSON},TurbulenceField:{type:"TurbulenceField",constructor:ze,params:[["scale",["vec3"]],["octaves",["number"]],["velocityMultiplier",["vec3"]],["timeScale",["vec3"]]],loadJSON:ze.fromJSON},GravityForce:{type:"GravityForce",constructor:Se,params:[["center",["vec3"]],["magnitude",["number"]]],loadJSON:Se.fromJSON},ColorOverLife:{type:"ColorOverLife",constructor:It,params:[["color",["colorFunc"]]],loadJSON:It.fromJSON},RotationOverLife:{type:"RotationOverLife",constructor:me,params:[["angularVelocity",["value","valueFunc"]]],loadJSON:me.fromJSON},Rotation3DOverLife:{type:"Rotation3DOverLife",constructor:fe,params:[["angularVelocity",["rotationFunc"]]],loadJSON:fe.fromJSON},SizeOverLife:{type:"SizeOverLife",constructor:Ft,params:[["size",["value","valueFunc","vec3Func"]]],loadJSON:Ft.fromJSON},ColorBySpeed:{type:"ColorBySpeed",constructor:Te,params:[["color",["colorFunc"]],["speedRange",["range"]]],loadJSON:Te.fromJSON},RotationBySpeed:{type:"RotationBySpeed",constructor:Pe,params:[["angularVelocity",["value","valueFunc"]],["speedRange",["range"]]],loadJSON:Pe.fromJSON},SizeBySpeed:{type:"SizeBySpeed",constructor:Oe,params:[["size",["value","valueFunc","vec3Func"]],["speedRange",["range"]]],loadJSON:Oe.fromJSON},SpeedOverLife:{type:"SpeedOverLife",constructor:ye,params:[["speed",["value","valueFunc"]]],loadJSON:ye.fromJSON},FrameOverLife:{type:"FrameOverLife",constructor:ge,params:[["frame",["value","valueFunc"]]],loadJSON:ge.fromJSON},ForceOverLife:{type:"ForceOverLife",constructor:pe,params:[["x",["value","valueFunc"]],["y",["value","valueFunc"]],["z",["value","valueFunc"]]],loadJSON:pe.fromJSON},OrbitOverLife:{type:"OrbitOverLife",constructor:ve,params:[["orbitSpeed",["value","valueFunc"]],["axis",["vec3"]]],loadJSON:ve.fromJSON},WidthOverLength:{type:"WidthOverLength",constructor:xe,params:[["width",["value","valueFunc"]]],loadJSON:xe.fromJSON},ChangeEmitDirection:{type:"ChangeEmitDirection",constructor:Me,params:[["angle",["value"]]],loadJSON:Me.fromJSON},EmitSubParticleSystem:{type:"EmitSubParticleSystem",constructor:we,params:[["particleSystem",["self"]],["useVelocityAsBasis",["boolean"]],["subParticleSystem",["particleSystem"]],["mode",["number"]],["emitProbability",["number"]]],loadJSON:we.fromJSON},LimitSpeedOverLife:{type:"LimitSpeedOverLife",constructor:Ne,params:[["speed",["value","valueFunc"]],["dampen",["number"]]],loadJSON:Ne.fromJSON}};function kr(c,t){return Si[c.type].loadJSON(c,t)}const Rr=[];function Ir(c){if(!Rr.find(e=>e.id===c.id)){for(const e of c.emitterShapes)xi[e.type]||(xi[e.type]=e);for(const e of c.behaviors)Si[e.type]||(Si[e.type]=e)}}var Fr=`
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
`,Lr=`
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
`,Vr=`
#ifdef SOFT_PARTICLES
    varying vec4 projPosition;
    varying float linearDepth;
#endif
`,Jr=`
#ifdef SOFT_PARTICLES
    projPosition = gl_Position;
    linearDepth = -mvPosition.z;
#endif
`,Dr=`
#ifdef USE_MAP
    vec4 texelColor = texture2D( map, vUv);
    #ifdef TILE_BLEND
        texelColor = mix( texelColor, texture2D( map, vUvNext ), vUvBlend );
    #endif
    diffuseColor *= texelColor;
#endif
`,Gr=`
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
`,Xr=`
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
`,Yr=`
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

`;const Tt=vs;function qr(){Tt.tile_pars_vertex=Xr,Tt.tile_vertex=Yr,Tt.tile_pars_fragment=Gr,Tt.tile_fragment=Dr,Tt.soft_pars_vertex=Vr,Tt.soft_vertex=Jr,Tt.soft_pars_fragment=Lr,Tt.soft_fragment=Fr}class $r extends Di{constructor(t){super(),this.type="ParticleEmitter",this.system=t}clone(){const t=this.system.clone();return t.emitter.copy(this,!0),t.emitter}dispose(){}extractFromCache(t){const e=[];for(const i in t){const s=t[i];delete s.metadata,e.push(s)}return e}toJSON(t,e={}){const i=this.children;this.children=this.children.filter(r=>r.type!=="ParticleSystemPreview");const s=super.toJSON(t);return this.children=i,this.system!==null&&(s.object.ps=this.system.toJSON(t,e)),s}}var w;(function(c){c[c.BillBoard=0]="BillBoard",c[c.StretchedBillBoard=1]="StretchedBillBoard",c[c.Mesh=2]="Mesh",c[c.Trail=3]="Trail",c[c.HorizontalBillBoard=4]="HorizontalBillBoard",c[c.VerticalBillBoard=5]="VerticalBillBoard"})(w||(w={}));class ts extends Li{constructor(t){super(),this.type="VFXBatch",this.maxParticles=1e3,this.systems=new Set;const e=new Fe;e.mask=t.layers.mask;const i=t.material.clone();i.defines={},Object.assign(i.defines,t.material.defines),this.settings={instancingGeometry:t.instancingGeometry,renderMode:t.renderMode,renderOrder:t.renderOrder,material:i,uTileCount:t.uTileCount,vTileCount:t.vTileCount,blendTiles:t.blendTiles,softParticles:t.softParticles,softNearFade:t.softNearFade,softFarFade:t.softFarFade,layers:e},this.frustumCulled=!1,this.renderOrder=this.settings.renderOrder}addSystem(t){this.systems.add(t)}removeSystem(t){this.systems.delete(t)}applyDepthTexture(t){const e=this.material.uniforms.depthTexture;e&&e.value!==t&&(e.value=t,this.material.needsUpdate=!0)}}const Hr=new z(0,0,1),pi=new L,Zr=new z,Wr=new z;new z;const ki=60,Qr=new Ji(1,1,1,1);class $e{set time(t){this.emissionState.time=t}get time(){return this.emissionState.time}get layers(){return this.rendererSettings.layers}get texture(){return this.rendererSettings.material.map}set texture(t){this.rendererSettings.material.map=t,this.neededToUpdateRender=!0}get material(){return this.rendererSettings.material}set material(t){this.rendererSettings.material=t,this.neededToUpdateRender=!0}get uTileCount(){return this.rendererSettings.uTileCount}set uTileCount(t){this.rendererSettings.uTileCount=t,this.neededToUpdateRender=!0}get vTileCount(){return this.rendererSettings.vTileCount}set vTileCount(t){this.rendererSettings.vTileCount=t,this.neededToUpdateRender=!0}get blendTiles(){return this.rendererSettings.blendTiles}set blendTiles(t){this.rendererSettings.blendTiles=t,this.neededToUpdateRender=!0}get softParticles(){return this.rendererSettings.softParticles}set softParticles(t){this.rendererSettings.softParticles=t,this.neededToUpdateRender=!0}get softNearFade(){return this.rendererSettings.softNearFade}set softNearFade(t){this.rendererSettings.softNearFade=t,this.neededToUpdateRender=!0}get softFarFade(){return this.rendererSettings.softFarFade}set softFarFade(t){this.rendererSettings.softFarFade=t,this.neededToUpdateRender=!0}get instancingGeometry(){return this.rendererSettings.instancingGeometry}set instancingGeometry(t){this.restart(),this.particles.length=0,this.rendererSettings.instancingGeometry=t,this.neededToUpdateRender=!0}get renderMode(){return this.rendererSettings.renderMode}set renderMode(t){if((this.rendererSettings.renderMode!=w.Trail&&t===w.Trail||this.rendererSettings.renderMode==w.Trail&&t!==w.Trail)&&(this.restart(),this.particles.length=0),this.rendererSettings.renderMode!==t)switch(t){case w.Trail:this.rendererEmitterSettings={startLength:new C(30),followLocalOrigin:!1};break;case w.Mesh:this.rendererEmitterSettings={geometry:new Ji(1,1)},this.startRotation=new ae(new z(0,1,0),new C(0));break;case w.StretchedBillBoard:this.rendererEmitterSettings={speedFactor:0,lengthFactor:2},this.rendererSettings.renderMode===w.Mesh&&(this.startRotation=new C(0));break;case w.BillBoard:case w.VerticalBillBoard:case w.HorizontalBillBoard:this.rendererEmitterSettings={},this.rendererSettings.renderMode===w.Mesh&&(this.startRotation=new C(0));break}this.rendererSettings.renderMode=t,this.neededToUpdateRender=!0}get renderOrder(){return this.rendererSettings.renderOrder}set renderOrder(t){this.rendererSettings.renderOrder=t,this.neededToUpdateRender=!0}get blending(){return this.rendererSettings.material.blending}set blending(t){this.rendererSettings.material.blending=t,this.neededToUpdateRender=!0}constructor(t){var e,i,s,r,n,a,o,l,h,u,m,d,f,p,v,g,b,_,S,y,M,x,O,A,P,N;if(this.temp=new z,this.travelDistance=0,this.normalMatrix=new pt,this.memory=[],this.firstTimeUpdate=!0,this.autoDestroy=t.autoDestroy===void 0?!1:t.autoDestroy,this.duration=(e=t.duration)!==null&&e!==void 0?e:1,this.looping=t.looping===void 0?!0:t.looping,this.prewarm=t.prewarm===void 0?!1:t.prewarm,this.startLife=(i=t.startLife)!==null&&i!==void 0?i:new C(5),this.startSpeed=(s=t.startSpeed)!==null&&s!==void 0?s:new C(0),this.startRotation=(r=t.startRotation)!==null&&r!==void 0?r:new C(0),this.startSize=(n=t.startSize)!==null&&n!==void 0?n:new C(1),this.startColor=(a=t.startColor)!==null&&a!==void 0?a:new Nt(new et(1,1,1,1)),this.emissionOverTime=(o=t.emissionOverTime)!==null&&o!==void 0?o:new C(10),this.emissionOverDistance=(l=t.emissionOverDistance)!==null&&l!==void 0?l:new C(0),this.emissionBursts=(h=t.emissionBursts)!==null&&h!==void 0?h:[],this.onlyUsedByOther=(u=t.onlyUsedByOther)!==null&&u!==void 0?u:!1,this.emitterShape=(m=t.shape)!==null&&m!==void 0?m:new Xt,this.behaviors=(d=t.behaviors)!==null&&d!==void 0?d:new Array,this.worldSpace=(f=t.worldSpace)!==null&&f!==void 0?f:!1,this.rendererEmitterSettings=(p=t.rendererEmitterSettings)!==null&&p!==void 0?p:{},t.renderMode===w.StretchedBillBoard){const k=this.rendererEmitterSettings;t.speedFactor!==void 0&&(k.speedFactor=t.speedFactor),k.speedFactor=(v=k.speedFactor)!==null&&v!==void 0?v:0,k.lengthFactor=(g=k.lengthFactor)!==null&&g!==void 0?g:0}this.rendererSettings={instancingGeometry:(b=t.instancingGeometry)!==null&&b!==void 0?b:Qr,renderMode:(_=t.renderMode)!==null&&_!==void 0?_:w.BillBoard,renderOrder:(S=t.renderOrder)!==null&&S!==void 0?S:0,material:t.material,uTileCount:(y=t.uTileCount)!==null&&y!==void 0?y:1,vTileCount:(M=t.vTileCount)!==null&&M!==void 0?M:1,blendTiles:(x=t.blendTiles)!==null&&x!==void 0?x:!1,softParticles:(O=t.softParticles)!==null&&O!==void 0?O:!1,softNearFade:(A=t.softNearFade)!==null&&A!==void 0?A:0,softFarFade:(P=t.softFarFade)!==null&&P!==void 0?P:0,layers:(N=t.layers)!==null&&N!==void 0?N:new Fe},this.neededToUpdateRender=!0,this.particles=new Array,this.startTileIndex=t.startTileIndex||new C(0),this.emitter=new $r(this),this.paused=!1,this.particleNum=0,this.emissionState={isBursting:!1,burstParticleIndex:0,burstParticleCount:0,burstIndex:0,burstWaveIndex:0,time:0,waitEmiting:0,travelDistance:0},this.emissionBursts.forEach(k=>k.count.startGen(this.memory)),this.emissionOverDistance.startGen(this.memory),this.emitEnded=!1,this.markForDestroy=!1,this.prewarmed=!1}pause(){this.paused=!0}play(){this.paused=!1}stop(){this.restart(),this.pause()}spawn(t,e,i){pi.setFromRotationMatrix(i);const s=Zr,r=pi,n=Wr;i.decompose(s,r,n);for(let a=0;a<t;a++){for(e.burstParticleIndex=a,this.particleNum++;this.particles.length<this.particleNum;)this.rendererSettings.renderMode===w.Trail?this.particles.push(new _i):this.particles.push(new Tr);const o=this.particles[this.particleNum-1];if(o.reset(),o.speedModifier=1,this.startColor.startGen(o.memory),this.startColor.genColor(o.memory,o.startColor,this.emissionState.time),o.color.copy(o.startColor),this.startSpeed.startGen(o.memory),o.startSpeed=this.startSpeed.genValue(o.memory,e.time/this.duration),this.startLife.startGen(o.memory),o.life=this.startLife.genValue(o.memory,e.time/this.duration),o.age=0,this.startSize.startGen(o.memory),this.startSize.type==="vec3function")this.startSize.genValue(o.memory,o.startSize,e.time/this.duration);else{const l=this.startSize.genValue(o.memory,e.time/this.duration);o.startSize.set(l,l,l)}if(this.startTileIndex.startGen(o.memory),o.uvTile=this.startTileIndex.genValue(o.memory),o.size.copy(o.startSize),this.rendererSettings.renderMode===w.Mesh||this.rendererSettings.renderMode===w.BillBoard||this.rendererSettings.renderMode===w.VerticalBillBoard||this.rendererSettings.renderMode===w.HorizontalBillBoard||this.rendererSettings.renderMode===w.StretchedBillBoard){const l=o;this.startRotation.startGen(o.memory),this.rendererSettings.renderMode===w.Mesh?(l.rotation instanceof L||(l.rotation=new L),this.startRotation.type==="rotation"?this.startRotation.genValue(o.memory,l.rotation,1,e.time/this.duration):l.rotation.setFromAxisAngle(Hr,this.startRotation.genValue(l.memory,e.time/this.duration))):this.startRotation.type==="rotation"?l.rotation=0:l.rotation=this.startRotation.genValue(l.memory,e.time/this.duration)}else if(this.rendererSettings.renderMode===w.Trail){const l=o;this.rendererEmitterSettings.startLength.startGen(l.memory),l.length=this.rendererEmitterSettings.startLength.genValue(l.memory,e.time/this.duration)}if(this.emitterShape.initialize(o,e),this.rendererSettings.renderMode===w.Trail&&this.rendererEmitterSettings.followLocalOrigin){const l=o;l.localPosition=new z().copy(l.position)}this.worldSpace?(o.position.applyMatrix4(i),o.startSize.multiply(n).abs(),o.size.copy(o.startSize),o.velocity.multiply(n).applyMatrix3(this.normalMatrix),o.rotation&&o.rotation instanceof L&&o.rotation.multiplyQuaternions(pi,o.rotation)):this.onlyUsedByOther&&(o.parentMatrix=i);for(let l=0;l<this.behaviors.length;l++)this.behaviors[l].initialize(o,this)}}endEmit(){this.emitEnded=!0,this.autoDestroy&&(this.markForDestroy=!0)}dispose(){this._renderer&&this._renderer.deleteSystem(this),this.emitter.dispose(),this.emitter.parent&&this.emitter.parent.remove(this.emitter)}restart(){this.memory.length=0,this.paused=!1,this.particleNum=0,this.emissionState.isBursting=!1,this.emissionState.burstIndex=0,this.emissionState.burstWaveIndex=0,this.emissionState.time=0,this.emissionState.waitEmiting=0,this.behaviors.forEach(t=>{t.reset()}),this.emitEnded=!1,this.markForDestroy=!1,this.prewarmed=!1,this.emissionBursts.forEach(t=>t.count.startGen(this.memory)),this.emissionOverDistance.startGen(this.memory)}update(t){if(this.paused)return;let e=this.emitter;for(;e.parent;)e=e.parent;if(e.type!=="Scene"){this.dispose();return}if(this.firstTimeUpdate&&(this.firstTimeUpdate=!1,this.emitter.updateWorldMatrix(!0,!1)),this.emitEnded&&this.particleNum===0){this.markForDestroy&&this.emitter.parent&&this.dispose();return}if(this.looping&&this.prewarm&&!this.prewarmed){this.prewarmed=!0;for(let i=0;i<this.duration*ki;i++)this.update(1/ki)}t>.1&&(t=.1),this.neededToUpdateRender&&(this._renderer&&this._renderer.updateSystem(this),this.neededToUpdateRender=!1),this.onlyUsedByOther||this.emit(t,this.emissionState,this.emitter.matrixWorld),this.emitterShape.update(this,t);for(let i=0;i<this.behaviors.length;i++){this.behaviors[i].frameUpdate(t);for(let s=0;s<this.particleNum;s++)this.particles[s].died||this.behaviors[i].update(this.particles[s],t)}for(let i=0;i<this.particleNum;i++)this.rendererEmitterSettings.followLocalOrigin&&this.particles[i].localPosition?(this.particles[i].position.copy(this.particles[i].localPosition),this.particles[i].parentMatrix?this.particles[i].position.applyMatrix4(this.particles[i].parentMatrix):this.particles[i].position.applyMatrix4(this.emitter.matrixWorld)):this.particles[i].position.addScaledVector(this.particles[i].velocity,t*this.particles[i].speedModifier),this.particles[i].age+=t;if(this.rendererSettings.renderMode===w.Trail)for(let i=0;i<this.particleNum;i++)this.particles[i].update();for(let i=0;i<this.particleNum;i++){const s=this.particles[i];s.died&&(!(s instanceof _i)||s.previous.length===0)&&(this.particles[i]=this.particles[this.particleNum-1],this.particles[this.particleNum-1]=s,this.particleNum--,i--)}}emit(t,e,i){e.time>this.duration&&(this.looping?(e.time-=this.duration,e.burstIndex=0,this.behaviors.forEach(r=>{r.reset()})):!this.emitEnded&&!this.onlyUsedByOther&&this.endEmit()),this.normalMatrix.getNormalMatrix(i);const s=Math.ceil(e.waitEmiting);for(this.spawn(s,e,i),e.waitEmiting-=s;e.burstIndex<this.emissionBursts.length&&this.emissionBursts[e.burstIndex].time<=e.time;){if(Math.random()<this.emissionBursts[e.burstIndex].probability){const r=this.emissionBursts[e.burstIndex].count.genValue(this.memory,this.time);e.isBursting=!0,e.burstParticleCount=r,this.spawn(r,e,i),e.isBursting=!1}e.burstIndex++}if(!this.emitEnded&&(e.waitEmiting+=t*this.emissionOverTime.genValue(this.memory,e.time/this.duration),e.previousWorldPos!=null)){this.temp.set(i.elements[12],i.elements[13],i.elements[14]),e.travelDistance+=e.previousWorldPos.distanceTo(this.temp);const r=this.emissionOverDistance.genValue(this.memory,e.time/this.duration);if(e.travelDistance*r>0){const n=Math.floor(e.travelDistance*r);e.travelDistance-=n/r,e.waitEmiting+=n}}e.previousWorldPos===void 0&&(e.previousWorldPos=new z),e.previousWorldPos.set(i.elements[12],i.elements[13],i.elements[14]),e.time+=t}toJSON(t,e={}){var i;if((t===void 0||typeof t=="string")&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}}),t.materials[this.rendererSettings.material.uuid]=this.rendererSettings.material.toJSON(t),e.useUrlForImage&&((i=this.texture)===null||i===void 0?void 0:i.source)!==void 0){const a=this.texture.source;t.images[a.uuid]={uuid:a.uuid,url:this.texture.image.url}}let r;this.renderMode===w.Trail?r={startLength:this.rendererEmitterSettings.startLength.toJSON(),followLocalOrigin:this.rendererEmitterSettings.followLocalOrigin}:this.renderMode===w.Mesh?r={}:this.renderMode===w.StretchedBillBoard?r={speedFactor:this.rendererEmitterSettings.speedFactor,lengthFactor:this.rendererEmitterSettings.lengthFactor}:r={};const n=this.rendererSettings.instancingGeometry;return t.geometries&&!t.geometries[n.uuid]&&(t.geometries[n.uuid]=n.toJSON()),{version:"3.0",autoDestroy:this.autoDestroy,looping:this.looping,prewarm:this.prewarm,duration:this.duration,shape:this.emitterShape.toJSON(),startLife:this.startLife.toJSON(),startSpeed:this.startSpeed.toJSON(),startRotation:this.startRotation.toJSON(),startSize:this.startSize.toJSON(),startColor:this.startColor.toJSON(),emissionOverTime:this.emissionOverTime.toJSON(),emissionOverDistance:this.emissionOverDistance.toJSON(),emissionBursts:this.emissionBursts.map(a=>({time:a.time,count:a.count.toJSON(),probability:a.probability,interval:a.interval,cycle:a.cycle})),onlyUsedByOther:this.onlyUsedByOther,instancingGeometry:this.rendererSettings.instancingGeometry.uuid,renderOrder:this.renderOrder,renderMode:this.renderMode,rendererEmitterSettings:r,material:this.rendererSettings.material.uuid,layers:this.layers.mask,startTileIndex:this.startTileIndex.toJSON(),uTileCount:this.uTileCount,vTileCount:this.vTileCount,blendTiles:this.blendTiles,softParticles:this.rendererSettings.softParticles,softFarFade:this.rendererSettings.softFarFade,softNearFade:this.rendererSettings.softNearFade,behaviors:this.behaviors.map(a=>a.toJSON()),worldSpace:this.worldSpace}}static fromJSON(t,e,i){var s,r;const n=zr(t.shape,e);let a;if(t.renderMode===w.Trail){const h=t.rendererEmitterSettings;a={startLength:h.startLength!=null?E(h.startLength):new C(30),followLocalOrigin:h.followLocalOrigin}}else t.renderMode===w.Mesh?a={}:t.renderMode===w.StretchedBillBoard?(a=t.rendererEmitterSettings,t.speedFactor!=null&&(a.speedFactor=t.speedFactor)):a={};const o=new Fe;t.layers&&(o.mask=t.layers);const l=new $e({autoDestroy:t.autoDestroy,looping:t.looping,prewarm:t.prewarm,duration:t.duration,shape:n,startLife:E(t.startLife),startSpeed:E(t.startSpeed),startRotation:qe(t.startRotation),startSize:qe(t.startSize),startColor:bi(t.startColor),emissionOverTime:E(t.emissionOverTime),emissionOverDistance:E(t.emissionOverDistance),emissionBursts:(s=t.emissionBursts)===null||s===void 0?void 0:s.map(h=>{var u,m,d;return{time:h.time,count:typeof h.count=="number"?new C(h.count):E(h.count),probability:(u=h.probability)!==null&&u!==void 0?u:1,interval:(m=h.interval)!==null&&m!==void 0?m:.1,cycle:(d=h.cycle)!==null&&d!==void 0?d:1}}),onlyUsedByOther:t.onlyUsedByOther,instancingGeometry:e.geometries[t.instancingGeometry],renderMode:t.renderMode,rendererEmitterSettings:a,renderOrder:t.renderOrder,layers:o,material:t.material?e.materials[t.material]:t.texture?new Je({map:e.textures[t.texture],transparent:(r=t.transparent)!==null&&r!==void 0?r:!0,blending:t.blending,side:gi}):new Je({color:16777215,transparent:!0,blending:wi,side:gi}),startTileIndex:typeof t.startTileIndex=="number"?new C(t.startTileIndex):E(t.startTileIndex),uTileCount:t.uTileCount,vTileCount:t.vTileCount,blendTiles:t.blendTiles,softParticles:t.softParticles,softFarFade:t.softFarFade,softNearFade:t.softNearFade,behaviors:[],worldSpace:t.worldSpace});return l.behaviors=t.behaviors.map(h=>{const u=kr(h,l);return u.type==="EmitSubParticleSystem"&&(i[h.subParticleSystem]=u),u}),l}addBehavior(t){this.behaviors.push(t)}getRendererSettings(){return this.rendererSettings}clone(){const t=[];for(const r of this.emissionBursts){const n={};Object.assign(n,r),t.push(n)}const e=[];for(const r of this.behaviors)e.push(r.clone());let i;this.renderMode===w.Trail?i={startLength:this.rendererEmitterSettings.startLength.clone(),followLocalOrigin:this.rendererEmitterSettings.followLocalOrigin}:i={};const s=new Fe;return s.mask=this.layers.mask,new $e({autoDestroy:this.autoDestroy,looping:this.looping,duration:this.duration,shape:this.emitterShape.clone(),startLife:this.startLife.clone(),startSpeed:this.startSpeed.clone(),startRotation:this.startRotation.clone(),startSize:this.startSize.clone(),startColor:this.startColor.clone(),emissionOverTime:this.emissionOverTime.clone(),emissionOverDistance:this.emissionOverDistance.clone(),emissionBursts:t,onlyUsedByOther:this.onlyUsedByOther,instancingGeometry:this.rendererSettings.instancingGeometry,renderMode:this.renderMode,renderOrder:this.renderOrder,rendererEmitterSettings:i,material:this.rendererSettings.material,startTileIndex:this.startTileIndex,uTileCount:this.uTileCount,vTileCount:this.vTileCount,blendTiles:this.blendTiles,softParticles:this.softParticles,softFarFade:this.softFarFade,softNearFade:this.softNearFade,behaviors:e,worldSpace:this.worldSpace,layers:s})}}var yi=`

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
`,Ti=`
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
}`,Kr=`
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
`,jr=`
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
`,Oi=`
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
`,tn=`
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
`;function Mi(c){return c===0?"uv":`uv${c}`}class en extends _s{constructor(t){super(t)}onBeforeCompile(t,e){super.onBeforeCompile(t,e),t.vertexShader=Oi,t.fragmentShader=Ti}}class sn extends Ss{constructor(t){super(t)}onBeforeCompile(t,e){super.onBeforeCompile(t,e),t.vertexShader=Oi,t.fragmentShader=Ti}}new z(0,0,1);class rn extends ts{constructor(t){super(t),this.vector_=new z,this.vector2_=new z,this.vector3_=new z,this.quaternion_=new L,this.quaternion2_=new L,this.quaternion3_=new L,this.rotationMat_=new pt,this.rotationMat2_=new pt,this.maxParticles=1e3,this.setupBuffers(),this.rebuildMaterial()}buildExpandableBuffers(){this.offsetBuffer=new Et(new Float32Array(this.maxParticles*3),3),this.offsetBuffer.setUsage(j),this.geometry.setAttribute("offset",this.offsetBuffer),this.colorBuffer=new Et(new Float32Array(this.maxParticles*4),4),this.colorBuffer.setUsage(j),this.geometry.setAttribute("color",this.colorBuffer),this.settings.renderMode===w.Mesh?(this.rotationBuffer=new Et(new Float32Array(this.maxParticles*4),4),this.rotationBuffer.setUsage(j),this.geometry.setAttribute("rotation",this.rotationBuffer)):(this.settings.renderMode===w.BillBoard||this.settings.renderMode===w.HorizontalBillBoard||this.settings.renderMode===w.VerticalBillBoard||this.settings.renderMode===w.StretchedBillBoard)&&(this.rotationBuffer=new Et(new Float32Array(this.maxParticles),1),this.rotationBuffer.setUsage(j),this.geometry.setAttribute("rotation",this.rotationBuffer)),this.sizeBuffer=new Et(new Float32Array(this.maxParticles*3),3),this.sizeBuffer.setUsage(j),this.geometry.setAttribute("size",this.sizeBuffer),this.uvTileBuffer=new Et(new Float32Array(this.maxParticles),1),this.uvTileBuffer.setUsage(j),this.geometry.setAttribute("uvTile",this.uvTileBuffer),this.settings.renderMode===w.StretchedBillBoard&&(this.velocityBuffer=new Et(new Float32Array(this.maxParticles*4),4),this.velocityBuffer.setUsage(j),this.geometry.setAttribute("velocity",this.velocityBuffer))}setupBuffers(){this.geometry&&this.geometry.dispose(),this.geometry=new xs,this.geometry.setIndex(this.settings.instancingGeometry.getIndex()),this.settings.instancingGeometry.hasAttribute("normal")&&this.geometry.setAttribute("normal",this.settings.instancingGeometry.getAttribute("normal")),this.geometry.setAttribute("position",this.settings.instancingGeometry.getAttribute("position")),this.geometry.setAttribute("uv",this.settings.instancingGeometry.getAttribute("uv")),this.buildExpandableBuffers()}expandBuffers(t){for(;t>=this.maxParticles;)this.maxParticles*=2;this.setupBuffers()}rebuildMaterial(){this.layers.mask=this.settings.layers.mask;const t={},e={};this.settings.material.type!=="MeshStandardMaterial"&&this.settings.material.type!=="MeshPhysicalMaterial"&&(t.map=new lt(this.settings.material.map)),this.settings.material.alphaTest&&(e.USE_ALPHATEST="",t.alphaTest=new lt(this.settings.material.alphaTest)),e.USE_UV="";const i=this.settings.uTileCount,s=this.settings.vTileCount;(i>1||s>1)&&(e.UV_TILE="",t.tileCount=new lt(new Dt(i,s))),this.settings.material.defines&&this.settings.material.defines.USE_COLOR_AS_ALPHA!==void 0&&(e.USE_COLOR_AS_ALPHA=""),this.settings.material.normalMap&&(e.USE_NORMALMAP="",e.NORMALMAP_UV=Mi(this.settings.material.normalMap.channel),t.normalMapTransform=new lt(new pt().copy(this.settings.material.normalMap.matrix))),this.settings.material.map&&(e.USE_MAP="",this.settings.blendTiles&&(e.TILE_BLEND=""),e.MAP_UV=Mi(this.settings.material.map.channel),t.mapTransform=new lt(new pt().copy(this.settings.material.map.matrix))),e.USE_COLOR_ALPHA="";let r;if(this.settings.softParticles){e.SOFT_PARTICLES="";const a=this.settings.softNearFade,o=1/(this.settings.softFarFade-this.settings.softNearFade);t.softParams=new lt(new Dt(a,o)),t.depthTexture=new lt(null);const l=t.projParams=new lt(new et);r=(h,u,m)=>{l.value.set(m.near,m.far,0,0)}}let n=!1;if(this.settings.renderMode===w.BillBoard||this.settings.renderMode===w.VerticalBillBoard||this.settings.renderMode===w.HorizontalBillBoard||this.settings.renderMode===w.Mesh){let a,o;this.settings.renderMode===w.Mesh?this.settings.material.type==="MeshStandardMaterial"||this.settings.material.type==="MeshPhysicalMaterial"?(e.USE_COLOR="",a=Oi,o=Ti,n=!0):(a=jr,o=yi):(a=Kr,o=yi),this.settings.renderMode===w.VerticalBillBoard?e.VERTICAL="":this.settings.renderMode===w.HorizontalBillBoard&&(e.HORIZONTAL="");let l=!1;this.settings.renderMode===w.Mesh&&(this.settings.material.type==="MeshStandardMaterial"?(this.material=new en({}),this.material.copy(this.settings.material),this.material.uniforms=t,this.material.defines=e,l=!0):this.settings.material.type==="MeshPhysicalMaterial"&&(this.material=new sn({}),this.material.copy(this.settings.material),this.material.uniforms=t,this.material.defines=e,l=!0)),l||(this.material=new vi({uniforms:t,defines:e,vertexShader:a,fragmentShader:o,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,blending:this.settings.material.blending,side:this.settings.material.side,alphaTest:this.settings.material.alphaTest,depthTest:this.settings.material.depthTest,lights:n}))}else if(this.settings.renderMode===w.StretchedBillBoard)t.speedFactor=new lt(1),this.material=new vi({uniforms:t,defines:e,vertexShader:tn,fragmentShader:yi,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,blending:this.settings.material.blending,side:this.settings.material.side,alphaTest:this.settings.material.alphaTest,depthTest:this.settings.material.depthTest});else throw new Error("render mode unavailable");this.material&&r&&(this.material.onBeforeRender=r)}update(){let t=0,e=0;this.systems.forEach(i=>{e+=i.particleNum}),e>this.maxParticles&&this.expandBuffers(e),this.systems.forEach(i=>{const s=i.particles,r=i.particleNum,n=this.quaternion2_,a=this.vector2_,o=this.vector3_;i.emitter.matrixWorld.decompose(a,n,o),this.rotationMat_.setFromMatrix4(i.emitter.matrixWorld);for(let l=0;l<r;l++,t++){const h=s[l];if(this.settings.renderMode===w.Mesh){let m;if(i.worldSpace)m=h.rotation;else{let d;h.parentMatrix?d=this.quaternion3_.setFromRotationMatrix(h.parentMatrix):d=n,m=this.quaternion_,m.copy(d).multiply(h.rotation)}this.rotationBuffer.setXYZW(t,m.x,m.y,m.z,m.w)}else(this.settings.renderMode===w.StretchedBillBoard||this.settings.renderMode===w.VerticalBillBoard||this.settings.renderMode===w.HorizontalBillBoard||this.settings.renderMode===w.BillBoard)&&this.rotationBuffer.setX(t,h.rotation);let u;if(i.worldSpace?u=h.position:(u=this.vector_,h.parentMatrix?u.copy(h.position).applyMatrix4(h.parentMatrix):u.copy(h.position).applyMatrix4(i.emitter.matrixWorld)),this.offsetBuffer.setXYZ(t,u.x,u.y,u.z),this.colorBuffer.setXYZW(t,h.color.x,h.color.y,h.color.z,h.color.w),i.worldSpace?this.sizeBuffer.setXYZ(t,h.size.x,h.size.y,h.size.z):h.parentMatrix?this.sizeBuffer.setXYZ(t,h.size.x,h.size.y,h.size.z):this.sizeBuffer.setXYZ(t,h.size.x*Math.abs(o.x),h.size.y*Math.abs(o.y),h.size.z*Math.abs(o.z)),this.uvTileBuffer.setX(t,h.uvTile),this.settings.renderMode===w.StretchedBillBoard&&this.velocityBuffer){let m=i.rendererEmitterSettings.speedFactor;m===0&&(m=.001);const d=i.rendererEmitterSettings.lengthFactor;let f;i.worldSpace?f=h.velocity:(f=this.vector_,h.parentMatrix?(this.rotationMat2_.setFromMatrix4(h.parentMatrix),f.copy(h.velocity).applyMatrix3(this.rotationMat2_)):f.copy(h.velocity).applyMatrix3(this.rotationMat_)),this.velocityBuffer.setXYZW(t,f.x*m,f.y*m,f.z*m,d)}}}),this.geometry.instanceCount=t,t>0&&(this.offsetBuffer.clearUpdateRanges(),this.offsetBuffer.addUpdateRange(0,t*3),this.offsetBuffer.needsUpdate=!0,this.sizeBuffer.clearUpdateRanges(),this.sizeBuffer.addUpdateRange(0,t*3),this.sizeBuffer.needsUpdate=!0,this.colorBuffer.clearUpdateRanges(),this.colorBuffer.addUpdateRange(0,t*4),this.colorBuffer.needsUpdate=!0,this.uvTileBuffer.clearUpdateRanges(),this.uvTileBuffer.addUpdateRange(0,t),this.uvTileBuffer.needsUpdate=!0,this.settings.renderMode===w.StretchedBillBoard&&this.velocityBuffer&&(this.velocityBuffer.clearUpdateRanges(),this.velocityBuffer.addUpdateRange(0,t*4),this.velocityBuffer.needsUpdate=!0),this.settings.renderMode===w.Mesh?(this.rotationBuffer.clearUpdateRanges(),this.rotationBuffer.addUpdateRange(0,t*4),this.rotationBuffer.needsUpdate=!0):(this.settings.renderMode===w.StretchedBillBoard||this.settings.renderMode===w.HorizontalBillBoard||this.settings.renderMode===w.VerticalBillBoard||this.settings.renderMode===w.BillBoard)&&(this.rotationBuffer.clearUpdateRanges(),this.rotationBuffer.addUpdateRange(0,t),this.rotationBuffer.needsUpdate=!0))}dispose(){this.geometry.dispose()}}var nn=`

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
}`,on=`
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
}`;new z(0,0,1);class an extends ts{constructor(t){super(t),this.vector_=new z,this.vector2_=new z,this.vector3_=new z,this.quaternion_=new L,this.maxParticles=1e4,this.setupBuffers(),this.rebuildMaterial()}setupBuffers(){this.geometry&&this.geometry.dispose(),this.geometry=new Fi,this.indexBuffer=new zt(new Uint32Array(this.maxParticles*6),1),this.indexBuffer.setUsage(j),this.geometry.setIndex(this.indexBuffer),this.positionBuffer=new zt(new Float32Array(this.maxParticles*6),3),this.positionBuffer.setUsage(j),this.geometry.setAttribute("position",this.positionBuffer),this.previousBuffer=new zt(new Float32Array(this.maxParticles*6),3),this.previousBuffer.setUsage(j),this.geometry.setAttribute("previous",this.previousBuffer),this.nextBuffer=new zt(new Float32Array(this.maxParticles*6),3),this.nextBuffer.setUsage(j),this.geometry.setAttribute("next",this.nextBuffer),this.widthBuffer=new zt(new Float32Array(this.maxParticles*2),1),this.widthBuffer.setUsage(j),this.geometry.setAttribute("width",this.widthBuffer),this.sideBuffer=new zt(new Float32Array(this.maxParticles*2),1),this.sideBuffer.setUsage(j),this.geometry.setAttribute("side",this.sideBuffer),this.uvBuffer=new zt(new Float32Array(this.maxParticles*4),2),this.uvBuffer.setUsage(j),this.geometry.setAttribute("uv",this.uvBuffer),this.colorBuffer=new zt(new Float32Array(this.maxParticles*8),4),this.colorBuffer.setUsage(j),this.geometry.setAttribute("color",this.colorBuffer)}expandBuffers(t){for(;t>=this.maxParticles;)this.maxParticles*=2;this.setupBuffers()}rebuildMaterial(){this.layers.mask=this.settings.layers.mask;const t={lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},resolution:{value:new Dt(1,1)},sizeAttenuation:{value:1},visibility:{value:1},alphaTest:{value:0}},e={};if(e.USE_UV="",e.USE_COLOR_ALPHA="",this.settings.material.map&&(e.USE_MAP="",e.MAP_UV=Mi(this.settings.material.map.channel),t.map=new lt(this.settings.material.map),t.mapTransform=new lt(new pt().copy(this.settings.material.map.matrix))),this.settings.material.defines&&this.settings.material.defines.USE_COLOR_AS_ALPHA!==void 0&&(e.USE_COLOR_AS_ALPHA=""),this.settings.renderMode===w.Trail)this.material=new vi({uniforms:t,defines:e,vertexShader:on,fragmentShader:nn,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,side:this.settings.material.side,blending:this.settings.material.blending||wi});else throw new Error("render mode unavailable")}update(){let t=0,e=0,i=0;this.systems.forEach(s=>{for(let r=0;r<s.particleNum;r++)i+=s.particles[r].previous.length*2}),i>this.maxParticles&&this.expandBuffers(i),this.systems.forEach(s=>{const r=this.quaternion_,n=this.vector2_,a=this.vector3_;s.emitter.matrixWorld.decompose(n,r,a);const o=s.particles,l=s.particleNum,h=this.settings.uTileCount,u=this.settings.vTileCount,m=1/h,d=1/u;for(let f=0;f<l;f++){const p=o[f],v=p.uvTile%u,g=Math.floor(p.uvTile/u+.001),b=p.previous.values();let _=b.next(),S=_.value,y=S;_.done||(_=b.next());let M;_.value!==void 0?M=_.value:M=y;for(let x=0;x<p.previous.length;x++,t+=2){if(this.positionBuffer.setXYZ(t,y.position.x,y.position.y,y.position.z),this.positionBuffer.setXYZ(t+1,y.position.x,y.position.y,y.position.z),s.worldSpace?(this.positionBuffer.setXYZ(t,y.position.x,y.position.y,y.position.z),this.positionBuffer.setXYZ(t+1,y.position.x,y.position.y,y.position.z)):(p.parentMatrix?this.vector_.copy(y.position).applyMatrix4(p.parentMatrix):this.vector_.copy(y.position).applyMatrix4(s.emitter.matrixWorld),this.positionBuffer.setXYZ(t,this.vector_.x,this.vector_.y,this.vector_.z),this.positionBuffer.setXYZ(t+1,this.vector_.x,this.vector_.y,this.vector_.z)),s.worldSpace?(this.previousBuffer.setXYZ(t,S.position.x,S.position.y,S.position.z),this.previousBuffer.setXYZ(t+1,S.position.x,S.position.y,S.position.z)):(p.parentMatrix?this.vector_.copy(S.position).applyMatrix4(p.parentMatrix):this.vector_.copy(S.position).applyMatrix4(s.emitter.matrixWorld),this.previousBuffer.setXYZ(t,this.vector_.x,this.vector_.y,this.vector_.z),this.previousBuffer.setXYZ(t+1,this.vector_.x,this.vector_.y,this.vector_.z)),s.worldSpace?(this.nextBuffer.setXYZ(t,M.position.x,M.position.y,M.position.z),this.nextBuffer.setXYZ(t+1,M.position.x,M.position.y,M.position.z)):(p.parentMatrix?this.vector_.copy(M.position).applyMatrix4(p.parentMatrix):this.vector_.copy(M.position).applyMatrix4(s.emitter.matrixWorld),this.nextBuffer.setXYZ(t,this.vector_.x,this.vector_.y,this.vector_.z),this.nextBuffer.setXYZ(t+1,this.vector_.x,this.vector_.y,this.vector_.z)),this.sideBuffer.setX(t,-1),this.sideBuffer.setX(t+1,1),s.worldSpace)this.widthBuffer.setX(t,y.size),this.widthBuffer.setX(t+1,y.size);else if(p.parentMatrix)this.widthBuffer.setX(t,y.size),this.widthBuffer.setX(t+1,y.size);else{const O=(Math.abs(a.x)+Math.abs(a.y)+Math.abs(a.z))/3;this.widthBuffer.setX(t,y.size*O),this.widthBuffer.setX(t+1,y.size*O)}this.uvBuffer.setXY(t,(x/p.previous.length+v)*m,(u-g-1)*d),this.uvBuffer.setXY(t+1,(x/p.previous.length+v)*m,(u-g)*d),this.colorBuffer.setXYZW(t,y.color.x,y.color.y,y.color.z,y.color.w),this.colorBuffer.setXYZW(t+1,y.color.x,y.color.y,y.color.z,y.color.w),x+1<p.previous.length&&(this.indexBuffer.setX(e*3,t),this.indexBuffer.setX(e*3+1,t+1),this.indexBuffer.setX(e*3+2,t+2),e++,this.indexBuffer.setX(e*3,t+2),this.indexBuffer.setX(e*3+1,t+1),this.indexBuffer.setX(e*3+2,t+3),e++),S=y,y=M,_.done||(_=b.next(),_.value!==void 0&&(M=_.value))}}}),this.positionBuffer.clearUpdateRanges(),this.positionBuffer.addUpdateRange(0,t*3),this.positionBuffer.needsUpdate=!0,this.previousBuffer.clearUpdateRanges(),this.previousBuffer.addUpdateRange(0,t*3),this.previousBuffer.needsUpdate=!0,this.nextBuffer.clearUpdateRanges(),this.nextBuffer.addUpdateRange(0,t*3),this.nextBuffer.needsUpdate=!0,this.sideBuffer.clearUpdateRanges(),this.sideBuffer.addUpdateRange(0,t),this.sideBuffer.needsUpdate=!0,this.widthBuffer.clearUpdateRanges(),this.widthBuffer.addUpdateRange(0,t),this.widthBuffer.needsUpdate=!0,this.uvBuffer.clearUpdateRanges(),this.uvBuffer.addUpdateRange(0,t*2),this.uvBuffer.needsUpdate=!0,this.colorBuffer.clearUpdateRanges(),this.colorBuffer.addUpdateRange(0,t*4),this.colorBuffer.needsUpdate=!0,this.indexBuffer.clearUpdateRanges(),this.indexBuffer.addUpdateRange(0,e*3),this.indexBuffer.needsUpdate=!0,this.geometry.setDrawRange(0,e*3)}dispose(){this.geometry.dispose()}}class Ae{get geometry(){return this._geometry}set geometry(t){if(this._geometry=t,t===void 0||typeof t=="string")return;const e=new Ms;this._triangleIndexToArea.length=0;let i=0;if(!t.getIndex())return;const s=t.getIndex().array,r=s.length/3;this._triangleIndexToArea.push(0);for(let n=0;n<r;n++)e.setFromAttributeAndIndices(t.getAttribute("position"),s[n*3],s[n*3+1],s[n*3+2]),i+=e.getArea(),this._triangleIndexToArea.push(i);t.userData.triangleIndexToArea=this._triangleIndexToArea}constructor(t){this.type="mesh_surface",this._triangleIndexToArea=[],this._tempA=new ct,this._tempB=new ct,this._tempC=new ct,t&&(this.geometry=t)}initialize(t){const e=this._geometry;if(!e||e.getIndex()===null){t.position.set(0,0,0),t.velocity.set(0,0,1).multiplyScalar(t.startSpeed);return}const i=this._triangleIndexToArea.length-1;let s=0,r=i;const n=Math.random()*this._triangleIndexToArea[i];for(;s+1<r;){const d=Math.floor((s+r)/2);n<this._triangleIndexToArea[d]?r=d:s=d}let a=Math.random(),o=Math.random();a+o>1&&(a=1-a,o=1-o);const l=e.getIndex().array[s*3],h=e.getIndex().array[s*3+1],u=e.getIndex().array[s*3+2],m=e.getAttribute("position");this._tempA.fromBufferAttribute(m,l),this._tempB.fromBufferAttribute(m,h),this._tempC.fromBufferAttribute(m,u),this._tempB.sub(this._tempA),this._tempC.sub(this._tempA),this._tempA.addScaledVector(this._tempB,a).addScaledVector(this._tempC,o),t.position.copy(this._tempA),this._tempA.copy(this._tempB).cross(this._tempC).normalize(),t.velocity.copy(this._tempA).normalize().multiplyScalar(t.startSpeed)}toJSON(){return{type:"mesh_surface",mesh:this._geometry?this._geometry.uuid:""}}static fromJSON(t,e){return new Ae(e.geometries[t.geometry])}clone(){return new Ae(this._geometry)}update(t,e){}}Ir({id:"three.quarks",emitterShapes:[{type:"mesh_surface",params:[["geometry",["geometry"]]],constructor:Ae,loadJSON:Ae.fromJSON}],behaviors:[]});let hn=class es extends Di{constructor(){super(),this.batches=[],this.systemToBatchIndex=new Map,this.type="BatchedRenderer",this.depthTexture=null}static equals(t,e){return t.material.side===e.material.side&&t.material.blending===e.material.blending&&t.material.transparent===e.material.transparent&&t.material.depthTest===e.material.depthTest&&t.material.type===e.material.type&&t.material.alphaTest===e.material.alphaTest&&t.material.map===e.material.map&&t.renderMode===e.renderMode&&t.blendTiles===e.blendTiles&&t.softParticles===e.softParticles&&t.softFarFade===e.softFarFade&&t.softNearFade===e.softNearFade&&t.uTileCount===e.uTileCount&&t.vTileCount===e.vTileCount&&t.instancingGeometry===e.instancingGeometry&&t.renderOrder===e.renderOrder&&t.layers.mask===e.layers.mask}addSystem(t){t._renderer=this;const e=t.getRendererSettings();for(let s=0;s<this.batches.length;s++)if(es.equals(this.batches[s].settings,e)){this.batches[s].addSystem(t),this.systemToBatchIndex.set(t,s);return}let i;switch(e.renderMode){case w.Trail:i=new an(e);break;case w.Mesh:case w.BillBoard:case w.VerticalBillBoard:case w.HorizontalBillBoard:case w.StretchedBillBoard:i=new rn(e);break}this.depthTexture&&i.applyDepthTexture(this.depthTexture),i.addSystem(t),this.batches.push(i),this.systemToBatchIndex.set(t,this.batches.length-1),this.add(i)}deleteSystem(t){const e=this.systemToBatchIndex.get(t);e!=null&&(this.batches[e].removeSystem(t),this.systemToBatchIndex.delete(t))}setDepthTexture(t){this.depthTexture=t;for(const e of this.batches)e.applyDepthTexture(t)}updateSystem(t){this.deleteSystem(t),this.addSystem(t)}update(t){this.systemToBatchIndex.forEach((e,i)=>{i.update(t)});for(let e=0;e<this.batches.length;e++)this.batches[e].update()}};qr();console.log("%c Particle system powered by three.quarks. https://quarks.art/","font-size: 14px; font-weight: bold;");const ln="/_astro/fire3.lFy7OwnQ.png",cn="/_astro/smoke.DKJcQUg-.png",is=()=>Ls("quarks-renderer",()=>{console.log("RENDERER");const{autoRenderTask:c,scene:t}=Gi(),e=new hn;return t.add(e),Ee(i=>{e.update(i)},{before:c}),{renderer:e}});function Ri(c,t){yt(t,!0);const e=()=>Is(o,"$parent",i),[i,s]=Fs();let r=Ot(t,"system",15),n=ks(t,["$$slots","$$events","$$legacy","name","children","system"]);const{renderer:a}=is();r(new $e({...n}));const o=ws();Ie(()=>(Pi(e(),"Object3D")&&e().add(r().emitter),()=>{Pi(e(),"Object3D")&&e().remove(r().emitter)})),Ie(()=>{t.name&&r(r().emitter.name=t.name,!0)}),Ie(()=>(a.addSystem(r()),()=>{a.deleteSystem(r())}));var l=ut(),h=R(l);Ze(h,()=>t.children??Ve,()=>({system:r()})),B(c,l),gt(),s()}function Ii(c,t){yt(t,!0);let e=Ot(t,"system",7);const i=e().emissionOverTime,s=new C(0);ds(()=>{t.active?e().emissionOverTime=i:e().emissionOverTime=s}),gt()}var un=q("<!> <!>",1);function dn(c,t){yt(t,!0);const e=(n,a,o)=>[n/255,a/255,o/255],i=n=>{n=n.replace(/^#/,"");const a=parseInt(n,16),o=a>>16&255,l=a>>8&255,h=a&255;return[o/255,l/255,h/255]};var s=ut(),r=R(s);Rs(r,()=>As([cn,ln]),null,(n,a)=>{var o=I(()=>{var[d,f]=T(a);return{smokeMap:d,fireMap:f}}),l=I(()=>T(o).smokeMap),h=I(()=>T(o).fireMap),u=ut(),m=R(u);{let d=I(()=>90*Ct);D(m,()=>U.Group,(f,p)=>{p(f,{get"rotation.x"(){return T(d)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Thruster.svelte",index:0},children:(v,g)=>{var b=un(),_=R(b);{const y=(W,Q)=>{let K=()=>Q?.().system;Ii(W,{get system(){return K()},get active(){return t.active}})};let M=I(()=>new Je({map:T(l),transparent:!0})),x=I(()=>new st(1,3)),O=I(()=>new C(2)),A=I(()=>new st(.2,.4)),P=I(()=>new st(0,360*Ct)),N=I(()=>new Nt(new et(1,1,1,1))),k=I(()=>new C(200)),G=I(()=>new Rt({radius:.05,angle:10*Ct})),X=I(()=>[new It(new St([[new z(...i("#493B32")),0],[new z(...e(38,38,38)),.2],[new z(1,1,1),1]],[[1,0],[0,1]])),new Ft(new Bt([[new _t(1,1.1,2.1,5),0]]))]);Ri(_,{get material(){return T(M)},duration:1,looping:!0,get startLife(){return T(x)},get startSpeed(){return T(O)},get startSize(){return T(A)},get startRotation(){return T(P)},get startColor(){return T(N)},worldSpace:!0,get emissionOverTime(){return T(k)},get shape(){return T(G)},uTileCount:1,vTileCount:1,get renderMode(){return w.BillBoard},rendererEmitterSettings:{followLocalOrigin:!0},get behaviors(){return T(X)},children:y,$$slots:{default:!0}})}var S=F(_,2);{const y=(W,Q)=>{let K=()=>Q?.().system;Ii(W,{get system(){return K()},get active(){return t.active}})};let M=I(()=>new Je({map:T(h),transparent:!0,blending:wi})),x=I(()=>new st(.2,.4)),O=I(()=>new C(2)),A=I(()=>new st(.2,.3)),P=I(()=>new st(0,360*Ct)),N=I(()=>new Nt(new et(...i("#FFFFFF"),1))),k=I(()=>new C(150)),G=I(()=>new Rt({radius:.05,angle:10*Ct})),X=I(()=>[new It(new St([[new z(...i("#FFFFFF")),0],[new z(...i("#FFFFFF")),1]],[[1,0],[0,1]])),new Ft(new Bt([[new _t(1,1.1,1.2,3),0]]))]);Ri(S,{get material(){return T(M)},duration:1,looping:!0,get startLife(){return T(x)},get startSpeed(){return T(O)},get startSize(){return T(A)},get startRotation(){return T(P)},get startColor(){return T(N)},worldSpace:!0,get emissionOverTime(){return T(k)},get shape(){return T(G)},uTileCount:1,vTileCount:1,get renderMode(){return w.BillBoard},rendererEmitterSettings:{followLocalOrigin:!0},get behaviors(){return T(X)},children:y,$$slots:{default:!0}})}B(v,b)},$$slots:{default:!0}})})}B(n,u)}),B(c,s),gt()}var mn=q("<!> <!>",1),fn=q("<!> <!> <!> <!>",1);function pn(c,t){let e=ie("left");const i=r=>s.find(n=>n.key===r);let s=ms([]);De("keydown",Le,r=>{const n=r.key;if(i(n)||!n.match(/^[a-z]$/)||r.ctrlKey||r.shiftKey||r.altKey||r.metaKey)return;const a={side:T(e),key:n,active:!1};s.push(a),Ut(e,T(e)==="left"?"right":"left",!0)}),De("keyup",Le,r=>{const n=r.key,a=i(n);a&&(a.active=!0)}),Ts(c,{canSleep:!1,linearDamping:.4,angularDamping:5,enabledRotations:[!1,!1,!0],type:"dynamic",children:(n,a)=>{let o=()=>a?.().rigidBody;var l=fn(),h=R(l);Ze(h,()=>t.children??Ve);var u=F(h,2);{var m=p=>{Gs(p,{get rigidBody(){return o()},linearMax:1e-5,angularMax:1e-5,get onstatic(){return t.onsleep}})};Yi(u,p=>{t.checkIsStatic&&p(m)})}var d=F(u,2);$i(d,17,()=>s,Hi,(p,v)=>{{const g=(S,y=Ve)=>{dn(S,{get active(){return y()}})};let b=I(()=>T(v).side==="left"?-.5:.25),_=I(()=>T(v).side==="left"?-.25:.5);Ks(p,{get rigidBody(){return o()},get key(){return T(v).key},get min(){return T(b)},get max(){return T(_)},get active(){return T(v).active},children:g,$$slots:{default:!0}})}});var f=F(d,2);He(f,{children:(p,v)=>{var g=ut(),b=R(g);D(b,()=>U.Mesh,(_,S)=>{S(_,{castShadow:!0,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Rocket.svelte",index:0},children:(y,M)=>{var x=mn(),O=R(x);D(O,()=>U.MeshStandardMaterial,(P,N)=>{N(P,{color:"red",transparent:!0,opacity:.4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Rocket.svelte",index:1}})});var A=F(O,2);D(A,()=>U.BoxGeometry,(P,N)=>{N(P,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Rocket.svelte",index:2}})}),B(y,x)},$$slots:{default:!0}})}),B(p,g)},$$slots:{default:!0}}),B(n,l)},$$slots:{default:!0}})}var yn=q("<!> <!>",1),gn=q("<!> <!>",1);function vn(c,t){var e=ut(),i=R(e);D(i,()=>U.Group,(s,r)=>{r(s,{get position(){return t.position},get rotation(){return t.rotation},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Start.svelte",index:0},children:(n,a)=>{var o=gn(),l=R(o);Ze(l,()=>t.children);var h=F(l,2);He(h,{children:(u,m)=>{var d=ut(),f=R(d);D(f,()=>U.Mesh,(p,v)=>{v(p,{position:[0,-1.1,0],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Start.svelte",index:1},children:(g,b)=>{var _=yn(),S=R(_);D(S,()=>U.BoxGeometry,(M,x)=>{x(M,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Start.svelte",index:2}})});var y=F(S,2);D(y,()=>U.MeshStandardMaterial,(M,x)=>{x(M,{color:"red",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Start.svelte",index:3}})}),B(g,_)},$$slots:{default:!0}})}),B(u,d)},$$slots:{default:!0}}),B(n,o)},$$slots:{default:!0}})}),B(c,e)}var xn=q("<!> <!>",1);function _n(c,t){yt(t,!1);const e=new ct;let i=!1,s=new Vi,r=new zs;Ee(()=>{s.getWorldPosition(e),e.z=r.position.z,i?r.position.lerp(e,.05):(i=!0,r.position.copy(e))}),zi();var n=xn(),a=R(n);U(a,{get is(){return s},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/FollowCamera.svelte",index:0}});var o=F(a,2);qi(o,{id:"scene",children:(l,h)=>{U(l,{get is(){return r},makeDefault:!0,position:[0,0,10],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/FollowCamera.svelte",index:1}})},$$slots:{default:!0}}),B(c,n),gt()}var Sn=q("<!> <!>",1),Mn=q("<!> <!> <!> <!> <!>",1);function wn(c,t){yt(t,!0);let e=ie(!1),i=ie(!1);Ie(()=>{T(e)&&T(i)&&t.levelcomplete()});var s=Mn(),r=R(s);vn(r,{get position(){return t.level.start.position},get rotation(){return t.level.start.rotation},children:(h,u)=>{pn(h,{get checkIsStatic(){return T(e)},onsleep:()=>Ut(i,!0),children:d=>{_n(d,{})}})}});var n=F(r,2);Ds(n,{get position(){return t.level.goal.position},get rotation(){return t.level.goal.rotation},ongoal:()=>{Ut(e,!0)}});var a=F(n,2);$i(a,17,()=>t.level.blocks,Hi,(h,u)=>{var m=ut(),d=R(m);D(d,()=>U.Group,(f,p)=>{p(f,{get position(){return T(u).position},get rotation(){return T(u).rotation},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:0},children:(v,g)=>{He(v,{children:(b,_)=>{var S=ut(),y=R(S);D(y,()=>U.Mesh,(M,x)=>{x(M,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:1},children:(O,A)=>{var P=Sn(),N=R(P);D(N,()=>U.BoxGeometry,(G,X)=>{X(G,{args:[1,1,1],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:2}})});var k=F(N,2);D(k,()=>U.MeshStandardMaterial,(G,X)=>{X(G,{color:"blue",transparent:!0,opacity:.4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:3}})}),B(O,P)},$$slots:{default:!0}})}),B(b,S)},$$slots:{default:!0}})},$$slots:{default:!0}})}),B(h,m)});var o=F(a,2);D(o,()=>U.AmbientLight,(h,u)=>{u(h,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:4}})});var l=F(o,2);D(l,()=>U.DirectionalLight,(h,u)=>{u(h,{position:[4,10,0],castShadow:!0,"shadow.mapSize":1024,"shadow.camera.left":-10,"shadow.camera.right":10,"shadow.camera.top":10,"shadow.camera.bottom":-10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/rapier/rocketry/Level.svelte",index:5}})}),B(c,s),gt()}class ss{constructor(t,e,i){this.type=t,this.position=e,this.rotation=i}}class rs{constructor(t,e){this.position=t,this.rotation=e}}class ns{constructor(t,e){this.position=t,this.rotation=e}}class os{constructor(t,e,i){this.start=t,this.goal=e,this.blocks=i}}const zn=new os(new rs([0,-1,0],[0,0,0]),new ns([3,0,0],[0,0,0]),[new ss("Box",[-3,0,0],[0,0,0])]),bn=new os(new rs([0,-2,0],[0,0,0]),new ns([2,0,0],[0,0,0]),[new ss("Box",[-2,0,0],[0,0,0])]);var Tn=q("<!> <!> <!>",1);function On(c,t){yt(t,!0);const e=[zn,bn];let i=ie(0);const s=I(()=>e[T(i)]),r=()=>{T(i)<e.length-1&&Ut(i,T(i)+1)},{scene:n}=Gi();n.background=new bs("black");var a=Tn(),o=R(a);Cs(o,{id:"scene"});var l=F(o,2);Ns(l,()=>T(i),u=>{var m=ut(),d=R(m);{var f=p=>{wn(p,{get level(){return T(s)},levelcomplete:r})};Yi(d,p=>{T(s)&&p(f)})}B(u,m)});var h=F(l,2);Es(h,{}),B(c,a),gt()}function Pn(c,t){yt(t,!1),is(),zi(),gt()}var Nn=q("<!> <!> <!>",1),An=q('<main class="svelte-1e2szb4"><!></main>');function vo(c){var t=An(),e=fs(t);ys(e,{children:(i,s)=>{Os(i,{gravity:[0,-1,0],framerate:120,children:(r,n)=>{var a=Nn(),o=R(a);Ps(o,{});var l=F(o,2);Pn(l,{});var h=F(l,2);On(h,{}),B(r,a)},$$slots:{default:!0}})},$$slots:{default:!0}}),ps(t),B(c,t)}export{vo as default};
