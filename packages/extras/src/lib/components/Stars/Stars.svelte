<script lang="ts">
  import { AdditiveBlending, Color, ShaderMaterial, Spherical, Vector3 } from 'three'
  import { T, forwardEventHandlers, useTask } from '@threlte/core'
  import type { StarsEvents, StarsProps, StarsSlots } from './Stars.svelte'

  import { fragmentShader } from './fragment'
  import { vertexShader } from './vertex'

  type $$Props = Required<StarsProps>
  type $$Events = StarsEvents
  type $$Slots = StarsSlots

  export let count: $$Props['count'] = 5000
  export let radius: $$Props['radius'] = 50
  export let depth: $$Props['depth'] = 50
  export let factor: $$Props['factor'] = 6
  export let saturation: $$Props['saturation'] = 1.0
  export let lightness: $$Props['lightness'] = 0.8
  export let speed: $$Props['speed'] = 1
  export let fade: $$Props['fade'] = true
  export let opacity: $$Props['opacity'] = 1.0
  const vec3 = new Vector3()
  const spherical = new Spherical()

  const genStar = (r: number) => {
    return vec3.setFromSpherical(
      spherical.set(r, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI)
    )
  }

  let positionsArray: Float32Array
  let colorsArray: Float32Array
  let sizesArray: Float32Array

  $: {
    const positions: number[] = []
    const colors: number[] = []
    const sizes = Array.from({ length: count }, () => (0.5 + 0.5 * Math.random()) * factor)
    const color = new Color()
    let r = radius + depth
    const increment = depth / count
    for (let i = 0; i < count; i++) {
      r -= increment * Math.random()
      const position = genStar(r)
      positions.push(position.x, position.y, position.z)
      color.setHSL(i / count, saturation, lightness)
      colors.push(color.r, color.g, color.b)
    }
    positionsArray = new Float32Array(positions)
    colorsArray = new Float32Array(colors)
    sizesArray = new Float32Array(sizes)
  }

  const component = forwardEventHandlers()

  let time = 0
  const { stop, start } = useTask(
    (dt) => {
      time += dt * speed
    },
    { autoStart: false }
  )

  $: if (speed !== 0) {
    start()
  } else {
    stop()
  }

  const material = new ShaderMaterial({
    uniforms: { time: { value: 0.0 }, fade: { value: 1.0 }, opacity: { value: 1.0 } },
    vertexShader,
    fragmentShader
  })
</script>

<T.Points
  bind:this={$component}
  {...$$restProps}
  let:ref
>
  <T.BufferGeometry>
    <T.BufferAttribute
      attach={(parent, self) => {
        parent.setAttribute('position', self)
        return () => {}
      }}
      args={[positionsArray, 3]}
    ></T.BufferAttribute>
    <T.BufferAttribute
      attach={(parent, self) => {
        parent.setAttribute('color', self)
        return () => {}
      }}
      args={[colorsArray, 3]}
    ></T.BufferAttribute>
    <T.BufferAttribute
      attach={(parent, self) => {
        parent.setAttribute('size', self)
        return () => {}
      }}
      args={[sizesArray, 1]}
    ></T.BufferAttribute>
  </T.BufferGeometry>
  <T
    is={material}
    blending={AdditiveBlending}
    uniforms.fade.value={fade ? 1.0 : 0.0}
    uniforms.time.value={time}
    uniforms.opacity.value={opacity}
    depthWrite={false}
    transparent
    vertexColors
  />
  <slot {ref} />
</T.Points>
