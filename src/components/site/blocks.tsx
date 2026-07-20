import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { LuArrowRight, LuCheck } from "react-icons/lu";
import type { PageHero, Post, Service } from "@/sanity/lib/types";
import { AnimatedReveal } from "./animated-reveal";
import { CmsImage } from "./cms-image";
import { CtaButton } from "./cta-button";

export function Eyebrow({
  children,
  color = "ink.900",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <Text
      color={color}
      fontSize="xs"
      fontWeight="700"
      letterSpacing="0.16em"
      textTransform="uppercase"
    >
      {children}
    </Text>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  inverse?: boolean;
}) {
  return (
    <Stack gap="5" maxW="3xl">
      {eyebrow ? (
        <Eyebrow color={inverse ? "gold.300" : "ink.900"}>{eyebrow}</Eyebrow>
      ) : null}
      <Heading
        color={inverse ? "ivory.50" : "ink.900"}
        fontFamily="heading"
        fontSize={{ base: "4xl", md: "6xl" }}
        fontWeight="400"
        letterSpacing="-0.04em"
        lineHeight="0.98"
      >
        {title}
      </Heading>
      {description ? (
        <Text
          color={inverse ? "ivory.200" : "ink.700"}
          fontSize={{ base: "lg", md: "xl" }}
          lineHeight="1.7"
        >
          {description}
        </Text>
      ) : null}
    </Stack>
  );
}

