<script lang="ts">
  import Root from '../../../lib/Root/Root.svelte'
  import Item from '../../../lib/nodes/Item/Item.svelte'
  import Plane from '../../Plane.svelte'
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
  alignItems="Center"
  gap={20}
>
  <Item>
    <Plane
      color="yellow"
      width={100}
      height={100}
    />
  </Item>

  <Item>
    <Plane
      color="blue"
      width={100}
      height={100}
    />
  </Item>
</Root>
