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

  const material = new ShaderMaterial({
    fragmentShader,
    uniforms: {
      uScene,
      uRadius
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
