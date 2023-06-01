<!--
	This component is responsible for:
	- Creating namespaces
	- Potentially Providing a sheet object
-->
<script lang="ts">
  import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
  import AutoProps from './AutoProps.svelte'
  import { getContext } from 'svelte'
  import type { SheetContext } from '../sheet/types'

  export let key: string

  let sheetObjectProps: UnknownShorthandCompoundProps = {}

  let sheetObject: ISheetObject

  const { sheet } = getContext<SheetContext>('theatre-sheet')

  const updateSheetObject = () => {
    // create or reconfigure a sheet object here.
    sheetObject = sheet.object(key, sheetObjectProps, {
      reconfigure: true
    })
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
  const removeProps = (props: UnknownShorthandCompoundProps) => {
    // remove props from sheet object
    Object.keys(props).forEach((prop) => {
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
