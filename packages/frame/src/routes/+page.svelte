<script lang="ts">
  import { onMount } from 'svelte'
  import { Scheduler, type Schedule } from '../lib/Scheduler'

  let schedule: Schedule | undefined

  onMount(() => {
    // Create a new scheduler with context. This would be the place where the main
    // Threlte context is used. Every Threlte app probably only has a single scheduler.
    const scheduler = Scheduler.create({
      context: {
        camera: 'camera',
        scene: 'scene',
        renderer: 'renderer'
      }
    })

    // Create the default frame loop. Loops, just like stages, can be scheduled to run
    // before or after other loops. The first loop is not scheduled before or after
    // any other loop, so it will "just run". You may optionally provide a label for
    // the loop. This is useful for debugging and understanding the execution order.
    const frameloop = scheduler.createLoop({
      label: 'default'
    })

    // Create a default stage. Stages are the main organizational unit of a
    // frame loop. Stages can be scheduled to run before or after other stages.
    // The first stage – just like the first loop – is not scheduled before or
    // after any other stage. You may optionally provide a label for the stage.
    // This is useful for debugging and understanding the execution order.
    const defaultStage = frameloop.createStage({
      label: 'default'
    })

    // To actually run code in a stage, you need to add a task to it. For
    // example you might want to add a task that rotates an object around the y
    // axis. A task will always receive these four arguments:
    // - delta          The delta time since the last frame in milliseconds
    // - schedulerCtx   The scheduler context
    // - loopCtx        The loop context
    // - stageCtx       The stage context
    // You may optionally provide a label for the task. This is useful for
    // debugging and understanding the execution order.
    defaultStage.createTask(
      (delta, schedulerCtx, loopCtx, stageCtx) => {
        // console.log(schedulerCtx)
        // -> { camera: 'camera', scene: 'scene', renderer: 'renderer' }
      },
      { label: 'move-object' }
    )

    // We probably want to create a stage that will be used to render the frame
    // to the screen. This stage should run after the default stage, so we pass
    // it as the `after` option.
    const renderStage = frameloop.createStage({
      after: defaultStage,
      label: 'render'
    })

    // Now we can add a task that will render the frame. The task will
    // receive the scheduler context and the delta time since the last frame.
    renderStage.createTask(
      (delta, { camera, renderer, scene }) => {
        // do rendering stuff
      },
      { label: 'render' }
    )

    // Just as schedulers and loops, stages can also have context.
    const stageWithContext = frameloop.createStage({
      after: defaultStage,
      before: renderStage,
      label: 'other',
      context: {
        foo: 'bar'
      }
    })

    // It is also passed to the tasks of the stage as the fourth argument of the
    // task callback.
    const otherTask = stageWithContext.createTask(
      (delta, schedulerCtx, loopCtx, stageCtx) => {
        // console.log(stageCtx)
        // -> { foo: 'bar' }
      },
      { label: 'other-task' }
    )

    // You may also add a stage that runs before or after multiple other stages
    // by passing an array of stages to the `before` or `after` option.
    const afterDefaultAndOtherStage = frameloop.createStage({
      after: [defaultStage, stageWithContext],
      before: renderStage,
      label: 'afterDefaultAndOther'
    })

    // Now, a fixed physics loop. The loop is *invoked* by the scheduler on every
    // requestAnimationFrame, but the loop ultimately decides when and how many
    // times to run the nodes.

    // Because a fixed frameloop may be running multiple times per frame (rate <
    // framerate) or just once every few frames (rate > framerate), the loop
    // context may provide a coefficient that can be used to interpolate values
    // that are view dependent, such as a mesh that is being displaced by a
    // physics operation.
    const physicsContext = {
      t: 0.123456789, // todo: calculate this coefficient
      world: {
        gravity: 9.81
      }
    }

    let rate = 1 / 2
    let fixedStepTimeAccumulator = 0
    const physicsLoop = scheduler.createLoop({
      label: 'physics',
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
          // physicsContext.t = ...

          // See how we pass the rate to the run function. This is the fixed
          // step rate that the loop is running at. The tasks will receive
          // this rate as the delta argument if it's passed to the run
          // function, otherwise they will receive the delta time since
          // the last frame.
          run(rate)
        }
      }
    })

    // Because the physicsLoop's callback is running `run(rate)`, the tasks
    // receive the fixed delta passed to `run`. This is especially useful for
    // fixed step loops. Also, the coefficient is available in the context for
    // easy interpolation. We need to create a stage for the physics loop, too.
    const physicsStage = physicsLoop.createStage({
      label: 'physics'
    })

    // Now we can add a task that will run when the stage is invoked by the
    // physics loop. The task will receive the scheduler context, the loop
    // context and the fixd delta. By that we can calculate the view delta.
    physicsStage.createTask(
      (delta, { camera, renderer, scene }, loopCtx) => {
        const viewDelta = delta * loopCtx.t
        // console.log(loopCtx)
        // -> { t: 0.123456789, world: { gravity: 9.81 } }
      },
      { label: 'physics' }
    )

    // Additionally, we may want to create two loops for frame analytics where
    // you need to start a timer before every other loop runs and stop it after
    // every other loop has run. This is where the `before` and `after` options
    // come in handy. We can create a loop that runs before the physics loop
    // and a loop that runs after the default frame loop.
    const frameAnalyticsStart = scheduler.createLoop({
      before: physicsLoop,
      label: 'frame-analytics-start'
    })
    const frameAnalyticsEnd = scheduler.createLoop({
      after: frameloop,
      label: 'frame-analytics-end'
    })

    // Now we can add stages and tasks to run the frame analytics.
    const frameAnalyticsStartStage = frameAnalyticsStart.createStage({
      label: 'frame-analytics-start'
    })
    frameAnalyticsStartStage.createTask(
      (delta, schedulerCtx) => {
        // console.time('frame-analytics')
      },
      { label: 'frame-analytics-start' }
    )
    const frameAnalyticsEndStage = frameAnalyticsEnd.createStage({
      label: 'frame-analytics-end'
    })
    frameAnalyticsEndStage.createTask(
      (delta, schedulerCtx) => {
        // console.timeEnd('frame-analytics')
        // -> frame-analytics: 0.123ms
      },
      { label: 'frame-analytics-end' }
    )

    scheduler.start()

    // The scheduler provides an execution plan that can be used to visualize
    // the execution order of the loops, stages and tasks. This is useful for
    // debugging and understanding the execution order.
    schedule = scheduler.getSchedule({
      stages: true,
      tasks: true
    })

    return () => {
      scheduler.stop()
    }
  })
</script>

<div>
  Execution Plan:<br /><br />

  {#if schedule}
    {#each schedule.loops as loop}
      <div style="margin-bottom: 15px;">
        {loop.label}
        {#if loop.stages}
          {#each loop.stages as stage}
            <div style="margin-left: 15px;">
              {stage.label}
              {#if stage.tasks}
                {#each stage.tasks as task}
                  <div style="margin-left: 15px;">
                    {task}
                  </div>
                {/each}
              {/if}
            </div>
          {/each}
        {/if}
      </div>
    {/each}
  {/if}
</div>
