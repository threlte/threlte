<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, watch } from '@threlte/core'
  import {
    LinearFilter,
    MeshStandardMaterial,
    NearestFilter,
    RepeatWrapping,
    RGBADepthPacking,
    SpriteMaterial,
    type Texture
  } from 'three'
  import { useTexture } from '../../hooks/useTexture'
  import { useSuspense } from '../../suspense/useSuspense'
  import type {
    SpriteSheetProps,
    SpriteSheetFrame,
    SpriteSheetData,
    SpriteSheetAnimation
  } from './types'
  import { defaultAnimationName, Direction, createFromJSON, createFromProps } from './utils'
  import { onDestroy } from 'svelte'

  let {
    textureUrl,
    filter = 'nearest',
    alphaTest = 0.1,
    transparent = true,
    flipX = false,

    dataUrl = '',
    dataFormat,
    rows = 1,
    columns = undefined,

    animation = '',
    loop = true,
    autoplay = true,
    delay = 0,
    fps = 10,
    startFrame = 0,
    endFrame = undefined,
    totalFrames = 0,

    is = $bindable(),
    ref = $bindable(),

    onload,
    onstart,
    onend,
    onloop,

    ...props
  }: SpriteSheetProps = $props()

  const parent = useParent()
  const suspend = useSuspense()

  let isMesh = $parent !== undefined && isInstanceOf($parent, 'Mesh')
  is ??= isMesh ? new MeshStandardMaterial() : new SpriteMaterial()

  const textureStore = suspend(useTexture(textureUrl))
  const jsonStore = suspend(
    dataUrl
      ? createFromJSON(dataUrl, dataFormat!)
      : createFromProps({ columns, rows, startFrame, endFrame, totalFrames }, textureStore)
  )

  let texture: Texture | undefined = $state()
  let size = { width: 0, height: 0 }
  let flipOffset = flipX ? -1 : 1

  let json: SpriteSheetData | undefined
  let currentFrameIndex = startFrame

  /** forward == 1 or reserve == -1 */
  let direction: Direction = Direction.forward
  let timerOffset = 0
  let numFrames = 0

  let fpsInterval = $derived(1000 / fps)
  let playQueued = false

  const setFrame = (frame: SpriteSheetFrame) => {
    if (!texture) return

    // TODO-DefinitelyMaybe: Why? isn't this == rows/columns?
    const horizontalFrames = size.width / frame.width
    const verticalFrames = size.height / frame.height
    const frameOffsetX = 1 / horizontalFrames
    const frameOffsetY = 1 / verticalFrames

    // console.log(frameOffsetX, frame.x)

    const x =
      flipOffset > 0
        ? frameOffsetX * (frame.x / frame.width)
        : frameOffsetX * (frame.x / frame.height) - texture.repeat.x
    const y = Math.abs(1 - frameOffsetY) - frameOffsetY * (frame.y / frame.height)

    texture.offset.set(x, y)
    // texture.updateMatrix()
  }

  const setupAnimation = (name: string) => {
    if (!json) return

    const selectedAnimation = json.animations?.find((obj) => obj.name === name)

    if (selectedAnimation != undefined) {
      direction = Direction.forward
      if (selectedAnimation.direction != undefined) {
        direction = selectedAnimation.direction
      }

      startFrame =
        direction === Direction.forward
          ? selectedAnimation.from ?? 0
          : selectedAnimation.to ?? numFrames - 1
      endFrame =
        direction === Direction.forward
          ? selectedAnimation.to ?? numFrames - 1
          : selectedAnimation.from ?? 0

      currentFrameIndex = startFrame

      setFrame(json.frames[currentFrameIndex])

      onstart?.()
    } else {
      console.warn(`Did not find animation with name: ${name}`)
    }
  }

  /**
   * Plays the animation.
   */
  export const play = async () => {
    playQueued = true
    await Promise.all([textureStore, jsonStore])
    if (!playQueued) return
    timerOffset = performance.now() - delay
    start()
  }

  /**
   * Pauses the animation.
   */
  export const pause = () => {
    playQueued = false
    stop()
  }

  const { start, stop } = useTask(
    () => {
      if (json == undefined) return

      const now = performance.now()
      const diff = now - timerOffset

      const frame = json.frames[currentFrameIndex]
      const interval = frame.duration ?? fpsInterval

      if (diff <= interval) return
      timerOffset = now - (diff % interval)

      // start and end are the first and last frames of the animation respectively
      // const start =
      //   direction === Direction.forward
      //     ? frameTag?.from ?? startFrame ?? 0
      //     : frameTag?.to ?? endFrame ?? numFrames - 1
      // const end =
      //   direction === Direction.forward
      //     ? frameTag?.to ?? endFrame ?? numFrames - 1
      //     : frameTag?.from ?? startFrame ?? 0

      setFrame(frame)

      currentFrameIndex += direction

      if (
        (direction === Direction.forward && currentFrameIndex > endFrame!) ||
        (direction === Direction.reverse && currentFrameIndex < endFrame!)
      ) {
        currentFrameIndex = startFrame

        if (loop) {
          onloop?.()
        } else {
          pause()
          onend?.()
        }
      }
    },
    { autoStart: false }
  )

  watch([textureStore, jsonStore], ([nextTexture, nextJson]) => {
    if (nextTexture === undefined || nextJson === undefined) return

    if (texture != undefined) {
      texture.dispose()
    }
    texture = nextTexture.clone()
    // texture.matrixAutoUpdate = false
    // texture.generateMipmaps = false
    // texture.premultiplyAlpha = false
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.magFilter = texture.minFilter = filter === 'nearest' ? NearestFilter : LinearFilter

    json = nextJson
    console.log(json)

    numFrames = json.frames.length
    endFrame = numFrames - 1

    size = json.size

    const { width, height } = json.frames[currentFrameIndex]

    texture.repeat.set((1 * flipOffset) / (size.width / width), 1 / (size.height / height))

    if (json.animations != undefined && json.animations.length > 0) {
      setupAnimation(animation ?? defaultAnimationName)
      if (autoplay) {
        play()
      }
    } else {
      // currentFrameIndex defaults to startFrame which defaults to 0
      setFrame(json.frames[currentFrameIndex])
    }

    onload?.()
  })

  $effect.pre(() => {
    if (json == undefined) return
    setupAnimation(animation)
    if (autoplay) {
      play()
    }
  })
  onDestroy(() => {
    texture?.dispose()
  })
</script>

{#snippet SpriteSheetMaterial(map:Texture)}
  <T
    {is}
    bind:ref
    {map}
    toneMapped={false}
    {transparent}
    {alphaTest}
    {...props}
  />
{/snippet}

{#if texture}
  {#if isMesh}
    {@render SpriteSheetMaterial(texture)}
    <T.MeshDepthMaterial
      attach="customDepthMaterial"
      depthPacking={RGBADepthPacking}
      map={texture}
      {alphaTest}
    />
  {:else}
    {@render SpriteSheetMaterial(texture)}
  {/if}
{/if}
