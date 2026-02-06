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
    buildAssetsDir: '/_nuxt/',
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/seo',
    'nuxt-security'
  ],

  // @ts-expect-error - nuxt-security module types not yet loaded
  security: {
    headers: {
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true
      },
      xContentTypeOptions: 'nosniff',
      xFrameOptions: 'SAMEORIGIN',
      xXSSProtection: '1; mode=block',
      referrerPolicy: 'strict-origin-when-cross-origin'
    },
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 60000,
      headers: true,
      driver: {
        name: 'lruCache'
      },
      throwError: false
    },
    requestSizeLimiter: {
      maxRequestSizeInBytes: 2000000,
      maxUploadFileRequestInBytes: 8000000,
      throwError: false
    },
    xssValidator: {
      throwError: false
    },
    corsHandler: {
      origin: '*',
      methods: ['GET', 'POST', 'OPTIONS'],
      credentials: false
    },
    allowedMethodsRestricter: {
      methods: ['GET', 'POST', 'OPTIONS'],
      throwError: false
    },
    hidePoweredBy: true,
    basicAuth: false,
    enabled: true,
    csrf: false,
    nonce: false,
    removeLoggers: false
  },

  // Image configuration for WordPress subdomain
  image: {
    domains: ['access.bromleycyber.co.uk']
  },

  // Nitro configuration for Vercel
  nitro: {
    preset: 'vercel',
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
      VT323: true,
      'Fira Code': [300, 400, 500, 600, 700],
      Inter: [300, 400, 500, 600, 700]
    }
  },

  // Site configuration for SEO modules
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://bromleycyber.co.uk',
    name: 'Bromley Cyber Security',
    description: 'Website security services for small businesses in Bromley by Costanza Casullo',
    defaultLocale: 'en',
    trailingSlash: false
  },

  // Sitemap configuration
  sitemap: {
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://bromleycyber.co.uk',
    strictNuxtContentPaths: false,
    autoLastmod: true,
    exclude: ['/admin/**'],
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    },
    urls: async () => {
      const staticUrls = [
        { loc: '/', changefreq: 'daily', priority: 1.0 },
        { loc: '/security-audit', changefreq: 'weekly', priority: 0.8 },
        { loc: '/web-development', changefreq: 'weekly', priority: 0.8 },
        { loc: '/contact', changefreq: 'monthly', priority: 0.7 },
        { loc: '/quiz', changefreq: 'monthly', priority: 0.6 },
        { loc: '/blog', changefreq: 'daily', priority: 0.9 }
      ]

      try {
        const wpUrl = 'https://access.bromleycyber.co.uk'
        const response = await fetch(`${wpUrl}?rest_route=/wp/v2/posts&per_page=100`)
        const posts = await response.json()
        
        const blogUrls = posts.map((post: any) => ({
          loc: `/blog/${post.slug}`,
          lastmod: post.modified,
          changefreq: 'monthly',
          priority: 0.7
        }))

        return [...staticUrls, ...blogUrls]
      } catch (error) {
        console.error('Failed to fetch blog posts for sitemap:', error)
        return staticUrls
      }
    }
  },

  // CSS configuration
  css: ['~/assets/css/main.css'],
  
  // TailwindCSS configuration
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    notificationEmail: process.env.NOTIFICATION_EMAIL || 'info@bromleycyber.co.uk',
    siteUrl: process.env.NUXT_SITE_URL || 'https://bromleycyber.co.uk',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || process.env.NUXT_SITE_URL || 'https://bromleycyber.co.uk',
      wordpressUrl: 'https://access.bromleycyber.co.uk'
    }
  }
})