import { getContext, setContext } from 'svelte'
import type { AnyProps, Plugin, PluginContext, PluginContextName } from './types'

export function injectPlugin<Props extends AnyProps = AnyProps>(
  name: string,
  plugin: Plugin<Props>
): void {
  const contextName: PluginContextName = 'threlte-plugin-context'

  if (!plugin) return
  setContext<PluginContext>(contextName, {
    ...getContext<PluginContext | undefined>(contextName),
    [name]: plugin as Plugin
  })
}
