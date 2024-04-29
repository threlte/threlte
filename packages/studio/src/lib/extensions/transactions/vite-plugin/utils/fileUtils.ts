import { readFileSync, writeFileSync } from 'node:fs'

export const readComponent = (path: string): string => {
  return readFileSync(path, {
    encoding: 'utf8',
  })
}

export const writeComponent = (path: string, component: string) => {
  writeFileSync(path, component, {
    encoding: 'utf8',
  })
}
