<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { useFBO, useTexture } from '@threlte/extras'
  import { Group, PerspectiveCamera } from 'three'

  import { baseFov, scoping, zoomedFov } from '../Controls.svelte'
  import fragmentShader from './scope_fs.glsl?raw'
  import vertexShader from './scope_vs.glsl?raw'

  const { camera, renderer, scene, size } = useThrelte()

  interface Props {
    scope: Group
  }

  let { scope = $bindable() }: Props = $props()

  // render scene at a lower resolution but multiple samples for antialiasing
  const renderTarget = useFBO({
    size: {
      width: $size.width * 0.5,
      height: $size.height * 0.5
    },
    samples: 8
  })

  let aspect = $derived($size.width / $size.height)

  useTask(() => {
    if (!scope || !$scoping) return
    const cam = $camera as PerspectiveCamera

    scope.visible = false
    cam.fov = $zoomedFov
    cam.updateProjectionMatrix()
    cam.matrixWorldNeedsUpdate = true
    renderer.setRenderTarget(renderTarget)
    renderer.render(scene, cam)

    renderer.setRenderTarget(null)
    cam.fov = baseFov
    cam.updateProjectionMatrix()
    scope.visible = true
  })

  const reticleTexture = useTexture('/textures/NightforceScopeReticle2.png')
</script>

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
      },
      aspect: {
        value: 1
      }
    }}
    uniforms.reticleTexture.value={$reticleTexture}
    uniforms.aspect.value={aspect}
  />
</T.Mesh>
