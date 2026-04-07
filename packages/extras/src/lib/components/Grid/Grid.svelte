<!-- Credits to Fyrestar for the https://github.com/Fyrestar/THREE.InfiniteGridHelper  -->
<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { Color, DoubleSide, Plane, Vector3, Mesh, type ShaderMaterial, type Uniform } from 'three'
  import type { GridProps } from './types.js'
  import { fragmentShader, vertexShader } from './gridShaders.js'

  let {
    cellColor = '#000000',
    sectionColor = '#0000ee',
    cellSize = 1,
    backgroundColor = '#dadada',
    backgroundOpacity = 0,
    sectionSize = 10,
    plane = 'xz',
    gridSize = [20, 20],
    followCamera = false,
    infiniteGrid = false,
    fadeDistance = 100,
    fadeStrength = 1,
    fadeOrigin = undefined,
    cellThickness = 1,
    sectionThickness = 2,
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
  const upVector = new Vector3(0, 1, 0)
  const zeroVector = new Vector3(0, 0, 0)

  const axisToInt = {
    x: 0,
    y: 1,
    z: 2
  } as const

  const planeToAxes = {
    xz: 'xzy',
    xy: 'xyz',
    zy: 'zyx'
  } as const

  const gridType = {
    grid: 0,
    lines: 1,
    circular: 2,
    polar: 3
  } as const

  const uniforms = {
    cellSize: {
      value: cellSize
    },
    sectionSize: {
      value: sectionSize
    },
    cellColor: {
      value: new Color(cellColor)
    },
    sectionColor: {
      value: new Color(sectionColor)
    },
    backgroundColor: {
      value: new Color(backgroundColor)
    },
    backgroundOpacity: {
      value: backgroundOpacity
    },
    fadeDistance: {
      value: fadeDistance
    },
    fadeStrength: {
      value: fadeStrength
    },
    fadeOrigin: {
      value: new Vector3()
    },
    cellThickness: {
      value: cellThickness
    },
    sectionThickness: {
      value: sectionThickness
    },
    infiniteGrid: {
      value: infiniteGrid
    },
    followCamera: {
      value: followCamera
    },
    coord0: {
      value: 0
    },
    coord1: {
      value: 2
    },
    coord2: {
      value: 1
    },
    gridType: {
      value: gridType.grid as number
    },
    lineGridCoord: {
      value: axisToInt[axis as 'x' | 'y' | 'z']
    },
    circleGridMaxRadius: {
      value: maxRadius
    },
    polarCellDividers: {
      value: cellDividers
    },
    polarSectionDividers: {
      value: sectionDividers
    },
    worldCamProjPosition: {
      value: new Vector3()
    },
    worldPlanePosition: {
      value: new Vector3()
    }
  }

  $effect.pre(() => {
    // convert axis string to int indexes xzy = [0,2,1]
    const axes = planeToAxes[plane]
    const c0 = axes.charAt(0) as 'x' | 'y' | 'z'
    const c1 = axes.charAt(1) as 'x' | 'y' | 'z'
    const c2 = axes.charAt(2) as 'x' | 'y' | 'z'
    uniforms.coord0.value = axisToInt[c0]
    uniforms.coord1.value = axisToInt[c1]
    uniforms.coord2.value = axisToInt[c2]
    invalidate()
  })

  $effect.pre(() => {
    uniforms.cellSize.value = cellSize
    invalidate()
  })
  $effect.pre(() => {
    uniforms.sectionSize.value = sectionSize
    invalidate()
  })
  $effect.pre(() => {
    uniforms.cellColor.value.set(cellColor)
    invalidate()
  })
  $effect.pre(() => {
    uniforms.sectionColor.value.set(sectionColor)
    invalidate()
  })
  $effect.pre(() => {
    uniforms.backgroundColor.value.set(backgroundColor)
    invalidate()
  })
  $effect.pre(() => {
    uniforms.backgroundOpacity.value = backgroundOpacity
    invalidate()
  })
  $effect.pre(() => {
    uniforms.fadeDistance.value = fadeDistance
    invalidate()
  })
  $effect.pre(() => {
    uniforms.fadeStrength.value = fadeStrength
    invalidate()
  })
  $effect.pre(() => {
    if (fadeOrigin) {
      uniforms.fadeOrigin.value = fadeOrigin
      invalidate()
    }
  })
  $effect.pre(() => {
    uniforms.cellThickness.value = cellThickness
    invalidate()
  })
  $effect.pre(() => {
    uniforms.sectionThickness.value = sectionThickness
    invalidate()
  })
  $effect.pre(() => {
    uniforms.followCamera.value = followCamera
    invalidate()
  })
  $effect.pre(() => {
    uniforms.infiniteGrid.value = infiniteGrid
    invalidate()
  })

  $effect.pre(() => {
    switch (type) {
      case 'grid': {
        uniforms.gridType.value = gridType.grid
        break
      }
      case 'lines': {
        uniforms.gridType.value = gridType.lines
        uniforms.lineGridCoord.value = axisToInt[axis as 'x' | 'y' | 'z']
        break
      }
      case 'circular': {
        uniforms.gridType.value = gridType.circular
        uniforms.circleGridMaxRadius.value = maxRadius
        break
      }
      case 'polar': {
        uniforms.gridType.value = gridType.polar
        uniforms.circleGridMaxRadius.value = maxRadius
        uniforms.polarCellDividers.value = cellDividers
        uniforms.polarSectionDividers.value = sectionDividers
        break
      }
    }
    invalidate()
  })

  useTask(
    () => {
      gridPlane.setFromNormalAndCoplanarPoint(upVector, zeroVector).applyMatrix4(mesh.matrixWorld)

      const material = mesh.material as ShaderMaterial
      const worldCamProjPosition = material.uniforms.worldCamProjPosition as Uniform<Vector3>
      const worldPlanePosition = material.uniforms.worldPlanePosition as Uniform<Vector3>
      const uFadeOrigin = material.uniforms.fadeOrigin as Uniform<Vector3>

      const projectedPoint = gridPlane.projectPoint(
        camera.current.position,
        worldCamProjPosition.value
      )
      if (!fadeOrigin) {
        uFadeOrigin.value = projectedPoint
      }
      worldPlanePosition.value.set(0, 0, 0).applyMatrix4(mesh.matrixWorld)
    },
    { autoInvalidate: false }
  )
</script>

<T
  is={mesh}
  bind:ref
  frustumCulled={false}
  {...props}
>
  <T.ShaderMaterial
    {fragmentShader}
    {vertexShader}
    {uniforms}
    transparent
    {side}
  />
  {#if children}
    {@render children({ ref: mesh })}
  {:else}
    <T.PlaneGeometry args={typeof gridSize == 'number' ? [gridSize, gridSize] : gridSize} />
  {/if}
</T>
