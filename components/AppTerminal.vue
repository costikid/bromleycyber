<template>
  <div class="terminal-header">
    <div class="terminal-controls">
      <div class="terminal-circles">
        <div class="terminal-circle bg-terminal-red"></div>
        <div class="terminal-circle bg-terminal-yellow"></div>
        <div class="terminal-circle bg-terminal-green"></div>
      </div>
      <div class="terminal-title">{{ title }}</div>
    </div>
    <div class="terminal-text">
      <p class="terminal-prompt">
        <span class="text-terminal-yellow">root@bromley-security</span>:
        <span class="text-terminal-brightGreen">~</span>$ ./run_security_scan.sh
      </p>
      <div class="terminal-startup">
        <slot />
      </div>
      <p class="flex">
        <span>$</span>
        <span class="terminal-cursor"></span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'bromley-security-terminal'
})
</script>
