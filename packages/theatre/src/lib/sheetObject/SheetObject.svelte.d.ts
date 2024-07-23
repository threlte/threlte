import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
import { SvelteComponent, type Snippet } from 'svelte'
import type Declare from './declare/Declare.svelte'
import type Sync from './sync/Sync.svelte'
import type Transform from './transform/Transform.svelte'

export type SheetObjectProps<T> = {
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
        sheetObject: ISheetObject
        Sync: typeof Sync
        Transform: typeof Transform
        Declare: typeof Declare
      }
    ]
  >

  onchange?: (sheet: ISheetObject['value']) => void
}
export default class SheetObject<T extends UnknownShorthandCompoundProps> extends SvelteComponent<
  SheetObjectProps<T>
> {}
