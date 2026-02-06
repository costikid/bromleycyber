<template>
  <div class="py-12 bg-terminal-black min-h-screen">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Back Navigation -->
      <NuxtLink to="/blog" class="inline-flex items-center text-terminal-green hover:text-terminal-bright-green mb-8 font-mono group">
        <span class="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back
      </NuxtLink>

      <div v-if="pending" class="text-center py-20">
        <div class="inline-block animate-spin text-terminal-green text-4xl mb-4">⠋</div>
        <p class="text-terminal-green">Decrypting file content...</p>
      </div>

      <div v-else-if="error || !post" class="terminal-warning">
        <h3 class="font-bold">ERROR 404: File Not Found</h3>
        <p>The requested log entry could not be located in the archives.</p>
        <NuxtLink to="/blog" class="terminal-button inline-block mt-4 text-sm">Return to Index</NuxtLink>
      </div>

      <article v-else class="terminal-panel p-0 overflow-hidden">
        <!-- Header -->
        <div class="border-b border-terminal-green/30 bg-terminal-medium-gray/50 p-6 md:p-8">
          <div class="flex items-center gap-2 text-xs text-terminal-green/60 font-mono mb-4">
            <span>{{ new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
          </div>
          
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-terminal-green mb-4" v-html="post.title.rendered"></h1>
        </div>

        <!-- Featured Image -->
        <div v-if="post._embedded?.['wp:featuredmedia']?.[0]?.source_url" class="w-full border-b border-terminal-green/30 flex justify-center">
          <NuxtImg
            :src="post._embedded['wp:featuredmedia'][0].source_url"
            :alt="post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered"
            class="max-w-2xl max-h-80 w-full h-auto object-contain"
          />
        </div>

        <!-- Content -->
        <div class="p-6 md:p-8 md:px-12 prose prose-lg prose-invert prose-green max-w-none terminal-content" v-html="post.content.rendered"></div>
      </article>

      <!-- Navigation Footer -->
      <div class="mt-12 border-t border-terminal-green/30 pt-8 flex justify-between text-sm font-mono text-terminal-green/60">
        <div>END_OF_FILE</div>
        <NuxtLink to="/contact" class="hover:text-terminal-green">./contact_admin.sh</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { buildBlogPostSeo, type BlogPostData } from '~/seo/schemas'

const route = useRoute()
const { getPostBySlug } = useWordPress()
const config = useRuntimeConfig()

const slug = route.params.slug as string
const { data: post, pending, error } = await getPostBySlug(slug)

// Enhanced SEO with structured data
if (post.value) {
  const blogPostData: BlogPostData = {
    title: post.value.title.rendered,
    excerpt: post.value.excerpt.rendered,
    content: post.value.content.rendered,
    slug: post.value.slug,
    publishedDate: post.value.date,
    featuredImage: post.value._embedded?.['wp:featuredmedia']?.[0] ? {
      url: post.value._embedded['wp:featuredmedia'][0].source_url,
      alt: post.value._embedded['wp:featuredmedia'][0].alt_text || post.value.title.rendered,
    } : undefined,
    author: post.value._embedded?.author?.[0] ? {
      name: post.value._embedded.author[0].name,
    } : undefined,
  }

  const seo = buildBlogPostSeo(blogPostData, config.public.siteUrl)
  
  // Apply SEO meta tags
  useSeoMeta({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    ogTitle: seo.title,
    ogDescription: seo.description,
    ogImage: seo.ogImage,
    ogUrl: `${config.public.siteUrl}${seo.canonicalPath}`,
    twitterCard: 'summary_large_image',
    twitterTitle: seo.twitter?.title,
    twitterDescription: seo.twitter?.description,
    twitterImage: seo.twitter?.image,
  })

  // Add structured data
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(seo.jsonLd?.()),
      },
    ],
  })
}
</script>

<style>
/* Custom styling for WordPress content - Override prose plugin */
.terminal-content {
  font-family: 'Inter', sans-serif !important;
  font-size: 1.25rem !important; /* 20px */
  line-height: 1.8 !important;
  color: var(--terminal-white) !important;
}

.terminal-content * {
  font-family: 'Inter', sans-serif !important;
}

.terminal-content h1,
.terminal-content h2, 
.terminal-content h3, 
.terminal-content h4,
.terminal-content h5,
.terminal-content h6 {
  color: var(--terminal-green) !important;
  font-family: 'VT323', monospace !important;
  margin-top: 2em !important;
  margin-bottom: 1em !important;
  font-weight: bold !important;
}

.terminal-content h2 {
  font-size: 1.8em !important;
  border-bottom: 1px dashed var(--terminal-green) !important;
  padding-bottom: 0.5em !important;
}

.terminal-content p {
  margin-bottom: 1.5em !important;
  color: var(--terminal-white) !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 1.25rem !important;
  line-height: 1.8 !important;
}

.terminal-content a {
  color: var(--terminal-green) !important;
  text-decoration: underline !important;
  text-underline-offset: 4px !important;
}

.terminal-content a:hover {
  color: var(--terminal-bright-green) !important;
}

.terminal-content ul, 
.terminal-content ol {
  margin-bottom: 1.5em !important;
  padding-left: 1.5em !important;
  color: var(--terminal-white) !important;
  font-family: 'Inter', sans-serif !important;
}

.terminal-content li {
  margin-bottom: 0.5em !important;
  color: var(--terminal-white) !important;
  font-family: 'Inter', sans-serif !important;
}

.terminal-content li::marker {
  color: var(--terminal-green);
}

.terminal-content code {
  background-color: var(--terminal-code-bg);
  color: var(--terminal-yellow);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: monospace;
}

.terminal-content pre {
  background-color: var(--terminal-dark-gray);
  border: 1px solid var(--terminal-green);
  padding: 1em;
  overflow-x: auto;
  margin-bottom: 1.5em;
}

.terminal-content pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
}

.terminal-content blockquote {
  border-left: 4px solid var(--terminal-green);
  padding-left: 1em;
  font-style: italic;
  color: var(--terminal-muted-gray);
  margin-bottom: 1.5em;
}

.terminal-content img {
  border: 1px solid var(--terminal-green);
  opacity: 0.9;
  transition: opacity 0.3s;
}

.terminal-content img:hover {
  opacity: 1;
}
</style>
