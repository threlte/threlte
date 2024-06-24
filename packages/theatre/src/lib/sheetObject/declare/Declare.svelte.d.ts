import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
import type { Snippet, SvelteComponent } from 'svelte'

export type DeclareProps<T extends UnknownShorthandCompoundProps> = {
  props: T

  children?: Snippet<[{ values: ISheetObject<T>['value'] }]>
}

export default class Declare<T extends UnknownShorthandCompoundProps> extends SvelteComponent<
  DeclareProps<T>
> {}
