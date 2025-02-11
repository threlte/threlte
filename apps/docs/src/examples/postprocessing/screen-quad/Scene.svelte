<script lang="ts">
  import ScreenQuadGeometry, { vertexShader } from './ScreenQuadGeometry.svelte'
  import { Environment, OrbitControls, useGltf } from '@threlte/extras'
  import { Scene, Uniform, WebGLRenderTarget } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'

  const { camera, renderStage, renderer, scene, size } = useThrelte()

  const target = new WebGLRenderTarget(1, 1)

  $effect(() => {
    target.setSize($size.width, $size.height)
  })

  const _scene = new Scene()

  useTask(
    () => {
      const last = renderer.getRenderTarget()
      renderer.setRenderTarget(target)
      renderer.render(scene, camera.current)
      renderer.setRenderTarget(last)
      renderer.render(_scene, camera.current)
    },
    {
      stage: renderStage
    }
  )

  /**
   * put your interesting effects in this shader.
   */
  const fragmentShader = `
		precision highp float;

		uniform sampler2D uScene;
		uniform vec2 uMouse;
		uniform float uRadius;
		varying vec2 vUv;

		void main() {

			vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

			vec2 center = vec2(0.5, 0.5);

			if (length(center - vUv) - uRadius < 0.0) {
				color = texture2D(uScene, vUv);
			}

			gl_FragColor = color;
		}
	`

  const gltf = useGltf('/models/spaceships/Bob.gltf')

  const uScene = new Uniform(target.texture)

  const uRadius = new Uniform(0)

  let time = 0
  useTask((delta) => {
    time += delta
    uRadius.value = 1 - 0.5 * (1 + Math.sin(time))
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
    uniforms.uScene={uScene}
    uniforms.uRadius={uRadius}
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
