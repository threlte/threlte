<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { useFBO, useTexture } from '@threlte/extras'
  import { Group, PerspectiveCamera, ShaderMaterial, Texture, Uniform } from 'three'

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

  const uniforms = {
    viewTexture: new Uniform(renderTarget.texture),
    reticleTexture: new Uniform<Texture | null>(null),
    aspect: new Uniform(1)
  }

  const material = new ShaderMaterial({
    fragmentShader,
    vertexShader,
    uniforms
  })

  useTask(() => {
    if (!scope || !$scoping) return
    const cam = $camera as PerspectiveCamera

    scope.visible = false
    cam.fov = zoomedFov.current
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

  $effect(() => {
    uniforms.reticleTexture.value = $reticleTexture || null
  })
  $effect(() => {
    uniforms.aspect.value = size.current.width / size.current.height
  })
</script>

<T.Mesh
  position.z={19.5}
  position.y={-0.1}
>
  <T.CircleGeometry args={[1.8]} />

  <T is={material} />
</T.Mesh>
