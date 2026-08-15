import type { Metadata } from "next";
import { PageHero } from "@/components/site/blocks";
import { getBlogPage, getPosts, getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";
import ArticlesContent from "@/components/site/articles/articles-content";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getBlogPage(), getSettings()]);
  return createMetadata(page.seo, settings);
}

export default async function ArticlesPage() {
  const [page, posts] = await Promise.all([getBlogPage(), getPosts()]);

  return (
    <>
      <PageHero hero={page.hero} />
      <ArticlesContent page={page} articles={posts} />
    </>
  );
}
