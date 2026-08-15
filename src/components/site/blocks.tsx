"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import NextLink from "next/link";
import { LuArrowRight, LuCheck } from "react-icons/lu";
import type { PageHero, Post, Service } from "@/sanity/lib/types";
import { AnimatedReveal } from "./animated-reveal";
import { CmsImage } from "./cms-image";
import { CtaButton } from "./cta-button";
import React from "react";
import { MotionWrapper } from "@/utils/animations";
import useResponsiveImage from "@/hooks/use-responsive-image";
import { urlFor } from "@/lib/imageUrl";

function useParallax(distance = 80) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-distance, 0, distance],
  );
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.1]);
  return { ref, y, rotate, scale };
}

export function Eyebrow({
  children,
  color = "ivory.200",
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
      textAlign={{
        base: "center",
        md: "left",
      }}
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
  const reduceMotion = useReducedMotion();

  return (
    <Stack gap="5" maxW="3xl">
      {eyebrow ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18, rotateX: -25 }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }
          }
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow color={inverse ? "gold.300" : "ink.900"}>{eyebrow}</Eyebrow>
        </motion.div>
      ) : null}

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ type: "spring", stiffness: 70, damping: 16 }}
      >
        <Heading
          color={inverse ? "ivory.50" : "ink.900"}
          fontFamily="heading"
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="400"
          letterSpacing="-0.04em"
          lineHeight="0.98"
          textAlign={{
            base: "center",
            md: "left",
          }}
        >
          {title}
        </Heading>
      </motion.div>

      {description ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Text
            color={inverse ? "ivory.200" : "ink.700"}
            fontSize={{ base: "lg", md: "xl" }}
            lineHeight="1.7"
            textAlign={{
              base: "center",
              md: "left",
            }}
          >
            {description}
          </Text>
        </motion.div>
      ) : null}
    </Stack>
  );
}

