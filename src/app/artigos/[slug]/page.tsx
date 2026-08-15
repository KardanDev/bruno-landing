import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCta, PageHero } from "@/components/site/blocks";
import { getBlogPage, getPost, getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";
import ArticleSlugContent from "@/components/site/articles/article-slug-content";
import { ViewTransition } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), getSettings()]);
  return createMetadata(post?.seo, settings);
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const settings = await getSettings();
  const articlesPage = await getBlogPage();
  if (!post) notFound();

  return (
    <ViewTransition name="article-slug" key={slug}>
      <PageHero
        hero={{
          description: post.excerpt,
          image: post.mainImage,
          title: post.title,
        }}
      />
      <ArticleSlugContent settings={settings} article={post} />
      <ClosingCta hero={articlesPage.closingCta} />
    </ViewTransition>
  );
}
