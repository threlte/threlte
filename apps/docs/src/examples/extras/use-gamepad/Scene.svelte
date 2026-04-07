<script lang="ts">
  import { T } from '@threlte/core'
  import { Edges, HTML, Text, useGamepad, useTexture } from '@threlte/extras'
  import { fly } from 'svelte/transition'
  import { Spring } from 'svelte/motion'
  import { Color } from 'three'

  let { gamepadRef = $bindable() }: { gamepadRef?: any } = $props()

  const logo = useTexture('/icons/mstile-150x150.png')

  const gamepad = useGamepad()
  gamepadRef = gamepad
  const { connected } = gamepad

  // Buttons and sticks via the new API
  const dUp = gamepad.button('directionalTop')
  const dDown = gamepad.button('directionalBottom')
  const dLeft = gamepad.button('directionalLeft')
  const dRight = gamepad.button('directionalRight')
  const btnA = gamepad.button('clusterBottom')
  const btnB = gamepad.button('clusterRight')
  const btnX = gamepad.button('clusterLeft')
  const btnY = gamepad.button('clusterTop')
  const lt = gamepad.button('leftTrigger')
  const rt = gamepad.button('rightTrigger')
  const sel = gamepad.button('select')
  const btnStart = gamepad.button('start')

  const bodyColor = '#eedbcb'
  const buttonColor = '#111111'
  const activeColor = '#ff3e00'
  const triggerColor = '#555555'
  const activeTextColor = 'white'

  const dep = -0.06
  const springOpts = { stiffness: 0.3, damping: 0.6 }

  // D-pad springs
  const dUpZ = Spring.of(() => (dUp.pressed ? dep : 0), springOpts)
  const dDownZ = Spring.of(() => (dDown.pressed ? dep : 0), springOpts)
  const dLeftZ = Spring.of(() => (dLeft.pressed ? dep : 0), springOpts)
  const dRightZ = Spring.of(() => (dRight.pressed ? dep : 0), springOpts)

  // Action button springs
  const aZ = Spring.of(() => (btnA.pressed ? dep : 0), springOpts)
  const bZ = Spring.of(() => (btnB.pressed ? dep : 0), springOpts)
  const xZ = Spring.of(() => (btnX.pressed ? dep : 0), springOpts)
  const yZ = Spring.of(() => (btnY.pressed ? dep : 0), springOpts)

  // Center button springs
  const selZ = Spring.of(() => (sel.pressed ? dep : 0), springOpts)
  const startZ = Spring.of(() => (btnStart.pressed ? dep : 0), springOpts)

  const trackedButtons = [
    { state: btnA, label: 'A' },
    { state: btnB, label: 'B' },
    { state: btnX, label: 'X' },
    { state: btnY, label: 'Y' },
    { state: lt, label: 'LT' },
    { state: rt, label: 'RT' },
    { state: dUp, label: 'Up' },
    { state: dDown, label: 'Down' },
    { state: dLeft, label: 'Left' },
    { state: dRight, label: 'Right' },
    { state: sel, label: 'Select' },
    { state: btnStart, label: 'Start' }
  ] as const

  // Layout
  const dpadX = -2
  const clusterX = 2
  const padY = 0
  const s = 0.6
  const bh = 0.25
  const bodyDepth = 0.8
  const front = bodyDepth / 2 + bh / 2
  const top = 1.5
  const textZ = bh / 2 + 0.01

  const color1 = new Color()
  const color2 = new Color()
</script>

<T.OrthographicCamera
  zoom={70}
  position={[7, 5, 8]}
  makeDefault
  oncreate={(ref) => ref.lookAt(2, 0, 0)}
/>

<T.AmbientLight intensity={0.6} />
<T.DirectionalLight
  position={[3, 5, 5]}
  intensity={0.8}
/>

<!-- Controller body -->
<T.Mesh>
  <T.BoxGeometry args={[7, 3, bodyDepth]} />
  <T.MeshStandardMaterial color={bodyColor} />
  <Edges
    color="black"
    scale={1.001}
  />
