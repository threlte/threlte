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
  padding={20}
>
  <Box
    width="auto"
    height="auto"
    flex={1}
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
    width="auto"
    height="auto"
    flex={0.5}
    alignItems="Stretch"
    padding={20}
  >
    {#snippet children({ width, height })}
      <Plane
        color="blue"
        {width}
        {height}
        depth={1}
      />

      <Box
        flex={1}
        width="auto"
        height={44}
      >
        {#snippet children({ width, height })}
          <Plane
            color="pink"
            {width}
            {height}
            depth={2}
          />
        {/snippet}
      </Box>

      <Box
        flex={1}
        width="auto"
        height={44}
        alignSelf="FlexEnd"
      >
        {#snippet children({ width, height })}
          <Plane
            color="hotpink"
            {width}
            {height}
            depth={2}
          />
        {/snippet}
      </Box>
    {/snippet}
  </Box>
</Flex>
