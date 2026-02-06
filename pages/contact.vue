<template>
  <div>
    
    <div class="section-container">
      <AppTerminal>
        <p class="mb-2">Initializing secure communication channel...</p>
        <p class="mb-2">Communication channel established.</p>
        <p class="mb-2 text-terminal-bright-green">READY TO RECEIVE MESSAGE</p>
      </AppTerminal>

      <h1 class="section-title">Contact Bromley Cyber</h1>
      
      <p class="mb-4 text-lg">
        Have questions about our services? Need help with your website security? 
        Contact our team of security experts today and we'll be happy to assist you.
      </p>
    </div>
    
    <AppContactForm />
  </div>
</template>

<script setup lang="ts">
import { usePageSeo } from '~/composables/usePageSeo'
import { contactSeo } from '~/seo/schemas'

usePageSeo(contactSeo)
</script>
