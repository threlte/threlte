<script lang="ts">
  import { T } from '@threlte/core'
  import { Environment, GLTF, interactivity, onReveal, useInteractivity } from '@threlte/extras'
  import { cubicOut } from 'svelte/easing'
  import { spring, tweened } from 'svelte/motion'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import CameraFade from './CameraFade.svelte'

  interactivity()
  const { pointer } = useInteractivity()

  const opacity = tweened(1, {
    duration: 3e3,
    easing: cubicOut
  })

  const scale = tweened(0.9, {
    duration: 3e3,
    easing: cubicOut
  })

  const rotationY = tweened(120 * DEG2RAD, {
    duration: 3e3,
    easing: cubicOut
  })

  onReveal(() => {
    rotationY.set(150 * DEG2RAD)
    scale.set(1)
    opacity.set(0)
  })

  const pointerSpring = spring({ x: $pointer.x, y: $pointer.y })
  $: pointerSpring.set({ x: $pointer.x, y: $pointer.y })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 8, 30]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
  fov={20}
>
  <CameraFade
    opacity={$opacity}
    color="black"
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />

<Environment
  path="/hdr/"
  files="shanghai_riverside_1k.hdr"
/>

<GLTF
  position.y={0.9}
  rotation.y={$rotationY + $pointerSpring.x * DEG2RAD * 10}
  rotation.x={-$pointerSpring.y * DEG2RAD * 10}
  scale={0.2 * $scale}
  url="/models/wave-ring/Ring.glb"
/>
