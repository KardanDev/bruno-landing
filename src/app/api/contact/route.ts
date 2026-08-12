import {
  sendConfirmationEmailToLead,
  sendFirstContactEmail,
} from "@/lib/emails";
import { getSettings } from "@/sanity/lib/content";
import { contactSchema } from "@/utils/schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { error, data: contactForm } = contactSchema.safeParse(body);

    if (error) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
      });
    }

    const siteSettings = await getSettings();

    await sendFirstContactEmail(contactForm, siteSettings);
    await sendConfirmationEmailToLead(contactForm, siteSettings);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to parse request body" }),
      { status: 400 },
    );
  }
}