</T.Mesh>

<!-- Threlte logo -->
{#await logo then map}
  <T.Mesh position={[0, 0.2, front + 0.01]}>
    <T.PlaneGeometry args={[1.5, 1.5]} />
    <T.MeshStandardMaterial
      {map}
      transparent
    />
  </T.Mesh>
{/await}

<!-- Triggers -->
<T.Mesh position={[-2.25, top + 0.1 - lt.value * 0.1, 0]}>
  <T.BoxGeometry args={[1.8, 0.2, 0.5]} />
  <T.MeshStandardMaterial
    color={color1.set(triggerColor).lerp(color2.set(activeColor), lt.value).getHex()}
  />
  <Edges color="black" />
  <Text
    text="LT"
    fontSize={0.18}
    color={lt.pressed ? activeTextColor : bodyColor}
    anchorX="center"
    anchorY="middle"
    position={[0, 0.11, 0]}
    rotation={[-Math.PI / 2, 0, 0]}
  />
</T.Mesh>

<T.Mesh position={[2.25, top + 0.1 - rt.value * 0.1, 0]}>
  <T.BoxGeometry args={[1.8, 0.2, 0.5]} />
  <T.MeshStandardMaterial
    color={color1.set(triggerColor).lerp(color2.set(activeColor), rt.value).getHex()}
  />
  <Edges color="black" />
  <Text
    text="RT"
    fontSize={0.18}
    color={rt.pressed ? activeTextColor : bodyColor}
    anchorX="center"
    anchorY="middle"
    position={[0, 0.11, 0]}
    rotation={[-Math.PI / 2, 0, 0]}
  />
</T.Mesh>

<!-- D-pad -->
<T.Mesh position={[dpadX, padY + 0.6, front + dUpZ.current]}>
  <T.BoxGeometry args={[s, s, bh]} />
  <T.MeshStandardMaterial color={dUp.touched ? activeColor : buttonColor} />
  <Edges color="black" />
  <Text
    text={'\u25B2'}
    fontSize={0.25}
    color={dUp.pressed ? activeTextColor : bodyColor}
    anchorX="center"
    anchorY="middle"
    position={[0, 0, textZ]}
  />
</T.Mesh>

<T.Mesh position={[dpadX, padY - 0.6, front + dDownZ.current]}>
  <T.BoxGeometry args={[s, s, bh]} />
  <T.MeshStandardMaterial color={dDown.pressed ? activeColor : buttonColor} />
  <Edges color="black" />
  <Text
    text={'\u25BC'}
    fontSize={0.25}
    color={dDown.pressed ? activeTextColor : bodyColor}
    anchorX="center"
    anchorY="middle"
    position={[0, 0, textZ]}
  />
</T.Mesh>

<T.Mesh position={[dpadX - 0.6, padY, front + dLeftZ.current]}>
  <T.BoxGeometry args={[s, s, bh]} />
  <T.MeshStandardMaterial color={dLeft.pressed ? activeColor : buttonColor} />
  <Edges color="black" />
  <Text
    text={'\u25C0'}
    fontSize={0.25}
    color={dLeft.pressed ? activeTextColor : bodyColor}
    anchorX="center"
    anchorY="middle"
    position={[0, 0, textZ]}
  />
</T.Mesh>

<T.Mesh position={[dpadX + 0.6, padY, front + dRightZ.current]}>
  <T.BoxGeometry args={[s, s, bh]} />
  <T.MeshStandardMaterial color={dRight.pressed ? activeColor : buttonColor} />
  <Edges color="black" />
  <Text
    text={'\u25B6'}
    fontSize={0.25}
    color={dRight.pressed ? activeTextColor : bodyColor}
    anchorX="center"
    anchorY="middle"
    position={[0, 0, textZ]}
  />
</T.Mesh>

<!-- D-pad center -->
<T.Mesh position={[dpadX, padY, front]}>
  <T.BoxGeometry args={[s, s, bh]} />
  <T.MeshStandardMaterial color={buttonColor} />
</T.Mesh>

<!-- Action buttons -->
<T.Mesh position={[clusterX, padY - 0.6, front + aZ.current]}>
  <T.BoxGeometry args={[s, s, bh]} />
  <T.MeshStandardMaterial color={btnA.pressed ? activeColor : buttonColor} />
  <Edges color="black" />
  <Text
    text="A"
    fontSize={0.3}
    color={btnA.pressed ? activeTextColor : bodyColor}
    anchorX="center"
    anchorY="middle"
    position={[0, 0, textZ]}
  />
</T.Mesh>

<T.Mesh position={[clusterX + 0.65, padY, front + bZ.current]}>
  <T.BoxGeometry args={[s, s, bh]} />
  <T.MeshStandardMaterial color={btnB.pressed ? activeColor : buttonColor} />
  <Edges color="black" />
  <Text
    text="B"
    fontSize={0.3}
    color={btnB.pressed ? activeTextColor : bodyColor}
    anchorX="center"
    anchorY="middle"
    position={[0, 0, textZ]}
  />
</T.Mesh>

<T.Mesh position={[clusterX - 0.65, padY, front + xZ.current]}>
  <T.BoxGeometry args={[s, s, bh]} />
  <T.MeshStandardMaterial color={btnX.pressed ? activeColor : buttonColor} />
  <Edges color="black" />
  <Text
    text="X"
    fontSize={0.3}
    color={btnX.pressed ? activeTextColor : bodyColor}
    anchorX="center"
    anchorY="middle"
    position={[0, 0, textZ]}
  />
</T.Mesh>

<T.Mesh position={[clusterX, padY + 0.6, front + yZ.current]}>
  <T.BoxGeometry args={[s, s, bh]} />
  <T.MeshStandardMaterial color={btnY.pressed ? activeColor : buttonColor} />
  <Edges color="black" />
  <Text
    text="Y"
    fontSize={0.3}
    color={btnY.pressed ? activeTextColor : bodyColor}
    anchorX="center"
    anchorY="middle"
    position={[0, 0, textZ]}
  />
</T.Mesh>

<!-- Center buttons -->
<T.Mesh position={[-0.45, -0.8, front + selZ.current]}>
  <T.BoxGeometry args={[0.7, 0.3, 0.15]} />
  <T.MeshStandardMaterial color={sel.pressed ? activeColor : '#888888'} />
  <Edges color="black" />
  <Text
    text="SEL"
    fontSize={0.15}
    color="#111111"
    anchorX="center"
    anchorY="middle"
    position={[0, 0, 0.08]}
  />
</T.Mesh>

<T.Mesh position={[0.45, -0.8, front + startZ.current]}>
  <T.BoxGeometry args={[0.7, 0.3, 0.15]} />
  <T.MeshStandardMaterial color={btnStart.pressed ? activeColor : '#888888'} />
  <Edges color="black" />
  <Text
    text="START"
    fontSize={0.15}
    color="#111111"
    anchorX="center"
    anchorY="middle"
    position={[0, 0, 0.08]}
  />
</T.Mesh>

<Text
  text={$connected ? 'Gamepad connected' : 'Connect a gamepad'}
  fontSize={0.25}
  color={$connected ? '#4a9' : '#888888'}
  anchorX="center"
  anchorY="middle"
  position={[0, -2.25, 0]}
/>

<T.Group position={[0, -3.5, 0]}>
  <HTML
    center
    transform={false}
  >
    <div class="states">
      {#each trackedButtons as button}
        {#if button.state.justPressed}
          <span
            class="badge just-pressed"
            out:fly={{ y: 20, duration: 400 }}>{button.label} justPressed</span
          >
        {/if}
        {#if button.state.justReleased}
          <span
            class="badge just-released"
            out:fly={{ y: 20, duration: 400 }}>{button.label} justReleased</span
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
