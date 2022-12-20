<script>
	import { getContext, createEventDispatcher } from 'svelte';

	export let handle_select;
	export let show_modified;

	let { components, selected, request_focus, rebundle } = getContext('REPL');
	const dispatch = createEventDispatcher();

	let editing = null;

	function selectComponent(component) {
		if ($selected !== component) {
			editing = null;
			handle_select(component);
		}
	}

	function editTab(component) {
		if ($selected === component) {
			editing = $selected;
		}
	}

	function closeEdit() {
		const match = /(.+)\.(svelte|js|json|md)$/.exec($selected.name);
		$selected.name = match ? match[1] : $selected.name;
		if (isComponentNameUsed($selected)) {
			let i = 1;
			let name = $selected.name;
			do {
				$selected.name = `${name}_${i++}`;
			} while (isComponentNameUsed($selected));
		}
		if (match && match[2]) $selected.type = match[2];

		editing = null;

		// re-select, in case the type changed
		handle_select($selected);

		components = components; // TODO necessary?

		// focus the editor, but wait a beat (so key events aren't misdirected)
		setTimeout(request_focus);

		rebundle();
	}

	function remove(component) {
		let result = confirm(`Are you sure you want to delete ${component.name}.${component.type}?`);

		if (result) {
			const index = $components.indexOf(component);

			if (~index) {
				components.set($components.slice(0, index).concat($components.slice(index + 1)));
				dispatch('remove', { components: $components });
			} else {
				console.error(`Could not find component! That's... odd`);
			}

			handle_select($components[index] || $components[$components.length - 1]);
		}
	}

	function selectInput(event) {
		setTimeout(() => {
			event.target.select();
		});
	}

	let uid = 1;

	function addNew() {
		const component = {
			name: uid++ ? `Component${uid}` : 'Component1',
			type: 'svelte',
			source: '',
			modified: true
		};

		editing = component;

		components.update((components) => components.concat(component));
		handle_select(component);

		dispatch('add', { components: $components });
	}

	function isComponentNameUsed(editing) {
		return $components.find(
			(component) => component !== editing && component.name === editing.name
		);
	}

	// drag and drop
	let from = null;
	let over = null;

	function dragStart(event) {
		from = event.currentTarget.id;
	}

	function dragLeave() {
		over = null;
	}

	function dragOver(event) {
		event.preventDefault();
		over = event.currentTarget.id;
	}

	function dragEnd(event) {
		event.preventDefault();

		if (from && over) {
			const from_index = $components.findIndex((component) => component.name === from);
			const to_index = $components.findIndex((component) => component.name === over);

			const from_component = $components[from_index];

			$components.splice(from_index, 1);
			components.set(
				$components.slice(0, to_index).concat(from_component).concat($components.slice(to_index))
			);
		}
		from = over = null;
	}
</script>

<div class="component-selector">
	{#if $components.length}
		<div class="file-tabs" on:dblclick={addNew}>
			{#each $components as component, index}
				<div
					id={component.name}
					class="button"
					role="button"
					class:active={component === $selected}
					class:draggable={component !== editing && index !== 0}
					class:drag-over={over === component.name}
					on:click={() => selectComponent(component)}
					on:dblclick={(e) => e.stopPropagation()}
					draggable={component !== editing}
					on:dragstart={dragStart}
					on:dragover={dragOver}
					on:dragleave={dragLeave}
					on:drop={dragEnd}
				>
					<i class="drag-handle" />
					{#if component.name === 'App' && component !== editing}
						<div class="uneditable">
							App.svelte{#if show_modified && component.modified}*{/if}
						</div>
					{:else if component === editing}
						<span class="input-sizer"
							>{editing.name + (/\./.test(editing.name) ? '' : `.${editing.type}`)}</span
						>

						<!-- svelte-ignore a11y-autofocus -->
						<input
							autofocus
							spellcheck={false}
							bind:value={editing.name}
							on:focus={selectInput}
							on:blur={closeEdit}
							on:keydown={(e) => e.which === 13 && !isComponentNameUsed(editing) && e.target.blur()}
							class:duplicate={isComponentNameUsed(editing)}
						/>
					{:else}
						<div class="editable" title="edit component name" on:click={() => editTab(component)}>
							{component.name}.{component.type}{#if show_modified && component.modified}*{/if}
						</div>

						<span class="remove" on:click={() => remove(component)}>
							<svg width="12" height="12" viewBox="0 0 24 24">
								<line stroke="#999" x1="18" y1="6" x2="6" y2="18" />
								<line stroke="#999" x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</span>
					{/if}
				</div>
			{/each}

			<button class="add-new" on:click={addNew} title="add new component">
				<svg width="12" height="12" viewBox="0 0 24 24">
					<line stroke="#999" x1="12" y1="5" x2="12" y2="19" />
					<line stroke="#999" x1="5" y1="12" x2="19" y2="12" />
				</svg>
			</button>
		</div>
	{/if}
</div>

<style>
	.component-selector {
		position: relative;
		border-bottom: 1px solid #eee;
		overflow: hidden;
	}

	.file-tabs {
		border: none;
		margin: 0;
		white-space: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
		height: 10em;
	}

	.file-tabs .button,
	.file-tabs button {
		position: relative;
		display: inline-block;
		font: 400 12px/1.5 var(--font);
		background: white;
		border: none;
		border-bottom: 3px solid transparent;
		padding: 12px 14px 8px 16px;
		margin: 0;
		color: #999;
		border-radius: 0;
		cursor: pointer;
	}

	.file-tabs .button.active {
		/* color: var(--second); */
		color: #333;
		border-bottom: 3px solid var(--prime);
	}

	.editable,
	.uneditable,
	.input-sizer,
	input {
		display: inline-block;
		position: relative;
		line-height: 1;
	}

	.input-sizer {
		color: #ccc;
	}

	input {
		position: absolute;
		width: 100%;
		left: 16px;
		top: 12px;
		font: 400 12px/1.5 var(--font);
		border: none;
		color: var(--flash);
		outline: none;
		background-color: transparent;
	}

	.duplicate {
		color: var(--prime);
	}

	.remove {
		position: absolute;
		display: none;
		right: 1px;
		top: 4px;
		width: 16px;
		text-align: right;
		padding: 12px 0 12px 5px;
		font-size: 8px;
		cursor: pointer;
	}

	.remove:hover {
		color: var(--flash);
	}

	.file-tabs .button.active .editable {
		cursor: text;
	}

	.file-tabs .button.active .remove {
		display: block;
	}

	.file-tabs .button.drag-over {
		background: #67677814;
	}

	.file-tabs .button.drag-over {
		cursor: move;
	}

	.add-new {
		position: absolute;
		left: 0;
		top: 0;
		padding: 12px 10px 8px 0 !important;
		height: 40px;
		text-align: center;
		background-color: white;
	}

	.add-new:hover {
		color: var(--flash) !important;
	}

	.drag-handle {
		cursor: move;
		width: 5px;
		height: 25px;
		position: absolute;
		left: 5px;
		top: 9px;
		--drag-handle-color: #dedede;
		background: linear-gradient(
			to right,
			var(--drag-handle-color) 1px,
			white 1px,
			white 2px,
			var(--drag-handle-color) 2px,
			var(--drag-handle-color) 3px,
			white 3px,
			white 4px,
			var(--drag-handle-color) 4px
		);
	}

	svg {
		position: relative;
		overflow: hidden;
		vertical-align: middle;
		-o-object-fit: contain;
		object-fit: contain;
		-webkit-transform-origin: center center;
		transform-origin: center center;

		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
</style>
