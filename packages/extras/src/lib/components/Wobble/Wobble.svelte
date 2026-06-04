<script
  module
  lang="ts"
>
  import {
    Mesh,
    MeshDepthMaterial,
    MeshDistanceMaterial,
    RGBADepthPacking,
    Uniform,
    Vector3,
    type Material,
    type WebGLProgramParametersWithUniforms
  } from 'three'

  interface WobbleUniforms {
    time: Uniform<number>
    factor: Uniform<number>
    frequency: Uniform<number>
    noise: Uniform<number>
    pulse: Uniform<number>
    drift: Uniform<number>
    bendiness: Uniform<number>

    // wobble "up", pre-normalized
    axis: Uniform<Vector3>
    across1: Uniform<Vector3>
    across2: Uniform<Vector3>
    anchor: Uniform<number>
    hasAnchor: Uniform<boolean>
    forceDirection: Uniform<Vector3>
    hasForceDirection: Uniform<boolean>
  }

  // Ashima 3D simplex noise + fBM + a Rodrigues rotation helper.
  const WOBBLE_HELPERS_GLSL = `
    vec3 wobbleMod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 wobbleMod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 wobblePermute(vec4 x) { return wobbleMod289(((x * 34.0) + 10.0) * x); }
    vec4 wobbleTaylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float wobbleSnoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = wobbleMod289(i);
      vec4 p = wobblePermute(wobblePermute(wobblePermute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = wobbleTaylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    // Fractal Brownian motion: 4 octaves of simplex noise at doubling
    // frequencies and halving amplitudes. The standard recipe for organic,
    // wind-like motion. Normalized so the result stays roughly in [-1, 1].
    float wobbleFbm(vec3 v) {
      float sum = 0.0;
      float amp = 1.0;
      float freq = 1.0;
      for (int i = 0; i < 4; i++) {
        sum += amp * wobbleSnoise(v * freq);
        amp *= 0.5;
        freq *= 2.0;
      }
      return sum / 1.875;
    }

    // Rodrigues' rotation formula: rotate v around unit-vector k by angle.
    vec3 wobbleRotate(vec3 v, vec3 k, float angle) {
      float c = cos(angle);
      float s = sin(angle);
      return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c);
    }
  `

  const WOBBLE_CACHE_KEY = '__wobble_v2'

  const patchWobbleShader = (
    shader: WebGLProgramParametersWithUniforms,
    uniforms: WobbleUniforms,
    { withNormals }: { withNormals: boolean }
  ) => {
    shader.uniforms.time = uniforms.time
    shader.uniforms.factor = uniforms.factor
    shader.uniforms.frequency = uniforms.frequency
    shader.uniforms.noise = uniforms.noise
    shader.uniforms.pulse = uniforms.pulse
    shader.uniforms.drift = uniforms.drift
    shader.uniforms.bendiness = uniforms.bendiness
    shader.uniforms.axis = uniforms.axis
    shader.uniforms.across1 = uniforms.across1
    shader.uniforms.across2 = uniforms.across2
    shader.uniforms.anchor = uniforms.anchor
    shader.uniforms.hasAnchor = uniforms.hasAnchor
    shader.uniforms.forceDirection = uniforms.forceDirection
    shader.uniforms.hasForceDirection = uniforms.hasForceDirection

    shader.vertexShader = `
      uniform float time;
      uniform float factor;
      uniform float frequency;
      uniform float noise;
      uniform float pulse;
      uniform float drift;
      uniform float bendiness;
      uniform vec3 axis;
      uniform vec3 across1;
      uniform vec3 across2;
      uniform float anchor;
      uniform bool hasAnchor;
      uniform vec3 forceDirection;
      uniform bool hasForceDirection;
      ${WOBBLE_HELPERS_GLSL}
      ${shader.vertexShader}
    `

    // Each branch below is gated on a uniform comparison so the compiler
    // folds it out when the prop is at its neutral value.
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `float along = dot(position, axis);
       vec2 acrossPos = vec2(dot(position, across1), dot(position, across2));

       // For InstancedMesh / BatchedMesh, fold each instance's "across"
       // translation into the noise sample so instances wobble out of phase.
       vec2 instanceOffset = vec2(0.0);
       #ifdef USE_INSTANCING
         vec3 instTrans = vec3(instanceMatrix[3].x, instanceMatrix[3].y, instanceMatrix[3].z);
         instanceOffset = vec2(dot(instTrans, across1), dot(instTrans, across2));
       #endif
       #ifdef USE_BATCHING
         vec3 batchTrans = vec3(batchingMatrix[3].x, batchingMatrix[3].y, batchingMatrix[3].z);
         instanceOffset = vec2(dot(batchTrans, across1), dot(batchTrans, across2));
       #endif

       float weight = hasAnchor ? abs(along - anchor) : 1.0;
       vec2 spatialSample = (acrossPos + instanceOffset) * frequency;

       float wobble = sin(1.0 + time + along * frequency + instanceOffset.x);
       if (noise > 0.0) {
         wobble = mix(wobble, wobbleFbm(vec3(spatialSample * 0.6, time * 0.5)), noise);
       }

       float gust = 1.0;
       if (pulse > 0.0) {
         // Two sines stacked, offset per-instance so neighbours pulse out of
         // sync. Maps roughly to [0, 1].
         float pulseSum =
           0.6 * sin(time * 0.3 + instanceOffset.x * 0.3) +
           0.4 * sin(time * 0.71 + instanceOffset.y * 0.3 + 1.3);
         float pulseNoise = pulseSum * 0.5 + 0.5;
         gust = mix(1.0, 0.1 + 1.4 * pulseNoise, pulse);
       }

       float theta = wobble * gust / 2.0 * factor * weight;

       vec3 transformed = position;
       ${withNormals ? 'vec3 normalAcc = vNormal;' : ''}

       // Twist around the wobble axis. Skipped entirely when bendiness == 1
       // because the bend path fully replaces the position.
       if (bendiness < 1.0) {
         transformed = wobbleRotate(position, axis, theta);
         ${withNormals ? 'normalAcc = wobbleRotate(vNormal, axis, theta);' : ''}
       }

       // Bend: tilt in the across-plane toward forceDirection. Skipped when
       // bendiness == 0; otherwise blended with the twist above.
       if (bendiness > 0.0) {
         float pivotAlong = hasAnchor ? anchor : 0.0;
         vec3 anchorPoint = axis * pivotAlong;

         vec3 forceDir;
         if (hasForceDirection) {
           vec3 fd = forceDirection - dot(forceDirection, axis) * axis;
           float fdLen = length(fd);
           forceDir = fdLen > 0.0001 ? fd / fdLen : across1;
         } else if (drift > 0.0) {
           // Two sines stacked; gives a slow non-repeating angle.
           float driftSum =
             0.6 * sin(time * 0.08) +
             0.4 * sin(time * 0.19 + 2.1);
           float driftAngle = driftSum * 3.14159 * drift;
           forceDir = across1 * cos(driftAngle) + across2 * sin(driftAngle);
         } else {
           forceDir = across1;
         }
         vec3 bendAxisVec = cross(axis, forceDir);

         // Bend uses its own slow oscillation; macroscopic sway is much
         // slower than the per-vertex twist flutter.
         float bendUniform = sin(time * 0.25 + instanceOffset.x * 0.2);
         float bendWobble = bendUniform;
         if (noise > 0.0) {
           float bendPerVertex = wobbleFbm(vec3(spatialSample * 0.3, time * 0.15));
           bendWobble = mix(bendUniform, bendPerVertex, noise);
         }
         float bendTheta = bendWobble * gust * factor * weight / 2.0;

         vec3 bent = wobbleRotate(position - anchorPoint, bendAxisVec, bendTheta) + anchorPoint;
         transformed = mix(transformed, bent, bendiness);
         ${
           withNormals
             ? `normalAcc = mix(normalAcc, wobbleRotate(vNormal, bendAxisVec, bendTheta), bendiness);`
             : ''
         }
       }

       ${withNormals ? 'vNormal = normalAcc;' : ''}`
    )
  }

  const applyWobble = (material: Material, uniforms: WobbleUniforms) => {
    const originalOnBeforeCompile = material.onBeforeCompile
    const originalCacheKey = material.customProgramCacheKey

    material.onBeforeCompile = function (shader, renderer) {
      originalOnBeforeCompile.call(this, shader, renderer)
      patchWobbleShader(shader, uniforms, { withNormals: true })
    }
    material.customProgramCacheKey = function () {
      return `${originalCacheKey.call(this)}|${WOBBLE_CACHE_KEY}`
    }
    material.needsUpdate = true

    return () => {
      material.onBeforeCompile = originalOnBeforeCompile
      material.customProgramCacheKey = originalCacheKey
      material.needsUpdate = true
    }
  }

  const applyShadowWobble = (mesh: Mesh, uniforms: WobbleUniforms) => {
    const previousDepth = mesh.customDepthMaterial
    const previousDistance = mesh.customDistanceMaterial

    const depthMaterial = new MeshDepthMaterial({ depthPacking: RGBADepthPacking })
    depthMaterial.onBeforeCompile = (shader) =>
      patchWobbleShader(shader, uniforms, { withNormals: false })

    const distanceMaterial = new MeshDistanceMaterial()
    distanceMaterial.onBeforeCompile = (shader) =>
      patchWobbleShader(shader, uniforms, { withNormals: false })

    mesh.customDepthMaterial = depthMaterial
    mesh.customDistanceMaterial = distanceMaterial

    return () => {
      mesh.customDepthMaterial = previousDepth
      mesh.customDistanceMaterial = previousDistance
      depthMaterial.dispose()
      distanceMaterial.dispose()
    }
  }
