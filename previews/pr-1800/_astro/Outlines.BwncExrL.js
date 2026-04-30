import"./disclose-version.DsnmJJEf.js";import{p as Z,Z as n,g as i,u as _,f as M,s as k,n as A,a as D}from"./runtime.HAn2cbcW.js";import{f as y,a as O}from"./template.D0onEdCl.js";import{s as H}from"./snippet.ILc-veMr.js";import{p as t,s as K,r as R}from"./props.DsKWk81K.js";import{V as Y,C as q,a2 as J,aI as L,aH as Q,u as W,T as a,i as l,aR as X,Y as $,I as ee,Z as te}from"./observe.svelte.CgW6H71F.js";/* empty css                                                      */import{u as re}from"./useThrelte.RvSOXRwe.js";import{a as ne}from"./BufferGeometryUtils.DlfSCQS8.js";const oe=`
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
`;var ie=y("<!> <!>",1),ae=y("<!> <!>",1);function _e(w,e){Z(e,!0);let d=t(e,"color",3,"black"),f=t(e,"screenspace",3,!1),m=t(e,"opacity",3,1),P=t(e,"transparent",3,!1),p=t(e,"thickness",3,.05),S=t(e,"toneMapped",3,!0),I=t(e,"angle",19,()=>Math.PI),N=t(e,"polygonOffset",3,!1),b=t(e,"polygonOffsetFactor",3,0),z=t(e,"renderOrder",3,0),C=t(e,"ref",15),F=R(e,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:V}=re(),j={screenspace:{value:f()},color:{value:new q(d())},opacity:{value:m()},thickness:{value:p()},size:{value:new Y}},c=new J;C(c);const r=new L({side:Q,uniforms:j,vertexShader:oe,fragmentShader:se}),G=W();let o=X(G),T=_(()=>{if(l(o.current,"Mesh"))return ne(o.current.geometry,I())}),u=_(()=>{if(l(o.current,"Mesh")){if(l(o.current,"SkinnedMesh")){const s=new $;return s.bind(o.current.skeleton,o.current.bindMatrix),s}else if(l(o.current,"InstancedMesh")){const s=new ee(void 0,void 0,o.current.count);return s.instanceMatrix=o.current.instanceMatrix,s}return new te}});n(()=>{i(u)&&(i(u).renderOrder=z())}),n(()=>{r.transparent=P()}),n(()=>{r.toneMapped=S()}),n(()=>{r.polygonOffset=N()}),n(()=>{r.polygonOffsetFactor=b()}),n(()=>{r.uniforms.screenspace.value=f()}),n(()=>{r.uniforms.color.value.set(d())}),n(()=>{r.uniforms.opacity.value=m()}),n(()=>{r.uniforms.thickness.value=p()}),n(()=>{V.getDrawingBufferSize(r.uniforms.size.value)}),a(w,K({get is(){return c}},()=>F,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:0},children:(s,le)=>{var h=ae(),v=M(h);a(v,{get is(){return i(u)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:1},children:(E,ce)=>{var g=ie(),x=M(g);a(x,{get is(){return i(T)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:2}});var U=k(x,2);a(U,{get is(){return r},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:3}}),O(E,g)},$$slots:{default:!0}});var B=k(v,2);H(B,()=>e.children??A,()=>({ref:c})),O(s,h)},$$slots:{default:!0}})),D()}export{_e as O};
