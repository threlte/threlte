import"./disclose-version.DsnmJJEf.js";import{p as D,L as o,g as l,u as x,f as _,s as k,n as H,a as K}from"./runtime.Cq5xh0TU.js";import{f as w,a as M}from"./template.L6xDPO6U.js";import{s as L}from"./snippet.B1WTn4og.js";import{p as r,s as X,r as Y}from"./props.BuNG_qsO.js";import{au as a,V as q,C as J,a1 as Q,aH as R,aG as W,aN as Z,u as $,a as c,i as u,X as ee,I as re,Y as te}from"./observe.svelte.Ozl9YK2M.js";/* empty css                                                      */import{u as ne}from"./useThrelte.BT4stfup.js";import{a as oe}from"./BufferGeometryUtils.KAjttEpn.js";const se=`
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
}`,ie=`
uniform vec3 color;
uniform float opacity;
void main(){
  gl_FragColor = vec4(color, opacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;var ae=w("<!> <!>",1),le=w("<!> <!>",1);function ke(O,e){D(e,!0);let y=r(e,"color",3,"black"),P=r(e,"screenspace",3,!1),S=r(e,"opacity",3,1),N=r(e,"transparent",3,!1),b=r(e,"thickness",3,.05),I=r(e,"toneMapped",3,!0),z=r(e,"angle",19,()=>Math.PI),C=r(e,"polygonOffset",3,!1),F=r(e,"polygonOffsetFactor",3,0),V=r(e,"renderOrder",3,0),f=r(e,"ref",15),j=Y(e,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:G,invalidate:t}=ne(),T={screenspace:new a(!1),color:new a(new J("black")),opacity:new a(1),thickness:new a(.05),size:new a(new q)},m=new Q,n=new R({side:W,uniforms:T,vertexShader:se,fragmentShader:ie});let s=Z($()),U=x(()=>{if(u(s.current,"Mesh"))return oe(s.current.geometry,z())}),d=x(()=>{if(u(s.current,"Mesh")){if(u(s.current,"SkinnedMesh")){const i=new ee;return i.bind(s.current.skeleton,s.current.bindMatrix),i}else if(u(s.current,"InstancedMesh")){const i=new re(void 0,void 0,s.current.count);return i.instanceMatrix=s.current.instanceMatrix,i}return new te}});o(()=>{l(d)&&(l(d).renderOrder=V(),t())}),o(()=>{n.transparent=N(),t()}),o(()=>{n.toneMapped=I(),t()}),o(()=>{n.polygonOffset=C(),t()}),o(()=>{n.polygonOffsetFactor=F(),t()}),o(()=>{n.uniforms.screenspace.value=P(),t()}),o(()=>{n.uniforms.color.value.set(y()),t()}),o(()=>{n.uniforms.opacity.value=S(),t()}),o(()=>{n.uniforms.thickness.value=b(),t()}),o(()=>{G.getDrawingBufferSize(n.uniforms.size.value),t()}),c(O,X({get is(){return m}},()=>j,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:0},get ref(){return f()},set ref(i){f(i)},children:(i,ce)=>{var p=le(),h=_(p);c(h,{get is(){return l(d)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:1},children:(E,ue)=>{var v=ae(),g=_(v);c(g,{get is(){return l(U)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:2}});var A=k(g,2);c(A,{get is(){return n},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:3}}),M(E,v)},$$slots:{default:!0}});var B=k(h,2);L(B,()=>e.children??H,()=>({ref:m})),M(i,p)},$$slots:{default:!0}})),K()}export{ke as O};
