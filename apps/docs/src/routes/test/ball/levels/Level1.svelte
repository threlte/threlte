<script lang="ts">
	import { arenaWidth, blockGap, arenaBorderWidth, arenaHeight } from '../config'
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
				size: blockSize
			})
		}
	}
</script>

{#each blocks as block, index (index)}
	<!-- {#if !block.hit} -->
	<Block {...block} on:hit={() => (block.hit = true)} {index} />
	<!-- {/if} -->
{/each}
