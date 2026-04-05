import"./disclose-version.DsnmJJEf.js";import{p as c,_ as l,f as w,n as h,a as x}from"./runtime.BsM9HEgF.js";import{c as S,a as M}from"./template.BGiQ9W-B.js";import{s as _}from"./snippet.pNoFfLl0.js";import{p as r,s as C,r as P}from"./props.BdgQxxOQ.js";import{C as I,aG as k,cs as y,b as R,T as F}from"./observe.svelte.C6wHHjlp.js";/* empty css                                                      */import{h as G}from"./raycast.CiE17rz4.js";const N=`varying vec3 vPosition;
varying vec3 vNormal;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	gl_Position = projectionMatrix * viewMatrix * modelPosition;
	vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
	vPosition = modelPosition.xyz;
	vNormal = modelNormal.xyz;
}`;function H(u,e){c(e,!0);let s=r(e,"falloff",3,.1),n=r(e,"glowInternalRadius",3,6),i=r(e,"glowColor",3,"green"),f=r(e,"glowSharpness",3,1),m=r(e,"ref",15),v=P(e,["$$slots","$$events","$$legacy","falloff","glowInternalRadius","glowColor","glowSharpness","ref","children"]);const g={falloff:{value:s()},glowInternalRadius:{value:n()},glowColor:{value:new I(i())},glowSharpness:{value:f()}},o=new k({uniforms:g,fragmentShader:G,vertexShader:N,transparent:!0,blending:y,depthTest:!1}),{invalidate:a}=R();l(()=>{o.uniforms.falloff.value=s(),a()}),l(()=>{o.uniforms.glowInternalRadius.value=n(),a()}),l(()=>{o.uniforms.glowColor.value.set(i()),a()}),l(()=>{o.uniforms.glowSharpness.value=f(),a()}),F(u,C({get is(){return o}},()=>v,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/FakeGlowMaterial/FakeGlowMaterial.svelte",index:0},get ref(){return m()},set ref(t){m(t)},children:(t,b)=>{var d=S(),p=w(d);_(p,()=>e.children??h,()=>({ref:o})),M(t,d)},$$slots:{default:!0}})),x()}export{H as F};
