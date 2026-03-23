<script lang="ts">
  import { Flex, Box } from '$lib/index.js'
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
>
  <Box>
    <Plane
      color="yellow"
      width={100}
      height={100}
      depth={1}
    />
  </Box>

  <Box flex={1}>
    <Plane
      color="blue"
      height={100}
      depth={1}
    />
  </Box>
</Flex>
