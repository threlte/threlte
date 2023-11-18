import { SvelteComponent } from 'svelte'
import type { LineBasicMaterialParameters } from 'three'

export type DebugProps = LineBasicMaterialParameters

export default class Debug extends SvelteComponent<DebugProps> {}
