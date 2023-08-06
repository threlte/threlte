<script lang="ts">
	import {
		HierarchicalObject,
		currentWritable,
		useFrame,
		useRender,
		useThrelte,
		type CurrentWritable,
		type ThrelteContext
	} from '@threlte/core';
	import { onMount, setContext } from 'svelte';
	import { Color, PerspectiveCamera, Scene, Vector4 } from 'three';

	const parentContext = useThrelte();

	export let element: HTMLElement;

	export const createDefaultCamera = (): PerspectiveCamera => {
		const defaultCamera = new PerspectiveCamera(75, 0, 0.1, 1000);
		defaultCamera.position.z = 5;
		defaultCamera.lookAt(0, 0, 0);
		return defaultCamera;
	};

	const defaultCamera = new PerspectiveCamera();
	defaultCamera.position.set(0, 0, 3);

	const childContextOverrides = {
		scene: new Scene(),
		camera: currentWritable(createDefaultCamera())
	};

	const childContext: ThrelteContext & {
		size: CurrentWritable<{ width: number; height: number }>;
	} = {
		...parentContext,
		size: currentWritable({ width: 0, height: 0 }),
		scene: childContextOverrides.scene,
		camera: childContextOverrides.camera
	};

	onMount(() => {
		// Only render the view scene if it has children, otherwise render the
		// default scene.
		if (!childContextOverrides.scene.children.length) {
			childContext.scene = parentContext.scene;
			childContext.camera = parentContext.camera;
		}
	});

	setContext<ThrelteContext>('threlte', childContext);

	// we also need to make a state enclave for the user context
	const userCtx = currentWritable({});
	setContext('threlte-user-context', userCtx);

	const originalViewport = new Vector4();
	const originalScissor = new Vector4();
	let originalScissorTest: boolean;
	const clearColor = new Color();

	function computeContainerPosition(
		canvas: HTMLCanvasElement,
		trackingElement: HTMLElement
	): {
		position: { left: number; width: number; bottom: number; height: number };
		isOffscreen: boolean;
	} {
		const trackRect = trackingElement.getBoundingClientRect();
		const canvasRect = canvas.getBoundingClientRect();
		const { right, top, left: trackLeft, bottom: trackBottom, width, height } = trackRect;

		const isOffscreen =
			trackRect.bottom < 0 ||
			top > canvasRect.height ||
			right < 0 ||
			trackRect.left > canvasRect.width;

		const canvasBottom = canvasRect.top + canvasRect.height;
		const bottom = canvasBottom - trackBottom;
		const left = trackLeft - canvasRect.left;

		return { position: { width, height, left, bottom }, isOffscreen };
	}

	useFrame(() => {});

	useRender(({ renderer }) => {
		const {
			position: { left, bottom, width, height },
			isOffscreen
		} = computeContainerPosition(renderer.domElement, element);

		if (childContext.size.current.width !== width || childContext.size.current.height !== height) {
			childContext.size.set({ width, height });
		}

		// save original state
		renderer.getScissor(originalScissor);
		renderer.getViewport(originalViewport);
		originalScissorTest = renderer.getScissorTest();

		// apply scissor
		renderer.setViewport(left, bottom, width, height);
		renderer.setScissor(left, bottom, width, height);
		renderer.setScissorTest(true);

		// render or clear depending on offscreen status
		if (isOffscreen) {
			renderer.getClearColor(clearColor);
			renderer.setClearColor(clearColor, renderer.getClearAlpha());
			renderer.clear(true, true);
		} else {
			renderer.render(childContext.scene, childContext.camera.current);
		}

		// reset state
		renderer.setViewport(originalViewport);
		renderer.setScissor(originalScissor);
		renderer.setScissorTest(originalScissorTest);
	});
</script>

<HierarchicalObject
	onChildMount={(child) => {
		childContextOverrides.scene.add(child);
	}}
	onChildDestroy={(child) => {
		childContextOverrides.scene.remove(child);
	}}
>
	<slot />
</HierarchicalObject>
