<!--
	This component is responsible for:
	- Creating namespaces
	- Potentially Providing a sheet object
-->
<script lang="ts">
  import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
  import AutoProps from './autoProps/AutoProps.svelte'
  import { getContext } from 'svelte'
  import type { SheetContext } from '../sheet/types'
  import { currentWritable, type CurrentWritable } from '@threlte/core'

  export let key: string

  let sheetObjectProps: UnknownShorthandCompoundProps = {}

  let sheetObject: CurrentWritable<ISheetObject | undefined> = currentWritable(undefined)

  const { sheet } = getContext<SheetContext>('theatre-sheet')

  const updateSheetObject = () => {
    // create or reconfigure a sheet object here.
    sheetObject.set(
      sheet.object(key, sheetObjectProps, {
        reconfigure: true
      })
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
</script>

<slot AutoProps={proxyAutoPropsComponent} />
