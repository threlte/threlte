<script lang="ts">
  import type { ISheet } from '@theatre/core'
  import { T, useThrelte } from '@threlte/core'
  import { Float, Grid, OrbitControls, RadialGradientTexture } from '@threlte/extras'
  import { SheetObject } from '@threlte/theatre'
  import { onMount } from 'svelte'
  import AnimatableCube from './AnimatableCube.svelte'
  import AnimatableStarField from './AnimatableStarField.svelte'
  import KeyboardControls from './KeyboardControls.svelte'
  import PostProcessing from './PostProcessing.svelte'
  import ScrollSheet from './ScrollSheet.svelte'
  import { mouseCoordsSpring, springScrollPos } from './scrollPos'
  import { debug } from './state'

  let sheet = $state<ISheet>()

  $effect(() => {
    if (sheet) {
      sheet.sequence.position = $springScrollPos * 10
    }
  })

  const { scene } = useThrelte()

  let fov = $state(40)
  onMount(() => {
    if (window.innerWidth > 640) {
      fov = 35
    }
  })
</script>

<svelte:window
  onresize={() => {
    if (window.innerWidth > 640) {
      fov = 35
    } else {
      fov = 40
    }
  }}
/>

<T.Group position.x={-mouseCoordsSpring.current.x * 0.6}>
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
  oncreate={(ref) => {
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
                  <T.CameraHelper
                    args={[camera]}
                    attach={scene}
                  />
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
          position.x={-mouseCoordsSpring.current.x * 0.2}
          position.y={mouseCoordsSpring.current.y * 0.1}
        >
          <ScrollSheet
            name="Threlte-Composite"
            startAtScrollPosition={0}
            endAtScrollPosition={3}
          >
            <SheetObject
              key="Post Processing"
              props={{
                bloomIntensity: 2,
                bloomRadius: 0.6,
                bloomLuminanceSmoothing: 0.025,
                brightness: 0,
                contrast: 0,
                noiseIntensity: 0.03
              }}
            >
              {#snippet children({ values })}
                <PostProcessing
                  bloomIntensity={values.bloomIntensity}
                  bloomLuminanceSmoothing={values.bloomLuminanceSmoothing}
                  bloomRadius={values.bloomRadius}
                  brightness={values.brightness}
                  contrast={values.contrast}
                  noiseIntensity={values.noiseIntensity}
                />
              {/snippet}
            </SheetObject>

            <SheetObject key="Glow">
              {#snippet children({ Transform, Sync })}
                <KeyboardControls>
                  {#snippet children({ transform })}
                    <Transform {...transform}>
                      <RadialGradientTexture
                        attach={false}
                        outerRadius={512}
                        stops={[
                          { color: '#ffffff', offset: 0 },
                          { color: '#000000', offset: 1 }
                        ]}
                      >
                        {#snippet children({ ref })}
                          <T.Mesh
                            position.z={0.1}
                            scale={0.8}
                          >
                            <T.PlaneGeometry args={[10, 10]} />
                            <T.MeshBasicMaterial
                              transparent
                              alphaMap={ref}
                            >
                              <Sync
                                opacity="opacity2"
                                color="color2"
                              />
                            </T.MeshBasicMaterial>
                          </T.Mesh>

                          <T.Mesh>
                            <T.PlaneGeometry args={[10, 10]} />
                            <T.MeshBasicMaterial
                              transparent
                              alphaMap={ref}
                            >
                              <Sync
                                opacity
                                color
                              />
                            </T.MeshBasicMaterial>
                          </T.Mesh>
                        {/snippet}
                      </RadialGradientTexture>
                    </Transform>
                  {/snippet}
                </KeyboardControls>
              {/snippet}
            </SheetObject>

            <SheetObject
              key="Composite"
              props={{
                floatIntensity: 1,
                rotationIntensity: 1,
                rotationSpeed: 1,
                floatSpeed: 1
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
