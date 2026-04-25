import"./disclose-version.DsnmJJEf.js";import{p as D,Z as n,g as i,u as _,f as M,s as k,n as K,a as A}from"./runtime.D20saW8m.js";import{f as y,a as O}from"./template.DY3hUOmN.js";import{s as Z}from"./snippet.ZYtLD8wA.js";import{p as t,s as q,r as H}from"./props.BLzNsRtJ.js";import{b as J,V as L,C as Q,_ as R,aE as W,aD as X,u as Y,T as a,i as l,aN as $,K as ee,I as te,U as re}from"./observe.svelte.FPKcZMNT.js";/* empty css                                                      */import{a as ne}from"./BufferGeometryUtils.BBqpmoXj.js";const oe=`
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
`;var ie=y("<!> <!>",1),ae=y("<!> <!>",1);function xe(w,e){D(e,!0);let d=t(e,"color",3,"black"),f=t(e,"screenspace",3,!1),m=t(e,"opacity",3,1),P=t(e,"transparent",3,!1),p=t(e,"thickness",3,.05),S=t(e,"toneMapped",3,!0),N=t(e,"angle",19,()=>Math.PI),b=t(e,"polygonOffset",3,!1),I=t(e,"polygonOffsetFactor",3,0),z=t(e,"renderOrder",3,0),C=t(e,"ref",15),F=H(e,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:V}=J(),j={screenspace:{value:f()},color:{value:new Q(d())},opacity:{value:m()},thickness:{value:p()},size:{value:new L}},c=new R;C(c);const r=new W({side:X,uniforms:j,vertexShader:oe,fragmentShader:se}),E=Y();let o=$(E),G=_(()=>{if(l(o.current,"Mesh"))return ne(o.current.geometry,N())}),u=_(()=>{if(l(o.current,"Mesh")){if(l(o.current,"SkinnedMesh")){const s=new ee;return s.bind(o.current.skeleton,o.current.bindMatrix),s}else if(l(o.current,"InstancedMesh")){const s=new te(void 0,void 0,o.current.count);return s.instanceMatrix=o.current.instanceMatrix,s}return new re}});n(()=>{i(u)&&(i(u).renderOrder=z())}),n(()=>{r.transparent=P()}),n(()=>{r.toneMapped=S()}),n(()=>{r.polygonOffset=b()}),n(()=>{r.polygonOffsetFactor=I()}),n(()=>{r.uniforms.screenspace.value=f()}),n(()=>{r.uniforms.color.value.set(d())}),n(()=>{r.uniforms.opacity.value=m()}),n(()=>{r.uniforms.thickness.value=p()}),n(()=>{V.getDrawingBufferSize(r.uniforms.size.value)}),a(w,q({get is(){return c}},()=>F,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:0},children:(s,le)=>{var h=ae(),v=M(h);a(v,{get is(){return i(u)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:1},children:(U,ce)=>{var g=ie(),x=M(g);a(x,{get is(){return i(G)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:2}});var B=k(x,2);a(B,{get is(){return r},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Outlines/Outlines.svelte",index:3}}),O(U,g)},$$slots:{default:!0}});var T=k(v,2);Z(T,()=>e.children??K,()=>({ref:c})),O(s,h)},$$slots:{default:!0}})),A()}export{xe as O};
