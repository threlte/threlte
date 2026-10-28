import"./disclose-version.DsnmJJEf.js";import{p as C,L as s,f as S,n as z,a as L}from"./runtime.DLdkg5Kz.js";import{c as U,a as b}from"./template.B2QqRX6L.js";import{s as V}from"./snippet.CCzzTW4D.js";import{p as o,s as k,r as T}from"./props.BNYK5s9I.js";import{a as W,s as F}from"./store.Dey8hlVV.js";import{U as t,_ as I,a0 as P,a as j,t as q}from"./observe.svelte.BBlBpKSz.js";/* empty css                                                      */import{u as B}from"./useThrelte.CT5RsaAy.js";import{v as E}from"./index.BUQxxys7.js";const G=`
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
`;function ta(d,a){C(a,!0);const l=()=>W(D,"$size",c),[c,p]=F();let m=o(a,"opacity",3,1),v=o(a,"color",3,"#ffffff"),g=o(a,"dashOffset",3,0),f=o(a,"dashArray",3,0),w=o(a,"dashRatio",3,0),M=o(a,"attenuate",3,!0),y=o(a,"width",3,1),_=o(a,"scaleDown",3,0),h=o(a,"ref",15),A=T(a,["$$slots","$$events","$$legacy","opacity","color","dashOffset","dashArray","dashRatio","attenuate","width","scaleDown","alphaMap","ref","children"]),{invalidate:r,size:D}=B();const e={lineWidth:new t(1),color:new t(new I("#ffffff")),opacity:new t(1),resolution:new t(new q(1,1)),sizeAttenuation:new t(1),dashArray:new t(0),useDash:new t(0),dashOffset:new t(0),dashRatio:new t(0),scaleDown:new t(0),alphaMap:new t(void 0),useAlphaMap:new t(0)},n=new P({uniforms:e});s(()=>{e.lineWidth.value=y(),r()}),s(()=>{e.opacity.value=m(),r()}),s(()=>{e.resolution.value.set(l().width,l().height),r()}),s(()=>{e.sizeAttenuation.value=M()?1:0,r()}),s(()=>{e.dashArray.value=f(),e.useDash.value=f()>0?1:0,r()}),s(()=>{e.dashOffset.value=g(),r()}),s(()=>{e.dashRatio.value=w(),r()}),s(()=>{e.scaleDown.value=_()/10,r()}),s(()=>{e.alphaMap.value=a.alphaMap,e.useAlphaMap.value=a.alphaMap?1:0,r()}),s(()=>{e.color.value.set(v()),r()});var x={material:n};j(d,k({get is(){return n},get fragmentShader(){return G},get vertexShader(){return E}},()=>A,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/MeshLine/MeshLineMaterial.svelte",index:0},get ref(){return h()},set ref(i){h(i)},children:(i,H)=>{var u=U(),R=S(u);V(R,()=>a.children??z,()=>({ref:n})),b(i,u)},$$slots:{default:!0}}));var O=L(x);return p(),O}export{ta as M};
