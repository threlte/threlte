<script lang="ts">
  import Portal from './Portal.svelte'

  export let position: 'left' | 'right' | 'center' = 'left'
</script>

<Portal target=".toolbar-items-{position}">
  <slot />
</Portal>
