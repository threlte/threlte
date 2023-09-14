<script lang="ts">
  import Box from '../../../lib/Box/Box.svelte'
  import Flex from '../../../lib/Flex/Flex.svelte'
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
    height="auto"
    flex={0.5}
    alignItems="Stretch"
    padding={20}
    let:width
    let:height
  >
    <Plane
      color="blue"
      {width}
      {height}
    />

    <Box
      flex={1}
      width="auto"
      height={100}
      let:width
      let:height
    >
      <Plane
        color="pink"
        {width}
        {height}
      />
    </Box>

    <Box
      flex={1}
      width="auto"
      height={100}
      alignSelf="FlexEnd"
      let:width
      let:height
    >
      <Plane
        color="hotpink"
        {width}
        {height}
      />
    </Box>
  </Box>
</Flex>
