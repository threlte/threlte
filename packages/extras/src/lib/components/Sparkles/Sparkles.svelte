<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import {
    BufferAttribute,
    BufferGeometry,
    Color,
    ShaderMaterial,
    Vector3,
    Points,
    MathUtils,
    type ColorRepresentation,
    Uniform
  } from 'three'
  import fragmentShader from './fragment.js'
  import vertexShader from './vertex.js'
  import type { Props } from '@threlte/core'

  interface SparklesProps extends Props<Points> {
    /**
     * Number of particles
     *
     * @default 100
     */
    count?: number

    /**
     * Speed of particles
     *
     * @default 1
     */
    speed?: number | Float32Array

    /**
     * Opacity of particles
     *
     * @default 1
     */
    opacity?: number | Float32Array

    /**
     * Color of particles
     */
    color?: ColorRepresentation | Float32Array

    /**
     * Size of particles
     *
     * @default randomized between 0 and 1
     */
    size?: number | Float32Array

    /**
     * The space the particles occupy
     *
     * @default 1
     */
    scale?: number | [number, number, number]

    /**
     * Movement factor
     *
     * @default 1
     */
    noise?: number | [number, number, number] | Float32Array

    material?: never
    geometry?: never
  }

  let {
    count = 100,
    speed,
    opacity,
    color,
    size = Math.random(),
    scale,
    noise,
    children,
    ...rest
  }: SparklesProps = $props()

  const { dpr } = useThrelte()

  const vec3 = new Vector3()
  const colorUtil = new Color()

  const isFloat32Array = (def: any): def is Float32Array =>
    def && (def as Float32Array).constructor === Float32Array

  const geometry = new BufferGeometry()

  $effect(() => {
    if (Array.isArray(scale)) {
      vec3.fromArray(scale)
    } else {
      vec3.setScalar(scale ?? 1)
    }

    const positions = new Float32Array(count * 3)

    for (let i = 0, l = count * 3; i < l; i += 3) {
      positions[i + 0] = MathUtils.randFloatSpread(vec3.x)
      positions[i + 1] = MathUtils.randFloatSpread(vec3.y)
      positions[i + 2] = MathUtils.randFloatSpread(vec3.z)
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3))
  })

  $effect(() => {
    const array =
      typeof size === 'number'
        ? new Float32Array(count).fill(size)
        : size === undefined
          ? Float32Array.from({ length: count }, () => Math.random())
          : size

    geometry.setAttribute('size', new BufferAttribute(array, 1))
  })

  $effect(() => {
    const array =
      typeof speed === 'number'
        ? new Float32Array(count).fill(speed)
        : speed === undefined
          ? Float32Array.from({ length: count }, () => Math.random())
          : speed

    geometry.setAttribute('speed', new BufferAttribute(array, 1))
  })

  $effect(() => {
    const array =
      typeof opacity === 'number'
        ? new Float32Array(count).fill(opacity)
        : opacity === undefined
          ? Float32Array.from({ length: count }, () => Math.random())
          : opacity

    geometry.setAttribute('opacity', new BufferAttribute(array, 1))
  })
  $effect(() => {
    const array =
      typeof noise === 'number'
        ? new Float32Array(count * 3).fill(noise)
        : noise === undefined
          ? Float32Array.from({ length: count * 3 }, () => Math.random())
          : Array.isArray(noise)
            ? Float32Array.from({ length: count * 3 }, (_, k) => noise[k % 3])
            : noise

    geometry.setAttribute('noise', new BufferAttribute(array, 3))
  })

  $effect(() => {
    if (isFloat32Array(color)) {
      geometry.setAttribute('color', new BufferAttribute(color, 3))
    } else {
      colorUtil.set(color ?? 'white')
      const colorArray = colorUtil.toArray()
      const array = Float32Array.from({ length: count * 3 }, (_, k) => colorArray[k % 3])
      geometry.setAttribute('color', new BufferAttribute(array, 3))
    }
  })

  const uniforms = {
    time: new Uniform(0),
    pixelRatio: new Uniform(1)
  }

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false
  })

  $effect(() => {
    uniforms.pixelRatio.value = $dpr
  })

  let elapsed = 0
  useTask((dt) => {
    elapsed += dt
    uniforms.time.value = elapsed
  })

  const points = new Points()
</script>

<T
  is={points}
  {...rest}
>
  <T is={material} />
  <T is={geometry} />
  {@render children?.({ ref: points })}
</T>
