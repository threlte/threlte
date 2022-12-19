export type Plugin = (params: { ref: any; props: Record<string, any> }) => {
  pluginProps?: Record<string, any>
  onMount?: () => void
  onDestroy?: () => void
  onRefChange?: (ref: any) => void | (() => void)
  onPropsChange?: (props: Record<string, any>) => void
  onRestPropsChange?: (restProps: Record<string, any>) => void
} | void

export type PluginContext = Record<string, Plugin>

export type PluginContextName = 'threlte-plugin-context'
