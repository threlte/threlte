<script lang="ts">
  import { onMount } from 'svelte'
  import { Runner } from '../lib/Runner'

  onMount(() => {
    // Create a new runner
    const runner = new Runner({
      foo: 'bar'
    })

    // Create the default frame loop. It "just runs".
    const frameloop = runner.createLoop()

    // // create the stages
    const defaultStage = frameloop.createStage()

    defaultStage.addHandler((ctx, delta) => {
      ctx.foo
    })

    runner.start()

    return () => {
      runner.stop()
    }
  })
</script>
