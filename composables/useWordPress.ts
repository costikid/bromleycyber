export interface WpPost {
  id: number
  date: string
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
    author?: Array<{
      name: string
    }>
  }
}

export const useWordPress = () => {
  const config = useRuntimeConfig()
  const wpUrl = config.public.wordpressUrl

  const getPosts = (params: Record<string, any> = {}) => {
    return useFetch<WpPost[]>(`${wpUrl}`, {
      query: {
        rest_route: '/wp/v2/posts',
        _embed: true,
        per_page: 9,
        ...params
      }
    })
  }

  const getPostBySlug = (slug: string) => {
    return useFetch(`${wpUrl}`, {
      key: `post-${slug}`,
      query: {
        rest_route: '/wp/v2/posts',
        slug,
        _embed: true
      },
      transform: (posts: WpPost[]) => {
        return posts.length > 0 ? posts[0] : null
      }
    })
  }

  return {
    getPosts,
    getPostBySlug
  }
}
