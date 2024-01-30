<script lang="ts">
  import { onMount, setContext } from 'svelte'
  import { writable } from 'svelte/store'

  const instances: any[] = []

  const registerAnimation = (animation: any) => {
    console.log({ animation })
    instances.push(animation)
  }

  setContext('instanced-animation-spritesheet-file-level-ctx', {
    registerAnimation
  })

  onMount(() => {
    console.log({ instances })
  })
</script>

<slot />
