import { Accordion, Box, Text } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import type { FaqItem } from "@/sanity/lib/types";

export function FaqList({
  items,
  inverse = false,
}: {
  items: FaqItem[];
  inverse?: boolean;
}) {
  if (!items.length) return null;

  return (
    <Accordion.Root collapsible defaultValue={[items[0]._key]}>
      {items.map((item) => (
        <Accordion.Item
          borderBottomWidth="1px"
          borderColor="border"
          key={item._key}
          value={item._key}
        >
          <Accordion.ItemTrigger py={{ base: "5", md: "6" }}>
            <Box as="span" flex="1" pr="6" textAlign="left">
              <Text
                color={inverse ? "ivory.200" : "ink.900"}
                fontFamily="heading"
                fontSize={{ base: "xl", md: "2xl" }}
              >
                {item.question}
              </Text>
            </Box>
            <Accordion.ItemIndicator color={inverse ? "ivory.200" : "ink.900"}>
              <LuPlus />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody pb="6" pr={{ base: "0", md: "16" }}>
              <Text
                color={inverse ? "ivory.200" : "ink.900"}
                fontSize="md"
                lineHeight="1.8"
                whiteSpace="pre-line"
              >
                {item.answer}
              </Text>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
