import ContactConfirmation from "@/components/emails/contact-confirmation";
import ContactInternal from "@/components/emails/contact-internal";
import { Settings } from "@/sanity/lib/types";
import { TContactSchema } from "@/utils/schemas";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.EMAIL_FROM ?? "atendimento.drechsleradvocacia.com.br";
const INTERNAL_NOTIFY =
  process.env.INTERNAL_NOTIFY ?? "brunodrechsler@gmail.com";

export async function sendFirstContactEmail(
  contactEmail: TContactSchema,
  siteSettings: Settings,
) {
  await resend.emails.send({
    from: `Lead <leads@${FROM_EMAIL}>`,
    to: INTERNAL_NOTIFY,
    subject: contactEmail.subject,
    react: (
      <ContactInternal
        contact={contactEmail}
        companyName={siteSettings.siteName}
        receivedAt={new Date()}
      />
    ),
  });
}

export async function sendConfirmationEmailToLead(
  contactEmail: TContactSchema,
  siteSettings: Settings,
) {
  await resend.emails.send({
    from: `Confirmação <contact@${FROM_EMAIL}>`,
    to: contactEmail.email,
    subject: "Your email was received",
    react: (
      <ContactConfirmation contact={contactEmail} siteSettings={siteSettings} />
    ),
  });
}
