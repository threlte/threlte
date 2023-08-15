<script lang='ts'>
import { Hands, XR, useXR } from '$lib'
import { T } from '@threlte/core'
import { Attractor } from '@threlte/rapier'
import JointCollider from './joint-collider.svelte'
import Cubes from './cube.svelte'

const { isHandTracking } = useXR()

</script>

<XR>
  <Hands />

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
  position={[0, 1.8, 1]}
  on:create={({ ref }) => ref.lookAt(0, 1.8, 0)}
/>

<T.AmbientLight intensity={0.5} />
<T.SpotLight position={[1, 8, 1]} angle={0.3} penumbra={1} intensity={1} castShadow />

<Attractor
  range={50}
  strength={0.000001}
  position={[0, 1.7, 0]}
/>
