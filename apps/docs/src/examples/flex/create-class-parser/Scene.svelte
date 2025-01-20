<script lang="ts">
  import { Box, Flex, createClassParser } from '@threlte/flex'
  import RoundedPlane from './RoundedPlane.svelte'

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
  height={150}
  {classParser}
  class="container"
>
  <RoundedPlane
    radius={15}
    color="#FE3D00"
    width={300}
    height={150}
  />
  <Box class="item">
    {#snippet children({ width, height })}
      <RoundedPlane
        color="#EB1688"
        {width}
        {height}
        depth={1}
      />
    {/snippet}
  </Box>
  <Box class="item">
    {#snippet children({ width, height })}
      <RoundedPlane
        color="#113BFA"
        {width}
        {height}
        depth={1}
      />
    {/snippet}
  </Box>
  <Box class="item">
    {#snippet children({ width, height })}
      <RoundedPlane
        color="#590C65"
        {width}
        {height}
        depth={1}
      />
    {/snippet}
  </Box>
</Flex>
