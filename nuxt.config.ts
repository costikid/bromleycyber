// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  spaLoadingTemplate: false,
  
  // Server configuration
  devServer: {
    port: 3001,
    host: '0.0.0.0' // Allow connections from any IP
  },

  // App configuration
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/'
  },

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap'
  ],
  
  // Nitro configuration
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/contact', '/privacy', '/quiz']
    },
    routeRules: {
      // API routes configuration - server-side only
      '/api/**': { 
        cors: true,
        headers: { 
          'access-control-allow-methods': 'GET,POST,OPTIONS',
          'access-control-allow-origin': '*',
          'access-control-allow-headers': 'Content-Type'
        }
      }
    }
  },

  // Google Fonts configuration
  googleFonts: {
    families: {
      VT323: true
    }
  },

  // Site configuration for SEO modules
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://bromleycyber.co.uk',
    name: 'Bromley Cyber Security',
    description: 'Website security services for small businesses in Bromley by Costanza Casullo',
    defaultLocale: 'en',
    trailingSlash: true
  },

  // Sitemap configuration
  sitemap: {
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://bromleycyber.co.uk',
    strictNuxtContentPaths: true,
    autoLastmod: true,
    exclude: ['/admin/**'],
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    },
    urls: [
      { loc: '/', changefreq: 'daily', priority: 1.0 },
      { loc: '/security-audit', changefreq: 'weekly', priority: 0.8 },
      { loc: '/web-development', changefreq: 'weekly', priority: 0.8 },
      { loc: '/contact', changefreq: 'monthly', priority: 0.7 },
      { loc: '/quiz', changefreq: 'monthly', priority: 0.6 }
    ]
  },

  // Robots.txt configuration
  robots: {
    userAgents: '*',
    disallow: ['/admin', '/api'],
    sitemap: (process.env.NUXT_PUBLIC_SITE_URL || 'https://bromleycyber.co.uk') + '/sitemap.xml'
  },

  // CSS configuration
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    notificationEmail: process.env.NOTIFICATION_EMAIL || 'costanza@bromleywebworks.co.uk',
    siteUrl: process.env.NUXT_SITE_URL || 'https://bromleycyber.co.uk',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || process.env.NUXT_SITE_URL || 'https://bromleycyber.co.uk'
    }
  }
})