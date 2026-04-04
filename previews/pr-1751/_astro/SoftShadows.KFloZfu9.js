import"./disclose-version.DsnmJJEf.js";import{a as d}from"./index-client.C7k-19DO.js";import{p as m,_ as h,g as _,$ as g,a as S}from"./runtime.XdAhm9hg.js";import{p as r}from"./props.29maieIx.js";import{c as R,b1 as l}from"./T.CIQBugds.js";/* empty css                                                      */function x(N,a){m(a,!0);const{renderer:t,camera:f,scene:s}=R();let n=r(a,"size",3,25),p=r(a,"focus",3,0),e=r(a,"samples",3,10);const i=l.shadowmap_pars_fragment;let u=g(()=>`
		#define PENUMBRA_FILTER_SIZE float(${n()})
		#define RGB_NOISE_FUNCTION(uv) (randRGB(uv))
		vec3 randRGB(vec2 uv) {
			return vec3(
				fract(sin(dot(uv, vec2(12.75613, 38.12123))) * 13234.76575),
				fract(sin(dot(uv, vec2(19.45531, 58.46547))) * 43678.23431),
				fract(sin(dot(uv, vec2(23.67817, 78.23121))) * 93567.23423)
			);
		}

		vec3 lowPassRandRGB(vec2 uv) {
			// 3x3 convolution (average)
			// can be implemented as separable with an extra buffer for a total of 6 samples instead of 9
			vec3 result = vec3(0);
			result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, -1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(-1.0,  0.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, +1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, -1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2( 0.0,  0.0));
			result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, +1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, -1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(+1.0,  0.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, +1.0));
			result *= 0.111111111; // 1.0 / 9.0
			return result;
		}
		vec3 highPassRandRGB(vec2 uv) {
			// by subtracting the low-pass signal from the original signal, we're being left with the high-pass signal
			// hp(x) = x - lp(x)
			return RGB_NOISE_FUNCTION(uv) - lowPassRandRGB(uv) + 0.5;
		}


		vec2 vogelDiskSample(int sampleIndex, int sampleCount, float angle) {
			const float goldenAngle = 2.399963f; // radians
			float r = sqrt(float(sampleIndex) + 0.5f) / sqrt(float(sampleCount));
			float theta = float(sampleIndex) * goldenAngle + angle;
			float sine = sin(theta);
			float cosine = cos(theta);
			return vec2(cosine, sine) * r;
		}
		float penumbraSize( const in float zReceiver, const in float zBlocker ) { // Parallel plane estimation
			return (zReceiver - zBlocker) / zBlocker;
		}
		float findBlocker(sampler2D shadowMap, vec2 uv, float compare, float angle) {
			float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);
			float blockerDepthSum = float(${p()});
			float blockers = 0.0;

			int j = 0;
			vec2 offset = vec2(0.);
			float depth = 0.;

			#pragma unroll_loop_start
			for(int i = 0; i < ${e()}; i ++) {
				offset = (vogelDiskSample(j, ${e()}, angle) * texelSize) * 2.0 * PENUMBRA_FILTER_SIZE;
				depth = unpackRGBAToDepth( texture2D( shadowMap, uv + offset));
				if (depth < compare) {
					blockerDepthSum += depth;
					blockers++;
				}
				j++;
			}
			#pragma unroll_loop_end

			if (blockers > 0.0) {
				return blockerDepthSum / blockers;
			}
			return -1.0;
		}


		float vogelFilter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius, float angle) {
			float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);
			float shadow = 0.0f;
			int j = 0;
			vec2 vogelSample = vec2(0.0);
			vec2 offset = vec2(0.0);
			#pragma unroll_loop_start
			for (int i = 0; i < ${e()}; i++) {
				vogelSample = vogelDiskSample(j, ${e()}, angle) * texelSize;
				offset = vogelSample * (1.0 + filterRadius * float(${n()}));
				shadow += step( zReceiver, unpackRGBAToDepth( texture2D( shadowMap, uv + offset ) ) );
				j++;
			}
			#pragma unroll_loop_end
			return shadow * 1.0 / ${e()}.0;
		}

		float PCSS (sampler2D shadowMap, vec4 coords) {
			vec2 uv = coords.xy;
			float zReceiver = coords.z; // Assumed to be eye-space z in this code
			float angle = highPassRandRGB(gl_FragCoord.xy).r * PI2;
			float avgBlockerDepth = findBlocker(shadowMap, uv, zReceiver, angle);
			if (avgBlockerDepth == -1.0) {
				return 1.0;
			}
			float penumbraRatio = penumbraSize(zReceiver, avgBlockerDepth);
			return vogelFilter(shadowMap, uv, zReceiver, 1.25 * penumbraRatio, angle);
	}`);const c=()=>{s.traverse(v=>{const o=v;o.material&&(t?.properties.remove(o.material),o.material.dispose?.())}),t?.info.programs&&(t.info.programs.length=0),t?.compile(s,f.current)};h(()=>{l.shadowmap_pars_fragment=i.replace("#ifdef USE_SHADOWMAP",`#ifdef USE_SHADOWMAP
${_(u)}`).replace("#if defined( SHADOWMAP_TYPE_PCF )",`
return PCSS(shadowMap, shadowCoord);
#if defined( SHADOWMAP_TYPE_PCF )`),c()}),d(()=>{l.shadowmap_pars_fragment=i,c()}),S()}export{x as S};
