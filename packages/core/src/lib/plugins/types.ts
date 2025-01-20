import type { Object3D } from 'three'

export type BaseProps = {
  ref: any
  args?: any[]
  attach?:
    | string
    | Object3D
    | ((args: { ref: any; parent: unknown; parentObject3D: Object3D }) => void | (() => void))
    | false
  manual?: boolean
  makeDefault?: boolean
  dispose?: boolean
}

export type AnyProps = Record<string, any>

export type Plugin<Props extends AnyProps = AnyProps> = (
  args: BaseProps & {
    props: Props & AnyProps
  }
) => {
  pluginProps?: (keyof Props)[] | string[]
} | void

export type PluginContext = Record<string, Plugin<AnyProps>>

export type PluginContextName = 'threlte-plugin-context'
