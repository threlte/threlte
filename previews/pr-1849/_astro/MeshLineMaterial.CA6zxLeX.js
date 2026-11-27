import"./disclose-version.DsnmJJEf.js";import{p as D,L as s,f as x,n as O,a as R}from"./runtime.DLdkg5Kz.js";import{c as C,a as S}from"./template.B2QqRX6L.js";import{s as L}from"./snippet.CCzzTW4D.js";import{p as o,s as U,r as b}from"./props.Dt84Ixko.js";import{U as t,_ as z,a0 as V,a as k,t as T}from"./observe.svelte.Cp4l21sn.js";/* empty css                                                      */import{u as W}from"./useThrelte.B3LKSjsY.js";import{v as F}from"./index.D7yoe72k.js";const I=`
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
`;function Q(d,a){D(a,!0);let c=o(a,"opacity",3,1),m=o(a,"color",3,"#ffffff"),p=o(a,"dashOffset",3,0),i=o(a,"dashArray",3,0),v=o(a,"dashRatio",3,0),w=o(a,"attenuate",3,!0),g=o(a,"width",3,1),M=o(a,"scaleDown",3,0),f=o(a,"ref",15),y=b(a,["$$slots","$$events","$$legacy","opacity","color","dashOffset","dashArray","dashRatio","attenuate","width","scaleDown","alphaMap","ref","children"]),{invalidate:r,size:h}=W();const e={lineWidth:new t(1),color:new t(new z("#ffffff")),opacity:new t(1),resolution:new t(new T(1,1)),sizeAttenuation:new t(1),dashArray:new t(0),useDash:new t(0),dashOffset:new t(0),dashRatio:new t(0),scaleDown:new t(0),alphaMap:new t(void 0),useAlphaMap:new t(0)},n=new V({uniforms:e});s(()=>{e.lineWidth.value=g(),r()}),s(()=>{e.opacity.value=c(),r()}),s(()=>{e.resolution.value.set(h.current.width,h.current.height),r()}),s(()=>{e.sizeAttenuation.value=w()?1:0,r()}),s(()=>{e.dashArray.value=i(),e.useDash.value=i()>0?1:0,r()}),s(()=>{e.dashOffset.value=p(),r()}),s(()=>{e.dashRatio.value=v(),r()}),s(()=>{e.scaleDown.value=M()/10,r()}),s(()=>{e.alphaMap.value=a.alphaMap,e.useAlphaMap.value=a.alphaMap?1:0,r()}),s(()=>{e.color.value.set(m()),r()});var A={material:n};return k(d,U({get is(){return n},get fragmentShader(){return I},get vertexShader(){return F}},()=>y,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/MeshLine/MeshLineMaterial.svelte",index:0},get ref(){return f()},set ref(l){f(l)},children:(l,P)=>{var u=C(),_=x(u);L(_,()=>a.children??O,()=>({ref:n})),S(l,u)},$$slots:{default:!0}})),R(A)}export{Q as M};
