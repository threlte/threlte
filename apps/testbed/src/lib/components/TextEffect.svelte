<script lang="ts">
	import anime from 'animejs'
	import { scrollPos, springScrollPos } from './scrollPos'
	import { clamp, mapLinear } from 'three/src/math/MathUtils'

	export let id: string
	let _in: {
		start: number
		end: number
	}
	let _out: {
		start: number
		end: number
	}
	export let useSpring = true

	export { _in as in, _out as out }

	let timeline: anime.AnimeTimelineInstance | undefined

	let completeDuration = 0

	const initializeTimeline = () => {
		timeline = anime.timeline({ autoplay: false })

		// get all letter elements
		completeDuration = 1000 + 150 * document.querySelectorAll(`#${id} .letter`).length

		timeline.add({
			targets: `#${id} .letter`,
			translateX: [20, 0],
			opacity: [0, 1],
			easing: 'easeOutCubic',
			duration: 1000,
			delay: (el, i) => 150 * (i + 1)
		})

		timeline = timeline
	}

	const transform = (node: HTMLDivElement) => {
		const originalInnerHTML = node.innerHTML
		node.innerHTML =
			node.textContent?.replace(
				/\S/g,
				"<span class='letter' style='display: inline-block'>$&</span>"
			) ?? ''
		initializeTimeline()
		return {
			destroy() {
				timeline?.pause()
				timeline = undefined
				node.innerHTML = originalInnerHTML
			}
		}
	}

	$: progress = clamp(
		mapLinear(useSpring ? $springScrollPos : $scrollPos, _in.start, _in.end, 0, completeDuration),
		0,
		completeDuration
	)

	$: if (timeline) timeline.seek(progress)

	$: opacity = clamp(
		mapLinear(useSpring ? $springScrollPos : $scrollPos, _out.start, _out.end, 1, 0),
		0,
		1
	)
</script>

<div {id} use:transform style="opacity: {opacity}">
	<slot />
</div>
