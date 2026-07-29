import SectionHeading from '../components/SectionHeading'
import BlogCard from '../components/BlogCard'
import { blogPosts } from '../data'

export default function Blog() {
  return (
    <section id="blog" className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Blog"
          title={
            <>
              Blog & <span className="text-accent">Insights</span>
            </>
          }
          subtitle="Recent thoughts and articles"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
