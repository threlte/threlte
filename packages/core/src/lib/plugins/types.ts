import type { Object3D } from 'three'

export type BaseProps = {
  ref: any
  args?: any[] | undefined
  attach?:
    | string
    | Object3D
    | ((args: { ref: any; parent: unknown; parentObject3D: Object3D }) => void | (() => void))
    | false
    | undefined
  manual?: boolean | undefined
  makeDefault?: boolean | undefined
  dispose?: boolean | undefined
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

export const pluginContextKey = 'threlte-plugin-context'
