<script lang="ts">
  import { T } from '@threlte/core'

  interface Props {
    showSecond: boolean
  }

  let { showSecond }: Props = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[1, 2, 3]}
/>

{#if showSecond}
  <T.OrthographicCamera
    makeDefault
    position={[4, 5, 6]}
  />
{/if}
