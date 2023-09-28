<script lang="ts">
  import Box from '../../../lib/Box/Box.svelte'
  import Flex from '../../../lib/Flex/Flex.svelte'
  import Plane from '../../Plane.svelte'
  import { tailwindParser } from './tailwindParser'
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
  class="p-10 gap-10"
>
  <Box
    class="w-100 h-100"
    let:width
    let:height
  >
    <Plane
      {width}
      {height}
      color="yellow"
      depth={1}
    />
  </Box>

  <Box
    class="flex-1"
    let:width
  >
    <Plane
      color="blue"
      {width}
      height={100}
      depth={1}
    />
  </Box>
</Flex>
