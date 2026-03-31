<script lang="ts">
  import { T } from '@threlte/core'
  import { BoxGeometry, MeshBasicMaterial } from 'three'
  import type { IntersectionEvent } from '../../types.js'

  type Handler = (event: IntersectionEvent<PointerEvent>) => void

  let {
    onpointerdownFront,
    onpointerdownBack,
    onpointeroverFront,
    onpointeroverBack,
    onpointeroutFront,
    onpointeroutBack,
    onpointerenterFront,
    onpointerenterBack,
    onpointerleaveFront,
    onpointerleaveBack,
    onpointermoveFront,
    onpointermoveBack,
  }: {
    onpointerdownFront?: Handler
    onpointerdownBack?: Handler
    onpointeroverFront?: Handler
    onpointeroverBack?: Handler
    onpointeroutFront?: Handler
    onpointeroutBack?: Handler
    onpointerenterFront?: Handler
    onpointerenterBack?: Handler
    onpointerleaveFront?: Handler
    onpointerleaveBack?: Handler
    onpointermoveFront?: Handler
    onpointermoveBack?: Handler
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
  Two meshes at the same screen position but different depths.
  A centered ray hits both. Front is nearer to the camera.
-->
<T.Mesh
  name="Front"
  {geometry}
  {material}
  position.z={-3}
  onpointerdown={onpointerdownFront}
  onpointerover={onpointeroverFront}
  onpointerout={onpointeroutFront}
  onpointerenter={onpointerenterFront}
  onpointerleave={onpointerleaveFront}
  onpointermove={onpointermoveFront}
/>

<T.Mesh
  name="Back"
  {geometry}
  {material}
  position.z={-7}
  onpointerdown={onpointerdownBack}
  onpointerover={onpointeroverBack}
  onpointerout={onpointeroutBack}
  onpointerenter={onpointerenterBack}
  onpointerleave={onpointerleaveBack}
  onpointermove={onpointermoveBack}
/>
