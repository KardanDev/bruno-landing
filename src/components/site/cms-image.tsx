import { Box, Text } from "@chakra-ui/react";
import { SanityImage as ImageComponent } from "sanity-image";
import { SanityImage } from "@/sanity/lib/types";
import { CSSProperties } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/imageUrl";

type CmsImageProps = {
  image?: SanityImage;
  alt?: string;
  sizes?: string;
  height?: number;
  width?: number;
  fallbackLabel?: string;
  priority?: boolean;
  mode?: "cover" | "contain" | "fill";
  style?: CSSProperties;
  fullWidth?: boolean;
};

export function CmsImage({
  image,
  alt,
  height,
  width,
  fallbackLabel = "MD",
  mode,
  style,
  fullWidth,
}: CmsImageProps) {
  if (image?.asset) {
    return (
      <Image
        src={urlFor(image)
          .width(width ?? 600)
          .height(height ?? 450)
          .quality(100)
          .url()}
        alt={alt ?? image.alt ?? fallbackLabel}
        width={width ?? 600}
        height={height ?? 450}
        objectFit={mode ?? "cover"}
        placeholder="blur"
        objectPosition="top"
        style={{
          ...style,
          ...(fullWidth && {
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }),
          ...(mode && { objectFit: mode }),
        }}
      />
    );
  }

  return (
    <Box
      alignItems="center"
      aria-label={alt ?? "Image placeholder"}
      bg="wine.900"
      color="ivory.50"
      display="flex"
      h={height}
      justifyContent="center"
      overflow="hidden"
      position="relative"
      role="img"
      w="100%"
      _after={{
        borderColor: "gold.400",
        borderRadius: "full",
        borderWidth: "1px",
        content: '""',
        h: "72%",
        opacity: 0.7,
        position: "absolute",
        transform: "rotate(-18deg)",
        w: "72%",
      }}
    >
      <Text
        fontFamily="heading"
        fontSize={{ base: "6xl", md: "8xl" }}
        fontStyle="italic"
        letterSpacing="-0.08em"
        zIndex="1"
      >
        {fallbackLabel}
      </Text>
    </Box>
  );
}
