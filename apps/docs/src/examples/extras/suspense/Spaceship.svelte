<script lang="ts">
  import { T } from '@threlte/core'
  import { Float, useGltf } from '@threlte/extras'
  import type { SpaceshipProps } from './types'

  let { name, ...rest }: SpaceshipProps = $props()

  const gltf = await useGltf(`/models/spaceships/${name}.gltf`)
</script>

<T.Group {...rest}>
  <Float
    floatIntensity={3}
    speed={3}
  >
    <T is={gltf.scene} />
  </Float>
</T.Group>
