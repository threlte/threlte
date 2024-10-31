<script lang="ts">
  import { T } from '@threlte/core'
  import { useGltf, useSuspense } from '@threlte/extras'
  import type { SpaceshipProps } from './Spaceship'
  import { Group } from 'three'

  let { name, children, ref = $bindable(new Group()), ...props }: SpaceshipProps = $props()

  const suspend = useSuspense()

  let gltf = $derived(suspend(useGltf(`/models/spaceships/${name}.gltf`)))
</script>

{#await gltf then { scene }}
  <T
    is={ref}
    {...props}
  >
    <T
      is={scene}
      oncreate={(ref) => {
        ref.traverse((child) => {
          child.castShadow = true
          child.receiveShadow = true
        })
      }}
    />
    {@render children?.({ ref })}
  </T>
{/await}
