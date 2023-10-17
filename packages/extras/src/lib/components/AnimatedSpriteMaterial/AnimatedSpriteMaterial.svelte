<script lang='ts'>
  import * as THREE from 'three'
  import {
    T,
    asyncWritable,
    type AsyncWritable,
    createRawEventDispatcher,
    useFrame,
    watch,
    useLoader,
    useParent
  } from '@threlte/core'
  import type {
    AnimatedSpriteProps,
    AnimatedSpriteEvents,
    AnimatedSpriteSlots,
    SpriteJsonHashData,
    FrameTag,
    Frame
  } from './AnimatedSpriteMaterial.svelte'
  import { useTexture } from '../../hooks/useTexture'

  type $$Props = Required<AnimatedSpriteProps>
  type $$Events = AnimatedSpriteEvents
  type $$Slots = AnimatedSpriteSlots

  export let textureUrl: $$Props['textureUrl']
  export let dataUrl: $$Props['dataUrl'] = ''
  export let filter: $$Props['filter'] = 'nearest'
  export let animation: $$Props['animation'] = ''
  export let startFrame: $$Props['startFrame'] = 0
  export let endFrame: $$Props['endFrame'] = undefined
  export let delay: $$Props['delay'] = 0
  export let fps: $$Props['fps'] = 30
  export let loop: $$Props['loop'] = true
  export let rows: $$Props['rows'] = 1
  export let columns: $$Props['columns'] = undefined
  export let totalFrames: $$Props['totalFrames'] = 0
  export let playing: $$Props['playing'] = true
  export let flipX: $$Props['flipX'] = false
  export let alphaTest: $$Props['alphaTest'] = 0.1
  export let transparent: $$Props['transparent'] = true

  const parent = useParent()
  const dispatch = createRawEventDispatcher<$$Events>()

  let timerOffset = 0
  let currentFrame = startFrame
  let numFrames = 0
  let flipOffset = flipX ? -1 : 1
  let frameWidth = 0
  let frameHeight = 0
  let texture: THREE.Texture | undefined
  let json: SpriteJsonHashData | undefined
  let frameNames: string[] = []
  let frameTag: FrameTag | undefined
  let spritesheetSize = { w: 0, h: 0 }

  let isMesh = 'isMesh' in $parent!
  $: isMesh = 'isMesh' in $parent!
  $: fpsInterval = 1000 / fps

  export let is: THREE.Material = isMesh ? new THREE.MeshBasicMaterial() : new THREE.SpriteMaterial()
  export let ref = is

  const textureStore = useTexture(textureUrl, {
    transform: (value: THREE.Texture) => {
      value.matrixAutoUpdate = false
      value.generateMipmaps = false
      value.premultiplyAlpha = false
      value.wrapS = value.wrapT = THREE.RepeatWrapping
      value.magFilter = value.minFilter = filter === 'nearest'
        ? THREE.NearestFilter
        : THREE.LinearFilter
      return value
    }
  })

  const jsonStore: AsyncWritable<SpriteJsonHashData | undefined> = dataUrl
    ? useLoader(THREE.FileLoader).load(dataUrl, {
      transform: (file) => {
        if (typeof file !== 'string') return
        try { return JSON.parse(file) } catch { return }
      }
    })
    : asyncWritable(new Promise<SpriteJsonHashData>((resolve) => {
      const unsub = textureStore.subscribe((value) => {
        if (!value) return
        unsub()
        resolve(createData(value))
      })
    }))

  const createData = (texture: THREE.Texture) => {
    const { width, height } = texture.image
    const cols = columns ?? totalFrames

    numFrames = totalFrames

    const frameWidth = width / cols
    const frameHeight = height / rows
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

    for (let i = 0; i < numFrames; i += 1) {
      // Calculate the row and column for the current frame
      const row = Math.floor(i / cols);
      const col = i % cols;

      // Calculate the x, y coordinates of the frame within the sprite sheet
      const x = col * frameWidth;
      const y = row * frameHeight;

      data.frames[`${i}`] = {
        frame: { x, y, w: frameWidth, h: frameHeight },
        spriteSourceSize: { x: 0, y: 0, w: frameWidth, h: frameHeight },
        sourceSize: { w: frameWidth, h: frameHeight },
      }
    }

    return data
  }

  const setFrame = (frame: Frame['frame']) => {
    const horizontalFrames = spritesheetSize.w / frameWidth
    const verticalFrames = spritesheetSize.h / frameHeight
    const frameOffsetX = 1 / horizontalFrames
    const frameOffsetY = 1 / verticalFrames

    const x = flipOffset > 0
      ? frameOffsetX * (frame.x / frameWidth)
      : frameOffsetX * (frame.x / frameHeight) - texture.repeat.x
    const y = Math.abs(1 - frameOffsetY) - frameOffsetY * (frame.y / frameHeight)

    texture?.offset.set(x, y)
    texture?.updateMatrix()
  }

  const setAnimation = (name: string) => {
    if (!json) return

    frameTag = json?.meta.frameTags.find((tag) => tag.name === name)
    currentFrame = frameTag?.from ?? 0

    setFrame(json.frames[frameNames[currentFrame]].frame)

    if (dispatch.hasEventListener('start')) {
      dispatch('start')
    }
  }

  const { start, stop, started } = useFrame(() => {
    const now = performance.now()
    const diff = now - timerOffset
    const name = frameNames[currentFrame]
    const { frame, duration } = json!.frames[name]
    const interval = duration ?? fpsInterval

    if (diff <= interval) return
    timerOffset = now - (diff % interval)

    const start = frameTag?.from ?? startFrame
    const end = frameTag?.to ?? endFrame ?? numFrames - 1

    setFrame(frame)

    currentFrame += 1
  
    if (currentFrame > end) {
      currentFrame = start
  
      if (loop) {
        if (dispatch.hasEventListener('loop')) {
          dispatch('loop')
        }
      } else {
        stop()
        if (dispatch.hasEventListener('end')) {
          dispatch('end')
        }
      }
    }
  }, { autostart: false })

  watch([textureStore, jsonStore], ([nextTexture, nextJson]) => {
    if (nextTexture === undefined || nextJson === undefined) return

    texture = nextTexture.clone()
    json = nextJson
    frameNames = Object.keys(json.frames)
    numFrames = frameNames.length
    spritesheetSize = json.meta.size 

    const { sourceSize } = Object.values(json.frames)[0]
    frameWidth = sourceSize.w
    frameHeight = sourceSize.h

    texture.repeat.set(
      (1 * flipOffset) / (spritesheetSize.w / frameWidth),
      1 / (spritesheetSize.h / frameHeight)
    )

    setAnimation(animation)
  })

  $: setAnimation(animation)

  $: if (loop && !$started && json && texture) {
    start()
  }

  $: if (playing && json && texture) {
    timerOffset = performance.now() - delay
    start()
  } else {
    stop()
  }
</script>

{#if texture && isMesh}
  <T 
    is={ref}
    map={texture}
    toneMapped={false}
    side={THREE.DoubleSide}
    shadowSide={THREE.DoubleSide}
    {transparent}
    {alphaTest}
    {...$$restProps}
  />
  <T.MeshDepthMaterial
    attach='customDepthMaterial'
    depthPacking={THREE.RGBADepthPacking}
    map={texture}
    {alphaTest}
  />
{:else if texture}
  <T
    is={ref}
    map={texture}
    toneMapped={false}
    {transparent}
    {alphaTest}
    {...$$restProps}
  />
{/if}
