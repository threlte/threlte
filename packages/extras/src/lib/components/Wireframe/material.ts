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
}`
}

export const setWireframeOverride = (
  material: Material,
  uniforms: {
    [key: string]: Uniform
  }
) => {
  material.onBeforeCompile = (shader) => {
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
#ifdef FLIP_SIDED
colorStroke.rgb = backfaceStroke;
#endif
vec4 colorFill = vec4(mix(diffuseColor.rgb, fill, fillMix), mix(diffuseColor.a, fillOpacity, fillMix));
vec4 outColor = mix(colorFill, colorStroke, edge * strokeOpacity);

diffuseColor.rgb = outColor.rgb;
diffuseColor.a *= outColor.a;`
    )
  }

  material.side = DoubleSide
  material.transparent = true
}
