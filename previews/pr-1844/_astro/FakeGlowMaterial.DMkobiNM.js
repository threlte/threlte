import"./disclose-version.DsnmJJEf.js";import{p as c,az as l,f as w,n as h,a as x}from"./runtime.zyo6wXBK.js";import{c as S,a as M}from"./template.CIy_TBqb.js";import{s as C}from"./snippet.BRaEWkfs.js";import{p as a,s as P,r as _}from"./props.upYgiiOB.js";import{C as k,aF as I,bz as y,ah as F}from"./observe.svelte.Dzn6J_wL.js";/* empty css                                                      */import{u as R}from"./useThrelte.Bw3MCU9g.js";import{k as z}from"./raycast.BzVFbbdq.js";const N=`varying vec3 vPosition;
varying vec3 vNormal;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	gl_Position = projectionMatrix * viewMatrix * modelPosition;
	vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
	vPosition = modelPosition.xyz;
	vNormal = modelNormal.xyz;
}`;function J(u,e){c(e,!0);let s=a(e,"falloff",3,.1),n=a(e,"glowInternalRadius",3,6),i=a(e,"glowColor",3,"green"),f=a(e,"glowSharpness",3,1),m=a(e,"ref",15),v=_(e,["$$slots","$$events","$$legacy","falloff","glowInternalRadius","glowColor","glowSharpness","ref","children"]);const p={falloff:{value:s()},glowInternalRadius:{value:n()},glowColor:{value:new k(i())},glowSharpness:{value:f()}},o=new I({uniforms:p,fragmentShader:z,vertexShader:N,transparent:!0,blending:y,depthTest:!1}),{invalidate:r}=R();l(()=>{o.uniforms.falloff.value=s(),r()}),l(()=>{o.uniforms.glowInternalRadius.value=n(),r()}),l(()=>{o.uniforms.glowColor.value.set(i()),r()}),l(()=>{o.uniforms.glowSharpness.value=f(),r()}),F(u,P({get is(){return o}},()=>v,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/FakeGlowMaterial/FakeGlowMaterial.svelte",index:0},get ref(){return m()},set ref(t){m(t)},children:(t,b)=>{var d=S(),g=w(d);C(g,()=>e.children??h,()=>({ref:o})),M(t,d)},$$slots:{default:!0}})),x()}export{J as F};
