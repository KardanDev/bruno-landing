"use client";

import { Button, Field, Input, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import type { ContactPage } from "@/sanity/lib/types";
import { TContactSchema } from "@/utils/schemas";

export function ContactForm({
  copy,
  recipient,
}: {
  copy: ContactPage["form"];
  recipient?: string;
}) {
  const [form, setForm] = useState<TContactSchema>({
    email: "",
    message: "",
    name: "",
    subject: "",
    phone: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    });
  }

  return (
    <form onSubmit={submit}>
      <Stack gap="5">
        <Field.Root required>
          <Field.Label color="ivory.100" fontWeight="700">
            {copy.nameLabel}
          </Field.Label>
          <Input
            bg="ink.700"
            borderColor="border"
            borderRadius="md"
            name="name"
            onChange={(event) => update("name", event.target.value)}
            required
            value={form.name}
          />
        </Field.Root>
        <Field.Root required>
          <Field.Label color="ivory.100" fontWeight="700">
            {copy.emailLabel}
          </Field.Label>
          <Input
            bg="ink.700"
            borderColor="border"
            borderRadius="md"
            name="email"
            onChange={(event) => update("email", event.target.value)}
            required
            type="email"
            value={form.email}
          />
        </Field.Root>
        <Field.Root required>
          <Field.Label color="ivory.100" fontWeight="700">
            {copy?.phoneLabel ?? "Celular"}
          </Field.Label>
          <Input
            bg="ink.700"
            borderColor="border"
            borderRadius="md"
            name="phone"
            onChange={(event) => update("phone", event.target.value)}
            required
            value={form.phone}
          />
        </Field.Root>
        <Field.Root required>
          <Field.Label color="ivory.100" fontWeight="700">
            {copy.subjectLabel}
          </Field.Label>
          <Input
            bg="ink.700"
            borderColor="border"
            borderRadius="md"
            name="subject"
            onChange={(event) => update("subject", event.target.value)}
            required
            value={form.subject}
          />
        </Field.Root>
        <Field.Root required>
          <Field.Label color="ivory.100" fontWeight="700">
            {copy.messageLabel}
          </Field.Label>
          <Textarea
            bg="ink.700"
            borderColor="border"
            borderRadius="md"
            minH="36"
            name="message"
            onChange={(event) => update("message", event.target.value)}
            required
            value={form.message}
          />
        </Field.Root>
        <Button
          alignSelf="flex-start"
          bg="gold.400"
          borderRadius="full"
          color="ivory.100"
          px="6"
          type="submit"
          _hover={{ bg: "gold.300" }}
        >
          {copy.submitLabel}
          <LuArrowUpRight />
        </Button>
      </Stack>
    </form>
  );
}
