<script lang="ts">
  import { Scheduler, type Schedule } from '../../lib/Scheduler'

  let schedule: Schedule | undefined

  const scheduler = new Scheduler()

  const renderStage = scheduler.createStage('render stage', {
    after: 'default stage'
  })
  const renderTask = renderStage.createTask('render task', () => {
    // render here
  })

  const defaultStage = scheduler.createStage('default stage')
  defaultStage.createTask('default task', () => {
    // do stuff here
  })

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
