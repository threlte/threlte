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
  justifyContent="FlexEnd"
  alignItems="FlexEnd"
>
  <Box>
    <Plane
      color="yellow"
      width={44}
      height={44}
      depth={1}
    />
  </Box>

  <Box>
    <Plane
      color="blue"
      width={44}
      height={44}
      depth={1}
    />
  </Box>
</Flex>
