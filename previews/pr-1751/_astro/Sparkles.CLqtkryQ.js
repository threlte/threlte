import"./disclose-version.DsnmJJEf.js";import{p as M,N as n,f as T,s as g,n as O,a as R}from"./runtime.BsM9HEgF.js";import{f as j,a as B}from"./template.BGiQ9W-B.js";import{s as I}from"./snippet.pNoFfLl0.js";import{p as A,s as U,r as E}from"./props.BdgQxxOQ.js";import{a as G,s as J}from"./store.BuonI5uc.js";import{b as N,l as V,C as W,J as Z,a0 as f,B as s,aE as q,ar as w,Z as D,T as u}from"./observe.svelte.CIPfzpQV.js";/* empty css                                                      */import{u as H}from"./useTask.svelte.DS-901pG.js";const K=`
varying vec3 vColor;
varying float vOpacity;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = 0.03 / distanceToCenter - 0.1;
  float opacity = min(strength * vOpacity, 1.0);

  if (opacity < 0.1) {
    discard;
  }

  gl_FragColor = vec4(vColor, opacity);
}`,L=`
uniform float pixelRatio;
uniform float time;

attribute float size;
attribute float speed;
attribute float opacity;
attribute vec3 noise;
attribute vec3 color;

varying vec3 vColor;
varying float vOpacity;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
  modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
  modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  float dist = max(-viewPosition.z, 0.0001);
  gl_PointSize = size * 25.0 * pixelRatio;
  gl_PointSize *= 1.0 / dist;

  vColor = color;
  vOpacity = opacity;
}`;var Q=j("<!> <!> <!>",1);function ne(b,e){M(e,!0);const x=()=>G(F,"$dpr",S),[S,P]=J();let o=A(e,"count",3,100),c=A(e,"size",19,()=>Math.random()),_=E(e,["$$slots","$$events","$$legacy","count","speed","opacity","color","size","scale","noise","children"]);const{dpr:F}=N(),l=new V,y=new W,k=t=>t&&t.constructor===Float32Array,a=new Z;n(()=>{Array.isArray(e.scale)?l.fromArray(e.scale):l.setScalar(e.scale??1);const t=new Float32Array(o()*3);for(let r=0,i=o()*3;r<i;r+=3)t[r+0]=f.randFloatSpread(l.x),t[r+1]=f.randFloatSpread(l.y),t[r+2]=f.randFloatSpread(l.z);a.setAttribute("position",new s(t,3))}),n(()=>{const t=typeof c()=="number"?new Float32Array(o()).fill(c()):c()===void 0?Float32Array.from({length:o()},()=>Math.random()):c();a.setAttribute("size",new s(t,1))}),n(()=>{const t=typeof e.speed=="number"?new Float32Array(o()).fill(e.speed):e.speed===void 0?Float32Array.from({length:o()},()=>Math.random()):e.speed;a.setAttribute("speed",new s(t,1))}),n(()=>{const t=typeof e.opacity=="number"?new Float32Array(o()).fill(e.opacity):e.opacity===void 0?Float32Array.from({length:o()},()=>Math.random()):e.opacity;a.setAttribute("opacity",new s(t,1))}),n(()=>{const t=typeof e.noise=="number"?new Float32Array(o()*3).fill(e.noise):e.noise===void 0?Float32Array.from({length:o()*3},()=>Math.random()):Array.isArray(e.noise)?Float32Array.from({length:o()*3},(r,i)=>e.noise[i%3]):e.noise;a.setAttribute("noise",new s(t,3))}),n(()=>{if(k(e.color))a.setAttribute("color",new s(e.color,3));else{y.set(e.color??"white");const t=y.toArray(),r=Float32Array.from({length:o()*3},(i,d)=>t[d%3]);a.setAttribute("color",new s(r,3))}});const m={time:new w(0),pixelRatio:new w(1)},z=new q({uniforms:m,vertexShader:L,fragmentShader:K,transparent:!0,depthWrite:!1});n(()=>{m.pixelRatio.value=x()});let p=0;H(t=>{p+=t,m.time.value=p});const v=new D;u(b,U({get is(){return v}},()=>_,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Sparkles/Sparkles.svelte",index:0},children:(t,r)=>{var i=Q(),d=T(i);u(d,{get is(){return z},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Sparkles/Sparkles.svelte",index:1}});var h=g(d,2);u(h,{get is(){return a},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Sparkles/Sparkles.svelte",index:2}});var C=g(h,2);I(C,()=>e.children??O,()=>({ref:v})),B(t,i)},$$slots:{default:!0}})),R(),P()}export{ne as S};
