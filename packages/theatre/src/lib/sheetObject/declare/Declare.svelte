<script lang="ts">
  import { useSheetObject } from '../../useSheetObject'
  import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
  import { watch, type CurrentWritable } from '@threlte/core'
  import { onDestroy } from 'svelte'

  type P = $$Generic<UnknownShorthandCompoundProps>

  export let props: P

  const { sheetObject, addProps, removeProps } = useSheetObject()

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
