import"./disclose-version.DsnmJJEf.js";import{p as c,_ as l,f as w,n as h,a as x}from"./runtime.XdAhm9hg.js";import{c as S,a as M}from"./template.D6i0fWOI.js";import{s as _}from"./snippet.zb5DD4fg.js";import{p as r,s as C,r as P}from"./props.29maieIx.js";import{C as I,aH as k,ct as y,c as R,T as F}from"./T.CIQBugds.js";/* empty css                                                      */import{h as N}from"./raycast.CrDucA7w.js";const G=`varying vec3 vPosition;
varying vec3 vNormal;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	gl_Position = projectionMatrix * viewMatrix * modelPosition;
	vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
	vPosition = modelPosition.xyz;
	vNormal = modelNormal.xyz;
}`;function E(u,e){c(e,!0);let s=r(e,"falloff",3,.1),n=r(e,"glowInternalRadius",3,6),i=r(e,"glowColor",3,"green"),f=r(e,"glowSharpness",3,1),m=r(e,"ref",15),v=P(e,["$$slots","$$events","$$legacy","falloff","glowInternalRadius","glowColor","glowSharpness","ref","children"]);const g={falloff:{value:s()},glowInternalRadius:{value:n()},glowColor:{value:new I(i())},glowSharpness:{value:f()}},o=new k({uniforms:g,fragmentShader:N,vertexShader:G,transparent:!0,blending:y,depthTest:!1}),{invalidate:a}=R();l(()=>{o.uniforms.falloff.value=s(),a()}),l(()=>{o.uniforms.glowInternalRadius.value=n(),a()}),l(()=>{o.uniforms.glowColor.value.set(i()),a()}),l(()=>{o.uniforms.glowSharpness.value=f(),a()}),F(u,C({get is(){return o}},()=>v,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/FakeGlowMaterial/FakeGlowMaterial.svelte",index:0},get ref(){return m()},set ref(t){m(t)},children:(t,T)=>{var d=S(),p=w(d);_(p,()=>e.children??h,()=>({ref:o})),M(t,d)},$$slots:{default:!0}})),x()}export{E as F};
