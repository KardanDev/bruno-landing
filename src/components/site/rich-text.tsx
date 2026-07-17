import {Box, Heading, Link, Text} from '@chakra-ui/react'
import {PortableText, type PortableTextBlock, type PortableTextComponents} from 'next-sanity'
import type {SanityImage} from '@/sanity/lib/types'
import {CmsImage} from './cms-image'

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => (
      <Text color="ink.700" fontSize={{base: 'lg', md: 'xl'}} lineHeight="1.85" mb="6">
        {children}
      </Text>
    ),
    h2: ({children}) => (
      <Heading as="h2" color="ink.900" fontFamily="heading" fontSize={{base: '3xl', md: '4xl'}} fontWeight="400" lineHeight="1.1" mb="5" mt="12">
        {children}
      </Heading>
    ),
    h3: ({children}) => (
      <Heading as="h3" color="ink.900" fontFamily="heading" fontSize={{base: '2xl', md: '3xl'}} fontWeight="400" lineHeight="1.2" mb="4" mt="10">
        {children}
      </Heading>
    ),
    blockquote: ({children}) => (
      <Box borderLeftWidth="2px" borderColor="gold.400" color="wine.800" fontFamily="heading" fontSize={{base: '2xl', md: '3xl'}} fontStyle="italic" lineHeight="1.3" mb="8" mt="8" pl="6">
        {children}
      </Box>
    ),
  },
  list: {
    bullet: ({children}) => <Box as="ul" color="ink.700" fontSize="lg" lineHeight="1.8" mb="6" pl="6">{children}</Box>,
    number: ({children}) => <Box as="ol" color="ink.700" fontSize="lg" lineHeight="1.8" mb="6" pl="6">{children}</Box>,
  },
  listItem: ({children}) => <Box as="li" mb="2">{children}</Box>,
  marks: {
    link: ({children, value}) => {
      const link = value as {href?: string; openInNewTab?: boolean}
      return (
      <Link color="wine.700" href={link.href} rel={link.openInNewTab ? 'noreferrer' : undefined} target={link.openInNewTab ? '_blank' : undefined} textDecoration="underline">
        {children}
      </Link>
      )
    },
  },
  types: {
    inlineImage: ({value}) => {
      const inlineImage = value as {image?: SanityImage; caption?: string}
      return (
        <Box as="figure" my="10">
          <Box borderRadius="editorial" overflow="hidden">
            <CmsImage alt={inlineImage.image?.alt} height="auto" image={inlineImage.image} />
          </Box>
          {inlineImage.caption ? <Text as="figcaption" color="ink.500" fontSize="sm" mt="3">{inlineImage.caption}</Text> : null}
        </Box>
      )
    },
  },
}

export function RichText({value}: {value?: PortableTextBlock[]}) {
  if (!value?.length) return null

  return <PortableText components={components} value={value} />
}
