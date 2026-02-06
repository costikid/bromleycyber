<template>
  <div class="quiz-container">
    <!-- Website Question Section -->
    <div v-if="showWebsiteQuestion" class="terminal-panel" role="form" aria-labelledby="website-question-heading">
      <h3 id="website-question-heading" class="text-2xl mb-4" tabindex="-1">Do you have a website?</h3>
      <div class="flex flex-col sm:flex-row gap-4" role="group" aria-label="Website ownership options">
        <button
          @click="handleHasWebsite(true)"
          class="terminal-button"
          aria-label="Yes, I have a website"
        >
          Yes, I have a website
        </button>
        <button
          @click="handleHasWebsite(false)"
          class="terminal-button"
          aria-label="No, I don't have a website"
        >
          No, I don't have a website
        </button>
      </div>
    </div>

    <!-- Website URL Form -->
    <div v-if="showWebsiteURLForm" class="terminal-panel" role="form" aria-labelledby="website-url-heading">
      <h3 id="website-url-heading" class="text-2xl mb-4" tabindex="-1">Website Information</h3>
      <div class="mb-4">
        <label for="websiteURL" class="block mb-2">
          Please enter your website URL: <span class="text-terminal-red" aria-hidden="true">*</span>
          <span class="sr-only">(required)</span>
        </label>
        <input
          type="url"
          id="websiteURL"
          name="websiteURL"
          placeholder="example.com (no https:// needed)"
          required
          v-model="websiteURL"
          class="terminal-input"
          aria-required="true"
          :aria-invalid="!websiteURL || !isValidURL(websiteURL) ? 'true' : 'false'"
          aria-describedby="website-url-help"
        />
        <div id="website-url-help" class="text-terminal-yellow text-sm mt-1">
          Enter your website domain without "https://" prefix (e.g., example.com)
        </div>
      </div>
      <button 
        @click="validateWebsiteURL"
        class="terminal-button"
        :disabled="!websiteURL"
        aria-label="Proceed to security quiz questions"
      >
        Next
      </button>
    </div>

    <!-- No Website Form -->
    <div v-if="showNoWebsiteForm" class="terminal-panel" role="form" aria-labelledby="no-website-heading">
      <h3 id="no-website-heading" class="text-2xl mb-4" tabindex="-1">
        Please leave your details if you would like to have a secure website:
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="firstName" class="block mb-2">
            First Name <span class="text-terminal-red" aria-hidden="true">*</span>
            <span class="sr-only">(required)</span>
          </label>
          <input 
            type="text" 
            id="firstName" 
            required 
            class="terminal-input"
            v-model="firstName"
            aria-required="true"
            :aria-invalid="!firstName ? 'true' : 'false'"
          />
        </div>
        
        <div>
          <label for="lastName" class="block mb-2">
            Last Name <span class="text-terminal-red" aria-hidden="true">*</span>
            <span class="sr-only">(required)</span>
          </label>
          <input 
            type="text" 
            id="lastName" 
            required 
            class="terminal-input"
            v-model="lastName"
            aria-required="true"
            :aria-invalid="!lastName ? 'true' : 'false'"
          />
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="email" class="block mb-2">
            Email <span class="text-terminal-red" aria-hidden="true">*</span>
            <span class="sr-only">(required)</span>
          </label>
          <input 
            type="email" 
            id="email" 
            required 
            class="terminal-input"
            v-model="email"
            aria-required="true"
            :aria-invalid="!email || !isValidEmail(email) ? 'true' : 'false'"
            aria-describedby="no-website-email-help"
          />
          <div id="no-website-email-help" class="sr-only">Please enter a valid email address format such as example@domain.com</div>
        </div>
        
        <div>
          <label for="phone" class="block mb-2">
            Phone <span class="text-terminal-gray">(Optional)</span>
          </label>
          <input 
            type="tel" 
            id="phone" 
            class="terminal-input"
            v-model="phone"
            aria-required="false"
          />
        </div>
      </div>
      
      <div class="mb-4">
        <label for="websiteDescription" class="block mb-2">
          What do you want from your website? <span class="text-terminal-red" aria-hidden="true">*</span>
          <span class="sr-only">(required)</span>
        </label>
        <textarea
          id="websiteDescription"
          rows="4"
          class="terminal-textarea"
          v-model="websiteDescription"
          aria-required="true"
          :aria-invalid="!websiteDescription ? 'true' : 'false'"
          aria-describedby="description-help"
        ></textarea>
        <div id="description-help" class="text-terminal-yellow text-sm mt-1">
          Tell us about the purpose and needs for your new website
        </div>
      </div>
      
      <button 
        id="submitButton" 
        @click="submitNoWebsiteForm"
        :disabled="!checkNoWebsiteFormValidity() || isSubmittingWebsiteRequest"
        :class="checkNoWebsiteFormValidity() && !isSubmittingWebsiteRequest ? 'terminal-button' : 'terminal-button-disabled'"
        :aria-busy="isSubmittingWebsiteRequest"
        :aria-disabled="!checkNoWebsiteFormValidity() || isSubmittingWebsiteRequest"
      >
        {{ isSubmittingWebsiteRequest ? "Submitting..." : "Submit" }}
      </button>
    </div>

    <!-- Quiz Questions -->
    <div v-if="showQuizQuestions" class="terminal-panel" role="form" aria-labelledby="quiz-question-heading">
      <div class="mb-4">
        <div class="text-terminal-yellow mb-2 text-sm" aria-live="polite">
          [Question <span>{{ currentQuestionIndex + 1 }}</span>/<span>{{ questions.length }}</span>]
        </div>
        <div class="mb-6">
          <h2 id="quiz-question-heading" class="text-2xl mb-4" tabindex="-1">
            {{ questions[currentQuestionIndex].question }}
          </h2>
          <fieldset class="mb-4">
            <legend class="sr-only">Select one answer</legend>
            <div 
              v-for="(option, index) in questions[currentQuestionIndex].options" 
              :key="index"
              class="mb-2"
            >
              <label 
                class="flex items-start p-3 border border-terminal-bright-green hover:bg-terminal-dark-gray cursor-pointer"
                tabindex="0"
                @keydown="handleOptionKeydown($event, index)"
              >
                <input 
                  type="radio" 
                  :id="`question${currentQuestionIndex}-option${index}`"
                  :name="`question${currentQuestionIndex}`"
                  :value="questions[currentQuestionIndex].values[index]"
                  :checked="selectedAnswer === index"
                  @change="handleOptionSelect(index)"
                  class="mt-1 mr-3"
                  :aria-describedby="`option-description-${index}`"
                />
                <span :id="`option-description-${index}`">{{ option }}</span>
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      <button 
        @click="nextQuestion"
        class="terminal-button"
        :aria-label="currentQuestionIndex + 1 < questions.length ? 'Next question' : 'Submit answers'"
        :disabled="selectedAnswer === null"
      >
        Next
      </button>
    </div>

    <!-- User Details Form -->
    <div v-if="showUserDetailsForm" class="terminal-panel" role="form" aria-labelledby="user-details-heading">
      <h2 id="user-details-heading" class="text-2xl mb-4" tabindex="-1">Please provide your details to view your score:</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="userFirstName" class="block mb-2">
            First Name <span class="text-terminal-red" aria-hidden="true">*</span>
            <span class="sr-only">(required)</span>
          </label>
          <input 
            type="text" 
            id="userFirstName" 
            required 
            class="terminal-input"
            v-model="userFirstName"
            aria-required="true"
            :aria-invalid="!userFirstName ? 'true' : 'false'"
          />
        </div>
        
        <div>
          <label for="userLastName" class="block mb-2">
            Last Name <span class="text-terminal-red" aria-hidden="true">*</span>
            <span class="sr-only">(required)</span>
          </label>
          <input 
            type="text" 
            id="userLastName" 
            required 
            class="terminal-input"
            v-model="userLastName"
            aria-required="true"
            :aria-invalid="!userLastName ? 'true' : 'false'"
          />
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="userEmail" class="block mb-2">
            Email <span class="text-terminal-red" aria-hidden="true">*</span>
            <span class="sr-only">(required)</span>
          </label>
          <input 
            type="email" 
            id="userEmail" 
            required 
            class="terminal-input"
            v-model="userEmail"
            aria-required="true"
            :aria-invalid="!userEmail || !isValidEmail(userEmail) ? 'true' : 'false'"
            aria-describedby="email-format-help"
          />
          <div id="email-format-help" class="sr-only">Please enter a valid email address format such as example@domain.com</div>
        </div>
        
        <div>
          <label for="userPhone" class="block mb-2">
            Phone <span class="text-terminal-gray">(Optional)</span>
          </label>
          <input 
            type="tel" 
            id="userPhone" 
            class="terminal-input"
            v-model="userPhone"
            aria-required="false"
          />
        </div>
      </div>
      
      <div class="terminal-warning" role="alert">
        <p class="flex items-start">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Your information is confidential and will only be used to provide you with a personalized security assessment report.
        </p>
      </div>
      
      <button 
        @click="submitUserDetails"
        class="terminal-button"
        :disabled="isSubmittingQuizResult || !userFirstName || !userLastName || !userEmail || !isValidEmail(userEmail)"
        :aria-busy="isSubmittingQuizResult"
        :aria-disabled="isSubmittingQuizResult || !userFirstName || !userLastName || !userEmail || !isValidEmail(userEmail)"
      >
        {{ isSubmittingQuizResult ? "Submitting..." : "Submit" }}
      </button>
    </div>

    <!-- Result Screen -->
    <div v-if="showResultScreen">
      <div class="terminal-panel" role="region" aria-labelledby="results-heading">
        <h2 id="results-heading" class="text-2xl mb-4" tabindex="-1">Security Assessment Results</h2>
        <div class="text-xl mb-4" id="outcomeText" aria-live="polite">
          {{ score >= 3 
            ? "Your website security looks strong. Nice job keeping your digital assets protected!" 
            : "Your website might be vulnerable to common security threats. Let's improve your protection." }}
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-terminal-black p-4 border border-terminal-bright-green" role="region" aria-labelledby="security-score-heading">
            <h4 id="security-score-heading" class="font-bold mb-2">Security Score</h4>
            <div class="text-2xl text-center" aria-live="polite" aria-atomic="true">
              <span :aria-label="`Your score is ${score} out of a possible 3 points`">
                {{ score }}/3
              </span>
            </div>
          </div>
          
          <div class="bg-terminal-black p-4 border border-terminal-bright-green" role="region" aria-labelledby="risk-level-heading">
            <h4 id="risk-level-heading" class="font-bold mb-2">Risk Level</h4>
            <div 
              :class="`text-2xl text-center ${score >= 3 ? 'text-terminal-bright-green' : 'text-terminal-red'}`"
              aria-live="polite"
            >
              {{ score >= 3 ? 'Low Risk' : 'High Risk' }}
            </div>
          </div>
          
          <div class="bg-terminal-black p-4 border border-terminal-bright-green" role="region" aria-labelledby="next-steps-heading">
            <h4 id="next-steps-heading" class="font-bold mb-2">Next Steps</h4>
            <div class="text-lg text-center" aria-live="polite">
              {{ score >= 3 ? 'Annual Security Review' : 'Immediate Security Audit' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Social Share Section -->
      <div v-if="showSocialShareSection" class="terminal-panel" role="region" aria-labelledby="share-heading">
        <h3 id="share-heading" class="text-2xl mb-3">Congratulations on your great score!</h3>
        <p class="mb-4">Share your achievement with others:</p>
        <div class="flex flex-wrap gap-4" role="group" aria-label="Social media sharing options">
          <button 
            @click="shareOnSocialMedia('twitter')"
            class="flex items-center px-4 py-2 border border-terminal-bright-green bg-terminal-black hover:bg-terminal-green hover:text-terminal-black transition-colors duration-150"
            aria-label="Share on Twitter"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
            Share on Twitter
          </button>
          <button 
            @click="shareOnSocialMedia('facebook')"
            class="flex items-center px-4 py-2 border border-terminal-bright-green bg-terminal-black hover:bg-terminal-green hover:text-terminal-black transition-colors duration-150"
            aria-label="Share on Facebook" 
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
            </svg>
            Share on Facebook
          </button>
          <button 
            @click="shareOnSocialMedia('linkedin')"
            class="flex items-center px-4 py-2 border border-terminal-bright-green bg-terminal-black hover:bg-terminal-green hover:text-terminal-black transition-colors duration-150"
            aria-label="Share on LinkedIn"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path>
            </svg>
            Share on LinkedIn
          </button>
        </div>
      </div>

      <!-- Contact Details Section -->
      <div v-if="showContactDetailsSection" class="terminal-panel border-l-4 border-terminal-yellow" role="region" aria-labelledby="contact-heading">
        <h3 id="contact-heading" class="text-2xl mb-3">Your score suggests there are some improvements needed.</h3>
        <p class="mb-4">We recommend you reach out to our cybersecurity experts for professional help securing your website.</p>
        
        <div class="bg-terminal-black p-4 border border-terminal-bright-green mb-4" aria-labelledby="services-heading">
          <h4 id="services-heading" class="font-bold mb-3">Our Security Services Include:</h4>
          <ul class="list-disc list-inside space-y-2" role="list">
            <li>Website Security Audits</li>
            <li>Vulnerability Assessments</li>
            <li>Secure Website Development</li>
            <li>SSL Certificate Implementation</li>
            <li>Ongoing Security Monitoring</li>
          </ul>
        </div>
        
        <NuxtLink 
          to="/contact" 
          class="inline-block terminal-button"
          role="button"
          aria-label="Contact us for a security consultation"
        >
          Contact Us Now
        </NuxtLink>
      </div>
      
      <div class="flex justify-between mt-6" role="navigation" aria-label="Quiz navigation">
        <button 
          @click="resetQuiz"
          class="terminal-button"
          aria-label="Restart the security quiz from the beginning"
        >
          Take the Quiz Again
        </button>
        
        <NuxtLink 
          to="/"
          class="terminal-button"
          aria-label="Go to homepage to explore our services"
        >
          Explore Our Services
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Define question interface
interface Question {
  question: string
  options: string[]
  values: number[]
}

// Use notifications
const { success, error } = useNotifications()

// Form states
const hasWebsite = ref<boolean | null>(null)
const websiteURL = ref('')
const websiteTool = ref('')

// No website form
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const websiteDescription = ref('')

// Quiz states
const score = ref(0)
const currentQuestionIndex = ref(0)
const selectedAnswer = ref<number | null>(null)

// User details
const userFirstName = ref('')
const userLastName = ref('')
const userEmail = ref('')
const userPhone = ref('')

// UI states
const showWebsiteQuestion = ref(true)
const showWebsiteURLForm = ref(false)
const showNoWebsiteForm = ref(false)
const showQuizQuestions = ref(false)
const showUserDetailsForm = ref(false)
const showResultScreen = ref(false)
const showSocialShareSection = ref(false)
const showContactDetailsSection = ref(false)

// Loading states
const isSubmittingQuizResult = ref(false)
const isSubmittingWebsiteRequest = ref(false)

// Quiz questions
const questions: Question[] = [
  {
    question: "What did you use to create your website?",
    options: [
      "Wix",
      "Webflow", 
      "Squarespace",
      "GoDaddy",
      "WordPress",
      "I don't know",
    ],
    values: [0, 0, 0, 0, 0, 0], // First question doesn't contribute to overall score
  },
  {
    question: "Does the password to access your website have at least a special character, a number, and is 10+ characters long?",
    options: ["Yes", "No", "Should you be asking me that?"],
    values: [0, 0, 1], // Only "Should you be asking me that?" gives 1 point
  },
  {
    question: "Do you have multi-factor authentication enabled?",
    options: ["Yes", "No", "What is multi-factor authentication?"],
    values: [1, 0, 0], // "Yes" gives 1 point
  },
  {
    question: "Who has access to your website admin dashboard?",
    options: ["Myself and one other person", "I am not sure", "What is the admin dashboard?"],
    values: [1, 0, 0], // "Myself and one other person" gives 1 point
  },
]

// Form validation helpers
const isValidEmail = (emailValue: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(emailValue)
}

const isValidURL = (url: string) => {
  try {
    // Add https:// prefix if not present
    const urlWithProtocol = url.match(/^[a-zA-Z]+:\/\//) ? url : `https://${url}`
    new URL(urlWithProtocol)
    return true
  } catch (e) {
    return false
  }
}

// Computed properties
const checkNoWebsiteFormValidity = computed(() => {
  return (
    firstName.value.trim() !== '' &&
    lastName.value.trim() !== '' &&
    email.value.trim() !== '' &&
    isValidEmail(email.value) &&
    websiteDescription.value.trim() !== ''
  )
})

// UI control functions
const handleHasWebsite = (has: boolean) => {
  hasWebsite.value = has
  showWebsiteQuestion.value = false
  
  if (has) {
    showWebsiteURLForm.value = true
  } else {
    showNoWebsiteForm.value = true
  }
}

const validateWebsiteURL = () => {
  if (!websiteURL.value.trim() || !isValidURL(websiteURL.value)) {
    error('Invalid URL', 'Please enter a valid website URL (e.g. example.com)')
    return
  }
  
  showWebsiteURLForm.value = false
  showQuizQuestions.value = true
}

const submitNoWebsiteForm = async () => {
  if (!checkNoWebsiteFormValidity.value) {
    error('Missing Information', 'Please fill in all required fields')
    return
  }
  
  isSubmittingWebsiteRequest.value = true
  
  try {
    const requestData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      description: websiteDescription.value
    }
    
    // Use Nuxt's $fetch for API calls
    await $fetch('/api/website-requests', {
      method: 'POST',
      body: requestData
    })
    
    success('Success!', 'Your website request has been submitted. We\'ll be in touch soon!')
    resetQuiz()
  } catch (err) {
    error('Error', 'Failed to submit website request. Please try again.')
  } finally {
    isSubmittingWebsiteRequest.value = false
  }
}

const handleOptionSelect = (value: number) => {
  selectedAnswer.value = value
}

const handleOptionKeydown = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Enter' || event.key === ' ') {
    handleOptionSelect(index)
    event.preventDefault()
  }
}

