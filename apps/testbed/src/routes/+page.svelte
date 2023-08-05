<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import Renderer from './Renderer.svelte';
	import View from './View.svelte';
	import ViewSceneOne from './ViewSceneOne.svelte';
	import ViewSceneTwo from './ViewSceneTwo.svelte';

	let viewOne: HTMLDivElement;
	let viewTwo: HTMLDivElement;
</script>

<div class="background">
	<Canvas>
		<Renderer />
		<T.PerspectiveCamera
			makeDefault
			position={[3, 3, 3]}
			on:create={({ ref }) => ref.lookAt(0, 0, 0)}
		/>
		<T.Mesh>
			<T.MeshStandardMaterial color="hotpink" />
			<T.BoxGeometry />
		</T.Mesh>
		<T.DirectionalLight />
		<T.AmbientLight />

		{#if viewOne}
			<View element={viewOne}>
				<ViewSceneOne element={viewOne} />
			</View>
		{/if}

		{#if viewTwo}
			<View element={viewTwo}>
				<ViewSceneTwo element={viewTwo} />
			</View>
		{/if}
	</Canvas>
</div>

<main>
	Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
	labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
	dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
	amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
	invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
	justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
	dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
	tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
	et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
	ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
	eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
	accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
	Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
	nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
	eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
	sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
	sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
	At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
	takimata sanctus est Lorem ipsum dolor sit amet.
	<div class="view-one" bind:this={viewOne} />

	Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
	labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
	dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
	amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
	invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
	justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
	dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
	tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
	et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
	ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
	eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
	accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
	Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
	nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
	eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
	sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
	sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
	At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
	takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
	elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
	voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
	sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
	sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
	sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
	gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
	consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
	aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
	clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
	sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
	magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
	Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
	dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
	dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
	rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
	ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
	labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
	dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
	amet.
	<div class="view-two" bind:this={viewTwo} />
</main>

<style>
	:global(body) {
		margin: 0;
	}

	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
	}

	.view-one,
	.view-two {
		resize: both;
		overflow: auto;
	}

	.view-one {
		top: 200px;
		left: 200px;
		width: 50vw;
		height: 30vh;
		border: 1px solid red;
	}
	.view-two {
		top: 400px;
		left: 300px;
		width: 50vw;
		height: 30vh;
		border: 1px solid red;
	}
</style>
