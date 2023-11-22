<script lang="ts">
  import { Scheduler, type Schedule } from '../lib/Scheduler'

  let schedule: Schedule | undefined

  // Create a new scheduler with context. This would be the place where the main
  // Threlte context is used. Every Threlte app probably only has a single scheduler.
  const scheduler = Scheduler.create({
    context: {
      camera: 'camera',
      scene: 'scene',
      renderer: 'renderer'
    }
  })

  // Create the default stage. Stages, just like their children steps, can be
  // scheduled to run before or after other stages. The first stage is not
  // scheduled before or after any other stage, so it will "just run". You may
  // optionally provide a label for the stage. This is useful for debugging and
  // understanding the execution order.
  const framestage = scheduler.createStage({
    label: 'default'
  })

  // Create a default step. Steps are the main organizational unit of a
  // frame stage. Steps can be scheduled to run before or after other steps.
  // The first step – just like the first stage – is not scheduled before or
  // after any other step. You may optionally provide a label for the step.
  // This is useful for debugging and understanding the execution order.
  const defaultStep = framestage.createStep({
    label: 'default'
  })

  // To actually run code in a step, you need to add a task to it. For
  // example you might want to add a task that rotates an object around the y
  // axis. A task will always receive these four arguments:
  // - delta          The delta time since the last frame in milliseconds
  // - schedulerCtx   The scheduler context
  // - stageCtx        The stage context
  // - stepCtx       The step context
  // You may optionally provide a label for the task. This is useful for
  // debugging and understanding the execution order.
  defaultStep.createTask(
    (delta, schedulerCtx, stageCtx, stepCtx) => {
      // console.log(schedulerCtx)
      // -> { camera: 'camera', scene: 'scene', renderer: 'renderer' }
    },
    { label: 'move-object' }
  )

  // We probably want to create a step that will be used to render the frame
  // to the screen. This step should run after the default step, so we pass
  // it as the `after` option.
  const renderStep = framestage.createStep({
    after: defaultStep,
    label: 'render'
  })

  // Now we can add a task that will render the frame. The task will
  // receive the scheduler context and the delta time since the last frame.
  renderStep.createTask(
    (delta, { camera, renderer, scene }) => {
      // do rendering stuff
    },
    { label: 'render' }
  )

  // Just as schedulers and stages, steps can also have context.
  const stepWithContext = framestage.createStep({
    after: defaultStep,
    before: renderStep,
    label: 'other',
    context: {
      foo: 'bar'
    }
  })

  // It is also passed to the tasks of the step as the fourth argument of the
  // task callback.
  const otherTask = stepWithContext.createTask(
    (delta, schedulerCtx, stageCtx, stepCtx) => {
      // console.log(stepCtx)
      // -> { foo: 'bar' }
    },
    { label: 'other-task' }
  )

  // You may also add a step that runs before or after multiple other steps
  // by passing an array of steps to the `before` or `after` option.
  const afterDefaultAndOtherStep = framestage.createStep({
    after: [defaultStep, stepWithContext],
    before: renderStep,
    label: 'afterDefaultAndOther'
  })

  // Now, a fixed physics stage. The stage is *invoked* by the scheduler on every
  // requestAnimationFrame, but the stage ultimately decides when and how many
  // times to run the nodes.

  // Because a fixed framestage may be running multiple times per frame (rate <
  // framerate) or just once every few frames (rate > framerate), the stage
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
  const physicsStage = scheduler.createStage({
    label: 'physics',
    before: framestage,
    context: physicsContext,
    // The callback is invoked by the scheduler on every requestAnimationFrame
    // and receives the delta time since the last frame in milliseconds as
    // well as the function `run` which is used to run the steps of the stage.
    // The callback is responsible for deciding when and how many times to run
    // the steps. If it's omitted, the stage will run once per frame (as shown
    // in the default framestage).
    callback: (delta, run) => {
      fixedStepTimeAccumulator += delta / 1000
      while (fixedStepTimeAccumulator >= rate) {
        fixedStepTimeAccumulator -= rate

        // calculate the coefficient, for now just a random number
        // physicsContext.t = ...

        // See how we pass the rate to the run function. This is the fixed
        // step rate that the stage is running at. The tasks will receive
        // this rate as the delta argument if it's passed to the run
        // function, otherwise they will receive the delta time since
        // the last frame.
        run(rate)
      }
    }
  })

  // Because the physicsStage's callback is running `run(rate)`, the tasks
  // receive the fixed delta passed to `run`. This is especially useful for
  // fixed step stages. Also, the coefficient is available in the context for
  // easy interpolation. We need to create a step for the physics stage, too.
  const physicsStep = physicsStage.createStep({
    label: 'physics'
  })

  // Now we can add a task that will run when the step is invoked by the
  // physics stage. The task will receive the scheduler context, the stage
  // context and the fixd delta. By that we can calculate the view delta.
  physicsStep.createTask(
    (delta, { camera, renderer, scene }, stageCtx) => {
      const viewDelta = delta * stageCtx.t
      // console.log(stageCtx)
      // -> { t: 0.123456789, world: { gravity: 9.81 } }
    },
    { label: 'physics' }
  )

  // Additionally, we may want to create two stages for frame analytics where
  // you need to start a timer before every other stage runs and stop it after
  // every other stage has run. This is where the `before` and `after` options
  // come in handy. We can create a stage that runs before the physics stage
  // and a stage that runs after the default frame stage.
  const frameAnalyticsStart = scheduler.createStage({
    before: physicsStage,
    label: 'frame-analytics-start'
  })
  const frameAnalyticsEnd = scheduler.createStage({
    after: framestage,
    label: 'frame-analytics-end'
  })

  // Now we can add steps and tasks to run the frame analytics.
  const frameAnalyticsStartStep = frameAnalyticsStart.createStep({
    label: 'frame-analytics-start'
  })
  frameAnalyticsStartStep.createTask(
    (delta, schedulerCtx) => {
      // console.time('frame-analytics')
    },
    { label: 'frame-analytics-start' }
  )
  const frameAnalyticsEndStep = frameAnalyticsEnd.createStep({
    label: 'frame-analytics-end'
  })
  frameAnalyticsEndStep.createTask(
    (delta, schedulerCtx) => {
      // console.timeEnd('frame-analytics')
      // -> frame-analytics: 0.123ms
    },
    { label: 'frame-analytics-end' }
  )

  // The scheduler provides an execution plan that can be used to visualize
  // the execution order of the stages, steps and tasks. This is useful for
  // debugging and understanding the execution order.
  schedule = scheduler.getSchedule({
    steps: true,
    tasks: true
  })
</script>

<div>
  Execution Plan:<br /><br />

  {#if schedule}
    {#each schedule.stages as stage}
      <div style="margin-bottom: 15px;">
        {stage.label}
        {#if stage.steps}
          {#each stage.steps as step}
            <div style="margin-left: 15px;">
              {step.label}
              {#if step.tasks}
                {#each step.tasks as task}
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
