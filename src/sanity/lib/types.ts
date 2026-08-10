export type Cta = {
  label: string;
  href: string;
};

export type SanityImage = {
  alt?: string;
  asset?: {
    _id?: string;
    url?: string;
    _type: string;
    _ref: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width?: number; height?: number };
    };
  };
  crop?: CropData | null | undefined;
  hotspot?:
    | {
        x: number;
        y: number;
      }
    | null
    | undefined;
};

export type Seo = {
  title?: string;
  description?: string;
  image?: SanityImage;
};

export type PageHero = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: SanityImage;
  imageMobile?: SanityImage;
  cta?: Cta;
};

export type FaqItem = {
  _key: string;
  question: string;
  answer: string;
};

export type TimelineStep = {
  _key: string;
  title: string;
  description: string;
};

export type ValueItem = {
  _key: string;
  title: string;
  description: string;
};

export type Stat = {
  _key: string;
  value: string;
  label: string;
};

export type NavigationItem = {
  _key: string;
  label: string;
  href: string;
};

export type Settings = {
  siteLogo?: SanityImage;
  siteName: string;
  tagline: string;
  monogram?: string;
  primaryCta: Cta;
  navigation: NavigationItem[];
  phone?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  officeHours?: string;
  socialLinks?: NavigationItem[];
  seo?: Seo;
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  eyebrow?: string;
  summary: string;
  heroImage?: SanityImage;
  body?: PortableTextBlock[];
  features?: string[];
  faqTitle?: string;
  faqs?: FaqItem[];
  cta?: Cta;
  orderRank?: number;
  seo?: Seo;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage?: SanityImage;
  publishedAt: string;
  body?: PortableTextBlock[];
  seo?: Seo;
};

export type HomePage = {
  hero: PageHero;
  decorativeSignature?: SanityImage;
  introductionBanner?: SanityImage;
  introductionBannerMobile?: SanityImage;
  introductionEyebrow?: string;
  introductionTitle: string;
  introductionText: string;
  servicesBanner?: SanityImage;
  servicesBannerMobile?: SanityImage;
  servicesEyebrow?: string;
  servicesTitle: string;
  servicesDescription?: string;
  servicesCta?: Cta;
  featuredServices: Service[];
  timelineBanner?: SanityImage;
  timelineBannerMobile?: SanityImage;
  timelineEyebrow?: string;
  timelineTitle: string;
  timelineDescription?: string;
  timeline: TimelineStep[];
  valuesBanner?: SanityImage;
  valuesBannerMobile?: SanityImage;
  valuesTitle: string;
  values: ValueItem[];
  faqBanner?: SanityImage;
  faqBannerMobile?: SanityImage;
  faqTitle: string;
  faqDescription?: string;
  faqCta?: Cta;
  faqs: FaqItem[];
  articlesBanner?: SanityImage;
  articlesBannerMobile?: SanityImage;
  articlesTitle: string;
  articlesDescription?: string;
  articlesCta?: Cta;
  latestPosts: Post[];
  closingCta?: PageHero;
  seo?: Seo;
};

export type AboutPage = {
  hero: PageHero;
  storyEyebrow?: string;
  storyTitle: string;
  story: PortableTextBlock[];
  portrait?: SanityImage;
  valuesTitle: string;
  values: ValueItem[];
  stats: Stat[];
  closingCta?: PageHero;
  seo?: Seo;
};

export type ServicesPage = {
  hero: PageHero;
  closingCta?: PageHero;
  seo?: Seo;
};

export type BlogPage = {
  hero: PageHero;
  seo?: Seo;
};

export type PricingPlan = {
  _key: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta?: Cta;
  featured?: boolean;
};

export type PricingPage = {
  hero: PageHero;
  plans: PricingPlan[];
  note?: string;
  closingCta?: PageHero;
  seo?: Seo;
};

export type FaqPage = {
  hero: PageHero;
  faqs: FaqItem[];
  closingCta?: PageHero;
  seo?: Seo;
};

export type ContactPage = {
  hero: PageHero;
  form: {
    heading: string;
    description?: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    submitLabel: string;
  };
  contactNote?: string;
  facebookLink?: string;
  instagramLink?: string;
  linkedInLink?: string;
  whatsappLink?: string;
  seo?: Seo;
};
import type { PortableTextBlock } from "next-sanity";
import { CropData } from "sanity-image";
