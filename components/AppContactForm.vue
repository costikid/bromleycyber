<template>
  <section id="contact" class="py-12 bg-terminal-darkGray mt-12">
    <div class="container mx-auto px-4 md:px-6 max-w-3xl">
      <h2 class="section-title">Ready for a Secure Website?</h2>
      
      <div class="bg-terminal-black border border-terminal-green p-6">
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="contactName" class="block mb-2">
                Name <span class="text-terminal-red">*</span>
              </label>
              <input 
                id="contactName"
                v-model="formData.name"
                type="text" 
                required 
                class="terminal-input"
              />
            </div>
            
            <div>
              <label for="contactEmail" class="block mb-2">
                Email <span class="text-terminal-red">*</span>
              </label>
              <input 
                id="contactEmail"
                v-model="formData.email"
                type="email" 
                required 
                class="terminal-input"
              />
            </div>
          </div>
          
          <div class="mb-6">
            <label for="contactSubject" class="block mb-2">
              Subject <span class="text-terminal-red">*</span>
            </label>
            <select 
              id="contactSubject"
              v-model="formData.subject"
              required 
              class="terminal-select"
            >
              <option value="" disabled>Please select a subject</option>
              <option value="Website Security Audit">Website Security Audit</option>
              <option value="New Secure Website">New Secure Website</option>
              <option value="Other Enquiry">Other Enquiry</option>
            </select>
          </div>
          
          <div class="mb-6">
            <label for="contactMessage" class="block mb-2">
              Message <span class="text-terminal-red">*</span>
            </label>
            <textarea
              id="contactMessage"
              v-model="formData.message"
              rows="5"
              required
              class="terminal-textarea"
            ></textarea>
          </div>
          
          <div class="mb-6 flex items-start">
            <input 
              id="privacyPolicy"
              v-model="formData.agreeToPrivacy"
              type="checkbox" 
              required 
              class="mt-1 mr-2"
            />
            <label for="privacyPolicy" class="text-sm">
              I have read and agree to the <NuxtLink to="/privacy" class="text-terminal-brightGreen hover:underline">Privacy Policy</NuxtLink> <span class="text-terminal-red">*</span>
            </label>
          </div>
          
          <button 
            type="submit" 
            class="terminal-button"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { success, error } = useNotifications()

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  agreeToPrivacy: false
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.agreeToPrivacy) {
    error('Missing Information', 'Please fill in all required fields and agree to the privacy policy')
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    error('Invalid Email', 'Please enter a valid email address')
    return
  }

  try {
    isSubmitting.value = true
    console.log('Submitting form data:', JSON.stringify({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      agreeToPrivacy: formData.agreeToPrivacy
    }, null, 2))

    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        agreeToPrivacy: formData.agreeToPrivacy
      },
      onResponseError({ response }) {
        console.error('Response error:', response._data)
      }
    })

    console.log('Server response:', response)

    // Reset form
    formData.name = ''
    formData.email = ''
    formData.subject = ''
    formData.message = ''
    formData.agreeToPrivacy = false
    
    success('Message Sent', 'Thanks for reaching out! We will get back to you soon.')
    
  } catch (err: any) {
    console.error('Form submission error:', err)
    let errorMessage = 'Unable to send your message right now. Please try again later.'
    
    if (err.response) {
      // Handle HTTP errors
      const data = err.response._data
      errorMessage = data?.message || data?.statusMessage || errorMessage
      console.error('Response data:', data)
    } else if (err.request) {
      // Request was made but no response received
      errorMessage = 'No response from server. Please check your internet connection.'
    } else if (err.message) {
      // Other errors
      errorMessage = err.message
    }
    
    error('Submission Failed', errorMessage)
  } finally {
    isSubmitting.value = false
  }
}
</script>
