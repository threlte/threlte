<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import Spaceship from './models/spaceship.svelte'
  import {
    Color,
    type Group,
    Mesh,
    MeshStandardMaterial,
    PMREMGenerator,
    PlaneGeometry,
    Raycaster,
    Vector2,
    Vector3,
    WebGLRenderTarget
  } from 'three'
  import Stars from './Stars.svelte'
  import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
  import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
  import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
  import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'

  const { scene, size, camera, renderer } = useThrelte()

  let intersectionPoint: Vector3 | undefined
  let translAccelleration = 0
  let angleAccelleration = 0
  let pmrem = new PMREMGenerator(renderer)
  let envMapRT: WebGLRenderTarget

  let spaceShipRef = $state<Group>()
  let translY = $state(0)
  let angleZ = $state(0)

  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, $camera)
  const bloomPass = new UnrealBloomPass(new Vector2($size.width, $size.height), 0.275, 1, 0)
  const outputPass = new OutputPass()

  composer.addPass(renderPass)
  composer.addPass(bloomPass)
  composer.addPass(outputPass)

  $effect(() => {
    composer.setSize($size.width, $size.height)
    bloomPass.resolution.set($size.width, $size.height)
  })

  $effect(() => {
    renderPass.camera = $camera
  })

  // Replaces the default render task, which does not execute because autoRender=false
  // https://threlte.xyz/docs/learn/basics/render-modes#render-modes-and-custom-rendering
  const { renderStage } = useThrelte()
  useTask(
    () => {
      if (intersectionPoint) {
        const targetY = intersectionPoint?.y || 0
        translAccelleration += (targetY - translY) * 0.002 // stiffness
        translAccelleration *= 0.95 // damping
        translY += translAccelleration

        const dir = intersectionPoint
          .clone()
          .sub(new Vector3(0, translY, 0))
          .normalize()
        const dirCos = dir.dot(new Vector3(0, 1, 0))
        const angle = Math.acos(dirCos) - Math.PI * 0.5
        angleAccelleration += (angle - angleZ) * 0.01 // stiffness
        angleAccelleration *= 0.85 // damping
        angleZ += angleAccelleration
      }

      if (envMapRT) {
        envMapRT.dispose()
      }

      if (spaceShipRef) {
        spaceShipRef.visible = false
        scene.background = null
        envMapRT = pmrem.fromScene(scene, 0, 0.1, 1000)
        scene.background = new Color('#598889').multiplyScalar(0.05)
        spaceShipRef.visible = true

        spaceShipRef.traverse((child) => {
          if ('material' in child) {
            const material = child.material as MeshStandardMaterial
            if ('envMapIntensity' in material) {
              material.envMap = envMapRT.texture
              material.envMapIntensity = 100
              material.normalScale.set(0.3, 0.3)
            }
          }
        })
      }

      composer.render()
    },
    {
      stage: renderStage
    }
  )

  const planeGeo = new PlaneGeometry(20, 20)
  const mesh = new Mesh(planeGeo)

  const raycaster = new Raycaster()
  const pointer = new Vector2()

  function onpointermove(event: PointerEvent) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(pointer, $camera)
    const intersects = raycaster.intersectObject(mesh)
    intersectionPoint = intersects[0]?.point

    if (intersectionPoint) {
      // this prevents the spring motion to be different while the pointer
      // spans the x axis
      intersectionPoint.x = 3
    }
  }
</script>

<svelte:window {onpointermove} />

<T.PerspectiveCamera
  makeDefault
  position={[-10, 6, 15]}
  fov={25}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
    target={[0, 0, 0]}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={1.8}
  position={[0, 10, 0]}
  castShadow
  shadow.bias={-0.0001}
/>

<Spaceship
  bind:ref={spaceShipRef}
  position={[0, translY, 0]}
  rotation={[angleZ, 0, angleZ, 'ZXY']}
/>

<Stars />
