// Based on https://github.com/mattdesl/webgl-wireframes

import { type Uniform, type Material, DoubleSide } from 'three'

export const WireframeMaterialShaders = {
  vertex: `
attribute vec3 barycentric;

varying vec3 v_edges_Barycentric;
varying vec3 v_edges_Position;

void initWireframe() {
  v_edges_Barycentric = barycentric;
  v_edges_Position = position.xyz;
}`,
  fragment: `
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
}`
}

export const setWireframeOverride = (
  material: Material,
  uniforms: {
    [key: string]: Uniform
  }
) => {
  const originalOnBeforeCompile = material.onBeforeCompile
  const originalCustomProgramCacheKey = material.customProgramCacheKey
  const originalCustomProgramCacheKeyValue = originalCustomProgramCacheKey.call(material)
  const originalSide = material.side
  const originalTransparent = material.transparent

  material.onBeforeCompile = (shader, renderer) => {
    originalOnBeforeCompile.call(material, shader, renderer)

    Object.assign(shader.uniforms, uniforms)

    shader.vertexShader = shader.vertexShader.replace(
      'void main() {',
      `
${WireframeMaterialShaders.vertex}
void main() {
  initWireframe();`
    )

    shader.fragmentShader = shader.fragmentShader.replace(
      'void main() {',
      `
${WireframeMaterialShaders.fragment}
void main() {`
    )

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <color_fragment>',
      `
#include <color_fragment>
float edge = getWireframe();
vec4 colorStroke = vec4(stroke, edge);
if (colorBackfaces && !gl_FrontFacing) {
colorStroke.rgb = backfaceStroke;
}
vec4 colorFill = vec4(mix(diffuseColor.rgb, fill, fillMix), mix(diffuseColor.a, fillOpacity, fillMix));
vec4 outColor = mix(colorFill, colorStroke, edge * strokeOpacity);

diffuseColor.rgb = outColor.rgb;
diffuseColor.a *= outColor.a;`
    )
  }

  material.customProgramCacheKey = () => `${originalCustomProgramCacheKeyValue}|threlte-wireframe`
  material.side = DoubleSide
  material.transparent = true
  material.needsUpdate = true

  return () => {
    material.onBeforeCompile = originalOnBeforeCompile
    material.customProgramCacheKey = originalCustomProgramCacheKey
    material.side = originalSide
    material.transparent = originalTransparent
    material.needsUpdate = true
  }
}
