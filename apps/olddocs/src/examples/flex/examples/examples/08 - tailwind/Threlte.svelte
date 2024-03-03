<script lang="ts">
  import { Flex, Box, tailwindParser } from '@threlte/flex'
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
  classParser={tailwindParser}
  class="gap-10 p-10"
>
  <Box
    class="h-44 w-44"
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
      height={44}
      depth={1}
    />
  </Box>
</Flex>
