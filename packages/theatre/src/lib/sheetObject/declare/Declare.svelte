<script lang="ts">
  import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
  import { watch, type CurrentWritable, currentWritable } from '@threlte/core'
  import { onDestroy, getContext } from 'svelte'

  type P = $$Generic<UnknownShorthandCompoundProps>

  export let props: P

  const { sheetObject, addProps, removeProps } = getContext('threlte-theater-sheet-context')

  let values = $sheetObject?.value

  addProps(props)

  onDestroy(() => {
    removeProps(Object.keys(props))
  })

  watch(sheetObject, (sheetObject) => {
    return sheetObject?.onValuesChange((v) => {
      values = v
    })
  })
</script>

<slot {values} />
