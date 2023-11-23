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

  defaultStage.createTask(
    () => {
      console.log('defaultStage')
    },
    {
      label: 'defaultTask'
    }
  )

  const renderStage = scheduler.createStage({
    label: 'renderStage',
    after: defaultStage,
    callback(delta, runTasks, { shouldRender }) {
      if (shouldRender()) runTasks()
    }
  })

  const renderTask = renderStage.createTask(
    (_, { renderer, scene }) => {
      // renderer
    },
    {
      label: 'renderTask'
    }
  )

  renderStage.createTask(
    () => {
      //
    },
    {
      before: renderTask,
      label: 'beforeRenderTask'
    }
  )

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
        ├&nbsp;{stage.label}
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
