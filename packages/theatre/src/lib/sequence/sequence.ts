import { onChange, val, type ISequence, type ISheet } from '@theatre/core';

import type { Writable, Readable, Subscriber } from 'svelte/store'

import type {
	SequenceOptions
} from './types'

// state machine

export class Sequence {
	// api
	key: string
	sequence: ISequence
	// stores
	position: SequencePosition
	playing: SequencePlaying
	length: SequenceLength
	// config
	options: SequenceOptions
	// utils
	timer: ReturnType<typeof setTimeout> | undefined

	constructor(
		sequence: ISequence,
		options: SequenceOptions = {
			autoplay: false,
			autoreset: undefined,
			autopause: false,
			delay: 0
		}
	) {
		// api
		this.key = options?.key ?? 'default' // not in use - for future proofing 
		this.sequence = sequence // theatre native object
		this.options = options // to be set via config method
		// stores
		this.position = new SequencePosition(sequence, () => this.play())
		this.playing = new SequencePlaying(sequence, () => this.play())
		this.length = new SequenceLength(sequence)
	}
	config(options: SequenceOptions) {
		// update options
		const updatedOptions: SequenceOptions = { ...this.options, ...options }

		// ensure no unnecessary updates happen
		const noChange = Object.keys(updatedOptions)
			.every((key: keyof SequenceOptions) => this.options[key] == updatedOptions[key]) // TODO: fix type of key
		if (noChange) {
			return
		} else {
			this.options = updatedOptions;
		}

		// update audio options
		if (options.audio) this.sequence.attachAudio(options.audio)

		// update autoplay logic
		if (!options.autoplay && options.delay! > 0) {
			console.warn(
				'Sequence: delay has no effect unless the option autoplay is enabled.',
				{ sequence: this.sequence }
			)
		}
		if (options.autoplay) {
			this.timer = setTimeout(
				() => this.play(),
				this.options.delay
			)
		}
		if (this.options.autoreset === 'onMount' || this.options.autoreset === 'always') {
			this.position.set(0)
		}	// TODO - check if this needs to be moved

		// trigger update for options passed to play
		const replay =
			options.rate
			|| options.range
			|| options.iterationCount
			|| options.direction
			|| options.rafDriver;
		if (replay) {
			this.pause()
			this.play()
		}
	}
	play(opts: Parameters<ISequence['play']>[0] = {}) {
		return this.sequence.play({ ...this.options, ...opts })
	}
	pause() {
		return this.sequence.pause()
	}
	reset() {
		this.position.set(0)
	}
	api() {
		return {
			position: this.position,
			playing: this.playing,
			length: this.length,
			play: (opts?: SequenceOptions) => this.play(opts),
			pause: () => this.pause(),
			config: (opts: SequenceOptions) => this.config(opts)
		}
	}
	destroy() {
		if (this.timer) clearTimeout(this.timer)
		if (this.options.autopause) this.pause()
		if (this.options.autoreset === 'onDestroy' || this.options.autoreset === 'always') this.reset()
	}
}

// stores

export class SequencePosition implements Writable<number> {
	sequence: ISequence;
	play: () => void;
	subscribers: Set<Subscriber<number>>;
	unsubscribe: ReturnType<typeof onChange>;

	constructor(sequence: ISequence, play: () => void) {
		this.sequence = sequence;
		this.play = play;
		this.subscribers = new Set<Subscriber<number>>();
		this.unsubscribe = onChange(this.sequence.pointer.position, (position) => {
			this.subscribers.forEach(
				(subscription) => subscription(position)
			);
		});
	}
	subscribe(subscription: Subscriber<number>) {
		this.subscribers.add(subscription);
		subscription(this.sequence.position);
		return () => {
			this.subscribers.delete(subscription);
			// TODO: run this.unsubscribe after the last delete?
		};
	}
	update(callback: (prev: number) => number) {
		this.set(callback(this.sequence.position));
	}
	set(value: number) {
		const isPlaying = val(this.sequence.pointer.playing);
		this.sequence.position = value;
		if (isPlaying) this.play();
	}
}

export class SequencePlaying implements Writable<boolean> {
	sequence: ISequence;
	play: () => void;
	subscribers: Set<Subscriber<boolean>>;

	constructor(sequence: ISequence, play: () => void) {
		this.sequence = sequence;
		this.play = play;
		// subs
		this.subscribers = new Set<Subscriber<boolean>>;
		onChange(this.sequence.pointer.playing, (playing) => {
			this.subscribers.forEach(
				(subscription) => subscription(playing)
			);
		});
	}
	subscribe(subscription: Subscriber<boolean>) {
		this.subscribers.add(subscription);
		subscription(val(this.sequence.pointer.playing));
		return () => {
			this.subscribers.delete(subscription);
		};
	}
	update(callback: (prev: boolean) => boolean) {
		const isPlaying = val(this.sequence.pointer.playing);
		const shouldBePlaying = callback(isPlaying);
		if (isPlaying && !shouldBePlaying) this.sequence.pause();
		if (!isPlaying && shouldBePlaying) this.play();
	}
	set(value: boolean) {
		const isPlaying = val(this.sequence.pointer.playing);
		const shouldBePlaying = value;
		if (isPlaying && !shouldBePlaying) this.sequence.pause();
		if (!isPlaying && shouldBePlaying) this.play();
	}
}

export class SequenceLength implements Readable<number> {
	sequence: ISequence;
	subscribers: Set<Subscriber<number>>;
	unsubscribe: ReturnType<typeof onChange>;

	constructor(sequence: ISequence) {
		this.sequence = sequence;
		this.subscribers = new Set<Subscriber<number>>();
		this.unsubscribe = onChange(this.sequence.pointer.length, (length) => {
			this.subscribers.forEach((run) => run(length));
		});
	}
	subscribe(subscription: Subscriber<number>) {
		this.subscribers.add(subscription);
		subscription(val(this.sequence.pointer.length));
		return () => {
			this.subscribers.delete(subscription);
		};
	}
}

