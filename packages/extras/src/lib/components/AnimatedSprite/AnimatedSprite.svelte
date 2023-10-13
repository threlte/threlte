<script lang='ts'>
  import * as THREE from 'three'
  import { T, asyncWritable, type AsyncWritable, createRawEventDispatcher, useFrame } from '@threlte/core'
  import { useTexture } from '../../hooks/useTexture'
  import { useLoader } from '@threlte/core'

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
    /** The URL of the texture image */
    image: string
    /** The start frame of the animation */
    startFrame?: number
    /** The end frame of the animation */
    endFrame?: number
    /** The desired frames per second of the animaiton */
    fps?: number
    /** The frame identifier to use, has to be one of animationNames */
    frameName?: string
    /** The URL of the texture JSON (if using JSON-Array or JSON-Hash) */
    textureData?: string
    /** Whether or not the animation should loop */
    loop?: boolean
    /** The number of frames of the animation (required if using plain spritesheet without JSON) */
    numberOfFrames?: number
    /** The animation names of the spritesheet */
    animationNames?: Array<string>
    /** Control when the animation runs */
    autoPlay?: boolean
    /** Whether or not the Sprite should flip sides on the x-axis */
    flipX?: boolean
    /** Sets the alpha value to be used when running an alpha test. https://threejs.org/docs/#api/en/materials/Material.alphaTest */
    alphaTest?: number
    /** Displays the texture on a SpriteGeometry always facing the camera, if set to false, it renders on a PlaneGeometry */
    asSprite?: boolean
    
    transparent?: boolean
  }

  export let startFrame: Required<$$Props>['startFrame'] = 0
  export let endFrame: $$Props['endFrame'] = 0
  export let fps: Required<$$Props>['fps'] = 30
  export let frameName: Required<$$Props>['frameName'] = ''
  export let textureData: $$Props['textureData'] = undefined
  export let image: $$Props['image']
  export let loop: Required<$$Props>['loop'] = true
  export let numberOfFrames: $$Props['numberOfFrames']
  export let autoPlay: Required<$$Props>['autoPlay'] = true
  export let animationNames: $$Props['animationNames']
  export let flipX: $$Props['flipX']
  export let alphaTest: Required<$$Props>['alphaTest'] = 0
  export let asSprite: Required<$$Props>['asSprite'] = true
  export let transparent: Required<$$Props>['transparent'] = true

  
  type $$Events = {
    /** Fires when an animation starts */
    start: void
    /** Fires when an animation ends */
    end: void
    /** Fires when an animation loop completes */
    loop: void
  }

  const dispatch = createRawEventDispatcher<$$Events>()

  const textureStore = useTexture(image, {
    transform: (texture: THREE.Texture) => {
      texture.matrixAutoUpdate = false
      texture.premultiplyAlpha = false
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter
      return texture
    }
  })

  const jsonStore = textureData
    ? useLoader(THREE.FileLoader).load(textureData, {
      transform: (file) => {
        if (typeof file !== 'string') return undefined
        try {
          return JSON.parse(file)
        } catch {
          return undefined
        }
      }
    })
    : asyncWritable(Promise.resolve())

  let hasEnded = false
  let timerOffset = performance.now()
  let currentFrame = startFrame
  let currentFrameName = frameName
  let fpsInterval = 1000 / fps
  let totalFrames = 0
  let aspect = 1
  let flipOffset = flipX ? -1 : 1
  let frameWidth = 0
  let frameHeight = 0

  export const createData = () => {
    if (!texture || !numberOfFrames) return
  
    const { width, height } = texture.image
    const frameWidth = width / numberOfFrames
    totalFrames = numberOfFrames

    const data: SpriteJsonHashData = {
      frames: {},
      meta: {
        app: '',
        image: '',
        format: '',
        frameTags: [],
        version: '1.0',
        size: { w: width, h: height },
        scale: 1,
      },
    }
    
    if (Number.parseInt(frameWidth.toString(), 10) === frameWidth) {
      // if it fits
      for (let i = 0; i < numberOfFrames; i += 1) {
        data.frames[`${i}`] = {
          frame: { x: i * frameWidth, y: 0, w: frameWidth, h: height },
          rotated: false,
          trimmed: false,
          spriteSourceSize: { x: 0, y: 0, w: frameWidth, h: height },
          sourceSize: { w: frameWidth, h: height },
          duration: 100,
        }
      }
    }

    return data
  }

  // modify the sprite material after json is parsed and state updated
  const modifySpritePosition = () => {
    if (!json) return

    const spritesheetSize = json.meta.size 
    const framesH = (spritesheetSize.w) / frameWidth
    const framesV = (spritesheetSize.h) / frameHeight
    const frameOffsetY = 1 / framesV
    texture?.offset.set(0, 1 - frameOffsetY)
    if (dispatch.hasEventListener('start')) {
      dispatch('start')
    }
  }

  const { start, stop } = useFrame(() => {
    const now = performance.now()
    const diff = now - timerOffset
    const spritesheetSize = json.meta.size
    const { frames } = json
    const _endFrame = endFrame || totalFrames - 1
    
    const key = Object.keys(frames)[currentFrame]
    const { frame } = frames[key]

    let finalValX = 0
    let finalValY = 0

    if (currentFrame >= _endFrame) {
      currentFrame = loop ? startFrame ?? 0 : 0
      if (loop && dispatch.hasEventListener('loop')) {
        dispatch('loop')
      } else if (dispatch.hasEventListener('end')) {
        dispatch('end')
        hasEnded = true
      }
      if (!loop) return
    }

    if (diff <= fpsInterval) return
    timerOffset = now - (diff % fpsInterval)

    const framesH = (spritesheetSize.w) / frameWidth
    const framesV = (spritesheetSize.h) / frameHeight
    const frameOffsetX = 1 / framesH
    const frameOffsetY = 1 / framesV

    finalValX = flipOffset > 0
      ? frameOffsetX * (frame.x / frameWidth)
      : frameOffsetX * (frame.x / frameHeight) - texture.repeat.x
    finalValY = Math.abs(1 - frameOffsetY) - frameOffsetY * (frame.y / frameHeight)

    texture?.offset.set(finalValX, finalValY)
    texture?.updateMatrix()

    currentFrame += 1
  }, { autostart: false })


  $: if (currentFrameName !== frameName && frameName) {
    currentFrame = 0
    currentFrameName = frameName
    hasEnded = false
  }

  $: texture = $textureStore
  $: json = textureData ? $jsonStore : createData()
  $: flipX, json && texture && modifySpritePosition()

  $: if (autoPlay && !hasEnded && json && texture) {
    start()
  } else {
    stop()
  }


  $: if (json && texture) {
    totalFrames = Object.keys(json.frames).length
    texture.center.set(0, 0)
    texture.repeat.set(1.0 / totalFrames, 1.0)
    // texture.repeat.set((1 * flipOffset) / (metaInfo.w / frameW), 1 / (metaInfo.h / frameH))

    const { sourceSize } = Object.values(json.frames)[0]
    frameWidth = sourceSize.w
    frameHeight = sourceSize.h
    aspect = frameHeight / frameWidth
  }
</script>

{#if asSprite}
  <T.Sprite scale.y={aspect} {...$$restProps}>
    {#if texture}
      <T.SpriteMaterial
        map={texture}
        toneMapped={false}
        {transparent}
        {alphaTest}
      />
    {/if}

    <slot />
  </T.Sprite>
{:else}
  <T.Mesh scale.y={aspect} {...$$restProps}>
    {#if texture}
      <T.MeshBasicMaterial
        map={texture}
        toneMapped={false}
        side={THREE.FrontSide}
        {transparent}
        {alphaTest}
      />
    {/if}
    <T.PlaneGeometry />

    <slot />
  </T.Mesh>
{/if}
