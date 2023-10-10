<script lang='ts'>
  import { T, Canvas } from '@threlte/core'
  import { BufferGeometry, Vector3 } from 'three'
  import { XR, Controller, VRButton } from '@threlte/xr'
  import Scene from './Scene.svelte'
  
</script>

<Canvas>
  <Scene />

  <XR>
    <Controller left>
      <T.Line slot='pointer-ray'>
        <T is={new BufferGeometry().setFromPoints([
          new Vector3(0, 0, 0),
          new Vector3(0, 0, -1000)
        ])} />
      </T.Line>
    </Controller>

    <Controller right>
      <T.Line slot='pointer-ray'>
        <T is={new BufferGeometry().setFromPoints([
          new Vector3(0, 0, 0),
          new Vector3(0, 0, -1000)
        ])} />
      </T.Line>
    </Controller>

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
