<!-- Credits to Fyrestar for the https://github.com/Fyrestar/THREE.InfiniteGridHelper  -->
<script lang="ts">
  import { T, forwardEventHandlers, useTask, useThrelte } from '@threlte/core'
  import {
    Color,
    DoubleSide,
    Plane,
    Vector3,
    type Mesh,
    type ShaderMaterial,
    type Uniform
  } from 'three'
  import type { GridEvents, GridProps, GridSlots } from './Grid.svelte'
  import { fragmentShader, vertexShader } from './gridShaders'

  type $$Props = Required<GridProps>
  type $$Events = GridEvents
  type $$Slots = GridSlots

  export let cellColor: $$Props['cellColor'] = '#000000'
  export let sectionColor: $$Props['sectionColor'] = '#0000ee'
  export let cellSize: $$Props['cellSize'] = 1
  export let backgroundColor: $$Props['backgroundColor'] = '#dadada'
  export let backgroundOpacity: $$Props['backgroundOpacity'] = 0
  export let sectionSize: $$Props['sectionSize'] = 10
  export let plane: $$Props['plane'] = 'xz'
  export let gridSize: $$Props['gridSize'] = [20, 20]
  export let followCamera: $$Props['followCamera'] = false
  export let infiniteGrid: $$Props['infiniteGrid'] = false
  export let fadeDistance: $$Props['fadeDistance'] = 100
  export let fadeStrength: $$Props['fadeStrength'] = 1
  export let cellThickness: $$Props['cellThickness'] = 1
  export let sectionThickness: $$Props['sectionThickness'] = 2
  export let side: $$Props['side'] = DoubleSide

  export let type: $$Props['type'] = 'grid'
  export let axis: $$Props['axis'] = 'x'
  export let maxRadius: $$Props['maxRadius'] = 0
  export let cellDividers: $$Props['cellDividers'] = 6
  export let sectionDividers: $$Props['sectionDividers'] = 2

  // forward ref binding
  export let ref: Mesh

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

  $: {
    // convert axis string to int indexes xzy = [0,2,1]
    const axes = planeToAxes[plane]
    const c0 = axes.charAt(0) as 'x' | 'y' | 'z'
    const c1 = axes.charAt(1) as 'x' | 'y' | 'z'
    const c2 = axes.charAt(2) as 'x' | 'y' | 'z'
    uniforms.coord0.value = axisToInt[c0]
    uniforms.coord1.value = axisToInt[c1]
    uniforms.coord2.value = axisToInt[c2]
  }

  $: uniforms.cellSize.value = cellSize
  $: uniforms.sectionSize.value = sectionSize
  $: uniforms.cellColor.value.set(cellColor)
  $: uniforms.sectionColor.value.set(sectionColor)
  $: uniforms.backgroundColor.value.set(backgroundColor)
  $: uniforms.backgroundOpacity.value = backgroundOpacity
  $: uniforms.fadeDistance.value = fadeDistance
  $: uniforms.fadeStrength.value = fadeStrength
  $: uniforms.cellThickness.value = cellThickness
  $: uniforms.sectionThickness.value = sectionThickness
  $: uniforms.followCamera.value = followCamera
  $: uniforms.infiniteGrid.value = infiniteGrid

  $: {
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
  }

  useTask(() => {
    gridPlane.setFromNormalAndCoplanarPoint(upVector, zeroVector).applyMatrix4(ref.matrixWorld)

    const material = ref.material as ShaderMaterial
    const worldCamProjPosition = material.uniforms.worldCamProjPosition as Uniform<Vector3>
    const worldPlanePosition = material.uniforms.worldPlanePosition as Uniform<Vector3>

    gridPlane.projectPoint(camera.current.position, worldCamProjPosition.value)
    worldPlanePosition.value.set(0, 0, 0).applyMatrix4(ref.matrixWorld)
    invalidate()
  })

  const component = forwardEventHandlers()
</script>

<T.Mesh
  bind:this={$component}
  bind:ref
  frustumCulled={false}
  {...$$restProps}
  let:ref
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
</T.Mesh>
