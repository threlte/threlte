<script lang="ts">
  import { getContext, onMount, setContext } from 'svelte'
  import type { SpriteFileProps } from './SpriteFile'

  type $$Props = SpriteFileProps

  export let textureUrl: $$Props['textureUrl']
  export let options: $$Props['options']

  const animations: any[] = []

  const registerAnimation = (animation: any) => {
    animations.push(animation)
  }

  setContext('instanced-animation-spritesheet-file-level-ctx', {
    registerAnimation
  })

  const { registerSpriteFile } = getContext<any | undefined>(
    'instanced-animation-spritesheet-root-level-ctx'
  )

  onMount(() => {
    if (registerSpriteFile) {
      registerSpriteFile({ path: textureUrl, options, animations })
    }
  })
</script>

<slot />
