import"./disclose-version.DsnmJJEf.js";import{p as c,Z as l,f as w,n as h,a as x}from"./runtime.3jYt74No.js";import{c as S,a as M}from"./template.CpvGzssW.js";import{s as C}from"./snippet.XPguuNiB.js";import{p as r,s as P,r as _}from"./props.CcFK4OJe.js";import{C as I,aJ as k,bz as y,T as R}from"./observe.svelte.CVlCLWA3.js";/* empty css                                                      */import{u as F}from"./useThrelte.CPL2gdtw.js";import{j as N}from"./raycast.CzIU-juO.js";const b=`varying vec3 vPosition;
varying vec3 vNormal;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	gl_Position = projectionMatrix * viewMatrix * modelPosition;
	vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
	vPosition = modelPosition.xyz;
	vNormal = modelNormal.xyz;
}`;function E(u,e){c(e,!0);let s=r(e,"falloff",3,.1),n=r(e,"glowInternalRadius",3,6),i=r(e,"glowColor",3,"green"),f=r(e,"glowSharpness",3,1),m=r(e,"ref",15),v=_(e,["$$slots","$$events","$$legacy","falloff","glowInternalRadius","glowColor","glowSharpness","ref","children"]);const p={falloff:{value:s()},glowInternalRadius:{value:n()},glowColor:{value:new I(i())},glowSharpness:{value:f()}},o=new k({uniforms:p,fragmentShader:N,vertexShader:b,transparent:!0,blending:y,depthTest:!1}),{invalidate:a}=F();l(()=>{o.uniforms.falloff.value=s(),a()}),l(()=>{o.uniforms.glowInternalRadius.value=n(),a()}),l(()=>{o.uniforms.glowColor.value.set(i()),a()}),l(()=>{o.uniforms.glowSharpness.value=f(),a()}),R(u,P({get is(){return o}},()=>v,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/FakeGlowMaterial/FakeGlowMaterial.svelte",index:0},get ref(){return m()},set ref(t){m(t)},children:(t,z)=>{var d=S(),g=w(d);C(g,()=>e.children??h,()=>({ref:o})),M(t,d)},$$slots:{default:!0}})),x()}export{E as F};
