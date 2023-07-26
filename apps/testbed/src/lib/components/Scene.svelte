<script lang="ts">
	import type { ISheet } from '@theatre/core'
	import { T, useThrelte } from '@threlte/core'
	import { Grid, OrbitControls, Portal } from '@threlte/extras'
	import { Sheet, SheetObject } from '@threlte/theatre'
	import KeyboardControls from './KeyboardControls.svelte'
	import { springScrollPos } from './scrollPos'
	import { debug } from './state'
	import ScrollSheet from './ScrollSheet.svelte'
	import Threlte from './Threlte.svelte'

	let sheet: ISheet | undefined

	$: sheet && (sheet.sequence.position = $springScrollPos * 10)

	const { scene } = useThrelte()
</script>

<T.PerspectiveCamera
	makeDefault={$debug}
	on:create={({ ref }) => {
		ref.position.set(10, 10, 10)
		ref.lookAt(0, 0, 0)
	}}
>
	{#if $debug}
		<OrbitControls enableZoom={false} />
	{/if}
</T.PerspectiveCamera>

<T.DirectionalLight position={[1, 3, 1]} />

{#if $debug}
	<Grid />
{/if}

<T.PerspectiveCamera position.z={10} makeDefault={!$debug} let:ref={camera}>
	{#if $debug}
		<Portal object={scene}>
			<T.CameraHelper args={[camera]} />
		</Portal>
	{/if}
</T.PerspectiveCamera>

<ScrollSheet name="Box" startAtScrollPosition={0} endAtScrollPosition={4}>
	<SheetObject key="Box" let:Transform let:Sync>
		<KeyboardControls let:transform>
			<Transform {...transform}>
				<Threlte>
					<Sync material.color />
				</Threlte>
			</Transform>
		</KeyboardControls>
	</SheetObject>
</ScrollSheet>
