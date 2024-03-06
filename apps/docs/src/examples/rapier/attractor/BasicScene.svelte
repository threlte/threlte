<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Attractor } from '@threlte/rapier'
  import RandomMeshes from './RandomMeshes.svelte'

  let count: number = 50
  export let strengthLeft: number
  export let strengthCenter: number
  export let strengthRight: number
  export const reset = () => {
    count = 0
    setTimeout(() => (count = 50))
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position.y={50}
  position.z={100}
  fov={70}
  far={10000}
>
  <OrbitControls
    enableZoom={true}
    target.y={20}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[8, 20, -3]}
/>

<T.GridHelper args={[100]} />

<RandomMeshes
  {count}
  rangeX={[-30, 30]}
  rangeY={[0, 75]}
  rangeZ={[-10, 10]}
/>

<Attractor
  range={20}
  strength={strengthLeft}
  position={[-25, 10, 0]}
/>
<Attractor
  range={15}
  strength={strengthCenter}
  position={[0, 20, 0]}
/>
<Attractor
  range={20}
  strength={strengthRight}
  position={[25, 10, 0]}
/>
