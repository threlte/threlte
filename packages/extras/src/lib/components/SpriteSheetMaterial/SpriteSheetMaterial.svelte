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
  import type { SpriteSheetProps, SpriteFrame, SpriteSheetData } from './types'

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
    ...props
  }: SpriteSheetProps = $props()

  const parent = useParent()
  const suspend = useSuspense()
  // we assume this is not the first call to useTexture() as it is likely that the spritesheet
  // texture was used elsewhere as well. We need to clone and update it
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
  /** The index in the sprite in the sheet data frames array. Defaults to the first sprite frame */
  let currentSpriteIndex = 0
  /** match a named frame with it's index in the sheetData array */
  let namedSpriteFrames: Record<string, number> = {}
  let numFrames = 0

  let playQueued = false
  let timerOffset = 0
  let fpsInterval = $derived(1000 / fps)
  /** increment `currentSpriteIndex` forwards (1) or backwards (-1) */
  let direction: 1 | -1 = 1

  const setFrame = (frame: SpriteFrame) => {
    if (!texture) return

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
    // texture.updateMatrix()
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
      if (animate == true && !totalFrames && !columns) {
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

      if (animate == true) {
        if (columns > 1) {
          output.animations = {
            default: {
              name: 'default',
              from: 0,
              to: output.frames.length - 1,
              direction: 'forward'
            }
          }
        }
      }
    }

    return output
  }

  const setupAnimation = (animationName: string) => {
    if (!$sheetData) return

    const animation = $sheetData.animations?.[animationName]

    if (!animation) return

    const { from, to } = animation
    direction = animation.direction == 'forward' ? 1 : -1
    startFrame = from
    endFrame = to

    // frameTag = json?.meta.frameTags.find((tag) => tag.name === name)
    // direction = isSupportedDirection(frameTag?.direction) ? frameTag.direction : 'forward'

    currentSpriteIndex = direction == 1 ? from ?? 0 : to ?? numFrames - 1

    setFrame($sheetData.frames[currentSpriteIndex])

    // onstart?.()
  }

  /**
   * Plays the animation.
   */
  const play = async () => {
    if ($loadedTexture == undefined || !sheetData == undefined) return
    playQueued = true
    timerOffset = performance.now() - delay
    start()
  }

  /**
   * Pauses the animation.
   */
  const pause = () => {
    playQueued = false
    stop()
  }

  const { start, stop } = useTask(
    () => {
      if (!$sheetData) return

      const now = performance.now()
      const diff = now - timerOffset

      // const name = frameNames[currentFrame]
      // const { frame, duration } = json.frames[name]
      const interval = fpsInterval //duration ?? fpsInterval

      if (diff <= interval) return
      timerOffset = now - (diff % interval)

      setFrame($sheetData.frames[currentSpriteIndex])

      currentSpriteIndex += direction

      if (
        (direction == 1 && currentSpriteIndex > endFrame) ||
        (direction == -1 && currentSpriteIndex < endFrame)
      ) {
        currentSpriteIndex = startFrame

        if (loop) {
          // onloop?.()
        } else {
          pause()
          // onend?.()
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
      currentSpriteIndex = select
    } else if (typeof select === 'string') {
      if (Object.keys(namedSpriteFrames).includes(select)) {
        currentSpriteIndex = namedSpriteFrames[select]
      }
    }
    const spriteFrame = $sheetData.frames[currentSpriteIndex]

    texture.repeat.set(
      (1 * flipOffset) / (textureSize.width / spriteFrame.width),
      1 / (textureSize.height / spriteFrame.height)
    )

    if (animate == true) {
      setupAnimation(animation ?? 'default')
    } else {
      setFrame(spriteFrame)
    }

    onload?.()

    if (animate == true && autoplay) {
      play()
    }
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
    {@render SpriteSheetMaterial(texture!)}
    <T.MeshDepthMaterial
      attach="customDepthMaterial"
      depthPacking={RGBADepthPacking}
      map={texture}
      {alphaTest}
    />
  {:else}
    {@render SpriteSheetMaterial(texture!)}
  {/if}
{/if}
