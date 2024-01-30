<script lang="ts">
  import { getContext } from 'svelte'

  export let name: string

  const { registerAnimation } = getContext<any>('instanced-animation-spritesheet-file-level-ctx')

  registerAnimation({ name })
</script>
