<script lang="ts">
  import { onMount } from 'svelte'
  import { Scheduler, type Schedule } from '../../lib/Scheduler'

  let schedule: Schedule | undefined

  // Create a new scheduler with context. This would be the place where the main
  // Threlte context is used. Every Threlte app probably only has a single scheduler.
  const scheduler = Scheduler.create({
    context: {
      camera: 'camera',
      scene: 'scene',
      renderer: 'renderer',
      shouldRender: () => true
    }
  })

  const defaultStage = scheduler.createStage({
    label: 'defaultStage'
  })
  const defaultStep = defaultStage.createStep({
    label: 'defaultStep'
  })

  const renderStage = scheduler.createStage({
    label: 'renderStage',
    after: defaultStage,
    callback(delta, runSteps, { shouldRender }) {
      if (shouldRender()) runSteps()
    }
  })
  const renderStep = renderStage.createStep({
    label: 'renderStep'
  })
  renderStep.createTask(
    (_, { renderer, scene, camera }) => {
      // renderer
    },
    { label: 'defaultRenderTask' }
  )

  // The scheduler provides an execution plan that can be used to visualize
  // the execution order of the stages, steps and tasks. This is useful for
  // debugging and understanding the execution order.
  schedule = scheduler.getSchedule({
    steps: true,
    tasks: true
  })
</script>

<div style="line-height: 100%;">
  Execution Plan:<br /><br />

  {#if schedule}
    {#each schedule.stages as stage}
      <div style="margin-bottom: 0px;">
        ├&nbsp;{stage.label}
        {#if stage.steps}
          {#each stage.steps as step}
            <div style="margin-left: 0px;">
              ├─&nbsp;{step.label}
              {#if step.tasks}
                {#each step.tasks as task}
                  <div style="margin-left: 0;">
                    ├──&nbsp;{task}
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
