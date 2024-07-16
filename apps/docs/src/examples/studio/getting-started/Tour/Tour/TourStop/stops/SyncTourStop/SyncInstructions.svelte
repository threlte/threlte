<script lang="ts">
  import InstructionsBasic from '../../../instructions/instructions-types/basic/InstructionsBasic.svelte'

  const html = `<pre class="shiki dracula-soft p-2" style="background-color: #282A36" tabindex="0"><code class="w-full block"><span class="line"><span style="color: #F6F6F4">&lt;</span><span style="color: #97E1F1; font-style: italic">T</span><span style="color: #F6F6F4">.</span><span style="color: #97E1F1; font-style: italic">PerspectiveCamera</span></span>
<span class="line w-full" style="background-color: rgb(234 179 8 / 0.3); display: inline-block"><span style="color: #F6F6F4">  </span><span style="color: #62E884; font-style: italic">position</span><span style="color: #F286C4">={</span><span style="color: #F6F6F4">[</span><span style="color: #BF9EEE">0</span><span style="color: #F6F6F4">, </span><span style="color: #BF9EEE">1</span><span style="color: #F6F6F4">, </span><span style="color: #BF9EEE">9</span><span style="color: #F6F6F4">]</span><span style="color: #F286C4">}</span></span>
<span class="line"><span style="color: #F6F6F4">/&gt;</span></span>
</code></pre>`
</script>

<div class="flex flex-col gap-3">
  <h2 class="text-xl font-bold leading-snug text-neutral-800">Auto Sync</h2>

  <div class="overflow-hidden whitespace-pre-wrap rounded-md text-sm">
    {@html html}
  </div>

  <InstructionsBasic
    clickAnywhere
    message="All changes to objects are persisted back to your code in real-time (limitations apply)."
    tip="This is a demo environment. Changes are not persisted."
  />
</div>
