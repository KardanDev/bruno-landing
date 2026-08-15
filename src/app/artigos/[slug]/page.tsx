import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/blocks";
import { getPost, getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";
import ArticleSlugContent from "@/components/site/articles/article-slug-content";

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
  if (!post) notFound();

  return (
    <>
      <PageHero
        hero={{
          description: post.excerpt,
          image: post.mainImage,
          title: post.title,
        }}
      />
      <ArticleSlugContent settings={settings} article={post} />
    </>
  );
}
