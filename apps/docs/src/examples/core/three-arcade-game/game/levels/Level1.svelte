<script lang="ts">
	import { arenaWidth, blockGap, arenaBorderWidth, arenaHeight } from '../config'
	import { gameState } from '../state'
	import Block from './Block.svelte'

	const rows = 3
	const columns = 12

	const blockSize =
		(arenaWidth - arenaBorderWidth - ((columns - 1) * blockGap + 2 * blockGap)) / columns

	type Block = {
		position: {
			x: number
			z: number
		}
		hit: boolean
		size: number
		entered: boolean
	}

	let blocks: Block[] = []

	const startAtX = ((arenaWidth - arenaBorderWidth) / 2) * -1 + blockSize / 2
	const startAtZ = ((arenaHeight - arenaBorderWidth) / 2) * -1 + blockSize / 2 + blockGap

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			blocks.push({
				position: {
					x: startAtX + blockGap + j * blockGap + j * blockSize,
					z: startAtZ + i * blockGap + i * blockSize
				},
				hit: false,
				size: blockSize,
				entered: false
			})
		}
	}

	const { state, score } = gameState

	const onHit = (block: Block) => {
		score.update((score) => score + 1)
		block.hit = true
		blocks = blocks
		if (blocks.every((block) => block.hit)) {
			state.set('level-complete')
		}
	}

	const onEntered = (block: Block) => {
		block.entered = true
		blocks = blocks
		if (blocks.every((block) => block.entered)) {
			state.set('playing')
		}
	}
</script>

{#each blocks as block, index (index)}
	<Block
		{...block}
		freeze={$state === 'game-over' || $state === 'level-complete'}
		on:hit={() => onHit(block)}
		on:entered={() => onEntered(block)}
		{index}
	/>
{/each}
