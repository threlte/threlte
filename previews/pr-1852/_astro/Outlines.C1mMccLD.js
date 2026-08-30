import"./disclose-version.DsnmJJEf.js";import{p as D,L as o,g as l,u as x,f as _,s as k,n as K,a as L}from"./runtime.Cq5xh0TU.js";import{f as w,a as M}from"./template.L6xDPO6U.js";import{s as Y}from"./snippet.B1WTn4og.js";import{p as t,s as Z,r as q}from"./props.BuNG_qsO.js";import{U as a,Z as H,G as J,$ as Q,_ as R,aa as W,u as X,a as c,s as $,i as u,b4 as ee,aV as te,Y as re}from"./observe.svelte.XHimI-Ft.js";/* empty css                                                      */import{u as ne}from"./useThrelte.BUOnMkyN.js";import{t as oe}from"./BufferGeometryUtils.Dw5IauKo.js";const se=`
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
`;var ae=w("<!> <!>",1),le=w("<!> <!>",1);function ke(O,e){D(e,!0);let y=t(e,"color",3,"black"),P=t(e,"screenspace",3,!1),S=t(e,"opacity",3,1),b=t(e,"transparent",3,!1),N=t(e,"thickness",3,.05),I=t(e,"toneMapped",3,!0),z=t(e,"angle",19,()=>Math.PI),F=t(e,"polygonOffset",3,!1),V=t(e,"polygonOffsetFactor",3,0),j=t(e,"renderOrder",3,0),f=t(e,"ref",15),C=q(e,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:G,invalidate:r}=ne(),U={screenspace:new a(!1),color:new a(new H("black")),opacity:new a(1),thickness:new a(.05),size:new a(new $)},m=new J,n=new Q({side:R,uniforms:U,vertexShader:se,fragmentShader:ie});let s=W(X()),T=x(()=>{if(u(s.current,"Mesh"))return oe(s.current.geometry,z())}),d=x(()=>{if(u(s.current,"Mesh")){if(u(s.current,"SkinnedMesh")){const i=new ee;return i.bind(s.current.skeleton,s.current.bindMatrix),i}else if(u(s.current,"InstancedMesh")){const i=new te(void 0,void 0,s.current.count);return i.instanceMatrix=s.current.instanceMatrix,i}return new re}});o(()=>{l(d)&&(l(d).renderOrder=j(),r())}),o(()=>{n.transparent=b(),r()}),o(()=>{n.toneMapped=I(),r()}),o(()=>{n.polygonOffset=F(),r()}),o(()=>{n.polygonOffsetFactor=V(),r()}),o(()=>{n.uniforms.screenspace.value=P(),r()}),o(()=>{n.uniforms.color.value.set(y()),r()}),o(()=>{n.uniforms.opacity.value=S(),r()}),o(()=>{n.uniforms.thickness.value=N(),r()}),o(()=>{G.getDrawingBufferSize(n.uniforms.size.value),r()}),c(O,Z({get is(){return m}},()=>C,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:0},get ref(){return f()},set ref(i){f(i)},children:(i,ce)=>{var p=le(),h=_(p);c(h,{get is(){return l(d)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:1},children:(E,ue)=>{var v=ae(),g=_(v);c(g,{get is(){return l(T)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:2}});var A=k(g,2);c(A,{get is(){return n},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:3}}),M(E,v)},$$slots:{default:!0}});var B=k(h,2);Y(B,()=>e.children??K,()=>({ref:m})),M(i,p)},$$slots:{default:!0}})),L()}export{ke as O};
