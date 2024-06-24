<script lang="ts">
  import { T } from '@threlte/core'
  import { RoundedBoxGeometry } from '@threlte/extras'
  import { Box, Flex, tailwindParser } from '@threlte/flex'
  import Circle from './Circle.svelte'
  import Label from './Label.svelte'
  import type { Snippet } from 'svelte'

  interface Props {
    title: string
    width?: number
    height?: number
    children?: Snippet<[{ width: number, height: number }]>
  }

  let { title, width = 500, height = 400, children: innerChildren }: Props = $props()
</script>

<Flex
  classParser={tailwindParser}
  {width}
  {height}
  class="flex-col gap-1 p-1"
>
  <T.Mesh>
    <RoundedBoxGeometry
      args={[width, height, 20]}
      radius={6}
    />
    <T.MeshBasicMaterial color="#0A0F19" />
  </T.Mesh>

  <Box class="h-26 pr-53 w-full items-center justify-start gap-5 pl-8">
    {#snippet children({ height, width })}
      <T.Mesh position.z={20}>
        <RoundedBoxGeometry
          args={[width, height, 20]}
          radius={5}
        />
        <T.MeshBasicMaterial color="#ddd" />
      </T.Mesh>

      <Box class="h-10 w-10">
        <Circle
          radius={5}
          color="#FF6057"
          z={30.01}
        />
      </Box>
      <Box class="h-10 w-10">
        <Circle
          radius={5}
          color="#FDBD2E"
          z={30.01}
        />
      </Box>
      <Box class="h-10 w-10">
        <Circle
          radius={5}
          color="#27C840"
          z={30.01}
        />
      </Box>

      <Box class="h-full w-auto flex-1 items-center justify-center">
        <Label
          text={title}
          z={30.01}
          fontStyle="semi-bold"
          fontSize="l"
          color="#454649"
        />
      </Box>
    {/snippet}
  </Box>

  <Box
    class="h-auto w-auto flex-1"
  >
    {#snippet children({ width, height })}
      {@render innerChildren?.({ width, height })}
    {/snippet}
  </Box>
</Flex>
