<script lang="ts">
  import { globalStudio } from '../consts'

  import { onMount } from 'svelte'

  onMount(async () => {
    const studioPkg = await import('@theatre/studio')
    const studio = studioPkg.default
    studio.initialize()
    globalStudio.set(studio)
  })
</script>
