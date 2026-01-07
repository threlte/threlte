<!-- Credits to Fyrestar for the https://github.com/Fyrestar/THREE.InfiniteGridHelper  -->
<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { Color, DoubleSide, Plane, Vector3, Mesh } from 'three'
  import {
    uniform,
    vec2,
    vec3,
    vec4,
    float,
    positionLocal,
    abs,
    fract,
    fwidth,
    min,
    max,
    length,
    pow,
    mix,
    Fn,
    output,
    atan
  } from 'three/tsl'
  import type { GridProps } from './types.js'

  let {
    cellColor = '#000000',
    sectionColor = '#0000ee',
    cellSize = 1,
    backgroundColor = '#dadada',
    backgroundOpacity = 0,
    sectionSize = 10,

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

  const gridType = {
    grid: 0,
    lines: 1,
    circular: 2,
    polar: 3
  } as const

  // TSL uniforms (node uniforms)
  const uCellSize = uniform(cellSize)
  const uSectionSize = uniform(sectionSize)
  const uCellColor = uniform(new Color(cellColor))
  const uSectionColor = uniform(new Color(sectionColor))
  const uBackgroundColor = uniform(new Color(backgroundColor))
  const uBackgroundOpacity = uniform(backgroundOpacity)
  const uFadeDistance = uniform(fadeDistance)
  const uFadeStrength = uniform(fadeStrength)
  const uFadeOrigin = uniform(new Vector3())
  const uCellThickness = uniform(cellThickness)
  const uSectionThickness = uniform(sectionThickness)
  const uInfiniteGrid = uniform(infiniteGrid ? 1 : 0)
  const uFollowCamera = uniform(followCamera ? 1 : 0)
  const uLineGridCoord = uniform(axisToInt[axis as 'x' | 'y' | 'z'])
  const uGridType = uniform(gridType.grid as number)
  const uCircleGridMaxRadius = uniform(maxRadius)
  const uPolarCellDividers = uniform(cellDividers)
  const uPolarSectionDividers = uniform(sectionDividers)
  const uWorldCamProjPosition = uniform(new Vector3())
  const uWorldPlanePosition = uniform(new Vector3())

  $effect.pre(() => {
    // plane/axis mapping retained for reference; TSL uses swizzles.
    invalidate()
  })

  $effect.pre(() => {
    uCellSize.value = cellSize
    invalidate()
  })
  $effect.pre(() => {
    uSectionSize.value = sectionSize
    invalidate()
  })
  $effect.pre(() => {
    uCellColor.value.set(cellColor)
    invalidate()
  })
  $effect.pre(() => {
    uSectionColor.value.set(sectionColor)
    invalidate()
  })
  $effect.pre(() => {
    uBackgroundColor.value.set(backgroundColor)
    invalidate()
  })
  $effect.pre(() => {
    uBackgroundOpacity.value = backgroundOpacity
    invalidate()
  })
  $effect.pre(() => {
    uFadeDistance.value = fadeDistance
    invalidate()
  })
  $effect.pre(() => {
    uFadeStrength.value = fadeStrength
    invalidate()
  })
  $effect.pre(() => {
    if (fadeOrigin) {
      uFadeOrigin.value = fadeOrigin
      invalidate()
    }
  })
  $effect.pre(() => {
    uCellThickness.value = cellThickness
    invalidate()
  })
  $effect.pre(() => {
    uSectionThickness.value = sectionThickness
    invalidate()
  })
  $effect.pre(() => {
    uFollowCamera.value = followCamera ? 1 : 0
    invalidate()
  })
  $effect.pre(() => {
    uInfiniteGrid.value = infiniteGrid ? 1 : 0
    invalidate()
  })

  $effect.pre(() => {
    switch (type) {
      case 'grid': {
        uGridType.value = gridType.grid
        break
      }
      case 'lines': {
        uGridType.value = gridType.lines
        uLineGridCoord.value = axisToInt[axis as 'x' | 'y' | 'z']
        break
      }
      case 'circular': {
        uGridType.value = gridType.circular
        uCircleGridMaxRadius.value = maxRadius
        break
      }
      case 'polar': {
        uGridType.value = gridType.polar
        uCircleGridMaxRadius.value = maxRadius
        uPolarCellDividers.value = cellDividers
        uPolarSectionDividers.value = sectionDividers
        break
      }
    }
    invalidate()
  })

  useTask(
    () => {
      gridPlane.setFromNormalAndCoplanarPoint(upVector, zeroVector).applyMatrix4(mesh.matrixWorld)

      const projectedPoint = gridPlane.projectPoint(
        camera.current.position,
        uWorldCamProjPosition.value
      )
      if (!fadeOrigin) {
        uFadeOrigin.value = projectedPoint
      }
      uWorldPlanePosition.value.set(0, 0, 0).applyMatrix4(mesh.matrixWorld)
    },
    { autoInvalidate: false }
  )

  // TSL output node for the grid material
  const outputNode = Fn(() => {
    const lp = positionLocal
    const localPos = vec3(lp.x, lp.y, lp.z)

    // Square grid (2D)
    const localXY = vec2(localPos.x, localPos.y)
    const coordCell = localXY.div(uCellSize)
    const coordSection = localXY.div(uSectionSize)
    const gridCell = abs(fract(coordCell.sub(float(0.5))).sub(float(0.5))).div(fwidth(coordCell))
    const lineCell = min(gridCell.x, gridCell.y).add(float(1.0)).sub(uCellThickness)
    const gSquare1 = float(1.0).sub(min(lineCell, float(1.0)))
    const gridSection = abs(fract(coordSection.sub(float(0.5))).sub(float(0.5))).div(
      fwidth(coordSection)
    )
    const lineSection = min(gridSection.x, gridSection.y).add(float(1.0)).sub(uSectionThickness)
    const gSquare2 = float(1.0).sub(min(lineSection, float(1.0)))

    // Lines grid (1D along chosen axis)
    const eqX = float(1.0).sub(min(abs(uLineGridCoord.sub(float(0))), float(1.0)))
    const eqY = float(1.0).sub(min(abs(uLineGridCoord.sub(float(1))), float(1.0)))
    const eqZ = float(1.0).sub(min(abs(uLineGridCoord.sub(float(2))), float(1.0)))
    const lineCoord = localPos.x
      .mul(eqX)
      .add(localPos.y.mul(eqY))
      .add(localPos.z.mul(eqZ))
      .div(uCellSize)
    const grid1D = abs(fract(lineCoord.sub(float(0.5))).sub(float(0.5))).div(fwidth(lineCoord))
    const gLines1 = float(1.0).sub(min(grid1D.add(float(1.0)).sub(uCellThickness), float(1.0)))

    const lineCoordSection = localPos.x
      .mul(eqX)
      .add(localPos.y.mul(eqY))
      .add(localPos.z.mul(eqZ))
      .div(uSectionSize)
    const grid1DSection = abs(fract(lineCoordSection.sub(float(0.5))).sub(float(0.5))).div(
      fwidth(lineCoordSection)
    )
    const gLines2 = float(1.0).sub(
      min(grid1DSection.add(float(1.0)).sub(uSectionThickness), float(1.0))
    )

    // Circular grid
    const radialCell = length(vec2(localPos.x, localPos.y)).div(uCellSize)
    const gridCirc = abs(fract(radialCell.sub(float(0.5))).sub(float(0.5))).div(fwidth(radialCell))
    const gCirc1 = float(1.0).sub(min(gridCirc.add(float(1.0)).sub(uCellThickness), float(1.0)))

    const radialSection = length(vec2(localPos.x, localPos.y)).div(uSectionSize)
    const gridCircSection = abs(fract(radialSection.sub(float(0.5))).sub(float(0.5))).div(
      fwidth(radialSection)
    )
    const gCirc2 = float(1.0).sub(
      min(gridCircSection.add(float(1.0)).sub(uSectionThickness), float(1.0))
    )

    // Polar grid (radial + angular)
    const rad = length(vec2(localPos.x, localPos.y)).div(uCellSize)
    const ang = atan(localPos.x, localPos.y).mul(uPolarCellDividers).div(float(3.141592653589793))
    const coordPolar = vec2(rad, ang)
    const coordWidth = fwidth(coordPolar)
    const gridPolar = abs(fract(coordPolar.sub(float(0.5))).sub(float(0.5))).div(coordWidth)
    const gPolar1 = float(1.0).sub(min(min(gridPolar.x, gridPolar.y), float(1.0)))

    const radS = length(vec2(localPos.x, localPos.y)).div(uSectionSize)
    const angS = atan(localPos.x, localPos.y)
      .mul(uPolarSectionDividers)
      .div(float(3.141592653589793))
    const coordPolarS = vec2(radS, angS)
    const coordWidthS = fwidth(coordPolarS)
    const gridPolarS = abs(fract(coordPolarS.sub(float(0.5))).sub(float(0.5))).div(coordWidthS)
    const gPolar2 = float(1.0).sub(min(min(gridPolarS.x, gridPolarS.y), float(1.0)))

    // Select grid type contributions
    const isGrid = float(1.0).sub(min(abs(uGridType.sub(float(0))), float(1.0)))
    const isLines = float(1.0).sub(min(abs(uGridType.sub(float(1))), float(1.0)))
    const isCirc = float(1.0).sub(min(abs(uGridType.sub(float(2))), float(1.0)))
    const isPolar = float(1.0).sub(min(abs(uGridType.sub(float(3))), float(1.0)))

    const g1 = gSquare1
      .mul(isGrid)
      .add(gLines1.mul(isLines))
      .add(gCirc1.mul(isCirc))
      .add(gPolar1.mul(isPolar))
    const g2 = gSquare2
      .mul(isGrid)
      .add(gLines2.mul(isLines))
      .add(gCirc2.mul(isCirc))
      .add(gPolar2.mul(isPolar))

    const colorMix = mix(uCellColor, uSectionColor, min(float(1.0), uSectionThickness.mul(g2)))

    const dist = length(
      vec3(uFadeOrigin.x.sub(lp.x), uFadeOrigin.y.sub(lp.y), uFadeOrigin.z.sub(lp.z))
    )
    const d = float(1.0).sub(min(dist.div(uFadeDistance), float(1.0)))
    const fadeFactor = pow(d, uFadeStrength).mul(float(0.95))

    const linesAlpha = max(float(0.0), min(float(1.0), g1.add(g2).mul(fadeFactor)))
    const finalColor = mix(uBackgroundColor, colorMix, linesAlpha)
    let blendedAlpha = max(linesAlpha, uBackgroundOpacity.mul(fadeFactor))

    // Radius clipping for circular and polar grids
    const threshold = uCircleGridMaxRadius.add(
      max(uCellThickness, uSectionThickness).mul(float(0.05))
    )
    const inside = rad.sub(threshold).lessThanEqual(float(0.0))
    const isCircOrPolar = isCirc.add(isPolar)
    const shouldClip = isCircOrPolar
      .greaterThan(float(0.5))
      .and(uInfiniteGrid.lessThanEqual(float(0.0)))
      .and(uCircleGridMaxRadius.greaterThan(float(0.0)))
      .and(inside.not())

    shouldClip.discard()
    output.assign(vec4(finalColor, blendedAlpha))
    return output
  })
</script>

<T
  is={mesh}
  bind:ref
  frustumCulled={false}
  {...props}
>
  <T.MeshStandardNodeMaterial
    outputNode={outputNode()}
    transparent
    {side}
  />
  {#if children}
    {@render children({ ref: mesh })}
  {:else}
    <T.PlaneGeometry args={typeof gridSize == 'number' ? [gridSize, gridSize] : gridSize} />
  {/if}
</T>
