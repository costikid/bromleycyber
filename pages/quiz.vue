<template>
  <div class="section-container">
    <!-- Terminal-style header -->
    <AppTerminal>
      <p class="mb-2">Initializing website security assessment module...</p>
      <p class="mb-2">Security scan ready...</p>
    </AppTerminal>

    <h1 class="section-title">Website Security Assessment</h1>
    <p class="mb-8 text-lg">
      This quiz will evaluate your website's security posture and provide recommendations based on industry best practices. 
      All responses are confidential and will be used to generate a personalized security report.
    </p>

    <!-- Quiz Component -->
    <AppSecurityQuiz />
  </div>
</template>

<script setup lang="ts">
import { usePageSeo } from '~/composables/usePageSeo'

usePageSeo({
  title: "Free Website Security Quiz - Check Your Website's Security | Bromley Cyber",
  description:
    "Take our free website security quiz by Costanza Casullo in Bromley. Evaluate your website's security posture and get personalized recommendations to protect your small business website.",
  keywords:
    'website security quiz, cybersecurity assessment Bromley, Costanza Casullo security quiz, free website security check, small business website security, Bromley Cyber security assessment',
  canonicalPath: '/quiz'
})
</script>
