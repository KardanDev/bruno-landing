"use client";

import { Box } from "@chakra-ui/react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ClosingCta } from "@/components/site/blocks";
import { HomePage } from "@/sanity/lib/types";
import HeroContent from "./hero-content";
import IntroductionContent from "./introduction-content";
import ServicesContent from "./services-content";
import TimelineContent from "./timeline-content";
import ValuesContent from "./values-content";
import ArticlesContent from "./articles-content";
import FaqContent from "./faq-content";

function HomeContent({ page }: { page: HomePage }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const heroGlow = useTransform(progress, [0, 0.18], [0.26, 0.06]);
  const heroScale = useTransform(progress, [0, 0.22], [1, 0.965]);
  const heroBlur = useTransform(progress, [0, 0.22], ["0px", "10px"]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          opacity: heroGlow,
          scale: heroScale,
          filter: heroBlur,
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(circle at 70% 20%, rgba(212,175,55,0.08), transparent 28%), radial-gradient(circle at 20% 80%, rgba(88,17,48,0.12), transparent 30%)",
        }}
      />

      <Box position="relative" zIndex={1}>
        <HeroContent page={page} />

        <IntroductionContent page={page} />

        <ServicesContent page={page} />

        <TimelineContent page={page} />

        <ValuesContent page={page} />
        <ArticlesContent page={page} />

        <FaqContent page={page} />

        <ClosingCta hero={page.closingCta} />
      </Box>
    </>
  );
}

export default HomeContent;
