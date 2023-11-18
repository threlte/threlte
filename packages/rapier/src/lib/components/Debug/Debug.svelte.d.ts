import { SvelteComponent } from 'svelte'
import type { LineBasicMaterialParameters } from 'three'

export type DebugProps = {
  renderOrder?: number
} & LineBasicMaterialParameters

export default class Debug extends SvelteComponent<DebugProps> {}
