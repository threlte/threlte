<script lang="ts">
  import Spaceship from './Spaceship.svelte'
  import type { SpaceshipProps } from './types'
  import { BakeShadows, OrbitControls, Suspense, Text } from '@threlte/extras'
  import { Color } from 'three'
  import { T, useThrelte } from '@threlte/core'

  const { size, scene } = useThrelte()
  scene.background = new Color('black')

  let zoom = $derived(size.current.width / 50)

  type Ship = Required<Pick<SpaceshipProps, 'name' | 'position'>>

  const ships: Ship[] = [
    { name: 'Bob', position: [-12, 0, 3] },
    { name: 'Challenger', position: [10, 5, 6] },
    { name: 'Dispatcher', position: [8, 3, -23] },
    { name: 'Executioner', position: [12, -4, 6] },
    { name: 'Imperial', position: [-1, 0, -21] },
    { name: 'Insurgent', position: [-13, 1, -21] },
    { name: 'Omen', position: [-9, -5, 13] },
    { name: 'Pancake', position: [-9, -3, -9] },
    { name: 'Spitfire', position: [1, 0, 1] },
    { name: 'Striker', position: [8, -1, -10] },
    { name: 'Zenith', position: [-1, 0, 13] }
  ]
</script>

<Suspense final>
  <T.OrthographicCamera
    position={[-40, 25, 40]}
    makeDefault
    {zoom}
    oncreate={(ref) => {
      ref.lookAt(0, 0, -8)
    }}
  >
    <OrbitControls />
  </T.OrthographicCamera>

  <T.SpotLight
    position={[0, 25, 0]}
    castShadow
    intensity={1000}
    angle={Math.PI / 3}
  />

  {#each ships as ship (ship)}
    <Spaceship
      name={ship.name}
      position={ship.position}
    />
  {/each}
  <BakeShadows />

  <T.Mesh
    receiveShadow
    position.y={-10}
    rotation.x={-1 * 0.5 * Math.PI}
  >
    <T.CircleGeometry args={[100]} />
    <T.MeshStandardMaterial color="white" />
  </T.Mesh>

  {#snippet fallback()}
    <Text
      position.z={-8}
      text="Loading..."
      fontSize={1}
      color="white"
      anchorX="50%"
      anchorY="50%"
      oncreate={(ref) => {
        ref.lookAt(-40, 25, 40)
      }}
    />
  {/snippet}
</Suspense>
