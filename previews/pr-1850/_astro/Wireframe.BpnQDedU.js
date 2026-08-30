import"./disclose-version.DsnmJJEf.js";import{D as O,u as P,au as i,C as h,i as T,B as I}from"./observe.svelte.DGtC0W2K.js";import{p as G,L as n,a as F}from"./runtime.Cq5xh0TU.js";import{p as K}from"./props.BuNG_qsO.js";import{a as L,s as R}from"./store.Bdk9semh.js";/* empty css                                                      */import{u as D}from"./useThrelte.Bj7aS8bK.js";const q={vertex:`
attribute vec3 barycentric;

varying vec3 v_edges_Barycentric;
varying vec3 v_edges_Position;

void initWireframe() {
  v_edges_Barycentric = barycentric;
  v_edges_Position = position.xyz;
}`,fragment:`
#ifndef PI
  #define PI 3.1415926535897932384626433832795
#endif

varying vec3 v_edges_Barycentric;
varying vec3 v_edges_Position;

uniform float strokeOpacity;
uniform float fillOpacity;
uniform float fillMix;
uniform float thickness;
uniform bool colorBackfaces;

// Dash
uniform bool dashInvert;
uniform bool dash;
uniform float dashRepeats;
uniform float dashLength;

// Squeeze
uniform bool squeeze;
uniform float squeezeMin;
uniform float squeezeMax;

// Colors
uniform vec3 stroke;
uniform vec3 backfaceStroke;
uniform vec3 fill;

// This is like
float wireframe_aastep(float threshold, float dist) {
  float afwidth = fwidth(dist) * 0.5;
  return smoothstep(threshold - afwidth, threshold + afwidth, dist);
}

float getWireframe() {
  vec3 barycentric = v_edges_Barycentric;

  // for dashed rendering, we can use this to get the 0 .. 1 value of the line length
  float positionAlong = max(barycentric.x, barycentric.y);
  if (barycentric.y < barycentric.x && barycentric.y < barycentric.z) {
    positionAlong = 1.0 - positionAlong;
  }

  // The thickness of the stroke, in approximate screen pixels.
  float computedThickness = thickness;

  // if we want to shrink the thickness toward the center of the line segment
  if (squeeze) {
    computedThickness *= mix(squeezeMin, squeezeMax, (1.0 - sin(positionAlong * PI)));
  }

  // Create dash pattern
  if (dash) {
    float repeats = max(dashRepeats, 0.0001);
    float length = clamp(dashLength, 0.0, 1.0);

    // here we offset the stroke position depending on whether it
    // should overlap or not
    float offset = 1.0 / repeats * length / 2.0;
    if (!dashInvert) {
      offset += 1.0 / repeats / 2.0;
    }

    // if we should animate the dash or not
    // if (dashAnimate) {
    // 	offset += time * 0.22;
    // }

    // create the repeating dash pattern
    float pattern = fract((positionAlong + offset) * repeats);
    computedThickness *= 1.0 - wireframe_aastep(length, pattern);
  }

  if (computedThickness <= 0.0) {
    return 0.0;
  }

  // Compute the anti-aliased stroke edge in screen space so triangle shape
  // does not change apparent line thickness.
  vec3 width = fwidth(barycentric);
  vec3 edge = smoothstep(
    width * max(computedThickness - 0.5, 0.0),
    width * (computedThickness + 0.5),
    barycentric
  );

  return 1.0 - min(min(edge.x, edge.y), edge.z);
}`},U=(e,t)=>{const s=e.onBeforeCompile,o=e.customProgramCacheKey,l=o.call(e),a=e.side,r=e.transparent;return e.onBeforeCompile=(c,u)=>{s.call(e,c,u),Object.assign(c.uniforms,t),c.vertexShader=c.vertexShader.replace("void main() {",`
${q.vertex}
void main() {
  initWireframe();`),c.fragmentShader=c.fragmentShader.replace("void main() {",`
${q.fragment}
void main() {`),c.fragmentShader=c.fragmentShader.replace("#include <color_fragment>",`
#include <color_fragment>
float edge = getWireframe();
vec4 colorStroke = vec4(stroke, edge);
if (colorBackfaces && !gl_FrontFacing) {
colorStroke.rgb = backfaceStroke;
}
vec4 colorFill = vec4(mix(diffuseColor.rgb, fill, fillMix), mix(diffuseColor.a, fillOpacity, fillMix));
vec4 outColor = mix(colorFill, colorStroke, edge * strokeOpacity);

diffuseColor.rgb = outColor.rgb;
diffuseColor.a *= outColor.a;`)},e.customProgramCacheKey=()=>`${l}|threlte-wireframe`,e.side=O,e.transparent=!0,e.needsUpdate=!0,()=>{e.onBeforeCompile=s,e.customProgramCacheKey=o,e.side=a,e.transparent=r,e.needsUpdate=!0}},j=(e,t)=>{const s=e.getAttribute("position"),o=new Float32Array(s.count*3),l=t?1:0;for(let a=0,r=o.length;a<r;a+=9)a/9%2===0?(o[a+2]=1,o[a+4]=1,o[a+6]=1,o[a+8]=l):(o[a+1]=1,o[a+5]=1,o[a+6]=1,o[a+8]=l);return new I(o,3)},E=(e,t)=>{const s=e.index?e.toNonIndexed():e.clone();if(!s.getAttribute("position")){s.dispose();return}const o=j(s,t);return s.setAttribute("barycentric",o),s};function $(e,t){G(t,!0);const s=()=>L(c,"$parent",o),[o,l]=R();let a=K(t,"simplify",3,!1);const{invalidate:r}=D(),c=P(),u=new i(0),g=new i(0),p=new i(0),v=new i(0),y=new i(!1),w=new i(!0),k=new i(!1),b=new i(0),x=new i(0),C=new i(!1),_=new i(0),M=new i(0),S=new i(new h),z=new i(new h),B=new i(new h);n(()=>{u.value=t.fillOpacity??0,r()}),n(()=>{p.value=t.fillMix??0,r()}),n(()=>{g.value=t.strokeOpacity??1,r()}),n(()=>{v.value=t.thickness??1,r()}),n(()=>{y.value=t.colorBackfaces??!1,r()}),n(()=>{k.value=t.dash??!1,r()}),n(()=>{w.value=t.dashInvert??!0,r()}),n(()=>{b.value=t.dashRepeats??4,r()}),n(()=>{x.value=t.dashLength??.5,r()}),n(()=>{C.value=t.squeeze??!1,r()}),n(()=>{_.value=t.squeezeMin??.2,r()}),n(()=>{M.value=t.squeezeMax??1,r()}),n(()=>{S.value.set(t.stroke??"#ff0000"),r()}),n(()=>{B.value.set(t.fill??"#00ff00"),r()}),n(()=>{z.value.set(t.backfaceStroke??"#0000ff"),r()}),n(()=>{const f=s();if(!T(f,"Mesh"))return;if(!f.geometry){console.error("Wireframe: Must be a child of a Mesh with a geometry.");return}if(f.geometry.type==="WireframeGeometry"){console.error("Wireframe: WireframeGeometry is not supported.");return}const W=f.geometry,m=E(W,a());if(!m){console.error("Wireframe: Geometry must have a position attribute.");return}const A=(Array.isArray(f.material)?f.material:[f.material]).map(d=>U(d,{fillOpacity:u,strokeOpacity:g,fillMix:p,thickness:v,colorBackfaces:y,dashInvert:w,dash:k,dashRepeats:b,dashLength:x,squeeze:C,squeezeMin:_,squeezeMax:M,stroke:S,backfaceStroke:z,fill:B}));return f.geometry=m,()=>{A.forEach(d=>d()),f.geometry===m&&(f.geometry=W),m.dispose()}}),F(),l()}export{$ as W};
