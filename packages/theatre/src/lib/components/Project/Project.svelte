<script lang="ts">
  import { globalProjects } from '../consts'
  import { getProject } from '../theatre'
  import { setContext } from 'svelte'

  export let projectName = 'default'
  export let projectState: any | undefined = undefined

  console.log(globalProjects.get(projectName))

  const config = projectState ? { state: projectState } : {}

  const project = globalProjects.get(projectName) ?? getProject(projectName, config)

  let isReady = false
  const init = async () => {
    await project.ready
    isReady = true
  }
  init()

  globalProjects.set(projectName, project)

  setContext(`theatre-project-${projectName}`, project)
</script>

{#if isReady}
  <slot {project} />
{/if}
