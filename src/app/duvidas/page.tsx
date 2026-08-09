import { Box, Container } from "@chakra-ui/react";
import type { Metadata } from "next";
import { ClosingCta, PageHero } from "@/components/site/blocks";
import { FaqList } from "@/components/site/faq-list";
import { getFaqPage, getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getFaqPage(), getSettings()]);
  return createMetadata(page.seo, settings);
}

export default async function FaqPage() {
  const page = await getFaqPage();

  return (
    <>
      <PageHero hero={page.hero} />
      <Box as="section" py={{ base: "20", md: "28" }}>
        <Container maxW="6xl" px={{ base: "5", md: "8" }}>
          <FaqList items={page.faqs} inverse />
        </Container>
      </Box>
      <ClosingCta hero={page.closingCta} />
    </>
  );
}
