"use client";

import { Service, ServicesPage } from "@/sanity/lib/types";
import { Box, Container, Stack } from "@chakra-ui/react";
import { ServiceCard } from "../blocks";
import useResponsiveImage from "@/hooks/use-responsive-image";
import { urlFor } from "@/lib/imageUrl";

type ServicesContentProps = {
  page: ServicesPage;
  services: Service[];
};

function ServicesContent({ page, services }: ServicesContentProps) {
  const servicesBannerImage = useResponsiveImage(
    page.servicesBanner,
    page.servicesBannerMobile,
  );

  return (
    <Box
      as="section"
      py={{ base: "20", md: "28" }}
      backgroundImage={`url(${urlFor(servicesBannerImage)?.quality(100)?.url()})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="40% 20%"
      backgroundAttachment="fixed"
    >
      <Container maxW="8xl" px={{ base: "5", md: "8" }}>
        <Stack gap="0">
          {services.map((service, index) => (
            <ServiceCard index={index} key={service._id} service={service} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default ServicesContent;
