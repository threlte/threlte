<script>
	import { setContext, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import SplitPane from './SplitPane.svelte';
	import InputOutputToggle from './InputOutputToggle.svelte';
	import ComponentSelector from './Input/ComponentSelector.svelte';
	import ModuleEditor from './Input/ModuleEditor.svelte';
	import Output from './Output/index.svelte';
	import Bundler from './Bundler.js';
	import { is_browser } from './env.js';

	export let packagesUrl = 'https://unpkg.com';
	export let svelteUrl = `${packagesUrl}/svelte`;
	export let embedded = false;
	export let orientation = 'columns';
	export let relaxed = false;
	export let fixed = false;
	export let fixedPos = 50;
	export let injectedJS = '';
	export let injectedCSS = '';
	export let theme = 'svelte';
	export let showModified = false;
	export let showAst = false;

	const historyMap = new Map();

	export function toJSON() {
		return {
			imports: $bundle.imports,
			components: $components
		};
	}

	export async function set(data) {
		components.set(data.components);
		selected.set(data.components[0]);

		rebundle();

		await module_editor_ready;
		await output_ready;

		injectedCSS = data.css || '';
		await module_editor.set($selected.source, $selected.type);
		output.set($selected, $compile_options);

		historyMap.clear();
		module_editor.clearHistory();
	}

	export function markSaved() {
		components.update((components) =>
			components.map((c) => {
				c.modified = false;
				return c;
			})
		);
		selected.update((c) => c);
	}

	export function update(data) {
		const { name, type } = $selected || {};

		components.set(data.components);

		const matched_component = data.components.find(
			(file) => file.name === name && file.type === type
		);
		selected.set(matched_component || data.components[0]);

		injectedCSS = data.css || '';

		if (matched_component) {
			module_editor.update(matched_component.source);
			output.update(matched_component, $compile_options);
		} else {
			module_editor.set(matched_component.source, matched_component.type);
			output.set(matched_component, $compile_options);

			module_editor.clearHistory();
		}
	}

	const dispatch = createEventDispatcher();

	const components = writable([]);
	const selected = writable(null);
	const bundle = writable(null);
	const cursor_index = writable(0);
	const toggleable = writable(false);

	const compile_options = writable({
		generate: 'dom',
		dev: false,
		css: false,
		hydratable: false,
		customElement: false,
		immutable: false,
		legacy: false
	});

	let module_editor;
	let output;

	let width = 0;
	let show_output = false;

	let current_token;
	async function rebundle() {
		const token = (current_token = {});
		const result = await bundler.bundle($components);
		if (result && token === current_token) bundle.set(result);
	}

	// TODO this is a horrible kludge, written in a panic. fix it
	let fulfil_module_editor_ready;
	let module_editor_ready = new Promise((f) => (fulfil_module_editor_ready = f));

	let fulfil_output_ready;
	let output_ready = new Promise((f) => (fulfil_output_ready = f));

	setContext('REPL', {
		components,
		selected,
		bundle,
		compile_options,

		cursor_index,
		toggleable,
		module_editor_ready,

		rebundle,

		navigate: (item) => {
			const match = /^(.+)\.(\w+)$/.exec(item.filename);
			if (!match) return; // ???

			const [, name, type] = match;
			const component = $components.find((c) => c.name === name && c.type === type);
			handle_select(component);

			setTimeout(() => {
				module_editor.focus();
				module_editor.setCursor({
					line: item.start.line - 1,
					ch: item.start.column,
				});
			}, 0);
		},

		handle_change: (event) => {
			selected.update((component) => {
				// TODO this is a bit hacky — we're relying on mutability
				// so that updating components works... might be better
				// if a) components had unique IDs, b) we tracked selected
				// *index* rather than component, and c) `selected` was
				// derived from `components` and `index`
				if (component.source != event.detail.value) {
					component.source = event.detail.value;
					component.modified = true;
				}
				return component;
			});

			components.update((component) => {
				if (component.name === $selected.name) {
					return $selected;
				}

				return component;
			});

			// recompile selected component
			output.update($selected, $compile_options);

			rebundle();

			dispatch('change', {
				components: $components
			});
		},

		register_module_editor(editor) {
			module_editor = editor;
			module_editor.cursorIndex.subscribe((index) => {
				cursor_index.set(index);
			});
			fulfil_module_editor_ready();
		},

		register_output(handlers) {
			output = handlers;
			fulfil_output_ready();
		},

		request_focus() {
			module_editor.focus();
		},

		mark_text({ from, to }) {
			module_editor.unmarkText();
			module_editor.markText({ from, to });
		},

		unmark_text() {
			module_editor.unmarkText();
		}
	});

	function handle_select(component) {
		historyMap.set(get_component_name($selected), module_editor.getHistory());
		selected.set(component);
		module_editor.set(component.source, component.type);
		if (historyMap.has(get_component_name($selected))) {
			module_editor.setHistory(historyMap.get(get_component_name($selected)));
		} else {
			module_editor.clearHistory();
		}
		output.set($selected, $compile_options);
	}

	function get_component_name(component) {
		return `${component.name}.${component.type}`;
	}

	function beforeUnload(event) {
		if (showModified && $components.find((component) => component.modified)) {
			event.preventDefault();
			event.returnValue = '';
		}
	}

	let sourceErrorLoc;

	let status = null;
	let status_visible = false;
	let status_timeout = null;

	const bundler =
		is_browser &&
		new Bundler({
			packagesUrl,
			svelteUrl,
			onstatus: (message) => {
				if (message) {
					// show bundler status, but only after time has elapsed, to
					// prevent the banner flickering
					if (!status_visible && !status_timeout) {
						status_timeout = setTimeout(() => {
							status_visible = true;
						}, 400);
					}
				} else {
					clearTimeout(status_timeout);
					status_visible = false;
					status_timeout = null;
				}

				status = message;
			}
		});

	$: if (output && $selected) {
		output.update($selected, $compile_options);
	}

	$: mobile = width < 540;

	$: $toggleable = mobile && orientation === 'columns';
</script>

<svelte:window on:beforeunload={beforeUnload} />

<div class="container" class:toggleable={$toggleable} bind:clientWidth={width}>
	<div class="viewport" class:output={show_output}>
		<SplitPane
			type={orientation === 'rows' ? 'vertical' : 'horizontal'}
			pos={(mobile || fixed) ? fixedPos : orientation === 'rows' ? 50 : 60}
			fixed={fixed}
		>
			<section slot="a">
				<ComponentSelector show_modified={showModified} {handle_select} on:add on:remove />
				<ModuleEditor errorLoc={sourceErrorLoc} {theme} />
			</section>

			<section slot="b" style="height: 100%;">
				<Output {svelteUrl} status={status_visible && status} {embedded} {relaxed} {injectedJS} {injectedCSS} {theme} {showAst} />
			</section>
		</SplitPane>
	</div>
	{#if $toggleable}
		<InputOutputToggle bind:checked={show_output}/>
	{/if}
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		background: white;
	}

	.container :global(section) {
		position: relative;
		padding: 42px 0 0 0;
		height: 100%;
		box-sizing: border-box;
	}

	.container :global(section) > :global(*):first-child {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 42px;
		box-sizing: border-box;
	}

	.container :global(section) > :global(*):last-child {
		width: 100%;
		height: 100%;
	}

	.viewport {
		height: 100%;
	}

	.toggleable .viewport {
		width: 200%;
		height: calc(100% - 42px);
		transition: transform 0.3s;
	}

	.toggleable .viewport.output {
		transform: translate(-50%);
	}
</style>
