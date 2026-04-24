<script lang="ts">
  import { T } from '@threlte/core'
  import { Spring } from 'svelte/motion'
  import { touchControls, useXR, Controller, Hand } from '@threlte/xr'
  import TouchDebug from './TouchDebug.svelte'

  const { isPresenting } = useXR()

  touchControls('left')
  touchControls('right')

  let debug = $state(false)

  type Button = {
    id: string
    position: [number, number, number]
    color: string
    onPress: () => void
  }

  const buttons: Button[] = [
    { id: 'red', position: [-0.18, 1.3, -0.25], color: '#e11d48', onPress: () => {} },
    { id: 'green', position: [-0.06, 1.3, -0.25], color: '#16a34a', onPress: () => {} },
    { id: 'blue', position: [0.06, 1.3, -0.25], color: '#2563eb', onPress: () => {} },
    {
      id: 'debug',
      position: [0.18, 1.3, -0.25],
      color: '#6b7280',
      onPress: () => {
        debug = !debug
      }
    }
  ]

  const pressSprings: Record<string, Spring<number>> = {}
  for (const { id } of buttons) {
    pressSprings[id] = new Spring(0)
  }

  const hovering = $state<Record<string, { left: boolean; right: boolean }>>(
    Object.fromEntries(buttons.map((b) => [b.id, { left: false, right: false }]))
  )
  const pressed = $state<Record<string, { left: boolean; right: boolean }>>(
    Object.fromEntries(buttons.map((b) => [b.id, { left: false, right: false }]))
  )

  const isHovered = (id: string) => hovering[id].left || hovering[id].right
  const isPressed = (id: string) => pressed[id].left || pressed[id].right

  const pressDepth = 0.03
</script>

<Controller left />
<Controller right />
<Hand left />
<Hand right />

{#each buttons as button (button.id)}
  <T.Mesh
    position.x={button.position[0]}
    position.y={button.position[1]}
    position.z={button.position[2] - pressSprings[button.id].current * pressDepth}
    onpointerenter={(e) => {
      hovering[button.id][e.handedness] = true
    }}
    onpointerleave={(e) => {
      hovering[button.id][e.handedness] = false
    }}
    onpointerdown={(e) => {
      pressed[button.id][e.handedness] = true
      pressSprings[button.id].set(1)
    }}
    onpointerup={(e) => {
      pressed[button.id][e.handedness] = false
      if (!isPressed(button.id)) pressSprings[button.id].set(0)
    }}
    onclick={button.onPress}
  >
    <T.BoxGeometry args={[0.08, 0.08, 0.04]} />
    <T.MeshStandardMaterial
      color={button.color}
      emissive={button.color}
      emissiveIntensity={isHovered(button.id) ? 0.4 : 0.1}
    />
  </T.Mesh>
{/each}

<T.Mesh
  position.y={1.3}
  position.z={-0.3}
  scale={$isPresenting ? 1 : 0.001}
>
  <T.PlaneGeometry args={[0.6, 0.2]} />
  <T.MeshStandardMaterial
    color="#1f2937"
    transparent
    opacity={0.6}
  />
</T.Mesh>

{#if debug}
  <TouchDebug />
{/if}
