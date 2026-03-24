<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { useInteractivity, OrbitControls } from '@threlte/extras'
  import { cubicInOut } from 'svelte/easing'
  import { Spring, Tween } from 'svelte/motion'
  import { Color, Object3D, PerspectiveCamera, Scene } from 'three'
  import { game } from '../game/Game.svelte'
  import Lights from './Lights.svelte'
  import Machine from './Machine.svelte'
  import { Button, StickPosition } from './types'

  const { scene } = useThrelte()

  let leftPressed = $state(false)
  let rightPressed = $state(false)
  let spacePressed = $state(false)

  let joystick = $derived.by(() => {
    if (leftPressed && !rightPressed) {
      return StickPosition.Left
    } else if (!leftPressed && rightPressed) {
      return StickPosition.Right
    } else {
      return StickPosition.Idle
    }
  })
  let button = $derived.by(() => {
    if (spacePressed) {
      return Button.Pressed
    } else {
      return Button.Idle
    }
  })

  const machineIsOff = $derived(game.state == 'off' ? true : false)

  const cameraTweenZ = new Tween(2.1, {
    duration: 3e3,
    easing: cubicInOut
  })

  const { pointer } = useInteractivity()

  let screenFocused = $state(false)

  const screenPos = {
    x: 0,
    y: 1.3774,
    z: 0.1447
  }

  const cameraTargetPos = new Spring(
    {
      x: $pointer.x * 0.1,
      y: 1.23,
      z: 0
    },
    {
      precision: 0.000001
    }
  )

  const cameraPos = new Spring(
    {
      x: $pointer.x * 0.1, //(machineIsOff ? 2 : 0.1),
      y: 1.48,
      z: cameraTweenZ.current
    },
    {
      stiffness: 0.05,
      damping: 0.9,
      precision: 0.00001
    }
  )

  let cameraTarget = $state.raw<Object3D>()
  let camera = $state.raw<PerspectiveCamera>()

  const backgroundColor = new Tween(new Color('#020203'), {
    duration: 2.5e3
  })

  useTask(() => {
    if (!camera || !cameraTarget) return
    camera.lookAt(cameraTarget.position)
  })

  const onScreenClick = () => {
    screenFocused = !screenFocused
  }

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      leftPressed = false
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      rightPressed = false
    } else if (e.key === ' ') {
      spacePressed = false
    }
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== ' ') return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      leftPressed = true
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      rightPressed = true
    } else if (e.key === ' ') {
      spacePressed = true
    }
  }

  $effect(() => {
    cameraTargetPos.set(
      screenFocused
        ? {
            ...screenPos,
            z: -screenPos.z
          }
        : {
            x: $pointer.x * 0.1,
            y: 1.23,
            z: 0
          }
    )
  })

  $effect(() => {
    cameraPos.set(
      screenFocused
        ? {
            x: screenPos.x,
            y: screenPos.y + 0.15,
            z: screenPos.z + 0.5
          }
        : {
            x: $pointer.x * (machineIsOff ? 0.1 : 0.1),
            y: 1.48,
            z: cameraTweenZ.current
          }
    )
  })

  $effect(() => {
    cameraTweenZ.set(machineIsOff ? 2.1 : 1.4)
    backgroundColor.set(machineIsOff ? new Color('#020203') : new Color('#020203'))
  })

  $effect(() => {
    scene.background = new Color(backgroundColor.current)
  })
</script>

<svelte:window
  on:keydown={onKeyDown}
  on:keyup={onKeyUp}
/>

<T.Scene
  oncreate={(ref: Scene) => {
    game.arcadeMachineScene = ref
  }}
  background={new Color(0x020203)}
>
  <!-- The camera target -->
  <T.Object3D
    bind:ref={cameraTarget}
    position.x={cameraTargetPos.current.x}
    position.y={cameraTargetPos.current.y}
    position.z={cameraTargetPos.current.z}
  />

  {#if game.orbitControls}
    <T.PerspectiveCamera
      position.x={20}
      position.y={20}
      position.z={20}
      fov={60}
      makeDefault
    >
      <OrbitControls />
    </T.PerspectiveCamera>
  {:else}
    <T.PerspectiveCamera
      bind:ref={camera}
      position.x={cameraPos.current.x}
      position.y={cameraPos.current.y}
      position.z={cameraPos.current.z}
      fov={30}
      makeDefault
    />
  {/if}

  <Machine
    screenClicked={onScreenClick}
    screenTexture={game.gameTexture}
    {joystick}
    {button}
  />

  <Lights
    lightColor={game.averageScreenColor}
    {machineIsOff}
  />

  <!-- Floor -->
  <T.Mesh>
    <T.CylinderGeometry args={[1, 1, 0.04, 64]} />
    <T.MeshStandardMaterial color={'#0f0f0f'} />
  </T.Mesh>
</T.Scene>
