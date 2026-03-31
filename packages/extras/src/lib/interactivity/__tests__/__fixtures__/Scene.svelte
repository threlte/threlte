<script lang="ts">
  import { T } from '@threlte/core'
  import { useInteractivity } from '../../context.js'
  import { BoxGeometry, MeshBasicMaterial } from 'three'
  import type { IntersectionEvent } from '../../types.js'

  type Handler = (event: IntersectionEvent<PointerEvent>) => void
  type WheelHandler = (event: IntersectionEvent<WheelEvent>) => void
  type ClickHandler = (event: IntersectionEvent<MouseEvent>) => void
  type MissHandler = (event: MouseEvent) => void

  let {
    onclickA,
    onclickB,
    oncontextmenuA,
    ondblclickA,
    onwheelA,
    onpointerdownA,
    onpointerupA,
    onpointeroverA,
    onpointeroutA,
    onpointerenterA,
    onpointerleaveA,
    onpointermoveA,
    onpointermissedA,
    onpointeroverB,
    onpointeroutB,
    onpointerenterB,
    onpointerleaveB,
    onpointermoveB,
    onpointermissedB,
    onpointermissedC,
    clickTimeThreshold,
    clickDistanceThreshold
  }: {
    onclickA?: ClickHandler
    onclickB?: ClickHandler
    oncontextmenuA?: ClickHandler
    ondblclickA?: ClickHandler
    onwheelA?: WheelHandler
    onpointerdownA?: Handler
    onpointerupA?: Handler
    onpointeroverA?: Handler
    onpointeroutA?: Handler
    onpointerenterA?: Handler
    onpointerleaveA?: Handler
    onpointermoveA?: Handler
    onpointermissedA?: MissHandler
    onpointeroverB?: Handler
    onpointeroutB?: Handler
    onpointerenterB?: Handler
    onpointerleaveB?: Handler
    onpointermoveB?: Handler
    onpointermissedB?: MissHandler
    onpointermissedC?: MissHandler
    clickTimeThreshold?: number
    clickDistanceThreshold?: number
  } = $props()

  const ctx = useInteractivity()

  $effect.pre(() => {
    if (clickTimeThreshold !== undefined) ctx.clickTimeThreshold = clickTimeThreshold
    if (clickDistanceThreshold !== undefined) ctx.clickDistanceThreshold = clickDistanceThreshold
  })

  const geometry = new BoxGeometry(2, 2, 2)
  const material = new MeshBasicMaterial()
</script>

<!-- Camera with valid aspect ratio so raycasting works in tests -->
<T.PerspectiveCamera
  makeDefault
  args={[75, 1, 0.1, 1000]}
  position.z={0}
/>

<!-- A: centered at z=-5, directly in front of the camera -->
<T.Mesh
  name="A"
  {geometry}
  {material}
  position.z={-5}
  onclick={onclickA}
  oncontextmenu={oncontextmenuA}
  ondblclick={ondblclickA}
  onwheel={onwheelA}
  onpointerdown={onpointerdownA}
  onpointerup={onpointerupA}
  onpointerover={onpointeroverA}
  onpointerout={onpointeroutA}
  onpointerenter={onpointerenterA}
  onpointerleave={onpointerleaveA}
  onpointermove={onpointermoveA}
  onpointermissed={onpointermissedA}
/>

<!-- B: offset to the right, won't be hit by a centered ray -->
<T.Mesh
  name="B"
  {geometry}
  {material}
  position={[10, 0, -5]}
  onclick={onclickB}
  onpointerover={onpointeroverB}
  onpointerout={onpointeroutB}
  onpointerenter={onpointerenterB}
  onpointerleave={onpointerleaveB}
  onpointermove={onpointermoveB}
  onpointermissed={onpointermissedB}
/>

<!-- C: offset to the left, no click handler — only pointermissed -->
<T.Mesh
  name="C"
  {geometry}
  {material}
  position={[-10, 0, -5]}
  onpointermissed={onpointermissedC}
/>
