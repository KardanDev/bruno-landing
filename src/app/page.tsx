import HomeContent from "@/components/site/home/home-content";
import { getHomePage, getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getHomePage(), getSettings()]);
  return createMetadata(page.seo, settings);
}

export default async function Home() {
  const page = await getHomePage();

  return <HomeContent page={page} />;
}
