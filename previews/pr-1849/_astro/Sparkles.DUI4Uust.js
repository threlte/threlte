import"./disclose-version.DsnmJJEf.js";import{p as k,L as n,f as z,s as g,n as C,a as M}from"./runtime.Cq5xh0TU.js";import{f as T,a as I}from"./template.L6xDPO6U.js";import{s as O}from"./snippet.B1WTn4og.js";import{p as A,s as R,r as j}from"./props.D2nmUwxA.js";import{r as B,C as U,X as G,a4 as f,B as s,aI as L,av as w,a1 as V,T as u}from"./observe.svelte.C0rBo_1K.js";/* empty css                                                      */import{u as W}from"./useThrelte.Wdl2QUb4.js";import{u as X}from"./useTask.svelte.bJHaryD1.js";const q=`
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
}`,D=`
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
}`;var E=T("<!> <!> <!>",1);function te(x,e){k(e,!0);let o=A(e,"count",3,100),c=A(e,"size",19,()=>Math.random()),b=j(e,["$$slots","$$events","$$legacy","count","speed","opacity","color","size","scale","noise","children"]);const{dpr:S}=W(),l=new B,y=new U,P=t=>t&&t.constructor===Float32Array,a=new G;n(()=>{Array.isArray(e.scale)?l.fromArray(e.scale):l.setScalar(e.scale??1);const t=new Float32Array(o()*3);for(let r=0,i=o()*3;r<i;r+=3)t[r+0]=f.randFloatSpread(l.x),t[r+1]=f.randFloatSpread(l.y),t[r+2]=f.randFloatSpread(l.z);a.setAttribute("position",new s(t,3))}),n(()=>{const t=typeof c()=="number"?new Float32Array(o()).fill(c()):c()===void 0?Float32Array.from({length:o()},()=>Math.random()):c();a.setAttribute("size",new s(t,1))}),n(()=>{const t=typeof e.speed=="number"?new Float32Array(o()).fill(e.speed):e.speed===void 0?Float32Array.from({length:o()},()=>Math.random()):e.speed;a.setAttribute("speed",new s(t,1))}),n(()=>{const t=typeof e.opacity=="number"?new Float32Array(o()).fill(e.opacity):e.opacity===void 0?Float32Array.from({length:o()},()=>Math.random()):e.opacity;a.setAttribute("opacity",new s(t,1))}),n(()=>{const t=typeof e.noise=="number"?new Float32Array(o()*3).fill(e.noise):e.noise===void 0?Float32Array.from({length:o()*3},()=>Math.random()):Array.isArray(e.noise)?Float32Array.from({length:o()*3},(r,i)=>e.noise[i%3]):e.noise;a.setAttribute("noise",new s(t,3))}),n(()=>{if(P(e.color))a.setAttribute("color",new s(e.color,3));else{y.set(e.color??"white");const t=y.toArray(),r=Float32Array.from({length:o()*3},(i,d)=>t[d%3]);a.setAttribute("color",new s(r,3))}});const m={time:new w(0),pixelRatio:new w(1)},F=new L({uniforms:m,vertexShader:D,fragmentShader:q,transparent:!0,depthWrite:!1});n(()=>{m.pixelRatio.value=S.current});let v=0;X(t=>{v+=t,m.time.value=v});const p=new V;u(x,R({get is(){return p}},()=>b,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Sparkles/Sparkles.svelte",index:0},children:(t,r)=>{var i=E(),d=z(i);u(d,{get is(){return F},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Sparkles/Sparkles.svelte",index:1}});var h=g(d,2);u(h,{get is(){return a},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Sparkles/Sparkles.svelte",index:2}});var _=g(h,2);O(_,()=>e.children??C,()=>({ref:p})),I(t,i)},$$slots:{default:!0}})),M()}export{te as S};
