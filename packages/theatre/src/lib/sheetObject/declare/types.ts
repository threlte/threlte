import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
import type { Snippet } from 'svelte'

export type DeclareProps<T extends UnknownShorthandCompoundProps> = {
  props: T

  children?: Snippet<[{ values: ISheetObject<T>['value'] }]>
}

export type Values<T> = T extends UnknownShorthandCompoundProps ? ISheetObject<T>['value'] : never
