<script lang="ts">
  import { onMount } from 'svelte'
  import { Loop } from '../lib/Loop'
  import { Runner } from '../lib/Runner'
  import { Stage } from '../lib/Stage'

  onMount(() => {
    // Create a new runner
    const runner = new Runner()

    // Create the default frame loop. It "just runs".
    const frameloop = new Loop((delta, run) => {
      run()
    })

    const defaultStage = new Stage()
    const renderStage = new Stage()
    const afterRender = new Stage()

    frameloop.addStage(defaultStage)
    frameloop.addStage(renderStage, {
      after: defaultStage
    })
    frameloop.addStage(afterRender, {
      after: renderStage
    })

    defaultStage.addHandler(() => {
      // do stuff here
    })
    renderStage.addHandler(() => {
      // render here
    })
    afterRender.addHandler(() => {
      // do stuff here
    })

    // A fixed loop. The loop is updated by the runner, but the loop ultimately
    // decides when and how many times to run the nodes.
    let rate = 1 / 2
    let fixedStepTimeAccumulator = 0
    const physicsLoop = new Loop((delta, run) => {
      fixedStepTimeAccumulator += delta / 1000

      while (fixedStepTimeAccumulator >= rate) {
        fixedStepTimeAccumulator -= rate
        run()
      }
    })

    const physicsStage = new Stage()
    physicsLoop.addStage(physicsStage)
    physicsStage.addHandler(() => {
      console.log('physics')
    })

    const afterPhysicsStage = new Stage()
    physicsLoop.addStage(afterPhysicsStage, {
      after: physicsStage
    })
    afterPhysicsStage.addHandler(() => {
      console.log('afterPhysics')
    })

    runner.addLoop(frameloop)
    runner.addLoop(physicsLoop, {
      before: frameloop
    })

    runner.start()

    return () => {
      runner.stop()
    }
  })
</script>
