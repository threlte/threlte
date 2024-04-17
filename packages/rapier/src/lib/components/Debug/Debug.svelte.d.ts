import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { LineSegments } from 'three'

export type DebugProps = Props<LineSegments>

export default class Debug extends SvelteComponent<DebugProps> {}
