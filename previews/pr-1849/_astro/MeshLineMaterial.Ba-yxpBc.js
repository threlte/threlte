import"./disclose-version.DsnmJJEf.js";import{p as I,Z as p,g as e,u as m,f as S,n as U,a as O}from"./runtime.Cq5xh0TU.js";import{c as R,a as L}from"./template.L6xDPO6U.js";import{s as k}from"./snippet.B1WTn4og.js";import{p as f,s as B,r as V}from"./props.D2nmUwxA.js";import{X as P,T as G,B as A,av as c,V as T,C as E,aI as j}from"./observe.svelte.C0rBo_1K.js";/* empty css                                                      */import{u as W}from"./useThrelte.Wdl2QUb4.js";import{E as q}from"./raycast.CFpYK-V8.js";function re(D,t){I(t,!0);let x=f(t,"points",19,()=>[]),F=f(t,"shape",3,"none"),Y=f(t,"shapeFunction",3,()=>1),z=f(t,"ref",15),C=V(t,["$$slots","$$events","$$legacy","points","shape","shapeFunction","ref","children"]);const r=m(()=>x().length),{invalidate:Z}=W(),X=m(()=>new A(new Float32Array(e(r)*6),3)),w=m(()=>new A(new Float32Array(e(r)*6),3)),g=m(()=>new A(new Float32Array(e(r)*6),3)),u=m(()=>new A(new Float32Array(e(r)*2),1)),M=m(()=>new A(new Float32Array(e(r)*2),1)),n=m(()=>new A(new Float32Array(e(r)*2),1)),_=m(()=>new A(new Float32Array(e(r)*4),2)),v=m(()=>new A(new Uint32Array(e(r)*6),1)),b=m(()=>F()==="taper"?o=>4*o*(1-o):Y()),d=new P;p(()=>{const o=e(r)-1||1;for(let a=0,s=0,l=0;a<e(r);a+=1,s+=2,l+=6){e(u).setX(s,a/e(r)),e(u).setX(s+1,a/e(r)),e(M).setX(s,1),e(M).setX(s+1,-1);const y=F()==="none"?1:e(b)(a/o);if(e(n).setX(s,y),e(n).setX(s+1,y),e(_).setXYZW(s,a/o,0,a/o,1),a<e(r)-1){const h=a*2;e(v).setX(l+0,h+0),e(v).setX(l+1,h+1),e(v).setX(l+2,h+2),e(v).setX(l+3,h+2),e(v).setX(l+4,h+1),e(v).setX(l+5,h+3)}}d.setAttribute("position",e(X)),d.setAttribute("previous",e(w)),d.setAttribute("next",e(g)),d.setAttribute("counters",e(u)),d.setAttribute("side",e(M)),d.setAttribute("width",e(n)),d.setAttribute("uv",e(_)),d.setIndex(e(v)),e(n).needsUpdate=!0,Z()}),p(()=>{if(x().length===0)return;let o=0,a=0,s=0;const l=x()[0];e(w).setXYZ(a,l.x,l.y,l.z),a+=1,e(w).setXYZ(a,l.x,l.y,l.z),a+=1;for(let h=0;h<e(r);h++){const i=x()[h];e(X).setXYZ(o,i.x,i.y,i.z),o+=1,e(X).setXYZ(o,i.x,i.y,i.z),o+=1,h<e(r)-1&&(e(w).setXYZ(a,i.x,i.y,i.z),a+=1,e(w).setXYZ(a,i.x,i.y,i.z),a+=1),h>0&&(e(g).setXYZ(s,i.x,i.y,i.z),s+=1,e(g).setXYZ(s,i.x,i.y,i.z),s+=1)}const y=x()[e(r)-1];e(g).setXYZ(s,y.x,y.y,y.z),s+=1,e(g).setXYZ(s,y.x,y.y,y.z),s+=1,e(X).needsUpdate=!0,e(w).needsUpdate=!0,e(g).needsUpdate=!0,d.computeBoundingSphere(),Z()}),G(D,B({get is(){return d}},()=>C,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/MeshLine/MeshLineGeometry.svelte",index:0},get ref(){return z()},set ref(o){z(o)},children:(o,a)=>{var s=R(),l=S(s);k(l,()=>t.children??U,()=>({ref:d})),L(o,s)},$$slots:{default:!0}})),O()}const H=`
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
`;function ne(D,t){I(t,!0);let x=f(t,"opacity",3,1),F=f(t,"color",3,"#ffffff"),Y=f(t,"dashOffset",3,0),z=f(t,"dashArray",3,0),C=f(t,"dashRatio",3,0),r=f(t,"attenuate",3,!0),Z=f(t,"width",3,1),X=f(t,"scaleDown",3,0),w=f(t,"ref",15),g=V(t,["$$slots","$$events","$$legacy","opacity","color","dashOffset","dashArray","dashRatio","attenuate","width","scaleDown","alphaMap","ref","children"]),{invalidate:u,size:M}=W();const n={lineWidth:new c(1),color:new c(new E("#ffffff")),opacity:new c(1),resolution:new c(new T(1,1)),sizeAttenuation:new c(1),dashArray:new c(0),useDash:new c(0),dashOffset:new c(0),dashRatio:new c(0),scaleDown:new c(0),alphaMap:new c(void 0),useAlphaMap:new c(0)},_=new j({uniforms:n});p(()=>{n.lineWidth.value=Z(),u()}),p(()=>{n.opacity.value=x(),u()}),p(()=>{n.resolution.value.set(M.current.width,M.current.height),u()}),p(()=>{n.sizeAttenuation.value=r()?1:0,u()}),p(()=>{n.dashArray.value=z(),n.useDash.value=z()>0?1:0,u()}),p(()=>{n.dashOffset.value=Y(),u()}),p(()=>{n.dashRatio.value=C(),u()}),p(()=>{n.scaleDown.value=X()/10,u()}),p(()=>{n.alphaMap.value=t.alphaMap,n.useAlphaMap.value=t.alphaMap?1:0,u()}),p(()=>{n.color.value.set(F()),u()});var v={material:_};return G(D,B({get is(){return _},get fragmentShader(){return H},get vertexShader(){return q}},()=>g,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/MeshLine/MeshLineMaterial.svelte",index:0},get ref(){return w()},set ref(b){w(b)},children:(b,d)=>{var o=R(),a=S(o);k(a,()=>t.children??U,()=>({ref:_})),L(b,o)},$$slots:{default:!0}})),O(v)}export{re as M,ne as a};
