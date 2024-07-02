
import type { Snippet } from 'svelte'
import { currentWritable, type CurrentWritable } from '@threlte/core'

const portals = currentWritable<Map<string, CurrentWritable<Set<Snippet>>>>(new Map())

export const usePortal = () => {
	const addPortal = (id: string) => {
		portals.update(($portals) => {
			$portals.set(id, currentWritable(new Set()))
			return $portals
		})

		return () => {
			portals.update(($portals) => {
        $portals.delete(id)
				return $portals
			})
		}
	}

	const addChild = (id: string, child: Snippet) => {
		portals.current.get(id)?.update(($children) => {
			$children.add(child)
			return $children
		})

		return () => {
      portals.current.get(id)?.update(($children) => {
				$children.delete(child)
				return $children
			})
		}
	}

	return {
		addChild,
		addPortal,
		portals,
	}
}
