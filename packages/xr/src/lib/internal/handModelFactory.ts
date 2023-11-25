import { Object3D, type XRHandSpace, type Texture, type Event } from 'three'
import { XRHandPrimitiveModel } from 'three/examples/jsm/webxr/XRHandPrimitiveModel'
import { XRHandMeshModel } from 'three/examples/jsm/webxr/XRHandMeshModel'

class XRHandModel extends Object3D {
  motionController: null | XRHandPrimitiveModel | XRHandMeshModel = null
  envMap: null | Texture = null
  controller: XRHandSpace
  xrInputSource

  constructor(controller: XRHandSpace) {
    super()
    this.controller = controller
  }

  override updateMatrixWorld(force: boolean) {
    super.updateMatrixWorld(force)
    this.motionController?.updateMesh()
  }
}

export const createHandModel = (controller: XRHandSpace, event: Event) => {
  const model = new XRHandModel(controller)
  const xrInputSource = event.data

  if (xrInputSource.hand && !model.motionController) {
    model.xrInputSource = xrInputSource
    model.motionController = new XRHandMeshModel(
      model,
      controller,
      '',
      xrInputSource.handedness
    )
  }

  return model
}
