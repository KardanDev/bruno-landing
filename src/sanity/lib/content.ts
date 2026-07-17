import {sanityFetch} from '@/sanity/client'
import {
  ABOUT_PAGE_QUERY,
  BLOG_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
  FAQ_PAGE_QUERY,
  HOME_PAGE_QUERY,
  POST_DETAIL_QUERY,
  POSTS_INDEX_QUERY,
  PRICING_PAGE_QUERY,
  SERVICE_DETAIL_QUERY,
  SERVICES_INDEX_QUERY,
  SERVICES_PAGE_QUERY,
  SETTINGS_QUERY,
} from './queries'
import {
  demoAboutPage,
  demoBlogPage,
  demoContactPage,
  demoFaqPage,
  demoHomePage,
  demoPosts,
  demoPricingPage,
  demoServices,
  demoServicesPage,
  demoSettings,
} from './demo-content'
import type {
  AboutPage,
  BlogPage,
  ContactPage,
  FaqPage,
  HomePage,
  Post,
  PricingPage,
  Service,
  ServicesPage,
  Settings,
} from './types'

async function fetchOrDemo<T>(query: string, fallback: T, params: Record<string, unknown> = {}) {
  try {
    return (await sanityFetch<T | null>(query, params)) ?? fallback
  } catch {
    return fallback
  }
}

export const getSettings = () => fetchOrDemo<Settings>(SETTINGS_QUERY, demoSettings)
export const getHomePage = () => fetchOrDemo<HomePage>(HOME_PAGE_QUERY, demoHomePage)
export const getAboutPage = () => fetchOrDemo<AboutPage>(ABOUT_PAGE_QUERY, demoAboutPage)
export const getBlogPage = () => fetchOrDemo<BlogPage>(BLOG_PAGE_QUERY, demoBlogPage)
export const getServicesPage = () => fetchOrDemo<ServicesPage>(SERVICES_PAGE_QUERY, demoServicesPage)
export const getPricingPage = () => fetchOrDemo<PricingPage>(PRICING_PAGE_QUERY, demoPricingPage)
export const getFaqPage = () => fetchOrDemo<FaqPage>(FAQ_PAGE_QUERY, demoFaqPage)
export const getContactPage = () => fetchOrDemo<ContactPage>(CONTACT_PAGE_QUERY, demoContactPage)
export const getServices = () => fetchOrDemo<Service[]>(SERVICES_INDEX_QUERY, demoServices)
export const getPosts = () => fetchOrDemo<Post[]>(POSTS_INDEX_QUERY, demoPosts)

export async function getService(slug: string) {
  const fallback = demoServices.find((service) => service.slug === slug) ?? null
  return fetchOrDemo<Service | null>(SERVICE_DETAIL_QUERY, fallback, {slug})
}

export async function getPost(slug: string) {
  const fallback = demoPosts.find((post) => post.slug === slug) ?? null
  return fetchOrDemo<Post | null>(POST_DETAIL_QUERY, fallback, {slug})
}
