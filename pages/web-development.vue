<template>
  <div>
    
    <div class="section-container">
      <AppTerminal>
        <p class="mb-2">Initializing secure development environment...</p>
        <p class="mb-2">Loading security protocols...</p>
        <p class="mb-2 text-terminal-brightGreen">SECURE DEVELOPMENT READY</p>
      </AppTerminal>

      <h1 class="section-title">Secure Website Development</h1>
      
      <div class="bg-terminal-darkGray border-l-4 border-terminal-green p-6 mb-8">
        <h2 class="text-2xl mb-4">Security-First Website Development</h2>
        <p class="mb-4">
          At Bromley Cyber, we build websites with security as a foundation, not an afterthought. Our development process integrates security at every stage, ensuring your website is protected against common vulnerabilities from day one.
        </p>
        <p class="mb-4">
          Using industry best practices and the latest secure coding techniques, we create websites that are both visually appealing and robustly protected against cyber threats.
        </p>
      </div>
    </div>
    
    <AppContactForm />
  </div>
</template>

<script setup lang="ts">
import { usePageSeo } from '~/composables/usePageSeo'
import { buildServiceJsonLd, webDevSeo } from '~/seo/schemas'

const webDevService = {
  name: "Secure Website Development in Bromley",
  description: "Security-focused website development for small businesses in Bromley and surrounding areas. We build websites with security as a foundation, not an afterthought, protecting your business from day one.",
  provider: {
    name: "Bromley Cyber Security - Costanza Casullo",
    url: "https://bromleycyber.co.uk"
  },
  areaServed: [
    { name: "Bromley" },
    { name: "London" },
    { name: "Kent" }
  ]
}

usePageSeo(webDevSeo, {
  jsonLd: [buildServiceJsonLd(webDevService)]
})
</script>
