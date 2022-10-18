import { onDestroy } from 'svelte'
import { get, writable } from 'svelte/store'
import { FolderApi, Pane, TabPageApi, type InputParams } from 'tweakpane'
import type { PaneConfig } from 'tweakpane/dist/types/pane/pane-config'

export const useTweakpane = (config?: Omit<PaneConfig, 'container' | 'document'>) => {
	const pane = new Pane(config)
	const unsubscriptions = new Set<() => void>()

	const action = (node: HTMLElement) => {
		node.append(pane.element)
	}

	const addButton = (options: { title: string; label?: string; onClick: () => void }) => {
		const button = pane.addButton({
			title: options.title,
			label: options.label
		})
		button.on('click', options.onClick)
	}

	const addInput = <T>(options: {
		label: string
		value: T
		params?: InputParams
		parent?: FolderApi | TabPageApi
	}) => {
		const store = writable(options.value)
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
		input.on('change', (e) => {
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
		pane.dispose()
		unsubscriptions.forEach((unsubscribe) => unsubscribe())
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
