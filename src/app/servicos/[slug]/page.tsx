import {Box, Container, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/react'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {ClosingCta, Eyebrow, FeatureList} from '@/components/site/blocks'
import {CmsImage} from '@/components/site/cms-image'
import {CtaButton} from '@/components/site/cta-button'
import {FaqList} from '@/components/site/faq-list'
import {RichText} from '@/components/site/rich-text'
import {getService, getServicesPage, getSettings} from '@/sanity/lib/content'
import {createMetadata} from '@/sanity/lib/metadata'

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params
  const [service, settings] = await Promise.all([getService(slug), getSettings()])
  return createMetadata(service?.seo, settings)
}

export default async function ServiceDetailPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const [service, servicesPage] = await Promise.all([getService(slug), getServicesPage()])
  if (!service) notFound()

  return (
    <>
      <Box as="section" bg="ink.950" color="ivory.50" py={{base: '16', md: '24'}}>
        <Container maxW="8xl" px={{base: '5', md: '8'}}>
          <SimpleGrid alignItems="center" columns={{base: 1, lg: 2}} gap={{base: '12', lg: '16'}}>
            <Stack gap="7">
              {service.eyebrow ? <Eyebrow color="gold.300">{service.eyebrow}</Eyebrow> : null}
              <Heading as="h1" fontFamily="heading" fontSize={{base: '5xl', md: '7xl'}} fontWeight="400" letterSpacing="-0.055em" lineHeight="0.92">{service.title}</Heading>
              <Text color="ivory.200" fontSize={{base: 'lg', md: 'xl'}} lineHeight="1.75">{service.summary}</Text>
              {service.cta ? <Box pt="2"><CtaButton cta={service.cta} tone="light" /></Box> : null}
            </Stack>
            <Box borderRadius="editorial" h={{base: '80', lg: '112'}} overflow="hidden"><CmsImage alt={service.heroImage?.alt ?? service.title} fallbackLabel="MD" height="100%" image={service.heroImage} /></Box>
          </SimpleGrid>
        </Container>
      </Box>
      <Box as="section" py={{base: '20', md: '28'}}>
        <Container maxW="6xl" px={{base: '5', md: '8'}}>
          <SimpleGrid alignItems="start" columns={{base: 1, lg: 2}} gap={{base: '12', lg: '20'}}>
            <RichText value={service.body} />
            <Box bg="surface" borderRadius="editorial" p={{base: '7', md: '9'}}><Heading as="h2" fontFamily="heading" fontSize="3xl" fontWeight="400" mb="6">O que está incluído</Heading><FeatureList items={service.features} /></Box>
          </SimpleGrid>
        </Container>
      </Box>
      {service.faqs?.length ? <Box as="section" bg="surface" py={{base: '20', md: '28'}}><Container maxW="6xl" px={{base: '5', md: '8'}}><Heading as="h2" fontFamily="heading" fontSize={{base: '4xl', md: '5xl'}} fontWeight="400" mb="10">{service.faqTitle ?? 'Perguntas frequentes'}</Heading><FaqList items={service.faqs} /></Container></Box> : null}
      <ClosingCta hero={servicesPage.closingCta} />
    </>
  )
}
