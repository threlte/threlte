<script lang="ts">
  import { onMount } from 'svelte'
  import { Runner } from '../lib/Runner'
  import { Stage } from '../lib/Stage'

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
    const defaultStage = frameloop.createStage()
    const contextStage = frameloop.createStage({
      helo: 'world'
    })

    defaultStage.addHandler((ctx) => {})

    runner.start()

    return () => {
      runner.stop()
    }
  })
</script>
