<script lang="ts">
  import { Element, Pane, ThemeUtils } from 'svelte-tweakpane-ui'
  import { browser } from '../internal/browser.js'

  let innerWidth = browser ? window.innerWidth : 0
</script>

<svelte:window bind:innerWidth />

<Pane
  title="Threlte Studio"
  userExpandable={false}
  position="fixed"
  width={innerWidth - 12}
  theme={ThemeUtils.presets.standard}
  x={6}
  y={6}
>
  <Element>
    <div id="toolbar-items-wrapper">
      <div class="toolbar-items toolbar-items-left"></div>
      <div class="toolbar-items toolbar-items-center"></div>
      <div class="toolbar-items toolbar-items-right"></div>
    </div>
  </Element>
</Pane>

<style>
  #toolbar-items-wrapper {
    display: flex;
    gap: 0.25rem;
    align-items: stretch;
    justify-content: space-between;
    padding: 2px 2px;
    overflow-x: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  #toolbar-items-wrapper::-webkit-scrollbar {
    display: none;
  }

  .toolbar-items > :global(* + *) {
    display: block !important;
    border-left: 1px solid #444548;
    padding-left: 0.5rem;
    margin-left: 0.25rem;
  }

  #toolbar-items-wrapper .toolbar-items-center {
    justify-content: center;
  }

  #toolbar-items-wrapper .toolbar-items-right {
    justify-content: flex-end;
  }

  #toolbar-items-wrapper div {
    flex-shrink: 0;
    flex-grow: 1;
    display: flex;
    gap: 0.25rem;
    align-items: stretch;
  }

  /* tweakpane checkbox value wrapper */
  :global(.tp-lblv_v:has(.tp-ckbv)) {
    width: auto !important;
  }
</style>
