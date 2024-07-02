<script lang="ts">
  import Field from './Field.svelte'

  export let label: string
  export let id: string = label.toLowerCase().replace(' ', '-')
  export let required: boolean = false
  export let value: string | undefined = undefined
</script>

<Field
  {label}
  {id}
  {required}
>
  <input
    type="text"
    name={id}
    {required}
    bind:value
  />
</Field>
