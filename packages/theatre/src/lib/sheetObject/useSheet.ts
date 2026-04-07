import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
import type { CurrentWritable } from '@threlte/core'
import { getContext, setContext } from 'svelte'

const key = 'threlte-theater-sheet-context'

type Context<T extends UnknownShorthandCompoundProps = any> = {
  sheetObject: CurrentWritable<ISheetObject<T>>
  addProps: (props: UnknownShorthandCompoundProps) => void
  removeProps: (names: string[]) => void
}

export const createSheetContext = (context: Context) => {
  setContext<Context>(key, context)
}

export const useSheet = <T extends UnknownShorthandCompoundProps = any>(): Context<T> => {
  return getContext<Context<T>>(key)
}
