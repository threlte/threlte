export type DisposableThreeObject = {
  dispose?: () => void
  type?: string
} & Record<string, any>
