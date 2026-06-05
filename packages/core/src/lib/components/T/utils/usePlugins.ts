import { getContext } from 'svelte'
import { type Plugin, type PluginContext, pluginContextKey } from '../../../plugins/types.js'

export const usePlugins = (args: Parameters<Plugin>[0]) => {
  const plugins = getContext<PluginContext | undefined>(pluginContextKey)

  if (!plugins) return

  const pluginsProps: string[] = []
  const pluginsArray = Object.values(plugins)

  if (pluginsArray.length > 0) {
    // initalize plugins
    for (let i = 0; i < pluginsArray.length; i++) {
      const plugin = pluginsArray[i]
      // initialize plugin
      const p = plugin(args)
      if (p && p.pluginProps) {
        pluginsProps.push(...p.pluginProps)
      }
    }
  }

  return {
    pluginsProps
  }
}
