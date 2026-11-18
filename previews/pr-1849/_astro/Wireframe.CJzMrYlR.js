import"./disclose-version.DsnmJJEf.js";import{D as W,u as q,U as n,_ as h,i as A,l as O}from"./observe.svelte.CmjctptC.js";import{p as P,L as i,Z as T,a as I}from"./runtime.DLdkg5Kz.js";import{p as G}from"./props.C0aiEMAr.js";/* empty css                                                      */import{u as F}from"./useThrelte.BExRv3o8.js";const z={vertex:`
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
}`},K=(t,r)=>{const a=t.onBeforeCompile,e=t.customProgramCacheKey,f=e.call(t),o=t.side,l=t.transparent;return t.onBeforeCompile=(s,u)=>{a.call(t,s,u),Object.assign(s.uniforms,r),s.vertexShader=s.vertexShader.replace("void main() {",`
${z.vertex}
void main() {
  initWireframe();`),s.fragmentShader=s.fragmentShader.replace("void main() {",`
${z.fragment}
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
diffuseColor.a *= outColor.a;`)},t.customProgramCacheKey=()=>`${f}|threlte-wireframe`,t.side=W,t.transparent=!0,t.needsUpdate=!0,()=>{t.onBeforeCompile=a,t.customProgramCacheKey=e,t.side=o,t.transparent=l,t.needsUpdate=!0}},L=(t,r)=>{const a=t.getAttribute("position"),e=new Float32Array(a.count*3),f=r?1:0;for(let o=0,l=e.length;o<l;o+=9)o/9%2===0?(e[o+2]=1,e[o+4]=1,e[o+6]=1,e[o+8]=f):(e[o+1]=1,e[o+5]=1,e[o+6]=1,e[o+8]=f);return new O(e,3)},R=(t,r)=>{const a=t.index?t.toNonIndexed():t.clone();if(!a.getAttribute("position")){a.dispose();return}const e=L(a,r);return a.setAttribute("barycentric",e),a};function Z(t,r){P(r,!0);let a=G(r,"simplify",3,!1);const{invalidate:e}=F(),f=q(),o=new n(0),l=new n(0),s=new n(0),u=new n(0),g=new n(!1),v=new n(!0),p=new n(!1),y=new n(0),w=new n(0),k=new n(!1),b=new n(0),x=new n(0),C=new n(new h),_=new n(new h),M=new n(new h);i(()=>{o.value=r.fillOpacity??0,e()}),i(()=>{s.value=r.fillMix??0,e()}),i(()=>{l.value=r.strokeOpacity??1,e()}),i(()=>{u.value=r.thickness??1,e()}),i(()=>{g.value=r.colorBackfaces??!1,e()}),i(()=>{p.value=r.dash??!1,e()}),i(()=>{v.value=r.dashInvert??!0,e()}),i(()=>{y.value=r.dashRepeats??4,e()}),i(()=>{w.value=r.dashLength??.5,e()}),i(()=>{k.value=r.squeeze??!1,e()}),i(()=>{b.value=r.squeezeMin??.2,e()}),i(()=>{x.value=r.squeezeMax??1,e()}),i(()=>{C.value.set(r.stroke??"#ff0000"),e()}),i(()=>{M.value.set(r.fill??"#00ff00"),e()}),i(()=>{_.value.set(r.backfaceStroke??"#0000ff"),e()}),T(()=>{const c=f.current;if(!A(c,"Mesh"))return;if(!c.geometry){console.error("Wireframe: Must be a child of a Mesh with a geometry.");return}if(c.geometry.type==="WireframeGeometry"){console.error("Wireframe: WireframeGeometry is not supported.");return}const S=c.geometry,m=R(S,a());if(!m){console.error("Wireframe: Geometry must have a position attribute.");return}const B=(Array.isArray(c.material)?c.material:[c.material]).map(d=>K(d,{fillOpacity:o,strokeOpacity:l,fillMix:s,thickness:u,colorBackfaces:g,dashInvert:v,dash:p,dashRepeats:y,dashLength:w,squeeze:k,squeezeMin:b,squeezeMax:x,stroke:C,backfaceStroke:_,fill:M}));return c.geometry=m,()=>{B.forEach(d=>d()),c.geometry===m&&(c.geometry=S),m.dispose()}}),I()}export{Z as W};
