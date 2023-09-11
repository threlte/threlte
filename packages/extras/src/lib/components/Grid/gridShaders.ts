const vertexShader = /*glsl*/ `
varying vec3 worldPosition;
uniform float uFadeDistance;
uniform float uInfiniteGrid;
uniform float uFollowCamera;

uniform int uCoord0;
uniform int uCoord1;
uniform int uCoord2;

void main() {

	vec3 pos = vec3(position[uCoord0],position[uCoord1],position[uCoord2]) * (1. + uFadeDistance * uInfiniteGrid);

	vec3 cameraFollowOffset = vec3(cameraPosition[uCoord0],cameraPosition[uCoord1],cameraPosition[uCoord2]) * uFollowCamera;
	pos[uCoord0] += cameraFollowOffset.x;
	pos[uCoord1] += cameraFollowOffset.z;
	// pos[uCoord2] += cameraFollowOffset[uCoord2];

	worldPosition = pos;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

}
`

const fragmentShader = /*glsl*/ `
	varying vec3 worldPosition;
	uniform float uSize1;
	uniform float uSize2;
	uniform vec3 uColor1;
	uniform vec3 uColor2;
	uniform float uFadeDistance;
	uniform float uFadeStrength;
	uniform float uThickness1;
	uniform float uThickness2;
	uniform float uInfiniteGrid;

	uniform int uCoord0;
	uniform int uCoord1;
	uniform int uCoord2;

	float getGrid(float size, float thickness) {

		vec2 r = vec2(worldPosition[uCoord0], worldPosition[uCoord1]) / size;

		vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
		float line = min(grid.x, grid.y) + 1. - thickness;

		return 1.0 - min(line, 1.);
	}

	void main() {

		float g1 = getGrid(uSize1, uThickness1);
		float g2 = getGrid(uSize2, uThickness2);

		float d = 1.0 - min(distance(vec2(cameraPosition[uCoord0],cameraPosition[uCoord1]), vec2(worldPosition[uCoord0],worldPosition[uCoord1])) / uFadeDistance, 1.);
		vec3 color = mix(uColor1, uColor2, min(1.,uThickness2*g2));

		gl_FragColor = vec4(color, (g1 + g2) * pow(d,uFadeStrength));
		gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);

		if(gl_FragColor.a <= 0.0)
			discard;
		#include <tonemapping_fragment>
	}
`

export const gridComponentShaders = {
  fragmentShader,
  vertexShader
}
