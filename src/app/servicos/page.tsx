import { Box, Container, Stack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { ClosingCta, PageHero, ServiceCard } from "@/components/site/blocks";
import {
  getServices,
  getServicesPage,
  getSettings,
} from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";
import ServicesContent from "@/components/site/services/services-content";
import { ViewTransition } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getServicesPage(),
    getSettings(),
  ]);
  return createMetadata(page.seo, settings);
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    getServicesPage(),
    getServices(),
  ]);

  return (
    <ViewTransition name="services-page" key={"service"}>
      <PageHero hero={page.hero} />
      <ServicesContent page={page} services={services} />
      <ClosingCta hero={page.closingCta} />
    </ViewTransition>
  );
}
