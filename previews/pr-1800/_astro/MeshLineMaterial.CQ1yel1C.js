import"./disclose-version.DsnmJJEf.js";import{p as I,Z as m,g as e,u as v,f as S,n as U,a as O}from"./runtime.HAn2cbcW.js";import{c as R,a as L}from"./template.D0onEdCl.js";import{s as k}from"./snippet.ILc-veMr.js";import{p as h,s as B,r as V}from"./props.DsKWk81K.js";import{X as P,T as G,B as x,av as p,V as T,C as j,aI as q}from"./observe.svelte.BoKeyuw0.js";/* empty css                                                      */import{u as W}from"./useThrelte.CoAYwyjF.js";import{a as E,s as H}from"./store.BmD_Ou3p.js";import{y as J}from"./raycast.D2ggPI2E.js";function ie(D,a){I(a,!0);let y=h(a,"points",19,()=>[]),F=h(a,"shape",3,"none"),Y=h(a,"shapeFunction",3,()=>1),Z=h(a,"ref",15),C=V(a,["$$slots","$$events","$$legacy","points","shape","shapeFunction","ref","children"]);const r=v(()=>y().length),{invalidate:z}=W(),X=v(()=>new x(new Float32Array(e(r)*6),3)),g=v(()=>new x(new Float32Array(e(r)*6),3)),A=v(()=>new x(new Float32Array(e(r)*6),3)),b=v(()=>new x(new Float32Array(e(r)*2),1)),M=v(()=>new x(new Float32Array(e(r)*2),1)),_=v(()=>new x(new Float32Array(e(r)*2),1)),d=v(()=>new x(new Float32Array(e(r)*4),2)),w=v(()=>new x(new Uint32Array(e(r)*6),1)),l=v(()=>F()==="taper"?o=>4*o*(1-o):Y()),u=new P;m(()=>{const o=e(r)-1||1;for(let s=0,t=0,i=0;s<e(r);s+=1,t+=2,i+=6){e(b).setX(t,s/e(r)),e(b).setX(t+1,s/e(r)),e(M).setX(t,1),e(M).setX(t+1,-1);const c=F()==="none"?1:e(l)(s/o);if(e(_).setX(t,c),e(_).setX(t+1,c),e(d).setXYZW(t,s/o,0,s/o,1),s<e(r)-1){const f=s*2;e(w).setX(i+0,f+0),e(w).setX(i+1,f+1),e(w).setX(i+2,f+2),e(w).setX(i+3,f+2),e(w).setX(i+4,f+1),e(w).setX(i+5,f+3)}}u.setAttribute("position",e(X)),u.setAttribute("previous",e(g)),u.setAttribute("next",e(A)),u.setAttribute("counters",e(b)),u.setAttribute("side",e(M)),u.setAttribute("width",e(_)),u.setAttribute("uv",e(d)),u.setIndex(e(w)),e(_).needsUpdate=!0,z()}),m(()=>{if(y().length===0)return;let o=0,s=0,t=0;const i=y()[0];e(g).setXYZ(s,i.x,i.y,i.z),s+=1,e(g).setXYZ(s,i.x,i.y,i.z),s+=1;for(let f=0;f<e(r);f++){const n=y()[f];e(X).setXYZ(o,n.x,n.y,n.z),o+=1,e(X).setXYZ(o,n.x,n.y,n.z),o+=1,f<e(r)-1&&(e(g).setXYZ(s,n.x,n.y,n.z),s+=1,e(g).setXYZ(s,n.x,n.y,n.z),s+=1),f>0&&(e(A).setXYZ(t,n.x,n.y,n.z),t+=1,e(A).setXYZ(t,n.x,n.y,n.z),t+=1)}const c=y()[e(r)-1];e(A).setXYZ(t,c.x,c.y,c.z),t+=1,e(A).setXYZ(t,c.x,c.y,c.z),t+=1,e(X).needsUpdate=!0,e(g).needsUpdate=!0,e(A).needsUpdate=!0,u.computeBoundingSphere(),z()}),G(D,B({get is(){return u}},()=>C,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/MeshLine/MeshLineGeometry.svelte",index:0},get ref(){return Z()},set ref(o){Z(o)},children:(o,s)=>{var t=R(),i=S(t);k(i,()=>a.children??U,()=>({ref:u})),L(o,t)},$$slots:{default:!0}})),O()}const K=`
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>

uniform float useDash;
uniform float dashArray;
uniform float dashOffset;
uniform float dashRatio;
uniform sampler2D alphaMap;
uniform float useAlphaMap;

varying vec2 vUV;
varying vec4 vColor;
varying float vCounters;

void main()	{
	#include <logdepthbuf_fragment>

	vec4 c = vColor;

	if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV ).r;

	if( useDash == 1. ){
		c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
	}

	gl_FragColor = c;

	#include <colorspace_fragment>
	#include <fog_fragment>
}
`;function le(D,a){I(a,!0);const y=()=>E(w,"$size",F),[F,Y]=H();let Z=h(a,"opacity",3,1),C=h(a,"color",3,"#ffffff"),r=h(a,"dashOffset",3,0),z=h(a,"dashArray",3,0),X=h(a,"dashRatio",3,0),g=h(a,"attenuate",3,!0),A=h(a,"width",3,1),b=h(a,"scaleDown",3,0),M=h(a,"ref",15),_=V(a,["$$slots","$$events","$$legacy","opacity","color","dashOffset","dashArray","dashRatio","attenuate","width","scaleDown","alphaMap","ref","children"]),{invalidate:d,size:w}=W();const l={lineWidth:new p(1),color:new p(new j("#ffffff")),opacity:new p(1),resolution:new p(new T(1,1)),sizeAttenuation:new p(1),dashArray:new p(0),useDash:new p(0),dashOffset:new p(0),dashRatio:new p(0),scaleDown:new p(0),alphaMap:new p(void 0),useAlphaMap:new p(0)},u=new q({uniforms:l});m(()=>{l.lineWidth.value=A(),d()}),m(()=>{l.opacity.value=Z(),d()}),m(()=>{l.resolution.value.set(y().width,y().height),d()}),m(()=>{l.sizeAttenuation.value=g()?1:0,d()}),m(()=>{l.dashArray.value=z(),l.useDash.value=z()>0?1:0,d()}),m(()=>{l.dashOffset.value=r(),d()}),m(()=>{l.dashRatio.value=X(),d()}),m(()=>{l.scaleDown.value=b()/10,d()}),m(()=>{l.alphaMap.value=a.alphaMap,l.useAlphaMap.value=a.alphaMap?1:0,d()}),m(()=>{l.color.value.set(C()),d()});var o={material:u};G(D,B({get is(){return u},get fragmentShader(){return K},get vertexShader(){return J}},()=>_,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/MeshLine/MeshLineMaterial.svelte",index:0},get ref(){return M()},set ref(t){M(t)},children:(t,i)=>{var c=R(),f=S(c);k(f,()=>a.children??U,()=>({ref:u})),L(t,c)},$$slots:{default:!0}}));var s=O(o);return Y(),s}export{ie as M,le as a};
