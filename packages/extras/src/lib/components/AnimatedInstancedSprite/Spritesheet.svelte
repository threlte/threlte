<script lang="ts">
  import { FileLoader, LinearFilter, NearestFilter, RepeatWrapping, type Texture } from 'three'
  import { writable } from 'svelte/store'
  import { useTexture } from '../../hooks/useTexture'
  import { useLoader, watch } from '@threlte/core'
  import { parseAseprite, type SpritesheetFormat } from '@threejs-kit/instanced-sprite-mesh'
  import type { SpritesheetEvents, SpritesheetProps, SpritesheetSlots } from './Spritesheet'

  type $$Props = SpritesheetProps
  type $$Events = SpritesheetEvents
  type $$Slots = SpritesheetSlots

  export let textureUrl: $$Props['textureUrl'] = undefined
  export let dataUrl: $$Props['dataUrl'] = undefined
  export let filter: $$Props['filter'] = 'nearest'

  let texture: Texture | undefined = undefined
  let spritesheet: SpritesheetFormat | undefined = undefined
  let jsonData: any = undefined

  const textureStore = writable<Texture | undefined>(texture)

  watch([textureStore], () => {
    // if texture store changes, send to parent via ctx/event
  })

  const textureUrlStore = writable<string | undefined>(textureUrl)
  $: textureUrlStore.set(dataUrl)

  watch([textureUrlStore], () => {
    console.log(`loading new spritesheet texture from URL`)
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

  watch([jsonStore], () => {
    spritesheet = parseAseprite($jsonStore)
  })

  const dataUrlStore = writable<typeof dataUrl>(dataUrl)
  $: dataUrlStore.set(dataUrl)

  watch([dataUrlStore], () => {
    if (!dataUrl) return
    useLoader(FileLoader).load(dataUrl, {
      transform: (file) => {
        if (typeof file !== 'string') return
        try {
          jsonStore.set(JSON.parse(file))
        } catch (e) {
          console.error(e)
          return
        }
      }
    })
  })
</script>
