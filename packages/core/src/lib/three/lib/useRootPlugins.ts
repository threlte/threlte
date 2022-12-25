import { getContext, onDestroy } from 'svelte'
import type { RootPlugin, RootPluginContext, RootPluginContextName } from '../../plugins/types'

export const useRootPlugins = (params: Parameters<RootPlugin>[0]) => {
  const pluginContextName: RootPluginContextName = 'threlte-root-plugin-context'
  const pluginsContext = getContext<RootPluginContext | undefined>(pluginContextName)

  if (!pluginsContext) return

  let currentRef = params.ref
  let currentProps = params.props
  let currentRootPlugins: Record<string, RootPlugin> = {}
  const activeRootPlugins: Record<string, Exclude<ReturnType<RootPlugin>, void>> = {}

  const rootPluginsProps: string[] = []

  const getRootPluginsProps = () => {
    return Object.values(activeRootPlugins).flatMap((callback) => callback.pluginProps ?? [])
  }

  const updateRef = (ref: any) => {
    currentRef = ref
    Object.values(activeRootPlugins).forEach((callback) => callback.onRefChange?.(ref))
  }

  const updateProps = (props: Record<string, any>) => {
    currentProps = props
    Object.values(activeRootPlugins).forEach((callback) => callback.onPropsChange?.(props))
  }

  const updateRestProps = (restProps: Record<string, any>) => {
    Object.values(activeRootPlugins).forEach((callback) => callback.onRestPropsChange?.(restProps))
  }

  const onPluginMount = (name: string, newPlugin: RootPlugin) => {
    const callbacks = newPlugin({ props: currentProps, ref: currentRef })
    if (callbacks) {
      callbacks.onMount?.()
      activeRootPlugins[name] = callbacks
      rootPluginsProps.length = 0
      rootPluginsProps.push(...getRootPluginsProps())
    }
  }

  const onPluginDestroy = (name: string) => {
    activeRootPlugins[name]?.onDestroy?.()
    delete activeRootPlugins[name]
    rootPluginsProps.length = 0
    rootPluginsProps.push(...getRootPluginsProps())
  }

  const unsubscribePluginsContext = pluginsContext.subscribe((plugins) => {
    const newRootPluginsKeys = Object.keys(plugins)
    const currentRootPluginsKeys = Object.keys(currentRootPlugins)
    newRootPluginsKeys.forEach((key) => {
      if (!currentRootPluginsKeys.includes(key)) {
        onPluginMount(key, plugins[key])
      }
    })
    currentRootPluginsKeys.forEach((key) => {
      if (!newRootPluginsKeys.includes(key)) {
        onPluginDestroy(key)
      }
    })
    currentRootPlugins = plugins
  })
  onDestroy(() => {
    unsubscribePluginsContext()
    Object.values(activeRootPlugins).forEach((callback) => callback.onDestroy?.())
  })

  return {
    updateRef,
    updateProps,
    rootPluginsProps,
    updateRestProps
  }
}
