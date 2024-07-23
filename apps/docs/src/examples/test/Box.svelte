<script lang="ts">
  import { T } from '@threlte/core'
  import { useCursor } from '@threlte/extras'
  import { spring } from 'svelte/motion'

  let { ...props } = $props()

  let color = $state('white')

  const scale = spring(1)

  const { onPointerEnter, onPointerLeave } = useCursor()
</script>

<T.Group
  scale={$scale}
  {...props}
>
  <T.Mesh
    position.y={0.5}
    onpointerenter={() => {
      $scale = 2
      color = '#FE3D00'
      onPointerEnter()
    }}
    onpointerleave={() => {
      $scale = 1
      color = 'white'
      onPointerLeave()
    }}
  >
    <T.BoxGeometry />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>
</T.Group>
