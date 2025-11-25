import { marked } from 'marked'
import matter from 'gray-matter'

const BLOG_GLOB_PATTERN = '../content/blog/**/*.md' as const

marked.setOptions({
  gfm: true,
  breaks: true
})

marked.use({
  renderer: {
    // Strip raw HTML for safety. Markdown syntax still renders as expected.
    html() {
      return ''
    }
  }
})

interface BlogFrontmatter {
  title?: string
  date?: string
  description?: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  description?: string
  content: string
  html: string
}

const normalizePath = (path: string) =>
  path
    .replace(/\\/g, '/')
    .replace(/^\.\.\/?content\/blog\//, '')

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, '')
const toSlug = (path: string) => {
  const normalized = normalizePath(path)
    .replace(/index\.md$/i, '')
    .replace(/\.md$/, '')

  return trimSlashes(normalized) || normalized
}

const parseDate = (value?: string) => {
  if (!value) {
    return new Date().toISOString()
  }

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
}

const toPosts = (modules: Record<string, string>): BlogPost[] => {
  const posts = Object.entries(modules)
    .map(([path, raw]): BlogPost | null => {
      try {
        const { data, content } = matter(raw ?? '')
        const frontmatter = data as BlogFrontmatter

        if (!frontmatter.title) {
          console.error(`Missing required frontmatter "title" in ${path}`)
          return null
        }

        const slug = toSlug(path)

        return {
          slug,
          title: frontmatter.title,
          description: frontmatter.description,
          date: parseDate(frontmatter.date),
          content,
          html: marked.parse(content) as string
        } as BlogPost
      } catch (error) {
        console.error(`Error processing blog post ${path}:`, error)
        return null
      }
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return posts
}

const loadPosts = (): BlogPost[] => {
  // Only run on client side to prevent SSR issues
  if (process.server) {
    return []
  }
  
  try {
    // Use dynamic evaluation to prevent build-time issues
    const globPattern = '../content/blog/**/*.md'
    const modules = import.meta.glob(globPattern, {
      eager: true,
      as: 'raw'
    }) as Record<string, string>

    return toPosts(modules)
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

export const useBlog = () => {
  const posts = useState<BlogPost[]>('blog-posts', loadPosts)

  const refresh = () => {
    if (process.client) {
      posts.value = loadPosts()
    }
  }

  // Only set up HMR on client side
  if (process.client && import.meta.hot) {
    try {
      const globPattern = '../content/blog/**/*.md'
      const dependencies = Object.keys(import.meta.glob(globPattern))
      import.meta.hot.accept(dependencies, () => refresh())
      import.meta.hot.dispose(() => refresh())
    } catch (error) {
      console.warn('HMR setup failed:', error)
    }
  }

  const getPostBySlug = (slug: string) => posts.value.find(post => post.slug === slug)

  return {
    posts,
    refresh,
    getPostBySlug
  }
}
