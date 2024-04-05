import { getContext, setContext } from 'svelte'
import type { CurrentWritable } from '@threlte/core'
import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'

const key = Symbol('threlte-theater-sheet-object-context')

export interface SheetObjectContext<T extends UnknownShorthandCompoundProps> {
  sheetObject: CurrentWritable<ISheetObject<T>>
  addProps: (props: UnknownShorthandCompoundProps) => void
  removeProps: (props: string[]) => void
}

export const createSheetObjectContext = <T extends UnknownShorthandCompoundProps>(
  sheetObject: CurrentWritable<ISheetObject<T>>,
  addProps: (props: UnknownShorthandCompoundProps) => void,
  removeProps: (props: string[]) => void
) => {
  const context: SheetObjectContext<T> = {
    sheetObject,
    addProps,
    removeProps
  }

  setContext<SheetObjectContext<T>>(key, context)

  return context
}

export const useSheetObject = <T extends UnknownShorthandCompoundProps>() => {
  const context = getContext<SheetObjectContext<T>>(key)

  if (!context) {
    throw new Error(
      'No sheet object context found. Are you using this component within a <SheetObject>?'
    )
  }

  return context
}
