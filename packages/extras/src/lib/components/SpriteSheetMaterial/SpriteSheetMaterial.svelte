<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, watch, useThrelte } from '@threlte/core'
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
  import type { SpriteSheetProps, SpriteSheetFrame, SpriteSheetData } from './types'
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
    startFrame = 0,

    animation,
    animate,
    loop = true,
    autoplay = true,
    delay = 0,
    fps = 10,
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
  const { invalidate } = useThrelte()

  let isMesh = $parent !== undefined && isInstanceOf($parent, 'Mesh')
  is ??= isMesh ? new MeshStandardMaterial() : new SpriteMaterial()

  const textureStore = suspend(useTexture(textureUrl))
  const jsonStore = suspend(
    dataUrl
      ? createFromJSON(dataUrl, dataFormat!)
      : createFromProps({ columns, rows, startFrame, endFrame, totalFrames, animate }, textureStore)
  )

  let texture: Texture | undefined = $state()
  let size = { width: 0, height: 0 }
  let flipOffset = flipX ? -1 : 1

  let json: SpriteSheetData | undefined
  let currentFrameIndex = 0

  /** forward == 1 or reserve == -1 */
  let direction: Direction = Direction.forward
  let timerOffset = 0
  let numFrames = 0

  let fpsInterval = $derived(1000 / fps)
  let playQueued = false

  const setFrame = (frame: SpriteSheetFrame) => {
    if (!texture) return

    const horizontalFrames = size.width / frame.width
    const verticalFrames = size.height / frame.height
    const frameOffsetX = 1 / horizontalFrames
    const frameOffsetY = 1 / verticalFrames

    const x =
      flipOffset > 0
        ? frameOffsetX * (frame.x / frame.width)
        : frameOffsetX * (frame.x / frame.height) - texture.repeat.x
    const y = Math.abs(1 - frameOffsetY) - frameOffsetY * (frame.y / frame.height)

    texture.offset.set(x, y)
    // texture.updateMatrix()
    invalidate()
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

      setFrame(frame)

      currentFrameIndex += direction

      if (
        (direction === Direction.forward && currentFrameIndex > endFrame!) ||
        (direction === Direction.reverse && currentFrameIndex < endFrame!)
      ) {
        currentFrameIndex = startFrame as number

        if (loop) {
          onloop?.()
        } else {
          pause()
          onend?.()
        }
      }
    },
    { autoStart: false, autoInvalidate: false }
  )

  watch([textureStore, jsonStore], ([nextTexture, nextJson]) => {
    if (nextTexture === undefined || nextJson === undefined) return

    if (texture != undefined) {
      texture.dispose()
    }
    texture = nextTexture.clone()
    // TODO-DefinitelyMaybe: what were these about?
    // texture.matrixAutoUpdate = false
    // texture.generateMipmaps = false
    // texture.premultiplyAlpha = false
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.magFilter = texture.minFilter = filter === 'nearest' ? NearestFilter : LinearFilter

    json = nextJson

    numFrames = json.frames.length

    size = json.size

    if (typeof startFrame === 'string') {
      let maybeFrame = json.frames.findIndex((obj) => obj.name === startFrame)
      if (maybeFrame != -1) {
        currentFrameIndex = maybeFrame
        startFrame = maybeFrame
      } else {
        startFrame = 0
      }
    } else {
      currentFrameIndex = startFrame
    }
    const { width, height } = json.frames[currentFrameIndex]

    texture.repeat.set((1 * flipOffset) / (size.width / width), 1 / (size.height / height))

    if (json.animations != undefined && json.animations.length > 0) {
      setupAnimation(animation ?? defaultAnimationName)
      if (autoplay) {
        play()
      }
    } else {
      setFrame(json.frames[currentFrameIndex])
    }

    onload?.()
  })

  $effect.pre(() => {
    if (animate == undefined) return
    setupAnimation(animation ?? defaultAnimationName)
    if (autoplay) {
      play()
    }
  })
  onDestroy(() => {
    texture?.dispose()
  })
</script>

{#snippet material(map:Texture)}
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
    {@render material(texture)}
    <T.MeshDepthMaterial
      attach="customDepthMaterial"
      depthPacking={RGBADepthPacking}
      map={texture}
      {alphaTest}
    />
  {:else}
    {@render material(texture)}
  {/if}
{/if}
