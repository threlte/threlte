<script lang="ts">
  import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Color,
    Points,
    ShaderMaterial,
    Uniform,
    Vector3
  } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'
  import type { StarsProps } from './types.js'
  import { fragmentShader } from './fragment.js'
  import { vertexShader } from './vertex.js'

  let {
    count = 5000,
    radius = 50,
    depth = 50,
    factor = 6,
    saturation = 1,
    lightness = 0.8,
    speed = 0,
    fade = true,
    opacity = 1.0,
    rounded = false,
    ref = $bindable(),
    children,
    ...props
  }: StarsProps = $props()

  const { invalidate } = useThrelte()

  const points = new Points()
  const vec3 = new Vector3()
  const color = new Color()

  const geometry = new BufferGeometry()
  const positions = $derived(new BufferAttribute(new Float32Array(count * 3), 3))
  const colors = $derived(new BufferAttribute(new Float32Array(count * 3), 3))
  const sizes = $derived(new BufferAttribute(new Float32Array(count), 1))
  const phases = $derived(new BufferAttribute(new Float32Array(count), 1))

  $effect(() => {
    geometry.setAttribute('position', positions)
    geometry.setAttribute('color', colors)
    geometry.setAttribute('size', sizes)
    geometry.setAttribute('phase', phases)
  })

  $effect(() => {
    for (let i = 0; i < count; i += 1) {
      phases.setX(i, Math.random())
    }

    phases.needsUpdate = true
    invalidate()
  })

  $effect(() => {
    const increment = depth / count

    let totalRadius = radius + depth

    for (let i = 0; i < count; i += 1) {
      totalRadius -= increment * Math.random()
      const position = vec3.randomDirection().multiplyScalar(totalRadius)
      positions.setXYZ(i, position.x, position.y, position.z)
    }

    positions.needsUpdate = true
    invalidate()
  })

  $effect(() => {
    for (let i = 0; i < count; i += 1) {
      sizes.setX(i, (0.5 + 0.5 * Math.random()) * factor)
    }

    sizes.needsUpdate = true
    invalidate()
  })

  $effect(() => {
    for (let i = 0; i < count; i += 1) {
      color.setHSL(i / count, saturation, lightness)
      colors.setXYZ(i, color.r, color.g, color.b)
    }

    colors.needsUpdate = true

    invalidate()
  })

  const uniforms = {
    time: new Uniform(0),
    fade: new Uniform(1),
    opacity: new Uniform(1),
    rounded: new Uniform(0)
  }

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  })

  useTask(
    (dt) => {
      uniforms.time.value += dt * speed
      invalidate()
    },
    {
      running: () => speed > 0,
      autoInvalidate: false
    }
  )

  $effect(() => {
    uniforms.fade.value = fade ? 1 : 0
    invalidate()
  })

  $effect(() => {
    uniforms.opacity.value = opacity
    invalidate()
  })

  $effect(() => {
    uniforms.rounded.value = rounded ? 1 : 0
    invalidate()
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
    transparent={rounded || opacity < 1}
    vertexColors
  />
  {@render children?.({ ref: points })}
</T>
