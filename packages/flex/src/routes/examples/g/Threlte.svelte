<script lang="ts">
  import { T } from '@threlte/core'
  import Root from '../../../lib/Root/Root.svelte'
  import Item from '../../../lib/nodes/Item/Item.svelte'
  import Plane from '../../Plane.svelte'
  import Test from '../../Test.svelte'
  import Common from '../Common.svelte'
</script>

<Common />

<Plane
  width={500}
  height={500}
  color="red"
/>

<Root
  width={500}
  height={500}
  justifyContent="Center"
  alignItems="Stretch"
  gap={20}
  padding={20}
>
  <Item
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
  </Item>

  <Item
    width="auto"
    height={200}
    flex={0.5}
    let:width
    let:height
  >
    <Plane
      color="blue"
      {width}
      {height}
    />
  </Item>
</Root>
