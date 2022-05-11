<script lang="ts">
  import { spring } from 'svelte/motion'
  import { BoxBufferGeometry, Color, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import { Mesh, Group, Text, type Position, type Rotation, type Scale } from 'threlte'

  export let position: Position | undefined = undefined
  export let rotation: Rotation | undefined = undefined
  export let scale: Scale | undefined = undefined
  export let text: string

  const buttonOffsetY = spring(0)
  const buttonMaterial = new MeshStandardMaterial({
    color: 0x222222
  })
</script>

<Group {position} {rotation} {scale}>
  <Mesh
    interactive
    on:click
    on:pointerenter={(e) => {
      buttonMaterial.color = new Color(0x666666)
    }}
    on:pointerleave={(e) => {
      buttonMaterial.color = new Color(0x222222)
      buttonOffsetY.set(0)
    }}
    on:pointerdown={() => {
      buttonOffsetY.set(-0.05)
    }}
    on:pointerup={() => {
      buttonOffsetY.set(0)
    }}
    material={buttonMaterial}
    geometry={new BoxBufferGeometry(1, 0.2, 1)}
    position={{ y: $buttonOffsetY }}
  />
  <Text
    ignorePointer
    color="black"
    {text}
    rotation={{ x: DEG2RAD * -90 }}
    position={{ y: 0.105 + $buttonOffsetY }}
    fontSize={0.2}
    anchorX="50%"
    anchorY="50%"
  />
</Group>
