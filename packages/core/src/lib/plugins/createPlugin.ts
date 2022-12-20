import type { NamedPlugin, Plugin } from './types'

export function createPlugin(name: string, plugin: Plugin): NamedPlugin {
  return [name, plugin]
}
