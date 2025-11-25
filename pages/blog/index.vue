<template>
  <div class="container mx-auto px-4 py-12">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-terminal-green">Blog</h1>
      <p class="text-terminal-brightGreen mt-2">
        Latest updates and insights from the Bromley Cyber team.
      </p>
    </header>

    <section class="space-y-8" v-if="posts.length">
      <article
        v-for="post in posts"
        :key="post.slug"
        class="border border-terminal-mediumGray rounded-lg p-6 hover:border-terminal-green transition-colors"
      >
        <NuxtLink :to="`/blog/${post.slug}`" class="no-underline">
          <h2 class="text-2xl font-bold text-white mb-2">
            {{ post.title }}
          </h2>
        </NuxtLink>
        <p class="text-sm text-terminal-brightGreen mb-4">
          {{ formatDate(post.date) }}
        </p>
        <p class="text-terminal-brightGreen" v-if="post.description">
          {{ post.description }}
        </p>
      </article>
    </section>

    <div v-else class="text-center text-terminal-mediumGray py-12">
      No blog posts yet. Check back soon!
    </div>
  </div>
</template>

<script setup lang="ts">
const { posts } = useBlog()

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

useHead({
  title: 'Blog',
  meta: [
    {
      name: 'description',
      content: 'Browse the latest articles from Bromley Cyber.'
    }
  ]
})
</script>
