import"./disclose-version.DsnmJJEf.js";import{D as I,u as O,ar as o,C as m,i as W,B as A}from"./observe.svelte.xONaORci.js";import{p as P,Z as t,a as L}from"./runtime.QwcowWmd.js";import{p as D}from"./props.DGdK2eRS.js";import{a as R,s as T}from"./store.C3oo1Ja3.js";/* empty css                                                      */const q={vertex:`
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
uniform bool dashOnly;
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

float wireframe_map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float getWireframe() {
  vec3 barycentric = v_edges_Barycentric;

  // Distance from center of each triangle to its edges.
  float d = min(min(barycentric.x, barycentric.y), barycentric.z);

  // for dashed rendering, we can use this to get the 0 .. 1 value of the line length
  float positionAlong = max(barycentric.x, barycentric.y);
  if (barycentric.y < barycentric.x && barycentric.y < barycentric.z) {
    positionAlong = 1.0 - positionAlong;
  }

  // the thickness of the stroke
  float computedThickness = wireframe_map(thickness, 0.0, 1.0, 0.0, 0.34);

  // if we want to shrink the thickness toward the center of the line segment
  if (squeeze) {
    computedThickness *= mix(squeezeMin, squeezeMax, (1.0 - sin(positionAlong * PI)));
  }

  // Create dash pattern
  if (dash) {
    // here we offset the stroke position depending on whether it
    // should overlap or not
    float offset = 1.0 / dashRepeats * dashLength / 2.0;
    if (!dashInvert) {
      offset += 1.0 / dashRepeats / 2.0;
    }

    // if we should animate the dash or not
    // if (dashAnimate) {
    // 	offset += time * 0.22;
    // }

    // create the repeating dash pattern
    float pattern = fract((positionAlong + offset) * dashRepeats);
    computedThickness *= 1.0 - wireframe_aastep(dashLength, pattern);
  }

  // compute the anti-aliased stroke edge  
  float edge = 1.0 - wireframe_aastep(computedThickness, d);

  return edge;
}`},F=(r,e)=>{r.onBeforeCompile=i=>{Object.assign(i.uniforms,e),i.vertexShader=i.vertexShader.replace("void main() {",`
${q.vertex}
void main() {
  initWireframe();`),i.fragmentShader=i.fragmentShader.replace("void main() {",`
${q.fragment}
void main() {`),i.fragmentShader=i.fragmentShader.replace("#include <color_fragment>",`
#include <color_fragment>
float edge = getWireframe();
vec4 colorStroke = vec4(stroke, edge);
#ifdef FLIP_SIDED
colorStroke.rgb = backfaceStroke;
#endif
vec4 colorFill = vec4(mix(diffuseColor.rgb, fill, fillMix), mix(diffuseColor.a, fillOpacity, fillMix));
vec4 outColor = mix(colorFill, colorStroke, edge * strokeOpacity);

diffuseColor.rgb = outColor.rgb;
diffuseColor.a *= outColor.a;`)},r.side=I,r.transparent=!0},G=(r,e)=>{const i=r.getAttribute("position"),a=new Float32Array(i.count*9);for(let n=0,c=a.length;n<c;n+=9){const l=n%2===0,f=e?1:0;l?(a[n+2]=1,a[n+4]=1,a[n+6]=1,a[n+8]=f):(a[n+1]=1,a[n+5]=1,a[n+6]=1,a[n+8]=f)}return new A(a,3)},j=(r,e)=>{if(r.index){const a=r.toNonIndexed();r.copy(a),r.setIndex(null)}const i=G(r,e);r.setAttribute("barycentric",i)};function J(r,e){P(e,!0);const i=()=>R(l,"$parent",a),[a,n]=T();let c=D(e,"simplify",3,!1);const l=O(),f=new o(0),u=new o(0),h=new o(0),v=new o(0),g=new o(!1),y=new o(!0),p=new o(!1),k=new o(0),w=new o(0),b=new o(!1),x=new o(0),_=new o(0),M=new o(new m),S=new o(new m),z=new o(new m);t(()=>{f.value=e.fillOpacity??0}),t(()=>{h.value=e.fillMix??0}),t(()=>{u.value=e.strokeOpacity??1}),t(()=>{v.value=e.thickness??.05}),t(()=>{g.value=e.colorBackfaces??!1}),t(()=>{p.value=e.dash??!1}),t(()=>{y.value=e.dashInvert??!0}),t(()=>{k.value=e.dashRepeats??4}),t(()=>{w.value=e.dashLength??.5}),t(()=>{b.value=e.squeeze??!1}),t(()=>{x.value=e.squeezeMin??.2}),t(()=>{_.value=e.squeezeMax??1}),t(()=>{M.value.set(e.stroke??"#ff0000")}),t(()=>{z.value.set(e.fill??"#00ff00")}),t(()=>{S.value.set(e.backfaceStroke??"#0000ff")}),t(()=>{const s=i();if(!W(s,"Mesh"))return;if(s.geometry.type==="WireframeGeometry"){console.error("Wireframe: WireframeGeometry is not supported.");return}if(!s.geometry){console.error("Wireframe: Must be a child of a Mesh, Line or Points object or specify a geometry prop.");return}const d=s.material,B=d.clone(),C=s.geometry.clone();return F(d,{fillOpacity:f,strokeOpacity:u,fillMix:h,thickness:v,colorBackfaces:g,dashInvert:y,dash:p,dashRepeats:k,dashLength:w,squeeze:b,squeezeMin:x,squeezeMax:_,stroke:M,backfaceStroke:S,fill:z}),j(s.geometry,c()),()=>{s.geometry.copy(C),C.dispose(),d.dispose(),s.material=B}}),L(),n()}export{J as W};
