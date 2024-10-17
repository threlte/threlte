<script lang="ts">
  import type { ColorRepresentation, ToneMapping, Wrapping } from 'three'
  import type { GradientStop } from '@threlte/extras'
  import { Color, DoubleSide } from 'three'
  import { LinearGradientTexture, OrbitControls } from '@threlte/extras'
  import { T, useThrelte } from '@threlte/core'

  type SceneProps = {
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

<T.Mesh>
  <T.PlaneGeometry args={[2, 2]} />
  <T.MeshBasicMaterial side={DoubleSide}>
    <LinearGradientTexture
      center.x={textureCenterX}
      center.y={textureCenterY}
      endX={gradientEndX}
      endY={gradientEndY}
      offset.x={textureOffsetX}
      offset.y={textureOffsetY}
      repeat.x={textureRepeatX}
      repeat.y={textureRepeatY}
      rotation={textureRotation}
      startX={gradientStartX}
      startY={gradientStartY}
      wrapS={textureWrapS}
      wrapT={textureWrapT}
      {stops}
    />
  </T.MeshBasicMaterial>
</T.Mesh>
