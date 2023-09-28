<script lang="ts">
  import Box from '../../../lib/Box/Box.svelte'
  import Flex from '../../../lib/Flex/Flex.svelte'
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
  justifyContent="FlexEnd"
>
  <Box>
    <Plane
      color="yellow"
      width={100}
      height={100}
      depth={1}
    />
  </Box>

  <Box>
    <Plane
      color="blue"
      width={100}
      height={100}
      depth={1}
    />
  </Box>
</Flex>
