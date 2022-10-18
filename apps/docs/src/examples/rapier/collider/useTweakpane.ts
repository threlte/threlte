import { onDestroy } from 'svelte'
import { get, writable } from 'svelte/store'
import type { FolderApi, TabPageApi, InputParams } from 'tweakpane'
import * as tweakpaneDefault from 'tweakpane'
import type { PaneConfig } from 'tweakpane/dist/types/pane/pane-config'

const tp = (tweakpaneDefault as any).default ?? tweakpaneDefault

export const useTweakpane = (config?: Omit<PaneConfig, 'container' | 'document'>) => {
	let disposed = false

	const pane = new tp.Pane(config)
	const unsubscriptions = new Set<() => void>()

	const action = (node: HTMLElement) => {
		node.append(pane.element)

		// THIS IS TO ENSURE THAT CSS IS HANDLED EQUALLY
		// IN A PLAYGROUND AND IN A REGULAR EXAMPLE
		node.style.top = '1.5rem'
		node.style.right = '1.5rem'
		node.style.width = 'calc(100% - 3rem)'
		node.style.maxWidth = '300px'
		node.style.position = 'absolute'
		node.style.setProperty('--tp-base-background-color', 'hsla(230, 0%, 90%, 1.00')
		node.style.setProperty('--tp-base-shadow-color', 'hsla(0, 0%, 0%, 0.0')
		node.style.setProperty('--tp-button-background-color', 'hsla(230, 0%, 75%, 1.00')
		node.style.setProperty('--tp-button-background-color-active', 'hsla(230, 0%, 60%, 1.00')
		node.style.setProperty('--tp-button-background-color-focus', 'hsla(230, 0%, 65%, 1.00')
		node.style.setProperty('--tp-button-background-color-hover', 'hsla(230, 0%, 70%, 1.00')
		node.style.setProperty('--tp-button-foreground-color', 'hsla(230, 10%, 0%, 1.00')
		node.style.setProperty('--tp-container-background-color', 'hsla(230, 0%, 30%, 0.20')
		node.style.setProperty('--tp-container-background-color-active', 'hsla(230, 0%, 30%, 0.32')
		node.style.setProperty('--tp-container-background-color-focus', 'hsla(230, 0%, 30%, 0.28')
		node.style.setProperty('--tp-container-background-color-hover', 'hsla(230, 0%, 30%, 0.24')
		node.style.setProperty('--tp-container-foreground-color', 'hsla(230, 0%, 30%, 1.00')
		node.style.setProperty('--tp-groove-foreground-color', 'hsla(230, 0%, 30%, 0.10')
		node.style.setProperty('--tp-input-background-color', 'hsla(230, 0%, 30%, 0.10')
		node.style.setProperty('--tp-input-background-color-active', 'hsla(230, 0%, 30%, 0.22')
		node.style.setProperty('--tp-input-background-color-focus', 'hsla(230, 0%, 30%, 0.18')
		node.style.setProperty('--tp-input-background-color-hover', 'hsla(230, 0%, 30%, 0.14')
		node.style.setProperty('--tp-input-foreground-color', 'hsla(230, 0%, 30%, 1.00')
		node.style.setProperty('--tp-label-foreground-color', 'hsla(230, 0%, 30%, 0.70')
		node.style.setProperty('--tp-monitor-background-color', 'hsla(230, 0%, 30%, 0.10')
		node.style.setProperty('--tp-monitor-foreground-color', 'hsla(230, 0%, 30%, 0.50')

		return {
			destroy() {
				if (disposed) return
				pane.dispose()
				unsubscriptions.forEach((unsubscribe) => unsubscribe())
				disposed = true
			}
		}
	}

	const addButton = (options: { title: string; label?: string; onClick: () => void }) => {
		const button = pane.addButton({
			title: options.title,
			label: options.label
		})
		button.on('click', options.onClick)
	}

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
	const addInput = <Value extends any>(options: {
		label: string
		value: Value
		params?: InputParams
		parent?: FolderApi | TabPageApi
	}) => {
		const store = writable<Value>(options.value)
		const input = (options.parent ? options.parent : pane).addInput(
			{
				[options.label]: get(store)
			},
			options.label,
			options.params
		)
		let initialSubscriptionProcessed = false
		let ignoreNextSubscriptionEvent = false
		let ignoreNextInputEvent = false
		input.on('change', (e: { value: Value }) => {
			if (ignoreNextInputEvent) {
				ignoreNextInputEvent = false
				return
			}
			ignoreNextSubscriptionEvent = true
			store.set(e.value)
		})
		const unsubscribe = store.subscribe((v) => {
			if (!initialSubscriptionProcessed) {
				initialSubscriptionProcessed = true
				return
			}
			if (ignoreNextSubscriptionEvent) {
				ignoreNextSubscriptionEvent = false
				return
			}
			ignoreNextInputEvent = true
			input.controller_.binding.target.write(v)
			input.refresh()
		})
		unsubscriptions.add(unsubscribe)
		return store
	}

	onDestroy(() => {
		if (disposed) return
		pane.dispose()
		unsubscriptions.forEach((unsubscribe) => unsubscribe())
		disposed = true
	})

	return {
		addFolder: pane.addFolder.bind(pane),
		addSeparator: pane.addSeparator.bind(pane),
		addButton,
		addInput,
		action,
		pane
	}
}
