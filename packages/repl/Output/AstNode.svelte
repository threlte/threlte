<script>
	import { getContext, tick } from 'svelte';

	export let key = '';
	export let value = undefined;
	export let collapsed = true;
	export let path_nodes = [];
	export let autoscroll = true;

	const { toggleable, mark_text, unmark_text } = getContext('REPL');

	let list_item;

	$: is_root = path_nodes[0] === value;
	$: is_leaf = path_nodes[path_nodes.length - 1] === value;
	$: is_ast_array = Array.isArray(value);
	$: is_collapsable = value && typeof value === 'object';
	$: is_markable = value && typeof value.start === 'number' && typeof value.end === 'number';
	$: key_text = key ? `${key}:` : '';

	let preview_text;
	$: if (is_collapsable && collapsed) {
		if (is_ast_array) {
			preview_text = `[ ${value.length} element${value.length === 1 ? '' : 's'} ]`;
		} else {
			preview_text = `{ ${Object.keys(value).join(', ')} }`;
		}
	}

	$: collapsed = !path_nodes.includes(value);

	$: if (autoscroll && is_leaf && !$toggleable) {
		// wait for all nodes to render before scroll
		tick().then(() => {
			if (list_item) {
				list_item.scrollIntoView();
			}
		});
	}

	function handle_mark_text(e) {
		if (is_markable) {
			e.stopPropagation();
			mark_text({ from: value.start, to: value.end });
		}
	}

	function handle_unmark_text(e) {
		if (is_markable) {
			e.stopPropagation();
			unmark_text();
		}
	}
</script>

<li
	bind:this={list_item}
	class:marked={!is_root && is_leaf}
	on:mouseover={handle_mark_text}
	on:focus={handle_mark_text}
	on:mouseleave={handle_unmark_text}
>
	{#if !is_root && is_collapsable}
		<button class="ast-toggle" class:open={!collapsed} on:click={() => (collapsed = !collapsed)}>
			{key_text}
		</button>
	{:else if key_text}
		<span>{key_text}</span>
	{/if}
	{#if is_collapsable}
		{#if collapsed && !is_root}
			<button class="preview" on:click={() => (collapsed = !collapsed)}>
				{preview_text}
			</button>
		{:else}
			<span>{is_ast_array ? '[' : '{'}</span>
			<ul>
				{#each Object.entries(value) as [k, v]}
					<svelte:self key={is_ast_array ? '' : k} value={v} {path_nodes} {autoscroll} />
				{/each}
			</ul>
			<span>{is_ast_array ? ']' : '}'}</span>
		{/if}
	{:else}
		<span class="token {typeof value}">
			{JSON.stringify(value)}
		</span>
	{/if}
</li>

<style>
	ul {
		padding: 0 0 0 2ch;
		margin: 0;
		list-style-type: none;
	}

	.marked {
		background-color: var(--highlight);
	}

	.preview {
		opacity: 0.8;
		font-style: italic;
	}

	button:hover {
		text-decoration: underline;
	}

	.ast-toggle {
		position: relative;
	}

	.ast-toggle::before {
		content: '\25B6';
		position: absolute;
		bottom: 0;
		left: -1.3rem;
		opacity: 0.7;
	}

	.ast-toggle.open::before {
		content: '\25BC';
	}

	.token {
		color: var(--base);
	}

	.token.string {
		color: var(--string);
	}

	.token.number {
		color: var(--number);
	}
</style>
