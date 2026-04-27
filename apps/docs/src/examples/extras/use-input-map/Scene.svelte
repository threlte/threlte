<script lang="ts">
  import { MathUtils } from 'three'
  import { T, useTask } from '@threlte/core'
  import { useInputMap, useGamepad, useKeyboard, Grid, HTML } from '@threlte/extras'
  import Character from './Character.svelte'

  let {
    sprintKey = 'Shift',
    activeDevice = $bindable('keyboard')
  }: { sprintKey?: string; activeDevice?: string } = $props()

  const keyboard = useKeyboard()
  const gamepad = useGamepad()

  const input = useInputMap(
    ({ key, gamepadAxis, gamepadButton }) => ({
      moveLeft: [
        key('a'),
        key('ArrowLeft'),
        gamepadButton('directionalLeft'),
        gamepadAxis('leftStick', 'x', -1)
      ],
      moveRight: [
        key('d'),
        key('ArrowRight'),
        gamepadButton('directionalRight'),
        gamepadAxis('leftStick', 'x', 1)
      ],
      moveForward: [
        key('w'),
        key('ArrowUp'),
        gamepadButton('directionalTop'),
        gamepadAxis('leftStick', 'y', -1)
      ],
      moveBack: [
        key('s'),
        key('ArrowDown'),
        gamepadButton('directionalBottom'),
        gamepadAxis('leftStick', 'y', 1)
      ],
      sprint: [key(sprintKey), gamepadButton('leftBumper')]
    }),
    { keyboard, gamepad }
  )

  // Prevent arrow keys from scrolling the page
  keyboard.on('keydown', (e) => {
    if (e.key.startsWith('Arrow')) e.preventDefault()
  })

  $effect(() => {
    activeDevice = input.activeDevice.current
  })

  const sprinting = $derived(input.action('sprint').pressed)
  const moveX = $derived(input.axis('moveLeft', 'moveRight'))
  const moveY = $derived(input.axis('moveForward', 'moveBack'))
  const moving = $derived(moveX !== 0 || moveY !== 0)
  const action = $derived<'idle' | 'run' | 'walk'>(moving ? (sprinting ? 'run' : 'walk') : 'idle')

  let x = $state(0)
  let z = $state(0)
  let rotation = $state(0)
  let targetRotation = 0

  const rotationSpeed = 10
  const sprintSpeed = 4
  const walkSpeed = 2

  useTask(
    (delta) => {
      const move = input.vector('moveLeft', 'moveRight', 'moveForward', 'moveBack')
      const speed = sprinting ? sprintSpeed : walkSpeed

      x += move.x * speed * delta
      z += move.y * speed * delta

      // Smoothly rotate character to face movement direction
      if (moving) {
        targetRotation = Math.atan2(move.x, move.y)
      }

      // Lerp rotation using shortest path around the circle
      let diff = targetRotation - rotation
      // Wrap to [-PI, PI] so we always take the shortest turn
      diff = MathUtils.euclideanModulo(diff + Math.PI, Math.PI * 2) - Math.PI
      rotation += diff * Math.min(1, rotationSpeed * delta)
    },
    { after: input.task }
  )
</script>

<T.PerspectiveCamera
  position={[0, 4, 5]}
  oncreate={(ref) => ref.lookAt(0, 1, 0)}
  makeDefault
  fov={50}
/>

<T.DirectionalLight
  position={[5, 10, 5]}
  intensity={1.5}
  castShadow
/>
<T.AmbientLight intensity={0.4} />

<Grid
  cellColor="#444444"
  sectionColor="#ff3e00"
  sectionSize={5}
  cellSize={1}
  gridSize={[20, 20]}
  fadeDistance={10}
  fadeOrigin={[0, 0, 0]}
  infiniteGrid
/>

<T.Mesh
  rotation.x={-Math.PI / 2}
  position.y={-0.01}
  receiveShadow
>
  <T.CircleGeometry args={[15, 72]} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh>

<T.Group
  position.x={x}
  position.z={z}
  rotation.y={rotation}
>
  <Character {action} />
</T.Group>

<T.Group
  position.x={x}
  position.y={2.5}
  position.z={z}
>
  <HTML
    center
    transform={false}
  >
    <div class="overlay">
      {#if input.activeDevice.current === 'keyboard'}
        <p class="hint">WASD / Arrows to move, {sprintKey} to sprint</p>
      {:else}
        <p class="hint">Left Stick to move, LB to sprint</p>
      {/if}

      <div class="info">
        <span class="label">vector</span>
        <span class="value">({moveX.toFixed(2)}, {moveY.toFixed(2)})</span>
      </div>

      <div
        class="badge"
        class:sprint={sprinting}
        class:walk={moving && !sprinting}
      >
        {action}
      </div>
    </div>
  </HTML>
</T.Group>

<style>
  .overlay {
    font-family: 'Inter', system-ui, sans-serif;
    color: white;
    text-align: center;
    user-select: none;
    pointer-events: none;
    width: 260px;
  }

  .hint {
    font-size: 12px;
    opacity: 0.6;
    margin: 0 0 8px;
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 13px;
  }

  .label {
    opacity: 0.5;
    font-weight: 600;
  }

  .value {
    font-family: 'JetBrains Mono', monospace;
  }

  .badge {
    display: inline-block;
    margin-top: 6px;
    font-size: 11px;
    padding: 2px 10px;
    border-radius: 4px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.15);
  }

  .sprint {
    background: rgba(255, 62, 0, 0.8);
  }

  .walk {
    background: rgba(74, 144, 217, 0.8);
  }
</style>
