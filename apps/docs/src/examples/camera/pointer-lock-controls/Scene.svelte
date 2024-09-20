<script lang="ts">
  import { T } from '@threlte/core'
  import { Environment } from '@threlte/extras'
  import { AutoColliders, CollisionGroups } from '@threlte/rapier'
  import { BoxGeometry, MeshStandardMaterial } from 'three'
  import Door from '../../rapier/world/Door.svelte'
  import Player from './Player.svelte'
  import Ground from '../../rapier/world/Ground.svelte'
</script>

<Environment
  path="/hdr/"
  files="shanghai_riverside_1k.hdr"
/>

<T.DirectionalLight
  castShadow
  position={[8, 20, -3]}
/>

<T.GridHelper
  args={[50]}
  position.y={0.01}
/>

<CollisionGroups groups={[0, 15]}>
  <Ground />
</CollisionGroups>

<CollisionGroups groups={[0]}>
  <Player position={[0, 2, 3]} />

  <Door />

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
