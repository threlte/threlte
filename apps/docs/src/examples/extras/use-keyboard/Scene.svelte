<script lang="ts">
  import { T } from '@threlte/core'
  import { Edges, HTML, Text, useKeyboard } from '@threlte/extras'
  import { fade } from 'svelte/transition'
  import { Spring } from 'svelte/motion'

  const keyboard = useKeyboard()

  const w = keyboard.key('w')
  const a = keyboard.key('a')
  const s = keyboard.key('s')
  const d = keyboard.key('d')
  const space = keyboard.key('Space')

  const trackedKeys = [
    { key: w, label: 'W' },
    { key: a, label: 'A' },
    { key: s, label: 'S' },
    { key: d, label: 'D' },
    { key: space, label: 'Space' }
  ] as const

  const activeColor = '#ff3e00'
  const inactiveColor = '#1a1a1a'
  const activeTextColor = 'white'
  const inactiveTextColor = '#aaaaaa'
  const edgeColor = 'rgba(255, 255, 255, 0.2)'
  const activeEdgeColor = '#ff3e00'

  const dep = -0.1
  const springOpts = { stiffness: 0.3, damping: 0.6 }

  const wZ = Spring.of(() => (w.pressed ? dep : 0), springOpts)
  const aZ = Spring.of(() => (a.pressed ? dep : 0), springOpts)
  const sZ = Spring.of(() => (s.pressed ? dep : 0), springOpts)
  const dZ = Spring.of(() => (d.pressed ? dep : 0), springOpts)
  const spaceZ = Spring.of(() => (space.pressed ? dep : 0), springOpts)
</script>

<T.OrthographicCamera
  zoom={90}
  position={[5, 5, 8]}
  makeDefault
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<T.AmbientLight intensity={0.6} />
<T.DirectionalLight
  position={[5, 5, 5]}
  intensity={0.8}
/>

<!-- W key -->
<T.Group
  position.x={0}
  position.y={1.15}
  position.z={wZ.current}
>
  <T.Mesh scale.y={0.9}>
    <T.BoxGeometry args={[1, 1, 0.3]} />
    <T.MeshStandardMaterial color={w.pressed ? activeColor : inactiveColor} />
    <Edges color={w.pressed ? activeEdgeColor : edgeColor} />
  </T.Mesh>
  <Text
    text="W"
    fontSize={0.4}
    color={w.pressed ? activeTextColor : inactiveTextColor}
    anchorX="center"
    anchorY="middle"
    position.z={0.16}
  />
</T.Group>

<!-- A key -->
<T.Group
  position.x={-1.1}
  position.y={0}
  position.z={aZ.current}
>
  <T.Mesh scale.y={0.9}>
    <T.BoxGeometry args={[1, 1, 0.3]} />
    <T.MeshStandardMaterial color={a.pressed ? activeColor : inactiveColor} />
    <Edges color={a.pressed ? activeEdgeColor : edgeColor} />
  </T.Mesh>
  <Text
    text="A"
    fontSize={0.4}
    color={a.pressed ? activeTextColor : inactiveTextColor}
    anchorX="center"
    anchorY="middle"
    position.z={0.16}
  />
</T.Group>

<!-- S key -->
<T.Group
  position.x={0}
  position.y={0}
  position.z={sZ.current}
>
  <T.Mesh scale.y={0.9}>
    <T.BoxGeometry args={[1, 1, 0.3]} />
    <T.MeshStandardMaterial color={s.pressed ? activeColor : inactiveColor} />
    <Edges color={s.pressed ? activeEdgeColor : edgeColor} />
  </T.Mesh>
  <Text
    text="S"
    fontSize={0.4}
    color={s.pressed ? activeTextColor : inactiveTextColor}
    anchorX="center"
    anchorY="middle"
    position.z={0.16}
  />
</T.Group>

<!-- D key -->
<T.Group
  position.x={1.1}
  position.y={0}
  position.z={dZ.current}
>
  <T.Mesh scale.y={0.9}>
    <T.BoxGeometry args={[1, 1, 0.3]} />
    <T.MeshStandardMaterial color={d.pressed ? activeColor : inactiveColor} />
    <Edges color={d.pressed ? activeEdgeColor : edgeColor} />
  </T.Mesh>
  <Text
    text="D"
    fontSize={0.4}
    color={d.pressed ? activeTextColor : inactiveTextColor}
    anchorX="center"
    anchorY="middle"
    position.z={0.16}
  />
</T.Group>

<!-- Space key -->
<T.Group
  position.x={0}
  position.y={-1.15}
  position.z={spaceZ.current}
>
  <T.Mesh scale.y={0.9}>
    <T.BoxGeometry args={[3.2, 1, 0.3]} />
    <T.MeshStandardMaterial color={space.pressed ? activeColor : inactiveColor} />
    <Edges color={space.pressed ? activeEdgeColor : edgeColor} />
  </T.Mesh>
  <Text
    text="Space"
    fontSize={0.35}
    color={space.pressed ? activeTextColor : inactiveTextColor}
    anchorX="center"
    anchorY="middle"
    position.z={0.16}
  />
</T.Group>

<!-- Hint text -->
<Text
  text="Press WASD or Space"
  fontSize={0.25}
  color="#666666"
  anchorX="center"
  anchorY="middle"
  position={[0, 2.4, 0]}
/>

<!-- Badge area using HTML for transitions -->
<T.Group position={[0, -2.4, 0]}>
  <HTML
    center
    transform={false}
  >
    <div class="states">
      {#each trackedKeys as { key, label }}
        {#if key.justPressed}
          <span
            class="badge just-pressed"
            out:fade={{ duration: 400 }}>{label} justPressed</span
          >
        {:else if key.justReleased}
          <span
            class="badge just-released"
            out:fade={{ duration: 400 }}>{label} justReleased</span
          >
        {/if}
      {/each}
    </div>
  </HTML>
</T.Group>

<style>
  .states {
    min-height: 24px;
    display: grid;
    justify-items: center;
    font-family: 'Inter', system-ui, sans-serif;
    user-select: none;
    pointer-events: none;
  }

  .badge {
    grid-row: 1;
    grid-column: 1;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 600;
    color: white;
    white-space: nowrap;
  }

  .just-pressed {
    background: rgba(0, 200, 80, 0.7);
  }

  .just-released {
    background: rgba(200, 80, 0, 0.7);
  }
</style>
