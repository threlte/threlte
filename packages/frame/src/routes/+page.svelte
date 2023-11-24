<script lang="ts">
  import { Task } from '../lib'
  import { Scheduler, type Schedule } from '../lib/Scheduler'

  let schedule: Schedule | undefined

  // Create a new scheduler with context. This would be the place where the main
  // Threlte context is used. Every Threlte app probably only has a single scheduler.
  const scheduler = new Scheduler({
    clampDeltaTo: 0.1 // in seconds
  })

  // Create the default stage. Stages, just like their children tasks, can be
  // scheduled to run before or after other stages. The first stage is not
  // scheduled before or after any other stage, so it will "just run". You must
  // provide a key for the stage. This is useful for debugging and
  // understanding the execution order.
  const defaultStage = scheduler.createStage('default stage')

  // Create a task. A task is the unit that actually runs code and can be
  // scheduled to run before or after other tasks. The first task – just like
  // the first stage – is not scheduled before or after any other task. You must
  // provide a key for the task. A task will always receive the delta time
  // since the last frame in seconds as the first argument
  defaultStage.createTask('move object', (delta) => {
    // console.log(delta)
    // -> 0.16
  })

  // Tasks may be scheduled to run before or after other tasks.
  defaultStage.createTask(
    'move camera',
    (delta) => {
      // do something
    },
    {
      after: 'move object'
    }
  )

  // We probably want to create a stage that will be used to render the frame
  // to the screen. This stage should run after the default stage, so we pass
  // its key as the `after` option.
  const renderStage = scheduler.createStage('render stage', {
    after: 'default stage'
  })

  // Now we can add a task that will render the frame.
  renderStage.createTask('render', (delta) => {
    // do some rendering
  })

  // You may also add a task that runs before or after multiple other steps
  // by passing an array of steps to the `before` or `after` option.
  /*
  const afterDefaultAndOtherStep = defaultStage.createTask('after other tasks', () => {
		// do something after the other tasks
	}, {
    after: ['some task', 'some other task'],
  })
	*/

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

  const physicsStage = scheduler.createStage('physics stage', {
    before: 'default stage',
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

  // Because the physics stage's callback is invoking `run(rate)`, the tasks
  // receive the fixed delta passed to the function `run`. This is especially
  // useful for fixed step stages. Also, the coefficient is available in the
  // context for easy interpolation. We can now add a task that will run when
  // the step is invoked by the physics stage. The task will receive the
  // scheduler context, the stage context and the fixed delta. By that we can
  // calculate the view delta.
  physicsStage.createTask('physics', (delta) => {
    const viewDelta = delta * physicsContext.t
    // console.log(stageCtx)
    // -> { t: 0.123456789, world: { gravity: 9.81 } }
  })

  // Additionally, we may want to create two stages for frame analytics where
  // you need to start a timer before every other stage runs and stop it after
  // every other stage has run. This is where the `before` and `after` options
  // come in handy. We can create a stage that runs before the physics stage
  // and a stage that runs after the default frame stage.
  const frameAnalyticsStartStage = scheduler.createStage('frame analytics start', {
    before: 'physics stage'
  })
  const frameAnalyticsEndStage = scheduler.createStage('frame analytics end', {
    after: 'render stage'
  })
  frameAnalyticsStartStage.createTask('frame-analytics-start', (delta) => {
    // console.time('frame-analytics')
  })
  frameAnalyticsEndStage.createTask('frame-analytics-end', (delta) => {
    // console.timeEnd('frame-analytpics')
    // -> frame-analytics: 0.123ms
  })

  // Using strings as the `before` and `after` options is making it possible to
  // reference stages that are not yet created and generally makes it easier to
  // create stages and tasks in any order.

  // Example: Create a stage that runs after another stage that is not yet
  // created.
  // TODO: BUGGY
  // const someStage = scheduler.createStage('some stage', {
  //   after: 'some other stage'
  // })
  // const someOtherStage = scheduler.createStage('some other stage', {
  //   after: 'default stage',
  //   before: 'render stage'
  // })

  // The scheduler provides an execution plan that can be used to visualize
  // the execution order of the stages, steps and tasks. This is useful for
  // debugging and understanding the execution order.
  schedule = scheduler.getSchedule({
    tasks: true
  })
</script>

<div style="line-height: 100%;">
  Execution Plan:<br /><br />

  {#if schedule}
    {#each schedule.stages as stage}
      <div style="margin-bottom: 0px;">
        ├&nbsp;{stage.key}
        {#if stage.tasks}
          {#each stage.tasks as task}
            <div style="margin-left: 0px;">
              ├─&nbsp;{task}
            </div>
          {/each}
        {/if}
      </div>
    {/each}
  {/if}
</div>
