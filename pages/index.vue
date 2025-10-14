<template>
  <div>
    <div class="section-container">
      <!-- Terminal-style header -->
      <AppTerminal>
        <p class="mb-2">Initializing cyber security system...</p>
        <p class="mb-2">Running diagnostics...</p>
        <p class="mb-2 text-terminal-brightGreen">SYSTEM SECURE</p>
        <p class="mb-2">Welcome to Bromley Cyber</p>
      </AppTerminal>

      <h1 class="section-title">
        Website Security for Small Businesses in Bromley
      </h1>
      
      <!-- Founder Quote and Introduction -->
      <div class="bg-terminal-darkGray border-l-4 border-terminal-green p-6 mb-12">
        <blockquote class="mb-4 text-xl italic">
          "There are countless beautiful websites, but far too few that are truly secure."
        </blockquote>
        <div class="flex justify-end mb-4">
          <div>
            <p class="text-terminal-brightGreen font-bold">Costanza Casullo</p>
            <p>Founder of Bromley Cyber</p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div class="md:col-span-2">
            <p>
              As the founder of Bromley Cyber, I specialise in securing small business websites. 
              I help businesses safeguard their websites against vulnerabilities, ensuring they're not only 
              visually appealing but also protected from cyber risks. Your website's security is my top priority.
            </p>
          </div>
          <div class="flex flex-col items-center">
            <div class="relative w-56 h-56 rounded-full border-2 border-terminal-green image-loading overflow-hidden">
              <NuxtImg 
                src="/images/founder-costanza.png" 
                alt="Costanza Casullo - Founder of Bromley Cyber" 
                class="object-cover h-full w-full image-loaded"
                loading="lazy"
                width="400"
                height="400"
                @load="handleImageLoad"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Security Quiz Teaser -->
      <div class="bg-terminal-darkGray border-l-4 border-terminal-brightGreen p-6 mb-12">
        <h2 class="text-2xl font-bold mb-4">How Secure is Your Website?</h2>
        <p class="mb-6">
          Take our free Website Security Quiz to get a quick assessment of your current security posture and recommendations for improvement.
        </p>
        <NuxtLink to="/quiz" class="terminal-button inline-block">
          Take the Security Quiz
        </NuxtLink>
      </div>

      <!-- Secure Website Development -->
      <div class="bg-terminal-darkGray border-l-4 border-terminal-green p-6 mb-12">
        <h2 class="text-2xl font-bold mb-4">Secure Website Development</h2>
        <p class="mb-4">
          Building new websites with security as a foundation, not an afterthought. Our secure development 
          process ensures your website is protected against common vulnerabilities from day one.
        </p>
        <NuxtLink to="/web-development" class="terminal-button inline-block">
          Learn More
        </NuxtLink>
      </div>
      
      <!-- Website Security Audits -->
      <div class="bg-terminal-darkGray border-l-4 border-terminal-green p-6 mb-12">
        <h2 class="text-2xl font-bold mb-4">Website Security Audits</h2>
        <p class="mb-4">
          Comprehensive evaluation of your website's security posture, identifying vulnerabilities and providing 
          actionable solutions to protect your online presence.
        </p>
        <NuxtLink to="/security-audit" class="terminal-button inline-block">
          Request an Audit
        </NuxtLink>
      </div>
    </div>

    <!-- Contact Form -->
    <Suspense>
      <template #default>
        <AppContactForm />
      </template>
      <template #fallback>
        <div class="bg-terminal-darkGray border border-terminal-green p-6 text-center">
          Loading contact form...
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useBusinessData } from '~/composables/useBusinessData'
import { usePageSeo } from '~/composables/usePageSeo'
import { homeSeo, buildBusinessJsonLd, buildServiceJsonLd } from '~/seo/schemas'

const AppContactForm = defineAsyncComponent(() => import('~/components/AppContactForm.vue'))

const { businessData, securityAuditService, webDevService } = useBusinessData()

// Build structured data from centralized schemas
const jsonLd = [
  buildBusinessJsonLd(businessData),
  buildServiceJsonLd(securityAuditService),
  buildServiceJsonLd(webDevService)
]

// Apply SEO and structured data
usePageSeo(homeSeo, { jsonLd })

const handleImageLoad = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.parentElement?.classList.remove('image-loading')
}
</script>
