import { ref, readonly } from 'vue'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  duration?: number
}

const notifications = ref<Notification[]>([])

export const useNotifications = () => {
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification: Notification = {
      id,
      duration: 5000,
      ...notification
    }
    
    notifications.value.push(newNotification)
    
    // Auto remove after duration
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  }
  
  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }
  
  const clearAll = () => {
    notifications.value = []
  }
  
  const success = (title: string, description?: string) => {
    return addNotification({ type: 'success', title, description })
  }
  
  const error = (title: string, description?: string) => {
    return addNotification({ type: 'error', title, description })
  }
  
  const warning = (title: string, description?: string) => {
    return addNotification({ type: 'warning', title, description })
  }
  
  const info = (title: string, description?: string) => {
    return addNotification({ type: 'info', title, description })
  }
  
  return {
    notifications: readonly(notifications),
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  }
}
