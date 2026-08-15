"use client";

import { navigationLinks } from "@/utils/constants";
import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Link as ChakraLink,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MotionValue } from "motion";
import { motion, useTransform, useSpring, useMotionValue } from "motion/react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import {
  LuX,
  LuMenu,
  LuInfo,
  LuBriefcase,
  LuFileText,
  LuMail,
  LuHouse,
  LuCircleHelp,
} from "react-icons/lu";
import { CmsImage } from "./cms-image";
import { CtaButton } from "./cta-button";
import Link from "next/link";
import { Settings } from "@/sanity/lib/types";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { BiHelpCircle, BiHome } from "react-icons/bi";
import { Tooltip } from "../ui/tooltip";

const MotionBox = motion(Box);
const DOCK_ICON_SIZE = 48;
const DOCK_MAGNIFICATION = 56;
const DOCK_DISTANCE = 120;

// Icon mapping for navigation links
const navigationIcons = {
  "nav-home": LuHouse,
  "nav-about": LuInfo,
  "nav-services": LuBriefcase,
  "nav-faq": LuCircleHelp,
  "nav-blog": LuFileText,
  "nav-contact": LuMail,
} as const;

type DockItemProps = {
  href?: string;
  label: string;
  active?: boolean;
  mouseX: MotionValue<number>;
  onClick?: () => void;
  iconKey: keyof typeof navigationIcons;
};

function DockItem({
  href,
  label,
  active,
  mouseX,
  onClick,
  iconKey,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const IconComponent = navigationIcons[iconKey];

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) {
      return Infinity;
    }
    return value - (bounds.left + bounds.width / 2);
  });

  const size = useTransform(
    distance,
    [-DOCK_DISTANCE, 0, DOCK_DISTANCE],
    [DOCK_ICON_SIZE, DOCK_MAGNIFICATION, DOCK_ICON_SIZE],
  );

  const springSize = useSpring(size, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const content = (
    <MotionBox
      ref={ref}
      style={{ height: springSize }} // only constrain height
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      borderRadius="xl"
      px="3"
      overflow="hidden"
      color={active ? "gold.300" : "ivory.100"}
      bg={active ? "whiteAlpha.100" : "transparent"}
      transition="color 0.2s, background-color 0.2s"
      _hover={{ color: "gold.300", bg: "whiteAlpha.100" }}
      minW={`${DOCK_ICON_SIZE}px`} // minimum width
    >
      <HStack gap="2" w="max-content">
        <IconComponent size={18} strokeWidth={2} />
        <Text fontSize="xs" fontWeight="500" whiteSpace="nowrap">
          {label}
        </Text>
      </HStack>
      {active && (
        <Box
          position="absolute"
          bottom="3px"
          left="50%"
          transform="translateX(-50%)"
          w="4px"
          h="4px"
          borderRadius="full"
          bg="gold.300"
        />
      )}
    </MotionBox>
  );

  if (!href) {
    return content;
  }

  return (
    <Tooltip
      positioning={{
        placement: "bottom",
        offset: {
          crossAxis: 0,
          mainAxis: 8,
        },
      }}
      showArrow
      content={<Text>{label}</Text>}
    >
      <ChakraLink
        asChild
        textDecoration="none"
        _hover={{ textDecoration: "none" }}
        onClick={onClick}
      >
        <Link href={href}>{content}</Link>
      </ChakraLink>
    </Tooltip>
  );
}

// Enhanced CTA Button with tooltip
function EnhancedCtaButton({ cta }: { cta: Settings["primaryCta"] }) {
  return (
    <Tooltip
      content={cta?.label || "Get in touch"}
      positioning={{
        placement: "bottom",
      }}
      showArrow
    >
      <Box>
        <CtaButton cta={cta} />
      </Box>
    </Tooltip>
  );
}

type Props = { settings: Settings };

