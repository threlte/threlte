<script lang="ts">
  import { MathUtils, Vector3, type Group, type Mesh } from 'three'
  import { T, useTask } from '@threlte/core'
  import {
    CameraControls,
    CameraControlsRef,
    Grid,
    HTML,
    useFollow,
    useInputMap,
    useKeyboard
  } from '@threlte/extras'
  import Character from './Character.svelte'

  type Props = {
    smoothTime: number
    minDistance: number
    maxDistance: number
    distance: number
    minPolarAngle: number
    maxPolarAngle: number
    polarAngle: number
    azimuthLocked: boolean
    azimuthAngle: number
    pointerLock: boolean
    wheelZoom: boolean
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
    minDistance,
    maxDistance,
    distance,
    minPolarAngle,
    maxPolarAngle,
    polarAngle,
    azimuthLocked,
    azimuthAngle,
    pointerLock,
    wheelZoom,
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
  const input = useInputMap(
    ({ key }) => ({
      moveLeft: [key('a'), key('ArrowLeft')],
      moveRight: [key('d'), key('ArrowRight')],
      moveForward: [key('w'), key('ArrowUp')],
      moveBack: [key('s'), key('ArrowDown')],
      sprint: [key('Shift')]
    }),
    { keyboard }
  )
  keyboard.on('keydown', (e) => {
    if (e.key.startsWith('Arrow')) e.preventDefault()
  })

  let controls = $state<CameraControlsRef>()
  let character = $state<Group>()
  let pillarMeshes = $state<Mesh[]>([])
  let rotation = $state(0)

  const follow = useFollow(() => ({
    controls,
    lookAtOffset: [lookAtOffsetX, lookAtOffsetY, lookAtOffsetZ],
    deadZone: { x: deadZoneX, y: deadZoneY },
    lookAhead,
    followSmoothTime,
    trackRotation,
    trackRotationSmoothTime,
    trackRotationOffset
  }))

  $effect(() => {
    if (following && character) follow.start(character)
    else follow.stop()
  })

  const colliderMeshes = $derived(collision ? pillarMeshes.filter(Boolean) : [])
  const azimuthMin = $derived(azimuthLocked ? 0 : -Infinity)
  const azimuthMax = $derived(azimuthLocked ? 0 : Infinity)
  const distanceLocked = $derived(Math.abs(maxDistance - minDistance) < 0.001)

  $effect(() => {
    if (!controls) return
    controls.mouseButtons.wheel =
      wheelZoom && !distanceLocked
        ? CameraControlsRef.ACTION.DOLLY
        : CameraControlsRef.ACTION.NONE
  })

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
      if (!character) return
      const speed = sprinting ? runSpeed : walkSpeed

      if (trackRotation) {
        rotation += moveX * turnSpeed * delta
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
  {minDistance}
  {maxDistance}
  {minPolarAngle}
  {maxPolarAngle}
  minAzimuthAngle={azimuthMin}
  maxAzimuthAngle={azimuthMax}
  {colliderMeshes}
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
  fadeDistance={40}
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

<T.Group
  bind:ref={character}
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
</T.Group>

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
