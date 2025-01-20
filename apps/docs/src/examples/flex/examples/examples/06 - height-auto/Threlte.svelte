<script lang="ts">
  import { Flex, Box } from '@threlte/flex'
  import Plane from '../../Plane.svelte'
</script>

<Plane
  width={300}
  height={300}
  color="red"
/>

<Flex
  width={300}
  height={300}
  justifyContent="Center"
  alignItems="Stretch"
  gap={20}
>
  <Box
    width={44}
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
    width={44}
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
