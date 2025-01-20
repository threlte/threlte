<script lang="ts">
  import { Flex, Box, tailwindParser } from '$lib'
  import Plane from '../../Plane.svelte'
</script>

<Plane
  width={500}
  height={500}
  color="red"
/>

<Flex
  width={500}
  height={500}
  classParser={tailwindParser}
  class="gap-10 p-10"
>
  <Box class="w-100 h-100">
    {#snippet children({ width, height })}
      <Plane
        {width}
        {height}
        color="yellow"
        depth={1}
      />
    {/snippet}
  </Box>

  <Box class="flex-1">
    {#snippet children({ width })}
      <Plane
        color="blue"
        {width}
        height={100}
        depth={1}
      />
    {/snippet}
  </Box>
</Flex>
