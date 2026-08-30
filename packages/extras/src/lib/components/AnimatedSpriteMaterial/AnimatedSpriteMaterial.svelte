<script lang="ts">
  import { untrack } from 'svelte'
  import { isInstanceOf, T, useLoader, useParent, useTask, useThrelte } from '@threlte/core'
  import {
    DoubleSide,
    FileLoader,
    LinearFilter,
    MeshBasicMaterial,
    NearestFilter,
    RepeatWrapping,
    RGBADepthPacking,
    SpriteMaterial,
    TextureLoader,
    type Texture
  } from 'three'
  import { useSuspense } from '../../suspense/useSuspense.js'
  import type { AnimatedSpriteProps, Frame, FrameTag, SpriteJsonHashData } from './types.js'

  let {
    textureUrl,
    dataUrl = '',
    animation = '',
    loop = true,
    autoplay = true,
    fps = 10,
    filter = 'nearest',
    alphaTest = 0.1,
    delay = 0,
    transparent = true,
    flipX = false,
    startFrame = 0,
    endFrame = undefined,
    rows = 1,
    columns = undefined,
    totalFrames = 0,
    is,
    ref = $bindable(),

    onload,
    onstart,
    onend,
    onloop,

    ...props
  }: AnimatedSpriteProps = $props()

  const parent = useParent()
  const { renderer } = useThrelte()
  const textureLoader = useLoader(TextureLoader)
  const fileLoader = useLoader(FileLoader)

  const supportedDirections = ['forward', 'reverse'] as const
  const isSupportedDirection = (
    value: string | undefined
  ): value is (typeof supportedDirections)[number] => {
    const isSupported = supportedDirections.includes(value as (typeof supportedDirections)[number])
    if (!isSupported) {
      console.warn(
        `frame tag direction: "${value}" is not supported.${dataUrl != '' ? `\nsource dataURL: ${dataUrl}` : `\ntexture URL: ${textureUrl}`}`
      )
    }
    return isSupported
  }

  let timerOffset = 0
  let currentFrame = 0
  let numFrames = 0
  let flipOffset = 1
  let frameWidth = 0
  let frameHeight = 0
  let texture: Texture | undefined = $state()
  let json: SpriteJsonHashData | undefined
  let frameNames: string[] = []
  let direction: (typeof supportedDirections)[number] = 'forward'
  let frameTag: FrameTag | undefined
  let spritesheetSize = { w: 0, h: 0 }

  let fpsInterval = $derived(1000 / fps)
  let isMesh = $derived($parent !== undefined && isInstanceOf($parent, 'Mesh'))

  $effect.pre(() => {
    is ??= isMesh ? new MeshBasicMaterial() : new SpriteMaterial()
  })

  const suspend = useSuspense()
  let loadPromise: Promise<void> = Promise.resolve()
  let loadToken = 0

  /**
   * Creates metadata if no JSON file is supplied.
   */
  const createData = (
    texture: Texture,
    options: {
      columns?: number
      rows: number
      totalFrames: number
    }
  ) => {
    const { width, height } = texture.image
    const cols = options.columns ?? options.totalFrames
    const frameCount = options.totalFrames

    const frameWidth = width / cols
    const frameHeight = height / options.rows
    const data: SpriteJsonHashData = {
      frames: {},
      meta: {
        app: '',
        image: '',
        format: '',
        frameTags: [],
        version: '1.0',
        size: { w: width, h: height },
        scale: 1
      }
    }

    for (let i = 0; i < frameCount; i += 1) {
      // Calculate the row and column for the current frame
      const row = Math.floor(i / cols)
      const col = i % cols

      // Calculate the x, y coordinates of the frame within the sprite sheet
      const x = col * frameWidth
      const y = row * frameHeight

      data.frames[`${i}`] = {
        frame: { x, y, w: frameWidth, h: frameHeight },
        spriteSourceSize: { x: 0, y: 0, w: frameWidth, h: frameHeight },
        sourceSize: { w: frameWidth, h: frameHeight }
      }
    }

    return data
  }

  const setFrame = (frame: Frame['frame']) => {
    const horizontalFrames = spritesheetSize.w / frameWidth
    const verticalFrames = spritesheetSize.h / frameHeight
    const frameOffsetX = 1 / horizontalFrames
    const frameOffsetY = 1 / verticalFrames

    const x =
      flipOffset > 0
        ? frameOffsetX * (frame.x / frameWidth)
        : frameOffsetX * (frame.x / frameHeight) - texture!.repeat.x
    const y = Math.abs(1 - frameOffsetY) - frameOffsetY * (frame.y / frameHeight)

    texture?.offset.set(x, y)
    texture?.updateMatrix()
  }

  const setTextureRepeat = () => {
    if (!texture) return
    texture.repeat.set(
      flipOffset / (spritesheetSize.w / frameWidth),
      1 / (spritesheetSize.h / frameHeight)
    )
  }

  const setCurrentFrame = () => {
    if (!json) return
    const name = frameNames[currentFrame]
    const frame = name ? json.frames[name]?.frame : undefined
    if (frame) setFrame(frame)
  }

  const resetCurrentFrame = (nextStartFrame = startFrame, nextEndFrame = endFrame) => {
    currentFrame =
      direction === 'forward'
        ? (frameTag?.from ?? nextStartFrame ?? 0)
        : (frameTag?.to ?? nextEndFrame ?? numFrames - 1)
    setCurrentFrame()
  }

  const setAnimation = (name: string) => {
    if (!json) return

    frameTag = json?.meta.frameTags.find((tag) => tag.name === name)

    direction = 'forward'
    if (frameTag?.direction) {
      direction = isSupportedDirection(frameTag?.direction) ? frameTag.direction : 'forward'
    }

    resetCurrentFrame()

    onstart?.()
  }

  const parseData = (file: unknown) => {
    if (typeof file !== 'string') return
    try {
      return JSON.parse(file) as SpriteJsonHashData
    } catch {
      return
    }
  }

  const configureTexture = (texture: Texture) => {
    texture.colorSpace = renderer.outputColorSpace
    texture.needsUpdate = true
    texture.matrixAutoUpdate = false
    texture.generateMipmaps = false
    texture.premultiplyAlpha = false
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.magFilter = texture.minFilter = filter === 'nearest' ? NearestFilter : LinearFilter
  }

  const initializeSpritesheet = (nextTexture: Texture, nextJson: SpriteJsonHashData) => {
    texture = nextTexture
    json = nextJson
    frameNames = Object.keys(json.frames)
    numFrames = frameNames.length
    spritesheetSize = json.meta.size

    const { sourceSize } = Object.values(json.frames)[0]
    frameWidth = sourceSize.w
    frameHeight = sourceSize.h

    setTextureRepeat()
    setAnimation(animation)

    onload?.()

    if (autoplay) {
      play()
    }
  }

  let playQueued = false
  let running = $state(false)

  /**
   * Plays the animation.
   */
  export const play = async () => {
    playQueued = true
    while (true) {
      const promise = loadPromise
      try {
        await promise
      } catch (error) {
        if (promise === loadPromise) throw error
        continue
      }
      if (promise === loadPromise) break
    }
    if (!playQueued || !texture || !json) return
    timerOffset = performance.now() - delay
    running = true
  }

  /**
   * Pauses the animation.
   */
  export const pause = () => {
    playQueued = false
    running = false
  }

  useTask(
    () => {
      if (!json) return
      const now = performance.now()
      const diff = now - timerOffset
      const name = frameNames[currentFrame]
      const { frame, duration } = json.frames[name]
      const interval = duration ?? fpsInterval

      if (diff <= interval) return
      timerOffset = now - (diff % interval)

      // start and end are the first and last frames of the animation respectively
      const start =
        direction === 'forward'
          ? (frameTag?.from ?? startFrame ?? 0)
          : (frameTag?.to ?? endFrame ?? numFrames - 1)
      const end =
        direction === 'forward'
          ? (frameTag?.to ?? endFrame ?? numFrames - 1)
          : (frameTag?.from ?? startFrame ?? 0)

      setFrame(frame)

      switch (direction) {
        case 'forward':
          currentFrame += 1
          break
        case 'reverse':
          currentFrame -= 1
          break
        default:
          break
      }

      if (
        (direction === 'forward' && currentFrame > end) ||
        (direction === 'reverse' && currentFrame < end)
      ) {
        currentFrame = start

        if (loop) {
          onloop?.()
        } else {
          pause()
          onend?.()
        }
      }
    },
    { running: () => running }
  )

  $effect(() => {
    const currentToken = ++loadToken
    const currentTextureUrl = textureUrl
    const currentDataUrl = dataUrl

    const textureStore = textureLoader.load(currentTextureUrl)
    const texturePromise = Promise.resolve(textureStore)
    const dataPromise: Promise<SpriteJsonHashData | undefined> = currentDataUrl
      ? Promise.resolve(fileLoader.load(currentDataUrl, { transform: parseData }))
      : (() => {
          const currentColumns = columns
          const currentRows = rows
          const currentTotalFrames = totalFrames
          return texturePromise.then((texture) =>
            createData(texture, {
              columns: currentColumns,
              rows: currentRows,
              totalFrames: currentTotalFrames
            })
          )
        })()

    loadPromise = suspend(
      Promise.all([texturePromise, dataPromise])
        .then(([sourceTexture, nextJson]) => {
          if (currentToken !== loadToken) return
          if (!nextJson) {
            texture = undefined
            json = undefined
            return
          }

          const nextTexture = sourceTexture.clone()
          configureTexture(nextTexture)
          initializeSpritesheet(nextTexture, nextJson)
        })
        .catch((error) => {
          if (currentToken !== loadToken) return
          throw error
        })
    )
  })

  $effect(() => {
    if (!texture) return
    texture.magFilter = texture.minFilter = filter === 'nearest' ? NearestFilter : LinearFilter
    texture.needsUpdate = true
  })

  $effect(() => {
    flipOffset = flipX ? -1 : 1
    untrack(() => {
      setTextureRepeat()
      setCurrentFrame()
    })
  })

  $effect(() => {
    const currentStartFrame = startFrame
    const currentEndFrame = endFrame
    untrack(() => resetCurrentFrame(currentStartFrame, currentEndFrame))
  })

  $effect(() => {
    const currentAnimation = animation
    const shouldAutoplay = autoplay
    untrack(() => {
      setAnimation(currentAnimation)
      if (shouldAutoplay) {
        play()
      }
    })
  })

  $effect(() => {
    const currentTexture = texture
    return () => currentTexture?.dispose()
  })
</script>

{#if texture && isMesh}
  <T
    {is}
    bind:ref
    map={texture}
    toneMapped={false}
    side={DoubleSide}
    shadowSide={DoubleSide}
    {transparent}
    {alphaTest}
    {...props}
  />
  <T.MeshDepthMaterial
    attach="customDepthMaterial"
    depthPacking={RGBADepthPacking}
    map={texture}
    {alphaTest}
  />
{:else if texture}
  <T
    {is}
    bind:ref
    map={texture}
    toneMapped={false}
    {transparent}
    {alphaTest}
    {...props}
  />
{/if}
