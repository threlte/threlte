<script lang="ts">
  import { useTask, useThrelte, T } from '@threlte/core'
  import { useTexture, Portal, HTML } from '@threlte/extras'

  const { renderer, autoRenderTask } = useThrelte()
  import { colorProcessingTexture } from '../props'
  import { onMount } from 'svelte'
  import {
    DoubleSide,
    Mesh,
    OrthographicCamera,
    PlaneGeometry,
    Scene,
    ShaderMaterial,
    Texture,
    WebGLRenderTarget
  } from 'three'

  import fragmentShader from './fragmentShader.glsl?raw'
  import vertexShader from './vertexShader.glsl?raw'

  // Multiple render targets to visualize RGBA channels.
  const rgbaTextureTarget = new WebGLRenderTarget(256, 256, { count: 5 })

  const scene = new Scene()
  const orthoCamera = new OrthographicCamera(-1, 1, 1, -1, -1, 1)

  const uniforms = {
    uTime: { value: 0 },
    uAlphaTexture: { value: null as Texture | null }
  }

  const shaderMaterial = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  })

  const alphaTexture = useTexture('/textures/alpha.jpg')

  $: uniforms.uAlphaTexture.value = $alphaTexture ?? null

  const quad = new Mesh(new PlaneGeometry(2, 2), shaderMaterial)

  scene.add(quad)

  useTask(
    (delta) => {
      uniforms.uTime.value += delta
      renderer.setRenderTarget(rgbaTextureTarget)
      renderer.render(scene, orthoCamera)
      renderer.setRenderTarget(null)
    },
    {
      before: autoRenderTask
    }
  )

  onMount(() => {
    colorProcessingTexture.set(rgbaTextureTarget.textures[0])
    return () => colorProcessingTexture.set(undefined)
  })
</script>

<!-- VISUALIZATION OF EACH RGBA CHANNEL -->

<Portal id="camera">
  <T.Group
    position.x={-0.1}
    position.z={-0.5}
    position.y={0.06}
    scale={0.03}
  >
    <T.Mesh>
      <T.MeshBasicMaterial
        map={rgbaTextureTarget.textures[1] ?? null}
        side={DoubleSide}
      />
      <T.PlaneGeometry />
      <HTML center>
        <span style="color:white;">Hue(R)</span>
      </HTML>
    </T.Mesh>

    <T.Mesh position.x={1}>
      <T.MeshBasicMaterial
        map={rgbaTextureTarget.textures[2] ?? null}
        side={DoubleSide}
      />
      <T.PlaneGeometry />
      <HTML center>
        <span style="color:white;">Saturation(G)</span>
      </HTML>
    </T.Mesh>
    <T.Mesh position.x={2}>
      <T.MeshBasicMaterial
        map={rgbaTextureTarget.textures[3] ?? null}
        side={DoubleSide}
      />
      <T.PlaneGeometry />
      <HTML center>
        <span style="color:white;">Lightness(B)</span>
      </HTML>
    </T.Mesh>
    <T.Mesh position.x={3}>
      <T.MeshBasicMaterial
        map={rgbaTextureTarget.textures[4] ?? null}
        side={DoubleSide}
      />
      <T.PlaneGeometry />
      <HTML center>
        <span style="color:white;">Alpha(A)</span>
      </HTML>
    </T.Mesh>
  </T.Group>
</Portal>
