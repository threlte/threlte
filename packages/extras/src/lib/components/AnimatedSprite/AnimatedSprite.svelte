<script lang='ts'>
  import * as THREE from 'three'
  import {
    T,
    asyncWritable,
    type AsyncWritable,
    createRawEventDispatcher,
    useFrame,
    useThrelte,
    watch,
    forwardEventHandlers
  } from '@threlte/core'
  import type {
    AnimatedSpriteProps,
    AnimatedSpriteEvents,
    AnimatedSpriteSlots,
    SpriteJsonHashData,
    FrameTag
  } from './AnimatedSprite'
  import { useTexture } from '../../hooks/useTexture'
  import { useLoader } from '@threlte/core'

  type $$Props = Required<AnimatedSpriteProps>
  type $$Events = AnimatedSpriteEvents
  type $$Slots = AnimatedSpriteSlots

  export let animation: $$Props['animation'] = ''
  export let startFrame: $$Props['startFrame'] = 0
  export let endFrame: $$Props['endFrame'] = 0
  export let fps: $$Props['fps'] = 30
  export let textureData: $$Props['textureData'] = ''
  export let image: $$Props['image']
  export let loop: $$Props['loop'] = true
  export let numberOfFrames: $$Props['numberOfFrames'] = 0
  export let playing: $$Props['playing'] = true
  export let flipX: $$Props['flipX'] = false
  export let alphaTest: $$Props['alphaTest'] = 0
  export let asSprite: $$Props['asSprite'] = true
  export let transparent: $$Props['transparent'] = true

  export const ref = asSprite ? new THREE.Sprite() : new THREE.Mesh()

  const component = forwardEventHandlers()
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
    const framesH = spritesheetSize.w / frameWidth
    const framesV = spritesheetSize.h / frameHeight
    const frameOffsetX = 1 / framesH
    const frameOffsetY = 1 / framesV

    const x = flipOffset > 0
      ? frameOffsetX * (frame.x / frameWidth)
      : frameOffsetX * (frame.x / frameHeight) - texture.repeat.x
    const y = Math.abs(1 - frameOffsetY) - frameOffsetY * (frame.y / frameHeight)

    texture?.offset.set(x, y)
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

    // texture.center.set(0, 0)
    // texture.repeat.set(1.0 / totalFrames, 1.0)
    texture.repeat.set((1 * flipOffset) / (spritesheetSize.w / frameWidth), 1 / (spritesheetSize.h / frameHeight))
    
    setAnimation()
  })

  $: if (playing && json && texture) {
    start()
  } else {
    stop()
  }
</script>

<T
  is={ref}
  bind:this={$component}
  scale.y={aspect}
  {...$$restProps}
  let:ref
>
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

  <slot {ref} />
</T>
