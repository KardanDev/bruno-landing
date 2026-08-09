import { Box, Text } from "@chakra-ui/react";
import { SanityImage as ImageComponent } from "sanity-image";
import { SanityImage } from "@/sanity/lib/types";
import { CSSProperties } from "react";

const baseSanityCdnUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/`;

type CmsImageProps = {
  image?: SanityImage;
  alt?: string;
  sizes?: string;
  height?: number;
  width?: number;
  fallbackLabel?: string;
  priority?: boolean;
  mode?: "cover" | "contain";
  style?: CSSProperties;
};

export function CmsImage({
  image,
  alt,
  height,
  width,
  fallbackLabel = "MD",
  sizes,
  mode = "contain",
  style,
}: CmsImageProps) {
  if (image?.asset) {
    return (
      <ImageComponent
        id={image.asset?._ref ?? image.asset?._id}
        baseUrl={baseSanityCdnUrl}
        alt={image.alt ?? alt}
        width={width}
        height={height}
        mode={mode}
        hotspot={image.hotspot}
        crop={image.crop}
        sizes={sizes}
        style={style}
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
