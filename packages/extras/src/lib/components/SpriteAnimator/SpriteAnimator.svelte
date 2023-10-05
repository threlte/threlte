<script lang='ts'>
  import * as THREE from 'three'
  import { T, useFrame } from '@threlte/core'
  import { useTexture } from '../../hooks/useTexture'
  import { onMount } from 'svelte'

  type Frame = {
    frame: { x: number, y: number, w: number, h: number },
    rotated: boolean,
    trimmed: boolean,
    spriteSourceSize: { x: number, y: number, w: number, h: number },
    sourceSize: { w: number, h: number },
    duration: number
  }

  type SpriteJsonHashData = {
    frames: Record<string, Frame>
    meta: {
      app: string,
      version: string,
      image: string,
      format: string,
      size: { w: number, h: number },
      scale: number
      frameTags: Array<{
        name: string
        from: number
        to: number
        direction: string
      }>
    }
  }

  type $$Props = {
    /** The start frame of the animation */
    startFrame?: number
    /** The end frame of the animation */
    endFrame?: number
    /** The desired frames per second of the animaiton */
    fps?: number
    /** The frame identifier to use, has to be one of animationNames */
    frameName?: string
    /** The URL of the texture JSON (if using JSON-Array or JSON-Hash) */
    textureData?: string | SpriteJsonHashData
    /** The URL of the texture image */
    image?: string
    /** Whether or not the animation should loop */
    loop?: boolean
    /** The number of frames of the animation (required if using plain spritesheet without JSON) */
    numberOfFrames?: number
    /** The animation names of the spritesheet */
    animationNames?: Array<string>
    /** Event callback when the animation starts */
    onStart?: Function
    /** Event callback when the animation ends */
    onEnd?: Function
    /** Event callback when the animation loops */
    onLoopEnd?: Function
    /** Event callback when each frame changes */
    onFrame?: Function
    /** Control when the animation runs */
    autoPlay?: boolean
    /** Whether or not the Sprite should flip sides on the x-axis */
    flipX?: boolean
    /** Sets the alpha value to be used when running an alpha test. https://threejs.org/docs/#api/en/materials/Material.alphaTest */
    alphaTest?: number
    /** Displays the texture on a SpriteGeometry always facing the camera, if set to false, it renders on a PlaneGeometry */
    asSprite?: boolean
  }

  export let startFrame: $$Props['startFrame'] = 0
  export let endFrame: $$Props['endFrame'] 
  export let fps: $$Props['fps'] = 30
  export let frameName: $$Props['frameName'] = ''
  export let textureData: $$Props['textureData']
  export let image: $$Props['image']
  export let loop: $$Props['loop'] = true
  export let numberOfFrames: $$Props['numberOfFrames']
  export let autoPlay: $$Props['autoPlay'] = true
  export let animationNames: $$Props['animationNames']
  export let onStart: $$Props['onStart']
  export let onEnd: $$Props['onEnd']
  export let onLoopEnd: $$Props['onLoopEnd']
  export let onFrame: $$Props['onFrame']
  export let flipX: $$Props['flipX']
  export let alphaTest: $$Props['alphaTest'] = 0
  export let asSprite: $$Props['asSprite'] = true

  let tex = useTexture(image)

  let materialRef: THREE.Material | undefined

  let spriteData: null | SpriteJsonHashData = null
  let hasEnded = false
  let timerOffset = performance.now()
  let currentFrame = startFrame
  let currentFrameName = frameName
  let fpsInterval = 1000 / fps
  let spriteTexture = new THREE.Texture()
  let totalFrames = 0
  let aspect = 1
  let flipOffset = flipX ? -1 : 1

  const calculateAspectRatio = (width: number, height: number) => {
    const aspectRatio = height / width
    return aspectRatio
  }

  const parseSpriteData = (json: null | SpriteJsonHashData, texture: THREE.Texture): void => {
    texture.premultiplyAlpha = false

    spriteTexture = texture

    return

    // sprite only case
    if (json === null) {
      if (texture && numberOfFrames) {
        //get size from texture
        const width = texture.image.width
        const height = texture.image.height
        const frameWidth = width / numberOfFrames
        const frameHeight = height
        totalFrames = numberOfFrames
        spriteData = {
          frames: {},
          meta: {
            version: '1.0',
            size: { w: width, h: height },
            scale: 1,
          },
        }

        if (Number.parseInt(frameWidth.toString(), 10) === frameWidth) {
          // if it fits
          for (let i = 0; i < numberOfFrames; i += 1) {
            spriteData.frames[`${i}`] = {
              frame: { x: i * frameWidth, y: 0, w: frameWidth, h: frameHeight },
              rotated: false,
              trimmed: false,
              spriteSourceSize: { x: 0, y: 0, w: frameWidth, h: frameHeight },
              sourceSize: { w: frameWidth, h: height },
              duration: 100,
            }
          }
        }
      }

      return
    } 

    spriteData = json
    totalFrames = Object.keys(json.frames).length

    const { w, h } = Object.values(json.frames)[0].sourceSize
    aspect = calculateAspectRatio(w, h)
  }

  // modify the sprite material after json is parsed and state updated
  const modifySpritePosition = (data: SpriteJsonHashData, texture: THREE.Texture): void => {
    const {
      meta: { size: metaInfo },
      frames,
    } = data


    const { w: frameW, h: frameH } = frames[frameName ?? '']?.sourceSize ?? { w: 0, h: 0 }

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping

    // texture.center.set(0, 0)
    // texture.repeat.set((1 * flipOffset) / (metaInfo.w / frameW), 1 / (metaInfo.h / frameH))


    //const framesH = (metaInfo.w - 1) / frameW
    const framesV = (metaInfo.h - 1) / frameH
    const frameOffsetY = 1 / framesV
    // texture.offset.x = 0.0 //-material.current.map.repeat.x
    // texture.offset.y = 1 - frameOffsetY

    onStart?.({ currentFrameName: frameName, currentFrame })
  }

  // run the animation on each frame
  const runAnimation = (texture: THREE.Texture): void => {
    const now = performance.now()
    const diff = now - timerOffset
    const {
      meta: { size: metaInfo },
      frames,
    } = spriteData!
    const { w: frameW, h: frameH } = Object.values(frames)[0].sourceSize
    const key = Object.keys(frames)[currentFrame]
    const frame = frames[key]

    let finalValX = 0
    let finalValY = 0
    const _endFrame = endFrame || totalFrames - 1

    if (currentFrame > _endFrame) {
      currentFrame = loop ? startFrame ?? 0 : 0
      if (loop) {
        onLoopEnd?.({
          currentFrameName: frameName,
          currentFrame: currentFrame,
        })
      } else {
        onEnd?.({
          currentFrameName: frameName,
          currentFrame: currentFrame,
        })
        hasEnded = true
      }
      if (!loop) return
    }

    if (diff <= fpsInterval) return
    timerOffset = now - (diff % fpsInterval)

    const framesH = (metaInfo.w - 1) / frameW
    const framesV = (metaInfo.h - 1) / frameH

    const {
      frame: { x: frameX, y: frameY },
      sourceSize: { w: originalSizeX, h: originalSizeY },
    } = frame

    const frameOffsetX = 1 / framesH
    const frameOffsetY = 1 / framesV

    finalValX =
      flipOffset > 0
        ? frameOffsetX * (frameX / originalSizeX)
        : frameOffsetX * (frameX / originalSizeX) - texture.repeat.x
    finalValY = Math.abs(1 - frameOffsetY) - frameOffsetY * (frameY / originalSizeY)

    texture.offset.x = finalValX
    texture.offset.y = finalValY

    currentFrame += 1
  }

  const { start, stop } = useFrame(() => {
    runAnimation(spriteTexture)
    onFrame?.({ currentFrameName, currentFrame })
  }, { autostart: false })

  onMount(async () => {
    spriteData = await fetch(textureData).then((response) => response.json())
  })

  $: if (autoPlay && !hasEnded && spriteData && spriteTexture) {
    start()
  } else {
    stop()
  }

  $: if (currentFrameName !== frameName && frameName) {
    currentFrame = 0
    currentFrameName = frameName
    hasEnded = false
  }

  $: $tex && spriteData && parseSpriteData(spriteData, $tex)
  $: flipX, spriteData && spriteTexture && modifySpritePosition(spriteData, spriteTexture)
  $: console.log(spriteTexture)
</script>

{#await tex then value}
  {#if asSprite}
    <T.Sprite scale.y={aspect} {...$$restProps}>
      <T.SpriteMaterial
        toneMapped={false}
        transparent={false}
        map={$tex}
        {alphaTest}
      />

      <slot />
    </T.Sprite>
  {:else}
    <T.Mesh scale.y={aspect} {...$$restProps}>
      <T.MeshBasicMaterial
        toneMapped={false}
        transparent={true}
        side={THREE.DoubleSide}
        map={$tex}
        {alphaTest}
      />
      <T.PlaneGeometry />

      <slot />
    </T.Mesh>
  {/if}
{/await}
