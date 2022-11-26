<script lang="ts">
  import { globalProjects } from '../consts'
  import { getProject } from '../theatre'
  import { setContext } from 'svelte'
  import type { IProjectConfig } from '@theatre/core'

  export let projectName = 'default'
  export let config: IProjectConfig | undefined = undefined

  const project = globalProjects.get(projectName) ?? getProject(projectName, config)

  let isReady = false
  const init = async () => {
    await project.ready
    isReady = true
  }
  init()

  globalProjects.set(projectName, project)

  setContext(`theatre-project`, project)
</script>

{#if isReady}
  <slot {project} />
{/if}
