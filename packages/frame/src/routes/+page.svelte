<script lang="ts">
  import { onMount } from 'svelte'
  import { Runner } from '../lib/Runner'

  onMount(() => {
    // Create a new runner
    const runner = new Runner({
      foo: 'bar'
    })

    // Create the default frame loop. It "just runs".
    const frameloop = runner.createLoop({
      name: 'default',
      fps: 60
    })

    // // create the stages
    const defaultStage = frameloop.createStage({
      base: 'default'
    })

    defaultStage.addHandler((rctx, lctx, sctx, delta) => {})

    runner.start()

    return () => {
      runner.stop()
    }
  })
</script>
