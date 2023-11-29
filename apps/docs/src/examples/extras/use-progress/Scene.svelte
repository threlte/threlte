<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Environment, useGltf } from '@threlte/extras'
  import { derived } from 'svelte/store'
  import type { Material, Mesh } from 'three'

  let rotation = 0
  useTask((delta) => {
    const f = 1 / 60 / delta // ~1 at 60fps
    rotation += 0.01 * f
  })

  type GLTFResult = {
    nodes: {
      'node_damagedHelmet_-6514': Mesh
    }
    materials: {
      Material_MR: Material
    }
  }

  const gltf = useGltf<GLTFResult>(
    '/models/helmet/DamagedHelmet.gltf?v=' + Math.random().toString() // force a reload on every pageload
  )

  const helmet = derived(gltf, (gltf) => {
    if (!gltf || !gltf.nodes['node_damagedHelmet_-6514']) return
    return gltf.nodes['node_damagedHelmet_-6514']
  })
</script>

<Environment
  path="/hdr/"
  files="shanghai_riverside_1k.hdr"
/>

<T.PerspectiveCamera
  makeDefault
  position.z={10}
  fov={20}
/>

<T.DirectionalLight
  position.y={10}
  position.z={10}
/>

<T.Group rotation.y={rotation}>
  {#if $helmet}
    <T is={$helmet} />
  {/if}
</T.Group>
