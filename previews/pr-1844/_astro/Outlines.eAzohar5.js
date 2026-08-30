import"./disclose-version.DsnmJJEf.js";import{p as A,az as n,g as a,u as v,f as x,s as _,n as D,a as H}from"./runtime.BBxoejyG.js";import{f as k,a as M}from"./template.Bs5bR2Nc.js";import{s as J}from"./snippet.DUyBEcRR.js";import{p as r,s as K,r as Y}from"./props.CGk66viq.js";import{as as i,V as q,C as L,Y as Q,aF as R,aE as W,aM as X,ai as Z,ah as l,aj as c,H as $,I as ee,J as re}from"./observe.svelte.CFYFNOc8.js";/* empty css                                                      */import{u as te}from"./useThrelte.o9barqGH.js";import{a as ne}from"./BufferGeometryUtils.xrzs_Nyi.js";const oe=`
#include <common>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>

uniform float thickness;
uniform bool screenspace;
uniform vec2 size;

void main() {
  #if defined (USE_SKINNING)
    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>
  #endif
  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <project_vertex>
  vec4 tNormal = vec4(normal, 0.0);
  vec4 tPosition = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    tNormal = instanceMatrix * tNormal;
    tPosition = instanceMatrix * tPosition;
  #endif
  if (!screenspace) {
    vec3 newPosition = tPosition.xyz + tNormal.xyz * thickness;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  } else {
    vec4 clipPosition = projectionMatrix * modelViewMatrix * tPosition;
    vec4 clipNormal = projectionMatrix * modelViewMatrix * tNormal;
    vec2 offset = normalize(clipNormal.xy) * thickness / size * clipPosition.w * 2.0;
    clipPosition.xy += offset;
    gl_Position = clipPosition;
  }
}`,se=`
uniform vec3 color;
uniform float opacity;
void main(){
  gl_FragColor = vec4(color, opacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;var ie=k("<!> <!>",1),ae=k("<!> <!>",1);function _e(w,e){A(e,!0);let O=r(e,"color",3,"black"),y=r(e,"screenspace",3,!1),P=r(e,"opacity",3,1),S=r(e,"transparent",3,!1),N=r(e,"thickness",3,.05),b=r(e,"toneMapped",3,!0),I=r(e,"angle",19,()=>Math.PI),z=r(e,"polygonOffset",3,!1),F=r(e,"polygonOffsetFactor",3,0),j=r(e,"renderOrder",3,0),d=r(e,"ref",15),C=Y(e,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:V}=te(),E={screenspace:new i(!1),color:new i(new L("black")),opacity:new i(1),thickness:new i(.05),size:new i(new q)},f=new Q,t=new R({side:W,uniforms:E,vertexShader:oe,fragmentShader:se});let o=X(Z()),G=v(()=>{if(c(o.current,"Mesh"))return ne(o.current.geometry,I())}),u=v(()=>{if(c(o.current,"Mesh")){if(c(o.current,"SkinnedMesh")){const s=new $;return s.bind(o.current.skeleton,o.current.bindMatrix),s}else if(c(o.current,"InstancedMesh")){const s=new ee(void 0,void 0,o.current.count);return s.instanceMatrix=o.current.instanceMatrix,s}return new re}});n(()=>{a(u)&&(a(u).renderOrder=j())}),n(()=>{t.transparent=S()}),n(()=>{t.toneMapped=b()}),n(()=>{t.polygonOffset=z()}),n(()=>{t.polygonOffsetFactor=F()}),n(()=>{t.uniforms.screenspace.value=y()}),n(()=>{t.uniforms.color.value.set(O())}),n(()=>{t.uniforms.opacity.value=P()}),n(()=>{t.uniforms.thickness.value=N()}),n(()=>{V.getDrawingBufferSize(t.uniforms.size.value)}),l(w,K({get is(){return f}},()=>C,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:0},get ref(){return d()},set ref(s){d(s)},children:(s,le)=>{var m=ae(),p=x(m);l(p,{get is(){return a(u)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:1},children:(U,ce)=>{var h=ie(),g=x(h);l(g,{get is(){return a(G)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:2}});var B=_(g,2);l(B,{get is(){return t},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:3}}),M(U,h)},$$slots:{default:!0}});var T=_(p,2);J(T,()=>e.children??D,()=>({ref:f})),M(s,m)},$$slots:{default:!0}})),H()}export{_e as O};
