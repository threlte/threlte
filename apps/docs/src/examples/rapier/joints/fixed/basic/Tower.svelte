<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T } from '@threlte/core'
  import { Collider, CollisionGroups, RigidBody } from '@threlte/rapier'
  import type { Vector3Tuple } from 'three'
  import FixedJoint from './FixedJoint.svelte'

  interface Props {
    position?: Vector3Tuple
    jointed?: boolean
    color?: string
  }

  let { position = [0, 0, 0], jointed = false, color = '#FE3D00' }: Props = $props()

  const COUNT = 5
  const bodies = $state<(RapierRigidBody | undefined)[]>(Array.from({ length: 5 }, () => undefined))
  const allReady = $derived(bodies.every(Boolean))
</script>

{#snippet bricks()}
  <T.Group {position}>
    {#each { length: 5 }, i (i)}
      <T.Group position={[0, 0.5 + i, 0]}>
        <RigidBody bind:rigidBody={bodies[i]}>
          <Collider
            shape="cuboid"
            args={[0.5, 0.5, 0.5]}
          />
          <T.Mesh
            castShadow
            receiveShadow
          >
            <T.BoxGeometry args={[1, 1, 1]} />
            <T.MeshStandardMaterial {color} />
          </T.Mesh>
        </RigidBody>
      </T.Group>
    {/each}
  </T.Group>
{/snippet}

{#if jointed}
  <CollisionGroups
    memberships={[2]}
    filter={[0, 1]}
  >
    {@render bricks()}
  </CollisionGroups>
{:else}
  {@render bricks()}
{/if}

{#if jointed && allReady}
  {#each Array(COUNT - 1) as _, i (i)}
    <FixedJoint
      bodyA={bodies[i]!}
      bodyB={bodies[i + 1]!}
      anchorA={[0.5 * (i % 2 === 1 ? -1 : 1), 0.5, 0]}
      anchorB={[0, -0.5, 0]}
    />
  {/each}
{/if}
