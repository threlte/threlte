<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { XR } from '@threlte/xr'
  import type { Group } from 'three'
  import Spaceship from './models/spaceship.svelte'

  // Place the ship as a small toy hovering ~40 cm in front of the user at
  // roughly eye height. Scale it down from the tutorial's scene-scale.
  const SCALE = 0.02

  let spaceship = $state<Group>()
  let t = $state(0)

  useTask((delta) => {
    t += delta
  })

  const bob = $derived(Math.sin(t * 1.5) * 0.02)
  const yaw = $derived(t * 0.4)
  const roll = $derived(Math.sin(t * 0.8) * 0.15)
</script>

<XR />

<T.PerspectiveCamera
  makeDefault
  position={[0, 1.5, 0.5]}
  fov={50}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
    target={[0, 1.4, 0]}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={1.5}
  position={[0.2, 0.6, 0.4]}
/>
<T.AmbientLight intensity={0.8} />

<Spaceship
  bind:ref={spaceship}
  scale={SCALE}
  position={[0, 1.4 + bob, -0.3]}
  rotation={[0, yaw, roll, 'ZXY']}
/>
