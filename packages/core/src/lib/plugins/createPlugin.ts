import type { AnyProps, NamedPlugin, Plugin } from './types'

export function createPlugin<Props extends AnyProps = AnyProps>(
  name: string,
  plugin: Plugin<Props>
): NamedPlugin<Props> {
  return [name, plugin as Plugin]
}
