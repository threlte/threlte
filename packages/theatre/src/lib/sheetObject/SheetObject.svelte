<!--
	This component is responsible for:
	- Creating namespaces
	- Potentially Providing a sheet object
-->
<script lang="ts">
  import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
  import {
    createRawEventDispatcher,
    currentWritable,
    watch,
    type CurrentWritable
  } from '@threlte/core'
  import { getContext } from 'svelte'
  import type { SheetContext } from '../sheet/types'
  import Declare from './declare/Declare.svelte'
  import Sync from './sync/Sync.svelte'
  import Transform from './transform/Transform.svelte'

  type Props = $$Generic<UnknownShorthandCompoundProps>

  export let key: string
  export let props: Props | undefined = undefined

  let sheetObjectProps: UnknownShorthandCompoundProps = {}

  const { sheet } = getContext<SheetContext>('theatre-sheet')

  let sheetObject: CurrentWritable<ISheetObject<Props>> = currentWritable(
    sheet.object(key, props ?? {}, {
      reconfigure: true
    }) as any
  )

  const dispatch = createRawEventDispatcher<{
    change: ISheetObject<Props>['value']
  }>()

  const updateSheetObject = () => {
    // create or reconfigure a sheet object here.
    sheetObject.set(
      sheet.object(key, sheetObjectProps, {
        reconfigure: true
      }) as any
    )
  }

  const addProps = (props: UnknownShorthandCompoundProps) => {
    // add props to list of props
    sheetObjectProps = {
      ...sheetObjectProps,
      ...props
    }
    // update sheet object (create or reconfigure)
    updateSheetObject()
  }

  const removeProps = (propNames: string[]) => {
    // remove props from sheet object
    Object.keys(propNames).forEach((prop) => {
      delete sheetObjectProps[prop]
    })
    // if there are no more props, detach sheet object
    if (Object.keys(sheetObjectProps).length === 0) {
      // detach sheet object
      sheet.detachObject(key)
    } else {
      // update sheet object (reconfigure)
      updateSheetObject()
    }
  }

  const augmentConstructorArgs = (args: any) => {
    return {
      ...args,
      props: {
        ...args.props,
        sheetObject,
        addProps,
        removeProps
      }
    }
  }

  const proxySyncComponent = new Proxy(Sync, {
    construct(_target, [args]) {
      return new Sync(augmentConstructorArgs(args))
    }
  })

  const proxyTransformComponent = new Proxy(Transform, {
    construct(_target, [args]) {
      return new Transform(augmentConstructorArgs(args))
    }
  })

  const proxyDeclareComponent = new Proxy(Declare, {
    construct(_target, [args]) {
      return new Declare(augmentConstructorArgs(args))
    }
  })

  watch(sheetObject, (sheetObject) => {
    return sheetObject.onValuesChange((values) => {
      dispatch('change', values)
    })
  })

  let values = $sheetObject?.value
  $: values = $sheetObject?.value
</script>

<slot
  {values}
  sheetObject={$sheetObject}
  Sync={proxySyncComponent}
  Transform={proxyTransformComponent}
  Declare={proxyDeclareComponent}
/>
