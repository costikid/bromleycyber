<template>
  <footer class="bg-terminal-black py-8 border-t border-terminal-green">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="text-xl font-bold mb-4">Bromley Cyber</h3>
          <p class="mb-4">Protecting small businesses with expert website security solutions in Bromley and beyond.</p>
          <div class="flex space-x-4">
            <a 
              href="https://www.linkedin.com/in/costanza-casullo/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-terminal-green hover:text-terminal-brightGreen"
              aria-label="LinkedIn"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <div>
          <h3 class="text-xl font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="hover:text-terminal-brightGreen">Home</NuxtLink></li>
            <li><NuxtLink to="/quiz" class="hover:text-terminal-brightGreen">Security Quiz</NuxtLink></li>
            <li><NuxtLink to="/web-development" class="hover:text-terminal-brightGreen">Web Development</NuxtLink></li>
            <li><NuxtLink to="/security-audit" class="hover:text-terminal-brightGreen">Security Audit</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-terminal-brightGreen">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="hover:text-terminal-brightGreen">Privacy Policy</NuxtLink></li>
          </ul>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 class="text-xl font-bold mb-4">Location</h3>
          <p>Bromley, Kent</p>
        </div>
        
        <div>
          <h3 class="text-xl font-bold mb-4">Contact Details</h3>
          <p class="mb-2">
            <a href="mailto:costanza@bromleywebworks.co.uk" class="hover:text-terminal-brightGreen">
              costanza@bromleywebworks.co.uk
            </a>
          </p>
          <p>
            <a href="tel:+447737163885" class="hover:text-terminal-brightGreen">
              +44 7737 163885
            </a>
          </p>
        </div>
      </div>
      
      <div class="pt-8 border-t border-terminal-green text-center text-sm mt-8">
        <p>&copy; {{ currentYear }} Bromley Cyber. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
