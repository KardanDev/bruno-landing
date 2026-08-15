import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCta, Eyebrow, FeatureList } from "@/components/site/blocks";
import { CmsImage } from "@/components/site/cms-image";
import { CtaButton } from "@/components/site/cta-button";
import { FaqList } from "@/components/site/faq-list";
import { RichText } from "@/components/site/rich-text";
import { getService, getServicesPage, getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";
import ServiceSlugContent from "@/components/site/services/service-slug-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([
    getService(slug),
    getSettings(),
  ]);
  return createMetadata(service?.seo, settings);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, servicesPage, settings] = await Promise.all([
    getService(slug),
    getServicesPage(),
    getSettings(),
  ]);
  if (!service) notFound();

  return (
    <>
      <ServiceSlugContent
        settings={settings}
        service={service}
        servicesPage={servicesPage}
      />
      <ClosingCta hero={servicesPage.closingCta} />
    </>
  );
}
