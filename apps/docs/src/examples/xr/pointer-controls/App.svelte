<script lang='ts'>
  import { T, Canvas } from '@threlte/core'
  import { BufferGeometry, Vector3 } from 'three'
  import { XR, Controller, Hand, VRButton } from '@threlte/xr'
  import Scene from './Scene.svelte'

  const points = [new Vector3(0, 0, 0), new Vector3(0, 0, -1000)]
  
  let debug = false
</script>

<svelte:window
  on:keyup={(e) => e.key === 'd' && (debug = !debug)}
/>

<Canvas>
  <Scene />

  <XR>
    <Controller left>
        <T.Line slot='target-ray' visible={debug}>
          <T is={new BufferGeometry().setFromPoints(points)} />
        </T.Line>
    </Controller>

    <Controller right>
      <T.Line slot='target-ray' visible={debug}>
        <T is={new BufferGeometry().setFromPoints(points)} />
      </T.Line>
    </Controller>

    <Hand left />
    <Hand right />

    <T.PerspectiveCamera
      slot='fallback'
      makeDefault
      position={[0, 1.5, 5]}
      on:create={({ ref }) => ref.lookAt(0, 1.5, 0)}
    />
  </XR>

  <T.AmbientLight />
  <T.DirectionalLight intensity={1.5} position={[1, 1, 1]} />
</Canvas>

<VRButton />
