<script
  lang="ts"
  generics="P extends UnknownShorthandCompoundProps"
>
  import type { UnknownShorthandCompoundProps } from '@theatre/core'
  import { observe } from '@threlte/core'
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

  observe.pre(
    () => [sheetObject],
    ([sheetObject]) => {
      return sheetObject?.onValuesChange((v) => {
        values = v
      })
    }
  )
</script>

{@render children?.({ values })}
