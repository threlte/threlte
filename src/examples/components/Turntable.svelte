<script lang="ts">
  import {
    useFrame,
    type Position,
    type Rotation,
    type Scale,
    PositionalAudio,
    useAudio,
    useAudioListener,
    Group,
    Mesh,
    Text
  } from 'threlte'
  import { spring, tweened } from 'svelte/motion'
  import {
    BoxBufferGeometry,
    Color,
    CylinderBufferGeometry,
    MeshStandardMaterial,
    PositionalAudio as ThreePositionalAudio
  } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'

  export let position: Position | undefined = undefined
  export let rotation: Rotation | undefined = undefined
  export let scale: Scale | undefined = undefined

  let discSpeed = tweened(0, {
    duration: 1e3
  })
  let discRotation = 0
  useFrame(() => {
    discRotation += 0.02 * $discSpeed
  })

  let armPos = spring(0)

  let started = false
  export let isPlaying = false

  export const toggle = (delay?: any) => {
    if (!started) {
      started = true
    }
    if (isPlaying) {
      discSpeed.set(0)
      armPos.set(0)
      isPlaying = false
    } else {
      discSpeed.set(1)
      armPos.set(1)
      isPlaying = true
    }
  }

  const buttonOffsetY = spring(0)

  const bufferPromise = useAudio('/audio/side_a.mp3')

  let audio: ThreePositionalAudio
  const { context } = useAudioListener()
  const analyser = context.createAnalyser()
  $: if (audio) audio.getOutput().connect(analyser)
  const pcmData = new Float32Array(analyser.fftSize)
  export let volume = 0
  useFrame(() => {
    if (!audio) return
    analyser.getFloatTimeDomainData(pcmData)
    let sumSquares = 0.0
    for (const amplitude of pcmData) {
      sumSquares += amplitude * amplitude
    }
    volume = Math.sqrt(sumSquares / pcmData.length)
  })

  const buttonMaterial = new MeshStandardMaterial({
    color: 0x222222
  })
</script>

<Group {position} {rotation} {scale}>
  {#await bufferPromise then buffer}
    <!-- DISC -->
    <Mesh
      receiveShadow
      castShadow
      material={new MeshStandardMaterial({
        color: 0xc62004,
        flatShading: true
      })}
      geometry={new CylinderBufferGeometry(2, 2, 0.1, 10)}
      rotation={{ y: -discRotation }}
      position={{ x: 0.5, y: 1.15 }}
    />

    <!-- CASE -->
    <Mesh
      receiveShadow
      castShadow
      geometry={new BoxBufferGeometry(6, 1, 4.4)}
      material={new MeshStandardMaterial({
        color: 0xeedbcb
      })}
      position={{ y: 0.5 }}
    />

    <!-- BUTTON -->
    <Mesh
      interactive
      on:click={toggle}
      on:pointerenter={(e) => {
        buttonMaterial.color = new Color(0x666666)
      }}
      on:pointerleave={(e) => {
        buttonMaterial.color = new Color(0x222222)
        buttonOffsetY.set(0)
      }}
      on:pointerdown={() => {
        buttonOffsetY.set(0.05)
      }}
      on:pointerup={() => {
        buttonOffsetY.set(0)
      }}
      material={buttonMaterial}
      geometry={new BoxBufferGeometry(1, 0.2, 1)}
      position={{ x: -2.2, z: 1.4, y: 1 - $buttonOffsetY }}
    />

    <Text
      castShadow
      ignorePointer
      color="black"
      text={isPlaying ? 'PAUSE' : 'PLAY'}
      rotation={{ x: DEG2RAD * -90 }}
      position={{ x: -2.2, z: 1.4, y: 1.105 - $buttonOffsetY }}
      fontSize={0.2}
      anchorX="50%"
      anchorY="50%"
    />

    <!-- ARM -->
    <Group
      position={{ x: 2.5, y: 1.45, z: -1.8 }}
      rotation={{ z: DEG2RAD * 90, y: DEG2RAD * 90 - $armPos * 0.3 }}
    >
      <Mesh
        castShadow
        material={new MeshStandardMaterial({
          color: 0xffffff,
          flatShading: true
        })}
        geometry={new CylinderBufferGeometry(0.1, 0.1, 3, 6)}
        position={{ y: 1.5 }}
      />
    </Group>

    {#if started}
      <PositionalAudio
        bind:audio
        refDistance={10}
        loop
        autoplay
        playbackRate={$discSpeed}
        {buffer}
        directionalCone={{
          coneInnerAngle: 90,
          coneOuterAngle: 220,
          coneOuterGain: 0.3
        }}
      />
    {/if}
  {/await}
</Group>
