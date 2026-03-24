<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  let sim: any

  onMount(async () => {
    sim = (await import('./gamepadSimulator.js')).default

    sim.create()
    sim.connect()
  })

  onDestroy(() => {
    if (!sim) return

    sim.disconnect()
    sim.destroy()
  })
</script>
