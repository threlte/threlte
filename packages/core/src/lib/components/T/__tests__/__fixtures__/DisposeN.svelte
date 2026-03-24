<script lang="ts">
  import { T, useDisposal, useTask } from '@threlte/core'

  interface Props {
    count: number
  }

  let { count }: Props = $props()

  const { dispose } = useDisposal()

  // This simulates the default animation loop calling dispose
  useTask(() => dispose())
</script>

{#each Array(count).keys() as index (index)}
  <T.Mesh name="mesh-{index}">
    <T.PlaneGeometry args={[index, index, index]} />
  </T.Mesh>
{/each}
