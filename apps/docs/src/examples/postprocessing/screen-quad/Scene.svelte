<script lang="ts">
  import ScreenQuadGeometry, { vertexShader } from './ScreenQuadGeometry.svelte'
  import { Scene, Uniform, Vector2 } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'
  import { Environment, interactivity, OrbitControls, useFBO, useGltf } from '@threlte/extras'

  let { radius = 1 }: { radius?: number } = $props()

  const { camera, renderStage, renderer, scene, size } = useThrelte()

  const fbo = useFBO()
  const _scene = new Scene()

  useTask(
    () => {
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
   */
  const fragmentShader = `
		precision highp float;
		uniform sampler2D uScene;
		uniform vec2 uResolution;
		uniform vec2 uMouse;
		uniform float uRadius;

		void main() {
			vec2 uv = gl_FragCoord.xy / uResolution.xy;
			vec4 color = texture2D(uScene, uv);

			vec2 d = (uv - uMouse);
			d.x *= uResolution.x / uResolution.y;

			float circle = 1.0 - smoothstep(
				uRadius,
				uRadius,
				dot(d, d)
			);

			color.rgb *= circle;
			gl_FragColor = color;
		}
	`

  const uScene = new Uniform(fbo.texture)
  const uResolution = new Uniform(new Vector2())

  $effect(() => {
    uResolution.value.set($size.width, $size.height)
  })

  const gltf = useGltf('/models/spaceships/Bob.gltf')

  const uMouse = new Uniform(new Vector2(0.5, 0.5))

  const { pointer } = interactivity()

  $effect(() => {
    uMouse.value.copy($pointer).addScalar(1).divideScalar(2)
  })
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
      uRadius: {
        value: 1
      }
    }}
    uniforms.uScene={uScene}
    uniforms.uResolution={uResolution}
    uniforms.uMouse={uMouse}
    uniforms.uRadius.value={radius}
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
