export const vertexShader = `uniform mat4 viewMatrixInverse;

varying vec3 vWorldPosition;
varying vec3 vNormal;
varying mat4 vModelMatrixInverse;

#ifdef USE_INSTANCING_COLOR
	varying vec3 vInstanceColor;
#endif

void main() {
	vec4 transformedNormal = vec4(normal, 0.0);
	vec4 transformedPosition = vec4(position, 1.0);
	#ifdef USE_INSTANCING
		transformedNormal = instanceMatrix * transformedNormal;
		transformedPosition = instanceMatrix * transformedPosition;
	#endif

	#ifdef USE_INSTANCING
		vModelMatrixInverse = inverse(modelMatrix * instanceMatrix);
	#else
		vModelMatrixInverse = inverse(modelMatrix);
	#endif

	#ifdef USE_INSTANCING_COLOR
		vInstanceColor = instanceColor.rgb;
	#endif

	vWorldPosition = (modelMatrix * transformedPosition).xyz;
	vNormal = normalize((viewMatrixInverse * vec4(normalMatrix * transformedNormal.xyz, 0.0)).xyz);
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * transformedPosition;
}`
