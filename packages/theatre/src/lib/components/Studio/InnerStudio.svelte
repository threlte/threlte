<script lang="ts">
  import { globalStudio } from '../consts'

  import { onDestroy, onMount } from 'svelte'

  onMount(async () => {
    if ($globalStudio) {
      $globalStudio.ui.restore()
      return
    }
    const studioPkg = await import('@theatre/studio')
    const studio = studioPkg.default
    studio.initialize()
    globalStudio.set(studio)
  })

  onDestroy(() => {
    $globalStudio?.ui.hide()
  })
</script>
