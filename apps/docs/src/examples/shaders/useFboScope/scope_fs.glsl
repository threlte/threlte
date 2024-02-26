varying vec2 vUv;

uniform sampler2D viewTexture;
uniform sampler2D reticleTexture;

vec2 distortUV(vec2 uv, float k, float kcube) {
	vec2 t = uv - .5f;
	float r2 = t.x * t.x + t.y * t.y;
	float f = 0.f;

	if (kcube == 0.0f) {
		f = 1.f + r2 * k;
	} else {
		f = 1.f + r2 * (k + kcube * sqrt(r2));
	}

	vec2 nUv = f * t + .5f;
	return nUv;
}

void main() {
	float k = -0.4f;
	float kcube = 1.4f;
	float offset = .22f;

	vec4 reticle = texture2D(reticleTexture, vUv);

	// aberration + fisheye-like distortion
	float red = texture2D(viewTexture, distortUV(vUv, k + offset, kcube)).r;
	float green = texture2D(viewTexture, distortUV(vUv, k, kcube)).g;
	float blue = texture2D(viewTexture, distortUV(vUv, k - offset, kcube)).b;

	vec3 distortedView = vec3(red, green, blue);

	vec3 finalColor = mix(distortedView, reticle.rgb, pow(reticle.a, 2.f));

	gl_FragColor = vec4(finalColor, 1.f);

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}
