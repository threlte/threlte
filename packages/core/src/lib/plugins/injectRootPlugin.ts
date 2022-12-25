import { getContext, onDestroy } from 'svelte'
import type { NamedRootPlugin, RootPlugin, RootPluginContext, RootPluginContextName } from './types'

export function injectRootPlugin(namedRootPlugin: NamedRootPlugin): void
export function injectRootPlugin(name: string, rootPlugin: RootPlugin): void
export function injectRootPlugin(
  nameOrNamedRootPlugin: string | NamedRootPlugin,
  maybeRootPlugin?: RootPlugin
): void {
  const contextName: RootPluginContextName = 'threlte-root-plugin-context'

  let pluginName: string | undefined = undefined
  let plugin: RootPlugin | undefined = undefined

  if (Array.isArray(nameOrNamedRootPlugin)) {
    pluginName = nameOrNamedRootPlugin[0]
    plugin = nameOrNamedRootPlugin[1]
  } else {
    pluginName = nameOrNamedRootPlugin
    plugin = maybeRootPlugin
  }

  if (!pluginName || !plugin) return

  const rootPlugins = getContext<RootPluginContext | undefined>(contextName)

  rootPlugins?.update((rootPlugins) => {
    if (!pluginName || !plugin) return rootPlugins
    return { ...rootPlugins, [pluginName]: plugin }
  })

  onDestroy(() => {
    rootPlugins?.update((rootPlugins) => {
      if (!pluginName || !plugin) return rootPlugins
      const { [pluginName]: _, ...rest } = rootPlugins
      return rest
    })
  })
}
