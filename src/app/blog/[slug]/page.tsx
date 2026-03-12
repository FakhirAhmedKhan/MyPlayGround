import BlogPostComponent from "@/components/BlogPost";
import { notFound } from "next/navigation";
import { getBlogPosts, getAllBlogIds } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllBlogIds().map((id) => ({
    slug: id,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPosts().find((b) => b.id === slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogPostComponent post={post} />

        {/* Navigation Links */}
        <div className="mt-20 pt-12 border-t border-slate-800">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>←</span>
            <span>Back to Blog</span>
          </a>
        </div>
      </div>
    </section>
  );
}
