"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

import type { Settings } from "@/sanity/lib/types";
import { navigationLinks } from "@/utils/constants";
import { CtaButton } from "./cta-button";
import { CmsImage } from "./cms-image";

gsap.registerPlugin(ScrollTrigger);

export function SiteHeader({ settings }: { settings: Settings }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);

  // useGSAP(() => {
  //   if (!headerRef.current) return;

  //   ScrollTrigger.create({
  //     trigger: document.body,
  //     start: "top -100px",
  //     onEnter: () => {
  //       setScrolledDown(true);
  //       gsap.to(headerRef.current, {
  //         backgroundColor: "#161312",
  //         backdropFilter: "blur(16px)",
  //         boxShadow: "0 4px 16px rgba(0,0,0,0.08)",

  //         duration: 0.25,
  //       });
  //     },
  //     onLeaveBack: () => {
  //       setScrolledDown(false);
  //       gsap.to(headerRef.current, {
  //         backgroundColor: "#161312",
  //         borderColor: "#161312",
  //         backdropFilter: "blur(0px)",
  //         boxShadow: "none",
  //         duration: 0.25,
  //       });
  //     },
  //   });
  // }, []);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="1000"
      bg="#161312"
      borderBottomWidth="1px"
      borderColor="#161312"
      w={"full"}
      transition="background-color .25s ease, border-color .25s ease, backdrop-filter .25s ease, box-shadow .25s ease"
    >
      <Container maxW="8xl" px={{ base: "5", md: "8" }} position="relative">
        <Flex align="center" justify="space-between" minH="20">
          <Link asChild _hover={{ textDecoration: "none" }}>
            <NextLink href="/">
              {!!settings.siteLogo ? (
                <CmsImage image={settings.siteLogo} width={50} height={50} />
              ) : (
                <HStack gap="3">
                  <Flex
                    align="center"
                    bg="ink.700"
                    borderRadius="full"
                    color="ivory.50"
                    fontFamily="heading"
                    fontSize="lg"
                    h="10"
                    justify="center"
                    w="10"
                  >
                    {settings.monogram ??
                      settings.siteName.slice(0, 2).toUpperCase()}
                  </Flex>

                  <Text
                    color="ivory.50"
                    fontFamily="heading"
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="400"
                  >
                    {settings.siteName}
                  </Text>
                </HStack>
              )}
            </NextLink>
          </Link>

          <HStack
            display={{ base: "none", lg: "flex" }}
            gap="10"
            alignItems="center"
          >
            <HStack gap="5">
              {navigationLinks.map((item) => (
                <Link
                  key={item._key}
                  asChild
                  color={pathname === item.href ? "gold.300" : "ivory.50"}
                  fontSize="sm"
                  fontWeight="600"
                  letterSpacing="0.01em"
                  textDecoration="none"
                  _hover={{ color: "gold.300" }}
                >
                  <NextLink href={item.href}>{item.label}</NextLink>
                </Link>
              ))}
            </HStack>

            <CtaButton cta={settings.primaryCta} />
          </HStack>

          <Button
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            bg="transparent"
            color="ink.900"
            display={{ base: "inline-flex", lg: "none" }}
            onClick={() => setMenuOpen((v) => !v)}
            px="2"
            _hover={{ bg: "transparent", color: "gold.300" }}
          >
            {menuOpen ? <LuX /> : <LuMenu />}
          </Button>
        </Flex>

        {menuOpen && (
          <Stack
            borderTopWidth="1px"
            borderColor="border"
            display={{ base: "flex", lg: "none" }}
            gap="1"
            pb="6"
            pt="4"
          >
            {navigationLinks.map((item) => (
              <Link
                key={item._key}
                asChild
                color={pathname === item.href ? "gold.300" : "ink.900"}
                fontFamily="heading"
                fontSize="xl"
                py="2"
                textDecoration="none"
                onClick={() => setMenuOpen(false)}
              >
                <NextLink href={item.href}>{item.label}</NextLink>
              </Link>
            ))}

            <Box pt="4">
              <CtaButton cta={settings.primaryCta} />
            </Box>
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export function SiteFooter({ settings }: { settings: Settings }) {
  return (
    <Box as="footer" bg="ink.950" color="ivory.50" mt="auto">
      <Container
        maxW="8xl"
        px={{ base: "5", md: "8" }}
        py={{ base: "14", md: "20" }}
      >
        <Stack gap={{ base: "12", md: "16" }}>
          <Flex
            align={{ base: "flex-start", md: "flex-end" }}
            direction={{ base: "column", md: "row" }}
            gap="8"
            justify="space-between"
          >
            <Stack gap="4" maxW="lg">
              <Text
                fontFamily="heading"
                fontSize={{ base: "4xl", md: "5xl" }}
                fontWeight="400"
                lineHeight="0.95"
              >
                {settings.siteName}
              </Text>

              <Text color="ivory.200" fontSize="lg" lineHeight="1.7">
                {settings.tagline}
              </Text>
            </Stack>

            <CtaButton cta={settings.primaryCta} tone="light" />
          </Flex>

          <Flex
            borderTopWidth="1px"
            borderColor="ink.700"
            direction={{ base: "column", md: "row" }}
            gap="8"
            justify="space-between"
            pt="8"
          >
            <Stack color="ivory.200" fontSize="sm" gap="2">
              {settings.address && (
                <Text whiteSpace="pre-line">{settings.address}</Text>
              )}
              {settings.phone && <Text>{settings.phone}</Text>}
              {settings.email && <Text>{settings.email}</Text>}
              {settings.officeHours && <Text>{settings.officeHours}</Text>}
            </Stack>

            <Stack align={{ base: "flex-start", md: "flex-end" }} gap="3">
              <HStack flexWrap="wrap" gap="5">
                {(settings.socialLinks ?? []).map((item) => (
                  <Link
                    key={item._key}
                    color="ivory.100"
                    href={item.href}
                    target="_blank"
                    _hover={{ color: "gold.300" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </HStack>

              <Text color="ink.500" fontSize="sm">
                © {new Date().getFullYear()} {settings.siteName}. Todos os
                direitos reservados.
              </Text>
            </Stack>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}
