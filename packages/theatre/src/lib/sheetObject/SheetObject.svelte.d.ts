import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
import { SvelteComponent } from 'svelte'
import type Declare from './declare/Declare.svelte'
import type Sync from './sync/Sync.svelte'
import type Transform from './transform/Transform.svelte'

export default class SheetObject<T extends UnknownShorthandCompoundProps> extends SvelteComponent<
  {
    key: string
    detach?: boolean
    selected?: boolean
    props?: T
  },
  {
    change: ISheetObject<T>['value']
  },
  {
    default: {
      values: ISheetObject<T>['value']
      selected: boolean
      select: () => void
      deselect: () => void
      sheetObject: ISheetObject<T>
      Sync: typeof Sync
      Transform: typeof Transform
      Declare: typeof Declare
    }
  }
> {}
