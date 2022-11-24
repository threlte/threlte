<script lang="ts">
  import { onMount } from 'svelte'

  let _onMount: () => void
  export { _onMount as onMount }

  onMount(_onMount)
</script>
