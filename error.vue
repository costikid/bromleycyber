<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-terminal-black">
    <div class="w-full max-w-md mx-4">
      <div class="terminal-panel">
        <div class="flex mb-4 gap-2 items-center">
          <div class="text-terminal-red text-2xl">⚠</div>
          <h1 class="text-2xl font-bold text-terminal-green">{{ error.statusCode }} - Page Not Found</h1>
        </div>

        <p class="mt-4 text-sm text-terminal-green">
          {{ error.statusMessage || 'The page you are looking for does not exist.' }}
        </p>
        
        <div class="mt-6">
          <NuxtLink to="/" class="terminal-button">
            Return to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NuxtError {
  statusCode: number
  statusMessage?: string
}

defineProps<{
  error: NuxtError
}>()

// Set page meta
useSeoMeta({
  title: 'Page Not Found | Bromley Cyber',
  description: 'The page you are looking for could not be found.',
  robots: 'noindex, nofollow'
})
</script>
