import {Box, Container, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/react'
import type {Metadata} from 'next'
import {AnimatedReveal} from '@/components/site/animated-reveal'
import {ClosingCta, FeatureList, PageHero} from '@/components/site/blocks'
import {CtaButton} from '@/components/site/cta-button'
import {getPricingPage, getSettings} from '@/sanity/lib/content'
import {createMetadata} from '@/sanity/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPricingPage(), getSettings()])
  return createMetadata(page.seo, settings)
}

export default async function PricingPage() {
  const page = await getPricingPage()

  return (
    <>
      <PageHero hero={page.hero} />
      <Box as="section" bg="surface" py={{base: '20', md: '28'}}>
        <Container maxW="8xl" px={{base: '5', md: '8'}}>
          <SimpleGrid alignItems="stretch" columns={{base: 1, md: 2, xl: 3}} gap={{base: '6', md: '7'}}>
            {page.plans.map((plan, index) => (
              <AnimatedReveal delay={index * 0.08} key={plan._key}>
                <Stack bg="ivory.50" borderColor={plan.featured ? 'wine.800' : 'border'} borderRadius="editorial" borderWidth={plan.featured ? '2px' : '1px'} color="ink.900" gap="7" h="100%" justify="space-between" p={{base: '7', md: '9'}}>
                  <Stack gap="5">
                    <Stack gap="2">
                      <Heading as="h2" fontFamily="heading" fontSize={{base: '3xl', md: '4xl'}} fontWeight="400" letterSpacing="-0.035em" lineHeight="1">
                        {plan.name}
                      </Heading>
                      <Text color="wine.700" fontFamily="heading" fontSize={{base: '2xl', md: '3xl'}} fontStyle="italic">
                        {plan.price}
                      </Text>
                    </Stack>
                    <Text color="ink.700" fontSize="lg" lineHeight="1.75">
                      {plan.description}
                    </Text>
                    <Box borderTopWidth="1px" borderColor="border" pt="6">
                      <FeatureList items={plan.features} />
                    </Box>
                  </Stack>
                  {plan.cta ? <Box pt="2"><CtaButton cta={plan.cta} /></Box> : null}
                </Stack>
              </AnimatedReveal>
            ))}
          </SimpleGrid>
          {page.note ? <Text color="ink.700" fontSize="sm" lineHeight="1.7" maxW="3xl" mt={{base: '8', md: '10'}}>{page.note}</Text> : null}
        </Container>
      </Box>
      <ClosingCta hero={page.closingCta} />
    </>
  )
}
