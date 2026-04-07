<script lang="ts">
  import { T } from '@threlte/core'

  interface Props {
    count: number
  }

  let { count }: Props = $props()
</script>

{#each Array(count).keys() as index (index)}
  <T.Mesh name="mesh-{index}">
    <T.PlaneGeometry args={[index, index, index]} />
  </T.Mesh>
{/each}
