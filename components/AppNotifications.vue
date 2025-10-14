<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'max-w-sm p-4 border-l-4 shadow-lg',
          getNotificationClasses(notification.type)
        ]"
        role="alert"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <component :is="getIcon(notification.type)" class="w-5 h-5" />
          </div>
          <div class="ml-3 flex-1">
            <h4 class="font-bold text-sm">{{ notification.title }}</h4>
            <p v-if="notification.description" class="text-sm mt-1">
              {{ notification.description }}
            </p>
          </div>
          <button
            @click="removeNotification(notification.id)"
            class="ml-4 flex-shrink-0 hover:opacity-70"
            aria-label="Close notification"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import type { Notification } from '~/composables/useNotifications'

const { notifications, removeNotification } = useNotifications()

const getNotificationClasses = (type: Notification['type']) => {
  const baseClasses = 'bg-terminal-darkGray text-terminal-green'
  
  switch (type) {
    case 'success':
      return `${baseClasses} border-terminal-green`
    case 'error':
      return `${baseClasses} border-terminal-red text-terminal-red`
    case 'warning':
      return `${baseClasses} border-terminal-yellow text-terminal-yellow`
    case 'info':
      return `${baseClasses} border-terminal-green`
    default:
      return `${baseClasses} border-terminal-green`
  }
}

const CheckIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
    </svg>
  `
}

const XIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  `
}

const ExclamationIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
  `
}

const InfoIcon = {
  template: `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
    </svg>
  `
}

const iconMap: Record<Notification['type'], Component> = {
  success: CheckIcon,
  error: XIcon,
  warning: ExclamationIcon,
  info: InfoIcon
}

const getIcon = (type: Notification['type']) => iconMap[type] ?? InfoIcon
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>
