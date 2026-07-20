import { defineQuery } from "next-sanity";

const IMAGE_FIELDS = `
  alt,
  crop,
  hotspot,
  asset->{
    _id,
    url,
    metadata {lqip, dimensions {width, height}}
  }
`;

const CTA_FIELDS = "label, href";
const HERO_FIELDS = `eyebrow, title, description, cta{${CTA_FIELDS}}, image{${IMAGE_FIELDS}}`;
const FAQ_FIELDS = "_key, question, answer";
const SERVICE_CARD_FIELDS = `_id, title, "slug": slug.current, eyebrow, summary, heroImage{${IMAGE_FIELDS}}, orderRank`;
const POST_CARD_FIELDS = `_id, title, "slug": slug.current, excerpt, publishedAt, mainImage{${IMAGE_FIELDS}}`;
const SEO_FIELDS = `seo{title, description, image{${IMAGE_FIELDS}}}`;

export const SETTINGS_QUERY = defineQuery(`
  *[_id == "settings"][0]{
    siteLogo,
    siteName,
    tagline,
    monogram,
    primaryCta{${CTA_FIELDS}},
    navigation[]{_key, label, href},
    phone,
    email,
    address,
    mapUrl,
    officeHours,
    socialLinks[]{_key, label, href},
    ${SEO_FIELDS}
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "homePage"][0]{
    hero{${HERO_FIELDS}},
    decorativeSignature,
    introductionEyebrow,
    introductionTitle,
    introductionText,
    servicesEyebrow,
    servicesTitle,
    servicesDescription,
    servicesCta{${CTA_FIELDS}},
    featuredServices[]->{${SERVICE_CARD_FIELDS}},
    timelineEyebrow,
    timelineTitle,
    timelineDescription,
    timeline[]{_key, title, description},
    valuesTitle,
    values[]{_key, title, description},
    faqTitle,
    faqDescription,
    faqCta{${CTA_FIELDS}},
    faqs[]{${FAQ_FIELDS}},
    articlesTitle,
    articlesDescription,
    articlesCta{${CTA_FIELDS}},
    "latestPosts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3]{${POST_CARD_FIELDS}},
    closingCta{${HERO_FIELDS}},
    ${SEO_FIELDS}
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_id == "aboutPage"][0]{
    hero{${HERO_FIELDS}},
    storyEyebrow,
    storyTitle,
    story,
    portrait{${IMAGE_FIELDS}},
    valuesTitle,
    values[]{_key, title, description},
    stats[]{_key, value, label},
    closingCta{${HERO_FIELDS}},
    ${SEO_FIELDS}
  }
`);

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_id == "servicesPage"][0]{hero{${HERO_FIELDS}}, closingCta{${HERO_FIELDS}}, ${SEO_FIELDS}}
`);

export const BLOG_PAGE_QUERY = defineQuery(`
  *[_id == "blogPage"][0]{hero{${HERO_FIELDS}}, ${SEO_FIELDS}}
`);

export const PRICING_PAGE_QUERY = defineQuery(`
  *[_id == "pricingPage"][0]{
    hero{${HERO_FIELDS}},
    plans[]{_key, name, price, description, features, cta{${CTA_FIELDS}}, featured},
    note,
    closingCta{${HERO_FIELDS}},
    ${SEO_FIELDS}
  }
`);

export const FAQ_PAGE_QUERY = defineQuery(`
  *[_id == "faqPage"][0]{
    hero{${HERO_FIELDS}},
    faqs[]{${FAQ_FIELDS}},
    closingCta{${HERO_FIELDS}},
    ${SEO_FIELDS}
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_id == "contactPage"][0]{
    hero{${HERO_FIELDS}},
    form{heading, description, nameLabel, emailLabel, subjectLabel, messageLabel, submitLabel},
    contactNote,
    facebookLink,
    instagramLink,
    linkedInLink,
    whatsappLink,
    ${SEO_FIELDS}
  }
`);

export const SERVICES_INDEX_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(orderRank asc, title asc){${SERVICE_CARD_FIELDS}}
`);

export const SERVICE_DETAIL_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    eyebrow,
    summary,
    heroImage{${IMAGE_FIELDS}},
    body[]{
      ...,
      _type == "inlineImage" => {image{${IMAGE_FIELDS}}, caption}
    },
    features,
    faqTitle,
    faqs[]{${FAQ_FIELDS}},
    cta{${CTA_FIELDS}},
    orderRank,
    ${SEO_FIELDS}
  }
`);

export const POSTS_INDEX_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){${POST_CARD_FIELDS}}
`);

export const POST_DETAIL_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage{${IMAGE_FIELDS}},
    body[]{
      ...,
      _type == "inlineImage" => {image{${IMAGE_FIELDS}}, caption}
    },
    ${SEO_FIELDS}
  }
`);
