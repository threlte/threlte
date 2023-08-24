<script lang="ts">
  import { T, useFrame, useRender, useThrelte } from '@threlte/core'
  import { GLTF } from '@threlte/extras'
  import {
    DotScreenEffect,
    EffectComposer,
    EffectPass,
    RenderPass,
    SMAAEffect
  } from 'postprocessing'
  import { DEG2RAD } from 'three/src/math/MathUtils'

  const { renderer, scene, camera, size } = useThrelte()

  const composer = new EffectComposer(renderer)

  $: if ($camera) {
    composer.removeAllPasses()
    composer.addPass(new RenderPass(scene, $camera))
    composer.addPass(
      new EffectPass(
        $camera,
        new DotScreenEffect({
          scale: 0.5
        })
      )
    )
    composer.addPass(new EffectPass($camera, new SMAAEffect()))
  }

  let rotation = 0

  useFrame(
    () => {
      rotation -= 0.002
    },
    {
      invalidate: true
    }
  )

  $: composer.setSize($size.width, $size.height)

  useRender(() => {
    composer.render()
  })
</script>

<T.Group rotation.y={rotation}>
  <T.OrthographicCamera
    zoom={80}
    position={[0, 5, 10]}
    makeDefault
    on:create={({ ref }) => {
      ref.lookAt(0, 2, 0)
    }}
  />
</T.Group>

<GLTF
  castShadow
  receiveShadow
  url={'/models/threlte.glb'}
  interactive
/>

<T.Mesh
  receiveShadow
  rotation.x={DEG2RAD * -90}
>
  <T.CircleGeometry args={[4, 60]} />
  <T.MeshStandardMaterial />
</T.Mesh>

<T.DirectionalLight
  position={[3, 10, 10]}
  castShadow
/>
<T.DirectionalLight
  position={[-3, 10, -10]}
  intensity={0.2}
/>
<T.AmbientLight intensity={0.5} />
