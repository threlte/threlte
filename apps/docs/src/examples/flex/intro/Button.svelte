<script lang="ts">
  import { T } from '@threlte/core'
  import { RoundedBoxGeometry, Hovering } from '@threlte/extras'
  import { Box } from '@threlte/flex'
  import Label from './Label.svelte'

  type Props = {
    class: string
    text: string
    order?: number
    onclick?: () => void
    z?: number
  }

  const { class: _class, text = '', z = 0, order, onclick }: Props = $props()

  const hovering = new Hovering()

  const color = $derived(hovering.current ? '#9D9FA3' : '#404550')
</script>

<Box
  class={_class}
  {order}
>
  {#snippet children({ width, height })}
    <T.Mesh
      position.z={z}
      onclick={(event) => {
        event.stopPropagation()
        onclick?.()
      }}
      onpointerenter={() => {
        hovering.current = true
      }}
      onpointerleave={() => {
        hovering.current = false
      }}
    >
      <RoundedBoxGeometry
        args={[width, height, 10]}
        radius={5}
      />
      <T.MeshBasicMaterial {color} />

      <Label
        {z}
        fontSize="xl"
        {text}
      />
    </T.Mesh>
  {/snippet}
</Box>
