import type { ISheet } from '@theatre/core'

export type StringProp = string
export type BooleanProp = boolean
export type ManualProp = Parameters<ISheet['object']>

export type AnyProp = StringProp | BooleanProp | ManualProp

export type AllProps = {
  key: string
  projectName?: string
  sheetName?: string
  transforms?: boolean
  [key: string]: AnyProp | undefined
}

export type Slots = {
  default: {
    values: Record<string, any>
  }
}
