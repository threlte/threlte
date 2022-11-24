<script lang="ts">
  import { globalObjects } from '../consts'
  import type { ISheet, ISheetObject } from '@theatre/core'
  import { getContext } from 'svelte'

  type Props = $$Generic<UnknownShorthandCompoundProps>

  export let projectName = 'default'
  export let sheetName = 'default'
  export let objectName: string
  export let props: Props

  const sheet = getContext(`theatre-project-${projectName}-sheet-${sheetName}`) as ISheet

  export const object =
    (globalObjects.get(`${projectName}-${sheetName}-${objectName}`) as ISheetObject<Props>) ??
    sheet.object<Props>(objectName, props)
  globalObjects.set(`${projectName}-${sheetName}-${objectName}`, object)

  export let values = object.value

  export let onValuesChange: Parameters<ISheetObject<Props>['onValuesChange']>[0] | undefined =
    undefined

  object.onValuesChange((newValues) => {
    values = newValues
    onValuesChange?.(newValues)
  })
</script>

<slot
  {values}
  {object}
/>
