import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
import type { SvelteComponent } from 'svelte'

export default class Props<T extends UnknownShorthandCompoundProps> extends SvelteComponent<
  {
    props: T
  },
  Record<string, unknown>,
  {
    default: {
      values: ISheetObject<T>['value']
    }
  }
> {}
