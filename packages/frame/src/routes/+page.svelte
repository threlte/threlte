<script lang="ts">
  import { onMount } from 'svelte'
  import { Runner } from '../lib/Runner'

  onMount(() => {
    // Create a new runner with context. This would be the place where the main
    // Threlte context is used.
    const runner = Runner.create({
      context: {
        foo: 'bar'
      }
    })

    // Create the default frame loop with some context
    const frameloop = runner.createLoop()

    // Create a stage with some context
    const defaultStage = frameloop.createStage()
    // create a stage that will be used to render the frame
    const renderStage = frameloop.createStage({
      after: defaultStage
    })
    // create a stage for frame analytics
    const afterRenderStage = frameloop.createStage({
      after: renderStage
    })

    // A fixed physics loop. The loop is *invoked* by the runner on every
    // requestAnimationFrame, but the loop ultimately decides when and how many
    // times to run the nodes.

    // Because a fixed frameloop may be running multiple times per frame or just
    // once every few frames, the loop context may provide a coefficient that
    // can be used to interpolate values that are view dependent, such as a mesh
    // that is being displaced by a physics operation.
    const physicsContext = {
      t: 0 // todo: calculate this
    }

    let rate = 1 / 2
    let fixedStepTimeAccumulator = 0
    const physicsLoop = runner.createLoop({
      context: physicsContext,
      callback: (delta, run) => {
        fixedStepTimeAccumulator += delta / 1000
        while (fixedStepTimeAccumulator >= rate) {
          fixedStepTimeAccumulator -= rate
          // calculate the coefficient, for now just a random number
          physicsContext.t = Math.random()
          run(rate)
        }
      }
    })

    // because the physicsLoop's callback is running `run(rate)`, the handlers
    // receive the delta passed to `run`. This is especially useful for fixed
    // step loops. Also, the coefficient is available in the context for easy
    // interpolation.
    const physicsStage = physicsLoop.createStage()
    physicsStage.addHandler((ctx, { t }, delta) => {
      console.log('physics', delta)
      // do physics stuff
    })

    runner.start()

    return () => {
      runner.stop()
    }
  })
</script>
