<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import {
    Environment,
    useCursor,
    useGltf,
    useInteractivity,
    useTexture,
    OrbitControls
  } from '@threlte/extras'
  import { onMount } from 'svelte'
  import { cubicInOut } from 'svelte/easing'
  import { spring, tweened } from 'svelte/motion'
  import { derived } from 'svelte/store'
  import { Color, Object3D, PerspectiveCamera, PointLight } from 'three'
  import { MathUtils, Mesh, MeshStandardMaterial } from 'three'
  import { gameState } from './game/state'

  const gltf = useGltf<{
    nodes: {
      BodyMesh: Mesh
      LeftCover: Mesh
      RightCover: Mesh
      ScreenFrame: Mesh
      joystick_base: Mesh
      joystick_stick_application: Mesh
      joystick_stick: Mesh
      joystick_cap: Mesh
      Main_Button_Enclosure: Mesh
      Main_Button: Mesh
      Screen: Mesh
    }
    materials: {
      ['machine body main']: MeshStandardMaterial
      ['machine body outer']: MeshStandardMaterial
      ['screen frame']: MeshStandardMaterial
      ['joystick base']: MeshStandardMaterial
      ['joystick stick']: MeshStandardMaterial
      ['joystick cap']: MeshStandardMaterial
      Screen: MeshStandardMaterial
    }
  }>('/models/ball-game/archade-machine/arcade_machine_own.glb')

  $: nodes = $gltf?.nodes
  $: materials = $gltf?.materials

  $: if ($gltf) {
    Object.entries($gltf.materials).forEach(([name, material]) => {
      if (!$gltf) return
      const n = name as keyof typeof $gltf.materials
      if (n === 'joystick cap') material.envMapIntensity = 1
      else if (n === 'joystick stick') material.envMapIntensity = 1
      else material.envMapIntensity = 0.2
    })
  }

  let basePointLightIntensity = tweened(0)

  onMount(() => {
    setTimeout(() => {
      basePointLightIntensity.set(1, {
        duration: 200
      })
    }, 1000)
  })

  const { state, gameTexture, averageScreenColor, arcadeMachineScene, orbitControls } = gameState

  let pointlight: PointLight
  let pointLightIntensity = $basePointLightIntensity
  useTask(() => {
    if ($state === 'off') {
      pointLightIntensity = 1
    } else {
      pointLightIntensity = $basePointLightIntensity
    }
  })

  const scanLinesTexture = useTexture('/models/ball-game/archade-machine/textures/scanlines.png')

  let leftPressed = false
  let rightPressed = false
  let spacePressed = false

  const tipsOpacity = tweened(1, {
    duration: 200
  })

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
    tipsOpacity.set(0)
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

  const rotationStick = tweened(0, {
    duration: 100
  })
  $: if (leftPressed !== rightPressed) {
    if (leftPressed) {
      rotationStick.set(-15 * MathUtils.DEG2RAD)
    } else {
      rotationStick.set(15 * MathUtils.DEG2RAD)
    }
  }
  $: if (leftPressed === rightPressed) {
    rotationStick.set(0)
  }

  const machineIsOff = derived(state, (state: string, set: Function) => {
    if (state === 'off') {
      set(true)
    } else {
      set(false)
    }
  })

  const cameraTweenZ = tweened(2.1, {
    duration: 3e3,
    easing: cubicInOut
  })
  $: cameraTweenZ.set($machineIsOff ? 2.1 : 1.4)

  const { pointer } = useInteractivity()

  let screenFocused = false

  const screenPos = {
    x: 0,
    y: 1.3774,
    z: 0.1447
  }

  const cameraTargetPos = spring(
    {
      x: $pointer.x * 0.1,
      y: 1.23,
      z: 0
    },
    {
      precision: 0.000001
    }
  )
  $: cameraTargetPos.set(
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

  const cameraPos = spring(
    {
      x: $pointer.x * ($state === 'off' ? 2 : 0.1),
      y: 1.48,
      z: $cameraTweenZ
    },
    {
      stiffness: 0.05,
      damping: 0.9,
      precision: 0.00001
    }
  )
  $: cameraPos.set(
    screenFocused
      ? {
          x: screenPos.x,
          y: screenPos.y + 0.15,
          z: screenPos.z + 0.5
        }
      : {
          x: $pointer.x * ($state === 'off' ? 0.1 : 0.1),
          y: 1.48,
          z: $cameraTweenZ
        }
  )

  let cameraTarget: Object3D | undefined = undefined
  let camera: PerspectiveCamera | undefined = undefined
  useTask(() => {
    if (!camera || !cameraTarget) return
    camera.lookAt(cameraTarget.position)
  })

  const { onPointerEnter, onPointerLeave } = useCursor('pointer')

  const onScreenClick = () => {
    screenFocused = !screenFocused
  }

  const backgroundColor = tweened(new Color('#020203'), {
    duration: 2.5e3
  })
  $: backgroundColor.set($machineIsOff ? new Color('#020203') : new Color('#020203'))

  const { scene, renderer } = useThrelte()

  renderer.useLegacyLights = false

  $: scene.background = new Color($backgroundColor)

  const blueLightIntensity = tweened(2, {
    duration: 3e3
  })
  $: blueLightIntensity.set($machineIsOff ? 2 : 2)

  const redLightIntensity = tweened(1, {
    duration: 3e3
  })
  $: redLightIntensity.set($machineIsOff ? 2 : 2)

  const whiteLightIntensity = tweened(0, {
    duration: 3e3
  })
  $: whiteLightIntensity.set($machineIsOff ? 0 : 0)

  const whiteAmbientLightIntensity = tweened(1, {
    duration: 3e3
  })
  $: whiteAmbientLightIntensity.set($machineIsOff ? 1 : 0)
</script>

<svelte:window
  on:keydown={onKeyDown}
  on:keyup={onKeyUp}
/>

<T.Scene
  oncreate={({ ref }) => {
    arcadeMachineScene.set(ref)
  }}
  background={new Color(0x020203)}
>
  <Environment
    path="/hdr/"
    files="shanghai_riverside_1k.hdr"
  />

  <T.Object3D
    oncreate={({ ref }) => {
      cameraTarget = ref
    }}
    position.x={$cameraTargetPos.x}
    position.y={$cameraTargetPos.y}
    position.z={$cameraTargetPos.z}
  />

  {#if $orbitControls}
    <T.PerspectiveCamera
      position.x={20}
      position.y={20}
      position.z={20}
      fov={60}
      makeDefault
    >
      <OrbitControls />
    </T.PerspectiveCamera>>
  {:else}
    <T.PerspectiveCamera
      position.x={$cameraPos.x}
      position.y={$cameraPos.y}
      position.z={$cameraPos.z}
      fov={30}
      makeDefault
      oncreate={({ ref }) => {
        camera = ref
      }}
    />
  {/if}

  {#if nodes && materials}
    <!-- Generated by gltfjsx -->
    <T.Group rotation.y={MathUtils.DEG2RAD * 180}>
      <T.Mesh
        geometry={nodes.BodyMesh.geometry}
        material={materials['machine body main']}
        position={[0.2755, 0, 0]}
      />
      <T.Mesh
        geometry={nodes.LeftCover.geometry}
        material={materials['machine body outer']}
        position={[0.3, 1.2099, -0.1307]}
      />
      <T.Mesh
        geometry={nodes.RightCover.geometry}
        material={materials['machine body outer']}
        position={[-0.3, 1.2099, -0.1307]}
        scale={[-1, 1, 1]}
      />
      <T.Mesh
        geometry={nodes.ScreenFrame.geometry}
        material={materials['screen frame']}
        position={[0.2755, 0.0633, 0.0346]}
      />

      <!-- Joystick -->

      <T.Mesh
        geometry={nodes.joystick_base.geometry}
        material={materials['joystick base']}
        position={[0.1336, 0.9611, -0.1976]}
        rotation={[-0.1939, 0, 0]}
      />
      <T.Mesh
        geometry={nodes.joystick_stick_application.geometry}
        material={materials['joystick base']}
        position={[0.1336, 0.9653, -0.1984]}
        rotation={[-0.1939, 0, $rotationStick]}
      >
        <T.Mesh
          geometry={nodes.joystick_stick.geometry}
          material={materials['joystick stick']}
          position={[0, -0.0145, 0.0001]}
        >
          <T.Mesh
            geometry={nodes.joystick_cap.geometry}
            material={materials['joystick cap']}
            position={[-0.0001, 0.1126, -0.0005]}
            material.envMapIntensity={0.5}
          />
        </T.Mesh>
      </T.Mesh>

      <T.Mesh
        geometry={nodes.Main_Button_Enclosure.geometry}
        material={materials['joystick base']}
        position={[-0.1143, 0.9795, -0.0933]}
        rotation={[-0.1801, 0, 0]}
        scale={0.9409}
      >
        <T.Mesh
          geometry={nodes.Main_Button.geometry}
          material={materials['joystick cap']}
          position={[0.0001, 0.007 + (spacePressed ? -0.003 : 0), -0.0003]}
          rotation={[0.192, 0, 0]}
          scale={0.724}
        />
      </T.Mesh>

      <!-- The screen itself gets a special treatment -->
      <T.Mesh
        geometry={nodes.Screen.geometry}
        position={[0, 1.3774, 0.1447]}
        scale={1.0055}
        onpointerenter={onPointerEnter}
        onpointerleave={onPointerLeave}
        onclick={onScreenClick}
      >
        {#await scanLinesTexture then texture}
          {#if $gameTexture}
            <T.MeshStandardMaterial
              metalness={0.9}
              roughness={0.2}
              color={'#141414'}
              map={texture}
              metalnessMap={texture}
              emissiveMap={$gameTexture}
              emissive={pointLightIntensity}
              emissiveIntensity={1.2}
              envMapIntensity={0}
            />
          {/if}
        {/await}
      </T.Mesh>
    </T.Group>
  {/if}

  <!-- This PointLight replicates the light emitted by the screen -->
  {#if nodes}
    <T.PointLight
      args={['black']}
      position.y={1.376583185239323}
      position.z={-0.12185962320246482}
      intensity={25 * pointLightIntensity}
      distance={1.2}
      decay={2}
      color={$averageScreenColor}
      bind:ref={pointlight}
    />
  {/if}

  <T.AmbientLight
    intensity={8}
    color={$averageScreenColor}
  />
  <T.AmbientLight
    intensity={$whiteAmbientLightIntensity}
    color={'white'}
  />

  <!-- Red light -->
  <T.DirectionalLight
    intensity={$redLightIntensity}
    color="#F67F55"
    position.x={-2.2}
    position.y={3.5}
    position.z={2.6}
  />

  <!-- Blue light -->
  <T.DirectionalLight
    intensity={$blueLightIntensity}
    position.x={2.2}
    position.y={3.4}
    position.z={2.6}
    color="#2722F3"
  />

  <!-- White light -->
  <T.DirectionalLight
    intensity={$whiteLightIntensity}
    position.x={-1}
    position.y={2.5}
    position.z={1}
    color="white"
  />

  <!-- Floor -->
  <T.Mesh>
    <T.CylinderGeometry args={[1, 1, 0.04, 64]} />
    <T.MeshStandardMaterial color={'#0f0f0f'} />
  </T.Mesh>
</T.Scene>
