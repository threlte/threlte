import"./disclose-version.DsnmJJEf.js";import{p as c,Z as l,f as w,n as h,a as x}from"./runtime.Blah4U0_.js";import{c as S,a as M}from"./template.DVDQvY7g.js";import{s as C}from"./snippet.CGSK6t1_.js";import{p as r,s as I,r as P}from"./props.Bxx-6uk3.js";import{C as _,aI as k,cA as y,T as R}from"./observe.svelte.Bzra_Ed9.js";/* empty css                                                      */import{u as F}from"./useThrelte.C7nCZ9td.js";import{h as N}from"./raycast.DtGR1HHe.js";const G=`varying vec3 vPosition;
varying vec3 vNormal;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	gl_Position = projectionMatrix * viewMatrix * modelPosition;
	vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
	vPosition = modelPosition.xyz;
	vNormal = modelNormal.xyz;
}`;function H(u,e){c(e,!0);let s=r(e,"falloff",3,.1),n=r(e,"glowInternalRadius",3,6),i=r(e,"glowColor",3,"green"),f=r(e,"glowSharpness",3,1),m=r(e,"ref",15),v=P(e,["$$slots","$$events","$$legacy","falloff","glowInternalRadius","glowColor","glowSharpness","ref","children"]);const p={falloff:{value:s()},glowInternalRadius:{value:n()},glowColor:{value:new _(i())},glowSharpness:{value:f()}},o=new k({uniforms:p,fragmentShader:N,vertexShader:G,transparent:!0,blending:y,depthTest:!1}),{invalidate:a}=F();l(()=>{o.uniforms.falloff.value=s(),a()}),l(()=>{o.uniforms.glowInternalRadius.value=n(),a()}),l(()=>{o.uniforms.glowColor.value.set(i()),a()}),l(()=>{o.uniforms.glowSharpness.value=f(),a()}),R(u,I({get is(){return o}},()=>v,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/FakeGlowMaterial/FakeGlowMaterial.svelte",index:0},get ref(){return m()},set ref(t){m(t)},children:(t,T)=>{var d=S(),g=w(d);C(g,()=>e.children??h,()=>({ref:o})),M(t,d)},$$slots:{default:!0}})),x()}export{H as F};
