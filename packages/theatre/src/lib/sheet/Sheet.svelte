<script lang="ts">
  import type { IProject, ISheet } from '@theatre/core'
  import { getContext, setContext, type Snippet } from 'svelte'
  import { SequenceController } from '../sequence/SequenceController.js'
  import { globalSheets } from '../consts.js'
  import type { SheetContext } from './types.js'

  // parent context
  export const project = getContext('theatre-project') as IProject
  const projectName = project.address.projectId

  interface Props {
    // props
    name?: string
    instance?: string | undefined
    sheet?: ISheet
    children?: Snippet<[{ sheet: ISheet }]>
  }

  let { name = 'default', sheet = $bindable(), instance = undefined, children }: Props = $props()

  // bindings
  sheet = globalSheets.get(`${projectName}-${name}-${instance}`) ?? project.sheet(name, instance)

  // register instance logic
  globalSheets.set(`${projectName}-${name}-${instance}`, sheet)

  // init sequence store
  export const sequence = new SequenceController(sheet.sequence)

  // child context
  const sequences = { default: sequence }

  setContext<SheetContext>('theatre-sheet', { sheet, sequences })
</script>

{@render children?.({ sheet })}
