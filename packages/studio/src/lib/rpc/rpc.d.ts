export type ServerFunctions = {
  syncTransactions: (
    transactions: {
      attributeName: string
      attributeValue: unknown
      componentIndex: number
      moduleId: string
      precision?: number
    }[]
  ) => void
  getColumnAndRow: (
    moduleId: string,
    componentIndex: number
  ) => Promise<{ column: number; row: number }>
  mutateStaticState: (
    id: string,
    module: boolean,
    className: string,
    propertyName: string,
    value: unknown
  ) => void
}

export type ClientFunctions = Record<string, never>
