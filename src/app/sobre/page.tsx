import { Box, Container, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ClosingCta,
  Eyebrow,
  PageHero,
  SectionHeading,
} from "@/components/site/blocks";
import { CmsImage } from "@/components/site/cms-image";
import { RichText } from "@/components/site/rich-text";
import { getAboutPage, getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";
import AboutContent from "@/components/site/about/about-content";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getAboutPage(), getSettings()]);
  return createMetadata(page.seo, settings);
}

export default async function AboutPage() {
  const page = await getAboutPage();

  return (
    <>
      <PageHero hero={page.hero} />
      <AboutContent page={page} />
      <ClosingCta hero={page.closingCta} />
    </>
  );
}