const nextQuestion = () => {
  if (selectedAnswer.value === null) {
    error('No Answer Selected', 'Please select an answer before continuing')
    return
  }
  
  // First question is about the tool and doesn't contribute to score
  if (currentQuestionIndex.value === 0) {
    websiteTool.value = questions[0].options[selectedAnswer.value]
    // Don't add to score for first question
  } else {
    // Only add to score for questions after the first one
    score.value += questions[currentQuestionIndex.value].values[selectedAnswer.value]
  }
  
  if (currentQuestionIndex.value + 1 < questions.length) {
    currentQuestionIndex.value++
    selectedAnswer.value = null
  } else {
    showQuizQuestions.value = false
    showUserDetailsForm.value = true
  }
}

const validateUserDetailsForm = () => {
  if (!userFirstName.value || !userLastName.value || !userEmail.value || !isValidEmail(userEmail.value)) {
    error('Missing Information', 'Please fill in all required fields with valid information')
    return false
  }
  return true
}

const submitUserDetails = async () => {
  if (!validateUserDetailsForm()) return
  
  isSubmittingQuizResult.value = true
  
  try {
    const quizData = {
      hasWebsite: !!hasWebsite.value,
      websiteUrl: websiteURL.value,
      tool: websiteTool.value,
      score: score.value,
      firstName: userFirstName.value,
      lastName: userLastName.value,
      email: userEmail.value,
      phone: userPhone.value
    }
    
    // Use Nuxt's $fetch for API calls
    await $fetch('/api/quiz-responses', {
      method: 'POST',
      body: quizData
    })
    
    success('Success!', 'Your quiz response has been recorded')
    
    showUserDetailsForm.value = false
    showResultScreen.value = true
    
    // Show social sharing section only when score equals exactly 3 points
    if (score.value === 3) {
      showSocialShareSection.value = true
      showContactDetailsSection.value = false
    } else {
      showSocialShareSection.value = false
      showContactDetailsSection.value = true
    }
  } catch (err) {
    error('Error', 'Failed to submit quiz response. Please try again.')
  } finally {
    isSubmittingQuizResult.value = false
  }
}

