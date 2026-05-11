<!--
	@component
	This component injects Percentage-Closer Soft Shadows (PCSS) into
	Three.js' shader chunk. Mounting and unmounting this component will lead to
	all shaders being be re-compiled, although it will only cause overhead if
	`<SoftShadows>` is mounted after the scene has already rendered, if it mounts
	with everything else in your scene shaders will compile naturally.
-->

<!--
	This component is a port of the component [`<SoftShadows>` from drei](https://github.com/pmndrs/drei/blob/master/src/core/softShadows.tsx)
	Original comment:
		Integration and compilation: @N8Programs
		Inspired by:
			https://github.com/mrdoob/three.js/blob/dev/examples/webgl_shadowmap_pcss.html
			https://developer.nvidia.com/gpugems/gpugems2/part-ii-shading-lighting-and-shadows/chapter-17-efficient-soft-edged-shadows-using
			https://developer.download.nvidia.com/whitepapers/2008/PCSS_Integration.pdf
			https://github.com/mrdoob/three.js/blob/master/examples/webgl_shadowmap_pcss.html [spidersharma03]
			https://spline.design/
		Concept:
			https://www.gamedev.net/tutorials/programming/graphics/contact-hardening-soft-shadows-made-fast-r4906/
		Vogel Disk Implementation:
			https://www.shadertoy.com/view/4l3yRM [ashalah]
		High-Frequency Noise Implementation:
			https://www.shadertoy.com/view/tt3fDH [spawner64]
-->
<script
  lang="ts"
  module
>
  import { ShaderChunk } from 'three'

  // Captured once per page load.
  const original = ShaderChunk.shadowmap_pars_fragment

  // Three.js modernized shadow mapping between r175 and r183 (PRs #32181/#32303
  // /#32407/#32443): `unpackRGBAToDepth` was removed, the PCF branch now uses
  // `sampler2DShadow` (hardware comparison only — no raw depth reads), and the
  // BASIC branch reads depth directly via `.r`. Detect once and pick the right
  // sampling path + injection target.
  const isLegacyChunk = original.includes('unpackRGBAToDepth')
  const sampleDepth = isLegacyChunk
    ? 'unpackRGBAToDepth(texture2D(shadowMap, '
    : 'texture2D(shadowMap, '
  const sampleDepthSuffix = isLegacyChunk ? '))' : ').r'
</script>

<script lang="ts">
  import { useThrelte } from '@threlte/core'
  import { BasicShadowMap } from 'three'

  const { renderer, scene } = useThrelte()

  interface Props {
    /** Size of the light source (the larger the softer the light), default: 25 */
    size?: number
    /** Depth focus, use it to shift the focal point (where the shadow is the sharpest), default: 0 (the beginning) */
    focus?: number
    /** Number of samples (more samples less noise but more expensive), default: 10 */
    samples?: number
  }

  let { size = 25, focus = 0, samples = 10 }: Props = $props()

  // 1.25 is folded into `size` so the inner filter loop avoids one multiply.
  const filterScale = $derived(size * 1.25)
  const invSamples = $derived((1 / samples).toFixed(8))

  let pcss = $derived(`
		// Hash from a single dot+fract; same statistical quality as the
		// 10-tap RGB high-pass it replaces, ~30x cheaper.
		float pcssNoise(vec2 position) {
			return fract(52.9829189 * fract(dot(position, vec2(0.06711056, 0.00583715))));
		}

		// Note: three.js's #pragma unroll_loop only substitutes "[ i ]"
		// subscripts and the UNROLLED_LOOP_INDEX token; bare i references
		// stay literal and won't compile. Use UNROLLED_LOOP_INDEX everywhere
		// the iteration index appears outside an array subscript, and hoist
		// any per-iteration declarations out of the loop body to avoid
		// "redefinition" errors after unrolling.

		vec2 vogelDiskSample(int sampleIndex, float angle) {
			const float goldenAngle = 2.399963f;
			float r = sqrt(float(sampleIndex) + 0.5) / sqrt(float(${samples}));
			float theta = float(sampleIndex) * goldenAngle + angle;
			return vec2(cos(theta), sin(theta)) * r;
		}

		float PCSS (sampler2D shadowMap, vec4 coords) {
			vec2 uv = coords.xy;
			float zReceiver = coords.z;
			float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);

			float angle = pcssNoise(gl_FragCoord.xy) * PI2;

			// The blocker search and the penumbra filter both want N Vogel
			// samples around the same angle — only their scale differs. Compute
			// the unscaled offsets once instead of recomputing sin/cos per loop.
			vec2 offsets[${samples}];
			#pragma unroll_loop_start
			for (int i = 0; i < ${samples}; i++) {
				offsets[ i ] = vogelDiskSample(UNROLLED_LOOP_INDEX, angle) * texelSize;
			}
			#pragma unroll_loop_end

			// Blocker search.
			float blockerDepthSum = float(${focus});
			float blockers = 0.0;
			float blockerSearchScale = 2.0 * float(${size});
			vec2 offset;
			float depth;
			float isBlocker;
			#pragma unroll_loop_start
			for (int i = 0; i < ${samples}; i++) {
				offset = offsets[ i ] * blockerSearchScale;
				depth = ${sampleDepth}uv + offset${sampleDepthSuffix};
				// Branchless: 1 when depth < zReceiver (blocker), 0 otherwise.
				isBlocker = 1.0 - step(zReceiver, depth);
				blockerDepthSum += depth * isBlocker;
				blockers += isBlocker;
			}
			#pragma unroll_loop_end

			if (blockers == 0.0) return 1.0;

			float avgBlockerDepth = blockerDepthSum / blockers;
			float penumbraRatio = (zReceiver - avgBlockerDepth) / avgBlockerDepth;
			float filterMult = 1.0 + penumbraRatio * float(${filterScale});

			float shadow = 0.0;
			#pragma unroll_loop_start
			for (int i = 0; i < ${samples}; i++) {
				offset = offsets[ i ] * filterMult;
				shadow += step(zReceiver, ${sampleDepth}uv + offset${sampleDepthSuffix});
			}
			#pragma unroll_loop_end

			return shadow * float(${invSamples});
	}`)

  // Three.js's program cache key is derived from material properties, not
  // ShaderChunk source. To force a fresh compile against the modified chunk
  // we drop each material's renderer-side properties (which hold its program
  // ref) and empty the program cache. We avoid `material.dispose()` so user
  // `onBeforeCompile` injections and shared uniform references are preserved.
  const forceFreshCompile = (material: any) => {
    renderer.properties.remove(material)
    material.needsUpdate = true
  }

  const recompile = () => {
    scene.traverse((object: any) => {
      const material = object.material
      if (!material) return
      if (Array.isArray(material)) {
        for (const m of material) forceFreshCompile(m)
      } else {
        forceFreshCompile(material)
      }
    })
    renderer.info.programs!.length = 0
  }

  $effect(() => {
    // On modern (r183+) chunks the PCF branch binds the shadow map as
    // `sampler2DShadow`, which doesn't allow raw depth reads — PCSS needs
    // those, so force `BasicShadowMap` (which binds as `sampler2D`). Legacy
    // chunks use `sampler2D` for every shadow type, so we leave the user's
    // configured shadow type alone.
    let previousShadowMapType: typeof renderer.shadowMap.type | null = null
    if (!isLegacyChunk) {
      previousShadowMapType = renderer.shadowMap.type
      renderer.shadowMap.type = BasicShadowMap
    }

    return () => {
      if (previousShadowMapType !== null) {
        renderer.shadowMap.type = previousShadowMapType
      }
    }
  })

  $effect(() => {
    let modified = original.replace('#ifdef USE_SHADOWMAP', `#ifdef USE_SHADOWMAP\n${pcss}`)
    if (isLegacyChunk) {
      // Legacy chunks have a single getShadow() with branches per shadow type;
      // inject right inside `if (frustumTest) {` ahead of the PCF branch so
      // the early `return` short-circuits whichever branch was selected.
      modified = modified.replace(
        '#if defined( SHADOWMAP_TYPE_PCF )',
        '\nreturn PCSS(shadowMap, shadowCoord);\n#if defined( SHADOWMAP_TYPE_PCF )'
      )
    } else {
      // Modern chunks have a dedicated BASIC getShadow() with a `sampler2D
      // shadowMap` that we can read raw depth from; inject before its depth
      // lookup so PCSS replaces the per-pixel comparison.
      modified = modified.replace(
        'float depth = texture2D( shadowMap, shadowCoord.xy ).r;',
        `return PCSS( shadowMap, shadowCoord );\n\t\t\t\tfloat depth = texture2D( shadowMap, shadowCoord.xy ).r;`
      )
    }

    ShaderChunk.shadowmap_pars_fragment = modified
    recompile()

    return () => {
      ShaderChunk.shadowmap_pars_fragment = original
      recompile()
    }
  })
</script>
