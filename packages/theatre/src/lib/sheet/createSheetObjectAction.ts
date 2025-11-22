import type { ISheet, ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'

import { getContext } from 'svelte'

import type { SheetContext } from './types.js'

// reconstruct theatre type
type PropsValue<Props extends UnknownShorthandCompoundProps> = Parameters<
  Parameters<ISheetObject<Props>['onValuesChange']>[0]
>[0]

// hook
export function createSheetObjectAction<Props extends UnknownShorthandCompoundProps>() {
  // get sheet from context
  const sheet: ISheet = getContext<SheetContext>('theatre-sheet').sheet

  // create object action
  return <T extends HTMLElement>(
    node: T,
    {
      key,
      props,
      callback,
      options = { reconfigure: true }
    }: {
      key: string
      props: Props
      callback: (node: T, props: PropsValue<Props>) => void
      options?: { reconfigure?: boolean }
    }
  ) => {
    // create object
    const obj = sheet.object<Props>(key, props, options)

    // callback reactivity
    const unsubscribe = obj.onValuesChange((obj) => {
      callback(node, obj)
    })

    // disposal
    return {
      destroy() {
        unsubscribe()
        sheet.detachObject(key)
      }
    }
  }
}
