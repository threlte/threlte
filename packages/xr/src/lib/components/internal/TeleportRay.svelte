<script lang="ts">
  import { Vector3, QuadraticBezierCurve3, type XRTargetRaySpace, Vector2 } from 'three'
  import { Line2 } from 'three/examples/jsm/lines/Line2.js'
  import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
  import { T, useTask } from '@threlte/core'
  import { teleportIntersection } from '../../internal/stores'
  import type { Snippet } from 'svelte'

  interface Props {
    handedness: 'left' | 'right'
    targetRay: XRTargetRaySpace
    children?: Snippet
  }

  let { handedness, targetRay, children }: Props = $props()

  let lineGeometry = new LineGeometry()

  const rayStart = new Vector3()
  const rayMidpoint = new Vector3()
  const curve = new QuadraticBezierCurve3()
  const rayDivisions = 40
  const positions = new Float32Array(rayDivisions * 3)
  const vec3 = new Vector3()

  const v2_1 = new Vector2()
  const v2_2 = new Vector2()

  let intersection = $derived(teleportIntersection[handedness])

  const setCurvePoints = (alpha = 0.3) => {
    if (intersection.current === undefined) return

    const rayEnd = intersection.current.point
    targetRay.getWorldPosition(rayStart)

    rayMidpoint.x = (rayStart.x + rayEnd.x) / 2
    rayMidpoint.y = (rayStart.y + rayEnd.y) / 2
    rayMidpoint.z = (rayStart.z + rayEnd.z) / 2

    const arc = Math.log1p(
      v2_1.set(rayStart.x, rayStart.z).distanceTo(v2_2.set(rayEnd.x, rayEnd.z))
    )

    // Create an arc
    rayMidpoint.y += arc

    curve.v0.lerp(rayStart, alpha)
    curve.v1.lerp(rayMidpoint, alpha)
    curve.v2.lerp(rayEnd, alpha)

    for (let i = 0, j = 0; i < rayDivisions; i += 1, j += 3) {
      const t = i / rayDivisions
      curve.getPoint(t, vec3)
      positions[j + 0] = vec3.x
      positions[j + 1] = vec3.y
      positions[j + 2] = vec3.z
    }

    lineGeometry.setPositions(positions)
  }

  const { start, stop } = useTask(
    () => {
      setCurvePoints()
    },
    { autoStart: false }
  )

  $effect.pre(() => {
    if ($intersection === undefined) {
      stop()
    } else {
      setCurvePoints(1)
      start()
    }
  })
</script>

{#if children}
  {@render children()}
{:else}
  <T
    is={Line2}
    visible={$intersection !== undefined}
    position.z={-0.01}
  >
    <T is={lineGeometry} />
    <T
      is={LineMaterial}
      linewidth={3}
    />
  </T>
{/if}
