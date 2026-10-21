import"./disclose-version.DsnmJJEf.js";import{p as C,L as s,f as S,n as z,a as L}from"./runtime.BedC1VoK.js";import{c as U,a as b}from"./template.CRvxzHa8.js";import{s as V}from"./snippet.DJLeyYvd.js";import{p as o,s as k,r as I}from"./props.IXTf2h6r.js";import{s as T,a as W}from"./store.2D4VV-eu.js";import{U as t,I as F,O as P,h as j,o as q}from"./observe.svelte.CfGpyHIb.js";/* empty css                                                      */import{u as B}from"./useThrelte.BeIV9kYF.js";import{v as E}from"./index.CuHW201-.js";const G=`
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
`;function te(d,e){C(e,!0);const l=()=>T(D,"$size",c),[c,p]=W();let m=o(e,"opacity",3,1),v=o(e,"color",3,"#ffffff"),g=o(e,"dashOffset",3,0),f=o(e,"dashArray",3,0),w=o(e,"dashRatio",3,0),M=o(e,"attenuate",3,!0),y=o(e,"width",3,1),_=o(e,"scaleDown",3,0),h=o(e,"ref",15),A=I(e,["$$slots","$$events","$$legacy","opacity","color","dashOffset","dashArray","dashRatio","attenuate","width","scaleDown","alphaMap","ref","children"]),{invalidate:r,size:D}=B();const a={lineWidth:new t(1),color:new t(new F("#ffffff")),opacity:new t(1),resolution:new t(new q(1,1)),sizeAttenuation:new t(1),dashArray:new t(0),useDash:new t(0),dashOffset:new t(0),dashRatio:new t(0),scaleDown:new t(0),alphaMap:new t(void 0),useAlphaMap:new t(0)},n=new P({uniforms:a});s(()=>{a.lineWidth.value=y(),r()}),s(()=>{a.opacity.value=m(),r()}),s(()=>{a.resolution.value.set(l().width,l().height),r()}),s(()=>{a.sizeAttenuation.value=M()?1:0,r()}),s(()=>{a.dashArray.value=f(),a.useDash.value=f()>0?1:0,r()}),s(()=>{a.dashOffset.value=g(),r()}),s(()=>{a.dashRatio.value=w(),r()}),s(()=>{a.scaleDown.value=_()/10,r()}),s(()=>{a.alphaMap.value=e.alphaMap,a.useAlphaMap.value=e.alphaMap?1:0,r()}),s(()=>{a.color.value.set(v()),r()});var O={material:n};j(d,k({get is(){return n},get fragmentShader(){return G},get vertexShader(){return E}},()=>A,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/MeshLine/MeshLineMaterial.svelte",index:0},get ref(){return h()},set ref(i){h(i)},children:(i,H)=>{var u=U(),R=S(u);V(R,()=>e.children??z,()=>({ref:n})),b(i,u)},$$slots:{default:!0}}));var x=L(O);return p(),x}export{te as M};
