import"./disclose-version.DsnmJJEf.js";import{p as S,az as m,g as e,u as w,f as U,n as I,a as O}from"./runtime.BBxoejyG.js";import{c as R,a as L}from"./template.Bs5bR2Nc.js";import{s as k}from"./snippet.DUyBEcRR.js";import{p as h,s as B,r as G}from"./props.CGk66viq.js";import{G as P,ah as V,B as x,as as p,V as T,C as E,aF as j}from"./observe.svelte.CFYFNOc8.js";/* empty css                                                      */import{u as W}from"./useThrelte.o9barqGH.js";import{s as q,a as H}from"./store.5lYVrety.js";import{E as J}from"./raycast.CJUCE62l.js";function ie(Y,a){S(a,!0);let y=h(a,"points",19,()=>[]),b=h(a,"shape",3,"none"),Z=h(a,"shapeFunction",3,()=>1),D=h(a,"ref",15),C=G(a,["$$slots","$$events","$$legacy","points","shape","shapeFunction","ref","children"]);const r=w(()=>y().length),{invalidate:z}=W(),X=w(()=>new x(new Float32Array(e(r)*6),3)),g=w(()=>new x(new Float32Array(e(r)*6),3)),A=w(()=>new x(new Float32Array(e(r)*6),3)),F=w(()=>new x(new Float32Array(e(r)*2),1)),M=w(()=>new x(new Float32Array(e(r)*2),1)),_=w(()=>new x(new Float32Array(e(r)*2),1)),d=w(()=>new x(new Float32Array(e(r)*4),2)),v=w(()=>new x(new Uint32Array(e(r)*6),1)),l=w(()=>b()==="taper"?o=>4*o*(1-o):Z()),u=new P;m(()=>{const o=e(r)-1||1;for(let s=0,t=0,i=0;s<e(r);s+=1,t+=2,i+=6){e(F).setX(t,s/e(r)),e(F).setX(t+1,s/e(r)),e(M).setX(t,1),e(M).setX(t+1,-1);const c=b()==="none"?1:e(l)(s/o);if(e(_).setX(t,c),e(_).setX(t+1,c),e(d).setXYZW(t,s/o,0,s/o,1),s<e(r)-1){const f=s*2;e(v).setX(i+0,f+0),e(v).setX(i+1,f+1),e(v).setX(i+2,f+2),e(v).setX(i+3,f+2),e(v).setX(i+4,f+1),e(v).setX(i+5,f+3)}}u.setAttribute("position",e(X)),u.setAttribute("previous",e(g)),u.setAttribute("next",e(A)),u.setAttribute("counters",e(F)),u.setAttribute("side",e(M)),u.setAttribute("width",e(_)),u.setAttribute("uv",e(d)),u.setIndex(e(v)),e(_).needsUpdate=!0,z()}),m(()=>{if(y().length===0)return;let o=0,s=0,t=0;const i=y()[0];e(g).setXYZ(s,i.x,i.y,i.z),s+=1,e(g).setXYZ(s,i.x,i.y,i.z),s+=1;for(let f=0;f<e(r);f++){const n=y()[f];e(X).setXYZ(o,n.x,n.y,n.z),o+=1,e(X).setXYZ(o,n.x,n.y,n.z),o+=1,f<e(r)-1&&(e(g).setXYZ(s,n.x,n.y,n.z),s+=1,e(g).setXYZ(s,n.x,n.y,n.z),s+=1),f>0&&(e(A).setXYZ(t,n.x,n.y,n.z),t+=1,e(A).setXYZ(t,n.x,n.y,n.z),t+=1)}const c=y()[e(r)-1];e(A).setXYZ(t,c.x,c.y,c.z),t+=1,e(A).setXYZ(t,c.x,c.y,c.z),t+=1,e(X).needsUpdate=!0,e(g).needsUpdate=!0,e(A).needsUpdate=!0,u.computeBoundingSphere(),z()}),V(Y,B({get is(){return u}},()=>C,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/MeshLine/MeshLineGeometry.svelte",index:0},get ref(){return D()},set ref(o){D(o)},children:(o,s)=>{var t=R(),i=U(t);k(i,()=>a.children??I,()=>({ref:u})),L(o,t)},$$slots:{default:!0}})),O()}const K=`
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
`;function le(Y,a){S(a,!0);const y=()=>q(v,"$size",b),[b,Z]=H();let D=h(a,"opacity",3,1),C=h(a,"color",3,"#ffffff"),r=h(a,"dashOffset",3,0),z=h(a,"dashArray",3,0),X=h(a,"dashRatio",3,0),g=h(a,"attenuate",3,!0),A=h(a,"width",3,1),F=h(a,"scaleDown",3,0),M=h(a,"ref",15),_=G(a,["$$slots","$$events","$$legacy","opacity","color","dashOffset","dashArray","dashRatio","attenuate","width","scaleDown","alphaMap","ref","children"]),{invalidate:d,size:v}=W();const l={lineWidth:new p(1),color:new p(new E("#ffffff")),opacity:new p(1),resolution:new p(new T(1,1)),sizeAttenuation:new p(1),dashArray:new p(0),useDash:new p(0),dashOffset:new p(0),dashRatio:new p(0),scaleDown:new p(0),alphaMap:new p(void 0),useAlphaMap:new p(0)},u=new j({uniforms:l});m(()=>{l.lineWidth.value=A(),d()}),m(()=>{l.opacity.value=D(),d()}),m(()=>{l.resolution.value.set(y().width,y().height),d()}),m(()=>{l.sizeAttenuation.value=g()?1:0,d()}),m(()=>{l.dashArray.value=z(),l.useDash.value=z()>0?1:0,d()}),m(()=>{l.dashOffset.value=r(),d()}),m(()=>{l.dashRatio.value=X(),d()}),m(()=>{l.scaleDown.value=F()/10,d()}),m(()=>{l.alphaMap.value=a.alphaMap,l.useAlphaMap.value=a.alphaMap?1:0,d()}),m(()=>{l.color.value.set(C()),d()});var o={material:u};V(Y,B({get is(){return u},get fragmentShader(){return K},get vertexShader(){return J}},()=>_,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/MeshLine/MeshLineMaterial.svelte",index:0},get ref(){return M()},set ref(t){M(t)},children:(t,i)=>{var c=R(),f=U(c);k(f,()=>a.children??I,()=>({ref:u})),L(t,c)},$$slots:{default:!0}}));var s=O(o);return Z(),s}export{ie as M,le as a};
