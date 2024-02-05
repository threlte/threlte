export type AnyProps = Record<string, any>

export type Plugin<Props extends AnyProps = AnyProps> = (params: {
  ref: any
  props: Props & AnyProps
}) => {
  pluginProps?: (keyof Props)[] | string[]
  onRefChange?: (ref: any) => void | (() => void)
  onPropsChange?: (props: Props & AnyProps) => void
  onRestPropsChange?: (restProps: Props & AnyProps) => void
} | void

export type NamedPlugin<Props extends AnyProps = AnyProps> = [name: string, plugin: Plugin<Props>]

export type PluginContext = Record<string, Plugin<AnyProps>>

export type PluginContextName = 'threlte-plugin-context'

export type PluginProps<P extends NamedPlugin<any> | Plugin<any>> =
  P extends NamedPlugin<infer Props> ? Props : P extends Plugin<infer Props> ? Props : never
