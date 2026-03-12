import BlogCard from "../../components/BlogCard";
import SectionHeader from "../../components/SectionHeader";
import { getBlogPosts } from "../../lib/blog";

const blogs = getBlogPosts();

export default function BlogPage() {
  return (
    <section className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Blog"
          paragraph="Thoughts on web development, programming, and technology"
          badge={" Latest"}
        />

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <BlogCard key={blog.id} post={blog} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
