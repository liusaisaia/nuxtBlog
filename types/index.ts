export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  date: string
  readTime: number
  author: string
  tags: string[]
  published: boolean
}

export interface Author {
  name: string
  bio: string
  avatar: string
  social: {
    twitter?: string
    github?: string
    email?: string
  }
}
