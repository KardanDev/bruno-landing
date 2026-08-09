"use client";

import { CmsImage } from "@/components/site/cms-image";
import { Box } from "@chakra-ui/react";
import {
  useReducedMotion,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import React, { CSSProperties } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  scale = 0.94,
  rotate = 0,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  rotate?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y, scale, rotate, filter: "blur(12px)" }
      }
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 16,
        mass: 0.9,
        delay,
      }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxImage({
  image,
  alt,
  fallbackLabel,
  mode = "cover",
  style,
  useTransformProps = true,
}: {
  image: any;
  alt?: string;
  fallbackLabel?: string;
  mode?: "cover" | "contain";
  style?: CSSProperties;
  useTransformProps?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1.06]);
  const rotate = useTransform(scrollYProgress, [0, 1], ["-2deg", "2deg"]);

  // disable the animations if useTransformProps is false
  if (!useTransformProps) {
    return (
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <CmsImage
          alt={alt}
          fallbackLabel={fallbackLabel}
          image={image}
          style={{ width: "100%", height: "100%", objectFit: mode, ...style }}
        />
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ width: "100%", height: "100%" }}>
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          y: reduceMotion ? 0 : y,
          scale: reduceMotion ? 1 : scale,
          rotate: reduceMotion ? "0deg" : rotate,
        }}
      >
        <CmsImage
          alt={alt}
          fallbackLabel={fallbackLabel}
          mode={mode}
          image={image}
          style={{ width: "100%", height: "100%", ...style }}
        />
      </motion.div>
    </motion.div>
  );
}

export function FloatingOrbs() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.div
        aria-hidden
        initial={
          reduceMotion
            ? false
            : { opacity: 0, scale: 0.7, x: 60, y: -30, rotate: -18 }
        }
        animate={
          reduceMotion
            ? undefined
            : { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }
        }
        transition={{ type: "spring", stiffness: 45, damping: 14 }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <Box
          bg="wine.800"
          borderRadius="full"
          filter="blur(28px)"
          h={{ base: "72", md: "120" }}
          opacity="0.8"
          position="absolute"
          right={{ base: "-48", md: "-8" }}
          top={{ base: "-18", md: "-20" }}
          w={{ base: "72", md: "120" }}
        />
        <Box
          bg="gold.300"
          borderRadius="full"
          filter="blur(40px)"
          h={{ base: "40", md: "72" }}
          opacity="0.18"
          position="absolute"
          right={{ base: "10", md: "12" }}
          top={{ base: "18", md: "24" }}
          w={{ base: "40", md: "72" }}
        />
        <Box
          bg="ivory.200"
          borderRadius="full"
          filter="blur(60px)"
          h={{ base: "28", md: "44" }}
          opacity="0.08"
          position="absolute"
          left={{ base: "-10", md: "8" }}
          bottom={{ base: "10", md: "14" }}
          w={{ base: "28", md: "44" }}
        />
      </motion.div>
    </>
  );
}

export function MotionWrapper({
  children,
  delay = 0,
  y = 40,
  scale = 0.88,
  rotate = 0,
  once = true,
  amount = 0.22,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y, scale, rotate, filter: "blur(12px)" }
      }
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }
      }
      viewport={{ once, amount }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 18,
        mass: 0.9,
        delay,
      }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}
