<script lang="ts">
  import { Color } from 'three'
  import { T, useThrelte } from '@threlte/core'
  import { Text, Grid, Outlines, VirtualEnvironment, Stars } from '@threlte/extras'
  import { XR, useXR } from '@threlte/xr'
  import Sabers from './Sabers.svelte'
  import Blocks from './Blocks.svelte'
  import Mountains from './Mountains.svelte'
  import { Spring } from 'svelte/motion'

  const { scene } = useThrelte()
  const { isPresenting } = useXR()

  scene.environmentIntensity = 2
  scene.background = new Color('#0e1625')

  const spring = new Spring(1, { stiffness: 0.1, damping: 0.5 })

  $effect.pre(() => {
    spring.set($isPresenting ? 0 : 1)
  })
</script>

<XR>
  <Sabers />
  <Blocks />

  {#snippet fallback()}
    <T.PerspectiveCamera
      makeDefault
      position={[0, 1.8, 1]}
      oncreate={(ref) => {
        ref.lookAt(0, 1.8, 0)
      }}
    />
  {/snippet}
</XR>

<Text
  anchorX="center"
  anchorY="center"
  position={[0, 1.9, 0]}
  text="bonksaber!"
  font="/fonts/adrip1.ttf"
  color="red"
  fillOpacity={spring.current}
  strokeOpacity={spring.current}
/>

<T.AmbientLight />
<T.DirectionalLight />

<Mountains />

<Stars />

<Grid
  infiniteGrid
  cellColor="purple"
  type="lines"
  axis="x"
/>

<!-- floor -->
<T.Mesh>
  <T.CylinderGeometry args={[2, 2, 0.1, 128]} />
  <T.MeshStandardMaterial
    color="white"
    roughness={0}
    metalness={0.1}
  />

  <Outlines color="hotpink" />
</T.Mesh>

<!-- sun -->
<T.Mesh
  position={[-30, 40, -100]}
  oncreate={(ref) => ref.lookAt(0, 0, 0)}
>
  <T.MeshBasicMaterial color="#FF4F4F" />
  <T.CircleGeometry args={[5 / 2]} />
</T.Mesh>

<VirtualEnvironment frames={20}>
  <T.Mesh
    position={[-8, 8, -10]}
    oncreate={(ref) => ref.lookAt(0, 0, 0)}
  >
    <T.MeshBasicMaterial color="#FF4F4F" />
    <T.CircleGeometry args={[5 / 2]} />
  </T.Mesh>

  <T.Mesh
    position={[6, 8, -10]}
    oncreate={(ref) => ref.lookAt(0, 0, 0)}
  >
    <T.PlaneGeometry args={[10, 10]} />
    <T.MeshBasicMaterial color="#FFD0CB" />
  </T.Mesh>

  <T.Mesh
    position={[4, 10, 5]}
    oncreate={(ref) => ref.lookAt(0, 0, 0)}
  >
    <T.PlaneGeometry args={[10, 10]} />
    <T.MeshBasicMaterial color="#2223FF" />
  </T.Mesh>
</VirtualEnvironment>
