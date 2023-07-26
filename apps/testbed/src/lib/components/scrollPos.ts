import { currentWritable } from '@threlte/core'
import { spring } from 'svelte/motion'
import { derived } from 'svelte/store'

export const scrollPos = currentWritable(0)

/**
 * do not use, may be negative!
 */
export const _springScrollPos = spring(0, {
	precision: 0.0000001
})

export const springScrollPos = derived(_springScrollPos, (_springScrollPos) =>
	Math.max(0, _springScrollPos)
)
