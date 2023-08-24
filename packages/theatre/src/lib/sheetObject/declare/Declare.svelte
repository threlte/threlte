<script lang="ts">
  import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
  import { watch, type CurrentWritable } from '@threlte/core'
  import { onDestroy } from 'svelte'

  type P = $$Generic<UnknownShorthandCompoundProps>

  export let props: P

  /** @package */
  export let sheetObject: CurrentWritable<ISheetObject<P>>
  /** @package */
  export let addProps: (props: UnknownShorthandCompoundProps) => void
  /** @package */
  export let removeProps: (propNames: string[]) => void

  let values = $sheetObject?.value

  addProps(props)

  onDestroy(() => {
    removeProps(Object.keys(props))
  })

  watch(sheetObject, (sheetObject) => {
    return sheetObject.onValuesChange((v) => {
      values = v
    })
  })
</script>

<slot {values} />
