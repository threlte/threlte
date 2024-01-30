<script lang="ts">
  import { FileLoader, LinearFilter, NearestFilter, RepeatWrapping, type Texture } from 'three'
  import { writable } from 'svelte/store'
  import { useTexture } from '../../hooks/useTexture'
  import { useLoader, watch } from '@threlte/core'
  import { parseAseprite, type SpritesheetFormat } from '@threejs-kit/instanced-sprite-mesh'
  import type { SpritesheetEvents, SpritesheetProps, SpritesheetSlots } from './Spritesheet'
  import { getContext, onMount } from 'svelte'
  import type { AnimatedInstancedSpriteInternalCtx } from './AnimatedInstancedSprite.svelte'

  type $$Props = SpritesheetProps
  type $$Events = SpritesheetEvents
  type $$Slots = SpritesheetSlots

  export let textureUrl: $$Props['textureUrl'] = undefined
  export let dataUrl: $$Props['dataUrl'] = undefined
  export let filter: $$Props['filter'] = 'nearest'

  const spriteCtx = getContext<AnimatedInstancedSpriteInternalCtx>('internal-instanced-sprite-ctx')

  let texture: Texture | undefined = undefined
  let spritesheet: SpritesheetFormat | undefined = undefined
  let jsonData: any = undefined

  const textureStore = writable<Texture | undefined>(texture)
  watch([textureStore], () => {
    // if texture store changes, send to parent via ctx/event
  })

  const spritesheetStore = writable<SpritesheetFormat | undefined>()
  watch([spritesheetStore], () => {
    console.log('spritesheet changed')
    if ($spritesheetStore) {
      console.log('setting spritesheet in sprite')
      spriteCtx.setSpritesheet($spritesheetStore)
    }
  })

  $: console.log({ spritesheet })

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
    console.log('Parsing json to spritesheet')
    console.log({ json })
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

  onMount(() => {
    if (spriteCtx === undefined)
      console.error(
        'Internal sprite context is undefined. <Spritesheet/> component should be a child of <AnimatedInstancedSprite/>'
      )
  })
</script>
