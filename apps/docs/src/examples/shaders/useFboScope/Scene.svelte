<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'

  import { interactivity, Sky, useFBO, useTexture } from '@threlte/extras'

  import { tweened } from 'svelte/motion'
  import { Group, PerspectiveCamera, Vector2 } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import DeathValley from './deathValley.svelte'
  import Scope from './scope.svelte'

  import fragmentShader from './scope_fs.glsl?raw'
  import vertexShader from './scope_vs.glsl?raw'
  import { scoping, zoomedFov } from './Controls.svelte'

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

  const reticleTexture = useTexture('/textures/NightforceScopeReticle.png')
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 3.5, 9]}
  rotation.x={DEG2RAD * -25}
  fov={baseFov}
>
  <Scope
    bind:ref={scope}
    position.y={$positionY}
    position.z={$positionZ}
    rotation.y={DEG2RAD * $rotationX}
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

<Sky />
<DeathValley scale={6} />
