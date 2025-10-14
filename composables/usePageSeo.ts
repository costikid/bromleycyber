import type { PageSeo } from "~/seo/schemas"

export const usePageSeo = (
  seo: PageSeo,
  opts?: { jsonLd?: Array<Record<string, any>> }
) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const baseUrl = config.public.siteUrl || config.siteUrl || 'https://bromleycyber.co.uk'
  const canonical = seo.canonicalPath ? `${baseUrl}${seo.canonicalPath}` : `${baseUrl}${route.path}`

  useSeoMeta({
    title: seo.title ? `${seo.title} | Bromley Cyber` : 'Bromley Cyber',
    description: seo.description,
    keywords: seo.keywords,

    // Open Graph
    ogTitle: seo.title,
    ogDescription: seo.description,
    ogImage: seo.ogImage ? `${baseUrl}${seo.ogImage}` : undefined,
    ogUrl: canonical,
    ogType: 'website',

    // Twitter
    twitterTitle: seo.twitter?.title ?? seo.title,
    twitterDescription: seo.twitter?.description ?? seo.description,
    twitterImage: seo.twitter?.image ? `${baseUrl}${seo.twitter.image}` : undefined,
    twitterCard: 'summary_large_image'
  })

  // Canonical
  useHead({
    link: [{ rel: 'canonical', href: canonical }]
  })

  // Structured data (manual JSON-LD injection)
  if (opts?.jsonLd?.length) {
    useHead({
      script: opts.jsonLd.map((entry) => ({
        type: 'application/ld+json',
        innerHTML: JSON.stringify(entry)
      }))
    })
  }
}
