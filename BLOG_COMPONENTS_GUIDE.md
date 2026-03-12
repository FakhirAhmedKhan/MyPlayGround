"""
BLOG COMPONENTS GUIDE
=====================

This guide explains how to use the blog components created for your portfolio.

## Components Overview

1. **BlogContent** - Core component for rendering blog content with paragraphs and code examples
2. **BlogPost** - Complete blog post with metadata (title, author, date, tags)
3. **BlogCard** - Card component for displaying blog posts in a grid/list
4. **BlogPostPage** - Page component for displaying individual blog posts

## Data Structure

Blog posts use the BlogPost interface defined in src/lib/types.ts:

```typescript
interface BlogPost {
  id: string;                    // Unique identifier
  title: string;                 // Post title
  description: string;           // Short description/excerpt
  date: string;                  // Publication date
  author: string;                // Author name
  category: string;              // Post category
  content: BlogContentItem[];    // Array of paragraphs and code blocks
  tags?: string[];              // Optional tags
}

type BlogContentItem = ParagraphBlock | CodeBlock;

interface ParagraphBlock {
  type: "paragraph";
  content: string;
}

interface CodeBlock {
  type: "code";
  language: string;              // Programming language (jsx, javascript, typescript, etc.)
  code: string;                  // Code content
  title?: string;                // Optional code block title
}
```

## Usage Examples

### 1. Using BlogContent Component Directly

```typescript
import BlogContent from "@/components/BlogContent";
import type { BlogContentItem } from "@/lib/types";

const content: BlogContentItem[] = [
  {
    type: "paragraph",
    content: "This is an introductory paragraph about React."
  },
  {
    type: "code",
    language: "jsx",
    title: "Simple Counter Component",
    code: `import { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}`
  },
  {
    type: "paragraph",
    content: "The component above demonstrates React hooks usage."
  }
];

export default function MyBlogPost() {
  return <BlogContent content={content} />;
}
```

### 2. Using BlogPost Component

```typescript
import BlogPostComponent from "@/components/BlogPost";
import type { BlogPost } from "@/lib/types";

const post: BlogPost = {
  id: "my-first-post",
  title: "Getting Started",
  description: "Learn the basics",
  date: "March 10, 2026",
  author: "Your Name",
  category: "Tutorial",
  tags: ["react", "javascript"],
  content: [
    // ... content items
  ]
};

export default function PostPage() {
  return <BlogPostComponent post={post} />;
}
```

### 3. Using BlogCard in a List

```typescript
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@/lib/types";

const posts: BlogPost[] = [/* ... */];

export default function BlogListPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}
```

## Features

### BlogContent Component Features:
- ✅ Renders paragraphs with proper formatting
- ✅ Syntax-highlighted code blocks
- ✅ Copy-to-clipboard functionality for code blocks
- ✅ Language badge display on code blocks
- ✅ Hover effects for better UX
- ✅ Responsive design

### BlogPost Component Features:
- ✅ Displays post metadata (date, category, author)
- ✅ Shows author avatar
- ✅ Integrates BlogContent for the main content
- ✅ Displays tags at the bottom
- ✅ Professional styling with gradients

### BlogCard Component Features:
- ✅ Displays post summary
- ✅ Shows category badge
- ✅ Links to full post
- ✅ Displays author info
- ✅ Shows tags preview
- ✅ Hover animations

## Adding New Blog Posts

1. Add a new entry to `src/data/blog.json` with the format shown above
2. Or create an API endpoint at `src/app/api/blogs/route.ts` to serve blog data
3. The blog pages will automatically load and display the posts

## File Locations

- Components: `src/components/BlogContent.tsx`, `BlogPost.tsx`, `BlogCard.tsx`
- Pages: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`
- Types: `src/lib/types.ts` (BlogPost, BlogContentItem, etc.)
- Data: `src/data/blog.json`

## Customization

### Styling
All components use Tailwind CSS for styling and follow your existing dark theme. 
You can customize colors, spacing, and fonts by modifying the Tailwind classes.

### Code Block Languages
Supports all common programming languages: jsx, typescript, javascript, python, sql, bash, etc.

### Adding Features
You can extend the BlogContentItem type to add new content types:
```typescript
interface VideoBlock {
  type: "video";
  src: string;
  title?: string;
}

type BlogContentItem = ParagraphBlock | CodeBlock | VideoBlock;
```
"""
