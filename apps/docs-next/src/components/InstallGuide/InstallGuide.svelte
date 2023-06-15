<script lang="ts">
  import CopyCodeButton from '../Code/CopyCodeButton.svelte'
  import InstallButton from './InstallButton.svelte'
  import { onMount } from 'svelte'

  let useGltf = false
  let installExtras = false
  let installRapier = false
  let installTheatre = false
  let installTypes = false

  let divider = ' \\'
  let merger = '\n'
  let space = '            '

  $: installCode = [
    `npm install three @threlte/core@next${
      installExtras || useGltf || installRapier || installTheatre || installTypes ? divider : ''
    }`,
    (installExtras || useGltf) &&
      `${space}@threlte/extras@next${
        installRapier || installTheatre || installTypes ? divider : ''
      }`,
    installRapier &&
      `${space}@threlte/rapier@next @dimforge/rapier3d-compat${
        installTypes || installTheatre ? divider : ''
      }`,
    installTheatre &&
      `${space}@threlte/theatre@next @theatre/core @theatre/studio${installTypes ? divider : ''}`,
    installTypes && `${space}@types/three`
  ]
    .filter(Boolean)
    .join(merger)

  onMount(() => {
    if (window.navigator.userAgent.includes('Windows')) {
      divider = ' '
      merger = ''
      space = ''
    }
  })
</script>

<InstallButton
  disabled
  active
  class="cursor-not-allowed">@threlte/core</InstallButton
>

<p class="mt-1">
  Compose three.js scenes declaratively and state-driven. Three.js and Threlte's core the library
  are required.
</p>

<InstallButton
  on:click={() => {
    installExtras = !installExtras
  }}
  active={installExtras}
  passivelyActive={useGltf}>@threlte/extras</InstallButton
>

<p class="mt-1">
  <a
    href="/docs/reference/extras/getting-started"
    target="_blank">Components, helpers, hooks</a
  >
  and more that extend the core functionality.
</p>

<InstallButton
  on:click={() => {
    useGltf = !useGltf
  }}
  active={useGltf}>@threlte/gltf</InstallButton
>

<p class="mt-1">
  A <a
    href="/docs/reference/gltf/getting-started"
    target="_blank">command-line tool</a
  >
  that turns GLTF assets into declarative and re-usable Threlte components. The generated Threlte components
  make use of the package <code>@threlte/extras</code>.
</p>

<InstallButton
  on:click={() => {
    installRapier = !installRapier
  }}
  active={installRapier}>@threlte/rapier</InstallButton
>

<p class="mt-1">
  Components and hooks to use the <a
    href="https://rapier.rs/"
    target="_blank"
    rel="noreferrer">Rapier physics engine</a
  > in Threlte.
</p>

<InstallButton
  on:click={() => {
    installTheatre = !installTheatre
  }}
  active={installTheatre}>@threlte/theatre</InstallButton
>

<p class="mt-1">
  Components and hooks to use the animation library <a
    href="https://www.theatrejs.com/"
    target="_blank"
    rel="noreferrer">Theatre.js</a
  > in Threlte.
</p>

<InstallButton
  on:click={() => {
    installTypes = !installTypes
  }}
  active={installTypes}>@types/three</InstallButton
>

<p class="mt-1">TypeScript types for three.js.</p>

<p>Install the packages with npm, pnpm, yarn or any other package manager you prefer.</p>

<div
  class="relative not-prose group overflow-x-auto rounded-md border border-white/20 bg-blue-900 text-sm shadow-xl [&>*]:!bg-transparent p-3 whitespace-pre-wrap"
>
  <code class="text-[1em] p-0">
    {installCode}
  </code>

  <CopyCodeButton code={installCode} />
</div>
