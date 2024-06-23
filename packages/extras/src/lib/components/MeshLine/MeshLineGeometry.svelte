<script lang="ts">
  /*
    A stripped down version of THREE.MeshLine:
    https://github.com/spite/THREE.MeshLine/blob/master/src/THREE.MeshLine.js
    With peformance improvements inspired by:
    https://github.com/lume/three-meshline/blob/main/src/MeshLineGeometry.ts
	*/
  import type { MeshLineGeometryProps } from './MeshLineGeometry.svelte'
  import { T, useThrelte } from '@threlte/core'
  import { BufferGeometry, Vector3, BufferAttribute } from 'three'

  let {
    points = [],
    shape = 'none',
    shapeFunction = (_p: number) => 1,
    ref = $bindable(),
    children,
    props
  }: MeshLineGeometryProps = $props()

  let pointCount = points.length

  const { invalidate } = useThrelte()

  const positions = new BufferAttribute(new Float32Array(pointCount * 6), 3)
  const previous = new BufferAttribute(new Float32Array(pointCount * 6), 3)
  const next = new BufferAttribute(new Float32Array(pointCount * 6), 3)

  const counters = new BufferAttribute(new Float32Array(pointCount * 2), 1)
  const side = new BufferAttribute(new Float32Array(pointCount * 2), 1)
  const width = new BufferAttribute(new Float32Array(pointCount * 2), 1)
  const uv = new BufferAttribute(new Float32Array(pointCount * 4), 2)
  const indices = new BufferAttribute(new Uint16Array(pointCount * 6), 1)

  if (shape === 'taper') {
    shapeFunction = (p: number) => 1 * Math.pow(4 * p * (1 - p), 1)
  }

  for (let i = 0, i2 = 0, i3 = 0, i4 = 0; i < pointCount; i += 1, i2 += 2, i3 += 4, i4 += 6) {
    counters.setX(i2, i / points.length)
    counters.setX(i2 + 1, i / points.length)

    side.setX(i2, 1)
    side.setX(i2 + 1, -1)

  const w = shape === 'none' ? 1 : shapeFunction(i / (pointCount - 1))
    width.setX(i2, w)
    width.setX(i2 + 1, w)

    uv.setXYZW(i3, i / (pointCount - 1), 0, i / (pointCount - 1), 1)

    if (i < pointCount - 1) {
      const n = i * 2
      indices.setX(i4 + 0, n + 0)
      indices.setX(i4 + 1, n + 1)
      indices.setX(i4 + 2, n + 2)
      indices.setX(i4 + 3, n + 2)
      indices.setX(i4 + 4, n + 1)
      indices.setX(i4 + 5, n + 3)
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', positions)
  geometry.setAttribute('previous', previous)
  geometry.setAttribute('next', next)
  geometry.setAttribute('counters', counters)
  geometry.setAttribute('side', side)
  geometry.setAttribute('width', width)
  geometry.setAttribute('uv', uv)
  geometry.setIndex(indices)

  const setPoints = (points: Vector3[]) => {
    if (points.length === 0) return

    // The size of the buffer atributes cannot change, so return if the number of points has changed
    if (points.length !== pointCount) return

    let positionIndex = 0
    let previousIndex = 0
    let nextIndex = 0

    const p1 = points[0]
    previous.setXYZ(previousIndex, p1.x, p1.y, p1.z)
    previousIndex += 1

    previous.setXYZ(previousIndex, p1.x, p1.y, p1.z)
    previousIndex += 1

    for (let i = 0; i < pointCount; i++) {
      const p = points[i]

      positions.setXYZ(positionIndex, p.x, p.y, p.z)
      positionIndex += 1
      positions.setXYZ(positionIndex, p.x, p.y, p.z)
      positionIndex += 1

      if (i < pointCount - 1) {
        previous.setXYZ(previousIndex, p.x, p.y, p.z)
        previousIndex += 1

        previous.setXYZ(previousIndex, p.x, p.y, p.z)
        previousIndex += 1
      }

      if (i > 0 && i + 1 <= pointCount) {
        next.setXYZ(nextIndex, p.x, p.y, p.z)
        nextIndex += 1

        next.setXYZ(nextIndex, p.x, p.y, p.z)
        nextIndex += 1
      }
    }

    const p2 = points[pointCount - 1]
    next.setXYZ(nextIndex, p2.x, p2.y, p2.z)
    nextIndex += 1

    next.setXYZ(nextIndex, p2.x, p2.y, p2.z)
    nextIndex += 1

    positions.needsUpdate = true
    previous.needsUpdate = true
    next.needsUpdate = true
    geometry.computeBoundingSphere()
    invalidate()
  }

  $effect.pre(() => setPoints(points))
</script>

<T
  is={geometry}
  bind:ref
  {...props}
>
  {@render children?.({ ref: geometry })}
</T>
