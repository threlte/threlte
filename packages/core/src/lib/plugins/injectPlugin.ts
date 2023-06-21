import {getContext, setContext} from 'svelte'
import type {AnyPlugin, AnyProps, NamedPlugin, Plugin, PluginContext, PluginContextName} from './types'

let unNamedCount = 0;

export function injectPlugin<Props extends AnyProps = AnyProps>(
	plugin: AnyPlugin<Props>
): void
export function injectPlugin<Props extends AnyProps = AnyProps>(
	name: string,
	plugin: AnyPlugin<Props>
): void
export function injectPlugin<Props extends AnyProps = AnyProps>(
	nameOrPlugin: string | AnyPlugin<Props>,
	maybePlugin?: AnyPlugin<Props>
): void {
	const contextName: PluginContextName = 'threlte-plugin-context'

	const name = maybePlugin ? <string>nameOrPlugin : (<NamedPlugin<Props>>nameOrPlugin)?.[0] || `--threlte-internal-plugin-${unNamedCount++}`
	let plugin: AnyPlugin<Props> = maybePlugin || <AnyPlugin<Props>>nameOrPlugin
	if (Array.isArray(plugin)) plugin = plugin[1]
	setContext<PluginContext>(contextName, {
		...getContext<PluginContext | undefined>(contextName),
		[name]: plugin as Plugin
	})
}
