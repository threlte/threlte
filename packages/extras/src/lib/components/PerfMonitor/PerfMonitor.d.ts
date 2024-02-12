import { SvelteComponent } from 'svelte'

export type PerfMonitorProps = {
  logsPerSecond?: number // Refresh rate of the logs [default 10]
  showGraph?: boolean // toggles cpu/gpu/fps graphs rendering
  memory?: boolean // toggles memory info visiblity [like geos / textures / shaders etc count]
  enabled?: boolean // toggles stats harvesting
  visible?: boolean // stats are harvested, but stats panel is hidden
  actionToCallUI?: string // by default is disabled [''], but if set and type this text in the tab window three-perf dev gui will be shown
  guiVisible?: boolean // default three-perf dev gui visiblity [falde by default]
  backgroundOpacity?: number // stats block background opacity level [0.7 by default]
  scale?: 1 // stats block scale [default 1]
  anchorX?: 'left' | 'right' // default is left [stats container horrisontal anchor]
  anchorY?: 'top' | 'bottom' // default is top [stats container vertical anchor]
}

export default class PerfMonitor extends SvelteComponent<PerfMonitorProps> {}
