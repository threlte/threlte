<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { World, Debug } from '@threlte/rapier'
	import BasicScene from './BasicScene.svelte'
	import type { GravityType } from '@threlte/rapier'
	import AdvancedScene from './AdvancedScene.svelte'
	import { useTweakpane } from '$lib/useTweakpane'

	let reset: (() => void) | undefined

	const { pane, action, addInput, addButton } = useTweakpane({
		title: 'Attractor'
	})

	let tabIndex = 0
	$: showAdvanced = tabIndex === 1

	addButton({
		title: 'Reset',
		label: 'Reset the scene',
		onClick: () => {
			reset?.()
		}
	})

	const showHelper = addInput({
		label: 'Show helper',
		value: false
	})

	const tab = pane.addTab({
		pages: [
			{
				title: 'Basic'
			},
			{
				title: 'Advanced'
			}
		]
	})

	tab.on('select', (e: { index: number }) => {
		tabIndex = e.index
	})

	const basicPage = tab.pages[0]

	const strengthLeft = addInput({
		label: 'Strength left',
		value: 1,
		params: {
			min: -5,
			max: 5,
			step: 0.1
		},
		parent: basicPage
	})

	const strengthCenter = addInput({
		label: 'Strength center',
		value: 1,
		params: {
			min: -5,
			max: 5,
			step: 0.1
		},
		parent: basicPage
	})

	const strengthRight = addInput({
		label: 'Strength right',
		value: 1,
		params: {
			min: -5,
			max: 5,
			step: 0.1
		},
		parent: basicPage
	})

	const advancedPage = tab.pages[1]

	const gravityTypes: GravityType[] = ['static', 'linear', 'newtonian']
	let gravityType: GravityType = gravityTypes[0]

	addButton({
		title: gravityTypes[0],
		label: 'Set Gravity Type',
		parent: advancedPage,
		onClick: () => {
			gravityType = gravityTypes[0]
		}
	})

	addButton({
		title: gravityTypes[1],
		label: ' ',
		parent: advancedPage,
		onClick: () => {
			gravityType = gravityTypes[1]
		}
	})

	addButton({
		title: gravityTypes[2],
		label: ' ',
		parent: advancedPage,
		onClick: () => {
			gravityType = gravityTypes[2]
		}
	})
</script>

<div use:action />

<Canvas>
	<World gravity={[0, showAdvanced ? 0 : -3, 0]}>
		{#if $showHelper}
			<Debug />
		{/if}
		{#if showAdvanced}
			<AdvancedScene
				type={gravityType}
				bind:reset
			/>
		{:else}
			<BasicScene
				bind:reset
				strengthLeft={$strengthLeft}
				strengthCenter={$strengthCenter}
				strengthRight={$strengthRight}
			/>
		{/if}
		<HTML
			slot="fallback"
			transform
		>
			<p>
				It seems your browser<br />
				doesn't support WASM.<br />
				I'm sorry.
			</p>
		</HTML>
	</World>
</Canvas>

<style>
	p {
		font-size: 0.75rem;
		line-height: 1rem;
	}
</style>
