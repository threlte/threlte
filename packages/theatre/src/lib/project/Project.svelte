<script lang="ts">
  import { globalProjects } from '../consts'
  import { getProject } from '../theatre'
  import { setContext, type Snippet } from 'svelte'
  import type { IProject, IProjectConfig } from '@theatre/core'

  interface Props {
    name: string
    config?: IProjectConfig | undefined
    project?: IProject
    isReady?: boolean
    children?: Snippet<[{ project: IProject }]>
  }

  let {
    name = 'default',
    config,
    project = $bindable(),
    isReady = $bindable(),
    children
  }: Props = $props()
  
  project = globalProjects.get(name) ?? getProject(name, config)
  globalProjects.set(name, project)

  const syncReady = async () => {
    await project.ready
    isReady = true
  }
  syncReady()

  // CHILD CONTEXT

  setContext(`theatre-project`, project)
</script>

{#await project.ready then}
  {@render children?.({ project })}
{/await}
