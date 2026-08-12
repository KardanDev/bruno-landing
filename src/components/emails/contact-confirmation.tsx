import React from "react";
import {
  Tailwind,
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
} from "@react-email/components";
import { TContactSchema } from "@/utils/schemas";
import { Settings } from "@/sanity/lib/types";

type Props = {
  contact: TContactSchema;
  siteSettings: Settings;
};

const ContactConfirmation = ({ contact, siteSettings }: Props) => {
  const websiteUrl = "https://www.drechsleradvocacia.com.br";

  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              ink: {
                50: "#f7f5f2",
                100: "#e6e0d8",
                500: "#3d3126",
                700: "#241a14",
                900: "#17100c",
              },
              gold: {
                300: "#f6d68a",
                400: "#f0c96b",
                500: "#e7b64a",
              },
            },
          },
        },
      }}
    >
      <Html lang="pt-BR">
        <Head />

        <Preview>
          Obrigado por entrar em contato, {contact.name}! Em breve retornaremos.
        </Preview>

        <Body className="m-0 bg-ink-50 font-sans">
          {/* CABEÇALHO */}
          <Section className="w-full bg-ink-900 py-6 text-center">
            <Container className="mx-auto w-full max-w-[600px] px-4">
              <Heading className="m-0 mb-1 text-[24px] font-semibold text-gold-300">
                {siteSettings.siteName}
              </Heading>

              <Text className="m-0 text-[14px] text-ink-100">
                Recebemos sua mensagem
              </Text>
            </Container>
          </Section>

          {/* CARD PRINCIPAL */}
          <Section className="w-full py-6">
            <Container className="mx-auto w-full max-w-[600px] rounded-lg border border-ink-100 bg-white">
              {/* SAUDAÇÃO */}
              <Section className="px-6 pb-5 pt-7">
                <Heading className="m-0 mb-3 text-[22px] font-semibold text-ink-900">
                  Olá, {contact.name}!
                </Heading>

                <Text className="m-0 mb-5 text-[15px] leading-[22px] text-ink-500">
                  Obrigado por entrar em contato! Recebemos sua mensagem e nossa
                  equipe retornará em até{" "}
                  <span className="font-semibold text-ink-900">
                    1 a 2 dias úteis
                  </span>
                  .
                </Text>

                {/* RESUMO DA MENSAGEM */}
                <Section className="mb-5 rounded-md bg-ink-50 px-5 py-4">
                  <Text className="m-0 mb-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-500">
                    Sua mensagem
                  </Text>

                  <Text className="m-0 mb-1 text-[14px] font-semibold text-ink-900">
                    Assunto: {contact.subject}
                  </Text>

                  <Text className="m-0 whitespace-pre-wrap text-[14px] leading-[20px] text-ink-500">
                    {contact.message}
                  </Text>
                </Section>

                {/* DADOS DE CONTATO */}
                <Section className="mb-5 rounded-md bg-ink-50 px-5 py-4">
                  <Text className="m-0 mb-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-500">
                    Dados de contato
                  </Text>

                  <Table>
                    <TableRow>
                      <TableCell className="w-[100px] py-1 text-[13px] text-ink-500">
                        Nome:
                      </TableCell>

                      <TableCell className="py-1 text-[13px] text-ink-900">
                        {contact.name}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="w-[100px] py-1 text-[13px] text-ink-500">
                        E-mail:
                      </TableCell>

                      <TableCell className="py-1 text-[13px] text-ink-900">
                        {contact.email}
                      </TableCell>
                    </TableRow>

                    {contact.phone && (
                      <TableRow>
                        <TableCell className="w-[100px] py-1 text-[13px] text-ink-500">
                          Telefone:
                        </TableCell>

                        <TableCell className="py-1 text-[13px] text-ink-900">
                          {contact.phone}
                        </TableCell>
                      </TableRow>
                    )}
                  </Table>
                </Section>

                {/* PRÓXIMOS PASSOS */}
                <Text className="m-0 mb-1 text-[15px] leading-[22px] text-ink-700">
                  <span className="font-semibold">O que acontece agora?</span>
                </Text>

                <Text className="m-0 text-[14px] leading-[20px] text-ink-500">
                  Nossa equipe analisará sua solicitação e responderá pelo
                  e-mail{" "}
                  <span className="font-semibold text-ink-900">
                    {contact.email}
                  </span>
                  . Se precisar de atendimento imediato, entre em contato
                  conosco pelo telefone{" "}
                  {siteSettings.phone ? (
                    <Link
                      href={`tel:${siteSettings.phone}`}
                      className="text-[14px] text-gold-500 underline"
                    >
                      {siteSettings.phone}
                    </Link>
                  ) : (
                    "do nosso escritório"
                  )}
                  .
                </Text>
              </Section>

              <Hr className="m-0 border-0 border-t border-ink-100" />

              {/* RODAPÉ DO CARD */}
              <Section className="bg-ink-50 px-6 py-5">
                <Text className="m-0 mb-3 text-[14px] leading-[20px] text-ink-500">
                  Atenciosamente,
                  <br />
                  <span className="font-semibold text-ink-900">
                    Equipe {siteSettings.siteName}
                  </span>
                </Text>

                <Link
                  href={websiteUrl}
                  className="text-[14px] text-gold-500 underline"
                >
                  {websiteUrl}
                </Link>
              </Section>
            </Container>
          </Section>

          {/* RODAPÉ EXTERNO */}
          <Section className="w-full pb-8">
            <Container className="mx-auto w-full max-w-[600px] px-4 text-center">
              <Text className="m-0 text-[12px] leading-[18px] text-ink-400">
                Este é um e-mail automático de confirmação. Por favor, não
                responda a esta mensagem.
                {siteSettings?.email && (
                  <>
                    {" "}
                    Para entrar em contato conosco, envie um e-mail para{" "}
                    <Link
                      href={`mailto:${siteSettings.email}`}
                      className="text-[12px] text-ink-500 underline"
                    >
                      {siteSettings.email}
                    </Link>
                    .
                  </>
                )}
              </Text>
            </Container>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  );
};

// Helpers de tabela compatíveis com Tailwind
const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="w-full border-collapse">
    <tbody>{children}</tbody>
  </table>
);

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr>{children}</tr>
);

const TableCell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <td className={className}>{children}</td>;

export default ContactConfirmation;
