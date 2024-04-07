<!-- Credits to Fyrestar for the https://github.com/Fyrestar/THREE.InfiniteGridHelper  -->
<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { Color, DoubleSide, Plane, Vector3, Mesh, type ShaderMaterial, type Uniform } from 'three'
  import type { GridEvents, GridProps, GridSlots } from './Grid.svelte'
  import { fragmentShader, vertexShader } from './gridShaders'

  type $$Props = Required<GridProps>
  type $$Events = GridEvents
  type $$Slots = GridSlots

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
    cellThickness = 1,
    sectionThickness = 2,
    side = DoubleSide,
    type = 'grid',
    axis = 'x',
    maxRadius = 0,
    cellDividers = 6,
    sectionDividers = 2,
    ref = $bindable(),
    ...props
  }: GridProps & { ref: Mesh } = $props()

  ref = new Mesh()

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
  })

  $effect.pre(() => {
    uniforms.cellSize.value = cellSize
  })
  $effect.pre(() => {
    uniforms.sectionSize.value = sectionSize
  })
  $effect.pre(() => {
    uniforms.cellColor.value.set(cellColor)
  })
  $effect.pre(() => {
    uniforms.sectionColor.value.set(sectionColor)
  })
  $effect.pre(() => {
    uniforms.backgroundColor.value.set(backgroundColor)
  })
  $effect.pre(() => {
    uniforms.backgroundOpacity.value = backgroundOpacity
  })
  $effect.pre(() => {
    uniforms.fadeDistance.value = fadeDistance
  })
  $effect.pre(() => {
    uniforms.fadeStrength.value = fadeStrength
  })
  $effect.pre(() => {
    uniforms.cellThickness.value = cellThickness
  })
  $effect.pre(() => {
    uniforms.sectionThickness.value = sectionThickness
  })
  $effect.pre(() => {
    uniforms.followCamera.value = followCamera
  })
  $effect.pre(() => {
    uniforms.infiniteGrid.value = infiniteGrid
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

  useTask(() => {
    gridPlane.setFromNormalAndCoplanarPoint(upVector, zeroVector).applyMatrix4(ref.matrixWorld)

    const material = ref.material as ShaderMaterial
    const worldCamProjPosition = material.uniforms.worldCamProjPosition as Uniform<Vector3>
    const worldPlanePosition = material.uniforms.worldPlanePosition as Uniform<Vector3>

    gridPlane.projectPoint(camera.current.position, worldCamProjPosition.value)
    worldPlanePosition.value.set(0, 0, 0).applyMatrix4(ref.matrixWorld)
    invalidate()
  })
</script>

<T
  is={ref}
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
  <slot {ref}>
    <T.PlaneGeometry args={typeof gridSize == 'number' ? [gridSize, gridSize] : gridSize} />
  </slot>
</T>
