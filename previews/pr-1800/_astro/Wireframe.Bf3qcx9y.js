import"./disclose-version.DsnmJJEf.js";import{D as A,u as O,av as a,C as h,i as P,B as I}from"./observe.svelte.BoKeyuw0.js";import{p as T,Z as o,a as G}from"./runtime.HAn2cbcW.js";import{p as F}from"./props.DsKWk81K.js";import{a as K,s as L}from"./store.BmD_Ou3p.js";/* empty css                                                      */const W={vertex:`
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
}`},R=(e,t)=>{const i=e.onBeforeCompile,r=e.customProgramCacheKey,f=r.call(e),n=e.side,l=e.transparent;return e.onBeforeCompile=(s,u)=>{i.call(e,s,u),Object.assign(s.uniforms,t),s.vertexShader=s.vertexShader.replace("void main() {",`
${W.vertex}
void main() {
  initWireframe();`),s.fragmentShader=s.fragmentShader.replace("void main() {",`
${W.fragment}
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
diffuseColor.a *= outColor.a;`)},e.customProgramCacheKey=()=>`${f}|threlte-wireframe`,e.side=A,e.transparent=!0,e.needsUpdate=!0,()=>{e.onBeforeCompile=i,e.customProgramCacheKey=r,e.side=n,e.transparent=l,e.needsUpdate=!0}},D=(e,t)=>{const i=e.getAttribute("position"),r=new Float32Array(i.count*3),f=t?1:0;for(let n=0,l=r.length;n<l;n+=9)n/9%2===0?(r[n+2]=1,r[n+4]=1,r[n+6]=1,r[n+8]=f):(r[n+1]=1,r[n+5]=1,r[n+6]=1,r[n+8]=f);return new I(r,3)},U=(e,t)=>{const i=e.index?e.toNonIndexed():e.clone();if(!i.getAttribute("position")){i.dispose();return}const r=D(i,t);return i.setAttribute("barycentric",r),i};function J(e,t){T(t,!0);const i=()=>K(l,"$parent",r),[r,f]=L();let n=F(t,"simplify",3,!1);const l=O(),s=new a(0),u=new a(0),g=new a(0),p=new a(0),v=new a(!1),y=new a(!0),w=new a(!1),k=new a(0),b=new a(0),x=new a(!1),C=new a(0),_=new a(0),M=new a(new h),S=new a(new h),z=new a(new h);o(()=>{s.value=t.fillOpacity??0}),o(()=>{g.value=t.fillMix??0}),o(()=>{u.value=t.strokeOpacity??1}),o(()=>{p.value=t.thickness??1}),o(()=>{v.value=t.colorBackfaces??!1}),o(()=>{w.value=t.dash??!1}),o(()=>{y.value=t.dashInvert??!0}),o(()=>{k.value=t.dashRepeats??4}),o(()=>{b.value=t.dashLength??.5}),o(()=>{x.value=t.squeeze??!1}),o(()=>{C.value=t.squeezeMin??.2}),o(()=>{_.value=t.squeezeMax??1}),o(()=>{M.value.set(t.stroke??"#ff0000")}),o(()=>{z.value.set(t.fill??"#00ff00")}),o(()=>{S.value.set(t.backfaceStroke??"#0000ff")}),o(()=>{const c=i();if(!P(c,"Mesh"))return;if(!c.geometry){console.error("Wireframe: Must be a child of a Mesh with a geometry.");return}if(c.geometry.type==="WireframeGeometry"){console.error("Wireframe: WireframeGeometry is not supported.");return}const B=c.geometry,d=U(B,n());if(!d){console.error("Wireframe: Geometry must have a position attribute.");return}const q=(Array.isArray(c.material)?c.material:[c.material]).map(m=>R(m,{fillOpacity:s,strokeOpacity:u,fillMix:g,thickness:p,colorBackfaces:v,dashInvert:y,dash:w,dashRepeats:k,dashLength:b,squeeze:x,squeezeMin:C,squeezeMax:_,stroke:M,backfaceStroke:S,fill:z}));return c.geometry=d,()=>{q.forEach(m=>m()),c.geometry===d&&(c.geometry=B),d.dispose()}}),G(),f()}export{J as W};
