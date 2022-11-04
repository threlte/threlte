<script lang="ts">
	import { get, writable } from 'svelte/store'
	import { arenaBorderWidth, arenaHeight, arenaWidth, blockGap } from '../config'
	import { useTimeout } from '../hooks/useTimeout'
	import { levels } from '../levels'
	import { gameState } from '../state'
	import Block, { type BlockData } from './Block.svelte'

	let blocks: BlockData[] = []

	const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	const { state, score, levelIndex } = gameState

	let levelStarted = false
	const buildBlocks = async () => {
		const { rows, columns } = levels[get(levelIndex)]

		const blockSize =
			(arenaWidth - arenaBorderWidth - ((columns - 1) * blockGap + 2 * blockGap)) / columns
		const startAtX = ((arenaWidth - arenaBorderWidth) / 2) * -1 + blockSize / 2
		const startAtZ = ((arenaHeight - arenaBorderWidth) / 2) * -1 + blockSize / 2 + blockGap

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				blocks.push({
					position: {
						x: startAtX + blockGap + j * blockGap + j * blockSize,
						z: startAtZ + i * blockGap + i * blockSize
					},
					hit: writable(false),
					size: blockSize,
					freeze: writable(false),
					staticColors: writable({
						inner: 'blue',
						outer: 'red'
					}),
					blinkingColors: writable(undefined)
				})
				blocks = blocks
				await wait(16)
			}
		}
		levelStarted = true
		state.set('await-ball-spawn')
	}

	const { timeout } = useTimeout()

	buildBlocks()

	$: if ($state === 'game-over') {
		if (!levelStarted) break $
		blocks.forEach((block) => {
			block.freeze.set(true)
			if (!get(block.hit)) {
				block.blinkingColors.set({
					innerA: 'red',
					innerB: 'black',
					outerA: 'red',
					outerB: 'red'
				})
			} else {
				block.blinkingColors.set(undefined)
				block.staticColors.set({
					inner: 'black',
					outer: 'red'
				})
			}
		})
		timeout(() => {
			blocks.forEach((block) => {
				block.blinkingColors.set(undefined)
				if (!get(block.hit)) {
					block.staticColors.set({
						inner: 'red',
						outer: 'red'
					})
				} else {
					block.staticColors.set({
						inner: 'black',
						outer: 'red'
					})
				}
			})
		}, 1e3)
	} else if ($state === 'level-complete') {
		if (!levelStarted) break $
		blocks.forEach((block) => {
			block.freeze.set(true)
			block.blinkingColors.set({
				innerA: 'green',
				innerB: 'black',
				outerA: 'white',
				outerB: 'white'
			})
		})
		timeout(() => {
			blocks.forEach((block) => {
				block.staticColors.set({
					inner: 'green',
					outer: 'white'
				})
				block.blinkingColors.set(undefined)
			})
		}, 1e3)
	}

	const onHit = (block: BlockData) => {
		if ($state === 'game-over' || $state === 'level-complete') return
		score.update((score) => score + 1)
		block.hit.set(true)
		block.blinkingColors.set(undefined)
		block.staticColors.set({
			inner: 'yellow',
			outer: 'red'
		})
		if (blocks.every((block) => get(block.hit))) {
			state.set('level-complete')
		}
	}
</script>

{#each blocks as block, index (index)}
	<Block {...block} on:hit={() => onHit(block)} />
{/each}
