import type { Metadata } from "next";
import { ClosingCta, PageHero } from "@/components/site/blocks";

import { getAboutPage, getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";
import AboutContent from "@/components/site/about/about-content";
import { ViewTransition } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getAboutPage(), getSettings()]);
  return createMetadata(page.seo, settings);
}

export default async function AboutPage() {
  const page = await getAboutPage();

  return (
    <ViewTransition name="about-page" key="about-page">
      <PageHero hero={page.hero} />
      <AboutContent page={page} />
      <ClosingCta hero={page.closingCta} />
    </ViewTransition>
  );
}
