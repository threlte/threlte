export type ServerFunctions = {
  syncTransactions: (
    transactions: {
      attributeName: string
      attributeValue: unknown
      componentIndex: number
      moduleId: string
      signature: string
      precision?: number
    }[]
  ) => void
  getColumnAndRow: (
    moduleId: string,
    componentIndex: number,
    signature: string
  ) => { column: number; row: number }
  mutateStaticState: (id: string, className: string, propertyName: string, value: unknown) => void
}

export type ClientFunctions = Record<string, never>
