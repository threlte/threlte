varying vec3 worldPosition;
uniform float uFadeDistance;
uniform float uInfiniteGrid;
uniform float uFollowCamera;

uniform int uAxis0;
uniform int uAxis1;
uniform int uAxis2;

void main() {

  vec3 nPos = vec3(position[uAxis0], position[uAxis1], position[uAxis2]);

  vec3 pos = nPos * (1. + uFadeDistance * uInfiniteGrid);
  pos[uAxis0] += (cameraPosition[uAxis0] * uFollowCamera);
  pos[uAxis1] += (cameraPosition[uAxis1] * uFollowCamera);

  worldPosition = pos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

}