import { Mesh, Material, MeshBasicMaterial, Object3D, SphereGeometry, type Texture } from 'three'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Constants, fetchProfile, MotionController } from 'three/examples/jsm/libs/motion-controllers.module'
import type { XRControllerEvent } from '$lib/types'

const DEFAULT_PROFILES_PATH =
  'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles'
const DEFAULT_PROFILE = 'generic-trigger'

const gltfLoader = new GLTFLoader()
const path = DEFAULT_PROFILES_PATH
const assetCache: Record<string, GLTF> = {}

class XRControllerModel extends Object3D {
  motionController: MotionController | null = null
  envMap: Texture | null = null

  setEnvironmentMap(envMap: Texture | null) {
    if (this.envMap === envMap) {
      return this
    }

    this.envMap = envMap
    this.traverse((child) => {
      if ('material' in child && child.material instanceof Material) {
        child.material.envMap = this.envMap
        child.material.needsUpdate = true
      }
    })

    return this
  }

  /**
   * Polls data from the XRInputSource and updates the model's components to match
   * the real world data
   */
  override updateMatrixWorld(force: boolean) {
    super.updateMatrixWorld(force)

    if (!this.motionController) return

    // poll the Gamepad for data
    this.motionController.updateFromGamepad()

    // Update the 3D model to reflect the button, thumbstick, and touchpad state
    Object.values(this.motionController.components).forEach((component) => {
      // Update node data based on the visual responses' current states
      Object.values(component.visualResponses).forEach((visualResponse) => {
        const { valueNode, minNode, maxNode, value, valueNodeProperty } = visualResponse

        // Skip if the visual response node is not found. No error is needed,
        // because it will have been reported at load time.
        if (!valueNode) return

        // Calculate the new properties based on the weight supplied
        if (valueNodeProperty === Constants.VisualResponseProperty.VISIBILITY) {
          valueNode.visible = value
        } else if (
          valueNodeProperty === Constants.VisualResponseProperty.TRANSFORM
        ) {
          valueNode.quaternion.slerpQuaternions(minNode.quaternion, maxNode.quaternion, value)
          valueNode.position.lerpVectors(minNode.position, maxNode.position, value)
        }
      })
    })
  }
}

/**
 * Walks the model's tree to find the nodes needed to animate the components and
 * saves them to the motionContoller components for use in the frame loop. When
 * touchpads are found, attaches a touch dot to them.
 */
function findNodes(motionController: MotionController, scene: Object3D) {
  // Loop through the components and find the nodes needed for each components' visual responses
  Object.values(motionController.components).forEach((component) => {
    const { type, touchPointNodeName, visualResponses } = component

    if (type === Constants.ComponentType.TOUCHPAD) {
      component.touchPointNode = scene.getObjectByName(touchPointNodeName)
      if (component.touchPointNode) {
        // Attach a touch dot to the touchpad.
        const sphereGeometry = new SphereGeometry(0.001)
        const material = new MeshBasicMaterial({ color: 0x0000ff })
        const sphere = new Mesh(sphereGeometry, material)
        component.touchPointNode.add(sphere)
      }
    }

    // Loop through all the visual responses to be applied to this component
    Object.values(visualResponses).forEach((visualResponse) => {
      const { valueNodeName, minNodeName, maxNodeName, valueNodeProperty } = visualResponse

      // If animating a transform, find the two nodes to be interpolated between.
      if (valueNodeProperty === Constants.VisualResponseProperty.TRANSFORM) {
        visualResponse.minNode = scene.getObjectByName(minNodeName)
        visualResponse.maxNode = scene.getObjectByName(maxNodeName)
      }

      // If the target node cannot be found, skip this animation
      visualResponse.valueNode = scene.getObjectByName(valueNodeName)
    })
  })
}

function addAssetSceneToControllerModel(controllerModel: XRControllerModel, scene: Object3D) {
  // Find the nodes needed for animation and cache them on the motionController.
  findNodes(controllerModel.motionController, scene)

  // Apply any environment map that the mesh already has set.
  if (controllerModel.envMap) {
    scene.traverse((child) => {
      if ('material' in child && child.material instanceof Material) {
        child.material.envMap = controllerModel.envMap
        child.material.needsUpdate = true
      }
    })
  }

  // Add the glTF scene to the controllerModel.
  controllerModel.add(scene)
}

export const createControllerModel = async (event: XRControllerEvent<'connected'>) => {
  const model = new XRControllerModel()
  let scene: Object3D | null = null

  const xrInputSource = event.data

  const { profile, assetPath } = await fetchProfile(xrInputSource, path, DEFAULT_PROFILE)
  model.motionController = new MotionController(xrInputSource, profile, assetPath)

  const cachedAsset = assetCache[model.motionController.assetUrl]
  
  if (cachedAsset) {
    scene = cachedAsset.scene.clone()

    addAssetSceneToControllerModel(model, scene)
  } else {
    const asset = await gltfLoader.loadAsync(model.motionController.assetUrl)

    assetCache[model.motionController.assetUrl] = asset

    scene = asset.scene.clone()

    addAssetSceneToControllerModel(model, scene)
  }

  return model
}
