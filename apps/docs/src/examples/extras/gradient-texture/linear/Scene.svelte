<script lang="ts">
  import type { ColorRepresentation, ToneMapping, Wrapping } from 'three'
  import type { GradientStop } from '@threlte/extras'
  import { Color, DoubleSide } from 'three'
  import { LinearGradientTexture, OrbitControls } from '@threlte/extras'
  import { T, useThrelte } from '@threlte/core'

  type SceneProps = {
    canvasSize: number
    gradientEndColor: ColorRepresentation
    gradientEndX: number
    gradientEndY: number
    gradientStartColor: ColorRepresentation
    gradientStartX: number
    gradientStartY: number
    sceneBackgroundColor: ColorRepresentation
    sceneToneMapping: ToneMapping
    textureCenterX: number
    textureCenterY: number
    textureOffsetX: number
    textureOffsetY: number
    textureRepeatX: number
    textureRepeatY: number
    textureRotation: number
    textureWrapS: Wrapping
    textureWrapT: Wrapping
  }

  let {
    canvasSize,
    gradientEndColor,
    gradientEndX,
    gradientEndY,
    gradientStartColor,
    gradientStartX,
    gradientStartY,
    sceneBackgroundColor,
    sceneToneMapping,
    textureCenterX,
    textureCenterY,
    textureOffsetX,
    textureOffsetY,
    textureRepeatX,
    textureRepeatY,
    textureRotation,
    textureWrapS,
    textureWrapT
  }: SceneProps = $props()

  let stops: GradientStop[] = $derived([
    { color: gradientStartColor, offset: 0 },
    { color: gradientEndColor, offset: 1 }
  ])

  const { invalidate, toneMapping } = useThrelte()

  $effect(() => {
    toneMapping.set(sceneToneMapping)
    invalidate()
  })

  const backgroundColor = new Color()
  $effect(() => {
    backgroundColor.set(sceneBackgroundColor)
    invalidate()
  })
</script>

<T
  is={backgroundColor}
  attach="background"
/>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.Mesh scale={2}>
  <T.PlaneGeometry />
  <T.MeshBasicMaterial side={DoubleSide}>
    <LinearGradientTexture
      width={canvasSize}
      height={canvasSize}
      startX={gradientStartX}
      startY={gradientStartY}
      endX={gradientEndX}
      endY={gradientEndY}
      center.x={textureCenterX}
      center.y={textureCenterY}
      offset.x={textureOffsetX}
      offset.y={textureOffsetY}
      repeat.x={textureRepeatX}
      repeat.y={textureRepeatY}
      rotation={textureRotation}
      wrapS={textureWrapS}
      wrapT={textureWrapT}
      {stops}
    />
  </T.MeshBasicMaterial>
</T.Mesh>
