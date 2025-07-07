<script lang="ts">
  import type { Material, Mesh } from 'three'
  import { Environment, useGltf } from '@threlte/extras'
  import { T, useTask } from '@threlte/core'

  let rotation = $state(0)
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
</script>

<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

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
  {#await gltf then { nodes }}
    <T is={nodes['node_damagedHelmet_-6514']} />
  {/await}
</T.Group>