const shareOnSocialMedia = (platform: string) => {
  // Create a comprehensive message that includes the score
  const message = encodeURIComponent(
    "I scored 3/3 in the Website Security Quiz by Bromley Cyber! My website is secure. How secure is yours? Take the quiz to find out!"
  )
  const url = encodeURIComponent("https://bromleycyber.co.uk/quiz")
  let shareUrl = ""
  
  if (platform === "twitter") {
    // Twitter is now X, but the API endpoint is still twitter.com
    shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}`
  } else if (platform === "facebook") {
    // Facebook sometimes ignores the quote parameter, but we'll include it anyway
    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`
  } else if (platform === "linkedin") {
    // LinkedIn prefers the summary to be formatted this way
    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent("Website Security Quiz Results")}&summary=${message}`
  }
  
  window.open(shareUrl, "_blank")
}

const resetQuiz = () => {
  // Reset all states
  hasWebsite.value = null
  websiteURL.value = ''
  websiteTool.value = ''
  score.value = 0
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  phone.value = ''
  websiteDescription.value = ''
  
  userFirstName.value = ''
  userLastName.value = ''
  userEmail.value = ''
  userPhone.value = ''
  
  // Reset UI states
  showWebsiteQuestion.value = true
  showWebsiteURLForm.value = false
  showNoWebsiteForm.value = false
  showQuizQuestions.value = false
  showUserDetailsForm.value = false
  showResultScreen.value = false
  showSocialShareSection.value = false
  showContactDetailsSection.value = false
  
  // Reset loading states
  isSubmittingQuizResult.value = false
  isSubmittingWebsiteRequest.value = false
}
</script>
