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
  alignItems="Center"
  gap={20}
>
  <Box>
    <Plane
      color="yellow"
      width={100}
      height={100}
    />
  </Box>

  <Box>
    <Plane
      color="blue"
      width={100}
      height={100}
    />
  </Box>
</Flex>
