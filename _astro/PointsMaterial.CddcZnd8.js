import"./disclose-version.DsnmJJEf.js";import{p as n,f as i,n as p,a as d}from"./runtime.HAn2cbcW.js";import{c as f,a as m}from"./template.D0onEdCl.js";import{s as c}from"./snippet.ILc-veMr.js";import{p as u,s as g,r as h}from"./props.DsKWk81K.js";/* empty css                                                      */import{T as _,z as P}from"./observe.svelte.itpAhydl.js";const x=`
    #include <opaque_fragment>
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
	    if (r > 1.0) discard;
	    float delta = fwidth(r);     
	    float mask = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
	    gl_FragColor.a = mask * gl_FragColor.a;
	  `;class v extends P{constructor(){super(),this.alphaToCoverage=!0,this.onBeforeCompile=(e,r)=>{e.fragmentShader=e.fragmentShader.replace("#include <opaque_fragment>",x)}}}function F(a,e){n(e,!0);let r=u(e,"ref",15),s=h(e,["$$slots","$$events","$$legacy","children","ref"]);_(a,g({get is(){return v}},()=>s,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/PointsMaterial/PointsMaterial.svelte",index:0},get ref(){return r()},set ref(t){r(t)},children:(t,C)=>{var o=f(),l=i(o);c(l,()=>e.children??p),m(t,o)},$$slots:{default:!0}})),d()}export{F as P};
