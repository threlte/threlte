<script lang='ts'>
  import { T } from '@threlte/core'
  import { Hand, XR, useXR } from '@threlte/xr'
  import { Attractor } from '@threlte/rapier'
  import JointCollider from './JointBody.svelte'
  import Cubes from './Cube.svelte'

  const { isHandTracking } = useXR()
</script>

<XR>
  <Hand left />
  <Hand right />

  {#if $isHandTracking}
    {#each { length: 25 } as _, jointIndex}
      <JointCollider {jointIndex} hand='left' />
      <JointCollider {jointIndex} hand='right' />
    {/each}
  {/if}  
</XR>

<Cubes />

<T.PerspectiveCamera
  makeDefault
  position={[0, 1, 1]}
  on:create={({ ref }) => ref.lookAt(0, 1.8, 0)}
/>

<T.AmbientLight />

<T.SpotLight
  position={[1, 8, 1]}
  angle={0.3}
  penumbra={1}
  intensity={30}
  castShadow
  target.x={0}
  target.y={1.8}
  target.z={0}
/>

<Attractor
  range={50}
  strength={0.000001}
  position={[0, 1.7, 0]}
/>
