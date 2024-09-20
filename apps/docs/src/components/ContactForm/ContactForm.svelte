<script lang="ts">
  import Form from './Form.svelte'
  import { Fieldset, TextField, TextAreaField, EmailField } from './fields'

  let formData = {
    name: '',
    email: '',
    message: ''
  }

  let sending = false
  let sent = false

  const handleSubmit = async (e: any) => {
    sending = true
    e.preventDefault()
    try {
      await fetch(
        'https://discord.com/api/webhooks/1215041655053230201/L6np-p6XLBbkWJsmNxH56IVfDRN044yLq47bMTsy_tVPSvoRVIhQqnS-I4_Pl4_KTF2y',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            username: 'Contact form',
            embeds: [
              {
                author: {
                  name: formData.name
                },
                description: formData.message,
                footer: {
                  text: `email: ${formData.email}`
                }
              }
            ]
          })
        }
      )
      sending = false
      sent = true
      setTimeout(() => {
        sent = false
      }, 2000)
    } catch (e) {
      alert('Failed to send the message. Check network connection and try again.')
      sent = false
    }
  }
</script>

<Form
  action="contact"
  submitButton="Send"
  on:submit={handleSubmit}
>
  <Fieldset>
    <TextField
      bind:value={formData.name}
      label="Name"
      required
    />
    <EmailField
      required
      bind:value={formData.email}
    />
  </Fieldset>
  <Fieldset>
    <TextAreaField
      label="Message"
      bind:value={formData.message}
      required
    />
  </Fieldset>
</Form>
