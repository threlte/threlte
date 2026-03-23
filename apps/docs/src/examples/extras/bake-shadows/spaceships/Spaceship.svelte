<script lang="ts">
  import type { SpaceshipProps } from './types'
  import { T } from '@threlte/core'
  import { useGltf, useSuspense } from '@threlte/extras'

  let { name, ...props }: SpaceshipProps = $props()

  const suspend = useSuspense()

  let gltf = $derived(suspend(useGltf(`/models/spaceships/${name}.gltf`)))
</script>

{#await gltf then { scene }}
  <T.Group {...props}>
    <T
      is={scene}
      oncreate={(ref) => {
        for (const child of ref.children) {
          child.castShadow = true
          child.receiveShadow = true
        }
      }}
    />
  </T.Group>
{/await}
