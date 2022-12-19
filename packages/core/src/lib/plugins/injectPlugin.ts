import { getContext, setContext } from 'svelte'
import type { Plugin, PluginContext, PluginContextName } from './types'

export const injectPlugin = (name: string, plugin: Plugin) => {
  const contextName: PluginContextName = 'threlte-plugin-context'

  setContext<PluginContext>(contextName, {
    ...getContext<PluginContext | undefined>(contextName),
    [name]: plugin
  })
}
