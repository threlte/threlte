<!-- Credits to Fyrestar for the https://github.com/Fyrestar/THREE.InfiniteGridHelper  -->
<script lang="ts">
  import { isInstanceOf, T, useTask, useThrelte } from '@threlte/core/webgpu'
  import { DoubleSide, Mesh, NodeMaterial, Plane, Vector3 } from 'three/webgpu'
  import type { GridProps } from '../types.js'
  import { createGridNodes, createGridUniforms } from './gridNodes.js'

  let {
    cellSize = 1,
    sectionSize = 10,
    cellColor = '#000000',
    sectionColor = '#0000ee',
    backgroundColor = '#dadada',
    backgroundOpacity = 0,
    fadeDistance = 100,
    fadeStrength = 1,
    cellThickness = 1,
    sectionThickness = 2,
    plane = 'xz',
    gridSize = [20, 20],
    followCamera = false,
    infiniteGrid = false,
    fadeOrigin,
    side = DoubleSide,
    type = 'grid',
    axis = 'x',
    maxRadius = 0,
    cellDividers = 6,
    sectionDividers = 2,
    ref = $bindable(),
    children,
    ...props
  }: GridProps = $props()

  const mesh = new Mesh()

  const { invalidate, camera } = useThrelte()

  const gridPlane = new Plane()
  const gridPlaneNormal = new Vector3(0, 1, 0)
  const zeroVector = new Vector3(0, 0, 0)

  const planeNormals = {
    xz: [0, 1, 0],
    xy: [0, 0, 1],
    zy: [1, 0, 0]
  } as const

  const uniforms = createGridUniforms()

  const material = new NodeMaterial()
  material.transparent = true

  // These props change the shape of the node graph rather than a uniform value,
  // so the material is rebuilt when any of them change.
  $effect(() => {
    const { positionNode, fragmentNode } = createGridNodes(uniforms, {
      plane,
      type,
      axis: axis as 'x' | 'y' | 'z',
      infiniteGrid,
      followCamera
    })

    material.positionNode = positionNode
    material.fragmentNode = fragmentNode
    material.needsUpdate = true
    invalidate()
  })

  $effect(() => {
    const normal = planeNormals[plane]
    gridPlaneNormal.set(normal[0], normal[1], normal[2])
    invalidate()
  })

  $effect(() => {
    uniforms.cellSize.value = cellSize
    invalidate()
  })
  $effect(() => {
    uniforms.sectionSize.value = sectionSize
    invalidate()
  })
  $effect(() => {
    uniforms.cellColor.value.set(cellColor)
    invalidate()
  })
  $effect(() => {
    uniforms.sectionColor.value.set(sectionColor)
    invalidate()
  })
  $effect(() => {
    uniforms.backgroundColor.value.set(backgroundColor)
    invalidate()
  })
  $effect(() => {
    uniforms.backgroundOpacity.value = backgroundOpacity
    invalidate()
  })
  $effect(() => {
    uniforms.fadeDistance.value = fadeDistance
    invalidate()
  })
  $effect(() => {
    uniforms.fadeStrength.value = fadeStrength
    invalidate()
  })
  $effect(() => {
    if (fadeOrigin) {
      if (isInstanceOf(fadeOrigin, 'Vector3')) {
        uniforms.fadeOrigin.value.copy(fadeOrigin)
      } else {
        uniforms.fadeOrigin.value.fromArray(fadeOrigin)
      }
    }
    invalidate()
  })
  $effect(() => {
    uniforms.cellThickness.value = cellThickness
    invalidate()
  })
  $effect(() => {
    uniforms.sectionThickness.value = sectionThickness
    invalidate()
  })
  $effect(() => {
    uniforms.maxRadius.value = maxRadius
    uniforms.cellDividers.value = cellDividers
    uniforms.sectionDividers.value = sectionDividers
    invalidate()
  })

  useTask(
    () => {
      gridPlane
        .setFromNormalAndCoplanarPoint(gridPlaneNormal, zeroVector)
        .applyMatrix4(mesh.matrixWorld)

      const projectedPoint = gridPlane.projectPoint(
        camera.current.position,
        uniforms.worldCamProjPosition.value
      )
      if (!fadeOrigin) {
        uniforms.fadeOrigin.value.copy(projectedPoint)
      }
      if (followCamera) {
        uniforms.worldPlanePosition.value.set(0, 0, 0).applyMatrix4(mesh.matrixWorld)
      }
    },
    { autoInvalidate: false, running: () => followCamera || !fadeOrigin }
  )
</script>

<T
  is={mesh}
  bind:ref
  frustumCulled={false}
  {...props}
>
  <T
    is={material}
    {side}
  />
  {#if children}
    {@render children({ ref: mesh })}
  {:else}
    <T.PlaneGeometry args={typeof gridSize == 'number' ? [gridSize, gridSize] : gridSize} />
  {/if}
</T>
