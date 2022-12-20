<script>
	import { onMount, getContext } from 'svelte';
	import getLocationFromStack from './getLocationFromStack.js';
	import PaneWithPanel from './PaneWithPanel.svelte';
	import ReplProxy from './ReplProxy.js';
	import Console from './Console.svelte';
	import Message from '../Message.svelte';
	import srcdoc from './srcdoc/index.html?raw';
	import { browser } from '$app/environment';

	const { bundle } = getContext('REPL');

	export let error; // TODO should this be exposed as a prop?
	let logs = [];
	let log_group_stack = [];
	let current_log_group = logs;

	export function setProp(prop, value) {
		if (!proxy) return;
		proxy.setProp(prop, value);
	}

	export let status;
	export let relaxed = false;
	export let injectedJS = '';
	export let injectedCSS = '';

	let iframe;
	let pending_imports = 0;
	let pending = false;

	let proxy = null;

	let ready = false;
	let inited = false;

	let log_height = 90;
	let prev_height;

	let last_console_event;

	onMount(() => {
		proxy = new ReplProxy(iframe, {
			on_fetch_progress: (progress) => {
				pending_imports = progress;
			},
			on_error: (event) => {
				push_logs({ level: 'error', args: [event.value] });
			},
			on_unhandled_rejection: (event) => {
				let error = event.value;
				if (typeof error === 'string') error = { message: error };
				error.message = 'Uncaught (in promise): ' + error.message;
				push_logs({ level: 'error', args: [error] });
			},
			on_console: (log) => {
				if (log.level === 'clear') {
					clear_logs();
					push_logs(log);
				} else if (log.duplicate) {
					increment_duplicate_log();
				} else {
					push_logs(log);
				}
			},
			on_console_group: (action) => {
				group_logs(action.label, false);
			},
			on_console_group_end: () => {
				ungroup_logs();
			},
			on_console_group_collapsed: (action) => {
				group_logs(action.label, true);
			}
		});

		iframe.addEventListener('load', () => {
			proxy.handle_links();
			ready = true;
		});

		return () => {
			proxy.destroy();
		};
	});

	async function apply_bundle($bundle) {
		if (!$bundle || $bundle.error) return;

		try {
			clear_logs();

			await proxy.eval(`
				${injectedJS}

				${styles}

				const styles = document.querySelectorAll('style[id^=svelte-]');

				let i = styles.length;
				while (i--) styles[i].parentNode.removeChild(styles[i]);

				if (window.component) {
					try {
						window.component.$destroy();
					} catch (err) {
						console.error(err);
					}
				}

				document.body.innerHTML = '';
				window.location.hash = '';
				window._svelteTransitionManager = null;

				${$bundle.dom.code}

				window.component = new SvelteComponent.default({
					target: document.body
				});
			`);

			error = null;
		} catch (e) {
			show_error(e);
		}

		inited = true;
	}

	$: if (ready) apply_bundle($bundle);

	$: styles =
		injectedCSS &&
		`{
		const style = document.createElement('style');
		style.textContent = ${JSON.stringify(injectedCSS)};
		document.head.appendChild(style);
	}`;

	function show_error(e) {
		const loc = getLocationFromStack(e.stack, $bundle.dom.map);
		if (loc) {
			e.filename = loc.source;
			e.loc = { line: loc.line, column: loc.column };
		}

		error = e;
	}

	function push_logs(log) {
		current_log_group.push((last_console_event = log));
		logs = logs;
	}

	function group_logs(label, collapsed) {
		const group_log = { level: 'group', label, collapsed, logs: [] };
		current_log_group.push(group_log);
		log_group_stack.push(current_log_group);
		current_log_group = group_log.logs;
		logs = logs;
	}

	function ungroup_logs() {
		current_log_group = log_group_stack.pop();
	}

	function increment_duplicate_log() {
		const last_log = current_log_group[current_log_group.length - 1];

		if (last_log) {
			last_log.count = (last_log.count || 1) + 1;
			logs = logs;
		} else {
			last_console_event.count = 1;
			push_logs(last_console_event);
		}
	}

	function on_toggle_console() {
		if (log_height < 90) {
			prev_height = log_height;
			log_height = 90;
		} else {
			log_height = prev_height || 45;
		}
	}

	function clear_logs() {
		current_log_group = logs = [];
	}
</script>

<div class="iframe-container">
	<PaneWithPanel pos={100} panel="Console">
		<div slot="main">
			<iframe
				title="Result"
				class:inited
				bind:this={iframe}
				sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals {relaxed
					? 'allow-same-origin'
					: ''}"
				class={error || pending || pending_imports ? 'greyed-out' : ''}
				srcdoc={browser ? srcdoc : ''}
			/>
		</div>

		<div slot="panel-header">
			<button on:click|stopPropagation={clear_logs}>
				{#if logs.length > 0}({logs.length}){/if}
				Clear
			</button>
		</div>

		<section slot="panel-body">
			<Console {logs} on:clear={clear_logs} />
		</section>
	</PaneWithPanel>

	<div class="overlay">
		{#if error}
			<Message kind="error" details={error} />
		{:else if status || !$bundle}
			<Message kind="info" truncate>{status || 'loading Svelte compiler...'}</Message>
		{/if}
	</div>
</div>

<style>
	.iframe-container {
		position: absolute;
		background-color: white;
		border: none;
		width: 100%;
		height: 100%;
	}

	iframe {
		width: 100%;
		height: 100%;
		/* height: calc(100vh - var(--nav-h)); */
		border: none;
		display: block;
	}

	.greyed-out {
		filter: grayscale(50%) blur(1px);
		opacity: 0.25;
	}

	button {
		color: #999;
		font-size: 12px;
		text-transform: uppercase;
		display: block;
	}

	button:hover {
		color: #333;
	}

	.overlay {
		position: absolute;
		bottom: 0;
		width: 100%;
	}
</style>
