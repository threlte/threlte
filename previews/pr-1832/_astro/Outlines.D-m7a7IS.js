import"./disclose-version.DsnmJJEf.js";import{p as Z,Z as n,g as a,u as g,f as x,s as _,n as A,a as D}from"./runtime.74l6iTpt.js";import{f as M,a as k}from"./template.cF74NQJq.js";import{s as H}from"./snippet.Dn0BqGl2.js";import{p as r,s as K,r as Y}from"./props.D9B9D2SC.js";import{av as i,V as q,C as J,a2 as L,aI as Q,aH as R,aO as W,u as X,T as l,i as c,Y as $,I as ee,Z as re}from"./observe.svelte.C4xtbfD3.js";/* empty css                                                      */import{u as te}from"./useThrelte.JVWszcQG.js";import{a as ne}from"./BufferGeometryUtils.BUUgfD_e.js";const oe=`
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
`;var ie=M("<!> <!>",1),ae=M("<!> <!>",1);function _e(O,e){Z(e,!0);let w=r(e,"color",3,"black"),y=r(e,"screenspace",3,!1),P=r(e,"opacity",3,1),S=r(e,"transparent",3,!1),I=r(e,"thickness",3,.05),N=r(e,"toneMapped",3,!0),b=r(e,"angle",19,()=>Math.PI),z=r(e,"polygonOffset",3,!1),C=r(e,"polygonOffsetFactor",3,0),F=r(e,"renderOrder",3,0),d=r(e,"ref",15),V=Y(e,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:j}=te(),G={screenspace:new i(!1),color:new i(new J("black")),opacity:new i(1),thickness:new i(.05),size:new i(new q)},f=new L,t=new Q({side:R,uniforms:G,vertexShader:oe,fragmentShader:se});let o=W(X()),T=g(()=>{if(c(o.current,"Mesh"))return ne(o.current.geometry,b())}),u=g(()=>{if(c(o.current,"Mesh")){if(c(o.current,"SkinnedMesh")){const s=new $;return s.bind(o.current.skeleton,o.current.bindMatrix),s}else if(c(o.current,"InstancedMesh")){const s=new ee(void 0,void 0,o.current.count);return s.instanceMatrix=o.current.instanceMatrix,s}return new re}});n(()=>{a(u)&&(a(u).renderOrder=F())}),n(()=>{t.transparent=S()}),n(()=>{t.toneMapped=N()}),n(()=>{t.polygonOffset=z()}),n(()=>{t.polygonOffsetFactor=C()}),n(()=>{t.uniforms.screenspace.value=y()}),n(()=>{t.uniforms.color.value.set(w())}),n(()=>{t.uniforms.opacity.value=P()}),n(()=>{t.uniforms.thickness.value=I()}),n(()=>{j.getDrawingBufferSize(t.uniforms.size.value)}),l(O,K({get is(){return f}},()=>V,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:0},get ref(){return d()},set ref(s){d(s)},children:(s,le)=>{var m=ae(),p=x(m);l(p,{get is(){return a(u)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:1},children:(B,ce)=>{var h=ie(),v=x(h);l(v,{get is(){return a(T)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:2}});var E=_(v,2);l(E,{get is(){return t},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:3}}),k(B,h)},$$slots:{default:!0}});var U=_(p,2);H(U,()=>e.children??A,()=>({ref:f})),k(s,m)},$$slots:{default:!0}})),D()}export{_e as O};
