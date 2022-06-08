<script lang="ts">
  import { spring } from 'svelte/motion'
  import { BoxBufferGeometry, Color, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import { Group, Mesh, Text, type Position, type Rotation, type Scale } from 'threlte'
  import { useCursor } from 'threlte/extras'
  import Edges from 'threlte/extras/components/abstractions/Edges.svelte'

  export let position: Position | undefined = undefined
  export let rotation: Rotation | undefined = undefined
  export let scale: Scale | undefined = undefined
  export let text: string

  const buttonOffsetY = spring(0)
  const buttonMaterial = new MeshStandardMaterial({
    color: 0x111111
  })

  let textColor = '#eedbcb'

  const { onPointerEnter, onPointerLeave } = useCursor()
</script>

<Group {position} {rotation} {scale}>
  <Group position={{ y: 0.05 - $buttonOffsetY }}>
    <Mesh
      interactive
      on:click
      on:pointerenter={(e) => {
        buttonMaterial.color = new Color(0xeedbcb)
        textColor = '#111111'
        onPointerEnter()
      }}
      on:pointerleave={(e) => {
        buttonMaterial.color = new Color(0x111111)
        textColor = '#eedbcb'
        buttonOffsetY.set(0)
        onPointerLeave()
      }}
      on:pointerdown={() => {
        buttonOffsetY.set(0.05)
      }}
      on:pointerup={() => {
        buttonOffsetY.set(0)
      }}
      material={buttonMaterial}
      geometry={new BoxBufferGeometry(1.2, 0.1, 0.8)}
    >
      <Edges color="black" ignorePointer />
    </Mesh>
    <Text
      ignorePointer
      color={textColor}
      {text}
      rotation={{ x: DEG2RAD * -90 }}
      position={{ y: 0.055 }}
      fontSize={0.35}
      anchorX="50%"
      anchorY="50%"
    />
  </Group>
</Group>
