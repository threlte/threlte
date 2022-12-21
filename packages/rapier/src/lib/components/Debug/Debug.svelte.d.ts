import { SvelteComponentTyped } from 'svelte'
import type { LineBasicMaterialParameters } from 'three'

export type DebugProps = LineBasicMaterialParameters

export default class Debug extends SvelteComponentTyped<DebugProps> {}
