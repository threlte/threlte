<script lang="ts">
  import { T } from '@threlte/core'
  import { BoxGeometry, MeshBasicMaterial } from 'three'

  let {
    onclickA = undefined,
    onclickB = undefined,
    onpointermissedA = undefined,
    onpointermissedB = undefined,
    onpointermissedC = undefined,
  }: {
    onclickA?: (e: any) => void
    onclickB?: (e: any) => void
    onpointermissedA?: (e: any) => void
    onpointermissedB?: (e: any) => void
    onpointermissedC?: (e: any) => void
  } = $props()

  const geometry = new BoxGeometry(2, 2, 2)
  const material = new MeshBasicMaterial()
</script>

<!-- Camera with valid aspect ratio so raycasting works in tests -->
<T.PerspectiveCamera makeDefault args={[75, 1, 0.1, 1000]} position.z={0} />

<!-- A: centered at z=-5, directly in front of the camera -->
<T.Mesh
  name="A"
  {geometry}
  {material}
  position.z={-5}
  onclick={onclickA}
  onpointermissed={onpointermissedA}
/>

<!-- B: offset to the right, won't be hit by a centered ray -->
<T.Mesh
  name="B"
  {geometry}
  {material}
  position={[10, 0, -5]}
  onclick={onclickB}
  onpointermissed={onpointermissedB}
/>

<!-- C: no click handler, only pointermissed -->
<T.Mesh
  name="C"
  {geometry}
  {material}
  position={[-10, 0, -5]}
  onpointermissed={onpointermissedC}
/>
