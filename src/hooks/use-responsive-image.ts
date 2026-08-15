"use client";

import { SanityImage } from "@/sanity/lib/types";
import { useBreakpointValue } from "@chakra-ui/react";
import { useMemo } from "react";

export default function useResponsiveImage(
  baseImage?: SanityImage,
  mobileImage?: SanityImage,
) {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  return useMemo(() => {
    if (isMobile && mobileImage) {
      return mobileImage;
    }
    return baseImage;
  }, [isMobile, baseImage, mobileImage]);
}
