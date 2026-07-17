import type {Metadata} from 'next'
import type {Seo, Settings} from './types'

export function createMetadata(seo: Seo | undefined, settings: Settings): Metadata {
  const title = seo?.title ?? settings.seo?.title ?? settings.siteName
  const description = seo?.description ?? settings.seo?.description ?? settings.tagline

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}
