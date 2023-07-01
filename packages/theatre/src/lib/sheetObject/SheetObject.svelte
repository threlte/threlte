<!--
	This component is responsible for:
	- Creating namespaces
	- Potentially Providing a sheet object
-->
<script lang="ts">
  import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
  import { currentWritable, type CurrentWritable } from '@threlte/core'
  import { getContext } from 'svelte'
  import type { SheetContext } from '../sheet/types'
  import AutoProps from './autoProps/AutoProps.svelte'
  import Transform from './transform/Transform.svelte'
  import Props from './props/Props.svelte'

  type ManualProps = $$Generic<UnknownShorthandCompoundProps>

  export let key: string

  export let props: ManualProps | undefined = undefined

  let sheetObjectProps: UnknownShorthandCompoundProps = {}

  const { sheet } = getContext<SheetContext>('theatre-sheet')

  let sheetObject: CurrentWritable<ISheetObject<ManualProps>> = currentWritable(
    sheet.object(key, props ?? {}, {
      reconfigure: true
    }) as any
  )

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

  const proxyAutoPropsComponent = new Proxy(AutoProps, {
    construct(_target, [args]) {
      return new AutoProps(augmentConstructorArgs(args))
    }
  })

  const proxyTransformComponent = new Proxy(Transform, {
    construct(_target, [args]) {
      return new Transform(augmentConstructorArgs(args))
    }
  })

  const proxyPropsComponent = new Proxy(Props, {
    construct(_target, [args]) {
      return new Props(augmentConstructorArgs(args))
    }
  })

  let values = $sheetObject?.value
  $: values = $sheetObject?.value
</script>

<slot
  {values}
  sheetObject={$sheetObject}
  AutoProps={proxyAutoPropsComponent}
  Transform={proxyTransformComponent}
  Props={proxyPropsComponent}
/>
