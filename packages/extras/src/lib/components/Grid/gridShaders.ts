// Credits to Evan Wallace https://madebyevan.com/shaders/grid/ //
import { revision } from '../../lib/revision'

const vertexShader = /*glsl*/ `
  varying vec4 worldPosition;
	varying vec3 localPosition;

	uniform float uFadeDistance;
	uniform bool uInfiniteGrid;
	uniform bool uFollowCamera;

	uniform vec3 worldCamProjPosition;
	uniform vec3 worldPlanePosition;
	uniform int uCoord0;
	uniform int uCoord1;
	uniform int uCoord2;

	void main() {
		localPosition = vec3(
		  position[uCoord0],
			position[uCoord1],
			position[uCoord2]
		);

		if (uInfiniteGrid) {
		  localPosition *= 1. + uFadeDistance;
		}

		worldPosition = modelMatrix * vec4(localPosition, 1.0);

		if (uFollowCamera) {
		  worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
      localPosition = (inverse(modelMatrix) * worldPosition).xyz;
		}

		gl_Position = projectionMatrix * viewMatrix * worldPosition;
	}
`

const fragmentShader = /*glsl*/ `
  #define PI 3.141592653589793

	varying vec3 localPosition;
	varying vec4 worldPosition;

	uniform vec3 worldCamProjPosition;
	uniform float uSize1;
	uniform float uSize2;
	uniform vec3 uColor1;
	uniform vec3 uColor2;
	uniform vec3 uBackgroundColor;
	uniform float uBackgroundOpacity;
	uniform float uFadeDistance;
	uniform float uFadeStrength;
	uniform float uThickness1;
	uniform float uThickness2;

	uniform int uCoord0;
	uniform int uCoord1;
	uniform int uCoord2;

	// 0 - default; 1 - lines; 2 - circles; 3 - polar
	uniform int uGridType;

  // lineGrid coord for lines
	uniform int uLineGridCoord;

	// circlegrid max radius
	uniform float uCircleGridMaxRadius;

	// polar grid dividers
	uniform float uPolarCellDividers;
	uniform float uPolarSectionDividers;

	float getSquareGrid(float size, float thickness, vec3 localPos) {
		vec2 coord = localPos.xy / size;

		vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
		float line = min(grid.x, grid.y) + 1. - thickness;

		return 1.0 - min(line, 1.);
	}

	float getLinesGrid(float size, float thickness, vec3 localPos) {
		float coord = localPos[uLineGridCoord] / size;
		float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) - thickness * 0.2;

		return 1.0 - min(line, 1.);
	}

	float getCirclesGrid(float size, float thickness, vec3 localPos) {
		float coord = length(localPos.xy) / size;
		float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) - thickness * 0.2;

		if (uCircleGridMaxRadius > 0. && coord > uCircleGridMaxRadius + thickness * 0.05) {
		  discard;
		}

		return 1.0 - min(line, 1.);
	}

	float getPolarGrid(float size, float thickness, float polarDividers, vec3 localPos) {
		float rad = length(localPos.xy) / size;
		vec2 coord = vec2(rad, atan(localPos.x, localPos.y) * polarDividers / PI) ;

		vec2 wrapped = vec2(coord.x, fract(coord.y / (2.0 * polarDividers)) * (2.0 * polarDividers));
		vec2 coordWidth = fwidth(coord);
		vec2 wrappedWidth = fwidth(wrapped);
		vec2 width = (coord.y < -polarDividers * 0.5 || coord.y > polarDividers * 0.5 ? wrappedWidth : coordWidth) * (1.+thickness*0.25);

		// Compute anti-aliased world-space grid lines
		vec2 grid = abs(fract(coord - 0.5) - 0.5) / width;
		float line = min(grid.x, grid.y);

		if (uCircleGridMaxRadius > 0. && rad > uCircleGridMaxRadius + thickness * 0.05) {
		  discard;
		}

		return 1.0 - min(line, 1.);
	}

	void main() {
		float g1 = 0.;
		float g2 = 0.;

		vec3 localPos = vec3(localPosition[uCoord0], localPosition[uCoord1], localPosition[uCoord2]);

		if(uGridType == 0){
			g1 = getSquareGrid(uSize1, uThickness1, localPos);
			g2 = getSquareGrid(uSize2, uThickness2, localPos);

		} else if(uGridType == 1){
			g1 = getLinesGrid(uSize1, uThickness1, localPos);
			g2 = getLinesGrid(uSize2, uThickness2, localPos);

		} else if(uGridType==2){
			g1 = getCirclesGrid(uSize1, uThickness1, localPos);
			g2 = getCirclesGrid(uSize2, uThickness2, localPos);

		} else if(uGridType==3){
			g1 = getPolarGrid(uSize1, uThickness1, uPolarCellDividers, localPos);
			g2 = getPolarGrid(uSize2, uThickness2, uPolarSectionDividers, localPos);
		}

		vec3 color = mix(uColor1, uColor2, min(1.,uThickness2 * g2));

		float dist = distance(worldCamProjPosition, worldPosition.xyz);
		float d = 1.0 - min(dist / uFadeDistance, 1.);
		float fadeFactor = pow(d, uFadeStrength) * 0.95;

		if (uBackgroundOpacity > 0.0) {
			float linesAlpha = clamp((g1 + g2) * fadeFactor, 0.,1.);
			vec3 finalColor = mix(uBackgroundColor, color, linesAlpha);
			float blendedAlpha = max(linesAlpha, uBackgroundOpacity * fadeFactor);
			gl_FragColor = vec4(finalColor, blendedAlpha);

		} else {
			gl_FragColor = vec4(color, (g1 + g2) * pow(d,uFadeStrength));
			gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
		}

		if (gl_FragColor.a <= 0.0) {
		  discard;
		}

		#include <tonemapping_fragment>
		#include <${revision < 154 ? 'encodings_fragment' : 'colorspace_fragment'}>
	}
`

export const gridComponentShaders = {
  fragmentShader,
  vertexShader
}
