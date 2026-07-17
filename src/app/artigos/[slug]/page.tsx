import {Box, Container, Text} from '@chakra-ui/react'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {PageHero} from '@/components/site/blocks'
import {RichText} from '@/components/site/rich-text'
import {getPost, getSettings} from '@/sanity/lib/content'
import {createMetadata} from '@/sanity/lib/metadata'

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params
  const [post, settings] = await Promise.all([getPost(slug), getSettings()])
  return createMetadata(post?.seo, settings)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: 'long', year: 'numeric'}).format(new Date(value))
}

export default async function ArticleDetailPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <>
      <PageHero hero={{description: post.excerpt, image: post.mainImage, title: post.title}} />
      <Box as="article" py={{base: '20', md: '28'}}>
        <Container maxW="4xl" px={{base: '5', md: '8'}}>
          <Text color="wine.700" fontSize="sm" fontWeight="700" mb={{base: '8', md: '10'}}>{formatDate(post.publishedAt)}</Text>
          <RichText value={post.body} />
        </Container>
      </Box>
    </>
  )
}
