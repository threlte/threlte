<script lang='ts'>
  import * as THREE from 'three'
  import { T, asyncWritable, type AsyncWritable, createRawEventDispatcher, useFrame, useThrelte, watch } from '@threlte/core'
  import { useTexture } from '../../hooks/useTexture'
  import { useLoader } from '@threlte/core'

  type Frame = {
    frame: { x: number, y: number, w: number, h: number },
    spriteSourceSize: { x: number, y: number, w: number, h: number },
    sourceSize: { w: number, h: number },
    duration: number
  }

  type FrameTag = {
    name: string
    from: number
    to: number
    direction: string
  }

  type SpriteJsonHashData = {
    frames: Record<string, Frame>
    meta: {
      app: string,
      image: string,
      version: string,
      format: string,
      size: { w: number, h: number },
      scale: number
      frameTags: FrameTag[]
    }
  }

  type $$Props = {
    /** The current playing animation */
    animation?: string

    /** The URL of the texture image */
    image: string

    /** The start frame of the animation */
    startFrame?: number
    /** The end frame of the animation */
    endFrame?: number
    /** The desired frames per second of the animaiton */
    fps?: number
    /** The URL of the texture JSON (if using JSON-Array or JSON-Hash) */
    textureData?: string
    /** Whether or not the animation should loop */
    loop?: boolean
    /** The number of frames of the animation (required if using plain spritesheet without JSON) */
    numberOfFrames?: number
    /** The animation names of the spritesheet */
    animationNames?: Array<string>
    /** Control when the animation runs */
    playing?: boolean
    /** Whether or not the Sprite should flip sides on the x-axis */
    flipX?: boolean
    /** Sets the alpha value to be used when running an alpha test. https://threejs.org/docs/#api/en/materials/Material.alphaTest */
    alphaTest?: number
    /** Displays the texture on a SpriteGeometry always facing the camera, if set to false, it renders on a PlaneGeometry */
    asSprite?: boolean
    
    transparent?: boolean
  }

  export let animation: Required<$$Props>['animation'] = ''
  export let startFrame: Required<$$Props>['startFrame'] = 0
  export let endFrame: $$Props['endFrame'] = 0
  export let fps: Required<$$Props>['fps'] = 30
  export let textureData: $$Props['textureData'] = undefined
  export let image: $$Props['image']
  export let loop: Required<$$Props>['loop'] = true
  export let numberOfFrames: $$Props['numberOfFrames'] = undefined
  export let playing: Required<$$Props>['playing'] = true
  export let animationNames: $$Props['animationNames'] = undefined
  export let flipX: $$Props['flipX'] = undefined
  export let alphaTest: Required<$$Props>['alphaTest'] = 0
  export let asSprite: Required<$$Props>['asSprite'] = true
  export let transparent: Required<$$Props>['transparent'] = true

  export const ref = asSprite ? new THREE.Sprite() : new THREE.Mesh()

  type $$Events = {
    /** Fires when an animation starts */
    start: void
    /** Fires when an animation ends */
    end: void
    /** Fires when an animation loop completes */
    loop: void
  }

  const dispatch = createRawEventDispatcher<$$Events>()
  const { renderer } = useThrelte()

  const textureStore = useTexture(image, {
    transform: (texture: THREE.Texture) => {
      texture.matrixAutoUpdate = false
      texture.premultiplyAlpha = false
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      return texture
    }
  })

  const jsonStore: AsyncWritable<SpriteJsonHashData | undefined> = textureData
    ? useLoader(THREE.FileLoader).load(textureData, {
      transform: (file) => {
        if (typeof file !== 'string') return
        try { return JSON.parse(file) } catch { return }
      }
    })
    : asyncWritable(Promise.resolve(undefined))

  let timerOffset = performance.now()
  let currentFrame = startFrame
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

    
    const framesH = (spritesheetSize.w) / frameWidth
    const framesV = (spritesheetSize.h) / frameHeight
    const frameOffsetY = 1 / framesV
    texture?.offset.set(0, 1 - frameOffsetY)
    if (dispatch.hasEventListener('start')) {
      dispatch('start')
    }
  }

  const setFrame = (name: string) => {
    const { frame } = json!.frames[name]
    const spritesheetSize = json!.meta.size
    const framesH = (spritesheetSize.w) / frameWidth
    const framesV = (spritesheetSize.h) / frameHeight
    const frameOffsetX = 1 / framesH
    const frameOffsetY = 1 / framesV

    const finalValX = flipOffset > 0
      ? frameOffsetX * (frame.x / frameWidth)
      : frameOffsetX * (frame.x / frameHeight) - texture.repeat.x
    const finalValY = Math.abs(1 - frameOffsetY) - frameOffsetY * (frame.y / frameHeight)

    texture?.offset.set(finalValX, finalValY)
    texture?.updateMatrix()
  }

  const { start, stop } = useFrame(() => {
    const now = performance.now()
    const diff = now - timerOffset
    const name = frameNames[currentFrame]
    const interval = json!.frames[name].duration ?? fpsInterval

    if (diff <= interval) return
    timerOffset = now - (diff % interval)

    const start = frameTag?.from ?? startFrame
    const end = frameTag?.to ?? endFrame ?? totalFrames - 1
    
    if (currentFrame > end) {
      currentFrame = loop ? start : 0
  
      if (loop && dispatch.hasEventListener('loop')) {
        dispatch('loop')
      } else if (dispatch.hasEventListener('end')) {
        dispatch('end')
      }

      if (!loop) return
    }

    setFrame(name)

    currentFrame += 1
  }, { autostart: false })

  let texture: THREE.Texture
  let json: SpriteJsonHashData
  let frameNames: string[] = []
  let frameTag: FrameTag | undefined
  let spritesheetSize = { w: 0, h: 0 }

  const setAnimation = () => {
    frameTag = json?.meta.frameTags.find(({ name }) => name === animation)
    currentFrame = frameTag?.from ?? 0
    setFrame(frameNames[currentFrame])
  }

  watch([textureStore, jsonStore], ([nextTexture, nextJson]) => {
    if (nextTexture === undefined || nextJson === undefined) return
  
    texture = nextTexture
    json = nextJson
    frameNames = Object.keys(json.frames)
    totalFrames = frameNames.length
    spritesheetSize = json.meta.size 

    const { sourceSize } = Object.values(json.frames)[0]
    frameWidth = sourceSize.w
    frameHeight = sourceSize.h
    aspect = frameHeight / frameWidth

    texture.center.set(0, 0)
    // texture.repeat.set(1.0 / totalFrames, 1.0)
    texture.repeat.set((1 * flipOffset) / (spritesheetSize.w / frameWidth), 1 / (spritesheetSize.h / frameHeight))

    
    
    setAnimation()
  })

  $: if (json && texture) {
    
    // 
    
    // 

    
  }

  $: if (playing && json && texture) {
    start()
  } else {
    stop()
  }
</script>

<T is={ref} scale.y={aspect} {...$$restProps}>
  {#if texture}
    {#if asSprite}
      <T.SpriteMaterial
        map={texture}
        toneMapped={false}
        {transparent}
        {alphaTest}
      />
    {:else}
      <T.MeshBasicMaterial
        map={texture}
        toneMapped={false}
        side={THREE.FrontSide}
        {transparent}
        {alphaTest}
      />
      <T.PlaneGeometry />
    {/if}
  {/if}

  <slot />
</T>
