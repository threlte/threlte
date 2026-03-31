<script lang="ts">
  import { T } from '@threlte/core'
  import { BoxGeometry, MeshBasicMaterial } from 'three'
  import type { IntersectionEvent } from '../../types.js'

  type Handler = (event: IntersectionEvent<PointerEvent>) => void

  let {
    onpointerdownChild,
    onpointerdownParent,
    onpointeroverChild,
    onpointeroverParent,
    onpointeroutChild,
    onpointeroutParent,
    onpointerleaveChild,
    onpointerleaveParent,
    onpointerenterChild,
    onpointerenterParent,
  }: {
    onpointerdownChild?: Handler
    onpointerdownParent?: Handler
    onpointeroverChild?: Handler
    onpointeroverParent?: Handler
    onpointeroutChild?: Handler
    onpointeroutParent?: Handler
    onpointerleaveChild?: Handler
    onpointerleaveParent?: Handler
    onpointerenterChild?: Handler
    onpointerenterParent?: Handler
  } = $props()

  const geometry = new BoxGeometry(2, 2, 2)
  const material = new MeshBasicMaterial()
</script>

<T.PerspectiveCamera
  makeDefault
  args={[75, 1, 0.1, 1000]}
  position.z={0}
/>

<!--
  Parent Group with event handlers wrapping a child Mesh.
  A ray hitting the child will bubble up to the parent in the hits list.
  This lets us test stopPropagation preventing the parent from receiving events.
-->
<T.Group
  name="Parent"
  onpointerdown={onpointerdownParent}
  onpointerover={onpointeroverParent}
  onpointerout={onpointeroutParent}
  onpointerleave={onpointerleaveParent}
  onpointerenter={onpointerenterParent}
>
  <T.Mesh
    name="Child"
    {geometry}
    {material}
    position.z={-5}
    onpointerdown={onpointerdownChild}
    onpointerover={onpointeroverChild}
    onpointerout={onpointeroutChild}
    onpointerleave={onpointerleaveChild}
    onpointerenter={onpointerenterChild}
  />
</T.Group>
