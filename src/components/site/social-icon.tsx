import { SocialIconMap } from "@/utils/constants";
import { SocialIconType } from "@/utils/types";
import { IconButton } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";

type Props = {
  icon: SocialIconType;
  href: LinkProps["href"];
};

const SocialIcon = ({ icon, href }: Props) => {
  const IconComponent = SocialIconMap[icon];

  return (
    <IconButton
      aria-label={icon}
      rounded="full"
      asChild
      variant="surface"
      bg="ink.700"
      borderColor="gold.400"
      color="gold.400"
      _hover={{
        backgroundColor: "gold.400",
        color: "ivory.50",
      }}
    >
      <Link href={href}>
        <IconComponent />
      </Link>
    </IconButton>
  );
};

export default SocialIcon;
