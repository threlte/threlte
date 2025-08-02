import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
import type { Snippet } from 'svelte'
import type Declare from './declare/Declare.svelte'
import type Sync from './sync/Sync.svelte'
import type Transform from './transform/Transform.svelte'

export type SheetObjectProps<T extends UnknownShorthandCompoundProps> = {
  key: string
  detach?: boolean
  selected?: boolean
  props?: T
  children?: Snippet<
    [
      {
        values: ISheetObject['value']
        selected: boolean
        select: () => void
        deselect: () => void
        sheetObject: ISheetObject<T>
        Sync: typeof Sync
        Transform: typeof Transform
        Declare: typeof Declare
      }
    ]
  >
  onchange?: (sheet: ISheetObject<T>['value']) => void
}
