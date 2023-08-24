<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Debug } from '@threlte/rapier'
  import AttachedCollider from './AttachedCollider.svelte'
  import Sensor from './Sensor.svelte'
  import StandaloneCollider from './StandaloneCollider.svelte'

  export let testIndex: number

  const tests = [StandaloneCollider, AttachedCollider, Sensor]
</script>

<T.PerspectiveCamera
  position.x={12}
  position.y={13}
  fov={40}
  makeDefault
>
  <OrbitControls target.x={2.5} />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[8, 20, -3]}
/>

<T.GridHelper args={[50]} />

<Debug
  depthTest={false}
  depthWrite={false}
/>

<svelte:component this={tests[testIndex]} />
