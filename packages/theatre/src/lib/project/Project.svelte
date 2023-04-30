<script lang="ts">
  import { globalProjects } from '../consts'
  import { getProject } from '../theatre'
  import { setContext } from 'svelte'
  import type { IProjectConfig } from '@theatre/core'

  // PROPS

  export let name = 'default'
  export let config: IProjectConfig | undefined = undefined

  // BINDINGS

  export const project = globalProjects.get(name) ?? getProject(name, config)
  globalProjects.set(name, project)

  export let isReady = false
  const syncReady = async () => {
    await project.ready
    isReady = true
  }
  syncReady()

  // CHILD CONTEXT

  setContext(`theatre-project`, project)
</script>

{#await project.ready then}
  <slot {project} />
{/await}
