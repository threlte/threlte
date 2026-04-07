<script lang="ts">
  import type { SpaceshipProps } from './types'
  import { T } from '@threlte/core'
  import { useGltf } from '@threlte/extras'

  let { name, ...props }: SpaceshipProps = $props()

  let gltf = await useGltf(`/models/spaceships/${name}.gltf`)
</script>

<T.Group {...props}>
  <T
    is={gltf.scene}
    oncreate={(ref) => {
      ref.traverse((child) => {
        child.castShadow = true
        child.receiveShadow = true
      })
    }}
  />
</T.Group>