</script>

<script lang="ts">
  import { isInstanceOf, useParent, useTask, useThrelte } from '@threlte/core'
  import type { WobbleProps } from './types.js'

  const { invalidate } = useThrelte()

  let {
    speed = 1,
    factor = 1,
    frequency = 1,
    noise = 0,
    pulse = 0,
    drift = 0,
    bendiness = 0,
    axis = [0, 1, 0],
    anchor,
    forceDirection,
    time,
    material: materialProp,
    shadow = true
  }: WobbleProps = $props()

  const parent = useParent()

  const uniforms: WobbleUniforms = {
    time: new Uniform(0),
    factor: new Uniform(1),
    frequency: new Uniform(1),
    noise: new Uniform(0),
    pulse: new Uniform(0),
    drift: new Uniform(0),
    bendiness: new Uniform(0),
    axis: new Uniform(new Vector3(0, 1, 0)),
    across1: new Uniform(new Vector3(1, 0, 0)),
    across2: new Uniform(new Vector3(0, 0, 1)),
    anchor: new Uniform(0),
    hasAnchor: new Uniform(false),
    forceDirection: new Uniform(new Vector3()),
    hasForceDirection: new Uniform(false)
  }

  const basisRef = new Vector3()

  $effect(() => {
    uniforms.factor.value = factor
    invalidate()
  })

  $effect(() => {
    uniforms.frequency.value = frequency
    invalidate()
  })

  $effect(() => {
    uniforms.noise.value = noise
    invalidate()
  })

  $effect(() => {
    uniforms.pulse.value = pulse
    invalidate()
  })

  $effect(() => {
    uniforms.drift.value = drift
    invalidate()
  })

  $effect(() => {
    uniforms.bendiness.value = bendiness
    invalidate()
  })

  $effect(() => {
    // Build the orthonormal basis (axis + two perpendicular axes) once on
    // the CPU. Saves recomputing it per vertex.
    const a = uniforms.axis.value.set(axis[0], axis[1], axis[2]).normalize()
    basisRef.set(0, 1, 0)
    if (Math.abs(a.y) >= 0.9) basisRef.set(1, 0, 0)
    uniforms.across1.value.crossVectors(a, basisRef).normalize()
    uniforms.across2.value.crossVectors(a, uniforms.across1.value)
    invalidate()
  })

  $effect(() => {
    if (anchor === undefined) {
      uniforms.hasAnchor.value = false
    } else {
      uniforms.anchor.value = anchor
      uniforms.hasAnchor.value = true
    }
    invalidate()
  })

  $effect(() => {
    if (forceDirection === undefined) {
      uniforms.hasForceDirection.value = false
    } else {
      uniforms.forceDirection.value.set(forceDirection[0], forceDirection[1], forceDirection[2])
      uniforms.hasForceDirection.value = true
    }
    invalidate()
  })

  // Drive the clock externally when `time` is supplied
  $effect(() => {
    if (time !== undefined) {
      uniforms.time.value = time
      invalidate()
    }
  })

  $effect(() => {
    const parentMesh = $parent
    if (!isInstanceOf(parentMesh, 'Mesh')) {
      console.error('<Wobble> must be placed inside a <T.Mesh>.')
      return
    }

    const target = materialProp ?? parentMesh.material
    if (!target) return

    const materials = Array.isArray(target) ? target : [target]
    const restoreMaterials = materials.map((m) => applyWobble(m, uniforms))
    const restoreShadow = shadow ? applyShadowWobble(parentMesh as Mesh, uniforms) : undefined

    return () => {
      restoreMaterials.forEach((fn) => fn())
      restoreShadow?.()
    }
  })

  useTask(
    (delta) => {
      uniforms.time.value += delta * speed
    },
    { running: () => time === undefined && speed !== 0 }
  )
</script>
