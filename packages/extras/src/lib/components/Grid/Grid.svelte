<!-- Credits to Fyrestar for the https://github.com/Fyrestar/THREE.InfiniteGridHelper  -->
<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { Color, DoubleSide, Plane, Uniform, Vector3, Mesh, type ShaderMaterial } from 'three'
  import type { GridProps } from './types.js'
  import { fragmentShader, vertexShader } from './gridShaders.js'

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
    fadeOrigin = undefined,
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

  const axisToInt = {
    x: 0,
    y: 1,
    z: 2
  } as const

  const planeConfig = {
    xz: { axes: 'xzy', normal: [0, 1, 0] },
    xy: { axes: 'xyz', normal: [0, 0, 1] },
    zy: { axes: 'zyx', normal: [1, 0, 0] }
  } as const

  const gridType = {
    grid: 0,
    lines: 1,
    circular: 2,
    polar: 3
  } as const

  const uniforms = {
    cellSize: new Uniform(1),
    sectionSize: new Uniform(10),
    cellColor: new Uniform(new Color('#000000')),
    sectionColor: new Uniform(new Color('#0000ee')),
    backgroundColor: new Uniform(new Color('#dadada')),
    backgroundOpacity: new Uniform(0),
    fadeDistance: new Uniform(100),
    fadeStrength: new Uniform(1),
    fadeOrigin: new Uniform(new Vector3()),
    cellThickness: new Uniform(1),
    sectionThickness: new Uniform(2),
    infiniteGrid: new Uniform(false),
    followCamera: new Uniform(false),
    coord0: new Uniform(0),
    coord1: new Uniform(2),
    coord2: new Uniform(1),
    gridType: new Uniform<number>(gridType.grid),
    lineGridCoord: new Uniform<number>(axisToInt.x),
    circleGridMaxRadius: new Uniform(0),
    polarCellDividers: new Uniform(6),
    polarSectionDividers: new Uniform(2),
    worldCamProjPosition: new Uniform(new Vector3()),
    worldPlanePosition: new Uniform(new Vector3())
  }

  $effect.pre(() => {
    // convert axis string to int indexes xzy = [0,2,1]
    const { axes, normal } = planeConfig[plane]
    const c0 = axes.charAt(0) as 'x' | 'y' | 'z'
    const c1 = axes.charAt(1) as 'x' | 'y' | 'z'
    const c2 = axes.charAt(2) as 'x' | 'y' | 'z'
    uniforms.coord0.value = axisToInt[c0]
    uniforms.coord1.value = axisToInt[c1]
    uniforms.coord2.value = axisToInt[c2]
    gridPlaneNormal.set(normal[0], normal[1], normal[2])
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
    }
    invalidate()
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
    uniforms.gridType.value = gridType[type]
    uniforms.lineGridCoord.value = axisToInt[axis as 'x' | 'y' | 'z']
    uniforms.circleGridMaxRadius.value = maxRadius
    uniforms.polarCellDividers.value = cellDividers
    uniforms.polarSectionDividers.value = sectionDividers
    invalidate()
  })

  useTask(
    () => {
      gridPlane
        .setFromNormalAndCoplanarPoint(gridPlaneNormal, zeroVector)
        .applyMatrix4(mesh.matrixWorld)

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
      if (followCamera) {
        worldPlanePosition.value.set(0, 0, 0).applyMatrix4(mesh.matrixWorld)
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
