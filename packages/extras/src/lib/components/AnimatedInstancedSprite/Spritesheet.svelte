<script lang="ts">
  import {
    createSpritesheet,
    parseAseprite,
    type SpritesheetFormat
  } from '@threejs-kit/instanced-sprite-mesh'
  import { watch } from '@threlte/core'
  import { getContext, onMount, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { LinearFilter, NearestFilter, RepeatWrapping, type Texture } from 'three'
  import { useTexture } from '../../hooks/useTexture'
  import type { AnimatedInstancedSpriteInternalCtx } from './AnimatedInstancedSprite.svelte'
  import type { SpritesheetProps } from './Spritesheet'

  type $$Props = SpritesheetProps

  export let textureUrl: $$Props['textureUrl'] = undefined
  export let dataUrl: $$Props['dataUrl'] = undefined
  export let filter: $$Props['filter'] = 'nearest'

  const spriteCtx = getContext<AnimatedInstancedSpriteInternalCtx | undefined>(
    'internal-instanced-sprite-ctx'
  )

  let texture: Texture | undefined = undefined
  let spritesheet: SpritesheetFormat | undefined = undefined
  let jsonData: any = undefined

  const textureStore = writable<Texture | undefined>(texture)
  watch([textureStore], ([texture]) => {
    if (texture) spriteCtx?.setTexture(texture)
  })

  const spritesheetStore = writable<SpritesheetFormat | undefined>()
  watch([spritesheetStore], () => {
    if ($spritesheetStore) {
      spriteCtx?.setSpritesheet($spritesheetStore)
    }
  })

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
      jsonStore.set(json)
    }
  })

  const animationFiles: any[] = []

  const registerSpriteFile = (fileMeta: any) => {
    animationFiles.push(fileMeta)
  }

  setContext('instanced-animation-spritesheet-root-level-ctx', {
    registerSpriteFile
  })

  onMount(async () => {
    // check if within instanced sprite context
    if (spriteCtx === undefined)
      console.error(
        'Internal sprite context is undefined. <Spritesheet/> component should be a child of <AnimatedInstancedSprite/>'
      )

    if (animationFiles.length > 0) {
      const spritesheet = createSpritesheet()

      for (const file of animationFiles) {
        spritesheet.add(file.path, file.options, file.animations)
      }
      const built = await spritesheet.build()

      spritesheetStore.set(built.spritesheet)
      textureStore.set(built.texture)

      console.log({ built })
    }

    //
  })
</script>

<slot />
