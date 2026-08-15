"use client";

import { Box, Container, Text } from "@chakra-ui/react";
import { RichText } from "../rich-text";
import { Post, Settings } from "@/sanity/lib/types";
import useResponsiveImage from "@/hooks/use-responsive-image";
import { urlFor } from "@/lib/imageUrl";

type ArticleSlugContentProps = {
  settings: Settings;
  article: Post;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function ArticleSlugContent({ settings, article }: ArticleSlugContentProps) {
  const defaultBackground = useResponsiveImage(
    settings.defaultBackground,
    settings.defaultBackgroundMobile,
  );

  return (
    <Box
      as="article"
      py={{ base: "20", md: "28" }}
      backgroundImage={`url(${urlFor(defaultBackground)?.quality(100)?.url()})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="40% 20%"
      backgroundAttachment={{
        base: "scroll",
        md: "fixed",
      }}
      height={"100%"}
      width={"100%"}
    >
      <Container maxW="4xl" px={{ base: "5", md: "8" }}>
        <Text
          color="ivory.200"
          fontSize="sm"
          fontWeight="700"
          mb={{ base: "8", md: "10" }}
        >
          {formatDate(article.publishedAt)}
        </Text>
        <RichText value={article.body} />
      </Container>
    </Box>
  );
}

export default ArticleSlugContent;
