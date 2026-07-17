import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-07-16',
  perspective: 'published',
  useCdn: true,
  stega: false,
})

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate = 60,
) {
  return client.fetch<T>(query, params, {next: {revalidate}})
}
