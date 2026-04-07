<script lang="ts">
  import { T } from '@threlte/core'
  import { Edges, Text, useCursor } from '@threlte/extras'
  import { Spring } from 'svelte/motion'
  import { MathUtils } from 'three'
  import type { ButtonProps } from './types'

  let { text, onClick, ...rest }: ButtonProps = $props()

  const buttonOffsetY = new Spring(0)

  let buttonColor = $state('#111111')
  let textColor = $state('#eedbcb')

  const { onPointerEnter, onPointerLeave } = useCursor()
</script>

<T.Group {...rest}>
  <T.Group position.y={0.05 - buttonOffsetY.current}>
    <T.Mesh
      onclick={onClick}
      onpointerenter={(e) => {
        e.stopPropagation()
        buttonColor = '#eedbcb'
        textColor = '#111111'
        onPointerEnter()
      }}
      onpointerleave={(e) => {
        e.stopPropagation()
        buttonColor = '#111111'
        textColor = '#eedbcb'
        buttonOffsetY.set(0)
        onPointerLeave()
      }}
      onpointerdown={(e) => {
        e.stopPropagation()
        buttonOffsetY.set(0.05)
      }}
      onpointerup={(e) => {
        e.stopPropagation()
        buttonOffsetY.set(0)
      }}
    >
      <T.BoxGeometry args={[1.2, 0.1, 0.8]} />
      <T.MeshStandardMaterial color={buttonColor} />

      <Edges
        color="black"
        raycast={() => {
          return false
        }}
      />
    </T.Mesh>
    <Text
      renderOrder={-100}
      ignorePointer
      color={textColor}
      {text}
      rotation.x={MathUtils.DEG2RAD * -90}
      position.y={0.055}
      fontSize={0.35}
      anchorX="50%"
      anchorY="50%"
    />
  </T.Group>
</T.Group>
