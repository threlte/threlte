<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Edges, PositionalAudio, useAudioListener, useCursor, useGltf } from '@threlte/extras'
  import { spring, tweened } from 'svelte/motion'
  import {
    BufferGeometry,
    CylinderGeometry,
    DoubleSide,
    Mesh,
    MeshStandardMaterial,
    PositionalAudio as ThreePositionalAudio
  } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import Button from './Button.svelte'
  import Disc from './Disc.svelte'

  let discSpeed = tweened(0, {
    duration: 1e3
  })

  let armPos = spring(0)

  let started = false
  export let isPlaying = false

  export const toggle = async () => {
    if (!started) {
      await context.resume()
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

  let audio: ThreePositionalAudio
  const { context } = useAudioListener()
  const analyser = context.createAnalyser()
  $: if (audio) audio.getOutput().connect(analyser)
  const pcmData = new Float32Array(analyser.fftSize)
  export let volume = 0
  useTask(() => {
    if (!audio) return
    analyser.getFloatTimeDomainData(pcmData)
    let sumSquares = 0.0
    for (const amplitude of pcmData) {
      sumSquares += amplitude * amplitude
    }
    volume = Math.sqrt(sumSquares / pcmData.length)
  })

  let sideA = '/audio/side_a.mp3'
  let sideB = '/audio/side_b.mp3'
  let source = sideA
  const changeSide = () => {
    source = source === sideA ? sideB : sideA
  }

  let coverOpen = false
  const coverAngle = spring(0)
  $: {
    if (coverOpen) coverAngle.set(80)
    else coverAngle.set(0)
  }

  const { onPointerEnter, onPointerLeave } = useCursor()

  const gltf = useGltf<{
    nodes: {
      Cover: Mesh
    }
    materials: {}
  }>('/models/turntable/cover.glb')
  let coverGeometry: BufferGeometry | undefined
  $: if ($gltf) {
    const coverMesh = $gltf.nodes.Cover as Mesh
    coverGeometry = coverMesh.geometry
  }
</script>

<T.Group {...$$restProps}>
  <!-- DISC -->
  <Disc
    position.x={0.5}
    position.y={1.01}
    discSpeed={$discSpeed}
  />

  <!-- CASE -->
  <T.Mesh
    receiveShadow
    castShadow
    position.y={0.5}
  >
    <T.BoxGeometry args={[6, 1, 4.4]} />
    <T.MeshStandardMaterial color="#eedbcb" />
    <Edges
      scale={1.001}
      color="black"
    />
  </T.Mesh>

  <!-- COVER -->
  <T.Group
    position.y={1}
    position.z={-2.2}
    rotation.x={-$coverAngle * DEG2RAD}
  >
    {#if coverGeometry}
      <T.Mesh
        geometry={coverGeometry}
        scale={[3, 0.5, 2.2]}
        position.y={0.5}
        position.z={2.2}
        onclick={() => (coverOpen = !coverOpen)}
        onpointerenter={onPointerEnter}
        onpointerleave={onPointerLeave}
      >
        <T.MeshStandardMaterial
          color="#ffffff"
          roughness={0.08}
          metalness={0.8}
          envMapIntensity={1}
          side={DoubleSide}
          transparent
          opacity={0.65}
        />
        <Edges color="white" />
      </T.Mesh>
    {/if}
  </T.Group>

  <!-- SIDE BUTTON -->
  <Button
    position={[-2.3, 1.01, 0.8]}
    onClick={changeSide}
    text={source === sideA ? 'SIDE B' : 'SIDE A'}
  />

  <!-- PLAY/PAUSE BUTTON -->
  <Button
    position={[-2.3, 1.01, 1.7]}
    onClick={toggle}
    text={isPlaying ? 'PAUSE' : 'PLAY'}
  />

  <!-- ARM -->
  <T.Group
    position={[2.5, 1.55, -1.8]}
    rotation.z={DEG2RAD * 90}
    rotation.y={DEG2RAD * 90 - $armPos * 0.3}
  >
    <T.Mesh
      castShadow
      material={new MeshStandardMaterial({
        color: 0xffffff
      })}
      geometry={new CylinderGeometry(0.1, 0.1, 3, 12)}
      position.y={1.5}
    >
      <T.CylinderGeometry args={[0.1, 0.1, 3, 12]} />
      <T.MeshStandardMaterial color="#ffffff" />
      <Edges
        color="black"
        thresholdAngle={80}
      />
    </T.Mesh>
  </T.Group>

  {#if started}
    <PositionalAudio
      autoplay
      bind:ref={audio}
      refDistance={15}
      loop
      playbackRate={$discSpeed}
      src={source}
      directionalCone={{
        coneInnerAngle: 90,
        coneOuterAngle: 220,
        coneOuterGain: 0.3
      }}
    />
  {/if}
</T.Group>
