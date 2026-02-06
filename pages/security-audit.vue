<template>
  <div>
    
    <div class="section-container">
      <AppTerminal>
        <p class="mb-2">Initializing security audit protocols...</p>
        <p class="mb-2">Scanning for vulnerabilities...</p>
        <p class="mb-2 text-terminal-bright-green">AUDIT SYSTEM READY</p>
      </AppTerminal>

      <h1 class="section-title">Website Security Audits</h1>
      
      <div class="bg-terminal-dark-gray border-l-4 border-terminal-green p-6 mb-8">
        <h2 class="text-2xl mb-4">Website Security Audit Services</h2>
        <p class="mb-4">
          Our website security audits provide a thorough evaluation of your website's security posture, identifying vulnerabilities and weaknesses that could be exploited by attackers.
        </p>
        <p class="mb-4">
          Using industry-standard tools and methodologies alongside custom security checks tailored to your specific website technology, we deliver actionable insights and recommendations to strengthen your website's security.
        </p>
        <p class="mb-4">
          Planning a new website? Consider our <NuxtLink to="/web-development" class="text-terminal-bright-green hover:underline">secure website development services</NuxtLink> to build security in from day one.
        </p>
      </div>

      <div class="bg-terminal-dark-gray border-l-4 border-terminal-bright-green p-6 mb-8">
        <h2 class="text-2xl mb-4">Ready for a Secure Website?</h2>
        <NuxtLink to="/contact" class="terminal-button inline-block">
          Contact Us
        </NuxtLink>
      </div>
    </div>
    
    <AppContactForm />
  </div>
</template>

<script setup lang="ts">
import { usePageSeo } from '~/composables/usePageSeo'
import { buildServiceJsonLd } from '~/seo/schemas'

const securityAuditService = {
  name: "Website Security Audit Services in Bromley",
  description: "Our website security audits provide a thorough evaluation of your website's security posture, identifying vulnerabilities and weaknesses that could be exploited by attackers. Services available for small businesses in Bromley and surrounding areas.",
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

usePageSeo({
  title: 'Website Security Audit Services in Bromley',
  description:
    "Professional website security audits for small businesses in Bromley and surrounding areas. Identify vulnerabilities and protect your website with our thorough security assessment by Costanza Casullo.",
  keywords:
    'website security audit Bromley, vulnerability assessment Bromley, penetration testing Bromley, security audit services, website security testing, WordPress security audit',
  canonicalPath: '/security-audit',
  twitter: {
    title: 'Website Security Audits in Bromley | Costanza Casullo',
    description:
      'Expert website security audits by Costanza Casullo. Protect your small business website from cyber threats in Bromley and surrounding areas.'
  }
}, {
  jsonLd: [buildServiceJsonLd(securityAuditService)]
})
</script>
