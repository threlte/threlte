<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { Suspense, Text } from '@threlte/extras'
  import { Color } from 'three'
  import Spaceship from './Spaceship.svelte'
  import StarsEmitter from './StarsEmitter.svelte'

  const { size, scene } = useThrelte()

  scene.background = new Color('black')

  let zoom = $size.width / 50
  $: zoom = $size.width / 50
</script>

<T.OrthographicCamera
  position={[-40, 25, 40]}
  makeDefault
  {zoom}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, -8)
  }}
/>

<T.DirectionalLight
  position={[5, 10, 3]}
  intensity={1}
/>

<Suspense
  final
  on:load={() => {
    posZ.set(0)
  }}
>
  <Text
    position.z={-8}
    slot="fallback"
    text="Loading"
    fontSize={1}
    color="white"
    anchorX="50%"
    anchorY="50%"
  />

  <Text
    slot="error"
    position.z={-8}
    let:errors
    text={errors.map((e) => e).join(', ')}
    fontSize={1}
    color="white"
    anchorX="50%"
    anchorY="50%"
  />

  <StarsEmitter />

  <Spaceship
    name="Bob"
    position={[-12, 0, 3]}
  />
  <Spaceship
    name="Challenger"
    position={[10, 5, 6]}
  />
  <Spaceship
    name="Dispatcher"
    position={[8, 3, -23]}
  />
  <Spaceship
    name="Executioner"
    position={[12, -4, 6]}
  />
  <Spaceship
    name="Imperial"
    position={[-1, 0, -21]}
  />
  <Spaceship
    name="Insurgent"
    position={[-13, 1, -21]}
  />
  <Spaceship
    name="Omen"
    position={[-9, -5, 13]}
  />
  <Spaceship
    name="Pancake"
    position={[-9, -3, -9]}
  />
  <Spaceship
    name="Spitfire"
    position={[1, 0, 1]}
  />
  <Spaceship
    name="Striker"
    position={[8, -1, -10]}
  />
  <Spaceship
    name="Zenith"
    position={[-1, 0, 13]}
  />
</Suspense>
