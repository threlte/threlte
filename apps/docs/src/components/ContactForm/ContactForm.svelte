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
  let sentPreviously = false

  const handleSubmit = async (e: SubmitEvent) => {
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
        sentPreviously = true
        formData = { name: '', email: '', message: '' }
      }, 4000)
    } catch (e) {
      alert('Failed to send the message. Check network connection and try again.')
      sent = false
    }
  }
</script>

<div class="relative">
  {#if sentPreviously}
    <span> You already sent us a message, but feel free to contact us again. </span>
  {/if}
  <Form
    action="contact"
    submitButton="Send"
    onsubmit={handleSubmit}
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
  {#if sending}
    <div
      class="absolute left-0 top-0 flex h-full w-full flex-col items-center gap-2 bg-[#0A0F19] pt-12 text-2xl"
    >
      <span class="loader"></span>
      <span>Please wait...</span>
    </div>
  {/if}
  {#if sent}
    <div
      class="absolute left-0 top-0 flex h-full w-full flex-col items-center gap-2 bg-[#0A0F19] pt-10 text-2xl"
    >
      <span>Message sent.</span>
      <span>Thank you for getting in touch!</span>
    </div>
  {/if}
</div>

<style>
  /* https://cssloaders.github.io/ */
  .loader {
    width: 90px;
    height: 90px;
    border: 6px solid #fff;
    border-bottom-color: #ff5b28;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
