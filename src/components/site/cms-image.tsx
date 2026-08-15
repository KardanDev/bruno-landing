import { Box, Text } from "@chakra-ui/react";
import { SanityImage as ImageComponent } from "sanity-image";
import { SanityImage } from "@/sanity/lib/types";
import { CSSProperties } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/imageUrl";

type CmsImageProps = {
  image: SanityImage;
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
  const imageUrl = image?.asset
    ? urlFor(image)!.quality(100).url()
    : "/globe";

  return (
    <Image
      src={imageUrl!}
      alt={alt ?? image.alt ?? fallbackLabel}
      width={width ?? 600}
      height={height ?? 450}
      objectFit={mode ?? "cover"}
      objectPosition="center"

      style={{
        ...style,
        ...(fullWidth && {
          height: "100%",
          width: "100%",
          objectFit: mode ?? "cover",
          objectPosition: "center",
        }),
        ...(mode && { objectFit: mode }),
      }}
    />
  );
}
