import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
import type { CurrentWritable } from '@threlte/core'
import { getContext, setContext } from 'svelte'

const key = 'threlte-theater-sheet-context'

interface Context {
  sheetObject: CurrentWritable<ISheetObject<any>>
  addProps: (props: UnknownShorthandCompoundProps) => void
  removeProps: (names: string[]) => void
}

export const createSheetContext = (context: Context) => {
  setContext<Context>(key, context)
}

export const useSheet = (): Context => {
  return getContext<Context>(key)
}
