import { getContext, setContext } from 'svelte'
import type { AnyProps, NamedPlugin, Plugin, PluginContext, PluginContextName } from './types'

export function injectPlugin<Props extends AnyProps = AnyProps>(
  namedPlugin: NamedPlugin<Props>
): void
export function injectPlugin<Props extends AnyProps = AnyProps>(
  name: string,
  plugin: Plugin<Props>
): void
export function injectPlugin<Props extends AnyProps = AnyProps>(
  nameOrNamedPlugin: string | NamedPlugin<Props>,
  maybePlugin?: Plugin<Props>
): void {
  const contextName: PluginContextName = 'threlte-plugin-context'

  if (Array.isArray(nameOrNamedPlugin)) {
    const [name, plugin] = nameOrNamedPlugin
    setContext<PluginContext>(contextName, {
      ...getContext<PluginContext | undefined>(contextName),
      [name]: plugin as Plugin
    })
  } else {
    const name = nameOrNamedPlugin
    const plugin = maybePlugin
    if (!plugin) return
    setContext<PluginContext>(contextName, {
      ...getContext<PluginContext | undefined>(contextName),
      [name]: plugin as Plugin
    })
  }
}
