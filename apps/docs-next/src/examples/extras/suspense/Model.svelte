<script lang="ts">
  import { T } from '@threlte/core'
  import { useGltf, useSuspense } from '@threlte/extras'

  const suspend = useSuspense()

  const gltf = suspend(useGltf('/models/LittlestTokyo.glb', { useDraco: true }))
</script>

{#await gltf then { scene }}
  <T
    is={scene}
    scale={0.01}
    position.y={2}
    position.x={0.5}
  />
{/await}
