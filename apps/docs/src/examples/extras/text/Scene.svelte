<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Text } from '@threlte/extras'

  interface Props {
    text: string
    fontSize: number
    maxWidth: number
    letterSpacing: number
    lineHeight: number
    textIndent: number
    textAlign: 'left' | 'right' | 'center' | 'justify'
    whiteSpace: 'normal' | 'nowrap' | 'pre-wrap'
    overflowWrap: 'normal' | 'break-word'
    anchorX: 'left' | 'center' | 'right'
    anchorY: 'top' | 'top-baseline' | 'middle' | 'bottom-baseline' | 'bottom'
    curveRadius: number
    color: string
    fillOpacity: number
    outlineWidth: number
    outlineColor: string
    outlineOpacity: number
    outlineBlur: number
    outlineOffsetX: number
    outlineOffsetY: number
    strokeWidth: number
    strokeColor: string
    strokeOpacity: number
  }

  let { ...textProps }: Props = $props()
</script>

<T.OrthographicCamera
  zoom={80}
  position={[0, 5, 10]}
  makeDefault
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<OrbitControls
  autoRotate
  enableDamping
  enableZoom={false}
  autoRotateSpeed={0.3}
/>

<Text
  position.y={0.5}
  {...textProps}
/>

<Grid sectionColor="#FF3E00" />
