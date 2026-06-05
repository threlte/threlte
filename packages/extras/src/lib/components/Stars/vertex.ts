export const vertexShader = `
uniform float time;
attribute float size;
attribute float phase;
varying vec3 vColor;

void main() {
	vColor = color;
	vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
	float t = time * (0.5 + phase) + phase * 6.2831;
	float twinkle = 0.5 * sin(t) + 0.5 * sin(t * 2.31);
	gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + twinkle);
	gl_Position = projectionMatrix * mvPosition;
}`
