<script lang="ts">
  import { onMount } from 'svelte'
  import { Scheduler } from '../lib/Scheduler'

  onMount(() => {
    // Create a new scheduler with context. This would be the place where the main
    // Threlte context is used. Every Threlte app probably only has a single scheduler.
    const scheduler = Scheduler.create({
      context: {
        foo: 'bar'
      }
    })

    // Create the default frame loop. Loops, just like stages, can be scheduled to run
    // before or after other loops. The first loop is not scheduled before or after
    // any other loop, so it will "just run".
    const frameloop = scheduler.createLoop()

    // Create a default stage. Stages are the main organizational unit of a
    // frame loop. Stages can be scheduled to run before or after other stages.
    // The first stage – just like the first loop – is not scheduled before or
    // after any other stage. To actually run code in a stage, you need to add
    // a task to it.
    const defaultStage = frameloop.createStage()

    // For example you might want to add a task that rotates an object
    // around the y axis. The task will receive the scheduler context and the delta
    // time since the last frame.
    defaultStage.addTask((schedulerCtx, delta) => {
      // do stuff
    })

    // We probably want to create a stage that will be used to render the frame
    // to the screen. This stage should run after the default stage, so we pass
    // it as the `after` option.
    const renderStage = frameloop.createStage({
      after: defaultStage
    })

    // Now we can add a task that will render the frame. The task will
    // receive the scheduler context and the delta time since the last frame.
    renderStage.addTask((schedulerCtx, delta) => {
      // do rendering stuff
    })

    // Optionally, we may want to create a stage for frame analytics or other
    // things that should run after the frame has been rendered.
    const afterRenderStage = frameloop.createStage({
      after: renderStage
    })

    // Now we can add a task that will run after the frame has been rendered.
    afterRenderStage.addTask((schedulerCtx, delta) => {
      // do stuff
    })

    // The resulting execution order of the frameloop:
    // defaultStage -> renderStage -> afterRenderStage

    // Now, a fixed physics loop. The loop is *invoked* by the scheduler on every
    // requestAnimationFrame, but the loop ultimately decides when and how many
    // times to run the nodes.

    // Because a fixed frameloop may be running multiple times per frame (rate <
    // framerate) or just once every few frames (rate > framerate), the loop
    // context may provide a coefficient that can be used to interpolate values
    // that are view dependent, such as a mesh that is being displaced by a
    // physics operation.
    const physicsContext = {
      t: 0 // todo: calculate this coefficient
    }

    let rate = 1 / 2
    let fixedStepTimeAccumulator = 0
    const physicsLoop = scheduler.createLoop({
      before: frameloop,
      context: physicsContext,
      // The callback is invoked by the scheduler on every requestAnimationFrame
      // and receives the delta time since the last frame in milliseconds as
      // well as the function `run` which is used to run the stages of the loop.
      // The callback is responsible for deciding when and how many times to run
      // the stages. If it's omitted, the loop will run once per frame (as shown
      // in the default frameloop).
      callback: (delta, run) => {
        fixedStepTimeAccumulator += delta / 1000
        while (fixedStepTimeAccumulator >= rate) {
          fixedStepTimeAccumulator -= rate
          // calculate the coefficient, for now just a random number
          physicsContext.t = Math.random()

          // See how we pass the rate to the run function. This is the fixed
          // step rate that the loop is running at. The tasks will receive
          // this rate as the delta argument.
          run(rate)
        }
      }
    })

    // Because the physicsLoop's callback is running `run(rate)`, the tasks
    // receive the fixed delta passed to `run`. This is especially useful for
    // fixed step loops. Also, the coefficient is available in the context for
    // easy interpolation. We need to create a stage for the physics loop, too.
    const physicsStage = physicsLoop.createStage()

    // Now we can add a task that will run when the stage is invoked by the
    // physics loop. The task will receive the scheduler context, the loop
    // context and the fixd delta. By that we can calculate the view delta.
    physicsStage.addTask((schedulerCtx, { t }, delta) => {
      const viewDelta = delta * t
      console.log('physics', viewDelta)
      // do physics stuff
    })

    // The resulting execution order of the whole scheduler:
    // physicsStage -> defaultStage -> renderStage -> afterRenderStage

    scheduler.start()

    return () => {
      scheduler.stop()
    }
  })
</script>
