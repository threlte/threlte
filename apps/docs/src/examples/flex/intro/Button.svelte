<script lang="ts">
  import { T } from '@threlte/core'
  import { RoundedBoxGeometry, useCursor } from '@threlte/extras'
  import { Box } from '@threlte/flex'
  import Label from './Label.svelte'

  let _class: string
  export { _class as class }
  export let z = 0
  export let text = ''
  export let order: number | undefined = undefined
  export let onClick: () => void

  const { hovering, onPointerEnter, onPointerLeave } = useCursor()
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
        onClick()
      }}
      onpointerenter={onPointerEnter}
      onpointerleave={onPointerLeave}
    >
      <RoundedBoxGeometry
        args={[width, height, 10]}
        radius={5}
      />
      <T.MeshBasicMaterial color={$hovering ? '#9D9FA3' : '#404550'} />

      <Label
        z={5.1}
        fontSize="xl"
        {text}
      />
    </T.Mesh>
  {/snippet}
</Box>
