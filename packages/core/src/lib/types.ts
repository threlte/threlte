export type Size = {
  width: number
  height: number
}

export type DisposableThreeObject = {
  dispose?: () => void
  type?: string
} & Record<string, any>
