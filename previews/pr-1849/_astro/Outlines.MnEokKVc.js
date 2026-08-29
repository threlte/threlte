import"./disclose-version.DsnmJJEf.js";import{p as A,L as n,g as a,u as g,f as x,s as _,n as D,a as H}from"./runtime.Cq5xh0TU.js";import{f as M,a as k}from"./template.L6xDPO6U.js";import{s as K}from"./snippet.B1WTn4og.js";import{p as r,s as L,r as Y}from"./props.D2nmUwxA.js";import{av as i,V as Z,C as q,a2 as J,aI as Q,aH as R,u as W,T as l,i as c,Y as X,I as $,Z as ee}from"./observe.svelte.TvC_xpcN.js";/* empty css                                                      */import{u as re}from"./useThrelte.VmojktKP.js";import{a as te}from"./BufferGeometryUtils.CT7woJjE.js";const ne=`
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
}`,oe=`
uniform vec3 color;
uniform float opacity;
void main(){
  gl_FragColor = vec4(color, opacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;var se=M("<!> <!>",1),ie=M("<!> <!>",1);function xe(w,e){A(e,!0);let O=r(e,"color",3,"black"),y=r(e,"screenspace",3,!1),P=r(e,"opacity",3,1),S=r(e,"transparent",3,!1),I=r(e,"thickness",3,.05),N=r(e,"toneMapped",3,!0),b=r(e,"angle",19,()=>Math.PI),z=r(e,"polygonOffset",3,!1),C=r(e,"polygonOffsetFactor",3,0),F=r(e,"renderOrder",3,0),d=r(e,"ref",15),V=Y(e,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:j}=re(),G={screenspace:new i(!1),color:new i(new q("black")),opacity:new i(1),thickness:new i(.05),size:new i(new Z)},f=new J,t=new Q({side:R,uniforms:G,vertexShader:ne,fragmentShader:oe}),o=W();let T=g(()=>{if(c(o.current,"Mesh"))return te(o.current.geometry,b())}),u=g(()=>{if(c(o.current,"Mesh")){if(c(o.current,"SkinnedMesh")){const s=new X;return s.bind(o.current.skeleton,o.current.bindMatrix),s}else if(c(o.current,"InstancedMesh")){const s=new $(void 0,void 0,o.current.count);return s.instanceMatrix=o.current.instanceMatrix,s}return new ee}});n(()=>{a(u)&&(a(u).renderOrder=F())}),n(()=>{t.transparent=S()}),n(()=>{t.toneMapped=N()}),n(()=>{t.polygonOffset=z()}),n(()=>{t.polygonOffsetFactor=C()}),n(()=>{t.uniforms.screenspace.value=y()}),n(()=>{t.uniforms.color.value.set(O())}),n(()=>{t.uniforms.opacity.value=P()}),n(()=>{t.uniforms.thickness.value=I()}),n(()=>{j.getDrawingBufferSize(t.uniforms.size.value)}),l(w,L({get is(){return f}},()=>V,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:0},get ref(){return d()},set ref(s){d(s)},children:(s,ae)=>{var m=ie(),p=x(m);l(p,{get is(){return a(u)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:1},children:(B,le)=>{var h=se(),v=x(h);l(v,{get is(){return a(T)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:2}});var E=_(v,2);l(E,{get is(){return t},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:3}}),k(B,h)},$$slots:{default:!0}});var U=_(p,2);K(U,()=>e.children??D,()=>({ref:f})),k(s,m)},$$slots:{default:!0}})),H()}export{xe as O};
