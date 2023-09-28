<script lang="ts">
  import { T, useFrame } from '@threlte/core'
  import { Grid, OrbitControls, Sky, useGamepad } from '../lib'

  const gamepad = useGamepad()

  $: gamepad.connected ? console.log('connected') : console.log('disconnected')

  gamepad.leftStick.on('change', (event) => {
    console.log('x:', gamepad.leftStick.x, 'y:', gamepad.leftStick.y)
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[3, 3, 3]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Sky />

<Grid />

<T.Mesh position.y={1}>
  <T.MeshStandardMaterial
    transparent
    color="white"
  />
  <T.SphereGeometry />
</T.Mesh>
