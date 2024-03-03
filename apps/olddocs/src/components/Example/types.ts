export type File = {
  type: 'file'
  name: string
  path: string
}

export type Directory = {
  name: string
  type: 'directory'
  files: (File | Directory)[]
}
