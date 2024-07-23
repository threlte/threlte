<script lang="ts">
  import { Flex, Box } from '$lib'
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
  justifyContent="Center"
  alignItems="Stretch"
  gap={20}
>
  <Box
    width={100}
    height="auto"
  >
    {#snippet children({ width, height })}
      <Plane
        color="yellow"
        {width}
        {height}
        depth={1}
      />
    {/snippet}
  </Box>

  <Box
    width={100}
    height="auto"
  >
    {#snippet children({ width, height })}
      <Plane
        color="blue"
        {width}
        {height}
        depth={1}
      />
    {/snippet}
  </Box>
</Flex>
