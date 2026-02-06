<template>
  <nav class="border-b border-terminal-green py-3 px-4 md:px-6 mb-8">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="text-2xl font-bold animate-text-glow">Bromley</span>
          <span class="text-2xl font-bold text-terminal-bright-green">[Cyber]</span>
        </NuxtLink>
      </div>
      
      <div class="hidden md:flex space-x-6">
        <NuxtLink 
          to="/" 
          :class="[
            'transition-colors duration-150',
            isActive('/') 
              ? 'text-terminal-bright-green border-b-2 border-terminal-bright-green' 
              : 'hover:text-terminal-bright-green'
          ]"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/quiz" 
          :class="[
            'transition-colors duration-150',
            isActive('/quiz') 
              ? 'text-terminal-bright-green border-b-2 border-terminal-bright-green' 
              : 'hover:text-terminal-bright-green'
          ]"
        >
          Security Quiz
        </NuxtLink>
        <NuxtLink 
          to="/web-development" 
          :class="[
            'transition-colors duration-150',
            isActive('/web-development') 
              ? 'text-terminal-bright-green border-b-2 border-terminal-bright-green' 
              : 'hover:text-terminal-bright-green'
          ]"
        >
          Web Development
        </NuxtLink>
        <NuxtLink 
          to="/security-audit" 
          :class="[
            'transition-colors duration-150',
            isActive('/security-audit') 
              ? 'text-terminal-bright-green border-b-2 border-terminal-bright-green' 
              : 'hover:text-terminal-bright-green'
          ]"
        >
          Security Audit
        </NuxtLink>
        <NuxtLink 
          to="/blog" 
          :class="[
            'transition-colors duration-150',
            isActive('/blog') || route.path.startsWith('/blog/') 
              ? 'text-terminal-bright-green border-b-2 border-terminal-bright-green' 
              : 'hover:text-terminal-bright-green'
          ]"
        >
          Blog
        </NuxtLink>
        <NuxtLink 
          to="/contact" 
          :class="[
            'transition-colors duration-150',
            isActive('/contact') 
              ? 'text-terminal-bright-green border-b-2 border-terminal-bright-green' 
              : 'hover:text-terminal-bright-green'
          ]"
        >
          Contact
        </NuxtLink>
      </div>
      
      <button 
        @click="toggleMenu" 
        class="md:hidden text-2xl"
        aria-label="Toggle menu"
      >
        ≡
      </button>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen" 
      class="md:hidden absolute top-[60px] left-0 right-0 bg-terminal-black border-b border-terminal-green z-50"
    >
      <div class="flex flex-col px-4 py-2">
        <NuxtLink 
          to="/" 
          :class="['py-3', isActive('/') ? 'text-terminal-bright-green' : '']"
          @click="closeMenu"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/quiz" 
          :class="['py-3', isActive('/quiz') ? 'text-terminal-bright-green' : '']"
          @click="closeMenu"
        >
          Security Quiz
        </NuxtLink>
        <NuxtLink 
          to="/web-development" 
          :class="['py-3', isActive('/web-development') ? 'text-terminal-bright-green' : '']"
          @click="closeMenu"
        >
          Web Development
        </NuxtLink>
        <NuxtLink 
          to="/security-audit" 
          :class="['py-3', isActive('/security-audit') ? 'text-terminal-bright-green' : '']"
          @click="closeMenu"
        >
          Security Audit
        </NuxtLink>
        <NuxtLink 
          to="/blog" 
          :class="['py-3', isActive('/blog') || route.path.startsWith('/blog/') ? 'text-terminal-bright-green' : '']"
          @click="closeMenu"
        >
          Blog
        </NuxtLink>
        <NuxtLink 
          to="/contact" 
          :class="['py-3', isActive('/contact') ? 'text-terminal-bright-green' : '']"
          @click="closeMenu"
        >
          Contact
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const isActive = (path: string) => {
  return route.path === path
}
</script>
