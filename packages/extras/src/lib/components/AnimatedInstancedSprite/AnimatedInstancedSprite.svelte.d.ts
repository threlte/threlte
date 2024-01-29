import type { Events, Props, Slots } from '@threlte/core';
import { SvelteComponent } from 'svelte';
import { Material } from 'three';

export type AnimatedInstancedSpriteProps = Props<Material> & {
	/** Number of instances */
	count: number;

	/** The URL of the spritesheet texture image. */
	textureUrl: string;

	/** The URL of the spritesheet JSON. */
	// dataUrl?: string

	/** The current playing animation name. */
	// animation?: string

	/**
	 * Controls whether or not to automatically run an animation on load.
	 *
	 * @default true
	 */
	// autoplay?: boolean

	/**
	 * The desired frames per second of the animation
	 *
	 * This will override any frame durations specified in JSON
	 */
	fps?: number;

	/**
	 * The texture filtering applied to the spritesheet.
	 *
	 * @default 'nearest'
	 */
	filter?: 'nearest' | 'linear';

	/**
	 * Sets the alpha value to be used when running an alpha test.
	 *
	 * @see https://threejs.org/docs/#api/en/materials/Material.alphaTest
	 *
	 * @default 0.1
	 */
	// alphaTest?: number

	/**
	 * Delay the start of the animation in ms.
	 *
	 * @default 0
	 */
	// delay?: number

	/**
	 * Whether or not the material should be transparent.
	 *
	 * @default true
	 */
	// transparent?: boolean

	/**
	 * Whether or not the Sprite should flip sides on the x-axis.
	 *
	 * @default false
	 */
	// flipX?: boolean

	/**
	 * The start frame of the current animation.
	 *
	 * @default 0
	 */
	// startFrame?: number

	/**
	 * The end frame of the current animation.
	 *
	 * @default rows * columns - 1
	 */
	endFrame?: number;

	/**
	 * The total number of frames in the spritesheet.
	 */
	totalFrames?: number;

	/**
	 * The number of rows in the spritesheet.
	 *
	 * @default 1
	 */
	rows?: number;

	/**
	 * The number of columns in the spritesheet.
	 *
	 * @default 1
	 */
	columns?: number;

	readonly play?: () => void;
	readonly pause?: () => void;
};

export type AnimatedInstancedSpriteEvents = any;

export type AnimatedInstancedSpriteSlots = any;

export default class AnimatedInstancedSprite extends SvelteComponent<
	AnimatedInstancedSpriteProps,
	AnimatedInstancedSpriteEvents,
	AnimatedInstancedSpriteSlots
> {}
