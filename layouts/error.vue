<template>
  <div class="min-h-screen flex items-center justify-center bg-terminal-darkGray p-4">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-terminal-green mb-4">
        {{ error.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}
      </h1>
      <p class="text-white mb-6">
        {{ error.statusCode === 404 
          ? "The page you're looking for doesn't exist or has been moved." 
          : 'An unexpected error has occurred.' 
        }}
      </p>
      <NuxtLink 
        to="/" 
        class="terminal-button"
      >
        Go back home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>
