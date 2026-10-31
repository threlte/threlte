import"./disclose-version.DsnmJJEf.js";import{p as c,L as l,f as h,n as x,a as S}from"./runtime.DLdkg5Kz.js";import{c as M,a as P}from"./template.B2QqRX6L.js";import{s as _}from"./snippet.CCzzTW4D.js";import{p as r,s as C,r as I}from"./props.BNYK5s9I.js";import{U as t,_ as k,a0 as y,bA as R,a as A}from"./observe.svelte.BBlBpKSz.js";/* empty css                                                      */import{u as F}from"./useThrelte.CT5RsaAy.js";import{f as N}from"./index.BUQxxys7.js";const b=`varying vec3 vPosition;
varying vec3 vNormal;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	gl_Position = projectionMatrix * viewMatrix * modelPosition;
	vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
	vPosition = modelPosition.xyz;
	vNormal = modelNormal.xyz;
}`;function H(m,e){c(e,!0);let f=r(e,"falloff",3,.1),d=r(e,"glowInternalRadius",3,6),u=r(e,"glowColor",3,"green"),g=r(e,"glowSharpness",3,1),s=r(e,"ref",15),p=I(e,["$$slots","$$events","$$legacy","falloff","glowInternalRadius","glowColor","glowSharpness","ref","children"]);const w={falloffAmount:new t(.1),glowInternalRadius:new t(6),glowColor:new t(new k("white")),glowSharpness:new t(1)},o=new y({uniforms:w,fragmentShader:N,vertexShader:b,transparent:!0,blending:R,depthTest:!1}),{invalidate:a}=F();l(()=>{o.uniforms.falloffAmount.value=f(),a()}),l(()=>{o.uniforms.glowInternalRadius.value=d(),a()}),l(()=>{o.uniforms.glowColor.value.set(u()),a()}),l(()=>{o.uniforms.glowSharpness.value=g(),a()}),A(m,C({get is(){return o}},()=>p,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/FakeGlowMaterial/FakeGlowMaterial.svelte",index:0},get ref(){return s()},set ref(n){s(n)},children:(n,G)=>{var i=M(),v=h(i);_(v,()=>e.children??x,()=>({ref:o})),P(n,i)},$$slots:{default:!0}})),S()}export{H as F};
