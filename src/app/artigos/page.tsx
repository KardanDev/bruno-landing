import {Box, Container, SimpleGrid} from '@chakra-ui/react'
import type {Metadata} from 'next'
import {ArticleCard, PageHero} from '@/components/site/blocks'
import {getBlogPage, getPosts, getSettings} from '@/sanity/lib/content'
import {createMetadata} from '@/sanity/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getBlogPage(), getSettings()])
  return createMetadata(page.seo, settings)
}

export default async function ArticlesPage() {
  const [page, posts] = await Promise.all([getBlogPage(), getPosts()])

  return (
    <>
      <PageHero hero={page.hero} />
      <Box as="section" py={{base: '20', md: '28'}}>
        <Container maxW="8xl" px={{base: '5', md: '8'}}>
          <SimpleGrid columns={{base: 1, md: 2, xl: 3}} gap={{base: '12', md: '8'}}>
            {posts.map((post) => <ArticleCard key={post._id} post={post} />)}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  )
}
