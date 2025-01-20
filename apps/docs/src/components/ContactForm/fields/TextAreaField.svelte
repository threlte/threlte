<script lang="ts">
  import Field from './Field.svelte'

  export let label: string
  export let rows: number = 10
  export let id: string = label.toLowerCase().replace(' ', '-')
  export let required: boolean = false
  export let value: string | undefined = undefined
</script>

<Field
  {label}
  {id}
  {required}
>
  <textarea
    type="text"
    name={id}
    {rows}
    {required}
    bind:value
  />
</Field>
