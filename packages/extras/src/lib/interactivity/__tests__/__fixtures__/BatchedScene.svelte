<script lang="ts">
  import { T } from '@threlte/core'
  import { BatchedMesh, BoxGeometry, Matrix4, MeshBasicMaterial } from 'three'
  import type { IntersectionEvent } from '../../types.js'

  type Handler = (event: IntersectionEvent<PointerEvent>) => void

  let {
    ...props
  }: {
    onpointerenter?: Handler
    onpointerleave?: Handler
    onpointerover?: Handler
    onpointerout?: Handler
    onpointermove?: Handler
  } = $props()

  const geometry = new BoxGeometry(2, 2, 2)
  const material = new MeshBasicMaterial()

  // Two instances of one geometry in a single batch, far enough apart that a
  // centered ray hits the first and an offset ray hits the second.
  const batchedMesh = new BatchedMesh(2, 1024, 4096, material)
  const geometryId = batchedMesh.addGeometry(geometry)

  const left = batchedMesh.addInstance(geometryId)
  const right = batchedMesh.addInstance(geometryId)

  batchedMesh.setMatrixAt(left, new Matrix4().makeTranslation(-2, 0, -10))
  batchedMesh.setMatrixAt(right, new Matrix4().makeTranslation(2, 0, -10))
</script>

<T.PerspectiveCamera
  makeDefault
  args={[75, 1, 0.1, 1000]}
  position.z={0}
/>

<T
  is={batchedMesh}
  onpointerenter={props.onpointerenter}
  onpointerleave={props.onpointerleave}
  onpointerover={props.onpointerover}
  onpointerout={props.onpointerout}
  onpointermove={props.onpointermove}
/>
