import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import type { Cta } from "@/sanity/lib/types";

type CtaButtonProps = {
  cta: Cta;
  tone?: "dark" | "light" | "outline";
};

export function CtaButton({ cta, tone = "dark" }: CtaButtonProps) {
  const isExternal =
    cta.href.startsWith("http") || cta.href.startsWith("mailto:");
  const styles =
    tone === "light"
      ? { bg: "ivory.50", color: "gold.300", _hover: { bg: "ivory.200" } }
      : tone === "outline"
        ? {
            bg: "transparent",
            borderWidth: "1px",
            borderColor: "gold.300",
            color: "gold.300",
            _hover: { bg: "ink.900", color: "ivory.200" },
          }
        : { bg: "gold.400", color: "ivory.50", _hover: { bg: "gold.300" } };

  const label = (
    <>
      {cta.label}
      <LuArrowUpRight />
    </>
  );

  if (isExternal) {
    return (
      <Button
        asChild
        w={{ base: "full", md: "auto" }}
        borderRadius="full"
        fontWeight="600"
        px="6"
        {...styles}
      >
        <a
          href={cta.href}
          rel={cta.href.startsWith("http") ? "noreferrer" : undefined}
          target={cta.href.startsWith("http") ? "_blank" : undefined}
        >
          {label}
        </a>
      </Button>
    );
  }

  return (
    <Button
      asChild
      w={{ base: "full", md: "auto" }}
      borderRadius="full"
      fontWeight="600"
      px="6"
      {...styles}
    >
      <NextLink href={cta.href}>{label}</NextLink>
    </Button>
  );
}
