<script lang="ts">
  import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Color,
    Points,
    ShaderMaterial,
    Spherical,
    Vector3
  } from 'three'
  import { T, useTask } from '@threlte/core'
  import type { StarsProps } from './types.js'
  import { fragmentShader } from './fragment.js'
  import { vertexShader } from './vertex.js'

  let {
    count = 5000,
    radius = 50,
    depth = 50,
    factor = 6,
    saturation = 1.0,
    lightness = 0.8,
    speed = 1,
    fade = true,
    opacity = 1.0,
    ref = $bindable(),
    children,
    ...props
  }: StarsProps = $props()

  const points = new Points()

  const vec3 = new Vector3()
  const spherical = new Spherical()
  const color = new Color()

  const generateStar = (r: number) => {
    return vec3.setFromSpherical(
      spherical.set(r, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI)
    )
  }

  const geometry = new BufferGeometry()
  const positions = $derived(new BufferAttribute(new Float32Array(count * 3), 3))
  const colors = $derived(new BufferAttribute(new Float32Array(count * 3), 3))
  const sizes = $derived(new BufferAttribute(new Float32Array(count), 1))

  $effect.pre(() => {
    geometry.setAttribute('position', positions)
    geometry.setAttribute('color', colors)
    geometry.setAttribute('size', sizes)
  })

  $effect.pre(() => {
    const increment = depth / count

    let r = radius + depth

    for (let i = 0; i < count; i += 1) {
      r -= increment * Math.random()
      const position = generateStar(r)
      positions.setXYZ(i, position.x, position.y, position.z)

      color.setHSL(i / count, saturation, lightness)
      colors.setXYZ(i, color.r, color.g, color.b)

      sizes.setX(i, (0.5 + 0.5 * Math.random()) * factor)
    }
  })

  const { stop, start } = useTask(
    (dt) => {
      uniforms.time.value += dt * speed
    },
    { autoStart: false }
  )

  $effect.pre(() => (speed === 0 ? stop() : start()))

  const uniforms = {
    time: { value: 0 },
    fade: { value: 1 },
    opacity: { value: 1 }
  }

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  })

  $effect.pre(() => {
    uniforms.fade.value = fade ? 1 : 0
  })

  $effect.pre(() => {
    uniforms.opacity.value = opacity
  })
</script>

<T
  is={points}
  bind:ref
  {...props}
>
  <T is={geometry} />
  <T
    is={material}
    blending={AdditiveBlending}
    depthWrite={false}
    transparent
    vertexColors
  />
  {@render children?.({ ref: points })}
</T>
