<script lang="ts">
  import { T } from '@threlte/core'
  import { AutoColliders } from '@threlte/rapier'
  import Goal from './Goal.svelte'
  import Rocket from './Rocket.svelte'
  import Start from './Start.svelte'
  import type { LevelData } from './levels/LevelData'
  import FollowCamera from './FollowCamera.svelte'

  let { level, levelcomplete }: { level: LevelData; levelcomplete: () => void } = $props()

  let goalReached = $state(false)
  let rocketSleeping = $state(false)

  $effect(() => {
    if (goalReached && rocketSleeping) {
      levelcomplete()
    }
  })
</script>

<Start
  position={level.start.position}
  rotation={level.start.rotation}
>
  <Rocket
    checkIsStatic={goalReached}
    onsleep={() => (rocketSleeping = true)}
  >
    {#snippet children()}
      <FollowCamera />
    {/snippet}
  </Rocket>
</Start>

<Goal
  position={level.goal.position}
  rotation={level.goal.rotation}
  ongoal={() => {
    goalReached = true
  }}
/>

{#each level.blocks as block}
  <T.Group
    position={block.position}
    rotation={block.rotation}
  >
    <AutoColliders>
      <T.Mesh>
        <T.BoxGeometry args={[1, 1, 1]} />
        <T.MeshStandardMaterial
          color="blue"
          transparent
          opacity={0.4}
        />
      </T.Mesh>
    </AutoColliders>
  </T.Group>
{/each}
