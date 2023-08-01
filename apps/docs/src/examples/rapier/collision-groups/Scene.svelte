<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Environment } from '@threlte/extras'
  import { AutoColliders, CollisionGroups, RigidBody } from '@threlte/rapier'
  import { BoxGeometry, MeshStandardMaterial } from 'three'
  import Ground from './Ground.svelte'

  const geometry = new BoxGeometry(1, 1, 1)

  let resetCounter = 0
  export const reset = () => {
    resetCounter += 1
  }
</script>

<Environment
  path="/hdr/"
  files="shanghai_riverside_1k.hdr"
/>

<T.PerspectiveCamera
  makeDefault
  position.x={12}
  position.y={13}
  fov={40}
>
  <OrbitControls target.x={2.5} />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[8, 20, -3]}
/>

{#key resetCounter}
  <!-- Collider A -->
  <CollisionGroups
    memberships={[1]}
    filter={[2]}
  >
    <T.Group position={[0, 1.5, 1 - Math.random() * 2]}>
      <RigidBody>
        <AutoColliders shape={'cuboid'}>
          <T.Mesh
            castShadow
            {geometry}
            material={new MeshStandardMaterial({
              color: 'red'
            })}
          />
        </AutoColliders>
      </RigidBody>
    </T.Group>
  </CollisionGroups>

  <!-- Collider B -->
  <CollisionGroups
    memberships={[2]}
    filter={[1, 3]}
  >
    <T.Group position={[0, 4.5, 1 - Math.random() * 2]}>
      <RigidBody>
        <AutoColliders shape={'cuboid'}>
          <T.Mesh
            castShadow
            {geometry}
            material={new MeshStandardMaterial({
              color: 'green'
            })}
          />
        </AutoColliders>
      </RigidBody>
    </T.Group>
  </CollisionGroups>

  <!-- Collider C -->
  <CollisionGroups
    memberships={[3]}
    filter={[2]}
  >
    <T.Group position={[0, 3, 1 - Math.random() * 2]}>
      <RigidBody>
        <AutoColliders shape={'cuboid'}>
          <T.Mesh
            castShadow
            {geometry}
            material={new MeshStandardMaterial({
              color: 'blue'
            })}
          />
        </AutoColliders>
      </RigidBody>
    </T.Group>
  </CollisionGroups>
{/key}

<T.GridHelper args={[50]} />

<CollisionGroups groups={[1, 2, 3]}>
  <Ground />
</CollisionGroups>
