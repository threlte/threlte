<script lang="ts">
  import type { IProject } from '@theatre/core'
  import { getContext, setContext } from 'svelte'

  import { Sequence } from '../sequence/sequence'

  import { globalSheets } from '../consts'

  // PARENT CONTEXT

  export const project = getContext(`theatre-project`) as IProject
  const projectName = project.address.projectId

  // PROPS

  export let name = 'default'
  export let instance: string | undefined = undefined

  // BINDINGS

  export const sheet =
    globalSheets.get(`${projectName}-${name}-${instance}`) ?? project.sheet(name, instance)

  // REGISTER INSTANCE LOGIC

  globalSheets.set(`${projectName}-${name}-${instance}`, sheet)

  // INIT SEQUENCE STORE

  export const sequence = new Sequence(sheet.sequence)

  // CHILD CONTEXT

  const sequences = { default: sequence }

  setContext(`theatre-sheet`, { sheet, sequences })
</script>

<slot {sheet} />
