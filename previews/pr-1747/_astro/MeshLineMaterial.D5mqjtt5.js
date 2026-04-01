import"./disclose-version.DsnmJJEf.js";import{p as C,_ as d,g as e,$ as p,f as R,n as L,a as S}from"./runtime.BsM9HEgF.js";import{c as O,a as G}from"./template.BGiQ9W-B.js";import{s as I}from"./snippet.pNoFfLl0.js";import{p as f,s as T,r as U}from"./props.BdgQxxOQ.js";import{b as B,Y as V,T as k,w,h as W,C as P,aG as q}from"./observe.svelte.CpLsxWCV.js";/* empty css                                                      */import{a as E,s as j}from"./store.BuonI5uc.js";import{y as H}from"./raycast.BjdWmyxG.js";function ne(D,a){C(a,!0);let v=f(a,"points",19,()=>[]),F=f(a,"shape",3,"none"),Z=f(a,"shapeFunction",3,()=>1),b=f(a,"ref",15),Y=U(a,["$$slots","$$events","$$legacy","points","shape","shapeFunction","ref","children"]);const r=p(()=>v().length),{invalidate:x}=B(),A=p(()=>new w(new Float32Array(e(r)*6),3)),m=p(()=>new w(new Float32Array(e(r)*6),3)),y=p(()=>new w(new Float32Array(e(r)*6),3)),M=p(()=>new w(new Float32Array(e(r)*2),1)),X=p(()=>new w(new Float32Array(e(r)*2),1)),z=p(()=>new w(new Float32Array(e(r)*2),1)),u=p(()=>new w(new Float32Array(e(r)*4),2)),g=p(()=>new w(new Uint16Array(e(r)*6),1)),i=p(()=>F()==="taper"?t=>1*Math.pow(4*t*(1-t),1):Z()),l=new V;d(()=>{for(let t=0,n=0,s=0;t<e(r);t+=1,n+=2,s+=6){e(M).setX(n,t/v().length),e(M).setX(n+1,t/v().length),e(X).setX(n,1),e(X).setX(n+1,-1);const h=F()==="none"?1:e(i)(t/(e(r)-1));if(e(z).setX(n,h),e(z).setX(n+1,h),e(u).setXYZW(n,t/(e(r)-1),0,t/(e(r)-1),1),t<e(r)-1){const c=t*2;e(g).setX(s+0,c+0),e(g).setX(s+1,c+1),e(g).setX(s+2,c+2),e(g).setX(s+3,c+2),e(g).setX(s+4,c+1),e(g).setX(s+5,c+3)}}l.setAttribute("position",e(A)),l.setAttribute("previous",e(m)),l.setAttribute("next",e(y)),l.setAttribute("counters",e(M)),l.setAttribute("side",e(X)),l.setAttribute("width",e(z)),l.setAttribute("uv",e(u)),l.setIndex(e(g))}),d(()=>{if(v().length===0)return;let t=0,n=0,s=0;const h=v()[0];e(m).setXYZ(n,h.x,h.y,h.z),n+=1,e(m).setXYZ(n,h.x,h.y,h.z),n+=1;for(let _=0;_<e(r);_++){const o=v()[_];e(A).setXYZ(t,o.x,o.y,o.z),t+=1,e(A).setXYZ(t,o.x,o.y,o.z),t+=1,_<e(r)-1&&(e(m).setXYZ(n,o.x,o.y,o.z),n+=1,e(m).setXYZ(n,o.x,o.y,o.z),n+=1),_>0&&_+1<=e(r)&&(e(y).setXYZ(s,o.x,o.y,o.z),s+=1,e(y).setXYZ(s,o.x,o.y,o.z),s+=1)}const c=v()[e(r)-1];e(y).setXYZ(s,c.x,c.y,c.z),s+=1,e(y).setXYZ(s,c.x,c.y,c.z),s+=1,e(A).needsUpdate=!0,e(m).needsUpdate=!0,e(y).needsUpdate=!0,l.computeBoundingSphere(),x()}),k(D,T({get is(){return l}},()=>Y,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/MeshLine/MeshLineGeometry.svelte",index:0},get ref(){return b()},set ref(t){b(t)},children:(t,n)=>{var s=O(),h=R(s);I(h,()=>a.children??L,()=>({ref:l})),G(t,s)},$$slots:{default:!0}})),S()}const J=`
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

vec4 CustomLinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

void main()	{
	#include <logdepthbuf_fragment>
	#include <colorspace_fragment>

	vec4 c = vColor;

	if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV ).r;

	if( useDash == 1. ){
			c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
	}

	gl_FragColor = CustomLinearTosRGB(c);
}
`;function oe(D,a){C(a,!0);const v=()=>E(g,"$size",F),[F,Z]=j();let b=f(a,"opacity",3,1),Y=f(a,"color",3,"#ffffff"),r=f(a,"dashOffset",3,0),x=f(a,"dashArray",3,0),A=f(a,"dashRatio",3,0),m=f(a,"attenuate",3,!0),y=f(a,"width",3,1),M=f(a,"scaleDown",3,0),X=f(a,"ref",15),z=U(a,["$$slots","$$events","$$legacy","opacity","color","dashOffset","dashArray","dashRatio","attenuate","width","scaleDown","alphaMap","ref","children"]),{invalidate:u,size:g}=B();const i={lineWidth:{value:y()},color:{value:new P(Y())},opacity:{value:b()},resolution:{value:new W(1,1)},sizeAttenuation:{value:m()?1:0},dashArray:{value:x()},useDash:{value:x()>0?1:0},dashOffset:{value:r()},dashRatio:{value:A()},scaleDown:{value:M()/10},alphaTest:{value:0},alphaMap:{value:a.alphaMap},useAlphaMap:{value:a.alphaMap?1:0}},l=new q({uniforms:i});d(()=>{i.lineWidth.value=y(),u()}),d(()=>{i.opacity.value=b(),u()}),d(()=>{i.resolution.value.set(v().width,v().height),u()}),d(()=>{i.sizeAttenuation.value=m()?1:0,u()}),d(()=>{i.dashArray.value=x(),i.useDash.value=x()>0?1:0,u()}),d(()=>{i.dashOffset.value=r(),u()}),d(()=>{i.dashRatio.value=A(),u()}),d(()=>{i.scaleDown.value=M()/10,u()}),d(()=>{i.alphaMap.value=a.alphaMap,i.useAlphaMap.value=a.alphaMap?1:0,u()}),d(()=>{i.color.value.set(Y()),u()}),k(D,T({get is(){return l},get fragmentShader(){return J},get vertexShader(){return H}},()=>z,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/MeshLine/MeshLineMaterial.svelte",index:0},get ref(){return X()},set ref(t){X(t)},children:(t,n)=>{var s=O(),h=R(s);I(h,()=>a.children??L,()=>({ref:l})),G(t,s)},$$slots:{default:!0}})),S(),Z()}export{ne as M,oe as a};
