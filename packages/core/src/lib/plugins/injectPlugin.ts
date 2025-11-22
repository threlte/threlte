import { getContext, setContext } from 'svelte'
import { type AnyProps, type Plugin, type PluginContext, pluginContextKey } from './types.js'

export function injectPlugin<Props extends AnyProps = AnyProps>(
  name: string,
  plugin: Plugin<Props>
): void {
  if (!plugin) return
  setContext<PluginContext>(pluginContextKey, {
    ...getContext<PluginContext | undefined>(pluginContextKey),
    [name]: plugin as Plugin
  })
}
