import {
  Box,
  Container,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Metadata } from "next";
import { ClosingCta, Eyebrow } from "@/components/site/blocks";
import { ContactForm } from "@/components/site/contact-form";
import { getContactPage, getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";
import SocialIcon from "@/components/site/social-icon";
import { MotionWrapper } from "@/utils/animations";
import ContactPage from "@/components/site/contact/contact-page";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getContactPage(), getSettings()]);
  return createMetadata(page.seo, settings);
}

export default async function ContactPageNext() {
  const [page, settings] = await Promise.all([getContactPage(), getSettings()]);

  return (
    <>
      <ContactPage page={page} settings={settings} />
      <ClosingCta hero={page.hero} inverse />
    </>
  );
}
