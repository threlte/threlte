<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { Environment } from '@threlte/extras'
  import { AutoColliders, CollisionGroups, Debug } from '@threlte/rapier'
  import { spring } from 'svelte/motion'
  import { BoxGeometry, Group, Mesh, MeshStandardMaterial, Vector3 } from 'three'
  import Door from './Door.svelte'
  import Ground from './Ground.svelte'
  import Player from './Player.svelte'

  let playerMesh: Mesh
  let positionHasBeenSet = false
  const smoothPlayerPosX = spring(0)
  const smoothPlayerPosZ = spring(0)
  const t3 = new Vector3()

  useTask(() => {
    if (!playerMesh) return
    playerMesh.getWorldPosition(t3)
    smoothPlayerPosX.set(t3.x, {
      hard: !positionHasBeenSet
    })
    smoothPlayerPosZ.set(t3.z, {
      hard: !positionHasBeenSet
    })
    if (!positionHasBeenSet) positionHasBeenSet = true
  })

  const { size } = useThrelte()
  $: zoom = $size.width / 8

  let target: Group
</script>

<Environment
  path="/hdr/"
  files="shanghai_riverside_1k.hdr"
/>

<T.Group
  position.x={$smoothPlayerPosX}
  position.z={$smoothPlayerPosZ}
>
  <T.Group
    position.y={0.9}
    bind:ref={target}
  >
    <T.OrthographicCamera
      makeDefault
      {zoom}
      position={[50, 50, 30]}
      oncreate={({ ref }) => {
        ref.lookAt(target.getWorldPosition(new Vector3()))
      }}
    />
  </T.Group>
</T.Group>

<T.DirectionalLight
  castShadow
  position={[8, 20, -3]}
/>

<T.GridHelper
  args={[50]}
  position.y={0.01}
/>

<Debug
  depthTest={false}
  depthWrite={false}
/>

<!--
	The ground needs to be on both group 15 which is the group
	to detect the groundedness of the player as well as on group
	0 which is the group that the player is actually physically
	interacting with.
 -->
<CollisionGroups groups={[0, 15]}>
  <Ground />
</CollisionGroups>

<!--
	All physically interactive stuff should be on group 0
-->
<CollisionGroups groups={[0]}>
  <Player
    bind:playerMesh
    position={[0, 2, -3]}
  />

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
