import { writable, type Writable } from 'svelte/store'

export type BlockColors = {
	queue: (callback: () => void, ms: number) => void
	innerColor: Writable<string>
	outerColor: Writable<string>
	setColors: (innerColor: string, outerColor: string) => void
	setInnerColor: (innerColor: string) => void
	setOuterColor: (outerColor: string) => void
	blinkColors: (
		innerColorA: string,
		innerColorB: string,
		outerColorA: string,
		outerColorB: string,
		duration: number
	) => void
	blinkInnerColor: (innerColorA: string, innerColorB: string, duration: number) => void
	blinkOuterColor: (outerColorA: string, outerColorB: string, duration: number) => void
	dispose: () => void
}

export const blockColors = (innerColor: string, outerColor: string): BlockColors => {
	let queueHandler: ReturnType<typeof setTimeout> | undefined = undefined
	let innerColorIntervalHandler: ReturnType<typeof setInterval> | undefined = undefined
	let outerColorIntervalHandler: ReturnType<typeof setInterval> | undefined = undefined

	const innerColorStore = writable(innerColor)
	const outerColorStore = writable(outerColor)

	const queue = (callback: () => void, ms: number) => {
		if (queueHandler) {
			clearTimeout(queueHandler)
		}
		queueHandler = setTimeout(() => {
			callback()
		}, ms)
	}

	const setColors = (innerColor: string, outerColor: string) => {
		stopBlinking()
		innerColorStore.set(innerColor)
		outerColorStore.set(outerColor)
	}

	const setInnerColor = (innerColor: string) => {
		stopInnerBlinking()
		innerColorStore.set(innerColor)
	}

	const setOuterColor = (outerColor: string) => {
		stopOuterBlinking()
		outerColorStore.set(outerColor)
	}

	const blinkInnerColor = (innerColorA: string, innerColorB: string, duration: number) => {
		stopInnerBlinking()
		innerColorStore.update((color) => (color === innerColorA ? innerColorB : innerColorA))
		innerColorIntervalHandler = setInterval(() => {
			innerColorStore.update((color) => (color === innerColorA ? innerColorB : innerColorA))
		}, duration)
	}

	const blinkOuterColor = (outerColorA: string, outerColorB: string, duration: number) => {
		stopOuterBlinking()
		outerColorStore.update((color) => (color === outerColorA ? outerColorB : outerColorA))
		outerColorIntervalHandler = setInterval(() => {
			outerColorStore.update((color) => (color === outerColorA ? outerColorB : outerColorA))
		}, duration)
	}

	const blinkColors = (
		innerColorA: string,
		innerColorB: string,
		outerColorA: string,
		outerColorB: string,
		duration: number
	) => {
		stopBlinking()
		innerColorStore.update((color) => (color === innerColorA ? innerColorB : innerColorA))
		outerColorStore.update((color) => (color === outerColorA ? outerColorB : outerColorA))
		innerColorIntervalHandler = setInterval(() => {
			innerColorStore.update((color) => (color === innerColorA ? innerColorB : innerColorA))
			outerColorStore.update((color) => (color === outerColorA ? outerColorB : outerColorA))
		}, duration)
	}

	const stopInnerBlinking = () => {
		if (innerColorIntervalHandler) {
			clearInterval(innerColorIntervalHandler)
		}
	}

	const stopOuterBlinking = () => {
		if (outerColorIntervalHandler) {
			clearInterval(outerColorIntervalHandler)
		}
	}

	const stopBlinking = () => {
		stopInnerBlinking()
		stopOuterBlinking()
	}

	const dispose = () => {
		stopBlinking()
		innerColorStore.set(innerColor)
		outerColorStore.set(outerColor)
	}

	return {
		queue,
		innerColor: innerColorStore,
		outerColor: outerColorStore,
		setColors,
		setInnerColor,
		setOuterColor,
		blinkColors,
		blinkInnerColor,
		blinkOuterColor,
		dispose
	}
}
