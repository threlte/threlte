<script lang="ts">
  import Field from './Field.svelte'

  interface Props {
    label?: string
    id?: string
    required?: boolean
    value?: string
  }

  let {
    label = 'Email',
    id = label.toLowerCase().replace(' ', '-'),
    required = false,
    value = $bindable()
  }: Props = $props()
</script>

<Field
  {label}
  {id}
  {required}
>
  <input
    type="email"
    name={id}
    {required}
    bind:value
  />
</Field>
