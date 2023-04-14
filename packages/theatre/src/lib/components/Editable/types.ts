import type { ISheet, ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'

export type StringProp = string
export type BooleanProp = boolean
export type AutoProp = StringProp | BooleanProp

export type Props<T extends UnknownShorthandCompoundProps> = {
  name: string
  props?: T
  transform?: boolean
  controls?: boolean
  snap?: {
    translate?: number
    rotate?: number
    scale?: number
  }
  read?: () => void
  object?: ISheetObject<T>
  detach?: boolean
} & Record<string, AutoProp | any>

export type Slots<T extends UnknownShorthandCompoundProps> = {
  default: {
    sheet: ISheet
    object: ISheetObject<T>
    values: ISheetObject<T>['value']
    read: () => void
  }
}

export type Events<T extends UnknownShorthandCompoundProps> = {
  change: ISheetObject<T>['value']
  create: ISheetObject<T>['value']
}

export type PropTransform = 'none' | 'euler'
