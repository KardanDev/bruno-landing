import { type LinkProps } from "next/link";
import { SocialIconType } from "./types";
import { ComponentType } from "react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

type TNavigationLink = {
  _key: string;
  label: string;
  href: LinkProps["href"];
};

export const navigationLinks: TNavigationLink[] = [
  { _key: "nav-home", label: "Início", href: "/" },
  { _key: "nav-about", label: "Sobre", href: "/sobre" },
  { _key: "nav-services", label: "Atuação", href: "/servicos" },
  // { _key: "nav-pricing", label: "Honorários", href: "/honorarios" },
  // { _key: "nav-faq", label: "Dúvidas", href: "/duvidas" },
  { _key: "nav-blog", label: "Artigos", href: "/artigos" },
  { _key: "nav-contact", label: "Contato", href: "/contato" },
];

export const SocialIconMap: Record<SocialIconType, ComponentType> = {
  facebook: IconBrandFacebook,
  instagram: IconBrandInstagram,
  linkedin: IconBrandLinkedin,
  whatsapp: IconBrandWhatsapp,
} as const;
