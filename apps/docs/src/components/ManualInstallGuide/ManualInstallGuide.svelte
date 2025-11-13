<script lang="ts">
  import CopyCodeButton from '../Code/CopyCodeButton.svelte'
  import InstallButton from './InstallButton.svelte'
  import { onMount } from 'svelte'

  let useGltf = $state(false)
  let installExtras = $state(false)
  let installRapier = $state(false)
  let installTheatre = $state(false)
  let installXR = $state(false)
  let installFlex = $state(false)
  let installTypes = $state(false)
  let installStudio = $state(false)

  let divider = ' \\'
  let merger = '\n'
  let space = '            '

  const useDivider = (...args: boolean[]) => {
    return args.some(Boolean) ? divider : ''
  }

  let tag = ''

  let coreDivider = $derived(
    useDivider(
      installExtras,
      useGltf,
      installRapier,
      installTheatre,
      installXR,
      installFlex,
      installTypes,
      installStudio
    )
  )
  let extrasDivider = $derived(
    useDivider(installRapier, installTheatre, installXR, installFlex, installTypes, installStudio)
  )
  let rapierDivider = $derived(
    useDivider(installTheatre, installXR, installFlex, installTypes, installStudio)
  )
  let theatreDivider = $derived(useDivider(installXR, installFlex, installTypes, installStudio))
  let xrDivider = $derived(useDivider(installFlex, installTypes, installStudio))
  let flexDivider = $derived(useDivider(installTypes, installStudio))
  let studioDivider = $derived(useDivider(installTypes))

  let extrasPassivelyActive = $derived(useGltf || installTheatre || installStudio)

  let installCode = $derived(
    [
      `npm install three @threlte/core${tag}${coreDivider}`,
      (installExtras || useGltf || installTheatre || installStudio) &&
        `${space}@threlte/extras${tag}${extrasDivider}`,
      installRapier && `${space}@threlte/rapier${tag} @dimforge/rapier3d-compat${rapierDivider}`,
      installTheatre &&
        `${space}@threlte/theatre${tag} @theatre/core @theatre/studio${theatreDivider}`,
      installXR && `${space}@threlte/xr${tag}${xrDivider}`,
      installFlex && `${space}@threlte/flex${tag}${flexDivider}`,
      installStudio && `${space}@threlte/studio${tag}${studioDivider}`,
      installTypes && `${space}@types/three`
    ]
      .filter(Boolean)
      .join(merger)
  )

  onMount(() => {
    if (window.navigator.userAgent.includes('Windows')) {
      divider = ' '
      merger = ''
      space = ''
    }
  })
</script>

<div
  class="mt-4 grid grid-cols-1 items-start justify-start gap-x-4 gap-y-2 max-md:justify-items-start md:grid-cols-[auto_auto] md:gap-y-2 md:[&>button]:my-1"
>
  <InstallButton
    disabled
    active
    class="cursor-not-allowed">@threlte/core</InstallButton
  >

  <p class="my-0 self-center text-sm md:text-base">
    Simple, transparent Three.js bindings. <code>three</code> is required as a peer dependency.
  </p>

  <hr class="mt-0 border-t border-gray-700 max-md:my-3 md:col-span-2" />

  <InstallButton
    onclick={() => {
      installExtras = !installExtras
    }}
    active={installExtras}
    passivelyActive={extrasPassivelyActive}>@threlte/extras</InstallButton
  >

  <p class="my-0 self-center text-sm md:text-base">
    <a
      href="/docs/reference/extras/getting-started"
      target="_blank">Components, helpers, hooks</a
    >
    and more that add functionality.
  </p>

  <hr class="mt-0 border-t border-gray-700 max-md:my-3 md:col-span-2" />

  <InstallButton
    onclick={() => {
      useGltf = !useGltf
    }}
    active={useGltf}>@threlte/gltf</InstallButton
  >

  <p class="my-0 self-center text-sm md:text-base">
    A <a
      href="/docs/reference/gltf/getting-started"
      target="_blank">command-line tool</a
    >
    that turns GLTF assets into declarative and re-usable Threlte components. The generated Threlte components
    need <code>@threlte/extras</code> to work.
  </p>

  <hr class="mt-0 border-t border-gray-700 max-md:my-3 md:col-span-2" />

  <InstallButton
    onclick={() => {
      installRapier = !installRapier
    }}
    active={installRapier}>@threlte/rapier</InstallButton
  >

  <p class="my-0 self-center text-sm md:text-base">
    Components and hooks to use the <a
      href="https://rapier.rs/"
      target="_blank"
      rel="noreferrer">Rapier physics engine</a
    >.
  </p>

  <hr class="mt-0 border-t border-gray-700 max-md:my-3 md:col-span-2" />

  <InstallButton
    onclick={() => {
      installTheatre = !installTheatre
    }}
    active={installTheatre}>@threlte/theatre</InstallButton
  >

  <p class="my-0 self-center text-sm md:text-base">
    Components and hooks to use the animation library <a
      href="https://www.theatrejs.com/"
      target="_blank"
      rel="noreferrer">Theatre.js</a
    >.
  </p>

  <hr class="mt-0 border-t border-gray-700 max-md:my-3 md:col-span-2" />

  <InstallButton
    onclick={() => {
      installXR = !installXR
    }}
    active={installXR}>@threlte/xr</InstallButton
  >

  <p class="my-0 self-center text-sm md:text-base">Components and hooks for VR and AR.</p>

  <hr class="mt-0 border-t border-gray-700 max-md:my-3 md:col-span-2" />

  <InstallButton
    onclick={() => {
      installFlex = !installFlex
    }}
    active={installFlex}>@threlte/flex</InstallButton
  >

  <p class="my-0 self-center text-sm md:text-base">
    Components and hooks to use the flex engine <a
      href="https://yogalayout.com/"
      target="_blank"
      rel="noreferrer">Yoga</a
    >.
  </p>

  <hr class="mt-0 border-t border-gray-700 max-md:my-3 md:col-span-2" />

  <InstallButton
    onclick={() => {
      installStudio = !installStudio
    }}
    active={installStudio}>@threlte/studio</InstallButton
  >

  <p class="my-0 self-center text-sm md:text-base">
    <a
      href="/docs/reference/studio/getting-started"
      target="_blank">Spatial Programming Toolset</a
    > for Threlte.
  </p>

  <hr class="mt-0 border-t border-gray-700 max-md:my-3 md:col-span-2" />

  <InstallButton
    onclick={() => {
      installTypes = !installTypes
    }}
    active={installTypes}>@types/three</InstallButton
  >

  <p class="my-0 self-center text-sm md:text-base">TypeScript types for Three.js.</p>
</div>

<p>Install the packages with npm, pnpm, yarn or any other package manager you prefer.</p>

<div
  class="not-content *:bg-transparent! group relative overflow-x-auto whitespace-pre-wrap rounded-md border border-white/20 bg-blue-900 p-3 text-sm shadow-xl"
>
  <code class="p-0 text-[1em]">
    {installCode}
  </code>

  <CopyCodeButton code={installCode} />
</div>
