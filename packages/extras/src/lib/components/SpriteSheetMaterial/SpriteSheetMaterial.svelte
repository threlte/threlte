<script lang="ts">
  import {
    asyncWritable,
    type AsyncWritable,
    isInstanceOf,
    T,
    useLoader,
    useParent,
    useTask
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
  import type { SpriteSheetProps, SpriteSheetData } from './types'
  import { onDestroy } from 'svelte'

  let {
    textureUrl,
    filter = 'nearest',
    alphaTest = 0.1,
    transparent = true,
    flipX = false,
    dataUrl = '',
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
              return
            }
            try {
              return JSON.parse(file)
            } catch (err) {
              console.error(err)
              return
            }
          }
        })
      : asyncWritable<SpriteSheetData>(
          new Promise(async (resolve) => {
            const unsub = loadedTexture.subscribe((value) => {
              if (!value) return
              unsub()
              resolve(createData(value))
            })
          })
        )
  )

  let isMesh = $parent !== undefined && isInstanceOf($parent, 'Mesh')
  is ??= isMesh ? new MeshStandardMaterial() : new SpriteMaterial()

  let texture: Texture | undefined = $derived.by(() => {
    if ($loadedTexture != undefined) {
      const t = $loadedTexture.clone()
      // todo: don't know about these. Are they conditional on the material?
      // t.matrixAutoUpdate = false
      // t.generateMipmaps = false
      // t.premultiplyAlpha = false
      t.wrapS = t.wrapT = RepeatWrapping
      t.magFilter = filter === 'nearest' ? NearestFilter : LinearFilter
      t.minFilter = filter === 'nearest' ? NearestFilter : LinearFilter
      return t
    }
    return undefined
  })
  let textureSize = { width: 0, height: 0 }
  let flipOffset = flipX ? -1 : 1
  /** The index in the frame in the sprite sheet data's frames array. Defaults to the first frame */
  let currentSpriteFrameIndex = 0
  /** match a named frame with it's index in the sheetData array */
  let namedSpriteFrames: Record<string, number> = {}
  let numFrames = 0

  const defaultAnimationName = 'default'
  let playQueued = false
  let timerOffset = 0
  let fpsInterval = $derived(1000 / fps)
  /** increment `currentSpriteFrameIndex` forwards (1) or backwards (-1) */
  let direction: 1 | -1 = 1

  const setFrame = (index: number) => {
    if (!texture || $sheetData == undefined) return

    const frame = $sheetData.frames[index]

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

  /**
   * Creates metadata if no JSON file is supplied.
   */
  const createData = (texture: Texture) => {
    const { width, height } = texture.image
    textureSize = { width, height }

    const output: SpriteSheetData = {
      frames: []
    }

    if (data != undefined) {
      output.frames = data.frames
      if (data.animations) {
        output.animations = data.animations
      }
    } else {
      if (animate && !totalFrames && !columns) {
        console.error('Provide either the totalFrames or columns to animate the sprite')
      }

      columns ??= totalFrames ?? 1

      const spriteWidth = width / columns
      const spriteHeight = height / rows

      numFrames = rows * columns

      for (let i = 0; i < numFrames; i += 1) {
        // Calculate the row and column for the current frame
        const row = Math.floor(i / columns)
        const col = i % columns

        // Calculate the x, y coordinates of the frame within the sprite sheet
        const x = col * spriteWidth
        const y = row * spriteHeight

        output.frames.push({
          x,
          y,
          width: spriteWidth,
          height: spriteHeight
        })
      }

      if (animate) {
        if (columns > 1) {
          // there should be enough information to create an animation
          output.animations = {}
          output.animations[defaultAnimationName] = {
            name: defaultAnimationName,
            from: 0,
            to: output.frames.length - 1,
            direction: 'forward'
          }
        }
      }
    }

    return output
  }

  const setupAnimation = (animationName: string) => {
    if (!$sheetData) return

    const animation = $sheetData.animations?.[animationName]

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

    setFrame(currentSpriteFrameIndex)

    onstart?.()
  }

  /**
   * Plays the animation.
   */
  export const play = async () => {
    if (texture == undefined || !sheetData == undefined) return
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
      if (!$sheetData || !endFrame) return

      const now = performance.now()
      const diff = now - timerOffset

      // const { duration } = json.frames[name]
      const interval = fpsInterval //duration ?? fpsInterval

      if (diff <= interval) return
      timerOffset = now - (diff % interval)

      setFrame(currentSpriteFrameIndex)

      currentSpriteFrameIndex += direction

      // If we're at the end of the animation, reset it to the start frame
      if (
        (direction == 1 && currentSpriteFrameIndex > endFrame) ||
        (direction == -1 && currentSpriteFrameIndex < endFrame)
      ) {
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

  $effect(() => {
    if (texture == undefined || $sheetData == undefined) return

    // Then init variables from the data
    numFrames = $sheetData.frames.length
    for (let i = 0; i < numFrames; i++) {
      const frame = $sheetData.frames[i]
      if (frame.name) {
        namedSpriteFrames[frame.name] = i
      }
    }

    if (typeof select === 'number') {
      currentSpriteFrameIndex = select
    } else if (typeof select === 'string') {
      if (Object.keys(namedSpriteFrames).includes(select)) {
        currentSpriteFrameIndex = namedSpriteFrames[select]
      }
    }
    const spriteFrame = $sheetData.frames[currentSpriteFrameIndex]

    texture.repeat.set(
      (1 * flipOffset) / (textureSize.width / spriteFrame.width),
      1 / (textureSize.height / spriteFrame.height)
    )

    setFrame(currentSpriteFrameIndex)

    onload?.()

    if (animate && autoplay) {
      setupAnimation(animation ?? defaultAnimationName)
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
