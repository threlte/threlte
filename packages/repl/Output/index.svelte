<script>
	import { getContext } from 'svelte';
	import { parse } from 'marked';
	import Viewer from './Viewer.svelte';
	import PaneWithPanel from './PaneWithPanel.svelte';
	import CompilerOptions from './CompilerOptions.svelte';
	import Compiler from './Compiler.js';
	import CodeMirror from '../CodeMirror.svelte';
	import AstView from './AstView.svelte';
	import { is_browser } from '../env.js';

	const { register_output, module_editor_ready } = getContext('REPL');

	export let svelteUrl;
	export let status;
	export let sourceErrorLoc = null;
	export let runtimeError = null;
	export let embedded = false;
	export let relaxed = false;
	export let injectedJS;
	export let injectedCSS;
	export let theme;
	export let showAst;

	register_output({
		set: async (selected, options) => {
			selected_type = selected.type;

			if (selected.type === 'js' || selected.type === 'json') {
				js_editor.set(`/* Select a component to see its compiled code */`);
				css_editor.set(`/* Select a component to see its compiled code */`);
				return;
			}

			if (selected.type === 'md') {
				markdown = parse(selected.source);
				return;
			}

			const compiled = await compiler.compile(selected, options, showAst);
			if (!js_editor) return; // unmounted

			js_editor.set(compiled.js, 'js');
			css_editor.set(compiled.css, 'css');
			ast = compiled.ast;
		},

		update: async (selected, options) => {
			if (selected.type === 'js' || selected.type === 'json') return;

			if (selected.type === 'md') {
				markdown = parse(selected.source);
				return;
			}

			const compiled = await compiler.compile(selected, options, showAst);
			if (!js_editor) return; // unmounted

			js_editor.update(compiled.js);
			css_editor.update(compiled.css);
			ast = compiled.ast;
		}
	});

	const compiler = is_browser && new Compiler(svelteUrl);

	// refs
	let js_editor;
	let css_editor;

	let view = 'result';
	let selected_type = '';
	let markdown = '';
	let ast;
</script>

<div class="view-toggle">
	{#if selected_type === 'md'}
		<button class="active">Markdown</button>
	{:else}
		<button class:active={view === 'result'} on:click={() => (view = 'result')}>Result</button>
		<button class:active={view === 'js'} on:click={() => (view = 'js')}>JS output</button>
		<button class:active={view === 'css'} on:click={() => (view = 'css')}>CSS output</button>
		{#if showAst}
			<button class:active={view === 'ast'} on:click={() => (view = 'ast')}>AST output</button>
		{/if}
	{/if}
</div>

<!-- component viewer -->
<div class="tab-content" class:visible={selected_type !== 'md' && view === 'result'}>
	<Viewer bind:error={runtimeError} {status} {relaxed} {injectedJS} {injectedCSS} />
</div>

<!-- js output -->
<div class="tab-content" class:visible={selected_type !== 'md' && view === 'js'}>
	{#if embedded}
		<CodeMirror bind:this={js_editor} errorLoc={sourceErrorLoc} {theme} readonly />
	{:else}
		<PaneWithPanel pos={67} panel="Compiler options">
			<div slot="main">
				<CodeMirror bind:this={js_editor} errorLoc={sourceErrorLoc} {theme} readonly />
			</div>

			<div slot="panel-body">
				<CompilerOptions />
			</div>
		</PaneWithPanel>
	{/if}
</div>

<!-- css output -->
<div class="tab-content" class:visible={selected_type !== 'md' && view === 'css'}>
	<CodeMirror bind:this={css_editor} errorLoc={sourceErrorLoc} {theme} readonly />
</div>

<!-- ast output -->
{#if showAst}
	<div class="tab-content" class:visible={selected_type !== 'md' && view === 'ast'}>
		<!-- ast view interacts with the module editor, wait for it first -->
		{#await module_editor_ready then}
			<AstView {ast} autoscroll={selected_type !== 'md' && view === 'ast'} />
		{/await}
	</div>
{/if}

<!-- markdown output -->
<div class="tab-content" class:visible={selected_type === 'md'}>
	<iframe title="Markdown" srcdoc={markdown} />
</div>

<style>
	.view-toggle {
		height: 4.2rem;
		border-bottom: 1px solid #eee;
		white-space: nowrap;
		box-sizing: border-box;
	}

	button {
		/* width: 50%;
		height: 100%; */
		background: white;
		text-align: left;
		position: relative;
		font: 400 12px/1.5 var(--font);
		border: none;
		border-bottom: 3px solid transparent;
		padding: 12px 12px 8px 12px;
		color: #999;
		border-radius: 0;
	}

	button.active {
		border-bottom: 3px solid var(--prime);
		color: #333;
	}

	div[slot] {
		height: 100%;
	}

	.tab-content {
		position: absolute;
		width: 100%;
		height: calc(100% - 42px) !important;
		visibility: hidden;
		pointer-events: none;
	}

	.tab-content.visible {
		visibility: visible;
		pointer-events: all;
	}
	iframe {
		width: 100%;
		height: 100%;
		border: none;
		display: block;
	}
</style>
