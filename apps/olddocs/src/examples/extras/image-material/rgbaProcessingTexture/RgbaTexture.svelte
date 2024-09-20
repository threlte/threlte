<script lang="ts">
  import { useTask, useThrelte, T } from '@threlte/core'
  import { useTexture, Portal, HTML } from '@threlte/extras'

  const { renderer, autoRenderTask, camera } = useThrelte()
  import { colorProcessingTexture } from '../props'
  import { onDestroy, onMount } from 'svelte'
  import {
    DoubleSide,
    Mesh,
    OrthographicCamera,
    PlaneGeometry,
    Scene,
    ShaderMaterial,
    WebGLMultipleRenderTargets
  } from 'three'

  import fragmentShader from './fragmentShader.glsl?raw'
  import vertexShader from './vertexShader.glsl?raw'

  // Multiple render targets to visualize RGBA channels.
  const rgbaTextureTarget = new WebGLMultipleRenderTargets(256, 256, 5)

  const scene = new Scene()
  const orthoCamera = new OrthographicCamera(-1, 1, 1, -1, -1, 1)

  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAlphaTexture: { value: null }
    },
    vertexShader,
    fragmentShader
  })

  const alphaTexture = useTexture('/textures/alpha.jpg')

  $: shaderMaterial.uniforms.uAlphaTexture.value = $alphaTexture

  const quad = new Mesh(new PlaneGeometry(2, 2), shaderMaterial)

  scene.add(quad)

  useTask(
    (delta) => {
      shaderMaterial.uniforms.uTime.value += delta
      renderer.setRenderTarget(rgbaTextureTarget)
      renderer.render(scene, orthoCamera)
      renderer.setRenderTarget(null)
    },
    {
      before: autoRenderTask
    }
  )

  onMount(() => {
    colorProcessingTexture.set(rgbaTextureTarget.texture[0])
  })

  onDestroy(() => {
    colorProcessingTexture.set(undefined)
  })
</script>

<!-- VISUALIZATION OF EACH RGBA CHANNEL -->

<Portal object={$camera}>
  <T.Group
    position.x={-0.1}
    position.z={-0.5}
    position.y={0.06}
    scale={0.03}
  >
    <T.Mesh>
      <T.MeshBasicMaterial
        map={rgbaTextureTarget.texture[1]}
        side={DoubleSide}
      />
      <T.PlaneGeometry />
      <HTML center>
        <span style="color:white;">Hue(R)</span>
      </HTML>
    </T.Mesh>

    <T.Mesh position.x={1}>
      <T.MeshBasicMaterial
        map={rgbaTextureTarget.texture[2]}
        side={DoubleSide}
      />
      <T.PlaneGeometry />
      <HTML center>
        <span style="color:white;">Saturation(G)</span>
      </HTML>
    </T.Mesh>
    <T.Mesh position.x={2}>
      <T.MeshBasicMaterial
        map={rgbaTextureTarget.texture[3]}
        side={DoubleSide}
      />
      <T.PlaneGeometry />
      <HTML center>
        <span style="color:white;">Lightness(B)</span>
      </HTML>
    </T.Mesh>
    <T.Mesh position.x={3}>
      <T.MeshBasicMaterial
        map={rgbaTextureTarget.texture[4]}
        side={DoubleSide}
      />
      <T.PlaneGeometry />
      <HTML center>
        <span style="color:white;">Alpha(A)</span>
      </HTML>
    </T.Mesh>
  </T.Group>
</Portal>
