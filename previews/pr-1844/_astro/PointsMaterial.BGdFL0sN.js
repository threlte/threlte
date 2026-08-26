import"./disclose-version.DsnmJJEf.js";import{p as n,f as i,n as p,a as d}from"./runtime.zyo6wXBK.js";import{c as f,a as m}from"./template.CIy_TBqb.js";import{s as c}from"./snippet.BRaEWkfs.js";import{p as h,s as u,r as g}from"./props.upYgiiOB.js";/* empty css                                                      */import{ah as _,v as P}from"./observe.svelte.Dzn6J_wL.js";const v=`
    #include <opaque_fragment>
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
	    if (r > 1.0) discard;
	    float delta = fwidth(r);     
	    float mask = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
	    gl_FragColor.a = mask * gl_FragColor.a;
	  `;class x extends P{constructor(){super(),this.alphaToCoverage=!0,this.onBeforeCompile=(e,r)=>{e.fragmentShader=e.fragmentShader.replace("#include <opaque_fragment>",v)}}}function F(a,e){n(e,!0);let r=h(e,"ref",15),s=g(e,["$$slots","$$events","$$legacy","children","ref"]);_(a,u({get is(){return x}},()=>s,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/PointsMaterial/PointsMaterial.svelte",index:0},get ref(){return r()},set ref(t){r(t)},children:(t,C)=>{var o=f(),l=i(o);c(l,()=>e.children??p),m(t,o)},$$slots:{default:!0}})),d()}export{F as P};
