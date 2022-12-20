<script>
	import { getContext, onMount } from 'svelte';
	import CodeMirror from '../CodeMirror.svelte';
	import Message from '../Message.svelte';

	const { bundle, selected, handle_change, register_module_editor } = getContext('REPL');

	export let errorLoc;
	export let theme;

	let editor;
	onMount(() => {
		register_module_editor(editor);
	});

	export function focus() {
		editor.focus();
	}

	let error = null;
	let warnings = [];
	let timeout = null;

	$: if ($bundle) {
		clearTimeout(timeout);

		// if there's already an error/warnings displayed, update them
		if (error) error = $bundle.error;
		if (warnings.length > 0) warnings = $bundle.warnings;

		timeout = setTimeout(() => {
			error = $bundle.error;
			warnings = $bundle.warnings;
		}, 400);
	}
</script>

<style>
	.editor-wrapper {
		z-index: 5;
		background: var(--back-light);
		display: flex;
		flex-direction: column;
	}

	.editor {
		height: 0;
		flex: 1 1 auto;
	}

	.info {
		background-color: var(--second);
		max-height: 50%;
		overflow: auto;
	}

	:global(.columns) .editor-wrapper {
		/* make it easier to interact with scrollbar */
		padding-right: 8px;
		height: auto;
		/* height: 100%; */
	}
</style>

<div class="editor-wrapper">
	<div class="editor notranslate" translate="no">
		<CodeMirror
			bind:this={editor}
			{errorLoc}
			{theme}
			on:change={handle_change}
		/>
	</div>

	<div class="info">
		{#if error}
			<Message kind="error" details={error} filename="{$selected.name}.{$selected.type}"/>
		{:else if warnings.length > 0}
			{#each warnings as warning}
				<Message kind="warning" details={warning} filename="{$selected.name}.{$selected.type}"/>
			{/each}
		{/if}
	</div>
</div>
