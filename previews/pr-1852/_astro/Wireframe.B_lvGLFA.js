import"./disclose-version.DsnmJJEf.js";import{D as O,u as P,au as a,C as h,i as T,B as I}from"./observe.svelte.Ozl9YK2M.js";import{p as G,L as i,Z as F,a as K}from"./runtime.Cq5xh0TU.js";import{p as L}from"./props.BuNG_qsO.js";import{a as R,s as D}from"./store.Bdk9semh.js";/* empty css                                                      */import{u as U}from"./useThrelte.BT4stfup.js";const q={vertex:`
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
}`},j=(e,t)=>{const s=e.onBeforeCompile,o=e.customProgramCacheKey,l=o.call(e),n=e.side,r=e.transparent;return e.onBeforeCompile=(c,u)=>{s.call(e,c,u),Object.assign(c.uniforms,t),c.vertexShader=c.vertexShader.replace("void main() {",`
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
diffuseColor.a *= outColor.a;`)},e.customProgramCacheKey=()=>`${l}|threlte-wireframe`,e.side=O,e.transparent=!0,e.needsUpdate=!0,()=>{e.onBeforeCompile=s,e.customProgramCacheKey=o,e.side=n,e.transparent=r,e.needsUpdate=!0}},E=(e,t)=>{const s=e.getAttribute("position"),o=new Float32Array(s.count*3),l=t?1:0;for(let n=0,r=o.length;n<r;n+=9)n/9%2===0?(o[n+2]=1,o[n+4]=1,o[n+6]=1,o[n+8]=l):(o[n+1]=1,o[n+5]=1,o[n+6]=1,o[n+8]=l);return new I(o,3)},N=(e,t)=>{const s=e.index?e.toNonIndexed():e.clone();if(!s.getAttribute("position")){s.dispose();return}const o=E(s,t);return s.setAttribute("barycentric",o),s};function ee(e,t){G(t,!0);const s=()=>R(c,"$parent",o),[o,l]=D();let n=L(t,"simplify",3,!1);const{invalidate:r}=U(),c=P(),u=new a(0),g=new a(0),p=new a(0),v=new a(0),y=new a(!1),w=new a(!0),k=new a(!1),b=new a(0),x=new a(0),_=new a(!1),C=new a(0),M=new a(0),S=new a(new h),z=new a(new h),B=new a(new h);i(()=>{u.value=t.fillOpacity??0,r()}),i(()=>{p.value=t.fillMix??0,r()}),i(()=>{g.value=t.strokeOpacity??1,r()}),i(()=>{v.value=t.thickness??1,r()}),i(()=>{y.value=t.colorBackfaces??!1,r()}),i(()=>{k.value=t.dash??!1,r()}),i(()=>{w.value=t.dashInvert??!0,r()}),i(()=>{b.value=t.dashRepeats??4,r()}),i(()=>{x.value=t.dashLength??.5,r()}),i(()=>{_.value=t.squeeze??!1,r()}),i(()=>{C.value=t.squeezeMin??.2,r()}),i(()=>{M.value=t.squeezeMax??1,r()}),i(()=>{S.value.set(t.stroke??"#ff0000"),r()}),i(()=>{B.value.set(t.fill??"#00ff00"),r()}),i(()=>{z.value.set(t.backfaceStroke??"#0000ff"),r()}),F(()=>{const f=s();if(!T(f,"Mesh"))return;if(!f.geometry){console.error("Wireframe: Must be a child of a Mesh with a geometry.");return}if(f.geometry.type==="WireframeGeometry"){console.error("Wireframe: WireframeGeometry is not supported.");return}const W=f.geometry,m=N(W,n());if(!m){console.error("Wireframe: Geometry must have a position attribute.");return}const A=(Array.isArray(f.material)?f.material:[f.material]).map(d=>j(d,{fillOpacity:u,strokeOpacity:g,fillMix:p,thickness:v,colorBackfaces:y,dashInvert:w,dash:k,dashRepeats:b,dashLength:x,squeeze:_,squeezeMin:C,squeezeMax:M,stroke:S,backfaceStroke:z,fill:B}));return f.geometry=m,()=>{A.forEach(d=>d()),f.geometry===m&&(f.geometry=W),m.dispose()}}),K(),l()}export{ee as W};
