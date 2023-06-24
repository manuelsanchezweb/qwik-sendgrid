import { component$ } from '@builder.io/qwik'
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city'

export default component$(() => {
  const nav = useNavigate()

  return (
    <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800 gap-12">
      <h1 class="text-2xl md:text-4xl font-bold">Message was sent successfully!</h1>
      <button class="bg-black hover:bg-gray-800 focus:bg-gray-800 text-white px-4 py-3" onClick$={() => nav('/')}>Send a new message</button>
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
