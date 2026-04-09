export type Options = {
  output?: string
  types?: boolean
  keepnames?: boolean
  keepgroups?: boolean
  shadows?: boolean
  printwidth?: number
  meta?: boolean
  precision?: number
  isolated?: boolean
  preload?: boolean
  suspense?: boolean
  draco?: string
  root?: string
  transform?: boolean
  resolution?: number
  simplify?: boolean
  weld?: number
  ratio?: number
  error?: number
  debug?: boolean
  keepmeshes?: boolean
  keepmaterials?: boolean
  format?: string
  degrade?: string
  degraderesolution?: number
  console?: boolean
  header?: string
  showLog?: (log: string) => void
  timeout?: number
  delay?: number
}
