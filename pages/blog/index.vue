<template>
  <div class="py-12 bg-terminal-black min-h-screen">
    <div class="container mx-auto px-4">
      <div class="terminal-header mb-12">
        <div class="terminal-controls">
          <div class="terminal-circles">
            <div class="terminal-circle bg-red-500"></div>
            <div class="terminal-circle bg-yellow-500"></div>
            <div class="terminal-circle bg-green-500"></div>
          </div>
          <div class="terminal-title text-terminal-green">user@bromleycyber:~/blog</div>
        </div>
        <h1 class="text-4xl font-bold text-terminal-green mb-4">> Security Logs & Updates<span class="animate-pulse">_</span></h1>
        <p class="text-terminal-green/80">Latest insights on web security, WordPress hardening, and cyber threats.</p>
      </div>

      <div v-if="pending" class="text-center py-20">
        <div class="inline-block animate-spin text-terminal-green text-4xl mb-4">⠋</div>
        <p class="text-terminal-green">Loading encrypted data...</p>
      </div>

      <div v-else-if="error" class="terminal-warning">
        <h3 class="font-bold">ERROR: Connection Failed</h3>
        <p>Could not retrieve security logs. Please verify network integrity.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article v-for="post in posts" :key="post.id" class="border border-terminal-green/30 bg-terminal-dark-gray hover:border-terminal-green transition-colors duration-300 flex flex-col h-full group">
          <div v-if="post._embedded?.['wp:featuredmedia']?.[0]?.source_url" class="w-full overflow-hidden border-b border-terminal-green/30 flex justify-center bg-terminal-black">
            <NuxtImg
              :src="post._embedded['wp:featuredmedia'][0].source_url"
              :alt="post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered"
              class="max-h-48 w-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          
          <div class="p-6 flex flex-col flex-grow">
            <div class="text-xs text-terminal-green/60 mb-2 font-mono">
              {{ new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) }}
            </div>
            
            <h2 class="text-xl font-bold text-terminal-green mb-3 group-hover:text-terminal-bright-green">
              <NuxtLink :to="`/blog/${post.slug}`" v-html="post.title.rendered" />
            </h2>
            
            <div class="text-terminal-green/80 text-base mb-4 line-clamp-3 flex-grow" v-html="post.excerpt.rendered"></div>
            
            <NuxtLink :to="`/blog/${post.slug}`" class="inline-flex items-center text-terminal-green hover:text-terminal-bright-green font-mono text-sm mt-auto">
              > READ_LOG
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageSeo } from '~/composables/usePageSeo'

const { getPosts } = useWordPress()

const { data: posts, pending, error } = await getPosts()

usePageSeo({
  title: 'Cybersecurity Blog - Latest Security Tips & Insights',
  description: 'Expert cybersecurity advice for small businesses in Bromley. Learn about WordPress security, website protection, and cyber threat prevention from Costanza Casullo.',
  keywords: 'cybersecurity blog, WordPress security tips, website security advice, Bromley cyber security, small business security',
  canonicalPath: '/blog',
  ogImage: '/images/founder-costanza.png'
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
