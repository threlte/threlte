// Credit: https://madebyevan.com/shaders/grid/

varying vec2 vUv;
varying vec3 vPosition;
uniform vec3 pulsePosition;
uniform float pulseTimer;

void main() {
  float dist = clamp(length(pulsePosition.xz - vPosition.xz) * (1. - pulseTimer) * 0.1, 0., 1.);

  float coord = vPosition.y * 2.;
  float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
  float lineFill = 1.0 - min(line, 1.0);
  lineFill = pow(lineFill, 1.0 / 2.2);

  float circle = 1.0 - smoothstep(0.0, 0.3, abs(0.2 - dist));

  vec3 color = vec3(vUv.x, vUv.y, coord);
  vec3 coloredLines = (color * lineFill);

  vec3 final = coloredLines = mix(coloredLines, vec3(lineFill), 1. - circle);

  gl_FragColor = vec4(final, 1.);

}