"use client";

import { AboutPage } from "@/sanity/lib/types";
import { Box, Container, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Eyebrow, SectionHeading } from "../blocks";
import { CmsImage } from "../cms-image";
import { RichText } from "../rich-text";
import useResponsiveImage from "@/hooks/use-responsive-image";
import { urlFor } from "@/lib/imageUrl";

type AboutContentProps = {
  page: AboutPage;
};

function AboutContent({ page }: AboutContentProps) {
  const storyBannerImage = useResponsiveImage(
    page.storyBanner,
    page.storyBannerMobile,
  );
  const valuesBannerImage = useResponsiveImage(
    page.valuesBanner,
    page.valuesBannerMobile,
  );

  return (
    <>
      <Box
        as="section"
        py={{ base: "20", md: "28" }}
        backgroundImage={`url(${urlFor(storyBannerImage)?.quality(100)?.url()})`}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="40% 20%"
        backgroundAttachment={{
          base: "scroll",
          md: "fixed",
        }}
      >
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <SimpleGrid
            alignItems="start"
            columns={{ base: 1, lg: 2 }}
            gap={{ base: "12", lg: "20" }}
          >
            <Stack gap="5">
              <Eyebrow>{page.storyEyebrow}</Eyebrow>
              <SectionHeading title={page.storyTitle} inverse />
              {page.portrait && (
                <Box
                  display={{ base: "none", lg: "block" }}
                  borderRadius="editorial"
                  h="96"
                  mt="6"
                  overflow="hidden"
                >
                  <CmsImage
                    alt={page.portrait?.alt}
                    fallbackLabel="MD"
                    image={page.portrait}
                  />
                </Box>
              )}
            </Stack>
            <Stack gap="8">
              <RichText value={page.story} />
              {page.portrait && (
                <Box
                  display={{ base: "block", lg: "none" }}
                  borderRadius="editorial"
                  h="80"
                  overflow="hidden"
                >
                  <CmsImage
                    alt={page.portrait?.alt}
                    fallbackLabel="MD"
                    image={page.portrait}
                  />
                </Box>
              )}
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
      <Box
        as="section"
        bg="ink.950"
        py={{ base: "20", md: "10" }}
        backgroundImage={`url(${urlFor(valuesBannerImage)?.quality(100)?.url()})`}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="40% 20%"
        backgroundAttachment={"fixed"}
        spaceY={"20"}
      >
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <SectionHeading title={page.valuesTitle} inverse />
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: "8", md: "6" }}
            mt={{ base: "12", md: "16" }}
          >
            {page.values.map((value) => (
              <Stack
                borderTopWidth="1px"
                borderColor="border"
                gap="4"
                key={value._key}
                pt="5"
                textAlign={{
                  base: "center",
                  md: "start",
                }}
              >
                <Text color="ivory.100" fontFamily="heading" fontSize="3xl">
                  {value.title}
                </Text>
                <Text color="ivory.200" lineHeight="1.75">
                  {value.description}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
            {page.stats.map((stat) => (
              <Stack
                key={stat._key}
                textAlign={{
                  base: "center",
                  md: "start",
                }}
              >
                <Text
                  color="gold.300"
                  fontFamily="heading"
                  fontSize={{ base: "5xl", md: "6xl" }}
                  fontStyle="italic"
                >
                  {stat.value}
                </Text>
                <Text color="ivory.200" fontSize="lg">
                  {stat.label}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      {/*<Box
        as="section"
        bg="ink.950"
        color="ivory.50"
        py={{ base: "16", md: "20" }}
      ></Box>*/}
    </>
  );
}

export default AboutContent;
