export type PerfMonitorProps = {
  /*
   * Add info pane about draw calls, triangles, etc.
   *
   * @default false
   */
  extraInfo?: boolean
  /*
   * A boolean value to enable or disable GPU tracking.
   *
   * @default false
   */
  trackGPU?: boolean
  /*
   * (Threejs specific) A boolean value to enable or disable Threejs Compute Shading tracking.
   *
   * @default false
   */
  trackCPT?: boolean
  /*
   * A boolean value to enable or disable Hz tracking.
   *
   * @default false
   */
  trackHz?: boolean
  /*
   * How often to log performance data, in logs per second.
   *
   * @default 20
   */
  logsPerSecond?: number

  /*
   * Number of recent log samples to keep for computing averages.
   *
   * @default 100
   */
  samplesLog?: number

  /*
   * Number of recent graph samples to keep for computing averages.
   *
   * @default 10
   */
  samplesGraph?: number

  /*
   * Precision of the data, in number of decimal places (only affects CPU and GPU).
   *
   * @default 2
   */
  precision?: number

  /*
   * Display the canvases on the X axis, set to align on vertical axis.
   *
   * @default true
   * @type {boolean}
   */
  horizontal?: boolean

  /*
   * A boolean value to control the minimalistic mode of the panel display. If set to true, a simple click on the panel will switch between different metrics.
   *
   * @default false
   * @type {boolean}
   */
  minimal?: boolean

  /*
   * Sets the initial panel to display - 0 for FPS, 1 for CPU, and 2 for GPU (if supported).
   *
   * @default 0
   */
  mode?: number
}
