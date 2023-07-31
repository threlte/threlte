<script>
  import { T } from '@threlte/core'
  import { AutoColliders, CollisionGroups, Debug } from '@threlte/rapier'
  import { BoxGeometry, MeshStandardMaterial } from 'three'
  import Door from '../../rapier/world/Door.svelte'
  import Player from './Player.svelte'
</script>

<T.DirectionalLight
  castShadow
  position={[8, 20, -3]}
/>
<T.AmbientLight intensity={0.2} />

<Debug />

<T.GridHelper
  args={[50]}
  position.y={0.01}
/>

<CollisionGroups groups={[0, 15]}>
  <AutoColliders
    shape={'cuboid'}
    position={[0, -0.5, 0]}
  >
    <T.Mesh
      receiveShadow
      geometry={new BoxGeometry(100, 1, 100)}
      material={new MeshStandardMaterial()}
    />
  </AutoColliders>
</CollisionGroups>

<CollisionGroups groups={[0]}>
  <!-- position={{ x: 2 }} -->
  <Player />
  <Door />

  <!-- WALLS -->
  <AutoColliders shape={'cuboid'}>
    <T.Mesh
      receiveShadow
      castShadow
      position.x={30 + 0.7 + 0.15}
      position.y={1.275}
      geometry={new BoxGeometry(60, 2.55, 0.15)}
      material={new MeshStandardMaterial({
        transparent: true,
        opacity: 0.5,
        color: 0x333333
      })}
    />
    <T.Mesh
      receiveShadow
      castShadow
      position.x={-30 - 0.7 - 0.15}
      position.y={1.275}
      geometry={new BoxGeometry(60, 2.55, 0.15)}
      material={new MeshStandardMaterial({
        transparent: true,
        opacity: 0.5,
        color: 0x333333
      })}
    />
  </AutoColliders>
</CollisionGroups>
