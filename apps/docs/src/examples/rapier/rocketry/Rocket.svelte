<script lang="ts">
  import { T } from '@threlte/core'
  import { AutoColliders, RigidBody } from '@threlte/rapier'
  import type { Snippet } from 'svelte'
  import IsStatic from './IsStatic.svelte'
  import Player from './Player.svelte'
  import Thruster from './Thruster.svelte'

  let {
    onsleep,
    checkIsStatic,
    children: componentChildren
  }: { onsleep: () => void; checkIsStatic: boolean; children?: Snippet } = $props()

  let currentSide = $state<'left' | 'right'>('left')

  type PlayerState = {
    side: 'left' | 'right'
    key: string
    active: boolean
  }

  const getPlayer = (key: string) => players.find((p) => p.key === key)

  let players = $state<PlayerState[]>([])
</script>

<svelte:window
  onkeydown={(e) => {
    const pk = e.key
    // check if player is already registered
    if (getPlayer(pk)) return
    // check if key is from a-z
    if (!pk.match(/^[a-z]$/)) return
    // check if it has a modifier
    if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return
    const player = {
      side: currentSide,
      key: pk,
      active: false
    }
    players.push(player)
    currentSide = currentSide === 'left' ? 'right' : 'left'
  }}
  onkeyup={(e) => {
    const pk = e.key
    const player = getPlayer(pk)
    if (!player) return
    player.active = true
  }}
/>

<RigidBody
  canSleep={false}
  linearDamping={0.4}
  angularDamping={5}
  enabledRotations={[false, false, true]}
  type="dynamic"
>
  {#snippet children({ rigidBody })}
    {@render componentChildren?.()}

    {#if checkIsStatic}
      <IsStatic
        {rigidBody}
        linearMax={0.00001}
        angularMax={0.00001}
        onstatic={onsleep}
      />
    {/if}

    {#each players as player}
      <Player
        {rigidBody}
        key={player.key}
        min={player.side === 'left' ? -0.5 : 0.25}
        max={player.side === 'left' ? -0.25 : 0.5}
        active={player.active}
      >
        {#snippet children(active)}
          <Thruster {active} />
        {/snippet}
      </Player>
    {/each}

    <AutoColliders>
      <T.Mesh
        castShadow
        receiveShadow
      >
        <T.MeshStandardMaterial
          color="red"
          transparent
          opacity={0.4}
        />
        <T.BoxGeometry />
      </T.Mesh>
    </AutoColliders>
  {/snippet}
</RigidBody>
