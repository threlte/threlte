varying vec2 vUv;

uniform sampler2D viewTexture;
uniform sampler2D reticleTexture;
uniform float aspect;

// https://www.shadertoy.com/view/4lSGRw
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
	float k = -1.1f;
	float kcube = 0.5f;
	float offset = .06f;

	// Adjust UV ratio for sampling view texture
	vec2 adjustedUv = vUv;
	if (aspect > 1.0f) {
		float scale = 1.0f / aspect;
		adjustedUv.x = scale * (adjustedUv.x - 0.5f) + 0.5f;
	} else {
		float scale = aspect;
		adjustedUv.y = scale * (adjustedUv.y - 0.5f) + 0.5f;
	}

	vec4 reticle = texture2D(reticleTexture, vUv);

		// circular vignettte
	vec2 vignetteUv = vUv - vec2(0.5f);
	float circlularDist = length(vignetteUv) * 2.f;
	float vig = 1.f - smoothstep(0.7f, 0.99f, circlularDist);

	// aberration + fisheye-like distortion
	float red = texture2D(viewTexture, distortUV(adjustedUv, k + offset, kcube)).r;
	float green = texture2D(viewTexture, distortUV(adjustedUv, k, kcube)).g;
	float blue = texture2D(viewTexture, distortUV(adjustedUv, k - offset, kcube)).b;

	vec3 finalColor = mix(vec3(red, green, blue) * vig, reticle.rgb, smoothstep(0.f, 1.f, reticle.a * 2.f));

	gl_FragColor = vec4(finalColor, 1.f);

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}
