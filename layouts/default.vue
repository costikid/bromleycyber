<template>
  <div class="flex min-h-screen flex-col bg-terminal-black text-terminal-green font-terminal">
    <AppNavbar />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
    <AppNotifications />
  </div>
</template>

<script setup lang="ts">
// Auto-scroll to top on route changes
const route = useRoute()

watch(() => route.path, () => {
  if (process.client) {
    window.scrollTo(0, 0)
  }
})
</script>
