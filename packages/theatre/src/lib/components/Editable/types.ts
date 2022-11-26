import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'

export type StringProp = string
export type BooleanProp = boolean
export type AutoProp = StringProp | BooleanProp

export type Props<T extends UnknownShorthandCompoundProps> = {
  name: string
  projectName?: string
  sheetName?: string
  props?: T
  transform?: boolean
  controls?: boolean
  snap?: {
    translate?: number
    rotate?: number
    scale?: number
  }
  read?: () => void
} & Record<string, AutoProp | any>

export type Slots<T extends UnknownShorthandCompoundProps> = {
  default: {
    values: ISheetObject<T>['value']
    read: () => void
  }
}

export type Events<T extends UnknownShorthandCompoundProps> = {
  change: ISheetObject<T>['value']
}

export type PropTransform = 'none' | 'euler'
