export type Size = {
  width: number
  height: number
  top: number
  left: number
}

export type DisposableThreeObject = {
  dispose?: () => void
  type?: string
} & Record<string, any>
