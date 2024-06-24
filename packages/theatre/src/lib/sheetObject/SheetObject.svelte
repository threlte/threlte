<!--
	This component is responsible for:
	- Creating namespaces
	- Potentially Providing a sheet object
-->
<script lang="ts">
  import { useStudio } from '../studio/useStudio'

  import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
  import { currentWritable, watch, type CurrentWritable, useThrelte } from '@threlte/core'
  import { getContext, onDestroy, onMount, setContext } from 'svelte'
  import type { SheetContext } from '../sheet/types'
  import Declare from './declare/Declare.svelte'
  import Sync from './sync/Sync.svelte'
  import Transform from './transform/Transform.svelte'
  import type { SheetObjectProps } from './SheetObject.svelte'
  import { createSheetContext } from './useSheet'

  type Props = $$Generic<UnknownShorthandCompoundProps>

  let {
    key,
    detach = false,
    props,
    selected = $bindable(false),
    onchange,
    children
  }: SheetObjectProps<Props> = $props()

  const { invalidate } = useThrelte()

  let aggregatedProps: UnknownShorthandCompoundProps = { ...props }

  const { sheet } = getContext<SheetContext>('theatre-sheet')

  const sheetObject: CurrentWritable<ISheetObject<Props>> = currentWritable(
    sheet.object(key, aggregatedProps, {
      reconfigure: true
    }) as any
  )

  onMount(() => {
    // Because the sheet object value subscription is not running before any
    // values change, we're emitting the initial value here. Doing this in
    // onMount also means that child components which might add props to the
    // sheet object have already been mounted.
    onchange?.(sheetObject.current.value)
  })

  // This flag is used to prevent the sheet object from being created after it
  // has been detached.
  let detached = false
  onDestroy(() => {
    if (detach) {
      detached = true
      sheet.detachObject(key)
    }
  })

  const updateSheetObject = () => {
    // if the sheetObject has already been detached, do nothing.
    if (detached) return

    // first, detach the sheet object.
    sheet.detachObject(key)

    // create or reconfigure a sheet object here.
    sheetObject.set(
      sheet.object(key, aggregatedProps, {
        reconfigure: true
      }) as any
    )
  }

  const addProps = (props: UnknownShorthandCompoundProps) => {
    // add props to list of props
    aggregatedProps = {
      ...aggregatedProps,
      ...props
    }
    // update sheet object (create or reconfigure)
    updateSheetObject()
  }

  const removeProps = (propNames: string[]) => {
    // remove props from sheet object
    propNames.forEach((prop) => {
      delete aggregatedProps[prop]
    })

    // if there are no more props, detach sheet object
    if (Object.keys(aggregatedProps).length === 0) {
      // detach sheet object
      if (detach) {
        sheet.detachObject(key)
      }
    } else {
      // update sheet object (reconfigure)
      updateSheetObject()
    }
  }

  createSheetContext({
    sheetObject,
    addProps,
    removeProps
  })

  let values = $sheetObject?.value
  watch(sheetObject, (sheetObject) => {
    return sheetObject.onValuesChange((newValues) => {
      onchange?.(newValues)
      values = newValues
      // this invalidation also invalidates changes catched by slotted
      // components such as <Sync> or <Declare>.
      invalidate()
    })
  })

  // Provide a flag to indicate whether this sheet object is selected in the
  // Theatre.js studio.
  const studio = useStudio()

  watch([studio, sheetObject], ([studio, sheetObject]) => {
    return studio?.onSelectionChange((selection) => {
      selected = selection.includes(sheetObject)
    })
  })

  // Provide a select function to select this sheet object in the Theatre.js
  // studio.
  const select = () => {
    $studio?.setSelection([sheetObject.current])
  }

  const deselect = () => {
    if ($studio?.selection.includes(sheetObject.current)) {
      $studio?.setSelection([])
    }
  }
</script>

{@render children?.({
  values,
  selected,
  select,
  deselect,
  sheetObject: $sheetObject,
  Sync,
  Transform,
  Declare
})}
