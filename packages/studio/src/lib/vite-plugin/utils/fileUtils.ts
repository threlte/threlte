import { readFileSync, writeFileSync } from 'node:fs'

export const readFile = (path: string): string => {
  return readFileSync(path, {
    encoding: 'utf8'
  })
}

export const writeFile = (path: string, contents: string) => {
  writeFileSync(path, contents, {
    encoding: 'utf8'
  })
}
