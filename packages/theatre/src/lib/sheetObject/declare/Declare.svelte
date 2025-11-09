<script
  lang="ts"
  generics="P extends UnknownShorthandCompoundProps"
>
  import type { UnknownShorthandCompoundProps } from '@theatre/core'
  import { watch } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { useSheet } from '../useSheet.js'
  import type { DeclareProps } from './types.js'

  let { props, children }: DeclareProps<P> = $props()

  const { sheetObject, addProps, removeProps } = useSheet<P>()

  let values = $state($sheetObject?.value)

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

{@render children?.({ values })}
