<script lang="ts">
  import type { IProject } from '@theatre/core'
  import { getContext, setContext } from 'svelte'
  import { SequenceController } from '../sequence/SequenceController'
  import { globalSheets } from '../consts'
  import type { SheetContext } from './types'

  // parent context
  export const project = getContext('theatre-project') as IProject
  const projectName = project.address.projectId

  // props
  export let name = 'default'
  export let instance: string | undefined = undefined

  // bindings
  export const sheet =
    globalSheets.get(`${projectName}-${name}-${instance}`) ?? project.sheet(name, instance)

  // register instance logic
  globalSheets.set(`${projectName}-${name}-${instance}`, sheet)

  // init sequence store
  export const sequence = new SequenceController(sheet.sequence)

  // child context
  const sequences = { default: sequence }

  setContext<SheetContext>('theatre-sheet', { sheet, sequences })
</script>

<slot {sheet} />
