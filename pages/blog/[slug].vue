<template>
  <article class="container mx-auto px-4 py-12" v-if="post">
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-white mb-4">{{ post.title }}</h1>
      <p class="text-terminal-brightGreen">{{ formatDate(post.date) }}</p>
    </header>

    <div class="prose prose-invert max-w-none text-terminal-brightGreen" v-html="post.html" />
  </article>

  <div v-else class="container mx-auto px-4 py-12 text-center text-terminal-mediumGray">
    This post could not be found.
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getPostBySlug } = useBlog()

const slug = computed(() => route.params.slug as string)
const post = computed(() => getPostBySlug(slug.value))

// Simple 404 handling
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  })
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

useHead(() => ({
  title: post.value?.title ?? 'Blog post',
  meta: [
    {
      name: 'description',
      content: post.value?.description ?? 'Blog article on Bromley Cyber'
    }
  ]
}))
</script>
