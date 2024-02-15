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
    let:width
    let:height
  >
    <Plane
      color="yellow"
      {width}
      {height}
      depth={1}
    />
  </Box>

  <Box
    width="auto"
    height={200}
    flex={0.5}
    let:width
    let:height
  >
    <Plane
      color="blue"
      {width}
      {height}
      depth={1}
    />
  </Box>
</Flex>
