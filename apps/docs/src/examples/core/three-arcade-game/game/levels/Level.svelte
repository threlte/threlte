<script lang="ts">
	import { onDestroy } from 'svelte'
	import { get, writable } from 'svelte/store'
	import { arenaBorderWidth, arenaHeight, arenaWidth, blockGap } from '../config'
	import { gameState } from '../state'
	import Block, { type BlockData } from './Block.svelte'
	import { blockColors } from './blockColors'

	type Level = {
		rows: number
		columns: number
	}

	const levels: Level[] = [
		{
			rows: 1,
			columns: 4
		},
		{
			rows: 1,
			columns: 8
		},
		{
			rows: 2,
			columns: 4
		},
		{
			rows: 1,
			columns: 12
		},
		{
			rows: 2,
			columns: 8
		},
		{
			rows: 3,
			columns: 6
		},
		{
			rows: 3,
			columns: 12
		},
		{
			rows: 4,
			columns: 16
		}
	]

	let blocks: BlockData[] = []

	const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	const { state, score, level } = gameState

	let levelStarted = false
	const buildBlocks = async () => {
		const { rows, columns } = levels[get(level) - 1]

		const blockSize =
			(arenaWidth - arenaBorderWidth - ((columns - 1) * blockGap + 2 * blockGap)) / columns
		const startAtX = ((arenaWidth - arenaBorderWidth) / 2) * -1 + blockSize / 2
		const startAtZ = ((arenaHeight - arenaBorderWidth) / 2) * -1 + blockSize / 2 + blockGap

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				blocks.push({
					blockColors: blockColors('blue', 'red'),
					position: {
						x: startAtX + blockGap + j * blockGap + j * blockSize,
						z: startAtZ + i * blockGap + i * blockSize
					},
					hit: writable(false),
					size: blockSize,
					freeze: writable(false)
				})
				blocks = blocks
				await wait(16)
			}
		}
		levelStarted = true
		state.set('playing')
	}

	buildBlocks()

	onDestroy(() => {
		blocks.forEach((block) => {
			block.blockColors.dispose()
		})
	})

	$: if ($state === 'game-over') {
		if (!levelStarted) break $
		blocks.forEach((block) => {
			block.blockColors.blinkInnerColor('red', 'black', 96)
			block.blockColors.queue(() => {
				block.blockColors.setInnerColor('red')
			}, 1e3)
			block.freeze.set(true)
		})
	} else if ($state === 'level-complete') {
		if (!levelStarted) break $
		blocks.forEach((block) => {
			block.blockColors.blinkInnerColor('green', 'black', 96)
			block.blockColors.queue(() => {
				block.blockColors.setOuterColor('white')
				block.blockColors.setInnerColor('green')
			}, 1e3)
			block.freeze.set(true)
		})
	}

	const onHit = (block: BlockData) => {
		if ($state === 'game-over' || $state === 'level-complete') return
		score.update((score) => score + 1)
		block.hit.set(true)
		block.blockColors.setInnerColor('yellow')
		if (blocks.every((block) => get(block.hit))) {
			state.set('level-complete')
		}
	}
</script>

{#each blocks as block, index (index)}
	<Block {...block} on:hit={() => onHit(block)} />
{/each}
