<script
  lang="ts"
  module
>
  const vertexShader = `
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
`
</script>

<script lang="ts">
  import { Environment, OrbitControls, useFBO, useGltf } from '@threlte/extras'
  import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js'
  import { ShaderMaterial, Uniform } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'

  const { camera, renderStage, renderer, scene } = useThrelte()

  const target = useFBO()

  /**
   * put your interesting effects in this shader.
   */
  const fragmentShader = `
		uniform sampler2D uScene;
		uniform float uTime;

		varying vec2 vUv;

		void main() {

			gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);

			vec2 center = vec2(0.5, 0.5);

			float radius = 1.0 - 0.5 * (1.0 + sin(uTime));

			if (length(center - vUv) - radius < 0.0) {
				gl_FragColor = texture2D(uScene, vUv);
			}
		}
	`

  const gltf = useGltf('/models/spaceships/Bob.gltf')

  const uScene = new Uniform(target.texture)

  const uTime = new Uniform(0)

  useTask((delta) => {
    uTime.value += delta
  })

  const material = new ShaderMaterial({
    fragmentShader,
    uniforms: {
      uScene,
      uTime
    },
    vertexShader
  })

  const quad = new FullScreenQuad(material)

  // not using the <T> component so we need to clean up after ourselves
  $effect(() => {
    return () => {
      quad.dispose()
      material.dispose()
    }
  })

  useTask(
    () => {
      const last = renderer.getRenderTarget()
      renderer.setRenderTarget(target)
      renderer.render(scene, camera.current)
      renderer.setRenderTarget(last)
      quad.render(renderer)
    },
    {
      stage: renderStage
    }
  )
</script>

<T.PerspectiveCamera
  makeDefault
  position={5}
>
  <OrbitControls />
</T.PerspectiveCamera>

{#await gltf then { scene }}
  <T is={scene} />
{/await}

<Environment
  url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"
  isBackground
/>
