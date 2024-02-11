<script lang="ts">
  import {
    createSpritesheet,
    parseAseprite,
    type SpritesheetFormat
  } from '@threejs-kit/instanced-sprite-mesh'
  import { createRawEventDispatcher, watch } from '@threlte/core'
  import { onMount, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { LinearFilter, NearestFilter, RepeatWrapping, type Texture } from 'three'
  import { useTexture } from '../../hooks/useTexture'
  import type { SpritesheetContext, SpritesheetProps, SpritesheetEvents } from './Spritesheet'
  import SpriteFile from './SpriteFile.svelte'
  import SpriteAnimation from './SpriteAnimation.svelte'

  type $$Props = SpritesheetProps
  type $$Events = SpritesheetEvents

  export let textureUrl: $$Props['textureUrl'] = undefined
  export let dataUrl: $$Props['dataUrl'] = undefined
  export let filter: $$Props['filter'] = 'nearest'
  export let aseprite: $$Props['aseprite'] = undefined

  let texture: Texture | undefined = undefined
  let spritesheet: SpritesheetFormat | undefined = undefined
  let jsonData: any = undefined

  const textureStore = writable<Texture | undefined>(texture)
  const spritesheetStore = writable<SpritesheetFormat | undefined>()

  $: spritesheetStore.set(spritesheet)
  const textureUrlStore = writable<string | undefined>(textureUrl)
  $: textureUrlStore.set(textureUrl)

  watch([textureUrlStore], () => {
    // if a texture url changes, load new texture and set it in textureStore
    if (!textureUrl) return
    useTexture(textureUrl, {
      transform: (newTexture: Texture) => {
        newTexture.matrixAutoUpdate = false
        newTexture.generateMipmaps = false
        newTexture.premultiplyAlpha = false
        newTexture.wrapS = newTexture.wrapT = RepeatWrapping
        newTexture.magFilter = newTexture.minFilter =
          filter === 'nearest' ? NearestFilter : LinearFilter
        textureStore.set(newTexture)
      }
    })
  })

  const jsonStore = writable(jsonData)
  $: jsonStore.set(jsonData)

  watch([jsonStore], ([json]) => {
    if (json) {
      spritesheet = parseAseprite(json)
      spritesheetStore.set(spritesheet)
    }
  })

  const dataUrlStore = writable<typeof dataUrl>(dataUrl)
  $: dataUrlStore.set(dataUrl)

  watch([dataUrlStore], async ([url]) => {
    if (url) {
      const res = await fetch(url)
      const json = await res.json()

      if (aseprite) {
        jsonStore.set(json)
      } else {
        spritesheetStore.set(json)
      }
    }
  })

  const animationFiles: any[] = []

  const registerSpriteFile = (fileMeta: any) => {
    animationFiles.push(fileMeta)
  }

  setContext<SpritesheetContext>('instanced-spritesheet-top-level-stores-ctx', {
    textureStore,
    spritesheetStore
  })

  setContext('instanced-animation-spritesheet-root-level-ctx', {
    registerSpriteFile
  })

  const dispatch = createRawEventDispatcher<$$Events>()
  watch([spritesheetStore, textureStore], ([spritesheet, texture]) => {
    if (spritesheet && texture) {
      dispatch('load')
    }
  })

  onMount(async () => {
    // if child components that contain a spritesheet definition
    // were mounted, build a spritesheet and set texture&spritesheet on mesh
    if (animationFiles.length > 0) {
      const spritesheet = createSpritesheet()

      for (const file of animationFiles) {
        spritesheet.add(file.path, file.options, file.animations)
      }
      const built = await spritesheet.build()

      spritesheetStore.set(built.spritesheet)
      textureStore.set(built.texture)
    }
  })

  const proxySpritefileComponent = new Proxy(SpriteFile, {
    construct(_target, [args]) {
      return new SpriteFile(args)
    }
  })

  const proxySpriteanimationComponent = new Proxy(SpriteAnimation, {
    construct(_target, [args]) {
      return new SpriteAnimation(args)
    }
  })
</script>

<slot
  File={proxySpritefileComponent}
  Animation={proxySpriteanimationComponent}
/>
