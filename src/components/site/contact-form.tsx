'use client'

import {Button, Field, Input, Stack, Textarea} from '@chakra-ui/react'
import {useState} from 'react'
import {LuArrowUpRight} from 'react-icons/lu'
import type {ContactPage} from '@/sanity/lib/types'

export function ContactForm({
  copy,
  recipient,
}: {
  copy: ContactPage['form']
  recipient?: string
}) {
  const [form, setForm] = useState({email: '', message: '', name: '', subject: ''})

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({...current, [key]: value}))
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = recipient ?? ''
    const subject = encodeURIComponent(`${form.subject || 'Contato pelo site'} — ${form.name}`)
    const body = encodeURIComponent(`Nome: ${form.name}\nE-mail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={submit}>
      <Stack gap="5">
        <Field.Root required>
          <Field.Label color="ink.900" fontWeight="700">{copy.nameLabel}</Field.Label>
          <Input bg="ivory.50" borderColor="border" borderRadius="md" name="name" onChange={(event) => update('name', event.target.value)} required value={form.name} />
        </Field.Root>
        <Field.Root required>
          <Field.Label color="ink.900" fontWeight="700">{copy.emailLabel}</Field.Label>
          <Input bg="ivory.50" borderColor="border" borderRadius="md" name="email" onChange={(event) => update('email', event.target.value)} required type="email" value={form.email} />
        </Field.Root>
        <Field.Root required>
          <Field.Label color="ink.900" fontWeight="700">{copy.subjectLabel}</Field.Label>
          <Input bg="ivory.50" borderColor="border" borderRadius="md" name="subject" onChange={(event) => update('subject', event.target.value)} required value={form.subject} />
        </Field.Root>
        <Field.Root required>
          <Field.Label color="ink.900" fontWeight="700">{copy.messageLabel}</Field.Label>
          <Textarea bg="ivory.50" borderColor="border" borderRadius="md" minH="36" name="message" onChange={(event) => update('message', event.target.value)} required value={form.message} />
        </Field.Root>
        <Button alignSelf="flex-start" bg="wine.800" borderRadius="full" color="ivory.50" px="6" type="submit" _hover={{bg: 'wine.700'}}>
          {copy.submitLabel}<LuArrowUpRight />
        </Button>
      </Stack>
    </form>
  )
}
