<script lang="ts">
  import { Group, MathUtils, Vector3, type Mesh } from 'three'
  import { T, useTask } from '@threlte/core'
  import {
    CameraControls,
    CameraControlsRef,
    Grid,
    HTML,
    useFollow,
    useGamepad,
    useInputMap,
    useKeyboard
  } from '@threlte/extras'
  import Character from './Character.svelte'

  interface Props {
    smoothTime: number
    distance: number
    minPolarAngle: number
    maxPolarAngle: number
    polarAngle: number
    azimuthLocked: boolean
    azimuthAngle: number
    pointerLock: boolean
    lookAtOffsetX: number
    lookAtOffsetY: number
    lookAtOffsetZ: number
    deadZoneX: number
    deadZoneY: number
    lookAhead: number
    followSmoothTime: number
    trackRotation: boolean
    trackRotationSmoothTime: number
    trackRotationOffset: number
    collision: boolean
    following: boolean
  }

  const {
    smoothTime,
    distance,
    minPolarAngle,
    maxPolarAngle,
    polarAngle,
    azimuthLocked,
    azimuthAngle,
    pointerLock,
    lookAtOffsetX,
    lookAtOffsetY,
    lookAtOffsetZ,
    deadZoneX,
    deadZoneY,
    lookAhead,
    followSmoothTime,
    trackRotation,
    trackRotationSmoothTime,
    trackRotationOffset,
    collision,
    following
  }: Props = $props()

  const keyboard = useKeyboard()
  const gamepad = useGamepad()
  const input = useInputMap(
    ({ key, gamepadButton, gamepadAxis }) => ({
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
      sprint: [key('Shift'), gamepadButton('leftBumper')]
    }),
    { keyboard, gamepad }
  )
  keyboard.on('keydown', (e) => {
    if (e.key.startsWith('Arrow')) e.preventDefault()
  })

  const character = new Group()

  let controls = $state.raw<CameraControlsRef>()
  let pillarMeshes = $state<Mesh[]>([])
  let rotation = $state(0)

  const follow = useFollow(() => ({
    target: following ? character : undefined,
    controls,
    lookAtOffset: [lookAtOffsetX, lookAtOffsetY, lookAtOffsetZ],
    deadZone: { x: deadZoneX, y: deadZoneY },
    lookAhead,
    followSmoothTime,
    trackRotation,
    trackRotationSmoothTime,
    trackRotationOffset
  }))

  const colliderMeshes = $derived(collision ? pillarMeshes.filter(Boolean) : [])
  const azimuthMin = $derived(azimuthLocked ? 0 : -Infinity)
  const azimuthMax = $derived(azimuthLocked ? 0 : Infinity)

  $effect(() => {
    if (!controls) return
    controls.dollyTo(distance, true)
    controls.rotateTo(azimuthAngle, polarAngle, true)
  })

  const sprinting = $derived(input.action('sprint').pressed)
  const moveX = $derived(input.axis('moveLeft', 'moveRight'))
  const moveY = $derived(input.axis('moveForward', 'moveBack'))
  const translating = $derived(trackRotation ? moveY !== 0 : moveX !== 0 || moveY !== 0)
  const action = $derived<'idle' | 'run' | 'walk'>(
    translating ? (sprinting ? 'run' : 'walk') : 'idle'
  )

  const walkSpeed = 2
  const runSpeed = 4.5
  const rotationSpeed = 10
  const turnSpeed = 2.5
  const worldMove = new Vector3()
  let targetRotation = 0

  useTask(
    (delta) => {
      const speed = sprinting ? runSpeed : walkSpeed

      if (trackRotation) {
        rotation -= moveX * turnSpeed * delta
        follow.getTargetDirection(0, -moveY, worldMove)
        character.position.addScaledVector(worldMove, speed * delta)
      } else {
        follow.getInputDirection(moveX, -moveY, worldMove)
        character.position.addScaledVector(worldMove, speed * delta)

        if (translating) {
          targetRotation = Math.atan2(worldMove.x, worldMove.z)
        }

        let diff = targetRotation - rotation
        diff = MathUtils.euclideanModulo(diff + Math.PI, Math.PI * 2) - Math.PI
        rotation += diff * Math.min(1, rotationSpeed * delta)
      }
    },
    { after: input.task, before: follow.task }
  )

  const rightStick = gamepad.stick('rightStick')

  const orbitSpeed = 2.8 // radians/sec at full stick

  useTask(
    (delta) => {
      if (!controls || trackRotation) return

      const { x, y } = rightStick

      if (x === 0 && y === 0) return

      controls.rotate(-x * orbitSpeed * delta, -y * orbitSpeed * delta, true)
    },
    { after: [gamepad.task, follow.task] }
  )

  const pillars: [number, number][] = Array.from({ length: 8 }, (_, i) => {
    const angle = ((i + 0.5) * Math.PI * 2) / 8
    return [Math.cos(angle) * 5, Math.sin(angle) * 5]
  })
</script>

<T.PerspectiveCamera
  makeDefault
  fov={55}
  position={[0, 3, 6]}
/>

<CameraControls
  bind:ref={controls}
  {pointerLock}
  {smoothTime}
  {distance}
  {minPolarAngle}
  {maxPolarAngle}
  minAzimuthAngle={azimuthMin}
  maxAzimuthAngle={azimuthMax}
  {colliderMeshes}
  mouseButtons.wheel={CameraControlsRef.ACTION.NONE}
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
  gridSize={[30, 30]}
  fadeDistance={15}
  infiniteGrid
  fadeOrigin={[0, 0, 0]}
/>

<T.Mesh
  rotation.x={-Math.PI / 2}
  position.y={-0.01}
  receiveShadow
>
  <T.CircleGeometry args={[20, 72]} />
  <T.MeshStandardMaterial color="#eaeaea" />
</T.Mesh>

{#each pillars as [x, z], i (i)}
  <T.Mesh
    bind:ref={pillarMeshes[i]}
    position={[x, 1.5, z]}
    castShadow
    receiveShadow
  >
    <T.BoxGeometry args={[1, 3, 1]} />
    <T.MeshStandardMaterial color="#4a90d9" />
  </T.Mesh>
{/each}

<T
  is={character}
  rotation.y={rotation}
>
  <Character {action} />
  <T.Group position.y={2.4}>
    <HTML
      center
      transform={false}
    >
      <div class="overlay">
        <p class="hint">
          {trackRotation ? 'W/S move · A/D turn' : 'WASD to move'} · Shift to sprint{pointerLock
            ? ' · click to look'
            : ''}
        </p>
        <div class="stats">
          <span>distance</span>
          <span class="value">{follow.distance.toFixed(2)}</span>
        </div>
        <div
          class="badge"
          class:on={follow.following}
        >
          {follow.following ? action : 'paused'}
        </div>
      </div>
    </HTML>
  </T.Group>
</T>

<style>
  .overlay {
    font-family: 'Inter', system-ui, sans-serif;
    color: white;
    text-align: center;
    user-select: none;
    pointer-events: none;
    width: 260px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  }

  .hint {
    font-size: 12px;
    opacity: 0.8;
    margin: 0 0 4px;
  }

  .stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 12px;
    opacity: 0.8;
  }

  .value {
    font-family: 'JetBrains Mono', monospace;
  }

  .badge {
    display: inline-block;
    margin-top: 4px;
    font-size: 11px;
    padding: 2px 10px;
    border-radius: 4px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.15);
  }

  .on {
    background: rgba(74, 144, 217, 0.8);
  }
</style>
