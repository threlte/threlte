<script lang="ts">
  import ScreenQuadGeometry, { vertexShader } from './ScreenQuadGeometry.svelte'
  import { Environment, OrbitControls, useFBO, useGltf } from '@threlte/extras'
  import { OrthographicCamera, Scene, Uniform } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'

  const { camera, renderStage, renderer, scene } = useThrelte()

  useGltf('/models/spaceships/Bob.gltf').then((gltf) => {
    scene.add(gltf.scene)
  })

  const target = useFBO()

  // this scene will hold the triangle and nothing else. remember, the idea is to render a triangle that uses the main scene as a texture and do interesting effects with it
  const _scene = new Scene()

  // the triangle mesh covers the screen, it doesn't really matter what camera we use but most post-processing passes will use an orthographic camera
  const ortho = new OrthographicCamera()

  useTask(
    () => {
      const last = renderer.getRenderTarget()

      // set and draw to thet target that will be sent into the custom shader as a texture
      renderer.setRenderTarget(target)
      renderer.render(scene, camera.current)

      // restore the previous target and render the triangle scene
      renderer.setRenderTarget(last)
      renderer.render(_scene, ortho)
    },
    {
      stage: renderStage
    }
  )

  /**
   * put your interesting effects in this shader. note that your shader will probaby not need some of the stuff below
   */
  const fragmentShader = `
		precision highp float;

		uniform sampler2D uScene;
		uniform float uRadius;
		varying vec2 vUv;

		void main() {
			gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);

			vec2 center = vec2(0.5, 0.5);

			if (length(center - vUv) - uRadius < 0.0) {
				gl_FragColor = texture2D(uScene, vUv);
			}
		}
	`

  const uScene = new Uniform(target.texture)
  const uRadius = new Uniform(0)
  const uniforms = {
    uScene,
    uRadius
  }

  let time = 0
  useTask((delta) => {
    time += delta

    // oscillate the radius between 0 and 1
    uRadius.value = 1 - 0.5 * (1 + Math.sin(time))
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={7}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.Mesh
  frustrumCulled={false}
  attach={_scene}
>
  <T.RawShaderMaterial
    {vertexShader}
    {fragmentShader}
    {uniforms}
  />
  <ScreenQuadGeometry />
</T.Mesh>

<Environment
  url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"
  isBackground
/>
