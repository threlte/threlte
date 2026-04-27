import"./disclose-version.DsnmJJEf.js";import{p as l,f as i,n as p,a as m}from"./runtime.QwcowWmd.js";import{c as d,a as f}from"./template.BTOqUpqr.js";import{s as c}from"./snippet.C4xr2bBf.js";import{p as g,s as u,r as h}from"./props.DGdK2eRS.js";/* empty css                                                      */import{T as _,z as P}from"./observe.svelte.xONaORci.js";const x=`
    #include <opaque_fragment>
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard;
    float delta = fwidth(r);     
    float mask = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
    gl_FragColor.a = mask * gl_FragColor.a;
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  `;class v extends P{constructor(){super(),this.alphaToCoverage=!0,this.onBeforeCompile=(e,r)=>{e.fragmentShader=e.fragmentShader.replace("#include <opaque_fragment>",x)}}}function F(a,e){l(e,!0);let r=g(e,"ref",15),s=h(e,["$$slots","$$events","$$legacy","children","ref"]);_(a,u({get is(){return v}},()=>s,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/PointsMaterial/PointsMaterial.svelte",index:0},get ref(){return r()},set ref(t){r(t)},children:(t,C)=>{var o=d(),n=i(o);c(n,()=>e.children??p),f(t,o)},$$slots:{default:!0}})),m()}export{F as P};
