import { $, component$ } from '@builder.io/qwik'
import {
  routeAction$,
  type DocumentHead,
  Form,
  useNavigate,
} from '@builder.io/qwik-city'
import sgMail from '@sendgrid/mail'

export const useSendEmail = routeAction$(async (data) => {
  // This is the Sendgrid API 
  sgMail.setApiKey(import.meta.env.PUBLIC_SENDGRID_API_KEY)

  // In `to` and `from` we will have to put the email address
  // that we have verified in Sendgrid
  const msg = {
    to: import.meta.env.PUBLIC_EMAIL_TO_ADDRESS,
    from: import.meta.env.PUBLIC_EMAIL_FROM_ADDRESS,
    subject: 'A New Message From Cool Form',
    text: data.message,
    html: `You have a new message from ${data.name} (${data.email}) regarding <strong>${data.subject}</strong>:<br/><br/>${data.message}`,
  }

  //@ts-ignore
  await sgMail.send(msg).then(
    () => {
      console.log('Message sent')
    },
    (error) => {
      console.error(error)

      if (error.response) {
        console.error(error.response.body)
      }
    }
  )
})

export default component$(() => {
  const sendEmailAction = useSendEmail()
  const nav = useNavigate()

  const resetForm = $(async (form: HTMLFormElement) => {
    form.reset()
    await nav('/success')
  })

  return (
    <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800 gap-12">
      <h1 class="text-3xl font-bold">How can we help you?</h1>
      <Form
        action={sendEmailAction}
        class="flex flex-col gap-4 w-full max-w-[400px]"
        onSubmitCompleted$={(event) => {
          resetForm(event.target as HTMLFormElement)
        }}
      >
        {/* // Name  */}
        <div class="flex flex-col gap-2">
          <label for="name">Name</label>
          <input
            required
            class="border border-black rounded-md px-4 py-2"
            name="name"
            type="text"
          />
        </div>

        {/* // Email  */}
        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <input
            required
            class="border border-black rounded-md px-4 py-2"
            name="email"
            type="email"
          />
        </div>

        {/* // Subject  */}
        <div class="flex flex-col gap-2">
          <label for="subject">Subject</label>
          <div class="select-wrapper">
            <select
              class="border border-black rounded-md px-4 py-2"
              name="subject"
            >
              <option selected disabled value=""></option>
              <option value="General">General</option>
              <option value="Support">Support</option>
              <option value="Sales">Sales</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* // Message  */}
        <div class="flex flex-col gap-2">
          <label for="message">Message</label>
          <textarea
            rows={4}
            class="border border-black rounded-md px-4 py-2"
            name="message"
          />
        </div>

        <button
          class="bg-black hover:bg-gray-800 focus:bg-gray-800 text-white px-4 py-3"
          type="submit"
        >
          Send
        </button>
      </Form>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Qwik Template for Sendgrid',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
}
