import type { ISheet } from '@theatre/core'

export type AnyProp =
  | string
  | undefined
  | boolean
  | ({
      def: Partial<Parameters<ISheet['object']>[1][string]>
    } & (
      | {
          get: () => any
          set: (value: any) => void
        }
      | Record<string, never>
    ))

export type AllProps = {
  key: string
  projectName?: string
  sheetName?: string
  transforms?: boolean
  [key: string]: AnyProp
}
