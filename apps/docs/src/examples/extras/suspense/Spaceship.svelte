<script lang="ts">
  import { T } from '@threlte/core'
  import { Float, useGltf, useSuspense } from '@threlte/extras'
  import type { SpaceshipProps } from './types'

  let { name, ...rest }: SpaceshipProps = $props()

  const suspend = useSuspense()

  const gltf = suspend(useGltf(`/models/spaceships/${name}.gltf`))
</script>

{#await gltf then { scene }}
  <T.Group {...rest}>
    <Float
      floatIntensity={3}
      speed={3}
    >
      <T is={scene} />
    </Float>
  </T.Group>
{/await}
