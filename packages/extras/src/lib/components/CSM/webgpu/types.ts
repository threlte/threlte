import type { CSMShadowNode } from 'three/examples/jsm/csm/CSMShadowNode.js'
import type { CSMBaseProps } from '../types.js'

export interface CSMWebGPUProps extends CSMBaseProps {
  /**
   * The underlying three.js shadow node, bindable for advanced use such as
   * visualizing the cascades with a `CSMHelper`.
   */
  csm?: CSMShadowNode
}
