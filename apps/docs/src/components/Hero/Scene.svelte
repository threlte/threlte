<script lang="ts">
  import { types } from '@theatre/core'
  import type { ISheet } from '@theatre/core'
  import { T, useThrelte } from '@threlte/core'
  import { Float, Grid, OrbitControls, Portal, useTexture } from '@threlte/extras'
  import { SheetObject } from '@threlte/theatre'
  import AnimatableCube from './AnimatableCube.svelte'
  import AnimatableStarField from './AnimatableStarField.svelte'
  import KeyboardControls from './KeyboardControls.svelte'
  import PostProcessing from './PostProcessing.svelte'
  import ScrollSheet from './ScrollSheet.svelte'
  import { mouseCoordsSpring, springScrollPos } from './scrollPos'
  import { debug } from './state'
  import { onMount } from 'svelte'

  let sheet: ISheet | undefined

  $: sheet && (sheet.sequence.position = $springScrollPos * 10)

  const { scene } = useThrelte()

  let fov = 40
  onMount(() => {
    if (window.innerWidth > 640) {
      fov = 35
    }
  })
</script>

<svelte:window
  on:resize={() => {
    if (window.innerWidth > 640) {
      fov = 35
    } else {
      fov = 40
    }
  }}
/>

<PostProcessing />

<T.Group position.x={-$mouseCoordsSpring.x * 0.6}>
  <ScrollSheet
    name="Star Fields"
    startAtScrollPosition={4}
    endAtScrollPosition={5}
  >
    <AnimatableStarField key="Star Field" />
    <AnimatableStarField key="Star Field Top" />
  </ScrollSheet>
</T.Group>

<T.PerspectiveCamera
  makeDefault={$debug}
  oncreate={({ ref }) => {
    ref.position.set(10, 10, 10)
    ref.lookAt(0, 0, 0)
  }}
>
  {#if $debug}
    <OrbitControls />
  {/if}
</T.PerspectiveCamera>

<ScrollSheet
  name="Scene"
  startAtScrollPosition={0}
  endAtScrollPosition={3}
>
  <SheetObject key="Camera">
    {#snippet children({ Transform })}
      <KeyboardControls>
        {#snippet children({ transform })}
          <Transform {...transform}>
            <T.PerspectiveCamera
              {fov}
              makeDefault={!$debug}
            >
              {#snippet children({ ref: camera })}
                {#if $debug}
                  <Portal object={scene}>
                    <T.CameraHelper args={[camera]} />
                  </Portal>
                {/if}
              {/snippet}
            </T.PerspectiveCamera>
          </Transform>
        {/snippet}
      </KeyboardControls>
    {/snippet}
  </SheetObject>
</ScrollSheet>

{#if $debug}
  <Grid />
{/if}

<ScrollSheet
  useSpring={false}
  name="Threlte-Composite-Unsprung"
  startAtScrollPosition={3.5}
  endAtScrollPosition={5}
>
  <SheetObject key="composite">
    {#snippet children({ Transform })}
      <Transform>
        <T.Group
          position.x={-$mouseCoordsSpring.x * 0.2}
          position.y={$mouseCoordsSpring.y * 0.1}
        >
          <ScrollSheet
            name="Threlte-Composite"
            startAtScrollPosition={0}
            endAtScrollPosition={3}
          >
            <SheetObject key="Glow">
              {#snippet children({ Transform, Sync })}
                <KeyboardControls>
                  {#snippet children({ transform })}
                    <Transform {...transform}>
                      {#await useTexture('/glow.png') then map}
                        <T.Mesh>
                          <T.PlaneGeometry args={[10, 10]} />
                          <T.MeshBasicMaterial
                            transparent
                            {map}
                          >
                            <Sync
                              opacity
                              color
                            />
                          </T.MeshBasicMaterial>
                        </T.Mesh>
                      {/await}

                      {#await useTexture('/glow2.png') then map}
                        <T.Mesh
                          position.z={0.1}
                          scale={0.8}
                        >
                          <T.PlaneGeometry args={[10, 10]} />
                          <T.MeshBasicMaterial
                            transparent
                            {map}
                          >
                            <Sync
                              opacity="opacity2"
                              color="color2"
                            />
                          </T.MeshBasicMaterial>
                        </T.Mesh>
                      {/await}
                    </Transform>
                  {/snippet}
                </KeyboardControls>
              {/snippet}
            </SheetObject>

            <SheetObject
              key="Composite"
              props={{
                floatIntensity: types.number(1, {
                  range: [0, 10]
                }),
                rotationIntensity: types.number(1, {
                  range: [0, 10]
                }),
                rotationSpeed: types.number(1, {
                  range: [0, 10]
                }),
                floatSpeed: types.number(1, {
                  range: [0, 10]
                })
              }}
            >
              {#snippet children({ Transform, values })}
                <Float
                  floatIntensity={values.floatIntensity}
                  rotationIntensity={values.rotationIntensity}
                  rotationSpeed={values.rotationSpeed}
                  speed={values.floatSpeed}
                >
                  <KeyboardControls>
                    {#snippet children({ transform })}
                      <Transform {...transform}>
                        <!-- TOP -->
                        <AnimatableCube key="Box Top" />

                        <!-- MIDDLE -->
                        <AnimatableCube key="Box Middle" />

                        <!-- BOTTOM X+ -->
                        <AnimatableCube key="Box Bottom X+" />

                        <!-- BOTTOM X- -->
                        <AnimatableCube key="Box Bottom X-" />

                        <!-- BOTTOM Z+ -->
                        <AnimatableCube key="Box Bottom Z+" />

                        <!-- BOTTOM Z- -->
                        <AnimatableCube key="Box Bottom Z-" />
                      </Transform>
                    {/snippet}
                  </KeyboardControls>
                </Float>
              {/snippet}
            </SheetObject>
          </ScrollSheet>
        </T.Group>
      </Transform>
    {/snippet}
  </SheetObject>
</ScrollSheet>