function NavDock({ settings }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      zIndex="1000"
      pointerEvents="none"
      w="full"
      minW="fit-content" // changed from "2xl"
      maxW="calc(100vw - 48px)" // prevent overflow
    >
      <Container px={{ base: "4", md: "6" }} pointerEvents="none">
        <Flex
          position="relative"
          w={"full"}
          justify="center"
          pt={{ base: "3", md: "4" }}
        >
          {/* Desktop floating dock */}
          <MotionBox
            display={{ base: "none", lg: "flex" }}
            alignItems="center"
            justifyContent="start"
            gap="1"
            h="64px"
            px="3"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.200"
            bg="rgba(22, 19, 18, 0.72)"
            backdropFilter="blur(18px)"
            boxShadow="0 10px 40px rgba(0, 0, 0, 0.22)"
            pointerEvents="auto"
            minW="2xl"
            onMouseMove={(event) => {
              mouseX.set(event.clientX);
            }}
            onMouseLeave={() => {
              mouseX.set(Infinity);
            }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Navigation */}
            <HStack gap="1" w="full">
              {navigationLinks.map((item) => (
                <DockItem
                  key={item._key}
                  href={item.href.toString()}
                  label={item.label}
                  active={pathname === item.href}
                  mouseX={mouseX}
                  iconKey={item._key as keyof typeof navigationIcons}
                />
              ))}
            </HStack>

            <Box w="1px" h="28px" mx="2" bg="whiteAlpha.200" />

            {/* Enhanced CTA */}
            <EnhancedCtaButton cta={settings.primaryCta} />
          </MotionBox>

          {/* Mobile floating header */}
          <MotionBox
            display={{ base: "flex", lg: "none" }}
            alignItems="center"
            justifyContent="space-between"
            w="full"
            h="58px"
            px="3"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.200"
            bg="rgba(22, 19, 18, 0.82)"
            backdropFilter="blur(18px)"
            boxShadow="0 10px 35px rgba(0, 0, 0, 0.22)"
            pointerEvents="auto"
          >
            <CmsImage
              image={settings.siteLogo!}
              height={150}
              width={150}
              mode="contain"
            />

            <IconButton
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              variant="ghost"
              color="ivory.100"
              size="md"
              onClick={() => setMenuOpen((value) => !value)}
              _hover={{ bg: "whiteAlpha.100", color: "gold.300" }}
              minW="44px"
              h="44px"
            >
              {menuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
            </IconButton>
          </MotionBox>

          {/* Mobile menu */}
          {menuOpen && (
            <MotionBox
              display={{ base: "block", lg: "none" }}
              position="absolute"
              top="calc(100% + 8px)"
              left="4"
              right="4"
              pointerEvents="auto"
              borderRadius="2xl"
              border="1px solid"
              borderColor="whiteAlpha.200"
              bg="rgba(22, 19, 18, 0.94)"
              backdropFilter="blur(18px)"
              boxShadow="0 15px 50px rgba(0, 0, 0, 0.3)"
              overflow="hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Flex direction="column" gap="1" p="3">
                {navigationLinks.map((item) => {
                  const IconComponent =
                    navigationIcons[item._key as keyof typeof navigationIcons];
                  return (
                    <ChakraLink
                      key={item._key}
                      asChild
                      px="4"
                      py="3"
                      borderRadius="xl"
                      color={pathname === item.href ? "gold.300" : "ivory.50"}
                      fontFamily="heading"
                      fontSize="lg"
                      textDecoration="none"
                      bg={
                        pathname === item.href
                          ? "whiteAlpha.100"
                          : "transparent"
                      }
                      _hover={{
                        textDecoration: "none",
                        bg: "whiteAlpha.100",
                        color: "gold.300",
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      <Link href={item.href}>
                        <Flex alignItems="center" gap="3">
                          <IconComponent size={20} strokeWidth={2} />
                          <Text>{item.label}</Text>
                        </Flex>
                      </Link>
                    </ChakraLink>
                  );
                })}

                <Box pt="2">
                  <CtaButton cta={settings.primaryCta} />
                </Box>
              </Flex>
            </MotionBox>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

export default NavDock;
