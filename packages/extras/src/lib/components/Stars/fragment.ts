import { ShaderChunk } from 'three'

export const fragmentShader = `
uniform sampler2D pointTexture;
uniform float fade;
varying vec3 vColor;
void main() {
	float opacity = 1.0;
	if (fade == 1.0) {
		float d = distance(gl_PointCoord, vec2(0.5, 0.5));
		opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
	}
	gl_FragColor = vec4(vColor, opacity);

	${ShaderChunk.tonemapping_fragment}
	${ShaderChunk.colorspace_fragment}
}`
