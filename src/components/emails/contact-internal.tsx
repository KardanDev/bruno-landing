import React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { TContactSchema } from "@/utils/schemas";

type Props = {
  contact: TContactSchema;
  companyName: string;
  receivedAt: Date;
};

const ContactInternal = ({ contact, companyName, receivedAt }: Props) => {
  const formattedDate = receivedAt.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              ink: {
                DEFAULT: "#171512",
                light: "#5f5a50",
                muted: "#8c867b",
              },
              gold: {
                DEFAULT: "#c9a227",
                light: "#f4e7b2",
                pale: "#fbf6e5",
                dark: "#9f7e12",
              },
              paper: "#faf9f6",
              line: "#e7e3d9",
            },
            fontFamily: {
              sans: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
              ],
            },
          },
        },
      }}
    >
      <Html lang="pt-BR">
        <Head />

        <Preview>
          Novo contato de {contact.name} - {contact.subject}
        </Preview>

        <Body className="m-0 bg-paper font-sans text-ink">
          {/* CABEÇALHO */}
          <Section className="w-full bg-ink px-0 py-8">
            <Container className="mx-auto w-full max-w-[600px] px-6">
              <Text className="m-0 mb-3 text-[11px] font-semibold uppercase tracking-[2px] text-gold">
                Novo contato
              </Text>

              <Heading className="m-0 text-[26px] font-semibold leading-[32px] text-white">
                Nova mensagem recebida
              </Heading>

              <Text className="m-0 mt-2 text-[13px] leading-[20px] text-[#b9b3a8]">
                {companyName}
              </Text>
            </Container>
          </Section>

          {/* DESTAQUE DOURADO */}
          <Section className="h-[4px] w-full bg-gold" />

          {/* CONTEÚDO PRINCIPAL */}
          <Section className="w-full px-4 py-8">
            <Container className="mx-auto w-full max-w-[600px] overflow-hidden rounded-xl border border-line bg-white">
              {/* ALERTA */}
              <Section className="border-b border-gold/20 bg-gold-pale px-6 py-4">
                <Row>
                  <Column className="w-[28px] align-middle">
                    <Text className="m-0 text-[18px] leading-[20px]">!</Text>
                  </Column>

                  <Column className="align-middle">
                    <Text className="m-0 text-[13px] font-semibold leading-[20px] text-ink">
                      Ação necessária
                    </Text>

                    <Text className="m-0 mt-0.5 text-[12px] leading-[18px] text-ink-light">
                      Responda a esta mensagem o quanto antes.
                    </Text>
                  </Column>
                </Row>
              </Section>

              {/* CONTEÚDO */}
              <Section className="px-6 py-7">
                {/* INFORMAÇÕES DO CONTATO */}
                <Section className="mb-7 rounded-lg border border-line bg-paper px-5 py-4">
                  <Text className="m-0 mb-4 text-[10px] font-semibold uppercase tracking-[1.5px] text-ink-muted">
                    Informações do contato
                  </Text>

                  <Row className="mb-2">
                    <Column className="w-[100px] align-top">
                      <Text className="m-0 text-[12px] leading-[20px] text-ink-muted">
                        Nome
                      </Text>
                    </Column>

                    <Column className="align-top">
                      <Text className="m-0 text-[13px] font-semibold leading-[20px] text-ink">
                        {contact.name}
                      </Text>
                    </Column>
                  </Row>

                  <Row className="mb-2">
                    <Column className="w-[100px] align-top">
                      <Text className="m-0 text-[12px] leading-[20px] text-ink-muted">
                        E-mail
                      </Text>
                    </Column>

                    <Column className="align-top">
                      <Link
                        href={`mailto:${contact.email}`}
                        className="text-[13px] leading-[20px] text-gold-dark underline"
                      >
                        {contact.email}
                      </Link>
                    </Column>
                  </Row>

                  {contact.phone && (
                    <Row className="mb-2">
                      <Column className="w-[100px] align-top">
                        <Text className="m-0 text-[12px] leading-[20px] text-ink-muted">
                          Telefone
                        </Text>
                      </Column>

                      <Column className="align-top">
                        <Link
                          href={`tel:${contact.phone}`}
                          className="text-[13px] leading-[20px] text-gold-dark underline"
                        >
                          {contact.phone}
                        </Link>
                      </Column>
                    </Row>
                  )}

                  <Row>
                    <Column className="w-[100px] align-top">
                      <Text className="m-0 text-[12px] leading-[20px] text-ink-muted">
                        Recebido em
                      </Text>
                    </Column>

                    <Column className="align-top">
                      <Text className="m-0 text-[13px] leading-[20px] text-ink-light">
                        {formattedDate}
                      </Text>
                    </Column>
                  </Row>
                </Section>

                {/* ASSUNTO */}
                <Section className="mb-7">
                  <Text className="m-0 mb-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-ink-muted">
                    Assunto
                  </Text>

                  <Text className="m-0 text-[17px] font-semibold leading-[24px] text-ink">
                    {contact.subject}
                  </Text>
                </Section>

                {/* MENSAGEM */}
                <Section>
                  <Text className="m-0 mb-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-ink-muted">
                    Mensagem
                  </Text>

                  <Section className="rounded-lg border border-line bg-paper px-5 py-4">
                    <Text className="m-0 whitespace-pre-wrap text-[14px] leading-[22px] text-ink">
                      {contact.message}
                    </Text>
                  </Section>
                </Section>
              </Section>

              <Hr className="m-0 border-0 border-t border-solid border-line" />

              {/* AÇÕES RÁPIDAS */}
              <Section className="bg-paper px-6 py-6">
                <Text className="m-0 mb-4 text-[10px] font-semibold uppercase tracking-[1.5px] text-ink-muted">
                  Ações rápidas
                </Text>

                <Row>
                  <Column className="pr-2">
                    <Button
                      href={`mailto:${contact.email}`}
                      className="block rounded-md bg-gold px-5 py-3 text-center text-[13px] font-semibold leading-[18px] text-ink no-underline"
                    >
                      Responder por e-mail
                    </Button>
                  </Column>

                  {contact.phone && (
                    <Column className="pl-2">
                      <Button
                        href={`tel:${contact.phone}`}
                        className="block rounded-md border border-ink bg-ink px-5 py-3 text-center text-[13px] font-semibold leading-[18px] text-white no-underline"
                      >
                        Ligar agora
                      </Button>
                    </Column>
                  )}
                </Row>
              </Section>
            </Container>
          </Section>

          {/* RODAPÉ */}
          <Section className="w-full px-6 pb-8">
            <Container className="mx-auto w-full max-w-[600px]">
              <Section className="text-center">
                <Text className="m-0 text-[11px] leading-[18px] text-ink-muted">
                  Esta é uma notificação interna do sistema de contatos da{" "}
                  <span className="font-semibold text-ink">{companyName}</span>.
                </Text>

                <Text className="m-0 mt-1 text-[11px] leading-[18px] text-ink-muted">
                  Não responda a este e-mail.
                </Text>
              </Section>
            </Container>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ContactInternal;
