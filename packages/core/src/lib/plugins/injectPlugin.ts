import { getContext, setContext } from 'svelte'
import type { Plugin, NamedPlugin, PluginContext, PluginContextName } from './types'

export function injectPlugin(namedPlugin: NamedPlugin): void
export function injectPlugin(name: string, plugin: Plugin): void
export function injectPlugin(nameOrNamedPlugin: string | NamedPlugin, maybePlugin?: Plugin): void {
  const contextName: PluginContextName = 'threlte-plugin-context'

  if (Array.isArray(nameOrNamedPlugin)) {
    const [name, plugin] = nameOrNamedPlugin
    setContext<PluginContext>(contextName, {
      ...getContext<PluginContext | undefined>(contextName),
      [name]: plugin
    })
  } else {
    const name = nameOrNamedPlugin
    const plugin = maybePlugin
    if (!plugin) return
    setContext<PluginContext>(contextName, {
      ...getContext<PluginContext | undefined>(contextName),
      [name]: plugin
    })
  }
}
