<script lang="ts">
  import ScreenQuadGeometry, { vertexShader } from './ScreenQuadGeometry.svelte'
  import { Scene, Uniform, Vector2 } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'
  import { Environment, OrbitControls, useFBO, useGltf } from '@threlte/extras'

  let { amplitude = 1, frequency = 1 }: { amplitude?: number; frequency?: number } = $props()

  const { camera, renderStage, renderer, scene, size } = useThrelte()

  const fbo = useFBO()
  const _scene = new Scene()

  const uTime = new Uniform(0)
  useTask(
    (delta) => {
      uTime.value += delta
      const last = renderer.getRenderTarget()
      renderer.setRenderTarget(fbo)
      renderer.render(scene, camera.current)
      renderer.setRenderTarget(last)
      renderer.render(_scene, camera.current)
    },
    { stage: renderStage }
  )

  /**
   * put your interesting effects in this shader.
   * this one oscillates the blue channel of the scene by a sine wave
   */
  const fragmentShader = `
		precision highp float;
		uniform sampler2D uScene;
		uniform vec2 uResolution;
		uniform float uTime;
		uniform float uAmplitude;
		uniform float uFrequency;

		void main() {
			vec2 uv = gl_FragCoord.xy / uResolution.xy;
			vec4 color = texture2D(uScene, uv);
			color.b = uAmplitude * 0.5 * (1.0 + sin(uFrequency * uTime));
			gl_FragColor = color;
		}
	`

  const uScene = new Uniform(fbo.texture)
  const uResolution = new Uniform(new Vector2())

  $effect(() => {
    uResolution.value.set($size.width, $size.height)
  })

  const gltf = useGltf('/models/spaceships/Bob.gltf')
</script>

<T.PerspectiveCamera
  makeDefault
  position={5}
>
  <OrbitControls />
</T.PerspectiveCamera>

<!-- this geometry is so simple that frustrum culling it would actually be more work -->
<T.Mesh
  frustrumCulled={false}
  attach={_scene}
>
  <T.RawShaderMaterial
    {vertexShader}
    {fragmentShader}
    uniforms={{
      uAmplitude: {
        value: 1
      },
      uTime: {
        value: 0
      },
      uFrequency: {
        value: 1
      }
    }}
    uniforms.uScene={uScene}
    uniforms.uResolution={uResolution}
    uniforms.uTime={uTime}
    uniforms.uAmplitude.value={amplitude}
    uniforms.uFrequency.value={frequency}
  />
  <ScreenQuadGeometry />
</T.Mesh>

{#await gltf then { scene }}
  <T is={scene} />
{/await}

<Environment
  url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"
  isBackground
/>