export function PageHero({ hero }: { hero: PageHero }) {
  const reduceMotion = useReducedMotion();
  const heroParallax = useParallax(140);

  const selectedImage = useResponsiveImage(hero.image, hero.imageMobile);

  return (
    <Box
      as="section"
      bg="ink.950"
      color="ivory.50"
      overflow="hidden"
      position="relative"
      py={{ base: "16", md: "36" }}
      backgroundImage={`url(${urlFor(selectedImage)?.quality(100)?.url()})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="40% 20%"
      backgroundAttachment={"fixed"}
    >
      <Container maxW="8xl" px={{ base: "5", md: "8" }} position="relative">
        <SimpleGrid
          alignItems="center"
          columns={{ base: 1, lg: hero.image ? 2 : 1 }}
          gap={{ base: "12", lg: "16" }}
        >
          <MotionWrapper y={44} scale={0.9} rotate={-4}>
            <Stack gap="7" maxW={hero.image ? "2xl" : "4xl"}>
              {hero.eyebrow ? (
                <MotionWrapper y={16} scale={0.98}>
                  <Eyebrow color="gold.300">{hero.eyebrow}</Eyebrow>
                </MotionWrapper>
              ) : null}

              <MotionWrapper y={34} scale={0.94} rotate={-1}>
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
              </MotionWrapper>

              {hero.description ? (
                <MotionWrapper y={26} scale={0.96}>
                  <Text
                    color="ivory.200"
                    fontSize={{ base: "lg", md: "xl" }}
                    lineHeight="1.7"
                    maxW="xl"
                  >
                    {hero.description}
                  </Text>
                </MotionWrapper>
              ) : null}

              {hero.cta ? (
                <MotionWrapper scale={0.94}>
                  <Box pt="2">
                    <motion.div
                      whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 16,
                      }}
                    >
                      <CtaButton cta={hero.cta} tone="dark" />
                    </motion.div>
                  </Box>
                </MotionWrapper>
              ) : null}
            </Stack>
          </MotionWrapper>
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
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={
        reduceMotion ? false : { opacity: 0, y: 50, rotateX: -18, scale: 0.96 }
      }
      whileInView={
        reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0, scale: 1 }
      }
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 16,
        delay: index * 0.08,
      }}
      whileHover={reduceMotion ? undefined : { y: -10, scale: 1.02 }}
      style={{ transformPerspective: 1200, willChange: "transform, opacity" }}
    >
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
            <motion.div
              initial={
                reduceMotion ? false : { opacity: 0, x: -20, rotate: -8 }
              }
              whileInView={
                reduceMotion ? undefined : { opacity: 1, x: 0, rotate: 0 }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 18,
                delay: index * 0.08 + 0.05,
              }}
            >
              <Text
                color="ivory.200"
                fontFamily="heading"
                fontSize="2xl"
                fontStyle="italic"
                minW="10"
              >
                {String(index + 1).padStart(2, "0")}
              </Text>
            </motion.div>

            <Stack gap="3">
              {service.eyebrow ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 + 0.08 }}
                >
                  <Eyebrow>{service.eyebrow}</Eyebrow>
                </motion.div>
              ) : null}

              <motion.div
                initial={
                  reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }
                }
                whileInView={
                  reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 16,
                  delay: index * 0.08 + 0.12,
                }}
              >
                <Heading
                  as="h2"
                  color="ivory.50"
                  fontFamily="heading"
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="400"
                  letterSpacing="-0.035em"
                >
                  {service.title}
                </Heading>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08 + 0.16 }}
              >
                <Text color="ivory.300" fontSize="lg" lineHeight="1.7">
                  {service.summary}
                </Text>
              </motion.div>
            </Stack>
          </HStack>

          <Link
            aria-label={`Conhecer ${service.title}`}
            asChild
            color="ivory.200"
            flexShrink="0"
            fontWeight="700"
            textDecoration="none"
          >
            <NextLink href={`/servicos/${service.slug}`}>
              <motion.div
                whileHover={
                  reduceMotion ? undefined : { scale: 1.15, rotate: -12 }
                }
                whileTap={reduceMotion ? undefined : { scale: 0.9, rotate: 6 }}
                transition={{ type: "spring", stiffness: 380, damping: 14 }}
              >
                <Box
                  borderColor="ink.800"
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
              </motion.div>
            </NextLink>
          </Link>
        </Flex>
      </Box>
    </motion.article>
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
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={
        reduceMotion ? false : { opacity: 0, y: 56, rotateX: -16, scale: 0.94 }
      }
      whileInView={
        reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0, scale: 1 }
      }
      viewport={{ once: true, amount: 0.18 }}
      transition={{ type: "spring", stiffness: 70, damping: 16 }}
      whileHover={reduceMotion ? undefined : { y: -12, scale: 1.03 }}
      style={{ transformPerspective: 1200, willChange: "transform, opacity" }}
    >
      <Box as="article">
        <Box
          bg="ink.900"
          borderRadius="editorial"
          h="56"
          mb="6"
          overflow="hidden"
        >
          <motion.div
            initial={reduceMotion ? false : { scale: 1.35, opacity: 0.7 }}
            whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 55, damping: 14 }}
            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
            style={{ width: "100%", height: "100%" }}
          >
            <CmsImage
              alt={post.mainImage?.alt ?? post.title}
              fallbackLabel=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                aspectRatio: "1 / 1 ",
              }}
              image={post.mainImage}
            />
          </motion.div>
        </Box>

        <Stack gap="3">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <Text color="gold.300" fontSize="sm" fontWeight="700">
              {formatDate(post.publishedAt)}
            </Text>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 85, damping: 18 }}
          >
            <Heading
              as="h3"
              color="ivory.100"
              fontFamily="heading"
              fontSize="3xl"
              fontWeight="400"
              letterSpacing="-0.025em"
              lineHeight="1.05"
            >
              {post.title}
            </Heading>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <Text color="ivory.200" lineHeight="1.7">
              {post.excerpt}
            </Text>
          </motion.div>

          <Button
            asChild
            variant="outline"
            color="ivory.100"
            _hover={{ color: "ink.900" }}
          >
            <NextLink href={`/artigos/${post.slug}`}>
              <Text fontSize={"sm"}>Ler Artigo</Text>
              <LuArrowRight />
            </NextLink>
          </Button>
        </Stack>
      </Box>
    </motion.article>
  );
}

export function ClosingCta({
  hero,
  inverse = true,
}: {
  hero?: PageHero;
  inverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const selectedImage = useResponsiveImage(hero?.image, hero?.imageMobile);

  if (!hero) return null;

  return (
    <Box
      as="section"
      color="ink.900"
      py={{ base: "16", md: "24" }}
      backgroundImage={`url(${urlFor(selectedImage)?.quality(100)?.url()})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="40% 20%"
      backgroundAttachment={"fixed"}
    >
      <Container maxW="8xl" px={{ base: "5", md: "8" }}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 48, scale: 0.96 }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
          }
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
        >
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
              inverse={inverse}
            />
            {hero.cta ? (
              <Box flexShrink="0">
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.08, y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 16 }}
                >
                  <CtaButton cta={hero.cta} tone="dark" />
                </motion.div>
              </Box>
            ) : null}
          </Flex>
        </motion.div>
      </Container>
    </Box>
  );
}

export function FeatureList({ items }: { items?: string[] }) {
  const reduceMotion = useReducedMotion();

  if (!items?.length) return null;

  return (
    <Stack gap="4">
      {items.map((item, index) => (
        <motion.div
          key={item}
          initial={reduceMotion ? false : { opacity: 0, x: -26, scale: 0.94 }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }
          }
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 18,
            delay: index * 0.06,
          }}
          whileHover={reduceMotion ? undefined : { x: 8 }}
        >
          <HStack align="flex-start" gap="3">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 16 }}
            >
              <Box
                bg="gold.300"
                borderRadius="full"
                color="ink.900"
                mt="1"
                p="1"
              >
                <LuCheck size={14} />
              </Box>
            </motion.div>
            <Text color="ivory.200" fontSize="lg">
              {item}
            </Text>
          </HStack>
        </motion.div>
      ))}
    </Stack>
  );
}
