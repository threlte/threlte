import type { NamedRootPlugin, RootPlugin } from './types'

export function createRootPlugin(name: string, plugin: RootPlugin): NamedRootPlugin {
  return [name, plugin]
}
