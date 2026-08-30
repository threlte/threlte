import"./disclose-version.DsnmJJEf.js";import{p as c,L as l,f as h,n as x,a as S}from"./runtime.Cq5xh0TU.js";import{c as M,a as C}from"./template.L6xDPO6U.js";import{s as P}from"./snippet.B1WTn4og.js";import{p as r,s as I,r as _}from"./props.BuNG_qsO.js";import{au as t,C as k,aH as y,bz as R,a as F}from"./observe.svelte.DGtC0W2K.js";/* empty css                                                      */import{u as N}from"./useThrelte.Bj7aS8bK.js";import{i as b}from"./raycast.DUx7E7ZN.js";const z=`varying vec3 vPosition;
varying vec3 vNormal;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	gl_Position = projectionMatrix * viewMatrix * modelPosition;
	vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
	vPosition = modelPosition.xyz;
	vNormal = modelNormal.xyz;
}`;function E(f,e){c(e,!0);let m=r(e,"falloff",3,.1),d=r(e,"glowInternalRadius",3,6),u=r(e,"glowColor",3,"green"),g=r(e,"glowSharpness",3,1),n=r(e,"ref",15),p=_(e,["$$slots","$$events","$$legacy","falloff","glowInternalRadius","glowColor","glowSharpness","ref","children"]);const w={falloff:new t(.1),glowInternalRadius:new t(6),glowColor:new t(new k("white")),glowSharpness:new t(1)},o=new y({uniforms:w,fragmentShader:b,vertexShader:z,transparent:!0,blending:R,depthTest:!1}),{invalidate:a}=N();l(()=>{o.uniforms.falloff.value=m(),a()}),l(()=>{o.uniforms.glowInternalRadius.value=d(),a()}),l(()=>{o.uniforms.glowColor.value.set(u()),a()}),l(()=>{o.uniforms.glowSharpness.value=g(),a()}),F(f,I({get is(){return o}},()=>p,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/FakeGlowMaterial/FakeGlowMaterial.svelte",index:0},get ref(){return n()},set ref(s){n(s)},children:(s,G)=>{var i=M(),v=h(i);P(v,()=>e.children??x,()=>({ref:o})),C(s,i)},$$slots:{default:!0}})),S()}export{E as F};
