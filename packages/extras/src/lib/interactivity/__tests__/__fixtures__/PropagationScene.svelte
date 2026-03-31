<script lang="ts">
  import { T } from '@threlte/core'
  import { BoxGeometry, MeshBasicMaterial } from 'three'
  import type { IntersectionEvent } from '../../types.js'

  type Handler = (event: IntersectionEvent<PointerEvent>) => void

  interface Props {
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
  }

  let { ...props }: Props = $props()

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
  onpointerdown={props.onpointerdownParent}
  onpointerover={props.onpointeroverParent}
  onpointerout={props.onpointeroutParent}
  onpointerleave={props.onpointerleaveParent}
  onpointerenter={props.onpointerenterParent}
>
  <T.Mesh
    name="Child"
    {geometry}
    {material}
    position.z={-5}
    onpointerdown={props.onpointerdownChild}
    onpointerover={props.onpointeroverChild}
    onpointerout={props.onpointeroutChild}
    onpointerleave={props.onpointerleaveChild}
    onpointerenter={props.onpointerenterChild}
  />
</T.Group>
