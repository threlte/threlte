<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Debug } from '@threlte/rapier'
  import AttachedCollider from './AttachedCollider.svelte'
  import Sensor from './Sensor.svelte'
  import StandaloneCollider from './StandaloneCollider.svelte'

  interface Props {
    testIndex: number
  }

  let { testIndex }: Props = $props()

  const tests = [StandaloneCollider, AttachedCollider, Sensor]

  const SvelteComponent = $derived(tests[testIndex])
</script>

<T.PerspectiveCamera
  position.x={12}
  position.y={13}
  fov={40}
  makeDefault
  oncreate={(ref) => ref.lookAt(2.5, 0, 0)}
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

<SvelteComponent />
