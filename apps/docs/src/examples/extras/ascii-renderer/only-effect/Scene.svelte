<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import type { AsciiEffect } from 'three/examples/jsm/Addons.js'

  let { asciiEffect }: { asciiEffect: AsciiEffect } = $props()

  const { autoRender, camera, scene } = useThrelte()

  $effect(() => {
    const lastAutoRender = autoRender.current
    autoRender.set(false)
    return () => {
      autoRender.set(lastAutoRender)
    }
  })

  // render once
  $effect(() => {
    asciiEffect.render(scene, camera.current)
  })
</script>

<T.DirectionalLight position={5} />

<T.PerspectiveCamera
  makeDefault
  position.z={5}
/>

<T.Mesh>
  <T.MeshNormalMaterial />
  <T.TorusKnotGeometry />
</T.Mesh>
