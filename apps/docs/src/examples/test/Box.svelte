<script lang="ts">
  import { forwardEventHandlers, T } from '@threlte/core'
  import { useCursor } from '@threlte/extras'
  import { spring } from 'svelte/motion'

  let color = 'blue'

  const scale = spring(1)
  const component = forwardEventHandlers()

  const { onPointerEnter, onPointerLeave } = useCursor()
</script>

<T.Group
  scale={$scale}
  {...$$restProps}
  bind:this={$component}
>
  <T.Mesh
    position.y={0.5}
    on:pointerenter={onPointerEnter}
    on:pointerleave={onPointerLeave}
    on:pointerenter={() => {
      $scale = 2
      color = 'red'
    }}
    on:pointerleave={() => {
      $scale = 1
      color = 'blue'
    }}
  >
    <T.BoxGeometry />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>
</T.Group>
