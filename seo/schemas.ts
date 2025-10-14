export type PageSeo = {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonicalPath?: string
  twitter?: { title?: string; description?: string; image?: string }
  jsonLd?: Record<string, any> | (() => Record<string, any> | null)
}

export type LocalBusinessData = {
  name: string
  founder: string
  description: string
  url: string
  telephone?: string
  email?: string
  address?: {
    streetAddress?: string
    addressLocality: string
    addressRegion?: string
    postalCode?: string
    addressCountry: string
  }
  geo?: { latitude: number; longitude: number }
  sameAs?: string[]
  openingHours?: string[]
  priceRange?: string
}

export type ServiceData = {
  name: string
  description: string
  provider: { name: string; url: string }
  areaServed: { name: string }[]
}

export const homeSeo: PageSeo = {
  title: 'Bromley Cyber - Website Security Services by Costanza Casullo',
  description:
    "Website security for small businesses in Bromley — I help small business owners protect their websites from common vulnerabilities and hacks. Your site won't just look good — it'll stay online, up to date, and protected from the latest threats.",
  keywords:
    'Bromley Cyber, Costanza Casullo, website security Bromley, cyber security consultant Bromley, local cybersecurity services, small business website security, secure website development Bromley',
  ogImage: '/images/founder-costanza.png',
  canonicalPath: '/',
}

export const contactSeo: PageSeo = {
  title: 'Contact Costanza Casullo - Bromley Cyber Security',
  description:
    'Contact Costanza Casullo at Bromley Cyber Security for expert website security services in Bromley and surrounding areas. Get in touch for a free consultation about your website security needs.',
  keywords:
    'contact Costanza Casullo, Bromley cyber security contact, website security consultant Bromley, contact security expert, small business security help, Bromley website security services',
  canonicalPath: '/contact',
  twitter: {
    title: 'Contact Bromley Cyber Security | Costanza Casullo',
    description:
      'Contact Costanza Casullo for expert website security services in Bromley. Secure your small business website today.'
  }
}

export const webDevSeo: PageSeo = {
  title: 'Secure Website Development in Bromley',
  description:
    'Security-focused website development for small businesses in Bromley by Costanza Casullo. We build secure, professional websites with security integrated at every stage of development.',
  keywords:
    'secure website development Bromley, Costanza Casullo website developer, small business website security, secure web design Bromley, security-first web development',
  canonicalPath: '/web-development',
  twitter: {
    title: 'Secure Website Development | Costanza Casullo',
    description:
      'Expert secure website development by Costanza Casullo in Bromley. Security built-in from day one for small businesses.'
  }
}

export const buildBusinessJsonLd = (business: LocalBusinessData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': business.url,
    name: business.name,
    founder: business.founder,
    description: business.description,
    url: business.url,
    ...(business.telephone && { telephone: business.telephone }),
    ...(business.email && { email: business.email }),
    ...(business.address && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: business.address.addressLocality,
        addressCountry: business.address.addressCountry,
        ...(business.address.streetAddress && { streetAddress: business.address.streetAddress }),
        ...(business.address.addressRegion && { addressRegion: business.address.addressRegion }),
        ...(business.address.postalCode && { postalCode: business.address.postalCode }),
      },
    }),
    ...(business.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
    }),
    ...(business.sameAs && { sameAs: business.sameAs }),
    ...(business.openingHours && { openingHoursSpecification: business.openingHours }),
    ...(business.priceRange && { priceRange: business.priceRange }),
  }
}

export const buildServiceJsonLd = (service: ServiceData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'ProfessionalService',
      name: service.provider.name,
      url: service.provider.url,
    },
    areaServed: service.areaServed.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area.name,
    })),
  }
}
