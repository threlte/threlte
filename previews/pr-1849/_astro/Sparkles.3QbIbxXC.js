import"./disclose-version.DsnmJJEf.js";import{p as k,L as n,f as z,s as g,n as M,a as C}from"./runtime.DLdkg5Kz.js";import{f as T,a as O}from"./template.B2QqRX6L.js";import{s as R}from"./snippet.CCzzTW4D.js";import{p as A,s as U,r as j}from"./props.C0aiEMAr.js";import{_ as B,B as I,V,m as f,l as s,a0 as G,U as w,b7 as L,a as u}from"./observe.svelte.CmjctptC.js";/* empty css                                                      */import{u as W}from"./useThrelte.BExRv3o8.js";import{u as q}from"./useTask.svelte.wM_--mkW.js";const D=`
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
}`,E=`
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
}`;var H=T("<!> <!> <!>",1);function te(b,e){k(e,!0);let o=A(e,"count",3,100),c=A(e,"size",19,()=>Math.random()),x=j(e,["$$slots","$$events","$$legacy","count","speed","opacity","color","size","scale","noise","children"]);const{dpr:S}=W(),l=new V,y=new B,P=t=>t!=null&&t.constructor===Float32Array,a=new I;n(()=>{Array.isArray(e.scale)?l.fromArray(e.scale):l.setScalar(e.scale??1);const t=new Float32Array(o()*3);for(let r=0,i=o()*3;r<i;r+=3)t[r+0]=f.randFloatSpread(l.x),t[r+1]=f.randFloatSpread(l.y),t[r+2]=f.randFloatSpread(l.z);a.setAttribute("position",new s(t,3))}),n(()=>{const t=typeof c()=="number"?new Float32Array(o()).fill(c()):c()===void 0?Float32Array.from({length:o()},()=>Math.random()):c();a.setAttribute("size",new s(t,1))}),n(()=>{const t=typeof e.speed=="number"?new Float32Array(o()).fill(e.speed):e.speed===void 0?Float32Array.from({length:o()},()=>Math.random()):e.speed;a.setAttribute("speed",new s(t,1))}),n(()=>{const t=typeof e.opacity=="number"?new Float32Array(o()).fill(e.opacity):e.opacity===void 0?Float32Array.from({length:o()},()=>Math.random()):e.opacity;a.setAttribute("opacity",new s(t,1))}),n(()=>{const t=typeof e.noise=="number"?new Float32Array(o()*3).fill(e.noise):e.noise===void 0?Float32Array.from({length:o()*3},()=>Math.random()):Array.isArray(e.noise)?Float32Array.from({length:o()*3},(r,i)=>e.noise[i%3]):e.noise;a.setAttribute("noise",new s(t,3))}),n(()=>{if(P(e.color))a.setAttribute("color",new s(e.color,3));else{y.set(e.color??"white");const t=y.toArray(),r=Float32Array.from({length:o()*3},(i,d)=>t[d%3]);a.setAttribute("color",new s(r,3))}});const m={time:new w(0),pixelRatio:new w(1)},F=new G({uniforms:m,vertexShader:E,fragmentShader:D,transparent:!0,depthWrite:!1});n(()=>{m.pixelRatio.value=S.current});let v=0;q(t=>{v+=t,m.time.value=v});const p=new L;u(b,U({get is(){return p}},()=>x,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Sparkles/Sparkles.svelte",index:0},children:(t,r)=>{var i=H(),d=z(i);u(d,{get is(){return F},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Sparkles/Sparkles.svelte",index:1}});var h=g(d,2);u(h,{get is(){return a},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Sparkles/Sparkles.svelte",index:2}});var _=g(h,2);R(_,()=>e.children??M,()=>({ref:p})),O(t,i)},$$slots:{default:!0}})),C()}export{te as S};