export function PageHero({ hero }: { hero: PageHero }) {
  return (
    <Box
      as="section"
      bg="ink.950"
      color="ivory.50"
      overflow="hidden"
      position="relative"
      py={{ base: "16", md: "24" }}
    >
      <Box
        bg="wine.800"
        borderRadius="full"
        filter="blur(8px)"
        h={{ base: "64", md: "96" }}
        opacity="0.65"
        position="absolute"
        right={{ base: "-40", md: "-16" }}
        top={{ base: "-16", md: "-24" }}
        w={{ base: "64", md: "96" }}
      />
      <Container maxW="8xl" px={{ base: "5", md: "8" }} position="relative">
        <SimpleGrid
          alignItems="center"
          columns={{ base: 1, lg: hero.image ? 2 : 1 }}
          gap={{ base: "12", lg: "16" }}
        >
          <AnimatedReveal>
            <Stack gap="7" maxW={hero.image ? "2xl" : "4xl"}>
              {hero.eyebrow ? (
                <Eyebrow color="gold.300">{hero.eyebrow}</Eyebrow>
              ) : null}
              <Heading
                as="h1"
                fontFamily="heading"
                fontSize={{ base: "5xl", md: "7xl", xl: "8xl" }}
                fontWeight="400"
                letterSpacing="-0.055em"
                lineHeight="0.91"
              >
                {hero.title}
              </Heading>
              {hero.description ? (
                <Text
                  color="ivory.200"
                  fontSize={{ base: "lg", md: "xl" }}
                  lineHeight="1.7"
                  maxW="xl"
                >
                  {hero.description}
                </Text>
              ) : null}
              {hero.cta ? (
                <Box pt="2">
                  <CtaButton cta={hero.cta} tone="light" />
                </Box>
              ) : null}
            </Stack>
          </AnimatedReveal>
          {hero.image ? (
            <AnimatedReveal delay={0.15}>
              <Box
                borderRadius="editorial"
                h={{ base: "80", lg: "112" }}
                overflow="hidden"
                position="relative"
              >
                <CmsImage
                  alt={hero.image.alt}
                  fallbackLabel="MD"
                  height="100%"
                  image={hero.image}
                />
              </Box>
            </AnimatedReveal>
          ) : null}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Box
      as="article"
      borderTopWidth="1px"
      borderColor="border"
      py={{ base: "7", md: "9" }}
    >
      <Flex
        align={{ base: "flex-start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap="6"
        justify="space-between"
      >
        <HStack align="flex-start" gap={{ base: "5", md: "8" }} maxW="3xl">
          <Text
            color="ink.900"
            fontFamily="heading"
            fontSize="2xl"
            fontStyle="italic"
            minW="10"
          >
            {String(index + 1).padStart(2, "0")}
          </Text>
          <Stack gap="3">
            {service.eyebrow ? <Eyebrow>{service.eyebrow}</Eyebrow> : null}
            <Heading
              as="h2"
              color="ink.900"
              fontFamily="heading"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="400"
              letterSpacing="-0.035em"
            >
              {service.title}
            </Heading>
            <Text color="ink.700" fontSize="lg" lineHeight="1.7">
              {service.summary}
            </Text>
          </Stack>
        </HStack>
        <Link
          aria-label={`Conhecer ${service.title}`}
          asChild
          color="ink.900"
          flexShrink="0"
          fontWeight="700"
          textDecoration="none"
          _hover={{ color: "wine.900" }}
        >
          <NextLink href={`/servicos/${service.slug}`}>
            <Box
              borderColor="ink.900"
              borderRadius="full"
              borderWidth="1px"
              p="5"
              _hover={{
                backgroundColor: "ink.900",
                color: "white",
              }}
            >
              <LuArrowRight size={18} />
            </Box>
          </NextLink>
        </Link>
      </Flex>
    </Box>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function ArticleCard({ post }: { post: Post }) {
  return (
    <Box as="article">
      <Box
        bg="wine.900"
        borderRadius="editorial"
        h="56"
        mb="6"
        overflow="hidden"
      >
        <CmsImage
          alt={post.mainImage?.alt ?? post.title}
          fallbackLabel=""
          height="100%"
          image={post.mainImage}
        />
      </Box>
      <Stack gap="3">
        <Text color="ink.900" fontSize="sm" fontWeight="700">
          {formatDate(post.publishedAt)}
        </Text>
        <Heading
          as="h3"
          color="ink.900"
          fontFamily="heading"
          fontSize="3xl"
          fontWeight="400"
          letterSpacing="-0.025em"
          lineHeight="1.05"
        >
          {post.title}
        </Heading>
        <Text color="ink.700" lineHeight="1.7">
          {post.excerpt}
        </Text>
        <Link
          aria-label={`Ler ${post.title}`}
          asChild
          color="ink.900"
          fontWeight="700"
          pt="1"
          textDecoration="none"
        >
          <NextLink href={`/artigos/${post.slug}`}>
            <Box
              borderColor="ink.900"
              borderRadius="full"
              borderWidth="1px"
              p="3"
              w="fit-content"
            >
              <LuArrowRight />
            </Box>
          </NextLink>
        </Link>
      </Stack>
    </Box>
  );
}

export function ClosingCta({ hero }: { hero?: PageHero }) {
  if (!hero) return null;

  return (
    <Box
      as="section"
      bg="ivory.200"
      color="ink.900"
      py={{ base: "16", md: "24" }}
    >
      <Container maxW="8xl" px={{ base: "5", md: "8" }}>
        <Flex
          align={{ base: "flex-start", md: "flex-end" }}
          direction={{ base: "column", md: "row" }}
          gap="8"
          justify="space-between"
        >
          <SectionHeading
            description={hero.description}
            eyebrow={hero.eyebrow}
            title={hero.title}
          />
          {hero.cta ? (
            <Box flexShrink="0">
              <CtaButton cta={hero.cta} tone="dark" />
            </Box>
          ) : null}
        </Flex>
      </Container>
    </Box>
  );
}

export function FeatureList({ items }: { items?: string[] }) {
  if (!items?.length) return null;

  return (
    <Stack gap="4">
      {items.map((item) => (
        <HStack align="flex-start" gap="3" key={item}>
          <Box bg="gold.300" borderRadius="full" color="wine.900" mt="1" p="1">
            <LuCheck size={14} />
          </Box>
          <Text color="ink.700" fontSize="lg">
            {item}
          </Text>
        </HStack>
      ))}
    </Stack>
  );
}

type SocialIconProps = {
  links: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
  };
};

export function SocialIcon({ links }: SocialIconProps) {}
