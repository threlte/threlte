<script lang="ts">
  import { T } from '@threlte/core'
  import * as THREE from 'three'
  import { Line2 } from 'three/examples/jsm/lines/Line2.js'
  import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte.js'

  const { studioObjectRef } = useStudioObjectsRegistry()
  let axesHelper = $state(studioObjectRef<Line2>())

  interface Props {
    length?: number
    width?: number
    colors?: ('red' | 'green' | 'blue')[]
    opacity?: number
    overlay?: boolean
  }

  let {
    length = 1,
    width = 0.2,
    colors = ['red', 'green', 'blue'],
    opacity = 1,
    overlay = false
  }: Props = $props()

  const lineGeometry = new LineGeometry()
  const lineMaterial = $state(
    new LineMaterial({
      linewidth: width / 100,
      vertexColors: true,
      transparent: opacity < 1,
      opacity,
      ...(overlay ? { depthTest: false, depthWrite: false } : {})
    })
  )
  const line2 = new Line2(lineGeometry, lineMaterial)
  const color = new THREE.Color()

  $effect.pre(() => {
    const positions = new Float32Array(27)
    positions[3] = length
    positions[13] = length
    positions[23] = length
    lineGeometry.setPositions(positions)
    line2.computeLineDistances()
  })

  $effect.pre(() => {
    lineMaterial.linewidth = width / 100
  })

  $effect.pre(() => {
    const colorArray = new Float32Array(27)
    colors.forEach((axis, i) => {
      color.set(axis)
      for (let j = i * 9; j < i * 9 + 9; j += 3) {
        colorArray[j + 0] = color.r
        colorArray[j + 1] = color.g
        colorArray[j + 2] = color.b
      }
    })
    lineGeometry.setColors(colorArray)
  })
</script>

<T
  userData={{ ignoreOverrideMaterial: true }}
  is={line2}
  bind:ref={axesHelper.ref}
></T>
