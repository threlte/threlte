export const vertexShader = `uniform float time;
attribute float size;
varying vec3 vColor;
void main() {
	vColor = color;
	vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
	gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
	gl_Position = projectionMatrix * mvPosition;
}`
