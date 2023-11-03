<script lang='ts'>
  import { Vector3, QuadraticBezierCurve3, type XRTargetRaySpace } from 'three'
  import { Line2 } from 'three/examples/jsm/lines/Line2'
  import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
  import { T, useFrame } from '@threlte/core'
  import { handContext } from '../../plugins/teleportControls'

  export let handedness: 'left' | 'right'
  export let targetRay: XRTargetRaySpace

  let lineGeometry = new LineGeometry()

  const rayStart = new Vector3()
  const rayMidpoint = new Vector3()
  const curve = new QuadraticBezierCurve3()
  const rayDivisions = 40
  const positions = new Float32Array(rayDivisions * 3)
  const vec3 = new Vector3()

  $: teleportSurface = handContext[handedness].hovered
  $: intersectionPoint = $teleportSurface?.point

  const setRayMidpoint = (end: Vector3) => {
    rayMidpoint.x = (rayStart.x + end.x) / 2
    rayMidpoint.y = (rayStart.y + end.y) / 2
    rayMidpoint.z = (rayStart.z + end.z) / 2
  }

  const { start, stop } = useFrame(() => {
    targetRay.getWorldPosition(rayStart)

    setRayMidpoint(intersectionPoint!)

    // Create an arc
    rayMidpoint.y += 0.8

    curve.v0.lerp(rayStart, 0.3)
    curve.v1.lerp(rayMidpoint, 0.3)
    curve.v2.lerp(intersectionPoint!, 0.3)

    for (let i = 0, j = 0; i < rayDivisions; i += 1, j += 3) {
      const t = i / rayDivisions
      curve.getPoint(t, vec3)
      positions[j + 0] = vec3.x
      positions[j + 1] = vec3.y
      positions[j + 2] = vec3.z
    }

    lineGeometry.setPositions(positions)
  }, { autostart: false })

  $: if (intersectionPoint === undefined) {
    stop()
  } else {
    start()
  }

</script>

<slot name='teleport-ray'>
  <T is={Line2}
    {...$$restProps}
    position.z={-0.01}
  >
    <T is={lineGeometry} />
    <T is={LineMaterial} linewidth={0.004} />
  </T>
</slot>
