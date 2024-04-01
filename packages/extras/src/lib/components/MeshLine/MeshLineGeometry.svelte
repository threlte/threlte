<script lang="ts">
  /*
    A stripped down version of THREE.MeshLine:
    https://github.com/spite/THREE.MeshLine/blob/master/src/THREE.MeshLine.js
    With peformance improvements inspired by:
    https://github.com/lume/three-meshline/blob/main/src/MeshLineGeometry.ts
	*/
  import type {
    MeshLineGeometryEvents,
    MeshLineGeometryProps,
    MeshLineGeometrySlots
  } from './MeshLineGeometry.svelte'
  import { T, useThrelte, forwardEventHandlers, useTask } from '@threlte/core'
  import { BufferGeometry, Vector3, BufferAttribute } from 'three'
  import { setXY, setXYZ, setXYZW } from './utils'

  type $$Props = Required<MeshLineGeometryProps>
  type $$Events = MeshLineGeometryEvents
  type $$Slots = MeshLineGeometrySlots

  export let points: $$Props['points'] = []
  export let shape: $$Props['none'] = 'none'
  export let shapeFunction: $$Props['selectFunction'] = (p: number) => 1

  let pointCount = points.length

  const { invalidate } = useThrelte()

  // When the component first runs we create the buffer geometry and allocate the buffer attributes
  let counters: number[] = []
  let counterIndex = 0
  let side: number[] = []
  let widthArray: number[] = []
  let doubleIndex = 0
  let uvArray: number[] = []
  let uvIndex = 0
  let indices: number[] = []
  let indicesIndex = 0

  if (shape === 'taper') {
    shapeFunction = (p: number) => 1 * Math.pow(4 * p * (1 - p), 1)
  }

  for (let j = 0; j < pointCount; j++) {
    const c = j / points.length
    counters[counterIndex + 0] = c
    counters[counterIndex + 1] = c
    counterIndex += 2

    setXY(side, doubleIndex, 1, -1)
    let width = shape === 'none' ? 1 : shapeFunction(j / (pointCount - 1))
    setXY(widthArray, doubleIndex, width, width)
    doubleIndex += 2

    setXYZW(uvArray, uvIndex, j / (pointCount - 1), 0, j / (pointCount - 1), 1)
    uvIndex += 4

    if (j < pointCount - 1) {
      const n = j * 2
      setXYZ(indices, indicesIndex, n + 0, n + 1, n + 2)
      setXYZ(indices, indicesIndex + 3, n + 2, n + 1, n + 3)
      indicesIndex += 6
    }
  }

  const geometry = new BufferGeometry()
  const positions = new BufferAttribute(new Float32Array(pointCount * 6), 3)
  const previous = new BufferAttribute(new Float32Array(pointCount * 6), 3)
  const next = new BufferAttribute(new Float32Array(pointCount * 6), 3)

  // create these buffer attributes at the correct length but leave them empty for now
  geometry.setAttribute('position', positions)
  geometry.setAttribute('previous', previous)
  geometry.setAttribute('next', next)

  // create and populate these buffer attributes
  geometry.setAttribute('counters', new BufferAttribute(new Float32Array(counters), 1))
  geometry.setAttribute('side', new BufferAttribute(new Float32Array(side), 1))
  geometry.setAttribute('width', new BufferAttribute(new Float32Array(widthArray), 1))
  geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvArray), 2))
  geometry.setIndex(new BufferAttribute(new Uint16Array(indices), 1))

  const setPoints = (points: Vector3[]) => {
    if (points.length === 0) return

    // The size of the buffer atributes cannot change, so return if the number of points has changed
    if (points.length != pointCount) return

    const positions = geometry.getAttribute('position') as BufferAttribute
    const previous = geometry.getAttribute('previous') as BufferAttribute
    const next = geometry.getAttribute('next') as BufferAttribute

    let positionIndex = 0
    let previousIndex = 0
    let nextIndex = 0

    previous.setXYZ(previousIndex, points[0].x, points[0].y, points[0].z)
    previousIndex += 1

    previous.setXYZ(previousIndex, points[0].x, points[0].y, points[0].z)
    previousIndex += 1

    for (let j = 0; j < pointCount; j++) {
      const p = points[j]

      positions.setXYZ(positionIndex, p.x, p.y, p.z)
      positionIndex += 1
      positions.setXYZ(positionIndex, p.x, p.y, p.z)
      positionIndex += 1

      if (j < pointCount - 1) {
        previous.setXYZ(previousIndex, p.x, p.y, p.z)
        previousIndex += 1

        previous.setXYZ(previousIndex, p.x, p.y, p.z)
        previousIndex += 1
      }
      if (j > 0 && j + 1 <= pointCount) {
        next.setXYZ(nextIndex, p.x, p.y, p.z)
        nextIndex += 1

        next.setXYZ(nextIndex, p.x, p.y, p.z)
        nextIndex += 1
      }
    }

    next.setXYZ(
      nextIndex,
      points[pointCount - 1].x,
      points[pointCount - 1].y,
      points[pointCount - 1].z
    )
    nextIndex += 1

    next.setXYZ(
      nextIndex,
      points[pointCount - 1].x,
      points[pointCount - 1].y,
      points[pointCount - 1].z
    )
    nextIndex += 1

    positions.needsUpdate = true
    previous.needsUpdate = true
    next.needsUpdate = true
    try {
      geometry.computeBoundingSphere()
    } catch {
      debugger
    }
    invalidate()
  }

  $: setPoints(points)

  useTask(() => {})

  const component = forwardEventHandlers()
</script>

<T
  is={geometry}
  bind:this={$component}
  {...$$restProps}
>
  <slot ref={geometry} />
</T>
