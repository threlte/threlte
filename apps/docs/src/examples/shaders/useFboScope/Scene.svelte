<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'

  import { interactivity, Sky, useFBO, useTexture } from '@threlte/extras'

  import { tweened } from 'svelte/motion'
  import { writable } from 'svelte/store'
  import { Group, PerspectiveCamera, Vector2, type Vector3Tuple } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import DeathValley from './deathValley.svelte'
  import Scope from './scope.svelte'

  import fragmentShader from './scope_fs.glsl?raw'
  import vertexShader from './scope_vs.glsl?raw'

  interactivity()

  const { camera, renderer, scene, size } = useThrelte()

  // render scene at a lower resolution
  const renderTarget = useFBO($size.width * 0.5, $size.height * 0.5)

  // change aspect ratio of the texture because we are putting it on a circle so w and h are the same
  const aspect = new Vector2($size.height / $size.width, 1).normalize()
  renderTarget.texture.repeat.set(aspect.x, aspect.y)
  renderTarget.texture.offset.x = -0.5 * (aspect.x - 1)
  renderTarget.texture.offset.y = -0.5 * (aspect.y - 1)

  let scope: Group | undefined

  const baseFov = 60

  const zoomedFov = tweened(5, {
    duration: 200
  })

  useTask(() => {
    if (!scope || !$scoping) return
    const cam = $camera as PerspectiveCamera

    scope.visible = false
    cam.fov = $zoomedFov
    cam.updateMatrix()
    cam.updateProjectionMatrix()
    cam.matrixWorldNeedsUpdate = true
    renderer.setRenderTarget(renderTarget)
    renderer.render(scene, cam)
    cam.fov = baseFov
    cam.updateProjectionMatrix()

    scope.visible = true
    renderer.setRenderTarget(null)
  })

  const scoping = writable(true)

  // Stores and reactivity to animate scope toggling
  const rotationX = tweened(90)
  const positionY = tweened(-0.3)
  const positionZ = tweened(-1)

  $: {
    if ($scoping) {
      rotationX.set(0)
      positionY.set(0)
      positionZ.set(-0.5)
    } else {
      rotationX.set(90)
      positionY.set(-0.3)
      positionZ.set(-1)
    }
  }

  // Toggle scope, reset position to 0 when not scoping
  const scopePosition: Vector3Tuple = [0, 0, 0]
  window.addEventListener('keydown', (e) => {
    if (e.key === 's') scoping.set(!$scoping)
    if (e.key === 'a') zoomedFov.set($zoomedFov + 1)
    if (e.key === 'd') zoomedFov.set($zoomedFov - 1)
  })

  // Move scope on mousemove
  window.addEventListener('mousemove', ({ movementX, movementY }) => {
    if ($scoping) {
      // scopePosition[0] = scopePosition[0] + movementX * (($zoomedFov * 1.5) / baseFov) * 0.01
      // scopePosition[1] = scopePosition[1] - movementY * (($zoomedFov * 1.5) / baseFov) * 0.01
    }
  })

  // Zoom in and out with mousewheel
  window.addEventListener('wheel', ({ deltaY }) => {
    zoomedFov.set($zoomedFov + deltaY * 0.05)
  })

  const reticleTexture = useTexture('/textures/NightforceScopeReticle.png')
</script>

<T.Group
  position={[0, 3.5, 9]}
  rotation.x={DEG2RAD * -25}
  rotation.y={DEG2RAD * 0}
  rotation.z={DEG2RAD * 0}
>
  <T.PerspectiveCamera
    makeDefault
    position={scopePosition}
    fov={baseFov}
  >
    <Scope
      bind:ref={scope}
      position.x={0}
      position.y={$positionY}
      position.z={$positionZ}
      rotation.x={DEG2RAD * 0}
      rotation.y={DEG2RAD * $rotationX}
      rotation.z={DEG2RAD * 0}
    >
      <T.Mesh
        position.z={19.5}
        position.y={-0.1}
      >
        <T.CircleGeometry args={[1.8]} />

        <T.ShaderMaterial
          {fragmentShader}
          {vertexShader}
          uniforms={{
            viewTexture: {
              value: renderTarget.texture
            },
            reticleTexture: {
              value: null
            }
          }}
          uniforms.reticleTexture.value={$reticleTexture}
        />
      </T.Mesh>
    </Scope>
  </T.PerspectiveCamera>
</T.Group>

<Sky />
<DeathValley scale={6} />
