<script lang="ts">
  import Flex from '../../../lib/Flex/Flex.svelte'
  import Box from '../../../lib/Box/Box.svelte'
  import Plane from '../../Plane.svelte'
  import Common from '../Common.svelte'
</script>

<Common />

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
    />
  </Box>
</Flex>
