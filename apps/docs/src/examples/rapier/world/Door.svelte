<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import { AutoColliders, Collider, CollisionGroups, RigidBody } from '@threlte/rapier'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { blur } from 'svelte/transition'
  import { BoxGeometry, Euler, type Group, MeshStandardMaterial, Quaternion } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'

  let open = false
  let objectsInSensor = 0
  $: open = objectsInSensor > 0

  let group: Group
  let doorRigidBody: RapierRigidBody

  let doorRotationClosed = 0
  let doorRotationOpen = -105 * DEG2RAD
  let doorRotation = tweened(doorRotationClosed)
  $: doorRotation.set(open ? doorRotationOpen : doorRotationClosed, {
    easing: open ? cubicOut : cubicIn
  })

  const q = new Quaternion()
  const e = new Euler()

  const applyDoorRotation = (rotation: number) => {
    if (!group || !doorRigidBody) return
    group.getWorldQuaternion(q)
    e.setFromQuaternion(q)
    e.y += rotation
    q.setFromEuler(e)
    doorRigidBody.setNextKinematicRotation(q)
  }

  $: if (group && doorRigidBody) applyDoorRotation($doorRotation)
</script>

<T.Group bind:ref={group}>
  <!-- FRAME -->
  <AutoColliders shape={'cuboid'}>
    <!-- SIDE FRAME A -->
    <T.Mesh
      receiveShadow
      castShadow
      position={[0.7, 1.125, 0]}
      geometry={new BoxGeometry(0.3, 2.25, 0.3)}
      material={new MeshStandardMaterial()}
    />

    <!-- SIDE FRAME B -->
    <T.Mesh
      receiveShadow
      castShadow
      position={[-0.7, 1.125, 0]}
      geometry={new BoxGeometry(0.3, 2.25, 0.3)}
      material={new MeshStandardMaterial()}
    />

    <!-- TOP FRAME -->
    <T.Mesh
      receiveShadow
      castShadow
      position.y={2.4}
      geometry={new BoxGeometry(1.4 + 0.3, 0.3, 0.3)}
      material={new MeshStandardMaterial()}
    />
  </AutoColliders>

  <HTML
    transform
    position.y={3}
    pointerEvents={'none'}
  >
    {#key open}
      <small
        in:blur={{
          amount: 15,
          duration: 300
        }}
        out:blur={{
          amount: 15,
          duration: 300
        }}
        class="door"
        class:closed={!open}
        class:open
      >
        {open ? 'UNLOCKED' : 'LOCKED'}
      </small>
    {/key}
  </HTML>

  <!-- DOOR -->
  <T.Group position={[-0.5, 1.125, 0]}>
    <RigidBody
      bind:rigidBody={doorRigidBody}
      type={'kinematicPosition'}
    >
      <AutoColliders shape={'cuboid'}>
        <T.Mesh
          receiveShadow
          castShadow
          position.x={0.5}
          geometry={new BoxGeometry(1, 2.25, 0.1)}
          material={new MeshStandardMaterial()}
        />
      </AutoColliders>
    </RigidBody>
  </T.Group>

  <CollisionGroups groups={[15]}>
    <T.Group position={[0, 1.5, 0]}>
      <Collider
        shape={'cuboid'}
        args={[1, 1.35, 1.5]}
        sensor
        on:sensorenter={() => (objectsInSensor += 1)}
        on:sensorexit={() => (objectsInSensor -= 1)}
      />
    </T.Group>
  </CollisionGroups>
</T.Group>

<style>
  .door {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    color: rgb(255, 255, 255);
    border-radius: 0.375rem;
    position: absolute;
    transform: translateX(-50%) translateY(-50%);
  }

  .closed {
    background-color: rgb(239, 68, 68);
  }

  .open {
    background-color: rgb(34, 197, 94);
  }
</style>
