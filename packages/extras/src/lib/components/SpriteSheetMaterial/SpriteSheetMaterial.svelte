<script lang="ts">
  import {
    asyncWritable,
    type AsyncWritable,
    isInstanceOf,
    T,
    useLoader,
    useParent
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
  import type { SpriteSheetProps, SpriteJsonHashData, SpriteFrame, SpriteSheetData } from './types'

  let {
    textureUrl,
    filter = 'nearest',
    alphaTest = 0.1,
    transparent = true,
    flipX = false,
    dataUrl = '',
    data = undefined,
    selectedFrame,
    rows = 1,
    columns = undefined,
    totalFrames = 1,
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
  let spritesheetSize: SpriteSheetData['sheetSize'] = { width: 0, height: 0 }
  let numFrames = 0
  let flipOffset = flipX ? -1 : 1
  let frameWidth = 0
  let frameHeight = 0
  let frameNames: string[] = []

  let isMesh = $parent !== undefined && isInstanceOf($parent, 'Mesh')

  is ??= isMesh ? new MeshStandardMaterial() : new SpriteMaterial()

  if (dataUrl == '' && data == undefined) {
    throw 'The SpriteSheetMaterial needs the sheet data'
  }

  const setFrame = (frame: SpriteFrame) => {
    const horizontalFrames = spritesheetSize.width / frameWidth
    const verticalFrames = spritesheetSize.height / frameHeight
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

  /**
   * Creates metadata if no JSON file is supplied.
   */
  const createData = (texture: Texture) => {
    const { width, height } = texture.image

    const output: SpriteSheetData = {
      frames: {},
      sheetSize: { width, height }
    }

    if (data != undefined) {
      console.log('lets just use the provided data')
      console.log(data)
      output.frames = data
    } else {
      console.log('Lets try create the data from the information given')
      const cols = columns ?? totalFrames

      numFrames = totalFrames
      if (cols > 1) {
        numFrames
      }

      const frameWidth = width / cols
      const frameHeight = height / rows

      console.table({ width, height, rows, cols, numFrames, frameWidth, frameHeight })
      for (let i = 0; i < numFrames; i += 1) {
        // Calculate the row and column for the current frame
        const row = Math.floor(i / cols)
        const col = i % cols

        // Calculate the x, y coordinates of the frame within the sprite sheet
        const x = col * frameWidth
        const y = row * frameHeight

        output.frames[`${i}`] = {
          x,
          y,
          width: frameWidth,
          height: frameHeight
        }
      }
    }

    console.log(output)

    return output
  }

  $effect(() => {
    if ($loadedTexture === undefined || $sheetData === undefined) return

    frameNames = Object.keys($sheetData.frames)
    numFrames = frameNames.length

    selectedFrame ??= frameNames[0]
    spritesheetSize = $sheetData.sheetSize
    // spritesheetSize = $sheetData.meta.size
    const { width: sheetWidth, height: sheetHeight } = $sheetData.sheetSize

    // const { sourceSize } = $sheetData.frames[selectedFrame]
    const { width: w, height: h } = $sheetData.frames[selectedFrame]
    console.log($sheetData.frames[selectedFrame])
    frameWidth = w
    frameHeight = h

    // texture?.repeat.set(
    //   (1 * flipOffset) / (spritesheetSize.w / frameWidth),
    //   1 / (spritesheetSize.h / frameHeight)
    // )
    texture?.repeat.set(
      (1 * flipOffset) / (sheetWidth / frameWidth),
      1 / (sheetHeight / frameHeight)
    )

    const frame = $sheetData.frames[selectedFrame]
    setFrame(frame)
    onload?.()
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
