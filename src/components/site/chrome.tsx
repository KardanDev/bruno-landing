"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextLink from "next/link";
import { useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

import type { Settings } from "@/sanity/lib/types";
import { navigationLinks } from "@/utils/constants";
import { CtaButton } from "./cta-button";
import { CmsImage } from "./cms-image";
import { BiPhone } from "react-icons/bi";
import { GrMail } from "react-icons/gr";
import { MdSend } from "react-icons/md";
import { Tooltip } from "../ui/tooltip";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

type Props = { settings: Settings };

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
            <Stack
              gap="4"
              maxW="lg"
              alignItems={{
                base: "center",
                md: "start",
              }}
            >
              {settings?.siteLogo ? (
                <CmsImage image={settings.siteLogo} width={400} height={400} />
              ) : (
                <Text
                  fontFamily="heading"
                  fontSize={{ base: "4xl", md: "5xl" }}
                  fontWeight="400"
                  lineHeight="0.95"
                >
                  {settings.siteName}
                </Text>
              )}

              <Text color="ivory.200" fontSize="lg" lineHeight="1.7">
                {settings.tagline}
              </Text>
            </Stack>
            <VStack
              w={{
                base: "full",
                md: "1/3",
              }}
              alignItems="start"
            >
              <Text as="h1" fontSize={"xl"}>
                Sign up to our newsletter!
              </Text>
              <form style={{ width: "100%" }}>
                <HStack>
                  <Input
                    w="full"
                    type="email"
                    bg="ink.700"
                    borderColor={"border"}
                    color="ivory.300"
                    placeholder="Your email address"
                    _placeholder={{
                      color: "ivory.300",
                    }}
                  />
                  <Tooltip content="Submit email to newsletter" showArrow>
                    <IconButton
                      variant="subtle"
                      bg="ink.700"
                      color="ivory.200"
                      _hover={{
                        backgroundColor: "ink.900",
                        borderColor: "ink.700",
                      }}
                      type="submit"
                    >
                      <Icon as={MdSend} />
                    </IconButton>
                  </Tooltip>
                </HStack>
              </form>
            </VStack>
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
                <Text whiteSpace="pre-line" maxW="lg">
                  {settings.address}
                </Text>
              )}
              {settings.phone && (
                <HStack>
                  <BiPhone />
                  <Text>{settings.phone}</Text>
                </HStack>
              )}
              {settings.email && (
                <HStack>
                  <GrMail />
                  <Text>{settings.email}</Text>
                </HStack>
              )}
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
