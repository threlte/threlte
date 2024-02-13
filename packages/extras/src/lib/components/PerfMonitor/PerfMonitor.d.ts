import { SvelteComponent } from 'svelte'

export type PerfMonitorProps = {
  /**
   * Dom element to which stats block will be attached to.
   * @default `document.body`
   */
  domElement?: HTMLElement
  /**
   * Refresh rate of the logs
   * @default 10
   */
  logsPerSecond?: number
  /**
   * Toggles cpu/gpu/fps graphs rendering
   * @default true
   */
  showGraph?: boolean
  /**
   * Toggles memory info visiblity (geometries, textures, shaders)
   * @default true
   */
  memory?: boolean // toggles memory info visiblity [like geos / textures / shaders etc count]
  /**
   * Toggles stats collection.
   * @default true
   */
  enabled?: boolean // toggles stats harvesting
  /**
   * Toggles visibility of the monitor html element. Setting `false` does not stop collection of the stats.
   * @default true
   */
  visible?: boolean // stats are harvested, but stats panel is hidden
  /**
   * If set and given characters are typed in the the tab window, the three-perf dev gui will be shown. Disabled by default (empty string).
   * @default ""
   */
  actionToCallUI?: string // by default is disabled [''], but if set and type this text in the tab window three-perf dev gui will be shown
  /**
   * Toggles Three-perf dev gui visiblity.
   * @default false
   */
  guiVisible?: boolean // default three-perf dev gui visiblity [falde by default]
  /**
   * Stats block background opacity level.
   * @default 0.7
   */
  backgroundOpacity?: number // stats block background opacity level [0.7 by default]
  /**
   * Scale of the stats block html element.
   * @default 1
   */
  scale?: 1 // stats block scale [default 1]
  /**
   * Stats html element horizontal anchor.
   * @default "left"
   */
  anchorX?: 'left' | 'right' // default is left [stats container horrisontal anchor]
  /**
   * Stats html element vertical anchor.
   * @default "top"
   */
  anchorY?: 'top' | 'bottom' // default is top [stats container vertical anchor]
}

export default class PerfMonitor extends SvelteComponent<PerfMonitorProps> {}
