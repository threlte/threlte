<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Sky, useGamepad } from '../lib'

  const gamepad = useGamepad()
  const { connected } = gamepad

  connected.subscribe((value) => {
    if (value) {
      console.log(gamepad.raw)
    }
  })

  $: console.log($connected ? 'connected' : 'disconnected')

  gamepad.leftStick.on('change', (event) => {
    if (event.type === 'change') {
      console.log(event.value.x, event.value.y)
    }
  })

  gamepad.on('press', (event) => {

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
