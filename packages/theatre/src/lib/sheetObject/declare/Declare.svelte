<script lang="ts">
  import type { UnknownShorthandCompoundProps } from '@theatre/core'
  import { watch } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import type { DeclareProps } from './Declare.svelte'
  import { useSheet } from '../useSheet'

  type P = $$Generic<UnknownShorthandCompoundProps>

  let { props, children }: DeclareProps<P> = $props()

  const { sheetObject, addProps, removeProps } = useSheet()

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

{@render children?.({ values })}
