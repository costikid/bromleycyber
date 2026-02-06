<template>
  <div class="section-container">
    <AppTerminal>
      <p class="mb-2">Loading privacy policy...</p>
      <p class="mb-2">Ensuring data protection compliance...</p>
      <p class="mb-2 text-terminal-bright-green">DOCUMENT VERIFIED</p>
    </AppTerminal>

    <h1 class="section-title">Privacy Policy</h1>
    
    <div class="terminal-panel mb-8">
      <h2 class="text-2xl mb-4">Introduction</h2>
      <p class="mb-4">
        At Bromley Cyber, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
      </p>
      <p>
        This policy applies to information we collect through our website, during security consultations, through our security quiz, and when you contact us via email or phone.
      </p>
    </div>

    <div class="terminal-panel mb-8">
      <h2 class="text-2xl mb-4">Information We Collect</h2>
      <p class="mb-4">
        We may collect the following types of information:
      </p>
      
      <h3 class="text-xl font-bold mb-2">Personal Information</h3>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Name and contact details (email address, phone number)</li>
        <li>Business information (company name, website URL)</li>
        <li>Information provided through our security quiz</li>
        <li>Communication records when you contact us</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-2">Technical Information</h3>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>IP address and browser information</li>
        <li>Cookies and similar tracking technologies</li>
        <li>Website usage data</li>
      </ul>
    </div>

    <div class="terminal-panel mb-8">
      <h2 class="text-2xl mb-4">How We Use Your Information</h2>
      <p class="mb-4">
        We use the collected information for the following purposes:
      </p>
      
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>To provide and improve our cybersecurity services</li>
        <li>To respond to your inquiries and requests</li>
        <li>To provide personalized security recommendations based on quiz responses</li>
        <li>To maintain and improve our website</li>
        <li>To comply with legal obligations</li>
      </ul>
    </div>

    <div class="terminal-panel mb-8">
      <h2 class="text-2xl mb-4">Data Storage and Security</h2>
      <p class="mb-4">
        We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
      </p>
      
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Encryption of sensitive data</li>
        <li>Regular security assessments</li>
        <li>Access controls for our systems</li>
        <li>Staff training on data protection</li>
      </ul>
      
      <p>
        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.
      </p>
    </div>

    <div class="terminal-panel mb-8">
      <h2 class="text-2xl mb-4">Your Rights</h2>
      <p class="mb-4">
        Under data protection laws, you have rights regarding your personal information, including:
      </p>
      
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>The right to access your personal information</li>
        <li>The right to correct inaccurate information</li>
        <li>The right to erasure (the "right to be forgotten")</li>
        <li>The right to restrict processing of your information</li>
        <li>The right to data portability</li>
        <li>The right to object to processing</li>
      </ul>
      
      <p>
        To exercise any of these rights, please contact us using the details provided at the end of this policy.
      </p>
    </div>

    <div class="terminal-panel mb-8">
      <h2 class="text-2xl mb-4">Cookies</h2>
      <p class="mb-4">
        Our website uses cookies to enhance your browsing experience. You can control cookies through your browser settings to accept, reject, or delete cookies.
      </p>
      <p>
        We use the following types of cookies:
      </p>
      
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Essential cookies: Required for the website to function properly</li>
        <li>Analytical cookies: Help us understand how you use our website</li>
        <li>Functional cookies: Remember your preferences</li>
      </ul>
    </div>

    <div class="terminal-panel mb-8">
      <h2 class="text-2xl mb-4">Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to read the privacy policies of any third-party websites you visit.
      </p>
    </div>

    <div class="terminal-panel mb-8">
      <h2 class="text-2xl mb-4">Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on our website with a revised effective date.
      </p>
    </div>

    <div class="terminal-panel mb-8">
      <h2 class="text-2xl mb-4">Contact Us</h2>
      <p class="mb-4">
        If you have any questions about this Privacy Policy or our data practices, please contact us using the contact form on our website.
      </p>
    </div>

    <div class="flex justify-center mt-8 mb-12">
      <NuxtLink to="/contact" class="terminal-button">
        Contact Us With Questions
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageSeo } from '~/composables/usePageSeo'

usePageSeo({
  title: 'Privacy Policy | Bromley Cyber',
  description:
    'Privacy policy for Bromley Cyber Security services. Learn how we protect and use your personal information when you use our website security services.',
  keywords:
    'privacy policy, data protection, Bromley Cyber, website security privacy, GDPR compliance',
  canonicalPath: '/privacy'
})
</script>
