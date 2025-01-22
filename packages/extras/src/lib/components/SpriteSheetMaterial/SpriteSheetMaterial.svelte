<script lang="ts">
  import {
    asyncWritable,
    type AsyncWritable,
    isInstanceOf,
    T,
    useLoader,
    useParent,
    useTask,
    watch
  } from '@threlte/core'
  import {
    FileLoader,
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
    SpriteSheetData,
    SpriteSheetAnimation,
    SpriteSheetFrame
  } from './types'
  import {
    defaultAnimationName,
    createSpriteSheetDataFromProps,
    createSpriteSheetDataFromJSON
  } from './utils'
  import { mount, onDestroy } from 'svelte'

  let {
    textureUrl,
    filter = 'nearest',
    alphaTest = 0.1,
    transparent = true,
    flipX = false,
    dataUrl = '',
    dataFormat,
    data,
    rows = 1,
    columns,
    totalFrames,
    select,
    animate,
    animation,
    loop = true,
    autoplay = true,
    fps = 10,
    delay = 0,
    startFrame = 0,
    endFrame = undefined,
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
  /** Assumed that the texture is used elsewhere too so we clone and update it */
  const loadedTexture = suspend(useTexture(textureUrl))
  const sheetData: AsyncWritable<SpriteSheetData | undefined> = suspend(
    dataUrl
      ? useLoader(FileLoader).load(dataUrl, {
          transform: (file) => {
            if (typeof file !== 'string') {
              console.warn(`Data from ${dataUrl} expected to be string not ArrayBuffer`)
              return undefined
            }
            try {
              if (dataFormat != undefined) {
                return createSpriteSheetDataFromJSON(JSON.parse(file), dataFormat)
              } else {
                console.error('Please provided a dataFormat from the list of supported formats')
                return undefined
              }
            } catch (err) {
              console.error(err)
              return undefined
            }
          }
        })
      : asyncWritable<SpriteSheetData>(
          new Promise(async (resolve) => {
            const unsub = loadedTexture.subscribe((value) => {
              if (!value) return
              unsub()
              resolve(
                createSpriteSheetDataFromProps(
                  { data, rows, columns, totalFrames, animate, startFrame, endFrame },
                  value
                )
              )
            })
          })
        )
  )

  let isMesh = $parent !== undefined && isInstanceOf($parent, 'Mesh')
  is ??= isMesh ? new MeshStandardMaterial() : new SpriteMaterial()

  let mounted = $state(false)

  let texture: Texture | undefined = $state()
  let textureSize = { width: 0, height: 0 }
  let flipOffset = flipX ? -1 : 1

  let frames: SpriteSheetFrame[] = []
  /** The index in the frame in the sprite sheet data's frames array. Defaults to the first frame */
  let currentSpriteFrameIndex = 0
  /** match a named frame with it's index in the frames array */
  let namedSpriteFrames: Record<string, number> = {}
  let numFrames = 0

  let animations: Record<string, SpriteSheetAnimation> = {}
  let playQueued = false
  let timerOffset = 0
  let fpsInterval = $derived(1000 / fps)
  /** increment `currentSpriteFrameIndex` forward (1) or reverse (-1) */
  let direction: 1 | -1 = 1

  const setFrame = (frame: SpriteSheetFrame) => {
    if (!texture || $sheetData == undefined) return

    const horizontalFrames = textureSize.width / frame.width
    const verticalFrames = textureSize.height / frame.height
    const frameOffsetX = 1 / horizontalFrames
    const frameOffsetY = 1 / verticalFrames

    const x =
      flipOffset > 0
        ? frameOffsetX * (frame.x / frame.width)
        : frameOffsetX * (frame.x / frame.height) - texture.repeat.x
    const y = Math.abs(1 - frameOffsetY) - frameOffsetY * (frame.y / frame.height)

    texture.offset.set(x, y)
  }

  const setupAnimation = (animationName: string) => {
    const animation = animations[animationName]
    if (!animation) {
      console.error(
        `Did not find '${animation}' within ${dataUrl != '' ? dataUrl : "the sprite sheet's animations data."}`
      )
      return
    }

    const { from, to } = animation
    direction = animation.direction == 'reverse' ? -1 : 1
    startFrame = from
    endFrame = to

    currentSpriteFrameIndex = direction == 1 ? from ?? 0 : to ?? numFrames - 1

    if (animationName == 'Out') {
      console.log('yo')
      console.table({
        animationName,
        from,
        to,
        startFrame,
        endFrame,
        currentSpriteFrameIndex,
        direction,
        numFrames
      })
    }

    setFrame(frames[currentSpriteFrameIndex])

    onstart?.()
  }

  /**
   * Plays the animation.
   */
  export const play = async () => {
    if (texture == undefined || $sheetData == undefined) return
    if (animate) {
      setupAnimation(animation ?? defaultAnimationName)
      playQueued = true
      timerOffset = performance.now() - delay
      start()
    } else {
      console.error(`Trying to play a SpriteSheetMaterial who's 'animate' prop is '${animate}'`)
    }
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
      if ($sheetData == undefined || texture == undefined) return

      const now = performance.now()
      const diff = now - timerOffset

      const frame = frames[currentSpriteFrameIndex]
      const { duration } = frame
      const interval = duration ?? fpsInterval

      if (diff <= interval) return
      timerOffset = now - (diff % interval)

      setFrame(frame)

      currentSpriteFrameIndex += direction

      if (animation == 'Out') {
        console.log('why')
      }

      // If we're at the end of the animation, reset it to the start frame
      if (
        (direction == 1 && currentSpriteFrameIndex > endFrame!) ||
        (direction == -1 && currentSpriteFrameIndex < endFrame!)
      ) {
        if (animation == 'Out') {
          console.log('why not?')
        }
        currentSpriteFrameIndex = startFrame

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

  watch([loadedTexture, sheetData], ([nextTexture, nextJson]) => {
    if (nextTexture == undefined || nextJson == undefined) return

    const { width, height } = nextJson.texture
    textureSize = { width, height }

    frames = nextJson.frames

    // Then init variables from the data
    numFrames = frames.length ?? 0

    for (let i = 0; i < numFrames; i++) {
      const frame = frames[i]
      if (frame.name) {
        namedSpriteFrames[frame.name] = i
      }
    }

    if (nextJson.animations) {
      for (let i = 0; i < nextJson.animations.length; i++) {
        animations[nextJson.animations[i].name] = nextJson.animations[i]
      }
    }

    if (typeof select === 'number') {
      currentSpriteFrameIndex = select
    } else if (typeof select === 'string') {
      if (Object.keys(namedSpriteFrames).includes(select)) {
        currentSpriteFrameIndex = namedSpriteFrames[select]
      }
    }
    const frame = frames[currentSpriteFrameIndex]

    if (texture != undefined) {
      texture.dispose()
    }
    texture = nextTexture.clone()
    // texture.matrixAutoUpdate = false
    // texture.generateMipmaps = false
    // texture.premultiplyAlpha = false
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.magFilter = filter === 'nearest' ? NearestFilter : LinearFilter
    texture.minFilter = filter === 'nearest' ? NearestFilter : LinearFilter
    texture.repeat.set(
      (1 * flipOffset) / (textureSize.width / frame.width),
      1 / (textureSize.height / frame.height)
    )

    setFrame(frame)

    if (animate && autoplay) {
      setupAnimation(animation ?? defaultAnimationName)
      play()
    }
    onload?.()
    mounted = true
  })

  $effect(() => {
    if (!mounted) return
    if (animation) {
      setupAnimation(animation)
      if (autoplay) {
        play()
      }
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
