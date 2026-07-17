import {Box, Container, Stack} from '@chakra-ui/react'
import type {Metadata} from 'next'
import {ClosingCta, PageHero, ServiceCard} from '@/components/site/blocks'
import {getServices, getServicesPage, getSettings} from '@/sanity/lib/content'
import {createMetadata} from '@/sanity/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getServicesPage(), getSettings()])
  return createMetadata(page.seo, settings)
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([getServicesPage(), getServices()])

  return (
    <>
      <PageHero hero={page.hero} />
      <Box as="section" py={{base: '20', md: '28'}}>
        <Container maxW="8xl" px={{base: '5', md: '8'}}>
          <Stack gap="0">
            {services.map((service, index) => <ServiceCard index={index} key={service._id} service={service} />)}
          </Stack>
        </Container>
      </Box>
      <ClosingCta hero={page.closingCta} />
    </>
  )
}
