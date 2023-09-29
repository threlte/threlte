<script lang="ts">
  import { Box, Flex, createClassParser } from '@threlte/flex'
  import Plane from './Plane.svelte'

  const classParser = createClassParser((string, props) => {
    const classNames = string.split(' ')
    for (const className of classNames) {
      switch (className) {
        case 'container':
          props.flexDirection = 'Row'
          props.justifyContent = 'Center'
          props.alignItems = 'Stretch'
          props.gap = 10
          props.padding = 10
          break
        case 'item':
          props.width = 'auto'
          props.height = 'auto'
          props.flex = 1
      }
    }
    return props
  })
</script>

<Flex
  width={300}
  height={300}
  {classParser}
  class="container"
>
  <Plane
    color="white"
    width={300}
    height={300}
  />
  <Box
    class="item"
    let:width
    let:height
  >
    <Plane
      color="green"
      {width}
      {height}
      depth={1}
    />
  </Box>
  <Box
    class="item"
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
