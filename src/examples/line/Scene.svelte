<script lang="ts">
  import {
    BufferGeometry,
    LineBasicMaterial,
    MeshBasicMaterial,
    SphereBufferGeometry,
    Vector3
  } from 'three'
  import { Line, Mesh, OrbitControls, PerspectiveCamera } from 'threlte'

  const material = new LineBasicMaterial({
    color: 0x0000ff
  })
  const points = [new Vector3(-5, 0, 0), new Vector3(0, 5, 0), new Vector3(5, 0, 0)]
  const geometry = new BufferGeometry().setFromPoints(points)

  let hoveringAt: Vector3 | undefined
</script>

<PerspectiveCamera position={{ y: 10, x: 10, z: 10 }}>
  <OrbitControls />
</PerspectiveCamera>

<Line
  {geometry}
  {material}
  interactive
  on:pointerenter={(e) => (hoveringAt = e.detail.point)}
  on:pointermove={(e) => (hoveringAt = e.detail.point)}
  on:pointerleave={() => (hoveringAt = undefined)}
/>

{#if hoveringAt}
  <Mesh
    ignorePointer
    position={hoveringAt}
    geometry={new SphereBufferGeometry(0.25, 36, 36)}
    material={new MeshBasicMaterial({
      color: 'red',
      depthTest: false
    })}
  />
{/if}
