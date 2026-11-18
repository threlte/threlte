export interface PerfMonitorProps {
  /**
   * The element the stats panel is appended to.
   * @default document.body
   */
  domElement?: HTMLElement
  /**
   * How many times per second the stats are refreshed.
   * @default 10
   */
  logsPerSecond?: number
  /**
   * Shows the CPU, GPU and FPS graphs.
   * @default true
   */
  showGraph?: boolean
  /**
   * Shows memory info: the number of geometries, textures and shaders.
   * @default true
   */
  memory?: boolean
  /**
   * Collects stats. When `false`, nothing is measured.
   * @default true
   */
  enabled?: boolean
  /**
   * Shows the stats panel. Hiding it doesn't stop stats from being collected.
   * @default true
   */
  visible?: boolean
  /**
   * Typing these characters in the page opens the three-perf dev GUI. An
   * empty string disables it.
   * @default ''
   */
  actionToCallUI?: string
  /**
   * Shows the three-perf dev GUI.
   * @default false
   */
  guiVisible?: boolean
  /**
   * The background opacity of the stats panel.
   * @default 0.7
   */
  backgroundOpacity?: number
  /**
   * Scales the stats panel.
   * @default 1
   */
  scale?: number
  /**
   * The horizontal side of the page the stats panel is anchored to.
   * @default 'left'
   */
  anchorX?: 'left' | 'right'
  /**
   * The vertical side of the page the stats panel is anchored to.
   * @default 'top'
   */
  anchorY?: 'top' | 'bottom'
}
