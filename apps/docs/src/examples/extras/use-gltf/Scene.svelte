<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Environment, useGltf } from '@threlte/extras'
  import type { Material, Object3D } from 'three'

  let rotation = $state(0)
  useTask((delta) => {
    const f = 1 / 60 / delta // ~1 at 60fps
    rotation += 0.005 * f
  })

  const gltf = useGltf<{
    nodes: {
      'node_damagedHelmet_-6514': Object3D
    }
    materials: {
      Material_MR: Material
    }
  }>('/models/helmet/DamagedHelmet.gltf')
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
  {#await gltf}
    <!-- Place loading placeholder here -->
  {:then value}
    <T is={value.nodes['node_damagedHelmet_-6514']} />
  {/await}
</T.Group>
