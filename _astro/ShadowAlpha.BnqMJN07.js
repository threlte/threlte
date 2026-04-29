import"./disclose-version.DsnmJJEf.js";import{p as M,f as v,s as w,a as A}from"./runtime.HAn2cbcW.js";import{f as S,a as g}from"./template.D0onEdCl.js";import{aJ as y,a as x,b0 as D,aN as b,aO as O,i as _,ar as o,T as u}from"./observe.svelte.itpAhydl.js";/* empty css                                                      */import{u as P}from"./useTask.svelte.DDWhef3l.js";const k=`
    float bayerDither2x2(vec2 v) {
      return mod(3.0 * v.y + 2.0 * v.x, 4.0);
    }
    float bayerDither4x4(vec2 v) {
      vec2 P1 = mod(v, 2.0);
      vec2 P2 = mod(floor(0.5 * v), 2.0);
      return 4.0 * bayerDither2x2(P1) + bayerDither2x2(P2);
    }
  `,c=(t,e)=>{t.onBeforeCompile=a=>{a.uniforms.uShadowOpacity=e.uShadowOpacity,a.uniforms.uAlphaMap=e.uAlphaMap,a.uniforms.uHasAlphaMap=e.uHasAlphaMap,a.fragmentShader=a.fragmentShader.replace("void main() {",`
          uniform float uShadowOpacity;
          uniform sampler2D uAlphaMap;
          uniform bool uHasAlphaMap;
          ${k}
          void main() {
        `),a.fragmentShader=a.fragmentShader.replace("#include <clipping_planes_fragment>",`
          #include <clipping_planes_fragment>
          float shadowAlpha = uShadowOpacity;
          #ifdef USE_UV
            if (uHasAlphaMap) shadowAlpha *= texture(uAlphaMap, vUv).x;
          #endif
          if ((bayerDither4x4(floor(mod(gl_FragCoord.xy, 4.0)))) / 16.0 >= shadowAlpha) discard;
        `)}};var H=S("<!> <!>",1);function E(t,e){M(e,!0);const a={uShadowOpacity:new o(1),uAlphaMap:new o(null),uHasAlphaMap:new o(!1)},l=new y({depthPacking:x}),p=new D;c(l,a),c(p,a);const m=b(O());P(()=>{const h=m.current;if(!_(h,"Mesh"))return;const r=h.material;if(!r)return;const f=e.opacity??r.opacity??1,s=e.alphaMap===!1?null:e.alphaMap??r.alphaMap??null;a.uShadowOpacity.value=f,a.uAlphaMap.value=s,a.uHasAlphaMap.value=s!==null});var n=H(),i=v(n);u(i,{get is(){return l},attach:"customDepthMaterial",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ShadowAlpha/ShadowAlpha.svelte",index:0}});var d=w(i,2);u(d,{get is(){return p},attach:"customDistanceMaterial",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ShadowAlpha/ShadowAlpha.svelte",index:1}}),g(t,n),A()}export{E as S};
