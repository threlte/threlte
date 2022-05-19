<script lang="ts">
  export let title: string
  export let description: string
  export let name: string
  export let from: string
  export let sourceUrl: string
</script>

<div>
  <h1>
    {title}
  </h1>
  <h3>
    {description}
  </h3>
  <div class="grid grid-cols-2">
    <p>Import</p>
    <pre>
    <code>
      import {'{'} {name} {'}'} from '{from}'
    </code>
  </pre>
    <p>Source</p>
    <a href={sourceUrl}>View Source Code</a>
  </div>
</div>
