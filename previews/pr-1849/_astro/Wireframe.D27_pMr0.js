import"./disclose-version.DsnmJJEf.js";import{D as B,u as W,av as i,C as h,i as q,B as A}from"./observe.svelte.TvC_xpcN.js";import{p as O,Z as n,a as P}from"./runtime.Cq5xh0TU.js";import{p as I}from"./props.D2nmUwxA.js";/* empty css                                                      */const S={vertex:`
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
}`},T=(e,t)=>{const a=e.onBeforeCompile,r=e.customProgramCacheKey,f=r.call(e),o=e.side,l=e.transparent;return e.onBeforeCompile=(s,u)=>{a.call(e,s,u),Object.assign(s.uniforms,t),s.vertexShader=s.vertexShader.replace("void main() {",`
${S.vertex}
void main() {
  initWireframe();`),s.fragmentShader=s.fragmentShader.replace("void main() {",`
${S.fragment}
void main() {`),s.fragmentShader=s.fragmentShader.replace("#include <color_fragment>",`
#include <color_fragment>
float edge = getWireframe();
vec4 colorStroke = vec4(stroke, edge);
if (colorBackfaces && !gl_FrontFacing) {
colorStroke.rgb = backfaceStroke;
}
vec4 colorFill = vec4(mix(diffuseColor.rgb, fill, fillMix), mix(diffuseColor.a, fillOpacity, fillMix));
vec4 outColor = mix(colorFill, colorStroke, edge * strokeOpacity);

diffuseColor.rgb = outColor.rgb;
diffuseColor.a *= outColor.a;`)},e.customProgramCacheKey=()=>`${f}|threlte-wireframe`,e.side=B,e.transparent=!0,e.needsUpdate=!0,()=>{e.onBeforeCompile=a,e.customProgramCacheKey=r,e.side=o,e.transparent=l,e.needsUpdate=!0}},G=(e,t)=>{const a=e.getAttribute("position"),r=new Float32Array(a.count*3),f=t?1:0;for(let o=0,l=r.length;o<l;o+=9)o/9%2===0?(r[o+2]=1,r[o+4]=1,r[o+6]=1,r[o+8]=f):(r[o+1]=1,r[o+5]=1,r[o+6]=1,r[o+8]=f);return new A(r,3)},F=(e,t)=>{const a=e.index?e.toNonIndexed():e.clone();if(!a.getAttribute("position")){a.dispose();return}const r=G(a,t);return a.setAttribute("barycentric",r),a};function E(e,t){O(t,!0);let a=I(t,"simplify",3,!1);const r=W(),f=new i(0),o=new i(0),l=new i(0),s=new i(0),u=new i(!1),g=new i(!0),v=new i(!1),y=new i(0),p=new i(0),w=new i(!1),k=new i(0),b=new i(0),x=new i(new h),C=new i(new h),_=new i(new h);n(()=>{f.value=t.fillOpacity??0}),n(()=>{l.value=t.fillMix??0}),n(()=>{o.value=t.strokeOpacity??1}),n(()=>{s.value=t.thickness??1}),n(()=>{u.value=t.colorBackfaces??!1}),n(()=>{v.value=t.dash??!1}),n(()=>{g.value=t.dashInvert??!0}),n(()=>{y.value=t.dashRepeats??4}),n(()=>{p.value=t.dashLength??.5}),n(()=>{w.value=t.squeeze??!1}),n(()=>{k.value=t.squeezeMin??.2}),n(()=>{b.value=t.squeezeMax??1}),n(()=>{x.value.set(t.stroke??"#ff0000")}),n(()=>{_.value.set(t.fill??"#00ff00")}),n(()=>{C.value.set(t.backfaceStroke??"#0000ff")}),n(()=>{const c=r.current;if(!q(c,"Mesh"))return;if(!c.geometry){console.error("Wireframe: Must be a child of a Mesh with a geometry.");return}if(c.geometry.type==="WireframeGeometry"){console.error("Wireframe: WireframeGeometry is not supported.");return}const M=c.geometry,d=F(M,a());if(!d){console.error("Wireframe: Geometry must have a position attribute.");return}const z=(Array.isArray(c.material)?c.material:[c.material]).map(m=>T(m,{fillOpacity:f,strokeOpacity:o,fillMix:l,thickness:s,colorBackfaces:u,dashInvert:g,dash:v,dashRepeats:y,dashLength:p,squeeze:w,squeezeMin:k,squeezeMax:b,stroke:x,backfaceStroke:C,fill:_}));return c.geometry=d,()=>{z.forEach(m=>m()),c.geometry===d&&(c.geometry=M),d.dispose()}}),P()}export{E as W};
