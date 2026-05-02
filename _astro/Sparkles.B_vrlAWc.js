import"./disclose-version.DsnmJJEf.js";import{p as M,L as n,f as T,s as g,n as I,a as O}from"./runtime.Blah4U0_.js";import{f as R,a as j}from"./template.DVDQvY7g.js";import{s as B}from"./snippet.CGSK6t1_.js";import{p as A,s as U,r as G}from"./props.Bxx-6uk3.js";import{a as L,s as V}from"./store.DYv7OeNg.js";import{r as W,C as X,X as q,a4 as f,B as s,aI as D,av as w,a1 as E,T as u}from"./observe.svelte.Bzra_Ed9.js";/* empty css                                                      */import{u as H}from"./useThrelte.C7nCZ9td.js";import{u as J}from"./useTask.svelte.DtaG2cjy.js";const K=`
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
}`,N=`
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
}`;var Q=R("<!> <!> <!>",1);function se(x,e){M(e,!0);const b=()=>L(F,"$dpr",S),[S,P]=V();let o=A(e,"count",3,100),c=A(e,"size",19,()=>Math.random()),_=G(e,["$$slots","$$events","$$legacy","count","speed","opacity","color","size","scale","noise","children"]);const{dpr:F}=H(),l=new W,y=new X,k=t=>t&&t.constructor===Float32Array,a=new q;n(()=>{Array.isArray(e.scale)?l.fromArray(e.scale):l.setScalar(e.scale??1);const t=new Float32Array(o()*3);for(let r=0,i=o()*3;r<i;r+=3)t[r+0]=f.randFloatSpread(l.x),t[r+1]=f.randFloatSpread(l.y),t[r+2]=f.randFloatSpread(l.z);a.setAttribute("position",new s(t,3))}),n(()=>{const t=typeof c()=="number"?new Float32Array(o()).fill(c()):c()===void 0?Float32Array.from({length:o()},()=>Math.random()):c();a.setAttribute("size",new s(t,1))}),n(()=>{const t=typeof e.speed=="number"?new Float32Array(o()).fill(e.speed):e.speed===void 0?Float32Array.from({length:o()},()=>Math.random()):e.speed;a.setAttribute("speed",new s(t,1))}),n(()=>{const t=typeof e.opacity=="number"?new Float32Array(o()).fill(e.opacity):e.opacity===void 0?Float32Array.from({length:o()},()=>Math.random()):e.opacity;a.setAttribute("opacity",new s(t,1))}),n(()=>{const t=typeof e.noise=="number"?new Float32Array(o()*3).fill(e.noise):e.noise===void 0?Float32Array.from({length:o()*3},()=>Math.random()):Array.isArray(e.noise)?Float32Array.from({length:o()*3},(r,i)=>e.noise[i%3]):e.noise;a.setAttribute("noise",new s(t,3))}),n(()=>{if(k(e.color))a.setAttribute("color",new s(e.color,3));else{y.set(e.color??"white");const t=y.toArray(),r=Float32Array.from({length:o()*3},(i,d)=>t[d%3]);a.setAttribute("color",new s(r,3))}});const m={time:new w(0),pixelRatio:new w(1)},z=new D({uniforms:m,vertexShader:N,fragmentShader:K,transparent:!0,depthWrite:!1});n(()=>{m.pixelRatio.value=b()});let p=0;J(t=>{p+=t,m.time.value=p});const v=new E;u(x,U({get is(){return v}},()=>_,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Sparkles/Sparkles.svelte",index:0},children:(t,r)=>{var i=Q(),d=T(i);u(d,{get is(){return z},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Sparkles/Sparkles.svelte",index:1}});var h=g(d,2);u(h,{get is(){return a},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Sparkles/Sparkles.svelte",index:2}});var C=g(h,2);B(C,()=>e.children??I,()=>({ref:v})),j(t,i)},$$slots:{default:!0}})),O(),P()}export{se as S};
