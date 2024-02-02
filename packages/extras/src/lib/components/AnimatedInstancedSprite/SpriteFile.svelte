<script lang="ts">
  import { getContext, onMount, setContext } from 'svelte'

  export let path: string
  export let options: any = {}

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
      registerSpriteFile({ path, options, animations })
    }
  })
</script>

<slot />
