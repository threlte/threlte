<!--
Debug visualization for the touchControls example. Draws a wireframe hover
sphere and a smaller down sphere around each hand's tracked joint, so you
can see exactly when each threshold is crossed while tuning radii.
-->
<script lang="ts">
  import { Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three'
  import { T, useTask } from '@threlte/core'
  import { useHand, type HandJoints } from '@threlte/xr'

  interface Props {
    joint?: HandJoints
    hoverRadius?: number
    downRadius?: number
  }

  const {
    joint = 'index-finger-tip',
    hoverRadius = 0.03,
    downRadius = 0.01
  }: Props = $props()

  const leftHand = useHand('left')
  const rightHand = useHand('right')

  const sphereGeometry = new SphereGeometry(1, 16, 12)
  const hoverMat = new MeshBasicMaterial({
    color: '#facc15',
    wireframe: true,
    transparent: true,
    opacity: 0.3
  })
  const downMat = new MeshBasicMaterial({
    color: '#ef4444',
    wireframe: true,
    transparent: true,
    opacity: 0.5
  })

  const makeSphere = (material: MeshBasicMaterial) => {
    const mesh = new Mesh(sphereGeometry, material)
    mesh.matrixAutoUpdate = false
    mesh.visible = false
    return mesh
  }

  const leftHover = makeSphere(hoverMat)
  const leftDown = makeSphere(downMat)
  const rightHover = makeSphere(hoverMat)
  const rightDown = makeSphere(downMat)

  const origin = new Vector3()

  const update = (
    hand: ReturnType<typeof useHand>,
    hoverMesh: Mesh,
    downMesh: Mesh
  ) => {
    const space = hand.current?.hand.joints[joint]
    if (space === undefined || space.jointRadius === undefined) {
      hoverMesh.visible = false
      downMesh.visible = false
      return
    }
    space.updateWorldMatrix(true, false)
    origin.setFromMatrixPosition(space.matrixWorld)

    hoverMesh.position.copy(origin)
    hoverMesh.scale.setScalar(hoverRadius)
    hoverMesh.updateMatrix()
    hoverMesh.visible = true

    downMesh.position.copy(origin)
    downMesh.scale.setScalar(downRadius)
    downMesh.updateMatrix()
    downMesh.visible = true
  }

  useTask(() => {
    update(leftHand, leftHover, leftDown)
    update(rightHand, rightHover, rightDown)
  })
</script>

<T is={leftHover} />
<T is={leftDown} />
<T is={rightHover} />
<T is={rightDown} />
