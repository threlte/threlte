<script lang="ts">
  import { onMount } from 'svelte'
  import { Runner } from '../lib/Runner'

  onMount(() => {
    // Create a new runner without context
    const runner = Runner.create({
      context: {}
    })

    // Create the default frame loop with some context
    const frameloop = runner.createLoop()

    // Create a stage with some context
    const defaultStage = frameloop.createStage({
      context: {}
    })

    defaultStage.addHandler((...args) => {})
  })
</script>
