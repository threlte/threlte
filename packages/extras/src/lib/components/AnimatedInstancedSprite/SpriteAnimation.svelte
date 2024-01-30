<script lang="ts">
  import { getContext } from 'svelte'

  export let name: string
  export let frameRange: [number, number]

  const { registerAnimation } = getContext<any>('instanced-animation-spritesheet-file-level-ctx')

  registerAnimation({ name, frameRange })
</script>
